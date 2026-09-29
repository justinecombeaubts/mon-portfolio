export function renderHero() {
  return `
  <section id="home" class="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
    <div class="pointer-events-none absolute inset-0 bg-grid-glow"></div>

    <div class="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="animate-fade-up">
        <p class="section-eyebrow">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
          Développement Web &middot; IA &amp; Automation
        </p>
        <h1 class="mt-5 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          Bonjour, je suis <span class="text-brand-500 dark:text-brand-300">Justine</span>.<br />
          Je code des solutions <span class="text-ai-600 dark:text-ai-400">web</span> et je les rends
          <span class="text-brand-500 dark:text-brand-300">intelligentes</span>.
        </h1>
        <p class="mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Étudiante en Bachelor IA &amp; Automation à Digital Campus Paris, diplômée d'un BTS
          Développement Web. Je conçois des sites et applications robustes, puis j'y ajoute de
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
        </div>

        <div class="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-2">
            <i class="fas fa-graduation-cap text-brand-500 dark:text-brand-300"></i> Bachelor 3 IA &amp; Automation
          </div>
          <div class="flex items-center gap-2">
            <i class="fas fa-location-dot text-brand-500 dark:text-brand-300"></i> Paris, France
          </div>
          <div class="flex items-center gap-2">
            <i class="fas fa-briefcase text-brand-500 dark:text-brand-300"></i> Recherche alternance
          </div>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
        <div class="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-300/30 via-ai-400/20 to-transparent blur-2xl"></div>
        <div class="overflow-hidden rounded-[2rem] border border-white/40 shadow-soft dark:border-white/10">
          <img src="/images/moi.png" alt="Portrait de Justine Combeau" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </section>
  `;
}
