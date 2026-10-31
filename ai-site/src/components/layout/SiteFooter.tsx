import { Link } from 'react-router-dom';

import { site } from '@/config/site';
import { trainingCourses } from '@/data/training';
import { products } from '@/data/products';

const YEAR = new Date().getFullYear();

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-bone-faint">
      {children}
    </h2>
  );
}

export function SiteFooter() {
  const hasContact =
    Boolean(site.contact.email) || Boolean(site.contact.whatsapp) || Boolean(site.contact.location);

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              to="/#home"
              className="flex items-center gap-2.5"
              // Name derives from the visible monogram + name (WCAG 2.5.3).
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 bg-accent/10 font-mono text-[0.8rem] font-bold text-accent">
                {site.brand.monogram}
              </span>
              <span className="text-[0.95rem] font-semibold tracking-tight">{site.brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
              {site.brand.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-faint">
              Practical AI education for students, creators, and businesses — in Urdu and simple
              English.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <FooterHeading>Navigate</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'AI Training', href: '/#training' },
                { label: 'Workshops', href: '/#workshops' },
                { label: 'Projects', href: '/#projects' },
                { label: 'Digital Products', href: '/#products' },
                { label: 'About', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-bone-dim transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Training */}
          <nav aria-label="Training">
            <FooterHeading>Training</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              {trainingCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    to="/#training"
                    className="text-bone-dim transition-colors hover:text-accent"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products + contact */}
          <div>
            <FooterHeading>Digital products</FooterHeading>
            <ul className="space-y-2.5 text-sm">
              {products.slice(0, 4).map((product) => (
                <li key={product.slug}>
                  <Link
                    to={`/products/${product.slug}`}
                    className="text-bone-dim transition-colors hover:text-accent"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/#products"
                  className="text-accent transition-colors hover:text-accent-strong"
                >
                  Browse the shop →
                </Link>
              </li>
            </ul>

            <h2 className="mb-3 mt-7 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-bone-faint">
              Contact
            </h2>
            {hasContact ? (
              <ul className="space-y-2.5 text-sm">
                {site.contact.email && (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-bone-dim transition-colors hover:text-accent"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {site.contact.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${site.contact.whatsapp}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-bone-dim transition-colors hover:text-accent"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {site.contact.location && (
                  <li className="text-bone-dim">{site.contact.location}</li>
                )}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-bone-faint">
                Direct contact details coming soon. Until then,{' '}
                <Link
                  to="/#register"
                  className="text-accent underline underline-offset-4 hover:text-accent-strong"
                >
                  register here
                </Link>{' '}
                and your message reaches Hassan directly.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.brand.name} · {site.brand.descriptor}
          </p>
          <p className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-accent">
              Privacy policy
            </Link>
            <span aria-hidden="true" className="text-bone-faint/50">
              ·
            </span>
            <Link to="/terms" className="transition-colors hover:text-accent">
              Terms &amp; conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
