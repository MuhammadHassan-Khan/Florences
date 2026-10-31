import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { TrainingCard } from '@/components/training/TrainingCard';
import { trainingCourses } from '@/data/training';

export function TrainingSection() {
  return (
    <Section
      id="training"
      eyebrow="AI training"
      title="Learn AI by building with it."
      lead="Six focused tracks that move from understanding AI to building with it. Every track is practical — you leave with something you made, not just notes. Open a card to see what is included."
      className="border-y border-white/5 bg-ink-900"
    >
      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {trainingCourses.map((course, index) => (
          <Reveal key={course.id} delay={(index % 3) * 80}>
            <TrainingCard course={course} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
