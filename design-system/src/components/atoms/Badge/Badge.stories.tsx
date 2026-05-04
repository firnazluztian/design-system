import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

// Basic variants
export const Primary: Story = {
  args: {
    children: 'Primary Badge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Badge',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Badge',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Badge',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error Badge',
    variant: 'error',
  },
};

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge size="small">Small Badge</Badge>
      <Badge size="medium">Medium Badge</Badge>
      <Badge size="large">Large Badge</Badge>
    </div>
  ),
};

// Rounded variants
export const RoundedVariants: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge rounded="none">No Rounded</Badge>
      <Badge rounded="sm">Small Rounded</Badge>
      <Badge rounded="md">Medium Rounded</Badge>
      <Badge rounded="lg">Large Rounded</Badge>
      <Badge rounded="full">Full Rounded</Badge>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
      <div className="flex gap-2">
        <Badge size="small">Small</Badge>
        <Badge size="medium">Medium</Badge>
        <Badge size="large">Large</Badge>
      </div>
      <div className="flex gap-2">
        <Badge rounded="none">None</Badge>
        <Badge rounded="sm">Small</Badge>
        <Badge rounded="md">Medium</Badge>
        <Badge rounded="lg">Large</Badge>
        <Badge rounded="full">Full</Badge>
      </div>
    </div>
  ),
};
