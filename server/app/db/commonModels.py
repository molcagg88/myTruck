from enum import Enum
from pydantic import BaseModel
class Types(str, Enum):
    customer = "customer"
    driver = "driver"

class TokenDataModel(BaseModel):
    uid: int
    user_type: Types