from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.admin import AdminUser
from app.schemas.auth import LoginRequest, LoginResponse, AdminUserResponse, ChangePasswordRequest
from app.utils.auth import verify_password, get_password_hash, create_access_token
from app.dependencies.auth import get_current_admin

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=LoginResponse)
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Admin login endpoint."""
    # Find user by username
    user = db.query(AdminUser).filter(AdminUser.username == login_data.username).first()
    
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return LoginResponse(
        access_token=access_token,
        user_id=user.id,
        username=user.username,
        email=user.email
    )

@router.get("/me", response_model=AdminUserResponse)
async def get_current_user(current_admin: AdminUser = Depends(get_current_admin)):
    """Get current admin user information."""
    return current_admin

@router.put("/password")
async def change_password(
    password_data: ChangePasswordRequest,
    current_admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Change admin password."""
    if not verify_password(password_data.current_password, current_admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password"
        )
    
    current_admin.password_hash = get_password_hash(password_data.new_password)
    db.commit()
    
    return {"message": "Password updated successfully"} 