import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '.';
import { Text } from '../Text/Text';

const meta = {
  title: 'Foundation/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'The icon name from Iconify',
    },
    size: {
      control: 'number',
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 45 },
      description: 'Rotation in degrees',
    },
    flip: {
      control: 'select',
      options: [undefined, 'horizontal', 'vertical', 'both'],
      description: 'Flip the icon',
    },
    spin: {
      control: 'boolean',
      description: 'Whether the icon should spin',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'mdi:steam',
    size: 24,
  },
};

export const Colored: Story = {
  args: {
    icon: 'mdi:star',
    size: 24,
    color: '#FFB400',
  },
};

export const Large: Story = {
  args: {
    icon: 'mdi:account',
    size: 48,
  },
};

export const Rotated: Story = {
  args: {
    icon: 'mdi:arrow-right',
    size: 24,
    rotate: 90,
  },
};

export const Flipped: Story = {
  args: {
    icon: 'mdi:arrow-right',
    size: 24,
    flip: 'horizontal',
  },
};

export const Spinning: Story = {
  args: {
    icon: 'mdi:loading',
    size: 24,
    spin: true,
  },
};

export const CommonIcons: Story = {
  args: {
    icon: 'mdi:home',
    size: 24,
  },
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Icon icon="mdi:home" size={24} />
      <Icon icon="mdi:account" size={24} />
      <Icon icon="mdi:settings" size={24} />
      <Icon icon="mdi:search" size={24} />
      <Icon icon="mdi:plus" size={24} />
      <Icon icon="mdi:minus" size={24} />
      <Icon icon="mdi:close" size={24} />
      <Icon icon="mdi:check" size={24} />
      <Icon icon="mdi:arrow-left" size={24} />
      <Icon icon="mdi:arrow-right" size={24} />
      <Icon icon="mdi:arrow-up" size={24} />
      <Icon icon="mdi:arrow-down" size={24} />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    icon: 'mdi:star',
    size: 24,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="mdi:star" size={16} />
      <Icon icon="mdi:star" size={24} />
      <Icon icon="mdi:star" size={32} />
      <Icon icon="mdi:star" size={48} />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    icon: 'mdi:heart',
    size: 24,
  },
  render: () => (
    <div className="flex gap-4">
      <Icon icon="mdi:heart" size={24} color="#EF4444" />
      <Icon icon="mdi:heart" size={24} color="#3B82F6" />
      <Icon icon="mdi:heart" size={24} color="#10B981" />
      <Icon icon="mdi:heart" size={24} color="#F59E0B" />
    </div>
  ),
}; 

export const Link: Story = {
  args: {
    icon: 'mdi:home',
    size: 24,
  },
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <a target="_blank" rel="noopener noreferrer" href="https://icon-sets.iconify.design/"><Text className='underline text-primary' variant="subtitle1">Click to open Iconify</Text></a>
    </div>
  ),
};