/* Owner login for Sebs Admin. Email code sign-in against the Supabase Auth REST API (no library).
   The project URL and anon key are public by design. Sign-ups are switched off in Supabase and only the
   owner's account exists, so the code can only be sent to that one email. Real protection for any stored
   data must come from row level security in Supabase, not from this page. */
(function () {
  'use strict';
  var CFG = __ADMIN_CONFIG__;
  var KEY = 'sebs-admin-session';
  var PREF = 'sebs-admin-remember';
  var $ = function (id) { return document.getElementById(id); };

  /* ---- storage: localStorage when "keep me signed in" was ticked, otherwise this tab only ---- */
  function read(store) { try { return JSON.parse(store.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function load() { var s = null; try { s = read(localStorage) || read(sessionStorage); } catch (e) {} return s; }
  function save(session, remember) {
    clear();
    var now = Math.floor(Date.now() / 1000);
    var s = { access_token: session.access_token, refresh_token: session.refresh_token, expires_at: session.expires_at || now + (session.expires_in || 3600), email: (session.user && session.user.email) || session.email || '' };
    try { (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }
  function clear() { try { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {} }
  function wantsRemember() { try { return localStorage.getItem(PREF) === '1'; } catch (e) { return false; } }

  /* ---- API ---- */
  function api(path, opts) {
    opts = opts || {};
    var headers = { apikey: CFG.key, 'Content-Type': 'application/json', Authorization: 'Bearer ' + (opts.token || CFG.key) };
    return fetch(CFG.url + '/auth/v1' + path, { method: opts.method || 'POST', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined, cache: 'no-store' })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {} return { ok: r.ok, status: r.status, body: j }; }); });
  }
  function ensureSession() {
    var s = load();
    if (!s) return Promise.resolve(null);
    var now = Math.floor(Date.now() / 1000);
    var remember = !!read(localStorage);
    var check = function (sess) {
      return api('/user', { method: 'GET', token: sess.access_token }).then(function (r) {
        if (r.ok && r.body && r.body.email) { sess.email = r.body.email; return sess; }
        return null;
      });
    };
    if (s.expires_at - 60 > now) return check(s).then(function (v) { if (!v) clear(); return v; });
    return api('/token?grant_type=refresh_token', { body: { refresh_token: s.refresh_token } }).then(function (r) {
      if (!r.ok || !r.body || !r.body.access_token) { clear(); return null; }
      var ns = save(r.body, remember);
      return check(ns).then(function (v) { if (!v) clear(); return v; });
    }).catch(function () { return null; });
  }
  function logout() {
    var s = load(); clear();
    var go = function () { location.replace('/admin/login/'); };
    if (!s) return go();
    api('/logout', { token: s.access_token }).then(go, go);
  }

  /* ---- magic link fallback: #access_token=... in the URL ---- */
  function takeHashSession() {
    if (!location.hash || location.hash.indexOf('access_token=') === -1) return false;
    var p = new URLSearchParams(location.hash.slice(1));
    if (!p.get('access_token')) return false;
    save({ access_token: p.get('access_token'), refresh_token: p.get('refresh_token'), expires_in: parseInt(p.get('expires_in') || '3600', 10) }, wantsRemember());
    history.replaceState(null, '', location.pathname);
    return true;
  }

  /* ---- login page ---- */
  function initLogin() {
    var email = '';
    var stepE = $('step-email'), stepC = $('step-code');
    var timer = null;
    function show(el, text) { var p = el.querySelector('p'); p.textContent = text; el.hidden = false; }
    function hide(el) { el.hidden = true; }
    function busy(btn, on, label) { btn.disabled = on; if (label) btn.textContent = label; }
    function cooldown(sec) {
      var b = $('resend'); clearInterval(timer);
      b.disabled = true;
      var left = sec; b.textContent = 'Send a new code in ' + left + 's';
      timer = setInterval(function () { left--; if (left <= 0) { clearInterval(timer); b.disabled = false; b.textContent = 'Send a new code'; } else b.textContent = 'Send a new code in ' + left + 's'; }, 1000);
    }
    function send(isResend) {
      var btn = isResend ? $('resend') : $('send');
      hide($('err-email')); hide($('err-code'));
      busy(btn, true, isResend ? 'Sending…' : 'Sending…');
      return api('/otp', { body: { email: email, create_user: false } }).then(function (r) {
        if (r.status === 429) { throw new Error('rate'); }
        if (r.status >= 500 || r.status === 0) { throw new Error('server'); }
        /* a 4xx for an unknown email looks the same as success, so the page never reveals which email has an account */
        stepE.hidden = true; stepC.hidden = false; $('sent-to').textContent = email;
        $('t-code').focus(); $('code').value = ''; cooldown(60);
        busy($('send'), false, 'Email me a sign-in code');
      }).catch(function (e) {
        busy($('send'), false, 'Email me a sign-in code');
        if (isResend) { cooldown(10); }
        var msg = e.message === 'rate' ? 'Too many tries. Wait a minute, then try again.' : 'We could not send the code. Check your connection and try again.';
        show(isResend ? $('err-code') : $('err-email'), msg);
      });
    }
    $('f-email').addEventListener('submit', function (ev) {
      ev.preventDefault(); hide($('err-email'));
      var v = $('email').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { $('email').setAttribute('aria-invalid', 'true'); show($('err-email'), 'Enter your email address, like name@example.com.'); $('email').focus(); return; }
      $('email').removeAttribute('aria-invalid'); email = v;
      try { localStorage.setItem(PREF, $('remember').checked ? '1' : '0'); } catch (e) {}
      send(false);
    });
    $('resend').addEventListener('click', function () { if (!$('resend').disabled) send(true); });
    $('change').addEventListener('click', function () { clearInterval(timer); stepC.hidden = true; stepE.hidden = false; $('email').focus(); });
    $('f-code').addEventListener('submit', function (ev) {
      ev.preventDefault(); hide($('err-code'));
      var code = $('code').value.replace(/\s+/g, '');
      if (!/^\d{6,10}$/.test(code)) { $('code').setAttribute('aria-invalid', 'true'); show($('err-code'), 'Enter the code from the email. It is made of numbers only.'); $('code').focus(); return; }
      $('code').removeAttribute('aria-invalid');
      busy($('verify'), true, 'Checking…');
      api('/verify', { body: { type: 'email', email: email, token: code } }).then(function (r) {
        if (r.ok && r.body && r.body.access_token) { save(r.body, wantsRemember()); location.replace('/admin/'); return; }
        busy($('verify'), false, 'Log in');
        $('code').value = ''; $('code').focus();
        if (r.status === 429) show($('err-code'), 'Too many tries. Wait a minute, then try again.');
        else show($('err-code'), 'That code did not work. It may have expired. Check the code and try again, or send a new one.');
      }).catch(function () { busy($('verify'), false, 'Log in'); show($('err-code'), 'We could not check the code. Check your connection and try again.'); });
    });
    $('remember').checked = wantsRemember();
    ensureSession().then(function (s) { if (s) location.replace('/admin/'); });
  }

  /* ---- dashboard ---- */
  function initApp() {
    $('logout').addEventListener('click', logout);
    ensureSession().then(function (s) {
      if (!s) { location.replace('/admin/login/'); return; }
      $('who').textContent = 'Signed in as ' + s.email;
      $('loading').hidden = true; $('app').hidden = false;
    });
  }

  if (!CFG || !CFG.url || !CFG.key) { var l = $('loading'); if (l) l.textContent = 'Login is not set up on this site yet.'; return; }
  takeHashSession();
  if ($('f-email')) initLogin(); else initApp();
})();
