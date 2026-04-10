import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { FormSection } from '../Form/FormSection';
import { FormGroup } from '../Form/FormGroup';
import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import { Toggle } from '../Form/Toggle';
import { Button } from '../Button';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/** Basic tabs splitting a multi-section form into pages. */
export const FormTabs: Story = {
  render: function Example() {
    return (
      <Tabs defaultTab="personal" style={{ maxWidth: 600 }}>
        <TabList aria-label="Account setup sections">
          <Tab id="personal">Personal</Tab>
          <Tab id="account">Account</Tab>
          <Tab id="preferences">Preferences</Tab>
        </TabList>

        <TabPanel id="personal">
          <FormSection title="Personal Information" description="Tell us a bit about yourself.">
            <FormGroup title="Name">
              <Input label="First name" placeholder="Jane" />
              <Input label="Last name" placeholder="Doe" />
            </FormGroup>
            <FormGroup title="Contact">
              <Input label="Email" inputType="email" placeholder="jane@example.com" />
            </FormGroup>
          </FormSection>
        </TabPanel>

        <TabPanel id="account">
          <FormSection title="Account" description="Secure your account.">
            <FormGroup title="Credentials">
              <Input label="Username" placeholder="janedoe" />
              <Input label="Password" inputType="password" />
            </FormGroup>
          </FormSection>
        </TabPanel>

        <TabPanel id="preferences">
          <FormSection title="Preferences" description="Customise your experience.">
            <FormGroup title="Display">
              <Select
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'nl', label: 'Nederlands' },
                ]}
              />
              <Toggle label="Dark mode" />
            </FormGroup>
          </FormSection>
        </TabPanel>
      </Tabs>
    );
  },
};

/** Controlled tabs — parent manages the active tab. */
export const Controlled: Story = {
  render: function Example() {
    const [active, setActive] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" size="sm" onClick={() => setActive('a')}>Go to A</Button>
          <Button variant="secondary" size="sm" onClick={() => setActive('b')}>Go to B</Button>
        </div>
        <Tabs activeTab={active} onTabChange={setActive}>
          <TabList aria-label="Demo tabs">
            <Tab id="a">Tab A</Tab>
            <Tab id="b">Tab B</Tab>
            <Tab id="c" disabled>Tab C (disabled)</Tab>
          </TabList>
          <TabPanel id="a"><p style={{ fontFamily: 'var(--font-family)' }}>Content for Tab A</p></TabPanel>
          <TabPanel id="b"><p style={{ fontFamily: 'var(--font-family)' }}>Content for Tab B</p></TabPanel>
          <TabPanel id="c"><p style={{ fontFamily: 'var(--font-family)' }}>Content for Tab C</p></TabPanel>
        </Tabs>
      </div>
    );
  },
};
