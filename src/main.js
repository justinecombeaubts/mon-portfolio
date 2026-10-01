import './styles/main.css';

import { renderApp } from './render.js';
import { initHeader } from './components/header.js';
import { initProjectFilters } from './components/projects.js';
import { initProjectModal } from './components/projectModal.js';
import { initContactForm } from './components/contact.js';
import { initThemeToggle } from './utils/theme.js';

// En production, le HTML est déjà pré-rendu dans index.html : on se contente
// de brancher les interactions. En dev, on génère le rendu ici.
const app = document.getElementById('app');
if (!app.hasAttribute('data-prerendered')) {
  app.innerHTML = renderApp();
}

initHeader();
initThemeToggle();
initProjectFilters();
initProjectModal();
initContactForm();
