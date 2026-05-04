import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
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
    isDismissable: {
      control: "boolean",
    },
    disableAnimation: {
      control: "boolean",
    },
    backdrop: {
      control: "select",
      options: ["transparent", "blur", "dark"],
    },
    shouldCloseOnScroll: {
      control: "boolean",
    },
    shouldCloseOnBlur: {
      control: "boolean",
    },
    shouldBlockScroll: {
      control: "boolean",
    },
    containerPadding: {
      control: "number",
    },
    crossOffset: {
      control: "number",
    },
    portalContainer: {
      control: false,
      description: "HTMLElement to render the popover into",
    },
    triggerType: {
      control: "select",
      options: ["dialog", "menu", "listbox", "tree", "grid"],
    },
    shouldFlip: {
      control: "boolean",
    },
    triggerScaleOnOpen: {
      control: "boolean",
    },
    zIndex: {
      control: "number",
      description: "Z-index for the popover container",
    },
    contentZIndex: {
      control: "number",
      description:
        "Z-index for the popover content (falls back to zIndex if not provided)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Default Popover</h4>
        <p className="text-sm text-gray-600">
          This is a default popover with standard styling.
        </p>
      </div>
    ),
    children: <Button>Click me</Button>,
    placement: "bottom",
    variant: "default",
    color: "light",
    shadow: "md",
    rounded: "lg",
    showArrow: true,
  },
};

export const Elevated: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Elevated Popover</h4>
        <p className="text-sm text-gray-600">
          This popover has an elevated appearance with stronger shadows.
        </p>
      </div>
    ),
    children: <Button>Elevated</Button>,
    variant: "elevated",
    color: "light",
    shadow: "lg",
    rounded: "xl",
    showArrow: true,
  },
};

export const ColoredVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Primary</h4>
            <p className="text-sm">Primary colored popover</p>
          </div>
        }
        color="primary"
        variant="default"
        shadow="md"
        rounded="lg"
      >
        <Button>Primary</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Success</h4>
            <p className="text-sm">Success colored popover</p>
          </div>
        }
        color="success"
        variant="default"
        shadow="md"
        rounded="lg"
      >
        <Button>Success</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Warning</h4>
            <p className="text-sm">Warning colored popover</p>
          </div>
        }
        color="warning"
        variant="default"
        shadow="md"
        rounded="lg"
      >
        <Button>Warning</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Danger</h4>
            <p className="text-sm">Danger colored popover</p>
          </div>
        }
        color="danger"
        variant="default"
        shadow="md"
        rounded="lg"
      >
        <Button>Danger</Button>
      </Popover>
    </div>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">No Shadow</h4>
            <p className="text-sm">Popover without shadow</p>
          </div>
        }
        shadow="none"
        rounded="lg"
      >
        <Button>No Shadow</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Small Shadow</h4>
            <p className="text-sm">Popover with small shadow</p>
          </div>
        }
        shadow="sm"
        rounded="lg"
      >
        <Button>Small Shadow</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Large Shadow</h4>
            <p className="text-sm">Popover with large shadow</p>
          </div>
        }
        shadow="lg"
        rounded="lg"
      >
        <Button>Large Shadow</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Extra Large Shadow</h4>
            <p className="text-sm">Popover with extra large shadow</p>
          </div>
        }
        shadow="xl"
        rounded="lg"
      >
        <Button>XL Shadow</Button>
      </Popover>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">No Rounded</h4>
            <p className="text-sm">Sharp corners</p>
          </div>
        }
        rounded="none"
        shadow="md"
      >
        <Button>No Rounded</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Small Rounded</h4>
            <p className="text-sm">Small rounded corners</p>
          </div>
        }
        rounded="sm"
        shadow="md"
      >
        <Button>Small Rounded</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Large Rounded</h4>
            <p className="text-sm">Large rounded corners</p>
          </div>
        }
        rounded="xl"
        shadow="md"
      >
        <Button>Large Rounded</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Full Rounded</h4>
            <p className="text-sm">Fully rounded corners</p>
          </div>
        }
        rounded="full"
        shadow="md"
      >
        <Button>Full Rounded</Button>
      </Popover>
    </div>
  ),
};

