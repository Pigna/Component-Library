import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
  },
  decorators: [(Story) => <ul role="menu" style={{ listStyle: 'none', padding: 0, maxWidth: 260 }}><Story /></ul>],
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const AsLink: Story = { args: { href: '/dashboard', children: 'Dashboard' } };
export const AsButton: Story = { args: { children: 'Settings' } };
export const Active: Story = { args: { href: '/dashboard', active: true, children: 'Dashboard' } };
export const Disabled: Story = { args: { href: '/locked', disabled: true, children: 'Locked' } };
export const WithIcon: Story = {
  args: {
    href: '/home',
    icon: <span>🏠</span>,
    children: 'Home',
  },
};

