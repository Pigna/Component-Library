import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NotificationPopup } from './NotificationPopup';

describe('NotificationPopup', () => {
  it('renders when visible is true', () => {
    render(<NotificationPopup visible>Hello</NotificationPopup>);
    // default variant is 'info' → role="status"
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render when visible is false', () => {
    render(<NotificationPopup visible={false}>Hello</NotificationPopup>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('uses role="status" and aria-live="polite" for info variant', () => {
    render(<NotificationPopup visible variant="info">Content</NotificationPopup>);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-live', 'polite');
    expect(el).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses role="status" and aria-live="polite" for success variant', () => {
    render(<NotificationPopup visible variant="success">Content</NotificationPopup>);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-live', 'polite');
  });

  it('uses role="alert" and aria-live="assertive" for error variant', () => {
    render(<NotificationPopup visible variant="error">Content</NotificationPopup>);
    const el = screen.getByRole('alert');
    expect(el).toHaveAttribute('aria-live', 'assertive');
    expect(el).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses role="alert" and aria-live="assertive" for warning variant', () => {
    render(<NotificationPopup visible variant="warning">Content</NotificationPopup>);
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

  it('calls onAutoDismiss (not onDismiss) when auto-dismissed and both are provided', async () => {
    vi.useFakeTimers();
    const handleDismiss = vi.fn();
    const handleAutoDismiss = vi.fn();
    render(
      <NotificationPopup
        visible
        autoDismiss
        autoDismissMs={1000}
        onDismiss={handleDismiss}
        onAutoDismiss={handleAutoDismiss}
      >
        Content
      </NotificationPopup>,
    );

    vi.advanceTimersByTime(1000);
    expect(handleAutoDismiss).toHaveBeenCalledTimes(1);
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

  it('calls onExited after exit animation completes', async () => {
    vi.useFakeTimers();
    const handleExited = vi.fn();
    const { rerender } = render(
      <NotificationPopup visible onExited={handleExited}>
        Content
      </NotificationPopup>,
    );

    rerender(<NotificationPopup visible={false} onExited={handleExited}>Content</NotificationPopup>);
    expect(handleExited).not.toHaveBeenCalled();
    await act(() => { vi.advanceTimersByTime(250); });
    expect(handleExited).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(<NotificationPopup visible>Content</NotificationPopup>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

