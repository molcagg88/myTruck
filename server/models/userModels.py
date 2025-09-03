from pydantic import BaseModel
from .commonModels import Types

class User(BaseModel):
    type: Types
    active: bool
    fname: str
    lname: str
    phone: str
    pin: str

class UserTemp(BaseModel):
    phone: str

