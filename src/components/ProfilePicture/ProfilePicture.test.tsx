import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfilePicture } from './ProfilePicture';

describe('ProfilePicture', () => {
  it('renders an image when src is provided', () => {
    render(<ProfilePicture src="/avatar.jpg" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('renders initials fallback when no src is provided', () => {
    render(<ProfilePicture initials="JD" alt="Jane Doe" />);
    const fallback = screen.getByRole('img', { name: 'Jane Doe' });
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent('JD');
  });

  it('falls back to initials on image error', () => {
    render(<ProfilePicture src="/broken.jpg" initials="JD" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    fireEvent.error(img);

    const fallback = screen.getByRole('img', { name: 'Jane Doe' });
    expect(fallback).toHaveTextContent('JD');
  });

  it('renders status dot with sr-only text', () => {
    render(<ProfilePicture initials="JD" alt="Jane Doe" status="online" />);
    expect(screen.getByText('Status: online')).toBeInTheDocument();
  });

  it('does not render status when status is not provided', () => {
    render(<ProfilePicture initials="JD" alt="Jane Doe" />);
    expect(screen.queryByText(/Status:/)).not.toBeInTheDocument();
  });

  it('renders all sizes without errors', () => {
    const { rerender } = render(<ProfilePicture initials="A" alt="test" size="sm" />);
    expect(screen.getByRole('img')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" size="md" />);
    expect(screen.getByRole('img')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" size="lg" />);
    expect(screen.getByRole('img')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" size="xl" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders all status variants', () => {
    const { rerender } = render(<ProfilePicture initials="A" alt="test" status="online" />);
    expect(screen.getByText('Status: online')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" status="away" />);
    expect(screen.getByText('Status: away')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" status="busy" />);
    expect(screen.getByText('Status: busy')).toBeInTheDocument();

    rerender(<ProfilePicture initials="A" alt="test" status="offline" />);
    expect(screen.getByText('Status: offline')).toBeInTheDocument();
  });
});

