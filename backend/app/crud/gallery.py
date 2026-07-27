import uuid
from sqlalchemy.orm import Session

from app.models.gallery import GalleryImage
from app.schemas.gallery import GalleryImageCreate


def get_gallery_images(db: Session, event_id: uuid.UUID = None, skip: int = 0, limit: int = 40):
    query = db.query(GalleryImage).filter(GalleryImage.is_deleted == False)
    if event_id:
        query = query.filter(GalleryImage.event_id == event_id)
    return query.order_by(GalleryImage.created_at.desc()).offset(skip).limit(limit).all()


def create_gallery_image(db: Session, image_in: GalleryImageCreate):
    image = GalleryImage(**image_in.model_dump())
    db.add(image)
    db.commit()
    db.refresh(image)
    return image


def delete_gallery_image(db: Session, image_id: uuid.UUID):
    image = db.query(GalleryImage).filter(GalleryImage.id == image_id, GalleryImage.is_deleted == False).first()
    if image:
        image.is_deleted = True
        db.commit()
    return image
