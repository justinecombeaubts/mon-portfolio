import './styles/main.css';

import { renderApp } from './render.js';
import { initHeader } from './components/header.js';
import { initProjectModal } from './components/projects.js';
import { initWorkflowTabs } from './components/workflows.js';
import { initContactForm } from './components/contact.js';
import { initProjectsPage } from './components/projectsPage.js';
import { initReveal } from './lib/reveal.js';

// En production, le HTML est déjà pré-rendu dans la page : on se contente
// de brancher les interactions. En dev, on génère le rendu ici.
const app = document.getElementById('app');
const page = app.dataset.page || 'home';
if (!app.hasAttribute('data-prerendered')) {
  app.innerHTML = renderApp(page);
}

initHeader();
initReveal();
if (page === 'projets') {
  initProjectsPage();
} else {
  initProjectModal();
  initWorkflowTabs();
  initContactForm();
}
