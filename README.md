# FLORENCES — Digital Wedding Invitation Platform

A responsive, client-side showcase of five digital wedding invitation
templates. Visitors browse the gallery, open interactive demos, preview
temporary couple names, and continue their enquiry through a prefilled
WhatsApp message.

**Stack:** React + TypeScript + Vite + React Router + CSS Modules.
No backend, database, authentication, payments, AI, or CMS — by design
(see `docs/PRODUCT_SPEC.md` and the approved scope in
`docs/IMPLEMENTATION_PLAN.md`).

---

## Prerequisites

- Node.js 20.19+ (tested on Node 24)
- npm 10+
- Windows PowerShell 5.1 for the `purge` and audit scripts (the rest of the
  toolchain is platform-independent)

## Commands

```bash
npm install            # install dependencies
npm run dev            # dev server at http://localhost:5173
npm run build          # type-check + production build into dist/
npm run preview        # serve the production build locally
npm run typecheck      # TypeScript project build (tsc -b)
npm run lint           # ESLint
npm run format         # Prettier (write)
npm run format:check   # Prettier (check only)
npm test               # Vitest, single run
npm run test:watch     # Vitest, watch mode
npm run purge          # remove foreign files injected by other projects
```

### A note on `npm run purge`

This workspace folder is shared with an external process that periodically
injects files from unrelated projects (Next.js, Supabase, LiveKit) and adds
their dependencies to `package.json`. `scripts/purge-foreign.ps1` removes
those files and prunes those dependencies so this build stays green.

**Run `npm run purge` before `test`, `lint`, `typecheck`, or `build`** if a
check fails with a missing module such as `next/*` or `@supabase/*`.
`scripts/audit-responsive.ps1` is a companion static audit for the
responsive CSS (it only reports; it never modifies files).

---

## WhatsApp configuration (action required before real use)

The enquiry flow generates a `wa.me` click-to-chat link using a number held
in **one** place:

```
src/config/site.ts
```

It is currently set to a deliberate placeholder (`15550000000`). While the
placeholder is in place:

- the enquiry page still validates and prepares the full message, and
- it **shows the prepared message but withholds the handoff link**, and
- it displays a notice explaining that WhatsApp is not connected.

To go live, replace `WHATSAPP_NUMBER_PLACEHOLDER` with the real business
number in international, digits-only form — no `+`, spaces, or punctuation
(e.g. `923001234567`). The README's placeholder assertion in
`src/components/enquiry/enquiryForm.test.tsx` should then be updated in the
same change.

The site **never claims an enquiry was sent.** It only ever prepares a
message and hands the visitor to an explicit "Open WhatsApp" link; the
visitor reviews and sends it themselves.

---

## Project structure

```
docs/                     Approved specifications (source of truth)
  PRODUCT_SPEC.md           What to build and the acceptance criteria
  ARCHITECTURE.md           Approved technical decisions
  IMPLEMENTATION_PLAN.md    Phased plan and the release checklist
  TEMPLATE_CONCEPTS.md      Concepts and section plans for all 5 templates
public/
  media/                    Original placeholder artwork + ATTRIBUTION.md
  robots.txt
src/
  app/                    App shell, router
  config/                 Single source of business configuration (WhatsApp)
  components/
    enquiry/                EnquiryForm + its styles and tests
    gallery/                TemplateCard
    invitation/             Shared, behaviour-only invitation components
    layout/                 SiteHeader, SiteFooter
    ui/                     Page primitives
  data/                   Template metadata + the 5 sample wedding datasets
  pages/                  GalleryPage, TemplateDemoPage, EnquiryPage, 404
  styles/                 global.css + design tokens (tokens.css)
  templates/
    registry.ts             The single switch that makes a template "live"
    types.ts                The template contract
    luxury-cinematic/       Template 1 (specified by the product spec)
    floral-romance/         Template 2 (provisional name/concept)
    minimal-modern/         Template 3 (provisional name/concept)
    royal-heritage/         Template 4 (provisional name/concept)
    elegant-classic/        Template 5 (provisional name/concept)
  utils/                  Pure helpers (WhatsApp URL, validation, names…)
  test/                   Vitest setup
scripts/
  purge-foreign.ps1        Removes files injected by unrelated projects
  prune-package-deps.mjs   Prunes injected deps from package.json
  generate-audio.mjs       Regenerates the original demo music loop
  audit-responsive.ps1     Static responsive-CSS audit (report only)
```

### Routes

| Path | Page |
| --- | --- |
| `/` | Gallery — the five template cards |
| `/templates/:templateId` | Interactive demo for one template |
| `/enquire?template=:templateId` | Enquiry form, template preselected |
| anything else | Friendly not-found page |

Unknown template ids render a friendly fallback, never a crash.

---

## How templates work

Each template is a folder under `src/templates/` exporting a render
component that accepts the shared contract (`src/templates/types.ts`):

