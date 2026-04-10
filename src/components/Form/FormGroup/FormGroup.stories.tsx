import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormGroup } from './FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';

const meta: Meta<typeof FormGroup> = {
  title: 'Form/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

/** A basic group of related fields with a legend. */
export const Default: Story = {
  render: () => (
    <FormGroup title="Personal Information">
      <Input label="First name" placeholder="Jane" />
      <Input label="Last name" placeholder="Doe" />
    </FormGroup>
  ),
};

/** With an optional description below the legend. */
export const WithDescription: Story = {
  render: () => (
    <FormGroup title="Address" description="Enter your shipping address.">
      <Input label="Street" placeholder="123 Main St" />
      <Input label="City" placeholder="Amsterdam" />
      <Select
        label="Country"
        options={[
          { value: 'nl', label: 'Netherlands' },
          { value: 'de', label: 'Germany' },
          { value: 'us', label: 'United States' },
        ]}
      />
    </FormGroup>
  ),
};
