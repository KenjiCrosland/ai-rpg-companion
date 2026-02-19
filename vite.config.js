import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        statblock: 'src/entries/statblock.js',
        npc: 'src/entries/npc.js',
        item: 'src/entries/item.js',
        encounter: 'src/entries/encounter.js',
        setting: 'src/entries/setting.js',
        dungeon: 'src/entries/dungeon.js',
        'dungeon-premium': 'src/entries/dungeon-premium.js',
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
