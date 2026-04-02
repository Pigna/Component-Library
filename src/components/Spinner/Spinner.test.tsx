import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-live="polite"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('renders default "Loading" sr-only text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders custom label text', () => {
    render(<Spinner label="Fetching data" />);
    expect(screen.getByText('Fetching data')).toBeInTheDocument();
  });

  it('renders SVG icon with aria-hidden="true"', () => {
    render(<Spinner />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders all sizes without errors', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Spinner size="md" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

