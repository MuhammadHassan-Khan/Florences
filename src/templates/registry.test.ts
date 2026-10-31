import { describe, expect, it } from "vitest";

import { templates } from "@/data/templates";
import {
  getTemplateMeta,
  getTemplateRenderer,
  getTemplateStatus,
  listTemplates,
} from "@/templates/registry";

describe("template registry", () => {
  it("exposes exactly five template entries with unique stable ids", () => {
    const list = listTemplates();
    expect(list).toHaveLength(5);
    const ids = list.map((t) => t.id);
    expect(new Set(ids).size).toBe(5);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/); // slug-safe route id
    }
  });

  it("derives every route from its stable id and keeps metadata complete", () => {
    for (const meta of listTemplates()) {
      expect(meta.route).toBe(`/templates/${meta.id}`);
      expect(meta.thumbnail).toBe(`/media/thumbnails/${meta.id}.svg`);
      expect(meta.title.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
      expect(getTemplateMeta(meta.id)).toEqual(meta);
    }
  });

  it("resolves known ids and handles unknown ids without crashing", () => {
    expect(getTemplateMeta("luxury-cinematic")?.title).toBe("Luxury Cinematic");
    expect(getTemplateMeta("does-not-exist")).toBeNull();
    expect(getTemplateMeta(undefined)).toBeNull();
    expect(getTemplateStatus("does-not-exist")).toBe("in-preparation");
    expect(getTemplateRenderer("does-not-exist")).toBeNull();
  });

  it("reports availability only when a render component is registered", () => {
    for (const meta of templates) {
      const expected = getTemplateRenderer(meta.id) ? "available" : "in-preparation";
      expect(getTemplateStatus(meta.id)).toBe(expected);
    }
  });

  it("returns copies so source data cannot be mutated through the registry", () => {
    const list = listTemplates();
    list[0].title = "Mutated";
    list.pop();
    expect(templates).toHaveLength(5);
    expect(templates[0].title).toBe("Luxury Cinematic");
  });
});
