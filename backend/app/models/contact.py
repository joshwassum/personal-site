from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.models.database import Base
import uuid
import enum

class SubmissionStatus(str, enum.Enum):
    NEW = "new"
    READ = "read"
    REPLIED = "replied"

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(Enum(SubmissionStatus), default=SubmissionStatus.NEW)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True) 