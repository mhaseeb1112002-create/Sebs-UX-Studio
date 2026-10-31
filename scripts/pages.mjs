import faq from './faq-data.mjs';
const SITE = 'https://sebs.studio';
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
export const bodies = {};
export default [home];
