import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner diameter.',
    },
    label: {
      control: 'text',
      description: 'Screen-reader announcement text.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** Default medium spinner. */
export const Default: Story = {
  args: { size: 'md', label: 'Loading' },
};

/** Small spinner (16px). */
export const Small: Story = {
  args: { size: 'sm', label: 'Loading' },
};

/** Large spinner (40px). */
export const Large: Story = {
  args: { size: 'lg', label: 'Loading content' },
};

/** All sizes displayed together. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner size="sm" label="Loading" />
      <Spinner size="md" label="Loading" />
      <Spinner size="lg" label="Loading" />
    </div>
  ),
};

