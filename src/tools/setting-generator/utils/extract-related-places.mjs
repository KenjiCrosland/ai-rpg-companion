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
import { getItemFromStorage, leadingWordMatch } from '@/util/item-storage.mjs';

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
 * Tag extracted stubs with `seeded_from` provenance when their name
 * matches a stub on the setting's source item. This is the carry that
 * makes "Stonemother mentioned in Broken Gate's prose" wire back to the
 * Vardlokkur item when the user promotes it — without this, the
 * extracted stub is anonymous and the cross-tool back-link doesn't
 * fire on promotion.
 *
 * Only fires when the setting has cross-tool item provenance
 * (sourceType === 'item' + sourceId). Other source types (dungeons,
 * etc.) don't currently surface related-settings stubs the same way;
 * if they do later, extend the dispatcher here.
 *
 * Name match is leading-word-aware (via leadingWordMatch from
 * item-storage.mjs): "Stonemother range" extracted from Broken
 * Gate's prose matches the item-side "Stonemother" stub, "the
 * Stonemother" matches "Stonemother", etc. When multiple item-side
 * stubs match the same candidate, the shortest stub name wins
 * (typically the canonical short form). Promotion-time has a
 * matching fallback for stubs that bypassed extraction entirely
 * (e.g. manual-add form entries).
 *
 * Exported for direct unit testing.
 */
export function attachSeededFromMatchingItemStubs(stubs, setting) {
  if (!Array.isArray(stubs) || stubs.length === 0) return stubs || [];
  if (setting?.sourceType !== 'item' || !setting?.sourceId) return stubs;

  const item = getItemFromStorage(setting.sourceId);
  if (!item || !Array.isArray(item.related_settings)) return stubs;

  const itemStubs = item.related_settings.filter(
    s => s && typeof s.name === 'string' && s.name.trim()
  );
  if (itemStubs.length === 0) return stubs;

  return stubs.map(stub => {
    const candidateName = stub?.name;
    if (typeof candidateName !== 'string' || !candidateName.trim()) return stub;

    // Find the shortest leading-word match — item-side stub names are
    // typically the canonical short form, so shortest wins when
    // multiple item stubs match the same candidate.
    let best = null;
    let bestLen = Infinity;
    for (const itemStub of itemStubs) {
      if (!leadingWordMatch(itemStub.name, candidateName)) continue;
      if (itemStub.name.length < bestLen) {
        best = itemStub;
        bestLen = itemStub.name.length;
      }
    }
    if (!best) return stub;

    return {
      ...stub,
      seeded_from: {
        source_type: 'item',
        source_id: item.name,
        source_name: item.name,
        stub_name: best.name,
      },
    };
  });
}

/**
 * Pick the prose sections to mine for named places, scale-aware.
 * Returns an array of {label, text} entries the extraction prompt
 * renders verbatim.
 *
 * Polity-scale settings expose region / history / leadership prose
 * — these have always been the extraction sources, and broadening
 * them is out of scope here. Place and landscape have completely
 * different field shapes; without scale-aware selection they hit the
 * empty-prose guard and the extraction silently returns [].
 *
 * Hidden-detail and overview-vignette fields are included even
 * though they rarely name places — defensive, since occasionally
 * the LLM names a landmark in the vignette ("the broken gate visible
 * from the third step"), and the extraction cost is negligible.
 *
 * Exported for direct unit testing. The full extractRelatedPlaces
 * pipeline calls the LLM and is verified by manual production review.
 */
export function selectExtractionSections(setting) {
  const overview = setting.setting_overview || {};
  const scale = setting.scale;

  if (scale === 'place') {
    return [
      { label: 'OVERVIEW', text: overview.overview },
      { label: 'WHERE IT SITS', text: overview.where_it_sits },
      { label: 'FEATURES', text: overview.features },
      { label: 'WHAT HAPPENS HERE', text: overview.what_happens_here },
      { label: 'WHO FREQUENTS HERE', text: overview.who_frequents_here },
      { label: 'HIDDEN DETAIL', text: overview.hidden_detail },
    ];
  }

  if (scale === 'landscape') {
    return [
      { label: 'OVERVIEW', text: overview.overview },
      { label: 'EXTENT', text: overview.extent },
      { label: 'WHERE IT SITS', text: overview.where_it_sits },
      { label: 'WHAT LIVES HERE', text: overview.what_lives_here },
      { label: 'TRAVEL AND HAZARDS', text: overview.travel_and_hazards },
      { label: 'HIDDEN DETAIL', text: overview.hidden_detail },
    ];
  }

  // Polity (default — also covers legacy settings without a scale field).
  return [
    { label: 'REGION', text: overview.relation_to_larger_setting },
    { label: 'HISTORY', text: overview.history },
    { label: 'LEADERSHIP', text: overview.current_ruler_sentence },
  ];
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

  // Scale-aware prose selection. Place and landscape settings have
  // completely different field shapes from polity — they don't have
  // relation_to_larger_setting / history / current_ruler_sentence, so
  // a polity-only selector returns [] for them and the extraction is
  // a no-op. The selector returns the right field set per scale; the
  // prompt builder accepts the array as labeled sections.
  const sections = selectExtractionSections(setting);
  const hasProse = sections.some(s => typeof s.text === 'string' && s.text.trim());

  // Nothing to extract from. Bail before the network call.
  if (!hasProse) return [];

  const settingName = (setting.place_name || overview.name || '').trim();

  // Always exclude the current setting's own name regardless of caller
  // input — the prompt already says "don't include the current setting"
  // but defensive belt-and-suspenders since extraction is post-call.
  const allExclude = [...(excludeNames || []), settingName].filter(Boolean);

  const prompt = createRegionEntityExtractionPrompt({
    settingName,
    register: setting.register || null,
    proseSections: sections,
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
  // duplicate on the next promote. Finally, tag stubs whose name
  // matches a stub on the setting's source item with `seeded_from`
  // so promotion fires the cross-tool back-link via the substrate's
  // seeded_from dispatcher.
  const filtered = filterRelatedPlacesByExistingNames(normalized, allExclude);
  const linked = linkExistingSettingsByName(filtered, allSettings);
  return attachSeededFromMatchingItemStubs(linked, setting);
}
