from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from sqlmodel import select
from app.db.main import get_db_session
from app.db.userModels import Driver, Customer

SECRET_KEY = "supersecretkeyheresupersecretkeyhere"  # put in env var!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080

def create_access_token(data: str, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = {"data":data, "exp":expires_delta}
    expire = datetime.now(timezone.utc) + (expires_delta)
    to_encode.update({"exp": expire.timestamp()})
    new_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return new_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # not used, but required by FastAPI

async def get_current_user(token: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzEzIiwiZXhwIjoxNzU4NDE4OTAyLjAyNTE0OH0.A832TZM4lH1_aa1tPru-rmEiGkkTxIclwWWgzO0m_Dw", session = Depends(get_db_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        userData: str | None = payload.get("data")
        
        if userData is None:
            print("###1")
            raise HTTPException(status_code=401, detail="Invalid token")
        print(userData[1:])
        if userData[0]=='c':
            query = await session.exec(select(Customer).where(Customer.uid == int(userData[1:])))
        elif userData[0]=='d':
            query = await session.exec(select(Driver).where(Driver.uid == int(userData[1:])))
        
        else:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = query.one_or_none()
        print(user)
        if user:
            return user
    except JWTError:
        print("###4")
        raise HTTPException(status_code=401, detail="Invalid token")