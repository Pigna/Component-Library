import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

/** Default field with a plain input. */
export const Default: Story = {
  args: { label: 'Email', htmlFor: 'email-default' },
  render: (args) => (
    <FormField {...args}>
      <input id={args.htmlFor} type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

/** Field with helper text. */
export const WithHelper: Story = {
  args: { label: 'Email', htmlFor: 'email-helper', helperText: 'We will never share your email.' },
  render: (args) => (
    <FormField {...args}>
      <input id={args.htmlFor} type="email" />
    </FormField>
  ),
};

/** Field with error. */
export const WithError: Story = {
  args: { label: 'Email', htmlFor: 'email-error', error: 'Please enter a valid email address.' },
  render: (args) => (
    <FormField {...args}>
      <input id={args.htmlFor} type="email" />
    </FormField>
  ),
};

/** Required field. */
export const Required: Story = {
  args: { label: 'Email', htmlFor: 'email-req', required: true },
  render: (args) => (
    <FormField {...args}>
      <input id={args.htmlFor} type="email" />
    </FormField>
  ),
};

