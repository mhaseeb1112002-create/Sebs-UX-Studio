// Service pages and guides. Voice: first person, plain words, specific. Only claims already on the site, or general UX practice.
const SITE = (process.env.SITE_URL || 'https://sebsuxstudio.com').replace(/\/$/, '');
const FAQ = {
  priceAudit: ['How does pricing work?', 'Fixed fee: $990–$2,500, depending on how many flows. You get an exact quote within 24 hours of our call.'],
  priceSprint: ['How does pricing work?', 'Fixed fee: $3,000–$8,000, depending on scope. Exact quote within 24 hours of our call.'],
  priceBuild: ['How does pricing work?', 'Polish is $1,500–$4,000 (1–2 weeks). New products are priced after a short call.'],
  access: ['What access do you need?', 'Usually a walkthrough of your product or staging access, plus analytics if you have them. Nothing more until the audit starts.'],
  audit: ['What do I get from an audit?', 'A flow-by-flow UX review, a drop-off map, a prioritized fix list and a 30-minute walkthrough call. It takes about 5 days and costs $990–$2,500.'],
  design: ['Do you design the product too?', 'Yes. I design products end to end, from the first flow to the final UI, and I can build them in code too. I also fix existing ones. If you have developers, they get specs and components they can build right away. For AI-built products (Lovable, Cursor, v0), I clean up the UX and UI of what already exists.'],
  who: ['Who do you work with?', 'Seed to Series A B2B SaaS and fintech teams, especially those without an in-house designer.'],
  nda: ['Do you sign an NDA?', 'Yes. Send yours over before we start, or I can share a simple one.'],
  checks: ['Will you ask us to remove verification checks?', 'No. I work inside your compliance rules. Some steps have to stay, and I do not suggest dropping them. I make those steps clearer: what is asked, why, and what to do when something fails. Ask your compliance team which steps are fixed before we start, and I will mark them in the audit.'],
  sdk: ['What if our verification runs on a vendor SDK or a hosted page?', 'I review what you control: the screens before and after the vendor step, the wording, the error, waiting and rejection states, and the way back into the flow. If a screen belongs to the vendor and cannot be changed, I mark it and list what to ask the vendor to change. If you cannot see what happens inside that step, I tell you which events to track so you can.'],
  scope: ['How long does it take, and what does it cost?', 'It depends on what your team needs. A single workshop is short. A team assessment or a design system takes longer. I scope it after a short intro call, so you know the time and the price before we begin. Contact me for pricing.'],
  ai: ['How do you use AI in your process?', 'AI tools speed up research synthesis and first drafts. Every finding, decision and design is reviewed and owned by me.'],
};
const wk = f => `/assets/work/${f}`, gd = f => `/assets/guides/${f}`;

