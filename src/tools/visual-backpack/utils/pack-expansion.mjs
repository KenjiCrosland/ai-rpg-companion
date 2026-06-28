/**
 * pack-expansion.mjs
 *
 * A starter pack is a bundle; this expands it into individual tile templates —
 * one per content line. A line with quantity > 1 (10 pitons, 5 rations) becomes
 * ONE tile labeled "Piton (×10)" carrying the stacked weight, rather than ten
 * separate tiles (which would flood the grid). Pure, no DOM.
 */

import { tileSize } from './tile-presentation.mjs';

/**
 * Expand a pack's `contents` into tile templates (no instanceId — the caller
 * stamps that). A line of N is ONE tile with `quantity: N` (per-unit weight kept);
 * the tile shows ×N and its size reflects the effective weight.
 */
export function expandPackToTemplates(pack) {
  if (!pack || !Array.isArray(pack.contents)) return [];
  return pack.contents.map((c) => {
    const quantity = Number(c.quantity) || 1;
    const weight = Number(c.weight) || 0; // per-unit weight
    const category = c.category || 'Adventuring Gear';
    return {
      id: c.id,
      name: c.name,
      weight,
      quantity,
      category,
      size: tileSize({ name: c.name, category, weight, quantity }),
      description: c.description || '',
      source: 'srd',
    };
  });
}
