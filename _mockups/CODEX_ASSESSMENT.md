# logicacode menu, new pages and homepage mockup assessment

Assessed 19 September 2026 on `feature/menu-rebuild`, HEAD `8a34f7a`, including the uncommitted `_mockups/home/index.html`. Assessment only; no implementation changes, commits, pushes or deployment. File references below use repository-relative paths and one-based lines.

## Verdict

**Revise before merging the menu/pages or approving the homepage mockup.** The enhanced navigation works well with a keyboard, the new pages largely fit the existing template, and their metadata and internal links are in good shape. The significant problems are the no-JavaScript layout, factual claims, text contrast, and a clipped product name at 320px. The mockup also has a reproducible keyboard problem in its main conversion path.

**Design anti-pattern verdict: mixed, not a wholesale failure.** The uppercase Oswald typography, red bands and angled offer fit this site. The oversized proof figures, repeated broad AI promises, three uniform icon cards and large product tiles without product imagery make parts of the mockup feel generic. This is a design judgment, not evidence of how the work was authored. Keep the established fonts, colors and unchanged hero; strengthen the substance beneath it.

| Dimension | Score / 4 | Main reason |
|---|---:|---|
| Accessibility | 2 | Disclosure keyboard handling is good; contrast and CTA focus need work. |
| Performance | 3 | WebP assets and little new JavaScript; eager decorative backgrounds remain. No speed benchmark was performed. |
| Responsive design | 2 | Enhanced layouts generally fit; 320px product clipping and the no-JS overlay are exceptions. |
| Theming / brand | 3 | Existing typography and components retained; mockup black backgrounds and a specificity collision drift from the rules. |
| Design anti-patterns | 2 | Strong brand framing, but generic promises and oversized, weakly substantiated proof. |
| **Total** | **12/20** | **Significant work needed before approval.** |

The theming score is against this project's fixed brand, not an expectation to add dark mode. Scores describe this review, not a compliance certification.

**14 findings: 5 must fix (P1), 6 should fix (P2), 3 nice to have (P3); no P0.** “Must fix” applies before publishing the affected work; mockup findings do not mean those changes are already live.

## Evidence and scope

- Read `CLAUDE.md` first, then the shared sources, all 11 new pages, homepage mockup, existing destination pages, content planning documents, sitemap, build exclusions and verification scripts.
- Passed: `node --check assets/js/site.js`, `node _tests/theme-guards.test.js`, and `python _scripts/sync-layout.py --check`.
- Used the existing local preview at `http://127.0.0.1:8765` in Chromium. Checked `/`, Automation, Industries, SESAT, Careers and the mockup at 320, 390, 768, 1024 and 1440 CSS pixels. Checked the other seven new pages at 320, 390, 768 and 1440. Used 900–1000px viewport heights.
- Exercised all four dropdowns at 320, 390, 768, 901, 1024 and 1440px: Enter opens, Tab reaches panel links, Escape closes the panel and restores trigger focus. A second Escape closes the mobile menu and restores its toggle focus.
- Checked no-JavaScript navigation at 320, 390 and 1440px; inspected desktop and mobile screenshots in memory. No screenshot files were written.
- Ran axe-core 4.10.3 with WCAG A/AA and best-practice tags on all 11 new pages and the mockup at 390px, plus targeted open-menu contrast checks. Ten new pages had no automated violations in their initial closed-menu state; Advisory had one contrast failure. The mockup had 27 contrast nodes in the measured state. Those results do not cover every interaction or establish full accessibility.
- Checked local links and fragments across all 17 synchronized production pages and the mockup: no missing destinations/fragments or duplicate source IDs found. All 11 new pages returned HTTP 200. No uncaught page errors were observed during the seven-page supplemental viewport run.
- No contact form was submitted, even as a simulated submission. Web3Forms was blocked on the interactive assessment page as an additional precaution. Form pending/success/error/retry behavior was not retested.
- Business assertions were assessed against repository evidence. A content draft repeating an assertion is not independent verification of customers, staffing, certifications or current product usage. Public product operation and employment policies were not independently verified. Safari, Firefox, physical touch devices and a screen reader were not tested.

## Must fix

### F01 — P1: the no-JavaScript navigation covers the page

