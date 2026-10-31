# Template Concepts & Section Plans

> **Status:** `luxury-cinematic` is specified by `PRODUCT_SPEC.md` and is
> **stable**. The concepts, ids, titles and copy for templates 2–5 are
> **PROVISIONAL** — they are open decisions (`PRODUCT_SPEC.md` §11) and are
> expected to be confirmed or renamed with the business before release.
>
> This document satisfies Phase 4 of `IMPLEMENTATION_PLAN.md`: the approach
> for all five templates is defined *before* they are implemented.

## 1. Ground rules

1. **Five templates, five identities.** Each template owns its layout,
   palette, type pairing, motion personality and section order in its own
   module (`src/templates/<id>/`). Nothing template-specific lives outside
   that folder.
2. **Share behaviour, never structure.** Shared components (`src/components/invitation/`)
   provide *behaviour* — a countdown that counts, a venue link that builds a
   map URL, a music control that plays on explicit activation. How they are
   arranged, sized, coloured and animated is decided per template.
3. **No universal page builder.** There is no section schema, block editor,
   layout engine, theme switcher or visual editor, and none will be added.
   Adding one would force all five designs into one structure, which the
   spec explicitly forbids (`PRODUCT_SPEC.md` §5).
4. **One registry, explicit imports.** Renderers are imported statically in
   `src/templates/registry.ts`. A template is "available" only because a
   renderer is registered — never because a flag says so.
5. **Accessibility floor applies to every template** (see §7).

## 2. Shared inventory (behaviour only)

| Component / util | Provides | Must NOT dictate |
| --- | --- | --- |
| `Countdown` + `partsUntil` | live D/H/M/S maths, `role="timer"`, invalid-target guard | position, size, styling |
| `EventDetails` | ordered list semantics for a `WeddingEvent[]` | which events, how many, card design |
| `VenueLink` + `buildMapUrl` | map URL, `target="_blank"` + `rel`, screen-reader hint | link wording/layout |
| `MusicControl` | play/pause state, `aria-pressed`, unavailable fallback | placement, label styling |
| `Reveal` | one-shot IntersectionObserver reveal, reduced-motion bypass | what is revealed, distance/easing |
| `SectionHeading` | eyebrow + heading semantics | type scale, alignment |
| `DemoNameEditor` | temporary name fields, reset, "not saved" notice | panel placement (page-level, above demo) |
| `EnquiryCta` | link to `/enquire?template=<id>` + honest "nothing sent" note | button/CTA design |
| `resolveNames` | override → sample fallback, never mutates sample data | — |

Template-specific work — hero composition, gallery grid, section order,
palette, typography pairing, motion signature — stays inside each template
module.

## 3. Template concepts (ids provisional except where noted)

### 3.1 `luxury-cinematic` — Luxury Cinematic (STABLE, implemented)

- **Identity:** dark, gold-lit, film-title treatment. Deep ink background,
  gold light sweeps, soft bokeh, large serif display names, slow cinematic
  pacing.
- **Palette/type:** ink `#101014` ground, gold `#c9a24b` accents,
  `--font-display` for names, generous `clamp()` type scale.
- **Motion:** slow sweep + bokeh drift on the hero, one-shot scroll reveals
  via `Reveal`, everything disabled under reduced motion.
- **Section plan:** Hero → Invitation (names, date, countdown) →
  Celebrations (3 events + map links) → Gallery (4 stills) → Closing +
  Enquiry CTA; music control anchored to the template.
- **Demo data:** `src/data/demoWeddingData.ts` (Aisha & Bilal — sample only).

### 3.2 `floral-romance` — Floral Romance (provisional)

- **Identity:** soft botanical illustration, warm pastels, gentle and
  romantic — the "light" counterpart to Luxury Cinematic's dark drama.
- **Palette/type:** ivory/rose (`--color-rose`), sage accents; display serif
  with lighter weight, airy line-height.
- **Motion:** petals/leaves drift slowly; reveals rise 8–12px only;
  effectively static under reduced motion.
- **Section plan:** Botanical hero → "Save the date" introduction +
  countdown → Story/date panel → Events (2-column on desktop) →
  Gallery (soft-focus stills) → Closing + Enquiry CTA → music control.
- **Distinct from 3.1:** light ground, no bokeh/sweep, vertical rhythm
  instead of cinematic pacing.

