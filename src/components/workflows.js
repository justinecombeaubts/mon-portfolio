import projects from '../data/projects.json';
import { renderWorkflow, renderWorkflowLegend } from './workflow.js';

function renderWorkflowCard(project) {
  return `
  <article class="card p-6 sm:p-7">
    <div class="grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-center">
      <div>
        <div class="flex items-center gap-3">
          <img src="${project.image}" alt="" class="h-11 w-11 rounded-xl object-cover" />
          <span class="chip">${project.status || project.year}</span>
        </div>
        <h3 class="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">${project.title}</h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">${project.tagline}</p>
        <button
          type="button"
          data-project-open="${project.id}"
          class="mt-4 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
        >
          Voir la fiche <i class="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
      ${renderWorkflow(project.workflow, { horizontal: true })}
    </div>
  </article>`;
}

export function renderWorkflows() {
  const cards = projects.filter((p) => p.workflow).map(renderWorkflowCard).join('');
  const kinds = [...new Set(projects.filter((p) => p.workflow).flatMap((p) => p.workflow.map((s) => s.kind)))];

  return `
  <section id="workflows" class="bg-slate-50/70 py-24 dark:bg-white/[0.02]">
    <div class="container-x">
      <div class="text-center">
        <p class="section-eyebrow justify-center">IA &amp; Automation</p>
        <h2 class="section-title mt-3">Mes workflows en action</h2>
        <p class="section-subtitle mx-auto max-w-2xl">
          Le trajet de la donnée, du déclencheur au résultat : ce qui est automatisé, où l'IA intervient
          et où un humain garde la main.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          ${renderWorkflowLegend(kinds)}
        </div>
      </div>

      <div class="mt-10 space-y-6">${cards}</div>
    </div>
  </section>
  `;
}
