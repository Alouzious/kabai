import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.crud import event as crud
from app.db.session import get_db
from app.schemas.event import EventCreate, EventUpdate, EventOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/events", tags=["events"])


@router.get("/", response_model=list[EventOut])
def list_events(
    site: str = None,
    is_past: bool = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_events(db, site=site, is_past=is_past, skip=skip, limit=limit)


@router.post("/", response_model=EventOut)
def create_event(
    event_in: EventCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_event(db, event_in)


@router.put("/{event_id}", response_model=EventOut)
def update_event(
    event_id: uuid.UUID,
    event_in: EventUpdate,
    db: Session = Depends(get_db),
    _user=Depends(get_current_super_admin),
):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return crud.update_event(db, event, event_in)


@router.delete("/{event_id}")
def delete_event(
    event_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    crud.delete_event(db, event)
    return {"message": "Event deleted"}
