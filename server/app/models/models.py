from pydantic import BaseModel, field_validator, ValidationInfo
from sqlmodel import SQLModel, Field, Column, ForeignKey, Relationship
from uuid import UUID, uuid4
from typing import List, Union
import sqlalchemy.dialects.postgresql as pg
from sqlalchemy.orm import relationship
from sqlalchemy import Column, TIMESTAMP
from datetime import datetime, timezone
from typing import Optional
from enum import Enum


class TokenModel(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

class UserType(str, Enum):
    customer = "customer"
    driver = "driver"

class RegisterModel(BaseModel):
    userType: UserType
    fname: str
    lname: str
    phone: str
    pin: str
    
class LoginModel(BaseModel):
    phone: str
    pin: str

class Customer(SQLModel, table=True):
    uid: Optional[int] = Field(default=None, primary_key=True, index=True)
    fname: str
    lname: str
    phone: str = Field(unique=True)
    pin: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    Jobs: List["Job"] = Relationship(back_populates= "seller")
    bids: List["Bids"] = Relationship(back_populates = "user")

class CustomerPydantic(BaseModel):
    class Config:
        from_attributes = True
    uid: int
    fname: str
    lname: str
    phone: str 
    pin: str

class Driver(SQLModel, table=True):
    uid: Optional[int] = Field(default=None,  primary_key=True, index=True)
    fname: str
    lname: str
    phone: str = Field(unique=True)
    pin: str

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    Jobs: List["Job"] = Relationship(back_populates= "seller")
    bids: List["Bids"] = Relationship(back_populates = "user")

class DriverPydantic(BaseModel):
    class Config:
        from_attributes = True
    uid: int
    fname: str
    lname: str
    phone: str 
    pin: str


class Job(SQLModel, table=True):
    id: int = Field(primary_key=True)
    pickup: str
    dropoff: str
    price: float = Field(index=True)
    weight: int
    category: str

    customer_id: UUID = Field(
        sa_column=Column(
            ForeignKey("user.uid"),
            nullable=False,
            index=True
        )
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    customer: Optional[Customer] = Relationship(back_populates="Jobs")  # type: ignore


class JobCreate(BaseModel):
    @field_validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError("Price must be positive")
        return v
    pickup: str
    dropoff: str
    price: float
    weight: int
    category: str
    
class JobUpdate(BaseModel):
    id: int
    pickup: Optional[str] = None
    dropoff: Optional[str] = None
    price: Optional[float] = None
    weight: Optional[int] = None
    category: Optional[str] = None
    
class JobPydantic(BaseModel):
    id: Optional[int] = None
    pickup: str
    dropoff: str
    price: float
    weight: int
    category: str
    customer_id: Optional[UUID] = None

class DelJob(BaseModel):
    id: int





class Status(str, Enum):
    upcoming = "UPCOMING"
    live = "LIVE"
    ended = "ENDED"


class PaginationModel(BaseModel):
    limit: int
    offset: int

class Bids(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    job_id: int = Field(foreign_key="job.id")
    driver_id: UUID = Field(foreign_key="user.uid")
    amount: float
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    driver: Optional["Driver"] = Relationship(back_populates="bids")
    job: Job = Relationship(back_populates="bids")
class BidRequest(BaseModel):
    amount: float
    job_id: int

class BidUpdate(BaseModel):
    job_id: int
    amount: float

class UserPublic(BaseModel):
    phone: str
    fname: str
    lname: str

class BidBroadcast(BaseModel):
    id: int
    job_id: Optional[int]=None
    driver: Optional[UserPublic]=None
    amount: float
    created_at: str

class Fetch_ended_truth(BaseModel):
    truth: bool

class RenewReq(BaseModel):
    auction_id: int
    starting_time: Optional[datetime] = None
    ending_time: Optional[datetime] = None
    new_starting_price: Optional[float] = None

class TimeGenResponse(BaseModel):
    starting_time: datetime
    ending_time: datetime