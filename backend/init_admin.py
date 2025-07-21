#!/usr/bin/env python3
"""
Script to initialize the admin user in the database.
Run this script once to create the initial admin user.
"""

import os
import sys
from sqlalchemy.orm import Session
from app.models.database import SessionLocal, engine
from app.models import Base, AdminUser
from app.utils.auth import get_password_hash

def create_admin_user(username: str, email: str, password: str):
    """Create an admin user in the database."""
    db = SessionLocal()
    try:
        # Check if admin user already exists
        existing_user = db.query(AdminUser).filter(
            (AdminUser.username == username) | (AdminUser.email == email)
        ).first()
        
        if existing_user:
            print(f"Admin user with username '{username}' or email '{email}' already exists.")
            return
        
        # Create new admin user
        hashed_password = get_password_hash(password)
        admin_user = AdminUser(
            username=username,
            email=email,
            password_hash=hashed_password,
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        
        print(f"Admin user '{username}' created successfully!")
        print(f"Email: {email}")
        print("You can now log in to the admin panel.")
        
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

def main():
    """Main function to run the admin user creation."""
    print("Admin User Initialization")
    print("=" * 30)
    
    # Get admin credentials from environment or prompt user
    username = os.getenv("ADMIN_USERNAME")
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    
    if not username:
        username = input("Enter admin username: ").strip()
    
    if not email:
        email = input("Enter admin email: ").strip()
    
    if not password:
        password = input("Enter admin password: ").strip()
    
    if not username or not email or not password:
        print("Error: Username, email, and password are required.")
        sys.exit(1)
    
    # Create the admin user
    create_admin_user(username, email, password)

if __name__ == "__main__":
    main() 