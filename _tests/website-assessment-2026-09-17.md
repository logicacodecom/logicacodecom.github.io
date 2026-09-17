# logicacode website assessment

Reviewed September 17, 2026. Scope: live https://logicacode.com/ and the local source, including services.html, about-us.html, contact.html, and services/ai-automation.html.

**Overall judgment: a recognizable brand and working marketing-site foundation, with significant gaps in credibility, navigation, and accessibility.** The highest-value improvement is to make the site demonstrate expertise and support evaluation before asking every visitor to contact sales.

## Context and limits

The existing CLAUDE.md establishes the audience, static GitHub Pages architecture, and required visual identity: lowercase logicacode, red/black/white, Oswald headings, Open Sans body text. This review assumes the primary job is generating qualified consulting inquiries from operations and technology decision-makers. That goal is inferred from the content and calls to action, not validated through analytics or interviews.

Reviewed desktop at 1440px and mobile at 390px and 320px. Used rendered screenshots, DOM/accessibility inspection, axe-core 4.10.3 on the homepage, source review, and the existing JavaScript regression test. Automated accessibility coverage is a sample, not a compliance certification. No real contact submission was made; the form endpoint was intercepted for success and network-error tests. Actual email delivery, field Core Web Vitals, conversion rates, external social links, and factual business claims remain unverified.

## Anti-pattern verdict

**Mixed: recognizable identity, but a strong template impression.** The red accents and condensed typography are consistent and worth retaining. The full-screen eagle/cloud hero, generic team imagery, animated statistic blocks, multiple carousels, and broad technology copy feel more like a stock agency template than evidence of a specific engineering practice. These patterns do not establish that AI created the website.

## Scores

These are editorial assessment scores, not Lighthouse scores.

| Audit dimension | Score / 4 | Main finding |
|---|---:|---|
| Accessibility | 1 | Unnamed controls, confirmed contrast failures, uncontrolled autoplay |
| Performance | 2 | Substantial eager image loading and template plugin overhead |
| Responsive design | 2 | Main layout adapts, but narrow-screen CTA clipping and excessive hero wrapping |
| Theming / maintainability | 2 | Consistent brand palette, duplicated markup and hard-coded styling |
| Design anti-patterns | 2 | Generic photography, rotating hero, animated metrics |
| **Total** | **9/20** | **Poor under the audit rubric; targeted remediation needed** |

The theme score concerns maintainability of the existing light/dark sections. A user-selectable dark mode is not required for this site.

| Usability heuristic | Score / 4 | Main finding |
|---|---:|---|
| Visibility of system status | 2 | Form success/error messages exist; pending state is absent |
| Match to real-world language | 2 | Outcome-oriented hero copy, but BPR/RPA/IA and generic breadth need context |
| User control and freedom | 2 | Direct contact alternatives; Escape does not close the lateral menu |
| Consistency and standards | 2 | Different navigation/footer systems across pages |
| Error prevention | 3 | Required fields and email validation; no submission lock |
| Recognition rather than recall | 2 | Services are hidden from the homepage navigation |
| Flexibility and efficiency | 2 | Anchor shortcuts and direct contact exist; unnecessary scrolling/motion |
| Aesthetic and minimalist design | 2 | Strong palette, but oversized imagery and repetitive sections |
| Error recovery | 3 | Network failure preserves the entered message and suggests retrying |
| Help and guidance | 2 | Methodology and contact information exist; little consultation expectation-setting |
| **Total** | **22/40** | **Acceptable under the usability rubric; significant improvement needed** |

Heuristics are applied to a brochure/lead-generation site: absence of application features such as bulk actions or command shortcuts is not treated as a defect.

## Prioritized findings

Ten grouped findings: **0 P0, 5 P1, 5 P2, 0 P3**. P1 means a major usability, credibility, or accessibility issue. No tested primary flow was completely blocked.

### 1. P1 — Service discovery and navigation are fragmented

Location: index.html:132 (homepage navigation), index.html:1561 (footer services), services.html:39, contact.html:156, services/ai-automation.html navigation.

The homepage menu links to in-page sections, not the existing Services, About, or AI Automation pages. Its footer service links all return to the same overview section. Other pages use different headers, link sets, and footers. A prospect cannot reliably move from an overview into a detailed service explanation.

Recommendation: use a consistent Home / Services / About / Contact structure, expose the AI Automation detail page, and link individual service entries to meaningful destinations. Retain the existing brand. Suggested command: `/normalize`.

### 2. P1 — The proof presented is difficult to evaluate

Location: index.html:359–389 (business metrics), index.html:646–685 (delivery metrics), index.html:1040–1212 (use cases).

