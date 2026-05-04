"use client";

import { motion, useReducedMotion } from "motion/react";

interface SplitTextProps {
  lines: readonly string[];
  className?: string;
  /** Stagger between line entries, seconds. */
  stagger?: number;
  /** Initial delay before the first line, seconds. */
  delay?: number;
}

const transition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

/**
 * Line-by-line stagger reveal. Each line gets its own clip mask so text
 * rises into view from below — the canonical "premium hero" headline pattern.
 */
export function SplitText({
  lines,
  className,
  stagger = 0.09,
  delay = 0.05,
}: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-[0.12em]"
          style={{ lineHeight: 1.05 }}
        >
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ ...transition, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
