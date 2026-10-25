/* =========================================================
   Habiba Abdelaty — Portfolio Scripts
   Assignment 1 features:
   1. Time-of-day greeting in the hero comment line
   2. Mobile nav toggle (hamburger menu)
   3. Scroll-spy: highlights the current section link in nav
   4. Light/dark theme toggle, saved to localStorage
   5. Contact form validation (client-side only, no backend)

   Assignment 2 additions:
   6. Project filter — dynamic content that responds to clicks
   7. GitHub stats widget — fetches live data from a public API
   8. Scroll-reveal animation — sections fade/slide in as they enter view
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  setupMobileNav();
  setupScrollSpy();
  setupThemeToggle();
  setupContactForm();
  setupBackToTop();
  setupProjectFilter();
  setupGithubStats();
  setupScrollReveal();
});

/* ---------------------------------------------------------
   1. Greeting message based on current time of day
--------------------------------------------------------- */
function setGreeting() {
  const el = document.getElementById('greeting');
  if (!el) return;

  const hour = new Date().getHours();
  let greeting = 'Hello';

  if (hour < 5) greeting = "You're up late";
  else if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  el.textContent = greeting;
}

/* ---------------------------------------------------------
   2. Mobile navigation toggle
--------------------------------------------------------- */
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after a link is tapped (mobile)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   3. Scroll-spy: highlight the nav link for the visible section
--------------------------------------------------------- */
function setupScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) =>
    document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('is-active'));
          const activeLink = linkFor(entry.target.id);
          if (activeLink) activeLink.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   4. Theme toggle (light / dark), persisted in localStorage
--------------------------------------------------------- */
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!toggleBtn) return;

  const stored = localStorage.getItem('theme');
  if (stored) {
    root.setAttribute('data-theme', stored);
  }

  updateToggleIcon();

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon();
  });

  function updateToggleIcon() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const icon = toggleBtn.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☾' : '☀︎';
    toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

/* ---------------------------------------------------------
   5. Contact form validation (client-side only, no backend)
--------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => value.trim().length >= 2,
      message: 'Please enter your name (at least 2 characters).',
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Please enter a valid email address.',
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => value.trim().length >= 10,
      message: 'Your message should be at least 10 characters.',
    },
  };

  // Validate a single field and reflect the result in the UI
  function validateField(key) {
    const field = fields[key];
    const isValid = field.validate(field.input.value);
    const wrapper = field.input.closest('.form-field');

    if (isValid) {
      wrapper.classList.remove('has-error');
      field.error.textContent = '';
    } else {
      wrapper.classList.add('has-error');
      field.error.textContent = field.message;
    }
    return isValid;
  }

  // Validate on blur for immediate, gentle feedback
  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('blur', () => validateField(key));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.className = 'form-status is-error';
      return;
    }

    // No backend is connected for this assignment — simulate a successful send.
    status.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message is ready to send (demo only — no backend connected).`;
    status.className = 'form-status is-success';
    form.reset();
  });
}

/* ---------------------------------------------------------
   Back-to-top button
--------------------------------------------------------- */
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   6. Project filter (Assignment 2 — dynamic content feature)

   Each <li class="project-row"> carries a data-categories
   attribute (e.g. "mobile ai"). Clicking a filter button shows
   only the rows whose categories include the clicked filter,
   with a short fade/slide transition, and reveals an
   empty-state message if a filter matches nothing (try "Web" —
   it's deliberately empty, since that category isn't shipped
   yet, to demonstrate the empty-state UI on purpose).
--------------------------------------------------------- */
function setupProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.project-row');
  const emptyMessage = document.getElementById('projectEmpty');
  if (!buttons.length || !rows.length) return;

  const FADE_MS = 220; // keep in sync with the CSS transition duration
  const pendingHideTimeouts = new Map(); // row -> timeout id, so rapid clicks don't race each other

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update which button looks active
      buttons.forEach((b) => b.classList.toggle('is-active', b === button));

      let visibleCount = 0;

      rows.forEach((row) => {
        const categories = (row.dataset.categories || '').split(' ');
        const matches = filter === 'all' || categories.includes(filter);

        // Cancel any fade-out still pending from a previous click on this row
        if (pendingHideTimeouts.has(row)) {
          clearTimeout(pendingHideTimeouts.get(row));
          pendingHideTimeouts.delete(row);
        }

        if (matches) {
          visibleCount += 1;
          row.classList.remove('is-hidden');
          // Let the browser register the row's display before fading it in
          requestAnimationFrame(() => row.classList.remove('is-filtering-out'));
        } else {
          row.classList.add('is-filtering-out');
          // Wait for the fade-out to finish before removing it from layout
          const timeoutId = setTimeout(() => {
            row.classList.add('is-hidden');
            pendingHideTimeouts.delete(row);
          }, FADE_MS);
          pendingHideTimeouts.set(row, timeoutId);
        }
      });

      // Empty state: tell the user clearly when a filter has no matches
      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    });
  });
}
/* ---------------------------------------------------------
   7. GitHub stats widget (Assignment 2 — public API data handling)

   Fetches public profile data from the GitHub REST API
   (no key required) and renders it into the About section.
   Shows a loading state while the request is in flight and a
   friendly error message if it fails, so the user is never
   left without feedback.
--------------------------------------------------------- */
function setupGithubStats() {
  const container = document.getElementById('githubStats');
  if (!container) return;

  const username = container.dataset.username;
  const statusEl = container.querySelector('.github-status');
  const dataEl = container.querySelector('.github-data');

  if (!username) {
    statusEl.textContent = 'No GitHub username configured.';
    return;
  }

  statusEl.textContent = 'Loading GitHub stats…';
  statusEl.hidden = false;
  dataEl.hidden = true;

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(GitHub API responded with ${response.status});
      }
      return response.json();
    })
    .then((data) => {
      dataEl.querySelector('[data-field="repos"]').textContent = data.public_repos ?? '—';
      dataEl.querySelector('[data-field="followers"]').textContent = data.followers ?? '—';
      dataEl.querySelector('[data-field="following"]').textContent = data.following ?? '—';

      const link = dataEl.querySelector('[data-field="profile-link"]');
      if (link && data.html_url) link.href = data.html_url;

      statusEl.hidden = true;
      dataEl.hidden = false;
      // Wait a frame so the browser registers the un-hidden state before
      // adding the class that triggers the fade/slide-in transition
      requestAnimationFrame(() => dataEl.classList.add('is-revealed'));
    })
    .catch(() => {
      // Friendly, specific error — the user shouldn't be left guessing why
      statusEl.textContent =
        "Couldn't load live GitHub stats right now (the API may be rate-limited). Try again in a bit, or visit the profile directly.";
      statusEl.classList.add('is-error');
    });
}
/* ---------------------------------------------------------
   8. Scroll-reveal animation (Assignment 2 — animation requirement)

   Adds a "is-visible" class to each section the first time it
   scrolls into view, which CSS uses to fade/slide it in. Skips
   entirely for users who prefer reduced motion.
--------------------------------------------------------- */
function setupScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reducedMotion) {
    elements.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((element) => {
    observer.observe(element);
  });
}