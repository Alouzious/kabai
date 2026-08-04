import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.crud import partner as crud
from app.db.session import get_db
from app.schemas.partner import PartnerCreate, PartnerOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/partners", tags=["partners"])


@router.get("/", response_model=list[PartnerOut])
def list_partners(
    site: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_partners(db, site=site, skip=skip, limit=limit)


@router.post("/", response_model=PartnerOut)
def create_partner(
    partner_in: PartnerCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_partner(db, partner_in)


@router.delete("/{partner_id}")
def delete_partner(
    partner_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    crud.delete_partner(db, partner_id)
    return {"message": "Partner deleted"}
