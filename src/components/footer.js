import { NAV, SOCIALS } from '../lib/site.js';
import { icon } from '../lib/icons.js';

export function renderFooter({ page = 'home' } = {}) {
  const base = page === 'home' ? '' : '/';
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container footer-inner">
      <a href="/" class="logo logo-dark" aria-label="Justine Combeau, retour à l'accueil">J<span>.</span></a>
      <nav aria-label="Pied de page">
        <ul class="footer-nav">
          ${NAV.map((l) => `<li><a href="${base}#${l.id}">${l.label}</a></li>`).join('')}
          <li><a href="/projets.html">Tous les projets</a></li>
        </ul>
      </nav>
      <ul class="footer-socials">
        ${SOCIALS.map((s) => `<li><a href="${s.href}" target="_blank" rel="me noopener" aria-label="${s.label}">${icon(s.icon, { size: 18 })}</a></li>`).join('')}
        <li><a href="mailto:justine.combeau.bts@gmail.com" aria-label="Email">${icon('mail', { size: 18 })}</a></li>
      </ul>
    </div>
    <div class="container footer-bottom">
      <p>© ${year} Justine Combeau · <a href="/mentions-legales.html">Mentions légales</a></p>
      <p class="mono">Conçu et codé avec soin · Vite &amp; JavaScript</p>
    </div>
  </footer>`;
}
