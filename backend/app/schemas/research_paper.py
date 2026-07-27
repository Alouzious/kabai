import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ResearchPaperBase(BaseModel):
    title: str
    authors: str
    abstract: Optional[str] = None
    category: Optional[str] = None
    year: Optional[str] = None
    pdf_url: str


class ResearchPaperCreate(ResearchPaperBase):
    pass


class ResearchPaperOut(ResearchPaperBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
