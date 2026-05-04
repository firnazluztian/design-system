import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'danger', 'default'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="solid">Solid</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="subtle">Subtle</Chip>
      <Chip variant="soft">Soft</Chip>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip color="primary">Primary</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="error">Error</Chip>
      <Chip color="info">Info</Chip>
      <Chip color="danger">Danger</Chip>
      <Chip color="default">Default</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Chip rounded="none">No Rounded</Chip>
      <Chip rounded="sm">Small Rounded</Chip>
      <Chip rounded="md">Medium Rounded</Chip>
      <Chip rounded="lg">Large Rounded</Chip>
      <Chip rounded="xl">Extra Large Rounded</Chip>
      <Chip rounded="2xl">2xl Rounded</Chip>
      <Chip rounded="3xl">3xl Rounded</Chip>
      <Chip rounded="full">Full Rounded</Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: 'mdi:star',
  },
};

export const WithClose: Story = {
  args: {
    children: 'Closeable Chip',
    onClose: () => alert('Close clicked'),
  },
};

export const WithIconAndClose: Story = {
  args: {
    children: 'Complete Chip',
    icon: 'mdi:star',
    onClose: () => alert('Close clicked'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Chip variant="solid">Solid</Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip variant="subtle">Subtle</Chip>
        <Chip variant="soft">Soft</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip color="primary">Primary</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="danger">Danger</Chip>
        <Chip color="default">Default</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip rounded="none">None</Chip>
        <Chip rounded="sm">Small</Chip>
        <Chip rounded="md">Medium</Chip>
        <Chip rounded="lg">Large</Chip>
        <Chip rounded="full">Full</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip icon="mdi:star">With Icon</Chip>
        <Chip onClose={() => {}}>With Close</Chip>
        <Chip icon="mdi:star" onClose={() => {}}>With Both</Chip>
      </div>
    </div>
  ),
}; 