export const pages = [
  /* ---------------------------------------------------------------- services */
  {
    route: '/services/onboarding-kyc-audit/', kind: 'service', crumb: ['Services', '/#services'], name: 'Onboarding & KYC audit',
    title: 'Fintech & KYC Onboarding UX Audit | Sebs UX Studio',
    description: 'Find the exact screen where users leave your signup or ID verification flow. Drop-off map, prioritized fixes and a walkthrough call in 5 days.',
    eyebrow: 'Onboarding & KYC audit',
    h1: 'A UX audit for fintech <span class="hl">onboarding and KYC</span>',
    lede: 'I find the exact screen where users leave your signup or identity verification flow, and tell you what to fix first. You get a drop-off map, a prioritized fix list and a 30-minute walkthrough call. It takes about 5 days.',
    secondary: ['See a sample audit', '/#audit'],
    heroImg: [wk('kyc-id-upload-redesign-screen-1.webp'), 1176, 840, 'An ID upload screen with three numbered issues next to the ranked list of findings'],
    blocks: [
      { type: 'cards', title: 'What you get', items: [
        ['Drop-off map', 'Every step of your flow, with where people leave and the likely reasons why.'],
        ['Prioritized fix list', 'Each issue ranked by impact, with the screen marked and a fix you can ship.'],
        ['30-minute walkthrough', 'A call to go through the findings with your team and agree what to fix first.'],
      ] },
      { type: 'prose', title: 'Why an audit before a redesign', html: '<p>Analytics shows where users leave. It does not show why. A drop at the ID upload step could mean a blurry camera view, a vague error, a long wait or a rejection that nobody explained.</p><p>The audit connects the two. I go through your flow screen by screen, line up what I find with your numbers, and rank the problems by how much they cost you. Then you know what to fix first, and what to leave alone.</p><p>I never ask you to remove a verification check. Compliance sets the floor. I make the steps around it clear, so people get through them.</p>' },
      { type: 'prose', title: 'How I review and rate the flow', html: `<p>I review every screen against established usability principles, for example visibility of system status, error prevention, and helping users recognize, diagnose and recover from errors. Each finding names the principle it breaks.</p><p>I rate each finding High, Medium or Low by how often the problem happens, how much it hurts and how long it lasts. That is how the fix list gets its order.</p>` },
      { type: 'list', title: 'What I review', items: ['Signup and account creation', 'Identity verification: document choice, ID upload, selfie or liveness check', 'Error messages and how users recover from them', 'Waiting and pending states', 'Rejections, and how they are explained'] },
      { type: 'prose', title: 'When you need more than a review', html: '<p>If the audit raises questions only users can answer, I can add usability tests with real people, or discovery research such as interviews before design starts. I scope these separately after the audit.</p>' },
      { type: 'partial', name: 'audit' },
      { type: 'steps', title: 'How the 5 days run', items: [
        ['Day 1 · Discover', 'A short call to understand your product, users and goals.'],
        ['Days 2 to 5 · Diagnose', 'I map the flow, find the drop-off points and rank them by impact.'],
        ['End of week · Walkthrough', 'You get the drop-off map and the prioritized fix list, and we go through them together on a 30-minute call.'],
      ] },
      { type: 'prose', title: 'Who it is for', html: '<p>Seed to Series A B2B SaaS and fintech teams, especially those without an in-house designer. It also suits identity and KYC products, digital banks and lenders, and AI products where users must trust an automated decision.</p>' },
      { type: 'faq', items: [FAQ.audit, FAQ.checks, FAQ.sdk, FAQ.priceAudit, FAQ.access, FAQ.nda] },
    ],
    related: [['Conversion redesign sprint', '/services/redesign-sprint/'], ['Team coaching & design system', '/services/team-coaching/'], ['Why users drop off at ID verification', '/guides/kyc-drop-off-ux/'], ['KYC ID upload: audit and redesign (concept)', '/work/kyc-id-upload-redesign/']],
  },
  {
    route: '/services/redesign-sprint/', kind: 'service', crumb: ['Services', '/#services'], name: 'Conversion redesign sprint',
    title: 'Onboarding Redesign Sprint for Fintech | Sebs UX Studio',
    description: 'I redesign the signup or KYC step that loses the most users, then give your developers specs and components they can build right away. 2–3 weeks.',
    eyebrow: 'Conversion redesign sprint',
    h1: 'Redesign the step that <span class="hl">loses the most users</span>',
    lede: 'Once you know where users leave, I redesign that flow and hand your developers specs and components they can build right away. A sprint takes 2 to 3 weeks.',
    priceline: '$3,000–$8,000 · 2–3 weeks',
    secondary: ['See a concept project', '/work/kyc-id-upload-redesign/'],
    heroImg: [wk('kyc-id-upload-redesign-screen-2.webp'), 1176, 840, 'A redesigned guided ID scan screen and selfie screen'],
    blocks: [
      { type: 'cards', title: 'What you get', items: [
        ['Wireframes to high-fidelity UI', 'From the first sketch of the flow to finished screens in your brand.'],
        ['Clickable prototype', 'Something your team and your users can try before anyone writes code.'],
        ['Developer handoff', 'Specs and components your developers can build right away.'],
      ] },
      { type: 'figure', src: wk('kyc-id-upload-redesign-cover.webp'), w: 2400, h: 1280, alt: 'Before and after screens of an ID upload flow: a weak upload screen, then redesigned scan, selfie and verified screens', caption: 'Example: an ID upload step before and after a redesign (concept project).' },
      { type: 'steps', title: 'How a sprint works', items: [
        ['Redesign', 'I design and prototype the fixes, reviewing with you each week.'],
        ['Handoff', 'Specs and components your developers can build right away, in the final week.'],
      ] },
      { type: 'prose', title: 'Start with the audit', html: '<p>Most clients start with the audit, then move to a sprint. The audit shows which flow loses the most users, so the sprint goes where it counts.</p>' },
      { type: 'faq', items: [FAQ.priceSprint, FAQ.design, FAQ.checks, FAQ.access] },
    ],
    related: [['Onboarding & KYC audit', '/services/onboarding-kyc-audit/'], ['Product build & polish', '/services/build-and-polish/'], ['ID upload UX checklist', '/guides/id-upload-ux-checklist/']],
  },
  {
    route: '/services/build-and-polish/', kind: 'service', crumb: ['Services', '/#services'], name: 'Product build & polish',
    title: 'Product Build & AI-Built App Polish | Sebs UX Studio',
    description: 'A new product, or one built with Lovable, Cursor or v0? I design and code it, or polish it into a clean, consistent product users trust.',
    eyebrow: 'Product build & polish',
    h1: 'Build a new product, or <span class="hl">polish one built with AI</span>',
    lede: 'A new product, or one built with Lovable, Cursor or v0? I design and code it, or turn it into a clean, consistent product users trust.',
    secondary: ['Talk about your product', '/start/'],
    heroImg: [gd('new-product-screens.webp'), 1176, 840, 'A fintech dashboard screen and an ID scan screen designed as one consistent product'],
    blocks: [
      { type: 'cards', title: 'Two ways to work together', items: [
        ['Design and code a new product', 'I design the product end to end, from the first flow to the final UI, and I build it in code. If you have developers, I hand over specs and components they can build right away.'],
        ['Polish an AI-built product', 'I clean up the UX and UI of what already exists, so it looks and works like one product.'],
      ] },
      { type: 'list', title: 'What I build', items: ['An MVP, from the first idea to a working first version', 'Front-end and back-end', 'DevOps and delivery: hosting and deployment'] },
      { type: 'table', title: 'Signs an AI-built product needs polish', head: ['What you see', 'Usability principle'], rows: [
        ['Screens are styled differently from each other', 'Consistency and standards'],
        ['Buttons and actions give no visible feedback', 'Visibility of system status'],
        ['Error and empty states are missing', 'Help users recognize, diagnose and recover from errors'],
        ['New users ask how to do basic things', 'Help and documentation'],
      ], note: 'These are standard usability principles. I check every screen against them.' },
      { type: 'prose', title: 'Why AI-built products feel off', html: '<p>AI tools usually generate each screen on its own, without a shared design system. So buttons, spacing and wording change from screen to screen, and the small states that make a product feel finished are missing.</p><p>Polishing fixes the system as well as the screen. Once the components and styles are consistent, new screens come out consistent too.</p>' },
      { type: 'figure', src: gd('ai-built-polish-before-after.webp'), w: 2400, h: 1100, alt: 'An AI-built dashboard with mismatched fonts, corners and buttons, next to the same dashboard made consistent and clear', caption: 'Example screens: a dashboard before and after polish.' },
      { type: 'list', title: 'What you get in a polish', items: ['UX cleanup of key flows', 'Consistent UI and components', 'A lightweight design system'] },
      { type: 'prose', title: 'How long it takes', html: '<p>A polish takes about 1 to 2 weeks. A new product depends on scope, so I price it after a short intro call.</p>' },
      { type: 'faq', items: [FAQ.design, FAQ.priceBuild, FAQ.ai, FAQ.nda] },
    ],
    related: [['Onboarding & KYC audit', '/services/onboarding-kyc-audit/'], ['Conversion redesign sprint', '/services/redesign-sprint/'], ['Meemi Art: pattern store & design system', '/work/meemi-art-design-system/']],
  },
  {
    route: '/services/team-coaching/', kind: 'service', crumb: ['Services', '/#services'], name: 'Team coaching & design system',
    title: 'Team UX Coaching & Design System | Sebs UX Studio',
    description: 'Workshops on your own product, a review of how your team handles UX, and a light design system. For product teams that have no design team yet.',
    eyebrow: 'Team coaching & design system',
    h1: 'Teach your team to <span class="hl">find and fix UX problems</span>',
    lede: 'Hands-on workshops on your own product, a review of how your team handles UX today, and a light design system your developers can keep using. For product teams that do not have a design team yet.',
    secondary: ['Talk about your team', '/start/'],
    heroImg: [gd('team-coaching-board.webp'), 1176, 840, 'A design system board with colours, type, buttons and a team review checklist'],
    blocks: [
      { type: 'cards', title: 'What I offer', items: [
        ['Workshops on your own product', 'Hands-on sessions, built around your screens and your numbers. For example: reading a funnel, reviewing a flow, and writing clear error messages.'],
        ['A review of how your team works', 'I look at how your team finds UX problems, tests ideas, hands work to developers and checks the result. You get a short list of what to change first.'],
        ['A light design system', 'A small set of components, colours and type rules, so screens look and behave the same, and developers stop rebuilding the same button.'],
      ] },
      { type: 'prose', title: 'When this fits', html: '<p>You have developers and a product manager, but UX decisions get made on the side. Or you shipped a product built with AI tools and every screen looks different. Or you ran an audit and want your team to keep the gains.</p><p>It also suits teams that want an expert to check their way of working before they hire a designer.</p>' },
      { type: 'steps', title: 'How it works', items: [
        ['Intro call', 'We talk about your product, your team and what is not working.'],
        ['Plan', 'We agree what you will receive, who takes part and what to prepare.'],
        ['Deliver', 'I run the sessions or the review. You get a short written summary of what we found and what to do next.'],
      ] },
      { type: 'prose', title: 'Start with the audit if you can', html: '<p>If your problem is one flow, such as signup or ID verification, the <a href="/services/onboarding-kyc-audit/">onboarding and KYC audit</a> is the faster first step. Coaching suits the wider question of how your team works.</p>' },
      { type: 'faq', items: [FAQ.scope, FAQ.access, FAQ.nda] },
    ],
    related: [['Onboarding & KYC audit', '/services/onboarding-kyc-audit/'], ['Product build & polish', '/services/build-and-polish/'], ['ID upload UX checklist', '/guides/id-upload-ux-checklist/']],
  },
  /* ------------------------------------------------------------------ guides */
  {
    route: '/guides/kyc-drop-off-ux/', kind: 'guide', crumb: ['Guides', '/guides/'], name: 'Why users drop off at ID verification',
    title: 'Why Users Drop Off at ID Verification | Sebs UX Studio',
    description: 'Ten UX causes of KYC drop-off, from vague errors to unexplained AI rejections, with a fix for each and a way to find your own worst step.',
    eyebrow: 'Guide · KYC',
    h1: 'Why users drop off at <span class="hl">ID verification</span>',
    lede: 'Published estimates say between 25% and 60% of people leave during identity verification, depending on the market and the checks involved. Most of them did not decide against verifying. One screen confused them.',
    secondary: ['Get an audit of your flow', '/services/onboarding-kyc-audit/'],
    blocks: [
      { type: 'prose', title: 'Where people leave', html: `<p>A few steps lose most people: taking the ID photo, the selfie or liveness check, and waiting for the result. Your own funnel shows which step is yours. The <a href="/guides/drop-off-method/">Drop-off Method</a> shows how to find it.</p><p>Analytics tells you where. It does not tell you why. The causes below explain most of the why, and each one maps to a usability principle.</p>` },
      { type: 'table', title: 'What the research says', head: ['Finding', 'Figure', 'Source'], rows: [
        ['Digital bank accounts abandoned before completion', 'Up to 60%', 'UserTesting research (year not stated)'],
        ['Abandonment at KYC, industry range', '25% to 60%+', 'Vendor FAQ'],
        ['Conversion lost when an ID upload is required', '29% drop', 'Industry data (year not stated)'],
        ['Applicants who quit because they had to share too much personal data', '21% of those who quit', 'Signicat, "Battle to Onboard"'],
        ['Step completion with active vs passive liveness', 'About 63% vs 99.9%', 'Innovatrics, one production deployment'],
        ['Drop-off after the flow moved into the bank\'s own interface', '48% down to 30%', 'One European banking project, not a controlled study'],
      ], note: 'These figures come from my KYC research notes, compiled on 30 October 2026 from public vendor and research pages. Year and sample size are often missing, so treat them as directional. The sources are listed at the end.' },
      { type: 'figure', src: gd('kyc-drop-off-pains.webp'), w: 2400, h: 1100, alt: 'Five identity verification screens: a vague error, a camera that cannot read the ID, too many liveness tasks, no sign of progress and a rejection with no reason', caption: 'Five screens that cost you users.' },
      { type: 'cause', n: 1, title: 'Vague errors', text: 'The screen says "Invalid." or "Upload failed." The user cannot tell what to change, so they try the same thing again, or give up.', fix: 'Say what went wrong and how to fix it: "The photo is blurry. Hold your phone steady and try again."', nng: 'Help users recognize, diagnose and recover from errors: use plain language, name the specific problem, do not blame the user and keep what they typed.' },
      { type: 'cause', n: 2, title: 'The camera cannot read the ID', text: 'There is no frame to line the card up with, the light is bad, or the document is an unusual type. The user retakes the photo again and again.', fix: 'Show a framing guide, give live hints about light and glare, capture automatically when the card is in focus, and let people upload a file as a backup.', nng: 'Error prevention and visibility of system status: a guide and live hints stop the bad photo before it happens, instead of reporting it afterwards.' },
      { type: 'cause', n: 3, title: 'Too many liveness tasks', text: '"Blink. Turn your head. Read this phrase." Every action is another place to fail, and some people cannot do them easily. In one vendor\'s production deployment, step completion was about 63% with active liveness tasks and 99.9% with passive liveness (Innovatrics, one deployment, so directional).', fix: 'Ask for the fewest actions your risk model allows. Explain each one in a line before the camera starts, and offer another way for people who cannot do it.', nng: 'User control and flexibility : ask for as little as you need, and always leave people another route.' },
      { type: 'cause', n: 4, title: 'No sign of progress', text: 'The user cannot tell how many steps are left, or whether the check is still running. A spinner with no end looks like a crash.', fix: 'Show a step count and an estimated wait. If the result takes a while, say how they will hear back, and let them leave and return.', nng: 'Visibility of system status. About 0.1 seconds feels instant, 1 second keeps the user\'s flow, and around 10 seconds is the limit of attention. A looping animation is enough for short waits, percent-done is better from about 10 seconds, and a status tracker suits waits of minutes or hours.' },
      { type: 'cause', n: 5, title: 'A rejection with no reason', text: '"Not approved." and a Try again button. The user does not know what to change, so they leave or write to support.', fix: 'Give a plain reason where you can, say what to change, keep their progress on retry and offer a way to reach a person. The guide on explaining AI rejections goes deeper.', nng: 'Help users recover from errors, and give them control: a reason, a way to fix it and a way out.' },
      { type: 'cards', title: 'Five more causes from the research', items: [
        ['Camera or location prompts with no reason', `Explain why you need access, at the moment you need it. People are more likely to grant a permission when they are told why, even when the reason is simple.`],
        ['A redirect to a third-party page', 'When the look changes, people think something broke and close the page. In one European bank, drop-off fell from 48% to 30% after the flow moved into the bank\'s own interface (one project, not a controlled study). Keep the look and wording consistent.'],
        ['Approvals that are later reversed', 'A success message that is reversed later looks like a malfunction and forces people to start again. Show success only when the result is final, and say "pending" until then.'],
        ['Asking for too much', 'Of the applicants who quit, 21% said they had to share too much personal data (Signicat). Ask only for what you need, and say why.'],
        ['Gaps in accessibility', 'Face checks reject people with disabilities more often, and a passport fallback fails people whose hands shake. Test with these users and offer another route.'],
      ] },
      { type: 'steps', title: 'How to find your worst step', items: [
        ['Map the steps', 'List every screen from signup to verified.'],
        ['Count who reaches each step', 'Your analytics shows where the biggest drop is.'],
        ['Watch real people', 'Watch about five people go through that step, in tests or session recordings, to see why they leave.'],
        ['Rate what you find', 'Mark each problem High, Medium or Low by how often it happens, how much it hurts and whether it lasts.'],
        ['Fix one thing, then measure', 'Track completion rate, retries per capture and time to verify, before and after each change.'],
      ] },
      { type: 'prose', title: 'Fewer drop-offs, same controls', html: '<p>Reducing friction must not weaken your checks. Some steps have to stay. Ask your compliance team which ones before you change a flow, then make those steps as clear as they can be.</p>' },
    ],
    related: [['ID upload UX checklist', '/guides/id-upload-ux-checklist/'], ['How to explain an AI rejection to users', '/guides/explain-ai-rejections/'], ['Onboarding & KYC audit', '/services/onboarding-kyc-audit/']],
  },
  {
    route: '/guides/id-upload-ux-checklist/', kind: 'guide', crumb: ['Guides', '/guides/'], name: 'ID upload UX checklist',
    title: 'ID Upload UX Checklist for KYC Flows | Sebs UX Studio',
    description: 'A practical checklist for ID upload and selfie steps: before capture, during capture, after capture and what to show when it fails.',
    eyebrow: 'Guide · Checklist',
    h1: 'ID upload UX checklist for <span class="hl">KYC flows</span>',
    lede: 'Use this list to review the ID upload and selfie steps of your flow. Each group starts from a usability principle, and each line is one thing to check. Adjust it to your own risk and compliance requirements.',
    secondary: ['Have me run this on your flow', '/services/onboarding-kyc-audit/'],
    blocks: [
      { type: 'figure', src: wk('kyc-id-upload-redesign-screen-2.webp'), w: 1176, h: 840, alt: 'A guided ID scan screen and a selfie screen', caption: 'A guided scan screen and a selfie screen (concept).' },
      { type: 'prose', title: 'How to use it', html: `<p>Go through your flow on a real phone, on a slow connection, in poor light. Mark every line you cannot tick.</p><p>Then rate each unticked line High, Medium or Low by how often it happens, how much it hurts and whether it lasts. The first fix is the High one nearest the step where most users leave. Not sure which step that is? Use the <a href="/guides/drop-off-method/">Drop-off Method</a>.</p>` },
      { type: 'check', title: 'Before capture', nng: 'Visibility of system status, and match between the system and the real world: tell people what is happening, in words they know.', items: ['Say which documents you accept before the user opens the camera', 'Say why you need it, in one line', 'Say how long it takes, for example "About 2 minutes"', 'Show the step count, for example "Step 2 of 4"', 'Let users pick the document type and show a sample of a good photo', 'Ask only for the data you need, and say why you need it'] },
      { type: 'check', title: 'Permissions and handoffs', nng: 'Give a reason, ask in context, and make a refusal reversible. People are more likely to grant access when they are told why.', items: ['Explain why you need the camera before the browser asks: "[Product] would like to use your camera so that you can scan your ID."', 'Ask at the moment the user is about to take the photo, not on the first screen', 'If permission is denied, say what is missing and link to the settings so it can be turned on', 'If a third-party page or SDK opens, keep the look and wording consistent and tell users it is a trusted step'] },
      { type: 'check', title: 'During capture', nng: 'Error prevention: stop the bad photo before it happens, instead of reporting it afterwards.', items: ['Show a framing guide that matches the shape of the document', 'Give live hints about light, glare and blur', 'Capture automatically when the document is in focus, with a manual button as a backup', 'Keep the camera view large and keep text out of it', 'Offer a file upload for people who cannot use the camera'] },
      { type: 'check', title: 'After capture', nng: 'Visibility of system status: use a looping animation for short waits, percent done from about 10 seconds, and a status tracker for minutes or hours.', items: ['Show a preview with "Retake" and "Use this photo"', 'Check the photo on the device for blur, glare and cut-off edges, and say what failed', 'Show a clear "checking" state with an estimated wait', 'Save progress, so users can leave and come back', 'Show success only when the result is final, and say "pending" until then', 'Say what happens next, and how users will hear the result'] },
      { type: 'check', title: 'When it fails', nng: 'Help users recognize, diagnose and recover from errors: make the message easy to notice, write it in plain language, name the specific problem, do not blame the user and keep what they typed.', items: ['Say what went wrong in plain words', 'Say how to fix it, and show an example', 'Put the message next to what failed, and do not rely on color alone', 'Let users retry without starting over', 'After two failed tries, offer another way: another document, an upload or a person', 'Keep raw error codes out of the user\'s view and log them for your team'] },
      { type: 'check', title: 'Selfie and liveness', nng: 'User control and flexibility: ask for as little as you need and leave people another route.', items: ['Ask for as few actions as your risk model allows', 'Explain each action in one line before the camera starts', 'Show a face outline and a live hint such as "Look straight ahead"', 'Test the prompts with glasses, head coverings and low light', 'Offer another way for people who cannot do an action'] },
      { type: 'check', title: 'Accessibility', nng: 'Face checks reject people with disabilities more often, and a passport fallback fails people whose hands shake. Do not leave anyone without a route.', items: ['Test with people who have disabilities, not only with your own team', 'Offer another route if a face check or a steady hand is required', 'Pair every status color with an icon and words', 'Keep text readable on small phones and in bright light'] },
      { type: 'note', html: 'Want all 36 checks? <a href="/#checklist">Get the free checklist (PDF)</a>' },
    ],
    related: [['Why users drop off at ID verification', '/guides/kyc-drop-off-ux/'], ['KYC ID upload: audit and redesign (concept)', '/work/kyc-id-upload-redesign/'], ['Onboarding & KYC audit', '/services/onboarding-kyc-audit/']],
  },
  {
    route: '/guides/explain-ai-rejections/', kind: 'guide', crumb: ['Guides', '/guides/'], name: 'How to explain an AI rejection to users',
    title: 'How to Explain an AI Rejection to Users | Sebs UX Studio',
    description: 'When an automated check says no, users need a reason and a next step. Patterns for plain-language reasons, retries and human review.',
    eyebrow: 'Guide · AI products',
    h1: 'How to explain an <span class="hl">AI rejection</span> to users',
    lede: 'When an automated check says no, most screens show "Not approved" and a Try again button. The user does not know what to change, so they leave or write to support.',
    secondary: ['Review my rejection screens', '/services/onboarding-kyc-audit/'],
    blocks: [
      { type: 'figure', src: gd('ai-rejection-before-after.webp'), w: 2400, h: 1100, alt: 'A rejection screen that only says Not approved, next to one that gives a reason, a way to retry and a way to talk to a person', caption: 'The same rejection, before and after.' },
      { type: 'prose', title: 'What users need', html: `<p>Three things: why it happened, what to do next, and a way to reach a person if they disagree. Without them, a rejection feels like a wall, and people stop trusting the product.</p><p>Three usability principles apply: help users recognize and recover from errors, give people control and a way out, and keep the system's status visible.</p>` },
      { type: 'cards', title: 'Four patterns that work', items: [
        ['A plain-language reason', '"The photo was blurry, so we could not read the number." Not an error code.'],
        ['What to change', 'Tell people the specific thing to fix, and show an example if it helps.'],
        ['A retry that keeps progress', 'Let users try again without re-entering everything.'],
        ['A person to talk to', 'A visible way to reach support, or to ask for a manual review.'],
      ] },
      { type: 'cards', title: 'What goes wrong with AI results', items: [
        ['Rejections without reasons', 'Users cannot tell why an AI check failed, so they retry blindly or leave. Show the specific cause in plain words.'],
        ['Scores that mean nothing', 'Users do not know how a confidence score is computed. Explain the score, or drop it.'],
        ['No way to contest', 'People need an accessible way to correct a wrong result. One study of 26 blind users found that their corrections were ignored and the errors repeated.'],
        ['All-or-nothing results', 'A result that is mostly right forces people to accept it or start over. Let them edit or undo.'],
        ['Too much automation', 'Users lose control when the system acts without their input. Start with approval steps and add automation as trust builds.'],
      ] },
      { type: 'table', title: 'Write it like this', head: ['Instead of', 'Say'], rows: [
        ['Not approved.', 'We could not read your ID. The photo was blurry. Retake it in good light.'],
        ['Verification failed (error 4021).', 'Your selfie did not match the photo on your ID. Try again in good light, or talk to a person.'],
        ['Try again.', 'Retake photo. Your other answers are saved.'],
      ], note: 'The same rules as any error message: plain language, a specific problem, no blame and a way to fix it.' },
      { type: 'prose', title: 'What you may not be able to say', html: '<p>Some reasons cannot be shown, for example when saying them would help a fraudster. In that case, use a general reason such as "We could not verify your details", and still give a next step and a way to reach a person.</p><p>Ask your compliance or legal team which rules about automated decisions apply where you operate. Some rules expect an explanation or a human review. This guide is design advice, not legal advice.</p>' },
    ],
    related: [['Why users drop off at ID verification', '/guides/kyc-drop-off-ux/'], ['ID upload UX checklist', '/guides/id-upload-ux-checklist/'], ['Onboarding & KYC audit', '/services/onboarding-kyc-audit/']],
  },
  {
    route: '/guides/drop-off-method/', kind: 'guide', slug: 'drop-off-method', crumb: ['Guides', '/guides/'], name: 'The Drop-off Method: find it, prove it, fix it',
    title: 'The Drop-off Method: How to Fix the Step Where Users Quit | Sebs UX Studio',
    description: 'A 3-step method for fixing sign-up and onboarding drop-off: find the step, prove why people leave, fix that step first. How every Sebs UX audit works.',
    eyebrow: 'Guide · Method',
    h1: 'The Drop-off Method: find it, prove it, fix it',
    heroImg: ['/assets/guides/drop-off-method.webp', 900, 1125, 'The Drop-off Method: 01 Find the step, 02 Prove the why, 03 Fix that step first.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>Most teams guess where their sign-up loses people. Then they redesign the screens they dislike most.</p><p>Sign-ups don't move, because people were quitting somewhere else.</p><p>The Drop-off Method is how I avoid that. It has three steps, always in this order.</p>` },
      { type: 'prose', title: '01 Find the step', html: `<p>Map every step of the flow, from the first click to the first useful moment. Then count how many people reach each step.</p><div class="cp-tbl cp-tbl-fit" tabindex="0" role="region" aria-label="01 Find the step (scrolls sideways on small screens)"><table><thead><tr><th>Step</th><th>People who reach it (example)</th></tr></thead><tbody><tr><td>Sign up</td><td>1,000</td></tr><tr><td>Verify email</td><td>820</td></tr><tr><td>Company details</td><td>410</td></tr><tr><td>Connect bank</td><td>370</td></tr><tr><td>First payment</td><td>300</td></tr></tbody></table></div><p><em>Example numbers, not client data.</em></p><p>Here the biggest drop is between "Verify email" and "Company details": half the people leave. That is the step to work on. Everything else waits.</p><p>You can do this yourself in about 10 minutes with any analytics tool that shows a funnel.</p>` },
      { type: 'prose', title: '02 Prove the why', html: `<p>A funnel tells you <strong>where</strong> people leave. It doesn't tell you <strong>why</strong>.</p><p>To find the why, I use whatever the product has:</p><ul><li><strong>Analytics</strong> for patterns: device, traffic source, time spent on the step.</li><li><strong>Session recordings</strong> to watch real attempts.</li><li><strong>5 real people</strong> trying the flow while thinking out loud.</li></ul><p>Five people is enough to see the biggest problems. It isn't a statistic. It's a way to stop guessing.</p>` },
      { type: 'prose', title: '03 Fix that step first', html: `<p>Design the fix for that one step, and agree how to measure it <strong>before</strong> anyone builds it. For example: "More than 60% of people who reach Company details finish it."</p><p>Then ship, measure, and move to the next biggest drop.</p>` },
      { type: 'prose', title: 'Why the order matters', html: `<p>Most redesigns start at step 3. They fix screens without knowing whether those screens were the problem.</p><p>The steps are simple. The order is the point.</p>` },
      { type: 'prose', title: 'Use it on your own sign-up', html: `<ol><li>Open your sign-up funnel in analytics.</li><li>Write down how many people reach each step.</li><li>Circle the biggest drop.</li><li>Watch 5 people try that step.</li><li>Fix what you saw, and decide how you'll measure it.</li></ol><p>Every audit I run follows these three steps. If you'd like me to run it on your product, <a href="/start/" data-ba="guide_body">book an audit</a> or ask for a free 5-minute teardown.</p>` },
    ],
    related: [['Don\'t A/B test your sign-up yet', '/guides/ab-test-sign-up/'], ['10 sign-up flows worth copying', '/guides/signup-flows-worth-copying/'], ['Cut fields, not steps', '/guides/cut-fields-not-steps/']],
  },
  {
    route: '/guides/ab-test-sign-up/', kind: 'guide', slug: 'ab-test-sign-up', crumb: ['Guides', '/guides/'], name: 'Don\'t A/B test your sign-up yet',
    title: 'Should You A/B Test Your Sign-up? Not Yet | Sebs UX Studio',
    description: 'At 2% conversion, proving a 15% lift needs about 36,700 visitors per version. Watch 5 people first to learn why users quit, then test.',
    eyebrow: 'Guide · Testing',
    h1: 'Don\'t A/B test your sign-up yet',
    heroImg: ['/assets/guides/ab-test-sign-up.webp', 900, 1125, '36,700 visitors per version to trust a 15% lift at 2% conversion, versus 5 people to see where they get stuck.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>Your sign-up converts 2% of visitors. You've redesigned a screen and want to A/B test it.</p><p>Before you do, check how many visitors you'll need.</p>` },
      { type: 'prose', title: 'The number most early teams don\'t have', html: `<p>To trust a 15% lift on a 2% conversion rate (2% → 2.3%), a standard test needs about <strong>36,700 visitors per version</strong>. That's roughly 73,000 visitors for one test.</p><p><em>How I got this: a two-sided sample-size calculation at 95% confidence and 80% power.</em></p><div class="cp-tbl cp-tbl-fit" tabindex="0" role="region" aria-label="The number most early teams don't have (scrolls sideways on small screens)"><table><thead><tr><th>Your conversion</th><th>Lift you want to detect</th><th>Visitors per version</th></tr></thead><tbody><tr><td>2%</td><td>15%</td><td>~36,700</td></tr><tr><td>2%</td><td>10%</td><td>~80,700</td></tr><tr><td>5%</td><td>15%</td><td>~14,200</td></tr></tbody></table></div><p>Most early SaaS and fintech teams wait months to reach that. Many stop the test early, and early results are often wrong.</p>` },
      { type: 'prose', title: 'A test tells you who won, not why', html: `<p>Even when the test finishes, you learn which version won. You don't learn why people were quitting. So the next idea is another guess.</p>` },
      { type: 'prose', title: 'Watch 5 people first', html: `<p>Before you test, watch 5 people try your sign-up while they think out loud. In one afternoon you'll see where they hesitate, what they misread, and where they give up.</p><p>Five people won't measure a problem. They'll show you which problem to work on, so the change you finally test is the right one.</p>` },
      { type: 'prose', title: 'When A/B testing makes sense', html: `<ul><li>You have enough traffic for the lift you care about (use the table above).</li><li>You already know <strong>why</strong> people quit at that step.</li><li>You're choosing between two good options, not looking for the problem.</li></ul>` },
      { type: 'prose', title: 'The order that works', html: `<ol><li><strong>Find the step</strong> with the biggest drop in your funnel.</li><li><strong>Watch 5 people</strong> go through it.</li><li><strong>Fix</strong> what you saw.</li><li><strong>Then test</strong>, if your traffic allows it.</li></ol><p>This is step 2 of the <a href="/guides/drop-off-method/">Drop-off Method</a>: prove the why before you change anything.</p><p>Want an outside look at your sign-up? <a href="/start/" data-ba="guide_body">Book an audit</a>.</p>` },
    ],
    related: [['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/'], ['Cut fields, not steps', '/guides/cut-fields-not-steps/']],
  },
  {
    route: '/guides/cut-fields-not-steps/', kind: 'guide', slug: 'cut-fields-not-steps', crumb: ['Guides', '/guides/'], name: 'Cut fields, not steps',
    title: 'Shorter Sign-up Forms: Cut Fields, Not Steps | Sebs UX Studio',
    description: 'Merging screens doesn\'t make a sign-up shorter. Baymard\'s research shows the number of fields matters more than the number of steps. What to cut first.',
    eyebrow: 'Guide · Forms',
    h1: 'Cut fields, not steps',
    heroImg: ['/assets/guides/cut-fields-not-steps.webp', 900, 1125, 'Cut fields, not steps: fewer fields matter more than fewer screens.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>When a sign-up feels long, the usual fix is to merge screens. Fourteen fields on five screens become fourteen fields on two.</p><p>It looks shorter. It isn't.</p>` },
      { type: 'prose', title: 'Fields matter more than steps', html: `<p>Baymard Institute studies checkout forms at scale. Their research found that the number of form fields affects completion more than the number of steps. The average checkout they reviewed had <strong>11.3 fields</strong>, while most could work with about <strong>8</strong>.</p><p>Sign-up works the same way. Every field is something people have to read, think about and type. Squeezing them onto fewer screens makes each screen heavier.</p>` },
      { type: 'prose', title: 'What to cut first', html: `<p><strong>1. Split name fields.</strong> In Baymard's testing, 42% of users typed their full name into a "First name" field. One "Full name" field avoids the problem.</p><p><strong>2. Optional fields shown by default.</strong> "Address line 2", "Company website", "How did you hear about us?" Hide them behind a link, or remove them.</p><p><strong>3. Anything you can prefill.</strong> Country from location, company from email domain, time zone from the browser.</p><p><strong>4. Anything you can ask later.</strong> Role, team size and phone number are rarely needed before someone sees value. Ask when the answer changes what they see.</p>` },
      { type: 'prose', title: 'A quick test for every field', html: `<p>For each field in your sign-up, write when you actually need it:</p><ul><li><strong>Now</strong>: you can't create the account without it.</li><li><strong>Later</strong>: you need it, but not before the first win.</li><li><strong>Never</strong>: nobody uses it.</li></ul><p>Keep "Now". Move "Later" to after the first useful screen. Delete "Never".</p>` },
      { type: 'prose', title: 'When more steps are fine', html: `<p>Splitting a long form into short, clear steps can help, as long as each step has a few fields and people can see how many steps are left. Steps aren't the enemy. Unneeded fields are.</p><p>Want me to count the fields in your sign-up and tell you what to cut? <a href="/start/" data-ba="guide_body">Book an audit</a>.</p>` },
      { type: 'links', title: 'Sources', items: [
        ['Baymard Institute, checkout form fields research', 'https://baymard.com/blog/checkout-flow-average-form-fields'],
      ] },
    ],
    related: [['10 sign-up flows worth copying', '/guides/signup-flows-worth-copying/'], ['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/']],
  },
  {
    route: '/guides/error-messages/', kind: 'guide', slug: 'error-messages', crumb: ['Guides', '/guides/'], name: 'How to write error messages: what happened + what to do now',
    title: 'How to Write Error Messages Users Understand | Sebs UX Studio',
    description: 'Funny error messages fail people at their worst moment. Use one formula: what happened, plus what to do now. Examples you can copy.',
    eyebrow: 'Guide · Writing',
    h1: 'How to write error messages: what happened + what to do now',
    heroImg: ['/assets/guides/error-messages.webp', 900, 1125, 'A funny error message next to a clear one that says what happened and offers a next step.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>It's 11pm. Someone has spent 20 minutes on a form. They press Save and see:</p><blockquote><p>"Oops! Our hamsters fell off the wheel."</p></blockquote><p>Is their work gone? They don't know. That's the problem.</p>` },
      { type: 'prose', title: 'Why jokes fail in errors', html: `<p>When something breaks, people are already annoyed. A joke doesn't help them fix it. Google's technical writing guide advises against humorous error messages, and jokes go stale fast when people see the same error again and again.</p><p>Save the personality for your 404 page or an empty state.</p>` },
      { type: 'prose', title: 'The formula', html: `<p>Every error message needs two things:</p><p><strong>What happened + what to do now.</strong></p><div class="cp-tbl cp-tbl-fit" tabindex="0" role="region" aria-label="The formula (scrolls sideways on small screens)"><table><thead><tr><th>Instead of</th><th>Write</th></tr></thead><tbody><tr><td>Something went wrong.</td><td>We couldn't save your changes. Your connection dropped. Your work is still here. Try saving again.</td></tr><tr><td>Invalid input.</td><td>Enter a date in this format: DD/MM/YYYY.</td></tr><tr><td>Upload failed.</td><td>This file is over 10 MB. Upload a smaller file, or a photo instead of a scan.</td></tr><tr><td>Verification failed.</td><td>We couldn't read your ID. Try again in brighter light, with all four corners showing.</td></tr></tbody></table></div>` },
      { type: 'prose', title: 'Four rules', html: `<ol><li><strong>Say what happened in plain words.</strong> No codes on their own, no "invalid".</li><li><strong>Give one next step.</strong> A button that does it is better than a sentence that explains it.</li><li><strong>Keep what they entered.</strong> Never clear a form because one field was wrong.</li><li><strong>Never blame the user.</strong> "We couldn't read your ID", not "You uploaded a bad photo".</li></ol>` },
      { type: 'prose', title: 'Where errors cost the most', html: `<p>In sign-up and ID checks, an unclear error is often the moment people leave. They try once more, see the same message, and close the tab. You only see it as a drop in your funnel.</p><p>If your developers write the error messages, give them the formula. It fits in one line of your design system.</p><p>Want me to review the error messages in your sign-up? <a href="/start/" data-ba="guide_body">Book an audit</a>.</p>` },
      { type: 'links', title: 'Sources', items: [
        ['Google Technical Writing, Error messages: set the right tone', 'https://developers.google.com/tech-writing/error-messages/set-tone'],
      ] },
    ],
    related: [['AI should feel accountable, not magical', '/guides/accountability-check/'], ['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/']],
  },
  {
    route: '/guides/accountability-check/', kind: 'guide', slug: 'accountability-check', crumb: ['Guides', '/guides/'], name: 'AI should feel accountable, not magical',
    title: 'How to Design AI Features Users Trust: The Accountability Check | Sebs UX Studio',
    description: 'AI features should feel accountable, not magical. Check every AI result for 4 things: why, how sure, a fix, and an undo.',
    eyebrow: 'Guide · AI',
    h1: 'AI should feel accountable, not magical',
    heroImg: ['/assets/guides/accountability-check.webp', 900, 1125, 'A magical AI message with no reason next to an accountable one that explains itself and offers a review.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>Your AI feature says "Done! Everything's sorted." Your user has no idea what it did, or whether it's right.</p><p>That's where trust breaks. Not when the AI gets something wrong, but when it's wrong and gives people no way to tell.</p>` },
      { type: 'prose', title: 'One test before an AI feature ships', html: `<p><strong>Can the user tell when it's wrong?</strong></p><p>Most can't. The feature presents its answer with confidence, and people have to take it on faith. The risk is the same: when AI presents outputs confidently, people may trust them more than they should.</p>` },
      { type: 'prose', title: 'The Accountability Check', html: `<p>I check every AI result for four things.</p><p><strong>1. Why.</strong> Show what the answer is based on. "Based on how you sorted similar expenses last month."</p><p><strong>2. How sure.</strong> Say it in plain words, not a percentage. "12 sorted. 2 need a check." Google's People + AI Guidebook warns that numeric confidence can mislead people who don't read probabilities well.</p><p><strong>3. A fix.</strong> One tap to correct the result. Corrections also tell the system what it got wrong.</p><p><strong>4. An undo.</strong> A clear way back to doing it yourself. When an AI fails, the easiest path is often to let the person take over.</p>` },
      { type: 'prose', title: 'Magical vs accountable', html: `<div class="cp-tbl cp-tbl-fit" tabindex="0" role="region" aria-label="Magical vs accountable (scrolls sideways on small screens)"><table><thead><tr><th>Magical</th><th>Accountable</th></tr></thead><tbody><tr><td>"Done! Everything's sorted."</td><td>"12 sorted. 2 need a check."</td></tr><tr><td>No reason given</td><td>"Based on how you sorted them last month."</td></tr><tr><td>One button: "Looks great"</td><td>"Review the 2", plus Undo</td></tr></tbody></table></div><p><em>Illustrative example, not a real product.</em></p>` },
      { type: 'prose', title: 'Don\'t explain everything', html: `<p>Explain what changes the decision, not every detail. Long explanations get skipped, and so does the disclaimer at the bottom. Put the reason next to the result, where people already look.</p>` },
      { type: 'prose', title: 'Why it matters for growth', html: `<p>An accurate AI feature is still wrong some of the time. If people can't spot those times, one bad result costs you their trust in all the others. Magic gets a demo. Accountability gets a second use.</p><p>Building an AI feature? <a href="/start/" data-ba="guide_body">Book an audit</a> and I'll run the Accountability Check on it.</p>` },
      { type: 'links', title: 'Sources', items: [
        ['Google PAIR, People + AI Guidebook, Explainability + Trust', 'https://pair.withgoogle.com/chapter/explainability-trust/'],
        ['Google PAIR, Errors + Graceful Failure', 'https://pair.withgoogle.com/chapter/errors-failing/'],
      ] },
    ],
    related: [['How to write error messages: what happened + what to do now', '/guides/error-messages/'], ['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/']],
  },
  {
    route: '/guides/signup-flows-worth-copying/', kind: 'guide', slug: 'signup-flows-worth-copying', crumb: ['Guides', '/guides/'], name: '10 sign-up flows worth copying',
    title: '10 Sign-up Flows Worth Copying (and the Fix for Yours) | Sebs UX Studio',
    description: 'Duolingo, Calendly, Stripe, Wise, Monzo, Slack, Notion, Airtable, Figma and Loom: what each sign-up gets right, and the fix you can apply to your product.',
    eyebrow: 'Guide · Examples',
    h1: '10 sign-up flows worth copying',
    heroImg: ['/assets/guides/10-signup-flows.webp', 900, 1126, 'Cover: 10 sign-up flows worth copying, plus the fix for yours.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>A new user opens your sign-up. Before they see one useful screen, you ask for their company size, phone number and role.</p><p>Most of them never reach your product. Not because it's bad, but because you asked too early.</p><p>The first check in every sign-up audit I run:</p><ol><li>List every field and step before the first useful screen.</li><li>Next to each one, write when you actually need it.</li><li>Move everything marked "later" to after the first win.</li></ol><p>The products below already work this way. Each gets one thing right, and each gives you one fix.</p>` },
      { type: 'prose', title: '1. Duolingo: value before the account', html: `<p>You finish a first lesson before it asks you to make an account.<br><strong>Fix:</strong> show value first. Ask for the account after the first win.</p>` },
      { type: 'prose', title: '2. Calendly: one field to start', html: `<p>Just an email, or one tap with Google, which also connects your calendar.<br><strong>Fix:</strong> cut sign-up to one field. Ask the rest later, when it's needed.</p>` },
      { type: 'prose', title: '3. Stripe: use it before you verify', html: `<p>You can test everything in a sandbox. Business checks come only when you go live.<br><strong>Fix:</strong> delay heavy checks until the moment they're actually needed.</p>` },
      { type: 'prose', title: '4. Wise: says why it asks', html: `<p>"We may need to ask for proof of this address." No surprise later.<br><strong>Fix:</strong> under every sensitive field, add one line on why you need it.</p>` },
      { type: 'prose', title: '5. Monzo: explains ID checks plainly', html: `<p>The video selfie is to check it's really you, and used for nothing else.<br><strong>Fix:</strong> say what you'll do with personal data, and what you won't.</p>` },
      { type: 'prose', title: '6. Slack: no password to forget', html: `<p>You can sign in with a code sent to your email.<br><strong>Fix:</strong> offer passwordless or Google sign-in. Fewer resets, fewer drop-offs.</p>` },
      { type: 'prose', title: '7. Notion: one question, then it adapts', html: `<p>It asks what you'll use it for and sets up the workspace to match.<br><strong>Fix:</strong> ask one question at sign-up, and use the answer on the first screen.</p>` },
      { type: 'prose', title: '8. Airtable: no blank first screen', html: `<p>Describe what you need and it builds a starting base with your fields.<br><strong>Fix:</strong> never land new users on an empty page. Give them a starting point.</p>` },
      { type: 'prose', title: '9. Figma: the example is already there', html: `<p>"Figma Basics" files are waiting in your workspace on first login.<br><strong>Fix:</strong> teach with a real example file, not a product tour.</p>` },
      { type: 'prose', title: '10. Loom: value in minutes', html: `<p>Built so you start recording in minutes and share in a few clicks.<br><strong>Fix:</strong> time your sign-up to first value. Cut every step that isn't needed.</p>` },
      { type: 'prose', title: 'Which one first?', html: `<p>Start with the fix that matches your biggest drop. If people leave before the first screen, start with Duolingo and Calendly. If they leave at ID checks, start with Wise and Monzo. If they sign up and never come back, start with Notion, Airtable and Figma.</p><p>Not sure where your biggest drop is? <a href="/start/" data-ba="guide_body">Book an audit</a> or ask for a free 5-minute teardown.</p><p><em>Flows reviewed in November 2026. Products change their sign-ups often.</em></p>` },
      { type: 'links', title: 'Sources', items: [
        ['Stripe, activate your account', 'https://docs.stripe.com/get-started/account/activate'],
        ['Slack Help Center, sign in with a confirmation code', 'https://slack.com/help/articles/212681477'],
        ['Monzo, why we ask for a video', 'https://monzo.com/help/opening-an-account/why-we-ask-for-a-video-when-you-open-a-monzo-account'],
        ['Supademo, Figma onboarding', 'https://supademo.com/content/plg-onboarding-gallery/figma'],
        ['Atlassian, getting started in Loom', 'https://www.atlassian.com/software/loom/resources/guides/steps-to-get-started-in-loom'],
      ] },
    ],
    related: [['Cut fields, not steps', '/guides/cut-fields-not-steps/'], ['Calendly gets onboarding right. Except one wall.', '/guides/calendly-onboarding-teardown/'], ['Wise gets sign-up right. Then the progress bar vanishes.', '/guides/wise-signup-teardown/']],
  },
  {
    route: '/guides/calendly-onboarding-teardown/', kind: 'guide', slug: 'calendly-onboarding-teardown', crumb: ['Guides', '/guides/'], name: 'Calendly gets onboarding right. Except one wall.',
    title: 'Calendly Onboarding Teardown: What Works and the One Wall | Sebs UX Studio',
    description: 'A screen-by-screen review of Calendly\'s sign-up: one field to start, smart defaults, a ready meeting link, and the email step that sends new users out of the product.',
    eyebrow: 'Teardown',
    h1: 'Calendly gets onboarding right. Except one wall.',
    heroImg: ['/assets/guides/calendly-teardown.webp', 900, 1126, 'Cover: Calendly gets onboarding right. Except one wall.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>I reviewed Calendly's sign-up screen by screen, from the first click to a link you can share. It takes 9 steps to reach the dashboard.</p><div class="cp-tbl cp-tbl-fit" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table><thead><tr><th>Step</th><th>Screen</th></tr></thead><tbody><tr><td>1</td><td>Email</td></tr><tr><td>2</td><td>Name + password</td></tr><tr><td>3</td><td>Check inbox</td></tr><tr><td>4</td><td>Log in again</td></tr><tr><td>5</td><td>Scheduling URL</td></tr><tr><td>6</td><td>Connect calendar</td></tr><tr><td>7</td><td>Available hours</td></tr><tr><td>8</td><td>Role</td></tr><tr><td>9</td><td>Dashboard (first value)</td></tr></tbody></table></div><p>Most of it is excellent. Two steps are not.</p>` },
      { type: 'prose', title: 'What works', html: `<p><strong>One field to start.</strong> Email is the only field. Type a Gmail address and Calendly offers Google sign-up, which also connects your calendar.</p><p><strong>Smart defaults you can skip.</strong> Available hours are pre-filled (9 to 5, Monday to Friday), and most setup screens offer "Set up later".</p><p><strong>Something ready on arrival.</strong> A 30-minute meeting type already exists on the dashboard, with Copy link and Share. You have something useful in seconds. (One small miss: the checklist still asks you to "Create an event type".)</p>` },
      { type: 'prose', title: 'The wall: steps 3 and 4', html: `<p>Right after you set a password, you leave the product to confirm your email in your inbox, then come back and log in again.</p><p>That's two steps outside the product before any value. Each one is a place to give up: the email lands late, goes to spam, or the person gets distracted in their inbox.</p>` },
      { type: 'prose', title: 'The fix', html: `<p>Send the confirmation link, but let people keep going. Show a quiet notice like "We sent a link to jane@company.com. Confirm it anytime today." and confirm the email in the background.</p><p>People reach their first meeting link first. The check still happens, just not as a wall.</p>` },
      { type: 'prose', title: 'What to take from it', html: `<ol><li>One field to start, and offer Google sign-up.</li><li>Pre-fill setup, and let people skip it.</li><li>Give them something ready to use.</li><li>Verify email in the background, not as a wall.</li></ol><p><em>Flow reviewed in November 2026 from a recorded sign-up; Calendly may have changed it since. The fix is a concept, not Calendly's design.</em></p><p>Want the same teardown for your sign-up? <a href="/start/" data-ba="guide_body">Ask for a free 5-minute teardown</a>.</p>` },
    ],
    related: [['10 sign-up flows worth copying', '/guides/signup-flows-worth-copying/'], ['Wise gets sign-up right. Then the progress bar vanishes.', '/guides/wise-signup-teardown/'], ['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/']],
  },
  {
    route: '/guides/wise-signup-teardown/', kind: 'guide', slug: 'wise-signup-teardown', crumb: ['Guides', '/guides/'], name: 'Wise gets sign-up right. Then the progress bar vanishes.',
    title: 'Wise Sign-up Teardown: Where the Progress Bar Goes | Sebs UX Studio',
    description: 'Wise\'s personal sign-up gets a lot right: one field, clear reasons for sensitive questions, a useful home. Then the progress bar disappears for 5 screens.',
    eyebrow: 'Teardown',
    h1: 'Wise gets sign-up right. Then the progress bar vanishes.',
    heroImg: ['/assets/guides/wise-teardown.webp', 900, 1126, 'Cover: Wise gets sign-up right. Then the progress bar vanishes.'],
    published: '2026-11-17', baLoc: 'guide', relatedLabel: 'Related guides',
    blocks: [
      { type: 'prose', html: `<p>A long sign-up isn't what loses people. Not knowing how long it is does.</p><p>Fintech sign-ups have to be long: identity, address and occupation checks are required. So the question isn't how to remove steps. It's how to keep people moving through them. Here is how I'd judge Wise's personal sign-up on the web.</p>` },
      { type: 'prose', title: '1. Count what a new user sees', html: `<ul><li>First screen: "First, enter your email address", with Google, Facebook and Apple sign-up.</li><li>"Check your email", then "Email confirmed".</li><li>Account type, with a progress bar: Account type · Country · 2FA · Password.</li><li>Then the bar disappears, and 5 more screens follow: your details (country, legal name, date of birth), your address (search, manual entry, confirm) and your occupation.</li></ul>` },
      { type: 'prose', title: '2. Keep what already works', html: `<p><strong>One field to start</strong>, or one tap with Google or Apple.</p><p><strong>It says why it asks.</strong> On the address screen: "We may need to ask for proof of this address." People know what's coming, so it doesn't feel like a surprise later.</p><p><strong>Home gives you a next step.</strong> "Welcome to Wise" offers three clear actions: add a currency, spend and withdraw abroad, or get account details to get paid.</p>` },
      { type: 'prose', title: '3. Find where people lose their place', html: `<p>When the progress bar vanishes, nobody can answer the question every new user has: how much longer? The last 5 screens feel longer than they are, and that's where people put it off "for later".</p>` },
      { type: 'prose', title: '4. Fix that moment, and only that', html: `<p>Keep the progress bar to the end, and show the time left:</p><blockquote><p>Step 2 of 4 · About 2 minutes left</p></blockquote><p>The regulatory steps stay exactly as they are. People just know where they are.</p>` },
      { type: 'prose', title: 'Why this matters', html: `<p>That's the difference between a redesign and an audit. You keep what converts and fix the step that doesn't.</p><p><em>Flow reviewed in November 2026 from a recorded web sign-up; Wise may have changed it since. The fix is a concept, not Wise's design.</em></p><p>Want this for your sign-up? <a href="/start/" data-ba="guide_body">Ask for a free 5-minute teardown</a>.</p>` },
    ],
    related: [['Calendly gets onboarding right. Except one wall.', '/guides/calendly-onboarding-teardown/'], ['10 sign-up flows worth copying', '/guides/signup-flows-worth-copying/'], ['The Drop-off Method: find it, prove it, fix it', '/guides/drop-off-method/']],
  },
];


