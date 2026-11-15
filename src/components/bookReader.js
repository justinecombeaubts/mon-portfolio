// Liseuse de Séléna : couverture, prologue, chapitre 1, page « La suite bientôt… », 4e de couverture.
// Le texte (src/data/selena-extrait.json) n'est chargé qu'à l'ouverture du livre, et seul cet extrait existe dans le site.
// Le texte est paginé à la volée selon la taille de la page : les paragraphes trop longs sont coupés au mot près.

import { SOCIALS } from './contact.js';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap';
const NIGHT_KEY = 'liseuse-selena-nuit';
const INSTAGRAM = SOCIALS.find((s) => s.icon.includes('instagram'));

export function renderBookReader() {
  return `
  <div id="book-reader" class="reader fixed inset-0 z-[70] hidden flex-col" role="dialog" aria-modal="true" aria-labelledby="reader-title">
    <div class="reader-backdrop absolute inset-0" aria-hidden="true"></div>

    <div class="relative z-10 flex items-center justify-between gap-2 px-3 py-3 sm:px-5">
      <p id="reader-title" class="truncate font-display text-sm font-semibold text-slate-200">
        Séléna <span class="font-normal text-slate-400">· extrait</span>
      </p>
      <div class="flex items-center gap-1.5">
        <button type="button" class="reader-tool" data-reader="cover" aria-label="Revenir à la couverture">
          <i class="fas fa-book" aria-hidden="true"></i>
        </button>
        <button type="button" class="reader-tool" data-reader="night" aria-pressed="false" aria-label="Mode nuit">
          <i class="fas fa-moon" aria-hidden="true"></i>
        </button>
        <button type="button" class="reader-tool" data-reader="close" aria-label="Fermer la liseuse">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <div class="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4">
      <div class="reader-book" data-reader="stage" aria-roledescription="livre">
        <span class="reader-edge reader-edge-prev" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
        <span class="reader-edge reader-edge-next" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
      </div>
    </div>

    <div class="relative z-10 mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 pb-4 pt-3">
      <button type="button" class="reader-tool" data-reader="prev" aria-label="Page précédente">
        <i class="fas fa-arrow-left" aria-hidden="true"></i>
      </button>
      <div class="min-w-0 flex-1 text-center">
        <p class="text-xs font-medium tabular-nums text-slate-300" data-reader="indicator" aria-live="polite">Couverture</p>
        <div class="reader-progress mt-1.5" aria-hidden="true"><span data-reader="progress"></span></div>
      </div>
      <button type="button" class="reader-tool" data-reader="next" aria-label="Page suivante">
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>`;
}

// --- Mise en forme du texte -------------------------------------------------

// Découpe le texte du livre en « feuilles » : éléments simples posés l'un après l'autre sur les pages.
function buildLeaves(chapters) {
  const leaves = [];
  for (const chapter of chapters) {
    if (chapter.part) {
      leaves.push({
        tag: 'div',
        cls: 'reader-part',
        html: `<p class="reader-kicker">${chapter.part.kicker}</p><p class="reader-orn" aria-hidden="true">❦</p><h2>${chapter.part.title}</h2>`,
        alone: true,
      });
    }
    leaves.push({
      tag: 'header',
      cls: 'reader-chapter',
      html: `<p class="reader-kicker">${chapter.label}</p><h2>${chapter.title}</h2><p class="reader-orn" aria-hidden="true">❦</p>`,
      breakBefore: true,
    });
    let first = true;
    for (const b of chapter.blocks) {
      if (b.type === 'journal') {
        leaves.push({ tag: 'p', cls: 'reader-journal reader-journal-date', html: b.date });
        if (b.salutation) leaves.push({ tag: 'p', cls: 'reader-journal reader-journal-hello', html: b.salutation });
        for (const para of b.paras) leaves.push({ tag: 'p', cls: 'reader-journal', html: para, split: true });
        if (b.signature) leaves.push({ tag: 'p', cls: 'reader-journal reader-journal-sign', html: b.signature });
      } else if (b.type === 'memory') {
        leaves.push({ tag: 'p', cls: 'reader-memory', html: b.text, split: true });
      } else if (b.type === 'sep') {
        leaves.push({ tag: 'p', cls: 'reader-sep', html: '❦', aria: 'hidden' });
      } else {
        leaves.push({ tag: 'p', cls: first ? 'reader-lettrine' : '', html: b.html, split: true });
        first = false;
      }
    }
  }
  return leaves;
}

