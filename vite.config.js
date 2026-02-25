import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
        'legacy-dungeon-generator': 'src/entries/legacy-dungeon-generator.js',
        'legacy-dungeon-generator-premium': 'src/entries/legacy-dungeon-generator-premium.js',
        'new-dungeon-generator': 'src/entries/new-dungeon-generator.js',
        location: 'src/entries/location.js',
        lore: 'src/entries/lore.js',
        book: 'src/entries/book.js',
        dashboard: 'src/entries/dashboard.js',
        'dashboard-plus': 'src/entries/dashboard-plus.js',
        landing: 'src/entries/landing.js',
      },
    },
  },
  server: {
    headers: {
      'Content-Security-Policy':
        "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    },
  },
});
