from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.database import Base
import uuid
import enum

class NewsletterStatus(str, enum.Enum):
    DRAFT = "draft"
    SENT = "sent"

class Newsletter(Base):
    __tablename__ = "newsletters"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    subject = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    status = Column(Enum(NewsletterStatus), default=NewsletterStatus.DRAFT)
    sent_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    author_id = Column(String, ForeignKey("admin_users.id"), nullable=False)
    
    # Relationship
    author = relationship("AdminUser", back_populates="newsletters") 