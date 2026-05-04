/**
 * Single source of truth for landing copy.
 * Edit wording here without touching JSX.
 */

export const STORYBOOK_URL = "https://design-system-eaip.onrender.com/";

export const brand = {
  name: "Firnaz.dev",
  domain: "firnaz.dev",
  role: "Frontend systems",
} as const;

export const nav = {
  links: [
    { id: "manifesto", label: "Manifesto", href: "#manifesto" },
    { id: "atomic", label: "Atomic", href: "#atomic" },
    { id: "impact", label: "Impact", href: "#impact" },
    { id: "catalog", label: "Catalog", href: "#catalog" },
  ],
  cta: "See it in Storybook",
} as const;

export const hero = {
  eyebrow: "Frontend systems",
  // Split by line for staggered reveal.
  headline: [
    "Design systems are",
    "infrastructure for",
    "product velocity.",
  ],
  sub: "I build them like APIs: versioned, contract-first, ruthlessly consistent. This site is the catalog.",
  primaryCta: "See it in Storybook",
  secondaryCta: "Read the thesis",
  scrollHint: "Scroll",
} as const;

export const manifesto = {
  eyebrow: "Manifesto",
  headline: "Most product UI rots from the inside.",
  body: [
    "Without a system, every team reinvents spacing, states, and tone. Drift becomes the default. Reviews argue over button radius instead of product risk. Engineers paste hex values. Designers ship the same component three times in three files. Velocity collapses under the weight of accumulated taste debt.",
    "A design system is not a sticker sheet. It is the contract between design and engineering named tokens, tested components, documented behavior so a change in one place propagates predictably everywhere else. The library becomes the lingua franca; the product team gets to argue about the things that actually matter.",
  ],
  pull: "Tokens before pixels. Composition before configuration. Storybook before screenshots.",
} as const;

export const atomic = {
  eyebrow: "Atomic methodology",
  headline: "Five layers. One vocabulary. Zero ad-hoc CSS.",
  intro:
    "Atomic design is not a folder structure it is a discipline for how complexity is allowed to grow. Every UI compresses into five layers, each layer composed strictly from the one below. No skipping, no shortcuts.",
  steps: [
    {
      id: "atom",
      label: "Atom",
      title: "The non-decomposable unit.",
      body: "A color token. A typography role. A single icon. A single Button. Atoms hold no state about other atoms they are the alphabet of the system.",
    },
    {
      id: "molecule",
      label: "Molecule",
      title: "Atoms with one shared purpose.",
      body: "A labeled input. A search field with a button. A chip with a close affordance. Molecules earn their existence by being reused never composed in place.",
    },
    {
      id: "organism",
      label: "Organism",
      title: "Self-contained UI regions.",
      body: "A booking summary card. A nav bar. A filter rail. Organisms own their layout and state. They are the unit teams reach for when assembling a screen.",
    },
    {
      id: "template",
      label: "Template",
      title: "Page-level structure, no content.",
      body: "Where organisms live on a page. Templates encode hierarchy, density, and rhythm and they make it obvious when a screen is doing too much.",
    },
    {
      id: "page",
      label: "Page",
      title: "Where the system meets the user.",
      body: "Real content, real edge cases, real measurements. Pages are the regression surface if they hold under change, the system below them is honest.",
    },
  ],
} as const;

export const impact = {
  eyebrow: "Outcomes",
  headline: "What changes when the system is real.",
  intro:
    "These are not vibes. They are the operational deltas a working system produces, measurable inside the first quarter of adoption.",
  pillars: [
    {
      title: "Standardization",
      body: "Layouts, states, and semantics align across features. PR reviews stop adjudicating button radius and start adjudicating product risk.",
      metric: "1 vocabulary",
      metricLabel: "for color, type, density, motion",
    },
    {
      title: "Velocity",
      body: "Compose from primitives and organisms instead of re-solving hover, focus, loading, and empty states on every screen.",
      metric: "−40%",
      metricLabel: "time from spec to PR (typical)",
    },
    {
      title: "Quality under change",
      body: "Fixes land once, in the shared component. Storybook snapshots and interaction docs keep behavior honest as the surface area grows.",
      metric: "1× fix",
      metricLabel: "propagates to every consumer",
    },
  ],
} as const;

export const catalog = {
  eyebrow: "Catalog",
  headline: "Shipping libraries.",
  intro:
    "Each row is a versioned library documented, tested, and meant to be consumed. New systems land here when they are ready for others to build on.",
  emptySlot: "More systems land here as they ship.",
} as const;

export const inside = {
  eyebrow: "Inside a library",
  headline: "Tixia OTA atoms to organisms in Storybook.",
  body: "The first catalog entry grows from small, strict pieces (inputs, chips, tables) into flows like onboarding and rich editors. Storybook is the canonical gallery: props, edge cases, and usage notes live next to the code that ships.",
  pillars: [
    {
      title: "Tokens first",
      body: "Color, type, and spacing express brand and density without ad-hoc hex values in feature code.",
    },
    {
      title: "Composable UI",
      body: "Molecules and organisms wrap real OTA patterns search, booking, comms so product teams assemble instead of invent.",
    },
    {
      title: "Living source",
      body: "Published Storybook tracks what consumers should rely on. This site stays a lightweight welcome mat not a second doc hub to maintain.",
    },
  ],
  cta: "Browse Tixia in Storybook",
} as const;

export const cta = {
  eyebrow: "What's next",
  headline: "If you'd hire someone who builds the rails, not just the rides.",
  body: "I work on the layer underneath product design tokens, primitive APIs, motion language, accessibility defaults so the team above ships faster without losing the plot.",
  primary: "See it in Storybook",
  secondary: "firnaz.dev",
  url: "https://firnazluztian.github.io/",
} as const;

export const footer = {
  rights: "@copyright Firnaz.dev",
  storybookLabel: "Tixia Storybook",
  storybookHost: "design-system-eaip.onrender.com",
} as const;
