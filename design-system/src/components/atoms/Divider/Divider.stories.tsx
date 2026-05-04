import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from '.';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Basic horizontal divider
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'neutral',
    size: 'md',
  },
};

// Orientation variants
export const OrientationVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="w-64">
        <p>Horizontal Divider</p>
        <Divider className="my-4" />
        <p>Content below</p>
      </div>
      <div className="h-[200px] flex items-center gap-4">
        <p className="text-neutral-600">Left content</p>
        <div className="h-full py-4">
          <Divider orientation="vertical" />
        </div>
        <p className="text-neutral-600">Right content</p>
      </div>
    </div>
  ),
};

// Variant styles
export const VariantStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  ),
};

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Divider color="primary" />
      <Divider color="secondary" />
      <Divider color="neutral" />
      <Divider color="success" />
      <Divider color="warning" />
      <Divider color="error" />
    </div>
  ),
};

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Divider size="sm" />
      <Divider size="md" />
      <Divider size="lg" />
    </div>
  ),
};

// Complex example
export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Section 1</h3>
        <p>Some content here</p>
        <Divider variant="dashed" color="primary" className="my-4" />
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Section 2</h3>
        <p>More content here</p>
        <Divider variant="dotted" color="success" size="lg" className="my-4" />
      </div>
      
      <div className="flex items-center">
        <p>Left content</p>
        <div className="h-[100px] py-4">
          <Divider orientation="vertical" variant="dashed" color="warning" className="mx-4" />
        </div>
        <p>Right content</p>
      </div>
    </div>
  ),
};
