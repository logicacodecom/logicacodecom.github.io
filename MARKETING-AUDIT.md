# logicacode.com — Marketing & Conversion Audit

**Audited:** 2026-07-23
**Scope:** live site on `master` (= what GitHub Pages deploys)
**Pages reviewed:** `index.html`, `services.html`, `about-us.html`, `contact.html`, `services/ai-automation.html`, `404.html`, `assets/js/theme.js`, `robots.txt`, `sitemap.xml`, asset tree
**Audience:** any agent picking up work on this repo. Read the P0 section before touching anything else.

---

## Bottom line

The site reads as credible for about six seconds, then leaks. Two structural faults mean most of what has been built is either unreachable or non-functional:

1. The contact form on `/contact.html` **silently discards every lead**.
2. The homepage **does not link to any other page on the site**.

Fix those two and the site roughly doubles its useful surface area without a single new page. Everything below them is trust, message, SEO, performance, and legal — real, but worthless while leads vanish.

Severity key: **P0** = losing money now · **P1** = losing trust/deals · **P2** = losing compounding growth

---

## P0-1 — Lead capture on `/contact.html` is broken

**Status:** confirmed by code trace, not yet reproduced in a browser.

### What happens

`contact.html` loads only jQuery and `theme.js`:

```html
<!-- contact.html:241-242 -->
<script src="assets/vendor/jquery/jquery-min.js"></script>
<script src="assets/js/theme.js"></script>
```

But `theme.js` calls an unloaded plugin at top level inside its IIFE:

```js
// assets/js/theme.js:180  — inside (function ($) { 'use strict'; ... })
$(".youtube-bg").mb_YTPlayer();
```

`jquery.mb.YTPlayer.min.js` is **not** loaded on that page, so `.mb_YTPlayer` is `undefined`. Calling it throws `TypeError` synchronously, which aborts the remainder of the IIFE — including the Web3Forms AJAX submit handler registered at `assets/js/theme.js:582`.

The form has no `action` attribute. With the handler unbound, the browser performs a native GET back to `contact.html?name=…&email=…`. The prospect sees the page blink and reset.

**Web3Forms never receives the submission. No error, no email, no trace in analytics.**

### Blast radius

Same crash on `services/ai-automation.html` (scripts at lines 690–698 — also missing YTPlayer). That page has no form and, verified in a browser, **no carousel markup** — an earlier draft of this audit wrongly claimed two carousels, having matched the `owl.carousel.min.css` and `.js` include lines rather than any `class="owl-carousel"` element. What the crash actually killed there:
- the scroll-to-top control (`theme.js:639-646`, never bound)
- the deferred-video loader (`theme.js:493`, `window.onload` never assigned)
- the form placeholder/file-input helpers and the Bootstrap tooltip/popover init

The lateral nav is **not** affected — its handler sits at `theme.js:71-102`, above the crash point.

Only `index.html` is unaffected, because it loads the full vendor stack (`ytplayer` included, `index.html:1644`).

**Compounding:** every CTA on `services.html`, `about-us.html`, and `services/ai-automation.html` points at `/contact.html`. The entire inner-page funnel dead-ends at a dead form. The AI automation page (700 lines, 5 CTAs) currently converts at zero.

### Verify

```bash
grep -c "ytplayer" contact.html services/ai-automation.html index.html
# expect: 0, 0, 2  ← the two zeros are the bug
```

Then open `/contact.html` with devtools console open and submit — expect `TypeError: $(...).mb_YTPlayer is not a function` and a URL that gains a query string.

### Fix options

| Option | Change | Trade-off |
|---|---|---|
| **A (recommended)** | Guard `theme.js:180`: `if ($.fn.mb_YTPlayer) { $(".youtube-bg").mb_YTPlayer(); }` | One line, fixes every current and future page at once. Root cause. |
| B | Add `<script src="/assets/vendor/ytplayer/js/jquery.mb.YTPlayer.min.js">` to both pages | Ships ~40 KB of dead weight to pages with no video. Symptom fix — the next new page repeats the bug. |

Option A is the smaller diff **and** the root-cause fix. Note that `theme.js` has the same unguarded-plugin pattern for magnific-popup, isotope, counterUp and owl — audit those in the same pass so the next slim page doesn't reintroduce this.

---

## P0-2 — The homepage does not link to the rest of the site

