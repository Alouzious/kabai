from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class CampaignResourceUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)


class CampaignResourceOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: str
    type_label: str
    file_path: Optional[str] = None
    external_url: Optional[str] = None
    original_filename: Optional[str] = None
    file_size: Optional[int] = None
    is_builtin: bool = False
    download_url: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class CampaignResourceListOut(BaseModel):
    items: list[CampaignResourceOut]
    constitution_available: bool


def type_label_for(category: str) -> str:
    return {
        "logo": "Logo",
        "image": "Image",
        "document_link": "Document",
        "document": "Document",
    }.get(category, "Document")


def validate_external_url(url: str) -> str:
    value = (url or "").strip()
    if not value.startswith(("http://", "https://")):
        raise ValueError("Document link must start with http:// or https://")
    return value
