# Assessment brief for Codex

You are reviewing work on the logicacode marketing site. **Assess only. Do not edit, commit, push or deploy anything.** Write your findings to `_mockups/CODEX_ASSESSMENT.md` (the `_mockups/` folder is excluded from the Jekyll build) and summarise them in the terminal.

Read `CLAUDE.md` first. It holds the project rules: static HTML on GitHub Pages, brand name always lowercase "logicacode", only the existing red `#F20000` / `#181818` / white palette, Oswald + Open Sans, Font Awesome, headlines always in capitals, design mockups approved before production code, shared header/footer synced by `_scripts/sync-layout.py`.

## What to assess

Branch `feature/menu-rebuild` (not yet merged to `master`):

1. **New site menu** — `_includes/site-header.html`, the dropdown styles in `assets/css/site.css`, and the dropdown script in `assets/js/site.js`. Four dropdowns (Services, Industries, Innovations, Company), each a full-width panel with an intro column on desktop; they expand inside the small-screen menu and stay visible as link lists without JavaScript.
2. **11 new pages** — `services/{automation,cloud,data-ai,product-engineering,professional-services,advisory-consulting}.html`, `industries/index.html`, `innovations/{newsroom247,cluexp,sesat}.html`, `careers.html`.
3. **Homepage mockup (uncommitted)** — `_mockups/home/index.html`, a proposed replacement for `index.html` below the hero. The hero is intentionally unchanged apart from button labels ("Book a free AI call"). Sections: guide statement + four figures → "So you can lead with AI" → red Industries band → three outcome cards → products (Newsroom247, ClueXP, SESAT) → angled red offer band (free 30-minute AI call) → contact form. Inspired by Apple's product pages and redrhinonetworks.com; no testimonials or awards exist, so none should be invented.

## Please cover

- **UX and design:** hierarchy, flow, consistency with the brand rules, mobile (320px / 390px), tablet, desktop.
- **Content:** clarity, customer focus, anything that reads as an unsupported claim (for example "long before it was called AI", "365 schools", the platform list on Professional Services, "Flexible & Remote-Friendly" on Careers, "24/7" on Newsroom247).
- **Accessibility:** keyboard use of the dropdowns (Tab, Enter, Escape), focus visibility, headings order, contrast, reduced-motion handling.
- **Code quality:** CSS specificity or dead rules, JS robustness, duplication, anything that will be hard to maintain.
- **SEO / technical:** titles, 150–160 character meta descriptions, canonical URLs, sitemap, image sizes, the `?v=` cache-busting on `site.css` / `site.js`.
- **Bugs:** anything broken or inconsistent.

Rank findings by severity (must fix / should fix / nice to have) with file and line references.

## How to run it

```sh
python -m http.server 8765 --bind 127.0.0.1   # may already be running; use another port if taken
node --check assets/js/site.js
node _tests/theme-guards.test.js
python _scripts/sync-layout.py --check
```

Pages: `/`, `/services/automation.html`, `/industries/`, `/innovations/sesat.html`, `/careers.html`, `/_mockups/home/`. Do not submit the contact form (it sends real email through Web3Forms).