function leafNode({ tag, cls, html, aria }, cont = false) {
  const el = document.createElement(tag);
  el.className = [cls, cont ? 'reader-cont' : ''].filter(Boolean).join(' ').replace('reader-lettrine reader-cont', 'reader-cont');
  if (aria) el.setAttribute('aria-hidden', 'true');
  el.innerHTML = html;
  return el;
}

// Coupe un HTML de paragraphe après n mots, en refermant / rouvrant l'italique si besoin.
function splitWords(words, n) {
  let head = words.slice(0, n).join(' ');
  let tail = words.slice(n).join(' ');
  const open = (head.match(/<em>/g) || []).length - (head.match(/<\/em>/g) || []).length;
  if (open > 0) {
    head += '</em>';
    tail = '<em>' + tail;
  }
  return [head, tail];
}

// Répartit les feuilles sur des pages de la taille de `measure` (une page vide, invisible).
// Chaque page garde son point de départ (feuille, mot) pour retrouver la position après un redimensionnement.
function paginate(leaves, measure) {
  const pages = [];
  let anchor = { leaf: 0, word: 0 };
  const fits = () => measure.scrollHeight <= measure.clientHeight + 1;
  const pushPage = () => {
    pages.push({ html: measure.innerHTML, anchor });
    measure.innerHTML = '';
  };

  leaves.forEach((leaf, i) => {
    if ((leaf.breakBefore || leaf.alone) && measure.childElementCount) pushPage();
    if (!measure.childElementCount) anchor = { leaf: i, word: 0 };
    if (leaf.alone) {
      measure.appendChild(leafNode(leaf));
      pushPage();
      return;
    }
    let el = measure.appendChild(leafNode(leaf));
    if (fits()) return;
    if (!leaf.split) {
      el.remove();
      pushPage();
      anchor = { leaf: i, word: 0 };
      measure.appendChild(leafNode(leaf));
      return;
    }
    // Paragraphe trop long : on remplit la page au mot près, puis on continue sur la suivante.
    let words = leaf.html.split(' ');
    let offset = 0;
    let cont = false;
    while (!fits()) {
      el.remove();
      let lo = 0;
      let hi = words.length;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        const probe = measure.appendChild(leafNode({ ...leaf, html: splitWords(words, mid)[0] }, cont));
        const ok = fits();
        probe.remove();
        if (ok) lo = mid;
        else hi = mid - 1;
      }
      if (lo === 0 && !measure.childElementCount) lo = 1; // page vide trop petite : on avance quand même
      if (lo > 0) {
        const [head, tail] = splitWords(words, lo);
        measure.appendChild(leafNode({ ...leaf, html: head }, cont));
        words = tail.split(' ');
        offset += lo;
        cont = true;
      }
      pushPage();
      anchor = { leaf: i, word: offset };
      el = measure.appendChild(leafNode({ ...leaf, html: words.join(' ') }, cont));
    }
  });
  if (measure.childElementCount) pushPage();
  return pages;
}

// --- Liseuse ----------------------------------------------------------------

