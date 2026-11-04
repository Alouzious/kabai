import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session

from app.api.deps import get_current_super_admin
from app.core.limiter import limiter
from app.db.session import get_db
from app.models.application import LeadershipApplication
from app.schemas.application import ApplicationIn, ApplicationOut, ApplicationStatusUpdate

router = APIRouter(prefix="/api/v1/applications", tags=["applications"])


@router.post("/")
@limiter.limit("10/minute")
def submit_application(request: Request, data: ApplicationIn, db: Session = Depends(get_db)):
    row = LeadershipApplication(**data.model_dump())
    db.add(row)
    db.commit()
    return {"message": "Application received"}


@router.get("/", response_model=list[ApplicationOut])
def list_applications(
    status: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    q = db.query(LeadershipApplication)
    if status:
        q = q.filter(LeadershipApplication.status == status)
    return q.order_by(LeadershipApplication.created_at.desc()).offset(skip).limit(limit).all()


@router.put("/{app_id}", response_model=ApplicationOut)
def update_status(
    app_id: uuid.UUID,
    body: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    row = db.query(LeadershipApplication).get(app_id)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    row.status = body.status
    db.commit()
    db.refresh(row)
    return row


@router.delete("/{app_id}")
def delete_application(
    app_id: uuid.UUID,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    row = db.query(LeadershipApplication).get(app_id)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(row)
    db.commit()
    return {"message": "Application deleted"}
