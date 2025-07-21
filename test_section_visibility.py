#!/usr/bin/env python3
"""
Test script to verify section visibility functionality
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def login_admin():
    """Login as admin and return token"""
    login_data = {
        "username": "jcwassum",
        "password": "DADhair72!"
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        print(f"❌ Login failed: {response.status_code}")
        return None

def test_section_visibility():
    """Test section visibility functionality"""
    print("🔍 Testing Section Visibility Functionality...")
    
    # Login as admin
    token = login_admin()
    if not token:
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get current sections
    response = requests.get(f"{BASE_URL}/api/sections/visibility/admin", headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to get sections: {response.status_code}")
        return
    
    sections = response.json()
    print(f"✅ Current sections: {len(sections.get('sections', []))} sections")
    
    # Test hiding blog section
    print("\n📝 Testing hide blog section...")
    response = requests.put(
        f"{BASE_URL}/api/sections/visibility/blog", 
        json={"is_visible": False}, 
        headers=headers
    )
    if response.status_code == 200:
        section = response.json()
        print(f"✅ Blog section hidden: {section['is_visible']}")
    else:
        print(f"❌ Failed to hide blog: {response.status_code}")
    
    # Test hiding newsletter section
    print("\n📧 Testing hide newsletter section...")
    response = requests.put(
        f"{BASE_URL}/api/sections/visibility/newsletter", 
        json={"is_visible": False}, 
        headers=headers
    )
    if response.status_code == 200:
        section = response.json()
        print(f"✅ Newsletter section hidden: {section['is_visible']}")
    else:
        print(f"❌ Failed to hide newsletter: {response.status_code}")
    
    # Test public endpoint
    print("\n🌐 Testing public sections endpoint...")
    response = requests.get(f"{BASE_URL}/api/sections/visibility")
    if response.status_code == 200:
        public_sections = response.json()
        blog_visible = next((s['is_visible'] for s in public_sections['sections'] if s['section_name'] == 'blog'), True)
        newsletter_visible = next((s['is_visible'] for s in public_sections['sections'] if s['section_name'] == 'newsletter'), True)
        print(f"✅ Public API - Blog visible: {blog_visible}, Newsletter visible: {newsletter_visible}")
    else:
        print(f"❌ Public sections endpoint failed: {response.status_code}")
    
    # Test showing sections again
    print("\n🔄 Testing show sections again...")
    response = requests.put(
        f"{BASE_URL}/api/sections/visibility/blog", 
        json={"is_visible": True}, 
        headers=headers
    )
    if response.status_code == 200:
        print("✅ Blog section shown again")
    
    response = requests.put(
        f"{BASE_URL}/api/sections/visibility/newsletter", 
        json={"is_visible": True}, 
        headers=headers
    )
    if response.status_code == 200:
        print("✅ Newsletter section shown again")
    
    print("\n" + "=" * 50)
    print("✅ Section visibility test complete!")
    print("\n📋 Next steps:")
    print("   1. Visit http://localhost:5173 to see the frontend")
    print("   2. Check that Blog and Newsletter links are hidden/shown in navigation")
    print("   3. Try accessing /blog and /newsletter directly")
    print("   4. Use admin panel to toggle sections on/off")

if __name__ == "__main__":
    test_section_visibility() 