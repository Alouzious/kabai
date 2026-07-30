import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False, default="main")
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    excerpt = Column(Text)
    cover_image_url = Column(String)
    content = Column(Text)
    author = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    published_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)