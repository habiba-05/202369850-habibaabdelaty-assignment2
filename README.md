# Habiba Abdelaty — Personal Portfolio (Assignment 2)

A personal portfolio site, built on top of the Assignment 1 version, with the interactive,
data-driven, and animated features required for Assignment 2 — Interactive Features.

## Project description

This is my portfolio for KFUPM's web engineering course. Assignment 1 set up the structure and
visual design (a "sugar paper" light palette and a "night bloom" dark palette, a serif display
font, and a soft-but-technical tone). Assignment 2 builds on that *same* site — same content, same
design — and adds:

- A **project filter** that changes which projects are shown based on which category button you
  click.
- A **live GitHub stats widget** that fetches real data (public repos, followers, following) from
  the public GitHub REST API and shows it in the About section.
- **Scroll-reveal animations** — content blocks (the about text, project rows, skill groups, the
  contact form, etc.) fade/slide into view as you scroll, respecting `prefers-reduced-motion`.
- Clearer **feedback states** throughout: a loading message while GitHub data is fetching, a
  friendly error message if the fetch fails, and an empty-state message if a project filter has no
  matches.

The existing Assignment 1 features (light/dark theme saved to `localStorage`, the validated
contact form with a confirmation message, the mobile nav, and scroll-spy navigation) are untouched
and still count toward this assignment's "data handling" requirement.

## Sections

- **About Me** — intro, quick facts, and the live GitHub stats widget
- **Projects** — Fitfeed, Wiper Trip AI Prediction, and NavKFUPM (KFUPM Student Parking App), each
  with a category filter
- **Skills** — languages, tools, and what I'm currently learning
- **Contact** — a validated Name / Email / Message form (no backend)

## New in Assignment 2

| Requirement | What I built | Where |
|---|---|---|
| Dynamic content | Project filter buttons (All / Mobile / AI & ML / Data / Web) that show/hide projects on click, with an empty-state message | `index.html` (`.project-filters`), `js/script.js` (`setupProjectFilter`) |
| Data handling | Fetches live data from the public GitHub API (`api.github.com/users/<username>`) | `index.html` (`#githubStats`), `js/script.js` (`setupGithubStats`) |
| Animation/transition | Scroll-reveal fade/slide-in on content blocks, plus a fade transition when the project filter changes and when GitHub stats load | `css/styles.css` (`[data-reveal]`, `.project-row`, `.github-data`), `js/script.js` (`setupScrollReveal`) |
| Error handling & feedback | Loading text + friendly error message for the GitHub widget; empty-state message for the project filter; existing form validation errors and success message | `js/script.js` |

## Folder structure

```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/          # hand-built SVG project illustrations, no external image credits needed
├── docs/
│   ├── ai-usage-report.md
│   ├── technical-documentation.md
│   └── ai-evidence/     # exported, unedited AI conversations referenced in the AI usage report
└── .gitignore
```

## Running it locally

No build step or dependencies — plain HTML/CSS/JS.

1. Clone the repository:
   ```
   git clone https://github.com/habiba-05/202369850-habiba-abdelaty-assignment2.git
   cd 202369850-habiba-abdelaty-assignment2
   ```
2. Open `index.html` directly in a browser, **or** serve it locally (recommended, since the GitHub
   stats widget uses `fetch()`, which some browsers restrict on `file://` pages):
   ```
   # Python
   python3 -m http.server 8000

   # or, with Node
   npx serve .
   ```
3. Visit `http://localhost:8000`.

**Note on the GitHub stats widget:** it fetches the profile `github.com/habiba-05`, set via
`data-username` on `#githubStats` in `index.html`. The GitHub API is rate-limited for
unauthenticated requests (60/hour per IP), so if the page is reloaded many times in a short
window, the widget may briefly show its error message instead of the stats — that's expected
behavior, not a bug.

## Deploying (optional)

GitHub Pages is the simplest option:

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set the source branch to `main` and the folder to `/ (root)`.
4. The site will be published at `https://habiba-05.github.io/<repo-name>/`.

## AI usage (summary)

I used Claude (Anthropic) to scaffold the initial JavaScript logic and CSS structure for the
Assignment 2 features — the project filter, the GitHub API widget, and scroll-reveal animations.
I then manually reviewed and edited the generated code in `js/script.js` and `css/styles.css`
(setting the scroll-reveal duration to 600ms and rewriting the GitHub widget's error message) to
ensure proper UI behavior. Full details, the usage log, and my AI declaration are in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## Technical documentation

See [`docs/technical-documentation.md`](docs/technical-documentation.md) for how the new features
are implemented, the design system, and known limitations.

## Academic integrity note

This project was built with AI assistance as an explicitly allowed tool for this assignment. All
AI-suggested code was reviewed, tested, and edited by me — see `docs/ai-usage-report.md` for the
full declaration and usage log.