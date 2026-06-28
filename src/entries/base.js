import { createApp, h, ref, onMounted } from 'vue';
import AppToast from '../components/AppToast.vue';
import { registerToast } from '../composables/useToast';
import { runPendingMigrations } from '@/util/migration-runner.mjs';
import { getEffectivePremium, initDevPremiumControls } from '@/util/dev-premium-controls.mjs';
import { trackEvent } from '@/util/analytics.mjs';

// Parchment design tokens — loaded once, shared by all tools.
// See src/parchment/CLAUDE.md.
import '@/parchment/tokens.css';

// Paper-grain texture utility (`.paper-grain`) — subtle parchment overlay for
// editorial container surfaces. See src/parchment/texture.css.
import '@/parchment/texture.css';

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
  // Fire-and-forget — runPendingMigrations is async (some migrations
  // sign via SubtleCrypto). Errors logged via .catch so the runner's
  // promise rejection doesn't surface unhandled. Mount proceeds in
  // parallel because a migration crash shouldn't prevent the tool
  // from rendering at all.
  runPendingMigrations().catch((err) => {
    console.error('runPendingMigrations failed in mountApp:', err);
  });

  // Expose `window.devPremium` for cross-tool premium testing (no-op
  // in production builds). Called per-mount but the helper is
  // idempotent so re-mounts don't re-register.
  initDevPremiumControls();

  const el = document.getElementById('app');
  const isPremium = getEffectivePremium({ withPremium, el });

  // Analytics: detect a free→premium transition (the conversion moment). Premium
  // is server-determined (WordPress sets data-premium on #app), so there is no
  // in-app OAuth callback — instead we compare the last-known state to the raw
  // subscription flag and fire once on the flip. Read el.dataset.premium
  // DIRECTLY (not the entry-gated `isPremium`) so the user's real state is seen
  // consistently across every tool page regardless of the entry's withPremium.
  // Only fires free→premium (not first-load-already-premium). Prod-only: base.js
  // doesn't run in dev, and trackEvent no-ops without gtag.
  try {
    const PREMIUM_STATE_KEY = 'seen-premium-state';
    const now = el?.dataset?.premium === 'true' ? 'premium' : 'free';
    const last = localStorage.getItem(PREMIUM_STATE_KEY);
    if (now === 'premium' && last === 'free') {
      trackEvent('premium_unlocked', {});
    }
    localStorage.setItem(PREMIUM_STATE_KEY, now);
  } catch {
    // localStorage unavailable (private mode) — skip silently.
  }

  const Root = {
    setup() {
      const toastRef = ref(null);

      onMounted(() => {
        registerToast(toastRef.value);
      });

      return () => [
        h(AppToast, { ref: toastRef, position: 'top-center' }),
        // Pass the prop when the entry opts into premium AND/OR the
        // dev override has forced it true. Free-only entries that
        // didn't pass `withPremium` still get the override propagated
        // so cross-tool nav lands on a premium-rendering destination.
        h(component, (withPremium || isPremium) ? { premium: isPremium } : {}),
      ];
    },
  };

  createApp(Root).mount('#app');
}
