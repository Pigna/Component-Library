import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputType: { control: 'select', options: ['text', 'email', 'url', 'tel', 'number', 'password'] },
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: { label: 'Full Name', inputType: 'text', placeholder: 'Jane Doe' },
};

export const Email: Story = {
  args: { label: 'Email', inputType: 'email', placeholder: 'you@example.com' },
};

export const WithError: Story = {
  args: { label: 'Email', inputType: 'email', error: 'Please enter a valid email.' },
};

export const WithHelper: Story = {
  args: { label: 'Website', inputType: 'url', helperText: 'Include https://' },
};

export const Required: Story = {
  args: { label: 'Username', required: true },
};

export const Disabled: Story = {
  args: { label: 'Locked', disabled: true, value: 'Cannot edit' },
};

