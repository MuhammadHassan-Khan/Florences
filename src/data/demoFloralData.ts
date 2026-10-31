import type { WeddingDemoData } from "@/data/demoWeddingData";

/**
 * SAMPLE CONTENT — demo only (Floral Romance template).
 *
 * Invented placeholder couple, dates and venues for the interactive demo.
 * Nothing here refers to a real couple, venue, or event; the on-screen
 * demo notice repeats that. Dates are fixed sample values chosen so the
 * countdown has a stable target.
 */
export const floralDemoData: WeddingDemoData = {
  demoNotice: "Sample invitation — demo data only",
  couple: {
    partnerOne: "Mariam",
    partnerTwo: "Hamza",
  },
  inviteLead: "With the blessings of their families",
  inviteRequest: "invite you to share in the joy of their wedding",
  dateLine: "6 – 8 February 2027",
  countdownTarget: "2027-02-06T18:00:00+05:00",
  regionLabel: "Karachi, Pakistan",
  events: [
    {
      id: "mehndi",
      title: "Mehndi",
      dayLabel: "Saturday",
      dateLabel: "6 February 2027",
      timeLabel: "6:30 PM onwards",
      venue: "Sample Garden House, Clifton, Karachi",
      note: "Bright colours and lawn seating",
    },
    {
      id: "barat",
      title: "Barat",
      dayLabel: "Sunday",
      dateLabel: "7 February 2027",
      timeLabel: "8:00 PM onwards",
      venue: "Sample Marquee, Defence, Karachi",
    },
    {
      id: "walima",
      title: "Walima",
      dayLabel: "Monday",
      dateLabel: "8 February 2027",
      timeLabel: "7:30 PM onwards",
      venue: "Sample Banquet, PECHS, Karachi",
    },
  ],
  closingLine: "Your blessings are the finest gift on our new beginning.",
};
