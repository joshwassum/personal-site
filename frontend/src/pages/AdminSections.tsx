import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

interface Section {
  id: string;
  section_name: string;
  is_visible: boolean;
  updated_at?: string;
  updated_by?: string;
}

const AdminSections: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:8000/api/sections/visibility/admin", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  };

  const updateSectionVisibility = async (sectionName: string, isVisible: boolean) => {
    try {
      setUpdating(sectionName);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/sections/visibility/${sectionName}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_visible: isVisible }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setSections(prev => 
        prev.map(section => 
          section.section_name === sectionName 
            ? { ...section, is_visible: isVisible }
            : section
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update section");
      // Revert the change on error
      setSections(prev => 
        prev.map(section => 
          section.section_name === sectionName 
            ? { ...section, is_visible: !isVisible }
            : section
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  const resetToDefaults = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:8000/api/sections/visibility/reset", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh sections after reset
      await fetchSections();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset sections");
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const getSectionDisplayName = (sectionName: string) => {
    const displayNames: { [key: string]: string } = {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      portfolio: "Portfolio",
      blog: "Blog",
      newsletter: "Newsletter",
      contact: "Contact"
    };
    return displayNames[sectionName] || sectionName;
  };

  const getSectionDescription = (sectionName: string) => {
    const descriptions: { [key: string]: string } = {
      about: "Personal introduction and background information",
      skills: "Technical skills and competencies",
      experience: "Work history and professional experience",
      portfolio: "Showcase of projects and work samples",
      blog: "Blog posts and articles (hidden by default)",
      newsletter: "Newsletter subscription (hidden by default)",
      contact: "Contact information and form"
    };
    return descriptions[sectionName] || "Website section";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Section Visibility</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Control which sections are visible on your website
                </p>
              </div>
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset to Defaults
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

          <div className="px-6 py-4">
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {getSectionDisplayName(section.section_name)}
                      </h3>
                      {section.section_name === "blog" || section.section_name === "newsletter" ? (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Hidden by Default
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {getSectionDescription(section.section_name)}
                    </p>
                    {section.updated_at && (
                      <p className="mt-1 text-xs text-gray-500">
                        Last updated: {new Date(section.updated_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="ml-6">
                    <Switch
                      checked={section.is_visible}
                      onChange={(enabled: boolean) => updateSectionVisibility(section.section_name, enabled)}
                      disabled={updating === section.section_name}
                      className={`${
                        section.is_visible ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        updating === section.section_name ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <span
                        className={`${
                          section.is_visible ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    {updating === section.section_name && (
                      <div className="mt-2 text-xs text-gray-500">Updating...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900">How it works</h3>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>• Toggle sections on/off to control what visitors see on your website</li>
                <li>• Blog and Newsletter sections are hidden by default for privacy</li>
                <li>• Changes take effect immediately on the frontend</li>
                <li>• Use "Reset to Defaults" to restore the original visibility settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSections; 