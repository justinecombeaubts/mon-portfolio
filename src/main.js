import './styles/main.css';

import { renderApp } from './render.js';
import { initHeader } from './components/header.js';
import { initProjectFilters } from './components/projects.js';
import { initProjectRows } from './components/projectsPage.js';
import { initProjectModal } from './components/projectModal.js';
import { initContactForm } from './components/contact.js';
import { initThemeToggle } from './utils/theme.js';

// En production, le HTML est déjà pré-rendu dans la page : on se contente
// de brancher les interactions. En dev, on génère le rendu ici.
const app = document.getElementById('app');
const page = app.dataset.page || 'home';
if (!app.hasAttribute('data-prerendered')) {
  app.innerHTML = renderApp(page);
}

initHeader();
initThemeToggle();
if (page === 'projets') {
  initProjectFilters();
  initProjectRows();
} else {
  initProjectModal();
  initContactForm();
}
