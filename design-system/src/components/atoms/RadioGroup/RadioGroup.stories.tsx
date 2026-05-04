import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'grid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'left'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    radioSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

// Basic Examples
export const Default: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an Option',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an Option',
    defaultValue: 'option2',
  },
};

export const WithHelperText: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an Option',
    helperText: 'Choose one option from the list',
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an Option',
    error: true,
    errorText: 'Please select an option',
  },
};

export const ErrorWithDifferentColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Primary Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="primary"
      />
      <RadioGroup
        options={sampleOptions}
        label="Success Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="success"
      />
      <RadioGroup
        options={sampleOptions}
        label="Warning Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="warning"
      />
    </div>
  ),
};

export const UnselectedErrorStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Unselected Radio Buttons with Error"
        error={true}
        errorText="Notice the danger-colored borders on unselected radio buttons"
      />
    </div>
  ),
};

export const RadioButtonDesign: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Normal Radio Buttons (White dot when selected)"
        defaultValue="option1"
      />
      <RadioGroup
        options={sampleOptions}
        label="Error State Radio Buttons (Danger borders + white dot)"
        error={true}
        errorText="Notice the danger-colored borders and white dot design"
        defaultValue="option2"
      />
      <RadioGroup
        options={sampleOptions}
        label="Different Colors"
        color="success"
        defaultValue="option3"
      />
    </div>
  ),
};

export const TextColorConsistency: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Normal State (Default text color)"
        defaultValue="option1"
      />
      <RadioGroup
        options={sampleOptions}
        label="Error State (Danger text color)"
        error={true}
        errorText="All text labels should be in danger color"
        defaultValue="option2"
      />
      <RadioGroup
        options={sampleOptions}
        label="Disabled State (Opacity reduced)"
        disabled={true}
        defaultValue="option3"
      />
    </div>
  ),
};

export const ErrorStateComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Normal State (No Error)"
      />
      <RadioGroup
        options={sampleOptions}
        label="Error State (Danger borders on unselected)"
        error={true}
        errorText="Compare with the normal state above"
      />
    </div>
  ),
};

// Gap Examples
export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="No Gap"
        gap="none"
      />
      <RadioGroup
        options={sampleOptions}
        label="Extra Small Gap"
        gap="xs"
      />
      <RadioGroup
        options={sampleOptions}
        label="Small Gap"
        gap="sm"
      />
      <RadioGroup
        options={sampleOptions}
        label="Medium Gap"
        gap="md"
      />
      <RadioGroup
        options={sampleOptions}
        label="Large Gap"
        gap="lg"
      />
      <RadioGroup
        options={sampleOptions}
        label="Extra Large Gap"
        gap="xl"
      />
    </div>
  ),
};

export const HorizontalLayoutWithGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Horizontal Layout - Small Gap"
        layout="horizontal"
        gap="sm"
      />
      <RadioGroup
        options={sampleOptions}
        label="Horizontal Layout - Large Gap"
        layout="horizontal"
        gap="lg"
      />
    </div>
  ),
};

export const GridLayoutWithGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Grid Layout - Small Gap"
        layout="grid"
        gap="sm"
      />
      <RadioGroup
        options={sampleOptions}
        label="Grid Layout - Large Gap"
        layout="grid"
        gap="lg"
      />
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Primary Color"
        color="primary"
      />
      <RadioGroup
        options={sampleOptions}
        label="Secondary Color"
        color="secondary"
      />
      <RadioGroup
        options={sampleOptions}
        label="Success Color"
        color="success"
      />
      <RadioGroup
        options={sampleOptions}
        label="Warning Color"
        color="warning"
      />
      <RadioGroup
        options={sampleOptions}
        label="Error Color"
        color="error"
      />
    </div>
  ),
};

export const RadioSizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Small Size"
        radioSize="sm"
        defaultValue="option1"
      />
      <RadioGroup
        options={sampleOptions}
        label="Medium Size"
        radioSize="md"
        defaultValue="option2"
      />
      <RadioGroup
        options={sampleOptions}
        label="Large Size"
        radioSize="lg"
        defaultValue="option3"
      />
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Small Radio Buttons (16px)"
        radioSize="sm"
        defaultValue="option1"
      />
      <RadioGroup
        options={sampleOptions}
        label="Medium Radio Buttons (20px)"
        radioSize="md"
        defaultValue="option2"
      />
      <RadioGroup
        options={sampleOptions}
        label="Large Radio Buttons (24px)"
        radioSize="lg"
        defaultValue="option3"
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    options: sampleOptions,
    label: 'Select an Option',
    required: true,
    helperText: 'This field is required',
  },
};

