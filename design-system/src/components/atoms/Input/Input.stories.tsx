import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
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
    labelPlacement: {
      control: 'select',
      options: ['top', 'left'],
    },
    fullWidth: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email...',
    error: true,
    errorText: 'Please enter a valid email address',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: 'mdi:magnify',
    rightIcon: 'mdi:close',
    onRightIconClick: () => alert('Clear search clicked!'),
  },
};

// Password Visibility Toggle Example
export const PasswordWithVisibilityToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password..."
        rightIcon={showPassword ? "mdi:eye-off" : "mdi:eye"}
        onRightIconClick={() => setShowPassword(!showPassword)}
        helperText="Click the eye icon to toggle password visibility"
      />
    );
  },
};

// Interactive Icons Example
export const InteractiveIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Search with Clear"
        placeholder="Type to search..."
        leftIcon="mdi:magnify"
        rightIcon="mdi:close"
        onRightIconClick={() => alert('Clear search clicked!')}
      />
      <Input
        label="Copy to Clipboard"
        value="https://example.com"
        rightIcon="mdi:content-copy"
        onRightIconClick={() => alert('Copied to clipboard!')}
        readOnly
      />
    </div>
  ),
};

// Variant Examples
export const VariantExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Default variant" variant="default" />
      <Input placeholder="Error variant" variant="error" />
      <Input placeholder="Success variant" variant="success" />
      <Input placeholder="Ghost variant" variant="ghost" />
      <Input placeholder="Underline variant" variant="underline" />
    </div>
  ),
};

// Size Examples
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Small size" size="sm" />
      <Input placeholder="Medium size" size="md" />
      <Input placeholder="Large size" size="lg" />
    </div>
  ),
};

// Rounded Examples
export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="None rounded" rounded="none" />
      <Input placeholder="Small rounded" rounded="sm" />
      <Input placeholder="Medium rounded" rounded="md" />
      <Input placeholder="Large rounded" rounded="lg" />
      <Input placeholder="Extra Large rounded" rounded="xl" />
      <Input placeholder="2xl rounded" rounded="2xl" />
      <Input placeholder="3xl rounded" rounded="3xl" />
      <Input placeholder="Full rounded" rounded="full" />
    </div>
  ),
};

// State Examples
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Required Field" placeholder="This field is required..." required />
      <Input label="Disabled Input" placeholder="This input is disabled..." disabled />
      <Input 
        label="Read Only Input" 
        value="This is a read only input" 
        readOnly 
        helperText="You can select and copy the text but cannot modify it"
      />
    </div>
  ),
};

// ReadOnly Examples
export const ReadOnlyExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* these are dummy inputs to show the read only state not real API keys or URLs */}
      <Input
        label="Generated URL"
        value="https://example.com/share/abc123"
        readOnly
        rightIcon="mdi:open-in-new"
        onRightIconClick={() => alert('Opening URL in new tab...')}
        helperText="Click the icon to open the URL"
      />
      <Input
        label="Reference Number"
        value="REF-2024-001"
        readOnly
        variant="success"
        helperText="This is your unique reference number"
      />
      <Input
        label="Error Message"
        value="Invalid credentials"
        readOnly
        variant="error"
        errorText="This is an error message that cannot be modified"
      />
    </div>
  ),
};

// Layout Examples
export const LayoutExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Full Width Input" placeholder="This input takes full width..." fullWidth />
      <Input label="Left Label" placeholder="Label on the left..." labelPlacement="left" />
    </div>
  ),
}; 