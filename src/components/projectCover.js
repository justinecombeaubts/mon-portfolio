// Visuel d'un projet : fond à la couleur du logo, puis logo centré (jamais recadré)
// ou capture d'écran dans une fenêtre de navigateur.

function siteLabel(project) {
  const url = project.links.demo;
  return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.title;
}

// Noms écrits en entier pour que Tailwind les détecte (pas de classe construite).
const VARIANTS = { card: 'project-cover--card', modal: 'project-cover--modal' };

export function renderProjectCover(project, { variant = 'card' } = {}) {
  // Carte : toujours le logo. Fiche : la capture quand il y en a une.
  const inner = variant === 'modal' && project.screenshot
    ? `<div class="cover-window">
        <div class="cover-window-bar">
          <i></i><i></i><i></i>
          <span>${siteLabel(project)}</span>
        </div>
        <img src="${project.screenshot}" alt="${project.title}" loading="lazy" decoding="async" />
      </div>`
    : `<img class="cover-logo" src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />`;

  return `
    <div class="project-cover ${VARIANTS[variant]}" style="--cover: ${project.accent}">
      ${inner}
    </div>`;
}
