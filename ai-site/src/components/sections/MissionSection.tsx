import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Understand',
    body: 'Learn the fundamentals of AI, machine learning, generative AI, and AI agents — explained in plain language, without unnecessary jargon.',
  },
  {
    number: '02',
    title: 'Apply',
    body: 'Use AI tools for research, productivity, content, learning, and business workflows — real tasks you already do every week.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Create practical projects, automations, and AI-powered applications — and keep them as proof of what you can do.',
  },
];

export function MissionSection() {
  return (
    <Section
      id="mission"
      eyebrow="The mission"
      title="AI is more than a tool. It's a skill you can build."
      lead="Most people only hear about AI. This site is about moving from hearing about it to using it confidently — one practical step at a time, starting from wherever you are today."
    >
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <Reveal key={principle.number} delay={index * 90}>
            <article className="card h-full p-6 md:p-7">
              <p className="font-mono text-sm font-semibold text-accent">{principle.number}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">{principle.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
