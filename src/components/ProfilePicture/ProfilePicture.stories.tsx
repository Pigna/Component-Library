import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfilePicture } from './ProfilePicture';

const meta: Meta<typeof ProfilePicture> = {
  title: 'Components/ProfilePicture',
  component: ProfilePicture,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size.',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Status dot indicator.',
    },
    src: { control: 'text', description: 'Image URL.' },
    alt: { control: 'text', description: 'Accessible alt text.' },
    initials: { control: 'text', description: 'Fallback initials (1–2 chars).' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePicture>;

/** Avatar with an image. */
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=3',
    alt: 'Jane Doe',
    size: 'lg',
  },
};

/** Avatar with fallback initials (no image). */
export const WithInitials: Story = {
  args: {
    initials: 'JD',
    alt: 'Jane Doe',
    size: 'lg',
  },
};

/** Avatar with a status indicator. */
export const WithStatus: Story = {
  args: {
    initials: 'JD',
    alt: 'Jane Doe',
    size: 'lg',
    status: 'online',
  },
};

/** All sizes. */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ProfilePicture initials="SM" alt="Small" size="sm" />
      <ProfilePicture initials="MD" alt="Medium" size="md" />
      <ProfilePicture initials="LG" alt="Large" size="lg" />
      <ProfilePicture initials="XL" alt="Extra Large" size="xl" />
    </div>
  ),
};

/** All statuses. */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ProfilePicture initials="ON" alt="Online" size="lg" status="online" />
      <ProfilePicture initials="AW" alt="Away" size="lg" status="away" />
      <ProfilePicture initials="BS" alt="Busy" size="lg" status="busy" />
      <ProfilePicture initials="OF" alt="Offline" size="lg" status="offline" />
    </div>
  ),
};

