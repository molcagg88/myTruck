from fastapi import Depends, HTTPException
from app.db.main import get_db_session
from app.utils.authToken import get_current_user
from app.db.userModels import Bids, Customer, Driver
from app.db.driverRequestModels import CreateBidRequest, UpdateBidRequest
from app.db.responseModels import CommonResponse
from sqlmodel import select, and_


async def create_bid_svc(request: CreateBidRequest, session=Depends(get_db_session), user: Driver = Depends(get_current_user)):
    new_bid = Bids(job_id=request.job_id, amount=request.price, driver_id = user.uid)#type:ignore
    try:
        session.add(new_bid)
        await session.commit()
        await session.refresh(new_bid)

        return CommonResponse(success=True, data=new_bid.model_dump())
    except:
        raise HTTPException(500, detail="Unexpected error while trying to create bid")
    
async def update_bid_svc(request: UpdateBidRequest, session=Depends(get_db_session), user: Driver = Depends(get_current_user)):
    try:
        query = await session.exec(select(Bids).where(and_(Bids.id==request.id, Bids.driver_id==user.uid)))
        bid = query.one_or_none()
        
        bid.amount = request.price

        await session.commit()
        await session.refresh(bid)

        return CommonResponse(success=True, data=bid.model_dump())
    except:
        raise HTTPException(500, detail="Unexpected error while trying to update bid")


async def delete_bid_svc(bid_id: int, session=Depends(get_db_session), user: Driver = Depends(get_current_user)):
    try:
        query = await session.exec(select(Bids).where(and_(Bids.id==bid_id, Bids.driver_id==user.uid)))
        bid = query.one_or_none()
        
        await session.delete(bid)
        await session.commit()

        return CommonResponse(success=True)
    except:
        raise HTTPException(500, detail="Unexpected error while trying to update bid")

