// Page projets : tous les projets, filtrables par catégorie ; chaque ligne se déplie sur sa fiche.
// Lien direct vers un projet : /projets.html#<id>.
import { projects, CATEGORIES, CATEGORY_LABEL } from '../lib/site.js';
import { icon } from '../lib/icons.js';
import { renderNetwork } from './network.js';
import { renderProjectDetail } from './projectDetail.js';

function renderRow(project, i) {
  return `
  <details id="${project.id}" class="project-row" data-category="${project.category}">
    <summary>
      <span class="row-num mono">${String(i + 1).padStart(2, '0')}</span>
      <img src="${project.image}" alt="" width="48" height="48" loading="lazy" decoding="async" class="row-logo" />
      <span class="row-text">
        <span class="row-title">${project.title}</span>
        <span class="row-tagline">${project.tagline}</span>
      </span>
      <span class="row-tags">
        ${project.workflow ? '<span class="pill">Workflow</span>' : ''}
        ${project.links.demo ? '<span class="pill">En ligne</span>' : ''}
        <span class="pill pill-soft">${CATEGORY_LABEL[project.category]}</span>
      </span>
      <span class="row-chevron" aria-hidden="true">${icon('chevron', { size: 18 })}</span>
    </summary>
    <div class="row-body">${renderProjectDetail(project, { withTitle: false })}</div>
  </details>`;
}

export function renderProjectsPage() {
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c.id, projects.filter((p) => p.category === c.id).length]));
  const filters = [{ id: 'all', label: 'Tous' }, ...CATEGORIES]
    .map(
      (c, i) => `<li><button type="button" class="filter" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label} <span class="mono">${
        c.id === 'all' ? projects.length : counts[c.id]
      }</span></button></li>`
    )
    .join('');
  return `
  <section class="page-hero section-dark" aria-labelledby="page-title">
    ${renderNetwork({ seed: 3, count: 24, height: 500, className: 'hero-network' })}
    <div class="container">
      <p class="eyebrow">Portfolio <span class="eyebrow-line"></span></p>
      <h1 id="page-title" class="page-title">Tous mes <em>projets.</em></h1>
      <p class="hero-lead">${projects.length} projets en IA &amp; automatisation, développement web et applications mobiles : le contexte, la solution, les résultats et, quand il y en a un, le workflow.</p>
    </div>
  </section>
  <section class="section section-light section-list" aria-label="Liste des projets">
    <div class="container">
      <ul class="filters" aria-label="Filtrer par catégorie">${filters}</ul>
      <div class="project-rows">${projects.map(renderRow).join('')}</div>
    </div>
  </section>`;
}

export function initProjectsPage() {
  const rows = [...document.querySelectorAll('.project-row')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter;
      rows.forEach((r) => (r.hidden = f !== 'all' && r.dataset.category !== f));
    })
  );
  // Ouvre le projet ciblé par l'ancre (#id), à l'arrivée et quand l'ancre change.
  const openFromHash = () => {
    const row = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (row?.classList.contains('project-row')) {
      row.hidden = false;
      row.open = true;
      row.scrollIntoView({ block: 'start' });
    }
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}