The site displays 60% manual effort reduction, 300% target ROI potential, $3.2M savings opportunities, and 126 delivery engagements without supporting context on the page. These may be accurate; this assessment did not verify them. Use-case titles/images link directly to the contact section rather than a detailed example. Although the secondary action says “Discuss This Use Case,” the article presentation encourages visitors to expect evidence they can inspect. Company principles in a quotation carousel offer philosophy rather than independent customer endorsement.

Recommendation: publish two or three substantiated examples with the problem, delivered solution, scope/timeframe, and measured result. Clearly distinguish targets, opportunities, and realized results. If metrics cannot be substantiated, remove them or state their basis. Suggested command: `/clarify`.

### 3. P1 — Navigation and carousel controls lack accessible names and robust keyboard behavior

Location: index.html:115, assets/js/theme.js:71, assets/js/theme.js:225, assets/css/theme.css:93.

The homepage hamburger is an unnamed anchor with no expanded state. The mobile axe sample found four unnamed carousel buttons and two unnamed links, including the menu trigger and down-arrow. Escape left the lateral menu open in a browser test. CSS globally removes anchor outlines; individual controls need explicit visible keyboard focus. Carousel clones also appear in the accessibility tree, repeating hero headings and links.

Recommendation: use a labeled menu button with aria-expanded/aria-controls, focus handling, Escape dismissal, named carousel controls, visible focus styles, and appropriate hiding of inactive/cloned slides. Suggested command: `/harden`.

