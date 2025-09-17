from fastapi import FastAPI, HTTPException, Depends
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import hashlib
import uvicorn
import random
import time

from typing import Union

from .db.main import init_db
import asyncio
from .db.requestModels import (SendOTPRequest, SetDetialsRequest, 
                                   SigninRequest, VerifyOTPRequest)
from .db.commonModels import Types
from .db.userModels import User, UserTemp, Customer, Driver
from .utils.authToken import create_access_token, get_current_user

from .services.otpService import send_otp_svc, verify_otp_svc
from .services.userExistenceService import set_details_svc
from .services.authService import signin_svc

from app.routes.auth import auth_router
from app.routes.jobs import job_router
from app.routes.bids import bid_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("DB initialized")
    # asyncio.create_task(update_auction_statuses())
    
    yield
    print("closing server")

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)
app.include_router(job_router)
app.include_router(bid_router)

origins = [
    "http://localhost:8081",
    "http://localhost:8081/",
    "http://127.0.0.1:8081",
    "http://192.168.1.2",
    "http://192.168.1.3"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for OTPs
otp_store = {}
Users:list[User]=[]
UsersTemp=[]

def hash_pin(pin: str):
    return hashlib.sha256(pin.encode()).hexdigest()


Users.append(User(type=Types.customer, active=True, fname="Esrom", lname="Alem", phone="11", pin=hash_pin("0000")))


@app.get("/ping")
async def ping():
    return HTTPException(200, detail="UP")

@app.get("/pingAuthed")
async def pingAuthed(user = Depends(get_current_user)):
    return user

@app.post("/send-otp")
async def send_otp(request: SendOTPRequest, otpServiceResponse = Depends(send_otp_svc)):
     
    return otpServiceResponse

@app.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest, verifyServiceResponse = Depends( verify_otp_svc)):
    return verifyServiceResponse

@app.post('/setdetails')
async def setDetails(request: SetDetialsRequest, DetailsServiceResponse = Depends(set_details_svc)):
    return DetailsServiceResponse

@app.post('/signin')
async def signin(request: SigninRequest, signinServiceResponse = Depends(signin_svc)):
    return signinServiceResponse


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
