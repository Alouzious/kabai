import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.crud import blog_post as crud
from app.db.session import get_db
from app.schemas.blog_post import BlogPostCreate, BlogPostUpdate, BlogPostOut
from app.api.deps import get_current_user

router = APIRouter(prefix="/api/v1/blog", tags=["blog"])


@router.get("/", response_model=list[BlogPostOut])
def list_posts(
    site: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return crud.get_posts(db, site=site, published_only=True, skip=skip, limit=limit)


@router.get("/{slug}", response_model=BlogPostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = crud.get_post_by_slug(db, slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=BlogPostOut)
def create_post(
    post_in: BlogPostCreate, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    if crud.get_post_by_slug(db, post_in.slug):
        raise HTTPException(status_code=400, detail="Slug already exists")
    return crud.create_post(db, post_in)


@router.put("/{post_id}", response_model=BlogPostOut)
def update_post(
    post_id: uuid.UUID, post_in: BlogPostUpdate, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return crud.update_post(db, post, post_in)


@router.delete("/{post_id}")
def delete_post(
    post_id: uuid.UUID, db: Session = Depends(get_db), _user=Depends(get_current_user)
):
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    crud.delete_post(db, post)
    return {"message": "Post deleted"}