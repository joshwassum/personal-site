#!/usr/bin/env python3
"""
Comprehensive test script for all backend features.
Tests auth, blog, newsletter, and file management APIs.
"""

import sys
import os
import requests
import json
from pathlib import Path

# Fix import path issues
backend_dir = Path(__file__).parent.absolute()
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Test configuration
BASE_URL = "http://localhost:8000"
ADMIN_USERNAME = "jcwassum"
ADMIN_PASSWORD = "DADhair72!"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.access_token = None
        self.test_results = []
        
    def log_test(self, test_name, success, message=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = f"{status} {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({"test": test_name, "success": success, "message": message})
        
    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        try:
            response = self.session.get(f"{BASE_URL}/")
            if response.status_code == 200:
                self.log_test("Root endpoint", True)
            else:
                self.log_test("Root endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Root endpoint", False, str(e))
            
        # Test health endpoint
        try:
            response = self.session.get(f"{BASE_URL}/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health endpoint", True)
                else:
                    self.log_test("Health endpoint", False, "Invalid response")
            else:
                self.log_test("Health endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Health endpoint", False, str(e))
            
        # Test API health endpoint
        try:
            response = self.session.get(f"{BASE_URL}/api/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("API health endpoint", True)
                else:
                    self.log_test("API health endpoint", False, "Invalid response")
            else:
                self.log_test("API health endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("API health endpoint", False, str(e))
    
    def test_auth_system(self):
        """Test authentication system"""
        print("\n🔐 Testing Authentication System...")
        
        # Test login with valid credentials
        try:
            login_data = {
                "username": ADMIN_USERNAME,
                "password": ADMIN_PASSWORD
            }
            response = self.session.post(f"{BASE_URL}/api/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user_id" in data:
                    self.access_token = data["access_token"]
                    self.session.headers.update({"Authorization": f"Bearer {self.access_token}"})
                    self.log_test("Login with valid credentials", True)
                else:
                    self.log_test("Login with valid credentials", False, "Missing token or user_id")
            else:
                self.log_test("Login with valid credentials", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Login with valid credentials", False, str(e))
        
        # Test login with invalid credentials
        try:
            login_data = {
                "username": ADMIN_USERNAME,
                "password": "wrongpassword"
            }
            response = self.session.post(f"{BASE_URL}/api/auth/login", json=login_data)
            
            if response.status_code == 401:
                self.log_test("Login with invalid credentials", True)
            else:
                self.log_test("Login with invalid credentials", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_test("Login with invalid credentials", False, str(e))
        
        # Test get current user (requires authentication)
        if self.access_token:
            try:
                response = self.session.get(f"{BASE_URL}/api/auth/me")
                if response.status_code == 200:
                    data = response.json()
                    if "username" in data and data["username"] == ADMIN_USERNAME:
                        self.log_test("Get current user", True)
                    else:
                        self.log_test("Get current user", False, "Invalid user data")
                else:
                    self.log_test("Get current user", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test("Get current user", False, str(e))
        else:
            self.log_test("Get current user", False, "No access token")
    
    def test_blog_system(self):
        """Test blog management system"""
        print("\n📝 Testing Blog System...")
        
        if not self.access_token:
            self.log_test("Blog system tests", False, "No access token")
            return
            
        # Test get blog posts
        try:
            response = self.session.get(f"{BASE_URL}/api/blog/posts")
            if response.status_code == 200:
                posts = response.json()
                self.log_test("Get blog posts", True, f"Found {len(posts)} posts")
            else:
                self.log_test("Get blog posts", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Get blog posts", False, str(e))
        
        # Test create blog post
        try:
            post_data = {
                "title": "Test Blog Post",
                "content": "This is a test blog post content.",
                "excerpt": "Test excerpt",
                "status": "draft"
            }
            response = self.session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["title"] == "Test Blog Post":
                    post_id = data["id"]
                    self.log_test("Create blog post", True, f"Created post ID: {post_id}")
                    
                    # Test get specific blog post
                    try:
                        response = self.session.get(f"{BASE_URL}/api/blog/posts/{post_id}")
                        if response.status_code == 200:
                            self.log_test("Get specific blog post", True)
                        else:
                            self.log_test("Get specific blog post", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Get specific blog post", False, str(e))
                    
                    # Test update blog post
                    try:
                        update_data = {
                            "title": "Updated Test Blog Post",
                            "content": "Updated content"
                        }
                        response = self.session.put(f"{BASE_URL}/api/blog/posts/{post_id}", json=update_data)
                        if response.status_code == 200:
                            self.log_test("Update blog post", True)
                        else:
                            self.log_test("Update blog post", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Update blog post", False, str(e))
                    
                    # Test toggle publish status
                    try:
                        response = self.session.patch(f"{BASE_URL}/api/blog/posts/{post_id}/publish")
                        if response.status_code == 200:
                            self.log_test("Toggle blog post publish", True)
                        else:
                            self.log_test("Toggle blog post publish", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Toggle blog post publish", False, str(e))
                    
                    # Test delete blog post
                    try:
                        response = self.session.delete(f"{BASE_URL}/api/blog/posts/{post_id}")
                        if response.status_code == 200:
                            self.log_test("Delete blog post", True)
                        else:
                            self.log_test("Delete blog post", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Delete blog post", False, str(e))
                        
                else:
                    self.log_test("Create blog post", False, "Invalid response data")
            else:
                self.log_test("Create blog post", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Create blog post", False, str(e))
    
    def test_newsletter_system(self):
        """Test newsletter management system"""
        print("\n📧 Testing Newsletter System...")
        
        if not self.access_token:
            self.log_test("Newsletter system tests", False, "No access token")
            return
            
        # Test get newsletters
        try:
            response = self.session.get(f"{BASE_URL}/api/newsletter/newsletters")
            if response.status_code == 200:
                newsletters = response.json()
                self.log_test("Get newsletters", True, f"Found {len(newsletters)} newsletters")
            else:
                self.log_test("Get newsletters", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Get newsletters", False, str(e))
        
        # Test create newsletter
        try:
            newsletter_data = {
                "subject": "Test Newsletter",
                "content": "This is a test newsletter content.",
                "status": "draft"
            }
            response = self.session.post(f"{BASE_URL}/api/newsletter/newsletters", json=newsletter_data)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["subject"] == "Test Newsletter":
                    newsletter_id = data["id"]
                    self.log_test("Create newsletter", True, f"Created newsletter ID: {newsletter_id}")
                    
                    # Test get specific newsletter
                    try:
                        response = self.session.get(f"{BASE_URL}/api/newsletter/newsletters/{newsletter_id}")
                        if response.status_code == 200:
                            self.log_test("Get specific newsletter", True)
                        else:
                            self.log_test("Get specific newsletter", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Get specific newsletter", False, str(e))
                    
                    # Test send newsletter
                    try:
                        send_data = {"recipients": ["test@example.com"]}
                        response = self.session.post(f"{BASE_URL}/api/newsletter/newsletters/{newsletter_id}/send", json=send_data)
                        if response.status_code == 200:
                            self.log_test("Send newsletter", True)
                        else:
                            self.log_test("Send newsletter", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Send newsletter", False, str(e))
                    
                    # Test delete newsletter
                    try:
                        response = self.session.delete(f"{BASE_URL}/api/newsletter/newsletters/{newsletter_id}")
                        if response.status_code == 200:
                            self.log_test("Delete newsletter", True)
                        else:
                            self.log_test("Delete newsletter", False, f"Status: {response.status_code}")
                    except Exception as e:
                        self.log_test("Delete newsletter", False, str(e))
                        
                else:
                    self.log_test("Create newsletter", False, "Invalid response data")
            else:
                self.log_test("Create newsletter", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Create newsletter", False, str(e))
    
    def test_file_system(self):
        """Test file management system"""
        print("\n📁 Testing File Management System...")
        
        if not self.access_token:
            self.log_test("File system tests", False, "No access token")
            return
            
        # Test get files
        try:
            response = self.session.get(f"{BASE_URL}/api/files/files")
            if response.status_code == 200:
                files = response.json()
                self.log_test("Get files", True, f"Found {len(files)} files")
            else:
                self.log_test("Get files", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Get files", False, str(e))
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Comprehensive Backend Tests...")
        print("=" * 50)
        
        self.test_health_endpoints()
        self.test_auth_system()
        self.test_blog_system()
        self.test_newsletter_system()
        self.test_file_system()
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['message']}")
        
        return passed_tests == total_tests

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend is working correctly.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Please check the backend.")
        sys.exit(1) 