### 3.3 `minimal-modern` — Minimal Modern (provisional)

- **Identity:** editorial magazine layout — rules, columns, oversized
  numerals, lots of whitespace, near-zero decoration.
- **Palette/type:** paper white + ink, one restrained accent; body font
  leads, display serif used only for names. Left-aligned, asymmetric grid.
- **Motion:** none beyond quick opacity reveals (≤200ms); the *absence* of
  motion is the signature.
- **Section plan:** Typographic hero (names as the artwork) → date/index
  strip with countdown → Events as a tabular schedule (list + times, map
  links as inline text actions) → compact gallery strip → closing line +
  Enquiry CTA → music control.
- **Distinct:** no imagery-led hero, no colour wash, schedule-first.

### 3.4 `royal-heritage` — Royal Heritage (provisional)

- **Identity:** Mughal arches, jaali lattice, regal emerald + antique gold;
  ceremonial and ornamental.
- **Palette/type:** emerald ground/gold linework; high-contrast display
  serif with wide `--tracking-wide` eyebrows; symmetric centred layout.
- **Motion:** arch/framing elements draw in on load; reveals are symmetrical
  (fade + tiny scale), disabled under reduced motion.
- **Section plan:** Arched hero with ornamental frame → formal invitation
  wording + countdown inside a jaali-bordered panel → Events as ceremonial
  cards under arches → Gallery in arched frames → Closing benediction +
  Enquiry CTA → music control.
- **Distinct:** ornament frame is the layout device; symmetry vs. 3.1's
  cinematic asymmetry.

### 3.5 `elegant-classic` — Elegant Classic (provisional)

- **Identity:** timeless ivory & champagne gold, formal calligraphic
  detailing, engraved-invitation feel.
- **Palette/type:** ivory `--color-ivory` ground, champagne gold rules and
  hairline borders; classic serif centred, small-caps eyebrows.
- **Motion:** understated — hairline rules draw across, reveals are simple
  fades.
- **Section plan:** Engraved-plate hero → invitation wording + countdown →
  Events as a formal engraved list with dotted leaders → gallery with thin
  gold frames → closing + Enquiry CTA → music control.
- **Distinct:** formal stationery language; not ornamental like 3.4, not
  typographic/editorial like 3.3.

## 4. Differentiation checklist (checked at Phase 5 review)

| Dimension | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 |
| --- | --- | --- | --- | --- | --- |
| Ground | dark ink | ivory/pastel | paper white | emerald | ivory |
| Accent | gold light | rose/sage | single ink accent | antique gold | champagne gold |
| Hero device | bokeh + light sweep | botanical illustration | typography itself | arch + jaali frame | engraved plate |
| Layout | centred cinematic | soft centred/2-col | asymmetric editorial | strict symmetry | centred formal |
| Motion | slow sweeps | gentle drift | near-static | draw-in ornament | hairline fades |

Each row must be visibly different in a side-by-side screenshot review;
if two templates share a row, the design is not done.

## 5. Data & media rules (all templates)

- Sample content is labelled demo data on screen; it is never presented as
  a real couple or venue.
- Temporary name edits resolve at render time; sample data objects are never
  mutated (verified by tests).
- Media is original/licensed and stored in `public/media/` with
  `ATTRIBUTION.md`; no remote stock URLs.
- Images reserve width/height (no layout shift) and fall back inline on
  error; galleries lazy-load below the fold.
- Audio starts only on explicit user activation; failure degrades to a
  labelled disabled control.

## 6. Accessibility & reduced-motion floor (all templates)

- One `h1` per demo route; sections labelled with `aria-label`.
- Keyboard-reachable controls with visible focus; `aria-pressed` on music;
  `role="timer"` on countdown; map links announce "opens in a new tab".
- Text never baked into images; decorative layers `aria-hidden`.
- `prefers-reduced-motion: reduce` disables sweeps/drifts/reveals — content
  appears immediately and fully (`Reveal` bypasses the observer).
- Verified at 375px and 1440px with no horizontal overflow.

## 7. Open decisions

- Final names/ids/copy for templates 2–5 (§3.2–3.5) — **provisional**.
- Business WhatsApp number (placeholder in config until supplied).
- Final event types offered for the enquiry form.
