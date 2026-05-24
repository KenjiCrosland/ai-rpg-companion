/**
 * item-setting-prompts.mjs
 *
 * Prompts and helpers for the Item Generator ↔ Setting Generator integration.
 *
 * Mirrors `item-npc-prompts.mjs` for the parallel Item → Setting flow: an
 * item's lore frequently names places (a forge, a chamber, a forest, a
 * city) that the user might want to flesh out as full settings. Same
 * three-part shape as the NPC integration:
 *
 *   1. Backwards-compat extraction: createItemSettingExtractionPrompt
 *      + validator. Items saved before related_settings existed don't
 *      carry the field; the "Find Related Locations" / "Re-scan Lore"
 *      button runs this prompt against existing lore.
 *
 *   2. Inline emission: new items emit related_settings directly from
 *      the main item-generation prompt. The schema documentation for
 *      that block lives in ItemGenerator.vue's prompt template; the
 *      extraction prompt here is the orphan/legacy path.
 *
 *   3. Cross-tool prefill: buildSettingPrefillFromItem. Pure helper
 *      called by the Setting Generator's mount handler when the user
 *      arrived from the Item Generator. Produces the text dropped into
 *      the Setting Generator's `setting_description` input — the user
 *      reviews before clicking Generate.
 *
 * The "stub" shape matches related_npcs but with `setting_id` instead
 * of `npc_id`:
 *
 *   {
 *     name: "The Whispering Glade",
 *     role_brief: "Where the Heart was hidden",
 *     context: "A grove deep in the Sunless Wood",
 *     source_quote: "...verbatim text from lore...",
 *     setting_id: null,        // populated after promotion
 *   }
 */

/**
 * Build the extraction prompt that, given an item, returns a JSON array
 * of LOCATION stubs found in its lore (and timeline events).
 *
 * Locations are real places — settlements, forges, temples, chambers,
 * forests, dungeons, regions, planes — not abstract concepts and not
 * organizations. Compare to the NPC-extraction prompt, which takes an
 * "individuals over groups" stance; this one takes "places over
 * organizations": a faction or order is not a location, even if its
 * activity is bound to a particular place.
 *
 * @param {Object} item - An item from savedItems
 * @param {Object} [options]
 * @param {Array<{name: string}>} [options.existingStubs] - Settings already
 *   extracted from this item in a previous scan. Same role as in the NPC
 *   extraction prompt: pass them so re-scans don't accumulate variant
 *   spellings ("Vorn Hall" → "the Vorn-Taak Hall of Coals").
 * @returns {string}
 */
export function createItemSettingExtractionPrompt(item, { existingStubs = [] } = {}) {
  const safe = (s) => (s || '').toString().trim();
  const lore = safe(item?.lore);
  const physical = safe(item?.physical_description);

  const timelineLines = Array.isArray(item?.timelineEvents)
    ? item.timelineEvents
        .map(ev => {
          const title = safe(ev?.title);
          const desc = safe(ev?.description);
          if (!title && !desc) return '';
          return `- ${title}${title && desc ? ': ' : ''}${desc}`;
        })
        .filter(Boolean)
        .join('\n')
    : '';

  const summary = safe(item?.historicalSummary);
  const legacy = safe(item?.itemLegacy);

  // Same dedupe-with-lore guard as the NPC extraction prompt.
  const summaryAlreadyInLore = summary && lore.includes(summary);
  const legacyAlreadyInLore = legacy && lore.includes(legacy);

  const itemNameForExamples = safe(item?.name) || '[item name]';

  const existingNames = Array.isArray(existingStubs)
    ? existingStubs.map(s => safe(s?.name)).filter(Boolean)
    : [];
  const existingBlock = existingNames.length
    ? `EXISTING LOCATION STUBS (already extracted in a previous scan):
${existingNames.map(n => `- ${n}`).join('\n')}

When the lore references any of these places, use the existing name VERBATIM. Do not introduce variant forms — no expanded names, no added qualifiers, no shortened forms — for any place in the list above. Only introduce new names for places NOT in this list.

`
    : '';

  return `You are extracting named LOCATIONS from the lore of a D&D 5e magic item.

ITEM:
Name: ${safe(item?.name) || '(unnamed)'}
Type: ${safe(item?.item_type) || '(unspecified)'}
Rarity: ${safe(item?.rarity) || '(unspecified)'}

PHYSICAL DESCRIPTION:
${physical || '(none)'}

LORE:
${lore || '(none)'}
${timelineLines ? `\nTIMELINE EVENTS:\n${timelineLines}\n` : ''}${summary && !summaryAlreadyInLore ? `\nHISTORICAL SUMMARY:\n${summary}\n` : ''}${legacy && !legacyAlreadyInLore ? `\nITEM LEGACY:\n${legacy}\n` : ''}
${existingBlock}TASK:
Identify every NAMED LOCATION relevant to this item — places where the item was forged, hidden, used, lost, recovered, or where its history played out. Settlements, forges, temples, chambers, forests, mountains, caves, ruins, regions, planes — anything with a proper name that anchors a piece of the item's story to a place in the world.

LOCATIONS vs NON-LOCATIONS — important distinctions:
- A specific named place (e.g., "the Whispering Glade", "Forge of Vorn", "the Throne of Aša"): extract directly using that name.
- A category-only reference with no proper name ("a forest", "the mountain pass", "an old smithy"): SKIP — there's nothing to anchor a setting to.
- An organization, faction, cult, lineage, or tribe (e.g., "the Vorn-Taak earth-priests", "the Order of the Coal"): SKIP — these are NPC groups, not locations. They belong in related_npcs, not here.
- A place referenced ONLY by relationship to a named entity ("the king's hall", "the smith's forge") and never given its own name: SKIP. Locations need a proper name to support a full setting generation.
- A REGION or larger geography that contains a named place ("the Sunless Wood, where the Whispering Glade lies"): extract BOTH the larger region and the specific place if both are named. Each becomes its own stub.
- When a location is referenced but its name is not stated in the source ("a hidden chamber beneath the temple"): skip — full settings need a proper name.

For each LOCATION, output an object with:
- "name": the place's proper name as it appears in the source.
- "role_brief": ≤10 words describing the place's relationship to this item AND containing the EXACT item name verbatim. Examples: "Forge that produced ${itemNameForExamples}", "Vault holding ${itemNameForExamples}", "Battlefield where ${itemNameForExamples} was lost", "Birthplace of ${itemNameForExamples}". The item name MUST appear character-for-character — no paraphrasing, no shortened forms.
- "context": one sentence describing what the place is and how it relates to this specific item. Geographic or political character if useful (e.g., "A high-altitude grove sacred to the moon-cults, where the Heart lay buried for two centuries").
- "source_quote": the verbatim sentence(s) in the source text where this location appears, copied character-for-character so it can be piped into a downstream setting-generation prompt. Empty string only if the location has truly no textual basis.

Output STRICTLY a JSON array (no prose, no commentary, no code fences):
[
  {"name": "...", "role_brief": "...", "context": "...", "source_quote": "..."}
]

If there are no named locations in the source text, return an empty array: []`;
}

