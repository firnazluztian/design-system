"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import { atomic } from "../copy";
import { SECTION_IDS } from "../data";

/**
 * Sticky-pinned scrolly section. The container is tall (one viewport per
 * step + a buffer); inside, a single stage stays pinned while a useScroll
 * progress drives which step is "active". This is the canonical scrolly
 * pattern — it reads like scroll-jacking but never intercepts the scroll.
 */
export function AtomicPrinciples() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stepCount = atomic.steps.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(0.999_999, Math.max(0, latest));
    const nextIndex = Math.floor(clamped * stepCount);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section
      id={SECTION_IDS.atomic}
      aria-labelledby="atomic-title"
      className="relative border-b border-border bg-surface-muted/40 dark:bg-surface-muted/15"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-8 sm:pt-32">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            {atomic.eyebrow}
          </p>
          <h2
            id="atomic-title"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {atomic.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {atomic.intro}
          </p>
        </Reveal>
      </div>

      {reduced ? (
        <StaticSteps />
      ) : (
        <div
          ref={containerRef}
          style={{ height: `${stepCount * 90}vh` }}
          className="relative mt-16"
        >
          <div className="sticky top-0 flex h-svh items-center">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
              <div className="relative min-h-64 lg:col-span-5">
                <CopyPanel activeIndex={activeIndex} stepCount={stepCount} />
              </div>

              <div className="relative aspect-square w-full lg:col-span-7">
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_60px_-20px_rgb(0_124_153/0.25)]">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgb(0_124_153/0.10),transparent)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.04)_1px,transparent_1px)] bg-size-[32px_32px] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)]"
                  />

                  <VisualPanel activeIndex={activeIndex} />

                  <div className="absolute right-4 top-4 flex flex-col gap-2 sm:right-6 sm:top-6">
                    {atomic.steps.map((step, i) => (
                      <IndicatorDot
                        key={step.id}
                        index={i}
                        activeIndex={activeIndex}
                        label={step.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step transitions — single active layer, no overlap                          */
/* -------------------------------------------------------------------------- */

const LAYER_TRANSITION = { duration: 0.28, ease: "easeOut" } as const;

function CopyPanel({
  activeIndex,
  stepCount,
}: {
  activeIndex: number;
  stepCount: number;
}) {
  const step = atomic.steps[activeIndex];
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={LAYER_TRANSITION}
        className="absolute inset-0 flex flex-col justify-center"
      >
        <CopyContent index={activeIndex} stepCount={stepCount} />
      </motion.div>
    </AnimatePresence>
  );
}

function VisualPanel({ activeIndex }: { activeIndex: number }) {
  const Visual = VISUALS[activeIndex];
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={LAYER_TRANSITION}
        className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
      >
        <Visual />
      </motion.div>
    </AnimatePresence>
  );
}

function IndicatorDot({
  index,
  activeIndex,
  label,
}: {
  index: number;
  activeIndex: number;
  label: string;
}) {
  const isActive = index === activeIndex;
  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.72 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="size-1.5 rounded-full bg-primary-500"
        aria-hidden
      />
      <motion.span
        animate={{ opacity: isActive ? 1 : 0.45 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300"
      >
        {label}
      </motion.span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Copy content — pure rendering, no hooks                                    */
/* -------------------------------------------------------------------------- */

function CopyContent({
  index,
  stepCount,
}: {
  index: number;
  stepCount: number;
}) {
  const step = atomic.steps[index];
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
          Layer {String(index + 1).padStart(2, "0")} /{" "}
          {String(stepCount).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          {step.label}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {step.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        {step.body}
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step visuals — pure markup, no images                                      */
/* -------------------------------------------------------------------------- */

const VISUALS = [
  AtomVisual,
  MoleculeVisual,
  OrganismVisual,
  TemplateVisual,
  PageVisual,
];

function AtomVisual() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <span className="absolute inset-0 -m-6 animate-pulse rounded-full bg-primary-500/20 blur-xl" />
        <span className="relative block size-12 rounded-full bg-primary-500 shadow-[0_0_40px_rgb(0_124_153/0.5)]" />
      </div>
      <div className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
        primary/500 · token
      </div>
    </div>
  );
}

function MoleculeVisual() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          Email
        </span>
        <span className="rounded-full bg-success-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success-700 dark:text-success-300">
          Required
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-3 shadow-sm">
        <span className="size-2 rounded-full bg-primary-500" />
        <span className="text-sm text-foreground">you@firnaz.dev</span>
      </div>
      <span className="font-mono text-[11px] text-muted">
        Label + Input + Status
      </span>
    </div>
  );
}

function OrganismVisual() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-full bg-primary-500/15 ring-1 ring-primary-500/30" />
          <div>
            <p className="text-sm font-semibold text-foreground">SIN → CGK</p>
            <p className="text-[11px] text-muted">12 May · 2 adults</p>
          </div>
        </div>
        <span className="rounded-full bg-secondary-300/60 px-2.5 py-0.5 text-[11px] font-medium text-primary-800 dark:bg-primary-800/40 dark:text-primary-100">
          Confirmed
        </span>
      </div>
      <div className="h-px w-full bg-border" />
      <div className="grid grid-cols-3 gap-2 text-center">
        {["07:20", "2h 5m", "08:25"].map((t, i) => (
          <div
            key={t}
            className="rounded-lg border border-border bg-background py-2 text-xs"
          >
            <p className="font-mono text-foreground">{t}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">
              {["Depart", "Duration", "Arrive"][i]}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="rounded-lg bg-primary-500 py-2 text-sm font-semibold text-white"
      >
        View itinerary
      </button>
    </div>
  );
}

function TemplateVisual() {
  return (
    <div className="grid w-full max-w-md grid-cols-6 gap-2">
      <div className="col-span-6 h-10 rounded-lg border border-dashed border-border bg-surface" />
      <div className="col-span-2 row-span-3 h-40 rounded-lg border border-dashed border-border bg-surface" />
      <div className="col-span-4 h-12 rounded-lg border border-dashed border-border bg-surface" />
      <div className="col-span-4 h-12 rounded-lg border border-dashed border-border bg-surface" />
      <div className="col-span-4 h-12 rounded-lg border border-dashed border-border bg-surface" />
      <div className="col-span-6 h-10 rounded-lg border border-dashed border-border bg-surface" />
    </div>
  );
}

function PageVisual() {
  return (
    <div className="grid w-full max-w-md grid-cols-6 gap-2">
      <div className="col-span-6 flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
        <span className="font-display text-sm font-semibold text-foreground">
          Tixia
        </span>
        <span className="size-6 rounded-full bg-primary-500/20" />
      </div>
      <div className="col-span-2 row-span-3 rounded-lg border border-border bg-surface p-3">
        <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-2 h-2 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-4 h-12 rounded bg-secondary-300/60 dark:bg-primary-800/40" />
        <div className="mt-3 h-2 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
      </div>
      <div className="col-span-4 rounded-lg border border-border bg-surface p-3">
        <p className="text-xs font-semibold text-foreground">SIN → CGK</p>
        <p className="text-[10px] text-muted">Direct · 2h 5m</p>
        <div className="mt-2 h-1.5 w-full rounded bg-primary-500/30">
          <div className="h-full w-2/3 rounded bg-primary-500" />
        </div>
      </div>
      <div className="col-span-4 flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-xs">
        <span className="text-muted">Sort by</span>
        <span className="font-medium text-foreground">Cheapest</span>
      </div>
      <div className="col-span-4 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
        <span className="size-1.5 rounded-full bg-success-500" />
        <span className="text-xs text-foreground">12 results</span>
      </div>
      <div className="col-span-6 rounded-lg bg-primary-500 py-2 text-center text-xs font-semibold text-white">
        Continue to checkout
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reduced-motion fallback                                                    */
/* -------------------------------------------------------------------------- */

function StaticSteps() {
  return (
    <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-24 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
      {atomic.steps.map((step, i) => (
        <article
          key={step.id}
          className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            Layer {String(i + 1).padStart(2, "0")} · {step.label}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
        </article>
      ))}
    </div>
  );
}

