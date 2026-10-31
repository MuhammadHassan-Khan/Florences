import type { WeddingDemoData } from "@/data/demoWeddingData";

/**
 * SAMPLE CONTENT — demo only (Elegant Classic template).
 *
 * Invented placeholder couple, dates and venues for the interactive demo.
 * Nothing here refers to a real couple, venue, or event; the on-screen
 * demo notice repeats that. Dates are fixed sample values chosen so the
 * countdown has a stable target.
 */
export const elegantDemoData: WeddingDemoData = {
  demoNotice: "Sample invitation — demo data only",
  couple: {
    partnerOne: "Zara",
    partnerTwo: "Ibrahim",
  },
  inviteLead: "Mr and Mrs Ahmed request the pleasure of your company",
  inviteRequest: "at the marriage of their daughter and son",
  dateLine: "9 – 10 January 2027",
  countdownTarget: "2027-01-09T18:30:00+05:00",
  regionLabel: "Islamabad, Pakistan",
  events: [
    {
      id: "nikah",
      title: "Nikah",
      dayLabel: "Saturday",
      dateLabel: "9 January 2027",
      timeLabel: "5:30 PM",
      venue: "Sample Lawns, Serena Annexe, Islamabad",
      note: "Seated dinner to follow",
    },
    {
      id: "walima",
      title: "Walima",
      dayLabel: "Sunday",
      dateLabel: "10 January 2027",
      timeLabel: "7:30 PM",
      venue: "Sample Ballroom, Blue Area, Islamabad",
    },
  ],
  closingLine: "Your presence will grace our celebration.",
};
