import uuid
from sqlalchemy.orm import Session

from app.models.blog_post import BlogPost
from app.schemas.blog_post import BlogPostCreate, BlogPostUpdate


def get_posts(db: Session, site: str = None, published_only: bool = True, skip: int = 0, limit: int = 20):
    query = db.query(BlogPost).filter(BlogPost.is_deleted == False)
    if site:
        query = query.filter(BlogPost.site == site)
    if published_only:
        query = query.filter(BlogPost.is_published == True)
    return query.order_by(BlogPost.published_at.desc()).offset(skip).limit(limit).all()


def get_post_by_slug(db: Session, slug: str):
    return db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.is_deleted == False).first()


def get_post(db: Session, post_id: uuid.UUID):
    return db.query(BlogPost).filter(BlogPost.id == post_id, BlogPost.is_deleted == False).first()


def create_post(db: Session, post_in: BlogPostCreate):
    post = BlogPost(**post_in.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def update_post(db: Session, post: BlogPost, post_in: BlogPostUpdate):
    for field, value in post_in.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    db.commit()
    db.refresh(post)
    return post


def delete_post(db: Session, post: BlogPost):
    post.is_deleted = True
    db.commit()