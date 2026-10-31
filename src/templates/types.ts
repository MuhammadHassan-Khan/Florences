import type { ComponentType } from "react";

/** Temporary preview personalization for demo sessions (never persisted). */
export type CoupleNames = {
  partnerOne: string;
  partnerTwo: string;
};

/**
 * Template metadata contract (ARCHITECTURE.md §6).
 * A template is considered available only if its metadata, route, assets
 * AND render component exist — availability is derived in the registry,
 * never hard-coded into the data.
 */
export type TemplateMeta = {
  /** Stable, explicit slug used in routes and enquiry preselection. */
  id: string;
  title: string;
  description: string;
  /** Short style label shown on gallery cards (e.g. "Cinematic"). */
  styleLabel: string;
  /** Static asset path, e.g. /media/thumbnails/luxury-cinematic.svg */
  thumbnail: string;
  /** Canonical demo route: /templates/:id */
  route: string;
};

/** Props every template render component receives. */
export type TemplateRenderProps = {
  /** The registry metadata for this template (id, title, description…). */
  meta: TemplateMeta;
  /** Current override values; empty strings fall back to sample content. */
  names: CoupleNames;
  /** Update the temporary preview names (local demo state only). */
  onNamesChange: (next: CoupleNames) => void;
};

/** A single celebration entry — genuinely shared across templates. */
export type WeddingEvent = {
  id: string;
  title: string;
  dayLabel: string;
  dateLabel: string;
  timeLabel: string;
  /** Free-text venue; also used to build the map link. */
  venue: string;
  note?: string;
};

export type TemplateRenderer = ComponentType<TemplateRenderProps>;
