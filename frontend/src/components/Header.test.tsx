import { render, screen } from '@testing-library/react';
import Header from './Header';
import { SectionVisibilityProvider } from '../contexts/SectionVisibilityContext';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders the site name and navigation', () => {
    render(
      <MemoryRouter>
        <SectionVisibilityProvider>
          <Header darkMode={false} toggleDarkMode={() => {}} />
        </SectionVisibilityProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/Josh Wassum/i)).toBeInTheDocument();
  });
}); 