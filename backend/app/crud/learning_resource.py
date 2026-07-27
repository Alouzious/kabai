import uuid
from sqlalchemy.orm import Session

from app.models.learning_resource import LearningResource
from app.schemas.learning_resource import LearningResourceCreate


def get_resources(db: Session, category: str = None, difficulty: str = None, skip: int = 0, limit: int = 20):
    query = db.query(LearningResource).filter(LearningResource.is_deleted == False)
    if category:
        query = query.filter(LearningResource.category == category)
    if difficulty:
        query = query.filter(LearningResource.difficulty == difficulty)
    return query.order_by(LearningResource.created_at.desc()).offset(skip).limit(limit).all()


def create_resource(db: Session, resource_in: LearningResourceCreate):
    resource = LearningResource(**resource_in.model_dump())
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource


def delete_resource(db: Session, resource_id: uuid.UUID):
    resource = db.query(LearningResource).filter(
        LearningResource.id == resource_id, LearningResource.is_deleted == False
    ).first()
    if resource:
        resource.is_deleted = True
        db.commit()
    return resource
