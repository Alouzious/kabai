import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, BigInteger
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class CampaignResource(Base):
    __tablename__ = "campaign_resources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)  # logo | image | document_link
    file_path = Column(String, nullable=True)
    external_url = Column(String, nullable=True)
    original_filename = Column(String, nullable=True)
    file_size = Column(BigInteger, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
