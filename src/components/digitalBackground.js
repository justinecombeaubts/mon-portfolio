// Fond global : balises et symboles de code très discrets, derrière tout le contenu.
// Positions fixes (x, y en %) pour que le rendu soit identique au pré-rendu.
// [texte, x, y, taille en rem, rotation en degrés, opacité de base]
const ELEMENTS = [
  ['&lt;/&gt;', 6, 10, 2.6, -8, 0.1],
  ['&lt;div&gt;', 74, 7, 1.1, 4, 0.1],
  ['{ }', 90, 26, 2.8, 8, 0.09],
  ['const', 34, 18, 1, -3, 0.08],
  ['=&gt;', 14, 34, 1.9, 6, 0.09],
  ['&lt;section&gt;', 58, 30, 1.05, -4, 0.08],
  ['fetch()', 82, 46, 1.1, 5, 0.09],
  ['◦──◦──◦', 40, 44, 1.2, 0, 0.1],
  ['await', 5, 56, 1.1, -6, 0.08],
  ['#', 62, 54, 3, 10, 0.07],
  ['&lt;img /&gt;', 24, 64, 1.1, 5, 0.09],
  ['0101', 92, 66, 1.2, -5, 0.08],
  ['[ ]', 46, 72, 2.3, -7, 0.08],
  ['git push', 70, 76, 1.05, 3, 0.09],
  ['( ) =&gt;', 10, 80, 1.5, 7, 0.09],
  ['&lt;/html&gt;', 86, 88, 1.15, -4, 0.09],
  ['●──●', 32, 90, 1.1, 0, 0.09],
  ['if (ok)', 56, 94, 1, 4, 0.08],
];

export function renderDigitalBackground() {
  const items = ELEMENTS.map(
    ([text, x, y, size, rotation, opacity], i) =>
      `<span style="left:${x}%;top:${y}%;font-size:${size}rem;--opacite:${opacity};--rotation:${rotation}deg;--duree:${16 + (i % 5) * 3}s">${text}</span>`
  ).join('');
  return `<div class="fond-digital" aria-hidden="true">${items}</div>`;
}
