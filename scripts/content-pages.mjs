// Service pages and guides. Voice: first person, plain words, specific. Only claims already on the site, or general UX practice.
const SITE = (process.env.SITE_URL || 'https://sebsuxstudio.com').replace(/\/$/, '');
const FAQ = {
  price: ['How does pricing work?', 'Contact me for pricing. I scope every project after a short intro call, so you know the price before we begin.'],
  access: ['What access do you need?', 'Usually a walkthrough of your product or staging access, plus analytics if you have them. Nothing more until the audit starts.'],
  audit: ['What do I get from an audit?', 'A flow-by-flow UX review, a drop-off map, a prioritized fix list and a 30-minute walkthrough call. It takes about 5 days. Contact me for pricing.'],
  design: ['Do you design the product too?', 'Yes. I design products end to end, from the first flow to the final UI, and I also fix existing ones. Developers get specs and components they can build right away. For AI-built products (Lovable, Cursor, v0), I clean up the UX and UI of what already exists.'],
  who: ['Who do you work with?', 'Seed to Series A B2B SaaS and fintech teams, especially those without an in-house designer.'],
  nda: ['Do you sign an NDA?', 'Yes. Send yours over before we start, or I can share a simple one.'],
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
    blocks: [
      { type: 'cards', title: 'What you get', items: [
        ['Drop-off map', 'Every step of your flow, with where people leave and the likely reasons why.'],
        ['Prioritized fix list', 'Each issue ranked by impact, with the screen marked and a fix you can ship.'],
        ['30-minute walkthrough', 'A call to go through the findings with your team and agree what to fix first.'],
      ] },
      { type: 'prose', title: 'Why an audit before a redesign', html: '<p>Analytics shows where users leave. It does not show why. A drop at the ID upload step could mean a blurry camera view, a vague error, a long wait or a rejection that nobody explained.</p><p>The audit connects the two. I go through your flow screen by screen, line up what I find with your numbers, and rank the problems by how much they cost you. Then you know what to fix first, and what to leave alone.</p>' },
      { type: 'list', title: 'What I review', items: ['Signup and account creation', 'Identity verification: document choice, ID upload, selfie or liveness check', 'Error messages and how users recover from them', 'Waiting and pending states', 'Rejections, and how they are explained'] },
      { type: 'partial', name: 'audit' },
      { type: 'steps', title: 'How the 5 days run', items: [
        ['Day 1 · Discover', 'A short call to understand your product, users and goals.'],
        ['Days 2 to 5 · Diagnose', 'I map the flow, find the drop-off points and rank them by impact.'],
        ['End of week · Walkthrough', 'You get the drop-off map and the prioritized fix list, and we go through them together on a 30-minute call.'],
      ] },
      { type: 'prose', title: 'Who it is for', html: '<p>Seed to Series A B2B SaaS and fintech teams, especially those without an in-house designer. It also suits identity and KYC products, digital banks and lenders, and AI products where users must trust an automated decision.</p>' },
      { type: 'faq', items: [FAQ.audit, FAQ.price, FAQ.access, FAQ.nda] },
    ],
    related: [['Conversion redesign sprint', '/services/redesign-sprint/'], ['Why users drop off at ID verification', '/guides/kyc-drop-off-ux/'], ['KYC ID upload: audit and redesign (concept)', '/work/kyc-id-upload-redesign/']],
  },
  {
    route: '/services/redesign-sprint/', kind: 'service', crumb: ['Services', '/#services'], name: 'Conversion redesign sprint',
    title: 'Onboarding Redesign Sprint for Fintech | Sebs UX Studio',
    description: 'I redesign the signup or KYC step that loses the most users, then give your developers specs and components they can build right away. 2–3 weeks.',
    eyebrow: 'Conversion redesign sprint',
    h1: 'Redesign the step that <span class="hl">loses the most users</span>',
    lede: 'Once you know where users leave, I redesign that flow and hand your developers specs and components they can build right away. A sprint takes 2 to 3 weeks.',
    secondary: ['See a concept project', '/work/kyc-id-upload-redesign/'],
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
      { type: 'faq', items: [FAQ.price, FAQ.design, FAQ.access] },
    ],
    related: [['Onboarding & KYC audit', '/services/onboarding-kyc-audit/'], ['Product build & polish', '/services/build-and-polish/'], ['ID upload UX checklist', '/guides/id-upload-ux-checklist/']],
  },
  {
    route: '/services/build-and-polish/', kind: 'service', crumb: ['Services', '/#services'], name: 'Product build & polish',
    title: 'Product Build & AI-Built App Polish | Sebs UX Studio',
    description: 'A new product, or one built with Lovable, Cursor or v0? Get a clean, consistent product users trust, with key flows cleaned up and a light design system.',
    eyebrow: 'Product build & polish',
    h1: 'Build a new product, or <span class="hl">polish one built with AI</span>',
    lede: 'A new product, or one built with Lovable, Cursor or v0? I build it, or turn it into a clean, consistent product users trust.',
    secondary: ['Talk about your product', '/start/'],
    blocks: [
      { type: 'cards', title: 'Two ways to work together', items: [
        ['Build a new product', 'I design the product end to end, from the first flow to the final UI. Developers get specs and components they can build right away.'],
        ['Polish an AI-built product', 'I clean up the UX and UI of what already exists, so it looks and works like one product.'],
      ] },
      { type: 'list', title: 'Signs an AI-built product needs polish', items: ['Screens are styled differently from each other', 'Buttons and actions give no visible feedback', 'Error and empty states are missing', 'The look is generic and says nothing about who you are', 'New users ask how to do basic things'] },
      { type: 'prose', title: 'Why AI-built products feel off', html: '<p>AI tools usually generate each screen on its own, without a shared design system. So buttons, spacing and wording change from screen to screen, and the small states that make a product feel finished are missing.</p><p>Polishing fixes the system as well as the screen. Once the components and styles are consistent, new screens come out consistent too.</p>' },
      { type: 'figure', src: gd('ai-built-polish-before-after.webp'), w: 2400, h: 1100, alt: 'An AI-built dashboard with mismatched fonts, corners and buttons, next to the same dashboard made consistent and clear', caption: 'Example screens: a dashboard before and after polish.' },
      { type: 'list', title: 'What you get in a polish', items: ['UX cleanup of key flows', 'Consistent UI and components', 'A lightweight design system'] },
      { type: 'prose', title: 'How long it takes', html: '<p>A polish takes about 1 to 2 weeks. A new product depends on scope, so I price it after a short intro call. Contact me for pricing.</p>' },
      { type: 'faq', items: [FAQ.design, FAQ.price, FAQ.ai, FAQ.nda] },
    ],
    related: [['Onboarding & KYC audit', '/services/onboarding-kyc-audit/'], ['Conversion redesign sprint', '/services/redesign-sprint/'], ['Meemi Art: pattern store & design system', '/work/meemi-art-design-system/']],
  },
  /* ------------------------------------------------------------------ guides */
  {
    route: '/guides/kyc-drop-off-ux/', kind: 'guide', crumb: ['Guides', '/guides/'], name: 'Why users drop off at ID verification',
    title: 'Why Users Drop Off at ID Verification | Sebs UX Studio',
    description: 'Five UX causes of KYC drop-off, from vague errors to unexplained AI rejections, with a fix for each and a way to find your own worst step.',
    eyebrow: 'Guide · KYC',
    h1: 'Why users drop off at <span class="hl">ID verification</span>',
    lede: 'Industry estimates say between 25% and 60% of people leave during identity verification, depending on the market and the checks involved. Most of them did not decide against verifying. One screen confused them.',
    secondary: ['Get an audit of your flow', '/services/onboarding-kyc-audit/'],
    blocks: [
      { type: 'prose', title: 'Where people leave', html: '<p>A few steps lose most people: taking the ID photo, the selfie or liveness check, and waiting for the result. Your own funnel shows which step is yours.</p><p>Analytics tells you where. It does not tell you why. The five causes below explain most of the why.</p>' },
      { type: 'figure', src: gd('kyc-drop-off-pains.webp'), w: 2400, h: 1100, alt: 'Five identity verification screens: a vague error, a camera that cannot read the ID, too many liveness tasks, no sign of progress and a rejection with no reason', caption: 'Five screens that cost you users.' },
      { type: 'cause', n: 1, title: 'Vague errors', text: 'The screen says "Invalid." or "Upload failed." The user cannot tell what to change, so they try the same thing again, or give up.', fix: 'Say what went wrong and how to fix it: "The photo is blurry. Hold your phone steady and try again."' },
      { type: 'cause', n: 2, title: 'The camera cannot read the ID', text: 'There is no frame to line the card up with, the light is bad, or the document is an unusual type. The user retakes the photo again and again.', fix: 'Show a framing guide, give live hints about light and glare, capture automatically when the card is in focus, and let people upload a file as a backup.' },
      { type: 'cause', n: 3, title: 'Too many liveness tasks', text: '"Blink. Turn your head. Read this phrase." Every action is another place to fail, and some people cannot do them easily.', fix: 'Ask for the fewest actions your risk model allows. Explain each one in a line before the camera starts, and offer another way for people who cannot do it.' },
      { type: 'cause', n: 4, title: 'No sign of progress', text: 'The user cannot tell how many steps are left, or whether the check is still running. A spinner with no end looks like a crash.', fix: 'Show a step count and an estimated wait. If the result takes a while, say how they will hear back, and let them leave and return.' },
      { type: 'cause', n: 5, title: 'A rejection with no reason', text: '"Not approved." and a Try again button. The user does not know what to change, so they leave or write to support.', fix: 'Give a plain reason where you can, say what to change, keep their progress on retry and offer a way to reach a person. The guide on explaining AI rejections goes deeper.' },
      { type: 'steps', title: 'How to find your worst step', items: [
        ['Map the steps', 'List every screen from signup to verified.'],
        ['Count who reaches each step', 'Your analytics shows where the biggest drop is.'],
        ['Watch real people', 'Watch about five people go through that step, in tests or session recordings, to see why they leave.'],
        ['Fix one thing, then measure', 'Track completion rate, retries per capture and time to verify, before and after each change.'],
      ] },
      { type: 'prose', title: 'Fewer drop-offs, same controls', html: '<p>Reducing friction must not weaken your checks. Some steps have to stay. Ask your compliance team which ones before you change a flow, then make those steps as clear as they can be.</p><p>The figures in this guide are industry estimates from vendor and research reports, so treat them as directional. Your own funnel is the number that counts.</p>' },
      { type: 'links', title: 'Further reading', items: [['KYCAID: reducing user drop-off during verification', 'https://kycaid.com/blog/reduce-user-drop-off-kyc-verification-ux/'], ['Shufti Pro: KYC drop-off UX fixes', 'https://shuftipro.com/blog/reduce-kyc-drop-off-ux-fixes/'], ['Youverify: reducing onboarding drop-off with identity verification', 'https://youverify.co/blog/how-to-reduce-customer-onboarding-drop-off-using-identity-verification']] },
    ],
    related: [['ID upload UX checklist', '/guides/id-upload-ux-checklist/'], ['How to explain an AI rejection to users', '/guides/explain-ai-rejections/'], ['Onboarding & KYC audit', '/services/onboarding-kyc-audit/']],
  },
  {
    route: '/guides/id-upload-ux-checklist/', kind: 'guide', crumb: ['Guides', '/guides/'], name: 'ID upload UX checklist',
    title: 'ID Upload UX Checklist for KYC Flows | Sebs UX Studio',
    description: 'A practical checklist for ID upload and selfie steps: before capture, during capture, after capture and what to show when it fails.',
    eyebrow: 'Guide · Checklist',
    h1: 'ID upload UX checklist for <span class="hl">KYC flows</span>',
    lede: 'Use this list to review the ID upload and selfie steps of your flow. Each line is one thing to check. Adjust it to your own risk and compliance requirements.',
    secondary: ['Have me run this on your flow', '/services/onboarding-kyc-audit/'],
    blocks: [
      { type: 'figure', src: wk('kyc-id-upload-redesign-screen-2.webp'), w: 1176, h: 840, alt: 'A guided ID scan screen and a selfie screen', caption: 'A guided scan screen and a selfie screen (concept).' },
      { type: 'check', title: 'Before capture', items: ['Say which documents you accept before the user opens the camera', 'Say why you need it, in one line', 'Say how long it takes, for example "About 2 minutes"', 'Show the step count, for example "Step 2 of 4"', 'Let users pick the document type and show a sample of a good photo', 'Explain the camera permission before the browser asks for it'] },
      { type: 'check', title: 'During capture', items: ['Show a framing guide that matches the shape of the document', 'Give live hints about light, glare and blur', 'Capture automatically when the document is in focus, with a manual button as a backup', 'Keep the camera view large and keep text out of it', 'Offer a file upload for people who cannot use the camera'] },
      { type: 'check', title: 'After capture', items: ['Show a preview with "Retake" and "Use this photo"', 'Check the photo on the device for blur, glare and cut-off edges, and say what failed', 'Show a clear "checking" state with an estimated wait', 'Save progress, so users can leave and come back', 'Say what happens next, and how users will hear the result'] },
      { type: 'check', title: 'When it fails', items: ['Say what went wrong in plain words', 'Say how to fix it, and show an example', 'Let users retry without starting over', 'After two failed tries, offer another way: another document, an upload or a person', 'Keep raw error codes out of the user\'s view and log them for your team'] },
      { type: 'check', title: 'Selfie and liveness', items: ['Ask for as few actions as your risk model allows', 'Explain each action in one line before the camera starts', 'Show a face outline and a live hint such as "Look straight ahead"', 'Test the prompts with glasses, head coverings and low light', 'Offer another way for people who cannot do an action'] },
      { type: 'prose', title: 'Use it as a review', html: '<p>Go through your flow on a real phone, on a slow connection, in poor light. Mark every line you cannot tick. The unticked lines are your fix list, and the first one to fix is the one nearest the step where most users leave.</p>' },
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
      { type: 'prose', title: 'What users need', html: '<p>Three things: why it happened, what to do next, and a way to reach a person if they disagree. Without them, a rejection feels like a wall, and people stop trusting the product.</p>' },
      { type: 'cards', title: 'Four patterns that work', items: [
        ['A plain-language reason', '"The photo was blurry, so we could not read the number." Not an error code.'],
        ['What to change', 'Tell people the specific thing to fix, and show an example if it helps.'],
        ['A retry that keeps progress', 'Let users try again without re-entering everything.'],
        ['A person to talk to', 'A visible way to reach support, or to ask for a manual review.'],
      ] },
      { type: 'table', title: 'Write it like this', head: ['Instead of', 'Say'], rows: [
        ['Not approved.', 'We could not read your ID. The photo was blurry. Retake it in good light.'],
        ['Verification failed (error 4021).', 'Your selfie did not match the photo on your ID. Try again in good light, or talk to a person.'],
        ['Try again.', 'Retake photo. Your other answers are saved.'],
      ] },
      { type: 'prose', title: 'What you may not be able to say', html: '<p>Some reasons cannot be shown, for example when saying them would help a fraudster. In that case, use a general reason such as "We could not verify your details", and still give a next step and a way to reach a person.</p><p>Ask your compliance or legal team which rules about automated decisions apply where you operate. Some rules expect an explanation or a human review. This guide is design advice, not legal advice.</p>' },
    ],
    related: [['Why users drop off at ID verification', '/guides/kyc-drop-off-ux/'], ['ID upload UX checklist', '/guides/id-upload-ux-checklist/'], ['Onboarding & KYC audit', '/services/onboarding-kyc-audit/']],
  },
];

