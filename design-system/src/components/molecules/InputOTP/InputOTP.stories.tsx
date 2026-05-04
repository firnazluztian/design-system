import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTP } from './InputOTP';
import { useState } from 'react';

const meta: Meta<typeof InputOTP> = {
  title: 'Molecules/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
  },
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
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    length: {
      control: { type: 'range', min: 3, max: 8, step: 1 },
    },
    numericOnly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    showSubmitButton: {
      control: 'boolean',
    },
    submitButtonVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
  },
};

export const WithSubmitButton: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    showSubmitButton: true,
    submitButtonLabel: 'Verify',
  },
};

export const WithBottomLabel: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    bottomLabel: "Didn't receive a code? Resend in 30s",
    length: 6,
    numericOnly: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Verification Code',
    error: true,
    errorText: 'Invalid verification code',
    length: 6,
    numericOnly: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Verification Code',
    variant: 'success',
    helperText: 'Verification successful!',
    length: 6,
    numericOnly: true,
  },
};

export const CustomLength: Story = {
  args: {
    label: 'Authentication Code',
    helperText: 'Enter the 4-digit code from your authenticator app',
    length: 4,
    numericOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    label: 'PIN',
    helperText: 'Enter your 4-digit PIN',
    length: 4,
    numericOnly: true,
    size: 'sm',
  },
};

export const Rounded: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    rounded: 'lg',
  },
};

export const Underline: Story = {
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    variant: 'underline',
  },
};

// This is an example of a controlled component
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <InputOTP
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onComplete={(complete) => console.log('Completed:', complete)}
        />
        <div className="mt-4 text-sm">
          Current value: <code>{value}</code>
        </div>
      </div>
    );
  },
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
  },
};

// This is an example with a submit button that demonstrates the onSubmit callback
export const WithSubmitCallback: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    
    return (
      <div className="w-96">
        <InputOTP
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onSubmit={(value) => setSubmitted(value)}
        />
        {submitted && (
          <div className="mt-4 p-2 bg-success-50 text-success-700 rounded-md">
            Code submitted: <code>{submitted}</code>
          </div>
        )}
      </div>
    );
  },
  args: {
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your phone',
    length: 6,
    numericOnly: true,
    showSubmitButton: true,
    submitButtonVariant: 'success',
    submitButtonLabel: 'Verify Code',
  },
};
