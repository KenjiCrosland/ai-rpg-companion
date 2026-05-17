import { createApp, h, ref, onMounted } from 'vue';
import AppToast from '../components/AppToast.vue';
import { registerToast } from '../composables/useToast';
import { runPendingMigrations } from '@/util/migration-runner.mjs';

// Parchment design tokens — loaded once, shared by all tools.
// See src/parchment/CLAUDE.md.
import '@/parchment/tokens.css';

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

/**
 * Mount the Vue app on #app.
 *
 * @param {object}  component    - The root generator component to render.
 * @param {boolean} withPremium  - When true, reads data-premium="true" from #app
 *                                 and passes :premium="true" to the component.
 */
export function mountApp(component, withPremium = false) {
  // Run any pending data migrations BEFORE mounting. Each tool is its
  // own SPA entry — there's no App.vue wrapping them in production —
  // so the dashboard's migration call doesn't reach tool pages. Without
  // this, a user importing legacy data via DataManagerModal would
  // reload onto the tool page with unmigrated data in localStorage,
  // and the new code paths would read the wrong field names. Migrations
  // are idempotent and skip ones already in `migrations-completed`, so
  // calling here per-mount is essentially free.
  try {
    runPendingMigrations();
  } catch (err) {
    // Defensive: a migration crash should never prevent the tool from
    // mounting at all. Log and continue; the unmigrated path will
    // expose the underlying issue.
    console.error('runPendingMigrations failed in mountApp:', err);
  }

  const el = document.getElementById('app');
  const isPremium = withPremium && el?.dataset.premium === 'true';

  const Root = {
    setup() {
      const toastRef = ref(null);

      onMounted(() => {
        registerToast(toastRef.value);
      });

      return () => [
        h(AppToast, { ref: toastRef, position: 'top-center' }),
        h(component, withPremium ? { premium: isPremium } : {}),
      ];
    },
  };

  createApp(Root).mount('#app');
}
