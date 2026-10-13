// Génère les versions web (WebP + JPG de secours) des grandes images du site.
// Les originaux restent dans images-originales/ ; relancer avec : npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'images-originales';
const OUT = 'public/images';
mkdirSync(OUT, { recursive: true });

// Largeurs choisies pour un affichage net en écran Retina (2x la taille CSS max).
const jobs = [
  { src: 'moi.png', name: 'moi', width: 768 },
  { src: 'accueil.webp', name: 'accueil', width: 768 },
  { src: 'couverture.png', name: 'couverture', width: 640 },
  { src: 'photo-pro.jpg', name: 'photo-pro', width: 224 },
  { src: 'logo.png', name: 'logo', width: 96, png: true },
];

for (const { src, name, width, png } of jobs) {
  const img = sharp(`${SRC}/${src}`).resize({ width, withoutEnlargement: true });
  // Le logo (petit, à aplats) est plus léger en PNG palettisé qu'en WebP.
  if (png) { await img.png({ compressionLevel: 9, palette: true }).toFile(`${OUT}/${name}.png`); continue; }
  await img.clone().webp({ quality: 80 }).toFile(`${OUT}/${name}.webp`);
  await img.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
}

// Image d'aperçu pour LinkedIn / réseaux sociaux (format 1200x630 recommandé).
await sharp(`${SRC}/moi.png`)
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/moi-og.jpg`);

console.log('Images optimisées.');
