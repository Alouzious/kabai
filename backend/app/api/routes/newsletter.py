from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.crud import newsletter as crud
from app.db.session import get_db
from app.schemas.newsletter import NewsletterSubscribeIn, NewsletterOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/newsletter", tags=["newsletter"])


@router.post("/subscribe", response_model=NewsletterOut)
def subscribe(sub_in: NewsletterSubscribeIn, db: Session = Depends(get_db)):
    return crud.subscribe(db, sub_in)


@router.get("/subscribers", response_model=list[NewsletterOut])
def list_subscribers(
    site: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    return crud.get_subscribers(db, site=site)
