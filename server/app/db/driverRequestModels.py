from pydantic import BaseModel
from typing import Optional

class CreateBidRequest(BaseModel):
    job_id: int
    price: float

class UpdateBidRequest(BaseModel):
    id: int
    price: float
