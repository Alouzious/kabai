import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class MembershipRequest(Base):
    __tablename__ = "membership_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    role = Column(String)
    message = Column(Text)
    site = Column(String, nullable=False, default="indabax")
    created_at = Column(DateTime, default=datetime.utcnow)