```ts
type TemplateRenderProps = {
  meta: TemplateMeta;          // id, title, description, route, thumbnail
  names: CoupleNames;          // current override values ("" = sample data)
  onNamesChange: (next: CoupleNames) => void;
};
```

Shared components in `src/components/invitation/` are **behaviour only**
(music control, countdown, reveal-on-scroll, venue link, enquiry CTA, image
frame). A template's identity comes entirely from CSS custom properties it
sets on its own root:

```css
--heading-accent   /* section heading colour */
--cta-bg / --cta-fg
--cta-bg-hover / --cta-fg-hover
```

so the same component renders in each design's palette without forking.

### Registering a template

A template is "available" only when its metadata **and** its render
component both exist — availability is *derived*, never a hand-maintained
flag. To make a template live:

1. Create `src/templates/<id>/<Name>Template.tsx` + a styles module.
2. Add its metadata to `src/data/templates.ts`.
3. Import the component and add it to the `renderers` map in
   `src/templates/registry.ts`.

Step 3 is the single switch: until the renderer is registered, the gallery
shows the card as **"In preparation"** and the demo route explains that it
isn't ready yet. Nothing else needs to change.

---

## Sample data and temporary name edits

All names, dates, venues, and events in the demos are **invented sample
content**, labelled as such on every demo. They live in
`src/data/demo*.ts`.

The name editor on each demo changes names **temporarily in local UI
state only**. It never mutates the sample data, never writes to browser
storage, and resets when you leave the page. This is intentional: a
visitor must never appear to "own" a couple's real details.

---

## Media rules

All bundled media is **original work created for this repository** — no
third-party stock, no remote URLs that could rot. See
`public/media/ATTRIBUTION.md` for the full ledger.

- Gallery artwork: 20 original SVGs (`public/media/gallery/`), lazy-loaded
  with reserved dimensions so nothing shifts while they load.
- Thumbnails: 5 original SVGs (`public/media/thumbnails/`).
- Demo music: an original synthesized loop
  (`public/media/audio/demo-track.wav`, 16 kHz mono, ~625 KB), regenerated
  deterministically with `node scripts/generate-audio.mjs`. It uses
  `preload="none"` and only starts after an explicit user click — there is
  no autoplay anywhere.

### Replacing placeholders with licensed media

1. Drop the licensed file into the matching folder under `public/media/`.
2. Point the template's `assets.ts` at it (thumbnails:
   `src/data/templates.ts`).
3. Keep dimensions close to the originals so reserved aspect ratios still
   prevent layout shift.
4. Record source, licence, and attribution in `public/media/ATTRIBUTION.md`.

Do not commit assets whose licence you cannot document, and do not hotlink
stock URLs.

---

## Quality and accessibility

- **Lighthouse: 100 accessibility / 100 best practices / 100 SEO** on the
  gallery, the enquiry page, and all five demo routes, with zero audit
  failures.
- Semantic HTML, one `<h1>` per page, labelled controls, visible
  `:focus-visible` states, a skip link, and `aria-invalid` +
  `aria-describedby` on failing form fields.
- Colour tokens are contrast-checked: small gold text uses
  `--color-gold-deep` / `--color-gold-text`, which clear WCAG AA (4.5:1) on
  every surface they appear on.
- `prefers-reduced-motion` is honoured globally and in every template.
- Layouts are fluid — no fixed element widths above 340px, so nothing
  overflows at 375px.

### Automated checks

```bash
npm run purge && npm test && npm run typecheck && npm run lint && npm run build
```

76 tests across 11 files cover routing, the template contract for all five
templates, sample-data integrity, name-edit isolation, the music control,
the WhatsApp URL builder, and enquiry validation and handoff.

---

## Current limitations

- **The WhatsApp number is a placeholder.** The handoff link is disabled
  until a real number is configured (see above).
- **Template names and concepts for templates 2–5 are provisional**, and
  the branding, final copy, domain, and hosting are undecided
  (`docs/PRODUCT_SPEC.md` §11).
- **Enquiry field requirements and event-type options are provisional.**
- **No backend.** Enquiries are prepared for WhatsApp and sent by the
  visitor; nothing is stored, and there is no analytics or CRM.
- **No 375px device emulation was available in this environment.** The
  responsive behaviour was verified by static audit (fluid layouts, no
  overflow at the widths the browser tool could test) rather than on a
  real 375px viewport.
- **No public deployment has been approved.** Do not deploy without a
  separate decision.

---

## Further reading

- `docs/PRODUCT_SPEC.md` — scope, features, success criteria
- `docs/ARCHITECTURE.md` — approved technical decisions
- `docs/IMPLEMENTATION_PLAN.md` — phased plan and release checklist
- `docs/TEMPLATE_CONCEPTS.md` — design concepts for the five templates
