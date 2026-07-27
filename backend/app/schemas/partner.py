import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class PartnerBase(BaseModel):
    site: str
    name: str
    logo_url: str
    website_url: Optional[str] = None


class PartnerCreate(PartnerBase):
    pass


class PartnerOut(PartnerBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
