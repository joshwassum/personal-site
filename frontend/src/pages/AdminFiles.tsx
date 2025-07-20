import React, { useState, useEffect } from 'react';

interface FileRecord {
  id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  description: string | null;
  uploaded_at: string;
  updated_at: string | null;
}

const AdminFiles: React.FC = () => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileRecord | null>(null);

  const API_BASE = 'http://localhost:8000/api';

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/files/files`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file as any);
    setShowUploadModal(true);
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    if (description) {
      formData.append('description', description);
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        await fetchFiles();
        setShowUploadModal(false);
        setSelectedFile(null);
        setDescription('');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (file: FileRecord) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/files/files/${file.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchFiles();
        setShowDeleteModal(false);
        setFileToDelete(null);
      } else {
        const error = await response.json();
        alert(`Delete failed: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Delete failed');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString();
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType === 'application/pdf') return '📄';
    if (mimeType.includes('word')) return '📝';
    if (mimeType === 'text/plain') return '📄';
    return '📁';
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'images') return matchesSearch && file.mime_type.startsWith('image/');
    if (filterType === 'documents') return matchesSearch && !file.mime_type.startsWith('image/');
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">File Management</h1>
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          📁 Upload File
        </label>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Files</option>
          <option value="images">Images Only</option>
          <option value="documents">Documents Only</option>
        </select>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{getFileIcon(file.mime_type)}</span>
              <button
                onClick={() => {
                  setFileToDelete(file);
                  setShowDeleteModal(true);
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                🗑️
              </button>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 truncate" title={file.original_filename}>
              {file.original_filename}
            </h3>
            
            {file.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{file.description}</p>
            )}
            
            <div className="text-xs text-gray-500 space-y-1">
              <div>Size: {formatFileSize(file.file_size)}</div>
              <div>Type: {file.mime_type}</div>
              <div>Uploaded: {formatDate(file.uploaded_at)}</div>
            </div>
            
            {file.mime_type.startsWith('image/') && (
              <div className="mt-3">
                <img
                  src={`http://localhost:8000/${file.file_path}`}
                  alt={file.original_filename}
                  className="w-full h-32 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No files found</h3>
          <p className="text-gray-500">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your first file to get started'
            }
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected File:
              </label>
              <p className="text-sm text-gray-600">{selectedFile?.name}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter a description for this file..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setDescription('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={uploadFile}
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete File</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{fileToDelete.original_filename}"? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setFileToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteFile(fileToDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFiles; 