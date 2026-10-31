import type { Project } from './types';

/**
 * Project showcase content.
 *
 * `projects` holds REAL projects only — it starts empty because no real
 * projects have been supplied yet. Do not invent completed projects,
 * statistics, or client results.
 *
 * To publish a project: add an entry with `published: true` and
 * `isExample: false`, and describe the problem, tools, and solution
 * honestly. Until then the section shows an honest empty state plus
 * `projectTemplate`, which demonstrates the card format.
 */
export const projects: Project[] = [];

export const projectTemplate: Project = {
  id: 'project-template',
  name: 'Your project name here',
  problem: 'Describe the real-world problem this project solves, in one or two sentences.',
  tools: ['Tool, API, or model one', 'Tool, API, or model two'],
  solution: 'Explain what you built, how it works, and what it replaced — keep it concrete.',
  links: [{ label: 'Repository or live demo link', url: '' }],
  isExample: true,
  published: false,
};

export function publishedProjects(): Project[] {
  return projects.filter((project) => project.published);
}
