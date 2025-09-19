from fastapi import Depends, HTTPException
from app.db.requestModels import SetDetialsRequest
from app.db.userModels import TempUsers, Customer, Driver
from app.db.commonModels import Types
from app.db.main import get_db_session
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from app.utils.authToken import create_access_token
from app.services.authService import hash_pin
from app.db.responseModels import CommonResponse
from fastapi import HTTPException, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from app.utils.authToken import get_temp_user 

async def set_details_svc(
    request: SetDetialsRequest, 
    session: AsyncSession = Depends(get_db_session), tempUser = Depends(get_temp_user)
):
    print(request)
    try:
        res = await session.exec(
            select(TempUsers).where(TempUsers.phone == tempUser.phone)
        )
        user_temp = res.first()

        if not user_temp:
            query1 = await session.exec(select(Driver).where(Driver.phone == tempUser.phone))
            driverExist = query1.one_or_none()
            if driverExist: return {"Internal": 101}

            query2 = await session.exec(select(Customer).where(Customer.phone == tempUser.phone))
            customerExist = query2.one_or_none()
            if customerExist: return {"Internal": 102}
            else: return {"Internal": 106}


        if request.type == Types.customer:
            new_user = Customer(
                fname=request.fname,
                lname=request.lname,
                phone=tempUser.phone,
                pin=hash_pin(request.pin)
            )
        elif request.type == Types.driver:
            new_user = Driver(
                fname=request.fname,
                lname=request.lname,
                phone=tempUser.phone,
                pin=hash_pin(request.pin),
                plate_no=request.plate_no #type:ignore
            )
        else:
            return {"Internal": 107}

        session.add(new_user)
        await session.delete(user_temp)

        await session.commit()
        await session.refresh(new_user)
        
        if request.type == Types.customer:
            return CommonResponse(success= True, data={"token": create_access_token("c"+str(new_user.uid))})
        else: # Driver
            return CommonResponse(success = True, data={ "token": create_access_token("d"+str(new_user.uid))})

    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=400, detail="User already exists.")
    except Exception as e:
        await session.rollback()
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

# async def delete_account_svc(user = )