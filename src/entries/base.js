import { createApp, h, ref, onMounted } from 'vue';
import AppToast from '../components/AppToast.vue';
import { registerToast } from '../composables/useToast';
import { getPremiumStatus } from '../util/auth-status.mjs';

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
 * The `data-premium` attribute on #app is a hint for the first paint
 * only — it can be edited in DevTools. When `withPremium` is true we
 * also fire off a server check via `getPremiumStatus()` and patch the
 * reactive prop when the answer comes back. If the server contradicts
 * the DOM, premium-only UI affordances downgrade within ~one fetch
 * round-trip; the per-call gate in `canGenerateStatblock` (and the
 * item-gen tabs) does the same check, so generation paths can't be
 * tricked even if this initial paint is wrong.
 *
 * @param {object}  component    - The root generator component to render.
 * @param {boolean} withPremium  - When true, reads data-premium="true" from #app
 *                                 and passes :premium to the component (reactive).
 */
export function mountApp(component, withPremium = false) {
  const el = document.getElementById('app');
  const domPremium = withPremium && el?.dataset.premium === 'true';
  const premiumRef = ref(domPremium);

  if (withPremium) {
    // Best-effort: kick off the server check in parallel with mount.
    // If it fails (offline, 5xx) the wrapper returns the DOM hint, so
    // legit users on shaky networks aren't punished. If it contradicts
    // the DOM, the prop flips and the component re-renders.
    getPremiumStatus({ fallback: domPremium }).then((verified) => {
      if (premiumRef.value !== verified) premiumRef.value = verified;
    });
  }

  const Root = {
    setup() {
      const toastRef = ref(null);

      onMounted(() => {
        registerToast(toastRef.value);
      });

      return () => [
        h(AppToast, { ref: toastRef, position: 'top-center' }),
        h(component, withPremium ? { premium: premiumRef.value } : {}),
      ];
    },
  };

  createApp(Root).mount('#app');
}