export const guidesIndex = {
  route: '/guides/', kind: 'index',
  title: 'UX Guides for KYC and Onboarding | Sebs UX Studio',
  description: 'Practical guides on identity verification UX: why users drop off, an ID upload checklist and how to explain an AI rejection.',
};

/* ---------------------------------------------------------------- rendering */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = u => /^https?:/.test(u);

function block(b, idx) {
  switch (b.type) {
    case 'cards': return `<section class="cp-sec"><div class="wrap"><h2 class="cp-h2">${b.title}</h2><ul class="cp-cards">${b.items.map(([t, x]) => `<li><h3>${t}</h3><p>${x}</p></li>`).join('')}</ul></div></section>`;
    case 'prose': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2>${b.html}</div></div></section>`;
    case 'list': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><ul class="cp-list">${b.items.map(i => `<li>{{icon:check}}<span>${i}</span></li>`).join('')}</ul></div></div></section>`;
    case 'check': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><ul class="cp-check">${b.items.map(i => `<li><span class="box" aria-hidden="true"></span><span>${i}</span></li>`).join('')}</ul></div></div></section>`;
    case 'steps': return `<section class="cp-sec"><div class="wrap"><h2 class="cp-h2">${b.title}</h2><ol class="cp-steps">${b.items.map(([t, x], n) => `<li><span class="sn">0${n + 1}</span><h3>${t}</h3><p>${x}</p></li>`).join('')}</ol></div></section>`;
    case 'figure': return `<section class="cp-sec cp-fig"><div class="wrap"><figure><img src="${b.src}" alt="${esc(b.alt)}" width="${b.w}" height="${b.h}" loading="lazy"><figcaption>${b.caption}</figcaption></figure></div></section>`;
    case 'cause': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose cp-cause"><h2 class="cp-h2"><span class="cn">${b.n}</span>${b.title}</h2><p>${b.text}</p><p class="cp-fix"><b>Fix:</b> ${b.fix}</p></div></div></section>`;
    case 'table': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><div class="cp-tbl"><table><thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></div></section>`;
    case 'faq': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">Questions</h2><div class="cp-faq">${b.items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></div></section>`;
    case 'links': return `<section class="cp-sec"><div class="wrap"><div class="cp-prose"><h2 class="cp-h2">${b.title}</h2><ul class="cp-links">${b.items.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}{{icon:ext}}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('')}</ul></div></div></section>`;
    case 'partial': return `{{> ${b.name}}}`;
    default: return '';
  }
}

