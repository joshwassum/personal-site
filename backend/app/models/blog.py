from sqlalchemy import Column, String, Text, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.database import Base
import uuid
import enum

class PostStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"

class BlogPost(Base):
    __tablename__ = "blog_posts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(Text, nullable=True)
    featured_image = Column(String(255), nullable=True)
    status = Column(Enum(PostStatus), default=PostStatus.DRAFT)
    published_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    author_id = Column(String, ForeignKey("admin_users.id"), nullable=False)
    
    # Relationship
    author = relationship("AdminUser", back_populates="blog_posts") 