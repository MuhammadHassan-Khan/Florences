import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { journeyStages } from '@/data/journey';

/**
 * Five-stage progression from beginner to practical builder.
 * Desktop: horizontal connected rail. Mobile: vertical timeline.
 */
export function JourneySection() {
  return (
    <Section
      id="journey"
      eyebrow="Learning journey"
      title="From beginner to practical builder."
      lead="A clear path through the training — each stage builds on the last, and you always finish with something you made."
      className="border-y border-white/5 bg-ink-900"
    >
      <div className="relative mt-14">
        {/* Connecting rail (decorative) */}
        <div
          aria-hidden="true"
          className="absolute left-[22px] top-0 h-full w-px bg-white/10 md:left-[22px] md:right-[calc(20%-22px)] md:top-[22px] md:h-px md:w-auto"
        />

        <ol className="space-y-9 md:grid md:grid-cols-5 md:gap-6 md:space-y-0">
          {journeyStages.map((stage, index) => (
            <li key={stage.stage}>
              <Reveal delay={index * 70}>
                <div className="flex gap-5 md:block">
                  <span
                    className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/50 bg-ink-900 font-mono text-sm font-bold text-accent"
                    aria-hidden="true"
                  >
                    {stage.stage}
                  </span>
                  <div className="md:mt-5 md:pr-4">
                    <h3 className="text-base font-semibold leading-snug tracking-tight">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bone-dim">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
