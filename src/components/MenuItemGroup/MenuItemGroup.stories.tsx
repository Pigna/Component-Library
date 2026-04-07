import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItemGroup } from './MenuItemGroup';
import { MenuItem } from '../MenuItem';

const meta: Meta<typeof MenuItemGroup> = {
  title: 'Components/MenuItemGroup',
  component: MenuItemGroup,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItemGroup>;

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <MenuItemGroup label="Settings">
      <MenuItem href="/profile">Profile</MenuItem>
      <MenuItem href="/security">Security</MenuItem>
      <MenuItem href="/billing">Billing</MenuItem>
    </MenuItemGroup>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <MenuItemGroup label="Settings" icon={<SettingsIcon />}>
      <MenuItem href="/profile">Profile</MenuItem>
      <MenuItem href="/security">Security</MenuItem>
      <MenuItem href="/billing">Billing</MenuItem>
    </MenuItemGroup>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <MenuItemGroup label="Advanced" defaultOpen={false}>
      <MenuItem href="/api">API Keys</MenuItem>
      <MenuItem href="/webhooks">Webhooks</MenuItem>
    </MenuItemGroup>
  ),
};

export const NotCollapsible: Story = {
  render: () => (
    <MenuItemGroup label="Main" collapsible={false}>
      <MenuItem href="/dashboard">Dashboard</MenuItem>
      <MenuItem href="/analytics">Analytics</MenuItem>
    </MenuItemGroup>
  ),
};

