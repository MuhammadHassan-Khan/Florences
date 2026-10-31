import { normaliseInternationalNumber } from "@/config/site";

/**
 * WhatsApp click-to-chat URL construction (ARCHITECTURE.md §8).
 *
 * Pure functions: they receive validated values and return a URL string.
 * Nothing here claims the message was sent — the caller must only expose
 * the URL behind an explicit user interaction.
 */

/** Everything the message needs; already validated by the caller. */
export type EnquiryMessageValues = {
  customerName: string;
  phone: string;
  templateTitle: string;
  templateId: string;
  /** ISO yyyy-mm-dd, optional. */
  weddingDate?: string;
  /** Selected celebration events, optional. */
  eventTypes: string[];
  /** Free text, optional. */
  message?: string;
};

/** Human-friendly event labels for the prepared message. */
const EVENT_LABELS: Record<string, string> = {
  mehndi: "Mehndi",
  barat: "Barat",
  walima: "Walima",
  nikkah: "Nikkah",
  reception: "Reception",
  engagement: "Engagement",
  other: "Other",
};

export const EVENT_OPTIONS = Object.keys(EVENT_LABELS);

export function eventLabel(id: string): string {
  return EVENT_LABELS[id] ?? id;
}

/** Renders a yyyy-mm-dd string as a friendly label (e.g. "5 Dec 2026"). */
export function formatDateLabel(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthIndex = Number(m) - 1;
  if (monthIndex < 0 || monthIndex > 11) return iso;
  return `${Number(d)} ${months[monthIndex]} ${y}`;
}

/**
 * Builds a readable, labelled message. Field labels are fixed strings
 * written by us — customer input is only ever interpolated as plain
 * text and the whole message is URL-encoded by `buildWhatsAppUrl`.
 */
export function buildEnquiryMessage(values: EnquiryMessageValues): string {
  const lines: string[] = [
    "Assalam-o-Alaikum! I would like to enquire about a wedding invitation.",
    "",
    `Template: ${values.templateTitle} (${values.templateId})`,
    `Name: ${values.customerName}`,
    `My WhatsApp number: ${values.phone}`,
  ];

  if (values.weddingDate) {
    lines.push(`Wedding date: ${formatDateLabel(values.weddingDate)}`);
  }

  if (values.eventTypes.length > 0) {
    lines.push(`Events: ${values.eventTypes.map(eventLabel).join(", ")}`);
  }

  if (values.message?.trim()) {
    lines.push("", "Message:", values.message.trim());
  }

  lines.push("", "Sent from the FLORENCES demo website.");
  return lines.join("\n");
}

/**
 * Official click-to-chat format:
 * https://wa.me/<international-digits-only>?text=<url-encoded-message>
 *
 * Returns null when the number contains no digits at all, so callers can
 * refuse to render a dead handoff link.
 */
export function buildWhatsAppUrl(
  internationalNumber: string,
  message: string,
): string | null {
  const digits = normaliseInternationalNumber(internationalNumber);
  if (digits.length === 0) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
