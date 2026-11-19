// Fond « connexions numériques » : nœuds reliés par des lignes fines, quelques impulsions
// qui circulent. Généré de façon déterministe (même dessin au pré-rendu et en dev).
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function renderNetwork({ seed = 7, count = 34, width = 1440, height = 820, className = '' } = {}) {
  const rand = seeded(seed);
  const nodes = Array.from({ length: count }, () => ({
    x: Math.round(rand() * width),
    y: Math.round(rand() * height),
    r: 1.2 + rand() * 1.8,
  }));
  const lines = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j }) => j > i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .filter(({ d }) => d < 320)
      .forEach(({ j }) => lines.push([a, nodes[j]]));
  });
  const lineEls = lines
    .map(([a, b], i) => {
      const pulse = i % 5 === 0;
      const len = Math.round(Math.hypot(a.x - b.x, a.y - b.y));
      const base = `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
      // Lignes « impulsion » : une copie où un trait lumineux parcourt la connexion.
      return pulse
        ? `${base}<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="pulse" style="--len:${len}px;--d:${((i * 0.37) % 6).toFixed(2)}s"/>`
        : base;
    })
    .join('');
  const nodeEls = nodes
    .map((n, i) => `<circle cx="${n.x}" cy="${n.y}" r="${n.r.toFixed(1)}"${i % 4 === 0 ? ` class="blink" style="--d:${(i * 0.53) % 5}s"` : ''}/>`)
    .join('');
  return `
    <svg class="network ${className}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g class="network-lines">${lineEls}</g>
      <g class="network-nodes">${nodeEls}</g>
    </svg>`;
}

// Fines ondulations soyeuses (bandeau contact) : courbes qui respirent lentement.
export function renderWaves({ className = '' } = {}) {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 120 + i * 16;
    return `<path d="M-40 ${y} C 260 ${y - 120 + i * 6}, 520 ${y + 140 - i * 10}, 820 ${y - 20} S 1260 ${y - 150 + i * 12}, 1480 ${y - 40}" style="--i:${i}"/>`;
  }).join('');
  return `<svg class="waves ${className}" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">${paths}</svg>`;
}
