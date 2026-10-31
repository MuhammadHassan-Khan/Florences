import { Link } from 'react-router-dom';

import { FounderPortrait } from '@/components/ui/FounderPortrait';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { IconArrow } from '@/components/ui/icons';
import { site } from '@/config/site';

const ROLES = ['AI builder', 'Educator', 'Workshops & live demos'];

export function FounderSection() {
  const profiles = site.founder.profiles;

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Learn with Hassan Khan."
      lead="Practical, hands-on AI education — no hype, no shortcuts, just skills you can use and show."
    >
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <FounderPortrait className="aspect-4/5 w-full" />
        </Reveal>

        <Reveal delay={90}>
          <p className="text-lg leading-relaxed text-bone md:text-xl">{site.founder.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Hassan's focus areas">
            {ROLES.map((role) => (
              <li key={role} className="chip">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {role}
              </li>
            ))}
          </ul>

          {profiles.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-4">
              {profiles.map((profile) => (
                <li key={profile.url}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
                  >
                    {profile.label}
                    <IconArrow width={14} height={14} />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#contact" className="btn btn-primary">
              Connect With Me
            </Link>
            <Link to="/#register" className="btn btn-ghost">
              Join a Workshop
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
