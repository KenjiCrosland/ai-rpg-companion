/**
 * tile-presentation.mjs
 *
 * Cosmetic mapping for backpack tiles: weight → color bucket, and tile size
 * options. Pure, no DOM.
 *
 * The weight color scale REUSES the encounter generator's difficulty gradient
 * (trivial → deadly) verbatim — see parchment.md §7 and EncounterMonsterList.vue.
 * No new colors are introduced; a sanctioned earth-tone gradient is simply applied
 * to a new axis (per-item weight). If that palette ever becomes a shared token,
 * point these `bg`/`text` values at it.
 */

export const WEIGHT_BUCKETS = [
  { key: 'feather', max: 1, label: 'Feather', bg: '#e8e2d4', text: '#6b6b6b' },
  { key: 'light', max: 5, label: 'Light', bg: '#dde7d3', text: '#4d6a3c' },
  { key: 'medium', max: 15, label: 'Medium', bg: '#efe6c6', text: '#87691d' },
  { key: 'heavy', max: 40, label: 'Heavy', bg: '#ecd7c2', text: '#9b5730' },
  { key: 'veryHeavy', max: Infinity, label: 'Very heavy', bg: '#ebcfca', text: '#8e3830' },
];

/** Bucket an item's weight (lb) onto the gradient. */
export function weightBucket(weight) {
  const w = Number(weight) || 0;
  return WEIGHT_BUCKETS.find((b) => w <= b.max) || WEIGHT_BUCKETS[WEIGHT_BUCKETS.length - 1];
}

// Tile shapes the grid can render. `w` = columns, `h` = rows.
export const SIZE_OPTIONS = [
  { value: '1x1', label: 'Small', size: { w: 1, h: 1 } },
  { value: '1x2', label: 'Tall', size: { w: 1, h: 2 } },
  { value: '2x1', label: 'Wide', size: { w: 2, h: 1 } },
  { value: '2x2', label: 'Large', size: { w: 2, h: 2 } },
];

export function sizeFromValue(value) {
  return (SIZE_OPTIONS.find((o) => o.value === value) || SIZE_OPTIONS[0]).size;
}

export function sizeToValue(size) {
  return `${size?.w || 1}x${size?.h || 1}`;
}
