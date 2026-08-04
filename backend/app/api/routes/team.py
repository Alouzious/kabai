import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.crud import team as crud
from app.db.session import get_db
from app.schemas.team import TeamMemberCreate, TeamMemberUpdate, TeamMemberOut
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/team", tags=["team"])


@router.get("/", response_model=list[TeamMemberOut])
def list_team(
    site: str = None,
    year: int = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_team_members(db, site=site, year=year, skip=skip, limit=limit)


@router.post("/", response_model=TeamMemberOut)
def create_member(
    member_in: TeamMemberCreate, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    return crud.create_team_member(db, member_in)


@router.put("/{member_id}", response_model=TeamMemberOut)
def update_member(
    member_id: uuid.UUID,
    member_in: TeamMemberUpdate,
    db: Session = Depends(get_db),
    _user=Depends(get_current_super_admin),
):
    member = crud.get_team_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return crud.update_team_member(db, member, member_in)


@router.delete("/{member_id}")
def delete_member(
    member_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_super_admin)
):
    member = crud.get_team_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    crud.delete_team_member(db, member)
    return {"message": "Team member deleted"}


@router.post("/refresh-archiving")
def trigger_archiving(
    db: Session = Depends(get_db), _admin=Depends(get_current_super_admin)
):
    from datetime import datetime
    current_year = datetime.utcnow().year
    crud.refresh_archiving(db, current_year)
    return {"message": f"Archiving refreshed for year {current_year}"}
