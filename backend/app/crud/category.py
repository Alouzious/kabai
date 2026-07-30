import uuid
from sqlalchemy.orm import Session

from app.models.category import Category
from app.schemas.category import CategoryCreate


def get_categories(db: Session, type: str = None):
    query = db.query(Category).filter(Category.is_deleted == False)
    if type:
        query = query.filter(Category.type == type)
    return query.order_by(Category.order.asc(), Category.name.asc()).all()


def get_category(db: Session, category_id: uuid.UUID):
    return db.query(Category).filter(Category.id == category_id, Category.is_deleted == False).first()


def create_category(db: Session, category_in: CategoryCreate):
    category = Category(**category_in.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def delete_category(db: Session, category: Category):
    category.is_deleted = True
    db.commit()