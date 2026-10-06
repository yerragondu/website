/* yerragondu.com — interactions
   No dependencies. Everything degrades gracefully without JS. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var THEME_KEY = 'ny-theme';

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function storeTheme(v) {
    try { localStorage.setItem(THEME_KEY, v); } catch (e) { /* private mode */ }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return systemDark() ? 'dark' : 'light';
  }
  function applyTheme(v) {
    root.setAttribute('data-theme', v);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', v === 'dark' ? '#0e0e10' : '#faf9f7');
  }

  var saved = storedTheme();
  if (saved === 'dark' || saved === 'light') applyTheme(saved);

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- mobile menu ---------- */
  var head = document.querySelector('.site-head');
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    if (!head) return;
    head.classList.remove('is-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && head) {
    menuBtn.addEventListener('click', function () {
      var open = head.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById('progress');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ---------- project filter ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var projects = Array.prototype.slice.call(document.querySelectorAll('.proj'));
  var empty = document.getElementById('proj-empty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');

      chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });

      var shown = 0;
      projects.forEach(function (p) {
        var tags = (p.getAttribute('data-tags') || '').split(/\s+/);
        var match = filter === 'all' || tags.indexOf(filter) !== -1;
        p.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

})();
