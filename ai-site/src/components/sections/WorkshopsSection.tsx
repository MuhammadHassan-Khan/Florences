import { Link } from 'react-router-dom';

import { Notice } from '@/components/ui/Notice';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { WorkshopForm } from '@/components/workshops/WorkshopForm';
import { IconCalendar, IconClock, IconLocation, IconUsers } from '@/components/ui/icons';
import { workshops } from '@/data/workshops';

function WorkshopCard({ workshop }: { workshop: (typeof workshops)[number] }) {
  return (
    <article className="card flex h-full flex-col p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip chip-accent">{workshop.statusLabel}</span>
        <span className="chip">{workshop.fee === 'Free' ? 'Free' : `Fee: ${workshop.fee}`}</span>
        {workshop.isExample && <span className="badge-example">Sample listing</span>}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">{workshop.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-bone-dim">{workshop.description}</p>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-bone-faint">
        <IconUsers width={15} height={15} className="mt-0.5 shrink-0 text-accent" />
        <span>
          <span className="font-semibold text-bone-dim">Who it is for:</span> {workshop.audience}
        </span>
      </p>

      <dl className="mt-5 grid gap-3 border-t border-white/8 pt-5 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2.5 text-bone-dim">
          <IconCalendar width={16} height={16} className="shrink-0 text-accent" />
          <dt className="sr-only">Date</dt>
          <dd>{workshop.date}</dd>
        </div>
        <div className="flex items-center gap-2.5 text-bone-dim">
          <IconClock width={16} height={16} className="shrink-0 text-accent" />
          <dt className="sr-only">Time</dt>
          <dd>{workshop.time}</dd>
        </div>
        <div className="flex items-center gap-2.5 text-bone-dim">
          <IconUsers width={16} height={16} className="shrink-0 text-accent" />
          <dt className="sr-only">Format</dt>
          <dd>{workshop.format}</dd>
        </div>
        <div className="flex items-center gap-2.5 text-bone-dim">
          <IconLocation width={16} height={16} className="shrink-0 text-accent" />
          <dt className="sr-only">Location</dt>
          <dd>{workshop.location}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-6">
        <Link to="/#register" className="btn btn-ghost btn-sm w-full">
          Register your interest
        </Link>
      </div>
    </article>
  );
}

export function WorkshopsSection() {
  return (
    <Section
      id="workshops"
      eyebrow="Workshops"
      title="Practical AI workshops."
      lead="Live, hands-on sessions where you build something real in a few hours — designed for people who want to start using AI this week, not someday."
    >
      <Reveal className="mt-8">
        <Notice tone="info">
          <strong className="font-semibold">Sample schedule.</strong> Workshop dates, times,
          formats, and venues have not been confirmed yet, so they show as “To be announced” instead
          of invented details. Replace the examples in{' '}
          <code className="font-mono text-xs text-accent">src/data/workshops.ts</code> when your
          real sessions are set.
        </Notice>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {workshops.map((workshop, index) => (
          <Reveal key={workshop.id} delay={index * 90}>
            <WorkshopCard workshop={workshop} />
          </Reveal>
        ))}
      </div>

      {/* Registration block */}
      <div id="register" className="scroll-mt-24 mt-14">
        <Reveal>
          <div className="card p-6 md:p-9">
            <p className="eyebrow mb-4">Registration</p>
            <h3 className="text-2xl font-semibold tracking-tight">Register your interest</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone-dim">
              Launch workshops are free to join. Register once and you will be contacted with the
              confirmed date, time, and format — or join the waitlist for future training batches.
            </p>
            <div className="mt-7">
              <WorkshopForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
