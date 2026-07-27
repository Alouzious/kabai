import cloudinary
import cloudinary.uploader

from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_file(file, folder: str = "kabai") -> dict:
    """
    Uploads a file to Cloudinary and returns the result dict,
    which includes 'secure_url' (the URL to store in the DB).
    """
    result = cloudinary.uploader.upload(file, folder=folder, resource_type="auto")
    return result
