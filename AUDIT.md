# Figma ↔ implementation audit

Source of truth: Figma file `1VjXrP7BA8YLCQAQIBxT9y` (pages Website, Foundations, Components, Logo; the *Developer handoff* and
*SEO & links* sheets). Method: every Figma value came from `get_design_context` / `get_variable_defs` / node metadata, never
estimated. Rendered geometry was measured in headless Chromium (`scripts/audit.mjs`, `/tmp` helpers) and compared with the
Figma frame heights/positions; selected sections were also compared visually against Figma screenshots.

Status key: **Pass** matches Figma · **Needs improvement** minor discrepancy · **Failed** significant issue · **Not verified**

## 1. Acceptance criteria — where things stand

| Criterion | Status | Notes |
|---|---|---|
| Every Figma page implemented | **Failed (partial)** | Landing, Work (+3 filters), 5 case studies, mobile menu, 404 are done. **Admin** (`Admin — Overview`) is *not* built: the handoff sheet marks it "design only". |
| Design tokens respected | **Pass** | Colours, spacing 2xs→3xl, radius sm/md/lg/full, 30 text styles, motion tokens, breakpoints are CSS variables / classes in `src/styles/tokens.css`. |
| Specified dimensions verified | **Pass** (landing, Work) / **Needs improvement** (see §3) | Desktop 1440 section heights match Figma exactly; mobile 390 within 1px. |
| Available responsive designs implemented | **Pass** | Desktop 1440 + Mobile 390 + mobile menu overlay built from their frames. No tablet frame exists in Figma. |
| All 10 viewport tests | **Pass** | 4 page types × 10 widths = 40 runs: no horizontal scroll, no off-screen elements, 0 console errors (§2). |
| Major visual discrepancies corrected | **Needs improvement** | Fixed everything found; **raster project imagery is missing** (§4, blocked). |
| Navigation + interactions work | **Pass** | 30/30 checks in `scripts/interact.mjs`. |
| No critical console errors | **Pass** | Only the deliberate HTTP 404 on the 404 page. |

## 2. Viewport tests (1920 / 1440 / 1280 / 1024 / 834 / 768 / 430 / 390 / 375 / 320)

| Page | h-scroll | Overflowing elements | Console errors | Page height @1440 | Figma |
|---|---|---|---|---|---|
| `/` | none ×10 | none | 0 | 7141 | 7142 |
| `/work/` | none ×10 | none | 0 | 3195 | 3195 |
| case study (Iris) | none ×10 | none | 0 | 4664 | 4663 (Iris frame) |
| `/404` | none ×10 | none | 0 (document status 404) | n/a | not designed |

Home @390: 10838 vs Figma 10837.

## 3. Section audit (landing)

Heights are rendered px vs Figma frame px.

| Section | 1440 rendered / Figma | 390 rendered / Figma | Status |
|---|---|---|---|
| Nav | 76 / 76 | 76 / 76 | Pass |
| Hero | 712 / 712 | 951 / 951 | Pass |
| Industries | 942 / 942 | 928 / 929 | Pass (−1px mobile) |
| Problem | 570 / 570 | 948 / 948 | Pass |
| Services | 1039 / 1039 | 2048 / 2047 | Pass (+1px mobile) |
| Sample audit | 729 / 729 | 1495 / 1494 | Pass (+1px mobile) |
| About | 628 / 628 | 1108 / 1108 | Pass |
| Process | 555 / 555 | 911 / 911 | Pass |
| FAQ (first item open, as in Figma) | 845 / 845 | 983 / 983 | Pass |
| CTA | 726 / 726 | 773 / 773 | Pass |
| Footer | 320 / 320 | 617 / 617 | Pass |
| Mobile menu overlay | built to `35:408` spec (26px/16px-pad rows, 44px close, CTA) | – | Pass (geometry), visual **Not verified** side-by-side |
| Work page | 322 / 1879 / 598 / 320 = exact | – (no Figma frame) | Pass @1440 |
| Case study (Apply One) | hero 559, cover 640, body 2293 (Figma 2292), next 228 | – (no Figma frame) | Pass (+1px) |

Other exact matches: hero button 181 px wide vs Figma 181; industry cards at x = 120/604/1088/…; hero visual at x 736, y 159.

## 4. Issue log

