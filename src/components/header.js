const NAV_LINKS = [
  { href: '#home', label: 'Accueil', icon: 'fa-house' },
  { href: '#about', label: 'À propos', icon: 'fa-user' },
  { href: '#skills', label: 'Compétences', icon: 'fa-code' },
  { href: '#workflows', label: 'Workflows', icon: 'fa-diagram-project' },
  { href: '#projects', label: 'Projets', icon: 'fa-folder-open' },
  { href: '#timeline', label: 'Parcours', icon: 'fa-route' },
  { href: '#book', label: 'Livre', icon: 'fa-book-open' },
  { href: '#contact', label: 'Contact', icon: 'fa-envelope' },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/justine-combeau/', label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
  { href: 'https://github.com/justinecombeaubts', label: 'GitHub', icon: 'fab fa-github' },
  { href: 'https://www.instagram.com/nocturne.tech_/', label: 'Instagram', icon: 'fab fa-instagram' },
];

const themeButton = (extra = '') => `
  <button
    type="button"
    data-theme-toggle
    aria-label="Basculer le thème clair / sombre"
    class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-brand-300 ${extra}"
  >
    <i data-theme-icon class="fas fa-sun"></i>
  </button>`;

// Grand écran : colonne fixe à gauche (photo, liens, réseaux).
// Téléphone et tablette : barre du haut avec menu déroulant.
// page 'projets' : les ancres renvoient vers l'accueil et « Projets » vers projets.html.
export function renderHeader({ page = 'home' } = {}) {
  const onHome = page === 'home';
  const items = NAV_LINKS.map((l) => {
    if (onHome) return { ...l, active: false };
    if (l.href === '#projects') return { ...l, href: '/projets.html', active: true };
    return { ...l, href: `/${l.href}`, active: false };
  });
  const homeHref = onHome ? '#home' : '/';
  const sideLinks = items.map(
    (l) => `<a href="${l.href}" class="side-link${l.active ? ' active' : ''}"${l.active ? ' aria-current="page"' : ''} data-nav-link>
        <i class="fas ${l.icon} w-5 text-center" aria-hidden="true"></i>${l.label}
      </a>`
  ).join('');

  const mobileLinks = items.map(
    (l) => `<a href="${l.href}" class="block py-3 text-base font-medium text-slate-600 dark:text-slate-200" data-nav-link data-mobile-link>${l.label}</a>`
  ).join('');

  const socials = SOCIALS.map(
    (s) => `<a href="${s.href}" target="_blank" rel="me noopener" aria-label="${s.label}" class="social-icon !h-9 !w-9 text-sm"><i class="${s.icon}"></i></a>`
  ).join('');

  return `
  <aside class="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col overflow-y-auto border-r border-slate-200/70 bg-white/80 px-6 py-6 backdrop-blur lg:flex dark:border-white/10 dark:bg-ink-panel/60">
    <a href="${homeHref}" class="flex flex-col items-center text-center">
      <picture>
        <source srcset="/images/photo-pro.webp" type="image/webp" />
        <img src="/images/photo-pro.jpg" alt="Photo de Justine Combeau" width="112" height="112"
          class="h-24 w-24 rounded-full object-cover ring-2 ring-brand-300 ring-offset-4 ring-offset-white dark:ring-offset-ink-panel" />
      </picture>
      <span class="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">Justine Combeau</span>
      <span class="mt-1 text-xs text-slate-500 dark:text-slate-400">Développeuse web · IA &amp; Automation</span>
    </a>
    <span class="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-300/10 dark:text-brand-200">
      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> En recherche d'alternance
    </span>

    <nav class="mt-6 flex flex-col gap-0.5" aria-label="Navigation principale">
      ${sideLinks}
    </nav>

    <div class="mt-auto space-y-4 pt-6">
      <a href="/cv/CV_JustineCombeau.pdf" download class="btn-secondary w-full !py-2.5">
        <i class="fas fa-file-arrow-down"></i> Mon CV
      </a>
      <div class="flex items-center justify-between">
        <div class="flex gap-2">${socials}</div>
        ${themeButton('!h-9 !w-9')}
      </div>
    </div>
  </aside>

  <header id="site-header" class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 lg:hidden">
    <div class="container-x flex h-20 items-center justify-between">
      <a href="${homeHref}" class="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
        <img src="/images/logo.png" alt="Logo Justine Combeau" width="36" height="36" class="h-9 w-9 rounded-full object-cover" />
        Justine<span class="text-brand-500 dark:text-brand-300">.</span>
      </a>

      <div class="flex items-center gap-3">
        ${themeButton()}
        <button
          type="button"
          id="mobile-menu-btn"
          aria-label="Ouvrir le menu"
          aria-expanded="false"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-200"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="hidden border-t border-slate-200/70 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-ink/95">
      <div class="container-x divide-y divide-slate-200/70 dark:divide-white/10">
        ${mobileLinks}
      </div>
    </div>
  </header>
  `;
}

export function initHeader() {
  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  const applyScrollStyle = () => {
    const scrolled = window.scrollY > 12;
    header.classList.toggle('bg-white/90', scrolled);
    header.classList.toggle('backdrop-blur', scrolled);
    header.classList.toggle('shadow-soft', scrolled);
    header.classList.toggle('dark:bg-ink/85', scrolled);
  };
  applyScrollStyle();
  window.addEventListener('scroll', applyScrollStyle, { passive: true });

  menuBtn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    menuBtn.querySelector('i').className = isOpen ? 'fas fa-bars' : 'fas fa-xmark';
  });

  navLinks.forEach((link) => {
    if (link.dataset.mobileLink !== undefined) {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.querySelector('i').className = 'fas fa-bars';
      });
    }
  });

  // Surbrillance du lien actif au scroll (accueil seulement : ailleurs, le lien actif est fixe)
  if (![...navLinks].some((l) => l.getAttribute('href').startsWith('#'))) return;
  const sections = [...document.querySelectorAll('section[id]')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
