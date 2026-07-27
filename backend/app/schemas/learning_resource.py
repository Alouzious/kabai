import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class LearningResourceBase(BaseModel):
    title: str
    category: str
    difficulty: str = "beginner"
    description: Optional[str] = None
    cover_image_url: Optional[str] = None
    video_url: Optional[str] = None
    document_url: Optional[str] = None


class LearningResourceCreate(LearningResourceBase):
    pass


class LearningResourceOut(LearningResourceBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
