import type { CoupleNames } from "@/templates/types";

/**
 * Temporary demo personalization helpers (PRODUCT_SPEC §6).
 * Overrides never mutate template/sample source data — they are resolved
 * at render time and discarded when the demo session ends.
 */

/** A name counts as "entered" only when it has visible characters. */
export function normalizeName(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Resolves the display names for a template: non-empty override wins,
 * otherwise the sample value is used. The sample object is never modified.
 */
export function resolveNames(sample: CoupleNames, override: CoupleNames): CoupleNames {
  const one = normalizeName(override.partnerOne);
  const two = normalizeName(override.partnerTwo);
  return {
    partnerOne: one.length > 0 ? one : sample.partnerOne,
    partnerTwo: two.length > 0 ? two : sample.partnerTwo,
  };
}
