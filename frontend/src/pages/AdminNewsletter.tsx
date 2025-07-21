import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Send, Search } from 'lucide-react';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'sent';
  sent_at?: string;
  created_at: string;
  updated_at?: string;
  author_id: string;
}

const AdminNewsletter: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'sent'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    content: ''
  });

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8000/api/newsletter/newsletters', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNewsletters(data);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8000/api/newsletter/newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({ subject: '', content: '' });
        fetchNewsletters();
      }
    } catch (error) {
      console.error('Error creating newsletter:', error);
    }
  };

  const handleUpdateNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNewsletter) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/newsletter/newsletters/${selectedNewsletter.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowEditModal(false);
        setSelectedNewsletter(null);
        setFormData({ subject: '', content: '' });
        fetchNewsletters();
      }
    } catch (error) {
      console.error('Error updating newsletter:', error);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    if (!confirm('Are you sure you want to delete this newsletter?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/newsletter/newsletters/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchNewsletters();
      }
    } catch (error) {
      console.error('Error deleting newsletter:', error);
    }
  };

  const handleSendNewsletter = async (id: string) => {
    if (!confirm('Are you sure you want to send this newsletter?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/newsletter/newsletters/${id}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ send_to_all: true })
      });

      if (response.ok) {
        fetchNewsletters();
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
    }
  };

  const openEditModal = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setFormData({
      subject: newsletter.subject,
      content: newsletter.content
    });
    setShowEditModal(true);
  };

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || newsletter.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" aria-hidden="true"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main" id="main-content">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
            Newsletter Management
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Create and manage newsletters for your subscribers
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} aria-hidden="true" />
          Create Newsletter
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                aria-label="Search newsletters"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'sent')}
              className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
              aria-label="Filter newsletters by status"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Newsletter List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Newsletter list">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-secondary-100" scope="col">
                  Subject
                </th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-secondary-100" scope="col">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-secondary-100" scope="col">
                  Created
                </th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-secondary-100" scope="col">
                  Sent
                </th>
                <th className="text-right py-3 px-4 font-semibold text-secondary-900 dark:text-secondary-100" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNewsletters.map((newsletter) => (
                <tr key={newsletter.id} className="border-b border-secondary-100 dark:border-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-secondary-900 dark:text-secondary-100">
                        {newsletter.subject}
                      </div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400 truncate max-w-xs">
                        {newsletter.content.substring(0, 100)}...
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      newsletter.status === 'sent' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {newsletter.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-secondary-600 dark:text-secondary-400">
                    {new Date(newsletter.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-secondary-600 dark:text-secondary-400">
                    {newsletter.sent_at ? new Date(newsletter.sent_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(newsletter)}
                        className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                        title="Edit"
                        aria-label={`Edit newsletter: ${newsletter.subject}`}
                      >
                        <Edit size={16} aria-hidden="true" />
                      </button>
                      {newsletter.status === 'draft' && (
                        <button
                          onClick={() => handleSendNewsletter(newsletter.id)}
                          className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-green-600 dark:hover:text-green-400"
                          title="Send"
                          aria-label={`Send newsletter: ${newsletter.subject}`}
                        >
                          <Send size={16} aria-hidden="true" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNewsletter(newsletter.id)}
                        className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete"
                        aria-label={`Delete newsletter: ${newsletter.subject}`}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNewsletters.length === 0 && (
          <div className="text-center py-8" aria-live="polite">
            <p className="text-secondary-500 dark:text-secondary-400">
              No newsletters found
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="create-newsletter-heading">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 id="create-newsletter-heading" className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              Create Newsletter
            </h2>
            <form onSubmit={handleCreateNewsletter}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedNewsletter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="edit-newsletter-heading">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 id="edit-newsletter-heading" className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              Edit Newsletter
            </h2>
            <form onSubmit={handleUpdateNewsletter}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletter; 