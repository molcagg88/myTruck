from fastapi import Depends, HTTPException
from app.db.requestModels import SetDetialsRequest
from app.db.userModels import TempUsers, Customer, Driver
from app.db.commonModels import Types
from app.db.main import get_db_session
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from app.utils.authToken import create_access_token
from app.services.authService import hash_pin

from fastapi import HTTPException, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.exc import IntegrityError
from app.utils.authToken import get_current_user 

# Assuming the existence of:
# - hash_pin
# - create_access_token
# - TempUsers, Customer, Driver models
# - SetDetialsRequest Pydantic model

async def set_details_svc(
    request: SetDetialsRequest, 
    session: AsyncSession = Depends(get_db_session)
):
    try:
        # Check if the temporary user exists
        res = await session.exec(
            select(TempUsers).where(TempUsers.phone == request.phone)
        )
        user_temp = res.first()

        # Handle cases where the temporary user does not exist
        if not user_temp:
            query1 = await session.exec(select(Driver).where(Driver.phone == request.phone))
            driverExist = query1.one_or_none()
            if driverExist: return {"Internal": 101}

            query2 = await session.exec(select(Customer).where(Customer.phone == request.phone))
            customerExist = query2.one_or_none()
            if customerExist: return {"Internal": 102}
            else: return {"Internal": 106}

        # The core transaction logic
        # This is where we create a new user and delete the temporary user.
        if request.type == Types.customer:
            new_user = Customer(
                fname=request.fname,
                lname=request.lname,
                phone=request.phone,
                pin=hash_pin(request.pin)
            )
        elif request.type == Types.driver:
            new_user = Driver(
                fname=request.fname,
                lname=request.lname,
                phone=request.phone,
                pin=hash_pin(request.pin),
                plate_no=request.plate_no#type:ignore
            )
        else:
            return {"Internal": 107} # Unknown user type

        # Add new user and delete temporary user in a single transaction
        session.add(new_user)
        await session.delete(user_temp)

        # Commit all changes to the database
        await session.commit()
        await session.refresh(new_user)
        
        # Return a success message with the new user's token
        if request.type == Types.customer:
            return {"success": True, "token": create_access_token("c"+str(new_user.uid))}
        else: # Driver
            return {"success": True, "token": create_access_token("d"+str(new_user.uid))}

    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=400, detail="User already exists.")
    except Exception as e:
        await session.rollback()
        # Log the full exception for debugging
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

# async def delete_account_svc(user = )