export function initBookReader() {
  const root = document.getElementById('book-reader');
  if (!root) return;
  const $ = (name) => root.querySelector(`[data-reader="${name}"]`);
  const stage = $('stage');
  const indicator = $('indicator');
  const progress = $('progress');
  const nightBtn = $('night');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let leaves = null;
  let pages = []; // [{ kind: 'cover' | 'text' | 'end' | 'back', html?, anchor? }]
  let index = 0;
  let lastFocused = null;
  let loading = null;

  // Mode nuit mémorisé pour ce navigateur (sans conséquence si le stockage est indisponible).
  const setNight = (on) => {
    root.classList.toggle('is-night', on);
    nightBtn.setAttribute('aria-pressed', String(on));
    nightBtn.setAttribute('aria-label', on ? 'Désactiver le mode nuit' : 'Activer le mode nuit');
    nightBtn.querySelector('i').className = `fas ${on ? 'fa-sun' : 'fa-moon'}`;
    try {
      localStorage.setItem(NIGHT_KEY, on ? '1' : '0');
    } catch {}
  };
  try {
    setNight(localStorage.getItem(NIGHT_KEY) === '1');
  } catch {
    setNight(false);
  }

  function loadFonts() {
    if (!document.querySelector(`link[href="${FONTS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONTS_URL;
      document.head.appendChild(link);
    }
    const ready = Promise.all([
      document.fonts.load('1em "EB Garamond"'),
      document.fonts.load('italic 1em "EB Garamond"'),
      document.fonts.load('1em "Cinzel"'),
    ]).catch(() => {});
    return Promise.race([ready, new Promise((r) => setTimeout(r, 2500))]);
  }

  function sheetHTML(page) {
    if (page.kind === 'cover') {
      return `
        <picture>
          <source srcset="/images/selena-couverture.webp" type="image/webp" />
          <img src="/images/selena-couverture.jpg" alt="Couverture de Séléna ~ Captive de la tempête ~, tome 1, par Justine Combeau" class="reader-img" />
        </picture>`;
    }
    if (page.kind === 'back') {
      return `
        <picture>
          <source srcset="/images/selena-quatrieme.webp" type="image/webp" />
          <img src="/images/selena-quatrieme.jpg" alt="Quatrième de couverture de Séléna : le 11 novembre, à Sylvenor, une tempête née des émotions d'une enfant détruit tout ; dix ans plus tard, Séléna a appris à tenir ses éléments en cage, mais les mensonges, eux, ne se laissent pas enfermer." class="reader-img" loading="lazy" />
        </picture>`;
    }
    if (page.kind === 'end') {
      return `
        <div class="reader-end">
          <p class="reader-orn" aria-hidden="true">❦</p>
          <h2>La suite bientôt…</h2>
          <p>Le tome 1 est en cours d'écriture et de bêta-lecture. Envie de suivre la tempête de Séléna, ou de me dire ce que vous avez pensé de ce début ?</p>
          <div class="reader-end-actions">
            <a href="#contact" class="btn-primary !px-5 !py-2.5" data-reader-link><i class="fas fa-envelope" aria-hidden="true"></i> Me contacter</a>
            <a href="${INSTAGRAM.href}" target="_blank" rel="noopener" class="btn-secondary !px-5 !py-2.5"><i class="${INSTAGRAM.icon}" aria-hidden="true"></i> Instagram</a>
          </div>
        </div>`;
    }
    return `<div class="reader-text">${page.html}</div>`;
  }

  function buildSheet(page) {
    const sheet = document.createElement('div');
    sheet.className = `reader-sheet reader-sheet-${page.kind}`;
    sheet.innerHTML = sheetHTML(page);
    return sheet;
  }

  function measureBox() {
    const box = document.createElement('div');
    box.className = 'reader-sheet reader-sheet-text reader-measure';
    box.setAttribute('aria-hidden', 'true');
    const text = document.createElement('div');
    text.className = 'reader-text';
    box.appendChild(text);
    stage.appendChild(box);
    return { box, text };
  }

  function layout() {
    const { box, text } = measureBox();
    const textPages = paginate(leaves, text).map((p) => ({ kind: 'text', ...p }));
    box.remove();
    pages = [{ kind: 'cover' }, ...textPages, { kind: 'end' }, { kind: 'back' }];
  }

  function updateChrome() {
    const total = pages.length - 1;
    const page = pages[index];
    indicator.textContent = index === 0 ? 'Couverture' : `${index} / ${total}`;
    indicator.setAttribute('aria-label', index === 0 ? 'Couverture' : `Page ${index} sur ${total}`);
    progress.style.width = `${(index / total) * 100}%`;
    $('prev').disabled = index === 0;
    $('next').disabled = index === pages.length - 1;
    $('cover').disabled = index === 0;
    $('next').classList.toggle('is-cta', index === 0);
    $('next').setAttribute('aria-label', index === 0 ? 'Ouvrir le livre' : 'Page suivante');
    stage.dataset.kind = page.kind;
    stage.setAttribute('aria-label', index === 0 ? 'Couverture, cliquer pour ouvrir le livre' : `Page ${index} sur ${total}`);
  }

  // Animation de page tournée : en avant, l'ancienne page pivote sur son bord gauche et dévoile la suivante ;
  // en arrière, la page précédente revient se poser par-dessus.
  function show(next, { animate = true } = {}) {
    next = Math.max(0, Math.min(pages.length - 1, next));
    const forward = next > index;
    stage.querySelectorAll('.reader-sheet.is-leaving').forEach((s) => s.remove());
    const old = stage.querySelector('.reader-sheet.is-current');
    const sheet = buildSheet(pages[next]);
    sheet.classList.add('is-current');
    index = next;
    updateChrome();

    if (!old || !animate || reduceMotion.matches) {
      old?.remove();
      stage.appendChild(sheet);
      return;
    }
    old.classList.remove('is-current');
    old.classList.add('is-leaving');
    if (forward) {
      stage.insertBefore(sheet, old);
      old.classList.add('turn-out');
      old.addEventListener('animationend', () => old.remove(), { once: true });
    } else {
      stage.appendChild(sheet);
      sheet.classList.add('turn-in');
      sheet.addEventListener('animationend', () => {
        sheet.classList.remove('turn-in');
        old.remove();
      }, { once: true });
    }
  }

  const go = (delta) => show(index + delta);

  async function ensureLoaded() {
    if (leaves) return;
    loading ||= (async () => {
      stage.insertAdjacentHTML('beforeend', '<p class="reader-loading">Ouverture du livre…</p>');
      const [{ default: chapters }] = await Promise.all([import('../data/selena-extrait.json'), loadFonts()]);
      leaves = buildLeaves(chapters);
      stage.querySelector('.reader-loading')?.remove();
    })();
    await loading;
  }

  async function open() {
    lastFocused = document.activeElement;
    root.classList.remove('hidden');
    root.classList.add('flex');
    document.body.style.overflow = 'hidden';
    $('close').focus();
    await ensureLoaded();
    if (!pages.length) {
      layout();
      show(0, { animate: false });
    }
  }

  function close() {
    root.classList.add('hidden');
    root.classList.remove('flex');
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  const isOpen = () => !root.classList.contains('hidden');

  // Re-pagination quand la taille de la page change, en gardant le passage en cours de lecture.
  let resizeTimer;
  new ResizeObserver(() => {
    if (!isOpen() || !leaves) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const page = pages[index];
      layout();
      let target = index;
      if (page.kind === 'text') {
        const a = page.anchor;
        target = 1;
        pages.forEach((p, i) => {
          if (p.kind === 'text' && (p.anchor.leaf < a.leaf || (p.anchor.leaf === a.leaf && p.anchor.word <= a.word))) target = i;
        });
      } else if (page.kind !== 'cover') {
        target = pages.findIndex((p) => p.kind === page.kind);
      }
      stage.querySelector('.reader-sheet.is-current')?.remove();
      index = target;
      show(target, { animate: false });
    }, 150);
  }).observe(stage);

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-book-open]')) open();
  });
  $('close').addEventListener('click', close);
  $('prev').addEventListener('click', () => go(-1));
  $('next').addEventListener('click', () => go(1));
  $('cover').addEventListener('click', () => show(0));
  nightBtn.addEventListener('click', () => setNight(!root.classList.contains('is-night')));
  root.querySelector('.reader-backdrop').addEventListener('click', close);

  // Clic sur la couverture pour ouvrir, sur les bords de la page pour tourner.
  stage.addEventListener('click', (e) => {
    if (!pages.length) return;
    const link = e.target.closest('a');
    if (link) {
      if (link.hasAttribute('data-reader-link')) close();
      return;
    }
    if (index === 0) return go(1);
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    if (x < 0.3) go(-1);
    else if (x > 0.7) go(1);
  });

  // Glisser du doigt sur mobile.
  let touchX = null;
  let touchY = null;
  stage.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Clavier : flèches, Page préc./suiv., Début / Fin, Échap ; Tab reste dans la liseuse.
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') return close();
    if (!pages.length) return;
    const actions = { ArrowRight: 1, PageDown: 1, ArrowLeft: -1, PageUp: -1 };
    if (e.key in actions) {
      e.preventDefault();
      go(actions[e.key]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      show(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      show(pages.length - 1);
    } else if (e.key === 'Tab') {
      const focusables = [...root.querySelectorAll('button:not(:disabled), a[href]')].filter((el) => el.offsetParent);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
