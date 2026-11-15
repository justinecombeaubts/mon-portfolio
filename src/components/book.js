export function renderBook() {
  return `
  <section id="book" class="py-24">
    <div class="container-x">
      <div class="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div class="relative mx-auto w-full max-w-xs animate-fade-up">
          <div class="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-300/30 via-ai-400/20 to-transparent blur-2xl"></div>
          <button
            type="button"
            data-book-open
            aria-haspopup="dialog"
            aria-label="Ouvrir la liseuse : lire le prologue et le chapitre 1 de Séléna"
            class="book-cover group block w-full overflow-hidden rounded-2xl border border-white/40 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-4 focus-visible:ring-offset-ink dark:border-white/10"
          >
            <picture>
              <source srcset="/images/selena-couverture.webp" type="image/webp" />
              <img
                src="/images/selena-couverture.jpg"
                alt=""
                width="960"
                height="1440"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </picture>
            <span class="book-cover-hint">
              <i class="fas fa-book-open" aria-hidden="true"></i> Lire un extrait
            </span>
          </button>
        </div>

        <div>
          <p class="section-eyebrow">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
            Projet perso
          </p>
          <h2 class="section-title mt-3">J'écris aussi un roman</h2>
          <p class="section-subtitle">Séléna ~ Captive de la tempête ~</p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span class="chip"><i class="fas fa-hat-wizard mr-1.5"></i>Fantasy</span>
            <span class="chip"><i class="fas fa-feather-pointed mr-1.5"></i>Auto-édition</span>
            <span class="chip"><i class="fas fa-pen-nib mr-1.5"></i>En cours d'écriture</span>
          </div>

          <p class="mt-6 text-slate-600 dark:text-slate-300">
            Après un incident qui bouleverse tout, Séléna se retrouve prisonnière d'une tempête
            qui ne dit pas son nom. Entre les ruines du silence et les portes d'Elferia, elle va
            devoir traverser les mensonges des autres pour affronter les siens, et découvrir ce
            que la tourmente a vraiment fait d'elle.
          </p>
          <p class="mt-4 text-sm italic text-slate-500 dark:text-slate-400">
            Actuellement en écriture et en bêta-lecture.
          </p>
          <button type="button" data-book-open aria-haspopup="dialog" class="btn-primary mt-8">
            <i class="fas fa-book-open" aria-hidden="true"></i> Lire le prologue et le chapitre 1
          </button>
        </div>
      </div>
    </div>
  </section>
  `;
}
