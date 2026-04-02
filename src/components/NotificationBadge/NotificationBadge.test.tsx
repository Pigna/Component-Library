import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotificationBadge } from './NotificationBadge';

describe('NotificationBadge', () => {
  it('renders children', () => {
    render(
      <NotificationBadge count={3}>
        <span data-testid="icon">icon</span>
      </NotificationBadge>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('displays count when count > 0', () => {
    render(<NotificationBadge count={5}>icon</NotificationBadge>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays max+ when count exceeds max', () => {
    render(<NotificationBadge count={150} max={99}>icon</NotificationBadge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('has aria-label with count text', () => {
    render(<NotificationBadge count={5}>icon</NotificationBadge>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', '5 notifications');
  });

  it('hides badge when count is 0', () => {
    render(<NotificationBadge count={0}>icon</NotificationBadge>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows dot badge when dot prop is true', () => {
    render(<NotificationBadge dot>icon</NotificationBadge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('provides sr-only "New notifications" for dot badge', () => {
    render(<NotificationBadge dot>icon</NotificationBadge>);
    expect(screen.getByText('New notifications')).toBeInTheDocument();
  });

  it('hides badge when neither count nor dot is set', () => {
    render(<NotificationBadge>icon</NotificationBadge>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

