import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorWrapper } from "./ErrorWrapper";
import { Text } from "../../atoms/Text";

const meta: Meta<typeof ErrorWrapper> = {
  title: "Molecules/ErrorWrapper",
  component: ErrorWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorWrapper>;

// Basic usage stories
export const NoError: Story = {
  args: {
    children: <div>This content will be shown when there is no error</div>,
  },
};

export const WithChildren: Story = {
  args: {
    children: <div>This is the content that will be shown when there is no error</div>,
  },
};

export const NotFound404: Story = {
  args: {
    error: {
      code: "404",
      message: "The page you are looking for does not exist.",
    },
    reload: () => alert("Reload clicked"),
  },
};

export const ServerError500: Story = {
  args: {
    error: {
      code: "500",
      message: "Something went wrong on our end. Please try again later.",
    },
    reload: () => alert("Reload clicked"),
  },
};

// Application Error Variant Stories
export const NoInternet: Story = {
  args: {
    variant: "no-internet",
    reload: () => alert("Reload clicked"),
  },
};

export const DataNotFound: Story = {
  args: {
    variant: "data-not-found",
    reload: () => alert("Reload clicked"),
  },
};

export const UnderDevelopment: Story = {
  args: {
    variant: "under-development",
    reload: () => alert("Reload clicked"),
  },
};

export const PaymentSuccess: Story = {
  args: {
    variant: "payment-success",
    reload: () => alert("Reload clicked"),
  },
};

export const PaymentFailed: Story = {
  args: {
    variant: "payment-failed",
    reload: () => alert("Reload clicked"),
  },
};

export const NoOrder: Story = {
  args: {
    variant: "no-order",
    reload: () => alert("Reload clicked"),
  },
};

export const Timeout: Story = {
  args: {
    variant: "timeout",
    reload: () => alert("Reload clicked"),
  },
};

export const OnProcess: Story = {
  args: {
    variant: "on-process",
    reload: () => alert("Reload clicked"),
  },
};

export const PageNotFound: Story = {
  args: {
    variant: "page-not-found",
    reload: () => alert("Reload clicked"),
  },
};

// Custom content stories
export const WithCustomContent: Story = {
  args: {
    customImage: "https://placehold.co/300x200",
    customMessage: "This is a completely custom error state",
    reload: () => alert("Reload clicked"),
  },
};

export const WithCustomImageOnly: Story = {
  args: {
    error: {
      code: "404",
    },
    customImage: "https://placehold.co/300x200",
    reload: () => alert("Reload clicked"),
  },
};

export const WithCustomMessageOnly: Story = {
  args: {
    error: {
      code: "500",
    },
    customMessage: "This is a custom error message that overrides the default one",
    reload: () => alert("Reload clicked"),
  },
};

// ReactNode custom message examples
export const WithReactNodeMessage: Story = {
  args: {
    variant: "data-not-found",
    customMessage: (
      <div className="space-y-2">
        <Text variant="body1" className="font-semibold">
          No results found
        </Text>
        <Text variant="body2" className="text-gray-600">
          Try adjusting your search criteria or browse our categories
        </Text>
      </div>
    ),
    reload: () => alert("Reload clicked"),
  },
};

export const WithComplexReactNodeMessage: Story = {
  args: {
    variant: "payment-failed",
    customMessage: (
      <div className="space-y-3">
        <Text variant="body1" className="font-semibold text-red-600">
          Payment Processing Failed
        </Text>
        <Text variant="body2" className="text-gray-600">
          We couldn't process your payment. This might be due to:
        </Text>
        <ul className="text-sm text-gray-500 text-left space-y-1">
          <li>• Insufficient funds</li>
          <li>• Expired card</li>
          <li>• Incorrect card details</li>
        </ul>
        <Text variant="body2" className="text-blue-600">
          Please try again or contact support
        </Text>
      </div>
    ),
    reload: () => alert("Reload clicked"),
  },
};

// Complex combinations
export const WithVariantAndCustomImage: Story = {
  args: {
    variant: "under-development",
    customImage: "https://placehold.co/300x200",
    reload: () => alert("Reload clicked"),
  },
};

export const WithErrorAndCustomContent: Story = {
  args: {
    error: {
      code: "403",
    },
    customImage: "https://placehold.co/300x200",
    customMessage: "Custom access denied message",
    reload: () => alert("Reload clicked"),
  },
};