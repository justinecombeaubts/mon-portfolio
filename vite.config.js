import { defineConfig, createServer } from 'vite';

// Pré-rendu au build : écrit le HTML complet du site dans dist/index.html,
// à la place du contenu de secours. Les moteurs de recherche et les visiteurs
// sans JavaScript voient ainsi tous les projets, et la page s'affiche plus tôt.
// Fichier HTML → page passée à renderApp (même valeur que data-page dans le HTML).
const PAGES = { '/index.html': 'home', '/projets.html': 'projets' };

// En dev seulement : sert api/contact.js comme le ferait Vercel (DISCORD_WEBHOOK_URL lue dans l'environnement).
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const { POST } = await server.ssrLoadModule('/api/contact.js');
        const response = await POST(
          new Request('http://localhost/api/contact', {
            method: req.method,
            headers: { 'Content-Type': req.headers['content-type'] || '' },
            body: Buffer.concat(chunks),
          })
        );
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(await response.text());
      });
    },
  };
}

function prerender() {
  let root;
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root;
    },
    async transformIndexHtml(html, ctx) {
      // Accueil et page projets sont pré-rendues (mentions-legales.html est déjà statique).
      const page = PAGES[ctx.path];
      if (!page) return html;
      const server = await createServer({
        root,
        configFile: false,
        logLevel: 'silent',
        appType: 'custom',
        server: { middlewareMode: true },
      });
      try {
        const { renderApp } = await server.ssrLoadModule('/src/render.js');
        const appHtml = renderApp(page);
        const out = html.replace(
          /<div id="app"([^>]*)>[\s\S]*?<!-- \/app -->\s*<\/div>/,
          (_, attrs) => `<div id="app"${attrs} data-prerendered>${appHtml}</div>`
        );
        if (out === html) throw new Error(`prerender : bloc <div id="app"> introuvable dans ${ctx.path}`);
        return out;
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig({
  plugins: [prerender(), devApi()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        projets: 'projets.html',
        'mentions-legales': 'mentions-legales.html',
      },
    },
  },
});