| # | Page / section | Viewport | Expected (Figma) | Actual | Correction | Status |
|---|---|---|---|---|---|---|
| 1 | All pages — **raster images** (Work card covers, case covers, key screens, founder photo, OG image) | all | Project screenshots from Figma | `www.figma.com` asset downloads are denied (HTTP 403) by the sandbox network policy, so the PNGs could not be fetched. Slots render a labelled placeholder with exact target size/filename. | Allow `www.figma.com` (or export the images), put files in `src/assets/work/` (README lists names/sizes); build swaps placeholders for `<img>` automatically. | **Failed – blocked** |
| 2 | Hero, nav spy | 1440 | No link highlighted at top | "FAQ" stayed highlighted after scrolling back up | Spy now computes the section under the reading line on scroll | Fixed ✔ |
| 3 | Buttons | 1440 | Primary 181×44, secondary 188×46 | Chrome snaps 1.5px borders to 1px at 1× DPR → 45px tall | Secondary ring drawn with `box-shadow: inset` + padding | Fixed ✔ |
| 4 | Hero stats | 1440 | 22px gap + 1px divider + 22px gap (45px pitch) | Dividers were overlays, row 70px narrow | Real 45px pitch, divider 40px tall | Fixed ✔ |
| 5 | All text | all | Line-heights are whole px in Figma (16/1.6→26, 18/1.6→29, 48/1.1→53…) | Fractional line-heights drifted sections by 1–9px | All `font:` shorthands converted to rounded px | Fixed ✔ |
| 6 | Industries cards | 1440 | Card 460×596, gap 24 | Anchor/closing-tag mismatch in generated markup broke the card | Converter fixed, regenerated | Fixed ✔ |
| 7 | Industries wave chart | 1440 | Green stroke + soft fill | Solid black fill (lost `fill="none"`) | Converter keeps `fill="none"` | Fixed ✔ |
| 8 | Hero visual | 1024–1439 | Side-by-side composition (hero stacks <1024) | 584px composition clipped in a narrower column | Composition scales proportionally to its column | Fixed ✔ |
| 9 | FAQ open answer | 390 | Answer under question, 10px gap | Negative margin clipped the answer | Padding-based gap | Fixed ✔ |
| 10 | Mobile pain-point titles | 390 | 20px titles (269px wide, 1 line) | 22px wrapped to 2 lines (+33px) | Mobile H3 = 20/26 | Fixed ✔ |
| 11 | Sample-audit score ring | 1440 | ~10px stroke | 12px | r=61, stroke 10 | Fixed ✔ |
| 12 | Problem chart | 1440 | Tracks fixed 220px; "−31% biggest leak" runs into card padding | Track shrank | `flex: 0 0 220px` on ≥768 | Fixed ✔ |
| 13 | Case facts | 1440 | Label above value | Value above label | Column order | Fixed ✔ |
| 14 | Footer on short pages (404) | 1440 | – | Footer floated mid-page | Sticky-footer flex column | Fixed ✔ |
| 15 | Headings "you'll", "I'm" | all | Figma renders a curly apostrophe in Manrope | Self-hosted Manrope (fontsource v5.3) draws a straight one; text source is straight in both | Font-version difference, not changed | **Needs improvement** (cosmetic) |
| 16 | Filter tabs | 1440 | Default 43px tall, Active 41px tall (2px border difference) | All tabs 43px (no layout shift) | Deliberate | **Needs improvement** (−2px) |
| 17 | Industry artwork: six icon frames in cards 4–6 | 1440/390 | Icon vectors | Figma cannot export them (no visible layers); rendered as the same check glyph used elsewhere | Re-export once they are fixed in Figma | **Not verified** |
| 18 | Industry cards 2–6 | 1440/390 | Pixel match | Only card 1 compared side-by-side (mobile) and cards 1–3 reviewed on a crop | – | **Not verified** |
| 19 | Hover / pressed / focus states | all | Button, nav, card, tab states per Components page | Implemented from spec values (e.g. green-500 hover, 4px green-700 focus ring); not visually diffed against the state variants | – | **Not verified** |
| 20 | Tablet 768–1279 | 834/768/1024 | No Figma frame | Adapted from 1440/390 (2-col cards, stacked hero <1024, 40px padding) | – | **Not verified** (nothing to compare to) |
| 21 | Work + case pages, mobile | ≤767 | Handoff sheet lists these as *open* (follow home mobile patterns) | Built from home mobile patterns (44px display, 1-col, 20px padding) | – | **Not verified** (nothing to compare to) |

## 5. Content that is **not** from Figma (please confirm)

- FAQ answers 2–8: Figma only shows question text (answer 1 is designed). Answers are drafted from facts elsewhere in the
  file (`scripts/faq-data.mjs`) — confirm tone, the NDA answer and the AI-usage answer.
- Behance links for **Iris** and **Discover Pakistan**: the sheet says they exist but only the Apply One URL is given; both
  currently point at the Behance profile.
- Alt text for case key-screens is derived from the Figma layer captions.
- OG image `/assets/og.png` is referenced but not provided; founder photo is the Figma placeholder (sheet: "waiting for photo").
- Chart numbers are the Figma "sample data" and are labelled *Illustrative* / *Sample data* as specified.

## 6. How to re-verify

```bash
npm run build && node scripts/audit.mjs / home          # 10 viewports, screenshots in /tmp/shots, SECS=1 prints section heights
node scripts/audit.mjs /work/ work && node scripts/interact.mjs
```
