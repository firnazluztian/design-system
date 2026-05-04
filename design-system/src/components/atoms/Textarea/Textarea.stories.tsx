import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
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
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'left'],
    },
    fullWidth: {
      control: 'boolean',
    },
    showCharCount: {
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
type Story = StoryObj<typeof Textarea>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    helperText: 'Provide a detailed description of your project',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter comments...',
    error: true,
    errorText: 'Please provide valid comments',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCharCount: true,
    maxLength: 500,
    helperText: 'Maximum 500 characters',
  },
};

// Character Count with State
export const CharacterCountInteractive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCharCount={true}
        maxLength={500}
        helperText="Maximum 500 characters"
      />
    );
  },
};

// Variant Examples
export const VariantExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="Default variant" variant="default" />
      <Textarea placeholder="Error variant" variant="error" />
      <Textarea placeholder="Success variant" variant="success" />
      <Textarea placeholder="Ghost variant" variant="ghost" />
      <Textarea placeholder="Underline variant" variant="underline" />
    </div>
  ),
};

// Size Examples
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="Small size" size="sm" />
      <Textarea placeholder="Medium size" size="md" />
      <Textarea placeholder="Large size" size="lg" />
    </div>
  ),
};

// Rounded Examples
export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="None rounded" rounded="none" />
      <Textarea placeholder="Small rounded" rounded="sm" />
      <Textarea placeholder="Medium rounded" rounded="md" />
      <Textarea placeholder="Large rounded" rounded="lg" />
      <Textarea placeholder="Extra Large rounded" rounded="xl" />
      <Textarea placeholder="2xl rounded" rounded="2xl" />
      <Textarea placeholder="3xl rounded" rounded="3xl" />
      <Textarea placeholder="Full rounded" rounded="full" />
    </div>
  ),
};

// Resize Examples
export const ResizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea 
        label="No Resize" 
        placeholder="This textarea cannot be resized" 
        resize="none" 
        helperText="Resize is disabled"
      />
      <Textarea 
        label="Vertical Resize" 
        placeholder="This textarea can only be resized vertically" 
        resize="vertical" 
        helperText="Only vertical resize allowed"
      />
      <Textarea 
        label="Horizontal Resize" 
        placeholder="This textarea can only be resized horizontally" 
        resize="horizontal" 
        helperText="Only horizontal resize allowed"
      />
      <Textarea 
        label="Both Directions" 
        placeholder="This textarea can be resized in both directions" 
        resize="both" 
        helperText="Resize in both directions allowed"
      />
    </div>
  ),
};

// State Examples
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea 
        label="Required Field" 
        placeholder="This field is required..." 
        required 
        helperText="This field is mandatory"
      />
      <Textarea 
        label="Disabled Textarea" 
        placeholder="This textarea is disabled..." 
        disabled 
        value="This content cannot be edited"
      />
      <Textarea 
        label="Read Only Textarea" 
        value="This is a read only textarea. You can select and copy the text but cannot modify it." 
        readOnly 
        helperText="You can select and copy the text but cannot modify it"
      />
    </div>
  ),
};

// Layout Examples
export const LayoutExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea 
        label="Full Width Textarea" 
        placeholder="This textarea takes full width..." 
        fullWidth 
        helperText="Full width textarea"
      />
      <Textarea 
        label="Left Label" 
        placeholder="Label on the left..." 
        labelPlacement="left" 
        helperText="Label positioned on the left"
      />
    </div>
  ),
};

// Form Examples
export const FormExamples: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      feedback: '',
      description: '',
      comments: '',
    });

    return (
      <div className="max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold">Contact Form</h3>
        
        <Textarea
          label="Feedback"
          placeholder="Please provide your feedback..."
          value={formData.feedback}
          onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
          required
          showCharCount
          maxLength={1000}
          helperText="Maximum 1000 characters"
        />
        
        <Textarea
          label="Project Description"
          placeholder="Describe your project in detail..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          minRows={5}
          maxRows={15}
          resize="vertical"
          helperText="Provide a detailed description"
        />
        
        <Textarea
          label="Additional Comments"
          placeholder="Any additional comments or suggestions..."
          value={formData.comments}
          onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          variant="ghost"
          helperText="Optional additional information"
        />
      </div>
    );
  },
};

// Error States
export const ErrorStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Required Field Error"
        placeholder="This field is required..."
        error={true}
        errorText="This field is required"
        required
      />
      <Textarea
        label="Character Limit Exceeded"
        placeholder="Type more than 100 characters..."
        value="This is a very long text that exceeds the character limit and should show an error state when the character count goes over the maximum allowed length."
        error={true}
        errorText="Character limit exceeded"
        showCharCount
        maxLength={100}
      />
      <Textarea
        label="Validation Error"
        placeholder="Enter valid content..."
        error={true}
        errorText="Please enter valid content that meets our requirements"
        variant="error"
      />
    </div>
  ),
};

// Success States
export const SuccessStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Valid Input"
        placeholder="This input is valid..."
        variant="success"
        value="This is valid content"
        helperText="Great! This input is valid"
      />
      <Textarea
        label="Completed Field"
        placeholder="This field has been completed..."
        variant="success"
        value="This field has been successfully completed with all required information."
        helperText="Field completed successfully"
        showCharCount
        maxLength={200}
      />
    </div>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Custom Styled Textarea"
        placeholder="This has custom styling..."
        className="border-2 border-blue-300 focus:border-blue-500 bg-blue-50"
        helperText="Custom border and background colors"
      />
      <Textarea
        label="Rounded Textarea"
        placeholder="Fully rounded textarea..."
        rounded="full"
        className="border-purple-300 focus:border-purple-500"
        helperText="Fully rounded with custom colors"
      />
    </div>
  ),
};
