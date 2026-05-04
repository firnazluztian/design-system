import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    fullWidth: {
      control: 'boolean',
    },
    pulseVariant: {
      control: 'select',
      options: ['default', 'left-to-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
    variant: 'default',
    rounded: 'xl',
    pulseVariant: 'default',
  },
};

export const VariantExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width={200} height={20} variant="default" />
      <Skeleton width={200} height={20} variant="primary" />
      <Skeleton width={200} height={20} variant="success" />
      <Skeleton width={200} height={20} variant="warning" />
      <Skeleton width={200} height={20} variant="danger" />
      <Skeleton width={200} height={20} variant="info" />
    </div>
  ),
};

export const PulsingVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Pulsing</h3>
        <Skeleton width={200} height={20} pulseVariant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Left-to-Right Pulsing</h3>
        <Skeleton width={200} height={20} pulseVariant="left-to-right" />
      </div>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width={200} height={20} rounded="none" />
      <Skeleton width={200} height={20} rounded="sm" />
      <Skeleton width={200} height={20} rounded="md" />
      <Skeleton width={200} height={20} rounded="lg" />
      <Skeleton width={200} height={20} rounded="xl" />
      <Skeleton width={200} height={20} rounded="2xl" />
      <Skeleton width={200} height={20} rounded="3xl" />
      <Skeleton width={200} height={20} rounded="full" />
    </div>
  ),
};

export const SizeExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width={100} height={20} />
      <Skeleton width={200} height={20} />
      <Skeleton width={300} height={20} />
      <Skeleton width={400} height={20} />
    </div>
  ),
};

export const HeightExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width={200} height={10} />
      <Skeleton width={200} height={20} />
      <Skeleton width={200} height={30} />
      <Skeleton width={200} height={40} />
    </div>
  ),
};

export const FullWidthExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton height={20} fullWidth />
      <Skeleton height={20} fullWidth variant="primary" />
      <Skeleton height={20} fullWidth variant="success" />
      <Skeleton height={20} fullWidth variant="warning" />
      <Skeleton height={20} fullWidth variant="danger" />
      <Skeleton height={20} fullWidth variant="info" />
    </div>
  ),
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton width={100} height={20} />
        <Skeleton width={100} height={20} />
        <Skeleton width={100} height={20} />
      </div>
      <Skeleton height={20} fullWidth />
      <div className="flex gap-4">
        <Skeleton width={150} height={20} />
        <Skeleton width={150} height={20} />
      </div>
    </div>
  ),
};
