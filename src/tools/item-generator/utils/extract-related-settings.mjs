/**
 * extract-related-settings.mjs
 *
 * Backwards-compat orchestrator: runs an extraction-only AI call against
 * an item's existing lore (and timeline) and returns location stubs. Used
 * by the "Find Related Locations" / "Re-scan Lore" button on the Related
 * Settings UI section. New items already include `related_settings` from
 * the main generation prompt, so they don't need this on first creation.
 *
 * Algorithm parallels extract-related-npcs.mjs — same orchestration shape,
 * same merge semantics. The only differences are the prompt and the
 * promotion-link field name (`setting_id` vs `npc_id`).
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import {
  createItemSettingExtractionPrompt,
  validateItemSettingExtraction,
} from '@/prompts/item-setting-prompts.mjs';

/**
 * Extract location stubs from an item's lore/timeline.
 *
 * Passes the item's existing `related_settings` to the prompt so the
 * model uses established names verbatim instead of inventing variant
 * forms on each rescan.
 *
 * @param {Object} item - An item from savedItems
 * @returns {Promise<Array<{name: string, role_brief: string, context: string, source_quote: string, setting_id: null}>>}
 */
export async function extractRelatedSettings(item) {
  if (!item) return [];

  const prompt = createItemSettingExtractionPrompt(item, {
    existingStubs: Array.isArray(item.related_settings) ? item.related_settings : [],
  });
  const response = await generateGptResponse(prompt, validateItemSettingExtraction, 3);

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
      setting_id: null,
    });
  }
  return stubs;
}

/**
 * Reconcile freshly-extracted setting stubs against an item's existing
 * `related_settings` array. Mirrors mergeStubs from extract-related-npcs:
 *
 * - Promoted stubs (setting_id present) are sacred — they survive every
 *   rescan untouched.
 * - Unpromoted stubs are dropped; the fresh extraction is authoritative
 *   for the unpromoted slice. Variant names from prior scans evaporate.
 * - Fresh stubs whose case-insensitive name matches a promoted stub are
 *   dropped — avoids resurrecting an unpromoted twin alongside the
 *   promoted one.
 * - Fresh stubs are deduped by case-insensitive name (defensive).
 *
 * Returns a new array; does not mutate input.
 *
 * @param {Array} existing
 * @param {Array} fresh
 * @returns {Array}
 */
export function mergeStubs(existing, fresh) {
  const existingArr = Array.isArray(existing) ? existing : [];
  const freshArr = Array.isArray(fresh) ? fresh : [];

  const promoted = existingArr
    .filter(s => s && s.setting_id)
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
      setting_id: null,
    });
  }

  return reconciled;
}
