import projects from '../data/projects.json';
import { renderWorkflow } from './workflow.js';
import { renderProjectCover } from './projectCover.js';
import { renderProjectLinks, renderGallery, renderSolution, renderProjectFacts, renderProjectDetails } from './projectExtras.js';

export function renderProjectModal() {
  return `
  <div
    id="project-modal"
    class="fixed inset-0 z-[60] hidden items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div id="modal-backdrop" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    <div id="modal-panel" class="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-0 shadow-soft dark:bg-ink-panel">
      <div class="sticky top-0 z-10 h-0">
        <button
          type="button"
          id="modal-close"
          data-modal-close
          aria-label="Retour aux projets"
          class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-soft ring-1 ring-slate-200 backdrop-blur hover:text-brand-600 dark:ring-white/20 dark:bg-ink-panel/90 dark:text-slate-100 dark:hover:text-brand-300"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          <span>Projets</span>
        </button>
      </div>
      <div id="modal-content"></div>
    </div>
  </div>
  `;
}

function projectDetailHTML(project) {
  const stack = project.stack.map((t) => `<span class="chip">${t}</span>`).join('');
  const impact = project.impact
    .map(
      (line) => `<li class="flex gap-2"><i class="fas fa-circle-check mt-0.5 text-brand-500 dark:text-brand-300" aria-hidden="true"></i><span>${line}</span></li>`
    )
    .join('');
  const workflow = project.workflow
    ? `<div class="mt-5 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Workflow</p>
        ${renderWorkflow(project.workflow)}
      </div>`
    : '';
  return `
    ${renderProjectCover(project, { variant: 'modal' })}
    <div class="p-6 sm:p-8">
      <p class="section-eyebrow">${project.status || project.year}</p>
      <h3 id="modal-title" class="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">
        ${project.title}
      </h3>
      <p class="mt-1 text-brand-600 dark:text-brand-300">${project.tagline}</p>
      ${project.subtitle ? `<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${project.subtitle}</p>` : ''}
      ${project.facts ? `<div class="mt-5">${renderProjectFacts(project)}</div>` : ''}

      <div class="mt-6 space-y-6 text-sm">
        <section>
          <p class="font-semibold text-slate-800 dark:text-slate-100">
            <i class="fas fa-briefcase text-brand-500 dark:text-brand-300"></i> Contexte
          </p>
          <p class="mt-1 text-slate-600 dark:text-slate-400">${project.context}</p>
        </section>

        <section>
          <p class="font-semibold text-slate-800 dark:text-slate-100">
            <i class="fas fa-layer-group text-brand-500 dark:text-brand-300"></i> Stack
          </p>
          <div class="mt-2 flex flex-wrap gap-2">${stack}</div>
          <div class="mt-3 text-slate-600 dark:text-slate-400">${renderSolution(project)}</div>
          ${workflow}
        </section>

        <section>
          <p class="font-semibold text-slate-800 dark:text-slate-100">
            <i class="fas fa-chart-line text-brand-500 dark:text-brand-300"></i> Résultat &amp; impact
          </p>
          <ul class="mt-2 space-y-2 text-slate-600 dark:text-slate-400">${impact}</ul>
        </section>
      </div>

      ${renderProjectDetails(project)}

      ${renderGallery(project)}

      <div class="mt-8 flex flex-wrap items-center gap-3">${renderProjectLinks(project)}</div>

      <div class="mt-8 border-t border-slate-200/70 pt-6 dark:border-white/10">
        <button
          type="button"
          data-modal-close
          class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-slate-200 dark:hover:text-brand-300 sm:w-auto"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Retour aux projets
        </button>
      </div>
    </div>
  `;
}

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  const panel = document.getElementById('modal-panel');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  let lastFocused = null;

  const isOpen = () => !modal.classList.contains('hidden');

  function open(id) {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    content.innerHTML = projectDetailHTML(project);
    lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    // Une entrée d'historique : le bouton retour du téléphone ferme la fiche
    // au lieu de quitter le site.
    if (!history.state?.projectModal) history.pushState({ projectModal: id }, '');
    closeBtn.focus({ preventScroll: true });
  }

  function hide() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }

  function close() {
    if (!isOpen()) return;
    if (history.state?.projectModal) history.back(); // déclenche popstate puis hide()
    else hide();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-open]');
    if (trigger) open(trigger.dataset.projectOpen);
    else if (e.target.closest('[data-modal-close]')) close();
  });

  window.addEventListener('popstate', () => {
    if (isOpen()) hide();
  });

  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
}
