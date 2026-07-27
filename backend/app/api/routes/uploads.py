from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query

from app.core.cloudinary_client import upload_file
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/v1/uploads", tags=["uploads"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_FILE_SIZE_MB = 8


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Query("kabai", description="Cloudinary folder, e.g. 'team', 'gallery', 'projects'"),
    _user=Depends(get_current_user),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, WEBP, or GIF images are allowed")

    contents = await file.read()
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
