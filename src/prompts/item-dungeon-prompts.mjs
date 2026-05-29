/**
 * item-dungeon-prompts.mjs
 *
 * Prompts and helpers for the Item Generator ↔ Dungeon Generator
 * integration. Parallel to `item-setting-prompts.mjs` but the
 * extraction prompt targets DUNGEON-SHAPED places only, leaving
 * setting-shaped places (cities, regions, kingdoms, broad geography)
 * to the setting-extraction scan.
 *
 * Three-part shape, identical to setting:
 *   1. Backwards-compat extraction: createItemDungeonExtractionPrompt
 *      + validator. Items saved before related_dungeons existed don't
 *      carry the field; the "Re-scan Lore" button on the Related
 *      Dungeons section runs this prompt against existing lore.
 *
 *   2. Inline emission: new items emit related_dungeons directly from
 *      the main item-generation prompt (parallel block to
 *      related_npcs and related_settings).
 *
 *   3. Cross-tool prefill: buildDungeonPrefillFromItem. Pure helper
 *      called by the Dungeon Generator's mount handler when the user
 *      arrived from the Item Generator with a specific stub picked.
 *      Produces the text dropped into the Dungeon Generator's
 *      `description` form input.
 *
 * The "stub" shape matches related_settings but with `dungeon_id`:
 *
 *   {
 *     name: "The Hollow Vault",
 *     role_brief: "Tomb where the Helm was sealed",
 *     context: "A subterranean barrow in the Iron Hills, sealed for centuries",
 *     source_quote: "...verbatim text from lore...",
 *     dungeon_id: null,        // populated after promotion
 *   }
 *
 * DUNGEON-SHAPE vocabulary: the prompt uses the dungeon-overview's
 * place-type vocabulary (Sepulcher / Tomb / Crypt / Barrow / Vault /
 * Forge / Foundry / Hold / Warren / Maw / Pit / Sink / Hollow / etc.)
 * as the canonical signal for "this is a dungeon-shaped location,
 * not a setting-shaped one." A kingdom is a setting. A barrow under
 * the kingdom's old capital is a dungeon.
 */

/**
 * Build the extraction prompt that, given an item, returns a JSON array
 * of DUNGEON-SHAPED LOCATION stubs found in its lore.
 *
 * Discriminator (vs setting extraction):
 *   - A dungeon is a specific BOUNDED, DELVABLE place — one structure,
 *     one site — with a defined inside the party can enter.
 *   - A setting is a REGION, SETTLEMENT, or BROAD GEOGRAPHY — a place
 *     that contains other places, or that the party occupies as a
 *     base / passes through.
 *   - "The Iron Hills" is a setting. "The Hollow Vault in the Iron
 *     Hills where the Helm was sealed" is a dungeon. Both can appear
 *     in the same item's lore.
 *
 * @param {Object} item
 * @param {Object} [options]
 * @param {Array<{name: string}>} [options.existingStubs]
 * @returns {string}
 */
