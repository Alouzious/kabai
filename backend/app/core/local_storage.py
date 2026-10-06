import io
import re
import uuid
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError

from app.core.config import settings

Image.MAX_IMAGE_PIXELS = 40_000_000
MAX_SIDE = 1920


def _clean_folder(folder: str) -> str:
    parts = [re.sub(r"[^a-z0-9_-]", "", p.lower()) for p in folder.split("/")]
    parts = [p for p in parts if p][:3]
    return "/".join(parts) or "kabai"


def save_image(contents: bytes, folder: str = "kabai") -> dict:
    try:
        img = Image.open(io.BytesIO(contents))
        img.load()
    except (UnidentifiedImageError, Image.DecompressionBombError, OSError):
        raise ValueError("Could not read this image file")

    folder = _clean_folder(folder)
    name = uuid.uuid4().hex

    if getattr(img, "is_animated", False) and img.format == "GIF":
        data, ext = contents, "gif"
        width, height = img.size
    else:
        img = ImageOps.exif_transpose(img)
        img.thumbnail((MAX_SIDE, MAX_SIDE))
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=82, method=4)
        data, ext = buf.getvalue(), "webp"
        width, height = img.size

    target_dir = Path(settings.UPLOAD_DIR) / folder
    target_dir.mkdir(parents=True, exist_ok=True)
    (target_dir / f"{name}.{ext}").write_bytes(data)

    public_id = f"{folder}/{name}.{ext}"
    return {
        "url": f"{settings.UPLOAD_BASE_URL.rstrip('/')}/{public_id}",
        "public_id": public_id,
        "width": width,
        "height": height,
    }
