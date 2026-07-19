# Madestays, Owner onboarding dashboard

## Running it

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open http://localhost:3000. `npm run build && npm start` for a production
build. Node 18+ required.

## What's here

- **Portfolio overview**: every property at a glance, with a top-line summary
  (properties, live count, overall % of onboarding steps complete across the
  portfolio).
- **Filtering** : Everything / Needs attention / In progress / Not started /
  Live, with live counts on each tab. Categories are derived from the data:
  a property is *Live* when all ten steps are complete, *Needs attention* when
  any step is `action_required`, *In progress* when any step has moved, and
  *Not started* otherwise.
- **Detail view**  : clicking a card opens a slide-over panel with the full
  ten-step checklist, each step's status, and the note explaining what's
  needed where one exists. Closes on Escape, backdrop click, or the close
  button.
- **Attention digest**: every `action_required` item across the portfolio in
  one list under the summary, click one to jump straight to that property.
- **Overdue flag**: a small marker on a property whose target go-live date
  has passed and isn't live yet.

## Design intent

The brief asked for something that feels considered and premium, so I gave it a
deliberate direction rather than a default admin-dashboard look: a warm paper
ground with ink, brass, moss and clay as functional colours (brass = live,
clay = needs attention, moss = complete), Fraunces for display type and IBM
Plex Sans/Mono for UI and data. The one signature element is the **progress
stamp** on each card — a slightly rotated seal-style ring, a nod to a passport
stamp, so a live property reads as an achievement rather than a full progress
bar. Everything else is kept quiet: thin rules, restrained colour, generous
spacing.

## Handling the awkward data

The dataset is deliberately untidy. Things I found and handled:

- **`on_hold`** appears on The Old Rectory's payout step but isn't in the
  dataset's own `statusLegend`. Unknown statuses fall through to a neutral
  "On hold" treatment rather than crashing.
- **Kingsgate Mews House has an empty `steps` array.** Every property is
  resolved against the canonical `onboardingStepDefinitions`, so missing steps
  render as "Not started" and every checklist is always the same ten steps in
  the defined order (the data lists steps out of order for some properties).
- **Porthcurno Cliff House has an empty `image` string**, and the Mayfair
  Penthouse image URL (`picsum.photos/id/104857/...`) is a dead link, picsum
  IDs don't go that high. Both cases show a "No photograph yet" placeholder;
  broken URLs are caught with an `onError` fallback.
- **The Old Rectory's name is very long.** Card titles clamp to two lines; the
  detail panel shows the full name.
- **Eaton Square's insurance step is `action_required` with no note** — the
  status badge still renders, just without a note block.
- Dates are parsed defensively; an unparseable `targetGoLiveDate` renders as
  "Not yet set".

Loading is simulated with a 400ms delay behind a skeleton screen, and a filter
with no matches shows a proper empty state with a reset action (with this
dataset every filter happens to match at least one property, but the state is
there).

## Assumptions

- One owner, so no auth or owner switching — the data file is the API.
- "Live" = all ten steps complete. The data has no explicit live flag, so
  completion of the checklist is the definition the brief implies.
- Steps are read-only for the owner in this view; acting on a blocked step
  (uploading a certificate, confirming a shoot date) would be a follow-up flow.
- Plain `<img>` over `next/image` since the sources are external placeholder
  URLs and remote-domain config for a fake CDN adds noise, not value.

## With more time

- Act-on-it affordances: each `action_required` note becomes a task with an
  upload/confirm action, and a single "what needs your attention" digest at the
  top aggregating open items across properties.
- Sort options (by go-live date, by progress).
- Route-based detail views (`/property/[id]`) so panels are linkable, with the
  modal kept as an interception route.
- Component tests (Vitest + Testing Library) for the progress/stage derivation
  logic, which is where the real behaviour lives.
- A skeleton→content crossfade and staggered card entrance, kept subtle and
  behind `prefers-reduced-motion`.

## AI tools used

Used **ChatGPT 5.5** :
Summarised the take-home brief into a checklist to ensure all functional and non-functional requirements were covered before development.
Suggested a high-level React component structure to help plan the application architecture.
Provided UX feedback on what information should be prioritised on each property card from an owner's perspective.
Identified potential edge cases in the supplied dataset (e.g. missing images, empty step arrays, long property names) to improve robustness.
Performed a code review after implementation, highlighting maintainability, accessibility and performance improvements.
Grammar Correction and formatting on README.md

What AI was not used for:

Generating the application's source code.
Designing the final UI.
Writing the React components or business logic.
Making implementation decisions. Session transcripts and
links are in `ai-sessions/`. No other AI tools were used.
