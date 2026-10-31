/**
 * Single source of business configuration (ARCHITECTURE.md §8, PRODUCT_SPEC §8).
 *
 * The WhatsApp number is NOT a secret, but it must live in exactly one
 * place so it can be swapped without touching components or utilities.
 *
 * ── HOW TO CONFIGURE ──────────────────────────────────────────────────
 * Replace `WHATSAPP_NUMBER_PLACEHOLDER` with the real business number in
 * international, digits-only format: no "+", no spaces, no punctuation.
 * Example for a Pakistani number: "923001234567".
 *
 * While the placeholder is in place the enquiry page shows a visible
 * notice and the handoff link is not activated, so a demo visitor can
 * never message a random real person.
 * ──────────────────────────────────────────────────────────────────────
 */

/** Placeholder used until the business supplies its real number. */
export const WHATSAPP_NUMBER_PLACEHOLDER = "15550000000";

/**
 * The live business number. Keep this equal to
 * `WHATSAPP_NUMBER_PLACEHOLDER` until the real number is provided.
 */
export const WHATSAPP_NUMBER: string = WHATSAPP_NUMBER_PLACEHOLDER;

/** Digits-only international number (no "+", spaces or punctuation). */
export function normaliseInternationalNumber(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** True while the configured number is still the demo placeholder. */
export function isPlaceholderWhatsAppNumber(
  number: string = WHATSAPP_NUMBER,
): boolean {
  return normaliseInternationalNumber(number) === WHATSAPP_NUMBER_PLACEHOLDER;
}
