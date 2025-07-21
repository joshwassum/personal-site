/**
 * Simple frontend test for admin interface
 * Run this in the browser console on the admin login page
 */

class AdminInterfaceTester {
    constructor() {
        this.baseUrl = 'http://localhost:5173';
        this.apiUrl = 'http://localhost:8000';
        this.testResults = [];
    }

    logTest(testName, success, message = '') {
        const status = success ? '✅ PASS' : '❌ FAIL';
        const result = `${status} ${testName}`;
        const fullMessage = message ? `${result} - ${message}` : result;
        console.log(fullMessage);
        this.testResults.push({ test: testName, success, message });
    }

    async testAdminLogin() {
        console.log('\n🔐 Testing Admin Login...');
        
        try {
            // Test login form submission
            const loginData = {
                username: 'jcwassum',
                password: 'DADhair72!'
            };

            const response = await fetch(`${this.apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.access_token) {
                    this.logTest('Admin login API', true, 'Login successful');
                    return data.access_token;
                } else {
                    this.logTest('Admin login API', false, 'No access token received');
                    return null;
                }
            } else {
                this.logTest('Admin login API', false, `Status: ${response.status}`);
                return null;
            }
        } catch (error) {
            this.logTest('Admin login API', false, error.message);
            return null;
        }
    }

    async testProtectedEndpoints(token) {
        console.log('\n🔒 Testing Protected Endpoints...');
        
        if (!token) {
            this.logTest('Protected endpoints', false, 'No token available');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Test get current user
        try {
            const response = await fetch(`${this.apiUrl}/api/auth/me`, { headers });
            if (response.ok) {
                const data = await response.json();
                if (data.username === 'jcwassum') {
                    this.logTest('Get current user', true);
                } else {
                    this.logTest('Get current user', false, 'Invalid user data');
                }
            } else {
                this.logTest('Get current user', false, `Status: ${response.status}`);
            }
        } catch (error) {
            this.logTest('Get current user', false, error.message);
        }

        // Test blog endpoints
        try {
            const response = await fetch(`${this.apiUrl}/api/blog/posts`, { headers });
            if (response.ok) {
                const posts = await response.json();
                this.logTest('Get blog posts', true, `Found ${posts.length} posts`);
            } else {
                this.logTest('Get blog posts', false, `Status: ${response.status}`);
            }
        } catch (error) {
            this.logTest('Get blog posts', false, error.message);
        }

        // Test newsletter endpoints
        try {
            const response = await fetch(`${this.apiUrl}/api/newsletter/newsletters`, { headers });
            if (response.ok) {
                const newsletters = await response.json();
                this.logTest('Get newsletters', true, `Found ${newsletters.length} newsletters`);
            } else {
                this.logTest('Get newsletters', false, `Status: ${response.status}`);
            }
        } catch (error) {
            this.logTest('Get newsletters', false, error.message);
        }

        // Test file endpoints
        try {
            const response = await fetch(`${this.apiUrl}/api/files/files`, { headers });
            if (response.ok) {
                const files = await response.json();
                this.logTest('Get files', true, `Found ${files.length} files`);
            } else {
                this.logTest('Get files', false, `Status: ${response.status}`);
            }
        } catch (error) {
            this.logTest('Get files', false, error.message);
        }
    }

    testFrontendComponents() {
        console.log('\n🎨 Testing Frontend Components...');
        
        // Test if admin login page elements exist
        const loginForm = document.querySelector('form');
        if (loginForm) {
            this.logTest('Login form exists', true);
        } else {
            this.logTest('Login form exists', false, 'Login form not found');
        }

        const usernameInput = document.querySelector('input[name="username"], input[type="text"]');
        if (usernameInput) {
            this.logTest('Username input exists', true);
        } else {
            this.logTest('Username input exists', false, 'Username input not found');
        }

        const passwordInput = document.querySelector('input[name="password"], input[type="password"]');
        if (passwordInput) {
            this.logTest('Password input exists', true);
        } else {
            this.logTest('Password input exists', false, 'Password input not found');
        }

        const loginButton = document.querySelector('button[type="submit"], button');
        if (loginButton) {
            this.logTest('Login button exists', true);
        } else {
            this.logTest('Login button exists', false, 'Login button not found');
        }
    }

    async runAllTests() {
        console.log('🚀 Starting Frontend Admin Interface Tests...');
        console.log('='.repeat(50));

        this.testFrontendComponents();
        const token = await this.testAdminLogin();
        await this.testProtectedEndpoints(token);

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(50));

        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.success).length;
        const failedTests = totalTests - passedTests;

        console.log(`Total Tests: ${totalTests}`);
        console.log(`✅ Passed: ${passedTests}`);
        console.log(`❌ Failed: ${failedTests}`);
        console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

        if (failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults
                .filter(r => !r.success)
                .forEach(result => {
                    console.log(`  - ${result.test}: ${result.message}`);
                });
        }

        return passedTests === totalTests;
    }
}

// Run tests when script is loaded
if (typeof window !== 'undefined') {
    const tester = new AdminInterfaceTester();
    tester.runAllTests().then(success => {
        if (success) {
            console.log('\n🎉 All frontend tests passed! Admin interface is working correctly.');
        } else {
            console.log('\n⚠️  Some frontend tests failed. Please check the admin interface.');
        }
    });
}

// Export for use in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminInterfaceTester;
} 