import type { Workshop } from './types';

/**
 * Workshop listings.
 *
 * The entries below are SAMPLE content used to demonstrate the workshop
 * cards (each is flagged `isExample: true` and badged "SAMPLE" in the UI).
 * Replace them with real workshop details — dates, times, formats, and
 * locations must never be invented.
 */
export const workshops: Workshop[] = [
  {
    id: 'ai-fundamentals-live',
    title: 'Practical AI Fundamentals — Live Workshop',
    description:
      'A hands-on introduction for people who have never used AI seriously. We start with what AI actually is, then move straight into using modern AI tools on real tasks you recognise.',
    audience: 'Students and complete beginners',
    fee: 'Free',
    date: 'To be announced',
    time: 'To be announced',
    format: 'To be announced',
    location: 'To be announced',
    status: 'waitlist',
    statusLabel: 'Waitlist open',
    isExample: true,
  },
  {
    id: 'prompt-engineering-practice',
    title: 'Prompt Engineering in Practice — Hands-on Session',
    description:
      'Write prompts that get usable results the first time. Practice context, constraints, and evaluation with live examples, then leave with your own reusable prompt set.',
    audience: 'Creators, professionals, and students who already try AI tools',
    fee: 'To be announced',
    date: 'To be announced',
    time: 'To be announced',
    format: 'To be announced',
    location: 'To be announced',
    status: 'waitlist',
    statusLabel: 'Waitlist open',
    isExample: true,
  },
];
