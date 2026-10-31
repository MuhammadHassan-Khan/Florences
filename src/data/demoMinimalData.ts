import type { WeddingDemoData } from "@/data/demoWeddingData";

/**
 * SAMPLE CONTENT — demo only (Minimal Modern template).
 *
 * Invented placeholder couple, dates and venues for the interactive demo.
 * Nothing here refers to a real couple, venue, or event; the on-screen
 * demo notice repeats that. Dates are fixed sample values chosen so the
 * countdown has a stable target.
 */
export const minimalDemoData: WeddingDemoData = {
  demoNotice: "Sample invitation — demo data only",
  couple: {
    partnerOne: "Sana",
    partnerTwo: "Adeel",
  },
  inviteLead: "Two families, one celebration",
  inviteRequest: "would love your company as they marry",
  dateLine: "16 – 17 January 2027",
  countdownTarget: "2027-01-16T19:30:00+05:00",
  regionLabel: "Islamabad, Pakistan",
  events: [
    {
      id: "nikah",
      title: "Nikah",
      dayLabel: "Saturday",
      dateLabel: "16 January 2027",
      timeLabel: "5:00 PM",
      venue: "Sample Hall, F-8, Islamabad",
      note: "Short ceremony, followed by dinner",
    },
    {
      id: "walima",
      title: "Walima",
      dayLabel: "Sunday",
      dateLabel: "17 January 2027",
      timeLabel: "7:30 PM",
      venue: "Sample Terrace, Margalla View, Islamabad",
    },
  ],
  closingLine: "Come as you are — leave as family.",
};
