from pydantic import BaseModel
from typing import Optional

class CreateJobRequest(BaseModel):
    pickup: str
    dropoff: str
    weight: int
    category: str
    price: float

class UpdateJobRequest(BaseModel):
    id: int
    pickup: Optional[str] = None
    dropoff: Optional[str] = None
    weight: Optional[int] = None
    category: Optional[str] = None
    price: Optional[float] = None