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

// Paragraphe de solution, ou introduction + étapes numérotées si le projet en a (solutionSteps).
export function renderSolution(project) {
  if (!project.solutionSteps?.length) return `<p>${project.solution}</p>`;
  const steps = project.solutionSteps.map((step) => `<li>${step}</li>`).join('');
  return `
    <p>${project.solutionIntro}</p>
    <ol class="mt-2 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-brand-500 dark:marker:text-brand-300">${steps}</ol>`;
}

// Fiche d'identité du projet (type, date, statut, rôle), champ facultatif facts.
export function renderProjectFacts(project) {
  if (!project.facts?.length) return '';
  const rows = project.facts
    .map(
      (f) => `
      <div class="sm:flex sm:gap-3">
        <dt class="shrink-0 font-semibold text-slate-800 sm:w-16 dark:text-slate-100">${f.label}</dt>
        <dd class="text-slate-600 dark:text-slate-400">${f.value}</dd>
      </div>`
    )
    .join('');
  return `<dl class="space-y-2 rounded-2xl border border-slate-200/70 p-4 text-sm dark:border-white/10">${rows}</dl>`;
}

function renderDetailTable(rows) {
  const items = rows
    .map(
      ([term, description]) => `
      <div class="py-2 first:pt-0 last:pb-0 sm:flex sm:gap-4">
        <dt class="shrink-0 font-medium text-slate-800 sm:w-44 dark:text-slate-100">${term}</dt>
        <dd class="text-slate-600 dark:text-slate-400">${description}</dd>
      </div>`
    )
    .join('');
  return `<dl class="mt-2 divide-y divide-slate-200/70 dark:divide-white/10">${items}</dl>`;
}

// Sections supplémentaires d'une fiche, champ facultatif details :
// { icon, title, text?, list?, table?: [[terme, description]], image?: { src, alt, width, height } }.
export function renderProjectDetails(project) {
  if (!project.details?.length) return '';
  const sections = project.details
    .map((d) => {
      const list = d.list
        ? `<ul class="mt-2 space-y-2 text-slate-600 dark:text-slate-400">${d.list
            .map(
              (line) => `<li class="flex gap-2"><i class="fas fa-circle-check mt-0.5 text-brand-500 dark:text-brand-300" aria-hidden="true"></i><span>${line}</span></li>`
            )
            .join('')}</ul>`
        : '';
      const table = d.table ? renderDetailTable(d.table) : '';
      const text = d.text ? `<p class="mt-2 text-slate-600 dark:text-slate-400">${d.text}</p>` : '';
      const image = d.image
        ? `<img src="${d.image.src}" alt="${d.image.alt}" width="${d.image.width}" height="${d.image.height}" loading="lazy" decoding="async" class="mt-3 h-auto w-full rounded-xl border border-slate-200/70 dark:border-white/10" />`
        : '';
      return `
      <section>
        <h3 class="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <i class="fas ${d.icon} text-brand-500 dark:text-brand-300" aria-hidden="true"></i> ${d.title}
        </h3>
        ${list}${table}${text}${image}
      </section>`;
    })
    .join('');
  return `<div class="mt-8 space-y-6 text-sm">${sections}</div>`;
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
