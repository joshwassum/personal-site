from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin import AdminUser
from app.models.contact import ContactMessage
from app.schemas.contact import (
    ContactMessageCreate, 
    ContactMessageUpdate, 
    ContactMessageResponse,
    ContactMessageList
)
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/contact", tags=["contact"])

def send_notification_email(contact_message: ContactMessage) -> bool:
    """Send notification email to admin about new contact message"""
    try:
        # Get email settings from environment
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_username = os.getenv("SMTP_USERNAME")
        smtp_password = os.getenv("SMTP_PASSWORD")
        admin_email = os.getenv("ADMIN_EMAIL")
        
        if not all([smtp_username, smtp_password, admin_email]):
            print("Email configuration incomplete, skipping email notification")
            return False
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username or ""
        msg['To'] = admin_email or ""
        msg['Subject'] = f"New Contact Message: {contact_message.subject}"

        body = f"""
        New contact message received from your website:
        
        From: {contact_message.name} ({contact_message.email})
        Subject: {contact_message.subject}
        Date: {contact_message.created_at}
        
        Message:
        {contact_message.message}
        
        ---
        This message was sent from your personal website contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            if smtp_username is not None and smtp_password is not None:
                server.login(smtp_username, smtp_password)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Failed to send notification email: {e}")
        return False

@router.post("/submit", response_model=ContactMessageResponse)
async def submit_contact_message(
    message_data: ContactMessageCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Submit a contact message (public endpoint)"""
    # Get client IP and user agent
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    # Create contact message
    db_message = ContactMessage(
        name=message_data.name,
        email=message_data.email,
        subject=message_data.subject,
        message=message_data.message,
        ip_address=client_ip,
        user_agent=user_agent
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Send notification email (non-blocking)
    try:
        send_notification_email(db_message)
    except Exception as e:
        print(f"Email notification failed: {e}")
    
    return db_message

@router.get("/messages", response_model=ContactMessageList)
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get all contact messages (admin endpoint)"""
    messages = db.query(ContactMessage).order_by(
        ContactMessage.created_at.desc()
    ).offset(skip).limit(limit).all()
    
    total = db.query(ContactMessage).count()
    unread_count = db.query(ContactMessage).filter(
        ContactMessage.is_read == False
    ).count()
    # Convert ContactMessage ORM objects to ContactMessageResponse models
    message_responses = [ContactMessageResponse.from_orm(msg) for msg in messages]
    return ContactMessageList(
        messages=message_responses,
        total=total,
        unread_count=unread_count
    )

@router.get("/messages/{message_id}", response_model=ContactMessageResponse)
async def get_contact_message(
    message_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get a specific contact message"""
    message = db.query(ContactMessage).filter(
        ContactMessage.id == message_id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )
    
    return message

@router.put("/messages/{message_id}", response_model=ContactMessageResponse)
async def update_contact_message(
    message_id: str,
    message_data: ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Update a contact message (mark as read/unread)"""
    message = db.query(ContactMessage).filter(
        ContactMessage.id == message_id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )

    # Use SQLAlchemy's setattr to update the value of the column property
    setattr(message, "is_read", message_data.is_read)
    db.commit()
    db.refresh(message)

    return message

@router.delete("/messages/{message_id}")
async def delete_contact_message(
    message_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Delete a contact message"""
    message = db.query(ContactMessage).filter(
        ContactMessage.id == message_id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )
    
    db.delete(message)
    db.commit()
    
    return {"message": "Contact message deleted successfully"}

@router.post("/messages/{message_id}/mark-read")
async def mark_message_as_read(
    message_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Mark a contact message as read"""
    message = db.query(ContactMessage).filter(
        ContactMessage.id == message_id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )

    setattr(message, "is_read", True)
    db.commit()
    db.refresh(message)

    return {"message": "Message marked as read"}

@router.post("/messages/bulk-mark-read")
async def mark_multiple_messages_as_read(
    message_ids: List[str],
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Mark multiple contact messages as read"""
    messages = db.query(ContactMessage).filter(
        ContactMessage.id.in_(message_ids)
    ).all()
    
    for message in messages:
        setattr(message, "is_read", True)
    
    db.commit()
    
    return {"message": f"Marked {len(messages)} messages as read"} 