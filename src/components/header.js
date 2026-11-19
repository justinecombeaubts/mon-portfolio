import { NAV, CONTACT } from '../lib/site.js';
import { icon } from '../lib/icons.js';

// page : 'home' (ancres locales) ou autre (ancres vers l'accueil).
export function renderHeader({ page = 'home' } = {}) {
  const base = page === 'home' ? '' : '/';
  const links = NAV.map((l) => `<li><a href="${base}#${l.id}" class="nav-link" data-nav="${l.id}">${l.label}</a></li>`).join('');
  const mobileLinks = NAV.map(
    (l, i) => `<li style="--i:${i}"><a href="${base}#${l.id}" class="mobile-link"><span class="mono">0${i + 1}</span>${l.label}</a></li>`
  ).join('');
  return `
  <a href="#main" class="skip-link">Aller au contenu</a>
  <header class="site-header" data-header>
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="Justine Combeau, retour à l'accueil">J<span>.</span></a>
      <nav aria-label="Navigation principale" class="nav-desktop">
        <ul>${links}</ul>
      </nav>
      <a href="${CONTACT.cv}" download class="btn btn-outline btn-sm header-cv">Télécharger mon CV ${icon('download', { size: 15 })}</a>
      <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span class="sr-only">Ouvrir le menu</span>
        <span class="menu-bars" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
    <div id="mobile-menu" class="mobile-menu" data-mobile-menu hidden>
      <nav aria-label="Navigation mobile">
        <ul>${mobileLinks}</ul>
      </nav>
      <a href="${CONTACT.cv}" download class="btn btn-outline">Télécharger mon CV ${icon('download', { size: 15 })}</a>
    </div>
  </header>`;
}

export function initHeader() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) menu.hidden = false;
    else setTimeout(() => !header.classList.contains('menu-open') && (menu.hidden = true), 350);
  };
  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  // Le menu bloque le défilement de la page : on le ferme d'abord, puis on rejoint l'ancre.
  menu?.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    setOpen(false);
    const target = link.hash && document.getElementById(link.hash.slice(1));
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', link.hash);
    target.scrollIntoView({ behavior: 'smooth' });
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && header.classList.contains('menu-open') && setOpen(false));

  // Lien actif selon la section visible (accueil uniquement).
  const links = [...document.querySelectorAll('[data-nav]')];
  // Toutes les sections de la page : celles hors menu (workflows, roman) n'activent aucun lien.
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((l) => l.classList.toggle('is-active', l.dataset.nav === entry.target.id));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
