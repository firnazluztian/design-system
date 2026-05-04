import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from './TimePicker';

const meta = {
  title: 'Atoms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        height: 'auto',
        iframeHeight: 400,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        padding: '20px',
      }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'ghost', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    use24Hour: {
      control: 'boolean',
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'left'],
    },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const WithError: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    errorText: 'Please select a valid time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    helperText: 'Select your preferred time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const Required: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    required: true,
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    disabled: true,
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const TwentyFourHour: Story = {
  args: {
    label: 'Time (24h)',
    placeholder: 'Select time',
    use24Hour: true,
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'With Icons',
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Variant',
    variant: 'ghost',
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const UnderlineVariant: Story = {
  args: {
    label: 'Underline Variant',
    variant: 'underline',
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker rounded="none" placeholder="No rounded" leftIcon="mdi:clock" rightIcon="mdi:chevron-down" />
      <TimePicker rounded="sm" placeholder="Small rounded" leftIcon="mdi:clock" rightIcon="mdi:chevron-down" />
      <TimePicker rounded="md" placeholder="Medium rounded" leftIcon="mdi:clock" rightIcon="mdi:chevron-down" />
      <TimePicker rounded="lg" placeholder="Large rounded" leftIcon="mdi:clock" rightIcon="mdi:chevron-down" />
      <TimePicker rounded="full" placeholder="Full rounded" leftIcon="mdi:clock" rightIcon="mdi:chevron-down" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker
        label="Default"
        variant="default"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker
        label="Error"
        variant="error"
        errorText="Invalid time"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker
        label="Success"
        variant="success"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker
        label="Ghost"
        variant="ghost"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker
        label="Underline"
        variant="underline"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
    </div>
  ),
};

export const WithCustomFormatter: Story = {
  args: {
    label: 'Custom Format',
    placeholder: 'Select time',
    valueFormatter: (time) => {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes} ${Number(hours) < 12 ? 'AM' : 'PM'}`;
    },
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const LeftLabel: Story = {
  args: {
    label: 'Time',
    labelPlacement: 'left',
    placeholder: 'Select time',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    required: true,
    errorText: 'This field is required',
    leftIcon: 'mdi:clock',
    rightIcon: 'mdi:chevron-down',
  },
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker
        label="Top Label"
        labelPlacement="top"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker
        label="Left Label"
        labelPlacement="left"
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
      <TimePicker 
        label="Full Width" 
        fullWidth 
        placeholder="Select time"
        leftIcon="mdi:clock"
        rightIcon="mdi:chevron-down"
      />
    </div>
  ),
}; 