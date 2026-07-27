import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class GalleryImageBase(BaseModel):
    event_id: uuid.UUID
    image_url: str
    year: Optional[str] = None


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImageOut(GalleryImageBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
