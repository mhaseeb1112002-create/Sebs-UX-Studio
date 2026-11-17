// Tiny Markdown renderer for the guide files in src/guides-md. No dependencies.
// Supports what the guides use: front matter, ## headings, paragraphs (single line breaks become <br>),
// tables, block quotes, bullet and numbered lists, **bold**, *italic*, [links](url).

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function parseFrontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing front matter');
  const meta = {}; const lines = m[1].split('\n');
  const unq = v => { v = v.trim(); return (v.startsWith('"') && v.endsWith('"')) ? v.slice(1, -1).replace(/\\"/g, '"') : v; };
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([\w]+):\s*(.*)$/); if (!kv) continue;
    const [, k, v] = kv;
    if (v === '') { const list = []; while (i + 1 < lines.length && /^\s+-\s/.test(lines[i + 1])) list.push(unq(lines[++i].replace(/^\s+-\s+/, ''))); meta[k] = list; }
    else if (v.startsWith('[') && v.endsWith(']')) meta[k] = v.slice(1, -1).split(',').map(s => unq(s)).filter(Boolean);
    else meta[k] = unq(v);
  }
  return { meta, body: m[2] };
}

export function inline(t) {
  let s = esc(t);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, url) => {
    const ext = /^https?:/.test(url);
    return `<a href="${url}"${ext ? ' target="_blank" rel="noopener"' : ''}${url === '/start/' ? ' data-ba="guide_body"' : ''}>${txt}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  return s;
}

const cells = row => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

// Returns [{ h2: string|null, html: string }]: one entry per "##" section (the intro has h2 = null).
export function renderSections(body) {
  const out = []; let cur = { h2: null, parts: [] };
  const push = () => { if (cur.parts.length || cur.h2) out.push({ h2: cur.h2, html: cur.parts.join('') }); };
  const L = body.replace(/\r/g, '').split('\n'); let i = 0;
  while (i < L.length) {
    const line = L[i];
    if (!line.trim()) { i++; continue; }
    const h = line.match(/^##\s+(.*)$/);
    if (h) { push(); cur = { h2: h[1].trim(), parts: [] }; i++; continue; }
    if (/^\|/.test(line) && /^\|?\s*:?-{3,}/.test(L[i + 1] || '')) {
      const head = cells(line); i += 2; const rows = [];
      while (i < L.length && /^\|/.test(L[i])) rows.push(cells(L[i++]));
      const label = (cur.h2 || 'Table').replace(/<[^>]*>/g, '');
      cur.parts.push(`<div class="cp-tbl" tabindex="0" role="region" aria-label="${esc(label)} (scrolls sideways on small screens)"><table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      const q = []; while (i < L.length && /^>\s?/.test(L[i])) q.push(L[i++].replace(/^>\s?/, ''));
      cur.parts.push(`<blockquote><p>${q.map(inline).join('<br>')}</p></blockquote>`); continue;
    }
    if (/^(-|\d+\.)\s+/.test(line)) {
      const ordered = /^\d+\./.test(line); const items = [];
      while (i < L.length && (ordered ? /^\d+\.\s+/ : /^-\s+/).test(L[i])) items.push(L[i++].replace(ordered ? /^\d+\.\s+/ : /^-\s+/, ''));
      cur.parts.push(`<${ordered ? 'ol' : 'ul'}>${items.map(x => `<li>${inline(x)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`); continue;
    }
    const p = []; while (i < L.length && L[i].trim() && !/^(##\s|\||>|-\s|\d+\.\s)/.test(L[i])) p.push(L[i++]);
    cur.parts.push(`<p>${p.map(inline).join('<br>')}</p>`);
  }
  push();
  return out;
}
