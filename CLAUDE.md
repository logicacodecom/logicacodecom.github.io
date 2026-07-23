# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML5 marketing website for **logicacode** (always lowercase — never "Logicacode" or "LogicaCode"), a company offering AI automation, RPA, digital transformation, and data science services. Hosted on **GitHub Pages** at `logicacode.com`.

- No build process, no frameworks, no build tools — plain HTML5, CSS3, vanilla JavaScript only
- Based on the **"RED" responsive template by Themetorium** (Bootstrap 3 + jQuery)
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
/components/             ← shared header.html + footer.html (injected via JS)
/assets/css/             ← theme.css (master), menu.css (nav), helper.css, lc-nav.css (new nav)
/assets/js/              ← theme.js (template), lc-components.js (injector), lc-nav.js (nav behaviour)
/assets/img/             ← images and icons
/assets/vendor/          ← Bootstrap 3, jQuery, FontAwesome, OWL Carousel 2, etc.
/_OLD/                   ← archived previous site (do not modify)
/_ALT/                   ← alternative template themes (reference only)
/_mockups/               ← design mockups awaiting approval (not deployed)
```

`template.html` in the root is the base skeleton for every new page — copy it, do not start from scratch.

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
| Grid | Bootstrap 3 `.container` / `.row` / `.col-*` |

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

Header and footer are injected into every page by `lc-components.js` — do not hard-code them:

```html
<!-- top of <body> -->
<div id="lc-header-mount"></div>

<!-- bottom of <body>, before vendor scripts -->
<div id="lc-footer-mount"></div>
```

Load order in `<head>`: `lc-nav.css` → `lc-components.js defer` → `lc-nav.js defer`

Component markup lives in `/components/header.html` and `/components/footer.html`. Edit those files to update nav links or footer content across all pages simultaneously.

## Every Page Must Include

```html
<title>Page Title — logicacode</title>
<meta name="description" content="150–160 char description">
<meta property="og:title"       content="Page Title — logicacode">
<meta property="og:description" content="150–160 char description">
<meta property="og:image"       content="https://logicacode.com/assets/img/og-default.jpg">
<meta property="og:url"         content="https://logicacode.com/PAGE-PATH/">
<link rel="canonical"           href="https://logicacode.com/PAGE-PATH/">
```

All `<img>` elements must have descriptive `alt` text.

## Key Integrations

- **Contact form** — Web3Forms (`https://api.web3forms.com/submit`), AJAX in `theme.js`. Form: `#contact-form-web3`, status: `#form-status`
- **Google Analytics** — GA4 ID: `G-1Z4EW6VB3V`
- **Cookie consent** — Usercentrics, settings ID: `Wtpma_KU1m3fA0`
