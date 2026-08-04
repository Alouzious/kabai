import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.crud import gallery as crud
from app.db.session import get_db
from app.schemas.gallery import GalleryImageCreate, GalleryImageOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/gallery", tags=["gallery"])


@router.get("/", response_model=list[GalleryImageOut])
def list_images(
    event_id: uuid.UUID = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(40, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return crud.get_gallery_images(db, event_id=event_id, skip=skip, limit=limit)


@router.post("/", response_model=GalleryImageOut)
def upload_image(
    image_in: GalleryImageCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_gallery_image(db, image_in)


@router.delete("/{image_id}")
def delete_image(
    image_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    crud.delete_gallery_image(db, image_id)
    return {"message": "Image deleted"}