export const PlacementVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Top</h4>
            <p className="text-sm">Appears above the trigger</p>
          </div>
        }
        placement="top"
        shadow="md"
        rounded="lg"
      >
        <Button>Top</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Bottom</h4>
            <p className="text-sm">Appears below the trigger</p>
          </div>
        }
        placement="bottom"
        shadow="md"
        rounded="lg"
      >
        <Button>Bottom</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Left</h4>
            <p className="text-sm">Appears to the left</p>
          </div>
        }
        placement="left"
        shadow="md"
        rounded="lg"
      >
        <Button>Left</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Right</h4>
            <p className="text-sm">Appears to the right</p>
          </div>
        }
        placement="right"
        shadow="md"
        rounded="lg"
      >
        <Button>Right</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Top Start</h4>
            <p className="text-sm">Top with start alignment</p>
          </div>
        }
        placement="top-start"
        shadow="md"
        rounded="lg"
      >
        <Button>Top Start</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Bottom End</h4>
            <p className="text-sm">Bottom with end alignment</p>
          </div>
        }
        placement="bottom-end"
        shadow="md"
        rounded="lg"
      >
        <Button>Bottom End</Button>
      </Popover>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Custom Color</h4>
        <p className="text-sm">This popover uses a custom color</p>
      </div>
    ),
    children: <Button>Custom Color</Button>,
    color: "custom",
    customColor: "#8B5CF6",
    variant: "default",
    shadow: "lg",
    rounded: "xl",
    showArrow: true,
  },
};

export const NoArrow: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">No Arrow</h4>
        <p className="text-sm">This popover doesn't show an arrow</p>
      </div>
    ),
    children: <Button>No Arrow</Button>,
    showArrow: false,
    shadow: "md",
    rounded: "lg",
  },
};

export const OutlineVariant: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Outline Variant</h4>
        <p className="text-sm">This popover has an outline style</p>
      </div>
    ),
    children: <Button>Outline</Button>,
    variant: "outline",
    color: "primary",
    shadow: "sm",
    rounded: "lg",
    showArrow: true,
  },
};

export const GhostVariant: Story = {
  args: {
    content: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Ghost Variant</h4>
        <p className="text-sm">This popover has a ghost style</p>
      </div>
    ),
    children: <Button>Ghost</Button>,
    variant: "ghost",
    color: "neutral",
    shadow: "none",
    rounded: "lg",
    showArrow: true,
  },
};

export const BackdropVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Transparent Backdrop</h4>
            <p className="text-sm">No backdrop overlay</p>
          </div>
        }
        backdrop="transparent"
        shadow="md"
        rounded="lg"
      >
        <Button>Transparent</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Blur Backdrop</h4>
            <p className="text-sm">Backdrop with blur effect</p>
          </div>
        }
        backdrop="blur"
        shadow="md"
        rounded="lg"
      >
        <Button>Blur</Button>
      </Popover>

      <Popover
        content={
          <div className="p-4">
            <h4 className="font-semibold mb-2">Dark Backdrop</h4>
            <p className="text-sm">Dark backdrop overlay</p>
          </div>
        }
        backdrop="dark"
        shadow="md"
        rounded="lg"
      >
        <Button>Dark</Button>
      </Popover>
    </div>
  ),
};

