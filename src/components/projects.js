import projects from '../data/projects.json';
import { renderProjectCover } from './projectCover.js';

export const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'ia-automation', label: 'IA & Automation' },
  { id: 'dev-web', label: 'Développement Web' },
  { id: 'mobile', label: 'Mobile' },
];

function renderCard(project) {
  const stack = project.stack
    .slice(0, 3)
    .map((t) => `<span class="chip">${t}</span>`)
    .join('');
  const extra = project.stack.length > 3 ? `<span class="chip">+${project.stack.length - 3}</span>` : '';

  return `
  <article
    class="project-card card group flex flex-col overflow-hidden"
    data-category="${project.category}"
  >
    <button type="button" data-project-open="${project.id}" class="block overflow-hidden text-left">
      <div class="relative">
        ${renderProjectCover(project)}
        <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft dark:bg-ink/70 dark:text-slate-100">
          ${project.status || project.year}
        </span>
        ${
          project.workflow
            ? `<span class="absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-white shadow-soft">
                <i class="fas fa-diagram-project mr-1"></i>Workflow
              </span>`
            : ''
        }
      </div>
    </button>

    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-display text-lg font-semibold text-slate-900 dark:text-white">
        ${project.title}
      </h3>
      <p class="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">${project.tagline}</p>

      <div class="mt-4 flex flex-wrap gap-2">${stack}${extra}</div>

      <div class="mt-6 flex items-center justify-between">
        <button
          type="button"
          data-project-open="${project.id}"
          class="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
        >
          Voir la fiche <i class="fas fa-arrow-right ml-1"></i>
        </button>
        ${
          project.links.demo
            ? `<a href="${project.links.demo}" target="_blank" rel="noopener" aria-label="Ouvrir le site de ${project.title}" class="text-slate-400 hover:text-brand-600 dark:hover:text-brand-300">
                <i class="fas fa-arrow-up-right-from-square"></i>
              </a>`
            : `<span class="text-slate-300 dark:text-slate-600" title="${project.status || 'Projet privé'}"><i class="fas fa-lock"></i></span>`
        }
      </div>
    </div>
  </article>`;
}

export function renderProjectFilters({ counts = false } = {}) {
  return CATEGORIES.map((c, i) => {
    const n = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length;
    return `
    <button type="button" class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c.id}">
      ${c.label}${counts ? ` <span class="ml-1 opacity-60">${n}</span>` : ''}
    </button>`;
  }).join('');
}

// Accueil : seulement les projets mis en avant (`featured` dans projects.json),
// la liste complète est sur projets.html.
export function renderProjects() {
  const cards = projects.filter((p) => p.featured).map(renderCard).join('');

  return `
  <section id="projects" class="py-24">
    <div class="container-x">
      <div class="text-center">
        <p class="section-eyebrow justify-center">Réalisations</p>
        <h2 class="section-title mt-3">Mes projets</h2>
        <p class="section-subtitle mx-auto max-w-xl">
          Une sélection de projets en développement web, IA et automatisation.
        </p>
        <p class="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">
          Ils sont nés depuis un an de mes tests et de mes recherches sur l'IA et l'automatisation :
          une façon de découvrir de nouvelles choses en les essayant vraiment.
        </p>
      </div>

      <div class="mt-12 grid gap-7 sm:grid-cols-2">
        ${cards}
      </div>

      <div class="mt-12 text-center">
        <a href="/projets.html" class="btn-primary">
          Voir les ${projects.length} projets <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
  `;
}

// Filtres par catégorie de la page projets (lignes `[data-category]`).
export function initProjectFilters() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.project-row');
  const empty = document.getElementById('projects-empty');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount += 1;
      });
      empty.classList.toggle('hidden', visibleCount !== 0);
    });
  });
}
