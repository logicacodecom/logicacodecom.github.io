# Website fixes — verification

Implemented locally on branch `fix/site-usability-accessibility`. Not deployed.

## Changes

- Shared, server-independent header/footer markup on all five marketing pages, with actual service destinations and current-page indication.
- Accessible mobile menu with Escape dismissal and focus return; visible navigation without JavaScript.
- Skip links, main landmarks, corrected heading levels, named controls, visible focus, and text contrast fixes.
- Responsive headings and buttons, visible form labels, and legible contact-card instructions/status text.
- Carousels start paused, expose play/pause controls, hide inactive slides from keyboard/assistive-technology navigation, and stop playback when reduced motion is enabled. Removed global arrow-key interception.
- Contact forms show sending feedback, prevent duplicate submissions, handle a 20-second timeout, preserve input on errors, and support native POST when JavaScript is unavailable.
- Removed the blocking preloader markup and unused plugin includes. Converted referenced photography to WebP; below-fold content images have native lazy loading and explicit dimensions.
- Referenced image files reduced from 2,175,079 to 1,102,902 bytes: **49.3% smaller**. This measures those asset files, not total page transfer or Core Web Vitals. Original JPEGs are retained.
- Updated project guidance to reflect Bootstrap 4.6.0 and the static shared-layout workflow. Corrected the AI service page's nonexistent Open Graph image reference.

## Passing checks

- `node --check assets/js/theme.js`
- `node --check assets/js/site.js`
- `node _tests/theme-guards.test.js` — form binding with zero optional plugins and all eight plugins.
- `python _scripts/sync-layout.py --check`
- `git diff --check`
- Local link and asset existence check: no missing targets in the five marketing pages.
- `_tests/browser-checks.js`, run through the Playwright browser tool against `http://127.0.0.1:8765`: five pages at 1440, 768, 390, and 320 CSS pixels. Zero detected axe violations for the configured WCAG A/AA and best-practice rules after font/carousel initialization; no detected heading/button/form overflow; one main and one site footer; no initial JavaScript errors.
- Mobile menu: open, keyboard traversal, Escape close, focus returned to toggle.
- Carousel: starts paused, explicit playback, reduced-motion stop, working next control.
- Both forms: pending state, duplicate prevention, success/reset, API rejection, HTTP 503, network error, retry, and Unicode input.
- Separate timeout test using Playwright's clock: timeout message displayed, submission restored, message preserved.
- Separate no-JavaScript test: navigation visible and form issued a native POST with the entered message.
- Visual review of the desktop homepage, mobile homepage/contact page, and services at 320px. A white-on-white contact-card message missed by the automated scan was corrected and visually rechecked.

All test form requests were intercepted. No real inquiry was delivered. Actual Web3Forms email delivery, field performance, customer claims, and full screen-reader/browser compatibility remain unverified. Automated accessibility checks are not a compliance certification.

## Maintenance

Edit `_includes/site-header.html` or `_includes/site-footer.html`, then run `python _scripts/sync-layout.py`. The browser check file is an async Playwright callback accepted by the browser tool's `filename` argument. It expects the local server on port 8765 and requires network access to load the pinned axe script.

No business metrics or case-study claims were invented or independently validated in this change.
