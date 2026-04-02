import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Dialog } from './Dialog';

/* jsdom does not implement HTMLDialogElement.showModal / .close */
beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
    };
  }
});

describe('Dialog', () => {
  it('renders with the title', () => {
    render(<Dialog open title="Test Dialog" onClose={() => {}} />);
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
  });

  it('renders body content', () => {
    render(
      <Dialog open title="Title" onClose={() => {}}>
        <p>Body content here</p>
      </Dialog>,
    );
    expect(screen.getByText('Body content here')).toBeInTheDocument();
  });

  it('has aria-labelledby pointing to the title', () => {
    render(<Dialog open title="My Title" onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId!)).toHaveTextContent('My Title');
  });

  it('renders close button with aria-label', () => {
    render(<Dialog open title="Title" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<Dialog open title="Title" onClose={handleClose} />);

    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders confirm and cancel buttons by default', () => {
    render(<Dialog open title="Title" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('hides action buttons when hideActions is true', () => {
    render(<Dialog open title="Title" onClose={() => {}} hideActions />);
    expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const handleConfirm = vi.fn();
    render(<Dialog open title="Title" onClose={() => {}} onConfirm={handleConfirm} />);

    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel and onClose when cancel button is clicked', async () => {
    const handleCancel = vi.fn();
    const handleClose = vi.fn();
    render(<Dialog open title="Title" onClose={handleClose} onCancel={handleCancel} />);

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('uses custom confirm and cancel labels', () => {
    render(
      <Dialog
        open
        title="Title"
        onClose={() => {}}
        confirmLabel="Delete"
        cancelLabel="Nevermind"
      />,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nevermind' })).toBeInTheDocument();
  });
});

