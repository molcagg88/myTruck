from fastapi import APIRouter, Depends
from app.utils.authToken import get_current_user
from app.db.main import get_db_session

from app.db.customerRequestModels import CreateJobRequest, UpdateJobRequest
from app.db.userModels import Customer, Driver
from app.services.jobService import create_job_svc, job_feed_svc, update_job_svc, delete_job_svc, show_bids_svc

job_router = APIRouter(prefix="/jobs")

@job_router.get("/")
async def job_feed(jobFeedServiceResponse = Depends(job_feed_svc)):
    return jobFeedServiceResponse

@job_router.get("/show_bids/{job_id}")
async def bid_feed(job_id: int, bidFeedServiceResponse = Depends(show_bids_svc)):
    return bidFeedServiceResponse

@job_router.post("/")
async def create_job(request: CreateJobRequest, createJobServiceResponse=Depends(create_job_svc)):
    return createJobServiceResponse

@job_router.patch("/")
async def update_job(request: UpdateJobRequest, updateJobResponse = Depends(update_job_svc)):
    return updateJobResponse

@job_router.delete("/{job_id}")
async def delete_job(job_id:int, deleteJobResponse = Depends(delete_job_svc)):
    return deleteJobResponse