The homepage nav (`index.html:118-129`) is six on-page anchors only:

```
Home · Why Us · Who We Are · What We Do · Methodology · Contact
```

There is **no link to `/services.html`, `/about-us.html`, `/contact.html`, or `/services/ai-automation.html`.**

Those four pages are orphans — reachable only via `sitemap.xml` or a typed URL. They receive zero internal link equity, and a visitor landing on the homepage can never navigate to them. Effectively a 5-page site where 4 pages are invisible.

**Secondary:** the nav is hamburger-only **on desktop**. On a 1440px B2B screen, hiding "Services" behind a menu icon is a measurable engagement tax. No visible header CTA, no visible phone number — for a consultancy where a call is the highest-value action, that is giving conversions away.

Note `components/header.html` and `lc-nav.css` already exist (uncommitted work on `feature/service-ai-automation`) and appear intended to solve exactly this. Check that branch before rebuilding from scratch.

---

## P1 — Trust layer is still template filler

What a CFO-level prospect will actually notice.

| Location | Finding |
|---|---|
| `index.html:707` | "Watch Our Video Demonstration" embeds Vimeo `60616160` — the **RED template's stock demo reel**. Anyone who presses play learns the showcase isn't yours. |
| `index.html:791-841` | Testimonial carousel contains four **logicacode-authored aphorisms**, cited as "logicacode automation principle." Zero third-party proof. Reads as "no client will go on record." |
| `index.html:1283-1376` | "Clients carousel" (`clients-carousel-section`) shows UiPath, Automation Anywhere, Power Automate, Azure, AWS, Python — **tools, not clients**. `title="Automation Anywhere \| RPA"` implies partnership. If not a certified partner, this is an indefensible claim. |
| `index.html:1041-1214` | Use-case cards dated **February 01, 2021** with fabricated comment counts (0, 2, 13, 26) on posts that do not exist. Five-year-old dates signal a dead company. All five link to `#section-11`. |
| `index.html:364-391` | Stat block hedges itself into meaninglessness: "300% **Target** ROI **Potential**", "$3.2M Savings **Opportunities**", "60% Manual Effort Reduction." The hedge words tell a buyer these are not results. |
| `index.html:1413` | HQ "200 Tech Innovation Drive, Suite 300, Miami, FL 33101" reads as placeholder; 33101 is a PO-box-only ZIP. One prospect verifying this is fatal. |
| `index.html:307-309` | Floating "make it happen" + QR-code icon over the hero — leftover template "made with love" ornament. Meaningless to a visitor. |

### Facts that contradict each other on the same page

- ~~**Offices:** "Global Offices: Cairo, Dubai" vs "Development centers in Egypt & Eastern Europe" in the same footer.~~ **Resolved** — the development-centre line was removed from the live pages, templates, and mockups. The Cairo/Dubai contact line stands as the single statement of footprint.
- ~~**Email:** `info@logicacode.com` vs `hello@logicacode.com` on the same page.~~ **Resolved** — standardised on `info@logicacode.com` sitewide.
- **LinkedIn:** every page links to `linkedin.com/company/ferrycode/`. **Not a defect — confirmed correct by the owner (2026-07-23).** The company LinkedIn page still lives under the `ferrycode` handle. Do not "fix" this. Revisit only if the handle is ever migrated to match the brand.

---

## P1 — The message does not position anything

- **Three rotating `<h1>`s** on an 8-second timer: "AI Automation", "Data Modernization", "Software Engineering". Most visitors see one at random. Nothing states **who this is for** (company size, industry, region) or **why logicacode over the ten thousand other automation shops**. A capability list, not a position.
- `index.html:486` — "What We Do" is a 90-word single paragraph of undifferentiated buzzwords. Nobody reads it.
- Six service tiles include **"BPR"** and **"Big Data"** — 2015 vocabulary, dating badly on a page selling AI. One of six links anywhere.
- **CTA/mechanism mismatch:** every button says "Book an AI automation consult" / "Book a Call" / "Talk to an engineer" and delivers a 5-field required contact form. If the copy says *book*, provide a calendar. If that isn't possible, change copy to "Request a callback" and cut required fields to name + email + one line.

---

## P2 — SEO & measurement

