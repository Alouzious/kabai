import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, ARRAY, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    cover_image_url = Column(String)
    abstract = Column(Text)
    description = Column(Text)
    tech_stack = Column(ARRAY(String), default=[])
    github_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    research_paper_id = Column(UUID(as_uuid=True), nullable=True)
    status = Column(String, default="ongoing")
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