**Category:** accessibility / responsive design. **Locations:** `assets/css/site.css:27`, `assets/css/site.css:89`, `assets/css/site.css:169`, `assets/css/site.css:260`; `_includes/site-header.html:8`.

Panels do remain visible without JavaScript, but the entire header remains `position: absolute`. Thus the expanded lists do not reserve space before `main`. On Automation at 390px the header was approximately 2,659px tall while `main` still began at y=0; at 1440px the header was approximately 1,853px tall. The navigation obscures the hero and substantial content beneath it. On desktop, the unenhanced panels also lack the solid panel background supplied only under `.lc-nav-enhanced`.

**Recommendation:** make the unenhanced header/navigation participate in normal document flow with readable backgrounds. Apply floating-header positioning only once enhancement succeeds. Retest reading and following deep links with scripts disabled, not just whether panel links exist. No-JS disclosure buttons should not announce collapsed state while their content is always expanded. **Suggested command:** `/harden`.

### F02 — P1: the mockup restores a claim previously rejected by the business

**Category:** content accuracy. **Locations:** `_mockups/home/index.html:533`, `:535`, `:538`; `CONTENT_DIGITAL_MARKETING_ASSESSMENT.md:18`, `:20`, `:22`.

“Since 2010” and “15+ years building intelligent software” are prominent proof. The earlier assessment explicitly records that the business said the company counters were untrue and that “Since 2010” was removed. Reintroducing it contradicts the project's recorded correction. “Long before it was called AI” adds a sweeping, unsupported historical claim; it does not explain a useful customer benefit.

**Recommendation:** remove the contradicted date/tenure proof unless the business supplies a documented correction to the earlier decision. Replace the historical flourish with a concrete description of systems actually built. Do not replace these numbers with invented results, awards or testimonials. **Suggested command:** `/clarify`.

### F03 — P1: resolve the explicitly open capability claims before publishing them as facts

**Category:** content accuracy. **Locations:** `CONTENT_SERVICES_MENU.md:5`, `:72`, `:242`, `:245`; `services/professional-services.html:229`, `:234`, `:279`; `innovations/newsroom247.html:251`.

The draft explicitly leaves open which services the business offers and which platforms it can honestly list. Production Professional Services now presents the whole platform list as experienced specialisms and adds “Certified cloud engineers.” Newsroom247 adds a “24/7” proof figure without defining availability, support or an operating commitment. These affect purchasing expectations and should not be inferred from a borrowed service taxonomy or a product name.

The following evidence distinctions matter:

| Claim | Repository evidence | Required treatment |
|---|---|---|
| Professional Services platforms and certified engineers | Platform list occurs in the draft, but its truth is an unchecked open decision. Certification evidence was not found. | Validate actual staff capability per platform; remove unsupported entries and certification wording. “Full Stack” is a discipline, not a platform. |
| Newsroom247 “24/7” | `innovations/newsroom247.html:251`; no equivalent availability commitment in the product brief at `CONTENT_SERVICES_MENU.md:137`. | Define and substantiate the promise, or replace it with a factual capability such as digital and print publishing. |
| SESAT “365 schools” | Present in the source brief at `CONTENT_SERVICES_MENU.md:171`, so it was not newly invented in these pages. Repeated in `innovations/sesat.html:18`, `:240`, `:249`, `_includes/site-header.html:101`, and mockup `:540`, `:617`. | Confirm whether this is current active use or historical deployment, with an as-of date. The mockup's “running” wording is stronger than a historical installation count. Update the shared source if wording changes. |
| Careers remote-friendly work | Present in the source draft at `CONTENT_SERVICES_MENU.md:224`; rendered at `careers.html:269` and `:272`. | Confirm policy, eligible locations and role limitations. Draft provenance is not proof of an employment benefit. |
| Three products in daily use; work across the US and Middle East, including oil fields | `_mockups/home/index.html:535`, `:539`, `:541`, `:561`, `:598`. No usage/deployment evidence supplied. | Separate products built, products currently operated, geographic reach and sectors actually served. Use verified facts only. |
| Autonomous learning/repair, managed SLAs and monitoring | `services/automation.html:258`, `:278`, `:318`; `services/cloud.html:277`, `:287`. | Explain the delivered scope and human oversight. Confirm any ongoing operations/SLA offer; avoid presenting possible capabilities as universal guarantees. |

