import type { Product } from './types';

/**
 * Digital products for the demo storefront.
 *
 * Every entry is flagged `isExample: true` and badged "EXAMPLE" in the UI:
 * these are sample listings that demonstrate the shop interface. They are
 * NOT real products for sale. Replace them with real products, set
 * `isExample: false`, and connect a payment provider (VITE_CHECKOUT_URL)
 * before taking money.
 *
 * `price: null` renders as "Price: to be announced" and is excluded from
 * subtotal calculations.
 */
export const products: Product[] = [
  {
    slug: 'ultimate-prompt-library',
    name: 'Ultimate Prompt Library',
    category: 'Prompt Libraries',
    description:
      'A growing collection of tested prompts for study, work, and content — organised by task, with notes on what to change for your own use.',
    details:
      'A prompt library only helps if you can find the right starting point quickly. Each prompt is grouped by task, shows a worked example, and explains which parts to adapt for your situation. Start from a tested base instead of a blank box.',
    includes: [
      'Prompt templates organised by use case',
      'Before-and-after examples',
      'Customisation notes',
      'Free updates as the library grows',
    ],
    price: { amount: 1500, currency: 'PKR', isExample: true },
    isExample: true,
    cover: { glyph: 'P', tone: 'lime' },
  },
  {
    slug: 'ai-workflow-templates',
    name: 'AI Workflow Templates',
    category: 'AI Workflow Templates',
    description:
      'Ready-to-adapt workflows for research, writing, and productivity — map a task, plug in an AI step, and get a repeatable process.',
    details:
      'Each template lays out the steps of a real workflow: what happens before the AI step, what the prompt needs, and how to check the result. Adapt them to your own tools and repeat them every week.',
    includes: [
      'Research and summarisation workflow',
      'Writing and editing workflow',
      'Presentation-building workflow',
      'Setup and adaptation notes',
    ],
    price: { amount: 2500, currency: 'PKR', isExample: true },
    isExample: true,
    cover: { glyph: 'W', tone: 'sky' },
  },
  {
    slug: 'practical-ai-guide',
    name: 'Practical AI Guide for Beginners',
    category: 'Guides & Ebooks',
    description:
      'A plain-English guide to how AI works, what it can and cannot do, and how to start using it this week.',
    details:
      'Written for readers who want practical understanding rather than theory. Short chapters, real examples, and a first-week plan you can follow with free tools.',
    includes: [
      'How modern AI works, explained simply',
      'What AI is good at — and what it is not',
      'A first-week practice plan',
      'Glossary of AI terms',
    ],
    price: { amount: 950, currency: 'PKR', isExample: true },
    isExample: true,
    cover: { glyph: 'G', tone: 'sand' },
  },
  {
    slug: 'automation-starter-pack',
    name: 'Automation Starter Pack',
    category: 'Automation Templates',
    description:
      'Starter automation blueprints that connect everyday tools so repetitive steps run themselves — with notes on where a human should stay in the loop.',
    details:
      'Blueprints for the automations people set up first: file handling, data entry, notifications, and content pipelines. Each one lists the trigger, the steps, the failure cases, and the approval point.',
    includes: [
      '8 starter automation blueprints',
      'Trigger and failure-case notes',
      'Human-approval checkpoints',
      'Tool-agnostic design notes',
    ],
    price: { amount: 2950, currency: 'PKR', isExample: true },
    isExample: true,
    cover: { glyph: 'A', tone: 'violet' },
  },
  {
    slug: 'project-starter-kit',
    name: 'AI Project Starter Kit',
    category: 'Project Starter Kits',
    description:
      'Scaffolding for your first AI project: problem-framing worksheets, architecture sketches, prompt patterns, and a build checklist.',
    details:
      'Most first projects fail because the problem was never framed clearly. This kit forces the framing first, then gives you the technical scaffolding to build and check a working prototype.',
    includes: [
      'Problem-framing worksheets',
      'Architecture sketch templates',
      'Reusable prompt patterns',
      'Build-and-review checklist',
    ],
    price: { amount: 1950, currency: 'PKR', isExample: true },
    isExample: true,
    cover: { glyph: 'K', tone: 'teal' },
  },
  {
    slug: 'student-learning-resources',
    name: 'Student Learning Resources',
    category: 'Student Resources',
    description:
      'Cheat sheets, study prompts, and practice exercises for students learning to use AI responsibly in their coursework.',
    details:
      'A starter pack for students: one-page cheat sheets, study prompts for revision and research, and exercises that build the habit of checking AI output instead of trusting it.',
    includes: [
      'AI fundamentals cheat sheet',
      'Study and research prompt set',
      'Practice exercises with checklists',
      'Responsible-use guidelines',
    ],
    price: null,
    isExample: true,
    cover: { glyph: 'S', tone: 'rose' },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
