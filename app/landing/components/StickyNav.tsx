"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";
import { ExternalLink } from "./ExternalLink";
import { ExternalIcon } from "./ExternalIcon";
import { brand, nav, STORYBOOK_URL } from "../copy";

/**
 * Slim top nav. Glass-morphic background fades in once the user scrolls
 * past the hero edge — keeps the hero clean on first load.
 */
export function StickyNav() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  return (
    <motion.nav
      aria-label="Primary"
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "color-mix(in oklab, var(--background) 78%, transparent)"
          : "color-mix(in oklab, var(--background) 0%, transparent)",
        borderColor: scrolled
          ? "color-mix(in oklab, var(--border) 100%, transparent)"
          : "color-mix(in oklab, var(--border) 0%, transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      }}
      transition={{
        duration: reduced ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-x-0 top-0 z-40 border-b"
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:h-16 sm:px-8">
        <a
          href="#hero"
          className="font-display text-base font-semibold tracking-tight text-foreground"
        >
          {brand.name}
          <span className="text-primary-500">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ExternalLink
          href={STORYBOOK_URL}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200 sm:text-sm"
        >
          {nav.cta}
          <ExternalIcon className="size-3.5 opacity-70 transition group-hover:opacity-100" />
        </ExternalLink>
      </div>
    </motion.nav>
  );
}
