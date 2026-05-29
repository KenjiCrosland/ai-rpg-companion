import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
// Parchment design tokens — defines --par-* custom properties consumed
// by parchment components and content surfaces (RoomDescription's
// lapis read-aloud box, ParCardButton, ParActionButton, etc.). The
// production tool entries in src/entries/* import this directly; dev
// mode goes through main.js, so it has to be loaded here too.
import '@/parchment/tokens.css';
import App from './App.vue';
import { initDevControls } from './util/dev-ai-controls.mjs';
import { initDevTestControls } from './util/dev-test-controls.mjs';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

// Initialize dev controls for AI provider switching
initDevControls();

// Initialize dev controls for seeding manual-test data
initDevTestControls();