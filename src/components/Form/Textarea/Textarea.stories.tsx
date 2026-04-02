import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: 'Bio', placeholder: 'Tell us about yourself…' },
};

export const WithCharCount: Story = {
  args: { label: 'Bio', maxLength: 200, value: 'Hello world' },
};

export const WithError: Story = {
  args: { label: 'Description', error: 'This field is required.' },
};

export const WithHelper: Story = {
  args: { label: 'Notes', helperText: 'Optional — max 500 characters.' },
};

export const NoResize: Story = {
  args: { label: 'Fixed', resize: 'none' },
};

