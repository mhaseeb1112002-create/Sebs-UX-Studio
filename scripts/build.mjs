// Static site builder: partials + page configs -> dist/
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const src = p => path.join(root, 'src', p);
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, ''); // '' for a domain root, '/repo' for github.io/repo
const SITE = (process.env.SITE_URL || 'https://sebsuxstudio.com').replace(/\/$/, '');

const read = p => fs.readFileSync(src(p), 'utf8');
const partial = n => read(`partials/${n}.html`);
const include = html => html.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, n) => include(partial(n)));

// shared inline icons (Figma exports, currentColor so they inherit)
export const icons = {
  star: '<svg class="ic-star" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8l2.55 5.36 5.85.8-4.27 4.1 1.07 5.82L10 15.1l-5.2 2.78 1.07-5.82-4.27-4.1 5.85-.8L10 1.8z" fill="currentColor"/></svg>',
  arrow: '<svg class="ic-arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M11.25 5.25 16 10l-4.75 4.75" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ext: '<svg class="ic-arrow ic-ext" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 14 14 6M7.5 5.75H14.25V12.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg class="ic ic-check" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.875 13.0835L15.4376 5.521C15.5626 5.396 15.7119 5.3335 15.8855 5.3335C16.0591 5.3335 16.2084 5.396 16.3334 5.521C16.4584 5.646 16.5209 5.7953 16.5209 5.96891C16.5209 6.14252 16.4584 6.29183 16.3334 6.41683L8.31256 14.4377C8.18756 14.5627 8.04173 14.6252 7.87506 14.6252C7.70839 14.6252 7.56256 14.5627 7.43756 14.4377L3.64589 10.646C3.52089 10.521 3.46187 10.3717 3.46881 10.1981C3.47575 10.0245 3.54173 9.87516 3.66673 9.75016C3.79173 9.62516 3.94103 9.56266 4.11464 9.56266C4.28825 9.56266 4.43756 9.62516 4.56256 9.75016L7.87506 13.0835Z" fill="currentColor"/></svg>',
  search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 20L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  pen: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20H8L19 9L15 5L4 16V20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 7L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sparkle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M11 11L33 33M33 11L11 33" stroke="currentColor" stroke-width="1.5"/></svg>',
  phone: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M8.25 3.6665H4.58333C4.0971 3.6665 3.63079 3.85966 3.28697 4.20347C2.94315 4.54729 2.75 5.01361 2.75 5.49984C2.9673 9.07551 4.48571 12.448 7.01876 14.9811C9.55181 17.5141 12.9243 19.0325 16.5 19.2498C16.9862 19.2498 17.4525 19.0567 17.7964 18.7129C18.1402 18.3691 18.3333 17.9027 18.3333 17.4165V13.7498L13.75 11.9165L12.375 14.2082C10.3844 13.2265 8.77338 11.6154 7.79167 9.62484L10.0833 8.24984L8.25 3.6665Z" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  scan: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M2.75 6.41667V4.58333C2.75 4.0971 2.94315 3.63079 3.28697 3.28697C3.63079 2.94315 4.0971 2.75 4.58333 2.75H6.41667M15.5833 2.75H17.4167C17.9029 2.75 18.3692 2.94315 18.713 3.28697C19.0568 3.63079 19.25 4.0971 19.25 4.58333V6.41667M19.25 15.5833V17.4167C19.25 17.9029 19.0568 18.3692 18.713 18.713C18.3692 19.0568 17.9029 19.25 17.4167 19.25H15.5833M6.41667 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V15.5833" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6667 14.6665L12.925 12.9248" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  select: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 17.4167L17.4167 11L20.1667 13.75L13.75 20.1667L11 17.4167Z" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 11.9168L15.125 5.04183L1.83331 1.8335L5.04165 15.1252L11.9166 16.5002L16.5 11.9168Z" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.83331 1.8335L8.78715 8.78733" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.0833 11.9167C11.0959 11.9167 11.9167 11.0959 11.9167 10.0833C11.9167 9.07081 11.0959 8.25 10.0833 8.25C9.07081 8.25 8.25 9.07081 8.25 10.0833C8.25 11.0959 9.07081 11.9167 10.0833 11.9167Z" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pkg: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M14.6666 14.6668L16.5 16.5002L20.1666 12.8335" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.25 9.1669V7.33357C19.2497 7.01207 19.1648 6.69631 19.0039 6.41797C18.843 6.13962 18.6118 5.90849 18.3333 5.74774L11.9167 2.08107C11.638 1.92016 11.3218 1.83545 11 1.83545C10.6782 1.83545 10.362 1.92016 10.0833 2.08107L3.66667 5.74774C3.38824 5.90849 3.15698 6.13962 2.99609 6.41797C2.8352 6.69631 2.75033 7.01207 2.75 7.33357V14.6669C2.75033 14.9884 2.8352 15.3042 2.99609 15.5825C3.15698 15.8608 3.38824 16.092 3.66667 16.2527L10.0833 19.9194C10.362 20.0803 10.6782 20.165 11 20.165C11.3218 20.165 11.638 20.0803 11.9167 19.9194L13.75 18.8744" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.02502 6.4165L11 10.9998L18.975 6.4165" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 20.1667V11" stroke="currentColor" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  burger: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8H21M3 16H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};
const subst = (html, vars) => html.replace(/\{\{icon:(\w+)\}\}/g, (_, n) => icons[n] ?? '').replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] ?? m);

