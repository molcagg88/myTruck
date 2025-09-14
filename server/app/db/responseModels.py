from pydantic import BaseModel

class TokenizedResponse(BaseModel):
    token: str
    data: dict