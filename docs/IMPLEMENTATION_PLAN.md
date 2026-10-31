# Implementation Plan — Wedding Invitation Platform

**Purpose:** Provide bounded phases and verifiable completion criteria for a coding agent.  
**Source of truth:** `PRODUCT_SPEC.md` and `ARCHITECTURE.md`.

## 1. Agent Operating Rules

- Inspect the current repository before making changes.
- If the repository is empty, initialize the project according to the approved stack.
- Read all three core documents before implementation.
- Implement only the current phase; do not silently continue into later phases.
- Do not add backend services, database, authentication, payments, AI features, CMS, or a customer dashboard.
- Do not invent business requirements, final brand copy, template names, dates, or venues.
- Use clearly labelled sample content for demos.
- Do not copy another provider's proprietary code, assets, exact branding, or protected visual expression.
- Prefer focused components over giant files, but do not introduce abstractions without a concrete use.
- Do not add dependencies without a clear need. If a new dependency materially changes the stack or bundle, explain the reason before adding it.
- Never delete user files or run destructive commands without approval.
- Never claim a test passed unless it was actually run; report unavailable checks explicitly.
- Keep the application runnable at the end of each phase.
- At each checkpoint, report changed files, commands run, results, known issues, and the next recommended phase.

## 2. Phase Workflow

Every phase follows:
1. Read the relevant specification.
2. Inspect current state.
3. Implement only the phase scope.
4. Run available checks.
5. Fix failures caused by the changes.
6. Report evidence and unresolved issues.
7. Stop for review before moving to the next phase.

## 3. Phase 0 — Repository and Environment Audit

### Scope
- Inspect repository, package manager, existing files, and current app behavior.
- Identify whether the project is empty or already initialized.
- Confirm local runtime prerequisites.
- Do not overwrite existing work.

### Done when
- Repository status and existing structure are summarized.
- Any conflicts with the approved stack are identified.
- A minimal execution plan for Phase 1 is presented.

## 4. Phase 1 — Project Foundation

### Scope
- Set up React + TypeScript + Vite if not already present.
- Add routing, global styles/tokens, linting/formatting, and test setup only as justified.
- Add a responsive app shell and not-found route.
- Create the documentation directory and preserve the approved specifications.

### Done when
- The app starts locally using documented commands.
- Production build succeeds.
- Lint/type checks and baseline tests pass.
- No invitation business logic is added prematurely.

## 5. Phase 2 — Gallery and Navigation

### Scope
- Build the landing/gallery page.
- Define five template metadata entries with stable IDs.
- Use temporary thumbnail placeholders only where final media has not been selected.
- Implement navigation from each card to its template demo route.
- Build responsive loading/not-found states.

### Done when
- Five template cards render from a single registry/data source.
- Each card navigates to the correct stable route.
- Unknown template IDs show a friendly fallback.
- Layout is usable at 375px and 1440px.
- No card claims that a template is fully implemented when it is only a placeholder.

## 6. Phase 3 — First Template: Luxury Cinematic

### Scope
Implement one complete invitation demo with original design expression:
- Opening/hero experience.
- Couple names.
- Wedding introduction/date.
- Event sections.
- Venue/location action.
- Gallery/media.
- Music control with explicit user activation.
- Closing/enquiry call-to-action.
- Temporary name inputs and live preview.
- Responsive and reduced-motion behavior.

Use sample details clearly marked as demo data. Do not invent real customer information.

### Done when
- The invitation can be experienced from opening through closing.
- Temporary name changes update every intended name location.
- Original demo data remains unchanged.
- Audio can be started/stopped by the user.
- Media has fallbacks and does not cause major layout shifts.
- Main interactions work on mobile and desktop.
- No backend is required.

## 7. Phase 4 — Template Architecture Validation

### Scope
- Refine the explicit registry and typed template contract based on the first template.
- Extract only components that have a clear shared use.
- Define distinct visual concepts and section plans for templates 2–5 before implementing them.
- Keep each template's layout and animation identity separate.

### Done when
- Template registry and props are typed.
- Shared components are not forcing identical page structure.
- The approach for all five templates is documented.
- No speculative universal page-builder or visual editor has been added.

## 8. Phase 5 — Templates 2–5

### Scope
- Implement the four remaining designs one at a time.
- Reuse shared components only where appropriate.
- Use licensed or original media.
- Keep each demo's sample data and assets clearly organized.

### Done when
- All five template routes work.
- Each has a distinct documented visual identity.
- Shared interactions behave consistently.
- Template-specific interactions are tested.
- No broken media or dead internal links remain.

## 9. Phase 6 — Enquiry Form and WhatsApp

### Scope
- Build the full enquiry form.
- Preselect the template when the visitor arrives from a demo.
- Validate required fields and formats.
- Generate a labelled, URL-encoded WhatsApp message.
- Use a configurable placeholder until the business number is supplied in local configuration.
- Make the final action clearly indicate that WhatsApp will open.

### Done when
- Invalid input shows understandable inline errors.
- Valid input creates a message containing all applicable submitted details and the selected template.
- Special characters, spaces, and non-English text encode correctly.
- The website never claims the message was sent automatically.
- WhatsApp handoff works as far as the current browser/device permits.

## 10. Phase 7 — Quality and Performance

### Scope
- Test keyboard navigation, focus states, contrast, reduced motion, media fallback, mobile layout, and console errors.
- Optimize images/video and lazy-load suitable below-the-fold media.
- Run component tests and any configured end-to-end tests.
- Review asset licence/attribution records.

### Done when
- Build, lint, type checks, and tests pass.
- Main flows work at 375px and 1440px.
- No known critical accessibility, navigation, or form defects remain.
- Any unverified items are explicitly listed rather than described as passed.

## 11. Phase 8 — Handoff and Local Runbook

### Scope
- Update README with prerequisites, install/run/test/build commands, project structure, template registration, media rules, and WhatsApp configuration.
- Document current limitations and how to replace sample media.
- Do not deploy publicly without a separate approved deployment decision.

### Done when
- A developer can set up and run the project from the README.
- The required configuration is documented without exposing secrets.
- The final report lists delivered features, tests actually run, and remaining limitations.

## 12. Change Control

If a requirement cannot be met within the approved architecture:
1. State the blocker and why it matters.
2. Offer the smallest viable options.
3. Explain the effect on scope, complexity, and maintenance.
4. Wait for approval before introducing backend infrastructure, persistent storage, a new major dependency, or a new product capability.

## 13. Release Acceptance Checklist

- [ ] Five template cards exist.
- [ ] Five template routes work.
- [ ] Luxury template is complete and interactive.
- [ ] Demo names can be changed temporarily.
- [ ] Enquiry form validates input.
- [ ] Selected template carries into the enquiry.
- [ ] WhatsApp message is encoded correctly.
- [ ] Media is licensed/original and optimized.
- [ ] Responsive behavior verified at mobile and desktop sizes.
- [ ] Keyboard and reduced-motion behavior checked.
- [ ] Build, lint, type checks, and configured tests pass.
- [ ] README supports local setup.
- [ ] No unapproved backend, database, payments, AI, or dashboard was added.
