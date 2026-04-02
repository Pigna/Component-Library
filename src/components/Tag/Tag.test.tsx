import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders label text', () => {
    render(<Tag label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<Tag label="Docs" href="/docs" />);
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument();
  });

  it('renders without a link when href is not provided', () => {
    render(<Tag label="Static" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('shows remove button when removable', () => {
    render(<Tag label="Remove me" removable />);
    expect(screen.getByRole('button', { name: 'Remove Remove me' })).toBeInTheDocument();
  });

  it('does not show remove button when not removable', () => {
    render(<Tag label="Static" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const handleRemove = vi.fn();
    render(<Tag label="Tag" removable onRemove={handleRemove} />);

    await userEvent.click(screen.getByRole('button', { name: 'Remove Tag' }));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('remove button is keyboard accessible', async () => {
    const handleRemove = vi.fn();
    render(<Tag label="Tag" removable onRemove={handleRemove} />);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Remove Tag' })).toHaveFocus();
  });
});

