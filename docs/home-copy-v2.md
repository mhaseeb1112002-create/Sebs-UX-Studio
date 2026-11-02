# Home page copy v2: mistake-led (proposed, not applied)

Status: **proposed**. Nothing here is live. The code change is `docs/home-copy-v2.patch`; from the repo root run `git apply docs/home-copy-v2.patch` once the copy is approved. It replaces the earlier service-led v1.

Rendered preview: https://claude.ai/artifact/54rjNZaws55rM51hQdWdtb (private)

Idea: most UX agencies list services. This version leads with the specific mistakes teams make, then shows the audit as proof and the services as the way to fix them.


## Page order

Mistakes come first. Services move below the proof.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Order now | Hero, Industries, Problem, Services, Client feedback, Sample audit, About, Process, FAQ, Closing call | (current) | Industries sat second, before any explanation. |
| Order proposed | (none) | Hero, Mistakes, Why a designer, Sample audit, Services, Industries, Client feedback, About, Process, FAQ, Closing call | Insight first, proof second, offer third. |
| Navigation | Services, Work, Process, About, FAQ | Mistakes, Services, Work, Process, About, FAQ | Adds the new section to the menu. |

## Hero

The promise is now the problem, not the service.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Headline | Less friction. More customers. | Users quit for fixable reasons. | Sets up the idea of the whole page: most drop-off has a fixable cause. |
| Lede | I find where users get stuck in signup, onboarding and key flows, then redesign them so more people convert and stay. | These are the mistakes I look for first in signup, ID checks and onboarding, and what to do instead. | Starts with what you notice. No conversion promise. |
| Secondary button | See a sample audit | See the mistakes | Points to the new section. The sample audit sits right after it. |
| Eyebrow | UX audits & redesigns for B2B SaaS and fintech | UX audits for SaaS and fintech teams | Says what you sell and to whom, in fewer words. |
| Byline | Led by Haseeb, product designer for KYC & identity verification at an AI-powered fintech. | Led by Haseeb, a product designer who specializes in KYC and identity verification. | Keeps the credential and drops the employer name (see decisions). |

## The mistakes (replaces Problem)

The new core of the page. Each card carries its evidence in the last column.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Heading | Your product works. Friction is where users quit. | The 8 mistakes I look for first | Leads with what you notice, not what you sell. |
| Format | Three cards on a dark panel with a sample leak chart | Eight cards: the mistake, what people see, what to do instead | Each card teaches something and ends in a fix. |
| Mistake 1 (Fintech) | (none) | Asking for an ID photo with no guidance. What people see: People don’t know what counts as a good photo, so they retry. Name or address mismatches only show up after a rejection. Do this instead: Show an example photo, lighting tips and the matching rules before the camera opens. | Forum and review complaints (anecdotes). No number used. |
| Mistake 2 (Fintech) | (none) | Rejecting with “something went wrong”. What people see: A message like “an issue with your identity verification” and nothing else. Do this instead: Say what failed, give one next step, and keep the person’s progress. | Forum posts and Financial Ombudsman cases (anecdotes). No number used. |
| Mistake 3 (Fintech) | (none) | Leaving no way out. What people see: Retry loops that end at a support form. Do this instead: Offer another document, a human chat, or a way to come back later. | Revolut community post and Trustpilot reviews of ID vendors (anecdotes). |
| Mistake 4 (SaaS) | (none) | Mistaking setup for value. What people see: Profile photos, team invites and an empty dashboard before anything useful happens. Do this instead: Pick one first win and show it before the setup. | Userpilot (vendor) and founder threads. Whether sample data helps is unsettled. |
| Mistake 5 (SaaS) | (none) | One onboarding for everyone, then silence. What people see: Every new user gets the same tour, and nobody follows up after login. Do this instead: Ask one question to route people, and prompt them at the moment they stall. | Userpilot and ProductLed (vendors). No number used. |
| Mistake 6 (SaaS) | (none) | Asking for too much before showing value. What people see: Long forms and forced accounts before anyone has seen what the product does. Do this instead: Ask only what the next step needs, and let people look around first. | Userpilot (vendor). Baymard’s 18% figure is checkout only, so not used. |
| Mistake 7 (B2B) | (none) | A website that tells a different story from sales. What people see: 69% of B2B buyers report that the website and the sellers disagree (Gartner, 2025). Do this instead: Keep one story from the first page to the demo call, and offer a smaller first step than a demo. | Gartner’s own release. The only number on the page. |
| Mistake 8 (Any product) | (none) | Blaming the page when the problem is who arrives. What people see: Teams redesign a page that is fine while the wrong visitors keep arriving. Do this instead: Check who is arriving and why before changing screens. A good audit tells you when the answer isn’t design. | Founder threads and vendor guides (anecdotes). |

## Why a designer

