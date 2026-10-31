// usage: node scripts/audit.mjs <route> <tag> [widths comma-separated]
import { createRequire } from 'node:module';
const require = createRequire('/usr/lib/node_modules/');
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = await import('playwright')); }
import { serve } from './serve.mjs';
import fs from 'node:fs';
const [route = '/', tag = 'home', widthsArg] = process.argv.slice(2);
const widths = (widthsArg || '1920,1440,1280,1024,834,768,430,390,375,320').split(',').map(Number);
fs.mkdirSync('/tmp/shots', { recursive: true });
const srv = await serve(4174);
const browser = await chromium.launch();
const results = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(String(e)));
  page.on('requestfailed', r => errs.push('requestfailed ' + r.url()));
  await page.goto('http://localhost:4174' + route, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '*{scroll-behavior:auto!important}' });
  // trigger on-view animations by scrolling through
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(60); }
  await page.waitForTimeout(1800);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
  const m = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const over = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > vw + 1 || r.left < -1)) {
        let p = el, clipped = false; while ((p = p.parentElement)) { const o = getComputedStyle(p).overflowX; if (o !== 'visible' && p !== document.body && p !== document.documentElement) { clipped = true; break; } }
        if (!clipped) over.push(el.tagName.toLowerCase() + '.' + (el.className?.baseVal ?? el.className) + ' ' + Math.round(r.left) + '→' + Math.round(r.right));
      }
    });
    return { vw, sw: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, over: over.slice(0, 6) };
  });
  const secs = await page.evaluate(() => [...document.querySelectorAll('header.nav, main>section, footer')].map(e => (e.id || e.className.split(' ')[0]) + ':' + Math.round(e.getBoundingClientRect().height)));
  if (process.env.SECS) console.log(w, secs.join(' '));
  await page.screenshot({ path: `/tmp/shots/${tag}-${w}.png`, fullPage: true });
  results.push({ w, hscroll: m.sw > m.vw, scrollW: m.sw, height: m.h, overflowEls: m.over, errors: errs.slice(0, 3) });
  await ctx.close();
}
await browser.close(); srv.close();
for (const r of results) console.log(JSON.stringify(r));
