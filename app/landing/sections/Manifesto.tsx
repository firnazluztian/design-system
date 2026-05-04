"use client";

import { Reveal } from "../components/Reveal";
import { manifesto } from "../copy";
import { SECTION_IDS } from "../data";

export function Manifesto() {
  return (
    <section
      id={SECTION_IDS.manifesto}
      aria-labelledby="manifesto-title"
      className="relative border-b border-border bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            {manifesto.eyebrow}
          </p>
          <h2
            id="manifesto-title"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {manifesto.headline}
          </h2>
        </Reveal>

        <div className="space-y-6 lg:col-span-7 lg:col-start-6">
          {manifesto.body.map((paragraph, i) => (
            <Reveal
              key={i}
              delay={i * 0.06}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.18}>
            <blockquote className="mt-8 border-l-2 border-primary-500 pl-5 font-display text-xl font-medium leading-snug text-foreground sm:text-2xl">
              {manifesto.pull}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
