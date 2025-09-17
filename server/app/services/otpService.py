from app.db.requestModels import SendOTPRequest, VerifyOTPRequest
import random
import hashlib
import time
from fastapi import HTTPException, Depends
from sqlmodel import select
from app.db.userModels import TempUsers, Driver, Customer, OTPs, UserTemp
from app.db.responseModels import CommonResponse
from app.db.main import get_db_session
from datetime import datetime, timezone, timedelta
from app.utils.authToken import create_temp_token
import secrets

def generate_otp(length=6):
    return ''.join([str(random.randint(0,9)) for _ in range(length)])

def hash_otp(otp: str):
    return hashlib.sha256(otp.encode()).hexdigest()


async def send_otp_svc(request: SendOTPRequest, session= Depends(get_db_session)):

    otp = generate_otp()
    hashed = hash_otp(otp)
    
    existingDriver = await session.exec(select(Driver).where(Driver.phone==request.phone))
    if existingDriver.first():
        return {"internal":101}
    existingCustomer = await session.exec(select(Customer).where(Customer.phone==request.phone))
    if existingCustomer.first():
        return {"internal":102}

    query = await session.exec(select(OTPs).where(OTPs.phone==request.phone).with_for_update())
    existing = query.all()
    if existing:
        for i in existing:
            await session.delete(i)

    newOtp = OTPs(phone = request.phone, otp = hashed)
    session.add(newOtp)
    await session.commit()
    
    # In real system, send OTP via SMS
    print(f"OTP for {request.phone}: {otp}")

    return CommonResponse(success=True)


async def verify_otp_svc(request: VerifyOTPRequest, session=Depends(get_db_session)):
    temp_exists = False
    query = await session.exec(select(TempUsers).where(TempUsers.phone==request.phone))
    if query.first():
        temp_exists = True
    response = await session.exec(select(OTPs).where(OTPs.phone==request.phone).order_by(OTPs.created_at.desc()).with_for_update())
    otp = response.first()
    expiry_time = timedelta(minutes=10)

    if otp:
        if otp.created_at + expiry_time < datetime.now(timezone.utc):
            await session.delete(otp)
            await session.commit()

            return {"Internal":105}
        
        if not secrets.compare_digest(otp.otp, hash_otp(request.otp)):
            return {"Internal":104}
        
        await session.delete(otp)

        if not temp_exists:
            newUserTemp = TempUsers(phone=request.phone)
            session.add(newUserTemp)

        await session.commit()
        return CommonResponse(success=True, data={"token":create_temp_token(request.phone)})
                    
    else:
        return {"Internal":103}
        