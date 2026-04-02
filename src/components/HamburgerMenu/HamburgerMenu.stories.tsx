import type { Meta, StoryObj } from '@storybook/react-vite';
import { HamburgerMenu } from './HamburgerMenu';
import { MenuItem } from '../MenuItem';
import { MenuItemGroup } from '../MenuItemGroup';

const meta: Meta<typeof HamburgerMenu> = {
  title: 'Components/HamburgerMenu',
  component: HamburgerMenu,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
};

export default meta;
type Story = StoryObj<typeof HamburgerMenu>;

export const Default: Story = {
  render: () => (
    /* style override ensures the hamburger is visible at any viewport in Storybook */
    <HamburgerMenu style={{ display: 'block' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <MenuItem href="/dashboard" active>Dashboard</MenuItem>
          <MenuItem href="/analytics">Analytics</MenuItem>
          <MenuItemGroup label="Settings">
            <MenuItem href="/profile">Profile</MenuItem>
            <MenuItem href="/security">Security</MenuItem>
          </MenuItemGroup>
        </ul>
      </nav>
    </HamburgerMenu>
  ),
};

