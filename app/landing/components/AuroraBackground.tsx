"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated aurora background built from layered radial gradients.
 * Trade-off: hand-tuned CSS gradients vs WebGL — we get ~90% of the
 * visual at <1kb of runtime cost. Reduced-motion freezes the layers.
 */
export function AuroraBackground() {
  const reduced = useReducedMotion();

  const blobs = [
    {
      className:
        "left-[-10%] top-[-15%] h-[40rem] w-[40rem] bg-[radial-gradient(closest-side,rgb(0_124_153/0.45),transparent)]",
      animate: reduced ? undefined : { x: [0, 60, -20, 0], y: [0, 30, -20, 0] },
      duration: 18,
    },
    {
      className:
        "right-[-15%] top-[10%] h-[36rem] w-[36rem] bg-[radial-gradient(closest-side,rgb(206_234_231/0.55),transparent)] dark:bg-[radial-gradient(closest-side,rgb(0_180_153/0.30),transparent)]",
      animate: reduced ? undefined : { x: [0, -50, 20, 0], y: [0, 40, -10, 0] },
      duration: 22,
    },
    {
      className:
        "left-[20%] bottom-[-20%] h-[32rem] w-[32rem] bg-[radial-gradient(closest-side,rgb(26_179_210/0.35),transparent)]",
      animate: reduced ? undefined : { x: [0, 40, -30, 0], y: [0, -20, 10, 0] },
      duration: 26,
    },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={
            reduced
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }
          }
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.035)_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay dark:opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="aurora-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aurora-noise)" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
