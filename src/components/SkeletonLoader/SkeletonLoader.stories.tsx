import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonLoader } from './SkeletonLoader';

const meta: Meta<typeof SkeletonLoader> = {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rectangle'],
      description: 'Shape of the skeleton.',
    },
    width: { control: 'text', description: 'CSS width override.' },
    height: { control: 'text', description: 'CSS height override.' },
    lines: { control: 'number', description: 'Number of lines (text variant).' },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

/** Single text line skeleton. */
export const Text: Story = {
  args: { variant: 'text' },
};

/** Multi-line text skeleton. */
export const MultiLineText: Story = {
  args: { variant: 'text', lines: 3 },
};

/** Circle skeleton (e.g. avatar placeholder). */
export const Circle: Story = {
  args: { variant: 'circle' },
};

/** Rectangle skeleton (e.g. image placeholder). */
export const Rectangle: Story = {
  args: { variant: 'rectangle', height: '120px' },
};

/** All variants displayed together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <SkeletonLoader variant="text" lines={3} />
      <SkeletonLoader variant="circle" />
      <SkeletonLoader variant="rectangle" height="120px" />
    </div>
  ),
};

