# Portfolio | Justine Combeau

Portfolio de Justine Combeau (Bachelor 3 IA & Automation / BTS Développement Web), refondu en **Vite + CSS sur mesure + JavaScript vanilla** (ES modules, sans framework).

## Direction artistique (v3, novembre 2026)

« Bordeaux numérique » : bordeaux profond `#48151C`, ivoire `#F4EDE5`, rose champagne `#C9A6A0`, brun presque noir `#241719`. Titres en Cormorant Garamond, texte en Manrope, touches techniques en JetBrains Mono. Sections sombres et claires en alternance, arches (photo, illustration), lignes fines, fond animé de connexions numériques (`src/components/network.js`), impulsions qui parcourent les schémas de workflow, stickers illustrés de Justine. Les animations s'arrêtent si « réduire les animations » est activé.

## Stack

- [Vite](https://vitejs.dev/) : bundler & serveur de dev
- CSS sur mesure (`src/styles/main.css`) : variables de la palette en haut du fichier, aucune dépendance
- JavaScript ES modules (pas de framework) : chaque section est un petit composant qui génère son HTML à partir des données JSON
- Icônes de l'interface : SVG au trait fin dans `src/lib/icons.js` ; [Font Awesome](https://fontawesome.com/) (CDN) seulement pour les icônes des étapes de workflow (`projects.json`)
- Formulaire de contact : fonction Vercel `api/contact.js` qui poste chaque message sur Discord (webhook dans la variable d'environnement `DISCORD_WEBHOOK_URL`, jamais dans le code ; champ anti-spam `_gotcha` + envoi en moins de 3 s ignoré). En local, `npm run dev` sert aussi `/api/contact` (définir `DISCORD_WEBHOOK_URL` avant de lancer)
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
├── render.js               # HTML complet de chaque page (accueil, projets), pré-rendu dans dist/ au build
├── styles/main.css          # toute la DA : variables, sections, composants, animations
├── data/
│   ├── projects.json        # source unique des cartes projets + fiches détaillées
│   ├── skills.json           # compétences par catégorie
│   └── timeline.json         # formations & expériences
├── lib/
│   ├── site.js               # coordonnées, réseaux, menu, catégories, chiffres clés
│   ├── icons.js              # icônes SVG au trait + étoile « éclat »
│   └── reveal.js             # apparition des blocs au défilement
└── components/               # un fichier = une section (render + logique)
```

Images de la DA : `public/images/da/` (portrait, illustration, stickers détourés), générées par `npm run images:da` à partir de `images-originales/refonte/`.

## Mettre à jour le contenu

- **Ajouter un projet** : ajouter une entrée dans `src/data/projects.json` (catégorie `ia-automation`, `dev-web` ou `mobile`) avec `context` (contexte), `solution` + `stack`, et `impact` (liste de résultats). Le projet apparaît automatiquement sur la page `projets.html` (liste où chaque ligne se déplie sur le détail et le workflow ; lien direct vers une ligne : `/projets.html#<id>`).
- **Champs facultatifs d'un projet** : `gallery` (liste `{ src, alt, wide?, placeholder? }` affichée en bande défilante « En images » ; `placeholder: true` affiche un cadre « Image à venir »), `links.presentation` (PDF téléchargeable, rangé dans `public/projets/`), `privateNote`, `imageAlt`, `subtitle` (sous-titre de la fiche), `summary` (texte de la carte, à la place de `tagline`), `facts` (`{ label, value }` : type, rôle, statut), `solutionIntro` + `solutionSteps` (solution en étapes ; `solution` reste le texte du PDF), `details` (sections en plus : `{ icon, title, text?, list?, table?, image? }`).
- **Menu** : barre fixe en haut (transparente sur le hero, bordeaux au défilement) ; sur téléphone et tablette, menu plein écran (`src/components/header.js`).
- **Projets de la page d'accueil** : seuls ceux qui ont `"featured": true` y sont affichés en cartes (4 idéalement, grille de 2), avec la fiche en modale ; un lien mène à `projets.html`.
- **Mettre un projet en avant comme workflow** : ajouter un tableau `workflow` (étapes `{ kind, icon, label, detail }`, `kind` = `source`, `process`, `ai`, `human` ou `output`). Le projet apparaît alors dans la section « Mes workflows en action » et sa fiche affiche le schéma.
- **Mentions légales / confidentialité** : page statique `mentions-legales.html` (à mettre à jour si un nouveau service collecte des données, ex. un autre outil d'analytics).
- **Modifier une compétence** : éditer `src/data/skills.json`.
- **Ajouter une étape de parcours** : éditer `src/data/timeline.json`.
- **Portfolio PDF** (pour les offres qui demandent un fichier) : lancer `npm run portfolio` après avoir modifié les données. Le PDF A4 paysage est généré à partir de `projects.json`, `skills.json` et `timeline.json` dans `public/portfolio/Portfolio_JustineCombeau.pdf` : les projets IA & Automation ont chacun une page, les projets web et mobile sont regroupés. Mise en page : `portfolio-source/portfolio.css` (nécessite Chrome ou Edge et internet pour les polices).
- **Carrousel Instagram** : `npm run instagram` génère 8 slides 1080×1350 dans `instagram/carrousel/` (captures du site en ligne + données du site). Textes dans `instagram/build.mjs`, style dans `instagram/carrousel.css`, légende du post dans `instagram/legende.txt`.
- **Modifier le CV** : le CV en ligne (`public/cv/CV_JustineCombeau.pdf`) est maintenant fait hors du projet (`Documents/Pro/CV_Justine_Combeau.pdf`) : le copier à cet emplacement en gardant ce nom de fichier.
- **Visuels des projets** : aucune capture d'écran sur le site. Chaque projet a une couverture dessinée dans la DA (`src/components/projectArt.js`) : fond bordeaux teinté par sa couleur `accent`, réseau de connexions propre au projet, motif au trait selon la catégorie (fenêtre web, téléphone, ou chaîne des étapes du `workflow` pour l'IA & Automation) et son logo `image` en médaillon. Rien à faire pour un nouveau projet : la couverture se génère toute seule. Les champs `screenshot` restent dans `projects.json` uniquement pour le portfolio PDF et le carrousel Instagram.
- **Compétences** : chaque entrée de `skills.json` a un `level` (`projet`, `formation` ou `perso`) et une liste `proof` des projets qui la démontrent, sans pourcentages.

## Déploiement (Vercel)

- Projet Vercel : `mon-portfolio`, adresse : https://mon-portfolio-justine-combeau.vercel.app
- Déployer en production : `vercel deploy --prod` depuis ce dossier (build : `npm run build`, dossier publié : `dist`).

## ⚠️ À faire côté Justine

- Mettre à jour les dépôts GitHub publics (`recettes-famille`, `qcm-bnssa`) et remplir `le-chat-ivre` (dépôt vide : le lien « Voir le code » a été retiré en attendant) : ils datent de juillet 2026 et ne reflètent pas les dernières versions. Renommer `mon-portofolio` en `mon-portfolio` sur GitHub.

## Liseuse du roman

Section « Hors du code » : `src/components/bookReader.js` affiche la couverture, le prologue et le chapitre 1, une page « La suite bientôt… » puis la 4e de couverture. Le texte est dans `src/data/selena-extrait.json` (seul extrait présent dans le site, chargé uniquement à l'ouverture du livre) ; la pagination se calcule selon la taille de l'écran. Bouton vers le serveur Discord Astraleth (`DISCORD_SERVER` dans le même fichier). Styles : section « Liseuse » de `src/styles/main.css`.
