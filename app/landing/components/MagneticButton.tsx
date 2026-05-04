"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  forwardRef,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { usePointerFine } from "./usePointerFine";

/**
 * `motion.a` redefines a handful of handlers (onAnimationStart, onDragStart,
 * onDrag, onDragEnd) with motion-specific signatures. We omit them from the
 * consumer surface to avoid the React-vs-motion type collision.
 */
type SafeAnchorAttrs = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onAnimationStart" | "onDragStart" | "onDrag" | "onDragEnd"
>;

interface MagneticButtonProps extends SafeAnchorAttrs {
  href: string;
  external?: boolean;
  /** Pixels of cursor pull strength. Lower = subtler. */
  strength?: number;
  /** Distance in px from button center where the magnetic effect engages. */
  radius?: number;
  children: ReactNode;
}

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * Anchor that translates toward the cursor when within `radius`. Renders as a
 * plain anchor on touch / reduced-motion — no layout shift, same affordance.
 */
export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton(
    { href, external, strength = 0.35, radius = 120, children, className, ...rest },
    forwardedRef,
  ) {
    const reduced = useReducedMotion();
    const pointerFine = usePointerFine();
    const enabled = !reduced && pointerFine;
    const localRef = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, spring);
    const sy = useSpring(y, spring);

    useEffect(() => {
      if (!enabled) return;
      const el = localRef.current;
      if (!el) return;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          x.set(dx * strength);
          y.set(dy * strength);
        } else {
          x.set(0);
          y.set(0);
        }
      };
      const onLeave = () => {
        x.set(0);
        y.set(0);
      };

      window.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, [enabled, radius, strength, x, y]);

    const externalProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    return (
      <motion.a
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        href={href}
        style={enabled ? { x: sx, y: sy } : undefined}
        className={className}
        {...externalProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  },
);
