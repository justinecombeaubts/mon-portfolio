import timeline from '../data/timeline.json';

const TYPE_META = {
  formation: { icon: 'fa-graduation-cap', label: 'Formation' },
  experience: { icon: 'fa-briefcase', label: 'Expérience' },
};

function renderItem(item) {
  const meta = TYPE_META[item.type] || TYPE_META.formation;
  return `
  <li class="relative pl-8">
    <span class="timeline-dot"></span>
    <div class="card p-5 sm:p-6">
      <div class="flex flex-wrap items-center gap-2">
        <span class="chip"><i class="fas ${meta.icon} mr-1.5"></i>${meta.label}</span>
        <span class="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">${item.period}</span>
      </div>
      <h3 class="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-white">${item.title}</h3>
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">${item.place}</p>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">${item.description}</p>
    </div>
  </li>`;
}

export function renderTimeline() {
  return `
  <section id="timeline" class="py-24">
    <div class="container-x">
      <div class="text-center">
        <p class="section-eyebrow justify-center">Étapes clés</p>
        <h2 class="section-title mt-3">Parcours & Formation</h2>
        <p class="section-subtitle mx-auto max-w-xl">
          Du BTS Développement Web au Bachelor IA &amp; Automation, en passant par le terrain.
        </p>
      </div>

      <ol class="relative mx-auto mt-14 max-w-2xl space-y-8 border-l-2 border-brand-200 pl-2 dark:border-white/10">
        ${timeline.map(renderItem).join('')}
      </ol>
    </div>
  </section>
  `;
}
