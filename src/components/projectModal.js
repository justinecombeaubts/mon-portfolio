import projects from '../data/projects.json';
import { renderWorkflow } from './workflow.js';

function renderLinks(project) {
  const buttons = [];
  if (project.links.demo) {
    buttons.push(
      `<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn-primary">
        <i class="fas fa-arrow-up-right-from-square"></i> Voir le site
      </a>`
    );
  }
  if (project.links.code) {
    buttons.push(
      `<a href="${project.links.code}" target="_blank" rel="noopener" class="btn-secondary">
        <i class="fab fa-github"></i> Voir le code
      </a>`
    );
  }
  if (!buttons.length) {
    buttons.push(
      `<span class="btn-secondary cursor-default opacity-70">
        <i class="fas fa-lock"></i> ${project.status || 'Projet privé'}
      </span>`
    );
  }
  return buttons.join('');
}

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
    <div class="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-0 shadow-soft dark:bg-ink-panel">
      <button
        type="button"
        id="modal-close"
        aria-label="Fermer la fiche projet"
        class="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-soft hover:text-brand-600 dark:bg-white/10 dark:text-slate-200"
      >
        <i class="fas fa-xmark"></i>
      </button>
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
    <div class="h-40 w-full overflow-hidden sm:h-52">
      <img src="${project.screenshot || project.image}" alt="${project.title}" class="h-full w-full object-cover object-top" />
    </div>
    <div class="p-6 sm:p-8">
      <p class="section-eyebrow">${project.status || project.year}</p>
      <h3 id="modal-title" class="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-white">
        ${project.title}
      </h3>
      <p class="mt-1 text-brand-600 dark:text-brand-300">${project.tagline}</p>

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
          <p class="mt-3 text-slate-600 dark:text-slate-400">${project.solution}</p>
          ${workflow}
        </section>

        <section>
          <p class="font-semibold text-slate-800 dark:text-slate-100">
            <i class="fas fa-chart-line text-brand-500 dark:text-brand-300"></i> Résultat &amp; impact
          </p>
          <ul class="mt-2 space-y-2 text-slate-600 dark:text-slate-400">${impact}</ul>
        </section>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">${renderLinks(project)}</div>
    </div>
  `;
}

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  let lastFocused = null;

  function open(id) {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    content.innerHTML = projectDetailHTML(project);
    lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-open]');
    if (trigger) open(trigger.dataset.projectOpen);
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
}
