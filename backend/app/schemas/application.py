import uuid
from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ApplicationIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    position: str = Field(min_length=2, max_length=100)
    faculty: str = Field(min_length=2, max_length=150)
    year_of_study: Optional[str] = Field(default=None, max_length=40)
    phone: str = Field(min_length=7, max_length=30)
    email: Optional[EmailStr] = None
    reason: str = Field(min_length=10, max_length=2000)


class ApplicationOut(BaseModel):
    id: uuid.UUID
    site: str
    name: str
    position: str
    faculty: str
    year_of_study: Optional[str]
    phone: str
    email: Optional[str]
    reason: str
    status: str
    created_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)


class ApplicationStatusUpdate(BaseModel):
    status: Literal["new", "shortlisted", "rejected"]
