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
 * @param {Object} item - An item from savedItems
 * @returns {Promise<Array<{name: string, role_brief: string, context: string}>>}
 */
export async function extractRelatedNPCs(item) {
  if (!item) return [];

  const prompt = createItemNPCExtractionPrompt(item);
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
 * Merge freshly-extracted stubs into an item's existing `related_npcs` array.
 *
 * Rules:
 * - Match by case-insensitive name.
 * - If an existing stub has `npc_id` set, do NOT overwrite it (the user has
 *   already promoted it to a real NPC; don't clobber that link).
 * - If an existing stub has no `npc_id`, refresh `role_brief` and `context`
 *   with the newer extraction values.
 * - Append any new stubs that don't match an existing entry.
 *
 * Returns a new array; does not mutate the input.
 *
 * @param {Array} existing - existing related_npcs (may be undefined)
 * @param {Array} fresh    - newly extracted stubs
 * @returns {Array}
 */
export function mergeStubs(existing, fresh) {
  const result = Array.isArray(existing) ? existing.map(s => ({ ...s })) : [];
  if (!Array.isArray(fresh)) return result;

  const indexByName = new Map();
  result.forEach((stub, idx) => {
    const key = (stub?.name || '').trim().toLowerCase();
    if (key) indexByName.set(key, idx);
  });

  for (const stub of fresh) {
    const name = (stub?.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();

    if (indexByName.has(key)) {
      const idx = indexByName.get(key);
      const target = result[idx];
      // Never overwrite a stub that has been promoted to a real NPC.
      if (!target.npc_id) {
        target.role_brief = stub.role_brief || target.role_brief || '';
        target.context = stub.context || target.context || '';
        target.source_quote = stub.source_quote || target.source_quote || '';
      }
    } else {
      result.push({
        name,
        role_brief: stub.role_brief || '',
        context: stub.context || '',
        source_quote: stub.source_quote || '',
        npc_id: null,
        npc_folder: null
      });
      indexByName.set(key, result.length - 1);
    }
  }

  return result;
}
