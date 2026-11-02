# Positioning and plan (working document)

Status: **proposed, nothing applied to the site.** Last updated 2 Nov 2026.

Related files: `docs/home-copy-v1.md` (proposed copy), `docs/home-copy-v1.patch` (code change), `docs/evidence-sheet.md` and `.csv` (researched claims).

## 1. Positioning

**Statement:** I find the step where users quit your signup, onboarding or ID check, and fix it.

**Why this and not "UX for fintech":** fintech is an industry and B2B SaaS is a business model, so they sit on different axes. A SaaS founder outside fintech reads "fintech and KYC" as "not for me". Use the problem as the label and the industry as proof.

**Two lanes, fintech first**

| Lane | Problem line | Where the proof is today |
|---|---|---|
| Fintech and KYC | People start to verify, then quit at the ID step. | KYC ID upload concept, sample audit |
| B2B SaaS | People sign up, then never reach the first useful moment. Buyers also decide on the site before they talk to anyone. | None yet. Build one concept case. |

**Competitive alternatives to address** (what a client does if you don't exist): do nothing, use AI or a template, an in-house designer, a general agency, an analytics tool. Describe the best-fit client by the traits that make them care most, not only by industry.

## 2. Issues found in the current site

| # | Severity | Issue |
|---|---|---|
| 1 | High | No B2B SaaS case study. The six cases are 1 fintech, 1 e-commerce, 2 gov-tech, 2 ed-tech. |
| 2 | High | "KYC" narrows the flagship service ("Onboarding & KYC audit") and appears in the nav, hero and about 45 times on service pages. |
| 3 | High | The only sample audit is an ID upload. |
| 4 | Medium | "Fluent in your industry" conflicts with the fintech specialist signal. |
| 5 | Medium | Fintech is mentioned about 20 times against about 6 for SaaS and 5 for B2B. |
| 6 | Medium | Proposed title "Fix Signup and KYC Drop-off" leans fintech. Prefer "Fix Signup and Onboarding Drop-off". |
| 7 | Low | The only experience stat is fintech ("2+ yrs fintech and KYC UX"). |

## 3. Fix order

1. Add a "Who it's for" strip under the hero with the two lanes. About a day.
2. Rename the service to "Onboarding audit", keeping KYC as the fintech variant, and make the page title neutral. About 2 hours.
3. Build one B2B SaaS concept case, clearly labelled as a concept (signup to first value). 2 to 3 days.
4. Add a second sample audit with a SaaS screen, such as an empty first-run dashboard. About half a day.
5. Reword the industries section to lead with fintech and show the others as "also worked with". About 2 hours.
6. Add a FAQ answer for "What if the problem isn't design?" Say the audit checks traffic and fit first. Founders themselves name wrong traffic as a common cause.

## 4. Plan for the first 30 days

- **Week 1:** lock the one-sentence positioning, apply the approved home copy, add the "Who it's for" strip.
- **Week 2:** start outreach and publish the first teardown of a public sign-up or verification flow (public screens only).
- **Week 3:** publish the B2B SaaS concept case and the second sample audit.
- **Week 4:** review replies, decide the headline and the founding-client offer.

Standing parts of the plan: three founding clients with permission to publish a measured before/after, a named deliverable (the "Drop-off Map"), 3 LinkedIn posts a week (mostly how-tos and teardowns), and one front-door offer, the 5-day audit.

## 5. Outreach test and rules

- Three openers, about 10 messages each, same hooks as LinkedIn posts. Measure replies, positive replies and calls booked, and record the exact words people use.
- **Corrected rule:** the earlier "1.5x replies" rule is statistically weak at this sample size. Treat the first batch as direction only. Keep an opener only if it also wins a second batch.
- **Compliance checklist (verify against ICO and FTC text):** real sender identity, no deceptive subject line, physical address, working opt-out, written legitimate-interest assessment for UK and EU contacts, treat sole traders and personal addresses as consumers. LinkedIn messages follow platform rules, not checked.
- **Five-second test:** show the page for five seconds to five SaaS founders and ask "What do you think this does, and who is it for?" Avoid leading questions.

## 6. Claims rules

- No guaranteed results anywhere.
- Quote a number only if the evidence sheet marks it "Quote with source", and name the source, year and sample.
- Published results (including the +25% testimonial) need the client's written permission and a note of what is typical. The FTC guidance found is consumer-focused and from 2009, so verify the current text (16 CFR Part 255).
- No employer names or data anywhere on the site.

## 7. What the evidence supports (short)

- B2B buyers prefer to buy without a rep and notice when the website and the sales story differ (Gartner, 2025).
- Fintech users report repeated ID and selfie rejections with no reason given. This matches the sample audit's "no photo guidance" and "vague error" findings.
- SaaS activation benchmarks conflict (about 15% against about 37%), so do not quote an average.
- Accessibility law (EU, from 28 June 2025) could become a design-check add-on for EU-facing clients. Scope for B2B-only products is unconfirmed.
- Glassdoor and direct Reddit threads gave nothing usable.

## 8. Decisions still needed from Haseeb

1. Hero headline: "Fix the step where users quit." (proposed), keep "Less friction. More customers.", or "Your product looks fine. People still don't sign up."
2. Confirm the hero numbers: 70+ projects, 3 yrs designing, 2+ yrs fintech and KYC.
3. Employer mention: removed from the hero and About in the proposed copy. Check the employment contract before restoring it.
4. +25% testimonial: needs the client's written permission.
5. Pricing: still "Contact for pricing". Suggested figures from the playbook are recommendations only: audit $1,500 for the first three clients, $3,000 list; sprint $6,500 to $9,500; polish $2,500 to $4,500; retainer $1,500 a month.
6. Keep the new "Why a designer" section.
7. Analytics tool, December audit slot count, and whether to add a logo and identity offer.
8. Supabase project URL and anon key to switch on the owner login.
