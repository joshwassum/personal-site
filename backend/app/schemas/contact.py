from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageUpdate(BaseModel):
    is_read: bool

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    is_read: bool
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

    class Config:
        from_attributes = True

class ContactMessageList(BaseModel):
    messages: list[ContactMessageResponse]
    total: int
    unread_count: int 