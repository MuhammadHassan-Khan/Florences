# Product Specification — Wedding Invitation Platform

**Status:** MVP specification  
**Product type:** Template-based digital wedding invitation showcase  
**Primary implementation target:** Local development  
**Documentation language:** English

## 1. Product Summary

Build a responsive website that showcases five digital wedding invitation templates. Visitors can explore each template, open a working interactive demo, temporarily customize the couple's names in the demo, and submit an enquiry form. The form prepares a WhatsApp message containing the enquiry details and selected template. The business fulfils orders manually.

This is initially a marketing and demonstration website, not a self-service invitation SaaS.

## 2. Business and User Goals

### Business goals
- Present a polished portfolio of invitation designs.
- Help customers understand the experience before enquiring.
- Route interested customers to WhatsApp with useful enquiry context.
- Keep initial operating costs and implementation complexity low.
- Reuse components without making every template look identical.

### Primary visitor journey
1. Open the template gallery.
2. Browse five template cards.
3. Open a template's dedicated demo.
4. Experience its animations, media, and invitation sections.
5. Optionally enter temporary couple names to preview personalization.
6. Open the enquiry form with the selected template preselected.
7. Submit the form.
8. Review and open a prefilled WhatsApp message.
9. Business and customer continue the order conversation manually.

## 3. Target Customer

People planning weddings or wedding-related events who want a premium digital invitation and prefer to discuss details with the provider over WhatsApp.

The initial site does not require customer accounts, self-service checkout, or customer dashboards.

## 4. MVP Scope

### Included
- Responsive landing/gallery experience.
- Exactly five template entries for the first release.
- A dedicated, working demo for each published template.
- Luxury cinematic Pakistani wedding template as the first fully implemented template.
- Shared components where useful, with template-specific layouts and visual identity.
- Temporary name customization inside demos; changes remain client-side and are not persisted.
- Full enquiry form with client-side validation.
- Selected template carried from demo/gallery to the enquiry form.
- WhatsApp message generation using a configurable business phone number.
- Local media assets, with clear attribution/licensing records for third-party assets.
- Loading, empty, invalid-form, and WhatsApp handoff states.
- Keyboard-accessible controls and reduced-motion support.
- Basic automated tests and manual responsive checks.

### Excluded
- AI-generated content or AI features.
- Customer registration or login.
- Customer dashboard or visual invitation editor.
- Database or persistent order management.
- Online payment or checkout.
- Automated invitation publishing or delivery.
- Guest-specific invitations, guest lists, seat counts, and RSVP database.
- CMS unless a confirmed requirement emerges.
- Analytics dashboards and complex marketing automation.
- Copying another provider's source code, proprietary assets, or exact branding.

## 5. Template Requirements

The first release has five template slots. The initial luxury template is implemented first. The remaining four designs should be defined before their implementation and must be meaningfully differentiated.

Each template must declare:
- Stable template ID and display name.
- Short description and preview image.
- Demo route.
- Layout/component entry point.
- Media asset references.
- Supported sections and interactions.
- Any required event/couple data.
- Accessibility and reduced-motion behavior.

Templates may share functional components such as event details, venue links, music controls, galleries, countdowns, and enquiry links. They must not be forced into one universal layout if that compromises the design.

## 6. Demo Personalization

- The demo may expose temporary fields for couple names.
- Name changes update the preview immediately.
- Values are local to the current demo session unless an explicit persistence requirement is approved later.
- Demo values must not overwrite template source data.
- Demo personalization must not imply that an order has been created.
- The enquiry form is the separate handoff into the manual sales process.

## 7. Enquiry Form

Proposed fields:
- Customer name — required.
- WhatsApp/phone number — required.
- Selected template — required and prefilled when navigated from a template.
- Wedding date — optional unless the business later makes it mandatory.
- Event type(s) — required or clearly marked optional according to the final form design.
- Requirements/message — optional free text.

The form must:
- Validate required fields and sensible input formats.
- Show clear inline error messages.
- Preserve entered values if validation fails.
- Avoid collecting unnecessary sensitive information.
- Prepare a readable WhatsApp message with field labels and the selected template.
- Never claim that an enquiry was sent until the user opens WhatsApp and sends it.
- Explain that the user will continue the conversation in WhatsApp.

## 8. WhatsApp Handoff

- Business number must be held in one configuration location, not duplicated through components.
- Use the official click-to-chat URL format (`https://wa.me/<international-number>?text=<url-encoded-message>`).
- Configure the phone number in international digits-only format without `+`, spaces, or punctuation.
- URL-encode the message.
- Open the link through a user-initiated action.
- Do not embed credentials or secrets.
- Test on desktop and mobile; WhatsApp availability and installed-app behavior vary by device.
- A successful website form validation is not proof that the message was sent.

## 9. Visual and Experience Direction

The first template is a luxury cinematic Pakistani wedding invitation. The overall gallery should feel premium and coherent, while each template retains its own design identity.

Use:
- Mobile-first layouts.
- Intentional typography and spacing.
- High-quality, appropriately licensed media.
- Tasteful transitions rather than constant animation.
- Readable text over video or imagery.
- Clear sound controls; audio must not start unexpectedly.
- Poster/fallback images for videos.
- Respect for `prefers-reduced-motion`.
- Performance budgets and optimized media.

Do not use a full invitation video as the only content layer. Names, event information, links, and controls must remain real accessible HTML where appropriate.

## 10. Success Criteria

MVP is accepted when:
- The gallery displays five template entries correctly.
- Each template opens its own demo route.
- The luxury template works from opening through closing sections.
- Demo name changes update visible names without modifying source data.
- Each demo can link to the enquiry form with the correct template selected.
- Invalid form submissions show actionable errors.
- Valid form data generates a correctly encoded WhatsApp message.
- No backend or database is required for the core journey.
- The website is usable at 375px and 1440px viewport widths.
- Core controls are keyboard accessible.
- Reduced-motion settings are respected.
- No unlicensed or knowingly infringing assets are included.
- Build and automated tests pass.

## 11. Open Decisions

These should be recorded as provisional rather than guessed:
- Exact names and visual concepts for templates 2–5.
- Final copy, branding, domain, and production hosting.
- Final field requirements and event-type options in the enquiry form.
- The actual WhatsApp business number, to be supplied locally through configuration.
- Final asset selection and licence/attribution records.
