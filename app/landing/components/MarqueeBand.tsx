"use client";

import { useReducedMotion } from "motion/react";
import { MARQUEE_TERMS } from "../data";

/**
 * Two infinite rows of vocabulary scrolling in opposite directions.
 * Pure CSS keyframes — no per-frame JS, no IntersectionObserver needed.
 * Reduced motion freezes the rows but keeps the visual present.
 */
export function MarqueeBand() {
  const reduced = useReducedMotion();

  // Doubling the list makes the loop visually seamless when translated -50%.
  const rowA = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  const rowB = [
    ...MARQUEE_TERMS.slice().reverse(),
    ...MARQUEE_TERMS.slice().reverse(),
  ];

  return (
    <div
      aria-hidden
      className="relative isolate overflow-hidden border-y border-border bg-surface-muted/40 py-6 dark:bg-surface-muted/20 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

      <MarqueeRow items={rowA} animate={!reduced} reverse={false} />
      <MarqueeRow items={rowB} animate={!reduced} reverse className="mt-4" />
    </div>
  );
}

function MarqueeRow({
  items,
  animate,
  reverse,
  className,
}: {
  items: string[];
  animate: boolean;
  reverse: boolean;
  className?: string;
}) {
  return (
    <div className={`flex w-max gap-3 ${className ?? ""}`}>
      <ul
        className={[
          "flex w-max gap-3 whitespace-nowrap will-change-transform",
          animate &&
            (reverse ? "animate-marquee-back" : "animate-marquee-forward"),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.map((term, i) => (
          <li
            key={`${term}-${i}`}
            className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-muted shadow-sm"
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}