// Layout Examples
export const VerticalLayout: Story = {
  args: {
    options: sampleOptions,
    label: 'Vertical Layout',
    layout: 'vertical',
  },
};

export const HorizontalLayout: Story = {
  args: {
    options: sampleOptions,
    label: 'Horizontal Layout',
    layout: 'horizontal',
  },
};

export const GridLayout: Story = {
  args: {
    options: sampleOptions,
    label: 'Grid Layout',
    layout: 'grid',
  },
};

export const LeftLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Left Label',
    labelPlacement: 'left',
  },
};

// Size Examples
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup
        options={sampleOptions}
        label="Small Size"
        size="sm"
      />
      <RadioGroup
        options={sampleOptions}
        label="Medium Size"
        size="md"
      />
      <RadioGroup
        options={sampleOptions}
        label="Large Size"
        size="lg"
      />
    </div>
  ),
};

// State Examples
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    label: 'Disabled Group',
    disabled: true,
  },
};

export const PartiallyDisabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ],
    label: 'Partially Disabled Options',
  },
};

// Interactive Examples
export const ControlledComponent: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string>('option1');
    
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={sampleOptions}
          label="Controlled RadioGroup"
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium">Selected Value:</p>
          <p className="text-sm text-gray-600">{selectedValue}</p>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      gender: '',
      experience: '',
      preference: '',
    });

    const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ];

    const experienceOptions = [
      { value: 'beginner', label: 'Beginner (0-2 years)' },
      { value: 'intermediate', label: 'Intermediate (3-5 years)' },
      { value: 'advanced', label: 'Advanced (6+ years)' },
    ];

    const preferenceOptions = [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'mail', label: 'Mail' },
    ];

    return (
      <div className="flex flex-col gap-6 max-w-md">
        <RadioGroup
          options={genderOptions}
          label="Gender"
          value={formData.gender}
          onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
          required={true}
          helperText="Please select your gender"
        />
        
        <RadioGroup
          options={experienceOptions}
          label="Experience Level"
          value={formData.experience}
          onChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
          helperText="Select your experience level"
        />

        <RadioGroup
          options={preferenceOptions}
          label="Contact Preference"
          value={formData.preference}
          onChange={(value) => setFormData(prev => ({ ...prev, preference: value }))}
          helperText="How would you like to be contacted?"
        />

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Form Data:</h3>
          <pre className="text-sm text-blue-800">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

// Layout Examples
export const LayoutComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        options={sampleOptions}
        label="Vertical Layout (Default)"
        layout="vertical"
      />
      
      <RadioGroup
        options={sampleOptions}
        label="Horizontal Layout"
        layout="horizontal"
      />
      
      <RadioGroup
        options={sampleOptions}
        label="Grid Layout"
        layout="grid"
      />
    </div>
  ),
};

export const FullWidthExample: Story = {
  args: {
    options: sampleOptions,
    label: 'Full Width RadioGroup',
    fullWidth: true,
    layout: 'horizontal',
  },
};

// Accessibility Examples
export const AccessibilityExample: Story = {
  args: {
    options: sampleOptions,
    label: 'Accessible RadioGroup',
    required: true,
    helperText: 'This example demonstrates proper accessibility features',
    'aria-describedby': 'custom-description',
  },
};

