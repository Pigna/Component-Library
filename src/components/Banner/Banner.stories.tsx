import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
      description: 'Semantic style variant.',
    },
    dismissible: { control: 'boolean', description: 'Show a close button.' },
    children: { control: 'text', description: 'Banner content.' },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

/** Info banner. */
export const Info: Story = {
  args: { variant: 'info', children: 'Your session will expire in 5 minutes.' },
};

/** Warning banner. */
export const Warning: Story = {
  args: { variant: 'warning', children: 'Please review your input before submitting.' },
};

/** Error banner (uses role="alert"). */
export const Error: Story = {
  args: { variant: 'error', children: 'Something went wrong. Please try again.' },
};

/** Success banner. */
export const Success: Story = {
  args: { variant: 'success', children: 'Your changes have been saved.' },
};

/** Dismissible banner with close button. */
export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'This banner can be dismissed.',
  },
};

/** All variants displayed together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner variant="info">Info message</Banner>
      <Banner variant="warning">Warning message</Banner>
      <Banner variant="error">Error message</Banner>
      <Banner variant="success">Success message</Banner>
    </div>
  ),
};

