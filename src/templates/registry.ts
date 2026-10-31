import { templates } from "@/data/templates";
import ElegantClassicTemplate from "@/templates/elegant-classic/ElegantClassicTemplate";
import FloralRomanceTemplate from "@/templates/floral-romance/FloralRomanceTemplate";
import LuxuryCinematicTemplate from "@/templates/luxury-cinematic/LuxuryCinematicTemplate";
import MinimalModernTemplate from "@/templates/minimal-modern/MinimalModernTemplate";
import RoyalHeritageTemplate from "@/templates/royal-heritage/RoyalHeritageTemplate";
import type { TemplateMeta, TemplateRenderer } from "@/templates/types";

/**
 * Explicit, auditable registry (ARCHITECTURE.md §6).
 * Ids map to metadata AND render components; nothing is imported
 * dynamically from untrusted input.
 *
 * A template is "available" only when both its metadata and its render
 * component exist. Registering a renderer is the single switch that moves
 * a template from "in preparation" to a live demo.
 */
const renderers: Partial<Record<string, TemplateRenderer>> = {
  "luxury-cinematic": LuxuryCinematicTemplate,
  "floral-romance": FloralRomanceTemplate,
  "minimal-modern": MinimalModernTemplate,
  "royal-heritage": RoyalHeritageTemplate,
  "elegant-classic": ElegantClassicTemplate,
};

const metaById = new Map<string, TemplateMeta>(templates.map((t) => [t.id, t]));

/** Returns a copy of the metadata list; source data is never handed out. */
export function listTemplates(): TemplateMeta[] {
  return templates.map((t) => ({ ...t }));
}

export function getTemplateMeta(id: string | undefined): TemplateMeta | null {
  if (!id) return null;
  return metaById.get(id) ?? null;
}

export function getTemplateRenderer(id: string | undefined): TemplateRenderer | null {
  if (!id) return null;
  return renderers[id] ?? null;
}

export type TemplateAvailability = "available" | "in-preparation";

/** Derived availability — never a hand-maintained flag. */
export function getTemplateStatus(id: string): TemplateAvailability {
  return getTemplateMeta(id) && getTemplateRenderer(id) ? "available" : "in-preparation";
}
