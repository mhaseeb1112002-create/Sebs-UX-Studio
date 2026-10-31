import faq from './faq-data.mjs';
const SITE = (process.env.SITE_URL || 'https://sebs.studio').replace(/\/$/, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const faqitems = faq.map(([q, a], i) => `<div class="faq-item${i === 0 ? ' is-open' : ''}"><h3><button class="faq-q" type="button" aria-expanded="${i === 0}" aria-controls="faq-a${i}" id="faq-q${i}"><span>${esc(q)}</span><span class="faq-ic" aria-hidden="true"></span></button></h3><div class="faq-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p>${esc(a)}</p></div></div></div>`).join('\n      ');
const home = {
  route: '/',
  title: 'UX Audits & Redesigns for SaaS and Fintech | Sebs UX Studio',
  description: 'Find where users drop off in signup, onboarding and KYC. Fixed-price UX audits from $500, redesign sprints and AI-built product polish.',
  body: '<<home>>',
  vars: { home: '/', workcurrent: '', faqitems },
  jsonld: { '@context': 'https://schema.org', '@graph': [
    { '@type': 'ProfessionalService', name: 'Sebs UX Studio', url: SITE, logo: SITE + '/assets/favicon.svg', email: 'hello@sebs.studio', telephone: '+92 337 2186894', address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' }, areaServed: 'Worldwide', founder: { '@type': 'Person', name: 'Muhammad Haseeb' },
      sameAs: ['https://www.linkedin.com/in/muhammad-haseeb-ux/', 'https://www.behance.net/muhammadhaseeb194', 'https://dribbble.com/m-haseeb1112002', 'https://www.instagram.com/sebs.studio_ux/'],
      makesOffer: [['UX audit', 500], ['Redesign sprint', 3000], ['AI-built product polish', 1500]].map(([n, p]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n }, priceSpecification: { '@type': 'PriceSpecification', price: p, priceCurrency: 'USD', minPrice: p } })) },
    { '@type': 'WebSite', name: 'Sebs UX Studio', url: SITE },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ] },
};
import { cases, filters, order } from './cases-data.mjs';
import { workBody, caseBody, notFoundBody } from './templates.mjs';
const sub = { home: '/', workcurrent: 'aria-current="page"' };
const work = [];
for (const [k, label] of filters) {
  const all = k === 'all';
  work.push({ route: all ? '/work/' : `/work/${k}/`, title: all ? 'UX Case Studies in Fintech, SaaS & KYC | Sebs UX Studio' : `${label} UX Case Studies | Sebs UX Studio`,
    description: all ? 'Selected UX projects across e-commerce, ed-tech and public services, each starting with where users got stuck.' : `UX case studies for ${label.toLowerCase()} products: research, redesigned flows and outcomes.`,
    body: workBody(k), vars: sub });
}
const caseSeo = c => [{ '@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: c.desc_seo, image: `${SITE}/assets/work/${c.slug}-cover.webp`, author: { '@type': 'Person', name: 'Muhammad Haseeb' } },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Work', '/work/'], [c.catLabel, `/work/${c.cat}/`], [c.title, `/work/${c.slug}/`]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) }];
const caseTpl = cases.map(c => ({ route: `/work/${c.slug}/`, title: c.title_seo, description: c.desc_seo, body: caseBody(c), vars: sub, jsonld: caseSeo(c) }));
const nf = { route: '/404', title: 'Page not found | Sebs UX Studio', description: 'This page could not be found. Go home, browse the work or book a UX audit.', body: notFoundBody, vars: sub };
export default [home, ...work, ...caseTpl, nf];
