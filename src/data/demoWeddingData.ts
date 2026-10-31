import type { CoupleNames, WeddingEvent } from "@/templates/types";

/**
 * SAMPLE CONTENT — demo only.
 *
 * Every value below is invented placeholder content for the interactive
 * demo (IMPLEMENTATION_PLAN §7: "Use clearly labelled sample content").
 * None of it refers to a real couple, venue, or event. Dates are fixed
 * sample values chosen only so the countdown has a stable target.
 */

export type WeddingDemoData = {
  /** Visible demo-data badge copy. */
  demoNotice: string;
  couple: CoupleNames;
  /** Formal invitation wording, composed with the (editable) names. */
  inviteLead: string;
  inviteRequest: string;
  dateLine: string;
  /** ISO timestamp for the countdown target (sample). */
  countdownTarget: string;
  regionLabel: string;
  events: WeddingEvent[];
  closingLine: string;
};

export const demoWeddingData: WeddingDemoData = {
  demoNotice: "Sample invitation — demo data only",
  couple: {
    partnerOne: "Aisha",
    partnerTwo: "Bilal",
  },
  inviteLead: "Together with their families",
  inviteRequest:
    "request the pleasure of your company as they celebrate their wedding",
  dateLine: "11 – 13 December 2026",
  countdownTarget: "2026-12-11T19:00:00+05:00",
  regionLabel: "Lahore, Pakistan",
  events: [
    {
      id: "mehndi",
      title: "Mehndi",
      dayLabel: "Friday",
      dateLabel: "11 December 2026",
      timeLabel: "7:00 PM onwards",
      venue: "Sample Lawn, Gulberg, Lahore",
      note: "Colourful, outdoor dress code",
    },
    {
      id: "barat",
      title: "Barat",
      dayLabel: "Saturday",
      dateLabel: "12 December 2026",
      timeLabel: "8:00 PM onwards",
      venue: "Sample Hall, Johar Town, Lahore",
    },
    {
      id: "walima",
      title: "Walima",
      dayLabel: "Sunday",
      dateLabel: "13 December 2026",
      timeLabel: "7:30 PM onwards",
      venue: "Sample Banquet, DHA Phase 5, Lahore",
    },
  ],
  closingLine: "Your presence and blessings will make our celebration complete.",
};
