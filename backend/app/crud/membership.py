from sqlalchemy.orm import Session

from app.models.membership import MembershipRequest
from app.schemas.membership import MembershipRequestIn


def create_request(db: Session, req_in: MembershipRequestIn):
    req = MembershipRequest(**req_in.model_dump())
    db.add(req)
    db.commit()
    db.refresh(req)
    return req
