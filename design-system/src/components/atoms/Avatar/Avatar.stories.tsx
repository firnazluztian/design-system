import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    variant: {
      control: "select",
      options: ["cover", "contain"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const sampleImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&facepad=2";

export const Default: Story = {
  args: {
    src: sampleImg,
    alt: "Default Avatar",
  },
};

export const Contain: Story = {
  args: {
    src: sampleImg,
    alt: "Contain Avatar",
    variant: "contain",
  },
};

export const Cover: Story = {
  args: {
    src: sampleImg,
    alt: "Cover Avatar",
    variant: "cover",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "User Avatar",
    size: "medium",
    shape: "circle",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    shape: "circle",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    shape: "circle",
  },
};

export const Square: Story = {
  args: {
    size: "medium",
    shape: "square",
  },
};

export const InitialsSingleWord: Story = {
  args: {
    src: "steve",
    alt: "Steve",
  },
};

export const InitialsTwoWords: Story = {
  args: {
    src: "steve jobs",
    alt: "Steve Jobs",
  },
};
