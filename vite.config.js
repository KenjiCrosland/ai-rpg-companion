import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      // Inject the env-driven default provider override at build time
      // so `ai-config.mjs` can read it without `import.meta.env` (which
      // can't be parsed by babel-jest's CommonJS transform). In Jest
      // this constant is undeclared, and the typeof guard in the
      // consumer falls through to the hard-coded default.
      __VITE_AI_DEFAULT_PROVIDER__: JSON.stringify(env.VITE_AI_DEFAULT_PROVIDER || ''),
    },
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          statblock: 'src/entries/statblock.js',
          npc: 'src/entries/npc.js',
          item: 'src/entries/item.js',
          encounter: 'src/entries/encounter.js',
          setting: 'src/entries/setting.js',
          'dungeon-generator': 'src/entries/dungeon-generator.js',
          'legacy-dungeon-generator': 'src/entries/legacy-dungeon-generator.js',
          'legacy-dungeon-generator-premium': 'src/entries/legacy-dungeon-generator-premium.js',
          location: 'src/entries/location.js',
          lore: 'src/entries/lore.js',
          book: 'src/entries/book.js',
          dashboard: 'src/entries/dashboard.js',
          'dashboard-plus': 'src/entries/dashboard-plus.js',
          landing: 'src/entries/landing.js',
          'price-calculator': 'src/entries/price-calculator.js',
          'chase-tracker': 'src/entries/chase-tracker.js',
        },
      },
    },
    server: {
      headers: {
        'Content-Security-Policy':
          "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      },
      proxy: {
        // SECURITY: These proxies inject API keys server-side
        // Keys are NEVER exposed to the browser
        '/api/ai/deepseek': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai\/deepseek/, '/v1/chat/completions'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Inject API key server-side
              if (env.DEEPSEEK_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.DEEPSEEK_API_KEY}`);
              }
            });
          },
        },
        '/api/ai/openai': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai\/openai/, '/v1/chat/completions'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Inject API key server-side
              if (env.OPENAI_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.OPENAI_API_KEY}`);
              }
            });
          },
        },
      },
    },
  };
});
