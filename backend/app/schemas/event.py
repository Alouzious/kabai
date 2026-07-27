import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class EventBase(BaseModel):
    site: str
    title: str
    description: Optional[str] = None
    banner_url: Optional[str] = None
    event_date: datetime
    is_past: bool = False


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    banner_url: Optional[str] = None
    event_date: Optional[datetime] = None
    is_past: Optional[bool] = None


class EventOut(EventBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
