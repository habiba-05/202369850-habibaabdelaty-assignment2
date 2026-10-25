# Technical Documentation

## Overview

Plain HTML/CSS/JavaScript — no build tools, no frameworks, no dependencies. Everything runs
directly in the browser. This document covers the Assignment 2 additions; the Assignment 1 design
system (colors, type, layout, responsive breakpoints) is unchanged from the previous submission.

## File structure

```
README.md           Project overview, setup, and AI usage summary
index.html          Page structure & content
css/styles.css      All styling, including the new filter/animation/widget rules
js/script.js        All interactivity, one function per feature
assets/images/      SVG project illustrations
docs/               This documentation, the AI usage report, and AI evidence (ai-evidence/)
.gitignore          Files excluded from version control
```

## New feature 1 — Project filter (dynamic content)

**HTML:** each project `<li class="project-row">` carries a `data-categories` attribute listing
its categories, space-separated (e.g. `data-categories="mobile ai"`). A row of
`<button class="filter-btn" data-filter="...">` sits above the project list, plus a hidden
`<p id="projectEmpty">` for the empty state.

| Project | Categories |
|---|---|
| Fitfeed | `mobile`, `ai` |
| Wiper Trip AI Prediction | `ai`, `data` |
| KFUPM Student Parking App (NavKFUPM) | `mobile`, `data` |

The `web` filter button deliberately matches none of the three projects — this is intentional, to
demonstrate the empty-state message on a real user action rather than leaving that code path
untested. (It also happens to be true: none of the three projects is a plain web app yet.)

**JavaScript (`setupProjectFilter` in `js/script.js`):**
- Listens for clicks on each `.filter-btn`.
- Toggles the `.is-active` class so the clicked button is visually highlighted.
- For every project row, checks whether `filter === 'all'` or the row's `data-categories` includes
  the clicked filter.
- Matching rows: `is-hidden` is removed and, on the next animation frame, `is-filtering-out` is
  removed too, so the row fades/slides back in (CSS transition on `.project-row`, which uses
  `--transition-med`, 320ms).
- Non-matching rows: `is-filtering-out` is added immediately, which starts the fade-out, and after
  220ms (`FADE_MS` in JavaScript) `is-hidden` is added, which sets `display: none` so the row stops
  taking up grid space.
- A `Map` of pending `setTimeout` ids per row cancels any fade-out still in progress if the user
  clicks a different filter quickly, so rapid clicking can't leave a row in a broken half-hidden
  state.
- Counts visible rows; if zero, un-hides `#projectEmpty`.

**Why this satisfies the requirement:** it responds to a real user action (click), changes visible
content, is not purely decorative (it actually filters), and includes an empty state.

## New feature 2 — GitHub stats widget (public API data handling)

**HTML:** `<div id="githubStats" data-username="habiba-05">` in the About section, containing a
status line (`.github-status`) and a data block (`.github-data`, `hidden` by default) with four
`data-field` targets: `repos`, `followers`, `following`, `profile-link`.

**JavaScript (`setupGithubStats` in `js/script.js`):**
1. Reads the username from the `data-username` attribute (no username is ever hard-coded in the
   JS itself — the HTML is the single source of truth).
2. Shows "Loading GitHub stats…" immediately.
3. Calls `fetch('https://api.github.com/users/<username>')`. This is GitHub's public REST API; it
   requires no API key for unauthenticated read access to public profile data, and it's
   CORS-enabled so it works directly from a browser with no server in between.
4. **Success:** fills in the repo/follower/following counts and the profile link, hides the status
   line, un-hides the data block, and (after a frame, so the transition actually plays) adds
   `.is-revealed` to fade/slide it in.
5. **Failure** (network error, non-2xx response, or the fetch promise rejecting for any reason):
   catches the error and replaces the status text with a specific, friendly message telling the
   user what likely happened (possible rate-limiting) and what to do (try again later, or visit
   the profile directly — the GitHub link in the site footer stays available) — it never leaves
   the "Loading…" text stuck or fails silently.

**Why this satisfies the requirement:** it's a real fetch from a public, keyless API, rendered into
the page, with explicit loading and error states — not just localStorage (which the site already
had from Assignment 1) and not just a form.

**Rate limits:** GitHub allows 60 unauthenticated requests per hour per IP address to this
endpoint. That's enough for normal browsing and grading, but repeated manual testing in a short
window can trigger the error state — that's expected behavior, not a bug, and it's exactly the
kind of failure the error-handling code exists to catch gracefully.

## New feature 3 — Scroll-reveal animation

**CSS:** any element with a `data-reveal` attribute starts at `opacity: 0` and
`translateY(18px)`. Adding the `.is-visible` class (via JavaScript) animates it to its resting
state. Most revealed blocks use a 600ms transition; project rows use their own `.project-row`
transition (`--transition-med`, 320ms), which is defined later in the stylesheet and also handles
the filter fade.

**JavaScript (`setupScrollReveal` in `js/script.js`):**
- If the user has `prefers-reduced-motion: reduce` set, every `[data-reveal]` element gets
  `.is-visible` immediately — no observer, no animation, no delay to content.
- Otherwise, an `IntersectionObserver` watches all `[data-reveal]` elements (one per content
  block: the about text, the facts list, the GitHub widget, each project row, each skill group, the
  contact intro, and the contact form) and adds `.is-visible` the first time each one is at least
  15% visible, then stops observing that element (`unobserve`) so it never re-animates on repeated
  scrolling.

A second, smaller transition fades/slides the project filter results (see above) and the GitHub
stats block (`.github-data.is-revealed`) — these satisfy the "animated success" and "smooth
transitions when switching content" options from the same requirement.

## Error handling & feedback — summary across the site

| Situation | Feedback shown |
|---|---|
| GitHub data is loading | "Loading GitHub stats…" status text |
| GitHub fetch fails | Specific error message + suggestion to retry or visit the profile |
| A project filter matches nothing | "No projects match this filter yet — check back soon!" |
| Contact form field is invalid | Inline error text under that field, on blur and on submit |
| Contact form submitted successfully | Green confirmation message, form resets |

## Accessibility notes (carried over + extended)

- All Assignment 1 accessibility choices are unchanged (skip link, `:focus-visible`, labeled form
  fields, `aria-live` regions).
- The GitHub status line uses `role="status"` + `aria-live="polite"` so screen readers announce the
  loading state and the eventual error, without interrupting the user.
- The project filter buttons are grouped with `role="group"` and an `aria-label`.
- Scroll-reveal animation is skipped entirely (content appears immediately) for
  `prefers-reduced-motion: reduce`, consistent with the site-wide reduced-motion handling already
  in `css/styles.css`.

## Known limitations / next steps

- The contact form still has no backend (by design, per assignment scope).
- Project links are still placeholders (`href="#"`) until real project repos/demos exist.
- The GitHub widget shows public profile counts only (repos/followers/following) — a future
  version could list actual pinned repositories using a second API call to
  `/users/<username>/repos`.
- The GitHub error message is plain text; a future version could include a direct profile link
  inside the message itself (currently the footer link serves that purpose).
- The filter removes a row from the layout after 220ms, slightly before the 320ms CSS fade fully
  finishes; a future tweak could set both to the same value.
- Project images are custom SVG illustrations rather than real screenshots — swap in real assets as
  the portfolio grows.