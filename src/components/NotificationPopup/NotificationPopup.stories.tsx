import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NotificationPopup } from './NotificationPopup';
import { Button } from '../Button';

const meta: Meta<typeof NotificationPopup> = {
  title: 'Components/NotificationPopup',
  component: NotificationPopup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    autoDismiss: { control: 'boolean' },
    autoDismissMs: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationPopup>;

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show Notification</Button>
        <NotificationPopup
          variant="success"
          title="Changes saved"
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          Your changes have been saved successfully.
        </NotificationPopup>
      </>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
      {(['info', 'success', 'warning', 'error'] as const).map((v) => (
        <NotificationPopup
          key={v}
          variant={v}
          title={`${v.charAt(0).toUpperCase() + v.slice(1)} notification`}
          visible
          onDismiss={() => {}}
          style={{ position: 'static' }}
        >
          This is a {v} notification message.
        </NotificationPopup>
      ))}
    </div>
  ),
};

