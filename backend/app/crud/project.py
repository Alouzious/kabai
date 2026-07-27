import uuid
from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def get_projects(db: Session, site: str = None, skip: int = 0, limit: int = 20):
    query = db.query(Project).filter(Project.is_deleted == False)
    if site:
        query = query.filter(Project.site == site)
    return query.order_by(Project.created_at.desc()).offset(skip).limit(limit).all()


def get_project_by_slug(db: Session, slug: str):
    return db.query(Project).filter(Project.slug == slug, Project.is_deleted == False).first()


def get_project(db: Session, project_id: uuid.UUID):
    return db.query(Project).filter(Project.id == project_id, Project.is_deleted == False).first()


def create_project(db: Session, project_in: ProjectCreate):
    project = Project(**project_in.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def update_project(db: Session, project: Project, project_in: ProjectUpdate):
    for field, value in project_in.model_dump(exclude_unset=True).items():
        setattr(project, field, value)
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project: Project):
    project.is_deleted = True
    db.commit()
