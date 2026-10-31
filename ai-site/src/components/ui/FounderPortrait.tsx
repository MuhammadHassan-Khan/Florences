import { useState } from 'react';

import { site } from '@/config/site';

const { portrait } = site.founder;

/**
 * Founder portrait for the hero and About section.
 *
 * Uses the founder's own photograph ONLY when it exists and `available`
 * is set to true in src/config/site.ts. Otherwise (or if the image fails
 * to load) it renders a clearly labelled placeholder — it never
 * substitutes a stock-photo or generated face.
 *
 * To add the real photograph:
 *   1. Copy the photo to  ai-site/public/portraits/hassan-khan.jpg
 *   2. Set  portrait.available = true  in src/config/site.ts
 */
export function FounderPortrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = portrait.available && !failed;

  return (
    <div className={`relative ${className}`.trim()}>
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
        {showPhoto ? (
          <img
            src={portrait.src}
            alt={portrait.alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
            width={720}
            height={900}
            fetchPriority="high"
          />
        ) : (
          <>
            <img
              src={portrait.placeholderSrc}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              width={720}
              height={900}
            />
            <p className="badge-example absolute left-4 top-4">Portrait placeholder</p>
          </>
        )}

        {/* Technical corner ticks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-accent/60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-accent/60"
        />
      </div>

      {!showPhoto && (
        <p className="mt-3 break-words font-mono text-[0.7rem] leading-relaxed text-bone-faint">
          Add your photo at <span className="text-bone-dim">public/portraits/hassan-khan.jpg</span>,
          then set <span className="text-bone-dim">portrait.available = true</span> in{' '}
          <span className="text-bone-dim">src/config/site.ts</span>.
        </p>
      )}
    </div>
  );
}
