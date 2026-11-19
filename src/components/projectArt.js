// Visuel de couverture d'un projet, dessiné dans la DA (pas de capture d'écran) :
// fond bordeaux teinté par la couleur du projet, réseau de connexions propre au projet,
// motif au trait selon la catégorie (fenêtre web, téléphone, chaîne de workflow) et logo en médaillon.
import { renderNetwork } from './network.js';
import { sparkle } from '../lib/icons.js';

const CATEGORY_SHORT = { 'ia-automation': 'IA & Automation', 'dev-web': 'Web', mobile: 'Mobile' };

// Graine stable à partir de l'identifiant : chaque projet a son propre réseau.
function hash(text) {
  let h = 7;
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) % 2147483646;
  return h + 1;
}

const MOTIFS = {
  'dev-web': `
    <rect x="22" y="12" width="116" height="74" rx="2.5"/>
    <path d="M22 21h116"/>
    <circle cx="27" cy="16.5" r="1"/><circle cx="31" cy="16.5" r="1"/><circle cx="35" cy="16.5" r="1"/>
    <rect x="46" y="15" width="68" height="3" rx="1.5" class="soft"/>
    <path d="M30 32h22M30 37h16M30 42h19" class="soft"/>
    <path d="M108 32h22M114 37h16M111 42h19" class="soft"/>
    <rect x="30" y="64" width="26" height="15" rx="1.5" class="soft"/>
    <rect x="104" y="64" width="26" height="15" rx="1.5" class="soft"/>`,
  mobile: `
    <rect x="61" y="6" width="38" height="80" rx="6"/>
    <path d="M74 10.5h12"/>
    <path d="M73 81h14" class="soft"/>
    <path d="M52 34a24 24 0 0 0 0 28M45 29a32 32 0 0 0 0 38M38 24a40 40 0 0 0 0 48" class="soft"/>
    <path d="M108 34a24 24 0 0 1 0 28M115 29a32 32 0 0 1 0 38M122 24a40 40 0 0 1 0 48" class="soft"/>`,
  'ia-automation': `
    <path d="M62 60V34a18 18 0 0 1 36 0v26"/>
    <ellipse cx="80" cy="34" rx="34" ry="11" class="soft orbit"/>
    <circle cx="113" cy="31" r="1.3" class="dot"/>`,
};

export function renderProjectArt(project, { loading = 'lazy' } = {}) {
  const flow =
    project.category === 'ia-automation' && project.workflow?.length
      ? `<span class="art-flow" style="--steps:${project.workflow.length}">${project.workflow
          .map((s, i) => `<span class="art-node" data-kind="${s.kind}" style="--i:${i}"><i class="fas ${s.icon}" aria-hidden="true"></i></span>`)
          .join('')}</span>`
      : `<span class="art-stack mono">${project.stack.slice(0, 3).join(' · ')}</span>`;
  return `
    <span class="art art--${project.category}" style="--accent:${project.accent || '#48151C'}" role="img" aria-label="Visuel du projet ${project.title}">
      <span class="art-glow" aria-hidden="true"></span>
      ${renderNetwork({ seed: hash(project.id), count: 16, width: 1600, height: 1000, className: 'art-network' })}
      <svg class="art-motif" viewBox="0 0 160 100" aria-hidden="true" focusable="false">${MOTIFS[project.category] || ''}</svg>
      <span class="art-logo" aria-hidden="true"><img src="${project.image}" alt="" loading="${loading}" decoding="async" /></span>
      <span class="art-label mono" aria-hidden="true">${CATEGORY_SHORT[project.category] || ''} · ${project.year}</span>
      ${sparkle({ size: 14, className: 'art-sparkle' })}
      ${flow}
    </span>`;
}
