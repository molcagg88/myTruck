from fastapi import APIRouter, Depends
from app.services.bidService import create_bid_svc, delete_bid_svc, update_bid_svc
from app.db.driverRequestModels import CreateBidRequest, UpdateBidRequest

bid_router = APIRouter(prefix="/bids")

@bid_router.post("/")
async def create_bid(request: CreateBidRequest, createbidServiceResponse=Depends(create_bid_svc)):
    return createbidServiceResponse

@bid_router.patch("/")
async def update_bid(request: UpdateBidRequest, updatebidResponse = Depends(update_bid_svc)):
    return updatebidResponse

@bid_router.delete("/{bid_id}")
async def delete_bid(bid_id:int, deletebidResponse = Depends(delete_bid_svc)):
    return deletebidResponse