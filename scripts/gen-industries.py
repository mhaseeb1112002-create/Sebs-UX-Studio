"""Generate src/partials/industries.html from the Figma-exported markup (/tmp/industries.tsx)."""
import re, sys
sys.path.insert(0, 'scripts')
import tw2html

CHECK = '<svg viewBox="0 0 16 16" fill="none"><path d="M6.3 10.4667L12.35 4.41672C12.45 4.31672 12.5695 4.26672 12.7083 4.26672C12.8472 4.26672 12.9667 4.31672 13.0667 4.41672C13.1667 4.51672 13.2167 4.63617 13.2167 4.77506C13.2167 4.91395 13.1667 5.03339 13.0667 5.13339L6.65001 11.5501C6.55001 11.6501 6.43334 11.7001 6.3 11.7001C6.16667 11.7001 6.05001 11.6501 5.95001 11.5501L2.91667 8.51672C2.81667 8.41672 2.76945 8.29728 2.77501 8.15839C2.78056 8.0195 2.83334 7.90006 2.93334 7.80006C3.03334 7.70006 3.15278 7.65006 3.29167 7.65006C3.43056 7.65006 3.55001 7.70006 3.65001 7.80006L6.3 10.4667Z" fill="%s"/></svg>'
def circle(c): return f'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="{c}"/></svg>'
def bar(w): return f'<svg viewBox="0 0 {w} 30" fill="none"><rect width="{w}" height="30" fill="#F4F7F5"/><circle cx="18.5" cy="15.5" r="4.5" fill="#FF5F57"/><circle cx="34.5" cy="15.5" r="4.5" fill="#FEBC2E"/><circle cx="50.5" cy="15.5" r="4.5" fill="#28C840"/></svg>'
WAVE = '<svg viewBox="0 0 184 58" fill="none"><defs><linearGradient id="indwave" x1="0" y1="4" x2="0" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#2BD98C" stop-opacity="0.35"/><stop offset="1" stop-color="#2BD98C" stop-opacity="0"/></linearGradient></defs><path d="M0 46C20 40 30 48 46 36C62 24 74 30 90 34C106 38 120 14 138 20C156 26 166 8 184 4V58H0V46Z" fill="url(#indwave)"/><path d="M0 46C20 40 30 48 46 36C62 24 74 30 90 34C106 38 120 14 138 20C156 26 166 8 184 4" stroke="#0E9F5E" stroke-width="2.5" stroke-linecap="round"/></svg>'
INK, GRN = '#0F1A15', '#0B7A48'
M = {
 'I50:446;134:1404': WAVE, 'I50:446;134:1412': circle('#DDF5E9'), 'I50:446;134:1415': circle('#EEF3F0'), 'I50:446;134:1418': circle('#EEF3F0'),
 'I50:446;134:1423': CHECK % INK, 'I50:471;134:1492': CHECK % GRN, 'I50:471;134:1496': CHECK % GRN, 'I50:471;134:1504': CHECK % INK,
 'I50:494;135:1494': bar(328), 'I50:494;135:1547': CHECK % INK,
 'I50:529;135:1624': bar(380), 'I50:529;135:1629': CHECK % INK, 'I50:529;135:1652': CHECK % INK, 'I50:529;135:1656': CHECK % INK,
 'I50:555;135:1712': bar(392), 'I50:555;135:1717': CHECK % GRN, 'I50:555;135:1745': CHECK % INK,
 'I50:586;135:1831': circle('#DCE5E0'), 'I50:586;135:1833': circle('#DCE5E0'), 'I50:586;135:1835': circle('#0E9F5E'),
 'I50:586;135:1837': circle('#DCE5E0'), 'I50:586;135:1841': CHECK % INK,
}
routes = ['/work/', '/work/', '/work/', '/work/', '/work/gov-tech/', '/work/ed-tech/']
labels = ['Fintech', 'Identity & KYC', 'B2B SaaS', 'AI products', 'Gov-tech', 'Ed-tech']
t = open('/tmp/industries.tsx').read()
cards = [m.group(0) for m in re.finditer(r'<a className="[^"]*"[^>]*data-name="Industry card"[^>]*>.*?</a>', t, re.S)]
out = []
for i, c in enumerate(cards):
    html, imgs, unk = tw2html.convert(c, img_svg=M.get)
    assert not unk, unk
    miss = [x for x in imgs if x not in M]
    assert not miss, miss
    html = html.replace('<div ', f'<a class="ind-card" href="{routes[i]}" aria-label="{labels[i]} case studies" ', 1)
    html = html[:html.rfind('</div>')] + '</a>'
    out.append('<li>' + html + '</li>')
open('src/partials/industries-cards.html', 'w').write('\n'.join(out))
print(len(out), sum(len(x) for x in out))
