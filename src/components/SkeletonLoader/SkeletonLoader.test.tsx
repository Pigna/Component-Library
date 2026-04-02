import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkeletonLoader } from './SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders with role="status"', () => {
    render(<SkeletonLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-busy="true"', () => {
    render(<SkeletonLoader />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders sr-only "Loading…" text', () => {
    render(<SkeletonLoader />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders skeleton shapes with aria-hidden="true"', () => {
    render(<SkeletonLoader />);
    const shapes = screen.getByRole('status').querySelectorAll('[aria-hidden="true"]');
    expect(shapes.length).toBeGreaterThan(0);
  });

  it('renders the correct number of lines for text variant', () => {
    render(<SkeletonLoader variant="text" lines={4} />);
    const shapes = screen.getByRole('status').querySelectorAll('[aria-hidden="true"]');
    expect(shapes).toHaveLength(4);
  });

  it('renders a single shape for circle variant regardless of lines prop', () => {
    render(<SkeletonLoader variant="circle" lines={5} />);
    const shapes = screen.getByRole('status').querySelectorAll('[aria-hidden="true"]');
    expect(shapes).toHaveLength(1);
  });

  it('renders a single shape for rectangle variant', () => {
    render(<SkeletonLoader variant="rectangle" />);
    const shapes = screen.getByRole('status').querySelectorAll('[aria-hidden="true"]');
    expect(shapes).toHaveLength(1);
  });

  it('makes the last line shorter in multi-line text', () => {
    render(<SkeletonLoader variant="text" lines={3} />);
    const shapes = screen.getByRole('status').querySelectorAll('[aria-hidden="true"]');
    const lastShape = shapes[shapes.length - 1] as HTMLElement;
    expect(lastShape.style.width).toBe('75%');
  });
});

