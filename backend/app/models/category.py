# backend/app/models/category.py
import uuid
from datetime import datetime

from sqlalchemy import Column, String, Integer, DateTime, Boolean, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class Category(Base):
    __tablename__ = "categories"
    __table_args__ = (
        UniqueConstraint("slug", "type", name="uq_categories_slug_type"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False)  # no longer unique on its own
    type = Column(String, nullable=False)
    order = Column(Integer, default=0)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)