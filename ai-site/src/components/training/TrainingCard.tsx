import { useId, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconChevron, IconUsers } from '@/components/ui/icons';
import type { TrainingCourse } from '@/data/types';

/**
 * One training card with an expandable "View Training" panel.
 * The panel shows editable placeholder details (syllabus / schedule /
 * price) — never invented facts — plus a waitlist CTA.
 */
export function TrainingCard({ course }: { course: TrainingCourse }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const toggleId = useId();

  return (
    <article className="card flex h-full flex-col p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">{course.title}</h3>
        <span className="font-mono text-sm font-semibold text-accent">{course.index}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-bone-dim">{course.description}</p>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-bone-faint">
        <IconUsers width={15} height={15} className="mt-0.5 shrink-0 text-accent" />
        <span>
          <span className="font-semibold text-bone-dim">Who it is for:</span> {course.audience}
        </span>
      </p>

      <ul className="mt-4 space-y-2 border-t border-white/8 pt-4">
        {course.skills.map((skill) => (
          <li key={skill} className="flex items-start gap-2.5 text-sm text-bone-dim">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
            />
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <button
          type="button"
          id={toggleId}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
          className="btn btn-ghost btn-sm w-full justify-between"
        >
          {expanded ? 'Hide Training' : 'View Training'}
          <IconChevron
            width={15}
            height={15}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {expanded && (
        <div id={panelId} className="mt-4 rounded-xl border border-white/10 bg-ink-850 p-4">
          <h4 className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
            Course details
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-bone-dim">
            <li>{course.detail.syllabus}</li>
            <li>{course.detail.schedule}</li>
            <li>{course.detail.price}</li>
          </ul>
          <Link to="/#register" className="btn btn-primary btn-sm mt-4 w-full">
            Join the Waitlist
          </Link>
          <p className="mt-2.5 text-center text-[0.72rem] text-bone-faint">
            Choose “{course.title}” as your interest in the form.
          </p>
        </div>
      )}
    </article>
  );
}
