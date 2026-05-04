import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
    variant: {
      control: "select",
      options: ["default", "elevated", "outline", "ghost"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
        "light",
        "custom",
      ],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
    showArrow: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    delay: {
      control: "number",
    },
    closeDelay: {
      control: "number",
    },
    trigger: {
      control: "select",
      options: ["hover", "press", "focus", "manual"],
    },
    offset: {
      control: "number",
    },
    shouldCloseOnScroll: {
      control: "boolean",
    },
    zIndex: {
      control: "number",
      description: "Z-index for the tooltip container",
    },
    contentZIndex: {
      control: "number",
      description: "Z-index for the tooltip content (fallbacks to zIndex)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: (
      <div className="p-2">
        <div className="text-sm">This is a tooltip</div>
      </div>
    ),
    children: <Button>Hover me</Button>,
    placement: "top",
    variant: "default",
    color: "light",
    shadow: "md",
    rounded: "lg",
    showArrow: true,
  },
};

export const Colored: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip
        content={<div className="p-2 text-sm">Primary tooltip</div>}
        color="primary"
      >
        <Button>Primary</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Success tooltip</div>}
        color="success"
      >
        <Button>Success</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Warning tooltip</div>}
        color="warning"
      >
        <Button>Warning</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Danger tooltip</div>}
        color="danger"
      >
        <Button>Danger</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip
        content={<div className="p-2 text-sm">Default</div>}
        variant="default"
        showArrow
      >
        <Button>Default</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Elevated</div>}
        variant="elevated"
        showArrow
      >
        <Button>Elevated</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Outline</div>}
        variant="outline"
        showArrow
      >
        <Button>Outline</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Ghost</div>}
        variant="ghost"
        showArrow
      >
        <Button>Ghost</Button>
      </Tooltip>
    </div>
  ),
};

export const ShadowRounded: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip
        content={<div className="p-2 text-sm">No shadow</div>}
        shadow="none"
      >
        <Button>No Shadow</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Small shadow</div>}
        shadow="sm"
      >
        <Button>Shadow sm</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Large rounded</div>}
        rounded="xl"
      >
        <Button>Rounded xl</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Full rounded</div>}
        rounded="full"
      >
        <Button>Rounded full</Button>
      </Tooltip>
    </div>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
      <Tooltip content={<div className="p-2 text-sm">Top</div>} placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip
        content={<div className="p-2 text-sm">Bottom</div>}
        placement="bottom"
      >
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip
        content={<div className="p-2 text-sm">Left</div>}
        placement="left"
      >
        <Button>Left</Button>
      </Tooltip>
      <Tooltip
        content={<div className="p-2 text-sm">Right</div>}
        placement="right"
      >
        <Button>Right</Button>
      </Tooltip>
      <Tooltip
        content={<div className="p-2 text-sm">Top Start</div>}
        placement="top-start"
      >
        <Button>Top Start</Button>
      </Tooltip>
      <Tooltip
        content={<div className="p-2 text-sm">Bottom End</div>}
        placement="bottom-end"
      >
        <Button>Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    content: <div className="p-2 text-sm">Custom color tooltip</div>,
    children: <Button>Custom Color</Button>,
    color: "custom",
    customColor: "#8B5CF6",
    variant: "default",
    shadow: "lg",
    rounded: "lg",
    showArrow: true,
  },
};

export const TriggersAndDelay: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <Tooltip
        content={<div className="p-2 text-sm">Hover trigger</div>}
        trigger="hover"
        delay={200}
      >
        <Button>Hover (delay 200ms)</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Focus trigger</div>}
        trigger="focus"
        closeDelay={150}
      >
        <Button>Focus (close delay 150ms)</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Press trigger</div>}
        trigger="press"
      >
        <Button>Press</Button>
      </Tooltip>
    </div>
  ),
};

export const ZIndexDemo: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap">
      <Tooltip
        content={<div className="p-2 text-sm">Above most</div>}
        zIndex={100}
      >
        <Button>zIndex 100</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">Content higher</div>}
        zIndex={100}
        contentZIndex={200}
      >
        <Button>contentZIndex 200</Button>
      </Tooltip>

      <Tooltip
        content={<div className="p-2 text-sm">String z-index</div>}
        zIndex="var(--tooltip-z, 75)"
      >
        <Button>zIndex var()</Button>
      </Tooltip>
    </div>
  ),
};
