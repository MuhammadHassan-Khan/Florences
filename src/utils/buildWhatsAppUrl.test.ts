import { describe, expect, it } from "vitest";

import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  eventLabel,
  formatDateLabel,
  type EnquiryMessageValues,
} from "./buildWhatsAppUrl";

const base: EnquiryMessageValues = {
  customerName: "Noor Khan",
  phone: "923001234567",
  templateTitle: "Luxury Cinematic",
  templateId: "luxury-cinematic",
  eventTypes: [],
};

describe("buildEnquiryMessage", () => {
  it("includes template, name and phone with labels", () => {
    const msg = buildEnquiryMessage(base);
    expect(msg).toContain("Template: Luxury Cinematic (luxury-cinematic)");
    expect(msg).toContain("Name: Noor Khan");
    expect(msg).toContain("My WhatsApp number: 923001234567");
  });

  it("omits optional fields when they are empty", () => {
    const msg = buildEnquiryMessage(base);
    expect(msg).not.toContain("Wedding date:");
    expect(msg).not.toContain("Events:");
    expect(msg).not.toContain("Message:");
  });

  it("includes wedding date, events and message when provided", () => {
    const msg = buildEnquiryMessage({
      ...base,
      weddingDate: "2026-12-05",
      eventTypes: ["mehndi", "barat", "walima"],
      message: "We would like the gold colour scheme.",
    });
    expect(msg).toContain("Wedding date: 5 Dec 2026");
    expect(msg).toContain("Events: Mehndi, Barat, Walima");
    expect(msg).toContain("Message:");
    expect(msg).toContain("We would like the gold colour scheme.");
  });

  it("keeps special characters and non-English text intact", () => {
    const msg = buildEnquiryMessage({
      ...base,
      customerName: "عائشہ & Bilal",
      message: "شکریہ! 100% — done 🙂",
    });
    expect(msg).toContain("Name: عائشہ & Bilal");
    expect(msg).toContain("شکریہ! 100% — done 🙂");
  });

  it("trims the free-text message", () => {
    const msg = buildEnquiryMessage({ ...base, message: "  hello  " });
    expect(msg).toContain("Message:\nhello\n");
  });

  it("labels unknown event ids defensively instead of crashing", () => {
    expect(eventLabel("mehndi")).toBe("Mehndi");
    expect(eventLabel("surprise-party")).toBe("surprise-party");
  });
});

describe("formatDateLabel", () => {
  it("renders a friendly date", () => {
    expect(formatDateLabel("2026-01-31")).toBe("31 Jan 2026");
    expect(formatDateLabel("2026-12-25")).toBe("25 Dec 2026");
  });

  it("passes through strings it does not recognise", () => {
    expect(formatDateLabel("sometime soon")).toBe("sometime soon");
    expect(formatDateLabel("2026-99-99")).toBe("2026-99-99");
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds the official wa.me click-to-chat URL", () => {
    const url = buildWhatsAppUrl("923001234567", "Hello");
    expect(url).toBe("https://wa.me/923001234567?text=Hello");
  });

  it("strips formatting from the phone number", () => {
    const url = buildWhatsAppUrl("+92 (300) 123-4567", "Hi");
    expect(url).toBe("https://wa.me/923001234567?text=Hi");
  });

  it("URL-encodes spaces, punctuation and non-ASCII text", () => {
    const msg = "Name: عائشہ & Bilal\nEvents: Mehndi, Barat";
    const url = buildWhatsAppUrl("923001234567", msg)!;
    const encoded = encodeURIComponent(msg);
    expect(url).toBe(`https://wa.me/923001234567?text=${encoded}`);
    // Round-trip: decoding recovers the exact message.
    const query = url.split("?text=")[1];
    expect(decodeURIComponent(query)).toBe(msg);
  });

  it("returns null when the number has no digits", () => {
    expect(buildWhatsAppUrl("", "Hello")).toBeNull();
    expect(buildWhatsAppUrl("not a number", "Hello")).toBeNull();
  });
});
