import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class BlogPostBase(BaseModel):
    site: str = "main"
    title: str
    slug: str
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    is_published: bool = True
    published_at: Optional[datetime] = None


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image_url: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    is_published: Optional[bool] = None
    published_at: Optional[datetime] = None


class BlogPostOut(BlogPostBase):
    id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)