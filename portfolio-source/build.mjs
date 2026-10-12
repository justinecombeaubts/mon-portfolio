// Génère public/portfolio/Portfolio_JustineCombeau.pdf (A4 paysage) à partir des mêmes
// données que le site : src/data/projects.json, skills.json et timeline.json.
// Usage : npm run portfolio   (Chrome ou Edge doit être installé ; connexion internet pour les polices).
//
// Ordre : les projets IA & Automation (cœur du Bachelor) ont chacun une page complète,
// puis les projets web et mobile sont regroupés sur une page de synthèse.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import QRCode from 'qrcode';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const publicDir = path.join(root, 'public');
const readJson = (name) => JSON.parse(readFileSync(path.join(root, 'src', 'data', name), 'utf8'));

const projects = readJson('projects.json');
const skills = readJson('skills.json');
const timeline = readJson('timeline.json');

const SITE = 'https://mon-portfolio-justine-combeau.vercel.app';
const CONTACT = {
  email: 'justine.combeau.bts@gmail.com',
  phone: '07 87 50 53 29',
  phoneHref: '+33787505329',
  linkedin: 'linkedin.com/in/justine-combeau',
  github: 'github.com/justinecombeaubts',
  instagram: '@nocturne.tech_',
};

const htmlOut = path.join(here, 'portfolio.generated.html');
const pdfOut = process.argv[2] || path.join(publicDir, 'portfolio', 'Portfolio_JustineCombeau.pdf');

// ───────── Helpers ─────────
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const asset = (p) => pathToFileURL(path.join(publicDir, p)).href;
const bare = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const CATEGORY_ORDER = ['ia-automation', 'dev-web', 'mobile'];
const featured = projects.filter((p) => p.category === 'ia-automation');
const others = projects
  .filter((p) => p.category !== 'ia-automation')
  .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
// 2 rangées de 4 cartes par page : au-delà, la grille déborde de la page A4.
const OTHERS_PER_PAGE = 8;
const othersChunks = [];
for (let i = 0; i < others.length; i += OTHERS_PER_PAGE) othersChunks.push(others.slice(i, i + OTHERS_PER_PAGE));

const stats = [
  [projects.length, 'projets réalisés'],
  [projects.filter((p) => p.links.demo).length, 'sites en ligne'],
  [projects.reduce((sum, p) => sum + (p.automations || 0), 0), 'automatisations en production'],
  ['3 j / 2 j', "rythme d'alternance"],
];

const KINDS = {
  source: { label: 'Déclencheur / source', cls: 'k-source' },
  process: { label: 'Traitement', cls: 'k-process' },
  ai: { label: 'IA', cls: 'k-ai' },
  human: { label: 'Validation humaine', cls: 'k-human' },
  output: { label: 'Résultat', cls: 'k-output' },
};

const LEVELS = { projet: 'En projet', formation: 'Formation', perso: 'Perso' };

// ───────── Blocs ─────────
const chips = (items) => items.map((t) => `<span class="chip">${esc(t)}</span>`).join('');

function workflow(steps) {
  return `<ol class="wf">${steps
    .map(
      (s, i) => `
      <li class="wf-step ${(KINDS[s.kind] || KINDS.process).cls}">
        <span class="wf-icon"><i class="fas ${esc(s.icon)}"></i></span>
        <span class="wf-label">${esc(s.label)}</span>
        <span class="wf-detail">${esc(s.detail)}</span>
      </li>${i < steps.length - 1 ? '<li class="wf-arrow"><i class="fas fa-chevron-right"></i></li>' : ''}`
    )
    .join('')}</ol>`;
}

function links(p) {
  const out = [];
  if (p.links.demo) out.push(`<a class="link" href="${esc(p.links.demo)}"><i class="fas fa-arrow-up-right-from-square"></i> ${esc(bare(p.links.demo))}</a>`);
  if (p.links.code) out.push(`<a class="link" href="${esc(p.links.code)}"><i class="fab fa-github"></i> ${esc(bare(p.links.code))}</a>`);
  if (!out.length) out.push(`<span class="link muted"><i class="fas fa-lock"></i> ${esc(p.status)} — pas de démo publique</span>`);
  return out.join('');
}

function visual(p, cls = '') {
  return p.screenshot
    ? `<div class="shot ${cls}"><img src="${asset(p.screenshot)}" alt="" /></div>`
    : `<div class="shot shot-icon ${cls}"><img src="${asset(p.image)}" alt="" /></div>`;
}

function footer(n, total) {
  return `<footer class="foot"><span>Justine Combeau — Portfolio</span><a href="${SITE}">${esc(bare(SITE))}</a><span>${n} / ${total}</span></footer>`;
}

