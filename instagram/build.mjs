// Génère le carrousel Instagram de présentation du portfolio : instagram/carrousel/slide-01.png …
// Format 1080×1350 (4:5, le plus grand dans le fil), rendu en 2x puis réduit pour un texte net.
// Usage : npm run instagram   (Chrome ou Edge + connexion internet pour les polices et les captures du site).
//
// Étapes : 1) captures du site en ligne (ordinateur + mobile), 2) HTML des slides depuis les données
// du site (chiffres, captures de projets), 3) une capture Chrome par slide.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(here, 'carrousel');
const tmpDir = path.join(here, '.tmp');
const SITE = 'https://mon-portfolio-justine-combeau.vercel.app';
const HANDLE = '@nocturne.tech_';

const projects = JSON.parse(readFileSync(path.join(root, 'src', 'data', 'projects.json'), 'utf8'));
const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
const asset = (p) => pathToFileURL(path.join(publicDir, p)).href;
const local = (p) => pathToFileURL(p).href;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const stats = {
  projects: projects.length,
  online: projects.filter((p) => p.links.demo).length,
  automations: projects.reduce((sum, p) => sum + (p.automations || 0), 0),
};

// ───────── Chrome ─────────
const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
  .filter(Boolean)
  .find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome/Edge introuvable. Définis CHROME_PATH vers son exécutable.');
  process.exit(1);
}

function shoot(url, file, width, height, scale = 1) {
  const res = spawnSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      `--force-device-scale-factor=${scale}`,
      '--virtual-time-budget=15000',
      `--window-size=${width},${height}`,
      `--screenshot=${file}`,
      url,
    ],
    { stdio: 'ignore' }
  );
  if (res.status !== 0 || !existsSync(file)) throw new Error(`Capture impossible : ${url}`);
}

