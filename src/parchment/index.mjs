/**
 * Parchment design system entry point.
 *
 * Single import surface for content-UI primitives. Add new components by
 * creating `Par*.vue` in this folder and re-exporting them here.
 *
 * Usage:
 *   import { ParButton } from '@/parchment';
 *
 * Tokens (`tokens.css`) are loaded once via `src/entries/base.js` so any
 * component can reference `--par-*` custom properties without per-tool
 * setup.
 */

export { default as ParButton } from './ParButton.vue';
export { default as ParInput } from './ParInput.vue';
export { default as ParTextarea } from './ParTextarea.vue';
export { default as ParSelect } from './ParSelect.vue';
export { default as ParCheckbox } from './ParCheckbox.vue';
export { default as ParTooltip } from './ParTooltip.vue';