// ───────── Pages ─────────
function coverPage(qr) {
  return `
  <section class="page cover">
    <div class="cover-text">
      <p class="eyebrow light">Portfolio · ${new Date().getFullYear()}</p>
      <h1>Justine <span>Combeau</span></h1>
      <p class="cover-role">Développeuse Web &amp; IA / Automation</p>
      <p class="cover-pitch">Je code des solutions web et je les rends intelligentes : automatisations, agents IA encadrés et applications livrées en ligne.</p>
      <div class="cover-meta">
        <span><i class="fas fa-graduation-cap"></i> Bachelor 3 IA &amp; Automation — Digital Campus Paris</span>
        <span><i class="fas fa-briefcase"></i> Recherche d'alternance : disponible immédiatement (3 j entreprise / 2 j école)</span>
        <span><i class="fas fa-location-dot"></i> Paris, France</span>
      </div>
      <div class="cover-stats">
        ${stats.map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('')}
      </div>
    </div>
    <div class="cover-side">
      <div class="cover-photo"><img src="${asset('images/moi.jpg')}" alt="" /></div>
      <a class="cover-qr" href="${SITE}">
        <span class="qr">${qr}</span>
        <span>Voir le portfolio en ligne<br /><em>${esc(bare(SITE))}</em></span>
      </a>
    </div>
  </section>`;
}

