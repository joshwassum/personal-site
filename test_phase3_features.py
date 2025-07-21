#!/usr/bin/env python3
"""
Phase 3 Features Test Suite
Tests section visibility controls and contact form handling
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_section_visibility():
    """Test section visibility API endpoints"""
    print("🔍 Testing Section Visibility API...")
    
    # Test public endpoint
    response = requests.get(f"{BASE_URL}/api/sections/visibility")
    if response.status_code == 200:
        sections = response.json()
        print(f"✅ Public sections endpoint: {len(sections.get('sections', []))} sections found")
        
        # Check default sections
        section_names = [s['section_name'] for s in sections.get('sections', [])]
        expected_sections = ['about', 'skills', 'experience', 'portfolio', 'blog', 'newsletter', 'contact']
        for section in expected_sections:
            if section in section_names:
                print(f"   ✅ {section} section exists")
            else:
                print(f"   ❌ {section} section missing")
    else:
        print(f"❌ Public sections endpoint failed: {response.status_code}")

def test_contact_form():
    """Test contact form submission"""
    print("\n📧 Testing Contact Form API...")
    
    # Test contact form submission
    contact_data = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Test Message",
        "message": "This is a test contact message from the Phase 3 test suite."
    }
    
    response = requests.post(f"{BASE_URL}/api/contact/submit", json=contact_data)
    if response.status_code == 200:
        message = response.json()
        print(f"✅ Contact form submission successful: {message['id']}")
        return message['id']
    else:
        print(f"❌ Contact form submission failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return None

def test_admin_contact_management(message_id):
    """Test admin contact message management"""
    if not message_id:
        print("❌ Skipping admin contact tests - no message ID")
        return
    
    print("\n👤 Testing Admin Contact Management...")
    
    # First, we need to login to get a token
    login_data = {
        "username": "jcwassum",
        "password": "DADhair72!"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"❌ Admin login failed: {response.status_code}")
        return
    
    token = response.json()['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test getting contact messages
    response = requests.get(f"{BASE_URL}/api/contact/messages", headers=headers)
    if response.status_code == 200:
        messages = response.json()
        print(f"✅ Admin can view contact messages: {messages['total']} total, {messages['unread_count']} unread")
    else:
        print(f"❌ Admin contact messages failed: {response.status_code}")
    
    # Test marking message as read
    response = requests.post(f"{BASE_URL}/api/contact/messages/{message_id}/mark-read", headers=headers)
    if response.status_code == 200:
        print(f"✅ Message marked as read successfully")
    else:
        print(f"❌ Mark as read failed: {response.status_code}")
    
    # Test getting specific message
    response = requests.get(f"{BASE_URL}/api/contact/messages/{message_id}", headers=headers)
    if response.status_code == 200:
        message = response.json()
        print(f"✅ Admin can view specific message: {message['subject']}")
    else:
        print(f"❌ Get specific message failed: {response.status_code}")

def test_admin_section_management():
    """Test admin section visibility management"""
    print("\n👁️ Testing Admin Section Management...")
    
    # Login to get token
    login_data = {
        "username": "jcwassum",
        "password": "DADhair72!"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"❌ Admin login failed: {response.status_code}")
        return
    
    token = response.json()['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test admin sections endpoint
    response = requests.get(f"{BASE_URL}/api/sections/visibility/admin", headers=headers)
    if response.status_code == 200:
        sections = response.json()
        print(f"✅ Admin can view sections: {len(sections.get('sections', []))} sections")
    else:
        print(f"❌ Admin sections endpoint failed: {response.status_code}")
    
    # Test updating section visibility
    update_data = {"is_visible": False}
    response = requests.put(f"{BASE_URL}/api/sections/visibility/blog", json=update_data, headers=headers)
    if response.status_code == 200:
        section = response.json()
        print(f"✅ Blog section visibility updated: {section['is_visible']}")
    else:
        print(f"❌ Update section visibility failed: {response.status_code}")
    
    # Test reset to defaults
    response = requests.post(f"{BASE_URL}/api/sections/visibility/reset", headers=headers)
    if response.status_code == 200:
        print(f"✅ Sections reset to defaults")
    else:
        print(f"❌ Reset sections failed: {response.status_code}")

def main():
    """Run all Phase 3 feature tests"""
    print("🚀 Phase 3 Features Test Suite")
    print("=" * 50)
    
    # Test section visibility
    test_section_visibility()
    
    # Test contact form
    message_id = test_contact_form()
    
    # Test admin features
    test_admin_contact_management(message_id)
    test_admin_section_management()
    
    print("\n" + "=" * 50)
    print("✅ Phase 3 Features Test Complete!")
    print("\n📋 Next Steps:")
    print("   1. Visit http://localhost:5173/admin/sections to test section visibility UI")
    print("   2. Visit http://localhost:5173/admin/contact to test contact management UI")
    print("   3. Test the contact form on the public website")
    print("   4. Continue with remaining Phase 3 features")

if __name__ == "__main__":
    main() 