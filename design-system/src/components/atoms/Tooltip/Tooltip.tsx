import React from "react";
import { Tooltip as HeroUITooltip } from "@heroui/react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const tooltipVariants = cva("border bg-popover text-popover-foreground", {
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
      info: "border-blue-500 bg-blue-500 text-white",
      neutral: "border-gray-500 bg-gray-500 text-white",
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

export type TooltipVariant = "default" | "elevated" | "outline" | "ghost";
export type TooltipColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "light"
  | "custom";
export type TooltipShadow = "none" | "sm" | "md" | "lg" | "xl";
export type TooltipRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface TooltipProps {
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
  variant?: TooltipVariant;
  color?: TooltipColor;
  customColor?: string;
  rounded?: TooltipRounded;
  shadow?: TooltipShadow;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDisabled?: boolean;
  delay?: number; // open delay (ms)
  closeDelay?: number; // close delay (ms)
  offset?: number;
  trigger?: "hover" | "press" | "focus" | "manual";
  shouldCloseOnScroll?: boolean;
  portalContainer?: HTMLElement;
  zIndex?: number | string;
  contentZIndex?: number | string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  showArrow = true,
  variant = "default",
  color = "light",
  customColor,
  rounded = "lg",
  shadow = "md",
  className,
  isOpen,
  onOpenChange,
  isDisabled = false,
  delay,
  closeDelay = 0,
  offset = 6,
  trigger = "hover",
  shouldCloseOnScroll = true,
  portalContainer = typeof document !== "undefined" ? document.body : undefined,
  zIndex = 50,
  contentZIndex,
}) => {
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
      case "light":
      case "custom":
      default:
        return "default";
    }
  };

  const getCustomStyles = () => {
    if (color === "custom" && customColor) {
      return { backgroundColor: customColor, color: "#ffffff" };
    }

    const colorClasses = {
      info: "bg-blue-500 text-white border-blue-500",
      neutral: "bg-gray-500 text-white border-gray-500",
      light: "bg-white text-gray-900 border-gray-200",
    } as const;

    return colorClasses[color as keyof typeof colorClasses] || "";
  };

  const customStyles = getCustomStyles();
  const heroUIColor = getHeroUIColor();
  const effectiveZIndex = contentZIndex !== undefined ? contentZIndex : zIndex;

  const heroUIProps: any = {
    content,
    placement,
    showArrow,
    color: heroUIColor,
    radius: rounded,
    shadow,
    isOpen,
    onOpenChange,
    isDisabled,
    delay,
    closeDelay,
    offset,
    trigger,
    shouldCloseOnScroll,
    portalContainer,
    // container z-index to manage layering
    style: {
      zIndex: typeof zIndex === "number" ? zIndex : zIndex,
    },
  };

  Object.keys(heroUIProps).forEach((key) => {
    if (heroUIProps[key] === undefined) {
      delete heroUIProps[key];
    }
  });

  return (
    <HeroUITooltip
      {...heroUIProps}
      classNames={{
        content: cn(
          tooltipVariants({ variant, color, shadow, rounded }),
          className,
          customStyles,
          color === "custom" && customColor ? "border-0" : ""
        ),
      }}
      content={
        <div
          style={{
            zIndex:
              typeof effectiveZIndex === "number"
                ? effectiveZIndex
                : effectiveZIndex,
            ...(color === "custom" && customColor
              ? { backgroundColor: customColor, color: "#ffffff" }
              : {}),
          }}
        >
          {content}
        </div>
      }
    >
      {children}
    </HeroUITooltip>
  );
};