export const ScrollBehavior: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Scroll Behavior Demo</h3>
        <p className="text-sm text-gray-600 mb-6">
          Try scrolling the page with these popovers open to see the difference
          in behavior.
          <br />
          <span className="text-xs text-gray-500">
            Uses HeroUI's native <code>shouldCloseOnScroll</code> prop
          </span>
        </p>
      </div>

      <div className="flex gap-8 justify-center flex-wrap">
        <div className="text-center">
          <h4 className="font-medium mb-2">Closes on Scroll (Default)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Closes on Scroll</h4>
                <p className="text-sm">
                  This popover will close when you scroll the page
                </p>
              </div>
            }
            shouldCloseOnScroll={true}
            shadow="md"
            rounded="lg"
            showArrow={true}
            placement="bottom"
            offset={8}
            triggerType="dialog"
            shouldFlip={true}
            containerPadding={12}
            portalContainer={
              typeof document !== "undefined" ? document.body : undefined
            }
          >
            <Button>Closes on Scroll</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Stays Open on Scroll</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Stays Open</h4>
                <p className="text-sm">
                  This popover will stay open when you scroll the page
                </p>
              </div>
            }
            shouldCloseOnScroll={false}
            shadow="md"
            rounded="lg"
            showArrow={true}
            placement="bottom"
            offset={8}
            triggerType="dialog"
            shouldFlip={true}
            containerPadding={12}
            portalContainer={
              typeof document !== "undefined" ? document.body : undefined
            }
          >
            <Button>Stays Open</Button>
          </Popover>
        </div>
      </div>

      {/* Add some content to make the page scrollable */}
      <div className="h-96 bg-gray-100 rounded-lg p-4 mt-8">
        <h4 className="font-semibold mb-2">Scrollable Content</h4>
        <p className="text-sm text-gray-600 mb-4">
          This content is here to make the page scrollable. Try opening the
          popovers above and then scrolling to see the difference in behavior.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-2 bg-white rounded border">
              Scrollable item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const PositioningDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Positioning Demo</h3>
        <p className="text-sm text-gray-600 mb-6">
          These popovers should stay positioned relative to their trigger
          elements, not scroll with the page content.
        </p>
      </div>

      <div className="flex gap-8 justify-center flex-wrap">
        <div className="text-center">
          <h4 className="font-medium mb-2">Fixed Position</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Fixed Position</h4>
                <p className="text-sm">
                  This popover should stay fixed relative to the button
                </p>
              </div>
            }
            shouldCloseOnScroll={false}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
            offset={8}
            triggerType="dialog"
            shouldFlip={true}
            containerPadding={12}
          >
            <Button>Fixed Position</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Menu Type</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Menu Type</h4>
                <p className="text-sm">
                  Using menu trigger type for better positioning
                </p>
              </div>
            }
            shouldCloseOnScroll={false}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
            offset={8}
            triggerType="menu"
            shouldFlip={true}
            containerPadding={12}
          >
            <Button>Menu Type</Button>
          </Popover>
        </div>
      </div>

      {/* Add some content to make the page scrollable */}
      <div className="h-96 bg-gray-100 rounded-lg p-4 mt-8">
        <h4 className="font-semibold mb-2">Scrollable Content</h4>
        <p className="text-sm text-gray-600 mb-4">
          Scroll this content to test if the popovers above maintain their
          position relative to their buttons.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-2 bg-white rounded border">
              Scrollable item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ZIndexDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Z-Index Control Demo</h3>
        <p className="text-sm text-gray-600 mb-6">
          Control the layering of popovers using z-index props. This is useful
          for ensuring popovers appear above or below other UI elements like
          navigation bars.
        </p>
      </div>

      <div className="flex gap-8 justify-center flex-wrap">
        <div className="text-center">
          <h4 className="font-medium mb-2">Default Z-Index (50)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Default Z-Index</h4>
                <p className="text-sm">Uses default z-index of 50</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 50</p>
              </div>
            }
            zIndex={50}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Default (50)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">High Z-Index (100)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">High Z-Index</h4>
                <p className="text-sm">Appears above most elements</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 100</p>
              </div>
            }
            zIndex={100}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>High (100)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Low Z-Index (10)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Low Z-Index</h4>
                <p className="text-sm">Appears below most elements</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 10</p>
              </div>
            }
            zIndex={10}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Low (10)</Button>
          </Popover>
        </div>
      </div>
    </div>
  ),
};