| Finding | Detail |
|---|---|
| **3× `<h1>` on homepage** | One per hero slide. Dilutes the primary keyword signal. |
| **Zero structured data** | No `application/ld+json` on any of the 6 pages. No Organization, LocalBusiness, or Service schema. The methodology accordion (`index.html:879-945`) is a ready-made `FAQPage` not being claimed. |
| **Broken social cards** | Most pages use `logo.png` (40 KB, wrong aspect) as `og:image`. `services/ai-automation.html` already points to `assets/img/og-default.jpg`, but **that file does not exist in the repo**. Create the asset first, then point every page at it. LinkedIn is presumably the primary channel. |
| **Analytics blind spots** | `services.html` and `about-us.html` load **no JavaScript at all** — no GA4, no Usercentrics. 2 of 5 pages invisible in analytics and inconsistent on consent. |
| **No content surface** | No blog, insights, or resources. For a company selling AI automation in 2026 this is the single largest missed acquisition channel. Five static pages will never rank competitively. |
| **Thin sitemap** | `sitemap.xml` has no `<lastmod>`. Planned `/solutions/` and `/industries/` content is missing, so the site has no industry or solution landing surface. |

---

## P2 — Performance

- `assets/img` = **13 MB**; `assets/vendor` = **3.9 MB**.
- Homepage ships **three hero JPEGs regardless of which slide displays**: `intro-slide-bg-1.jpg` 336 KB, `intro-slide-bg-22.jpg` 193 KB, `intro-slide-bg-4.jpg` 175 KB. Plus `map-bg.jpg` **600 KB** and `team.jpg` 181 KB.
- Full-screen preloader gates first paint behind `window.load` (`theme.js:60-63`).
- jQuery + 10 vendor plugins load on every homepage visit.

Mobile LCP will be poor. Costs organic rank, and if ads are ever run, Quality Score — paying a premium per click for a page Google already rates slow.

---

## P2 — Legal exposure

**No privacy policy, no terms, no cookie policy exist on the live site.**

The site runs GA4 **plus Usercentrics consent** (a GDPR compliance tool) with no policy for it to link to, while collecting personal data via a form.

`components/footer.html:80-81` and `inner-page-template.html:376-377` already link to `/privacy/` and `/terms/` — but those pages do not exist, and neither component is used by any live page. With EU/UK traffic this is real risk and is roughly half a day of work.

---

## TODO — ordered backlog

Ordered by return, not by effort. Do not reorder without a reason.

### Sprint 1 — stop the bleeding (hours, not days)

- [x] **T1 · P0 · Fix the broken contact form.** — done, branch `fix/theme-plugin-guards`
      Guarded all eight optional plugin calls in `assets/js/theme.js` behind `$.fn` checks (`mb_YTPlayer`, `owlCarousel`, `imagesLoaded`, `isotope`, `magnificPopup`, `counterUp`, `tooltip`, `popover`) and added an easing fallback for pages without the easing plugin. Root-cause fix — no per-page vendor scripts added.
      *Verified:* `node _tests/theme-guards.test.js` (fails against the pre-fix file with the original TypeError); headless Chrome shows `ERRORS=none` and `SUBMIT_HANDLER=BOUND` on `/contact.html` and `/index.html`, with `index.html` still initialising 4/4 carousels.
      *Not verified:* no live submission was sent to Web3Forms — that would deliver a fake enquiry. Confirm end-to-end with one real submit before closing.

- [ ] **T2 · P0 · Give the homepage real navigation.**
      Header links to Services / AI Automation / About / Contact plus a visible CTA button. Desktop nav must be visible without a click. Check the untracked `components/header.html` + `assets/css/lc-nav.css` in this working tree first — this may already be built.
      *Done when:* all 5 live pages reachable from the homepage in one click, and the header renders a persistent CTA at ≥992px.

- [~] **T3 · P1 · Reconcile contact facts.** — mostly done
      - [x] **Email** — standardised on `info@logicacode.com` sitewide.
      - [x] **Office story** — the "Development centers in Egypt & Eastern Europe" footer line removed everywhere (live pages, `components/footer.html`, `inner-page-template.html`, both mockups). Cairo/Dubai is now the only footprint claim.
      - [x] **LinkedIn** — `ferrycode` handle confirmed correct by the owner. No change needed; see the note above before touching it.
      - [ ] **Miami address** — still outstanding. "200 Tech Innovation Drive, Suite 300, Miami, FL 33101" (`index.html:1413`) remains unverified, and 33101 is a PO-box-only ZIP. Verify it or replace it.
      *Done when:* the HQ address on `index.html` is one a prospect could look up and confirm.

