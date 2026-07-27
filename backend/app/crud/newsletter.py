from sqlalchemy.orm import Session

from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import NewsletterSubscribeIn


def subscribe(db: Session, sub_in: NewsletterSubscribeIn):
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == sub_in.email
    ).first()
    if existing:
        return existing
    sub = NewsletterSubscriber(**sub_in.model_dump())
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub


def get_subscribers(db: Session, site: str = None):
    query = db.query(NewsletterSubscriber)
    if site:
        query = query.filter(NewsletterSubscriber.site == site)
    return query.all()
