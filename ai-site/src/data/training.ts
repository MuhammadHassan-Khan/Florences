import type { TrainingCourse } from './types';

/**
 * Training courses. Titles, descriptions, audiences, and skills are
 * final copy; the `detail` fields are explicit placeholders — replace
 * them when real syllabus / schedule / price details exist. Never add
 * unconfirmed prices or dates.
 */
export const trainingCourses: TrainingCourse[] = [
  {
    id: 'ai-fundamentals',
    index: '01',
    title: 'AI Fundamentals',
    description: 'Understand what AI is, how it works, and where it is useful.',
    audience: 'Complete beginners — students, professionals, and business owners.',
    skills: [
      'What AI, machine learning, and generative AI actually are',
      'How AI models produce output',
      'Where AI helps — and where it does not',
      'Plain-English AI vocabulary you can use with confidence',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
  {
    id: 'prompt-engineering',
    index: '02',
    title: 'Prompt Engineering',
    description:
      'Learn to write clear instructions, provide context, define constraints, and evaluate AI outputs.',
    audience: 'Anyone who already uses AI tools and wants reliably better results.',
    skills: [
      'Writing clear, specific instructions',
      'Providing useful context',
      'Defining constraints, format, and length',
      'Evaluating and iterating on outputs',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
  {
    id: 'modern-ai-tools',
    index: '03',
    title: 'Modern AI Tools',
    description:
      'Explore AI tools for research, writing, presentations, coding, image creation, and productivity.',
    audience: 'Students, creators, and professionals who want practical, everyday fluency.',
    skills: [
      'Research and summarisation workflows',
      'Writing, slides, and presentations',
      'Coding assistants and developer tools',
      'Image creation and visual workflows',
      'Personal productivity systems',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
  {
    id: 'ai-automation',
    index: '04',
    title: 'AI Automation',
    description: 'Learn how workflows, integrations, and AI agents can automate repetitive tasks.',
    audience: 'People who repeat the same tasks every week and want those hours back.',
    skills: [
      'Mapping a workflow before automating it',
      'Connecting tools and integrations',
      'Trigger-based automation patterns',
      'Knowing where a human should stay in the loop',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
  {
    id: 'ai-agents-applications',
    index: '05',
    title: 'AI Agents & Applications',
    description:
      'Explore how LLMs, tools, APIs, retrieval, and agent workflows can power practical applications.',
    audience: 'Builders ready to move from single prompts to working applications.',
    skills: [
      'How LLMs use tools and APIs',
      'Retrieval and working with your own documents',
      'Agent design and multi-step workflows',
      'Shipping a working prototype',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
  {
    id: 'ai-for-business',
    index: '06',
    title: 'AI for Business',
    description:
      'Discover ways to use AI for customer support, lead qualification, content operations, and business productivity.',
    audience: 'Founders, managers, and business owners who need practical results.',
    skills: [
      'AI-assisted customer support drafts',
      'Lead qualification workflows',
      'Content operations without losing quality',
      'Measuring time saved and quality kept',
    ],
    detail: {
      syllabus: 'Detailed module breakdown — will be published here.',
      schedule: 'Schedule: to be announced.',
      price: 'Price: to be announced.',
    },
  },
];
