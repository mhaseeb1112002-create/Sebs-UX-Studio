import fs from 'node:fs';
import path from 'node:path';
import { cases, order, filters } from './cases-data.mjs';
const root = path.resolve(import.meta.dirname, '..');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const have = rel => fs.existsSync(path.join(root, 'src/assets/work', rel));
// Image slot: real <img> if the exported asset exists, otherwise a labelled placeholder (no broken requests).
export function img(rel, alt, w, h, cls = '', lazy = true, fit = 'cover') {
  if (have(rel)) return `<img class="${cls} fit-${fit}" src="/assets/work/${rel}" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ''}>`;
  return `<div class="img-ph ${cls}" role="img" aria-label="${esc(alt)}" data-asset="${rel}"><span>${w}×${h} · ${rel}</span></div>`;
}
const bySlug = Object.fromEntries(cases.map(c => [c.slug, c]));
export const route = c => `/work/${c.slug}/`;

export function workBody(active) {
  const tabs = filters.map(([k, label, n]) => `<a class="tab" role="tab" data-filter="${k}" href="${k === 'all' ? '/work/' : '/work/' + k + '/'}" aria-selected="${k === active}" tabindex="${k === active ? 0 : -1}"><span>${label}</span><small>${n}</small></a>`).join('');
  const cards = order.map(s => bySlug[s]).map(c => `<li data-cat="${c.cat}"${active !== 'all' && active !== c.cat ? ' hidden' : ''}><a class="case-card" href="${route(c)}" aria-label="Read the ${esc(c.card.title.split(':')[0])} case study">
      <div class="cc-cover">${img(`${c.slug}-card.webp`, `${c.card.title} cover`, 1176, 800, 'cc-img')}<span class="cc-tag">${c.card.tag}</span></div>
      <div class="cc-meta"><h3>${esc(c.card.title)}</h3><p>${esc(c.card.text)}</p><span class="cc-link"><span>Read case study</span><span class="arr" aria-hidden="true">{{icon:arrow}}</span></span></div></a></li>`).join('\n');
  return `{{> nav}}
<main id="main">
<section class="work-head"><div class="wrap">
  <p class="t-label eyebrow-g">Work</p>
  <h1 class="work-title t-display">Work that removes <span class="hl">friction</span></h1>
  <p class="t-lg work-sub">Selected projects across e-commerce, ed-tech and public services. Each one started with finding where users get stuck.</p>
</div></section>
<section class="work-list" aria-label="Projects"><div class="wrap">
  <div class="tabs filters" role="tablist" aria-label="Filter by industry">${tabs}</div>
  <ul class="work-grid">
${cards}
  </ul>
</div></section>
{{> cta-flush}}
</main>
{{> footer}}`;
}

export function caseBody(c) {
  const i = order.indexOf(c.slug); const next = bySlug[order[(i + 1) % order.length]];
  const [chH, chP] = c.challenge; const [apH, apP, steps] = c.approach; const [reH, metrics, note] = c.results;
  return `{{> nav}}
<main id="main">
<section class="case-hero"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a class="back" href="/work/">← Work</a><span aria-hidden="true">/</span><a href="/work/${c.cat}/" aria-current="page">${c.catLabel}</a></nav>
  <p class="case-tag">${esc(c.tag)}</p>
  <h1 class="case-title t-display">${esc(c.title)}</h1>
  <p class="t-xl case-summary">${esc(c.summary)}</p>
  <dl class="case-facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  ${c.behance ? `<div class="case-actions"><a class="btn btn-secondary" href="${c.behance}" target="_blank" rel="noopener">View full visuals on Behance {{icon:ext}}<span class="sr-only"> (opens in a new tab)</span></a></div>` : ''}
</div></section>
<div class="case-cover"><div class="wrap">${img(`${c.slug}-cover.webp`, c.coverAlt, 2400, 1280, 'cover-img', false)}</div></div>
<div class="case-body"><div class="wrap">
  <section class="cs-row" aria-labelledby="ch"><div class="cs-l"><h2 class="t-label eyebrow-g" id="ch">Challenge</h2><p class="t-h2c">${esc(chH)}</p></div><div class="cs-r"><p class="t-lg">${esc(chP)}</p></div></section>
  <section class="cs-row" aria-labelledby="ap"><div class="cs-l"><h2 class="t-label eyebrow-g" id="ap">Approach</h2><p class="t-h2c">${esc(apH)}</p></div><div class="cs-r"><p class="t-lg">${esc(apP)}</p>
    <ol class="steps">${steps.map(([t, x], n) => `<li><span class="sn">0${n + 1}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join('')}</ol></div></section>
  <section class="cs-shots" aria-labelledby="ks"><h2 class="t-label eyebrow-g" id="ks">Key screens</h2>
    <div class="shots-row"><button class="shot" type="button" data-lightbox>${img(`${c.slug}-screen-1.webp`, c.screens[0], 1176, 840, 'shot-img')}</button><button class="shot" type="button" data-lightbox>${img(`${c.slug}-screen-2.webp`, c.screens[1], 1176, 840, 'shot-img')}</button></div>
    <button class="shot shot-wide" type="button" data-lightbox>${img(`${c.slug}-flow.webp`, c.screens[2], 2400, 1040, 'shot-img', true, 'contain')}</button></section>
  <section class="cs-results" aria-labelledby="rs"><h2 class="t-label eyebrow-g" id="rs">Results</h2><p class="t-h2c">${esc(reH)}</p>
    <ul class="metrics">${metrics.map(([v, l]) => `<li><strong>${esc(v)}</strong><h3>${esc(l)}</h3></li>`).join('')}</ul><p class="res-note">${esc(note)}</p></section>
</div></div>
<div class="case-next"><div class="wrap"><a class="next-card" href="${route(next)}" aria-label="Next project: ${esc(next.title)}"><span class="nx-text"><span class="nx-label">NEXT PROJECT</span><span class="nx-title">${esc(next.title)}</span></span><span class="nx-arr" aria-hidden="true">{{icon:arrow}}</span></a></div></div>
{{> cta-flush}}
</main>
{{> footer}}`;
}

export const notFoundBody = `{{> nav}}
<main id="main">
<section class="work-head"><div class="wrap">
  <p class="t-label eyebrow-g">404</p>
  <h1 class="work-title t-display">This page took a wrong <span class="hl">turn</span></h1>
  <p class="t-lg work-sub">The page you're looking for isn't here. Head back to the start, browse the work, or book a UX audit.</p>
  <div class="nf-actions"><a class="btn btn-secondary" href="/">Home</a><a class="btn btn-secondary" href="/work/">Work</a><a class="btn btn-primary" href="mailto:hello@sebsuxstudio.com?subject=UX%20audit">Book a UX audit</a></div>
</div></section>
</main>
{{> footer}}`;
