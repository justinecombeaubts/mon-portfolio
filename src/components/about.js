import { icon, sparkle } from '../lib/icons.js';

const METHOD = [
  ['Comprendre', "Cerner le besoin réel avant d'écrire la moindre ligne de code."],
  ['Construire', 'Un code propre, testé et documenté, pensé pour durer.'],
  ["Coder avec l'IA", 'Les assistants IA sont mes binômes : je cadre, je relis, je teste, et chaque choix technique reste le mien.'],
  ['Automatiser', 'Repérer ce qui peut être fiabilisé par un script, un workflow ou un agent IA.'],
  ['Livrer & apprendre', 'Récolter les retours, itérer, documenter les décisions.'],
];

const QUALITIES = ['Rigueur', 'Autodidacte', 'Pédagogie', 'Gestion du stress', "Travail d'équipe"];

export function renderAbout() {
  const steps = METHOD.map(
    ([title, text], i) => `
      <li class="method-step reveal" style="--delay:${i * 70}ms">
        <span class="method-num">0${i + 1}</span>
        <div><p class="method-title">${title}</p><p class="method-text">${text}</p></div>
      </li>`
  ).join('');
  return `
  <section id="a-propos" class="section section-light section-about" aria-labelledby="about-title">
    <div class="container about-grid">
      <div class="about-visual reveal">
        <div class="arch-outline arch-outline--left" aria-hidden="true"></div>
        <div class="arch arch-illu">
          <picture>
            <source srcset="/images/da/silhouette.webp" type="image/webp" />
            <img src="/images/da/silhouette.jpg" alt="Illustration de Justine : manteau long, livres sous le bras et tote bag à croissant de lune" width="640" height="960" loading="lazy" decoding="async" />
          </picture>
        </div>
        ${sparkle({ size: 24, className: 'about-sparkle' })}
      </div>

      <div class="about-text">
        <p class="eyebrow eyebrow-dark reveal">À propos <span class="eyebrow-line"></span></p>
        <h2 id="about-title" class="section-title reveal">Curieuse, rigoureuse<br /><em>et tournée vers l'utile.</em></h2>
        <div class="prose reveal">
          <p>Diplômée d'un <strong>BTS Informatique Développement</strong>, j'ai appris le web par la pratique avant de choisir d'aller plus loin&nbsp;: je suis aujourd'hui en <strong>Bachelor 3 IA &amp; Automation</strong> à Digital Campus Paris, pour connecter mes applications à des agents IA et à des automatisations (n8n, Make, GitHub Actions).</p>
          <p>Mon profil est polyvalent&nbsp;: à l'aise sur le développement web classique (HTML/CSS/JS, PHP, SQL) comme sur des architectures orientées données et IA (Supabase, LLM, scripts planifiés). Mes expériences de terrain, maître nageur sauveteur et service civique en accueil informatique, m'ont appris le sang-froid, la pédagogie et le sens du service.</p>
        </div>
        <ul class="qualities reveal" aria-label="Mes qualités">${QUALITIES.map((q) => `<li>${q}</li>`).join('')}</ul>
        <a href="#contact" class="btn btn-solid reveal">Travaillons ensemble ${icon('arrow', { size: 16 })}</a>
      </div>

      <div class="method">
        <p class="eyebrow eyebrow-dark">Ma méthode</p>
        <ol>${steps}</ol>
      </div>
    </div>
  </section>`;
}
