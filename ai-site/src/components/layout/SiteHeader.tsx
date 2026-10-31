import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '@/cart/useCart';
import { useActiveSection } from '@/hooks/useActiveSection';
import { NAV_ITEMS, site } from '@/config/site';
import { IconCart, IconClose, IconMenu } from '@/components/ui/icons';

function sectionIdOf(href: string): string {
  return href.split('#')[1] ?? '';
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection();
  const { count } = useCart();
  const closeMenu = () => setOpen(false);

  // Close the menu when the browser navigates back/forward (React Router
  // surfaces that as popstate; the setState happens inside this callback).
  useEffect(() => {
    if (!open) return;
    const closeOnPopState = () => setOpen(false);
    window.addEventListener('popstate', closeOnPopState);
    return () => window.removeEventListener('popstate', closeOnPopState);
  }, [open]);

  // Menu behaviour: body scroll lock, Escape to close, focus moved into
  // the menu, a simple Tab trap, and focus returned to the toggle.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const toggle = toggleRef.current;
    document.body.style.overflow = 'hidden';

    const firstFocusable = menuRef.current?.querySelector<HTMLElement>('a, button');
    firstFocusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      (previouslyFocused ?? toggle)?.focus();
    };
  }, [open]);

  const isCurrent = (href: string) => sectionIdOf(href) === activeSection;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink-950/85 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md md:rounded-full md:px-5">
        {/* Brand */}
        <Link
          to="/#home"
          className="flex shrink-0 items-center gap-2.5 rounded-full"
          // No aria-label override: the accessible name is derived from the
          // visible monogram + name, which always satisfies WCAG 2.5.3.
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 bg-accent/10 font-mono text-[0.8rem] font-bold text-accent">
            {site.brand.monogram}
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:inline">
            {site.brand.name}
            <span className="ml-1.5 hidden font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-bone-faint lg:inline">
              {site.brand.descriptor}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={current ? 'location' : undefined}
                    className={`rounded-full px-3 py-2 text-[0.84rem] font-medium transition-colors ${
                      current ? 'text-accent' : 'text-bone-dim hover:text-bone'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            onClick={closeMenu}
            className="relative inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-bone transition-colors hover:border-accent/50 hover:bg-white/5"
          >
            <IconCart />
            <span className="hidden sm:inline">Cart</span>
            {/* Accessible name is built from content so the visible text always
                matches it; the count is duplicated here for screen readers. */}
            <span className="sr-only">
              {count > 0 ? `${count} ${count === 1 ? 'item' : 'items'} in cart` : 'empty'}
            </span>
            {count > 0 && (
              <span
                aria-hidden="true"
                className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 font-mono text-[0.65rem] font-bold text-on-accent"
              >
                {count}
              </span>
            )}
          </Link>

          <Link
            to="/#register"
            onClick={closeMenu}
            className="btn btn-primary btn-sm hidden md:inline-flex"
          >
            Join a Workshop
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone transition-colors hover:border-accent/50 hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/97 px-5 pb-10 pt-24 backdrop-blur-sm lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      aria-current={current ? 'location' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-2xl font-semibold tracking-tight transition-colors hover:bg-white/5 ${
                        current ? 'text-accent' : 'text-bone'
                      }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-bone-faint">
                        {sectionIdOf(item.href)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link to="/#register" onClick={closeMenu} className="btn btn-primary mt-7 w-full">
            Join a Workshop
          </Link>
          <Link to="/cart" onClick={closeMenu} className="btn btn-ghost mt-3 w-full">
            <IconCart />
            Cart{count > 0 ? ` (${count})` : ''}
          </Link>

          <p className="mt-9 border-t border-white/10 pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-bone-faint">
            {site.brand.tagline}
          </p>
        </div>
      )}
    </header>
  );
}
