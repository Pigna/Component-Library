import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CloseButton } from './CloseButton';

describe('CloseButton', () => {
  it('renders with default aria-label "Close"', () => {
    render(<CloseButton />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders as type="button"', () => {
    render(<CloseButton />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('renders SVG icon with aria-hidden="true"', () => {
    render(<CloseButton />);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports custom aria-label', () => {
    render(<CloseButton aria-label="Dismiss banner" />);
    expect(screen.getByRole('button', { name: 'Dismiss banner' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<CloseButton onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<CloseButton disabled onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is focusable via keyboard', async () => {
    render(<CloseButton />);

    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('renders all sizes without errors', () => {
    const { rerender } = render(<CloseButton size="sm" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<CloseButton size="md" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<CloseButton size="lg" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

