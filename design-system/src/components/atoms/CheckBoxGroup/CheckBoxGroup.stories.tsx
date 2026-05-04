import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckBoxGroup } from './CheckBoxGroup';
import { useState } from 'react';

const meta: Meta<typeof CheckBoxGroup> = {
  title: 'Atoms/CheckBoxGroup',
  component: CheckBoxGroup,
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
    variant: {
      control: 'select',
      options: ['square', 'circle'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    checkboxSize: {
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
    showSelectAll: {
      control: 'boolean',
    },
    indeterminateSelectAll: {
      control: 'boolean',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    selectAllGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBoxGroup>;

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
    label: 'Select Options',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Options',
    defaultValue: ['option1', 'option3'],
  },
};

export const WithHelperText: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Options',
    helperText: 'Choose one or more options from the list',
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Options',
    error: true,
    errorText: 'Please select at least one option',
  },
};

export const WithErrorAndSelectAll: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Options',
    error: true,
    errorText: 'Please select at least one option',
    showSelectAll: true,
  },
};

export const ErrorWithDifferentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Square Variant with Error"
        error={true}
        errorText="This field has an error"
        variant="square"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Circle Variant with Error"
        error={true}
        errorText="This field has an error"
        variant="circle"
        showSelectAll={true}
      />
    </div>
  ),
};

export const ErrorWithDifferentColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Primary Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="primary"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Success Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="success"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Warning Color with Error (should show error styling)"
        error={true}
        errorText="Error overrides color prop"
        color="warning"
        showSelectAll={true}
      />
    </div>
  ),
};

export const UnselectedErrorStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Unselected Checkboxes with Error (Square)"
        error={true}
        errorText="Notice the danger-colored borders on unselected checkboxes"
        variant="square"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Unselected Checkboxes with Error (Circle)"
        error={true}
        errorText="Notice the danger-colored borders on unselected checkboxes"
        variant="circle"
        showSelectAll={true}
      />
    </div>
  ),
};

export const ErrorStateComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Normal State (No Error)"
        variant="square"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Error State (Danger borders on unselected)"
        error={true}
        errorText="Compare with the normal state above"
        variant="square"
        showSelectAll={true}
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    options: sampleOptions,
    label: 'Select Options',
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
      <CheckBoxGroup
        options={sampleOptions}
        label="Small Size"
        size="sm"
        checkboxSize="sm"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Medium Size"
        size="md"
        checkboxSize="md"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Large Size"
        size="lg"
        checkboxSize="lg"
      />
    </div>
  ),
};

// Variant Examples
export const VariantExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckBoxGroup
        options={sampleOptions}
        label="Square Variant"
        variant="square"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Circle Variant"
        variant="circle"
      />
    </div>
  ),
};

// Color Examples
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckBoxGroup
        options={sampleOptions}
        label="Primary Color"
        color="primary"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Secondary Color"
        color="secondary"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Success Color"
        color="success"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Warning Color"
        color="warning"
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Error Color"
        color="error"
      />
    </div>
  ),
};

// Select All Examples
export const WithSelectAll: Story = {
  args: {
    options: sampleOptions,
    label: 'Select All Options',
    showSelectAll: true,
  },
};

export const CustomSelectAllText: Story = {
  args: {
    options: sampleOptions,
    label: 'Custom Select All',
    showSelectAll: true,
    selectAllText: 'Check All Items',
  },
};

export const WithoutIndeterminateSelectAll: Story = {
  args: {
    options: sampleOptions,
    label: 'No Indeterminate State',
    showSelectAll: true,
    indeterminateSelectAll: false,
  },
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

export const WithIndeterminateOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', indeterminate: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', indeterminate: true },
      { value: 'option5', label: 'Option 5' },
    ],
    label: 'Options with Indeterminate State',
  },
};

