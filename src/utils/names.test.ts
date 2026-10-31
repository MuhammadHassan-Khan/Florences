import { describe, expect, it } from "vitest";

import { normalizeName, resolveNames } from "@/utils/names";

describe("normalizeName", () => {
  it("trims surrounding whitespace and collapses internal runs", () => {
    expect(normalizeName("  Noor   Ahmad  ")).toBe("Noor Ahmad");
    expect(normalizeName("\t Zayn\n")).toBe("Zayn");
  });

  it("treats whitespace-only input as empty", () => {
    expect(normalizeName("   ")).toBe("");
    expect(normalizeName("")).toBe("");
  });
});

describe("resolveNames", () => {
  const sample = { partnerOne: "Aisha", partnerTwo: "Bilal" };

  it("falls back to the sample names when overrides are empty", () => {
    expect(resolveNames(sample, { partnerOne: "", partnerTwo: "  " })).toEqual(sample);
  });

  it("applies each override independently", () => {
    expect(resolveNames(sample, { partnerOne: "Noor", partnerTwo: "" })).toEqual({
      partnerOne: "Noor",
      partnerTwo: "Bilal",
    });
    expect(resolveNames(sample, { partnerOne: "", partnerTwo: "Zayn" })).toEqual({
      partnerOne: "Aisha",
      partnerTwo: "Zayn",
    });
  });

  it("normalizes overrides before use", () => {
    expect(resolveNames(sample, { partnerOne: "  Noor  Ahmad ", partnerTwo: "Zayn" })).toEqual({
      partnerOne: "Noor Ahmad",
      partnerTwo: "Zayn",
    });
  });

  it("never mutates the sample object", () => {
    const before = structuredClone(sample);
    const resolved = resolveNames(sample, { partnerOne: "Noor", partnerTwo: "Zayn" });
    resolved.partnerOne = "Mutated";
    expect(sample).toEqual(before);
  });
});
