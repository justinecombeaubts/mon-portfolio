// Schéma d'un workflow : étapes reliées par un fil fin où circule une impulsion.
// kind : source | process | ai | human | output (données de projects.json).
export const KIND_LABELS = {
  source: 'Déclencheur',
  process: 'Traitement',
  ai: 'IA',
  human: 'Validation humaine',
  output: 'Sortie',
};

export function renderWorkflow(steps, { className = '' } = {}) {
  const items = steps
    .map(
      (s, i) => `
      <li class="flow-step" data-kind="${s.kind}" style="--i:${i}">
        <span class="flow-node"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
        <span class="flow-kind mono">${KIND_LABELS[s.kind] || s.kind}</span>
        <span class="flow-label">${s.label}</span>
        <span class="flow-detail">${s.detail}</span>
      </li>`
    )
    .join('');
  return `<ol class="flow ${className}" style="--steps:${steps.length}">${items}</ol>`;
}
