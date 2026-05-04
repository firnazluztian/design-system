import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './CheckBox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['square', 'circle'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    variantSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Circle: Story = {
  args: {
    label: 'Circle Checkbox',
    variant: 'circle',
  },
};

export const WithColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Primary" color="primary" defaultChecked />
      <Checkbox label="Secondary" color="secondary" defaultChecked />
      <Checkbox label="Success" color="success" defaultChecked />
      <Checkbox label="Warning" color="warning" defaultChecked />
      <Checkbox label="Error" color="error" defaultChecked />
    </div>
  ),
};

export const WithCircleColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Primary Circle" variant="circle" color="primary" defaultChecked />
      <Checkbox label="Secondary Circle" variant="circle" color="secondary" defaultChecked />
      <Checkbox label="Success Circle" variant="circle" color="success" defaultChecked />
      <Checkbox label="Warning Circle" variant="circle" color="warning" defaultChecked />
      <Checkbox label="Error Circle" variant="circle" color="error" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small" variantSize="sm" defaultChecked />
      <Checkbox label="Medium" variantSize="md" defaultChecked />
      <Checkbox label="Large" variantSize="lg" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Error Checkbox',
    error: 'This field is required',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};
