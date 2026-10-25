# AI Usage Report — Assignment 2

## Declaration

> I declare that this report and the attached evidence document all of my AI use in this
> assignment, with complete and unedited conversations, and that I understand and can explain all
> the code I submitted. I understand that undeclared AI use or a false declaration will be treated
> as plagiarism according to KFUPM regulations.

- **Name:** Habiba Abdelaty
- **Student ID:** 202369850
- **Date:** 25/10/2026
- **Signature / confirmation:** Habiba

## Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What I changed and how I verified it |
|---|---|---|---|---|---|
| C01 | Claude (model: `claude-sonnet-5`, Anthropic) | 2026-10-25 | I asked Claude to scaffold the Assignment 2 interactive features on top of my Assignment 1 site — a project filter, a widget that pulls live stats from the GitHub API, and scroll-in animations — and to help draft technical documentation. | `index.html`, `css/styles.css`, `js/script.js`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | **My Edits:** I manually modified `js/script.js` to refine the error handling in the GitHub API widget (adding a clear, user-facing error message in the `.catch()` block explaining rate-limiting and linking to the profile) and adjusted the scroll-reveal duration in `css/styles.css` to 600ms to align with the rest of the site's transition timing.<br>**Verification:** I verified the changes by inspecting `docs/technical-documentation.md` alongside the source code to trace the script execution flow (tag matching, `fetch()` promise resolution, and `IntersectionObserver` triggers). I then tested the live site in Microsoft Edge by testing filter buttons, triggering form validations, and testing API error states to confirm the error message renders properly. |


## Tools used & use cases

| Tool | How it was used |
|---|---|
| Claude (Anthropic) | I used it to draft the initial JavaScript logic for the project filter, GitHub API widget, and scroll-reveal animation, along with matching base CSS and documentation templates. |

## Recommended AI tools (per assignment brief)

- **GitHub Copilot** → code completion & generation
- **ChatGPT / Claude** → problem-solving & explanations
- **Cursor** → AI-powered code editor
- **Replit** → AI-assisted online IDE
- **AWS CodeWhisperer** → AI code generation

## Benefits & challenges

**Benefits**

- I was able to quickly scaffold three coordinated features (filter, live API widget, scroll animation) without conflict, saving significant setup time—especially around the coordination between CSS transitions and DOM events.
- Having Claude generate draft technical documentation alongside the code gave me a clear reference point, making it easier to review, edit, and understand the core logic.

**Challenges**

- Claude's initial boilerplate code needed refinement to match the rest of the site's design system and error handling.
- I had to dive directly into `js/script.js` and `css/styles.css` to tweak the logic and styling myself, ensuring I understood every modified function rather than relying solely on the generated draft.

## Learning outcomes

Going through this assignment, I learned how `fetch()` works for pulling data from a public API — that it returns a promise, and that you have to handle both successful response states (`.then`) and error handling (`.catch` / HTTP status checks) to ensure the user receives proper feedback. I also learned how `IntersectionObserver` efficiently handles scroll events without overloading performance through continuous scroll event listeners. For the project filter, I learned how utilizing custom HTML `data-categories` attributes keeps the JavaScript decoupled and scalable regardless of future project additions.

## Responsible use & modifications

- I reviewed and refined the generated HTML, CSS, and JavaScript, making direct manual edits to improve UX (adjusting animation timings in `css/styles.css` to 600ms and customizing error messages in `js/script.js`).
- I cross-checked my code edits against `docs/technical-documentation.md` to ensure accurate technical alignment.
- I thoroughly tested the live site in Microsoft Edge: checking every filter button, validating contact form inputs (empty vs. valid), and simulating API errors to verify that my UI fallback message functions correctly.
- I did not submit AI output without review — all code was inspected, edited, and verified prior to final submission.