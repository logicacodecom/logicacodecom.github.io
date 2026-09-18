# logicacode website roadmap

Last updated: September 17, 2026

**Goal:** help prospective clients understand where logicacode can help, evaluate credible evidence, and submit a qualified inquiry.

This roadmap follows the [website assessment](_tests/website-assessment-2026-09-17.md) and [implemented fixes and verification](_tests/website-fixes-verification-2026-09-17.md). It describes future work; unchecked items are not completed or scheduled.

## Current position

The first technical improvement pass is implemented locally on `fix/site-usability-accessibility`. It has not been deployed.

Completed in that branch:

- Shared navigation and footer with direct service links.
- Accessible mobile menu, visible keyboard focus, improved labels, landmarks, and contrast.
- Responsive heading and button fixes.
- Form pending feedback, duplicate prevention, recoverable errors, timeout handling, and a native POST fallback.
- Carousels that start paused, with visitor-controlled playback and reduced-motion support.
- Smaller WebP photography, lazy-loaded content images, and removal of unnecessary plugin includes.
- Reusable layout synchronization and browser regression checks.

All five marketing pages passed the configured automated accessibility checks at four viewport widths. Actual email delivery, field performance, full assistive-technology coverage, and business claims still need verification.

## Recommended order

| Order | Work | Expected result | Main dependency |
|---|---|---|---|
| 1 | Release and verify the existing fixes | Visitors receive the improvements already built | Review of the current branch |
| 2 | Verify business information and gather proof | Claims become credible and publishable | Business owner and project records |
| 3 | Refine homepage positioning and structure | Visitors quickly understand the offer and next step | Priority audience, service, and evidence |
| 4 | Expand service and project content | Prospects can evaluate fit before contacting us | Subject-matter input |
| 5 | Establish measurement and discoverability | Improvements can be evaluated against real outcomes | Analytics/search access and baseline data |
| 6 | Improve reliability and performance continuously | The site stays usable as it grows | Repeatable checks and a maintenance owner |

Content collection can run alongside release verification. Homepage design should follow the positioning and evidence decisions.

## 1. Release the improvements already built

Owner: implementation maintainer, with business review of the visible changes.

- [ ] Review the branch diff and desktop/mobile previews.
- [ ] Run syntax checks, the plugin-guard regression test, shared-layout synchronization check, and browser checks.
- [ ] Package the changes in a pull request with the verification results.
- [ ] Merge and deploy through the existing GitHub Pages workflow when ready.
- [ ] Recheck all five public routes, navigation, contact forms, and image loading after deployment.
- [ ] Arrange one explicitly authorized production inquiry and confirm receipt in the intended inbox. The current tests intercept requests and do not prove email delivery.
- [ ] Record the deployed commit and a rollback reference.

**Done when:** the production site serves the reviewed version, its main paths work, and an authorized delivery check reaches the correct recipient.

## 2. Establish trustworthy business content

Owner: business owner supplies evidence; content/implementation maintainer presents it.

- [ ] Confirm the priority buyer and the first service the homepage should lead with.
- [ ] Verify the company history, contact information, headquarters address, and delivery locations shown on the site.
- [ ] Verify the basis of the homepage's efficiency, ROI, savings, and engagement figures. Distinguish measured results from targets and potential opportunities.
- [ ] Review the AI service page's client-story claims, including the quoted 47% reduction in false-positive alerts, and confirm permission to publish the attribution.
- [ ] Confirm that the advertised $14,900, six-week accelerator package is an active offer with accurate scope and exclusions.
- [ ] Clarify whether technology logos represent tools used, formal partnerships, or certifications. Label them accordingly.
- [ ] Select two or three projects that can be described publicly, using anonymized descriptions where needed.
- [ ] Collect approved team biographies and genuine team/project imagery where available.

For each project, collect:

| Information | What to supply |
|---|---|
| Customer context | Industry, team, and relevant scale; name only when publishable |
| Problem | The workflow or operational constraint before the work |
| Delivery | What logicacode actually built or changed |
| Scope | Timeline, systems involved, and important constraints |
| Outcome | Measured result, measurement period, and calculation basis |
| Evidence | Approved screenshot, diagram, quotation, or supporting record |
| Publication status | Which details and names may appear publicly |

**Done when:** prominent claims have a documented basis, inaccurate or unsupported claims are revised, and at least two usable project narratives are ready.

## 3. Refine the homepage

Owner: design/content and implementation maintainers.

Keep the existing lowercase brand, red/black/white palette, and typography. Prepare a desktop/mobile mockup before implementing a major layout change, following the project's design workflow.

