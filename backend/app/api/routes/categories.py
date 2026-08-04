import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import category as crud
from app.db.session import get_db
from app.schemas.category import CategoryCreate, CategoryOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/categories", tags=["categories"])


@router.get("/", response_model=list[CategoryOut])
def list_categories(type: str = None, db: Session = Depends(get_db)):
    return crud.get_categories(db, type=type)


@router.post("/", response_model=CategoryOut)
def create_category(
    category_in: CategoryCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_category(db, category_in)


@router.delete("/{category_id}")
def delete_category(
    category_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    category = crud.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    crud.delete_category(db, category)
    return {"message": "Category deleted"}