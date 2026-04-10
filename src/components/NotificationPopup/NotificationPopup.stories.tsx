import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NotificationPopup } from './NotificationPopup';
import { NotificationToastContainer } from './NotificationToastContainer';
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

/** Interactive toast inside a NotificationToastContainer. */
export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show Notification</Button>
        <NotificationToastContainer>
          <NotificationPopup
            variant="success"
            title="Changes saved"
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            Your changes have been saved successfully.
          </NotificationPopup>
        </NotificationToastContainer>
      </>
    );
  },
};

/** Persistent notification — `autoDismiss={false}` keeps it until the user dismisses. */
export const Persistent: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show Notification</Button>
        <NotificationToastContainer>
          <NotificationPopup
            variant="warning"
            title="Session expiring"
            visible={visible}
            autoDismiss={false}
            onDismiss={() => setVisible(false)}
          >
            Your session will expire in 5 minutes.
          </NotificationPopup>
        </NotificationToastContainer>
      </>
    );
  },
};

/** Multiple stacked toasts — each exits with a smooth animation before being removed from the list. */
export const Stacked: Story = {
  render: () => {
    const [toasts, setToasts] = useState([
      { id: 1, variant: 'success' as const, title: 'Saved', body: 'Draft saved successfully.', visible: true },
      { id: 2, variant: 'error' as const, title: 'Upload failed', body: 'File exceeds 10 MB limit.', visible: true },
      { id: 3, variant: 'info' as const, title: 'Update available', body: 'A new version is ready.', visible: true },
    ]);

    // Step 1: trigger exit animation by setting visible=false
    const dismiss = (id: number) =>
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));

    // Step 2: remove from list only after the animation finishes (via onExited)
    const remove = (id: number) =>
      setToasts((prev) => prev.filter((t) => t.id !== id));

    return (
      <NotificationToastContainer>
        {toasts.map((t, i) => (
          <NotificationPopup
            key={t.id}
            variant={t.variant}
            title={t.title}
            visible={t.visible}
            autoDismiss={false}
            onDismiss={() => dismiss(t.id)}
            onExited={() => remove(t.id)}
            style={{
              animationDelay: `${i * 80}ms`,
              animationFillMode: 'backwards',
            }}
          >
            {t.body}
          </NotificationPopup>
        ))}
      </NotificationToastContainer>
    );
  },
};

/** All four variants displayed inline (no container needed for static display). */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['info', 'success', 'warning', 'error'] as const).map((v) => (
        <NotificationPopup
          key={v}
          variant={v}
          title={`${v.charAt(0).toUpperCase() + v.slice(1)} notification`}
          visible
          autoDismiss={false}
          onDismiss={() => {}}
        >
          This is a {v} notification message.
        </NotificationPopup>
      ))}
    </div>
  ),
};

