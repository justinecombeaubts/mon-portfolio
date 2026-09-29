export function renderAbout() {
  return `
  <section id="about" class="py-24">
    <div class="container-x">
      <div class="grid gap-16 lg:grid-cols-2 lg:items-start">
        <div>
          <p class="section-eyebrow">Qui suis-je</p>
          <h2 class="section-title mt-3">À propos de moi</h2>
          <p class="section-subtitle">Du code au bidouillage d'IA, un parcours qui se construit pas à pas</p>

          <div class="mt-8 space-y-5 text-slate-600 dark:text-slate-300">
            <p>
              Diplômée d'un <strong class="text-slate-900 dark:text-white">BTS Informatique
              Développement</strong>, j'ai découvert le développement web par la pratique avant de
              choisir d'aller plus loin : je poursuis aujourd'hui en
              <strong class="text-slate-900 dark:text-white">Bachelor 3 IA &amp; Automation</strong>
              à Digital Campus Paris, pour apprendre à connecter mes applications à des agents IA
              et à des automatisations (n8n, Make, GitHub Actions).
            </p>
            <p>
              Mon profil est <strong class="text-slate-900 dark:text-white">polyvalent</strong> :
              à l'aise aussi bien sur du développement web classique (HTML/CSS/JS, PHP, SQL) que
              sur des architectures orientées données et IA (Supabase, LLMs, scripts
              d'automatisation). J'aime comprendre un besoin réel avant de coder, documenter mes
              choix, et livrer des interfaces soignées.
            </p>
            <p>
              Rigoureuse, autodidacte et créative, je m'appuie aussi sur des expériences de terrain
              — maître nageur sauveteur, service civique en accueil informatique — qui m'ont appris
              la gestion du stress, la pédagogie et le sens du service.
            </p>
          </div>

          <div class="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            ${[
              ['10', 'projets réalisés'],
              ['7', 'sites en ligne'],
              ['6', 'automatisations en production'],
              ['3 j / 2 j', "rythme d'alternance"],
            ]
              .map(
                ([value, label]) => `
              <div class="card px-4 py-5 text-center">
                <p class="font-display text-2xl font-semibold text-brand-500 dark:text-brand-300">${value}</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${label}</p>
              </div>`
              )
              .join('')}
          </div>
        </div>

        <div class="lg:pt-24">
          <div class="card p-6 sm:p-8">
            <h3 class="font-display text-xl font-semibold text-slate-900 dark:text-white">
              <i class="fas fa-compass text-brand-500 dark:text-brand-300"></i> Ma méthode
            </h3>
            <ul class="mt-6 space-y-5">
              ${[
                ['Comprendre', 'Cerner le besoin réel avant d\'écrire la moindre ligne de code.'],
                ['Construire', 'Un code propre, testé et documenté, pensé pour durer.'],
                ["Coder avec l'IA", "J'utilise des assistants IA en binôme : je cadre, je relis, je teste, et chaque choix technique reste le mien."],
                ['Automatiser', 'Identifier ce qui peut être fiabilisé par un script ou un agent IA.'],
                ['Livrer & apprendre', 'Récolter le retour, itérer, et documenter la décision.'],
              ]
                .map(
                  ([title, text], i) => `
                <li class="flex gap-4">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-semibold text-brand-600 dark:text-brand-300">${i + 1}</span>
                  <div>
                    <p class="font-semibold text-slate-800 dark:text-slate-100">${title}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">${text}</p>
                  </div>
                </li>`
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}
