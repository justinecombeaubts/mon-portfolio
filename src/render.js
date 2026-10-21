// HTML complet de chaque page, sans dépendance au navigateur : utilisé par main.js en dev,
// et par le plugin de pré-rendu (vite.config.js) pour l'écrire dans dist/*.html au build.
import { renderHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
import { renderSkills } from './components/skills.js';
import { renderWorkflows } from './components/workflows.js';
import { renderProjects } from './components/projects.js';
import { renderProjectsPage } from './components/projectsPage.js';
import { renderProjectModal } from './components/projectModal.js';
import { renderTimeline } from './components/timeline.js';
import { renderBook } from './components/book.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';

function renderHome() {
  return `
  ${renderHeader()}
  <div class="lg:pl-72">
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
  </div>
  ${renderProjectModal()}
`;
}

function renderProjectsListPage() {
  return `
  ${renderHeader({ page: 'projets' })}
  <div class="lg:pl-72">
  <main>
    ${renderProjectsPage()}
  </main>
  ${renderFooter()}
  </div>
`;
}

// page : valeur de data-page sur <div id="app"> (accueil par défaut).
export function renderApp(page = 'home') {
  return page === 'projets' ? renderProjectsListPage() : renderHome();
}
