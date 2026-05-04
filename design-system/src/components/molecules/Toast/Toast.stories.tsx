import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, ToastProvider, useToast } from ".";
import { Button } from "../../atoms/Button";

const meta: Meta<typeof Toast> = {
  title: "Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Static Examples
export const Default: Story = {
  args: {
    title: "Toast Title",
    description: "This is a default toast message.",
  },
};

export const Interactive: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your changes have been saved successfully.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "An error occurred while saving your changes.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Your session will expire in 5 minutes.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "A new version is available.",
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "info",
    description: "This is a toast message without a title.",
  },
};

export const WithoutClose: Story = {
  args: {
    title: "No Close Button",
    description: "This toast does not have a close button.",
    showClose: false,
  },
};

export const LongContent: Story = {
  args: {
    title: "Long Content",
    description:
      "This is a toast message with a very long description that should wrap to multiple lines. It demonstrates how the toast handles longer content while maintaining its layout and readability.",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast variant="default" title="Default Toast" description="This is a default toast" />
      <Toast variant="success" title="Success Toast" description="This is a success toast" />
      <Toast variant="error" title="Error Toast" description="This is an error toast" />
      <Toast variant="warning" title="Warning Toast" description="This is a warning toast" />
      <Toast variant="info" title="Info Toast" description="This is an info toast" />
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast rounded="none" title="No Rounded" description="Toast with no rounded corners" />
      <Toast rounded="sm" title="Small Rounded" description="Toast with small rounded corners" />
      <Toast rounded="md" title="Medium Rounded" description="Toast with medium rounded corners" />
      <Toast rounded="lg" title="Large Rounded" description="Toast with large rounded corners" />
      <Toast rounded="full" title="Full Rounded" description="Toast with fully rounded corners" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    title: 'Toast with Icon',
    description: 'This toast includes an icon',
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Toast without Icon',
    description: 'This toast does not include an icon',
    showIcon: false,
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Custom Icon Toast',
    description: 'This toast has a custom icon',
    icon: 'mdi:star',
  },
};

// Interactive Demo
const ToastDemo = () => {
  const { showToast } = useToast();

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const;

  const variants = ["default", "success", "error", "warning", "info"] as const;

  const roundedOptions = ["none", "sm", "md", "lg", "full"] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium mb-2">Positions</h3>
        {positions.map((position) => (
          <Button
            key={position}
            onClick={() =>
              showToast({
                title: "Toast Title",
                description: "This is a toast message.",
                position,
                variant: "default",
              })
            }
          >
            Show {position} toast
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium mb-2">Variants</h3>
        {variants.map((variant) => (
          <Button
            key={variant}
            onClick={() =>
              showToast({
                title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
                description: `This is a ${variant} toast message.`,
                variant,
                position: "top-right",
              })
            }
          >
            Show {variant} toast
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium mb-2">Rounded Variants</h3>
        {roundedOptions.map((rounded) => (
          <Button
            key={rounded}
            onClick={() =>
              showToast({
                title: `${rounded.charAt(0).toUpperCase() + rounded.slice(1)} Rounded Toast`,
                description: `This is a toast with ${rounded} rounded corners.`,
                rounded,
                position: "top-right",
              })
            }
          >
            Show {rounded} rounded toast
          </Button>
        ))}
      </div>

      <div className="col-span-3 flex flex-col gap-2">
        <h3 className="font-medium mb-2">Special Cases</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              // Show multiple toasts in sequence
              ["success", "error", "warning", "info"].forEach((variant, index) => {
                setTimeout(() => {
                  showToast({
                    title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
                    description: `This is toast number ${index + 1}`,
                    variant: variant as any,
                    position: "top-right",
                    duration: 3000,
                  });
                }, index * 1000);
              });
            }}
          >
            Show multiple toasts
          </Button>

          <Button
            onClick={() =>
              showToast({
                title: "Persistent Toast",
                description: "This toast will not auto-close.",
                variant: "info",
                position: "top-right",
                duration: 0,
              })
            }
          >
            Show persistent toast
          </Button>
        </div>
      </div>
    </div>
  );
};
