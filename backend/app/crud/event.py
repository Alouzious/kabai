import uuid
from sqlalchemy.orm import Session

from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate


def get_events(db: Session, site: str = None, is_past: bool = None, skip: int = 0, limit: int = 20):
    query = db.query(Event).filter(Event.is_deleted == False)
    if site:
        query = query.filter(Event.site == site)
    if is_past is not None:
        query = query.filter(Event.is_past == is_past)
    return query.order_by(Event.event_date.desc()).offset(skip).limit(limit).all()


def get_event(db: Session, event_id: uuid.UUID):
    return db.query(Event).filter(Event.id == event_id, Event.is_deleted == False).first()


def create_event(db: Session, event_in: EventCreate):
    event = Event(**event_in.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def update_event(db: Session, event: Event, event_in: EventUpdate):
    for field, value in event_in.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    db.commit()
    db.refresh(event)
    return event


def delete_event(db: Session, event: Event):
    event.is_deleted = True
    db.commit()
