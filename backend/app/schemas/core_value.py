import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class CoreValueBase(BaseModel):
    site: str = "main"
    title: str
    description: Optional[str] = None
    icon_name: str = "Sparkles"
    order: int = 0


class CoreValueCreate(CoreValueBase):
    pass


class CoreValueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon_name: Optional[str] = None
    order: Optional[int] = None


class CoreValueOut(CoreValueBase):
    id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)