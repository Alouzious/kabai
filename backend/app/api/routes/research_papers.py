import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.crud import research_paper as crud
from app.db.session import get_db
from app.schemas.research_paper import ResearchPaperCreate, ResearchPaperOut
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/v1/research-papers", tags=["research_papers"])


@router.get("/", response_model=list[ResearchPaperOut])
def list_papers(
    category: str = None,
    year: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_papers(db, category=category, year=year, skip=skip, limit=limit)


@router.post("/", response_model=ResearchPaperOut)
def create_paper(
    paper_in: ResearchPaperCreate, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    return crud.create_paper(db, paper_in)


@router.delete("/{paper_id}")
def delete_paper(
    paper_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    paper = crud.get_paper(db, paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    crud.delete_paper(db, paper)
    return {"message": "Paper deleted"}
