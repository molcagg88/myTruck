from .commonModels import Types
from pydantic import BaseModel

class SendOTPRequest(BaseModel):
    phone: str

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str
class SigninRequest(BaseModel):
    pin: str
    phone: str

class SetDetialsRequest(BaseModel):
    type: Types
    fname: str
    lname: str
    phone: str
    pin: str
