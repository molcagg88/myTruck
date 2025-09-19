from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from sqlmodel import select
from app.db.main import get_db_session
from app.db.commonModels import Types
from app.db.userModels import Driver, Customer, TempUsers
from app.db.commonModels import TokenDataModel
from jwt.exceptions import ExpiredSignatureError

SECRET_KEY = "supersecretkeyheresupersecretkeyhere"  # put in env var!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080
TEMP_TOKEN_EXPIRE_MINUTES = 360

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = {"data":data, "exp":expires_delta}
    expire = datetime.now(timezone.utc) + (expires_delta)
    to_encode.update({"exp": expire.timestamp()})
    new_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return new_token

def create_temp_token(data: str, expires_delta: timedelta = timedelta(minutes=TEMP_TOKEN_EXPIRE_MINUTES)):
    to_encode = {"data":data, "exp":expires_delta}
    expire = datetime.now(timezone.utc) + (expires_delta)
    to_encode.update({"exp": expire.timestamp()})
    new_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return new_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # not used, but required by FastAPI

async def get_current_user(token: str = Depends(oauth2_scheme), session = Depends(get_db_session)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        userData: TokenDataModel | None = payload.get("data")
        
        if userData is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        if userData.user_type==Types.customer:
            query = await session.exec(select(Customer).where(Customer.uid == int(userData.uid)))
        elif userData.user_type == Types.driver:
            query = await session.exec(select(Driver).where(Driver.uid == int(userData.uid)))
        
        else:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = query.one_or_none()
        print(user)
        if user:
            return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
async def get_temp_user(token: str = Depends(oauth2_scheme), session=Depends(get_db_session)):
    try:
        # The jwt.decode function automatically validates expiry.
        # It will raise an ExpiredSignatureError if the 'exp' claim is in the past.
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Get the phone number from the token payload
        phone: str | None = payload.get("data")
        
        # Ensure the phone number exists in the payload
        if phone is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid request token")
        # Query the database for the temp user
        query = await session.exec(select(TempUsers).where(TempUsers.phone == phone))
        tempUser = query.one_or_none()
        
        # If the user exists, return it
        if tempUser:
            return tempUser
        
        # If the user does not exist in the database
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not in database")

    except ExpiredSignatureError:
        # Catch the specific expiry error for a clear response
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Expired token")
    except JWTError:
        # Catch any other general JWT decoding errors
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid request token")
