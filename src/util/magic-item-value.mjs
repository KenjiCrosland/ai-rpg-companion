/**
 * magic-item-value.mjs
 *
 * A lightweight, non-interactive estimate of a magic item's gp value for auto-valuing
 * loot (e.g. the loot splitter), built on STANDARD numbers so nobody has to trust a
 * bespoke model:
 *
 *   Permanent items:  DMG rarity-band midpoint × item-type multiplier
 *   Consumables:      their own rarity table — valued as a permanent one tier lower
 *
 * The rarity midpoints are the middle of each DMG magic-item price band (Common
 * 50–100 → 75, Uncommon 101–500 → 300, Rare 501–5,000 → 2,750, Very Rare
 * 5,001–50,000 → 27,500, Legendary 50,001+ → 150,000). Single-use consumables
 * (potions, scrolls, oils, …) don't scale like permanents, so instead of a flat
 * haircut they get their OWN table: a consumable is worth about a permanent one
 * rarity lower (a Very Rare potion ≈ a Rare item), with Common anchored to the 50 gp
 * Potion of Healing. Both tables reuse the same DMG figures — no invented numbers to
 * defend. Magic armor is marked up ×1.5 (from Kenji's price calculator).
 *
 * Pure — no DOM, no dependencies.
 */

// Per-rarity base price = the midpoint of each DMG rarity price band:
//   Common 50–100 → 75, Uncommon 101–500 → 300, Rare 501–5,000 → 2,750,
//   Very Rare 5,001–50,000 → 27,500, Legendary 50,001+ → 150,000 (band is open-ended,
//   so a representative figure), Artifact → 500,000 (officially priceless; a nominal cap).
export const RARITY_BASE_GP = {
  Common: 75,
  Uncommon: 300,
  Rare: 2750,
  'Very Rare': 27500,
  Legendary: 150000,
  Artifact: 500000,
};

// Consumable price by rarity = a permanent ONE TIER LOWER (RARITY_BASE_GP shifted
// down a step), reflecting that a single-use item is worth far less than a permanent
// of the same rarity. Common has no lower tier, so it's anchored to the 50 gp Potion
// of Healing. Result: Very Rare potion ≈ 2,750 gp — it can't hog a share.
export const CONSUMABLE_BASE_GP = {
  Common: 50, // Potion of Healing anchor
  Uncommon: 75, // = Common permanent
  Rare: 300, // = Uncommon permanent
  'Very Rare': 2750, // = Rare permanent
  Legendary: 27500, // = Very Rare permanent
  Artifact: 150000, // = Legendary permanent
};

// Item-type multipliers for PERMANENTS (consumables use CONSUMABLE_BASE_GP instead).
// Magic armor is marked up ×1.5, per the calculator's `itemTypes`.
export const TYPE_MULT = { weapon: 1.0, armor: 1.5, permanent: 1.0 };

// Single-use magic (name-based fallback when magicType is absent, e.g. custom items).
const CONSUMABLE_NAME_RE = /\b(potion|elixir|oil|scroll|dust|ammunition|philter|salve|tonic|draught)\b/i;

/** The calculator's item-type bucket for a magic item (weapon / armor / consumable / permanent). */
export function magicPriceCategory(item) {
  const mt = String(item?.magicType || '').toLowerCase();
  if (mt === 'potion' || mt === 'scroll' || mt === 'ammunition') return 'consumable';
  if (CONSUMABLE_NAME_RE.test(item?.name || '')) return 'consumable';
  if (item?.category === 'Weapon' || mt === 'weapon') return 'weapon';
  if (item?.category === 'Armor' || mt === 'armor') return 'armor';
  return 'permanent';
}

/**
 * Estimated gp value of a magic item from its rarity + type. Returns 0 when the
 * rarity is unknown (non-SRD / custom) — the caller treats that as "neutral".
 * Consumables read from their own rarity table; everything else is the rarity
 * midpoint times its item-type multiplier.
 */
export function estimateMagicValue(item) {
  const category = magicPriceCategory(item);
  if (category === 'consumable') return CONSUMABLE_BASE_GP[item?.rarity] ?? 0;
  const base = RARITY_BASE_GP[item?.rarity];
  if (!base) return 0;
  return base * (TYPE_MULT[category] ?? 1);
}
