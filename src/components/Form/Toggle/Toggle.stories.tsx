import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Form/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    onText: { control: 'text' },
    offText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = { args: { label: 'Dark mode' } };
export const Checked: Story = { args: { label: 'Notifications', defaultChecked: true } };
export const WithLabels: Story = { args: { label: 'Sync', onText: 'On', offText: 'Off' } };
export const Disabled: Story = { args: { label: 'Locked', disabled: true } };

