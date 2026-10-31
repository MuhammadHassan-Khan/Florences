import type { JourneyStage } from './types';

/** The beginner-to-builder progression shown in the Learning Journey section. */
export const journeyStages: JourneyStage[] = [
  {
    stage: '01',
    title: 'Understand AI fundamentals',
    description:
      'Learn what AI, machine learning, generative AI, and agents actually are — without the jargon.',
  },
  {
    stage: '02',
    title: 'Use AI tools effectively',
    description:
      'Work with modern AI tools for research, writing, presentations, coding, and everyday tasks.',
  },
  {
    stage: '03',
    title: 'Practice prompting and workflows',
    description:
      'Write prompts with context and constraints, and design multi-step workflows you can repeat.',
  },
  {
    stage: '04',
    title: 'Build projects and automations',
    description:
      'Turn practice into working things: automations, tools, and AI-powered applications.',
  },
  {
    stage: '05',
    title: 'Evaluate, improve, and portfolio',
    description:
      'Check your results, fix what fails, improve the solution, and build a portfolio that proves the skill.',
  },
];
