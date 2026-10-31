import { Link } from 'react-router-dom';

import { site } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle(`Page not found | ${site.brand.name}`);

  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center pb-24 pt-40 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Error 404
      </p>
      <h1 className="mt-5 text-balance text-[clamp(1.9rem,1.4rem+2.4vw,3rem)] font-semibold tracking-tight">
        This page does not exist.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
        The link may be outdated, or the address may have a typo. Everything worth seeing is one
        click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/#home" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/#training" className="btn btn-ghost">
          Explore AI Training
        </Link>
      </div>
    </div>
  );
}
