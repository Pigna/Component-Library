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

/* ── Shared demo icons ── */
const DashIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const HelpIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 400 }}>
      <SideMenu style={{ display: 'flex' }}>
        <MenuItem href="/dashboard" icon={<DashIcon />} active>Dashboard</MenuItem>
        <MenuItem href="/analytics" icon={<ChartIcon />}>Analytics</MenuItem>
        <MenuItemGroup label="Settings" icon={<SettingsIcon />}>
          <MenuItem href="/profile">Profile</MenuItem>
          <MenuItem href="/security">Security</MenuItem>
          <MenuItem href="/billing">Billing</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup label="Support" icon={<HelpIcon />}>
          <MenuItem href="/docs">Documentation</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
        </MenuItemGroup>
      </SideMenu>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 400 }}>
      <SideMenu style={{ display: 'flex' }} collapsible>
        <MenuItem href="/dashboard" icon={<DashIcon />} active>Dashboard</MenuItem>
        <MenuItem href="/analytics" icon={<ChartIcon />}>Analytics</MenuItem>
        <MenuItemGroup label="Settings" icon={<SettingsIcon />}>
          <MenuItem href="/profile" icon={<SettingsIcon />}>Profile</MenuItem>
          <MenuItem href="/security" icon={<SettingsIcon />}>Security</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup label="Support" icon={<HelpIcon />}>
          <MenuItem href="/docs">Documentation</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
        </MenuItemGroup>
      </SideMenu>
      <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
        ← Click the chevron to collapse. Hover icons when collapsed for flyout menus.
      </div>
    </div>
  ),
};

export const ManuallyCollapsed: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 400 }}>
      <SideMenu style={{ display: 'flex' }} collapsible collapsed>
        <MenuItem href="/dashboard" icon={<DashIcon />} active>Dashboard</MenuItem>
        <MenuItem href="/analytics" icon={<ChartIcon />}>Analytics</MenuItem>
        <MenuItemGroup label="Settings" icon={<SettingsIcon />}>
          <MenuItem href="/profile">Profile</MenuItem>
          <MenuItem href="/security">Security</MenuItem>
        </MenuItemGroup>
        {/* Group without icon — fallback generic icon shown */}
        <MenuItemGroup label="Support">
          <MenuItem href="/docs">Documentation</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
        </MenuItemGroup>
      </SideMenu>
      <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
        Hover group icons for flyout menus. Support group shows fallback icon.
      </div>
    </div>
  ),
};

