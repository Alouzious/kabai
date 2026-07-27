import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    site = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    bio = Column(Text)
    photo_url = Column(String)
    year = Column(Integer, nullable=False)
    is_current = Column(Boolean, default=True)
    is_alumni_active = Column(Boolean, default=False)
    linkedin_url = Column(String, nullable=True)
    twitter_url = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
