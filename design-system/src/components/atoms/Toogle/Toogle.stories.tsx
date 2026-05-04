import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toogle';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Toggle me',
  },
};

export const Checked: Story = {
  args: {
    label: 'Toggle me',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Notifications',
    helperText: 'Receive notifications when someone mentions you',
  },
};

export const WithError: Story = {
  args: {
    label: 'Terms and Conditions',
    error: true,
    errorText: 'You must accept the terms and conditions',
    required: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Accept Terms',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Toggle',
    disabled: true,
    checked: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle variant="primary" label="Primary Toggle" checked />
      <Toggle variant="success" label="Success Toggle" checked />
      <Toggle variant="warning" label="Warning Toggle" checked />
      <Toggle variant="danger" label="Danger Toggle" checked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle size="sm" label="Small Toggle" />
      <Toggle size="md" label="Medium Toggle" />
      <Toggle size="lg" label="Large Toggle" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Toggle
        label="Email Notifications"
        helperText="Receive email notifications for important updates"
      />
      <Toggle
        label="SMS Notifications"
        helperText="Receive SMS notifications for important updates"
      />
      <Toggle
        label="Marketing Communications"
        helperText="Receive marketing emails about our products"
        variant="success"
      />
      <Toggle
        label="Terms and Conditions"
        required
        error
        errorText="You must accept the terms and conditions to continue"
      />
    </div>
  ),
};
