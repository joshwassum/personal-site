from sqlalchemy import Column, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.models.database import Base
import uuid

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)
    ip_address = Column(String(45), nullable=True)  # IPv6 compatible
    user_agent = Column(Text, nullable=True) 