const pages = (await import('./pages.mjs')).default;
const shell = read('partials/shell.html');
for (const pg of pages) {
  const bodySrc = pg.body.startsWith('<<') ? read(`pages/${pg.body.slice(2, -2)}.html`) : pg.body;
  const body = subst(include(bodySrc), pg.vars || {});
  const canonical = SITE + (pg.canonical || pg.route);
  let html = subst(shell, {
    title: pg.title, description: pg.description, canonical, ogimage: SITE + '/assets/og.png',
    jsonld: pg.jsonld ? `<script type="application/ld+json">${JSON.stringify(pg.jsonld)}</script>` : '',
    pageclass: pg.pageClass || '', body,
  });
  if (pg.route === '/404') html = html.replace(/<link rel="canonical" href="[^"]*">\n?/, '');
  const out = path.join(dist, pg.route === '/' ? '' : pg.route, pg.route.endsWith('.html') ? '' : 'index.html');
  const file = pg.route === '/404' ? path.join(dist, '404.html') : out;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const founder = ['webp','jpg','jpeg','png'].find(e => fs.existsSync(src(`assets/founder.${e}`)));
  if (founder) html = html.replace(/<div class="photo-ph"[^>]*><span>[^<]*<\/span><\/div>/, `<img class="photo-ph photo-img" src="/assets/founder.${founder}" alt="Muhammad Haseeb, founder of Sebs UX Studio" width="440" height="500" loading="lazy" decoding="async">`);
  if (BASE) html = html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
  fs.writeFileSync(file, html);
}
// assets + css + js
fs.cpSync(src('assets'), path.join(dist, 'assets'), { recursive: true });
fs.copyFileSync(src('assets/favicon.ico'), path.join(dist, 'favicon.ico'));
const css = ['tokens', 'base', 'components', 'sections', 'work', 'proof', 'intake', 'content'].map(n => fs.existsSync(src(`styles/${n}.css`)) ? read(`styles/${n}.css`) : '').join('\n');
fs.writeFileSync(path.join(dist, 'styles.css'), BASE ? css.replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE}/`) : css);
fs.writeFileSync(path.join(dist, 'main.js'), read('js/main.js').replace("const BASE = '';", `const BASE = ${JSON.stringify(BASE)};`));
// cache-busting: version the css/js URLs so browsers never pair a new page with an old stylesheet
import('node:crypto').then(({ createHash }) => {
  const h = f => createHash('sha1').update(fs.readFileSync(path.join(dist, f))).digest('hex').slice(0, 8);
  const v = { 'styles.css': h('styles.css'), 'main.js': h('main.js') };
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = path.join(d, e.name);
    if (e.isDirectory()) return e.name !== 'assets' && walk(f);
    if (!f.endsWith('.html')) return;
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/(styles\.css|main\.js)"/g, (m, n) => `${n}?v=${v[n]}"`));
  });
  walk(dist);
});
if (process.env.CNAME) fs.writeFileSync(path.join(dist, 'CNAME'), new URL(SITE).host + '\n');
fs.mkdirSync(path.join(dist, '.well-known'), { recursive: true });
fs.writeFileSync(path.join(dist, '.well-known', 'security.txt'), `Contact: mailto:hello@sebsuxstudio.com\nExpires: 2027-11-01T00:00:00.000Z\nPreferred-Languages: en\nCanonical: ${SITE}/.well-known/security.txt\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p.route !== '/404' && !p.canonical).map(p => `  <url><loc>${SITE}${p.route}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log('built', pages.length, 'pages');
