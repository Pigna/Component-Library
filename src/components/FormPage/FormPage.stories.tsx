import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../Form/Input';
import { Textarea } from '../Form/Textarea';
import { Select } from '../Form/Select';
import { Checkbox } from '../Form/Checkbox';
import { RadioGroup } from '../Form/RadioGroup';
import { Toggle } from '../Form/Toggle';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Examples/Form Page',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'de', label: 'Germany' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
];

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' },
];

/** A complete example form showcasing all form components together. */
export const CompleteForm: Story = {
  render: function FormExample() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [contact, setContact] = useState('email');
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const errors = submitted
      ? {
          firstName: !firstName ? 'First name is required.' : undefined,
          lastName: !lastName ? 'Last name is required.' : undefined,
          email: !email
            ? 'Email is required.'
            : !email.includes('@')
              ? 'Enter a valid email address.'
              : undefined,
          password:
            !password
              ? 'Password is required.'
              : password.length < 8
                ? 'Password must be at least 8 characters.'
                : undefined,
          country: !country ? 'Please select a country.' : undefined,
          terms: !terms ? 'You must accept the terms.' : undefined,
        }
      : {};

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    const handleReset = () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setBio('');
      setCountry('');
      setContact('email');
      setTerms(false);
      setNewsletter(false);
      setSubmitted(false);
    };

    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          maxWidth: 560,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <h2 style={{ margin: 0, fontFamily: 'var(--font-family)' }}>Create Account</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Fill in the form below to create your account.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="First name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            placeholder="Jane"
          />
          <Input
            label="Last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            placeholder="Doe"
          />
        </div>

        <Input
          label="Email"
          inputType="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          helperText="We'll never share your email."
        />

        <Input
          label="Password"
          inputType="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText="At least 8 characters."
        />

        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={300}
          helperText="Optional — tell us about yourself."
          placeholder="A few words about you…"
        />

        <Select
          label="Country"
          required
          options={countryOptions}
          placeholder="Select a country…"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={errors.country}
        />

        <RadioGroup
          legend="Preferred contact method"
          name="contact"
          options={contactOptions}
          value={contact}
          onChange={setContact}
          orientation="horizontal"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Checkbox
            label="I accept the terms and conditions"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            error={errors.terms}
          />
          <Checkbox
            label="Subscribe to newsletter"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Toggle
            label="Dark mode"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <Toggle
            label="Notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            onText="On"
            offText="Off"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Create Account
          </Button>
        </div>

        {submitted && !Object.values(errors).some(Boolean) && (
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-success-subtle)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            ✓ Account created successfully! Welcome, {firstName}.
          </div>
        )}
      </form>
    );
  },
};

