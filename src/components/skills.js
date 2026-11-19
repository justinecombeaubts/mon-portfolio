import skills from '../data/skills.json';
import { icon } from '../lib/icons.js';

// Icône de chaque catégorie de skills.json (clé « icon »).
const ICONS = { 'code-2': 'code', sparkles: 'flow', terminal: 'terminal', palette: 'palette' };
const LEVELS = { projet: 'Utilisé en projet', formation: 'Vu en formation', perso: 'Pratique perso' };

export function renderSkills() {
  const groups = skills
    .map(
      (group, i) => `
      <div class="skill-group reveal" style="--delay:${i * 80}ms">
        <div class="skill-group-head">
          <span class="skill-icon">${icon(ICONS[group.icon] || 'spark', { size: 22 })}</span>
          <h3>${group.category}</h3>
        </div>
        <ul>
          ${group.items
            .map(
              (s) => `
            <li class="skill">
              <span class="skill-name">${s.name}</span>
              <span class="skill-proof">${s.level !== 'projet' ? `<span class="skill-level">${LEVELS[s.level]}</span> · ` : ''}${s.proof.join(', ')}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>`
    )
    .join('');
  return `
  <section id="competences" class="section section-ivory-2" aria-labelledby="skills-title">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow eyebrow-dark reveal">Compétences <span class="eyebrow-line"></span></p>
          <h2 id="skills-title" class="section-title reveal">Une boîte à outils<br /><em>prouvée par les projets.</em></h2>
        </div>
        <p class="section-intro section-intro-dark reveal">Pas de jauges ni de pourcentages : sous chaque compétence, les projets où je l'ai réellement mise en œuvre.</p>
      </div>
      <div class="skills-grid">${groups}</div>
    </div>
  </section>`;
}
