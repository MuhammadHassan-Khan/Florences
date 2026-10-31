import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Notice } from '@/components/ui/Notice';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { IconArrow } from '@/components/ui/icons';
import { site } from '@/config/site';

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/8 py-4 last:border-b-0">
      <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bone-faint">
        {label}
      </span>
      <span className="min-w-0 text-right text-sm">{children}</span>
    </div>
  );
}

export function ContactSection() {
  const { email, whatsapp, location } = site.contact;
  const profiles = site.founder.profiles;
  const hasAnyContact = Boolean(email || whatsapp || location || profiles.length > 0);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Talk to Hassan."
      lead="Questions about a workshop, a training batch, or a project you want to build? Start here."
      className="border-t border-white/5 bg-ink-900"
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Contact methods */}
        <Reveal>
          <div className="card h-full p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">Direct contact</h3>

            <div className="mt-4">
              <ContactRow label="Email">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="text-accent transition-colors hover:text-accent-strong"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="text-bone-faint">Not published yet</span>
                )}
              </ContactRow>

              <ContactRow label="WhatsApp">
                {whatsapp ? (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent transition-colors hover:text-accent-strong"
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <span className="text-bone-faint">Not published yet</span>
                )}
              </ContactRow>

              <ContactRow label="Location">
                <span className={location ? 'text-bone-dim' : 'text-bone-faint'}>
                  {location || 'Not published yet'}
                </span>
              </ContactRow>

              {profiles.map((profile) => (
                <ContactRow key={profile.url} label={profile.label}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent transition-colors hover:text-accent-strong"
                  >
                    View profile
                  </a>
                </ContactRow>
              ))}
            </div>

            {!hasAnyContact && (
              <Notice tone="info" className="mt-5">
                No contact details have been supplied yet, so none are invented here. Add them in{' '}
                <code className="font-mono text-xs text-accent">src/config/site.ts</code> and they
                appear on this page and in the footer automatically.
              </Notice>
            )}
          </div>
        </Reveal>

        {/* Start here */}
        <Reveal delay={90}>
          <div className="card h-full p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">Not sure where to start?</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-dim">
              Register your interest and, in the message box, mention your goal — student, creator,
              business, or just curious. Your details go straight to the registration list, and you
              will be contacted with confirmed details when a session is scheduled.
            </p>

            <ol className="mt-6 space-y-4">
              {[
                'Fill in the one-minute registration form.',
                'Get confirmed details (date, time, format) when a batch opens.',
                'Show up ready to build something real.',
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm font-semibold text-accent">{`0${index + 1}`}</span>
                  <span className="text-sm leading-relaxed text-bone-dim">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#register" className="btn btn-primary">
                Register your interest
              </Link>
              <Link to="/#training" className="btn btn-ghost">
                Explore AI Training
                <IconArrow width={15} height={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
