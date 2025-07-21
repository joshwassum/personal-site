import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Section {
  id: string;
  section_name: string;
  is_visible: boolean;
  updated_at?: string;
  updated_by?: string;
}

interface SectionVisibilityContextType {
  sections: Section[];
  loading: boolean;
  error: string | null;
  isSectionVisible: (sectionName: string) => boolean;
  refreshSections: () => Promise<void>;
}

const SectionVisibilityContext = createContext<SectionVisibilityContextType | undefined>(undefined);

export const useSectionVisibility = () => {
  const context = useContext(SectionVisibilityContext);
  if (context === undefined) {
    throw new Error('useSectionVisibility must be used within a SectionVisibilityProvider');
  }
  return context;
};

interface SectionVisibilityProviderProps {
  children: ReactNode;
}

export const SectionVisibilityProvider: React.FC<SectionVisibilityProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/api/sections/visibility');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch section visibility');
      // Set default sections if API fails
      setSections([
        { id: '1', section_name: 'about', is_visible: true },
        { id: '2', section_name: 'skills', is_visible: true },
        { id: '3', section_name: 'experience', is_visible: true },
        { id: '4', section_name: 'portfolio', is_visible: true },
        { id: '5', section_name: 'blog', is_visible: false },
        { id: '6', section_name: 'newsletter', is_visible: false },
        { id: '7', section_name: 'contact', is_visible: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isSectionVisible = (sectionName: string): boolean => {
    const section = sections.find(s => s.section_name === sectionName);
    return section?.is_visible ?? true; // Default to visible if not found
  };

  const refreshSections = async () => {
    await fetchSections();
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const value: SectionVisibilityContextType = {
    sections,
    loading,
    error,
    isSectionVisible,
    refreshSections,
  };

  return (
    <SectionVisibilityContext.Provider value={value}>
      {children}
    </SectionVisibilityContext.Provider>
  );
}; 