// Fiche détaillée d'un projet, partagée par la modale de l'accueil et la page projets.
import { CATEGORY_LABEL, projectVisual } from '../lib/site.js';
import { icon } from '../lib/icons.js';
import { renderWorkflow } from './workflow.js';

export function renderProjectLinks(project) {
  const links = [];
  if (project.links.demo) {
    links.push(`<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn btn-solid btn-sm">Voir le site ${icon('arrowUpRight', { size: 15 })}</a>`);
  }
  if (project.links.code) {
    links.push(`<a href="${project.links.code}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">${icon('github', { size: 15 })} Voir le code</a>`);
  }
  if (project.links.presentation) {
    links.push(
      `<a href="${project.links.presentation}" download class="btn ${links.length ? 'btn-outline' : 'btn-solid'} btn-sm">${icon('download', { size: 15 })} Présentation PDF</a>`
    );
  }
  const note = project.privateNote || (!links.length && 'Projet privé : démonstration sur demande');
  if (note) links.push(`<span class="private-note">${icon('lock', { size: 14 })} ${note}</span>`);
  return `<div class="detail-links">${links.join('')}</div>`;
}

function renderGallery(project) {
  if (!project.gallery?.length) return '';
  const items = project.gallery
    .map(
      (img) => `<li><a href="${img.src}" target="_blank" rel="noopener"><img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async" class="${img.wide ? 'is-wide' : ''}" /></a></li>`
    )
    .join('');
  return `
    <div class="detail-block">
      <h4 class="detail-heading mono">En images</h4>
      <ul class="gallery">${items}</ul>
    </div>`;
}

// headingLevel : niveau du titre du projet (h2 dans la modale, h2 dans la page projets aussi).
export function renderProjectDetail(project, { withTitle = true } = {}) {
  const impact = project.impact.map((line) => `<li>${icon('check', { size: 16 })}<span>${line}</span></li>`).join('');
  const stack = project.stack.map((t) => `<li>${t}</li>`).join('');
  return `
    <div class="detail">
      ${
        withTitle
          ? `<header class="detail-header">
              <p class="eyebrow eyebrow-dark">${CATEGORY_LABEL[project.category]} · ${project.year}</p>
              <h2 class="detail-title" id="modal-title">${project.title}</h2>
              <p class="detail-tagline">${project.tagline}</p>
            </header>`
          : ''
      }
      <div class="detail-grid">
        <div class="detail-main">
          <div class="detail-block">
            <h4 class="detail-heading mono">Contexte</h4>
            <p>${project.context}</p>
          </div>
          <div class="detail-block">
            <h4 class="detail-heading mono">Solution</h4>
            <p>${project.solution}</p>
          </div>
          <div class="detail-block">
            <h4 class="detail-heading mono">Résultats</h4>
            <ul class="impact">${impact}</ul>
          </div>
        </div>
        <aside class="detail-side">
          <div class="detail-visual">${projectVisual(project)}</div>
          <p class="detail-status mono">${project.status || ''}</p>
          <div class="detail-block">
            <h4 class="detail-heading mono">Stack</h4>
            <ul class="tags">${stack}</ul>
          </div>
          ${renderProjectLinks(project)}
        </aside>
      </div>
      ${
        project.workflow
          ? `<div class="detail-block detail-flow">
              <h4 class="detail-heading mono">Workflow</h4>
              ${renderWorkflow(project.workflow, { className: 'flow-light' })}
            </div>`
          : ''
      }
      ${renderGallery(project)}
    </div>`;
}
