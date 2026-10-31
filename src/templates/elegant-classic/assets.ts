/**
 * Media assets for the Elegant Classic template.
 *
 * All files are original engraved-style placeholder artwork generated for
 * this project (see public/media/ATTRIBUTION.md). Replace them with
 * licensed media without touching rendering code — paths live here only.
 */
export const elegantAssets = {
  music: {
    src: "/media/audio/demo-track.wav",
    title: "Demo ambience",
  },
  gallery: [
    {
      src: "/media/gallery/elegant-classic-01.svg",
      alt: "Sample artwork — engraved double-rule frame with monogram",
    },
    {
      src: "/media/gallery/elegant-classic-02.svg",
      alt: "Sample artwork — hairline guilloche wave engraving",
    },
    {
      src: "/media/gallery/elegant-classic-03.svg",
      alt: "Sample artwork — laurel sprig composition",
    },
    {
      src: "/media/gallery/elegant-classic-04.svg",
      alt: "Sample artwork — letterpress plate with debossed border",
    },
  ],
} as const;
