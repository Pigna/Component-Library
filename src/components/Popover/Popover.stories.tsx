import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    triggerOn: { control: 'select', options: ['click', 'hover'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/** Default click-triggered popover. */
export const Default: Story = {
  args: {
    trigger: <Button>Show Popover</Button>,
    content: <p>This is popover content with some helpful information.</p>,
    placement: 'bottom',
  },
};

/** Hover-triggered popover. */
export const HoverTrigger: Story = {
  args: {
    trigger: <Button variant="outline">Hover me</Button>,
    content: <p>This popover appears on hover.</p>,
    triggerOn: 'hover',
    placement: 'bottom',
  },
};

/** All placements. */
export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
      }}
    >
      <Popover trigger={<Button>Bottom</Button>} content={<p>Bottom placement</p>} placement="bottom" />
      <Popover trigger={<Button>Top</Button>} content={<p>Top placement</p>} placement="top" />
      <Popover trigger={<Button>Left</Button>} content={<p>Left placement</p>} placement="left" />
      <Popover trigger={<Button>Right</Button>} content={<p>Right placement</p>} placement="right" />
    </div>
  ),
};