### Sprint 2 — restore credibility

- [ ] **T4 · P1 · Remove the fabrications.** Delete the stock Vimeo embed, the self-quoted "testimonials", the fake comment counts, and the Feb-2021 dates. Nothing false should survive this pass.
- [ ] **T5 · P1 · Replace with something true.** One named client, or one anonymised-but-specific result ("a Gulf logistics operator cut invoice handling from 4 min to 40 sec"). Relabel the tech carousel from "clients" to "Technologies we work with" and drop any implied partnership claims not held.
- [ ] **T6 · P1 · Rewrite the stat block** with defensible numbers, or cut it. Remove "Target" and "Potential" hedges — state a real figure or state nothing.
- [ ] **T7 · P2 · Publish a privacy policy + terms** at `/privacy.html` and `/terms.html`; wire Usercentrics to them; add footer links to every live page.

### Sprint 3 — positioning & message

- [ ] **T8 · P1 · Fix the hero.** Collapse to a single `<h1>` that names the audience and the outcome. Keep the carousel visually if desired, but only one `<h1>`.
- [ ] **T9 · P1 · Align CTA copy with mechanism.** Either add a real calendar booking link, or change all "Book a call" copy to "Request a callback" and reduce the form to name + email + one message field.
- [ ] **T10 · P1 · Rewrite "What We Do"** from one 90-word paragraph into scannable value statements. Retire "BPR" and "Big Data" as customer-facing labels.
- [ ] **T11 · P2 · Link every service tile** to a real destination. Build out `/services/` beyond the single AI automation page.

### Sprint 4 — compounding growth

- [ ] **T12 · P2 · Create `assets/img/og-default.jpg`** (1200×630), then point every page's `og:image` at it, per `CLAUDE.md`. Note `services/ai-automation.html` already references this path — that page's social card is broken *today* until the asset exists, so create the file before repointing anything else.
- [ ] **T13 · P2 · Add GA4 + Usercentrics** to `services.html` and `about-us.html`. No live page should load zero JS.
- [ ] **T14 · P2 · Add JSON-LD:** `Organization` sitewide, `Service` on service pages, `FAQPage` on the methodology accordion.
- [ ] **T15 · P2 · Compress imagery.** Target <150 KB per hero, serve WebP, lazy-load non-first carousel slides. `map-bg.jpg` (600 KB) first.
- [ ] **T16 · P2 · Reconsider the preloader** — it gates first paint for no user benefit.
- [ ] **T17 · P2 · Stand up an insights/blog section.** Largest missed acquisition channel; nothing else on this list creates organic demand.
- [ ] **T18 · P2 · Add `<lastmod>` to `sitemap.xml`.** Separately, decide whether the `/solutions/` and `/industries/` surfaces described in `CLAUDE.md` are still planned — they do not exist on disk. Either build them or drop them from `CLAUDE.md` so the documented structure matches reality.

---

## Notes for agents picking this up

- **Read `CLAUDE.md` first.** Brand is always lowercase `logicacode`. New pages start from `template.html`. Mockup before production HTML for any new page or major UI section. Prefer feature branches for planned work. Direct `master` commits should be reserved for explicit publish requests or urgent live-site fixes.
- **`master` is live.** Pushing to it deploys to `logicacode.com` immediately via GitHub Pages. There is no staging.
- **Uncommitted local work exists** in this working tree: `components/header.html`, `components/footer.html`, `assets/css/lc-nav.css`, `assets/js/lc-components.js`, `assets/js/lc-nav.js`, `inner-page-template.html`, `_mockups/nav-mockup.html`. Much of it targets **T2**. Review before duplicating effort, and confirm branch status before assuming it exists remotely.
- **The shared component system is designed but not adopted.** No live page uses `#lc-header-mount` / `#lc-footer-mount`. Each of the 5 live pages has its own hand-rolled header, its own inline `<style>` block, and its own script list — which is precisely how P0-1 happened. Migrating live pages onto the shared components would prevent the whole class of bug.
- **P0-1 is a class of bug, not an instance.** Any new page that omits a vendor script `theme.js` calls unguarded will break the same way, silently. Guard the plugin calls rather than patching page script lists.
