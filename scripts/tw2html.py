"""Convert Figma MCP React+Tailwind output into plain HTML with inline CSS.

Used for decorative artwork (industry cards, case-study screens, infographics)
where the generated markup is already a faithful DOM reproduction of the frame.
Layout sections are hand-written instead.

Usage (module): convert(jsx_fragment, img_map) -> (html, [img node ids])
"""
import re

FONT_W = {'thin': 100, 'extralight': 200, 'light': 300, 'normal': 400, 'regular': 400, 'medium': 500,
          'semibold': 600, 'semi_bold': 600, 'bold': 700, 'extrabold': 800, 'extra_bold': 800, 'black': 900}


def px(v):
    v = v.replace('_', ' ')
    return v


def color(v):
    v = v.replace('_', ' ')
    m = re.match(r'var\(--[\w-]+,(.*)\)$', v)
    if m:
        # keep the variable but with its fallback
        name = re.match(r'var\((--[\w-]+),', v).group(1)
        return f'var({name},{m.group(1)})'
    return v


def util(c):
    """Return list of (prop, value) for a Tailwind utility, or None."""
    simple = {
        'absolute': [('position', 'absolute')], 'relative': [('position', 'relative')],
        'block': [('display', 'block')], 'flex': [('display', 'flex')], 'flex-col': [('flex-direction', 'column')],
        'items-center': [('align-items', 'center')], 'items-start': [('align-items', 'flex-start')],
        'items-end': [('align-items', 'flex-end')], 'justify-between': [('justify-content', 'space-between')],
        'justify-center': [('justify-content', 'center')], 'justify-end': [('justify-content', 'flex-end')],
        'shrink-0': [('flex-shrink', '0')], 'flex-none': [('flex', 'none')],
        'inset-0': [('inset', '0')], 'left-0': [('left', '0')], 'right-0': [('right', '0')], 'top-0': [('top', '0')],
        'left-1/2': [('left', '50%')], 'top-1/2': [('top', '50%')],
        '-translate-x-1/2': [('--tx', '-50%')], '-translate-y-1/2': [('--ty', '-50%')],
        '-translate-x-full': [('--tx', '-100%')], 'rotate-1': [('--rot', '1deg')],
        'size-full': [('width', '100%'), ('height', '100%')], 'w-full': [('width', '100%')],
        'min-w-full': [('min-width', '100%')], 'max-w-none': [('max-width', 'none')],
        'overflow-clip': [('overflow', 'hidden')], 'overflow-x-auto': [('overflow-x', 'auto')],
        'overflow-y-clip': [('overflow-y', 'hidden')], 'whitespace-nowrap': [('white-space', 'nowrap')],
        'whitespace-pre': [('white-space', 'pre')],
        'text-center': [('text-align', 'center')], 'text-left': [('text-align', 'left')],
        'text-right': [('text-align', 'right')], 'not-italic': [], 'content-stretch': [], 'cursor-pointer': [],
        'bg-white': [('background-color', '#fff')], 'text-white': [('color', '#fff')],
        'border': [('border-width', '1px')], 'border-2': [('border-width', '2px')], 'border-4': [('border-width', '4px')],
        'border-solid': [('border-style', 'solid')], 'border-dashed': [('border-style', 'dashed')],
        'border-white': [('border-color', '#fff')], 'border-t': [('border-top-width', '1px'), ('border-style', 'solid')],
        'border-b': [('border-bottom-width', '1px'), ('border-style', 'solid')],
        'font-bold': [('font-weight', '700')], 'font-extrabold': [('font-weight', '800')],
        'font-semibold': [('font-weight', '600')], 'font-medium': [('font-weight', '500')],
        'font-normal': [('font-weight', '400')], 'opacity-0': [('opacity', '0')],
    }
    if c in simple:
        return simple[c]
    m = re.match(r'^(-?)(left|right|top|bottom)-\[(.+)\]$', c)
    if m:
        return [(m.group(2), ('-' if m.group(1) else '') + px(m.group(3)))]
    m = re.match(r'^(w|h|min-w|min-h|max-w|max-h)-\[(.+)\]$', c)
    if m:
        prop = {'w': 'width', 'h': 'height', 'min-w': 'min-width', 'min-h': 'min-height', 'max-w': 'max-width',
                'max-h': 'max-height'}[m.group(1)]
        v = px(m.group(2))
        if v == 'min-content':
            return [(prop, 'min-content')]
        return [(prop, v)]
    m = re.match(r'^size-\[(.+)\]$', c)
    if m:
        return [('width', px(m.group(1))), ('height', px(m.group(1)))]
    m = re.match(r'^(p|px|py|pt|pb|pl|pr)-\[(.+)\]$', c)
    if m:
        k, v = m.group(1), px(m.group(2))
        mp = {'p': ['padding'], 'px': ['padding-left', 'padding-right'], 'py': ['padding-top', 'padding-bottom'],
              'pt': ['padding-top'], 'pb': ['padding-bottom'], 'pl': ['padding-left'], 'pr': ['padding-right']}[k]
        return [(p_, v) for p_ in mp]
    m = re.match(r'^gap-\[(.+)\]$', c)
    if m:
        return [('gap', px(m.group(1)))]
    m = re.match(r'^rounded-\[(.+)\]$', c)
    if m:
        return [('border-radius', px(m.group(1)))]
    m = re.match(r'^rounded-(t|b)-\[(.+)\]$', c)
    m2 = re.match(r'^bg-\[(.+)\]$', c)
    if m2:
        v = color(m2.group(1))
        if v.startswith('url(') or 'gradient' in v:
            return [('background', v)]
        return [('background-color', v)]
    m = re.match(r'^border-\[(.+)\]$', c)
    if m:
        v = color(m.group(1))
        if re.match(r'^[\d.]+px$', v):
            return [('border-width', v)]
        if v.startswith('color:'):
            v = v[6:]
        return [('border-color', v)]
    m = re.match(r'^shadow-\[(.+)\]$', c)
    if m:
        return [('box-shadow', px(m.group(1)))]
    m = re.match(r'^drop-shadow-\[(.+)\]$', c)
    if m:
        return [('filter', f'drop-shadow({px(m.group(1))})')]
    m = re.match(r"^font-\['([\w ]+):([\w_]+)'\]$", c)
    if m:
        fam = m.group(1).replace('_', ' ')
        w = FONT_W.get(m.group(2).lower().replace('_', ''), FONT_W.get(m.group(2).lower(), 400))
        return [('font-family', f"'{fam}',system-ui,sans-serif"), ('font-weight', str(w))]
    m = re.match(r'^leading-\[(.+)\]$', c)
    if m:
        return [('line-height', m.group(1))]
    m = re.match(r'^tracking-\[(.+)\]$', c)
    if m:
        return [('letter-spacing', m.group(1))]
    m = re.match(r'^text-\[(.+)\]$', c)
    if m:
        v = m.group(1)
        if re.match(r'^[\d.]+px$', v):
            return [('font-size', v)]
        if v.startswith('length:'):
            return [('font-size', v[7:])]
        if v.startswith('color:'):
            v = v[6:]
        return [('color', color(v))]
    m = re.match(r'^opacity-(\d+)$', c)
    if m:
        return [('opacity', str(int(m.group(1)) / 100))]
    m = re.match(r'^opacity-\[(.+)\]$', c)
    if m:
        return [('opacity', m.group(1))]
    if c.startswith('[') or c.startswith('inset-['):
        m = re.match(r'^inset-\[(.+)\]$', c)
        if m:
            return [('inset', m.group(1).replace('_', ' '))]
        m = re.match(r'^\[word-break:break-word\]$', c)
        if m:
            return [('word-break', 'break-word')]
        return []
    return None