export const guidesIndex = {
  route: '/guides/', kind: 'index',
  title: 'UX Guides for KYC and Onboarding | Sebs UX Studio',
  description: 'Practical guides on identity verification UX: why users drop off, an ID upload checklist and how to explain an AI rejection.',
};

export const servicesIndex = {
  route: '/services/', title: 'UX Services for Fintech and SaaS | Sebs UX Studio',
  description: 'UX audits, redesign sprints, product build and polish, and team coaching for fintech and SaaS teams. Find where users leave, then fix it.',
};

/* ---------------------------------------------------------------- rendering */
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
const ext = u => /^https?:/.test(u);

function block(b, idx) {
  switch (b.type) {
    case 'cards': return `<section class="cp-sec"><div class="wrap"><h2 class="cp-h2">${b.title}</h2><ul class="cp-cards" data-n="${b.items.length}">${b.items.map(([t, x]) => `<li><h3>${t}</h3><p>${x}</p></li>`).join('')}</ul></div></section>`;
    case 'prose': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose${b.title ? '' : ' cp-noh'}">${b.title ? `<h2 class="cp-h2">${b.title}</h2>` : ''}${b.html}</div></div></section>`;
    case 'list': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><ul class="cp-list">${b.items.map(i => `<li>{{icon:check}}<span>${i}</span></li>`).join('')}</ul></div></div></section>`;
    case 'check': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2>${b.nng ? `<p class="cp-nng"><b>Principle:</b> ${b.nng}</p>` : ''}<ul class="cp-check">${b.items.map(i => `<li><span class="box" aria-hidden="true"></span><span>${i}</span></li>`).join('')}</ul></div></div></section>`;
    case 'steps': return `<section class="cp-sec"><div class="wrap"><h2 class="cp-h2">${b.title}</h2><ol class="cp-steps" data-n="${b.items.length}">${b.items.map(([t, x], n) => `<li><span class="sn">0${n + 1}</span><h3>${t}</h3><p>${x}</p></li>`).join('')}</ol></div></section>`;
    case 'figure': return `<section class="cp-sec cp-fig"><div class="wrap"><figure><img src="${b.src}" alt="${esc(b.alt)}" width="${b.w}" height="${b.h}" loading="lazy"><figcaption>${b.caption}</figcaption></figure></div></section>`;
    case 'cause': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose cp-cause"><h2 class="cp-h2"><span class="cn">${b.n}</span>${b.title}</h2><p>${b.text}</p><p class="cp-fix"><b>Fix:</b> ${b.fix}</p>${b.nng ? `<p class="cp-nng"><b>Principle:</b> ${b.nng}</p>` : ''}</div></div></section>`;
    case 'table': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><div class="cp-tbl" tabindex="0" role="region" aria-label="${b.title.replace(/<[^>]*>/g, '')} (scrolls sideways on small screens)"><table><thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${b.note ? `<p>${b.note}</p>` : ''}</div></div></section>`;
    case 'faq': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">Questions</h2><div class="cp-faq">${b.items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></div></section>`;
    case 'links': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><ul class="cp-links">${b.items.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}{{icon:ext}}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('')}</ul></div></div></section>`;
    case 'note': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><p class="cp-note">${b.html}</p></div></div></section>`;
    case 'partial': return `{{> ${b.name}}}`;
    default: return '';
  }
}

