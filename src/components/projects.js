// Accueil : projets mis en avant (featured) en cartes, fiche complète dans une modale.
import { projects, CATEGORY_LABEL, projectVisual } from '../lib/site.js';
import { icon } from '../lib/icons.js';
import { renderProjectDetail } from './projectDetail.js';

const featured = projects.filter((p) => p.featured);

function renderCard(project, i) {
  return `
    <article class="project-card reveal" style="--delay:${i * 90}ms">
      <button type="button" class="project-card-btn" data-open-project="${project.id}" aria-haspopup="dialog">
        <span class="project-card-visual">${projectVisual(project)}</span>
        <span class="project-card-body">
          <span class="project-card-cat mono">${CATEGORY_LABEL[project.category]}</span>
          <span class="project-card-title">${project.title}</span>
          <span class="project-card-text">${project.tagline}</span>
        </span>
        <span class="round-arrow" aria-hidden="true">${icon('arrow', { size: 16 })}</span>
        <span class="sr-only">Ouvrir la fiche du projet</span>
      </button>
    </article>`;
}

export function renderProjects() {
  return `
  <section id="projets" class="section section-light" aria-labelledby="projets-title">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="eyebrow eyebrow-dark reveal">Mes projets <span class="eyebrow-line"></span></p>
          <h2 id="projets-title" class="section-title reveal">Des projets entre code,<br /><em>données et IA.</em></h2>
        </div>
        <div class="section-head-side">
          <img src="/images/da/sticker-idee.webp" alt="" width="150" height="150" loading="lazy" class="sticker sticker-head" />
          <a href="/projets.html" class="link-arrow">Voir les ${projects.length} projets ${icon('arrow', { size: 16 })}</a>
        </div>
      </div>
      <div class="project-grid">${featured.map(renderCard).join('')}</div>
    </div>
    ${featured.map((p) => `<template id="tpl-${p.id}">${renderProjectDetail(p)}</template>`).join('')}
  </section>

  <dialog class="modal" data-modal aria-labelledby="modal-title">
    <div class="modal-panel">
      <button type="button" class="modal-close" data-modal-close>${icon('close', { size: 20 })}<span class="sr-only">Fermer la fiche</span></button>
      <div class="modal-content" data-modal-content></div>
    </div>
  </dialog>`;
}

export function initProjectModal() {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;
  const content = modal.querySelector('[data-modal-content]');
  let opener = null;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-project]');
    if (!btn) return;
    const tpl = document.getElementById(`tpl-${btn.dataset.openProject}`);
    if (!tpl) return;
    opener = btn;
    content.replaceChildren(tpl.content.cloneNode(true));
    modal.showModal();
    modal.querySelector('.modal-panel').scrollTop = 0;
    document.body.classList.add('no-scroll');
  });
  modal.querySelector('[data-modal-close]').addEventListener('click', () => modal.close());
  // Clic sur le voile (en dehors du panneau) : ferme la fiche.
  modal.addEventListener('click', (e) => e.target === modal && modal.close());
  modal.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    opener?.focus();
  });
}