/**
 * Validate the extraction response.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateItemSettingExtraction(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return false;
    return parsed.every(stub =>
      stub
      && typeof stub === 'object'
      && typeof stub.name === 'string'
      && stub.name.trim().length > 0
      && typeof stub.role_brief === 'string'
      && typeof stub.context === 'string'
      && (stub.source_quote === undefined || typeof stub.source_quote === 'string')
    );
  } catch {
    return false;
  }
}

/**
 * Build the prefill text the Setting Generator drops into its
 * `setting_description` input when the user arrived from an item card's
 * "Create Setting" action. The text frames the seed for the
 * inferSettingDimensions call: place name, what it is, why this item
 * matters to it, and any verbatim source-text passage that grounds the
 * place in the item's lore.
 *
 * Pure function — no side effects, no localStorage. Tested in isolation.
 * Consumes a SeededInput as produced by buildSeededInputFromItem with
 * destinationType='setting'.
 *
 * @param {Object} seededInput
 * @returns {string}
 */
export function buildSettingPrefillFromItem(seededInput) {
  if (!seededInput?.source || !Array.isArray(seededInput.entities)) return '';
  const stub = seededInput.entities[0];
  const source = seededInput.source;
  if (!stub || !source) return '';

  const stubName = (stub.name || '').trim();
  const roleBrief = (stub.role_or_description || '').trim();
  const stubContext = (stub.context || '').trim();
  const sourceQuote = (stub.source_quote || source.quote || '').trim();

  const itemName = (source.name || '').trim();

  // Headline: name + what it's known for from the item's perspective.
  // Structured Name: / Role: lines mirror buildPrefilledTypeOfPlace's
  // approach so the LLM unambiguously identifies the named entity.
  const lines = [`Name: ${stubName}`];
  if (roleBrief) lines.push(`Role: ${roleBrief}.`);
  if (itemName) lines.push(`Inspired by lore of ${itemName}.`);
  const headline = lines.join('\n');

  const sections = [headline];

  if (stubContext) {
    sections.push('', `Place context: ${stubContext}`);
  }

  if (sourceQuote) {
    sections.push('', `Where this place appears in the source text:`, sourceQuote);
  }

  // Co-realized siblings: other promoted NPCs / settings from the same
  // item's lore. Render as a slim name + role list — purely for the
  // user's awareness of what's in their library. The setting generator
  // passes the full markdown of sibling settings to the prompt
  // separately (via the `siblingSettings` param), so the model gets
  // canonical context there. Keeping the prefill slim avoids
  // duplicating that content in the user-facing form.
  const realizedNpcs = Array.isArray(source.realized?.npcs) ? source.realized.npcs : [];
  const realizedSettings = Array.isArray(source.realized?.settings) ? source.realized.settings : [];
  if (realizedNpcs.length || realizedSettings.length) {
    const lines = ['', 'Other entities from this item\'s lore (already in your library):'];
    for (const npc of realizedNpcs) {
      const role = npc.role_brief ? `: ${npc.role_brief}` : '';
      lines.push(`- ${npc.name} (NPC)${role}`);
    }
    for (const setting of realizedSettings) {
      const role = setting.role_brief ? `: ${setting.role_brief}` : '';
      lines.push(`- ${setting.name} (Setting)${role}`);
    }
    sections.push(lines.join('\n'));
  }

  return sections.join('\n').trim();
}