rmSync(tmpDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

// 1) Captures du site en ligne
console.log('Captures du site…');
const siteDesktop = path.join(tmpDir, 'site-desktop.png');
const siteMobile = path.join(tmpDir, 'site-mobile.png');
shoot(SITE, siteDesktop, 1440, 900, 1);
shoot(SITE, siteMobile, 390, 844, 2);

// ───────── Blocs communs ─────────
const TOTAL = 8;
function frame(n, inner, cls = '') {
  const dots = Array.from({ length: TOTAL }, (_, i) => `<i class="${i + 1 === n ? 'on' : ''}"></i>`).join('');
  return `
  <section class="slide ${cls}" id="s${n}">
    <div class="grid-bg"></div>
    <div class="content">${inner}</div>
    <footer class="foot">
      <span class="handle"><img src="${asset('images/logo.png')}" alt="" />${HANDLE}</span>
      <span class="dots">${dots}</span>
      ${n < TOTAL ? '<span class="swipe">Swipe <b>→</b></span>' : `<span class="swipe">${n} / ${TOTAL}</span>`}
    </footer>
  </section>`;
}
const browser = (src, cls = '', url = SITE) => `
  <div class="browser ${cls}">
    <div class="browser-bar"><i></i><i></i><i></i><span>${esc(url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span></div>
    <img src="${src}" alt="" />
  </div>`;
const phone = (src, cls = '') => `<div class="phone ${cls}"><img src="${src}" alt="" /></div>`;
const shot = (p) => `<div class="pshot"><img src="${asset(p.screenshot)}" alt="" /></div>`;

// ───────── Slides ─────────
const qr = await QRCode.toString(SITE, { type: 'svg', margin: 0, color: { dark: '#2a0f17', light: '#ffffff' } });
const coc = byId['coc-carpe-diem'];
const marketing = byId['marketing-assistant'];
const edustudy = byId['edustudy-hub'];
// Accroche courte par projet (les taglines du site sont trop longues pour une vignette).
const webShowcase = [
  ['route-35', '451 questions expliquées, appli installable'],
  ['recettes-famille', '125 recettes sauvées d’un export cassé'],
  ['le-chat-ivre', 'Carte modifiable par le bar lui-même'],
  ['agenda-sorties', 'Les dates où tout le monde est libre'],
].map(([id, line]) => ({ ...byId[id], line }));

const slides = [
  // 1 — Accroche
  frame(
    1,
    `
    <p class="kicker">✦ Nouveau</p>
    <h1>Mon portfolio<br /><span>est en ligne.</span></h1>
    <p class="sub">Développeuse Web &amp; IA / Automation, je cherche mon <b>alternance</b>. Je te fais la visite&nbsp;?</p>
    <div class="hero-devices">
      ${browser(local(siteDesktop), 'tilt')}
      ${phone(local(siteMobile), 'float')}
    </div>`,
    'cover'
  ),

  // 2 — Qui je suis
  frame(
    2,
    `
    <p class="kicker">Qui je suis</p>
    <div class="me">
      <div class="me-photo"><img src="${asset('images/moi.jpg')}" alt="" /></div>
      <div>
        <h2>Justine<br /><span>Combeau</span></h2>
        <p class="sub small">Je code des solutions web… et je les rends <b>intelligentes</b>.</p>
      </div>
    </div>
    <ul class="facts">
      <li><i class="fas fa-graduation-cap"></i><div><b>Bachelor 3 IA &amp; Automation</b><span>Digital Campus Paris, après un BTS Informatique Développement</span></div></li>
      <li><i class="fas fa-briefcase"></i><div><b>Alternance : disponible immédiatement</b><span>Rythme 3 jours entreprise / 2 jours école, à Paris</span></div></li>
      <li><i class="fas fa-layer-group"></i><div><b>Ma stack</b><span>JavaScript, Node.js, Supabase, Make, n8n, GitHub Actions, API LLM</span></div></li>
    </ul>
    <div class="stats">
      <div><b>${stats.projects}</b><span>projets réalisés</span></div>
      <div><b>${stats.online}</b><span>sites en ligne</span></div>
      <div><b>${stats.automations}</b><span>automatisations en production</span></div>
    </div>`
  ),

  // 3 — Ce qu'on trouve sur le site
  frame(
    3,
    `
    <p class="kicker">Sur le site</p>
    <h2>Pas juste des captures&nbsp;:<br /><span>des preuves.</span></h2>
    <ul class="features">
      <li><i class="fas fa-folder-open"></i><div><b>Chaque projet raconté</b><span>Contexte → solution → impact, avec des chiffres concrets</span></div></li>
      <li><i class="fas fa-diagram-project"></i><div><b>Mes workflows en action</b><span>Le trajet de la donnée, de l'automatisation à l'IA</span></div></li>
      <li><i class="fas fa-circle-check"></i><div><b>Des compétences prouvées</b><span>Zéro barre de pourcentage : chaque compétence renvoie au projet qui la démontre</span></div></li>
      <li><i class="fas fa-file-arrow-down"></i><div><b>CV + portfolio en PDF</b><span>Prêts à joindre à une candidature</span></div></li>
    </ul>`
  ),

  // 4 — Projet IA phare
  frame(
    4,
    `
    <p class="kicker">Projet phare · Automatisation</p>
    <h2 class="h-project">${esc(coc.title).replace(/-/g, '‑') /* tiret insécable */}</h2>
    <p class="sub small">${esc(coc.tagline)}</p>
    ${browser(asset(coc.screenshot), 'wide', coc.links.demo)}
    <ol class="flow">
      ${coc.workflow.map((s, i) => `<li class="k-${s.kind}"><i class="fas ${s.icon}"></i><span>${esc(s.label)}</span></li>${i < coc.workflow.length - 1 ? '<li class="arrow">›</li>' : ''}`).join('')}
    </ol>
    <p class="proof"><i class="fas fa-bolt"></i> 5 automatisations GitHub Actions + Supabase, alertes Discord en moins de 2h, sans aucune action manuelle.</p>`
  ),

  // 5 — L'IA encadrée
  frame(
    5,
    `
    <p class="kicker">Ma vision de l'IA</p>
    <h2>Une IA utile…<br /><span>et encadrée.</span></h2>
    <div class="duo">
      <article>
        <p class="tag"><i class="fas fa-calculator"></i> ${esc(marketing.title)}</p>
        <h3>Le LLM ne calcule <span>rien</span>.</h3>
        <p>Les chiffres viennent d'un code Python contrôlé. L'IA ne fait que choisir et expliquer des faits déjà calculés&nbsp;: zéro hallucination sur les KPI.</p>
      </article>
      <article>
        <p class="tag"><i class="fas fa-user-check"></i> ${esc(edustudy.title)}</p>
        <h3>L'humain <span>valide</span> toujours.</h3>
        <p>L'IA génère flashcards et QCM, mais rien n'est enregistré sans validation, et le contenu généré porte un badge visible.</p>
      </article>
    </div>
    <p class="quote">« L'IA assiste, elle ne décide pas à ta place. »</p>`
  ),

  // 6 — Projets web
  frame(
    6,
    `
    <p class="kicker">Développement web</p>
    <h2>Des applis<br /><span>vraiment en ligne.</span></h2>
    <div class="mosaic">
      ${webShowcase.map((p) => `<figure>${shot(p)}<figcaption><b>${esc(p.title)}</b><span>${esc(p.line)}</span></figcaption></figure>`).join('')}
    </div>`
  ),

  // 7 — Coulisses techniques
  frame(
    7,
    `
    <p class="kicker">Les coulisses</p>
    <h2>Un portfolio<br /><span>codé à la main.</span></h2>
    <div class="tech">
      <div><i class="fab fa-js"></i><b>Vite + Tailwind + JS</b><span>Sans framework, chaque section générée depuis des fichiers JSON</span></div>
      <div><i class="fas fa-gauge-high"></i><b>~130 Ko</b><span>Images WebP, chargement en moins de 2 s</span></div>
      <div><i class="fas fa-magnifying-glass"></i><b>Pré-rendu SEO</b><span>Tout le contenu lisible par Google dès le build</span></div>
      <div><i class="fas fa-file-pdf"></i><b>PDF automatique</b><span>Le portfolio PDF est généré à partir des mêmes données</span></div>
      <div><i class="fas fa-moon"></i><b>Clair / sombre</b><span>Thème mémorisé, aucune flash au chargement</span></div>
      <div><i class="fas fa-shield-halved"></i><b>RGPD</b><span>Aucun cookie, mentions légales, formulaire anti-spam</span></div>
    </div>`
  ),

  // 8 — Appel à l'action
  frame(
    8,
    `
    <p class="kicker">À toi de jouer</p>
    <h2>Viens voir<br /><span>par toi-même.</span></h2>
    <div class="cta">
      <div class="qr">${qr}</div>
      <div>
        <p class="link-bio"><i class="fas fa-link"></i> Lien en bio</p>
        <p class="url">${esc(SITE.replace('https://', ''))}</p>
      </div>
    </div>
    <div class="recruit">
      <p><b>Recruteur, recruteuse ?</b> Je cherche une alternance en développement web / IA &amp; automatisation, 3 j / 2 j, à Paris. Écris-moi&nbsp;!</p>
      <p class="mail"><i class="fas fa-envelope"></i> justine.combeau.bts@gmail.com</p>
    </div>
    <div class="actions">
      <span><i class="far fa-bookmark"></i> Enregistre</span>
      <span><i class="far fa-paper-plane"></i> Partage à un·e recruteur·se</span>
      <span><i class="far fa-comment"></i> Ton avis en commentaire</span>
    </div>`,
    'cover'
  ),
];

const css = readFileSync(path.join(here, 'carrousel.css'), 'utf8');
const htmlFile = path.join(tmpDir, 'carrousel.html');
writeFileSync(
  htmlFile,
  `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
<style>${css}</style>
<script>
  // ?s=N : n'affiche que la slide N (une capture par slide).
  document.addEventListener('DOMContentLoaded', () => {
    const n = new URLSearchParams(location.search).get('s');
    if (n) document.querySelectorAll('.slide').forEach((s) => (s.hidden = s.id !== 's' + n));
  });
</script>
</head>
<body>
${slides.join('\n')}
</body>
</html>`
);

// 3) Une capture par slide, en 2x puis réduite à 1080×1350
for (let n = 1; n <= TOTAL; n++) {
  const raw = path.join(tmpDir, `raw-${n}.png`);
  shoot(`${local(htmlFile)}?s=${n}`, raw, 1080, 1350, 2);
  const out = path.join(outDir, `slide-${String(n).padStart(2, '0')}.png`);
  await sharp(raw).resize(1080, 1350).png({ compressionLevel: 9 }).toFile(out);
  console.log(`  ${path.relative(root, out)}`);
}
rmSync(tmpDir, { recursive: true, force: true });
console.log(`Carrousel généré : ${TOTAL} slides dans ${path.relative(root, outDir)}`);
