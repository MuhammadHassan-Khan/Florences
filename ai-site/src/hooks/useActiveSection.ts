import { useEffect, useState } from 'react';

import { SECTION_IDS } from '@/config/sections';

/**
 * Tracks which home-page section is currently in the reading zone so the
 * navigation can highlight it. Uses a rAF-throttled scroll listener with
 * plain layout math — no observer churn, works at any viewport size.
 * SECTION_IDS is a module constant, so the effect runs only once.
 */
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      // Reading marker ~40% down the viewport.
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
