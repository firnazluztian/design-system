import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  {
    id: '1',
    title: 'Accordion Item 1',
    content: 'This is the content of accordion item 1.',
  },
  {
    id: '2',
    title: 'Accordion Item 2',
    content: 'This is the content of accordion item 2.',
  },
  {
    id: '3',
    title: 'Accordion Item 3 (Disabled)',
    content: 'This is the content of accordion item 3.',
    disabled: true,
  },
];

const longContentItems = [
  {
    id: '1',
    title: 'Getting Started',
    content: 'Learn the basics of our platform and how to get started with your first project. This guide will walk you through the essential features and best practices.',
  },
  {
    id: '2',
    title: 'Advanced Features',
    content: 'Explore advanced features and capabilities that will help you take your projects to the next level. Includes detailed documentation and examples.',
  },
  {
    id: '3',
    title: 'Troubleshooting',
    content: 'Common issues and their solutions. Learn how to debug problems and get help when you need it.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
  },
};

export const WithShadow: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    shadow: 'md',
  },
};

export const RoundedNone: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'none',
  },
};

export const RoundedSmall: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'sm',
  },
};

export const RoundedMedium: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'md',
  },
};

export const RoundedLarge: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'lg',
  },
};

export const RoundedExtraLarge: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'xl',
  },
};

export const RoundedFull: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
    rounded: 'full',
  },
};

export const Primary: Story = {
  args: {
    items: sampleItems,
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    items: sampleItems,
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    items: sampleItems,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    items: sampleItems,
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    items: sampleItems,
    variant: 'info',
  },
};

export const Light: Story = {
  args: {
    items: sampleItems,
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    items: sampleItems,
    variant: 'dark',
  },
};

export const Multiple: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    variant: 'primary',
    shadow: 'sm',
  },
};

export const LeftIcon: Story = {
  args: {
    items: sampleItems,
    iconPosition: 'left',
    variant: 'primary',
    shadow: 'sm',
  },
};

export const CustomIcon: Story = {
  args: {
    items: sampleItems,
    icon: 'mdi:chevron-right',
    variant: 'primary',
    shadow: 'sm',
  },
};

export const LongContent: Story = {
  args: {
    items: longContentItems,
    variant: 'primary',
    className: 'max-w-2xl',
    shadow: 'md',
  },
};

// Controlled Accordion Stories
export const Controlled: Story = {
  render: () => {
    const [openIds, setOpenIds] = useState<string[]>(['1']);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setOpenIds(['1'])}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Open Item 1
          </button>
          <button
            onClick={() => setOpenIds(['2'])}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Open Item 2
          </button>
          <button
            onClick={() => setOpenIds(['1', '2'])}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Open Both
          </button>
          <button
            onClick={() => setOpenIds([])}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Close All
          </button>
        </div>
        <Accordion
          items={sampleItems}
          openIds={openIds}
          onOpenChange={setOpenIds}
          multiple={true}
          variant="primary"
          shadow="sm"
        />
        <div className="text-sm text-gray-600">
          Open IDs: {openIds.length > 0 ? openIds.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FormValidationExample: Story = {
  render: () => {
    const [openIds, setOpenIds] = useState<string[]>([]);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      const invalidSections: string[] = [];

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        invalidSections.push('1');
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        invalidSections.push('2');
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
        invalidSections.push('3');
      }

      setErrors(newErrors);
      setOpenIds(invalidSections);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      validateForm();
    };

    const formItems = [
      {
        id: '1',
        title: 'Personal Information',
        content: (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Contact Details',
        content: (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Additional Information',
        content: (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Accordion
            items={formItems}
            openIds={openIds}
            onOpenChange={setOpenIds}
            multiple={true}
            variant="primary"
            shadow="sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Form
            </button>
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setOpenIds([]);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm font-medium">
              Please fix the following errors:
            </p>
            <ul className="mt-1 text-red-600 text-sm list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const ProgrammaticControl: Story = {
  render: () => {
    const [openIds, setOpenIds] = useState<string[]>([]);
    
    const openAll = () => setOpenIds(['1', '2', '3']);
    const closeAll = () => setOpenIds([]);
    const openFirst = () => setOpenIds(['1']);
    const openLast = () => setOpenIds(['3']);

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={openAll}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            Open All
          </button>
          <button
            onClick={closeAll}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Close All
          </button>
          <button
            onClick={openFirst}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Open First
          </button>
          <button
            onClick={openLast}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            Open Last
          </button>
        </div>
        <Accordion
          items={sampleItems}
          openIds={openIds}
          onOpenChange={setOpenIds}
          multiple={true}
          variant="primary"
          shadow="md"
        />
        <div className="text-sm text-gray-600">
          Currently open: {openIds.length > 0 ? openIds.join(', ') : 'None'}
        </div>
      </div>
    );
  },
}; 