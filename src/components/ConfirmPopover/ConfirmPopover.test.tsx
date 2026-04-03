import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmPopover } from './ConfirmPopover';

describe('ConfirmPopover', () => {
  const defaultProps = {
    trigger: <button>Delete</button>,
    message: 'Are you sure?',
    onConfirm: vi.fn(),
  };

  it('renders the trigger element', () => {
    render(<ConfirmPopover {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('does not render the popover panel by default', () => {
    render(<ConfirmPopover {...defaultProps} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens popover on trigger click', async () => {
    render(<ConfirmPopover {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('shows warning icon inside the popover', async () => {
    render(<ConfirmPopover {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    // SVG icon is aria-hidden so query by svg element
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('svg')).toBeInTheDocument();
  });

  it('shows confirm and cancel buttons with default labels', async () => {
    render(<ConfirmPopover {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('shows custom labels', async () => {
    render(
      <ConfirmPopover
        {...defaultProps}
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('button', { name: 'Yes, delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No, keep' })).toBeInTheDocument();
  });

  it('calls onConfirm and closes the popover when confirm is clicked', async () => {
    const onConfirm = vi.fn();
    render(<ConfirmPopover {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onCancel and closes the popover when cancel is clicked', async () => {
    const onCancel = vi.fn();
    render(<ConfirmPopover {...defaultProps} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(<ConfirmPopover {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports controlled open state', () => {
    render(
      <ConfirmPopover
        {...defaultProps}
        open={true}
        onOpenChange={() => {}}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});


