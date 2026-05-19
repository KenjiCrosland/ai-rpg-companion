/**
 * region-entity-extraction-prompts.mjs
 *
 * Prompts and helpers for extracting NAMED PLACES from a setting's own
 * generated prose. The setting-overview generator names places liberally
 * ("Gorod-Ognya crowns the slope of Krakova-Gora, the highest peak in
 * the Gray Ribs; eastward lies the Dryad's Reach…"), and most of those
 * names dead-end — the user has no way to promote them to first-class
 * settings without retyping the name into a fresh form.
 *
 * This module produces the post-generation extraction pass: read the
 * setting's Region / history / leadership prose, identify every named
 * place OTHER than the current setting, and classify each one by its
 * spatial relationship to the current setting:
 *
 *   - parent       — contains the current setting (mountain that the
 *                    city crowns; kingdom that the duchy belongs to)
 *   - sibling      — peer at similar scale (neighboring trading city;
 *                    adjacent territory)
 *   - sublocation  — contained within the current setting (district,
 *                    ward, internal landmark)
 *   - feature      — pure geographic feature that isn't really a setting
 *                    (named road, river, pass, fen)
 *
 * Classification is by the SPATIAL/POLITICAL VERBS the prose uses. The
 * downstream Locations tab promotes parent/sibling/sublocation stubs
 * into full settings (sublocation merges with importantLocations);
 * feature stubs are shown but not promotable.
 *
 * Dedup against already-realized settings happens AT THE MERGE STEP,
 * not in this prompt — the prompt extracts everything named so the
 * merge code can use the live setting tree as the authoritative filter.
 */

/**
 * Build the extraction prompt.
 *
 * Two ways to supply prose: the legacy three-field shape
 * (region/history/leadership) for polity-scale callers, or the
 * generalized `proseSections` array of `{label, text}` items for
 * any scale. When proseSections is provided, the three legacy fields
 * are ignored — callers should pick one shape or the other.
 *
 * proseSections is the right shape for place- and landscape-scale
 * settings, whose source prose lives in different fields (overview,
 * where_it_sits, features, what_happens_here, who_frequents_here,
 * hidden_detail for place; extent, what_lives_here, travel_and_hazards
 * for landscape). The classification task (parent/sibling/sublocation/
 * feature) still applies — a piazza's prose still names its parent
 * city, sibling piazzas, sublocations within, and named features.
 *
 * @param {Object} args
 * @param {string} args.settingName  - Bare name of the current setting (used
 *   to tell the LLM to exclude it from results).
 * @param {string} [args.register]   - The current setting's register (e.g.,
 *   'Slavic-inspired'). Used as soft context — the LLM may use register-
 *   coherent name forms.
 * @param {Array<{label: string, text: string}>} [args.proseSections] -
 *   Generalized prose blocks for any scale. Each entry's label becomes
 *   the section heading in the prompt (e.g., 'WHERE IT SITS'). When
 *   provided, region/history/leadership are ignored.
 * @param {string} [args.region]     - LEGACY: relation_to_larger_setting prose.
 *   Ignored when proseSections is provided.
 * @param {string} [args.history]    - LEGACY: history prose. Ignored when
 *   proseSections is provided.
 * @param {string} [args.leadership] - LEGACY: current_ruler_sentence prose.
 *   Ignored when proseSections is provided.
 * @returns {string}
 */
