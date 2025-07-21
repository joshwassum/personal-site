# Fix import path issues
import sys
import os
from pathlib import Path
backend_dir = Path(__file__).parent.absolute()
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from dotenv import load_dotenv
from app.config import settings
from app.models.database import engine
from app.models import Base
from app.api.auth import router as auth_router
from app.api.blog import router as blog_router
from app.api.newsletter import router as newsletter_router
from app.api.files import router as files_router
from app.api.sections import router as sections_router
from app.api.contact import router as contact_router

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Personal Website API",
    description="Backend API for personal website with admin functionality",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router)
app.include_router(blog_router)
app.include_router(newsletter_router)
app.include_router(files_router)
app.include_router(sections_router)
app.include_router(contact_router)

# Mount static files for uploads
if os.path.exists("uploads"):
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Primary frontend port
        "http://localhost:3000",  # Alternative frontend port
        "http://localhost:5174",  # Fallback ports
        "http://localhost:5175", 
        "http://localhost:5176", 
        "http://localhost:5177", 
        "http://localhost:5178", 
        "http://localhost:5179",
        "http://localhost:5180"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Personal Website API"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"}

@app.get("/api/health")
async def api_health_check():
    """API health check endpoint"""
    return {"status": "healthy", "api_version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 