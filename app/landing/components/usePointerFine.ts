"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to `(pointer: fine)`. SSR returns `false` so motion-heavy
 * primitives degrade to static markup on the server, then activate on
 * mount when the browser confirms a fine-grained pointer.
 *
 * Implemented with `useSyncExternalStore` to avoid the React 19
 * `set-state-in-effect` lint and to get a tear-free subscription.
 */
export function usePointerFine(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}
