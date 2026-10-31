/**
 * Single source of site configuration.
 *
 * Nothing here is invented: contact details, social profiles, the demo
 * video URL, and the registration endpoint are all empty until the founder
 * supplies them. The UI renders honest "not configured" states for empty
 * values instead of fake links or fake success.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'AI Training', href: '/#training' },
  { label: 'Workshops', href: '/#workshops' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Digital Products', href: '/#products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const site = {
  brand: {
    /** Used as the primary brand name in the header, footer, and page titles. */
    name: 'Hassan Khan',
    monogram: 'HK',
    descriptor: 'AI Education',
    tagline: 'Understand AI. Use AI. Build with AI.',
  },

  founder: {
    name: 'Hassan Khan',
    role: 'AI builder & educator',
    intro:
      "I'm Hassan Khan, an AI builder focused on learning, building, and applying artificial intelligence to practical problems. Through workshops, demonstrations, and hands-on projects, I aim to make modern AI skills more accessible to students, creators, and businesses.",
    portrait: {
      /**
       * WHERE TO ADD YOUR PHOTOGRAPH:
       * drop the file at  ai-site/public/portraits/hassan-khan.jpg
       * then set `available: true` below.
       * While `available` is false the site shows a clearly labelled
       * placeholder — it never substitutes a stock-photo person.
       */
      src: '/portraits/hassan-khan.jpg',
      alt: 'Hassan Khan — AI builder and educator',
      placeholderSrc: '/portraits/portrait-placeholder.svg',
      available: false,
    },
    /** Add real professional profile links here when supplied. Empty = no links shown. */
    profiles: [] as { label: string; url: string }[],
  },

  contact: {
    /** e.g. 'you@example.com' — empty until supplied (never invented). */
    email: '',
    /** International digits only, e.g. '923001234567' — empty until supplied. */
    whatsapp: '',
    /** e.g. 'Karachi, Pakistan' — empty until supplied. */
    location: '',
  },

  demoVideo: {
    /**
     * Add the demonstration video URL (YouTube, Vimeo, or a direct .mp4)
     * and it is embedded on click. While empty, the section shows a clear
     * placeholder with setup instructions — no unrelated video is embedded.
     */
    url: '',
    title: 'From a real problem to a working AI solution',
    description:
      'A walkthrough of a practical AI workflow: identify a real problem, write an effective prompt, use an AI tool to generate a solution, review and improve the output, then show the final result.',
    workflow: [
      'Identify a real problem worth solving.',
      'Write an effective prompt with context and constraints.',
      'Use an AI tool to generate a solution.',
      'Review the output and improve what is weak.',
      'Show the final result and what it replaced.',
    ],
  },

  registration: {
    /** Form backend endpoint (Formspree, Getform, Basin, or your own API). */
    endpoint: import.meta.env.VITE_REGISTRATION_ENDPOINT ?? '',
  },

  checkout: {
    /** Real payment/checkout URL. Empty = demo storefront notice, never a fake payment. */
    url: import.meta.env.VITE_CHECKOUT_URL ?? '',
  },
};
