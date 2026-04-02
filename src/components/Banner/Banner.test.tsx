import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
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

  it('calls onDismiss when close button is clicked', async () => {
    const handleDismiss = vi.fn();
    render(
      <Banner variant="info" dismissible onDismiss={handleDismiss}>
        Dismissible
      </Banner>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders icon with aria-hidden="true"', () => {
    const { container } = render(<Banner variant="info">Test</Banner>);
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });
});

