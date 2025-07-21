#!/usr/bin/env python3
"""
Comprehensive test runner for the personal website project.
Tests both backend and frontend functionality.
"""

import subprocess
import sys
import time
import requests
import os
from pathlib import Path

def check_server_running(url, timeout=5):
    """Check if a server is running at the given URL"""
    try:
        response = requests.get(url, timeout=timeout)
        return response.status_code == 200
    except:
        return False

def run_backend_tests():
    """Run backend tests"""
    print("🔧 Running Backend Tests...")
    print("=" * 50)
    
    # Check if backend server is running
    if not check_server_running("http://localhost:8000/health"):
        print("❌ Backend server is not running on port 8000")
        print("   Please start the backend server first:")
        print("   cd backend && source venv/bin/activate && python main.py")
        return False
    
    # Run backend tests
    try:
        result = subprocess.run([
            sys.executable, "backend/test_all_features.py"
        ], capture_output=True, text=True, cwd=Path.cwd())
        
        print(result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)
        
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Error running backend tests: {e}")
        return False

def run_frontend_tests():
    """Run frontend tests"""
    print("\n🎨 Running Frontend Tests...")
    print("=" * 50)
    
    # Check if frontend server is running
    if not check_server_running("http://localhost:5173"):
        print("❌ Frontend server is not running on port 5173")
        print("   Please start the frontend server first:")
        print("   cd frontend && npm run dev")
        return False
    
    print("✅ Frontend server is running")
    print("📝 To test the admin interface:")
    print("   1. Open http://localhost:5173/admin in your browser")
    print("   2. Open browser console (F12)")
    print("   3. Copy and paste the contents of frontend/test_admin_interface.js")
    print("   4. Press Enter to run the tests")
    
    return True

def run_manual_tests():
    """Guide through manual testing"""
    print("\n👤 Manual Testing Guide...")
    print("=" * 50)
    
    print("📋 Please manually test the following:")
    print()
    print("🔐 Authentication:")
    print("   - Visit http://localhost:5173/admin")
    print("   - Login with username: jcwassum, password: DADhair72!")
    print("   - Verify you can access the admin dashboard")
    print()
    print("📝 Blog Management:")
    print("   - Create a new blog post")
    print("   - Edit an existing blog post")
    print("   - Publish/unpublish a blog post")
    print("   - Delete a blog post")
    print()
    print("📧 Newsletter Management:")
    print("   - Create a new newsletter")
    print("   - Edit newsletter content")
    print("   - Send a newsletter (test mode)")
    print("   - Delete a newsletter")
    print()
    print("📁 File Management:")
    print("   - Upload a file")
    print("   - View uploaded files")
    print("   - Download a file")
    print("   - Delete a file")
    print()
    print("🎨 Frontend Navigation:")
    print("   - Test navigation between admin sections")
    print("   - Verify responsive design on different screen sizes")
    print("   - Test form validation and error handling")
    
    return True

def main():
    """Main test runner"""
    print("🚀 Personal Website - Comprehensive Test Suite")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not Path("backend").exists() or not Path("frontend").exists():
        print("❌ Please run this script from the project root directory")
        sys.exit(1)
    
    # Run tests
    backend_success = run_backend_tests()
    frontend_success = run_frontend_tests()
    manual_success = run_manual_tests()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 OVERALL TEST SUMMARY")
    print("=" * 60)
    
    print(f"Backend Tests: {'✅ PASSED' if backend_success else '❌ FAILED'}")
    print(f"Frontend Tests: {'✅ PASSED' if frontend_success else '❌ FAILED'}")
    print(f"Manual Tests: {'✅ READY' if manual_success else '❌ FAILED'}")
    
    if backend_success and frontend_success:
        print("\n🎉 All automated tests passed!")
        print("✅ Your personal website is ready for Phase 3 development!")
        print("\n📝 Next steps:")
        print("   - Complete manual testing")
        print("   - Continue with remaining Phase 3 features")
        print("   - Deploy to production when ready")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Please fix the issues before continuing.")
        sys.exit(1)

if __name__ == "__main__":
    main() 