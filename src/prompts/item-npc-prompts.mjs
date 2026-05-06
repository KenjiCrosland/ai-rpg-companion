/**
 * item-npc-prompts.mjs
 *
 * Prompts and helpers for the Item Generator ↔ NPC Generator integration.
 *
 * Two responsibilities:
 *
 * 1. Backwards-compat extraction: createItemNPCExtractionPrompt + validator.
 *    For items already saved before the related_npcs field existed, this prompt
 *    extracts named NPCs from the item's lore and timeline events.
 *
 * 2. Cross-tool prefill: buildPrefilledTypeOfPlace.
 *    Pure helper called by the NPC Generator's mount handler when the user
 *    arrived from the Item Generator. Produces the text to drop into the NPC
 *    Generator's `typeOfPlace` input — the user can review/edit before clicking
 *    Generate. The item's full data (name, type, rarity, physical description,
 *    lore) is included so the NPC Generator's existing pipeline has everything
 *    it needs without us writing a parallel item-context NPC prompt.
 */

/**
 * Build the extraction prompt that, given an item, returns a JSON array of
 * NPC stubs found in its lore (and optionally timeline events).
 *
 * @param {Object} item - An item from savedItems
 * @param {Object} [options]
 * @param {Array<{name: string}>} [options.existingStubs] - NPCs already
 *   extracted from this item in a previous scan. The prompt instructs the
 *   model to use these names verbatim when the lore references them, to
 *   prevent variant-name accumulation across rescans (e.g., "Dragana" in
 *   scan 1, "Lady Dragana of Whiterun" in scan 2 → without this, the merge
 *   layer treats them as two separate people).
 * @returns {string}
 */
export function createItemNPCExtractionPrompt(item, { existingStubs = [] } = {}) {
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

  // The Lore Builder's "Update Item Lore" action concatenates summary +
  // legacy into the item's `lore` field. When that's happened, rendering
  // the same text again under HISTORICAL SUMMARY / ITEM LEGACY is just
  // duplicate context for the model. Skip the duplicate block in that case.
  const summaryAlreadyInLore = summary && lore.includes(summary);
  const legacyAlreadyInLore = legacy && lore.includes(legacy);

  const itemNameForExamples = safe(item?.name) || '[item name]';

  const existingNames = Array.isArray(existingStubs)
    ? existingStubs.map(s => safe(s?.name)).filter(Boolean)
    : [];
  const existingBlock = existingNames.length
    ? `EXISTING NPC STUBS (already extracted in a previous scan):
${existingNames.map(n => `- ${n}`).join('\n')}

When the lore references any of these characters, use the existing name VERBATIM. Do not introduce variant forms — no added titles, no expanded full names, no epithets, no honorifics, no shortened forms — for any character in the list above. Only introduce new names for characters NOT in this list.

`
    : '';

  return `You are extracting named NPCs from the lore of a D&D 5e magic item.

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
Identify every NAMED INDIVIDUAL relevant to this item — people, oracles, gods, smiths, captains, owners, witnesses, etc.

INDIVIDUALS vs GROUPS vs UNNAMED-BUT-SPECIFIC — important distinctions:
- A specific individual with a proper name (e.g., "Yelena of the Duskwood", "Master Smith Gorvak"): extract directly using that name.
- A GROUP / faction / cult / tribe / order / lineage with no specific member named in the source (e.g., "the Vorn-Taak earth-priests", "the Kha'Zur smith-cults"): INVENT a single plausible individual member's name in the same linguistic style as the rest of the source. Use the invented name as this stub's "name". Do NOT use the group's name as the stub's name. In context, identify them as a member of that group.
- If a group AND a specific member are both named in the source (e.g., "Skragbit, shaman of the Mukgash tribe"): only extract the specific member; do NOT invent an additional member for the same group.
- A specific individual referenced ONLY by their relationship to a named person (e.g., "Jara's daughter", "King Aldric's son", "the smith's apprentice", "Veylin's bastard"): they are a real, specific character — NOT an archetype, NOT a group. INVENT a plausible given name in the same linguistic style as the named relative (Slavic relative → Slavic invention; Norse relative → Norse invention; etc.). Use the invented name as this stub's "name". In "role_brief" and "context", identify them by both the invented name AND their relationship to the named person (e.g., "Daughter of Jara who guards [item]").
- Anonymous archetypes with no proper name AND no naming relationship to a named person (e.g., "a wandering knight", "the king", "a passing merchant"): skip them.

For each NPC, output an object with:
- "name": the individual's name (real if named in the source, invented if only the group was named).
- "role_brief": ≤10 words describing their relationship to this item AND containing the EXACT item name verbatim. Examples: "Creator of ${itemNameForExamples}", "Wielder of ${itemNameForExamples}", "Oracle who received the vision of ${itemNameForExamples}", "Smith who forged ${itemNameForExamples}". The item name MUST appear character-for-character — no paraphrasing, no shortened forms like "the staff".
- "context": one sentence describing what they did or how they relate to this specific item. For invented members of a named group, mention the group affiliation here.
- "source_quote": the verbatim passage from the source text where this NPC appears — copied character-for-character so it can be piped into a downstream NPC-generation prompt. If they appear in a TIMELINE EVENT, copy the entire event description (it's full of useful context: year, location, action). If they appear only in the main lore, copy the relevant sentence(s). For invented members of a group, copy the sentence about the group plus a leading note: "(invented from group passage) <verbatim sentence>". Empty string only if the NPC has truly no textual basis in the source.

Output STRICTLY a JSON array (no prose, no commentary, no code fences):
[
  {"name": "...", "role_brief": "...", "context": "...", "source_quote": "..."}
]

If there are no named NPCs in the source text, return an empty array: []`;
}

