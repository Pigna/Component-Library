import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NotificationPopup } from './NotificationPopup';

describe('NotificationPopup', () => {
  it('renders when visible is true', () => {
    render(<NotificationPopup visible>Hello</NotificationPopup>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render when visible is false', () => {
    render(<NotificationPopup visible={false}>Hello</NotificationPopup>);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has role="alert" and aria-live="assertive"', () => {
    render(<NotificationPopup visible>Content</NotificationPopup>);
    const el = screen.getByRole('alert');
    expect(el).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders title when provided', () => {
    render(<NotificationPopup visible title="Saved">Content</NotificationPopup>);
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('renders dismiss button', () => {
    render(<NotificationPopup visible>Content</NotificationPopup>);
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const handleDismiss = vi.fn();
    render(<NotificationPopup visible onDismiss={handleDismiss}>Content</NotificationPopup>);

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after timeout', async () => {
    vi.useFakeTimers();
    const handleDismiss = vi.fn();
    render(
      <NotificationPopup visible autoDismiss autoDismissMs={1000} onDismiss={handleDismiss}>
        Content
      </NotificationPopup>,
    );

    expect(handleDismiss).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not auto-dismiss when autoDismiss is false', () => {
    vi.useFakeTimers();
    const handleDismiss = vi.fn();
    render(
      <NotificationPopup visible autoDismiss={false} autoDismissMs={1000} onDismiss={handleDismiss}>
        Content
      </NotificationPopup>,
    );

    vi.advanceTimersByTime(2000);
    expect(handleDismiss).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(<NotificationPopup visible>Content</NotificationPopup>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

