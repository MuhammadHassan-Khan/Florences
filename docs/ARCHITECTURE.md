# Technical Architecture — Wedding Invitation Platform

**Status:** MVP architecture  
**Frontend:** React + TypeScript + Vite  
**Initial runtime:** Local development; static deployment can be considered after validation  
**Backend/database:** Not included in the MVP

## 1. Architectural Principles

1. Keep the first release static and client-side unless a verified requirement demands a backend.
2. Separate the marketing/gallery experience from the invitation demo experience.
3. Use a hybrid template architecture: shared primitives and functional components, unique template layouts and motion.
4. Keep template data, assets, and rendering logic separate.
5. Keep business contact configuration in one place.
6. Prefer the simplest technology that satisfies the interaction.
7. Treat the reference website as inspiration for product mechanics, not as permission to copy its code, branding, or media.
8. Do not add authentication, payments, a database, AI features, or a CMS without an approved scope change.

## 2. Proposed Stack

- React
- TypeScript
- Vite
- React Router for gallery, demo, and enquiry routes
- CSS Modules or well-scoped plain CSS for template-specific styling
- GSAP only where complex, sequenced animation materially benefits from it
- Native CSS transitions and Web Animations API for simpler motion
- Canvas only for effects that genuinely need pixel-level drawing, such as a scratch interaction
- Vitest and React Testing Library for component/interaction tests
- Playwright may be added for browser-level end-to-end tests if setup cost is justified
- ESLint and Prettier for consistent code quality

### Styling recommendation

Use CSS-first styling with design tokens and component-scoped styles. Avoid adopting a large styling framework solely for convenience. GSAP should not be used for every animation; use CSS for simple transitions and reserve GSAP for timeline orchestration, scroll sequencing, or complex choreography. Any scroll-driven motion must have a reduced-motion fallback.

## 3. System Layers

### A. Presentation layer
Responsibilities:
- Gallery and navigation.
- Template cards.
- Demo page shell.
- Enquiry form.
- Responsive behavior and accessible controls.

### B. Template registry and configuration
Responsibilities:
- Map stable template IDs to metadata and render components.
- Provide title, description, thumbnail, route, and preview behavior.
- Avoid dynamic code generation or arbitrary imports based on untrusted input.

### C. Invitation experience layer
Responsibilities:
- Render the selected template.
- Use template-specific layout and section ordering.
- Compose shared components when appropriate.
- Keep names and other preview-only data in local React state.

### D. Shared invitation components
Potential components:
- Music control and audio state.
- Event details.
- Venue/map link.
- Countdown.
- Gallery.
- RSVP/contact call-to-action, only as a demo interaction unless backend behavior is later approved.
- Section heading and decorative elements.

Shared components should expose typed props and must not impose one layout on all templates.

### E. Media and asset layer
Responsibilities:
- Store optimized images, video, and audio under predictable paths.
- Use video poster images and fallback states.
- Lazy-load below-the-fold media where suitable.
- Respect media licensing and keep a record of asset source/licence.
- Keep large media out of JavaScript bundles; serve as static assets.
- Prefer compressed, mobile-appropriate video and image sizes.

### F. Enquiry/WhatsApp layer
Responsibilities:
- Validate the enquiry form.
- Normalize values for display.
- Build a plain-text message.
- URL-encode the message.
- Use a single configurable business phone number.
- Hand off to WhatsApp after an explicit user action.

There is no server-side submission or proof of delivery in this layer.

## 4. Route Model

Suggested routes:
- `/` — gallery/landing page.
- `/templates/:templateId` — interactive demo for one template.
- `/enquire` — enquiry form.
- `/enquire?template=luxury-cinematic` — enquiry form with a preselected template.

Use stable, explicit template IDs such as `luxury-cinematic`, not display titles as route identifiers. Unknown IDs should show a friendly not-found state rather than crash.

## 5. Suggested Folder Structure