// Real-world Examples
export const PaymentMethodSelection: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');

    const paymentOptions = [
      { value: 'credit-card', label: 'Credit Card' },
      { value: 'debit-card', label: 'Debit Card' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'bank-transfer', label: 'Bank Transfer' },
    ];

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={paymentOptions}
          label="Payment Method"
          value={paymentMethod}
          onChange={setPaymentMethod}
          required={true}
          helperText="Select your preferred payment method"
        />
        
        {paymentMethod && (
          <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm text-green-800">
              Selected: <strong>{paymentOptions.find(opt => opt.value === paymentMethod)?.label}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const SurveyQuestion: Story = {
  render: () => {
    const [rating, setRating] = useState<string>('');

    const ratingOptions = [
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'poor', label: 'Poor' },
    ];

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={ratingOptions}
          label="How would you rate our service?"
          value={rating}
          onChange={setRating}
          required={true}
          helperText="Please select one option"
        />
        
        {rating && (
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              Thank you for your feedback: <strong>{ratingOptions.find(opt => opt.value === rating)?.label}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const MultipleGroups: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      theme: '',
      language: '',
      notifications: '',
    });

    const themeOptions = [
      { value: 'light', label: 'Light Theme' },
      { value: 'dark', label: 'Dark Theme' },
      { value: 'auto', label: 'Auto (System)' },
    ];

    const languageOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ];

    const notificationOptions = [
      { value: 'all', label: 'All Notifications' },
      { value: 'important', label: 'Important Only' },
      { value: 'none', label: 'No Notifications' },
    ];

    return (
      <div className="flex flex-col gap-6">
        <RadioGroup
          options={themeOptions}
          label="Theme Preference"
          value={formData.theme}
          onChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
          name="theme-group"
        />
        
        <RadioGroup
          options={languageOptions}
          label="Language"
          value={formData.language}
          onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
          name="language-group"
        />
        
        <RadioGroup
          options={notificationOptions}
          label="Notification Settings"
          value={formData.notifications}
          onChange={(value) => setFormData(prev => ({ ...prev, notifications: value }))}
          name="notification-group"
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Settings Summary:</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Theme:</strong> {formData.theme || 'Not selected'}</p>
            <p><strong>Language:</strong> {formData.language || 'Not selected'}</p>
            <p><strong>Notifications:</strong> {formData.notifications || 'Not selected'}</p>
          </div>
        </div>
      </div>
    );
  },
};

// ReactNode Label Examples
export const WithReactNodeLabels: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const reactNodeOptions = [
      {
        value: 'option1',
        label: (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Option with Icon</span>
          </div>
        )
      },
      {
        value: 'option2',
        label: (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">New</span>
            <span>Option with Badge</span>
          </div>
        )
      },
      {
        value: 'option3',
        label: (
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span>Option with Emoji</span>
          </div>
        )
      },
      {
        value: 'option4',
        label: (
          <div className="flex flex-col gap-1">
            <span className="font-medium">Complex Option</span>
            <span className="text-xs text-gray-500">With description text</span>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={reactNodeOptions}
          label="Options with ReactNode Labels"
          value={selectedOption}
          onChange={setSelectedOption}
          helperText="These options demonstrate complex label content"
        />
        
        {selectedOption && (
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              Selected: <strong>{selectedOption}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithIconsAndBadges: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState<string>('');

    const planOptions = [
      {
        value: 'basic',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-sm">B</span>
            </div>
            <div>
              <div className="font-medium">Basic Plan</div>
              <div className="text-sm text-gray-500">$9/month</div>
            </div>
          </div>
        )
      },
      {
        value: 'pro',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">P</span>
            </div>
            <div>
              <div className="font-medium">Pro Plan</div>
              <div className="text-sm text-gray-500">$19/month</div>
            </div>
            <span className="ml-auto px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Popular</span>
          </div>
        )
      },
      {
        value: 'enterprise',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">E</span>
            </div>
            <div>
              <div className="font-medium">Enterprise</div>
              <div className="text-sm text-gray-500">Custom pricing</div>
            </div>
            <span className="ml-auto px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Enterprise</span>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={planOptions}
          label="Select Your Plan"
          value={selectedPlan}
          onChange={setSelectedPlan}
          helperText="Choose the plan that best fits your needs"
        />
        
        {selectedPlan && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Selected Plan:</h3>
            <p className="text-sm text-green-800">
              {planOptions.find(opt => opt.value === selectedPlan)?.value === 'basic' && 'Basic Plan - $9/month'}
              {planOptions.find(opt => opt.value === selectedPlan)?.value === 'pro' && 'Pro Plan - $19/month'}
              {planOptions.find(opt => opt.value === selectedPlan)?.value === 'enterprise' && 'Enterprise - Custom pricing'}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithStatusIndicators: Story = {
  render: () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const statusOptions = [
      {
        value: 'active',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Active</span>
            <span className="text-xs text-gray-500">(Currently running)</span>
          </div>
        )
      },
      {
        value: 'paused',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Paused</span>
            <span className="text-xs text-gray-500">(Temporarily stopped)</span>
          </div>
        )
      },
      {
        value: 'stopped',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Stopped</span>
            <span className="text-xs text-gray-500">(Not running)</span>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          options={statusOptions}
          label="Service Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          helperText="Select the current status of your service"
        />
        
        {selectedStatus && (
          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <p className="text-sm text-gray-700">
              Status: <strong>{selectedStatus}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};
