import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideMenu } from './SideMenu';
import { MenuItem } from '../MenuItem';
import { MenuItemGroup } from '../MenuItemGroup';

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 400 }}>
      {/* Force visible for story — override the breakpoint hide */}
      <div style={{ display: 'block' }}>
        <SideMenu style={{ display: 'block' }}>
          <MenuItem href="/dashboard" active>Dashboard</MenuItem>
          <MenuItem href="/analytics">Analytics</MenuItem>
          <MenuItemGroup label="Settings">
            <MenuItem href="/profile">Profile</MenuItem>
            <MenuItem href="/security">Security</MenuItem>
            <MenuItem href="/billing">Billing</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup label="Support">
            <MenuItem href="/docs">Documentation</MenuItem>
            <MenuItem href="/contact">Contact</MenuItem>
          </MenuItemGroup>
        </SideMenu>
      </div>
    </div>
  ),
};

