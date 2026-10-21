// Types d'étapes : couleur = rôle de l'étape dans le flux.
const KINDS = {
  source: {
    label: 'Déclencheur / source',
    dot: 'bg-slate-400',
    box: 'border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/[0.04]',
    icon: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200',
  },
  process: {
    label: 'Traitement',
    dot: 'bg-ai-500',
    box: 'border-ai-400/50 bg-ai-400/10 dark:border-ai-400/30 dark:bg-ai-500/10',
    icon: 'bg-ai-400/25 text-ai-600 dark:bg-ai-500/20 dark:text-ai-400',
  },
  ai: {
    label: 'IA',
    dot: 'bg-brand-300',
    box: 'border-brand-200 bg-brand-50 dark:border-brand-300/40 dark:bg-brand-300/10',
    icon: 'bg-brand-100 text-brand-600 dark:bg-brand-300/20 dark:text-brand-200',
  },
  human: {
    label: 'Validation humaine',
    dot: 'bg-brand-500',
    box: 'border-brand-400/50 bg-brand-100/60 dark:border-brand-400/40 dark:bg-brand-400/15',
    icon: 'bg-brand-200 text-brand-700 dark:bg-brand-400/25 dark:text-brand-100',
  },
  output: {
    label: 'Résultat',
    dot: 'bg-brand-800 dark:bg-white',
    box: 'border-brand-800/25 bg-brand-800/[0.06] dark:border-white/25 dark:bg-white/[0.08]',
    icon: 'bg-brand-800 text-white dark:bg-white dark:text-ink',
  },
};

function renderStep(step, horizontal) {
  const k = KINDS[step.kind] || KINDS.process;
  const layout = horizontal ? 'xl:flex-col xl:items-center xl:text-center xl:gap-2' : '';
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

// horizontal : en ligne dès xl (section « workflows »), sinon toujours vertical (fiche projet).
export function renderWorkflow(steps, { horizontal = false } = {}) {
  const row = horizontal ? 'xl:flex-row xl:items-stretch' : '';
  const items = steps
    .map((step, i) => {
      const isLast = i === steps.length - 1;
      const connector = isLast
        ? ''
        : `<div class="flex items-center justify-center py-1 text-slate-300 dark:text-white/25 ${horizontal ? 'xl:px-1.5 xl:py-0' : ''}" aria-hidden="true">
            <i class="fas fa-chevron-down text-xs ${horizontal ? 'xl:-rotate-90' : ''}"></i>
          </div>`;
      return `
      <li class="flex flex-col ${horizontal ? 'xl:flex-1 xl:flex-row' : ''} items-stretch">
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
