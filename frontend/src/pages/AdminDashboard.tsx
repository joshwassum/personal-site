import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  blogPosts: number;
  newsletters: number;
  contactMessages: number;
  sections: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    blogPosts: 0,
    newsletters: 0,
    contactMessages: 0,
    sections: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch actual stats from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        blogPosts: 12,
        newsletters: 5,
        contactMessages: 8,
        sections: 6,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const quickActions = [
    {
      title: 'Create Blog Post',
      description: 'Add a new blog post to your website',
      href: '/admin/blog/new',
      icon: '📝',
      color: 'bg-blue-500',
    },
    {
      title: 'Send Newsletter',
      description: 'Create and send a newsletter to subscribers',
      href: '/admin/newsletters/new',
      icon: '📧',
      color: 'bg-green-500',
    },
    {
      title: 'View Messages',
      description: 'Check recent contact form submissions',
      href: '/admin/contact',
      icon: '💬',
      color: 'bg-purple-500',
    },
    {
      title: 'Manage Sections',
      description: 'Control which sections are visible',
      href: '/admin/sections',
      icon: '👁️',
      color: 'bg-orange-500',
    },
  ];

  const recentActivity = [
    {
      type: 'blog',
      title: 'New blog post published',
      description: 'Getting Started with React',
      time: '2 hours ago',
    },
    {
      type: 'contact',
      title: 'New contact message',
      description: 'From: john@example.com',
      time: '4 hours ago',
    },
    {
      type: 'newsletter',
      title: 'Newsletter sent',
      description: 'Monthly Update - July 2025',
      time: '1 day ago',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-blue-100">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.blogPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <span className="text-2xl">📧</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Newsletters</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newsletters}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.contactMessages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sections</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sections}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg text-white ${action.color}`}>
                    <span className="text-xl">{action.icon}</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm">
                      {activity.type === 'blog' && '📝'}
                      {activity.type === 'contact' && '💬'}
                      {activity.type === 'newsletter' && '📧'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">System Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Backend API</p>
                <p className="text-xs text-green-600">Running smoothly</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Database</p>
                <p className="text-xs text-green-600">Connected</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Frontend</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 