export function contentBody(p) {
  const rel = p.related ? `<section class="cp-sec"><div class="wrap"><h2 class="cp-h2">Related</h2><ul class="cp-related">${p.related.map(([t, u]) => `<li><a href="${u}"><span>${t}</span><span class="arr" aria-hidden="true">{{icon:arrow}}</span></a></li>`).join('')}</ul></div></section>` : '';
  const sec = p.secondary ? `<a class="btn btn-secondary" href="${p.secondary[1]}">${p.secondary[0]}</a>` : '';
  return `{{> nav}}
<main id="main">
<section class="work-head cp-head"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a class="back" href="${p.crumb[1]}">← ${p.crumb[0]}</a></nav>
  <p class="t-label eyebrow-g">${p.eyebrow}</p>
  <h1 class="work-title t-display">${p.h1}</h1>
  <p class="t-xl work-sub">${p.lede}</p>
  <div class="cp-actions"><a class="btn btn-primary" href="/start/">Request a UX audit</a>${sec}</div>
</div></section>
${p.blocks.map(block).join('\n')}
${rel}
{{> cta-flush}}
</main>
{{> footer}}`;
}

export function guidesIndexBody() {
  const gs = pages.filter(p => p.kind === 'guide');
  return `{{> nav}}
<main id="main">
<section class="work-head cp-head"><div class="wrap">
  <p class="t-label eyebrow-g">Guides</p>
  <h1 class="work-title t-display">Practical guides on <span class="hl">identity verification UX</span></h1>
  <p class="t-xl work-sub">Short, specific guides for teams who lose users at signup, ID upload and the selfie step.</p>
</div></section>
<section class="cp-sec"><div class="wrap"><ul class="cp-cards cp-guides">${gs.map(g => `<li><a href="${g.route}"><span class="t-label eyebrow-g">${g.eyebrow}</span><h3>${g.name}</h3><p>${g.description}</p><span class="cc-link"><span>Read the guide</span><span class="arr" aria-hidden="true">{{icon:arrow}}</span></span></a></li>`).join('')}</ul></div></section>
{{> cta-flush}}
</main>
{{> footer}}`;
}

export function jsonld(p) {
  const url = SITE + p.route;
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], [p.crumb[0], p.crumb[0] === 'Guides' ? '/guides/' : '/#services'], [p.name, p.route]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) };
  const main = p.kind === 'service'
    ? { '@context': 'https://schema.org', '@type': 'Service', name: p.name, description: p.description, url, provider: { '@type': 'ProfessionalService', name: 'Sebs UX Studio', url: SITE }, areaServed: 'Worldwide' }
    : { '@context': 'https://schema.org', '@type': 'Article', headline: p.name, description: p.description, url, datePublished: '2026-11-01', author: { '@type': 'Person', name: 'Muhammad Haseeb' }, publisher: { '@type': 'Organization', name: 'Sebs UX Studio', url: SITE } };
  return [main, crumbs];
}
