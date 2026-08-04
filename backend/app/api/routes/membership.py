from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.crud import membership as crud
from app.db.session import get_db
from app.schemas.membership import MembershipRequestIn, MembershipRequestOut
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter(prefix="/api/v1/membership", tags=["membership"])


@router.post("/join", response_model=MembershipRequestOut)
@limiter.limit(settings.NEWSLETTER_RATE_LIMIT)
def join(request: Request, req_in: MembershipRequestIn, db: Session = Depends(get_db)):
    return crud.create_request(db, req_in)
