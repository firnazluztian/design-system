import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Toggle Switch',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Switch',
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    label: 'Small Switch',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Switch',
    size: 'lg',
  },
};

export const SwitchGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Option 1" />
      <Switch label="Option 2" checked />
      <Switch label="Option 3" disabled />
    </div>
  ),
}; 