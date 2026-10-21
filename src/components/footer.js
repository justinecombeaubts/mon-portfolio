export function renderFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="border-t border-slate-200/70 py-8 dark:border-white/10">
    <div class="container-x flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
      <p>
        &copy; ${year} Justine Combeau. Tous droits réservés. ·
        <a href="/mentions-legales.html" class="hover:text-brand-600 dark:hover:text-brand-300">Mentions légales</a>
      </p>
      <p class="flex gap-4">
        <a href="https://www.linkedin.com/in/justine-combeau/" target="_blank" rel="me noopener" class="hover:text-brand-600 dark:hover:text-brand-300">LinkedIn</a>
        <a href="https://www.instagram.com/nocturne.tech_/" target="_blank" rel="me noopener" class="hover:text-brand-600 dark:hover:text-brand-300">@nocturne.tech_</a>
        <a href="https://github.com/justinecombeaubts" target="_blank" rel="me noopener" class="hover:text-brand-600 dark:hover:text-brand-300">GitHub</a>
      </p>
      <p>Conçu avec <i class="fas fa-heart text-brand-500 dark:text-brand-300"></i> | HTML, Tailwind CSS &amp; JavaScript.</p>
    </div>
  </footer>
  `;
}
