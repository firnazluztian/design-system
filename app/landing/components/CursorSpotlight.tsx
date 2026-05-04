"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { usePointerFine } from "./usePointerFine";

interface CursorSpotlightProps {
  /** Diameter of the spotlight in px. */
  size?: number;
  /** Tailwind classes for the spotlight gradient. */
  className?: string;
}

/**
 * Radial light that follows the cursor inside its parent (which must be
 * `relative`). Auto-disabled on touch devices and for reduced-motion users —
 * the explicit guards keep us from shipping a broken experience to mobile or
 * keyboard navigators.
 */
export function CursorSpotlight({
  size = 480,
  className = "bg-[radial-gradient(closest-side,rgb(0_124_153/0.25),transparent)]",
}: CursorSpotlightProps) {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const enabled = !reduced && pointerFine;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current?.parentElement;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left - size / 2);
      y.set(e.clientY - rect.top - size / 2);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, size, x, y]);

  if (!enabled) return <div ref={ref} aria-hidden className="hidden" />;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
      }}
      className={`pointer-events-none absolute left-0 top-0 rounded-full blur-2xl ${className}`}
    />
  );
}
