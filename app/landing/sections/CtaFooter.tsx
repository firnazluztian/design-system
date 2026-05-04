"use client";

import { ExternalIcon } from "../components/ExternalIcon";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";
import { cta, footer, STORYBOOK_URL } from "../copy";
import { DESIGN_SYSTEM_PRODUCTS, SECTION_IDS } from "../data";

export function CtaFooter() {
  const year = new Date().getFullYear();
  const liveCount = DESIGN_SYSTEM_PRODUCTS.filter(
    (p) => p.status === "live",
  ).length;

  return (
    <>
      <section
        id={SECTION_IDS.cta}
        aria-labelledby="cta-title"
        className="relative isolate overflow-hidden border-b border-border py-24 sm:py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_60%,rgb(0_124_153/0.18),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.025)_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-8">
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
              {cta.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              id="cta-title"
              className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {cta.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {cta.body}
            </p>
          </Reveal>

          <Reveal
            delay={0.18}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href={STORYBOOK_URL}
              external
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background shadow-[0_8px_30px_-8px_rgb(0_124_153/0.55)] transition hover:bg-primary-600 hover:text-white"
            >
              {cta.primary}
              <ExternalIcon className="size-4 opacity-90 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <a
              href={cta.url}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-base font-medium text-foreground transition hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-200"
            >
              {cta.secondary}
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-surface-muted/50 py-10 dark:bg-surface-muted/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-1">
            <p>
              {/* <span className="font-display font-semibold text-foreground">
                {brand.name}
              </span> */}
              {/* <span className="text-primary-500">.</span>{" "} */}
              <span className="text-muted">{footer.rights}</span>
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              © {year} · {liveCount} live{" "}
              {liveCount === 1 ? "system" : "systems"}
            </p>
          </div>

          {/* <ExternalLink
            href={STORYBOOK_URL}
            className="group inline-flex items-center gap-1.5 font-medium text-foreground transition hover:text-primary-700 dark:hover:text-primary-200"
          >
            <span>{footer.storybookLabel}</span>
            <span className="text-muted">·</span>
            <span className="font-mono text-xs text-muted transition group-hover:text-primary-700 dark:group-hover:text-primary-200">
              {footer.storybookHost}
            </span>
            <ExternalIcon className="size-3.5 opacity-70" />
          </ExternalLink> */}
        </div>
      </footer>
    </>
  );
}
