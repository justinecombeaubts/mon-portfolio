# Portfolio — Justine Combeau

Portfolio de Justine Combeau (Bachelor 3 IA & Automation / BTS Développement Web), refondu en **Vite + Tailwind CSS + JavaScript vanilla** (ES modules, sans framework).

## Stack

- [Vite](https://vitejs.dev/) — bundler & serveur de dev
- [Tailwind CSS](https://tailwindcss.com/) — styles utilitaires, dark mode par classe
- JavaScript ES modules (pas de framework) — chaque section est un petit composant qui génère son HTML à partir des données JSON
- [Font Awesome](https://fontawesome.com/) — icônes (CDN)
- [Formspree](https://formspree.io/) — traitement du formulaire de contact

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
├── main.js                 # point d'entrée : monte toutes les sections
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
- **Modifier une compétence** : éditer `src/data/skills.json`.
- **Ajouter une étape de parcours** : éditer `src/data/timeline.json`.
- **Modifier le CV** : éditer `cv-source/cv.html`, puis lancer `npm run cv` (nécessite Chrome ou Edge et une connexion internet pour les polices). Le PDF est régénéré dans `public/cv/CV_JustineCombeau.pdf`.
- Les images utilisées par les projets/le hero vivent dans `public/images/` et sont référencées en `/images/xxx.png`. Chaque projet a une `image` (icône, utilisée dans la section workflows) et, s'il est en ligne, une `screenshot` (capture 960×540 dans `public/images/projets/`, utilisée pour la carte et la fiche).
- **Compétences** : chaque entrée de `skills.json` a un `level` (`projet`, `formation` ou `perso`) et une liste `proof` des projets qui la démontrent — pas de pourcentages.

## Déploiement (Vercel)

- Projet Vercel : `mon-portfolio` — adresse : https://mon-portfolio-justine-combeau.vercel.app
- Déployer en production : `vercel deploy --prod` depuis ce dossier (build : `npm run build`, dossier publié : `dist`).

## ⚠️ À faire côté Justine

- Mettre à jour les dépôts GitHub publics (`recettes-famille`, `qcm-bnssa`) et remplir `le-chat-ivre` (dépôt vide : le lien « Voir le code » a été retiré en attendant) : ils datent de juillet 2026 et ne reflètent pas les dernières versions. Renommer `mon-portofolio` en `mon-portfolio` sur GitHub.
