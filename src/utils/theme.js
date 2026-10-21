// Gestion du thème clair/sombre (sombre par défaut), persisté en localStorage.
// Le flash initial est déjà évité par le script inline dans index.html ;
// ce module se charge uniquement de la bascule et de la synchro de l'icône.

const STORAGE_KEY = 'theme';

export function getTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function setTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);
  updateToggleIcon(theme);
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// Une icône par bouton (colonne de gauche et barre du haut sur téléphone).
function updateToggleIcon(theme) {
  document.querySelectorAll('[data-theme-icon]').forEach((icon) => {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

export function initThemeToggle() {
  updateToggleIcon(getTheme());
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach((btn) => btn.addEventListener('click', toggleTheme));
}
