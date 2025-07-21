from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.database import Base
import uuid

class SectionVisibility(Base):
    __tablename__ = "section_visibility"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    section_name = Column(String(50), unique=True, nullable=False, index=True)
    is_visible = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    updated_by = Column(String, ForeignKey("admin_users.id"), nullable=True)
    
    # Relationship
    updated_by_user = relationship("AdminUser") 