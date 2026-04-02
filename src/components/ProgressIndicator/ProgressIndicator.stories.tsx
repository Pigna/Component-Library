import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressIndicator } from './ProgressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['bar', 'circle'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    displayMode: { control: 'select', options: ['percentage', 'steps'] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

/** Default bar progress. */
export const Bar: Story = {
  args: { variant: 'bar', value: 65, label: 'Upload progress' },
};

/** Circle progress. */
export const Circle: Story = {
  args: { variant: 'circle', value: 75, label: 'Loading' },
};

/** Steps display mode. */
export const Steps: Story = {
  args: { variant: 'bar', value: 40, displayMode: 'steps', currentStep: 2, totalSteps: 5, label: 'Step progress' },
};

/** All variants together. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <ProgressIndicator variant="bar" value={65} label="Bar" />
      </div>
      <ProgressIndicator variant="circle" value={75} label="Circle" />
      <div style={{ width: '300px' }}>
        <ProgressIndicator variant="bar" value={40} displayMode="steps" currentStep={2} totalSteps={5} label="Steps" />
      </div>
    </div>
  ),
};

