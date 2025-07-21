from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin import AdminUser
from app.models.sections import SectionVisibility
from app.schemas.sections import (
    SectionVisibilityCreate, 
    SectionVisibilityUpdate, 
    SectionVisibilityResponse,
    SectionVisibilityList
)

router = APIRouter(prefix="/api/sections", tags=["sections"])

# Default sections that should exist
DEFAULT_SECTIONS = [
    "about",
    "skills", 
    "experience",
    "portfolio",
    "blog",
    "newsletter",
    "contact"
]

@router.get("/visibility", response_model=SectionVisibilityList)
async def get_section_visibility(
    db: Session = Depends(get_db)
):
    """Get visibility status of all sections (public endpoint)"""
    sections = db.query(SectionVisibility).all()
    
    # Ensure all default sections exist
    existing_sections = {s.section_name for s in sections}
    for section_name in DEFAULT_SECTIONS:
        if section_name not in existing_sections:
            # Create default section with visibility based on section type
            is_visible = section_name not in ["blog", "newsletter"]  # Hide blog/newsletter by default
            new_section = SectionVisibility(
                section_name=section_name,
                is_visible=is_visible
            )
            db.add(new_section)
    
    db.commit()
    
    # Return all sections
    sections = db.query(SectionVisibility).all()
    return SectionVisibilityList(sections=sections)  # type: ignore

@router.get("/visibility/admin", response_model=SectionVisibilityList)
async def get_section_visibility_admin(
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Get visibility status of all sections (admin endpoint)"""
    sections = db.query(SectionVisibility).all()
    
    # Ensure all default sections exist
    existing_sections = {s.section_name for s in sections}
    for section_name in DEFAULT_SECTIONS:
        if section_name not in existing_sections:
            # Create default section with visibility based on section type
            is_visible = section_name not in ["blog", "newsletter"]  # Hide blog/newsletter by default
            new_section = SectionVisibility(
                section_name=section_name,
                is_visible=is_visible,
                updated_by=current_user.id
            )
            db.add(new_section)
    
    db.commit()
    
    # Return all sections
    sections = db.query(SectionVisibility).all()
    return SectionVisibilityList(sections=sections)  # type: ignore

@router.put("/visibility/{section_name}", response_model=SectionVisibilityResponse)
async def update_section_visibility(
    section_name: str,
    section_data: SectionVisibilityUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Update visibility of a specific section"""
    section = db.query(SectionVisibility).filter(
        SectionVisibility.section_name == section_name
    ).first()
    
    if not section:
        # Create section if it doesn't exist
        section = SectionVisibility(
            section_name=section_name,
            is_visible=section_data.is_visible,
            updated_by=current_user.id
        )
        db.add(section)
    else:
        # Update existing section
        section.is_visible = section_data.is_visible  # type: ignore
        section.updated_by = current_user.id
    
    db.commit()
    db.refresh(section)
    
    return section

@router.post("/visibility/bulk", response_model=SectionVisibilityList)
async def update_multiple_sections(
    sections_data: List[SectionVisibilityUpdate],
    section_names: List[str],
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Update visibility of multiple sections at once"""
    if len(sections_data) != len(section_names):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Number of sections and data must match"
        )
    
    updated_sections = []
    
    for section_name, section_data in zip(section_names, sections_data):
        section = db.query(SectionVisibility).filter(
            SectionVisibility.section_name == section_name
        ).first()
        
        if not section:
            # Create section if it doesn't exist
            section = SectionVisibility(
                section_name=section_name,
                is_visible=section_data.is_visible,
                updated_by=current_user.id
            )
            db.add(section)
        else:
            # Update existing section
            section.is_visible = section_data.is_visible  # type: ignore
            section.updated_by = current_user.id
        
        updated_sections.append(section)
    
    db.commit()
    
    # Refresh all sections
    for section in updated_sections:
        db.refresh(section)
    
    return SectionVisibilityList(sections=updated_sections)

@router.post("/visibility/reset")
async def reset_section_visibility(
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    """Reset all sections to their default visibility states"""
    for section_name in DEFAULT_SECTIONS:
        section = db.query(SectionVisibility).filter(
            SectionVisibility.section_name == section_name
        ).first()
        
        if not section:
            # Create section with default visibility
            is_visible = section_name not in ["blog", "newsletter"]
            section = SectionVisibility(
                section_name=section_name,
                is_visible=is_visible,
                updated_by=current_user.id
            )
            db.add(section)
        else:
            # Reset to default visibility
            section.is_visible = section_name not in ["blog", "newsletter"]  # type: ignore
            section.updated_by = current_user.id
    
    db.commit()
    
    return {"message": "Section visibility reset to defaults"} 