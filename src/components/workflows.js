// « Mes workflows en action » : un onglet par projet automatisé, schéma animé à droite.
import { projects } from '../lib/site.js';
import { renderWorkflow } from './workflow.js';
import { renderNetwork } from './network.js';

const withFlow = projects.filter((p) => p.workflow?.length);

export function renderWorkflows() {
  const tabs = withFlow
    .map(
      (p, i) => `
      <li role="presentation">
        <button type="button" role="tab" id="tab-${p.id}" aria-controls="panel-${p.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" class="flow-tab">
          <span class="mono">0${i + 1}</span>
          <span class="flow-tab-title">${p.title}</span>
        </button>
      </li>`
    )
    .join('');
  const panels = withFlow
    .map(
      (p, i) => `
      <div role="tabpanel" id="panel-${p.id}" aria-labelledby="tab-${p.id}" class="flow-panel" ${i === 0 ? '' : 'hidden'}>
        <p class="flow-panel-tagline">${p.tagline}</p>
        ${renderWorkflow(p.workflow)}
        <p class="flow-panel-stack mono">${p.stack.join(' · ')}</p>
      </div>`
    )
    .join('');
  return `
  <section id="workflows" class="section section-noir" aria-labelledby="workflows-title">
    ${renderNetwork({ seed: 21, count: 26, className: 'section-network' })}
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow reveal">Automatisation <span class="eyebrow-line"></span></p>
          <h2 id="workflows-title" class="section-title reveal">Mes workflows<br /><em>en action.</em></h2>
        </div>
        <p class="section-intro reveal">Chaque étape a un rôle clair : un déclencheur, des traitements fiables, l'IA là où elle apporte quelque chose, et une validation humaine quand l'enjeu le demande.</p>
      </div>
      <div class="flows">
        <ul class="flow-tabs" role="tablist" aria-label="Projets automatisés">${tabs}</ul>
        <div class="flow-panels">${panels}</div>
      </div>
    </div>
  </section>`;
}

export function initWorkflowTabs() {
  const tabs = [...document.querySelectorAll('.flow-tab')];
  if (!tabs.length) return;
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
}
