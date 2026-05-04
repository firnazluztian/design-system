import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from ".";
import { Icon } from '../../atoms/Icons/Icons';

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "outline-primary",
        "outline-secondary",
        "outline-success",
        "outline-warning",
        "outline-danger",
        "ghost",
        "link",
        "success",
        "warning",
        "danger",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    leftIcon: {
      control: "text",
    },
    rightIcon: {
      control: "text",
    },
    isIconOnly: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic Variants
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

// Outline Variants
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const OutlinePrimary: Story = {
  args: {
    children: "Outline Primary",
    variant: "outline-primary",
  },
};

export const OutlineSecondary: Story = {
  args: {
    children: "Outline Secondary",
    variant: "outline-secondary",
  },
};

// Semantic Variants
export const Success: Story = {
  args: {
    children: "Success Button",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Button",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

// Text Variants
export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

// Loading States
export const Loading: Story = {
  args: {
    children: "Loading Button",
    isLoading: true,
  },
};

export const LoadingWithIcon: Story = {
  args: {
    children: "Loading Button",
    isLoading: true,
    leftIcon: "mdi:loading",
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Rounded Variants
export const RoundedVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button rounded="none">None</Button>
      <Button rounded="sm">Small</Button>
      <Button rounded="md">Medium</Button>
      <Button rounded="lg">Large</Button>
      <Button rounded="xl">Extra Large</Button>
      <Button rounded="2xl">2xl</Button>
      <Button rounded="3xl">3xl</Button>
      <Button rounded="full">Full</Button>
    </div>
  ),
};

// Icon Variants
export const WithStartIcon: Story = {
  args: {
    children: "Search",
    leftIcon: "mdi:search",
  },
};

export const WithEndIcon: Story = {
  args: {
    children: "Next",
    rightIcon: "mdi:arrow-right",
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "Add Item",
    leftIcon: "mdi:plus",
    rightIcon: "mdi:arrow-right",
  },
};

// Icon Only Buttons
export const IconOnly: Story = {
  args: {
    "aria-label": "Search",
    children: <Icon icon="mdi:search" />,
    rounded: "full",
    isIconOnly: true,
  },
};

export const IconOnlySmall: Story = {
  args: {
    "aria-label": "Add",
    children: <Icon icon="mdi:plus" />,
    size: "sm",
    rounded: "full",
    isIconOnly: true,
  },
};

export const IconOnlyLarge: Story = {
  args: {
    "aria-label": "Next",
    children: <Icon icon="mdi:arrow-right" />,
    size: "lg",
    rounded: "full",
    isIconOnly: true,
  },
};

// Semantic Variants with Icons
export const SemanticWithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="success" leftIcon="mdi:check">
        Success Action
      </Button>
      <Button variant="warning" leftIcon="mdi:alert">
        Warning Action
      </Button>
      <Button variant="danger" leftIcon="mdi:delete">
        Danger Action
      </Button>
    </div>
  ),
};

// Full Width
export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Default</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button variant="outline" isLoading>Loading</Button>
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Button',
    leftIcon: 'mdi:plus',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button',
    rightIcon: 'mdi:arrow-right',
  },
};

export const IconOnlyVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button leftIcon="mdi:plus" isIconOnly variant="primary" />
      <Button leftIcon="mdi:plus" isIconOnly variant="secondary" />
      <Button leftIcon="mdi:plus" isIconOnly variant="outline" />
      <Button leftIcon="mdi:plus" isIconOnly variant="ghost" />
      <Button leftIcon="mdi:plus" isIconOnly variant="success" />
      <Button leftIcon="mdi:plus" isIconOnly variant="warning" />
      <Button leftIcon="mdi:plus" isIconOnly variant="danger" />
    </div>
  ),
};

export const IconOnlySizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button leftIcon="mdi:plus" isIconOnly size="xs" />
      <Button leftIcon="mdi:plus" isIconOnly size="sm" />
      <Button leftIcon="mdi:plus" isIconOnly size="md" />
      <Button leftIcon="mdi:plus" isIconOnly size="lg" />
    </div>
  ),
};

export const IconOnlyLoading: Story = {
  args: {
    leftIcon: 'mdi:plus',
    isIconOnly: true,
    isLoading: true,
  },
};

export const IconOnlyDisabled: Story = {
  args: {
    leftIcon: 'mdi:plus',
    isIconOnly: true,
    disabled: true,
  },
};

export const IconOnlyWithTooltip: Story = {
  args: {
    leftIcon: 'mdi:plus',
    isIconOnly: true,
    title: 'Add new item',
  },
};
