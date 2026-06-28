/**
 * pack-expansion.mjs
 *
 * A starter pack is a bundle; this expands it into individual tile templates —
 * one per content line. A line with quantity > 1 (10 pitons, 5 rations) becomes
 * ONE tile labeled "Piton (×10)" carrying the stacked weight, rather than ten
 * separate tiles (which would flood the grid). Pure, no DOM.
 */

const round2 = (n) => Math.round(n * 100) / 100;

/** Expand a pack's `contents` into tile templates (no instanceId — the caller stamps that). */
export function expandPackToTemplates(pack) {
  if (!pack || !Array.isArray(pack.contents)) return [];
  return pack.contents.map((c) => {
    const qty = Number(c.quantity) || 1;
    return {
      id: c.id,
      name: qty > 1 ? `${c.name} (×${qty})` : c.name,
      weight: round2((Number(c.weight) || 0) * qty),
      category: c.category || 'Adventuring Gear',
      size: { w: c.size?.w || 1, h: c.size?.h || 1 },
      source: 'srd',
    };
  });
}
