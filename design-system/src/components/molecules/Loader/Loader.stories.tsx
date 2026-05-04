import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader, LoaderVariant } from "./Loader";
import { Text } from "../../atoms/Text";

const meta: Meta<typeof Loader> = {
  title: "Molecules/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: 'text' },
      description: 'Container width (Tailwind class or number for pixels)',
    },
    height: {
      control: { type: 'text' },
      description: 'Container height (Tailwind class or number for pixels)',
    },
    widthImg: {
      control: { type: 'text' },
      description: 'Image width (Tailwind class or number for pixels)',
    },
    heightImg: {
      control: { type: 'text' },
      description: 'Image height (Tailwind class or number for pixels)',
    },
    customImage: {
      control: { type: 'text' },
      description: 'Custom image URL',
    },
    customMessage: {
      control: { type: 'text' },
      description: 'Custom loading message',
    },
    variant: {
      control: { type: 'select' },
      options: ['flight-light', 'flight-dark', 'tixia-circular', 'tixia-linear', 'hotel-loader'],
      description: 'Loader variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

const variants: LoaderVariant[] = ["flight-light", "flight-dark", "tixia-circular", "tixia-linear", "hotel-loader"];

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {variants.map((variant) => (
        <div key={variant} className="border rounded-lg p-4 flex flex-col items-center">
          <Loader variant={variant} />
          <div className="mt-2 text-xs text-gray-500">variant: {variant}</div>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: "flight-light",
    width: "w-full",
    height: "h-full",
    widthImg: "w-auto",
    heightImg: "h-auto",
    customMessage: "Loading, please wait...",
  },
};

export const WithCustomImage: Story = {
  args: {
    variant: "flight-light",
    customImage: "https://placehold.co/200x100.gif",
  },
};

export const WithCustomImageAndSize: Story = {
  args: {
    variant: "flight-dark",
    customImage: "https://placehold.co/120x80.gif",
    widthImg: "w-32",
    heightImg: "h-20",
  },
};

export const WithCustomMessageString: Story = {
  args: {
    variant: "flight-dark",
    customMessage: "Loading your data, please wait...",
  },
};

export const WithCustomMessageReactNode: Story = {
  args: {
    variant: "flight-light",
    customMessage: (
      <div className="space-y-2">
        <Text variant="body1" className="font-semibold text-blue-600">
          Please wait while we load your content
        </Text>
        <Text variant="body2" className="text-gray-600">
          This may take a few seconds
        </Text>
      </div>
    ),
  },
};

export const WithCustomImageAndMessage: Story = {
  args: {
    variant: "flight-dark",
    customImage: "https://placehold.co/200x100.gif",
    customMessage: "Custom loader with custom image and message",
  },
};

export const WithCustomContainerSize: Story = {
  args: {
    variant: "flight-light",
    width: "w-96",
    height: "h-64",
    widthImg: "w-32",
    heightImg: "h-32",
  },
};

export const WithNumberValues: Story = {
  args: {
    variant: "flight-dark",
    width: 400,
    height: 300,
    widthImg: 128,
    heightImg: 128,
  },
};

export const MixedValues: Story = {
  args: {
    variant: "flight-light",
    width: "w-96",
    height: 300,
    widthImg: 100,
    heightImg: "h-24",
  },
};
