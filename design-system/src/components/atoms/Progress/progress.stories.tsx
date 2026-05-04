import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "circular"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    isIndeterminate: {
      control: "boolean",
    },
    showValue: {
      control: "boolean",
    },
    indicator: {
      control: "text",
      description: "Icon string or React node that follows the progress value",
    },
    indicatorPosition: {
      control: "select",
      options: ["on", "above"],
      description: "Position of the indicator relative to the progress bar",
    },
    indicatorSize: {
      control: { type: "number", min: 4, max: 96, step: 1 },
      description:
        "Size of the indicator icon in pixels (only applies when indicator is a string). Defaults to 16px (sm), 20px (md), or 24px (lg) based on progress size.",
    },
    hideIndicatorOnMax: {
      control: "boolean",
      description: "Whether to hide the indicator when progress reaches 100%",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// Bar Progress Stories
export const Default: Story = {
  args: {
    value: 50,
    label: "Progress",
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    label: "Loading...",
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={75} color="primary" label="Primary" showValue />
      <Progress value={75} color="secondary" label="Secondary" showValue />
      <Progress value={75} color="success" label="Success" showValue />
      <Progress value={75} color="warning" label="Warning" showValue />
      <Progress value={75} color="danger" label="Danger" showValue />
      <Progress value={75} color="info" label="Info" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={75} size="sm" label="Small" showValue />
      <Progress value={75} size="md" label="Medium" showValue />
      <Progress value={75} size="lg" label="Large" showValue />
    </div>
  ),
};

// Circular Progress Stories
export const CircularDefault: Story = {
  args: {
    variant: "circular",
    value: 50,
    label: "Circular Progress",
    showValue: true,
  },
};

export const CircularIndeterminate: Story = {
  args: {
    variant: "circular",
    isIndeterminate: true,
    label: "Loading...",
  },
};

export const CircularColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <Progress
        variant="circular"
        value={75}
        color="primary"
        label="Primary"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        color="secondary"
        label="Secondary"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        color="success"
        label="Success"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        color="warning"
        label="Warning"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        color="danger"
        label="Danger"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        color="info"
        label="Info"
        showValue
      />
    </div>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <Progress
        variant="circular"
        value={75}
        size="sm"
        label="Small"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        size="md"
        label="Medium"
        showValue
      />
      <Progress
        variant="circular"
        value={75}
        size="lg"
        label="Large"
        showValue
      />
    </div>
  ),
};

// Indicator Stories
export const WithIndicator: Story = {
  args: {
    value: 65,
    indicator: "mdi:airplane",
    indicatorPosition: "on",
    label: "Flight Progress",
    showValue: true,
  },
};

export const IndicatorAbove: Story = {
  args: {
    value: 75,
    indicator: "mdi:rocket",
    indicatorPosition: "above",
    label: "Launch Progress",
    showValue: true,
  },
};

export const IndicatorSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Progress
        value={60}
        indicator="mdi:airplane"
        indicatorSize={16}
        indicatorPosition="on"
        label="Small Indicator"
        showValue
      />
      <Progress
        value={60}
        indicator="mdi:airplane"
        indicatorSize={24}
        indicatorPosition="on"
        label="Medium Indicator"
        showValue
      />
      <Progress
        value={60}
        indicator="mdi:airplane"
        indicatorSize={32}
        indicatorPosition="on"
        label="Large Indicator"
        showValue
      />
    </div>
  ),
};

export const IndicatorWithCustomNode: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress
        value={70}
        indicator={<span className="text-2xl">🚀</span>}
        indicatorPosition="on"
        label="Custom Emoji Indicator"
        showValue
      />
      <Progress
        value={70}
        indicator={
          <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg" />
        }
        indicatorPosition="on"
        label="Custom Dot Indicator"
        showValue
      />
      <Progress
        value={70}
        indicator={
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-xs font-bold shadow-md">
            ✓
          </div>
        }
        indicatorPosition="above"
        label="Custom Badge Indicator"
        showValue
      />
    </div>
  ),
};

export const IndicatorColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress
        value={65}
        color="primary"
        indicator="mdi:airplane"
        indicatorPosition="on"
        label="Primary"
        showValue
      />
      <Progress
        value={65}
        color="success"
        indicator="mdi:check-circle"
        indicatorPosition="on"
        label="Success"
        showValue
      />
      <Progress
        value={65}
        color="warning"
        indicator="mdi:alert"
        indicatorPosition="on"
        label="Warning"
        showValue
      />
      <Progress
        value={65}
        color="danger"
        indicator="mdi:alert-circle"
        indicatorPosition="on"
        label="Danger"
        showValue
      />
    </div>
  ),
};

export const AnimatedIndicator: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="space-y-6">
        <Progress
          value={value}
          indicator="mdi:airplane"
          indicatorPosition="on"
          label="Animated Flight Progress"
          showValue
        />
        <Progress
          value={value}
          color="success"
          indicator="mdi:rocket"
          indicatorPosition="above"
          indicatorSize={28}
          label="Animated Rocket Progress"
          showValue
        />
      </div>
    );
  },
};

export const IndicatorPositions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2 text-neutral-700">
          Indicator On Bar
        </h3>
        <Progress
          value={60}
          indicator="mdi:airplane"
          indicatorPosition="on"
          label="Position: On"
          showValue
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-neutral-700">
          Indicator Above Bar
        </h3>
        <Progress
          value={60}
          indicator="mdi:airplane"
          indicatorPosition="above"
          label="Position: Above"
          showValue
        />
      </div>
    </div>
  ),
};

export const IndicatorHideOnMax: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-neutral-700">
          Hide on Max (Default)
        </h3>
        <Progress
          value={100}
          indicator="mdi:airplane"
          indicatorPosition="on"
          hideIndicatorOnMax={true}
          label="Progress Complete"
          showValue
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-neutral-700">
          Keep Visible on Max
        </h3>
        <Progress
          value={100}
          indicator="mdi:airplane"
          indicatorPosition="on"
          hideIndicatorOnMax={false}
          label="Progress Complete"
          showValue
        />
      </div>
    </div>
  ),
};
