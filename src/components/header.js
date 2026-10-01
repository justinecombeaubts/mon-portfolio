const NAV_LINKS = [
  { href: '#home', label: 'Accueil' },
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#workflows', label: 'Workflows' },
  { href: '#projects', label: 'Projets' },
  { href: '#timeline', label: 'Parcours' },
  { href: '#book', label: 'Livre' },
  { href: '#contact', label: 'Contact' },
];

export function renderHeader() {
  const links = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="nav-link" data-nav-link>${l.label}</a>`
  ).join('');

  const mobileLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="block py-3 text-base font-medium text-slate-600 dark:text-slate-200" data-nav-link data-mobile-link>${l.label}</a>`
  ).join('');

  return `
  <header id="site-header" class="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
    <div class="container-x flex h-20 items-center justify-between">
      <a href="#home" class="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
        <img src="/images/logo.png" alt="Logo Justine Combeau" width="36" height="36" class="h-9 w-9 rounded-full object-cover" />
        Justine<span class="text-brand-500 dark:text-brand-300">.</span>
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        ${links}
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          data-theme-toggle
          aria-label="Basculer le thème clair / sombre"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-brand-300"
        >
          <i id="theme-icon" class="fas fa-sun"></i>
        </button>
        <button
          type="button"
          id="mobile-menu-btn"
          aria-label="Ouvrir le menu"
          aria-expanded="false"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 md:hidden dark:border-white/10 dark:text-slate-200"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="hidden border-t border-slate-200/70 bg-white/95 backdrop-blur md:hidden dark:border-white/10 dark:bg-ink/95">
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

  // Surbrillance du lien actif au scroll
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
