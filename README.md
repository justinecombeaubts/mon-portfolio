# Portfolio — Justine Combeau

Portfolio de Justine Combeau (Bachelor 3 IA & Automation / BTS Développement Web), refondu en **Vite + Tailwind CSS + JavaScript vanilla** (ES modules, sans framework).

## Stack

- [Vite](https://vitejs.dev/) — bundler & serveur de dev
- [Tailwind CSS](https://tailwindcss.com/) — styles utilitaires, dark mode par classe
- JavaScript ES modules (pas de framework) — chaque section est un petit composant qui génère son HTML à partir des données JSON
- [Font Awesome](https://fontawesome.com/) — icônes (CDN)
- [Formspree](https://formspree.io/) — traitement du formulaire de contact (champ anti-spam `_gotcha`)
- Pré-rendu au build (plugin dans `vite.config.js`) : `dist/index.html` contient tout le contenu, lisible par Google sans exécuter le JavaScript

## Lancer le projet

```bash
npm install
npm run dev       # serveur de dev (http://localhost:5173)
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build
```

## Structure

```
src/
├── main.js                 # point d'entrée : branche les interactions (et rend le HTML en dev)
├── render.js               # HTML complet du site, pré-rendu dans dist/index.html au build
├── styles/main.css          # Tailwind + classes de composants réutilisables
├── data/
│   ├── projects.json        # source unique des cartes projets + fiches détaillées
│   ├── skills.json           # compétences par catégorie
│   └── timeline.json         # formations & expériences
├── components/               # un fichier = une section (render + logique)
└── utils/theme.js            # dark/light mode (persisté en localStorage)
```

## Mettre à jour le contenu

- **Ajouter un projet** : ajouter une entrée dans `src/data/projects.json` (catégorie `ia-automation`, `dev-web` ou `mobile`) avec `context` (contexte), `solution` + `stack`, et `impact` (liste de résultats). La carte et la fiche détaillée (modale) se génèrent automatiquement.
- **Mettre un projet en avant comme workflow** : ajouter un tableau `workflow` (étapes `{ kind, icon, label, detail }`, `kind` = `source`, `process`, `ai`, `human` ou `output`). Le projet apparaît alors dans la section « Mes workflows en action » et sa fiche affiche le schéma.
- **Mentions légales / confidentialité** : page statique `mentions-legales.html` (à mettre à jour si un nouveau service collecte des données, ex. un autre outil d'analytics).
- **Modifier une compétence** : éditer `src/data/skills.json`.
- **Ajouter une étape de parcours** : éditer `src/data/timeline.json`.
- **Portfolio PDF** (pour les offres qui demandent un fichier) : lancer `npm run portfolio` après avoir modifié les données. Le PDF A4 paysage est généré à partir de `projects.json`, `skills.json` et `timeline.json` dans `public/portfolio/Portfolio_JustineCombeau.pdf` : les projets IA & Automation ont chacun une page, les projets web et mobile sont regroupés. Mise en page : `portfolio-source/portfolio.css` (nécessite Chrome ou Edge et internet pour les polices).
- **Carrousel Instagram** : `npm run instagram` génère 8 slides 1080×1350 dans `instagram/carrousel/` (captures du site en ligne + données du site). Textes dans `instagram/build.mjs`, style dans `instagram/carrousel.css`, légende du post dans `instagram/legende.txt`.
- **Modifier le CV** : le CV en ligne (`public/cv/CV_JustineCombeau.pdf`) est maintenant fait hors du projet (`Documents/Pro/CV Justine Combeau.pdf`) : le copier à cet emplacement en gardant ce nom de fichier. ⚠️ `npm run cv` régénère l'**ancien** CV depuis `cv-source/cv.html` et écraserait le nouveau : ne plus le lancer.
- Les images utilisées par les projets/le hero vivent dans `public/images/` et sont référencées en `/images/xxx.png`. Chaque projet a une `image` (logo, affiché centré sur la carte et dans la section workflows), une couleur `accent` (fond du visuel) et, s'il est en ligne, une `screenshot` (capture 960×540 dans `public/images/projets/`, affichée uniquement dans la fiche détaillée, dans une fenêtre de navigateur).
- **Compétences** : chaque entrée de `skills.json` a un `level` (`projet`, `formation` ou `perso`) et une liste `proof` des projets qui la démontrent — pas de pourcentages.

## Déploiement (Vercel)

- Projet Vercel : `mon-portfolio` — adresse : https://mon-portfolio-justine-combeau.vercel.app
- Déployer en production : `vercel deploy --prod` depuis ce dossier (build : `npm run build`, dossier publié : `dist`).

## ⚠️ À faire côté Justine

- Mettre à jour les dépôts GitHub publics (`recettes-famille`, `qcm-bnssa`) et remplir `le-chat-ivre` (dépôt vide : le lien « Voir le code » a été retiré en attendant) : ils datent de juillet 2026 et ne reflètent pas les dernières versions. Renommer `mon-portofolio` en `mon-portfolio` sur GitHub.
