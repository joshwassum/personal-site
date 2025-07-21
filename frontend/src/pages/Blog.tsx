import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const Blog: React.FC = () => {
  return (
    <SectionWrapper 
      sectionName="blog"
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600">This section is currently hidden by the administrator.</p>
          </div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Blog posts and articles will be available here soon.
          </p>
          <p className="text-sm text-gray-500">
            This section is managed through the admin panel.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Blog; 