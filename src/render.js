// HTML complet du site, sans dépendance au navigateur : utilisé par main.js en dev,
// et par le plugin de pré-rendu (vite.config.js) pour l'écrire dans dist/index.html au build.
import { renderHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
import { renderSkills } from './components/skills.js';
import { renderWorkflows } from './components/workflows.js';
import { renderProjects } from './components/projects.js';
import { renderProjectModal } from './components/projectModal.js';
import { renderTimeline } from './components/timeline.js';
import { renderBook } from './components/book.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';

export function renderApp() {
  return `
  ${renderHeader()}
  <main>
    ${renderHero()}
    ${renderAbout()}
    ${renderSkills()}
    ${renderWorkflows()}
    ${renderProjects()}
    ${renderTimeline()}
    ${renderBook()}
    ${renderContact()}
  </main>
  ${renderFooter()}
  ${renderProjectModal()}
`;
}
