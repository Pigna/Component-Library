import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: 'Accept terms and conditions' } };
export const Checked: Story = { args: { label: 'Subscribed', defaultChecked: true } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };
export const WithError: Story = { args: { label: 'Required', error: 'You must accept the terms.' } };
export const Disabled: Story = { args: { label: 'Locked', disabled: true, defaultChecked: true } };