// Interactive Examples
export const ControlledComponent: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);
    
    return (
      <div className="flex flex-col gap-4">
                 <CheckBoxGroup
           options={sampleOptions}
           label="Controlled CheckBoxGroup"
           value={selectedValues}
           onChange={setSelectedValues}
           showSelectAll={true}
         />
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium">Selected Values:</p>
          <p className="text-sm text-gray-600">
            {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      interests: [] as string[],
      notifications: [] as string[],
    });

    const interestOptions = [
      { value: 'technology', label: 'Technology' },
      { value: 'sports', label: 'Sports' },
      { value: 'music', label: 'Music' },
      { value: 'travel', label: 'Travel' },
      { value: 'cooking', label: 'Cooking' },
    ];

    const notificationOptions = [
      { value: 'email', label: 'Email Notifications' },
      { value: 'sms', label: 'SMS Notifications' },
      { value: 'push', label: 'Push Notifications' },
    ];

    return (
      <div className="flex flex-col gap-6 max-w-md">
                 <CheckBoxGroup
           options={interestOptions}
           label="Interests"
           value={formData.interests}
           onChange={(value) => setFormData(prev => ({ ...prev, interests: value }))}
           showSelectAll={true}
           selectAllText="Select All Interests"
           helperText="Choose your areas of interest"
         />
         
         <CheckBoxGroup
           options={notificationOptions}
           label="Notification Preferences"
           value={formData.notifications}
           onChange={(value) => setFormData(prev => ({ ...prev, notifications: value }))}
           showSelectAll={true}
           selectAllText="Enable All Notifications"
           helperText="Select how you'd like to receive notifications"
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
      <CheckBoxGroup
        options={sampleOptions}
        label="Vertical Layout (Default)"
        layout="vertical"
      />
      
      <CheckBoxGroup
        options={sampleOptions}
        label="Horizontal Layout"
        layout="horizontal"
      />
      
      <CheckBoxGroup
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
    label: 'Full Width CheckBoxGroup',
    fullWidth: true,
    layout: 'horizontal',
  },
};

// Accessibility Examples
export const AccessibilityExample: Story = {
  args: {
    options: sampleOptions,
    label: 'Accessible CheckBoxGroup',
    required: true,
    helperText: 'This example demonstrates proper accessibility features',
    'aria-describedby': 'custom-description',
  },
};

// Gap Examples
export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="No Gap"
        gap="none"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Extra Small Gap"
        gap="xs"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Small Gap"
        gap="sm"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Medium Gap"
        gap="md"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Large Gap"
        gap="lg"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Extra Large Gap"
        gap="xl"
        showSelectAll={true}
      />
    </div>
  ),
};

export const CustomSelectAllGap: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Small Gap Between Options, Large Gap After Select All"
        gap="sm"
        selectAllGap="lg"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Large Gap Between Options, Small Gap After Select All"
        gap="lg"
        selectAllGap="sm"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="No Gap Between Options, Medium Gap After Select All"
        gap="none"
        selectAllGap="md"
        showSelectAll={true}
      />
    </div>
  ),
};

export const HorizontalLayoutWithGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Horizontal Layout - Small Gap"
        layout="horizontal"
        gap="sm"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Horizontal Layout - Large Gap"
        layout="horizontal"
        gap="lg"
        showSelectAll={true}
      />
    </div>
  ),
};

export const GridLayoutWithGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CheckBoxGroup
        options={sampleOptions}
        label="Grid Layout - Small Gap"
        layout="grid"
        gap="sm"
        showSelectAll={true}
      />
      <CheckBoxGroup
        options={sampleOptions}
        label="Grid Layout - Large Gap"
        layout="grid"
        gap="lg"
        showSelectAll={true}
      />
    </div>
  ),
};

