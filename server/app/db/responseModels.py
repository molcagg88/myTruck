from pydantic import BaseModel
from typing import Optional
from sqlmodel import SQLModel

class TokenizedResponse(BaseModel):
    token: str
    data: dict

class CommonResponse(BaseModel):
    success: bool
    data: Optional[dict | SQLModel | BaseModel] = None