Relevant standards: [W3C Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) and [Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

### 4. P1 — Confirmed text contrast failures

Location: assets/css/theme.css:3435, index.html:888, index.html use-case intro/category text.

Axe measured the methodology step numbers (#ccc on white) at **1.6:1**, below the 3:1 requirement for large text. White normal-sized text on #F20000 measured **4.39:1**, below 4.5:1, including use-case category labels and the intro paragraph. Counts vary with visible carousel items; the desktop contrast sample reported ten affected nodes.

Recommendation: darken the methodology numbers and adjust foreground/background treatment for small text using the established palette. Preserve the primary brand red where it is appropriate. Suggested command: `/normalize`.

### 5. P1 — Automatically changing content has no persistent pause control

Location: index.html:204, index.html:794, index.html:1286, assets/js/theme.js:210.

The hero and principle carousel advance every eight seconds; the platform logo carousel advances every seven seconds. Hover pause is configured, but there is no persistent pause control. No reduced-motion handling was found in the custom CSS/JavaScript. Rotating content is harder to read and makes the primary message depend on arrival time.

Recommendation: prefer a static hero and static proof content. For any retained autoplay, provide a persistent pause mechanism and respect reduced-motion preferences. Suggested command: `/distill`.

[W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) explains why pausing only while hovering or focusing is insufficient.

### 6. P2 — The hero uses the best screen space for decorative imagery

Location: index.html:200–300; desktop and mobile homepage screenshots.

The eagle/cloud imagery dominates the first viewport without showing the work or customer problem. The offer changes between AI automation, data modernization, and software engineering. Below it, broad descriptions repeatedly make similar claims. The page is approximately 7,260 CSS pixels tall at the tested desktop size.

Recommendation: choose a stable main promise, identify the intended buyer/problem, and use a workflow, product example, or project artifact as the signature visual. Follow with evidence, three service paths, methodology, and a contact action. Suggested command: `/distill`.

### 7. P2 — Narrow-screen CTA clipping and overlong headings

Location: services.html:52–56 and its shared button styling.

At a 320px viewport, “Book a Consultation” begins at x=30 and ends at x=332, extending outside the viewport. The service headline wraps into eight lines, pushing the CTA below the initial screen. The homepage is usable at 390px but spends most of that viewport on the hero. Off-canvas navigation and carousel tracks were excluded as false-positive overflow candidates.

Recommendation: allow CTA wrapping or use mobile-appropriate horizontal padding and max-width. Scale long headings and hero spacing for narrow viewports. Recheck 320px, 390px, tablet, and zoomed layouts. Suggested command: `/adapt`.

### 8. P2 — Contact submission lacks pending feedback and duplicate prevention

Location: assets/js/theme.js:599–622; index.html:1452; contact.html contact form.

With the request intercepted and held pending, the status remained empty and the Send Message button remained enabled. A user cannot tell whether anything is happening and can submit again. The homepage says all fields are required, but the topic select is optional. The “Book a Call” and “Book a Consultation” labels lead to a message form, without scheduling or a stated response timeframe.

Recommendation: show “Sending…”, disable repeated submissions until completion, restore the button after failure, align required indicators, and explain the next step. Keep the verified success announcement and preservation of input after network failure. Both forms also lack an explicit POST action fallback and depend on JavaScript interception; add a resilient fallback if supported. Suggested command: `/harden`, with `/clarify` for labels.

### 9. P2 — Eager image loading and template overhead create avoidable weight

Location: index.html asset includes and background images; assets/js/theme.js:59 and scroll handlers.

A desktop resource sample before injecting axe recorded 63 resource requests and approximately **2.53 MB of encoded response bodies reported by Resource Timing**. Some third-party sizes are hidden, so this is not a full cold-transfer total. The contact map alone is approximately 615 KB; the three hero JPEGs total approximately 723 KB. Lower-page imagery loads early. The page also loads YouTube, gallery, and filtering plugins despite no visible active feature needing some of them. A full-page preloader waits for window load before revealing the site.

Recommendation: resize/compress imagery, evaluate WebP/AVIF, defer below-fold assets, remove unused plugins after checking their consumers, and remove the blocking preloader. Validate changes with throttled loading and field data where available. No Core Web Vitals failure is claimed from this sample. Suggested command: `/optimize`.

### 10. P2 — Duplicated styles and documentation drift complicate maintenance

Location: CLAUDE.md shared-component section; headers/footers in the five HTML pages; assets/css/theme.css and helper.css.

CLAUDE.md describes shared components and lc-components.js, but the current tree has independently authored headers/footers and none of those component files. It describes Bootstrap 3, while the shipped CSS identifies itself as Bootstrap 4.6.0. Master/helper CSS total approximately 237 KB uncompressed and contain broad template styling. Colors and footer/header styles are repeatedly hard-coded. The homepage also lacks a main landmark and has heading-level skips detected by axe.

Recommendation: document the actual architecture, establish reusable header/footer markup using a GitHub Pages-compatible approach, consolidate repeated styling, and repair landmarks/heading hierarchy. A framework migration is unnecessary for these fixes. Suggested command: `/extract` and `/harden`.

## What works

- A recognizable red/black/white identity, consistent heading/body families, and visible primary actions.
- Outcome-oriented language in the hero and a useful Discover / Build / Deploy explanation.
- All five inspected live routes returned HTTP 200, with no JavaScript page errors during initial loading and no broken loaded images detected.
- Unique page titles, descriptions, canonical links, Open Graph metadata, robots.txt, and a sitemap provide a sensible SEO foundation. Rankings and index coverage were not measured.
- Dedicated contact-page fields have visible labels, autocomplete where appropriate, required validation, and an aria-live status region.
- Mocked success resets the form and announces success. Mocked network failure retains the entered message and offers a retry.
- `node _tests/theme-guards.test.js` passes both with no optional plugins and all eight stubbed plugins. This verifies binding resilience, not backend email delivery.

## Persona walkthroughs and cognitive load

**Jordan, first-time visitor:** can identify AI automation and a consultation CTA, but cannot tell whether the use cases describe delivered projects or illustrative possibilities. Clicking their titles leads to contact rather than explanation. BPR is not expanded in the service heading.

**Sam, keyboard/assistive-technology user:** encounters an unnamed menu trigger and carousel controls, repeated slide content, weak focus treatment, and no Escape dismissal of the menu. Automated contrast failures add difficulty for low-vision users. A full screen-reader session was not performed.

**Prospective operations buyer:** sees attractive efficiency/ROI claims but cannot inspect their calculation or a supporting project narrative. Service details exist, but the homepage navigation does not surface them. This creates uncertainty at the point where the site should establish trust.

Cognitive-load checklist: single focus **fail** (changing hero proposition); chunking **fail** (six equally weighted service categories); related grouping **pass**; visual hierarchy **pass**; one decision at a time **pass**; minimal choices **pass overall** (menu choices are familiar navigation, not a complex comparison task); working-memory demands **pass**; progressive disclosure **pass** (methodology accordion). **2/8 failures: moderate load.** Counts alone do not establish usability problems; the emphasis should be on clearer service grouping and a stable opening message.

## Recommended sequence

1. `/harden` — named controls, focus, keyboard behavior, landmarks, form pending state.
2. `/normalize` — contrast and consistent navigation exposing actual service pages.
3. `/clarify` — substantiate claims, explain use cases, and align consultation labels with behavior.
4. `/distill` — stable hero, less carousel motion, shorter path from promise to evidence.
5. `/adapt` — narrow-screen button sizing and heading rhythm.
6. `/optimize` — image payload, unused plugins, and preloader.
7. `/extract` — reusable navigation/footer and accurate project documentation.
8. `/polish` — final spacing, typography, focus, and viewport checks.

These commands can be run individually or together. Re-run `/audit` and `/critique` after changes. The main content dependency is which business claims can be supported with publishable evidence; visual refinements should follow that evidence.

## Evidence artifacts

- Desktop homepage: ../.playwright-mcp/assessment-home-desktop-full.png
- Mobile homepage: ../.playwright-mcp/assessment-home-mobile.png
- Services at 320px: ../.playwright-mcp/assessment-services-320.png

Only assessment artifacts were added. Production website files were not changed.
