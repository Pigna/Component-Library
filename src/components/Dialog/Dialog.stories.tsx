import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    hideActions: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/** Default dialog with confirm/cancel actions. */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          onConfirm={() => setOpen(false)}
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Dialog>
      </>
    );
  },
};

/** Dialog without action buttons. */
export const WithoutActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Info Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Information"
          hideActions
        >
          <p>This dialog is purely informational. Press Escape or click the × to close.</p>
        </Dialog>
      </>
    );
  },
};