// ReactNode Label Examples
export const WithReactNodeLabels: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const reactNodeOptions = [
      {
        value: 'feature1',
        label: (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Feature with Icon</span>
          </div>
        )
      },
      {
        value: 'feature2',
        label: (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">New</span>
            <span>Feature with Badge</span>
          </div>
        )
      },
      {
        value: 'feature3',
        label: (
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span>Premium Feature</span>
          </div>
        )
      },
      {
        value: 'feature4',
        label: (
          <div className="flex flex-col gap-1">
            <span className="font-medium">Advanced Feature</span>
            <span className="text-xs text-gray-500">With detailed description</span>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxGroup
          options={reactNodeOptions}
          label="Features with ReactNode Labels"
          value={selectedOptions}
          onChange={setSelectedOptions}
          showSelectAll={true}
          helperText="These options demonstrate complex label content"
        />
        
        {selectedOptions.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              Selected: <strong>{selectedOptions.join(', ')}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithIconsAndBadges: Story = {
  render: () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categoryOptions = [
      {
        value: 'design',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm">🎨</span>
            </div>
            <div>
              <div className="font-medium">Design</div>
              <div className="text-sm text-gray-500">UI/UX, Graphics</div>
            </div>
          </div>
        )
      },
      {
        value: 'development',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm">💻</span>
            </div>
            <div>
              <div className="font-medium">Development</div>
              <div className="text-sm text-gray-500">Frontend, Backend</div>
            </div>
            <span className="ml-auto px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Hot</span>
          </div>
        )
      },
      {
        value: 'marketing',
        label: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-sm">📈</span>
            </div>
            <div>
              <div className="font-medium">Marketing</div>
              <div className="text-sm text-gray-500">SEO, Social Media</div>
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxGroup
          options={categoryOptions}
          label="Select Categories"
          value={selectedCategories}
          onChange={setSelectedCategories}
          showSelectAll={true}
          helperText="Choose the categories you're interested in"
        />
        
        {selectedCategories.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Selected Categories:</h3>
            <p className="text-sm text-green-800">
              {selectedCategories.join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithStatusIndicators: Story = {
  render: () => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const serviceOptions = [
      {
        value: 'web-hosting',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Web Hosting</span>
            <span className="text-xs text-gray-500">(99.9% uptime)</span>
          </div>
        )
      },
      {
        value: 'ssl-certificate',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>SSL Certificate</span>
            <span className="text-xs text-gray-500">(Free with hosting)</span>
          </div>
        )
      },
      {
        value: 'backup-service',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Backup Service</span>
            <span className="text-xs text-gray-500">(Daily backups)</span>
          </div>
        )
      },
      {
        value: 'cdn',
        label: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>CDN</span>
            <span className="text-xs text-gray-500">(Global distribution)</span>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxGroup
          options={serviceOptions}
          label="Additional Services"
          value={selectedServices}
          onChange={setSelectedServices}
          showSelectAll={true}
          helperText="Select additional services for your hosting package"
        />
        
        {selectedServices.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <p className="text-sm text-gray-700">
              Selected Services: <strong>{selectedServices.join(', ')}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithComplexContent: Story = {
  render: () => {
    const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

    const packageOptions = [
      {
        value: 'starter',
        label: (
          <div className="flex items-start gap-3 p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-lg font-bold">S</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Starter Package</div>
              <div className="text-sm text-gray-600 mb-1">Perfect for small projects</div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>• 5GB Storage</span>
                <span>• 1 Domain</span>
                <span>• Basic Support</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">$9</div>
              <div className="text-xs text-gray-500">/month</div>
            </div>
          </div>
        )
      },
      {
        value: 'professional',
        label: (
          <div className="flex items-start gap-3 p-2 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors bg-blue-50">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">P</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Professional Package</div>
              <div className="text-sm text-gray-600 mb-1">Ideal for growing businesses</div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>• 25GB Storage</span>
                <span>• 5 Domains</span>
                <span>• Priority Support</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">$29</div>
              <div className="text-xs text-gray-500">/month</div>
            </div>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Popular</span>
          </div>
        )
      },
      {
        value: 'enterprise',
        label: (
          <div className="flex items-start gap-3 p-2 rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg font-bold">E</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Enterprise Package</div>
              <div className="text-sm text-gray-600 mb-1">For large-scale applications</div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>• Unlimited Storage</span>
                <span>• Unlimited Domains</span>
                <span>• 24/7 Support</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">$99</div>
              <div className="text-xs text-gray-500">/month</div>
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="flex flex-col gap-4">
        <CheckBoxGroup
          options={packageOptions}
          label="Hosting Packages"
          value={selectedPackages}
          onChange={setSelectedPackages}
          showSelectAll={true}
          helperText="Select the hosting packages that meet your requirements"
        />
        
        {selectedPackages.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Selected Packages:</h3>
            <p className="text-sm text-green-800">
              {selectedPackages.join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  },
};
