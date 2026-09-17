# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML5 marketing website for **logicacode** (always lowercase — never "Logicacode" or "LogicaCode"), a company offering AI automation, RPA, digital transformation, and data science services. Hosted on **GitHub Pages** at `logicacode.com`.

- No mandatory build process or framework — static HTML5, CSS3, vanilla JavaScript and existing jQuery plugins
- Based on the **"RED" responsive template by Themetorium** (shipped Bootstrap **4.6.0** + jQuery)
- All new pages must match the existing visual identity — same CSS, same patterns, same look

## Brand Rules

- Brand name is always **logicacode** — all lowercase, in every context (titles, headings, copy, code comments, alt text)

## Workflow: Design Before Code

**Always generate a visual mockup (HTML/CSS sketch or annotated wireframe) for user approval BEFORE writing production code for any new page or major UI section.** Do not write production HTML until the design is confirmed.

Before building any new page:
1. Read `index.html` to understand current section patterns
2. Read `assets/css/theme.css` to find existing classes to reuse
3. Check `blog-single-post.html` or `about-us.html` for inner-page structure
4. Check `elements-buttons.html`, `elements-forms.html`, `elements-typography.html` for component patterns
5. Only write new CSS if no existing class covers the need

## Deployment

Pushing to `master` deploys automatically via GitHub Pages. The `CNAME` maps to `logicacode.com`. **All new work goes on feature branches — do not commit directly to `master`.**

## File Structure

```
/                        ← root HTML pages (index.html, contact.html, about-us.html, etc.)
/services/               ← inner pages for individual services
/solutions/              ← solution-specific landing pages
/industries/             ← industry-vertical pages
/_includes/              ← shared site-header.html + site-footer.html sources
/_scripts/               ← sync-layout.py copies shared markup into the static pages
/assets/css/             ← theme.css (template), helper.css, site.css (shared refinements)
/assets/js/              ← theme.js (template/forms), site.js (navigation/carousel accessibility)
/assets/img/             ← images and icons
/assets/vendor/          ← Bootstrap 3, jQuery, FontAwesome, OWL Carousel 2, etc.
/_OLD/                   ← archived previous site (do not modify)
/_ALT/                   ← alternative template themes (reference only)
/_mockups/               ← design mockups awaiting approval (not deployed)
```

Use an existing current page as the base for new pages, retain the shared marker blocks, and add the page to `_scripts/sync-layout.py`. Archived templates are references, not the current page architecture.

## Visual Identity — Do Not Change

| Element | Value |
|---|---|
| Primary / accent | `#F20000` (red) |
| Dark backgrounds | `#181818` |
| Body background | `#FFFFFF` |
| Text | `#000000` / `#585858` |
| Heading font | **Oswald** (Google Fonts, weights 300/400/700) |
| Body / paragraph font | **Open Sans** (Google Fonts, weights 300/400/600/700) |
| Icon library | **FontAwesome** (already in `/assets/vendor/fontawesome/`) |
| Grid | Bootstrap 4.6.0 `.container` / `.row` / `.col-*` |

Do **not** introduce new color values, new fonts, or new icon libraries on any page.

## CSS Conventions

All template classes use the `tt-*` prefix. Key patterns to reuse:

- **Sections** — `.section-wrap` with optional `.bg-dark`, `.bg-gray`, `.bg-color`
- **Page header** — `.page-header > .page-header-inner > .page-header-caption`
- **Info boxes / icon cards** — `.info-box`, `.info-box-icon`, `.info-box-content`
- **Buttons** — `.btn.btn-color` (red), `.btn.btn-dark`, `.btn.btn-light`, `.btn-rounded`
- **Parallax** — `.parallax-1` through `.parallax-8` (increasing scroll offset)
- **Fade on scroll** — `.fade-out-scroll-1` through `.fade-out-scroll-8`
- **Smooth scroll** — `.page-scroll` on anchor links
- **Carousel** — OWL Carousel with `data-*` attributes on `.owl-carousel`
- **Portfolio grid** — Isotope with `.portfolio-item` and filter category classes
- **Split box** — `.split-box`, `.split-box-img`, `.split-box-content`
- **Counter** — `.counter-item` with `.counter-number` (animated via CounterUp)

## Shared Component System

Header/footer sources are `_includes/site-header.html` and `_includes/site-footer.html`. They are copied into explicit marker blocks in the five marketing pages. No runtime fetch or JavaScript dependency is required to render them. After editing a shared source, run:

```sh
python _scripts/sync-layout.py
python _scripts/sync-layout.py --check
```

Do not separately edit generated copies. Use root-relative URLs for links and assets. `assets/css/site.css` loads after page styles; `assets/js/site.js` progressively enhances navigation and carousel accessibility.

Small-screen navigation remains visible without JavaScript. Enhanced menus have explicit expanded state and Escape dismissal. Carousels start paused; visitors can opt into playback. Preserve reduced-motion support, inactive-slide handling, and visible keyboard focus.

## Verification and preview

```sh
python -m http.server 8765 --bind 127.0.0.1
node --check assets/js/theme.js
node --check assets/js/site.js
node _tests/theme-guards.test.js
python _scripts/sync-layout.py --check
```

Check desktop, tablet, and 320px/390px mobile layouts. Test keyboard navigation and pending, success, failure, and retry form states. Intercept Web3Forms requests during tests; do not send real inquiries. Automated accessibility checks do not establish full compliance.

JPEG originals are retained alongside smaller WebP copies used by current pages. Keep image dimensions explicit and lazy-load below-fold images. Maintenance scripts and browser artifacts are excluded in `_config.yml`.

## Every Page Must Include

```html
<title>Page Title — logicacode</title>
<meta name="description" content="150–160 char description">
<meta property="og:title"       content="Page Title — logicacode">
<meta property="og:description" content="150–160 char description">
<meta property="og:image"       content="https://logicacode.com/assets/img/logo.png">
<meta property="og:url"         content="https://logicacode.com/PAGE-PATH/">
<link rel="canonical"           href="https://logicacode.com/PAGE-PATH/">
```

All `<img>` elements must have descriptive `alt` text.

## Key Integrations

- **Contact form** — Web3Forms (`https://api.web3forms.com/submit`), AJAX in `theme.js`. Form: `#contact-form-web3`, status: `#form-status`. Native POST fallback, duplicate protection, pending feedback, timeout, and recoverable errors that preserve input.
- **Google Analytics** — GA4 ID: `G-1Z4EW6VB3V`
- **Cookie consent** — Usercentrics, settings ID: `Wtpma_KU1m3fA0`
