from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.newsletter import NewsletterStatus

class NewsletterBase(BaseModel):
    subject: str = Field(..., min_length=1, max_length=255, description="Newsletter subject line")
    content: str = Field(..., min_length=1, description="Newsletter content")

class NewsletterCreate(NewsletterBase):
    pass

class NewsletterUpdate(BaseModel):
    subject: Optional[str] = Field(None, min_length=1, max_length=255, description="Newsletter subject line")
    content: Optional[str] = Field(None, min_length=1, description="Newsletter content")
    status: Optional[NewsletterStatus] = Field(None, description="Newsletter status")

class NewsletterResponse(NewsletterBase):
    id: str
    status: NewsletterStatus
    sent_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    author_id: str

    class Config:
        from_attributes = True

class NewsletterSendRequest(BaseModel):
    send_to_all: bool = Field(True, description="Send to all subscribers")
    custom_recipients: Optional[list[str]] = Field(None, description="Custom list of email addresses") 