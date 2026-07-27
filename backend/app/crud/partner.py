import uuid
from sqlalchemy.orm import Session

from app.models.partner import Partner
from app.schemas.partner import PartnerCreate


def get_partners(db: Session, site: str = None, skip: int = 0, limit: int = 20):
    query = db.query(Partner).filter(Partner.is_deleted == False)
    if site:
        query = query.filter(Partner.site == site)
    return query.offset(skip).limit(limit).all()


def create_partner(db: Session, partner_in: PartnerCreate):
    partner = Partner(**partner_in.model_dump())
    db.add(partner)
    db.commit()
    db.refresh(partner)
    return partner


def delete_partner(db: Session, partner_id: uuid.UUID):
    partner = db.query(Partner).filter(Partner.id == partner_id, Partner.is_deleted == False).first()
    if partner:
        partner.is_deleted = True
        db.commit()
    return partner
