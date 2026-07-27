import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.crud import learning_resource as crud
from app.db.session import get_db
from app.schemas.learning_resource import LearningResourceCreate, LearningResourceOut
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/v1/learning", tags=["learning"])


@router.get("/", response_model=list[LearningResourceOut])
def list_resources(
    category: str = None,
    difficulty: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_resources(db, category=category, difficulty=difficulty, skip=skip, limit=limit)


@router.post("/", response_model=LearningResourceOut)
def create_resource(
    resource_in: LearningResourceCreate, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    return crud.create_resource(db, resource_in)


@router.delete("/{resource_id}")
def delete_resource(
    resource_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    crud.delete_resource(db, resource_id)
    return {"message": "Resource deleted"}
