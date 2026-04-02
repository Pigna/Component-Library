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

export const Default: Story = {
  render: () => (
    <MenuItemGroup label="Settings">
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

