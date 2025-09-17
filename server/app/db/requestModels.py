from pydantic import BaseModel
from typing import Optional
from app.db.commonModels import Types

class SendOTPRequest(BaseModel):
    phone: str

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str
class SigninRequest(BaseModel):
    user_type: Types
    pin: str
    phone: str

class SetDetialsRequest(BaseModel):
    type: Types
    fname: str
    lname: str
    plate_no: Optional[str] = None
    pin: str

