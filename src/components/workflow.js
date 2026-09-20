// Types d'étapes : couleur = rôle de l'étape dans le flux.
const KINDS = {
  source: {
    label: 'Déclencheur / source',
    dot: 'bg-amber-400',
    box: 'border-amber-300/70 bg-amber-50 dark:border-amber-400/30 dark:bg-amber-400/10',
    icon: 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300',
  },
  process: {
    label: 'Traitement',
    dot: 'bg-sky-400',
    box: 'border-sky-300/70 bg-sky-50 dark:border-sky-400/30 dark:bg-sky-400/10',
    icon: 'bg-sky-100 text-sky-600 dark:bg-sky-400/20 dark:text-sky-300',
  },
  ai: {
    label: 'IA',
    dot: 'bg-ai-500',
    box: 'border-ai-400/60 bg-ai-400/10 dark:border-ai-400/40 dark:bg-ai-500/15',
    icon: 'bg-ai-400/20 text-ai-600 dark:bg-ai-500/25 dark:text-ai-400',
  },
  human: {
    label: 'Validation humaine',
    dot: 'bg-emerald-400',
    box: 'border-emerald-300/70 bg-emerald-50 dark:border-emerald-400/30 dark:bg-emerald-400/10',
    icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-300',
  },
  output: {
    label: 'Résultat',
    dot: 'bg-brand-500',
    box: 'border-brand-300/70 bg-brand-50 dark:border-brand-300/30 dark:bg-brand-500/10',
    icon: 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300',
  },
};

function renderStep(step, horizontal) {
  const k = KINDS[step.kind] || KINDS.process;
  const layout = horizontal ? 'lg:flex-col lg:items-center lg:text-center lg:gap-2' : '';
  return `
    <div class="flex flex-1 items-center gap-3 rounded-xl border px-3 py-2.5 ${k.box} ${layout}">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${k.icon}">
        <i class="fas ${step.icon} text-sm" aria-hidden="true"></i>
      </span>
      <div class="min-w-0">
        <p class="text-[13px] font-semibold leading-tight text-slate-800 dark:text-slate-100">${step.label}</p>
        <p class="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">${step.detail}</p>
      </div>
    </div>`;
}

// horizontal : en ligne dès lg (section « workflows »), sinon toujours vertical (fiche projet).
export function renderWorkflow(steps, { horizontal = false } = {}) {
  const row = horizontal ? 'lg:flex-row lg:items-stretch' : '';
  const items = steps
    .map((step, i) => {
      const isLast = i === steps.length - 1;
      const connector = isLast
        ? ''
        : `<div class="flex items-center justify-center py-1 text-slate-300 dark:text-white/25 ${horizontal ? 'lg:px-1.5 lg:py-0' : ''}" aria-hidden="true">
            <i class="fas fa-chevron-down text-xs ${horizontal ? 'lg:-rotate-90' : ''}"></i>
          </div>`;
      return `
      <li class="flex flex-col ${horizontal ? 'lg:flex-1 lg:flex-row' : ''} items-stretch">
        ${renderStep(step, horizontal)}
        ${connector}
      </li>`;
    })
    .join('');

  return `<ol class="flex flex-col ${row}">${items}</ol>`;
}

export function renderWorkflowLegend(kinds = Object.keys(KINDS)) {
  return kinds
    .map(
      (key) => `
      <span class="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span class="h-2.5 w-2.5 rounded-full ${KINDS[key].dot}"></span>${KINDS[key].label}
      </span>`
    )
    .join('');
}
