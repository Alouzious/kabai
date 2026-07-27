import uuid
from sqlalchemy.orm import Session

from app.models.team import TeamMember
from app.schemas.team import TeamMemberCreate, TeamMemberUpdate


def get_team_members(db: Session, site: str = None, year: int = None, skip: int = 0, limit: int = 20):
    query = db.query(TeamMember).filter(TeamMember.is_deleted == False)
    if site:
        query = query.filter(TeamMember.site == site)
    if year:
        query = query.filter(TeamMember.year == year)
    return query.order_by(TeamMember.year.desc()).offset(skip).limit(limit).all()


def get_team_member(db: Session, member_id: uuid.UUID):
    return db.query(TeamMember).filter(TeamMember.id == member_id, TeamMember.is_deleted == False).first()


def create_team_member(db: Session, member_in: TeamMemberCreate):
    member = TeamMember(**member_in.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


def update_team_member(db: Session, member: TeamMember, member_in: TeamMemberUpdate):
    for field, value in member_in.model_dump(exclude_unset=True).items():
        setattr(member, field, value)
    db.commit()
    db.refresh(member)
    return member


def delete_team_member(db: Session, member: TeamMember):
    member.is_deleted = True
    db.commit()


def refresh_archiving(db: Session, current_year: int):
    """Auto-archive team members whose year has passed."""
    db.query(TeamMember).filter(
        TeamMember.year < current_year, TeamMember.is_current == True
    ).update({"is_current": False})
    db.commit()
