(() => {
  const BASE = ''; // replaced at build time (BASE_PATH) for sub-path hosting
  if (window.top !== window.self) { try { window.top.location = window.self.location; } catch (e) { document.documentElement.style.display = 'none'; } } // clickjacking: never render inside a frame
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* sticky nav shadow after 8px scroll */
  const nav = $('.nav');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* scroll-spy: highlight the link of the section under the viewport's reading line */
  const links = $$('.nav-link[href*="#"]');
  const targets = links.map(a => [a, $(a.getAttribute('href').replace(/^.*#/, '#'))]).filter(([, t]) => t);
  const spy = () => {
    const line = innerHeight * .4; let active = null;
    targets.forEach(([a, t]) => { const r = t.getBoundingClientRect(); if (r.top <= line && r.bottom > line) active = a; });
    links.forEach(a => a.classList.toggle('is-active', a === active));
  };
  if (targets.length) { addEventListener('scroll', spy, { passive: true }); spy(); }

  /* services dropdown */
  const dd = $('.nav-dd'), ddBtn = $('.dd-toggle');
  const setDd = open => { if (!dd) return; dd.classList.toggle('is-open', open); ddBtn.setAttribute('aria-expanded', String(open)); };
  ddBtn?.addEventListener('click', e => { e.stopPropagation(); dd.classList.remove('is-suppressed'); setDd(!dd.classList.contains('is-open')); });
  document.addEventListener('click', e => { if (dd && !dd.contains(e.target)) setDd(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && dd && (dd.classList.contains('is-open') || dd.matches(':hover') || dd.contains(document.activeElement))) { setDd(false); dd.classList.add('is-suppressed'); if (dd.contains(document.activeElement)) ddBtn.focus(); } });
  dd?.addEventListener('mouseleave', () => dd.classList.remove('is-suppressed'));
  dd?.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) setDd(false); });

  /* fintech walkthrough mockup: scale the 460px artwork to fit narrow screens */
  $$('.wt-art').forEach(a => {
    const fit = () => a.style.setProperty('--wt-s', String(Math.min(1, a.clientWidth / 460)));
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(a); else addEventListener('resize', fit);
  });

  /* free checklist: validation, honeypot, throttle, send , analytics hooks */
  /* analytics: GA4 behind Consent Mode v2. The tag is not loaded at all until the visitor accepts. */
  const cc = $('#cc'), GA = cc?.dataset.ga || '';
  let gaOn = false;
  const CK = 'sebs-consent';
  const getChoice = () => { try { return localStorage.getItem(CK); } catch (_) { return null; } };
  const setChoice = v => { try { localStorage.setItem(CK, v); } catch (_) {} };
  if (GA) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  }
  const startGA = () => {
    if (!GA || gaOn) return;
    gaOn = true;
    gtag('consent', 'update', { analytics_storage: 'granted' }); /* ads stay denied */
    const sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA; document.head.appendChild(sc);
    gtag('js', new Date());
    gtag('config', GA, { allow_google_signals: false, allow_ad_personalization_signals: false, transport_type: 'beacon' });
  };
  const stopGA = () => {
    if (!GA) return;
    const was = gaOn; gaOn = false;
    if (was) gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => n === '_ga' || n.startsWith('_ga_')).forEach(n => { document.cookie = n + '=; Max-Age=0; path=/'; document.cookie = n + '=; Max-Age=0; path=/; domain=' + location.hostname; document.cookie = n + '=; Max-Age=0; path=/; domain=.' + location.hostname.replace(/^www\./, ''); });
  };
  const track = (name, params) => { if (gaOn) { try { gtag('event', name, params || {}); } catch (_) {} } }; /* never any personal data in params */
  if (cc) {
    const fixed = () => getComputedStyle(cc).position === 'fixed';
    const pad = () => { document.body.classList.toggle('has-cc', !cc.hidden && fixed()); document.body.style.setProperty('--cc-h', cc.offsetHeight + 'px'); };
    const hideBanner = () => { cc.hidden = true; cc.classList.remove('cc-pop'); document.documentElement.classList.remove('cc-need'); pad(); };
    const showBanner = pop => { cc.classList.toggle('cc-pop', !!pop); cc.hidden = false; pad(); if (pop) $('button', cc).focus(); };
    let opener = null;
    $$('[data-cc]', cc).forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.cc; setChoice(v);
      if (v === 'granted') startGA(); else stopGA();
      hideBanner(); if (opener) { opener.focus(); opener = null; }
    }));
    document.addEventListener('click', e => { const o = e.target.closest('[data-cc-open]'); if (o) { opener = o; showBanner(true); } });
    addEventListener('resize', () => { if (!cc.hidden) pad(); });
    const c = getChoice();
    if (c === 'granted') startGA(); else if (c !== 'denied') showBanner(false);
  }
  /* events: generate_lead and checklist_download are called where they happen; these are delegated clicks */
  document.addEventListener('click', e => {
    const a = e.target.closest('a'); if (!a) return;
    if (a.dataset.ba) track('book_audit_click', { location: a.dataset.ba });
    if (a.dataset.sc) track('select_content', { content_type: 'checklist', location: a.dataset.sc });
    if (a.dataset.track === 'checklist_download') track('checklist_download');
    if ((a.getAttribute('href') || '').startsWith('mailto:hello@')) track('email_click');
  });
  const ck = $('[data-checklist]');
  if (ck) {
    const form = $('.ck-form', ck), input = $('#ck-email', ck), err = $('#ck-err', ck), fail = $('#ck-fail', ck), done = $('.ck-done', ck), btn = $('button[type=submit]', ck), btxt = $('.ck-bt', btn), sub = $('#ck-sub', ck), hp = $('[name=company_url]', ck);
    const ok = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
    const showErr = bad => { err.hidden = !bad; input.setAttribute('aria-invalid', String(bad)); };
    const note = $('.ck-done-n', done), title = $('.ck-done-t', done);
    const finish = msg => { form.hidden = true; note.textContent = msg || ''; note.hidden = !msg; done.hidden = false; title.focus(); };
    input.addEventListener('input', () => { if (!err.hidden && ok(input.value)) showErr(false); fail.hidden = true; });
    input.addEventListener('blur', () => { if (input.value.trim() && !ok(input.value)) showErr(true); });
    const sent = () => 'Thanks, you’re on the list.';
    const again = email => `You’re already on the list, ${email}. Download it again below.`;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!ok(input.value)) { showErr(true); input.focus(); return; }
      showErr(false); fail.hidden = true;
      const email = input.value.trim(), endpoint = form.dataset.endpoint;
      if (hp.value) { finish(endpoint ? sent() : ''); return; } /* bots: pretend success, send nothing */
      let last = 0, lastEmail = ''; try { last = +localStorage.getItem('ckLast') || 0; lastEmail = localStorage.getItem('ckEmail') || ''; } catch (_) {}
      if (lastEmail === email.toLowerCase() && Date.now() - last < 600000) { finish(again(email)); return; } /* repeat submit: no error, no second email */
      if (!endpoint) { finish(''); return; } /* no email service connected yet: give the PDF, claim no email */
      btn.disabled = true; btn.classList.add('is-busy'); btxt.textContent = 'Sending…';
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new URLSearchParams({ email, subscribe: String(sub.checked), source: 'checklist', tag: 'checklist-pdf' }) });
        if (!r.ok) throw new Error(String(r.status));
        try { localStorage.setItem('ckLast', String(Date.now())); localStorage.setItem('ckEmail', email.toLowerCase()); } catch (_) {}
        track('generate_lead', { form: 'checklist', subscribe: sub.checked });
        finish(sent());
      } catch (_) {
        btn.disabled = false; btn.classList.remove('is-busy'); btxt.textContent = 'Get the checklist'; fail.hidden = false;
      }
    });
  }

  /* hero "Get the free checklist": smooth scroll, then put the cursor in the email field */
  $$('[data-ck-focus]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    try { history.replaceState(null, '', a.getAttribute('href')); } catch (_) {}
    const f = $('#ck-email'); let done = false;
    const go = () => { if (done) return; done = true; if (f && !f.closest('[hidden]')) f.focus({ preventScroll: true }); };
    if ('onscrollend' in window && !reduce) { addEventListener('scrollend', go, { once: true }); setTimeout(go, 1200); } else setTimeout(go, reduce ? 0 : 700);
  }));

  /* mobile menu */
  const menu = $('#mobile-menu'), burger = $('.nav-burger');
  const setMenu = open => {
    if (!menu) return;
    menu.hidden = !open; document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    (open ? $('.mm-close', menu) : burger).focus();
  };
  burger?.addEventListener('click', () => setMenu(true));
  $('.mm-close', menu || document)?.addEventListener('click', () => setMenu(false));
  $$('.mm-item,.mm-cta,.mm-sub a', menu || document).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 899 && menu && !menu.hidden) setMenu(false); });

  /* FAQ accordion: one open at a time */
  $$('[data-accordion]').forEach(acc => {
    const items = $$('.faq-item', acc);
    items.forEach(it => $('.faq-q', it).addEventListener('click', () => {
      const q = $('.faq-q', it), before = q.getBoundingClientRect().top;
      /* keep the tapped question where the finger is while the item above collapses (iOS has no scroll anchoring) */
      if (!reduce) { const t0 = performance.now(); const hold = () => { scrollBy(0, q.getBoundingClientRect().top - before); if (performance.now() - t0 < 420) requestAnimationFrame(hold); }; requestAnimationFrame(hold); }
      const open = !it.classList.contains('is-open');
      items.forEach(o => { o.classList.remove('is-open'); $('.faq-q', o).setAttribute('aria-expanded', 'false'); });
      if (open) { it.classList.add('is-open'); $('.faq-q', it).setAttribute('aria-expanded', 'true'); }
    }));
  });

  /* Funnel card: Before/After toggle; auto-play Before -> After on first view */
  $$('[data-funnel]').forEach(card => {
    const rows = $$('.fc-row', card), btns = $$('.toggle button', card);
    const strong = $('.result strong', card), small = $('.result small', card);
    const set = view => {
      card.dataset.view = view;
      rows.forEach(r => {
        const v = +r.dataset[view === 'after' ? 'a' : 'b'];
        r.style.setProperty('--w', v / 100); $('b', r).textContent = v + '%';
      });
      btns.forEach(b => b.setAttribute('aria-checked', String(b.dataset.set === view)));
      strong.textContent = view === 'after' ? '+35 pts' : '31%';
      small.textContent = view === 'after' ? 'completion' : 'completion today';
    };
    set('before');
    btns.forEach(b => b.addEventListener('click', () => { card.dataset.played = '1'; set(b.dataset.set); }));
    const chip = $('[data-kyc]');
    const seq = () => {
      if (reduce) { set('after'); chip?.classList.add('is-in'); return; }
      setTimeout(() => { if (!card.dataset.played) { set('after'); setTimeout(() => chip?.classList.add('is-in'), 450); } }, 1400);
    };
    if (reduce) { set('after'); chip?.classList.add('is-in'); }
    else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); seq(); } }, { threshold: .4 }); io.observe(card);
    } else seq();
  });

  /* Hero visual: scale the 584x520 composition to its column between 1024 and 1439 */
  const hv = $('.hero-visual');
  if (hv) {
    const fit = () => {
      if (innerWidth < 1024) { hv.style.removeProperty('--k'); hv.style.removeProperty('height'); return; }
      const k = Math.min(1, hv.clientWidth / 584);
      hv.style.setProperty('--k', k); hv.style.height = Math.round(520 * k) + 'px';
    };
    fit(); addEventListener('resize', fit);
  }

  /* Hero stepper: Step 1 -> Step 2 -> Done on load */
  $$('[data-stepper]').forEach(s => {
    const steps = $$('.step', s), rails = $$('.rail', s), names = $$('.step-names span', s);
    const show = n => { // n: 0,1,2 active index; 3 = all done
      steps.forEach((st, i) => { st.classList.toggle('is-done', i < n); st.classList.toggle('is-active', i === n); });
      rails.forEach((r, i) => r.classList.toggle('is-filled', i < n));
      names.forEach((nm, i) => nm.style.color = i <= n ? 'var(--primitive-ink-900)' : '');
    };
    show(0);
    if (reduce) show(3);
    else { setTimeout(() => show(1), 700); setTimeout(() => show(3), 1500); }
  });

  /* On-view animations: leak chart, timeline comparison, score ring, process timeline */
  const once = (el, fn, th = .4) => {
    if (!el) return;
    if (reduce || !('IntersectionObserver' in window)) return fn(true);
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); fn(false); } }, { threshold: th }); io.observe(el);
  };
  $$('[data-leak]').forEach(el => {
    const bars = $$('.lt i', el), labels = $$('.leak-row b', el);
    if (!reduce) { bars.forEach(b => { b.dataset.w = b.style.getPropertyValue('--w'); b.style.setProperty('--w', .0273); b.style.transitionDelay = ''; }); labels.forEach(l => l.style.opacity = 0); }
    once(el, instant => {
      bars.forEach((b, i) => { b.style.transitionDelay = instant ? '0ms' : i * 80 + 'ms'; b.style.setProperty('--w', b.dataset.w || b.style.getPropertyValue('--w')); });
      labels.forEach(l => { l.style.transition = 'opacity 300ms ease-out 450ms'; l.style.opacity = 1; });
    });
  });
  $$('[data-bars]').forEach(el => {
    const bars = $$('.tl-track i', el);
    if (!reduce) bars.forEach(b => { b.dataset.w = b.style.getPropertyValue('--w'); b.style.setProperty('--w', 0); });
    once(el, () => bars.forEach((b, i) => { b.style.transitionDelay = i * 80 + 'ms'; b.style.setProperty('--w', b.dataset.w); }));
  });
  $$('[data-score]').forEach(el => {
    const target = +el.dataset.score, fill = $('.ring-fill', el), num = $('.ring-num', el), C = 383.3;
    const set = v => { fill.style.strokeDashoffset = C * (1 - v / 100); num.textContent = Math.round(v); };
    if (reduce) { fill.style.transition = 'none'; return set(target); }
    once(el, () => {
      const t0 = performance.now(), D = 900;
      fill.style.strokeDashoffset = C * (1 - target / 100);
      const tick = t => { const p = Math.min(1, (t - t0) / D); num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
  });
  $$('[data-timeline]').forEach(el => {
    const steps = $$('.tl-step', el);
    if (reduce) { steps.forEach(s => s.classList.add('is-done')); el.style.setProperty('--p', 1); return; }
    steps.forEach((s, i) => i && s.classList.remove('is-done'));
    once(el, () => steps.forEach((s, i) => setTimeout(() => { s.classList.add('is-done'); el.style.setProperty('--p', i === steps.length - 1 ? 1 : (i + 1) / (steps.length - 1) * .98 + .02); }, i * 180)), .3);
  });

  /* Industries carousel: arrows scroll one card; hide at ends */
  $$('.ind-carousel').forEach(c => {
    const prev = $('.arrow-prev'), next = $('.arrow-next');
    const step = () => (c.querySelector('li')?.getBoundingClientRect().width || 460) + 24;
    const upd = () => { if (!prev) return; prev.disabled = c.scrollLeft <= 4; next.disabled = c.scrollLeft + c.clientWidth >= c.scrollWidth - 4; };
    prev?.addEventListener('click', () => c.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next?.addEventListener('click', () => c.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    c.addEventListener('scroll', upd, { passive: true }); upd(); addEventListener('resize', upd);
    c.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next?.click(); if (e.key === 'ArrowLeft') prev?.click(); });
  });

  /* Work filter tabs: tablist, arrow keys, URL deep-links (/work/[industry]) with 250ms fade */
  $$('.filters').forEach(tl => {
    const tabs = $$('[role="tab"]', tl), grid = $('.work-grid'), items = $$('.work-grid>li');
    const apply = (f, push) => {
      const run = () => {
        tabs.forEach(o => { const on = o.dataset.filter === f; o.setAttribute('aria-selected', String(on)); o.tabIndex = on ? 0 : -1; });
        items.forEach(c => c.hidden = !(f === 'all' || c.dataset.cat === f));
        grid.classList.remove('is-fading');
      };
      if (push) history.pushState({ f }, '', BASE + (f === 'all' ? '/work/' : `/work/${f}/`));
      if (reduce) run(); else { grid.classList.add('is-fading'); setTimeout(run, 250); }
    };
    tabs.forEach(t => t.addEventListener('click', e => { e.preventDefault(); apply(t.dataset.filter, true); }));
    tl.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement); if (i < 0 || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); apply(n.dataset.filter, true);
    });
    addEventListener('popstate', () => { const m = location.pathname.slice(BASE.length).match(/^\/work\/([\w-]+)\/?$/); apply(m && tabs.some(t => t.dataset.filter === m[1]) ? m[1] : 'all', false); });
  });

  /* Case-study key screens: lightbox (Esc closes, focus returns) */
  $$('[data-lightbox]').forEach(b => b.addEventListener('click', () => {
    const im = $('img', b); if (!im) return;
    const box = document.createElement('div'); box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', im.alt);
    const big = new Image(); big.src = im.src; big.alt = im.alt;
    const close = document.createElement('button'); close.type = 'button'; close.setAttribute('aria-label', 'Close'); close.textContent = '✕';
    const done = () => { box.remove(); document.removeEventListener('keydown', onKey); b.focus(); };
    const onKey = e => { if (e.key === 'Escape') done(); };
    close.addEventListener('click', done); box.addEventListener('click', e => { if (e.target === box) done(); });
    box.append(big, close); document.body.append(box); close.focus(); document.addEventListener('keydown', onKey);
  }));


  /* short intake form: validate inline, then hand the answers to the visitor's email app */
  const intake = $('#intake');
  if (intake) {
    const card = $('#intake-card');
    const val = {
      name: f => f.value.trim().length > 1,
      email: f => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim()),
      site: f => f.value.trim().length > 2,
      service: () => !!intake.querySelector('input[name=service]:checked'),
    };
    const field = k => k === 'service' ? intake.querySelector('fieldset.field') : intake.elements[k].closest('.field');
    const check = k => {
      const ok = val[k](k === 'service' ? null : intake.elements[k]), box = field(k);
      box.toggleAttribute('data-invalid', !ok);
      if (k !== 'service') intake.elements[k].setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    Object.keys(val).filter(k => k !== 'service').forEach(k => intake.elements[k].addEventListener('blur', () => { if (intake.elements[k].value) check(k); }));
    intake.querySelectorAll('input[name=service]').forEach(r => r.addEventListener('change', () => check('service')));
    intake.addEventListener('submit', e => {
      e.preventDefault();
      const bad = Object.keys(val).filter(k => !check(k));
      if (bad.length) { const f = bad[0] === 'service' ? intake.querySelector('input[name=service]') : intake.elements[bad[0]]; f.focus(); return; }
      const d = Object.fromEntries(new FormData(intake));
      const body = `Name: ${d.name}\nEmail: ${d.email}\nProduct / site: ${d.site}\nService: ${d.service}\n\nDetails:\n${d.msg || '-'}`;
      card.classList.add('is-done'); $('.form-done', card).focus();
      const dt = $('#done-text', card); if (dt) dt.value = `To: hello@sebsuxstudio.com\nSubject: ${d.service} request: ${d.site}\n\n${body}`;
      const dc = $('#done-copy', card);
      if (dc && !dc.dataset.bound) { dc.dataset.bound = '1'; dc.addEventListener('click', () => { const say = t => { $('#done-copied', card).textContent = t; }; try { navigator.clipboard.writeText(dt.value).then(() => say('Copied. Paste it into an email to hello@sebsuxstudio.com.'), () => { dt.select(); say('Press Ctrl+C or Cmd+C to copy.'); }); } catch (e) { dt.select(); say('Press Ctrl+C or Cmd+C to copy.'); } }); }
      location.href = `mailto:hello@sebsuxstudio.com?subject=${encodeURIComponent(d.service + ' request: ' + d.site)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* smooth in-page anchors with reduced-motion fallback handled by CSS */
})();