- [ ] Replace the changing opening proposition with one stable headline that identifies the buyer's problem and the outcome offered.
- [ ] Choose a primary CTA that accurately describes what happens, such as requesting a consultation.
- [ ] Add a secondary route to a relevant service explanation or published project.
- [ ] Replace generic hero imagery with an approved workflow, product artifact, or project visual when suitable material exists.
- [ ] Reduce repeated broad descriptions of automation, AI, cloud, and data work.
- [ ] Group the offer into three clear paths: automation, software engineering, and data/cloud modernization.
- [ ] Place substantiated proof before lengthy company or methodology content.
- [ ] Reassess whether the remaining carousels help visitors; present important evidence as static content where practical.

Suggested reading order:

1. Who we help and what changes for them.
2. Evidence from delivered work.
3. Three service paths.
4. How an engagement works.
5. Consultation expectations and contact.

**Done when:** a new visitor can identify the intended audience, main offer, supporting evidence, and next step from the opening content and a short scroll.

## 4. Build useful service and project pages

Owner: service leads and content/implementation maintainers.

- [ ] Create substantive Software Engineering and Data & Cloud Modernization pages; they currently have summary sections rather than dedicated detail pages.
- [ ] Refine the existing AI Automation page around buyer problems, deliverables, prerequisites, and engagement options.
- [ ] Publish the approved project narratives as individual pages.
- [ ] Link use-case titles and images to relevant explanatory content. Keep inquiry actions clearly labeled as inquiries.
- [ ] Add relevant project links to each service page.
- [ ] Explain consultation expectations: what information to provide, who follows up, and what the first conversation covers.
- [ ] State a response-time commitment only after the business confirms it can meet that commitment.
- [ ] Add a short FAQ addressing actual recurring sales questions.

Use this outline for each service page: buyer problem, suitable scenarios, deliverables, delivery approach, evidence, engagement requirements, and a clear inquiry action.

**Done when:** a prospect can understand what is included, assess whether the service fits their needs, and inspect relevant evidence before contacting the team.

## 5. Measure inquiries and improve discoverability

Owner: business/marketing owner and implementation maintainer.

- [ ] Establish a baseline for visits, service-page engagement, form starts, confirmed form successes, and qualified inquiries.
- [ ] Verify analytics coverage across all public pages; configuration currently differs between page types.
- [ ] Track consultation CTA clicks and confirmed successful submissions consistently. Keep names, email addresses, and message contents out of analytics events.
- [ ] Verify analytics behavior alongside the existing consent controls.
- [ ] Check search indexing, sitemap coverage, canonical URLs, and broken inbound links using available search-console data.
- [ ] Create a branded social-sharing image and verify link previews.
- [ ] Add new service/project pages to the sitemap and navigation when published.
- [ ] Use accurate structured business information where appropriate, after the underlying facts are verified.
- [ ] Review results after enough traffic and inquiries have accumulated to support a useful comparison.

Judge progress primarily by **qualified inquiries and successful contact delivery**. Page views and CTA clicks help explain the path but are not the final outcome. Set numerical improvement targets after collecting a baseline.

**Done when:** the team can see where inquiries originate, identify important drop-offs, and distinguish genuine improvement from normal traffic variation.

## 6. Maintain technical quality

Owner: implementation maintainer.

- [ ] Turn the existing browser callback into a repeatable CI job with pinned browser/accessibility dependencies.
- [ ] Run shared-layout synchronization, syntax, internal-link, and critical form checks on pull requests.
- [ ] Extend accessibility review to manual keyboard use, a screen reader, zoom/reflow, and representative browsers/devices.
- [ ] Test the 404 page at nested URLs; its relative asset paths deserve explicit verification.
- [ ] Measure loading on constrained connections and collect field performance data when available.
- [ ] Investigate remaining image/font/style costs based on measurements, including below-fold background loading.
- [ ] Inventory vendor versions and update or replace legacy dependencies in bounded, tested changes.
- [ ] Review the need for old PHP/configuration files in a static GitHub Pages deployment.
- [ ] Consolidate additional repeated styles as related pages are edited.
- [ ] Assign responsibility for checking contact delivery, broken links, expired offers, and outdated business content.

**Done when:** key checks run automatically, a named maintainer owns periodic review, and performance/dependency work addresses observed problems.

## Decisions needed from the business

1. Which buyer and service should the homepage prioritize?
2. Which projects and results can be published, and with what attribution?
3. Is the accelerator package still an active offer?
4. Who receives and responds to inquiries, and what response expectation is realistic?
5. Who owns analytics/search access and ongoing content review?

These decisions unblock positioning and proof. Technical release work can proceed independently.

## Defer until there is a clear need

- A framework migration or complete rebuild: the current static architecture can support this roadmap.
- A CMS: reconsider when publishing frequency or nontechnical editing needs justify it.
- More animation: first establish clearer content, useful evidence, and dependable interactions.
- Numerous thin industry pages: prioritize detailed pages supported by actual expertise and projects.
- A large blog program: start with service and project content that directly helps prospective clients evaluate the company.

## Next working session

Start with the release checklist and a business-information review. Prepare the homepage content outline once the priority buyer, lead service, and publishable proof are confirmed.
