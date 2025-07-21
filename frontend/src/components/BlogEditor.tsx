import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Editor } from '@tinymce/tinymce-react';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt must be less than 300 characters'),
  content: z.string().min(1, 'Content is required'),
  is_published: z.boolean(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogEditorProps {
  initialData?: Partial<BlogPostFormData>;
  onSave: (data: BlogPostFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  initialData,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(initialData?.content || '');
  const editorRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      is_published: initialData?.is_published ?? false,
    },
  });

  const watchedTitle = watch('title');

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchedTitle && !initialData?.slug) {
      const generatedSlug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', generatedSlug);
    }
  }, [watchedTitle, setValue, initialData?.slug]);

  const onSubmit = handleSubmit(async (data: BlogPostFormData) => {
    const editorContent = editorRef.current?.getContent() || content;
    const formData = {
      ...data,
      content: editorContent,
    };
    await onSave(formData);
  });

  const handleEditorChange = (content: string) => {
    setContent(content);
    setValue('content', content);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-form"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <form id="blog-form" onSubmit={onSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter post title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                {...register('slug')}
                type="text"
                id="slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="post-url-slug"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              {...register('excerpt')}
              id="excerpt"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the post..."
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                {...register('is_published')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
            </label>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Content</h2>
          </div>
          
          <div className="p-6">
            {isPreview ? (
              <div className="prose max-w-none">
                <h1>{watchedTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <Editor
                onInit={(_, editor) => (editorRef.current = editor)}
                value={content}
                onEditorChange={handleEditorChange}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  placeholder: 'Start writing your blog post...',
                }}
              />
            )}
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* SEO & Meta */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">SEO & Meta</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                id="meta_title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SEO title for search engines..."
                defaultValue={watchedTitle}
              />
            </div>

            <div>
              <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                id="meta_description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SEO description for search engines..."
                defaultValue={watch('excerpt')}
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tags separated by commas..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor; 