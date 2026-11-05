"""Safe storage helpers for campaign resource image uploads."""
from __future__ import annotations

import re
import uuid
from pathlib import Path

from app.core.config import settings

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".svg", ".webp"}

# extension -> accepted content-type prefixes / exact values
CONTENT_TYPES = {
    ".png": {"image/png"},
    ".jpg": {"image/jpeg"},
    ".jpeg": {"image/jpeg"},
    ".webp": {"image/webp"},
    ".svg": {"image/svg+xml", "text/xml", "application/xml", "text/plain"},
}

MAGIC = {
    b"\xff\xd8\xff": ".jpg",
    b"\x89PNG\r\n\x1a\n": ".png",
    b"RIFF": ".webp",  # refined below
}

IMAGE_REJECT_MSG = (
    "Only images can be uploaded. For documents, paste a link instead."
)


def resources_dir() -> Path:
    path = Path(settings.UPLOAD_DIR) / "resources"
    path.mkdir(parents=True, exist_ok=True)
    return path.resolve()


def constitution_path() -> Path:
    return (Path(__file__).resolve().parent.parent / "static" / "resources" / "constitution.pdf").resolve()


def constitution_exists() -> bool:
    path = constitution_path()
    return path.is_file() and path.stat().st_size > 0


def _safe_original_name(name: str | None) -> str:
    raw = (name or "upload").replace("\\", "/").split("/")[-1]
    cleaned = re.sub(r"[^\w.\-]+", "_", raw).strip("._") or "upload"
    return cleaned[:180]


def _ext_from_filename(filename: str | None) -> str | None:
    if not filename or "." not in filename:
        return None
    ext = "." + filename.rsplit(".", 1)[-1].lower()
    return ext if ext in ALLOWED_EXTENSIONS else None


def _detect_raster_ext(data: bytes) -> str | None:
    if data.startswith(b"\xff\xd8\xff"):
        return ".jpg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return ".png"
    if data.startswith(b"RIFF") and len(data) >= 12 and data[8:12] == b"WEBP":
        return ".webp"
    return None


def _is_svg(data: bytes) -> bool:
    head = data[:2048].lstrip().lower()
    if head.startswith(b"<?xml"):
        return b"<svg" in head
    return head.startswith(b"<svg")


def save_campaign_image(
    contents: bytes,
    original_filename: str | None,
    content_type: str | None,
) -> dict:
    if not contents:
        raise ValueError("Empty file")
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise ValueError("File too large (max 5 MB)")

    name_ext = _ext_from_filename(original_filename)
    ctype = (content_type or "").split(";")[0].strip().lower()

    if name_ext == ".svg" or ctype == "image/svg+xml" or _is_svg(contents):
        if not _is_svg(contents):
            raise ValueError(IMAGE_REJECT_MSG)
        if name_ext and name_ext != ".svg":
            raise ValueError(IMAGE_REJECT_MSG)
        if ctype and ctype not in CONTENT_TYPES[".svg"] and ctype != "application/octet-stream":
            raise ValueError(IMAGE_REJECT_MSG)
        ext = ".svg"
    else:
        magic_ext = _detect_raster_ext(contents)
        if magic_ext is None:
            raise ValueError(IMAGE_REJECT_MSG)
        if name_ext and name_ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            raise ValueError(IMAGE_REJECT_MSG)
        if name_ext in {".jpg", ".jpeg"} and magic_ext != ".jpg":
            raise ValueError(IMAGE_REJECT_MSG)
        if name_ext == ".png" and magic_ext != ".png":
            raise ValueError(IMAGE_REJECT_MSG)
        if name_ext == ".webp" and magic_ext != ".webp":
            raise ValueError(IMAGE_REJECT_MSG)
        if ctype and ctype not in {
            "image/png",
            "image/jpeg",
            "image/webp",
            "application/octet-stream",
            "",
        }:
            raise ValueError(IMAGE_REJECT_MSG)
        # normalize jpeg
        ext = ".jpg" if magic_ext == ".jpg" else magic_ext

    stored_name = f"{uuid.uuid4().hex}{ext}"
    target = resources_dir() / stored_name
    # Ensure we never write outside the resources dir
    if not str(target.resolve()).startswith(str(resources_dir())):
        raise ValueError("Invalid storage path")
    target.write_bytes(contents)

    return {
        "file_path": stored_name,
        "original_filename": _safe_original_name(original_filename),
        "file_size": len(contents),
    }


def resolve_resource_file(file_path: str | None) -> Path | None:
    if not file_path:
        return None
    # Strip any path components — only the basename is allowed
    name = Path(file_path).name
    if name != file_path or ".." in name or "/" in name or "\\" in name:
        return None
    full = (resources_dir() / name).resolve()
    if not str(full).startswith(str(resources_dir())):
        return None
    if not full.is_file():
        return None
    return full


def delete_resource_file(file_path: str | None) -> None:
    path = resolve_resource_file(file_path)
    if path and path.is_file():
        path.unlink(missing_ok=True)