export function contentBody(p) {
  const rel = p.related ? `<section class="cp-sec cp-last"><div class="wrap"><h2 class="cp-h2">${p.relatedLabel || 'Related'}</h2><ul class="cp-related">${p.related.map(([t, u]) => `<li><a href="${u}"><span>${t}</span><span class="arr" aria-hidden="true">{{icon:arrow}}</span></a></li>`).join('')}</ul></div></section>` : '';
  const sec = p.secondary ? `<a class="btn btn-secondary" href="${p.secondary[1]}">${p.secondary[0]}</a>` : '';
  return `{{> nav}}
<main id="main">
<section class="work-head cp-head"><div class="wrap cp-crumbbar"><nav class="crumb-path" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="${p.crumb[1]}">${p.crumb[0]}</a></li><li><span aria-current="page">${p.name}</span></li></ol></nav></div>
<div class="wrap${p.heroImg ? ' cp-hero' : ''}">
  <div class="cp-hero-copy">
  <p class="t-label eyebrow-g">${p.eyebrow}</p>
  <h1 class="work-title t-display">${p.h1}</h1>
  ${p.lede ? `<p class="t-xl work-sub">${p.lede}</p>` : ''}
  ${p.priceline ? `<p class="cp-price">${p.priceline}</p>` : ''}
  <div class="cp-actions"><a class="btn btn-primary" href="/start/" data-ba="${p.baLoc || 'services'}">Book your audit</a>${sec}</div>
  </div>
  ${p.heroImg ? `<img class="cp-hero-img" src="${p.heroImg[0]}" alt="${esc(p.heroImg[3])}" width="${p.heroImg[1]}" height="${p.heroImg[2]}" fetchpriority="high">` : ''}
</div></section>
${p.blocks.map(block).join('\n')}
${rel}
{{> cta-flush}}
</main>
{{> footer}}`;
}

