from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FileBase(BaseModel):
    description: Optional[str] = None

class FileCreate(FileBase):
    filename: str
    original_filename: str
    file_path: str
    file_size: int
    mime_type: str

class FileUpdate(FileBase):
    pass

class FileResponse(FileBase):
    id: int
    filename: str
    original_filename: str
    file_path: str
    file_size: int
    mime_type: str
    uploaded_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 