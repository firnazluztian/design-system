/**
 * HeroUI Popover Variant
 *
 * This component wraps HeroUI's Popover components to provide a consistent API
 * with the main Popover component. It supports all HeroUI-specific features:
 *
 * - Advanced placement options (top-start, bottom-end, etc.)
 * - Backdrop options (transparent, blur, dark)
 * - Animation control
 * - Arrow control
 * - Offset customization
 * - Scroll behavior control (shouldCloseOnScroll)
 * - HeroUI's built-in positioning and styling system
 *
 * This variant is automatically used when variant="hero" is set on the main Popover component.
 */

import React from "react";
import {
  Popover as HeroUIPopover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const popoverVariants = cva("border bg-popover text-popover-foreground", {
  variants: {
    variant: {
      default: "border-border shadow-sm",
      elevated: "border-border shadow-lg",
      outline: "border-border bg-transparent",
      ghost: "border-transparent bg-transparent",
    },
    color: {
      primary: "border-primary bg-primary text-primary-foreground",
      secondary: "border-secondary bg-secondary text-secondary-foreground",
      success: "border-success bg-success text-success-foreground",
      warning: "border-warning bg-warning text-warning-foreground",
      danger: "border-danger bg-danger text-danger-foreground",
      info: "border-info bg-info text-info-foreground",
      neutral: "border-neutral bg-neutral text-neutral-foreground",
      light: "border-gray-200 bg-white text-gray-900",
      custom: "",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "light",
    shadow: "md",
    rounded: "lg",
  },
});

export type PopoverVariant = "default" | "elevated" | "outline" | "ghost";
export type PopoverColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "light"
  | "custom";
export type PopoverShadow = "none" | "sm" | "md" | "lg" | "xl";
export type PopoverRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface PopoverHerouiProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  showArrow?: boolean;
  variant?: PopoverVariant;
  color?: PopoverColor;
  customColor?: string; // for custom color code
  rounded?: PopoverRounded;
  shadow?: PopoverShadow;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  backdrop?: "transparent" | "blur" | "dark";
  disableAnimation?: boolean;
  offset?: number;
  isDismissable?: boolean;
  shouldCloseOnScroll?: boolean;
  shouldCloseOnBlur?: boolean;
  shouldBlockScroll?: boolean;
  containerPadding?: number;
  crossOffset?: number;
  portalContainer?: HTMLElement;
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  shouldFlip?: boolean;
  triggerScaleOnOpen?: boolean;
  zIndex?: number | string; // Allow custom z-index control
  contentZIndex?: number | string; // Specific z-index for content container
}

export const Popover: React.FC<PopoverHerouiProps> = ({
  content,
  children,
  placement = "bottom",
  showArrow = false,
  variant = "default",
  color = "light",
  customColor,
  rounded = "lg",
  shadow = "md",
  className,
  isOpen,
  onOpenChange,
  backdrop = "transparent",
  disableAnimation = false,
  offset = 7,
  isDismissable = true,
  shouldCloseOnScroll = true,
  shouldCloseOnBlur = false,
  shouldBlockScroll = false,
  containerPadding = 12,
  crossOffset = 0,
  portalContainer = typeof document !== "undefined" ? document.body : undefined,
  triggerType = "dialog",
  shouldFlip = true,
  triggerScaleOnOpen = true,
  zIndex = 50, // Default z-index for popover
  contentZIndex, // Specific z-index for content, falls back to zIndex
}) => {
  // Map our color system to HeroUI colors
  const getHeroUIColor = () => {
    switch (color) {
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "danger":
        return "danger";
      case "info":
      case "neutral":
        return "default";
      case "light":
        return "default";
      case "custom":
        return "default";
      default:
        return "default";
    }
  };

  // Create custom styles for colors that HeroUI doesn't support natively
  const getCustomStyles = () => {
    if (color === "custom" && customColor) {
      return { backgroundColor: customColor, color: "#ffffff" };
    }

    // Custom color classes for our extended color system
    const colorClasses = {
      info: "bg-blue-500 text-white border-blue-500",
      neutral: "bg-gray-500 text-white border-gray-500",
      light: "bg-white text-gray-900 border-gray-200",
    };

    return colorClasses[color as keyof typeof colorClasses] || "";
  };

  // Map backdrop to HeroUI backdrop
  const getHeroUIBackdrop = () => {
    switch (backdrop) {
      case "blur":
        return "blur";
      case "dark":
        return "opaque";
      case "transparent":
      default:
        return "transparent";
    }
  };

  const customStyles = getCustomStyles();
  const heroUIColor = getHeroUIColor();
  const heroUIBackdrop = getHeroUIBackdrop();

  // Determine the effective z-index for content
  const effectiveZIndex = contentZIndex !== undefined ? contentZIndex : zIndex;

  // Map our props to HeroUI props
  const heroUIProps: any = {
    placement,
    showArrow,
    color: heroUIColor,
    radius: rounded,
    shadow,
    isOpen,
    onOpenChange,
    backdrop: heroUIBackdrop,
    disableAnimation,
    offset,
    isDismissable,
    shouldCloseOnScroll,
    shouldCloseOnBlur,
    shouldBlockScroll,
    containerPadding,
    crossOffset,
    portalContainer,
    triggerType,
    shouldFlip,
    triggerScaleOnOpen,
    // Ensure proper positioning
    isKeyboardDismissDisabled: false,
    // Apply z-index to the popover container
    style: {
      zIndex: typeof zIndex === "number" ? zIndex : zIndex,
    },
  };

  // Remove undefined props to avoid HeroUI warnings
  Object.keys(heroUIProps).forEach((key) => {
    if (heroUIProps[key] === undefined) {
      delete heroUIProps[key];
    }
  });

  return (
    <HeroUIPopover {...heroUIProps}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className={cn(
          popoverVariants({ variant, color, shadow, rounded }),
          className,
          customStyles,
          // Apply custom color styles when needed
          color === "custom" && customColor ? "border-0" : ""
        )}
        style={{
          ...(color === "custom" && customColor
            ? { backgroundColor: customColor, color: "#ffffff" }
            : {}),
          // Apply z-index to content container
          zIndex:
            typeof effectiveZIndex === "number"
              ? effectiveZIndex
              : effectiveZIndex,
        }}
      >
        {content}
      </PopoverContent>
    </HeroUIPopover>
  );
};
