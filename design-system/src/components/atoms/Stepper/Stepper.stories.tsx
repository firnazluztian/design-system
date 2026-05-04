import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Atoms/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    activeStep: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  {
    label: 'Account Details',
    description: 'Enter your account information',
  },
  {
    label: 'Personal Info',
    description: 'Enter your personal details',
  },
  {
    label: 'Review',
    description: 'Review your information',
  },
  {
    label: 'Complete',
    description: 'Registration completed',
  },
];

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: 'horizontal',
  },
};


export const WithCustomIcons: Story = {
  args: {
    steps: [
      {
        label: 'Cart',
        description: 'Review your cart',
        icon: 'mdi:cart',
      },
      {
        label: 'Shipping',
        description: 'Enter shipping details',
        icon: 'mdi:truck',
      },
      {
        label: 'Payment',
        description: 'Complete payment',
        icon: 'mdi:credit-card',
      },
      {
        label: 'Confirmation',
        description: 'Order confirmed',
        icon: 'mdi:check-circle',
      },
    ],
    activeStep: 2,
    orientation: 'horizontal',
  },
};

export const AllStatesHorizontal: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <Stepper
        steps={defaultSteps}
        activeStep={0}
        orientation="horizontal"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={1}
        orientation="horizontal"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={2}
        orientation="horizontal"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={4}
        orientation="horizontal"
      />
    </div>
  ),
};

export const AllStatesVertical: Story = {
  render: () => (
    <div className="flex gap-8">
      <Stepper
        steps={defaultSteps}
        activeStep={0}
        orientation="vertical"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={1}
        orientation="vertical"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={2}
        orientation="vertical"
      />
      <Stepper
        steps={defaultSteps}
        activeStep={4}
        orientation="vertical"
      />
    </div>
  ),
};
