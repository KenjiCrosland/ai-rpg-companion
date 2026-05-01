/**
 * extract-related-npcs.mjs
 *
 * Backwards-compat orchestrator: runs an extraction-only AI call against an
 * item's existing lore (and timeline) and returns the resulting NPC stubs.
 * Used by the "Find Related NPCs" / "Re-scan Lore" buttons in the Item
 * Generator. New items already include `related_npcs` directly from the main
 * generation prompt, so they don't need this path on first creation.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import {
  createItemNPCExtractionPrompt,
  validateItemNPCExtraction
} from '@/prompts/item-npc-prompts.mjs';

/**
 * Extract NPC stubs from an item's lore/timeline.
 *
 * Passes the item's existing `related_npcs` to the prompt so the model
 * uses established names verbatim instead of inventing variant forms on
 * each rescan. The merge layer in `mergeStubs` handles any variants that
 * still slip through.
 *
 * @param {Object} item - An item from savedItems
 * @returns {Promise<Array<{name: string, role_brief: string, context: string}>>}
 */
export async function extractRelatedNPCs(item) {
  if (!item) return [];

  const prompt = createItemNPCExtractionPrompt(item, {
    existingStubs: Array.isArray(item.related_npcs) ? item.related_npcs : [],
  });
  const response = await generateGptResponse(prompt, validateItemNPCExtraction, 3);

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  // Normalize and drop empty/duplicate names. Preserve first-occurrence order.
  const seen = new Set();
  const stubs = [];
  for (const raw of parsed) {
    const name = (raw?.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    stubs.push({
      name,
      role_brief: (raw.role_brief || '').trim(),
      context: (raw.context || '').trim(),
      source_quote: (raw.source_quote || '').trim(),
      npc_id: null,
      npc_folder: null
    });
  }
  return stubs;
}

/**
 * Reconcile freshly-extracted stubs against an item's existing
 * `related_npcs` array, treating each scan's output as the canonical set
 * for the unpromoted slice.
 *
 * Rules:
 * - Promoted stubs (those with a truthy `npc_id`) survive every rescan,
 *   untouched. They've been linked to a real NPC; that link is sacred.
 * - Unpromoted stubs are dropped. The fresh extraction is authoritative
 *   for the unpromoted set, so name variants from prior scans
 *   ("Dragana" → "Lady Dragana of Whiterun") evaporate instead of
 *   accumulating.
 * - Fresh stubs whose case-insensitive name matches a promoted stub are
 *   dropped — avoids resurrecting the same person as an unpromoted twin
 *   alongside the promoted one.
 * - Fresh stubs are deduped by case-insensitive name (defensive;
 *   `extractRelatedNPCs` already dedupes within a scan).
 *
 * Returns a new array; does not mutate the input.
 *
 * @param {Array} existing - existing related_npcs (may be undefined)
 * @param {Array} fresh    - newly extracted stubs
 * @returns {Array}
 */
export function mergeStubs(existing, fresh) {
  const existingArr = Array.isArray(existing) ? existing : [];
  const freshArr = Array.isArray(fresh) ? fresh : [];

  const promoted = existingArr
    .filter(s => s && s.npc_id)
    .map(s => ({ ...s }));

  const seen = new Set(
    promoted
      .map(s => (s.name || '').trim().toLowerCase())
      .filter(Boolean)
  );

  const reconciled = [...promoted];
  for (const stub of freshArr) {
    const name = (stub?.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    reconciled.push({
      name,
      role_brief: (stub.role_brief || '').trim(),
      context: (stub.context || '').trim(),
      source_quote: (stub.source_quote || '').trim(),
      npc_id: null,
      npc_folder: null,
    });
  }

  return reconciled;
}
