import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class LeadershipApplication(Base):
    __tablename__ = "leadership_applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False, default="indabax")
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    faculty = Column(String, nullable=False)
    year_of_study = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    reason = Column(Text, nullable=False)
    status = Column(String, nullable=False, default="new")
    created_at = Column(DateTime, default=datetime.utcnow)
