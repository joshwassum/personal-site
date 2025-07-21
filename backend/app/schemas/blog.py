from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.blog import PostStatus

class BlogPostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    status: PostStatus = PostStatus.DRAFT

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    status: Optional[PostStatus] = None

class BlogPostResponse(BlogPostBase):
    id: str
    slug: str
    author_id: str
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class BlogPostListResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    status: PostStatus
    published_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True 