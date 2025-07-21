#!/usr/bin/env python3
"""
Test script to verify all imports are working correctly.
Run this script to check if the import path fixes are working.
"""

# Fix import path issues
import sys
import os
from pathlib import Path
backend_dir = Path(__file__).parent.absolute()
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

def test_imports():
    """Test all the main imports to ensure they work."""
    try:
        print("Testing imports...")
        
        # Test config import
        from app.config import settings
        print("✓ app.config imported successfully")
        
        # Test database imports
        from app.models.database import engine
        from app.models import Base
        print("✓ app.models imported successfully")
        
        # Test API imports
        from app.api.auth import router as auth_router
        from app.api.blog import router as blog_router
        from app.api.newsletter import router as newsletter_router
        from app.api.files import router as files_router
        print("✓ app.api imports successful")
        
        # Test model imports
        from app.models.admin import AdminUser
        from app.models.blog import BlogPost
        from app.models.newsletter import Newsletter
        from app.models.file import File
        print("✓ app.models imports successful")
        
        # Test schema imports
        from app.schemas.auth import LoginRequest, LoginResponse, AdminUserResponse
        from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
        from app.schemas.file import FileCreate, FileResponse
        print("✓ app.schemas imports successful")
        
        print("\n🎉 All imports successful! The path fixes are working.")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    test_imports() 