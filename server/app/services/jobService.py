from fastapi import Depends, HTTPException
from app.utils.authToken import get_current_user
from app.db.customerRequestModels import CreateJobRequest, UpdateJobRequest
from app.db.userModels import Customer, Driver, Bids
from app.db.userModels import Jobs
from sqlmodel import select, and_
from sqlalchemy.orm import selectinload
from typing import List
from app.db.main import get_db_session

from app.db.responseModels import CommonResponse

from app.utils.commonUtils import update_if_changed

async def job_feed_svc(session = Depends(get_db_session), user: Driver = Depends(get_current_user)):
    try:
        query = await session.exec(select(Jobs).where(Jobs.driver_id==None).order_by(Jobs.created_at.desc()))#type:ignore
        job_feed = query.all()
    except:
        raise HTTPException(500, detail="unknown error occured while fetching jobs")
    return job_feed


async def create_job_svc(request: CreateJobRequest, session = Depends(get_db_session), user: Customer = Depends(get_current_user)):
    newJob = Jobs(driver_id=None, customer_id=user.uid, pickup=request.pickup, dropoff=request.dropoff, weight = request.weight, category=request.category, price = request.price)#type: ignore
    try:
        session.add(newJob)
        await session.commit()
        await session.refresh(newJob)
        return CommonResponse(success=True, data = newJob.model_dump())
    
    except:
        await session.rollback()
        raise HTTPException(500, detail="Unknown error during creating job")
    
async def update_job_svc(request: UpdateJobRequest, session = Depends(get_db_session), user: Customer = Depends(get_current_user)):
    try:
        query = await session.exec(select(Jobs).where(Jobs.id==request.id).with_for_update())
        job = query.one_or_none()
        if job.customer_id!=user.uid:
            raise HTTPException(401, detail="Unauthorized")
        
        itemUpdate_db = request.model_dump(exclude_unset=True)
        cleaned_dict = {k: v for k, v in itemUpdate_db.items() if v is not None}
        update_if_changed(job, cleaned_dict)

        await session.commit()
        await session.refresh(job)

        return CommonResponse(success=True, data=job)

    except:
        await session.rollback()
        
async def delete_job_svc(job_id: int, session = Depends(get_db_session), user: Customer = Depends(get_current_user)):
    try:
        query = await session.exec(select(Jobs).where(and_(Jobs.customer_id==user.uid, Jobs.id==job_id)).with_for_update())
        job = query.one_or_none()

        try:
            await session.delete(job)
            await session.commit()

            return CommonResponse(success=True)
        except:
            raise HTTPException(500, detail="Unexpected error while deleting job")
    except:
        raise HTTPException(500, detail="Unexpected error while fetching job to delete")
    
async def show_bids_svc(job_id: int, session=Depends(get_db_session), user: Customer = Depends(get_current_user)):
    try:
        query = await session.exec(select(Jobs).where(and_(Jobs.id==job_id, Jobs.customer_id==user.uid)).options(selectinload(Jobs.bids)))
        job = query.one_or_none()
        return job.bids
    
    except:
        raise HTTPException(500, detail="Unexpected error while fetched bids")