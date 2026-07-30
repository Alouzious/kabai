import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, Integer, DateTime, Boolean

from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class Slide(Base):
    __tablename__ = "slides"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False, default="main")
    image_url = Column(String, nullable=False)
    caption = Column(Text)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)