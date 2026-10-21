import projects from '../data/projects.json';
import { CATEGORIES, renderProjectFilters } from './projects.js';
import { renderProjectCover } from './projectCover.js';
import { renderWorkflow, renderWorkflowLegend } from './workflow.js';
import { renderProjectLinks, renderGallery } from './projectExtras.js';

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

function renderBlock(icon, title, body) {
  return `
    <section>
      <h3 class="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        <i class="fas ${icon} text-brand-500 dark:text-brand-300" aria-hidden="true"></i> ${title}
      </h3>
      ${body}
    </section>`;
}

// Une ligne = un projet : résumé cliquable, détail (et workflow) dépliés au clic.
function renderRow(project) {
  const impact = project.impact
    .map(
      (line) => `<li class="flex gap-2"><i class="fas fa-circle-check mt-0.5 text-brand-500 dark:text-brand-300" aria-hidden="true"></i><span>${line}</span></li>`
    )
    .join('');
  const stack = project.stack.map((t) => `<span class="chip">${t}</span>`).join('');
  const workflow = project.workflow
    ? `<div class="mt-8 rounded-2xl border border-slate-200/70 p-4 sm:p-5 dark:border-white/10">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            <i class="fas fa-diagram-project text-brand-500 dark:text-brand-300" aria-hidden="true"></i> Workflow actif
          </p>
          <div class="flex flex-wrap gap-x-4 gap-y-1">
            ${renderWorkflowLegend([...new Set(project.workflow.map((s) => s.kind))])}
          </div>
        </div>
        ${renderWorkflow(project.workflow, { horizontal: true })}
      </div>`
    : '';

  return `
  <details id="${project.id}" class="project-row card group scroll-mt-24 lg:scroll-mt-8" data-category="${project.category}">
    <summary class="flex cursor-pointer list-none items-center gap-4 p-4 sm:gap-5 sm:p-5 [&::-webkit-details-marker]:hidden">
      <img src="${project.image}" alt="" width="56" height="56" loading="lazy" decoding="async" class="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
      <div class="min-w-0 flex-1">
        <h2 class="font-display text-base font-semibold text-slate-900 sm:text-lg dark:text-white">${project.title}</h2>
        <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400 sm:truncate">${project.tagline}</p>
      </div>
      <div class="hidden shrink-0 items-center gap-2 md:flex">
        ${project.workflow ? '<span class="chip"><i class="fas fa-diagram-project mr-1.5 text-brand-500 dark:text-brand-300"></i>Workflow</span>' : ''}
        ${project.links.demo ? '<span class="chip"><i class="fas fa-globe mr-1.5 text-brand-500 dark:text-brand-300"></i>En ligne</span>' : ''}
        <span class="chip">${CATEGORY_LABELS[project.category]}</span>
      </div>
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-300 group-open:rotate-180 dark:border-white/10 dark:text-slate-300" aria-hidden="true">
        <i class="fas fa-chevron-down text-xs"></i>
      </span>
    </summary>

    <div class="border-t border-slate-200/70 p-5 sm:p-7 dark:border-white/10">
      <div class="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div class="space-y-6 text-sm">
          <p class="section-eyebrow">${project.status || project.year}</p>
          ${renderBlock('fa-briefcase', 'Contexte', `<p class="mt-1.5 text-slate-600 dark:text-slate-400">${project.context}</p>`)}
          ${renderBlock('fa-layer-group', 'Solution', `<p class="mt-1.5 text-slate-600 dark:text-slate-400">${project.solution}</p>`)}
          ${renderBlock('fa-chart-line', 'Résultat &amp; impact', `<ul class="mt-2 space-y-2 text-slate-600 dark:text-slate-400">${impact}</ul>`)}
        </div>
        <div class="space-y-5">
          <div class="overflow-hidden rounded-2xl">${renderProjectCover(project, { variant: 'modal' })}</div>
          ${renderBlock('fa-code', 'Stack', `<div class="mt-2 flex flex-wrap gap-2">${stack}</div>`)}
          <div class="flex flex-wrap items-center gap-3">${renderProjectLinks(project, { compact: true })}</div>
        </div>
      </div>
      ${workflow}
      ${renderGallery(project)}
    </div>
  </details>`;
}

export function renderProjectsPage() {
  return `
  <section id="all-projects" class="pb-24 pt-32 lg:pt-16">
    <div class="container-x">
      <a href="/#projects" class="btn-ghost -ml-4"><i class="fas fa-arrow-left"></i> Retour à l'accueil</a>
      <div class="mt-4">
        <p class="section-eyebrow">Réalisations</p>
        <h1 class="section-title mt-3">Tous mes projets</h1>
        <p class="section-subtitle max-w-2xl">
          ${projects.length} projets en IA &amp; automatisation, développement web et mobile.
          Cliquez sur une ligne pour voir le contexte, la solution, les résultats et, quand il y en a un, le workflow du projet.
        </p>
      </div>

      <div class="mt-10 flex flex-wrap gap-3">${renderProjectFilters({ counts: true })}</div>

      <div class="mt-8 space-y-4">
        ${projects.map(renderRow).join('')}
      </div>

      <p id="projects-empty" class="mt-12 hidden text-center text-slate-500 dark:text-slate-400">
        Aucun projet dans cette catégorie pour le moment.
      </p>
    </div>
  </section>
  `;
}

// Ouvre la ligne visée par l'ancre (/projets.html#route-35), y compris en suivant un lien interne.
export function initProjectRows() {
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const row = id && document.getElementById(id);
    if (!row || !row.classList.contains('project-row')) return;
    row.open = true;
    row.scrollIntoView({ block: 'start' });
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}
