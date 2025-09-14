from .commonModels import Types
from pydantic import BaseModel, field_validator, ValidationInfo
from sqlmodel import SQLModel, Field, Column, ForeignKey, Relationship
from uuid import UUID, uuid4
from typing import List, Union, Optional
import sqlalchemy.dialects.postgresql as pg
from sqlalchemy.orm import relationship
from sqlalchemy import TIMESTAMP
from datetime import datetime, timezone



class User(BaseModel):
    type: Types
    active: bool
    fname: str
    lname: str
    phone: str
    pin: str

class UserTemp(BaseModel):
    phone: str

class TempUsers(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True) 
    phone: str    

    
class OTPs(SQLModel, table=True):
    id: Optional[int] = Field(default = None, primary_key=True, index=True)
    phone: str
    otp: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

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

    jobs: List["Jobs"] = Relationship(back_populates= "customer")

class CustomerPydantic(BaseModel):
    class Config:
        from_attributes = True
    uid: int
    fname: str
    lname: str
    phone: str 
    pin: str

class CustomerPublic(BaseModel):
    type: str = Types.customer
    uid: int
    fname: str
    lname: str
    phone: str 

class Driver(SQLModel, table=True):
    uid: Optional[int] = Field(default=None,  primary_key=True, index=True)
    fname: str
    lname: str
    phone: str = Field(unique=True)
    pin: str
    plate_no: str

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    jobs: List["Jobs"] = Relationship(back_populates= "driver")
    bids: List["Bids"] = Relationship(back_populates = "driver")

class DriverPydantic(BaseModel):
    class Config:
        from_attributes = True
    uid: int
    fname: str
    lname: str
    phone: str
    pin: str
    plate_no: str

class DriverPublic(BaseModel):
    type: str = Types.driver
    uid: int
    fname: str
    lname: str
    phone: str
    plate_no: str


class Jobs(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    pickup: str
    dropoff: str
    price: float = Field(index=True)
    weight: int
    category: str

    customer_id: int = Field(
        sa_column=Column(
            ForeignKey("customer.uid"),
            nullable=False,
            index=True
        )
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )
    driver_id: Optional[int] = Field(
        sa_column=Column(
            ForeignKey("driver.uid"),
            nullable=True,
            index=True
        )
    )
    customer: Optional[Customer] = Relationship(back_populates="jobs")  # type: ignore
    driver: Optional[Driver] = Relationship(back_populates="jobs")
    bids: List["Bids"] = Relationship(back_populates="job")

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
    customer_id: Optional[int] = None

class DelJob(BaseModel):
    id: int

class Bids(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    job_id: int = Field(foreign_key="jobs.id")
    driver_id: int = Field(foreign_key="driver.uid")
    amount: float
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(TIMESTAMP(timezone=True), nullable=False)
    )

    driver: Optional["Driver"] = Relationship(back_populates="bids")
    job: Optional["Jobs"] = Relationship(back_populates="bids")

class BidRequest(BaseModel):
    amount: float
    job_id: int

class BidUpdate(BaseModel):
    job_id: int
    amount: float

class DelBid(BaseModel):
    id: int

class PaginationModel(BaseModel):
    limit: int
    offset: int



