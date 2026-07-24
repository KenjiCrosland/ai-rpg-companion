import { computed, unref } from 'vue';
import { encumbranceStatus } from '../utils/carry-capacity.mjs';

/**
 * Reactive wrapper over the pure carry-capacity calc. Pass refs (or plain
 * values) for Strength, the carried items, any extra non-tile weight (coin
 * weight when enabled), and whether variant encumbrance is in effect; get a
 * computed encumbrance read.
 */
export function useCarryCapacity(strength, items, extraWeight = 0, variant = true) {
  return computed(() =>
    encumbranceStatus(unref(strength), unref(items), unref(extraWeight), { variant: unref(variant) }),
  );
}
