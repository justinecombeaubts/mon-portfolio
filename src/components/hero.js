import { CONTACT, STATS } from '../lib/site.js';
import { icon, sparkle } from '../lib/icons.js';
import { renderNetwork } from './network.js';

export function renderHero() {
  const stats = STATS.map(
    (s) => `<li><span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span></li>`
  ).join('');
  return `
  <section class="hero section-dark" aria-labelledby="hero-title">
    ${renderNetwork({ className: 'hero-network' })}
    <div class="container hero-grid">
      <div class="hero-text">
        <p class="eyebrow intro">Bachelor 3 IA &amp; Automation <span class="eyebrow-line"></span></p>
        <h1 id="hero-title" class="hero-title intro" style="--delay:80ms">
          Bonjour,<br /><em>je suis Justine.</em>
        </h1>
        <p class="hero-lead intro" style="--delay:160ms">
          Développeuse web passionnée d'intelligence artificielle et d'automatisation&nbsp;: je conçois des
          applications, puis je les connecte à des workflows et à des agents IA encadrés, pour des outils
          plus efficaces et plus humains.
        </p>
        <div class="hero-actions intro" style="--delay:240ms">
          <a href="#projets" class="btn btn-outline">Découvrir mes projets ${icon('arrow', { size: 16 })}</a>
          <a href="#contact" class="link-underline">Me contacter</a>
        </div>
        <ul class="hero-meta intro" style="--delay:320ms">
          <li>${icon('pin', { size: 15 })} ${CONTACT.city}</li>
          <li><span class="status-dot" aria-hidden="true"></span> Alternance : disponible immédiatement</li>
        </ul>
      </div>

      <div class="hero-visual intro" style="--delay:200ms">
        <div class="arch-outline" aria-hidden="true"></div>
        <div class="arch arch-photo">
          <picture>
            <source srcset="/images/da/portrait.webp" type="image/webp" />
            <img src="/images/da/portrait.jpg" alt="Portrait de Justine Combeau" width="720" height="868" fetchpriority="high" decoding="async" />
          </picture>
        </div>
        ${sparkle({ size: 26, className: 'hero-sparkle' })}
        ${sparkle({ size: 12, className: 'hero-sparkle hero-sparkle--small' })}
        <div class="motto" aria-label="Ma façon de travailler : le code calcule, l'IA restitue, l'humain valide">
          <p class="motto-title mono">Ma méthode</p>
          <ol class="motto-steps" aria-hidden="true">
            <li><span class="motto-dot"></span>le code calcule</li>
            <li><span class="motto-dot"></span>l'IA restitue</li>
            <li><span class="motto-dot"></span>l'humain valide</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="stats" aria-label="Chiffres clés">
    <ul class="container stats-list">${stats}</ul>
  </section>`;
}
