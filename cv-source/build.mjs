// Génère public/cv/CV_JustineCombeau.pdf à partir de cv-source/cv.html avec Chrome (headless).
// Usage : npm run cv   (Chrome ou Edge doit être installé ; connexion internet pour les polices).
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = path.join(here, 'cv.html');
const out = process.argv[2] || path.join(here, '..', 'public', 'cv', 'CV_JustineCombeau.pdf');

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

const res = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=20000',
    `--print-to-pdf=${path.resolve(out)}`,
    pathToFileURL(html).href,
  ],
  { stdio: 'inherit' }
);
process.exit(res.status ?? 1);
