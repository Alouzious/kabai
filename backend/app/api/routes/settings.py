from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.deps import get_current_super_admin
from app.db.session import get_db
from app.models.site_setting import SiteSetting

router = APIRouter(prefix="/api/v1/settings", tags=["settings"])

# Only these switches can be changed. Add a name here for a future switch.
ALLOWED = {"indabax_applications_open"}


class SettingIn(BaseModel):
    value: str = Field(max_length=200)


@router.get("/")
def read_settings(db: Session = Depends(get_db)):
    # Public on purpose: the website reads these to decide what to show.
    # Never store secrets in this table.
    return {row.name: row.value for row in db.query(SiteSetting).all()}


@router.put("/{name}")
def write_setting(
    name: str,
    body: SettingIn,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    if name not in ALLOWED:
        raise HTTPException(status_code=404, detail="Unknown setting")
    row = db.query(SiteSetting).get(name)
    if row:
        row.value = body.value
        row.updated_at = datetime.utcnow()
    else:
        db.add(SiteSetting(name=name, value=body.value))
    db.commit()
    return {name: body.value}
