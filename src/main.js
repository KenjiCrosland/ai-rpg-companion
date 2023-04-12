import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import LocationGenerator from './components/LocationGenerator.vue';
import NPCGenerator from './components/NPCGenerator.vue';

const app = createApp(App);

app.component('LocationGenerator', LocationGenerator);
app.component('NPCGenerator', NPCGenerator);

app.mount('#app');