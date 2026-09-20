import './styles/main.css';

import { renderHeader, initHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
import { renderSkills, initSkillsAnimation } from './components/skills.js';
import { renderWorkflows } from './components/workflows.js';
import { renderProjects, initProjectFilters } from './components/projects.js';
import { renderProjectModal, initProjectModal } from './components/projectModal.js';
import { renderTimeline } from './components/timeline.js';
import { renderBook } from './components/book.js';
import { renderContact, initContactForm } from './components/contact.js';
import { renderFooter } from './components/footer.js';
import { initThemeToggle } from './utils/theme.js';

const app = document.getElementById('app');

app.innerHTML = `
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

initHeader();
initThemeToggle();
initSkillsAnimation();
initProjectFilters();
initProjectModal();
initContactForm();
