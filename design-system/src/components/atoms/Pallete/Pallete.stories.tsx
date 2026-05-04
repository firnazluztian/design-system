import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pallete } from "./Pallete";

const meta: Meta<typeof Pallete> = {
  title: "Foundation/Pallete",
  component: Pallete,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Pallete>;

export const Default: Story = {
  args: {
    className: "p-8",
  },
};
