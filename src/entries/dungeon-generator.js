import { createApp, h, ref, onMounted } from 'vue';
import { createPinia } from 'pinia';
import AppToast from '../components/AppToast.vue';
import { registerToast } from '../composables/useToast';
import DungeonGenerator from '../tools/dungeon-generator/components/DungeonGenerator.vue';

// Cedar design system CSS — loaded once, shared by all tools
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-accordion.css';
import '@rei/cedar/dist/style/cdr-accordion-group.css';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-card.css';
import '@rei/cedar/dist/style/cdr-checkbox.css';
import '@rei/cedar/dist/style/cdr-grid.css';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-modal.css';
import '@rei/cedar/dist/style/cdr-popover.css';
import '@rei/cedar/dist/style/cdr-select.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-toggle-button.css';
import '@rei/cedar/dist/style/cdr-toggle-group.css';
import '@rei/cedar/dist/style/cdr-tooltip.css';

import '../tools/dungeon-generator/style.css';
import { getEffectivePremium, initDevPremiumControls } from '../util/dev-premium-controls.mjs';

// Expose `window.devPremium` for cross-tool premium testing. Idempotent;
// no-op in production builds.
initDevPremiumControls();

const el = document.getElementById('app');
// Dungeon-generator's bespoke entry uses the same effective-premium
// helper as base.js so the dev override propagates here too — testing
// item → dungeon flows as premium without subscription state.
const isPremium = getEffectivePremium({ withPremium: true, el });

const Root = {
  setup() {
    const toastRef = ref(null);

    onMounted(() => {
      registerToast(toastRef.value);
    });

    return () => [
      h('link', { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' }),
      h('link', {
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
        rel: 'stylesheet'
      }),
      h(AppToast, { ref: toastRef, position: 'top-center' }),
      h(DungeonGenerator, { premium: isPremium }),
    ];
  },
};

const app = createApp(Root);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
