from app.db.requestModels import SigninRequest
import hashlib
from fastapi import Depends
from fastapi import HTTPException
from app.utils.authToken import create_access_token
from app.db.main import get_db_session
from app.db.userModels import Driver, Customer, DriverPublic, CustomerPublic
from sqlmodel import select
from app.db.responseModels import TokenizedResponse
from app.db.commonModels import Types, TokenDataModel


def hash_pin(pin: str):
    return hashlib.sha256(pin.encode()).hexdigest()

async def signin_svc(request: SigninRequest, session = Depends(get_db_session)):

    if request.user_type==Types.driver:
        query = await session.exec(select(Driver).where(Driver.phone==request.phone))
    elif request.user_type==Types.customer:
        query = await session.exec(select(Customer).where(Customer.phone==request.phone))
    else:
        raise HTTPException(400, detail="Bad request")
    
    user = query.first()
    if not user:
        raise HTTPException(404, detail="Account not found")
    
    if hash_pin(request.pin) != user.pin:
        raise HTTPException(401, detail="Wrong pin")
    
    if isinstance(user, Driver):
        payload = TokenDataModel(uid=user.uid, user_type=Types.driver)
        return TokenizedResponse(token=create_access_token(payload.model_dump()), data={"success":True})
    elif isinstance(user, Customer):
        payload = TokenDataModel(uid=user.uid, user_type=Types.customer)
        return TokenizedResponse(token=create_access_token(payload.model_dump()), data={"success":True})
    

    raise HTTPException(500, detail="Signin failed")