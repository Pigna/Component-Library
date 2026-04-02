import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationBadge } from './NotificationBadge';

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const meta: Meta<typeof NotificationBadge> = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number', description: 'Numeric count to display.' },
    max: { control: 'number', description: 'Maximum before showing {max}+.' },
    dot: { control: 'boolean', description: 'Show a dot instead of a count.' },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBadge>;

/** Badge with a numeric count. */
export const WithCount: Story = {
  args: { count: 5 },
  render: (args) => (
    <NotificationBadge {...args}>
      <BellIcon />
    </NotificationBadge>
  ),
};

/** Badge showing max+ when count exceeds max. */
export const OverMax: Story = {
  args: { count: 150, max: 99 },
  render: (args) => (
    <NotificationBadge {...args}>
      <BellIcon />
    </NotificationBadge>
  ),
};

/** Dot badge (no count). */
export const Dot: Story = {
  args: { dot: true },
  render: (args) => (
    <NotificationBadge {...args}>
      <BellIcon />
    </NotificationBadge>
  ),
};

/** No badge when count is 0. */
export const ZeroCount: Story = {
  args: { count: 0 },
  render: (args) => (
    <NotificationBadge {...args}>
      <BellIcon />
    </NotificationBadge>
  ),
};

/** All variants displayed together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <NotificationBadge count={3}>
        <BellIcon />
      </NotificationBadge>
      <NotificationBadge count={150} max={99}>
        <BellIcon />
      </NotificationBadge>
      <NotificationBadge dot>
        <BellIcon />
      </NotificationBadge>
      <NotificationBadge count={0}>
        <BellIcon />
      </NotificationBadge>
    </div>
  ),
};

