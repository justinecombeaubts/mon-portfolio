const SOCIALS = [
  { href: 'https://github.com/justinecombeaubts', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/justine-combeau/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/nocturne.tech_/', icon: 'fab fa-instagram', label: 'Instagram @nocturne.tech_' },
  { href: 'mailto:justine.combeau.bts@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

export function renderContact() {
  const socials = SOCIALS.map(
    (s) => `
    <a href="${s.href}" target="_blank" rel="me noopener" class="social-icon" aria-label="${s.label}">
      <i class="${s.icon}"></i>
    </a>`
  ).join('');

  return `
  <section id="contact" class="py-24">
    <div class="container-x">
      <div class="text-center">
        <p class="section-eyebrow justify-center">Discutons</p>
        <h2 class="section-title mt-3">Contactez-moi</h2>
        <p class="section-subtitle mx-auto max-w-xl">
          En recherche d'alternance (3 jours entreprise / 2 jours école) — une question, une offre ?
        </p>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form id="contact-form" class="card space-y-5 p-6 sm:p-8" action="https://formspree.io/f/maqvzaoj" method="POST" novalidate>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Nom</label>
              <input id="name" name="name" type="text" required class="form-input" placeholder="Votre nom" />
            </div>
            <div>
              <label for="email" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input id="email" name="email" type="email" required class="form-input" placeholder="vous@exemple.com" />
            </div>
          </div>
          <div>
            <label for="message" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
            <textarea id="message" name="message" rows="5" required minlength="10" class="form-input" placeholder="Votre message"></textarea>
          </div>
          <!-- Piège à robots : champ invisible, Formspree rejette l'envoi s'il est rempli -->
          <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden" />
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Vos nom, email et message servent uniquement à vous répondre : ils sont transmis via Formspree et ne sont jamais revendus.
            <a href="/mentions-legales.html#donnees" class="underline underline-offset-2 hover:text-brand-600 dark:hover:text-brand-300">En savoir plus</a>
          </p>
          <button type="submit" class="btn-primary w-full sm:w-auto">
            <i class="fas fa-paper-plane"></i> Envoyer
          </button>
          <p id="form-feedback" class="hidden text-sm" role="status"></p>
        </form>

        <div class="space-y-6">
          <div class="card p-6 sm:p-8">
            <div class="mb-6 flex items-center gap-4">
              <picture class="shrink-0">
                <source srcset="/images/photo-pro.webp" type="image/webp" />
                <img src="/images/photo-pro.jpg" alt="Photo de Justine Combeau" width="112" height="112"
                  loading="lazy" decoding="async"
                  class="h-20 w-20 rounded-full object-cover ring-2 ring-brand-300 ring-offset-2 ring-offset-white dark:ring-offset-ink" />
              </picture>
              <div>
                <p class="font-display text-lg font-semibold text-slate-900 dark:text-white">Justine Combeau</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Je lis tous les messages et réponds rapidement.</p>
              </div>
            </div>
            <h3 class="font-display text-lg font-semibold text-slate-900 dark:text-white">Coordonnées</h3>
            <ul class="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li class="flex items-center gap-3">
                <i class="fas fa-envelope w-5 text-brand-500 dark:text-brand-300"></i>
                <a href="mailto:justine.combeau.bts@gmail.com" class="hover:text-brand-600 dark:hover:text-brand-300">justine.combeau.bts@gmail.com</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-phone w-5 text-brand-500 dark:text-brand-300"></i>
                <a href="tel:+33787505329" class="hover:text-brand-600 dark:hover:text-brand-300">07 87 50 53 29</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-location-dot w-5 text-brand-500 dark:text-brand-300"></i> Paris, France
              </li>
            </ul>
          </div>

          <div class="card p-6 sm:p-8">
            <h3 class="font-display text-lg font-semibold text-slate-900 dark:text-white">Mes réseaux</h3>
            <div class="mt-5 flex gap-3">${socials}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  const showFeedback = (message, ok) => {
    feedback.classList.remove('hidden', 'text-red-500', 'text-emerald-600');
    feedback.classList.add(ok ? 'text-emerald-600' : 'text-red-500');
    feedback.textContent = message;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Le formulaire est en novalidate pour garder nos propres messages :
    // on refuse ici les champs vides (ou remplis d'espaces) et l'email mal formé.
    const fields = ['name', 'email', 'message'].map((n) => form.elements[n]);
    fields.forEach((f) => (f.value = f.value.trim()));
    const invalid = fields.find((f) => !f.checkValidity());
    fields.forEach((f) => f.setAttribute('aria-invalid', String(!f.checkValidity())));
    if (invalid) {
      const messages = {
        name: 'Indiquez votre nom.',
        email: 'Indiquez une adresse email valide.',
        message: 'Votre message doit faire au moins 10 caractères.',
      };
      showFeedback(messages[invalid.name], false);
      invalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        showFeedback('Merci ! Votre message a bien été envoyé, je vous réponds rapidement.', true);
        form.reset();
      } else {
        throw new Error('Réponse serveur invalide');
      }
    } catch (error) {
      showFeedback('Une erreur est survenue, écrivez-moi directement à justine.combeau.bts@gmail.com.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
    }
  });
}
