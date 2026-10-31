import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Notice } from '@/components/ui/Notice';
import { site } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

type LegalPageProps = {
  title: string;
  documentTitle: string;
  draftNote: string;
  children: ReactNode;
};

/** Shared shell for the privacy and terms pages (honest, editable drafts). */
export function LegalPage({ title, documentTitle, draftNote, children }: LegalPageProps) {
  useDocumentTitle(documentTitle);

  return (
    <article className="container-page max-w-3xl pb-24 pt-32 md:pt-40">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone-faint"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/#home" className="transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-bone-dim">{title}</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-balance text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] font-semibold tracking-tight">
        {title}
      </h1>

      <Notice tone="warn" className="mt-6">
        {draftNote}
      </Notice>

      <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-bone-dim [&>h2]:mt-10 [&>h2]:first:mt-0">
        {children}
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone-faint">
          {site.brand.name} · {site.brand.descriptor}
        </p>
      </div>
    </article>
  );
}
