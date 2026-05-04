"use client";

import { Reveal } from "../components/Reveal";
import { impact } from "../copy";
import { SECTION_IDS } from "../data";

export function Impact() {
  return (
    <section
      id={SECTION_IDS.impact}
      aria-labelledby="impact-title"
      className="relative border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            {impact.eyebrow}
          </p>
          <h2
            id="impact-title"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {impact.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {impact.intro}
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {impact.pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={i * 0.08}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md dark:hover:border-primary-700 sm:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-primary-700 dark:text-primary-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {pillar.metric}
                </span>
              </div>
              <p className="mt-1 text-right font-mono text-[11px] uppercase tracking-wider text-muted">
                {pillar.metricLabel}
              </p>

              <div className="mt-8 h-px w-full bg-border" />

              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {pillar.body}
              </p>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-px h-px scale-x-0 bg-linear-to-r from-transparent via-primary-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
