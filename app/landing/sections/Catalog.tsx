"use client";

import { ExternalLink } from "../components/ExternalLink";
import { ExternalIcon } from "../components/ExternalIcon";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { catalog } from "../copy";
import { DESIGN_SYSTEM_PRODUCTS, SECTION_IDS } from "../data";

export function Catalog() {
  return (
    <section
      id={SECTION_IDS.catalog}
      aria-labelledby="catalog-title"
      className="relative border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
            {catalog.eyebrow}
          </p>
          <h2
            id="catalog-title"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {catalog.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {catalog.intro}
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {DESIGN_SYSTEM_PRODUCTS.map((product, i) => (
            <Reveal as="li" key={product.id} delay={i * 0.06}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-sm transition hover:shadow-xl sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary-500/10 blur-3xl transition group-hover:bg-primary-500/15"
                />

                <div className="relative flex flex-col gap-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {product.domain}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {product.name}
                      </h3>
                    </div>
                    <StatusBadge status={product.status} />
                  </div>

                  <p className="text-base leading-relaxed text-muted">
                    {product.tagline} {product.description}
                  </p>

                  <dl className="grid grid-cols-3 gap-3 border-y border-border py-4">
                    {product.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 font-display text-xl font-semibold text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ExternalLink
                    href={product.storybookUrl}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-primary-600 hover:text-white"
                  >
                    Open Storybook
                    <ExternalIcon className="size-3.5 opacity-90" />
                  </ExternalLink>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={DESIGN_SYSTEM_PRODUCTS.length * 0.06}
            className="flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-border bg-surface-muted/40 p-8 text-center dark:bg-surface-muted/15"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-border font-mono text-lg text-muted">
                +
              </span>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {catalog.emptySlot}
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: "live" | "in-progress" | "concept";
}) {
  const styles = {
    live: "bg-success-500/15 text-success-700 dark:text-success-300 border-success-500/20",
    "in-progress":
      "bg-warning-500/15 text-warning-700 dark:text-warning-200 border-warning-500/25",
    concept:
      "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-border",
  } as const;

  const labels = {
    live: "Live",
    "in-progress": "In progress",
    concept: "Concept",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${styles[status]}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          status === "live"
            ? "bg-success-500 shadow-[0_0_8px_rgb(0_179_125/0.7)]"
            : status === "in-progress"
              ? "bg-warning-500"
              : "bg-neutral-400"
        }`}
      />
      {labels[status]}
    </span>
  );
}
