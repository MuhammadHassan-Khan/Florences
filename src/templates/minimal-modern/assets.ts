/**
 * Media assets for the Minimal Modern template.
 *
 * All files are original placeholder artwork drawn for this project (see
 * public/media/ATTRIBUTION.md). Paths and alt text live here only, so the
 * artwork can be swapped without touching rendering code.
 */
export const minimalAssets = {
  music: {
    src: "/media/audio/demo-track.wav",
    title: "Demo ambience",
  },
  gallery: [
    {
      src: "/media/gallery/minimal-modern-01.svg",
      alt: "Sample artwork — thin rule grid study",
    },
    {
      src: "/media/gallery/minimal-modern-02.svg",
      alt: "Sample artwork — concentric arc composition",
    },
    {
      src: "/media/gallery/minimal-modern-03.svg",
      alt: "Sample artwork — typographic specimen study",
    },
    {
      src: "/media/gallery/minimal-modern-04.svg",
      alt: "Sample artwork — ink block composition",
    },
  ],
} as const;
