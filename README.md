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

## Docs

`docs/` holds working notes that are not part of the built site:

- `positioning-and-plan.md`: positioning, audit findings, 30-day plan, claims rules and open decisions.
- `home-copy-v2.md`: earlier mistake-led copy proposal, kept as history. The shipped home page follows the Figma file.
- `evidence-sheet.md` and `.csv`: researched claims with source, reliability and how to use each.

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

## Images

Project art lives in `src/assets/work/` as `<slug>-card|cover|screen-1|screen-2|flow.webp` (exported from the Figma file).
Still missing: the OG link-preview image `src/assets/og.png` (1200×630). The founder photo is `src/assets/founder.webp`.
If a file is missing the build falls back to a labelled placeholder, so nothing breaks.

## Going live (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main` (and the working branch).

1. **Settings → Pages → Source: GitHub Actions** (one-time).
2. Push. The site appears at `https://<owner>.github.io/<repo>/`. The workflow sets `BASE_PATH` so all asset/link paths work under that sub-path.
3. **Custom domain:** defaults to `https://sebsuxstudio.com`; override with repository variable `SITE_URL` (Settings → Secrets and variables → Actions → Variables) and re-run the workflow. Paths switch to the domain root and a `CNAME` file is written.
   DNS: apex → A records `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; `www` → CNAME `<owner>.github.io`. Then tick **Enforce HTTPS**.

Build env: `SITE_URL` (canonical/OG/sitemap/JSON-LD), `BASE_PATH` (sub-path hosting), `CNAME=1` (write CNAME file).
Other hosts (Netlify/Vercel/Cloudflare Pages): build `npm run build`, output `dist`, env `SITE_URL`.

## Owner login (optional)

An email-code login for one account (the owner). It stays off until two repository variables are set, so nothing
changes on the live site and the footer "Owner log in" link does not appear before then. Pages: `/admin/login/` and `/admin/`.
The dashboard is a shell with no data yet.

Setup with Supabase (free plan):

1. Create a project at supabase.com.
2. Authentication, Sign In / Providers: keep Email on and turn **off** "Allow new users to sign up".
3. Authentication, Users: **Add user** with your email only (create it with a random password you will not use).
4. Authentication, Email Templates, Magic Link: put `{{ .Token }}` in the message, for example `Your Sebs Admin sign-in code: {{ .Token }}`.
5. Authentication, URL Configuration: set Site URL to `https://sebsuxstudio.com`.
6. Project Settings, API: copy the **Project URL** and the **anon public** key. Never use the `service_role` key.
7. GitHub, Settings, Secrets and variables, Actions, **Variables**: add `SUPABASE_URL` and `SUPABASE_ANON_KEY`, then re-run the deploy workflow.
8. For daily use add your own SMTP sender in Supabase (Authentication, SMTP). The built-in sender is rate limited and meant for testing.

The login page only sends codes to existing accounts and answers the same way for any email. The browser pages are not
a security boundary: any stored data must be protected with row level security in Supabase.
