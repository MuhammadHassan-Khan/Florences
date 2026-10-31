/**
 * Media assets for the Floral Romance template.
 *
 * All artwork is original placeholder SVG drawn for this project (see
 * public/media/ATTRIBUTION.md). Paths and alternative text live here only,
 * so licensed media can be swapped in without touching rendering code.
 */
export const floralAssets = {
  music: {
    src: "/media/audio/demo-track.wav",
    title: "Demo ambience",
  },
  gallery: [
    {
      src: "/media/gallery/floral-romance-01.svg",
      alt: "Sample artwork — pressed petals in blush tones",
    },
    {
      src: "/media/gallery/floral-romance-02.svg",
      alt: "Sample artwork — a leafy sage branch on an ivory ground",
    },
    {
      src: "/media/gallery/floral-romance-03.svg",
      alt: "Sample artwork — a soft cluster of rose blossoms",
    },
    {
      src: "/media/gallery/floral-romance-04.svg",
      alt: "Sample artwork — a gentle rose and sage colour wash",
    },
  ],
} as const;
