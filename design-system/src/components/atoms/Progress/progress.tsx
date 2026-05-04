import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import { Icon } from "../Icons/Icons";

const progressVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      bar: "w-full bg-neutral-100",
      circular: "inline-block",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      info: "text-info",
    },
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    variant: "bar",
    color: "primary",
    size: "md",
  },
});

const circularSizeMap = {
  sm: 24,
  md: 36,
  lg: 48,
};

const barColorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

const circularColorMap = {
  primary: "#007C99", // Tailwind primary
  secondary: "#CEEAE7",
  success: "#00B37D",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#0EA5E9",
};

export type ProgressVariant = "bar" | "circular" | "loading";
export type ProgressColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: ProgressVariant;
  /** Color scheme */
  color?: ProgressColor;
  /** Size of the progress indicator */
  size?: ProgressSize;
  /** Current progress value (0-100) */
  value?: number;
  /** Whether the progress is indeterminate */
  isIndeterminate?: boolean;
  /** Whether to show the percentage text */
  showValue?: boolean;
  /** Custom label for the progress */
  label?: string;
  /** Border radius for the bar (e.g., 'md', 'full'). Default: 'md', but 'full' for loading. */
  rounded?: "none" | "full";
  /** Iconify icon string for circular progress */
  icon?: string;
  /** Indicator icon (string) or React node that follows the progress value */
  indicator?: string | React.ReactNode;
  /** Position of the indicator relative to the progress bar */
  indicatorPosition?: "on" | "above";
  /** Size of the indicator icon (only applies when indicator is a string) */
  indicatorSize?: number;
  /** Whether to hide the indicator when progress reaches 100% */
  hideIndicatorOnMax?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant = "bar",
      color = "primary",
      size = "md",
      value = 0,
      isIndeterminate = false,
      showValue = false,
      label,
      rounded = "full",
      icon,
      indicator,
      indicatorPosition = "on",
      indicatorSize,
      hideIndicatorOnMax = true,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const circularSize = circularSizeMap[size];
    const strokeWidth = size === "sm" ? 2 : size === "md" ? 3 : 4;
    const radius = (circularSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (clampedValue / 100) * circumference;

    // Calculate indicator size based on progress bar size
    const defaultIndicatorSize = size === "sm" ? 16 : size === "md" ? 20 : 24;
    const finalIndicatorSize = indicatorSize || defaultIndicatorSize;

    // Determine rounded class
    let roundedClass = "";
    if (variant === "loading") {
      roundedClass = "rounded-full";
    } else if (rounded) {
      roundedClass = rounded === "none" ? "" : `rounded-${rounded}`;
    } else {
      roundedClass = "rounded-md";
    }

    if (variant === "circular") {
      return (
        <div className="inline-flex flex-col items-center gap-2">
          <div
            className="relative"
            style={{ width: circularSize, height: circularSize }}
          >
            <svg
              className={cn(
                "transform -rotate-90",
                isIndeterminate ? "animate-spin" : ""
              )}
              width={circularSize}
              height={circularSize}
            >
              <circle
                strokeWidth={strokeWidth}
                stroke="#e5e7eb" // neutral-200
                fill="transparent"
                r={radius}
                cx={circularSize / 2}
                cy={circularSize / 2}
              />
              <circle
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  isIndeterminate ? "animate-dash" : ""
                )}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={isIndeterminate ? 0 : strokeDashoffset}
                strokeLinecap="round"
                stroke={circularColorMap[color]}
                fill="transparent"
                r={radius}
                cx={circularSize / 2}
                cy={circularSize / 2}
              />
            </svg>
            {/* Icon in the center if provided */}
            {icon && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Icon icon={icon} size={circularSize * 0.5} />
              </span>
            )}
            {showValue && !isIndeterminate && !icon && (
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                {Math.round(clampedValue)}%
              </div>
            )}
          </div>
          {label && <span className="text-sm text-neutral-600">{label}</span>}
        </div>
      );
    }

    // Render indicator component
    const renderIndicator = () => {
      if (!indicator || (hideIndicatorOnMax && clampedValue >= 100))
        return null;

      const isStringIndicator = typeof indicator === "string";
      const indicatorContent = isStringIndicator ? (
        <Icon icon={indicator} size={finalIndicatorSize} />
      ) : (
        indicator
      );

      // Use the same transition timing as the progress bar for perfect synchronization
      const indicatorStyle: React.CSSProperties = {
        position: "absolute",
        left: `${clampedValue}%`,
        transition: "left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
        zIndex: 10,
      };

      if (indicatorPosition === "above") {
        indicatorStyle.bottom = "100%";
        indicatorStyle.marginBottom = "6px";
        indicatorStyle.transform = "translateX(-50%)";
      } else {
        indicatorStyle.top = "50%";
        indicatorStyle.transform = "translate(-50%, -50%)";
      }

      return (
        <div
          style={indicatorStyle}
          className="flex items-center justify-center"
        >
          {indicatorContent}
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "relative",
            indicator && indicatorPosition === "above" && "pb-8"
          )}
        >
          {indicator &&
            indicatorPosition === "above" &&
            !isIndeterminate &&
            renderIndicator()}
          <div
            ref={ref}
            className={cn(
              progressVariants({
                variant: variant === "loading" ? "bar" : variant,
                size,
              }),
              roundedClass,
              indicator &&
                indicatorPosition === "on" &&
                "relative overflow-visible",
              className
            )}
            role="progressbar"
            aria-valuenow={isIndeterminate ? undefined : clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            {...props}
          >
            {indicator &&
              indicatorPosition === "on" &&
              !isIndeterminate &&
              renderIndicator()}
            <div
              className={cn(
                "h-full",
                isIndeterminate ? "animate-progress-indeterminate" : "",
                barColorMap[color],
                roundedClass
              )}
              style={{
                width: isIndeterminate ? "100%" : `${clampedValue}%`,
                transition: isIndeterminate
                  ? "none"
                  : "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
        {(showValue || label) && (
          <div className="flex justify-between text-xs text-neutral-600">
            {label && <span>{label}</span>}
            {showValue && !isIndeterminate && (
              <span>{Math.round(clampedValue)}%</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";
