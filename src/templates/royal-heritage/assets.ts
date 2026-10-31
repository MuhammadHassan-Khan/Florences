/**
 * Media assets for the Royal Heritage template.
 *
 * All files are original placeholder artwork drawn for this project
 * (see public/media/ATTRIBUTION.md). Replace them with licensed media
 * without touching rendering code — paths and alt text live here only.
 */
export const royalAssets = {
  music: {
    src: "/media/audio/demo-track.wav",
    title: "Demo ambience",
  },
  gallery: [
    {
      src: "/media/gallery/royal-heritage-01.svg",
      alt: "Sample artwork — pointed Mughal arch with gold linework on an emerald ground",
    },
    {
      src: "/media/gallery/royal-heritage-02.svg",
      alt: "Sample artwork — jaali lattice pattern in antique gold over emerald",
    },
    {
      src: "/media/gallery/royal-heritage-03.svg",
      alt: "Sample artwork — symmetrical gold rosette medallion",
    },
    {
      src: "/media/gallery/royal-heritage-04.svg",
      alt: "Sample artwork — hanging lanterns glowing on an emerald ground",
    },
  ],
} as const;