The current ClueXP page is clearer about scope: `innovations/cluexp.html:235` explicitly says home lockouts are supported today. Preserve that qualification. **Suggested command:** `/clarify`.

### F04 — P1: shared product descriptors and mockup text fail contrast

**Category:** accessibility. **Locations:** `assets/css/site.css:168`; `services/advisory-consulting.html:263`; `_mockups/home/index.html:97`, `:103`, `:119`, `:120`, `:124`, `:135`, `:145`, `:147`, `:153`, `:177`.

Measured examples:

| Text / context | Ratio | Result |
|---|---:|---|
| Innovations menu's 13px red descriptors on `#181818` | 4.03:1 | Fails normal-text minimum. |
| Advisory's inline architecture link, 19px regular red on white | 4.39:1 | Fails normal-text minimum. |
| Mockup's regular red links on white / pale outcome cards | 4.39:1 / 4.06:1 | Fails normal-text minimum. |
| Mockup's Industries eyebrow / mobile supporting paragraph | 3.06:1 / 3.70:1 | Fails normal-text minimum. |
| Mockup's SESAT supporting text / offer paragraph | 3.06:1 / 3.83:1 | Fails normal-text minimum. |
| Mockup's 18px regular mobile industry links, white on red | 4.39:1 | Fails normal-text minimum. |

