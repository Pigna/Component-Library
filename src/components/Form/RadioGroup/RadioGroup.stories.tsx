import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  args: { legend: 'Preferred contact', name: 'contact', options },
};

export const Horizontal: Story = {
  args: { legend: 'Preferred contact', name: 'contact-h', options, orientation: 'horizontal' },
};

export const WithError: Story = {
  args: { legend: 'Preferred contact', name: 'contact-e', options, error: 'Please select an option.' },
};

