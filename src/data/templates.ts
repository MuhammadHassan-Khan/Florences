import type { TemplateMeta } from "@/templates/types";

/**
 * Single source of truth for gallery entries (ARCHITECTURE.md §6).
 *
 * PROVISIONAL — ids, titles and descriptions for templates 2–5 are
 * provisional placeholders (PRODUCT_SPEC.md §11, Open Decisions).
 * `luxury-cinematic` is specified by the product spec and is stable.
 * All copy is clearly-labelled demo content.
 */
export const templates: readonly TemplateMeta[] = [
  {
    id: "luxury-cinematic",
    title: "Luxury Cinematic",
    styleLabel: "Cinematic",
    description:
      "A dramatic, film-style Pakistani wedding invitation with deep tones, gold light and rich motion.",
    thumbnail: "/media/thumbnails/luxury-cinematic.svg",
    route: "/templates/luxury-cinematic",
  },
  {
    id: "floral-romance",
    title: "Floral Romance",
    styleLabel: "Botanical",
    description:
      "Soft botanical illustration and gentle pastels for a warm, romantic invitation.",
    thumbnail: "/media/thumbnails/floral-romance.svg",
    route: "/templates/floral-romance",
  },
  {
    id: "minimal-modern",
    title: "Minimal Modern",
    styleLabel: "Editorial",
    description:
      "Editorial typography and generous whitespace in a clean, contemporary layout.",
    thumbnail: "/media/thumbnails/minimal-modern.svg",
    route: "/templates/minimal-modern",
  },
  {
    id: "royal-heritage",
    title: "Royal Heritage",
    styleLabel: "Regal",
    description:
      "Mughal arches, intricate jaali lattice and regal emerald tones for a majestic announcement.",
    thumbnail: "/media/thumbnails/royal-heritage.svg",
    route: "/templates/royal-heritage",
  },
  {
    id: "elegant-classic",
    title: "Elegant Classic",
    styleLabel: "Timeless",
    description:
      "Timeless ivory and champagne gold with formal calligraphic detailing.",
    thumbnail: "/media/thumbnails/elegant-classic.svg",
    route: "/templates/elegant-classic",
  },
];
