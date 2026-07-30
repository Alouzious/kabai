import uuid
from sqlalchemy.orm import Session

from app.models.slide import Slide
from app.schemas.slide import SlideCreate, SlideUpdate


def get_slides(db: Session, site: str = None, active_only: bool = True):
    query = db.query(Slide).filter(Slide.is_deleted == False)
    if site:
        query = query.filter(Slide.site == site)
    if active_only:
        query = query.filter(Slide.is_active == True)
    return query.order_by(Slide.order.asc()).all()


def get_slide(db: Session, slide_id: uuid.UUID):
    return db.query(Slide).filter(Slide.id == slide_id, Slide.is_deleted == False).first()


def create_slide(db: Session, slide_in: SlideCreate):
    slide = Slide(**slide_in.model_dump())
    db.add(slide)
    db.commit()
    db.refresh(slide)
    return slide


def update_slide(db: Session, slide: Slide, slide_in: SlideUpdate):
    for field, value in slide_in.model_dump(exclude_unset=True).items():
        setattr(slide, field, value)
    db.commit()
    db.refresh(slide)
    return slide


def delete_slide(db: Session, slide: Slide):
    slide.is_deleted = True
    db.commit()