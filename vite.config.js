import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// vite build --base=/rpg-location-generator/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Content-Security-Policy':
        "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    },
  },
});
