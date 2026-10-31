# Hassan Khan — Practical AI Education & Training

A complete, responsive marketing + demo-storefront site for Hassan Khan's AI education brand
(**"Understand AI. Use AI. Build with AI."**), built as a standalone project in `ai-site/`.

- **Stack:** React 19 · TypeScript (strict) · Vite · React Router v7 · Tailwind CSS v4 · Vitest
- **Design:** dark charcoal base, off-white type, restrained lime accent, technical grid details,
  serif-free modern sans typography, scroll-reveal motion that respects `prefers-reduced-motion`.
- **Honesty policy:** nothing on this site pretends. No invented qualifications, testimonials,
  stats, prices, dates, contact details, projects, or social links — everything unconfirmed
  renders as a clearly-labelled placeholder or an explicit "not configured yet" state.

---

## Quick start

```bash
cd ai-site
npm install
npm run dev        # http://localhost:5174 (or next free port)
```

### Scripts

| Script                 | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                        |
| `npm run build`        | `tsc -b` (typecheck) + production bundle        |
| `npm run preview`      | Serve the production build locally              |
| `npm run typecheck`    | Strict TypeScript check only                    |
| `npm run lint`         | ESLint (flat config, React Hooks + refresh)     |
| `npm run test`         | Vitest unit + component tests (44 tests)        |
| `npm run format`       | Prettier write                                  |

**Verified green:** typecheck · lint · 44/44 tests · production build ·
Lighthouse **100 Accessibility / 100 Best Practices / 100 SEO** (zero failures).

---

## Where everything lives

```
ai-site/
├── public/
│   ├── favicon.svg                     # HK monogram favicon
│   ├── portraits/
│   │   └── portrait-placeholder.svg    # designed placeholder (shown until real photo added)
│   ├── _redirects                      # SPA fallback for Netlify
│   └── robots.txt
├── src/
│   ├── app/router.tsx                  # all routes (/, /products/:slug, /cart, /privacy, /terms, 404)
│   ├── config/
│   │   ├── site.ts                     # ← ALL business config: brand, portrait, contact, video, endpoints
│   │   └── sections.ts                 # ordered scroll-section ids
│   ├── data/                           # ← ALL editable content (typed, tested)
│   │   ├── training.ts                 # 6 training courses
│   │   ├── workshops.ts                # workshop listings (currently SAMPLE, flagged)
│   │   ├── products.ts                 # demo-storefront products (EXAMPLE, flagged)
│   │   ├── projects.ts                 # project showcase (empty + template)
│   │   ├── faqs.ts                     # FAQ Q&A
│   │   ├── journey.ts                  # 5-stage learning journey
│   │   └── types.ts                    # shared content types
│   ├── lib/                            # pure helpers (validation, price format, video resolver)
│   ├── cart/                           # cart store (localStorage), context, provider
│   ├── hooks/                          # useDocumentTitle, useActiveSection
│   ├── components/
│   │   ├── layout/                     # SiteLayout (skip-link, hash scroll), SiteHeader, SiteFooter
│   │   ├── sections/                   # Hero, Mission, Training, Workshops, Demo, Products,
│   │   │                               # Projects, Founder, Journey, FAQ, Contact
│   │   ├── training/ products/ workshops/  # card + form components
│   │   └── ui/                         # Section, Reveal, Notice, EmptyState, icons, portraits, covers
│   ├── pages/                          # Home, ProductDetail, Cart, Privacy, Terms, NotFound
│   └── test/                           # test setup + route smoke tests
```

---

## Editing content (no code knowledge needed)

| What                        | File                              | Notes                                                                 |
| --------------------------- | --------------------------------- | --------------------------------------------------------------------- |
| Training courses (6)        | `src/data/training.ts`            | Titles/descriptions final; `detail.*` are explicit "TBA" placeholders  |
| Workshop listings           | `src/data/workshops.ts`           | Currently `isExample: true` → badged "SAMPLE". Replace with real data  |
| Digital products            | `src/data/products.ts`            | All `isExample: true`, prices labelled "example". Edit or replace      |
| Projects                    | `src/data/projects.ts`            | Add `{ published: true, isExample: false, ... }` to show a real project |
| FAQ answers                 | `src/data/faqs.ts`                | Plain editable strings                                                 |
| Journey stages (5)          | `src/data/journey.ts`             |                                                                     |
| Brand, founder, contact     | `src/config/site.ts`              | See below                                                             |

### Founder portrait (currently a placeholder)

1. Copy Hassan's photo to **`ai-site/public/portraits/hassan-khan.jpg`**
2. In `src/config/site.ts` set **`founder.portrait.available = true`**

