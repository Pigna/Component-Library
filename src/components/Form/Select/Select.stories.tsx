import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: 'Country', options: countries, placeholder: 'Select a country…' },
};

export const WithError: Story = {
  args: { label: 'Country', options: countries, error: 'Please select a country.' },
};

export const WithHelper: Story = {
  args: { label: 'Country', options: countries, helperText: 'Where you currently reside.' },
};