Normal text needs 4.5:1; qualifying large text needs 3:1. A brand color is not an exemption for general interface text, and 4.39 cannot be rounded up to a pass. See [W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

**Recommendation:** preserve the palette. Use dark text on light backgrounds and white on dark backgrounds; reserve red for accents or suitably large text. On red bands, use an existing dark text color or change the text's size/weight to meet the applicable threshold. Simply replacing translucent white with opaque white still leaves small white-on-red text below 4.5:1. Check hover, focus and current-page states too. **Suggested command:** `/normalize`.

### F05 — P1: Newsroom247 is visibly cropped at 320px

**Category:** responsive design / accessibility. **Locations:** `_mockups/home/index.html:140`, `:144`, `:175`, `:604`.

The product heading has a 48px minimum, while its tile has `overflow: hidden`. At 320px the rendered word measured approximately 294px across inside a 259px tile: its text bounds ran from x=5 to x=300 while the tile ran from x=23 to x=282. Both ends were clipped. This is why the document-width overflow checks passed despite visible content loss. The 390px rendering fit.

**Recommendation:** size the word to the available inline space, reduce narrow-screen padding/type size, or deliberately wrap it without losing characters. Check text bounds and screenshots, not only element boxes. This is relevant to [WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). **Suggested command:** `/adapt`.

## Should fix

### F06 — P2: the call CTA scrolls to the form but keyboard focus stays in the hero

**Category:** accessibility / conversion. **Locations:** `assets/js/theme.js:172`; `_mockups/home/index.html:422`, `:632`, `:875`.

Reproduction: activate the hero's “Book a free AI call,” then press Tab. The topic correctly becomes “AI Opportunity Call,” but focus remains on the hero link. The next Tab focuses the carousel's Previous button and scrolls back to the top. The user has to find the form again.

**Recommendation:** after the scroll, move focus to a meaningful form heading or the first field. The generic `.page-scroll` handler is inherited, but the new booking CTA exposes its problem in the primary conversion path. Verify both keyboard activation and reduced-motion behavior. **Suggested command:** `/harden`.

### F07 — P2: “All services” still leads to a conflicting four-service model

**Category:** information architecture / content. **Locations:** `_includes/site-header.html:13`, `:16`; `services.html:179`, `:193`, `:202`, `:210`, `:217`; `_mockups/home/index.html:551`.

The new menu presents six service categories, while its “All services” destination says “Four services, one engine,” links to the older AI Automation page and does not route users to the six new categories. The mockup's main services link inherits the same mismatch. Professional Services and Advisory are especially hard to discover from that overview.

**Recommendation:** align the overview and navigation taxonomy, with explicit links to the six categories. Decide how the retained AI Automation and Enterprise Architecture pages fit beneath them. This is a navigation consistency problem, not a claim that the links return 404s. **Suggested command:** `/clarify`.

### F08 — P2: “Book” promises more than the contact flow provides

**Category:** content / conversion. **Locations:** `_mockups/home/index.html:630`, `:632`, `:724`, `:734`, `:753`, `:761`.

The offer promises a free 30-minute opportunity call and says “Book my free call,” but the destination is a general inquiry form with required Subject and Message fields, a “Send Message” button and a reply-within-two-business-days note. There is no appointment selection or booking confirmation. The promise to find “the one workflow” is also unconditional before any discovery.

**Recommendation:** frame the action as requesting the call and explain how a time is arranged, or supply a genuine scheduling flow after approval. Give the call request a clear form heading and remove redundant effort where appropriate. Confirm the free offer itself is supported by the business. **Suggested command:** `/clarify`.

### F09 — P2: the homepage postpones concrete evidence and repeats its pitch

**Category:** UX / design judgment. **Locations:** `_mockups/home/index.html:95`, `:108`, `:128`, `:140`, `:530`, `:547`, `:579`, `:594`.

The alternating bands establish hierarchy well on desktop, but two large introductory sections repeat “AI” positioning before the visitor gets concrete capabilities. At 390px, the Newsroom247 tile begins around 4,686px down the page. On mobile the cards and products stack, making the spacious desktop treatment a long sequence of broad promises. “Used Every Day” is followed by a generic photographer image and text-only product tiles, not evidence of the actual software.

**Recommendation:** shorten or combine the guide and “Lead with AI” sections, replace unverified figures with a concise factual proof block, and show approved product screenshots or a concrete workflow. Preserve the red Industries band and clear outcome links. Do not add fabricated testimonials to fill the gap. **Suggested command:** `/distill`.

### F10 — P2: the mockup has brand drift and a real selector collision

**Category:** theming / maintainability. **Locations:** `_mockups/home/index.html:96`, `:141`, `:143`, `:145`, `:150`; `CLAUDE.md:62`.

Large story/offer surfaces use `#000` although the documented dark-background color is `#181818`. Black is listed as a text color, so these surfaces deserve correction under the explicit project palette rules.

Separately, `.lc-product-tile p` is more specific than `.lc-product-kicker`. Its later font shorthand, margin and color override the kicker design. Computed output was `300 20px/30px Open Sans` with an 18px top margin, instead of the intended 15px Oswald treatment. This weakens the label/body hierarchy and contributes to the SESAT contrast problem.

**Recommendation:** use the existing dark token and scope paragraph styles to the intended body copy, or explicitly define the kicker at sufficient specificity. Keep prototype styles isolated until the design is approved; then integrate them with `site.css` loaded after page styles as the project requires. **Suggested command:** `/normalize`.

### F11 — P2: the saved browser regression script no longer matches the site

**Category:** code quality / verification. **Locations:** `_tests/browser-checks.js:9`, `:55`, `:58`, `:60`; `assets/js/site.js:77`.

The script covers five older routes and waits for `.lc-carousel-toggle` and “Play slides” / “Pause slides” controls that the current implementation intentionally does not provide. It will stall at that obsolete expectation instead of completing the current regression checks. The passing theme guard test checks plugin resilience, not dropdowns, no-JS layout or the 11 new pages.

**Recommendation:** replace the obsolete carousel expectations with paused/no-autoplay checks and add the current disclosure interactions, fallback layout, CTA focus and 320px text-clipping checks. Do not run the existing form section unchanged for this assessment; the brief specifically forbids submission. This report used separate read-only browser checks. **Suggested command:** `/harden`.

## Nice to have

### F12 — P3: mockup metadata is short of the project's description rule

**Category:** SEO / project convention. **Locations:** `_mockups/home/index.html:12`, `:17`.

The description and OG description are 140 characters, below the requested 150–160. This is inherited homepage copy, not a new-page defect and not a claim that Google requires that exact length. The mockup correctly has `noindex` at line 91 and is excluded from the Jekyll build.

**Recommendation:** revise the description when promoting an approved homepage, remove the mockup-only title prefix/banner/noindex then, and keep its root canonical. **Suggested command:** `/clarify`.

### F13 — P3: below-fold backgrounds load without responsive or lazy image treatment

**Category:** performance. **Locations:** `_mockups/home/index.html:117`, `:141`, `:637`; `services/automation.html:353`.

The mockup uses CSS backgrounds for the Industries image (~230KB), Newsroom247 image (~113KB) and contact map (~228KB). WebP is a good baseline, but CSS backgrounds do not receive native `loading="lazy"` or `srcset` selection. There is no measured speed regression here; this is an optimization opportunity for the long page.

**Recommendation:** where these visuals remain after design approval, use appropriately sized responsive image assets and defer below-fold loading where practical. Keep intrinsic dimensions for content images. Do not lazy-load the hero's primary image. **Suggested command:** `/optimize`.

### F14 — P3: remove misleading leftovers from shared CSS

**Category:** code quality. **Locations:** `assets/css/site.css:82`, `:87`, `:248`, `:272`, `:275`.

The mobile `.lc-hero { padding: 48px 0; }` cannot change the top padding because the earlier 150px declaration is `!important`; this is misleading to a future maintainer, even if the 150px clearance is intentional. `.accel-card .price-note` and the `.accel-card` padding branch have no matching elements in the synchronized production pages following removal of the accelerator offer.

**Recommendation:** make the intended mobile hero padding explicit and remove confirmed retired accelerator selectors in a later cleanup. The duplicated header/footer HTML is intentional generated output, not a reason to replace the static architecture. **Suggested command:** `/polish`.

## What is working and should be preserved

- **Navigation:** native disclosure buttons, accurate enhanced `aria-expanded` state, `hidden` panels, visible keyboard focus, one open panel at a time, and two-stage Escape handling on mobile. The desktop intro columns and grouped services are useful; no width overflow was found in opened panels at the tested breakpoints. Mobile Services is long (about 965px of panel content), but its links remain scrollable and keyboard reachable. That length alone is not a blocker.
- **New-page structure:** consistent hero, introduction, service/feature content, related industries and final CTA. All 11 have one source H1 and sensible H2/H3 progression. ClueXP's constrained current scope is particularly helpful. Advisory and Data & AI generally explain customer decisions more clearly than the jargon-heavy Automation/Product Engineering headings.
- **Brand:** Oswald, Open Sans, Font Awesome and capitalized visual headlines are retained. Source uses lowercase `logicacode`. Headline transformations should preserve the lowercase brand word where it appears, such as `careers.html:229`; this is a brand exception to all-caps styling, not a reason to rename the company in source.
- **Reduced motion:** the shared reduced-motion rules disable parallax transforms and shorten transitions; the mockup's reveal hiding is restricted to `no-preference`. With reduced motion enabled, all 11 reveal containers computed to opacity 1. Inactive hero slides were inert and hidden from assistive technology. The original hero design was treated as fixed scope.
- **Technical hygiene:** all 17 production pages are listed in the layout synchronizer; header/footer copies pass `--check`. All use matching `site.css?v=20260919e` and `site.js?v=20260919e`. No stale-version mismatch found. The mockup is intentionally outside synchronization/build publication.
- **SEO:** all 11 new titles include lowercase `logicacode`; canonical and OG URLs agree and each is in `sitemap.xml`. Their decoded description lengths are Automation 157, Cloud 150, Data & AI 151, Product Engineering 152, Professional Services 158, Advisory 153, Industries 157, Newsroom247 158, ClueXP 157, SESAT 157 and Careers 160. All meet the requested range. OG descriptions match. The shared logo has alt text and explicit 954×166 dimensions; new pages use backgrounds for their other imagery.
- **Content restraint:** no invented testimonial or award blocks were found in the assessed additions. Keep that restraint while fixing the factual proof issues above.

## Recommended sequence

1. **P1 — `/clarify`:** resolve the contradicted date and capability/usage evidence, then update claims consistently in shared navigation, pages and metadata.
2. **P1 — `/harden`, `/normalize`, `/adapt`:** repair no-JS document flow, contrast and the 320px product heading.
3. **P2 — `/harden`, `/clarify`:** correct the CTA focus path, align the six-service overview and make call-request expectations accurate; update browser coverage.
4. **P2/P3 — `/distill`, `/normalize`, `/optimize`:** tighten the mockup's mobile flow, product proof, CSS hierarchy and image delivery. Keep it a mockup pending design approval.
5. **Final — `/polish`:** finish the consistency pass, then re-run `/audit` and the project checks against the revised work.

These are recommendations only; none were applied. They can be requested individually or together. Preserve the project's design-before-production workflow; this assessment does not establish that prior design approvals occurred or grant approval for the current mockup.
