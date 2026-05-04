import type { Meta, StoryObj } from "@storybook/react-vite";
import { NegativeCase, NegativeCaseVariant } from "./NegativeCase";
import { Text } from "../../atoms/Text";

const meta: Meta<typeof NegativeCase> = {
  title: "Molecules/NegativeCase",
  component: NegativeCase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NegativeCase>;

const variants: NegativeCaseVariant[] = [
  "no-internet",
  "data-not-found",
  "under-development",
  "information-unavailable",
  "payment-success",
  "payment-failed",
  "no-order",
  "timeout",
  "on-process",
  "page-not-found",
  "page-not-found-v2",
  "no-seat-available",
  "change-price",
  "help-desk",
  "approved",
  "rejected",
];

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {variants.map((variant) => (
        <div key={variant} className="border rounded-lg p-4 flex flex-col items-center">
          <NegativeCase
            variant={variant}
            reload={() => alert(`Reload for ${variant}`)}
          />
          <div className="mt-2 text-xs text-gray-500">variant: {variant}</div>
        </div>
      ))}
    </div>
  ),
};

export const WithCustomMessageString: Story = {
  args: {
    variant: "data-not-found",
    customMessage: "No results found for your search.",
    reload: () => alert("Reload clicked"),
  },
};

export const WithCustomMessageReactNode: Story = {
  args: {
    variant: "payment-failed",
    customMessage: (
      <div className="space-y-2">
        <Text variant="body1" className="font-semibold text-red-600">
          Payment Processing Failed
        </Text>
        <Text variant="body2" className="text-gray-600">
          Please check your payment details and try again.
        </Text>
      </div>
    ),
    reload: () => alert("Reload clicked"),
  },
};

export const WithCustomReloadText: Story = {
  args: {
    variant: "no-internet",
    reload: () => alert("Reload clicked"),
    reloadText: "Reconnect",
  },
};

export const WithoutReload: Story = {
  args: {
    variant: "timeout",
  },
};

export const WithCustomImage: Story = {
  args: {
    variant: "under-development",
    customImage: "https://placehold.co/300x200",
    reload: () => alert("Reload clicked"),
  },
};

export const WithCustomImageAndSize: Story = {
  args: {
    variant: "no-order",
    customImage: "https://placehold.co/150x100",
    width: 150,
    height: 100,
    reload: () => alert("Reload clicked"),
  },
};
