import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmPopover } from './ConfirmPopover';
import { Button } from '../Button';

const meta: Meta<typeof ConfirmPopover> = {
  title: 'Components/ConfirmPopover',
  component: ConfirmPopover,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmPopover>;

/** Default confirmation popover triggered by a delete button. */
export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Delete item</Button>,
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    placement: 'bottom',
    onConfirm: () => alert('Item deleted!'),
  },
};

/** Custom labels. */
export const CustomLabels: Story = {
  args: {
    trigger: <Button variant="secondary">Reset settings</Button>,
    message: 'This will restore all settings to their defaults.',
    confirmLabel: 'Yes, reset',
    cancelLabel: 'No, keep',
    placement: 'bottom',
    onConfirm: () => alert('Settings reset!'),
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
      <ConfirmPopover
        trigger={<Button variant="outline">Bottom</Button>}
        message="Confirm this action?"
        onConfirm={() => alert('Confirmed!')}
        placement="bottom"
      />
      <ConfirmPopover
        trigger={<Button variant="outline">Top</Button>}
        message="Confirm this action?"
        onConfirm={() => alert('Confirmed!')}
        placement="top"
      />
      <ConfirmPopover
        trigger={<Button variant="outline">Left</Button>}
        message="Confirm this action?"
        onConfirm={() => alert('Confirmed!')}
        placement="left"
      />
      <ConfirmPopover
        trigger={<Button variant="outline">Right</Button>}
        message="Confirm this action?"
        onConfirm={() => alert('Confirmed!')}
        placement="right"
      />
    </div>
  ),
};