export const NavbarOverlapFix: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Navbar Overlap Fix Demo</h3>
        <p className="text-sm text-gray-600 mb-6">
          This demonstrates how to fix the popover appearing in front of navbar
          components by controlling z-index values.
        </p>
      </div>

      {/* Simulate a navbar with high z-index */}
      <div className="relative">
        <div
          className="bg-gray-900 text-white p-4 rounded-lg mb-4 flex items-center justify-between"
          style={{ zIndex: 1000 }}
        >
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Tixia Travel Solutions</h2>
            <nav className="flex space-x-4">
              <span className="text-sm">Pesawat</span>
              <span className="text-sm">Hotel</span>
              <span className="text-sm">Kereta</span>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Blink182</span>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <div className="text-center">
            <h4 className="font-medium mb-2">❌ Problem: High Z-Index</h4>
            <p className="text-xs text-red-600 mb-2">
              Popover appears above navbar
            </p>
            <Popover
              content={
                <div className="p-4 w-64">
                  <h4 className="font-semibold mb-2">Kamar 1</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dewasa</span>
                      <div className="flex items-center space-x-2">
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          -
                        </button>
                        <span className="w-8 text-center">2</span>
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anak-anak</span>
                      <div className="flex items-center space-x-2">
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          -
                        </button>
                        <span className="w-8 text-center">1</span>
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              zIndex={1100} // Higher than navbar
              shadow="lg"
              rounded="lg"
              showArrow={true}
              placement="bottom"
            >
              <Button>Room Selector (High Z)</Button>
            </Popover>
          </div>

          <div className="text-center">
            <h4 className="font-medium mb-2">✅ Solution: Low Z-Index</h4>
            <p className="text-xs text-green-600 mb-2">
              Popover appears below navbar
            </p>
            <Popover
              content={
                <div className="p-4 w-64">
                  <h4 className="font-semibold mb-2">Kamar 1</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dewasa</span>
                      <div className="flex items-center space-x-2">
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          -
                        </button>
                        <span className="w-8 text-center">2</span>
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anak-anak</span>
                      <div className="flex items-center space-x-2">
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          -
                        </button>
                        <span className="w-8 text-center">1</span>
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              zIndex={500} // Lower than navbar
              shadow="lg"
              rounded="lg"
              showArrow={true}
              placement="bottom"
            >
              <Button>Room Selector (Low Z)</Button>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ZIndexVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Z-Index Variants</h3>
        <p className="text-sm text-gray-600 mb-6">
          Different z-index values for various use cases and layering scenarios.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h4 className="font-medium mb-2">Modal Level (1000)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Modal Level</h4>
                <p className="text-sm">For modals and overlays</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 1000</p>
              </div>
            }
            zIndex={1000}
            shadow="xl"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Modal (1000)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Dropdown Level (100)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Dropdown Level</h4>
                <p className="text-sm">For dropdowns and menus</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 100</p>
              </div>
            }
            zIndex={100}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Dropdown (100)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Tooltip Level (50)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Tooltip Level</h4>
                <p className="text-sm">For tooltips and hints</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 50</p>
              </div>
            }
            zIndex={50}
            shadow="md"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Tooltip (50)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Background Level (10)</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Background Level</h4>
                <p className="text-sm">Behind other elements</p>
                <p className="text-xs text-gray-500 mt-1">zIndex: 10</p>
              </div>
            }
            zIndex={10}
            shadow="sm"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Background (10)</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">Custom Content Z-Index</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">Custom Content</h4>
                <p className="text-sm">Different z-index for content</p>
                <p className="text-xs text-gray-500 mt-1">
                  zIndex: 200, contentZIndex: 300
                </p>
              </div>
            }
            zIndex={200}
            contentZIndex={300}
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>Custom Content</Button>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="font-medium mb-2">String Z-Index</h4>
          <Popover
            content={
              <div className="p-4">
                <h4 className="font-semibold mb-2">String Z-Index</h4>
                <p className="text-sm">Using CSS custom properties</p>
                <p className="text-xs text-gray-500 mt-1">
                  zIndex: "var(--popover-z)"
                </p>
              </div>
            }
            zIndex="var(--popover-z, 75)"
            shadow="lg"
            rounded="lg"
            showArrow={true}
            placement="bottom"
          >
            <Button>String Z-Index</Button>
          </Popover>
        </div>
      </div>
    </div>
  ),
};