Answers “why not just use AI?” right after the mistakes.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Headline | (none) | AI can draw a screen. It can’t tell you which one is losing you customers. | Names the real difference between you and a tool. |
| Point 1 | (none) | I start with your real flow. I walk through your actual product, not a template. Every finding points to a specific screen. | Concrete method, checkable. |
| Point 2 | (none) | I rank by impact, not taste. You get a short list ordered by how much each issue likely costs you, so your team knows what to fix first. | Says “likely” because the ranking is an estimate until you have data. |
| Point 3 | (none) | I use AI, and I own the answer. AI speeds up my research and first drafts. I check every finding and stand behind every decision. | Honest about AI use, which builds trust. |

## Sample audit

Now sits right after the mistakes, as proof that you can find them.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Lede | Every audit scores your flow against proven usability rules, ranks issues by impact and marks the exact screens to fix. | Every audit scores your flow against proven usability rules, marks the exact screens to fix and ranks each issue by impact. | Puts the most concrete benefit first. |
| Issue 2 | Error copy is vague. “Upload failed” gives no reason or next step. | Error message is vague. “Upload failed” doesn’t say why or what to do next. | The sample follows the same writing rules it recommends. |

## Services

Same four services, moved below the proof, in plainer words.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Heading | From the first audit to a working product | Start with the audit. Fix what it finds. | Tells the visitor the order to buy in. |
| Audit | A clear diagnosis of where and why users drop off, with prioritized fixes you can ship. | See exactly where and why people quit your signup or ID check, with ranked fixes your team can ship. | Names the screens the audit covers. |
| Sprint | I redesign the flow that loses the most users, ready for your developers to build. | I redesign the flow that loses the most people, and give your developers what they need to build it. | Says what the developers receive. |
| Build & polish | A new product, or one built with Lovable, Cursor or v0? I design and code it, or polish it into a clean, consistent product users trust. | Building something new, or something made with Lovable, Cursor or v0? I design and code it, or polish it until it looks and works like one product. | “Looks and works like one product” is what an AI-built app lacks. |

## Industries

Moves below services. Only the intro line changes.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Intro | I design for regulated, data-heavy products, so I speak your users’ language and your compliance team’s. | I design for regulated, data-heavy products, so I understand both your users and your compliance team. | Plain words. The fintech card still leads. |

## About

Your title is now “product designer”.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Intro | I’m a UI/UX designer working on identity verification and onboarding at an AI-powered fintech company. Every day I make complex, compliance-heavy flows feel simple and trustworthy. | I’m a product designer who specializes in identity verification and onboarding: flows that are compliance-heavy and easy to get wrong. I make them feel simple and trustworthy. | Matches how you describe yourself and removes the employer mention. |
| Background | With a background in finance, I design around business numbers, not just screens. Through Sebs UX Studio, I bring that focus to SaaS and fintech teams who need onboarding that converts. | I started in finance, so I design around business numbers, not just screens. Through Sebs UX Studio, I help SaaS and fintech teams get more people through onboarding. | Keeps your best differentiator. Drops “converts”. |

## FAQ

Two new answers for the two biggest doubts. The screenshot shows the section collapsed.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| New question | (none) | Can’t I just use AI for this? | Replaces “How do you use AI in your process?”. |
| Answer | AI tools speed up research synthesis and first drafts. Every finding, decision and design is reviewed and owned by me. | AI is great at drawing screens fast, and I use it too, for research synthesis and first drafts. It can’t see your users, your funnel or your compliance rules, so it can’t tell you which screen is losing people or why. I check every finding and own every decision. | Answers the objection directly. |
| New question | (none) | Do you guarantee more conversions? | Honest answer builds more trust than a promise. |
| Answer | (none) | No. Conversion also depends on your traffic, your price and how the fixes are built. I find and fix the reasons people quit, and we agree how to measure the change before we start. | Sets expectations and shows you plan to measure. |

## Closing call to action

Same offer. One word changed to match the hero.

| Where | Current | Proposed | Why or evidence |
|---|---|---|---|
| Heading | Find out where your users drop off. | Find out where your users quit. | Same verb as the hero. |
| Body | You’ll get a clear map of what’s losing users and what to fix first. | You get a clear map of where people leave and what to fix first. | Present tense, plain words. |

## Search result text

| | Current | Proposed |
|---|---|---|
| Title | UX Audits & Redesigns for SaaS and Fintech \| Sebs UX Studio | Fix Signup and Onboarding Drop-off \| Sebs UX Studio |
| Description | Find where users drop off in signup, onboarding and KYC. UX audits, redesign sprints, new product builds and AI-built product polish. Request a UX audit. | The mistakes that make users quit signup, ID checks and onboarding, and how a 5-day UX audit finds them in your product. For SaaS and fintech teams. |
