from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query

from app.core.cloudinary_client import upload_file
from app.api.deps import get_current_super_admin

router = APIRouter(prefix="/api/v1/uploads", tags=["uploads"])

MAX_FILE_SIZE_MB = 8

MAGIC_BYTES = {
    b"\xff\xd8\xff": "image/jpeg",
    b"\x89PNG\r\n\x1a\n": "image/png",
    b"RIFF": "image/webp",
    b"GIF87a": "image/gif",
    b"GIF89a": "image/gif",
}


def detect_image_type(data: bytes) -> str | None:
    for signature, mime in MAGIC_BYTES.items():
        if data.startswith(signature):
            return mime
    return None


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Query("kabai", description="Cloudinary folder, e.g. 'team', 'gallery', 'projects'"),
    _user=Depends(get_current_super_admin),
):
    contents = await file.read()

    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Empty file")

    mime = detect_image_type(contents)
    if mime is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid image type. Only JPEG, PNG, WEBP, or GIF images are allowed",
        )

    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail=f"File too large (max {MAX_FILE_SIZE_MB}MB)")

    try:
        result = upload_file(contents, folder=folder)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

    return {
        "url": result["secure_url"],
        "public_id": result["public_id"],
        "width": result.get("width"),
        "height": result.get("height"),
    }
