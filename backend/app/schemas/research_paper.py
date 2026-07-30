import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict
from app.schemas.category import CategoryOut


class ResearchPaperBase(BaseModel):
    site: str = "main"
    title: str
    authors: str
    abstract: Optional[str] = None
    category_id: Optional[uuid.UUID] = None
    year: Optional[str] = None
    pdf_url: str


class ResearchPaperCreate(ResearchPaperBase):
    pass


class ResearchPaperOut(ResearchPaperBase):
    id: uuid.UUID
    category: Optional[CategoryOut] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)