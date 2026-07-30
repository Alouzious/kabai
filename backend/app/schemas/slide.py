import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class SlideBase(BaseModel):
    site: str = "main"
    image_url: str
    caption: Optional[str] = None
    order: int = 0
    is_active: bool = True


class SlideCreate(SlideBase):
    pass


class SlideUpdate(BaseModel):
    image_url: Optional[str] = None
    caption: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class SlideOut(SlideBase):
    id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)