export function createRegionEntityExtractionPrompt({
  settingName,
  register,
  proseSections,
  region,
  history,
  leadership,
} = {}) {
  const safe = (s) => (s || '').toString().trim();
  const name = safe(settingName) || '(unnamed setting)';
  const reg = safe(register);

  // New shape (proseSections) takes precedence when present; the
  // legacy three-field shape stays the fallback so existing callers
  // and tests keep working.
  const sections = Array.isArray(proseSections) && proseSections.length > 0
    ? proseSections
    : [
        { label: 'REGION', text: region },
        { label: 'HISTORY', text: history },
        { label: 'LEADERSHIP', text: leadership },
      ];

  const proseBlock = sections
    .map(s => {
      const text = safe(s && s.text);
      const label = safe(s && s.label);
      if (!text || !label) return '';
      return `${label}:\n${text}`;
    })
    .filter(Boolean)
    .join('\n\n');

  return `You are extracting NAMED PLACES from a D&D 5e setting's overview prose, so the user can promote them into first-class settings of their own.

CURRENT SETTING: ${name}
${reg ? `REGISTER: ${reg}\n` : ''}
${proseBlock || '(no prose provided)'}

TASK:
Identify every NAMED PLACE other than the current setting (${name}). For each, classify by its SPATIAL or POLITICAL relationship to the current setting:

- "parent"       — the prose says the current setting is INSIDE or PART OF this place. Phrases like "rises above", "crowns the slope of", "sits in the territory of", "lies within", "belongs to the realm of", "a province of", "ruled from".
- "sibling"      — a peer at similar scale: a neighboring polity, an adjacent city, a bordering region the current setting deals with as an equal. Phrases like "to the south is", "neighboring", "across the X lies", "the rival city of", "shares a border with".
- "sublocation"  — contained WITHIN the current setting. A district, ward, foundry, gate, named internal landmark. Phrases like "the X quarter", "within its walls", "contains", "the X gate", "the X tower stands at the heart of".
- "feature"      — a pure geographic feature with a name but not a settable place on its own: a named road, river, pass, fen, fjord, mountain (when treated as terrain rather than a polity), forest. These show in the UI for context but are not promotable to full settings.

WHEN THE PROSE IS AMBIGUOUS: prefer the WIDER scale. A named mountain that the current setting "crowns" is the parent (containing geography), not a feature, because it's the spatial frame the current setting sits inside.

WHAT TO INCLUDE:
- Settlements (cities, towns, villages, hamlets, keeps, fortresses)
- Regions / territories / polities (kingdoms, duchies, leagues, realms, marches)
- Mountains, mountain ranges, forests, fens, rivers, roads, passes WHEN named
- Named buildings or internal landmarks (cathedrals, forges, gates, towers)
- Defunct polities mentioned by name ("the old Vysokogradsky realm")

WHAT TO EXCLUDE:
- The current setting's own name (${name}). Do not include it in results.
- Personal names of characters (rulers, NPCs, historical figures).
- Titles of office or role-words even when capitalized ("the Watch-Master", "the High Priest", "Lord Mayor").
- Deity names.
- Organizations, factions, cults, lineages, orders (those are NPC groups, not places).
- Category-only references without a proper name ("a forest", "the southern hills") — skip unless the prose names them.

For each extracted entity, output an object with:
- "name": the proper name VERBATIM as it appears in the prose.
- "kind": one of "parent" | "sibling" | "sublocation" | "feature".
- "source_quote": the verbatim sentence (or two-sentence span) from the prose where this name appears, character-for-character. This is what the user reads to verify the extraction and what feeds downstream promotion prompts.
- "role_brief": ≤12 words describing what this place is and its relationship to the current setting. Examples: "Dormant volcano the city crowns", "Trading city to the southwest", "Defunct realm Tverzh was last outpost of", "Mountain range running south from Krakova-Gora".
- "suggested_setting_type": for parent/sibling/sublocation, suggest a setting type like "kingdom", "city", "town", "region", "district", "fortress", "building", "wilderness". For feature, use "feature".

Output STRICTLY a JSON array (no prose, no commentary, no code fences):
[
  {"name": "...", "kind": "...", "source_quote": "...", "role_brief": "...", "suggested_setting_type": "..."}
]

If the prose names no places other than the current setting, return an empty array: []`;
}

/**
 * Validate the extraction response shape.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
const VALID_KINDS = new Set(['parent', 'sibling', 'sublocation', 'feature']);

export function validateRegionEntityExtraction(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return false;
    return parsed.every(stub =>
      stub
      && typeof stub === 'object'
      && typeof stub.name === 'string'
      && stub.name.trim().length > 0
      && typeof stub.kind === 'string'
      && VALID_KINDS.has(stub.kind)
      && (stub.source_quote === undefined || typeof stub.source_quote === 'string')
      && (stub.role_brief === undefined || typeof stub.role_brief === 'string')
      && (stub.suggested_setting_type === undefined || typeof stub.suggested_setting_type === 'string')
    );
  } catch {
    return false;
  }
}
