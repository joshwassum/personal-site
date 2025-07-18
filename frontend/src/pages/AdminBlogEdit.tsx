import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const AdminBlogEdit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('Blog post ID is required');
        setIsLoadingData(false);
        return;
      }

      try {
        const token = localStorage.getItem('adminToken');
        
        const response = await fetch(`http://localhost:8000/api/blog/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBlogPost(data);
        } else {
          setError('Failed to load blog post');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Network error. Please check your connection.');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleSave = async (data: Omit<BlogPostData, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:8000/api/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Blog post updated:', result);
        
        // Redirect to blog list
        navigate('/admin/blog');
      } else {
        const errorData = await response.json();
        console.error('Failed to update blog post:', errorData);
        alert('Failed to update blog post. Please try again.');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blog');
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog Post</h2>
        <p className="text-gray-600 mb-4">{error || 'Blog post not found'}</p>
        <button
          onClick={() => navigate('/admin/blog')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BlogEditor
        initialData={blogPost}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminBlogEdit; 