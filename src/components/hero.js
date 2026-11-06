// Dans la zone claire de la courbe : du code qui défile et un petit workflow animé.
// Décoratif (aria-hidden) : le code reprend la logique de ColibrIA.
const CODE_LINES = [
  '// Veille triée par IA, toutes les 6 h',
  "schedule: '0 */6 * * *'",
  '',
  'const articles = await lireSources();',
  '',
  'for (const article of articles) {',
  '  const note = await noterAvecIA(article, profil);',
  '  if (note >= 6) {',
  '    await publier(article, salon);',
  '  }',
  '}',
  '',
  '// Le code calcule, l&#39;IA restitue, l&#39;humain valide',
  'const reponse = valider(JSON.parse(sortieIA));',
  'if (!reponse.ok) return reessayer(article);',
  '',
  '&lt;section class="projet"&gt;',
  '  &lt;h2&gt;{titre}&lt;/h2&gt;',
  '&lt;/section&gt;',
  '',
];

const WORKFLOW_STEPS = ['Source', 'Filtre', 'IA', 'Discord'];

function renderCourbeWorkflow() {
  const nodes = WORKFLOW_STEPS.map(
    (label, i) => `
      <g transform="translate(${i * 112} 16)">
        <rect class="${label === 'IA' ? 'noeud noeud-ia' : 'noeud'}" width="84" height="44" rx="12" />
        <text x="42" y="27" text-anchor="middle">${label}</text>
      </g>`
  ).join('');
  return `
    <svg class="courbe-workflow" viewBox="0 0 420 76" focusable="false">
      <path class="liaison" d="M84 38H112M196 38H224M308 38H336" />
      <circle class="impulsion" r="4" />
      ${nodes}
    </svg>`;
}

function renderCourbeDigital() {
  const code = CODE_LINES.join('\n');
  return `
    <div class="courbe-digital" aria-hidden="true">
      <div class="courbe-code">
        <div class="courbe-code-piste"><pre>${code}</pre><pre>${code}</pre></div>
      </div>
      ${renderCourbeWorkflow()}
    </div>`;
}

export function renderHero() {
  return `
  <section id="home" class="fond-courbe pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-28">
    ${renderCourbeDigital()}
    <div class="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="animate-fade-up">
        <p class="section-eyebrow">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
          Développement Web &middot; IA &amp; Automation
        </p>
        <h1 class="mt-5 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          Bonjour, je suis <span class="text-brand-500 dark:text-brand-300">Justine Combeau</span>.<br />
          Je code des solutions <span class="text-ai-600 dark:text-ai-400">web</span> et je les rends
          <span class="text-brand-500 dark:text-brand-300">intelligentes</span>.
        </h1>
        <p class="mt-6 max-w-xl text-lg text-slate-500 dark:text-white/80">
          Étudiante en Bachelor IA &amp; Automation à Digital Campus Paris, diplômée d'un BTS
          Informatique Développement. Je conçois des sites et applications robustes, puis j'y ajoute de
          l'automatisation et de l'intelligence artificielle pour aller plus loin.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <a href="#projects" class="btn-primary">
            <i class="fas fa-rocket"></i> Découvrir mes projets
          </a>
          <a href="#contact" class="btn-secondary">
            <i class="fas fa-envelope"></i> Me contacter
          </a>
          <a href="/cv/CV_JustineCombeau.pdf" download class="btn-ghost">
            <i class="fas fa-download"></i> Télécharger mon CV
          </a>
          <a href="/portfolio/Portfolio_JustineCombeau.pdf" download class="btn-ghost">
            <i class="fas fa-file-pdf"></i> Portfolio PDF
          </a>
        </div>

        <div class="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-slate-500 dark:text-white/80">
          <div class="flex items-center gap-2">
            <i class="fas fa-graduation-cap text-brand-500 dark:text-brand-300"></i> Bachelor 3 IA &amp; Automation
          </div>
          <div class="flex items-center gap-2">
            <i class="fas fa-location-dot text-brand-500 dark:text-brand-300"></i> Paris, France
          </div>
          <div class="flex items-center gap-2">
            <i class="fas fa-briefcase text-brand-500 dark:text-brand-300"></i> Alternance : disponible immédiatement (3 j entreprise / 2 j école)
          </div>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
        <div class="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-300/30 via-ai-400/20 to-transparent blur-2xl"></div>
        <div class="overflow-hidden rounded-[2rem] border border-white/40 shadow-soft dark:border-white/10">
          <picture>
            <source srcset="/images/accueil.webp" type="image/webp" />
            <img src="/images/accueil.jpg" alt="Illustration de Justine Combeau, tasse à la main, dans une bibliothèque avec son chat et son ordinateur" width="768" height="953"
              fetchpriority="high" decoding="async" class="h-full w-full object-cover" />
          </picture>
        </div>
      </div>
    </div>
  </section>
  `;
}
