import timeline from '../data/timeline.json';

export function renderTimeline() {
  const items = timeline
    .map(
      (t, i) => `
      <li class="timeline-item reveal" style="--delay:${i * 70}ms">
        <span class="timeline-dot" aria-hidden="true"></span>
        <p class="timeline-period mono">${t.period} · ${t.type === 'formation' ? 'Formation' : 'Expérience'}</p>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-place">${t.place}</p>
        <p class="timeline-text">${t.description}</p>
      </li>`
    )
    .join('');
  return `
  <section id="parcours" class="section section-dark" aria-labelledby="parcours-title">
    <div class="container timeline-grid">
      <div class="timeline-head">
        <p class="eyebrow reveal">Parcours <span class="eyebrow-line"></span></p>
        <h2 id="parcours-title" class="section-title reveal">Un chemin<br /><em>construit pas à pas.</em></h2>
        <p class="section-intro reveal">Du BTS au Bachelor IA &amp; Automation, en passant par le terrain : chaque étape a ajouté une corde à mon arc.</p>
        <img src="/images/da/sticker-briller.webp" alt="" width="260" height="260" loading="lazy" class="sticker sticker-dark sticker-timeline reveal" />
      </div>
      <ol class="timeline">${items}</ol>
    </div>
  </section>`;
}