export function guidesIndexBody() {
  const all = pages.filter(p => p.kind === 'guide');
  const gs = [...all.filter(g => g.slug === 'drop-off-method'), ...all.filter(g => g.slug !== 'drop-off-method')]; // the Drop-off Method first
  return `{{> nav}}
<main id="main">
<section class="work-head cp-head"><div class="wrap">
  <p class="t-label eyebrow-g">Guides</p>
  <h1 class="work-title t-display">Practical guides on <span class="hl">identity verification UX</span></h1>
  <p class="t-xl work-sub">Short, specific guides for teams who lose users at signup, ID upload and the selfie step.</p>
</div></section>
<section class="cp-sec cp-last"><div class="wrap"><h2 class="sr-only">All guides</h2><ul class="cp-cards cp-guides">${gs.map(g => `<li><a href="${g.route}"><span class="t-label eyebrow-g">${g.eyebrow}</span><h3>${g.name}</h3><p>${g.description}</p><span class="cc-link"><span>Read the guide</span><span class="arr" aria-hidden="true">{{icon:arrow}}</span></span></a></li>`).join('')}</ul></div></section>
{{> cta-flush}}
</main>
{{> footer}}`;
}

export function jsonld(p) {
  const url = SITE + p.route;
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], [p.crumb[0], p.crumb[0] === 'Guides' ? '/guides/' : '/#services'], [p.name, p.route]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) };
  const main = p.kind === 'service'
    ? { '@context': 'https://schema.org', '@type': 'Service', name: p.name, description: p.description, url, provider: { '@type': 'ProfessionalService', name: 'Sebs UX Studio', url: SITE }, areaServed: 'Worldwide' }
    : p.published ? { '@context': 'https://schema.org', '@type': 'Article', headline: p.name, description: p.description, url, mainEntityOfPage: url, image: SITE + p.heroImg[0], datePublished: p.published, author: { '@type': 'Person', name: 'Muhammad Haseeb' }, publisher: { '@type': 'Organization', name: 'Sebs UX Studio', url: SITE } }
    : { '@context': 'https://schema.org', '@type': 'Article', headline: p.name, description: p.description, url, datePublished: '2026-11-01', author: { '@type': 'Person', name: 'Muhammad Haseeb' }, publisher: { '@type': 'Organization', name: 'Sebs UX Studio', url: SITE } };
  return [main, crumbs];
}

export function servicesIndexBody() {
  const ss = pages.filter(p => p.kind === 'service');
  return `{{> nav}}
<main id="main">
<section class="work-head cp-head"><div class="wrap">
  <p class="t-label eyebrow-g">Services</p>
  <h1 class="work-title t-display">Four ways to <span class="hl">work together</span></h1>
  <p class="t-xl work-sub">From a 5-day audit to a new product build. Pick the one that fits where your team is.</p>
</div></section>
<section class="cp-sec cp-last"><div class="wrap"><h2 class="sr-only">All services</h2><ul class="cp-cards cp-guides">${ss.map(g => `<li><a href="${g.route}"><span class="t-label eyebrow-g">${g.eyebrow}</span><h3>${g.name}</h3><p>${g.description}</p></a></li>`).join('')}</ul></div></section>
{{> cta-flush}}
</main>
{{> footer}}`;
}
