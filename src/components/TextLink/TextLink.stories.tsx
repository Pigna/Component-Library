import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  argTypes: {
    external: {
      control: 'boolean',
      description: 'Opens in a new tab with screen-reader announcement.',
    },
    href: {
      control: 'text',
      description: 'Link URL.',
    },
    children: {
      control: 'text',
      description: 'Link content.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextLink>;

/** A standard internal link. */
export const Default: Story = {
  args: {
    href: '/about',
    children: 'About us',
  },
};

/** An external link that opens in a new tab with a screen-reader announcement. */
export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'Visit Example',
  },
};

/** All variants displayed together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <TextLink href="/internal">Internal link</TextLink>
      <TextLink href="https://example.com" external>
        External link
      </TextLink>
    </div>
  ),
};

