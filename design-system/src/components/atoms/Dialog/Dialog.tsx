import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/Icons/Icons";
import { getDocument } from "../../../utils/ssr";

export type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "fullscreen";
export type DialogRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";
export type DialogPosition = "center" | "top" | "bottom" | "left" | "right";
export type DialogScrollBehavior = "inside" | "outside" | "normal";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdrop?: "blur" | "dark" | "transparent";
  header?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  size?: DialogSize;
  /**
   * Optional Tailwind classes to control width or max-width.
   * Examples: `w-full`, `w-[10em]`, `max-w-7xl`.
   * Takes precedence over preset sizes except when `size` is `fullscreen`.
   */
  sizeClassName?: string;
  rounded?: DialogRounded;
  position?: DialogPosition;
  /**
   * Controls how scrolling behaves while the dialog is open.
   * - `normal` (default): lock body scroll, panel scroll not forced
   * - `inside`: lock body scroll, enable overflow on the panel
   * - `outside`: allow body scroll behind the dialog
   */
  scrollBehavior?: DialogScrollBehavior;
  /**
   * Total animation duration in milliseconds for both backdrop and panel.
   * Default is 300ms.
   */
  animationDuration?: number;
  /**
   * Transition delay in milliseconds before the animation starts.
   * Applied to both backdrop and panel. Default is 0ms.
   */
  animationDelay?: number;
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, onClose, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close dialog"
        >
          <Icon icon="mdi:close" className="h-5 w-5" />
        </button>
      )}
    </div>
  )
);

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  // Historically `xl` used a larger cap; keep behavior for backward compatibility
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  "3xl": "max-w-6xl",
  "4xl": "max-w-7xl",
  // Tailwind default stops at 7xl; for 5xl we use an explicit size
  "5xl": "max-w-[96rem]",
  fullscreen: "w-full h-full max-w-none max-h-none rounded-none",
};

// Width presets when used as side drawers (left/right)
const sideWidthClasses: Record<DialogSize, string> = {
  sm: "w-64", // 16rem
  md: "w-80", // 20rem
  lg: "w-96", // 24rem
  xl: "w-[32rem]",
  "2xl": "w-[36rem]",
  "3xl": "w-[42rem]",
  "4xl": "w-[48rem]",
  "5xl": "w-[56rem]",
  fullscreen: "w-full",
};

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      backdrop = "dark",
      header,
      closeOnBackdropClick = true,
      size = "md",
      sizeClassName,
      rounded = "xl",
      position = "center",
      scrollBehavior = "normal",
      animationDuration = 300,
      animationDelay = 0,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    const didLockBodyRef = useRef(false);

    useLayoutEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        setIsAnimating(false);
        const doc = getDocument();
        if ("body" in doc) {
          if (scrollBehavior !== "outside") {
            doc.body.style.overflow = "hidden";
            didLockBodyRef.current = true;
          } else {
            didLockBodyRef.current = false;
          }
        }
        // Trigger enter animation on next frame
        const id = requestAnimationFrame(() => setIsAnimating(true));
        return () => cancelAnimationFrame(id);
      }

      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        const doc = getDocument();
        if ("body" in doc && didLockBodyRef.current) {
          doc.body.style.overflow = "";
          didLockBodyRef.current = false;
        }
      }, animationDuration + animationDelay);
      return () => clearTimeout(timer);
    }, [isOpen, scrollBehavior, animationDuration, animationDelay]);

    useEffect(() => {
      const handleEscape = (event: Event) => {
        if (event instanceof KeyboardEvent && event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        const doc = getDocument();
        doc.addEventListener("keydown", handleEscape);
      }

      return () => {
        const doc = getDocument();
        doc.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose]);

    if (!isVisible) return null;

    const backdropClasses = {
      blur: "backdrop-blur-sm bg-black/30",
      dark: "bg-black/50",
      transparent: "bg-transparent",
    };

    const handleBackdropClick = () => {
      if (closeOnBackdropClick) {
        onClose();
      }
    };

    const doc = getDocument();
    if (!("body" in doc)) return null;

    const getRoundedClass = (rounded: DialogRounded): string => {
      switch (rounded) {
        case "none":
          return "rounded-none";
        case "sm":
          return "rounded-sm";
        case "md":
          return "rounded-md";
        case "lg":
          return "rounded-lg";
        case "xl":
          return "rounded-xl";
        case "2xl":
          return "rounded-2xl";
        case "3xl":
          return "rounded-3xl";
        case "full":
          return "rounded-full";
        default:
          return "rounded-lg";
      }
    };

    // Classes that manage panel overflow for `inside` behavior
    const panelOverflowClasses = (() => {
      if (scrollBehavior === "inside") {
        if (size === "fullscreen") {
          return "overflow-y-auto";
        }
        if (position === "left" || position === "right") {
          return "overflow-y-auto";
        }
        return "max-h-screen overflow-y-auto";
      }
      return undefined;
    })();

    const transitionStyle = {
      transitionDuration: `${animationDuration}ms`,
      transitionDelay: `${animationDelay}ms`,
    } as React.CSSProperties;

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-50 flex transition-opacity",
          backdropClasses[backdrop],
          isAnimating ? "opacity-100" : "opacity-0",
          position === "center" && "items-center justify-center",
          position === "top" && "items-start justify-center",
          position === "bottom" && "items-end justify-center",
          position === "left" && "items-stretch justify-start",
          position === "right" && "items-stretch justify-end"
        )}
        style={transitionStyle}
        onClick={handleBackdropClick}
      >
        <div
          ref={ref}
          className={cn(
            "relative transform bg-white p-6 shadow-xl transition-all",
            // Width/Max-width behavior depends on position.
            // If `sizeClassName` is provided, it takes precedence except in fullscreen mode.
            size === "fullscreen"
              ? sizeClasses.fullscreen
              : sizeClassName ??
                  (position === "left" || position === "right"
                    ? sideWidthClasses[size]
                    : sizeClasses[size]),
            // Position-based animations
            position === "center" &&
              (isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"),
            position === "left" &&
              (isAnimating
                ? "translate-x-0 h-full"
                : "-translate-x-full h-full"),
            position === "right" &&
              (isAnimating
                ? "translate-x-0 h-full"
                : "translate-x-full h-full"),
            position === "top" &&
              (isAnimating
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"),
            position === "bottom" &&
              (isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"),
            className,
            size === "fullscreen" ? "rounded-none" : getRoundedClass(rounded),
            // Corner overrides so the edge touching the viewport is not rounded
            position === "left" && "rounded-l-none",
            position === "right" && "rounded-r-none",
            position === "top" && "rounded-t-none",
            position === "bottom" && "rounded-b-none",
            panelOverflowClasses
          )}
          style={transitionStyle}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {header && <DialogHeader onClose={onClose}>{header}</DialogHeader>}
          {children}
        </div>
      </div>,
      doc.body
    );
  }
);

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-xl font-semibold text-gray-900", className)}
      {...props}
    >
      {children}
    </h2>
  )
);

const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("text-gray-600", className)} {...props}>
      {children}
    </div>
  )
);

const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-6 flex justify-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  )
);

Dialog.displayName = "Dialog";
DialogTitle.displayName = "DialogTitle";
DialogBody.displayName = "DialogBody";
DialogActions.displayName = "DialogActions";
DialogHeader.displayName = "DialogHeader";

export { Dialog, DialogTitle, DialogBody, DialogActions, DialogHeader };
