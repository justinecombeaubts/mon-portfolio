import skills from '../data/skills.json';

const ICONS = {
  'code-2': 'fa-code',
  sparkles: 'fa-wand-magic-sparkles',
  terminal: 'fa-terminal',
  palette: 'fa-palette',
};

// Niveau = d'où vient la preuve : un projet visible, la formation, ou la pratique perso.
const LEVELS = {
  projet: { label: 'En projet', cls: 'bg-brand-300/30 text-brand-700 dark:bg-brand-300/15 dark:text-brand-200' },
  formation: { label: 'Formation', cls: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300' },
  perso: { label: 'Perso', cls: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300' },
};

function renderCategory(cat) {
  const icon = ICONS[cat.icon] || 'fa-star';
  const items = cat.items
    .map((item) => {
      const level = LEVELS[item.level] || LEVELS.projet;
      return `
    <li class="py-3 first:pt-0 last:pb-0">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="font-medium text-slate-700 dark:text-slate-200">${item.name}</span>
        <span class="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${level.cls}">${level.label}</span>
      </div>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${item.proof.join(' · ')}</p>
    </li>`;
    })
    .join('');

  return `
  <div class="card p-6 sm:p-7">
    <h3 class="flex items-center gap-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
        <i class="fas ${icon}"></i>
      </span>
      ${cat.category}
    </h3>
    <ul class="mt-6 divide-y divide-slate-200/70 dark:divide-white/10">
      ${items}
    </ul>
  </div>`;
}

export function renderSkills() {
  return `
  <section id="skills" class="py-24">
    <div class="container-x">
      <div class="text-center">
        <p class="section-eyebrow justify-center">Boîte à outils</p>
        <h2 class="section-title mt-3">Compétences & Tech Stack</h2>
        <p class="section-subtitle mx-auto max-w-xl">
          Chaque compétence est reliée au projet qui la prouve. « Formation » : vue en cours, pas encore dans un projet publié.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2">
        ${skills.map(renderCategory).join('')}
      </div>
    </div>
  </section>
  `;
}

