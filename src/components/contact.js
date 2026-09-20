const SOCIALS = [
  { href: 'https://github.com/justinecombeaubts', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/justine-combeau/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/sunrise.tech_/', icon: 'fab fa-instagram', label: 'Instagram' },
  { href: 'mailto:justine.combeau.bts@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

export function renderContact() {
  const socials = SOCIALS.map(
    (s) => `
    <a href="${s.href}" target="_blank" rel="noopener" class="social-icon" aria-label="${s.label}">
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
            <textarea id="message" name="message" rows="5" required class="form-input" placeholder="Votre message"></textarea>
          </div>
          <button type="submit" class="btn-primary w-full sm:w-auto">
            <i class="fas fa-paper-plane"></i> Envoyer
          </button>
          <p id="form-feedback" class="hidden text-sm" role="status"></p>
        </form>

        <div class="space-y-6">
          <div class="card p-6 sm:p-8">
            <h3 class="font-display text-lg font-semibold text-slate-900 dark:text-white">Coordonnées</h3>
            <ul class="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li class="flex items-center gap-3">
                <i class="fas fa-envelope w-5 text-brand-500"></i>
                <a href="mailto:justine.combeau.bts@gmail.com" class="hover:text-brand-600 dark:hover:text-brand-300">justine.combeau.bts@gmail.com</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-phone w-5 text-brand-500"></i>
                <a href="tel:+33787505329" class="hover:text-brand-600 dark:hover:text-brand-300">07 87 50 53 29</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-location-dot w-5 text-brand-500"></i> Paris, France
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      feedback.classList.remove('hidden', 'text-red-500', 'text-emerald-600');
      if (response.ok) {
        feedback.textContent = 'Merci ! Votre message a bien été envoyé, je vous réponds rapidement.';
        feedback.classList.add('text-emerald-600');
        form.reset();
      } else {
        throw new Error('Réponse serveur invalide');
      }
    } catch (error) {
      feedback.classList.remove('hidden', 'text-emerald-600');
      feedback.classList.add('text-red-500');
      feedback.textContent = "Une erreur est survenue, écrivez-moi directement à justine.combeau.bts@gmail.com.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
    }
  });
}
