import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Tag text.' },
    color: { control: 'color', description: 'Custom background tint.' },
    href: { control: 'text', description: 'Link URL.' },
    removable: { control: 'boolean', description: 'Show remove button.' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/** Default tag. */
export const Default: Story = {
  args: { label: 'React' },
};

/** Tag as a link. */
export const Link: Story = {
  args: { label: 'Documentation', href: '/docs' },
};

/** Removable tag with close button. */
export const Removable: Story = {
  args: { label: 'Removable', removable: true },
};

/** Tag with custom color. */
export const CustomColor: Story = {
  args: { label: 'Custom', color: '#4d94ff' },
};

/** All variants displayed together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="Default" />
      <Tag label="Link" href="/docs" />
      <Tag label="Removable" removable />
      <Tag label="Blue" color="#4d94ff" />
      <Tag label="Green" color="#16a34a" />
      <Tag label="Red" color="#dc2626" removable />
    </div>
  ),
};