/**
 * Validate the extraction response: must parse to an array of stubs, each
 * with the three required string fields.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateItemNPCExtraction(jsonString) {
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
      // source_quote is optional for backwards-compat with older responses,
      // but if present must be a string.
      && (stub.source_quote === undefined || typeof stub.source_quote === 'string')
    );
  } catch {
    return false;
  }
}

/**
 * Build the prefilled `typeOfPlace` text the NPC Generator drops into its input
 * when the user arrives from the Item Generator. The user can edit before
 * generating; the item's full data is here so the NPC Generator's existing
 * generic NPC prompt produces an NPC consistent with the item.
 *
 * Pure function — no side effects, no localStorage access. Tested in
 * isolation. Consumes a SeededInput as produced by
 * `buildSeededInputFromItem` in `item-storage.mjs`.
 *
 * @param {Object} seededInput
 * @returns {string}
 */
export function buildPrefilledTypeOfPlace(seededInput) {
  if (!seededInput?.source || !Array.isArray(seededInput.entities)) return '';
  const stub = seededInput.entities[0];
  const source = seededInput.source;
  if (!stub || !source) return '';

  const stubName = (stub.name || '').trim();
  const roleBrief = (stub.role_or_description || '').trim();
  const stubContext = (stub.context || '').trim();
  const sourceQuote = (source.quote || '').trim();

  const itemName = (source.name || '').trim();
  const itemType = (source.item_type || '').trim();
  const itemRarity = (source.rarity || '').trim();
  const physical = (source.physical_description || '').trim();
  const lore = (source.lore || '').trim();

  // Headline uses structured Name: / Role: lines rather than a dash form
  // ("Korrish — Salt-sacrificed oracle bound into …") because the dash
  // form is ambiguous to LLMs — the model sometimes copies the full
  // dash-joined string into character_name. Field labels make the name
  // unambiguous; the prompt's character_name instruction does the rest.
  const lines = [`Name: ${stubName}`];
  if (roleBrief) lines.push(`Role: ${roleBrief}.`);
  if (itemName) lines.push(`Mentioned in lore of ${itemName}.`);
  const headline = lines.join('\n');

  const sections = [headline];

  if (physical) {
    sections.push('', physical);
  }

  if (lore) {
    sections.push('', 'Lore:', lore);
  }

  // The source_quote is the richest context we have — typically the verbatim
  // timeline event the NPC appears in, full of year/location/action detail.
  // Surface it prominently so the NPC Generator's prompt picks up year-and-
  // place specifics, not just role_brief.
  if (sourceQuote && sourceQuote !== lore && !lore.includes(sourceQuote)) {
    sections.push('', `Where this NPC appears in the source text:`, sourceQuote);
  }

  if (stubContext) {
    sections.push('', `Specific role: ${stubContext}`);
  }

  return sections.join('\n').trim();
}
