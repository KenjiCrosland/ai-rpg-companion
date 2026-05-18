/**
 * extract-related-places.mjs
 *
 * Post-generation extraction: read a freshly-generated setting's prose
 * and produce a list of NAMED PLACES the setting mentions, classified
 * by their spatial relationship to the current setting (parent /
 * sibling / sublocation / feature). Mirrors the item → setting
 * extraction pattern (see extract-related-settings.mjs).
 *
 * The pipeline:
 *   1. Build the extraction prompt from Region + history + leadership.
 *   2. Call generateGptResponse with the prompt + structural validator.
 *   3. Parse the JSON and normalize stub shape.
 *   4. Filter against names already realized in the relevant tree
 *      slice (current setting itself, ancestors, siblings) so we don't
 *      surface a stub the user has already promoted.
 *
 * Returns clean stubs the caller can merge into `setting.related_places`
 * via `mergeRelatedPlaces`. Errors are swallowed and logged — the
 * post-generation extraction is a nice-to-have, not load-bearing for
 * the user's primary action (generating the setting itself).
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import {
  createRegionEntityExtractionPrompt,
  validateRegionEntityExtraction,
} from '../prompts/region-entity-extraction-prompts.mjs';
import {
  filterRelatedPlacesByExistingNames,
  linkExistingSettingsByName,
} from '@/util/setting-storage.mjs';

/**
 * Normalize a raw LLM stub into the storage shape used by
 * `mergeRelatedPlaces` and the Locations tab UI.
 */
function normalizeStub(raw) {
  return {
    name: (raw.name || '').trim(),
    kind: raw.kind || 'feature',
    source_quote: (raw.source_quote || '').trim(),
    role_brief: (raw.role_brief || '').trim(),
    suggested_setting_type: (raw.suggested_setting_type || '').trim(),
    promoted_setting_id: null,
  };
}

/**
 * Run the extraction.
 *
 * @param {Object} setting
 * @param {Object} [options]
 * @param {Array<string>} [options.excludeNames] - names of settings
 *   already realized in the relevant tree slice (ancestors + siblings +
 *   children + the current setting itself). Used to suppress
 *   already-promoted entries from the stub list.
 * @param {Array<Object>} [options.allSettings] - the full settings
 *   library, used to pre-fill promoted_setting_id when an extracted
 *   stub's name matches an existing setting outside the
 *   already-excluded tree slice (defensive against the LLM extracting
 *   a name that exists somewhere unrelated in the library).
 * @returns {Promise<Array<Object>>} normalized stubs ready to merge
 */
export async function extractRelatedPlaces(setting, { excludeNames = [], allSettings = [] } = {}) {
  if (!setting || typeof setting !== 'object') return [];
  const overview = setting.setting_overview || {};

  const region = (overview.relation_to_larger_setting || '').trim();
  const history = (overview.history || '').trim();
  const leadership = (overview.current_ruler_sentence || '').trim();

  // Nothing to extract from. Region is the load-bearing field; if it's
  // empty there are no place-relationships to mine.
  if (!region && !history && !leadership) return [];

  const settingName = (setting.place_name || overview.name || '').trim();

  // Always exclude the current setting's own name regardless of caller
  // input — the prompt already says "don't include the current setting"
  // but defensive belt-and-suspenders since extraction is post-call.
  const allExclude = [...(excludeNames || []), settingName].filter(Boolean);

  const prompt = createRegionEntityExtractionPrompt({
    settingName,
    register: setting.register || null,
    region,
    history,
    leadership,
  });

  let response;
  try {
    response = await generateGptResponse(prompt, validateRegionEntityExtraction);
  } catch (err) {
    console.warn('[extract-related-places] generation failed:', err);
    return [];
  }

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (err) {
    console.warn('[extract-related-places] JSON parse failed:', err);
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const normalized = parsed
    .map(normalizeStub)
    .filter(s => s.name);

  // Drop entries that match excluded names (tree-related: self,
  // ancestors, siblings, children), then pre-fill promoted_setting_id
  // for any remaining stubs whose name matches a setting elsewhere in
  // the library — so the UI flips to "View" instead of creating a
  // duplicate on the next promote.
  const filtered = filterRelatedPlacesByExistingNames(normalized, allExclude);
  return linkExistingSettingsByName(filtered, allSettings);
}
