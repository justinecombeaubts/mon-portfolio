// Visuel d'un projet, identique sur la carte et dans la fiche :
// fond à la couleur du logo, puis capture d'écran dans une fenêtre de navigateur
// si le projet en a une, sinon le logo centré (jamais recadré).

function siteLabel(project) {
  const url = project.links.demo;
  return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.title;
}

// Noms écrits en entier pour que Tailwind les détecte (pas de classe construite).
const VARIANTS = { card: 'project-cover--card', modal: 'project-cover--modal' };

export function renderProjectCover(project, { variant = 'card' } = {}) {
  const inner = project.screenshot
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
