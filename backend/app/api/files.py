import os
import shutil
from pathlib import Path
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.dependencies.auth import get_current_admin
from app.models.file import File as FileModel
from app.schemas.file import FileCreate, FileResponse, FileUpdate
import uuid

router = APIRouter(prefix="/api/files", tags=["files"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload", response_model=FileResponse)
async def upload_file(
    file: UploadFile = File(...),
    description: str = Form(None),
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Upload a file to the server"""
    
    # Validate file type (allow images and common document types)
    allowed_types = [
        "image/jpeg", "image/png", "image/gif", "image/webp",
        "application/pdf", "text/plain", "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"File type {file.content_type} not allowed. Allowed types: {', '.join(allowed_types)}"
        )
    
    # Generate unique filename
    file_extension = Path(file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Get file size
    file_size = os.path.getsize(file_path)
    
    # Create database record
    file_data = FileCreate(
        filename=unique_filename,
        original_filename=file.filename,
        file_path=str(file_path),
        file_size=file_size,
        mime_type=file.content_type,
        description=description
    )
    
    db_file = FileModel(**file_data.dict())
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    return db_file

@router.get("/files", response_model=List[FileResponse])
async def list_files(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """List all uploaded files"""
    files = db.query(FileModel).offset(skip).limit(limit).all()
    return files

@router.get("/files/{file_id}", response_model=FileResponse)
async def get_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Get a specific file by ID"""
    file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return file

@router.put("/files/{file_id}", response_model=FileResponse)
async def update_file(
    file_id: int,
    file_update: FileUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Update file metadata"""
    db_file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    for field, value in file_update.dict(exclude_unset=True).items():
        setattr(db_file, field, value)
    
    db.commit()
    db.refresh(db_file)
    return db_file

@router.delete("/files/{file_id}")
async def delete_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Delete a file"""
    db_file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Delete physical file
    try:
        if os.path.exists(db_file.file_path):
            os.remove(db_file.file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")
    
    # Delete database record
    db.delete(db_file)
    db.commit()
    
    return {"message": "File deleted successfully"}

@router.get("/files/{file_id}/download")
async def download_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    """Download a file"""
    db_file = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    if not os.path.exists(db_file.file_path):
        raise HTTPException(status_code=404, detail="File not found on disk")
    
    return {
        "file_path": db_file.file_path,
        "filename": db_file.original_filename,
        "mime_type": db_file.mime_type
    } 