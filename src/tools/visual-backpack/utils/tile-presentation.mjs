/**
 * tile-presentation.mjs
 *
 * Tile encoding for the inventory:
 *   COLOR = item TYPE  (weapon / armor / consumable / tools / gear)
 *   SIZE  = WEIGHT      (heavier items get a bigger square)
 *
 * Both are Visual-Backpack-specific contextual treatments for the at-a-glance
 * "what is this / how heavy is it" read — they don't enter parchment's global
 * token system. Pure, no DOM.
 */

// Muted, distinct type colors (a light fill + a readable dark ink each).
export const TYPE_COLORS = {
  weapon: { label: 'Weapon', bg: '#d9bdb6', text: '#5e3a31' }, // clay red
  armor: { label: 'Armor', bg: '#bfc8d4', text: '#3a4654' }, // steel blue
  consumable: { label: 'Consumable', bg: '#cbd9b6', text: '#465533' }, // sage green
  tools: { label: 'Tools', bg: '#e3d29c', text: '#6a5615' }, // ochre
  gear: { label: 'Gear', bg: '#e7ddc7', text: '#5c513a' }, // tan
  magic: { label: 'Magic Item', bg: '#d6c4dd', text: '#553a62' }, // arcane plum
};

// Consumables hide inside SRD "Adventuring Gear" — detect the obvious ones
// (food, light sources, alchemical one-shots, ammunition).
const CONSUMABLE_RE =
  /\b(ration|potion|oil|torch|candle|arrow|bolt|bullet|needle|antitoxin|acid|alchemist|holy water|poison)/i;

/** Classify an item into a colored type. */
export function itemType(item) {
  switch (item?.category) {
    case 'Weapon':
      return 'weapon';
    case 'Armor':
      return 'armor';
    case 'Tools':
      return 'tools';
    case 'Magic Item':
      return 'magic';
    default:
      return CONSUMABLE_RE.test(item?.name || '') ? 'consumable' : 'gear';
  }
}

export function typeColor(item) {
  return TYPE_COLORS[itemType(item)] || TYPE_COLORS.gear;
}

/** Effective weight = per-unit weight × quantity (quantity defaults to 1). */
export function effectiveWeight(item) {
  return (Number(item?.weight) || 0) * (Number(item?.quantity) || 1);
}

/**
 * Strip a trailing "×N" / "(×N)" count from a name so the quantity can be shown
 * live in the title instead (and to clean up older saved data that baked it in).
 */
export function cleanName(name) {
  return String(name || '')
    .replace(/\s*[(（]?\s*[×xX]\s*\d+\s*[)）]?\s*$/, '')
    .trim();
}

/**
 * SIZE encodes (effective) weight — a square tile that grows with load, across
 * five tiers: 0–3 / 3–5 / 5–10 / 10–20 / 20+ lb. (Square-only for this release.)
 */
export function tileSize(item) {
  const w = effectiveWeight(item);
  if (w <= 3) return { w: 1, h: 1 };
  if (w <= 5) return { w: 2, h: 2 };
  if (w <= 10) return { w: 3, h: 3 };
  if (w <= 20) return { w: 4, h: 4 };
  return { w: 5, h: 5 };
}
