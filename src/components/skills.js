import skills from '../data/skills.json';

const ICONS = {
  'code-2': 'fa-code',
  sparkles: 'fa-wand-magic-sparkles',
  terminal: 'fa-terminal',
  palette: 'fa-palette',
};

function renderCategory(cat) {
  const icon = ICONS[cat.icon] || 'fa-star';
  const items = cat.items
    .map(
      (item) => `
    <div class="skill-item" data-skill data-level="${item.level}">
      <div class="mb-2 flex items-center justify-between text-sm">
        <span class="font-medium text-slate-700 dark:text-slate-200">${item.name}</span>
        <span class="text-xs text-slate-400">${item.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width:0%" data-target="${item.level}"></div>
      </div>
    </div>`
    )
    .join('');

  return `
  <div class="card p-6 sm:p-7">
    <h3 class="flex items-center gap-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
        <i class="fas ${icon}"></i>
      </span>
      ${cat.category}
    </h3>
    <div class="mt-6 space-y-4">
      ${items}
    </div>
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
          Un socle développement web solide, complété par les outils IA &amp; automatisation.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2">
        ${skills.map(renderCategory).join('')}
      </div>
    </div>
  </section>
  `;
}

export function initSkillsAnimation() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.width = `${el.dataset.target}%`;
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((bar) => observer.observe(bar));
}
