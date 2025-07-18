from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.contact import SubmissionStatus

class ContactSubmissionBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmissionResponse(ContactSubmissionBase):
    id: str
    status: SubmissionStatus
    submitted_at: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

    class Config:
        from_attributes = True

class ContactSubmissionUpdate(BaseModel):
    status: SubmissionStatus 