import type { CoverTone, Product } from '@/data/types';

/**
 * Original generated cover art for a product card — a dark technical
 * panel with a grid, the product glyph, and the category label. No stock
 * imagery, no external requests.
 */
const TONE_STYLES: Record<CoverTone, { stroke: string; fill: string }> = {
  lime: { stroke: '#aee838', fill: 'rgba(174, 232, 56, 0.09)' },
  sand: { stroke: '#d9c08a', fill: 'rgba(217, 192, 138, 0.09)' },
  sky: { stroke: '#8fbfe0', fill: 'rgba(143, 191, 224, 0.09)' },
  violet: { stroke: '#b3a6e0', fill: 'rgba(179, 166, 224, 0.09)' },
  teal: { stroke: '#7fd1c1', fill: 'rgba(127, 209, 193, 0.09)' },
  rose: { stroke: '#e0a3b3', fill: 'rgba(224, 163, 179, 0.09)' },
};

export function ProductCover({ product }: { product: Product }) {
  const tone = TONE_STYLES[product.cover.tone];

  return (
    <div
      className="grid-bg relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-t-2xl border-b border-white/8"
      style={{ backgroundColor: tone.fill }}
      aria-hidden="true"
    >
      <span
        className="font-mono text-6xl font-semibold leading-none md:text-7xl"
        style={{ color: tone.stroke, textShadow: `0 0 32px ${tone.stroke}33` }}
      >
        {product.cover.glyph}
      </span>
      <span
        className="absolute bottom-3 left-4 font-mono text-[0.65rem] uppercase tracking-[0.18em]"
        style={{ color: tone.stroke, opacity: 0.85 }}
      >
        {product.category}
      </span>
      <span
        className="absolute right-4 top-4 h-4 w-4 border-r border-t"
        style={{ borderColor: `${tone.stroke}66` }}
      />
    </div>
  );
}
