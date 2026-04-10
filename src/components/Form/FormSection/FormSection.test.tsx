import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormSection } from './FormSection';

describe('FormSection', () => {
  it('renders a section element with accessible name', () => {
    render(<FormSection title="Account"><p>content</p></FormSection>);
    expect(screen.getByRole('region', { name: 'Account' })).toBeInTheDocument();
  });

  it('renders title as h3 by default', () => {
    render(<FormSection title="My Section"><p>content</p></FormSection>);
    expect(screen.getByRole('heading', { level: 3, name: 'My Section' })).toBeInTheDocument();
  });

  it('renders title at specified heading level', () => {
    render(
      <FormSection title="My Section" headingLevel={2}>
        <p>content</p>
      </FormSection>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'My Section' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <FormSection title="Settings" description="Manage your settings">
        <p>content</p>
      </FormSection>,
    );
    expect(screen.getByText('Manage your settings')).toBeInTheDocument();
  });

  it('does not render description element when omitted', () => {
    const { container } = render(
      <FormSection title="Settings"><p>content</p></FormSection>,
    );
    expect(container.querySelectorAll('p')).toHaveLength(1); // only the child <p>
  });

  it('renders children', () => {
    render(
      <FormSection title="Test">
        <span data-testid="child">inner</span>
      </FormSection>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
