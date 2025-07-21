from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin import AdminUser
from app.models.blog import BlogPost, PostStatus
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get all blog posts with pagination"""
    posts = db.query(BlogPost).offset(skip).limit(limit).all()
    return posts

@router.get("/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get a specific blog post by ID"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return post

@router.post("/posts", response_model=BlogPostResponse)
async def create_blog_post(
    post_data: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Create a new blog post"""
    # Generate slug from title if not provided
    slug = post_data.title.lower().replace(" ", "-").replace("_", "-")
    # Remove special characters
    import re
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    
    # Check if slug already exists
    existing_post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A blog post with this slug already exists"
        )
    
    # Create new blog post
    db_post = BlogPost(
        title=post_data.title,
        slug=slug,
        excerpt=post_data.excerpt,
        content=post_data.content,
        status=post_data.status,
        author_id=current_user.id
    )
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    return db_post

@router.put("/posts/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: str,
    post_data: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Update an existing blog post"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Update fields
    update_data = post_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    # Set published_at if status is being set to PUBLISHED
    if post_data.status == PostStatus.PUBLISHED and db_post.published_at is None:  # type: ignore
        db_post.published_at = datetime.utcnow()  # type: ignore
    
    db.commit()
    db.refresh(db_post)
    
    return db_post

@router.delete("/posts/{post_id}")
async def delete_blog_post(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Delete a blog post"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    db.delete(db_post)
    db.commit()
    
    return {"message": "Blog post deleted successfully"}

@router.patch("/posts/{post_id}/publish")
async def toggle_blog_post_publish(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Toggle the published status of a blog post"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Toggle between DRAFT and PUBLISHED
    if db_post.status == PostStatus.DRAFT:  # type: ignore
        db_post.status = PostStatus.PUBLISHED  # type: ignore
        if db_post.published_at is None:  # type: ignore
            db_post.published_at = datetime.utcnow()  # type: ignore
    else:
        db_post.status = PostStatus.DRAFT  # type: ignore
    
    db.commit()
    db.refresh(db_post)
    
    return {
        "message": f"Blog post {'published' if db_post.status == PostStatus.PUBLISHED else 'unpublished'} successfully",  # type: ignore
        "status": db_post.status.value
    } 