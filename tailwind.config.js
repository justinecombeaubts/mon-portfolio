/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf3f6',
          100: '#fbe6ed',
          200: '#f3c6d6',
          300: '#e7a6bf',
          400: '#d97fa3',
          500: '#c98fa3',
          600: '#b06483',
          700: '#8f4b68',
          800: '#6f3a51',
          900: '#4d2938',
        },
        ai: {
          400: '#a89bf0',
          500: '#8b7fd1',
          600: '#6f61b8',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.25)',
        glow: '0 0 40px -8px rgba(201,143,163,0.45)',
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(139,127,209,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(201,143,163,0.18), transparent 45%)',
      },
    },
  },
  plugins: [],
};
