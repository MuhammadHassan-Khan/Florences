import { Link } from 'react-router-dom';

import { EmptyState } from '@/components/ui/EmptyState';
import { Notice } from '@/components/ui/Notice';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { IconExternal } from '@/components/ui/icons';
import { projectTemplate, publishedProjects } from '@/data/projects';
import type { Project } from '@/data/types';

function ProjectCard({ project }: { project: Project }) {
  const isTemplate = project.isExample || !project.published;

  return (
    <article
      className={`card flex h-full flex-col p-6 md:p-7 ${
        isTemplate ? 'border-dashed bg-ink-850/60' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {isTemplate ? (
          <span className="badge-example">Template — not a real project</span>
        ) : (
          <span className="chip chip-accent">Project</span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">{project.name}</h3>

      <dl className="mt-4 space-y-4 text-sm">
        <div>
          <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Problem being solved
          </dt>
          <dd className="mt-1.5 leading-relaxed text-bone-dim">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Tools &amp; technologies
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="chip">
                {tool}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Solution
          </dt>
          <dd className="mt-1.5 leading-relaxed text-bone-dim">{project.solution}</dd>
        </div>
      </dl>

      <div className="mt-auto border-t border-white/8 pt-5">
        {project.links.length === 0 || project.links.every((link) => !link.url) ? (
          <p className="text-xs text-bone-faint">
            Repository / live-demo link:{' '}
            <span className="text-bone-dim">to be added when available</span>
          </p>
        ) : (
          <ul className="flex flex-wrap gap-4">
            {project.links
              .filter((link) => link.url)
              .map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
                  >
                    {link.label}
                    <IconExternal width={13} height={13} />
                  </a>
                </li>
              ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const published = publishedProjects();

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="From learning to building."
      lead="This is where real projects and workflows will be shown — the problem each one solves, the tools used, and the result. No invented projects, no fake statistics: only work that actually exists."
      className="border-y border-white/5 bg-ink-900"
    >
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal className="lg:col-span-2">
          {published.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {published.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No projects published yet"
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/#demo" className="btn btn-primary btn-sm">
                    Watch the workflow demo
                  </Link>
                  <Link to="/#register" className="btn btn-ghost btn-sm">
                    Get notified about new work
                  </Link>
                </div>
              }
            >
              The showcase is ready — real projects will appear here once Hassan publishes them.
              Until then, nothing is claimed. The dashed card below shows exactly how a project will
              be presented.
            </EmptyState>
          )}
        </Reveal>

        <Reveal delay={80} className={published.length > 0 ? '' : 'lg:col-span-2'}>
          <ProjectCard project={projectTemplate} />
        </Reveal>
      </div>

      <Reveal className="mt-8">
        <Notice tone="info">
          To publish a real project, add it to{' '}
          <code className="font-mono text-xs text-accent">src/data/projects.ts</code> with{' '}
          <code className="font-mono text-xs text-accent">published: true</code> — the template card
          disappears automatically.
        </Notice>
      </Reveal>
    </Section>
  );
}
