// Éléments communs à la fiche (modale) et à la page projets : liens et galerie.

// compact : boutons plus petits (lignes de la page projets).
export function renderProjectLinks(project, { compact = false } = {}) {
  const size = compact ? ' !px-5 !py-2.5' : '';
  const links = [];
  if (project.links.demo) {
    links.push(
      `<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn-primary${size}">
        <i class="fas fa-arrow-up-right-from-square"></i> Voir le site
      </a>`
    );
  }
  if (project.links.code) {
    links.push(
      `<a href="${project.links.code}" target="_blank" rel="noopener" class="btn-secondary${size}">
        <i class="fab fa-github"></i> Voir le code
      </a>`
    );
  }
  if (project.links.presentation) {
    links.push(
      `<a href="${project.links.presentation}" download class="${links.length ? 'btn-secondary' : 'btn-primary'}${size}">
        <i class="fas fa-file-arrow-down"></i> Télécharger la présentation
      </a>`
    );
  }
  const note = project.privateNote || (!links.length && (project.status || 'Projet privé'));
  if (note) {
    links.push(
      `<span class="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <i class="fas fa-lock"></i> ${note}
      </span>`
    );
  }
  return links.join('');
}

// Visuels supplémentaires (slides, planches) : bande qui défile à l'horizontale.
export function renderGallery(project) {
  if (!project.gallery?.length) return '';
  const items = project.gallery
    .map(
      (img) => `
      <li class="shrink-0 snap-start">
        <a href="${img.src}" target="_blank" rel="noopener" class="block overflow-hidden rounded-xl border border-slate-200/70 dark:border-white/10">
          <img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async" class="h-56 w-auto ${img.wide ? 'max-w-none' : ''}" />
        </a>
      </li>`
    )
    .join('');
  return `
    <div class="mt-8">
      <p class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
        <i class="fas fa-images text-brand-500 dark:text-brand-300" aria-hidden="true"></i> En images
      </p>
      <ul class="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">${items}</ul>
    </div>`;
}