function aboutPage(n, total) {
  const method = [
    ['Comprendre', "Cerner le besoin réel avant d'écrire la moindre ligne de code."],
    ['Construire', 'Un code propre, testé et documenté, pensé pour durer.'],
    ["Coder avec l'IA", 'Assistants IA en binôme : je cadre, je relis, je teste, chaque choix technique reste le mien.'],
    ['Automatiser', 'Identifier ce qui peut être fiabilisé par un script ou un agent IA.'],
    ['Livrer & apprendre', 'Récolter le retour, itérer, documenter la décision.'],
  ];
  return `
  <section class="page">
    <div class="about">
      <div>
        <p class="eyebrow">Qui suis-je</p>
        <h2>À propos</h2>
        <p class="lead">
          Diplômée d'un <strong>BTS Informatique Développement</strong>, je poursuis en
          <strong>Bachelor 3 IA &amp; Automation</strong> à Digital Campus Paris pour connecter mes
          applications à des agents IA et à des automatisations (n8n, Make, GitHub Actions).
        </p>
        <p class="lead">
          À l'aise en développement web (HTML/CSS/JS, Node.js, SQL) comme sur des architectures orientées
          données et IA (Supabase, LLMs, sortie structurée). Mes expériences de terrain — maître nageur
          sauveteur, accueil informatique en service civique — m'ont appris la gestion du stress, la
          pédagogie et le sens du service.
        </p>
        <h3 class="mt">Ma méthode</h3>
        <ol class="method">
          ${method.map(([t, d], i) => `<li><span>${i + 1}</span><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></li>`).join('')}
        </ol>
      </div>
      <div>
        <p class="eyebrow">Boîte à outils</p>
        <h2>Compétences</h2>
        <p class="note">Chaque compétence est reliée au projet qui la prouve.</p>
        <div class="skills">
          ${skills
            .map(
              (cat) => `
            <div class="skill-cat">
              <h4>${esc(cat.category)}</h4>
              <ul>${cat.items
                .map(
                  (it) => `<li><div><span>${esc(it.name)}</span><em class="lvl lvl-${esc(it.level)}">${LEVELS[it.level] || ''}</em></div><small>${esc(it.proof.join(' · '))}</small></li>`
                )
                .join('')}</ul>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
    ${footer(n, total)}
  </section>`;
}

function projectPage(p, i, n, total) {
  return `
  <section class="page">
    <p class="eyebrow">IA &amp; Automation · Projet ${i + 1} / ${featured.length}</p>
    <div class="project">
      <div class="project-text">
        <h2>${esc(p.title)}</h2>
        <p class="tagline">${esc(p.tagline)}</p>
        <p class="status"><i class="fas fa-circle-info"></i> ${esc(p.status)} · ${esc(p.year)}</p>
        <h3><i class="fas fa-briefcase"></i> Contexte</h3>
        <p>${esc(p.context)}</p>
        <h3><i class="fas fa-layer-group"></i> Solution</h3>
        <p>${esc(p.solution)}</p>
        <h3><i class="fas fa-chart-line"></i> Résultat &amp; impact</h3>
        <ul class="impact">${p.impact.map((l) => `<li><i class="fas fa-circle-check"></i><span>${esc(l)}</span></li>`).join('')}</ul>
      </div>
      <div class="project-side">
        ${visual(p)}
        <div class="links">${links(p)}</div>
        <div class="chips">${chips(p.stack)}</div>
      </div>
    </div>
    ${
      p.workflow
        ? `<div class="wf-box"><p class="wf-title">Workflow : le trajet de la donnée</p>${workflow(p.workflow)}</div>`
        : ''
    }
    ${footer(n, total)}
  </section>`;
}

function othersPage(list, part, qr, n, total) {
  const isLast = part === othersChunks.length - 1;
  // Case libre en fin de grille (dernière page) : renvoi vers le site (fiches détaillées, démos).
  const cta =
    isLast && list.length % 4
      ? `<a class="card card-cta" href="${SITE}"><span class="qr">${qr}</span><strong>Toutes les fiches détaillées</strong><span>Contexte, solution, démos et code de chaque projet</span><em>${esc(bare(SITE))}</em></a>`
      : '';
  return `
  <section class="page">
    <p class="eyebrow">Développement Web &amp; Mobile</p>
    <h2>Autres réalisations${othersChunks.length > 1 ? ` <span class="part">${part + 1}/${othersChunks.length}</span>` : ''}</h2>
    <div class="grid">
      ${list
        .map(
          (p) => `
        <article class="card">
          ${visual(p, 'small')}
          <div class="card-body">
            <p class="card-status">${esc(p.status)} · ${esc(p.year)}</p>
            <h4>${esc(p.title)}</h4>
            <p>${esc(p.tagline)}</p>
            <p class="card-stack">${esc(p.stack.slice(0, 4).join(' · '))}</p>
            <div class="links">${links(p)}</div>
          </div>
        </article>`
        )
        .join('')}
      ${cta}
    </div>
    ${footer(n, total)}
  </section>`;
}

function lastPage(qr, n, total) {
  return `
  <section class="page">
    <div class="last">
      <div>
        <p class="eyebrow">Étapes clés</p>
        <h2>Parcours &amp; formation</h2>
        <ol class="timeline">
          ${timeline
            .map(
              (t) => `<li><span class="t-dot"></span><p class="t-period">${esc(t.period)} · ${t.type === 'formation' ? 'Formation' : 'Expérience'}</p><h4>${esc(t.title)}</h4><p class="t-place">${esc(t.place)}</p><p>${esc(t.description)}</p></li>`
            )
            .join('')}
        </ol>
      </div>
      <div class="contact">
        <p class="eyebrow light">Discutons</p>
        <h2>Contact</h2>
        <p class="contact-lead">En recherche d'alternance (3 jours entreprise / 2 jours école) — une question, une offre ?</p>
        <ul>
          <li><i class="fas fa-envelope"></i><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
          <li><i class="fas fa-phone"></i><a href="tel:${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
          <li><i class="fab fa-linkedin-in"></i><a href="https://www.${CONTACT.linkedin}/">${CONTACT.linkedin}</a></li>
          <li><i class="fab fa-github"></i><a href="https://${CONTACT.github}">${CONTACT.github}</a></li>
          <li><i class="fab fa-instagram"></i><a href="https://www.instagram.com/nocturne.tech_/">${CONTACT.instagram}</a></li>
          <li><i class="fas fa-location-dot"></i>Paris, France</li>
        </ul>
        <a class="contact-qr" href="${SITE}">
          <span class="qr">${qr}</span>
          <span>Toutes les démos, le CV et les fiches détaillées :<br /><em>${esc(bare(SITE))}</em></span>
        </a>
      </div>
    </div>
    ${footer(n, total)}
  </section>`;
}

// ───────── Assemblage ─────────
const qrLight = await QRCode.toString(SITE, { type: 'svg', margin: 0, color: { dark: '#2a0f17', light: '#ffffff' } });
const total = 2 + featured.length + othersChunks.length + 1;
const pages = [
  coverPage(qrLight),
  aboutPage(2, total),
  ...featured.map((p, i) => projectPage(p, i, 3 + i, total)),
  ...othersChunks.map((list, i) => othersPage(list, i, qrLight, 3 + featured.length + i, total)),
  lastPage(qrLight, total, total),
];

const css = readFileSync(path.join(here, 'portfolio.css'), 'utf8');
writeFileSync(
  htmlOut,
  `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Portfolio — Justine Combeau</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
<style>${css}</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>`
);

// ───────── PDF via Chrome headless (comme cv-source/build.mjs) ─────────
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome/Edge introuvable. Définis CHROME_PATH vers son exécutable.');
  process.exit(1);
}

mkdirSync(path.dirname(pdfOut), { recursive: true });
const res = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--allow-file-access-from-files',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${path.resolve(pdfOut)}`,
    pathToFileURL(htmlOut).href,
  ],
  { stdio: 'inherit' }
);
if (res.status === 0) console.log(`Portfolio généré : ${path.relative(root, pdfOut)} (${total} pages)`);
process.exit(res.status ?? 1);
