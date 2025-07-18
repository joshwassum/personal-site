from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SectionVisibilityBase(BaseModel):
    section_name: str
    is_visible: bool = True

class SectionVisibilityCreate(SectionVisibilityBase):
    pass

class SectionVisibilityUpdate(BaseModel):
    is_visible: bool

class SectionVisibilityResponse(SectionVisibilityBase):
    id: str
    updated_at: Optional[datetime] = None
    updated_by: Optional[str] = None

    class Config:
        from_attributes = True

class SectionVisibilityList(BaseModel):
    sections: list[SectionVisibilityResponse] 