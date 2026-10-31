import type { WeddingDemoData } from "@/data/demoWeddingData";

/**
 * SAMPLE CONTENT — demo only (Royal Heritage template).
 *
 * Invented placeholder couple, dates and venues for the interactive demo.
 * Nothing here refers to a real couple, venue, or event; the on-screen
 * demo notice repeats that. Dates are fixed sample values chosen so the
 * countdown has a stable target.
 */
export const royalDemoData: WeddingDemoData = {
  demoNotice: "Sample invitation — demo data only",
  couple: {
    partnerOne: "Fatima",
    partnerTwo: "Yusuf",
  },
  inviteLead: "Together with their families",
  inviteRequest:
    "request the honour of your presence at the wedding of their children",
  dateLine: "19 – 21 March 2027",
  countdownTarget: "2027-03-20T19:00:00+05:00",
  regionLabel: "Lahore, Pakistan",
  events: [
    {
      id: "mehndi",
      title: "Mehndi",
      dayLabel: "Friday",
      dateLabel: "19 March 2027",
      timeLabel: "7:00 PM onwards",
      venue: "Sample Haveli Courtyard, Old Lahore",
      note: "Folk music and dholki",
    },
    {
      id: "barat",
      title: "Barat",
      dayLabel: "Saturday",
      dateLabel: "20 March 2027",
      timeLabel: "8:00 PM onwards",
      venue: "Sample Grand Hall, Gulberg, Lahore",
    },
    {
      id: "walima",
      title: "Walima",
      dayLabel: "Sunday",
      dateLabel: "21 March 2027",
      timeLabel: "7:30 PM onwards",
      venue: "Sample Banquet, Cantt, Lahore",
    },
  ],
  closingLine: "Be there to bless the throne of a new beginning.",
};
