import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import slide as crud
from app.db.session import get_db
from app.schemas.slide import SlideCreate, SlideUpdate, SlideOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/slides", tags=["slides"])


@router.get("/", response_model=list[SlideOut])
def list_slides(site: str = None, db: Session = Depends(get_db)):
    return crud.get_slides(db, site=site, active_only=True)


@router.post("/", response_model=SlideOut)
def create_slide(
    slide_in: SlideCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_slide(db, slide_in)


@router.put("/{slide_id}", response_model=SlideOut)
def update_slide(
    slide_id: uuid.UUID, slide_in: SlideUpdate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    slide = crud.get_slide(db, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    return crud.update_slide(db, slide, slide_in)


@router.delete("/{slide_id}")
def delete_slide(
    slide_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    slide = crud.get_slide(db, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    crud.delete_slide(db, slide)
    return {"message": "Slide deleted"}