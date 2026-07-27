import uuid
from sqlalchemy.orm import Session

from app.models.research_paper import ResearchPaper
from app.schemas.research_paper import ResearchPaperCreate


def get_papers(db: Session, category: str = None, year: str = None, skip: int = 0, limit: int = 20):
    query = db.query(ResearchPaper).filter(ResearchPaper.is_deleted == False)
    if category:
        query = query.filter(ResearchPaper.category == category)
    if year:
        query = query.filter(ResearchPaper.year == year)
    return query.order_by(ResearchPaper.created_at.desc()).offset(skip).limit(limit).all()


def get_paper(db: Session, paper_id: uuid.UUID):
    return db.query(ResearchPaper).filter(ResearchPaper.id == paper_id, ResearchPaper.is_deleted == False).first()


def create_paper(db: Session, paper_in: ResearchPaperCreate):
    paper = ResearchPaper(**paper_in.model_dump())
    db.add(paper)
    db.commit()
    db.refresh(paper)
    return paper


def delete_paper(db: Session, paper: ResearchPaper):
    paper.is_deleted = True
    db.commit()
