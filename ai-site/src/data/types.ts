/** Shared content types. All site content lives in editable data files. */

export type TrainingCourse = {
  id: string;
  index: string;
  title: string;
  description: string;
  audience: string;
  skills: string[];
  /** Placeholder detail values — replace when real details exist. */
  detail: {
    syllabus: string;
    schedule: string;
    price: string;
  };
};

export type WorkshopStatus = 'open' | 'waitlist' | 'scheduled';

export type Workshop = {
  id: string;
  title: string;
  description: string;
  audience: string;
  fee: string;
  date: string;
  time: string;
  format: string;
  location: string;
  status: WorkshopStatus;
  statusLabel: string;
  /** True while the entry is sample content rather than a published workshop. */
  isExample: boolean;
};

export type ProductPrice = {
  amount: number;
  currency: 'PKR';
  /** Example pricing shown on the demo storefront. */
  isExample: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  details: string;
  includes: string[];
  /** null = "price to be announced" (excluded from subtotal math). */
  price: ProductPrice | null;
  isExample: boolean;
  cover: {
    /** Short glyph rendered on the generated cover art (e.g. 'P', 'W'). */
    glyph: string;
    tone: CoverTone;
  };
};

export type CoverTone = 'lime' | 'sand' | 'sky' | 'violet' | 'teal' | 'rose';

export type Project = {
  id: string;
  name: string;
  problem: string;
  tools: string[];
  solution: string;
  /** Optional screenshot or demo image path. */
  media?: string;
  links: { label: string; url: string }[];
  isExample: boolean;
  published: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};

export type JourneyStage = {
  stage: string;
  title: string;
  description: string;
};
