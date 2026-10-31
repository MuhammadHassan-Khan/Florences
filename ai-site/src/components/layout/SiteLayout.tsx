import { useEffect, type ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { CartProvider } from '@/cart/CartProvider';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

/**
 * Shared shell: skip link, fixed header, page content, footer.
 *
 * Also owns scroll behaviour on navigation:
 *  - `/#section`  → smooth-scroll (or instant under reduced motion) to that
 *                   section and move focus to it, so keyboard and screen-
 *                   reader users land in the right place;
 *  - plain routes → scroll back to the top.
 */
export function SiteLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, 70);

    return () => window.clearTimeout(timer);
  }, [location.key, location.hash]);

  return (
    <CartProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" className="min-h-screen">
        {children ?? <Outlet />}
      </main>

      <SiteFooter />
    </CartProvider>
  );
}
