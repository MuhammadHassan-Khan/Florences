import { describe, expect, it } from "vitest";

import { partsUntil } from "@/utils/partsUntil";

describe("partsUntil", () => {
  const now = new Date("2026-12-01T12:00:00.000Z");

  it("breaks a future target into days, hours, minutes and seconds", () => {
    expect(partsUntil("2026-12-14T13:00:30.000Z", now)).toEqual({
      days: 13,
      hours: 1,
      minutes: 0,
      seconds: 30,
    });
  });

  it("returns all zeros once the target has passed", () => {
    expect(partsUntil("2026-11-01T00:00:00.000Z", now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns all zeros exactly at the target", () => {
    expect(partsUntil(now.toISOString(), now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns null for an unparsable target instead of misleading values", () => {
    expect(partsUntil("not-a-date", now)).toBeNull();
    expect(partsUntil("", now)).toBeNull();
  });
});
