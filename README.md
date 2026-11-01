# Sebs UX Studio website

Static site (HTML + CSS + vanilla JS) built from the Figma file **Sebs UX Studio — Brand System**
(`1VjXrP7BA8YLCQAQIBxT9y`). No framework and no runtime dependencies.

```bash
npm run build     # src/ -> dist/
npm run serve     # build + static server on :4173
npm run audit     # screenshots + overflow/console checks at the 10 test widths
node scripts/interact.mjs   # interaction tests (nav, menu, FAQ, funnel, carousel, filters, 404)
```

Playwright is only needed for `audit` / `interact` (`require('playwright')` must resolve).

## Pages / routes (from the Figma "Developer handoff" sheet)

| Route | Source |
|---|---|
| `/` | Landing — Desktop 1440 / Mobile 390 / Mobile menu |
| `/work/`, `/work/e-commerce/`, `/work/gov-tech/`, `/work/ed-tech/` | Work — Desktop 1440 (+ filter variants) |
| `/work/meemi-art-design-system/`, `/work/iris-tax-filing-redesign/`, `/work/apply-one-admissions-app/`, `/work/str-academy-landing-page/`, `/work/discover-pakistan-tourism-redesign/` | Case study frames (content in `scripts/cases-data.mjs`) |
| `/404` | Not designed in Figma; built on the Work layout as the handoff sheet says |

The **Admin** page in Figma is marked "design only" in the handoff sheet and is not part of the public site.

## Layout

```
src/styles/   tokens.css (Figma variables) · base · components · sections · work
src/partials/ nav, hero, industries, problem, services, audit, about, process, faq, cta, footer …
src/js/main.js  all interactions (motion tokens from the handoff sheet, prefers-reduced-motion respected)
scripts/      build.mjs, pages.mjs, templates.mjs, cases-data.mjs, faq-data.mjs, audit/interact/serve
              tw2html.py + gen-industries.py: one-off converter that turned the Figma-generated artwork
              markup (industry cards) into plain HTML/CSS
AUDIT.md      Figma-vs-implementation audit report
```

## Breakpoints

From the handoff sheet: **≥1280** 1200px max content + 120px side padding, **768–1279** 40px padding / 2-col
cards (hero stacks below 1024), **≤767** 20px padding / 1 col. Between 1024 and 1439 the hero composition scales
to its column; 1280–1439 trims a few fixed Figma widths so nothing wraps awkwardly.

## Images still needed (Figma raster assets)

Raster project imagery could not be exported in the build environment (see `AUDIT.md`). Image slots render a
labelled placeholder until a file exists. Export from Figma and drop the files in `src/assets/work/`; the build
switches the placeholder to a real `<img>` automatically:

- `<slug>-card.webp` — Work card, 1176×800
- `<slug>-cover.webp` — case cover, 2400×1280
- `<slug>-screen-1.webp`, `<slug>-screen-2.webp` — key screens, 1176×840
- `<slug>-flow.webp` — wide image, 2400×1040
- also needed: `src/assets/og.png` (1200×630) and the founder photo (About, 4:5 / 960×1200)

`<slug>` is one of the five case-study slugs above.

## Going live (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main` (and the working branch).

1. **Settings → Pages → Source: GitHub Actions** (one-time).
2. Push. The site appears at `https://<owner>.github.io/<repo>/`. The workflow sets `BASE_PATH` so all asset/link paths work under that sub-path.
3. **Custom domain:** defaults to `https://sebsuxstudio.com`; override with repository variable `SITE_URL` (Settings → Secrets and variables → Actions → Variables) and re-run the workflow. Paths switch to the domain root and a `CNAME` file is written.
   DNS: apex → A records `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; `www` → CNAME `<owner>.github.io`. Then tick **Enforce HTTPS**.

Build env: `SITE_URL` (canonical/OG/sitemap/JSON-LD), `BASE_PATH` (sub-path hosting), `CNAME=1` (write CNAME file).
Other hosts (Netlify/Vercel/Cloudflare Pages): build `npm run build`, output `dist`, env `SITE_URL`.