Until then the hero and About section show a clearly-labelled "PORTRAIT PLACEHOLDER" panel
with the add-a-photo instructions — the site never substitutes a stock or generated face.
If a configured image later fails to load, it automatically falls back to the placeholder.

### Contact details & social profiles

In `src/config/site.ts`:

```ts
contact: { email: 'you@example.com', whatsapp: '923001234567', location: 'Karachi, Pakistan' },
founder: { profiles: [{ label: 'LinkedIn', url: 'https://…' }] },
```

Empty values render honest "Not published yet" states (footer, contact section). Nothing is
invented — as soon as you fill them in, real links appear everywhere automatically.

### Demo video

In `src/config/site.ts → demoVideo.url` add a **YouTube, Vimeo, or direct `.mp4` URL**.
The video loads lazily on click (privacy-enhanced YouTube embed). While empty, the section
shows a labelled placeholder with setup instructions — no unrelated video is ever embedded.

---

## Form backend setup (`VITE_REGISTRATION_ENDPOINT`)

The workshop form **validates and works** out of the box, but honestly reports that nothing
was sent until you connect an endpoint.

1. Copy `.env.example` → `.env.local`
2. Set a form service that accepts JSON POSTs:

   ```bash
   VITE_REGISTRATION_ENDPOINT=https://formspree.io/f/yourFormId
   ```

   Works with Formspree, Getform, Basin, or your own API/serverless function.

3. Restart `npm run dev`.

**Payload sent:**

```json
{
  "source": "workshop-registration",
  "submittedAt": "2026-01-01T00:00:00.000Z",
  "fullName": "…", "email": "…", "whatsapp": "…",
  "role": "student", "experience": "beginner",
  "interest": "AI Fundamentals", "message": "…", "consent": true
}
```

**States:** submitting (double-submit blocked) → success (only after HTTP 2xx) / failed
(real error shown) / unconfigured (explicit "not sent anywhere" notice). A per-session
duplicate guard blocks re-submitting the same email.

## Payments / checkout (`VITE_CHECKOUT_URL`)

The shop is a **demo storefront**: example products, example prices, real cart logic
(localStorage), real subtotal math, honest empty state. Checkout is intentionally inert:

```bash
VITE_CHECKOUT_URL=https://your-payment-provider.example/checkout
```

When set, the cart's checkout button hands off to that URL in a new tab. When unset it shows
the "checkout not connected — no payment is taken" notice. **Never simulated payments.**

To sell real products: replace the examples in `products.ts` (`isExample: false`), set real
prices, connect `VITE_CHECKOUT_URL`, and update the Privacy/Terms drafts.

---

## Routes & deployment

| Route                | Page                                     |
| -------------------- | ---------------------------------------- |
| `/`                  | One-page site (sections anchored `/#id`) |
| `/products/:slug`    | Product detail (friendly unknown-slug fallback) |
| `/cart`              | Cart: empty / filled / demo checkout     |
| `/privacy`, `/terms` | Honest draft legal pages (marked as drafts) |
| anything else        | Friendly 404                             |

Build & deploy:

```bash
npm run build     # → dist/
```

The router needs a **SPA fallback** (all routes served as `index.html`):

- **Netlify:** `public/_redirects` is already included (`/*  /index.html  200`)
- **Vercel:** add `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`
- **Other hosts:** configure the equivalent history-fallback rule
- **Important:** relative asset URLs assume the site is served from the domain **root**
  (deploy at `/`, not a sub-path, or set Vite's `base`)

No server, database, or secrets are required. Only `VITE_*` values are embedded in the
bundle — never put private keys in `.env.local` variables named `VITE_*`.

---

## Quality assurance

- **44 automated tests** — form validation & honest submission states, cart math/persistence,
  video URL safety (rejects `javascript:` etc.), content invariants (no invented dates/prices,
  example flags), route smoke tests (home, cart, product detail, privacy, 404)
- **Lighthouse 100/100/100** (Accessibility / Best Practices / SEO), zero audit failures
- **Accessibility:** skip link, landmarks, labelled fields with `aria-invalid` +
  `aria-describedby`, accordion buttons with `aria-expanded`/`aria-controls`, focus-trapped
  mobile menu with Escape + scroll lock + focus return, live regions for cart/form status,
  `aria-current` navigation highlight, visible focus rings, reduced-motion support
- **Responsive:** fluid `clamp()` typography, single-column stacking below `lg`, no fixed
  pixel widths, no `nowrap` hazards (verified by automated source scan); overflow-checked at
  every step
- **No dead buttons:** every control either navigates, toggles real state, or shows an
  explicit explanation of what is not configured yet
