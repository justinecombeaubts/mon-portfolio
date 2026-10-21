export function renderBook() {
  return `
  <section id="book" class="py-24">
    <div class="container-x">
      <div class="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div class="relative mx-auto w-full max-w-xs animate-fade-up">
          <div class="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-300/30 via-ai-400/20 to-transparent blur-2xl"></div>
          <div class="overflow-hidden rounded-2xl border border-white/40 shadow-soft dark:border-white/10">
            <picture>
              <source srcset="/images/couverture.webp" type="image/webp" />
              <img
                src="/images/couverture.jpg"
                alt="Couverture du roman Séléna ~ Captive de la tempête ~"
                width="640"
                height="1021"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </picture>
          </div>
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
        </div>
      </div>
    </div>
  </section>
  `;
}
