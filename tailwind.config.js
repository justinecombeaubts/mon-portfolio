/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './mentions-legales.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Montserrat"', '"League Spartan"', 'sans-serif'],
        sans: ['"Inter"', '"Open Sans"', 'sans-serif'],
        code: ['"Source Code Pro"', '"Courier Prime"', 'monospace'],
      },
      colors: {
        // DA « Bordeaux · Argent · Rose nude » — sobre et pro.
        // Sombre : fond bordeaux, texte argenté, éléments rose nude.
        // Clair (couleurs échangées) : fond argenté, texte bordeaux, éléments rose nude.

        // Blanc piloté par variable : blanc pur en clair, argent en sombre (titres, texte fort).
        white: 'rgb(var(--c-white) / <alpha-value>)',
        // Rose nude : boutons, puces, liens, accents. Les teintes 500+ restent lisibles sur fond clair.
        brand: {
          50: '#fbf3f0',
          100: '#f5e4de',
          200: '#ecd0c6',
          300: '#e2baac',
          400: '#cf9d8e',
          500: '#9e5f66',
          600: '#8f5159',
          700: '#7a4049',
          800: '#5e2c36',
          900: '#451d26',
        },
        // Mauve argenté : accents secondaires (icônes, dégradés discrets).
        ai: {
          400: '#c9b3b8',
          500: '#a88f96',
          600: '#7d6269',
        },
        // Neutres : de l'argent (50) au bordeaux (900). Texte en clair, gris argentés en sombre.
        slate: {
          50: '#f7f7f9',
          100: '#ebebee',
          200: '#dcdce1',
          300: '#c4c5cc',
          400: '#a3a4ad',
          500: '#6f5f66',
          600: '#6a4d55',
          700: '#57303b',
          800: '#47202b',
          900: '#3a1521',
        },
        // Fonds argentés pour les grandes surfaces en mode clair.
        sand: {
          50: '#f4f4f6',
          100: '#ececef',
          200: '#dfdfe4',
          300: '#cdcdd4',
        },
        // Fond bordeaux profond du mode sombre.
        ink: {
          DEFAULT: '#2a0f17',
          panel: '#3a1620',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(42,15,23,0.22)',
        glow: '0 0 30px -12px rgba(226,186,172,0.55)',
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(226,186,172,0.22), transparent 45%), radial-gradient(circle at 80% 0%, rgba(122,64,73,0.12), transparent 50%)',
      },
    },
  },
  plugins: [],
};
