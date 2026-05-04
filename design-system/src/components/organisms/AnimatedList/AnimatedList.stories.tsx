import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnimatedList } from "./AnimatedList";
import { Notification } from "../../atoms/Notification/Notification";

const meta: Meta<typeof AnimatedList> = {
  title: "Organisms/AnimatedList",
  component: AnimatedList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    items: [
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
      "Echo",
      "Foxtrot",
      "Golf",
    ],
    showGradients: true,
    enableArrowNavigation: true,
    displayScrollbar: true,
    initialSelectedIndex: -1,
    className: "",
    itemClassName: "",
  },
  argTypes: {
    onItemSelect: { action: "itemSelected" },
    items: { control: { type: "object" } },
    showGradients: { control: "boolean" },
    enableArrowNavigation: { control: "boolean" },
    displayScrollbar: { control: "boolean" },
    initialSelectedIndex: { control: { type: "number", min: -1 } },
    className: { control: "text" },
    itemClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedList>;

// Basic Examples
export const Default: Story = {};

export const WithCustomChildren: Story = {
  args: { items: undefined },
  render: (args) => (
    <div style={{ width: 360  }}>
      <AnimatedList {...args} onItemSelect={(item, index) => alert(`${item} ${index}`)}>
        {["One", "Two", "Three", "Four", "Five", "Six"].map((label, i) => (
          <Notification key={i} title={label}>
            {label}
          </Notification>
        ))}
      </AnimatedList>
    </div>
  ),
};

export const NoGradients: Story = {
  args: { showGradients: false },
};

export const WithoutScrollbar: Story = {
  args: { displayScrollbar: false },
};

export const DisabledArrowNavigation: Story = {
  args: { enableArrowNavigation: false },
};

export const PreselectedItem: Story = {
  args: { initialSelectedIndex: 2 },
};
