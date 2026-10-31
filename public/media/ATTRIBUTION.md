# Media attribution & licensing

All placeholder media shipped with this project is **original work created
for this repository** — no third-party stock assets are bundled, and no
remote media URLs are depended on (ARCHITECTURE.md §9).

| Asset | Path | Source |
| --- | --- | --- |
| Template thumbnails (5) | `/media/thumbnails/*.svg` | Original SVG artwork generated for this project |
| Luxury gallery artwork (4) | `/media/gallery/luxury-0*.svg` | Original SVG artwork generated for this project |
| Floral Romance gallery artwork (4) | `/media/gallery/floral-romance-0*.svg` | Original SVG artwork generated for this project |
| Minimal Modern gallery artwork (4) | `/media/gallery/minimal-modern-0*.svg` | Original SVG artwork generated for this project |
| Royal Heritage gallery artwork (4) | `/media/gallery/royal-heritage-0*.svg` | Original SVG artwork generated for this project |
| Elegant Classic gallery artwork (4) | `/media/gallery/elegant-classic-0*.svg` | Original SVG artwork generated for this project |
| Demo music loop | `/media/audio/demo-track.wav` | Original synthesis, reproducible via `node scripts/generate-audio.mjs` |
| Favicon | `/favicon.svg` | Original SVG artwork for this project |

## Replacing placeholders with licensed media

1. Drop the licensed file into the matching folder under `public/media/`.
2. Update the path in the template's `assets.ts` (thumbnails: `src/data/templates.ts`).
3. Keep dimensions close to the originals so reserved aspect ratios still
   prevent layout shifts.
4. Record the new asset's source, licence, and attribution in this file.

## Rules

- Do not commit assets whose licence you cannot document.
- Do not hotlink stock URLs — keep licensed copies in `public/media/`.
- Video, if introduced later, must be muted, have a poster image, and
  degrade gracefully (ARCHITECTURE.md §9).
