import { sparkle } from '../lib/icons.js';

export function renderBook() {
  return `
  <section id="roman" class="section section-light" aria-labelledby="book-title">
    <div class="container book-grid">
      <div class="book-visual reveal">
        <picture>
          <source srcset="/images/couverture.webp" type="image/webp" />
          <img src="/images/couverture.jpg" alt="Couverture du roman Séléna ~ Captive de la tempête ~" width="640" height="1021" loading="lazy" decoding="async" class="book-cover" />
        </picture>
        <img src="/images/da/sticker-lecture.webp" alt="" width="200" height="260" loading="lazy" class="sticker sticker-book" />
        ${sparkle({ size: 18, className: 'book-sparkle' })}
      </div>
      <div class="book-text">
        <p class="eyebrow eyebrow-dark reveal">Hors du code <span class="eyebrow-line"></span></p>
        <h2 id="book-title" class="section-title reveal">J'écris aussi<br /><em>un roman.</em></h2>
        <p class="book-subtitle reveal">Séléna ~ Captive de la tempête ~</p>
        <ul class="tags tags-dark reveal"><li>Fantasy</li><li>Auto-édition</li><li>En bêta-lecture</li></ul>
        <p class="prose reveal">Après un incident qui bouleverse tout, Séléna se retrouve prisonnière d'une tempête qui ne dit pas son nom. Entre les ruines du silence et les portes d'Elferia, elle va devoir traverser les mensonges des autres pour affronter les siens, et découvrir ce que la tourmente a vraiment fait d'elle.</p>
        <p class="book-hobbies reveal">Et aussi : lecture, jeux vidéo, sport, dessin.</p>
      </div>
    </div>
  </section>`;
}
