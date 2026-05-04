"use client";

import { motion, useReducedMotion } from "motion/react";
import { AuroraBackground } from "../components/AuroraBackground";
// import { CursorSpotlight } from "../components/CursorSpotlight";
import { ExternalIcon, ArrowDownIcon } from "../components/ExternalIcon";
import { MagneticButton } from "../components/MagneticButton";
import { SplitText } from "../components/SplitText";
import { hero, STORYBOOK_URL } from "../copy";
import { SECTION_IDS } from "../data";

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          ...fadeIn,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <header
      id={SECTION_IDS.hero}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-b border-border pt-24 sm:pt-28"
    >
      <AuroraBackground />
      {/* <CursorSpotlight /> */}

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-12 sm:px-8 sm:pb-28 lg:gap-14">
        <motion.p
          {...fade(0)}
          className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-[4rem] lg:text-[5.5rem]">
          <SplitText lines={hero.headline} />
        </h1>

        <motion.p
          {...fade(0.55)}
          className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          {...fade(0.75)}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticButton
            href={STORYBOOK_URL}
            external
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background shadow-[0_8px_30px_-8px_rgb(0_124_153/0.55)] transition hover:bg-primary-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            {hero.primaryCta}
            <ExternalIcon className="size-4 opacity-90 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <a
            href="#manifesto"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium text-foreground transition hover:text-primary-700 dark:hover:text-primary-200"
          >
            {hero.secondaryCta}
            <span
              aria-hidden
              className="transition group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>

      <motion.a
        {...fade(1.05)}
        href="#manifesto"
        aria-label="Scroll to manifesto"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-foreground sm:flex"
      >
        {hero.scrollHint}
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ArrowDownIcon className="size-4" />
        </motion.span>
      </motion.a>
    </header>
  );
}