export function createItemDungeonExtractionPrompt(item, { existingStubs = [] } = {}) {
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

  const summaryAlreadyInLore = summary && lore.includes(summary);
  const legacyAlreadyInLore = legacy && lore.includes(legacy);

  const itemNameForExamples = safe(item?.name) || '[item name]';

  const existingNames = Array.isArray(existingStubs)
    ? existingStubs.map(s => safe(s?.name)).filter(Boolean)
    : [];
  const existingBlock = existingNames.length
    ? `EXISTING DUNGEON STUBS (already extracted in a previous scan):
${existingNames.map(n => `- ${n}`).join('\n')}

When the lore references any of these places, use the existing name VERBATIM. Do not introduce variant forms — no expanded names, no added qualifiers, no shortened forms — for any place in the list above. Only introduce new names for places NOT in this list.

`
    : '';

  return `You are extracting named DUNGEON-SHAPED LOCATIONS from the lore of a D&D 5e magic item.

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
Identify every NAMED DUNGEON-SHAPED LOCATION relevant to this item. A dungeon-shape is a SPECIFIC BOUNDED, DELVABLE place — one structure or one site — that a party could enter, explore, and exit. The dungeon-overview's place-type vocabulary names the shape: a Sepulcher, Tomb, Crypt, Barrow, Mausoleum, Vault, Hall, Reliquary, Compound, Hold, Watch, Garrison, Foundry, Forge, Works, Mine, Quarry, Foundry, Lab, Cell, Warren, Burrow, Maw, Pit, Sink, Hollow, Spire, Tower, Steading, Lair, Coil, Sty, Heap, Cradle, Furnace — these are dungeon-shaped nouns.

DUNGEON vs SETTING — important distinction:
- A dungeon is a SPECIFIC BOUNDED SITE — one structure, one cave system, one fortified building, one barrow. The party delves in and out.
- A setting is a REGION, SETTLEMENT, or LARGER GEOGRAPHY — a kingdom, a city, a forest, a frontier, a plane. The party lives in or passes through it.
- "The Iron Hills" → setting. "The Hollow Vault in the Iron Hills" → dungeon. Both can appear in the same item's lore as DIFFERENT STUBS.
- "Carthal, the Free City" → setting. "The catacombs under Carthal where the Helm was sealed" → dungeon. Both stubs if both named.
- A NAMED building inside a city (a specific guildhall, a specific tavern, a specific manor) is borderline — extract it as a dungeon ONLY when the lore describes it as somewhere the party would DELVE (interior exploration, trapped, defended, sealed). A vibrant working tavern is not a dungeon.

OTHER NON-DUNGEONS to skip:
- A category-only reference with no proper name ("a forest", "an old smithy", "a hidden vault"): skip — no name to anchor to.
- An organization, faction, cult, lineage, or tribe ("the Vorn-Taak earth-priests", "the Order of the Coal"): skip — these are NPC groups, not locations.
- A place referenced ONLY by relationship to a named entity ("the king's hall", "the smith's forge") and never given its own name: skip.

For each DUNGEON-SHAPED LOCATION, output an object with:
- "name": the place's proper name as it appears in the source.
- "role_brief": ≤10 words describing the place's relationship to this item AND containing the EXACT item name verbatim. Examples: "Tomb where ${itemNameForExamples} was sealed", "Forge that produced ${itemNameForExamples}", "Lair holding ${itemNameForExamples}", "Vault that contains ${itemNameForExamples}". The item name MUST appear character-for-character — no paraphrasing, no shortened forms.
- "context": one sentence describing what the place is and how it relates to this specific item. Include geographic or structural character if useful ("A barrow sealed in a frozen volcanic caldera, accessible only at low tide").
- "source_quote": the verbatim sentence(s) in the source text where this location appears, copied character-for-character. Empty string only if the location has truly no textual basis.

Output STRICTLY a JSON array (no prose, no commentary, no code fences):
[
  {"name": "...", "role_brief": "...", "context": "...", "source_quote": "..."}
]

If there are no named dungeon-shaped locations in the source text, return an empty array: []`;
}

/**
 * Validate the extraction response. Mirrors validateItemSettingExtraction
 * exactly — the stub shape is identical except for the back-link field
 * name (which isn't in the AI response anyway).
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateItemDungeonExtraction(jsonString) {
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
 * Build the prefill text the Dungeon Generator drops into its
 * `description` form input when the user arrived from an item card's
 * "Create Dungeon" action with a specific stub picked.
 *
 * Pure function — no side effects, no localStorage. Consumes a
 * SeededInput as produced by buildSeededInputFromItem with
 * destinationType='dungeon'.
 *
 * The whole-item fallback (no entityName, no stub picked — the user
 * clicked the section-level "Generate from item" button) returns
 * empty string; in that path the overview-store synthesizes the
 * description from item.name + item.lore directly.
 *
 * @param {Object} seededInput
 * @returns {string}
 */
export function buildDungeonPrefillFromItem(seededInput) {
  if (!seededInput?.source || !Array.isArray(seededInput.entities)) return '';
  const stub = seededInput.entities[0];
  const source = seededInput.source;
  if (!stub || !source) return '';

  const stubName = (stub.name || '').trim();
  const roleBrief = (stub.role_or_description || '').trim();
  const stubContext = (stub.context || '').trim();
  const sourceQuote = (stub.source_quote || source.quote || '').trim();

  const itemName = (source.name || '').trim();

  // Headline: name + role + source. The dungeon-overview's inference
  // call reads this as the dungeon's `description` — it expects prose
  // hints about the place, not a structured spec.
  const lines = [];
  if (stubName) lines.push(`The dungeon is called ${stubName}.`);
  if (roleBrief) lines.push(`Role in the item's history: ${roleBrief}.`);
  if (itemName) lines.push(`Inspired by lore of the item "${itemName}".`);
  const headline = lines.join(' ');

  const sections = headline ? [headline] : [];

  if (stubContext) {
    sections.push('', `Place context: ${stubContext}`);
  }

  if (sourceQuote) {
    sections.push('', `Where this place appears in the item's lore:`, sourceQuote);
  }

  return sections.join('\n').trim();
}
