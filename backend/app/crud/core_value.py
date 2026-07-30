import uuid
from sqlalchemy.orm import Session

from app.models.core_value import CoreValue
from app.schemas.core_value import CoreValueCreate, CoreValueUpdate


def get_core_values(db: Session, site: str = None):
    query = db.query(CoreValue).filter(CoreValue.is_deleted == False)
    if site:
        query = query.filter(CoreValue.site == site)
    return query.order_by(CoreValue.order.asc()).all()


def get_core_value(db: Session, value_id: uuid.UUID):
    return db.query(CoreValue).filter(CoreValue.id == value_id, CoreValue.is_deleted == False).first()


def create_core_value(db: Session, value_in: CoreValueCreate):
    value = CoreValue(**value_in.model_dump())
    db.add(value)
    db.commit()
    db.refresh(value)
    return value


def update_core_value(db: Session, value: CoreValue, value_in: CoreValueUpdate):
    for field, val in value_in.model_dump(exclude_unset=True).items():
        setattr(value, field, val)
    db.commit()
    db.refresh(value)
    return value


def delete_core_value(db: Session, value: CoreValue):
    value.is_deleted = True
    db.commit()