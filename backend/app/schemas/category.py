import uuid
from pydantic import BaseModel, ConfigDict


class CategoryBase(BaseModel):
    name: str
    slug: str
    type: str  # "project" | "publication"
    order: int = 0


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)