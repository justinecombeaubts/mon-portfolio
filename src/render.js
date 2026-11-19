// HTML complet de chaque page, sans dépendance au navigateur : utilisé par main.js en dev,
// et par le plugin de pré-rendu (vite.config.js) pour l'écrire dans dist/*.html au build.
import { renderHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderProjects } from './components/projects.js';
import { renderWorkflows } from './components/workflows.js';
import { renderAbout } from './components/about.js';
import { renderSkills } from './components/skills.js';
import { renderTimeline } from './components/timeline.js';
import { renderBook } from './components/book.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';
import { renderProjectsPage } from './components/projectsPage.js';

function renderHome() {
  return `
  ${renderHeader()}
  <main id="main">
    ${renderHero()}
    ${renderProjects()}
    ${renderWorkflows()}
    ${renderAbout()}
    ${renderSkills()}
    ${renderTimeline()}
    ${renderBook()}
    ${renderContact()}
  </main>
  ${renderFooter()}`;
}

function renderProjectsListPage() {
  return `
  ${renderHeader({ page: 'projets' })}
  <main id="main">${renderProjectsPage()}</main>
  ${renderFooter({ page: 'projets' })}`;
}

// page : valeur de data-page sur <div id="app"> (accueil par défaut).
export function renderApp(page = 'home') {
  return page === 'projets' ? renderProjectsListPage() : renderHome();
}
