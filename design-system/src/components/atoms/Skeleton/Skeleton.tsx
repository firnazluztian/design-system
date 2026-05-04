import { cn } from "../../../utils/cn";
import { cva } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse bg-neutral-200", {
  variants: {
    variant: {
      default: "bg-neutral-200",
      primary: "bg-primary-200",
      success: "bg-success-200",
      warning: "bg-warning-200",
      danger: "bg-danger-200",
      info: "bg-info-200",
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
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    },
    pulseVariant: {
      default: "",
      "left-to-right": "relative overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "md",
    fullWidth: false,
    pulseVariant: "default",
  },
});

export interface SkeletonProps {
  /** The width of the skeleton */
  width?: string | number;
  /** The height of the skeleton */
  height?: string | number;
  /** The visual style variant */
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  /** Border radius of the skeleton */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  /** Whether the skeleton should take full width */
  fullWidth?: boolean;
  /** The pulsing animation variant */
  pulseVariant?: "default" | "left-to-right";
  /** Additional class name */
  className?: string;
}

export const Skeleton = ({
  width,
  height,
  variant = "default",
  rounded = "xl",
  fullWidth = false,
  pulseVariant = "default",
  className,
}: SkeletonProps) => {
  if (pulseVariant === "left-to-right") {
    return (
      <div className="relative overflow-hidden">
        <div
          className={cn(
            skeletonVariants({ variant, rounded, fullWidth, pulseVariant: "default" }),
            className
          )}
          style={{
            width: !fullWidth && typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
        />
        {/* Enhanced left-to-right pulsing animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-pulse-left-to-right pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        skeletonVariants({ variant, rounded, fullWidth, pulseVariant }),
        className
      )}
      style={{
        width: !fullWidth && typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};
