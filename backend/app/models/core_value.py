import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, Integer, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class CoreValue(Base):
    __tablename__ = "core_values"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False, default="main")
    title = Column(String, nullable=False)
    description = Column(Text)
    icon_name = Column(String, default="Sparkles")  # lucide-react icon name
    order = Column(Integer, default=0)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)