import { CONTACT, SOCIALS } from '../lib/site.js';
import { icon } from '../lib/icons.js';
import { renderWaves } from './network.js';

export function renderContact() {
  const socials = SOCIALS.map(
    (s) => `<li><a href="${s.href}" target="_blank" rel="me noopener" class="social" aria-label="${s.label}">${icon(s.icon, { size: 18 })}</a></li>`
  ).join('');
  return `
  <section id="contact" class="section section-dark section-contact" aria-labelledby="contact-title">
    ${renderWaves({ className: 'contact-waves' })}
    <div class="container contact-grid">
      <div class="contact-text">
        <p class="eyebrow reveal">Ensemble, imaginons demain <span class="eyebrow-line"></span></p>
        <h2 id="contact-title" class="section-title reveal">Une question,<br /><em>une alternance&nbsp;?</em></h2>
        <p class="section-intro reveal">Je recherche une alternance au rythme <strong>3 jours en entreprise / 2 jours à l'école</strong>, disponible immédiatement. Je lis tous les messages et réponds rapidement.</p>
        <ul class="contact-list reveal">
          <li>${icon('mail')}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
          <li>${icon('phone')}<a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
          <li>${icon('pin')}<span>${CONTACT.city}</span></li>
        </ul>
        <div class="contact-docs reveal">
          <a href="${CONTACT.cv}" download class="btn btn-outline btn-sm">${icon('download', { size: 15 })} CV</a>
          <a href="${CONTACT.portfolioPdf}" download class="btn btn-outline btn-sm">${icon('file', { size: 15 })} Portfolio PDF</a>
          <ul class="socials" aria-label="Mes réseaux">${socials}</ul>
        </div>
        <img src="/images/da/sticker-on-y-croit.webp" alt="" width="220" height="220" loading="lazy" class="sticker sticker-dark sticker-contact" />
      </div>

      <form id="contact-form" class="contact-form reveal" action="/api/contact" method="POST" novalidate>
        <div class="field">
          <label for="name">Nom</label>
          <input id="name" name="name" type="text" required maxlength="100" autocomplete="name" placeholder="Votre nom" />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required maxlength="254" autocomplete="email" placeholder="vous@exemple.com" />
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" required minlength="10" maxlength="3000" placeholder="Parlez-moi de votre projet ou de votre offre"></textarea>
        </div>
        <!-- Piège à robots : champ invisible, /api/contact ignore l'envoi s'il est rempli -->
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" class="honeypot" />
        <p class="form-note">Vos nom, email et message servent uniquement à vous répondre et ne sont jamais revendus. <a href="/mentions-legales.html#donnees">En savoir plus</a></p>
        <button type="submit" class="btn btn-champagne">Envoyer ${icon('send', { size: 16 })}</button>
        <p id="form-feedback" class="form-feedback" role="status" hidden></p>
      </form>
    </div>
  </section>`;
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;
  const startedAt = Date.now();
  const show = (message, ok) => {
    feedback.hidden = false;
    feedback.dataset.state = ok ? 'ok' : 'error';
    feedback.textContent = message;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // novalidate pour garder nos propres messages : on refuse les champs vides et l'email mal formé.
    const fields = ['name', 'email', 'message'].map((n) => form.elements[n]);
    fields.forEach((f) => (f.value = f.value.trim()));
    fields.forEach((f) => f.setAttribute('aria-invalid', String(!f.checkValidity())));
    const invalid = fields.find((f) => !f.checkValidity());
    if (invalid) {
      const messages = {
        name: 'Indiquez votre nom.',
        email: 'Indiquez une adresse email valide.',
        message: 'Votre message doit faire au moins 10 caractères.',
      };
      show(messages[invalid.name], false);
      invalid.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Envoi en cours...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.elements.name.value,
          email: form.elements.email.value,
          message: form.elements.message.value,
          _gotcha: form.elements._gotcha.value,
          _elapsed: Date.now() - startedAt,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Le message n'a pas pu être envoyé.");
      form.reset();
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
      show('Merci ! Votre message est bien parti, je vous réponds très vite.', true);
    } catch (error) {
      show(`${error.message} Vous pouvez aussi m'écrire à ${CONTACT.email}.`, false);
    } finally {
      button.disabled = false;
      button.innerHTML = label;
    }
  });
}
