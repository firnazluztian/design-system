import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogActions,
  // DialogHeader
} from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Atoms/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    backdrop: {
      control: "select",
      options: ["blur", "dark", "transparent"],
    },
    scrollBehavior: {
      control: "select",
      options: ["normal", "inside", "outside"],
    },
    closeOnBackdropClick: { control: "boolean" },
    size: {
      control: "select",
      options: [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "fullscreen",
      ],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
    position: {
      control: "select",
      options: ["center", "top", "bottom", "left", "right"],
    },
    animationDuration: {
      control: { type: "number", min: 0, step: 50 },
      description: "Animation duration in ms (backdrop and panel)",
    },
    animationDelay: {
      control: { type: "number", min: 0, step: 50 },
      description: "Animation delay in ms",
    },
  },
  args: {
    animationDuration: 300,
    animationDelay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Interactive Example with Header
const InteractiveDialogWithHeader = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog with Header</Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        backdrop={args.backdrop ?? "blur"}
        header={args.header ?? <DialogTitle>Custom Header</DialogTitle>}
        closeOnBackdropClick={args.closeOnBackdropClick ?? true}
      >
        <DialogBody>
          This dialog has a custom header with a close icon. The backdrop is
          blurred.
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Example with Custom Header
const DialogWithCustomHeader = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog with Custom Header
      </Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        backdrop={args.backdrop ?? "dark"}
        header={
          args.header ?? (
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              Custom Header with Icon
            </div>
          )
        }
        closeOnBackdropClick={args.closeOnBackdropClick ?? false}
      >
        <DialogBody>
          This dialog has a custom header with an emoji and close button.
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Example without Header
const DialogWithoutHeader = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog without Header
      </Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        backdrop={args.backdrop ?? "dark"}
      >
        <DialogBody>
          This dialog has no header and no close icon. It can only be closed by
          clicking outside or using the action buttons.
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const WithHeader: Story = {
  render: (args) => <InteractiveDialogWithHeader {...args} />,
};

export const WithCustomHeader: Story = {
  render: (args) => <DialogWithCustomHeader {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Dialog with a custom header including an emoji and close button.",
      },
    },
  },
};

export const WithoutHeader: Story = {
  render: (args) => <DialogWithoutHeader {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Dialog without a header or close icon.",
      },
    },
  },
};

// Example with Header but no content (only close button)
const DialogWithEmptyHeader = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog with Empty Header
      </Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        backdrop={args.backdrop ?? "dark"}
        header={<div></div>} // Empty header content
        closeOnBackdropClick={args.closeOnBackdropClick ?? true}
      >
        <DialogBody>
          This dialog has a header with no visible content, but the close button is still positioned on the right.
          The close icon maintains its position regardless of header content.
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const WithEmptyHeader: Story = {
  render: (args) => <DialogWithEmptyHeader {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Dialog with an empty header that still shows the close button positioned on the right.",
      },
    },
  },
};

const DialogTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={<DialogTitle>Dialog Title</DialogTitle>}
      >
        <DialogBody>
          This is the dialog content. You can put any content here.
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Small: Story = {
  render: (args) => <DialogTemplate {...args} size="sm" />,
};

export const Medium: Story = {
  render: (args) => <DialogTemplate {...args} size="md" />,
};

export const Large: Story = {
  render: (args) => <DialogTemplate {...args} size="lg" />,
};

export const ExtraLarge: Story = {
  render: (args) => <DialogTemplate {...args} size="xl" />,
};

export const TwoXL: Story = {
  render: (args) => <DialogTemplate {...args} size="2xl" />,
};

export const ThreeXL: Story = {
  render: (args) => <DialogTemplate {...args} size="3xl" />,
};

export const FourXL: Story = {
  render: (args) => <DialogTemplate {...args} size="4xl" />,
};

export const FiveXL: Story = {
  render: (args) => <DialogTemplate {...args} size="5xl" />,
};

export const Fullscreen: Story = {
  render: (args) => <DialogTemplate {...args} size="fullscreen" />,
};

export const WithBlurBackdrop: Story = {
  render: (args) => <DialogTemplate {...args} backdrop="blur" />,
};

export const WithTransparentBackdrop: Story = {
  render: (args) => <DialogTemplate {...args} backdrop="transparent" />,
};

export const PositionCenter: Story = {
  render: (args) => <DialogTemplate {...args} position="center" />,
};

export const PositionTop: Story = {
  render: (args) => <DialogTemplate {...args} position="top" />,
};

export const PositionBottom: Story = {
  render: (args) => <DialogTemplate {...args} position="bottom" />,
};

export const PositionLeft: Story = {
  render: (args) => <DialogTemplate {...args} position="left" size="md" />,
  parameters: {
    docs: {
      description: {
        story: "Left drawer with slide-in animation and full-height panel.",
      },
    },
  },
};

export const PositionRight: Story = {
  render: (args) => <DialogTemplate {...args} position="right" size="md" />,
  parameters: {
    docs: {
      description: {
        story: "Right drawer with slide-in animation and full-height panel.",
      },
    },
  },
};

// Example allowing custom Tailwind size via `sizeClassName`
export const CustomWidth: Story = {
  render: (args) => (
    <DialogTemplate
      {...args}
      // Demonstrate overriding width with a Tailwind utility
      // Consumers can pass values like `w-full`, `w-[10em]`, or `max-w-7xl`
      sizeClassName="w-[28rem] max-w-none"
      // Keep a preset for rounding/animations but it will not affect width when sizeClassName is set
      size="lg"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates using `sizeClassName` to fully control width (e.g., `w-[28rem]`, `w-full`, `max-w-7xl`).",
      },
    },
  },
};

// Utilities to generate long content for scroll demos
const LongContent = () => (
  <div className="space-y-4">
    {Array.from({ length: 40 }).map((_, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius,
        nunc ac cursus aliquet, metus orci posuere libero, vel lobortis urna
        sapien eget purus.
      </p>
    ))}
  </div>
);

const ScrollTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="space-y-3">
        <p>Use the control knob to switch scroll behavior.</p>
      </div>
      <Button onClick={() => setIsOpen(true)}>Open Long Content Dialog</Button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={args.size ?? "xl"}
        header={<DialogTitle>Long Content</DialogTitle>}
      >
        <DialogBody>
          <LongContent />
        </DialogBody>
        <DialogActions>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ScrollNormal: Story = {
  render: (args) => <ScrollTemplate {...args} scrollBehavior="normal" />,
  parameters: {
    docs: {
      description: {
        story:
          "Body scroll is locked while dialog is open (default). Panel may clip if content exceeds viewport height.",
      },
    },
  },
};

export const ScrollInside: Story = {
  render: (args) => <ScrollTemplate {...args} scrollBehavior="inside" />,
  parameters: {
    docs: {
      description: {
        story:
          "Content scrolls inside the dialog panel; body scroll is locked.",
      },
    },
  },
};

export const ScrollOutside: Story = {
  render: (args) => <ScrollTemplate {...args} scrollBehavior="outside" />,
  parameters: {
    docs: {
      description: {
        story: "Body (page) can scroll behind the dialog.",
      },
    },
  },
};
