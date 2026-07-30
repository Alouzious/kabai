import uuid
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, ConfigDict
from app.schemas.category import CategoryOut


class ProjectBase(BaseModel):
    site: str
    title: str
    slug: str
    cover_image_url: Optional[str] = None
    abstract: Optional[str] = None
    description: Optional[str] = None
    tech_stack: List[str] = []
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    research_paper_id: Optional[uuid.UUID] = None
    category_id: Optional[uuid.UUID] = None
    status: str = "ongoing"


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    cover_image_url: Optional[str] = None
    abstract: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    category_id: Optional[uuid.UUID] = None
    status: Optional[str] = None


class ProjectOut(ProjectBase):
    id: uuid.UUID
    category: Optional[CategoryOut] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)