```text
src/
  app/
    App.tsx
    router.tsx
  pages/
    GalleryPage.tsx
    TemplateDemoPage.tsx
    EnquiryPage.tsx
    NotFoundPage.tsx
  components/
    gallery/
    forms/
    invitation/
    layout/
    ui/
  templates/
    registry.ts
    types.ts
    luxury-cinematic/
      LuxuryCinematicTemplate.tsx
      sections/
      styles/
      assets.ts
    template-02/
    template-03/
    template-04/
    template-05/
  data/
    templates.ts
    demoWeddingData.ts
  config/
    siteConfig.ts
  utils/
    buildWhatsAppUrl.ts
    validation.ts
  styles/
    tokens.css
    global.css
  test/
```

This is a proposed structure, not a mandate to create empty files for every future feature. Create template directories as implementation begins.

## 6. Template Contract

Use a typed contract for template metadata and render components. Example concept:

```ts
export type TemplateMeta = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  route: string;
};

export type CoupleNames = {
  partnerOne: string;
  partnerTwo: string;
};
```

Each template should accept explicit, typed props for demo data and temporary names. Avoid a giant generic schema that forces all designs to have identical sections. Share data types only where concepts are genuinely common.

The registry should be explicit and easy to audit. A template is considered available only if its route, metadata, assets, and render component exist.

## 7. Data and State

MVP data is static TypeScript/JSON-like data imported by the frontend. No database is required.

State categories:
- Template metadata: static application data.
- Demo wedding details: static sample data.
- Temporary couple names: local component/page state.
- Enquiry form: local form state.
- Audio playback: local UI state.

Do not persist customer names or enquiries in browser storage by default. If persistence is requested later, define retention and privacy requirements before implementing it.

## 8. WhatsApp URL Construction

Keep the business phone number in a single configuration file or local environment configuration appropriate for a public frontend value. A phone number is not a secret, but it should be easy to change without editing multiple components.

The utility should:
1. Receive validated form values and selected template metadata.
2. Create a readable message with labels.
3. Encode the message using `encodeURIComponent`.
4. Construct the `wa.me` URL using international digits-only phone number.
5. Return the URL to a button/link opened by explicit user interaction.

Never mark the enquiry as “sent” merely because a link was generated or opened.

## 9. Media and Animation Rules

- Keep content text separate from video.
- Never bake editable names, dates, venue information, or controls into video if those values need to change.
- Provide captions or equivalent text where video conveys important information.
- Provide meaningful alt text for informative images; use empty alt text for purely decorative images.
- Avoid autoplay audio. User interaction must start music.
- If background video is used, it should be muted, have a poster, and degrade gracefully when playback is unavailable.
- Provide a reduced-motion experience.
- Avoid layout shifts by reserving media dimensions.
- Use responsive asset choices and test real mobile performance.
- Do not depend on remote stock URLs remaining available; keep licensed assets in the project or a controlled asset store.

## 10. Security, Privacy, and Accessibility

- Treat form content as untrusted input.
- Do not render customer input as HTML.
- Validate fields and limit message length.
- Do not include private information in URLs beyond what is necessary for the selected template.
- Do not commit secrets or credentials.
- Use semantic HTML, labels, keyboard focus, visible focus states, and appropriate contrast.
- Ensure controls have accessible names.
- Respect reduced-motion preferences.
- Make sound state discoverable and controllable.

## 11. Testing Strategy

Unit/component tests:
- Template registry resolves valid IDs and handles unknown IDs.
- Temporary names update the demo.
- Template source data is not mutated.
- Form validation covers required and malformed values.
- WhatsApp message encoding handles spaces, punctuation, and non-Latin characters.
- Audio and interactive controls expose correct state.

Browser/manual tests:
- Gallery → demo → enquiry flow.
- Selected template is preserved.
- WhatsApp URL contains the correct encoded message.
- 375px mobile and 1440px desktop layouts.
- Keyboard-only navigation.
- Reduced motion.
- Media failure/fallback.
- No console errors or broken internal links.

## 12. Backend Upgrade Triggers

Consider adding a backend only if one or more of these become confirmed requirements:
- Store enquiries in a secure admin area.
- Customer accounts or self-service editing.
- Persistent invitations and generated public URLs.
- Guest-specific links and RSVP collection.
- Payments, order status, or automated delivery.
- Media upload and customer asset management.

Do not prebuild these systems in the MVP.
