from datetime import datetime

from sqlalchemy import Column, String, DateTime

from app.db.base import Base


class SiteSetting(Base):
    __tablename__ = "site_settings"

    name = Column(String, primary_key=True)
    value = Column(String, nullable=False, default="")
    updated_at = Column(DateTime, default=datetime.utcnow)
