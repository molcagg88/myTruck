from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import AsyncGenerator

from ..config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)

async def init_db():
    async with engine.begin() as conn:
        # Note: You need to import your models for this to work
        from .userModels import Driver, Customer,Bids, Jobs, OTPs, TempUsers
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        yield session

# Note: The get_db_session() function is no longer needed with this approach.
# You can remove it.