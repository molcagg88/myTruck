from app.db.requestModels import SendOTPRequest, VerifyOTPRequest
import random
import hashlib
import time
from fastapi import HTTPException, Depends
from sqlmodel import select
from app.db.userModels import TempUsers, Driver, Customer, OTPs, UserTemp
from app.db.main import get_db_session
from datetime import datetime, timezone, timedelta

def generate_otp(length=6):
    return ''.join([str(random.randint(0,9)) for _ in range(length)])

def hash_otp(otp: str):
    return hashlib.sha256(otp.encode()).hexdigest()


async def send_otp_svc(request: SendOTPRequest, session= Depends(get_db_session)):
    otp = generate_otp()
    hashed = hash_otp(otp)
    
    tempUser = await session.exec(select(TempUsers).where(TempUsers.phone == request.phone))
    if len(tempUser.all()) > 0:
        return {"internal":100}
    existingDriver = await session.exec(select(Driver).where(Driver.phone==request.phone))
    if len(existingDriver.all()) > 0:
        return {"internal":101}
    existingCustomer = await session.exec(select(Customer).where(Customer.phone==request.phone))
    if len(existingCustomer.all()) > 0:
        return {"internal":102}

    newOtp = OTPs(phone = request.phone, otp = hashed)
    session.add(newOtp)
    await session.commit()
    await session.refresh(newOtp)
    
    # In real system, send OTP via SMS
    print(f"OTP for {request.phone}: {otp}")

    return {"success": True}


async def verify_otp_svc(request: VerifyOTPRequest, session=Depends(get_db_session)):
    
    response = await session.exec(select(OTPs).where(OTPs.phone==request.phone).order_by(OTPs.created_at.desc()))
    otp = response.first()
    expiry_time = timedelta(minutes=10)

    if otp:
        if otp.created_at + expiry_time < datetime.now(timezone.utc):
            session.delete(otp)
            await session.commit()

            return {"Internal":105}
        
        if otp.otp == hash_otp(request.otp):
            session.delete(otp)
            
            newUserTemp = TempUsers(phone=request.phone)
            session.add(newUserTemp)
            await session.commit()

            return {"success":True}
        
        else:
            return {"Internal":104}
    else:
        return {"Internal":103}
        