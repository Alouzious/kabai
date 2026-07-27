import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class NewsletterSubscribeIn(BaseModel):
    email: EmailStr
    site: str


class NewsletterOut(BaseModel):
    id: uuid.UUID
    email: str
    site: str
    subscribed_at: datetime

    model_config = ConfigDict(from_attributes=True)
