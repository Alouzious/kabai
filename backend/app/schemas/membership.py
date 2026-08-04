import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class MembershipRequestIn(BaseModel):
    name: str
    email: EmailStr
    role: str | None = None
    message: str | None = None
    site: str = "indabax"


class MembershipRequestOut(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    role: str | None
    message: str | None
    site: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
