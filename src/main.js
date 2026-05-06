import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
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