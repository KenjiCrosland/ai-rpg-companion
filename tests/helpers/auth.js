/**
 * Premium state in tests.
 *
 * IMPORTANT: in dev there is no Patreon/auth localStorage shape and no runtime
 * premium override (the brief's `cros_user_state` does not exist here). App.vue
 * resolves premium purely from the page variant — `<tool>-premium` mounts the
 * component with `:premium="true"`. So "set premium" == navigate to the premium
 * variant. These wrappers exist so specs read declaratively; both delegate to
 * gotoTool with the right flag.
 */
import { gotoTool } from './page-nav.js';

export function gotoToolAsPremium(page, tool) {
  return gotoTool(page, tool, { premium: true });
}

export function gotoToolAsFree(page, tool) {
  return gotoTool(page, tool, { premium: false });
}
