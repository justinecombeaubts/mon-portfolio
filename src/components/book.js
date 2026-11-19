import { sparkle, icon } from '../lib/icons.js';
import { DISCORD_SERVER } from './bookReader.js';

export function renderBook() {
  return `
  <section id="roman" class="section section-light" aria-labelledby="book-title">
    <div class="container book-grid">
      <div class="book-visual reveal">
        <button type="button" class="book-open" data-book-open aria-haspopup="dialog" aria-label="Ouvrir la liseuse : lire le prologue et le chapitre 1 de Séléna">
          <picture>
            <source srcset="/images/selena-couverture.webp" type="image/webp" />
            <img src="/images/selena-couverture.jpg" alt="" width="960" height="1440" loading="lazy" decoding="async" class="book-cover" />
          </picture>
          <span class="book-hint mono">${icon('book', { size: 14 })} Lire un extrait</span>
        </button>
        <img src="/images/da/sticker-lecture.webp" alt="" width="200" height="260" loading="lazy" class="sticker sticker-book" />
        ${sparkle({ size: 18, className: 'book-sparkle' })}
      </div>
      <div class="book-text">
        <p class="eyebrow eyebrow-dark reveal">Hors du code <span class="eyebrow-line"></span></p>
        <h2 id="book-title" class="section-title reveal">J'écris aussi<br /><em>un roman.</em></h2>
        <p class="book-subtitle reveal">Séléna ~ Captive de la tempête ~</p>
        <ul class="tags tags-dark reveal"><li>Fantasy</li><li>Auto-édition</li><li>En bêta-lecture</li></ul>
        <p class="prose reveal">Après un incident qui bouleverse tout, Séléna se retrouve prisonnière d'une tempête qui ne dit pas son nom. Entre les ruines du silence et les portes d'Elferia, elle va devoir traverser les mensonges des autres pour affronter les siens, et découvrir ce que la tourmente a vraiment fait d'elle.</p>
        <div class="book-actions reveal">
          <button type="button" class="btn btn-solid" data-book-open aria-haspopup="dialog">${icon('book', { size: 16 })} Lire le prologue et le chapitre 1</button>
          <a href="${DISCORD_SERVER.href}" target="_blank" rel="noopener" class="btn btn-outline" aria-label="Rejoindre le serveur Discord ${DISCORD_SERVER.name}"><i class="fab fa-discord" aria-hidden="true"></i> Rejoindre ${DISCORD_SERVER.name.split(' ~')[0]}</a>
        </div>
        <p class="book-hobbies reveal">Et aussi : lecture, jeux vidéo, sport, dessin.</p>
      </div>
    </div>
  </section>`;
}
