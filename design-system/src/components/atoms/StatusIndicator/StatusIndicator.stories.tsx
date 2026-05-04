import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusIndicator } from './StatusIndicator';

const meta = {
  title: 'Atoms/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    status: 'active',
    withLabel: true,
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
    withLabel: true,
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    withLabel: true,
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    withLabel: true,
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    withLabel: true,
  },
};

export const Small: Story = {
  args: {
    status: 'active',
    size: 'sm',
    withLabel: true,
  },
};

export const Medium: Story = {
  args: {
    status: 'active',
    size: 'md',
    withLabel: true,
  },
};

export const Large: Story = {
  args: {
    status: 'active',
    size: 'lg',
    withLabel: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    status: 'active',
    withLabel: false,
  },
};

export const AllStates: Story = {
  args: {
    status: 'active',
    withLabel: true,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusIndicator status="active" withLabel />
      <StatusIndicator status="inactive" withLabel />
      <StatusIndicator status="pending" withLabel />
      <StatusIndicator status="warning" withLabel />
      <StatusIndicator status="error" withLabel />
    </div>
  ),
}; 