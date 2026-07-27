import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TeamMemberBase(BaseModel):
    site: str
    name: str
    role: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    year: int
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    is_alumni_active: bool = False


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    year: Optional[int] = None
    is_current: Optional[bool] = None
    is_alumni_active: Optional[bool] = None


class TeamMemberOut(TeamMemberBase):
    id: uuid.UUID
    is_current: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
