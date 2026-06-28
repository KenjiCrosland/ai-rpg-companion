import { computed, unref } from 'vue';
import { encumbranceStatus } from '../utils/carry-capacity.mjs';

/**
 * Reactive wrapper over the pure carry-capacity calc. Pass refs (or plain
 * values) for Strength, the carried items, and any extra non-tile weight (coin
 * weight when enabled); get a computed encumbrance read.
 */
export function useCarryCapacity(strength, items, extraWeight = 0) {
  return computed(() => encumbranceStatus(unref(strength), unref(items), unref(extraWeight)));
}
