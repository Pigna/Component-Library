import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormSection } from './FormSection';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';
import { Toggle } from '../Toggle';

const meta: Meta<typeof FormSection> = {
  title: 'Form/FormSection',
  component: FormSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FormSection>;

/** A section with multiple groups of related form fields. */
export const Default: Story = {
  render: () => (
    <FormSection title="Account Settings" description="Manage your profile and preferences.">
      <FormGroup title="Personal Information">
        <Input label="First name" placeholder="Jane" />
        <Input label="Last name" placeholder="Doe" />
        <Input label="Email" inputType="email" placeholder="jane@example.com" />
      </FormGroup>
      <FormGroup title="Preferences">
        <Select
          label="Language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'nl', label: 'Nederlands' },
            { value: 'de', label: 'Deutsch' },
          ]}
        />
        <Toggle label="Receive email notifications" />
      </FormGroup>
    </FormSection>
  ),
};

/** headingLevel prop controls the semantic heading element. */
export const HeadingLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <FormSection title="Section with h2" headingLevel={2}>
        <FormGroup title="Group"><Input label="Field" /></FormGroup>
      </FormSection>
      <FormSection title="Section with h4" headingLevel={4}>
        <FormGroup title="Group"><Input label="Field" /></FormGroup>
      </FormSection>
    </div>
  ),
};
