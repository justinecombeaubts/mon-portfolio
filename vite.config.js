import { defineConfig, createServer } from 'vite';

// Pré-rendu au build : écrit le HTML complet du site dans dist/index.html,
// à la place du contenu de secours. Les moteurs de recherche et les visiteurs
// sans JavaScript voient ainsi tous les projets, et la page s'affiche plus tôt.
function prerender() {
  let root;
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root;
    },
    async transformIndexHtml(html, ctx) {
      // Seule la page d'accueil est pré-rendue (mentions-legales.html est déjà statique).
      if (ctx.path !== '/index.html') return html;
      const server = await createServer({
        root,
        configFile: false,
        logLevel: 'silent',
        appType: 'custom',
        server: { middlewareMode: true },
      });
      try {
        const { renderApp } = await server.ssrLoadModule('/src/render.js');
        const appHtml = renderApp();
        const out = html.replace(
          /<div id="app">[\s\S]*?<!-- \/app -->\s*<\/div>/,
          () => `<div id="app" data-prerendered>${appHtml}</div>`
        );
        if (out === html) throw new Error('prerender : bloc <div id="app"> introuvable dans index.html');
        return out;
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig({
  plugins: [prerender()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        'mentions-legales': 'mentions-legales.html',
      },
    },
  },
});
