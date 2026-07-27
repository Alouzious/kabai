import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.crud import project as crud
from app.db.session import get_db
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


@router.get("/", response_model=list[ProjectOut])
def list_projects(
    site: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_projects(db, site=site, skip=skip, limit=limit)


@router.get("/{slug}", response_model=ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = crud.get_project_by_slug(db, slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=ProjectOut)
def create_project(
    project_in: ProjectCreate, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    if crud.get_project_by_slug(db, project_in.slug):
        raise HTTPException(status_code=400, detail="Slug already exists")
    return crud.create_project(db, project_in)


@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: uuid.UUID,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    _user=Depends(get_current_user),
):
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return crud.update_project(db, project, project_in)


@router.delete("/{project_id}")
def delete_project(
    project_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    crud.delete_project(db, project)
    return {"message": "Project deleted"}
