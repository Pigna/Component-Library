import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConditionalField } from './ConditionalField';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Input } from '../Input';
import { FormGroup } from '../FormGroup';

const meta: Meta<typeof ConditionalField> = {
  title: 'Form/ConditionalField',
  component: ConditionalField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ConditionalField>;

/** Show an extra field when a checkbox is checked. */
export const CheckboxDriven: Story = {
  render: function Example() {
    const [hasAlias, setHasAlias] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          label="I go by a different name"
          checked={hasAlias}
          onChange={(e) => setHasAlias(e.target.checked)}
        />
        <ConditionalField show={hasAlias}>
          <Input label="Preferred name" placeholder="e.g. Alex" />
        </ConditionalField>
      </div>
    );
  },
};

/** Show a group of fields based on a select value. */
export const SelectDriven: Story = {
  render: function Example() {
    const [deliveryType, setDeliveryType] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Select
          label="Delivery method"
          placeholder="Choose…"
          options={[
            { value: 'pickup', label: 'Store pickup' },
            { value: 'delivery', label: 'Home delivery' },
          ]}
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        />
        <ConditionalField show={deliveryType === 'delivery'}>
          <FormGroup title="Delivery Address">
            <Input label="Street" />
            <Input label="City" />
            <Input label="Postal code" />
          </FormGroup>
        </ConditionalField>
      </div>
    );
  },
};

/**
 * With `keepMounted`, the hidden content stays in the DOM (aria-hidden).
 * Useful when you need to preserve controlled state across visibility toggles.
 */
export const KeepMounted: Story = {
  render: function Example() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          label="Show secondary contact (keepMounted)"
          checked={show}
          onChange={(e) => setShow(e.target.checked)}
        />
        <ConditionalField show={show} keepMounted>
          <Input label="Secondary email" placeholder="backup@example.com" />
        </ConditionalField>
      </div>
    );
  },
};
