import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  is_published: boolean;
}

const AdminBlogCreate: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (data: BlogPostData) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('http://localhost:8000/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Blog post created:', result);
        
        // Redirect to blog list
        navigate('/admin/blog');
      } else {
        const errorData = await response.json();
        console.error('Failed to create blog post:', errorData);
        alert('Failed to create blog post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blog');
  };

  return (
    <div className="space-y-6">
      <BlogEditor
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminBlogCreate; 