from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin import AdminUser
from app.models.newsletter import Newsletter, NewsletterStatus
from app.schemas.newsletter import NewsletterCreate, NewsletterUpdate, NewsletterResponse, NewsletterSendRequest
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

@router.get("/newsletters", response_model=List[NewsletterResponse])
async def get_newsletters(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get all newsletters with pagination"""
    newsletters = db.query(Newsletter).offset(skip).limit(limit).all()
    return newsletters

@router.get("/newsletters/{newsletter_id}", response_model=NewsletterResponse)
async def get_newsletter(
    newsletter_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get a specific newsletter by ID"""
    newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Newsletter not found"
        )
    return newsletter

@router.post("/newsletters", response_model=NewsletterResponse)
async def create_newsletter(
    newsletter_data: NewsletterCreate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Create a new newsletter"""
    db_newsletter = Newsletter(
        id=str(uuid.uuid4()),
        subject=newsletter_data.subject,
        content=newsletter_data.content,
        status=NewsletterStatus.DRAFT,
        author_id=current_user.id
    )
    
    db.add(db_newsletter)
    db.commit()
    db.refresh(db_newsletter)
    
    return db_newsletter

@router.put("/newsletters/{newsletter_id}", response_model=NewsletterResponse)
async def update_newsletter(
    newsletter_id: str,
    newsletter_data: NewsletterUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Update an existing newsletter"""
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not db_newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Newsletter not found"
        )
    
    # Update fields
    for field, value in newsletter_data.dict(exclude_unset=True).items():
        setattr(db_newsletter, field, value)
    
    db.commit()
    db.refresh(db_newsletter)
    
    return db_newsletter

@router.delete("/newsletters/{newsletter_id}")
async def delete_newsletter(
    newsletter_id: str,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Delete a newsletter"""
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not db_newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Newsletter not found"
        )
    
    db.delete(db_newsletter)
    db.commit()
    
    return {"message": "Newsletter deleted successfully"}

@router.post("/newsletters/{newsletter_id}/send")
async def send_newsletter(
    newsletter_id: str,
    send_request: NewsletterSendRequest,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Send a newsletter"""
    db_newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not db_newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Newsletter not found"
        )
    
    if db_newsletter.status == NewsletterStatus.SENT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Newsletter has already been sent"
        )
    
    # TODO: Implement actual email sending logic
    # For now, just update the status
    db_newsletter.status = NewsletterStatus.SENT
    db_newsletter.sent_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_newsletter)
    
    return {
        "message": "Newsletter sent successfully",
        "newsletter_id": newsletter_id,
        "sent_at": db_newsletter.sent_at
    }

@router.post("/subscribe")
async def subscribe_to_newsletter(
    email: str,
    db: Session = Depends(get_db)
):
    """Subscribe to newsletter (public endpoint)"""
    # TODO: Implement newsletter subscription logic
    # For now, just return success
    return {
        "message": "Successfully subscribed to newsletter",
        "email": email
    } 