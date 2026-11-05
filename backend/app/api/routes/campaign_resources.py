import tempfile
import uuid
import zipfile
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

from app.api.deps import get_current_super_admin
from app.core.campaign_storage import (
    IMAGE_REJECT_MSG,
    constitution_exists,
    constitution_path,
    delete_resource_file,
    resolve_resource_file,
    save_campaign_image,
)
from app.db.session import get_db
from app.models.campaign_resource import CampaignResource
from app.schemas.campaign_resource import (
    CampaignResourceListOut,
    CampaignResourceOut,
    CampaignResourceUpdate,
    type_label_for,
    validate_external_url,
)

router = APIRouter(prefix="/api/v1/resources", tags=["resources"])

CONSTITUTION_ID = "constitution"


def _to_out(row: CampaignResource) -> CampaignResourceOut:
    download_url = None
    if row.category in ("logo", "image") and row.file_path:
        download_url = f"/api/v1/resources/{row.id}/download"
    return CampaignResourceOut(
        id=str(row.id),
        title=row.title,
        description=row.description,
        category=row.category,
        type_label=type_label_for(row.category),
        file_path=row.file_path,
        external_url=row.external_url,
        original_filename=row.original_filename,
        file_size=row.file_size,
        is_builtin=False,
        download_url=download_url,
        created_at=row.created_at,
        updated_at=row.updated_at,
    )


def _constitution_item() -> CampaignResourceOut:
    path = constitution_path()
    size = path.stat().st_size if path.is_file() else None
    return CampaignResourceOut(
        id=CONSTITUTION_ID,
        title="Club Constitution",
        description="Official Kabale AI Club constitution (PDF).",
        category="document",
        type_label="Document",
        file_path=None,
        external_url=None,
        original_filename="constitution.pdf",
        file_size=size,
        is_builtin=True,
        download_url="/api/v1/resources/constitution",
        created_at=None,
        updated_at=None,
    )


@router.get("/", response_model=CampaignResourceListOut)
def list_resources(db: Session = Depends(get_db)):
    rows = (
        db.query(CampaignResource)
        .order_by(CampaignResource.created_at.desc())
        .all()
    )
    items = [_to_out(r) for r in rows]
    has_constitution = constitution_exists()
    if has_constitution:
        items.insert(0, _constitution_item())
    return CampaignResourceListOut(items=items, constitution_available=has_constitution)


@router.get("/download-all")
def download_all(db: Session = Depends(get_db)):
    rows = db.query(CampaignResource).all()
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
    tmp_path = Path(tmp.name)
    tmp.close()

    try:
        with zipfile.ZipFile(tmp_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            links: list[str] = []
            for row in rows:
                if row.category in ("logo", "image") and row.file_path:
                    disk = resolve_resource_file(row.file_path)
                    if not disk:
                        continue
                    folder = "logos" if row.category == "logo" else "images"
                    arc_name = row.original_filename or disk.name
                    # Avoid collisions inside the zip
                    arc = f"{folder}/{row.id.hex[:8]}_{arc_name}"
                    zf.write(disk, arcname=arc)
                elif row.category == "document_link" and row.external_url:
                    links.append(f"{row.title}\n{row.external_url}\n")

            if constitution_exists():
                zf.write(constitution_path(), arcname="documents/constitution.pdf")

            links_body = "\n".join(links).strip() + ("\n" if links else "")
            if not links_body:
                links_body = "(No external document links)\n"
            zf.writestr("Links.txt", links_body)

        def iterfile():
            try:
                with open(tmp_path, "rb") as f:
                    while True:
                        chunk = f.read(64 * 1024)
                        if not chunk:
                            break
                        yield chunk
            finally:
                tmp_path.unlink(missing_ok=True)

        return StreamingResponse(
            iterfile(),
            media_type="application/zip",
            headers={
                "Content-Disposition": 'attachment; filename="kab-ai-resources.zip"'
            },
        )
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


@router.get("/constitution")
def download_constitution():
    if not constitution_exists():
        raise HTTPException(status_code=404, detail="Constitution PDF is not available")
    path = constitution_path()
    return FileResponse(
        path,
        media_type="application/pdf",
        filename="constitution.pdf",
        content_disposition_type="attachment",
    )


@router.get("/{resource_id}/download")
def download_resource(resource_id: uuid.UUID, db: Session = Depends(get_db)):
    row = db.query(CampaignResource).get(resource_id)
    if not row:
        raise HTTPException(status_code=404, detail="Resource not found")
    if row.category not in ("logo", "image") or not row.file_path:
        raise HTTPException(status_code=400, detail="This resource is not a downloadable image")
    disk = resolve_resource_file(row.file_path)
    if not disk:
        raise HTTPException(status_code=404, detail="File missing on server")
    media = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
    }.get(disk.suffix.lower(), "application/octet-stream")
    return FileResponse(
        disk,
        media_type=media,
        filename=row.original_filename or disk.name,
        content_disposition_type="attachment",
    )


@router.post("/", response_model=CampaignResourceOut)
async def create_resource(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form(...),
    external_url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    title = (title or "").strip()
    if len(title) < 1:
        raise HTTPException(status_code=422, detail="Title is required")
    if category not in ("logo", "image", "document_link"):
        raise HTTPException(status_code=422, detail="Invalid category")

    file_path = None
    original_filename = None
    file_size = None
    url = None

    if category == "document_link":
        if file is not None and getattr(file, "filename", None):
            raise HTTPException(status_code=400, detail=IMAGE_REJECT_MSG)
        try:
            url = validate_external_url(external_url or "")
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
    else:
        if file is None or not file.filename:
            raise HTTPException(status_code=422, detail="An image file is required for this category")
        contents = await file.read()
        # Reject obvious non-images early (e.g. PDF) with the required message
        name_lower = (file.filename or "").lower()
        if name_lower.endswith(".pdf") or (file.content_type or "").lower() == "application/pdf":
            raise HTTPException(status_code=400, detail=IMAGE_REJECT_MSG)
        try:
            saved = save_campaign_image(contents, file.filename, file.content_type)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        file_path = saved["file_path"]
        original_filename = saved["original_filename"]
        file_size = saved["file_size"]

    now = datetime.utcnow()
    row = CampaignResource(
        id=uuid.uuid4(),
        title=title,
        description=(description or "").strip() or None,
        category=category,
        file_path=file_path,
        external_url=url,
        original_filename=original_filename,
        file_size=file_size,
        created_at=now,
        updated_at=now,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return _to_out(row)


@router.put("/{resource_id}", response_model=CampaignResourceOut)
def update_resource(
    resource_id: uuid.UUID,
    body: CampaignResourceUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    row = db.query(CampaignResource).get(resource_id)
    if not row:
        raise HTTPException(status_code=404, detail="Resource not found")
    row.title = body.title
    row.description = (body.description or "").strip() or None
    row.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(row)
    return _to_out(row)


@router.delete("/{resource_id}")
def delete_resource(
    resource_id: uuid.UUID,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_super_admin),
):
    row = db.query(CampaignResource).get(resource_id)
    if not row:
        raise HTTPException(status_code=404, detail="Resource not found")
    file_path = row.file_path
    db.delete(row)
    db.commit()
    delete_resource_file(file_path)
    return {"message": "Resource deleted"}
