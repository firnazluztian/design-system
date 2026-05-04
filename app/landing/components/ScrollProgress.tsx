"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin top-of-viewport progress bar driven by document scroll.
 * Spring smooths the indicator without inducing layout work.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-linear-to-r from-primary-500 via-primary-300 to-secondary-500"
    />
  );
}
