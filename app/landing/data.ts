import { STORYBOOK_URL } from "./copy";

export type ProductStatus = "live" | "in-progress" | "concept";

export interface DesignSystemProduct {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  storybookUrl: string;
  status: ProductStatus;
  /** Sized for visual rhythm, not a real metric where unknown. */
  stats: { label: string; value: string }[];
}

export const DESIGN_SYSTEM_PRODUCTS: DesignSystemProduct[] = [
  {
    id: "tixia-ota",
    name: "Tixia OTA",
    domain: "Travel · bookings · operations",
    tagline: "A dense system for travel surfaces.",
    description:
      "Tokens and components for OTA flows search, checkout, support, internal tools with Storybook as the contract for props, states, and usage.",
    storybookUrl: STORYBOOK_URL,
    status: "live",
    stats: [
      { label: "Atoms", value: "24" },
      { label: "Molecules", value: "11" },
      { label: "Organisms", value: "8" },
    ],
  },
];

/**
 * Vocabulary used in the marquee band — token names, primitive names,
 * and brand-flavored words that signal the breadth of the system.
 */
export const MARQUEE_TERMS = [
  "primary/500",
  "Button",
  "radius/lg",
  "Chip",
  "elevation/1",
  "DatePicker",
  "spacing/4",
  "Avatar",
  "neutral/700",
  "Stepper",
  "motion/ease-out",
  "Skeleton",
  "type/display",
  "Popover",
  "z/overlay",
  "Slider",
  "duration/220ms",
  "Switch",
  "focus/ring",
  "PhoneInput",
  "secondary/300",
  "Accordion",
] as const;

export const SECTION_IDS = {
  hero: "hero",
  manifesto: "manifesto",
  atomic: "atomic",
  impact: "impact",
  catalog: "catalog",
  inside: "inside",
  cta: "cta",
} as const;
