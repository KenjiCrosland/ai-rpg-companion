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

// --- equipment slots (paper doll) ---------------------------------------

/** The doll's slots, in display order. `ring` resolves to ring1/ring2 at equip time. */
export const EQUIP_SLOTS = [
  { id: 'head', label: 'Head' },
  { id: 'neck', label: 'Neck' },
  { id: 'cloak', label: 'Cloak' },
  { id: 'body', label: 'Armor' },
  { id: 'hands', label: 'Hands' },
  { id: 'belt', label: 'Belt' },
  { id: 'feet', label: 'Feet' },
  { id: 'mainHand', label: 'Main hand' },
  { id: 'offHand', label: 'Off hand' },
  { id: 'ring1', label: 'Ring' },
  { id: 'ring2', label: 'Ring' },
];

const WONDROUS_RULES = [
  [/\b(amulet|necklace|periapt|medallion|talisman|brooch|scarab|pearl)\b/i, 'neck'],
  // "Wings of Flying" is worn as a cloak (checked before head so "Robe of Eyes" → cloak).
  [/\b(cloak|cape|mantle|robe|wings?)\b/i, 'cloak'],
  [/\b(boots|slippers|sandals)\b/i, 'feet'],
  [/\b(gauntlets?|gloves?|bracers?)\b/i, 'hands'],
  // "Eyes of …" are lenses worn over the eyes → head slot.
  [/\b(helm|circlet|crown|cap|hat|mask|goggles|lenses|eyes?|headband|ioun)\b/i, 'head'],
  [/\b(belt|girdle)\b/i, 'belt'],
  [/\bshield\b/i, 'offHand'],
  [/\brings?\b/i, 'ring'],
];

/**
 * The generic equip slot an item belongs to ('ring' resolves to ring1/ring2),
 * or null if it isn't equippable (potions, scrolls, ammo, most wondrous trinkets).
 */
export function equipSlot(item) {
  const name = item?.name || '';
  const cat = item?.category;
  if (cat === 'Armor') return /shield/i.test(name) ? 'offHand' : 'body';
  if (cat === 'Weapon') return 'mainHand';
  if (cat !== 'Magic Item') return null; // adventuring gear, tools

  switch (item?.magicType) {
    case 'Ring':
      return 'ring';
    case 'Armor':
      return /shield/i.test(name) ? 'offHand' : 'body';
    case 'Weapon':
      return 'mainHand';
    case 'Staff':
    case 'Rod':
    case 'Wand':
      return 'mainHand'; // held
    case 'Wondrous Items': {
      for (const [re, slot] of WONDROUS_RULES) if (re.test(name)) return slot;
      return null; // unslottable wondrous (Bag of Holding, Deck of …)
    }
    default:
      return null; // Potion, Scroll, Ammunition
  }
}

/** A weapon (base or magic) — the only items that can choose main/off hand. */
export function isWeapon(item) {
  return item?.category === 'Weapon' || item?.magicType === 'Weapon';
}

/**
 * A two-handed weapon claims BOTH hands. Base weapons carry the `twoHanded` flag
 * from the SRD catalog; magic weapons (unknown grip) default to one-handed.
 */
export function isTwoHanded(item) {
  return isWeapon(item) && item?.twoHanded === true;
}

/**
 * The slot id(s) an item may occupy:
 *  - two-handed weapon → ['mainHand'] (it also blocks the off hand once equipped)
 *  - one-handed weapon → ['mainHand', 'offHand'] (equip one each to dual-wield)
 *  - ring → ['ring1', 'ring2']; everything else → its single slot.
 */
export function equipTargets(item) {
  const kind = equipSlot(item);
  if (!kind) return [];
  if (isWeapon(item)) return isTwoHanded(item) ? ['mainHand'] : ['mainHand', 'offHand'];
  if (kind === 'ring') return ['ring1', 'ring2'];
  return [kind];
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
 * SIZE encodes (effective) weight across five buckets, as {w,h} cell footprints —
 * small items are squares, mid-weight items stand tall, the heavy outliers are
 * the biggest blocks:
 *   ≤1 lb → 1×1   (bell, candle, piton, tinderbox)
 *   ≤5 lb → 1×2 (tall)  (waterskin, hammer, backpack, crowbar)
 *   ≤15 lb → 2×2  (rope, rations stack, lantern)
 *   ≤40 lb → 2×3 (tall) (armor, heavy gear)
 *   >40 lb → 3×3  (barrel, the truly heavy outliers)
 */
export function tileSize(item) {
  const w = effectiveWeight(item);
  if (w <= 1) return { w: 1, h: 1 };
  if (w <= 5) return { w: 1, h: 2 };
  if (w <= 15) return { w: 2, h: 2 };
  if (w <= 40) return { w: 2, h: 3 };
  return { w: 3, h: 3 };
}
