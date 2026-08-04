import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import core_value as crud
from app.db.session import get_db
from app.schemas.core_value import CoreValueCreate, CoreValueUpdate, CoreValueOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/core-values", tags=["core_values"])


@router.get("/", response_model=list[CoreValueOut])
def list_core_values(site: str = None, db: Session = Depends(get_db)):
    return crud.get_core_values(db, site=site)


@router.post("/", response_model=CoreValueOut)
def create_core_value(
    value_in: CoreValueCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_core_value(db, value_in)


@router.put("/{value_id}", response_model=CoreValueOut)
def update_core_value(
    value_id: uuid.UUID, value_in: CoreValueUpdate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    value = crud.get_core_value(db, value_id)
    if not value:
        raise HTTPException(status_code=404, detail="Core value not found")
    return crud.update_core_value(db, value, value_in)


@router.delete("/{value_id}")
def delete_core_value(
    value_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    value = crud.get_core_value(db, value_id)
    if not value:
        raise HTTPException(status_code=404, detail="Core value not found")
    crud.delete_core_value(db, value)
    return {"message": "Core value deleted"}