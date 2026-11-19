// Prépare les images de la DA bordeaux à partir de images-originales/refonte/ :
// portrait, illustration en pied et stickers découpés (fond blanc rendu transparent).
// Usage : node scripts/prepare-da-images.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'images-originales/refonte';
const OUT = 'public/images/da';

// [fichier source, nom de sortie, zone { left, top, width, height }]
const STICKERS = [
  ['stickers-3.webp', 'sticker-idee', { left: 0, top: 364, width: 364, height: 364 }],
  ['stickers-3.webp', 'sticker-on-y-croit', { left: 364, top: 364, width: 364, height: 364 }],
  ['stickers-3.webp', 'sticker-briller', { left: 0, top: 728, width: 364, height: 364 }],
  ['stickers-2.webp', 'sticker-bonjour', { left: 0, top: 0, width: 266, height: 379 }],
  ['stickers-2.webp', 'sticker-lecture', { left: 266, top: 379, width: 266, height: 379 }],
  ['stickers-1.webp', 'sticker-ordi', { left: 0, top: 0, width: 372, height: 352 }],
];

// Rend transparent le fond blanc relié aux bords de l'image (remplissage par diffusion),
// sans toucher aux blancs intérieurs (tasse, pull...).
async function knockOutWhite(input) {
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const isBg = (i) => data[i] > 226 && data[i + 1] > 220 && data[i + 2] > 220;
  const seen = new Uint8Array(width * height);
  const stack = [];
  for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!isBg(p * 4)) continue;
    data[p * 4 + 3] = 0;
    const x = p % width;
    const y = (p / width) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - width);
    if (y < height - 1) stack.push(p + width);
  }
  // Supprime les morceaux des stickers voisins : tout élément opaque qui touche un bord,
  // sauf le plus grand (le sticker lui-même).
  const label = new Int32Array(width * height).fill(-1);
  const comps = [];
  for (let s = 0; s < width * height; s++) {
    if (label[s] !== -1 || !data[s * 4 + 3]) continue;
    const id = comps.length;
    const pixels = [];
    let edge = false;
    const st = [s];
    label[s] = id;
    while (st.length) {
      const p = st.pop();
      pixels.push(p);
      const x = p % width;
      const y = (p / width) | 0;
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) edge = true;
      for (const q of [x > 0 && p - 1, x < width - 1 && p + 1, y > 0 && p - width, y < height - 1 && p + width]) {
        if (q !== false && label[q] === -1 && data[q * 4 + 3]) {
          label[q] = id;
          st.push(q);
        }
      }
    }
    comps.push({ pixels, edge });
  }
  const biggest = comps.reduce((a, b) => (b.pixels.length > a.pixels.length ? b : a), comps[0]);
  for (const c of comps) {
    if (c !== biggest && (c.edge || c.pixels.length < 12)) for (const p of c.pixels) data[p * 4 + 3] = 0;
  }

  // Adoucit le bord : les pixels opaques voisins du fond deviennent semi-transparents.
  const alpha = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) alpha[p] = data[p * 4 + 3];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x;
      if (!alpha[p]) continue;
      const n = [p - 1, p + 1, p - width, p + width].filter((q) => !alpha[q]).length;
      if (n) data[p * 4 + 3] = 255 - n * 50;
    }
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).trim();
}

await mkdir(OUT, { recursive: true });

// Portrait (photo réelle) : recadré pour l'arche du hero.
const portrait = sharp(`${SRC}/photo-justine.webp`).resize({ width: 720 });
await portrait.clone().webp({ quality: 82 }).toFile(`${OUT}/portrait.webp`);
await portrait.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/portrait.jpg`);

// Illustration en pied : fond rose pâle conservé (elle vit dans une arche).
const silhouette = sharp(`${SRC}/illustration-silhouette.webp`).resize({ width: 640 });
await silhouette.clone().webp({ quality: 82 }).toFile(`${OUT}/silhouette.webp`);
await silhouette.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/silhouette.jpg`);

for (const [file, name, area] of STICKERS) {
  const cut = await knockOutWhite(sharp(`${SRC}/${file}`).extract(area));
  const buf = await cut.png().toBuffer();
  await sharp(buf).resize({ width: 320, withoutEnlargement: true }).webp({ quality: 85, alphaQuality: 90 }).toFile(`${OUT}/${name}.webp`);
  await sharp(buf).resize({ width: 320, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }).toFile(`${OUT}/${name}.png`);
  console.log('✓', name);
}
console.log('Images DA prêtes dans', OUT);
