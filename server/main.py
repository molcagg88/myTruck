from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
import uvicorn
import random
import time
from .models.requestModels import (SendOTPRequest, SetDetialsRequest, 
                                   SigninRequest, VerifyOTPRequest)
from .models.commonModels import Types
from .models.userModels import User, UserTemp
from .utils.authToken import create_access_token


app = FastAPI()


origins = [
    "http://localhost:8081",
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


def generate_otp(length=6):
    return ''.join([str(random.randint(0,9)) for _ in range(length)])

def hash_otp(otp: str):
    return hashlib.sha256(otp.encode()).hexdigest()

def hash_pin(pin: str):
    return hashlib.sha256(pin.encode()).hexdigest()
Users.append(User(type=Types.customer, active=True, fname="Esrom", lname="Alem", phone="11", pin=hash_pin("0000")))


@app.get("/")
async def home():
    return {"message":"hui"}

@app.post("/send-otp")
async def send_otp(request: SendOTPRequest):
    otp = generate_otp()
    hashed = hash_otp(otp)

    for i in UsersTemp:
        if i.phone==request.phone:
            return {"internal":100}
    for i in Users:
        if i.phone==request.phone:
            return {"internal":101}
        
    # Store hashed OTP with timestamp (valid 5 minutes)
    otp_store[request.phone] = {"hash": hashed, "time": time.time()}

    # In real system, send OTP via SMS
    print(f"OTP for {request.phone}: {otp}")

    return {"message": "OTP sent"}

@app.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    data = otp_store.get(request.phone)

    if not data:
        print(102)
        return 102

    # Check if OTP expired (5 min)
    if time.time() - data["time"] > 300:
        del otp_store[request.phone]
        print(103)
        return 103

    if hash_otp(request.otp) != data["hash"]:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # OTP is valid, delete it
    UsersTemp.append(UserTemp(phone=request.phone))
    del otp_store[request.phone]
    
    return {"verified": True}

@app.post('/setdetails')
async def setDetails(request: SetDetialsRequest):
    print(request)
    for i in Users:
        if i.phone==request.phone:
            raise HTTPException(409, detail="User already exists")
    for i in UsersTemp:
        if i.phone == request.phone:
            new_user = User(type=request.type, active=True, fname=request.fname, lname=request.lname, phone=request.phone, pin=hash_pin(request.pin))
            Users.append(new_user)
            return {"success":True, "token":create_access_token(new_user.model_dump())}
    raise HTTPException(404, detail="OTP not verified")

@app.post('/signin')
async def signin(request: SigninRequest):
    for i in Users:
        if i.phone == request.phone:
            if i.pin!=hash_pin(request.pin):
                raise HTTPException(status_code=401, detail="Wrong password")
            user = i.model_dump()
            del user["pin"]
            return {"success": True, "token":create_access_token(user)}
    raise HTTPException(404, detail="User not found")

if __name__ == "__main__":
    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