def style_for(classes):
    decl = {}
    unknown = []
    for c in classes.split():
        r = util(c)
        if r is None:
            unknown.append(c)
            continue
        for k, v in r:
            decl[k] = v
    if '--tx' in decl or '--ty' in decl or '--rot' in decl:
        t = []
        if '--tx' in decl or '--ty' in decl:
            t.append(f"translate({decl.pop('--tx', '0')},{decl.pop('--ty', '0')})")
        if '--rot' in decl:
            t.append(f"rotate({decl.pop('--rot')})")
        decl['transform'] = ' '.join(t)
    if decl.get('display') == 'flex' and 'flex-direction' not in decl:
        pass
    return '; '.join(f'{k}:{v}' for k, v in decl.items()), unknown


TOKEN = re.compile(r'<(/?)([A-Za-z][\w]*)((?:\s+[\w-]+(?:=(?:"[^"]*"|\{(?:[^{}]|\{[^{}]*\})*\}))?)*)\s*(/?)>|\{`([^`]*)`\}|([^<{]+)|\{([^}]*)\}', re.S)
ATTR = re.compile(r'([\w-]+)(?:=(?:"([^"]*)"|\{((?:[^{}]|\{[^{}]*\})*)\}))?', re.S)


def convert(jsx, img_svg=None, drop_names=(), asset_prefix='/assets/art/'):
    """jsx: a JSX element subtree string. Returns (html, node_ids_of_images, unknown_classes)."""
    out = []
    imgs = []
    unknown_all = set()
    stack = []
    for m in TOKEN.finditer(jsx):
        close, tag, attrs, selfclose, tmpl, text, expr = m.groups()
        if tag:
            if close:
                out.append('</div>' if tag in ('a', 'button') else f'</{tag}>')
                if stack:
                    stack.pop()
                continue
            a = {k: (v1 if v1 is not None else v2) for k, v1, v2 in ATTR.findall(attrs)}
            cls = a.get('className', '')
            if 'className' in a and a['className'] is None:
                cls = ''
            st, unk = style_for(cls or '')
            unknown_all.update(unk)
            attr_s = ''
            if not (selfclose or tag == 'img'):
                stack.append(a.get('data-node-id', ''))
            if tag == 'img':
                nid = next((x for x in reversed(stack) if x), '')
                imgs.append(nid)
                fname = nid.replace(':', '-').replace(';', '_')
                attr_s = f' src="{asset_prefix}{fname}.svg" alt=""'
                st = 'position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;display:block' if 'inset-0' in cls or 'size-full' in cls else st
            if tag == 'a':
                tag_out = 'div'
            elif tag == 'button':
                tag_out = 'div'
            else:
                tag_out = tag
            if tag == 'img' and img_svg:
                svg = img_svg(nid)
                if svg:
                    out.append(re.sub(r'<svg\b[^>]*?(viewBox="[^"]*")[^>]*>', lambda mm: f'<svg {mm.group(1)} preserveAspectRatio="none" aria-hidden="true" style="{st}">', svg, count=1))
                    continue
            void = tag == 'img'
            out.append(f'<{tag_out}{attr_s}' + (f' style="{st}"' if st else '') + '>' + ('</' + tag_out + '>' if (selfclose and not void) else ''))
        elif tmpl is not None:
            out.append(tmpl.replace('&', '&amp;').replace('<', '&lt;'))
        elif text is not None:
            if text.strip():
                out.append(re.sub(r'\s+', ' ', text).replace('&', '&amp;') if '&amp;' not in text else re.sub(r'\s+', ' ', text))
        elif expr is not None:
            e = expr.strip()
            if e.startswith('"') and e.endswith('"'):
                out.append(e[1:-1])
    return ''.join(out), imgs, unknown_all
