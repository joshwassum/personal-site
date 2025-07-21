import React from 'react';
import { useSectionVisibility } from '../contexts/SectionVisibilityContext';

interface SectionWrapperProps {
  sectionName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  sectionName, 
  children, 
  fallback = null 
}) => {
  const { isSectionVisible } = useSectionVisibility();

  if (!isSectionVisible(sectionName)) {
    return fallback;
  }

  return <>{children}</>;
};

export default SectionWrapper; 