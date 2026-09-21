import { ref } from 'vue';

/**
 * Tiny shared drag payload so the catalog (drag source) and the grid (drop
 * target) can coordinate without a library or prop-drilling. `dataTransfer` only
 * exposes its data on `drop` (not `dragover`), so we keep the live payload here
 * for drop-target highlighting.
 *
 *   { kind: 'add',  template }   — dragging a catalog item into the pack
 *   { kind: 'move', index }      — reordering a placed tile
 */
export const dragPayload = ref(null);

export function setDrag(payload) {
  dragPayload.value = payload;
}

export function clearDrag() {
  dragPayload.value = null;
}
