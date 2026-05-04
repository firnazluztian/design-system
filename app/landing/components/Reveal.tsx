"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds for staggering siblings. */
  delay?: number;
  /** Distance to translate from. */
  y?: number;
  /** When the element is considered "in view". */
  margin?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

/**
 * In-view reveal wrapper. Single source for the fade/translate pattern
 * the page uses everywhere — keeps section files declarative.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  margin = "-72px",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin }}
      transition={{ ...transition, delay }}
    >
      {children}
    </MotionTag>
  );
}
