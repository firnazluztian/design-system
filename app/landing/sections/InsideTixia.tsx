"use client";

import { ExternalLink } from "../components/ExternalLink";
import { ExternalIcon } from "../components/ExternalIcon";
import { Reveal } from "../components/Reveal";
import { inside, STORYBOOK_URL } from "../copy";
import { SECTION_IDS } from "../data";

export function InsideTixia() {
  return (
    <section
      id={SECTION_IDS.inside}
      aria-labelledby="inside-title"
      className="relative isolate overflow-hidden border-b border-border bg-secondary-100/40 py-24 dark:bg-primary-900/20 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 size-160 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_124_153/0.15),transparent)] blur-2xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            {inside.eyebrow}
          </p>
          <h2
            id="inside-title"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {inside.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {inside.body}
          </p>

          <ExternalLink
            href={STORYBOOK_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary-600 hover:text-white"
          >
            {inside.cta}
            <ExternalIcon className="size-3.5 opacity-90" />
          </ExternalLink>
        </Reveal>

        <Reveal
          delay={0.08}
          className="rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.15)] sm:p-8 lg:col-span-7"
        >
          <dl className="divide-y divide-border">
            {inside.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0 sm:flex-row sm:gap-8"
              >
                <dt className="flex shrink-0 items-baseline gap-3 sm:w-44">
                  <span className="font-mono text-xs text-primary-700 dark:text-primary-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-semibold text-foreground">
                    {pillar.title}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-muted sm:text-base">
                  {pillar.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
