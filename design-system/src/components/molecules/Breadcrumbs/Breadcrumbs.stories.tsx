import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { Icon } from '../../atoms/Icons/Icons';

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[300px] max-w-[800px] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { label: 'Home', href: '/', icon: 'mdi:home' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/products/categories' },
  { label: 'Electronics' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Small: Story = {
  args: {
    items: defaultItems,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    items: defaultItems,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    items: defaultItems,
    size: 'lg',
  },
};

export const WithoutIcons: Story = {
  args: {
    items: defaultItems.map(({ label, href }) => ({ label, href })),
  },
};

export const CustomSeparator: Story = {
  args: {
    items: defaultItems,
    separator: <Icon icon="mdi:forward" className="h-4 w-4" />,
  },
};

export const TextSeparator: Story = {
  args: {
    items: defaultItems,
    separator: '/',
  },
};

export const Light: Story = {
  args: {
    items: defaultItems,
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    items: defaultItems,
    variant: 'dark',
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home', href: '/', icon: 'mdi:home' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'mdi:home' },
      { label: 'Products' },
    ],
  },
};

export const WithoutActiveLastItem: Story = {
  args: {
    items: defaultItems,
    activeLastItem: false,
  },
};

export const AllWithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'mdi:home' },
      { label: 'Products', href: '/products', icon: 'mdi:package' },
      { label: 'Categories', href: '/products/categories', icon: 'mdi:folder' },
      { label: 'Electronics', icon: 'mdi:laptop' },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'mdi:home' },
      { label: 'Very Long Product Category Name That Should Truncate', href: '/products' },
      { label: 'Even Longer Subcategory Name That Should Also Truncate', href: '/products/categories' },
      { label: 'Final Destination With Extremely Long Text That Will Be Truncated' },
    ],
  },
}; 