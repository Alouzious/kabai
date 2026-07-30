import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class ResearchPaper(Base):
    __tablename__ = "research_papers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False, default="main")
    title = Column(String, nullable=False)
    authors = Column(String, nullable=False)
    abstract = Column(Text)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)
    year = Column(String, nullable=True)
    pdf_url = Column(String, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    category = relationship("Category", lazy="joined")