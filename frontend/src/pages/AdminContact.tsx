import React, { useState, useEffect } from "react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
  ip_address?: string;
  user_agent?: string;
}

interface ContactMessagesResponse {
  messages: ContactMessage[];
  total: number;
  unread_count: number;
}

const AdminContact: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:8000/api/contact/messages", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ContactMessagesResponse = await response.json();
      setMessages(data.messages);
      setTotal(data.total);
      setUnreadCount(data.unread_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      setUpdating(messageId);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/contact/messages/${messageId}/mark-read`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, is_read: true }
            : msg
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark message as read");
    } finally {
      setUpdating(null);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      setUpdating(messageId);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/contact/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from local state
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setTotal(prev => prev - 1);
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
                <p className="mt-1 text-sm text-gray-600">
                  {total} total messages • {unreadCount} unread
                </p>
              </div>
              <button
                onClick={fetchMessages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex h-96">
            {/* Message List */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No messages found
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      } ${!message.is_read ? 'bg-yellow-50' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className={`text-sm font-medium truncate ${
                              !message.is_read ? 'text-gray-900 font-semibold' : 'text-gray-700'
                            }`}>
                              {message.name}
                            </h3>
                            {!message.is_read && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(message.created_at)}</p>
                        </div>
                        <div className="ml-2 flex space-x-1">
                          {!message.is_read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(message.id);
                              }}
                              disabled={updating === message.id}
                              className="p-1 text-gray-400 hover:text-green-600 disabled:opacity-50"
                              title="Mark as read"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(message.id);
                            }}
                            disabled={updating === message.id}
                            className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-50"
                            title="Delete message"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="flex-1 p-6">
              {selectedMessage ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                    <div className="flex items-center space-x-2">
                      {!selectedMessage.is_read && (
                        <button
                          onClick={() => markAsRead(selectedMessage.id)}
                          disabled={updating === selectedMessage.id}
                          className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 disabled:opacity-50"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        disabled={updating === selectedMessage.id}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">From</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.email}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    {selectedMessage.ip_address && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">IP Address</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.ip_address}</p>
                      </div>
                    )}

                    {selectedMessage.user_agent && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">User Agent</label>
                        <p className="mt-1 text-sm text-gray-900 break-all">{selectedMessage.user_agent}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select a message from the list to view its details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact; 