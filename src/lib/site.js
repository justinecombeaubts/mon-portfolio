// Données communes à toutes les pages : identité, liens, navigation, catégories de projets.
import projects from '../data/projects.json';

export const CONTACT = {
  email: 'justine.combeau.bts@gmail.com',
  phone: '07 87 50 53 29',
  phoneHref: 'tel:+33787505329',
  city: 'Paris, France',
  cv: '/cv/CV_JustineCombeau.pdf',
  portfolioPdf: '/portfolio/Portfolio_JustineCombeau.pdf',
};

export const SOCIALS = [
  { href: 'https://www.linkedin.com/in/justine-combeau/', icon: 'linkedin', label: 'LinkedIn' },
  { href: 'https://github.com/justinecombeaubts', icon: 'github', label: 'GitHub' },
  { href: 'https://www.instagram.com/nocturne.tech_/', icon: 'instagram', label: 'Instagram @nocturne.tech_' },
];

// Liens du menu : ancres de l'accueil (préfixées par « / » depuis les autres pages).
export const NAV = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
];

export const CATEGORIES = [
  { id: 'ia-automation', label: 'IA & Automation' },
  { id: 'dev-web', label: 'Développement web' },
  { id: 'mobile', label: 'Applications mobiles' },
];
export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

// Chiffres clés calculés depuis projects.json : ils restent justes quand on ajoute un projet.
export const STATS = [
  { value: projects.length, label: 'projets réalisés' },
  { value: projects.filter((p) => p.links.demo).length, label: 'sites en ligne' },
  { value: projects.reduce((sum, p) => sum + (p.automations || 0), 0), label: 'automatisations en production' },
  { value: '3 j / 2 j', label: "rythme d'alternance" },
];

export { projects };

// Visuel d'un projet : couverture dessinée dans la DA (jamais de capture d'écran du site).
export { renderProjectArt as projectVisual } from '../components/projectArt.js';
