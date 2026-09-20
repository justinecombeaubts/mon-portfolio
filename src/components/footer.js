export function renderFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="border-t border-slate-200/70 py-8 dark:border-white/10">
    <div class="container-x flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
      <p>&copy; ${year} Justine Combeau. Tous droits réservés.</p>
      <p>Conçu avec <i class="fas fa-heart text-brand-500"></i> — HTML, Tailwind CSS &amp; JavaScript.</p>
    </div>
  </footer>
  `;
}
