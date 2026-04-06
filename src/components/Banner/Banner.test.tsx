import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders children content', () => {
    render(<Banner variant="info">Hello world</Banner>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('uses role="alert" for error variant', () => {
    render(<Banner variant="error">Error occurred</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info variant', () => {
    render(<Banner variant="info">Info message</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for warning variant', () => {
    render(<Banner variant="warning">Warning message</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for success variant', () => {
    render(<Banner variant="success">Success message</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-atomic="true" for complete announcements', () => {
    render(<Banner variant="info">Info message</Banner>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
  });

  it('shows close button when dismissible', () => {
    render(
      <Banner variant="info" dismissible>
        Dismissible
      </Banner>,
    );
    expect(screen.getByRole('button', { name: 'Dismiss banner' })).toBeInTheDocument();
  });

  it('does not show close button when not dismissible', () => {
    render(<Banner variant="info">Not dismissible</Banner>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders SVG icon with aria-hidden="true"', () => {
    const { container } = render(<Banner variant="info">Test</Banner>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  describe('dismiss behaviour', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('applies dismissing class immediately on click', () => {
      const { container } = render(
        <Banner variant="info" dismissible>
          Dismissible
        </Banner>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
      expect(container.querySelector('[class*="dismissing"]')).toBeInTheDocument();
    });

    it('calls onDismiss after the animation duration (250 ms)', () => {
      const handleDismiss = vi.fn();
      render(
        <Banner variant="info" dismissible onDismiss={handleDismiss}>
          Dismissible
        </Banner>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
      act(() => { vi.runAllTimers(); });
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('hides banner after animation even without onDismiss', () => {
      render(
        <Banner variant="info" dismissible>
          Dismissible
        </Banner>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
      act(() => { vi.runAllTimers(); });
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('does not call onDismiss before animation ends', () => {
      const handleDismiss = vi.fn();
      render(
        <Banner variant="info" dismissible onDismiss={handleDismiss}>
          Dismissible
        </Banner>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
      expect(handleDismiss).not.toHaveBeenCalled();
    });
  });
});
