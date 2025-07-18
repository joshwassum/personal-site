from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.dependencies.auth import get_current_admin as get_current_admin_user
from app.models.admin import AdminUser
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Get all blog posts with pagination"""
    posts = db.query(BlogPost).offset(skip).limit(limit).all()
    return posts

@router.get("/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin_user)
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
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create a new blog post"""
    # Check if slug already exists
    existing_post = db.query(BlogPost).filter(BlogPost.slug == post_data.slug).first()
    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A blog post with this slug already exists"
        )
    
    # Create new blog post
    db_post = BlogPost(
        id=str(uuid.uuid4()),
        title=post_data.title,
        slug=post_data.slug,
        excerpt=post_data.excerpt,
        content=post_data.content,
        is_published=post_data.is_published,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
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
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update an existing blog post"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Check if slug already exists (excluding current post)
    if post_data.slug != db_post.slug:
        existing_post = db.query(BlogPost).filter(
            BlogPost.slug == post_data.slug,
            BlogPost.id != post_id
        ).first()
        if existing_post:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A blog post with this slug already exists"
            )
    
    # Update fields
    for field, value in post_data.dict(exclude_unset=True).items():
        setattr(db_post, field, value)
    
    db_post.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_post)
    
    return db_post

@router.delete("/posts/{post_id}")
async def delete_blog_post(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin_user)
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
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Toggle the published status of a blog post"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    db_post.is_published = not db_post.is_published
    db_post.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_post)
    
    return {
        "message": f"Blog post {'published' if db_post.is_published else 'unpublished'} successfully",
        "is_published": db_post.is_published
    } 