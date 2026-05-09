/**
 * Catchall prompt-block builder for non-pool risky palettes.
 *
 * For palettes that carry cultural-protection risk but don't yet have
 * a dedicated pool (Yoruba/Andean), this module returns a prompt block
 * that constrains naming density and protects against real-figure
 * usage. Returns an empty string for palettes outside the catchall set
 * (pool palettes, low-risk Western-coded palettes, fictional fantasy
 * palettes), so the caller can append the result unconditionally.
 *
 * Architecture: density-constraint with optional per-palette whitelist
 * augmentation. The catchall instructs the LLM to use AT MOST one
 * palette-language character name and one palette-language item name
 * per generation, with all other places/spirits/secondary characters
 * in English-descriptive form. The narrow naming surface reduces
 * collision risk without requiring per-palette curation.
 *
 * Per-palette whitelist (added v2 after the Tangaroa/Maori failure):
 * a palette may register a curated character-name array in
 * `paletteCharacterEpithetWhitelists` (see
 * `src/data/cultural-pools/palette-whitelists.mjs`). When a whitelist
 * exists for the active palette, the freehand-construction
 * instruction is replaced with a pick-from-list instruction. This is
 * an intermediate protection level between bare catchall and full
 * pool architecture — sufficient for palettes where DeepSeek's
 * training-data pantheon density would otherwise produce real-figure
 * usage during freehand construction.
 *
 * Graduation tiers (least → most protective):
 *   1. Universal-invent rules in main prompt (Western-canonical and
 *      fictional fantasy palettes).
 *   2. Catchall density constraints + freehand epithet construction
 *      (most non-Western palettes; this module's default behavior).
 *   3. Catchall density constraints + character-name whitelist (this
 *      module + a registered whitelist; Maori is the first).
 *   4. Full pool architecture with dedicated prompt builder (Yoruba,
 *      Andean; characters + places + spirits all pool-sourced).
 *
 * Promotion happens when production data shows a tier failing for a
 * specific palette. Each tier is cheaper to ship than the next.
 *
 * Architecture note: this is a minimum-viable shared block paralleling
 * yoruba-prompt.mjs and andean-prompt.mjs. The full per-palette prompt
 * architecture plan (`plans/per-palette-prompt-architecture.md`) calls
 * for routing through a dedicated dispatcher; this file is the
 * precursor.
 */
import { getWhitelistForPalette } from '@/data/cultural-pools/palette-whitelists.mjs';

/**
 * Palette prefixes routed to the catchall. Selection criteria:
 * non-Western or otherwise cultural-protection-sensitive palettes that
 * don't yet have pool curation. Western-canonical palettes (Latin,
 * Norse-family, Germanic-family, Celtic-family, Slavic-family,
 * Hungarian, Finnish, Romanian, Russian, Italian-Renaissance, Greek)
 * are NOT in this list — they continue to use the universal-invent
 * rules in the main prompt without catchall augmentation. Fictional
 * fantasy palettes (Sindarin, Orcish, Goblin, Gnomish, Draconic, etc.)
 * are also excluded — there are no real-world referents to protect.
 *
 * Pool palettes (Yoruba, Andean) are NOT in this list — they have
 * dedicated prompt blocks via yoruba-prompt.mjs / andean-prompt.mjs.
 *
 * Removed palettes (Navajo/Diné) are NOT in this list — they were
 * deleted entirely from the palette system under appropriation
 * caution. Diné-coded user input falls through to the LLM's world-
 * knowledge override path with strict universal-invent rules.
 */
/**
 * Per-palette item-name avoid-lists.
 *
 * Sacred or ceremonially-weighted terms in the palette's language that
 * the LLM must NOT use as components of the generation's single item
 * name (the parenthetical "called [X] in the speech of its makers"
 * slot). The catchall already instructs "non-sacred everyday word
 * components," but production output showed DeepSeek selecting from
 * the most prominent Te Reo Māori vocabulary regardless — words that
 * happen to sit at the top of any English-language reference are
 * disproportionately the spiritual/ceremonial ones, which is exactly
 * the wrong end of the corpus to reach for.
 *
 * The avoid-list flips that default: name the specific terms not to
 * use, with the reason ("carries sacred or ceremonial weight"). The
 * LLM has plenty of non-sacred Te Reo to draw on (material,
 * environmental, descriptive vocabulary) once the sacred surface is
 * fenced off.
 *
 * Data-in-catchall pattern: the list lives inline here rather than in
 * a separate data file, paralleling CATCHALL_PALETTE_PREFIXES. Promote
 * to `src/data/cultural-pools/` if/when a second palette graduates to
 * needing one and the inline footprint starts crowding the file.
 *
 * Adding a palette: register a new entry keyed by the palette prefix.
 * Keep the term list focused on items that would be reached for
 * naturally during item-naming (not every sacred term in the language)
 * — the goal is to fence off the high-collision surface, not catalog
 * the entire sacred register.
 */
export const paletteItemNameAvoidLists = {
  'Maori-inspired': [
    'whakapapa', 'pō', 'mana', 'tapu', 'mauri', 'hau', 'wairua',
    'kaitiaki', 'atua', 'whatu', 'karakia', 'tohunga', 'marae',
    'tangi', 'tipuna',
  ],
};

export function getItemNameAvoidList(selectedPalette) {
  if (typeof selectedPalette !== 'string') return null;
  const entry = Object.entries(paletteItemNameAvoidLists).find(
    ([prefix]) => selectedPalette.startsWith(prefix),
  );
  return entry ? entry[1] : null;
}

export const CATCHALL_PALETTE_PREFIXES = [
  // East / Southeast / Central / South Asian
  'Japanese-inspired',
  'Chinese-inspired',
  'Korean-inspired',
  'Thai-inspired',
  'Mongolian-inspired',
  'Tibetan-inspired',
  'Hindi/Sanskrit-inspired',
  'Pamir-inspired',
  // Middle Eastern
  'Arabic/Persian-inspired',
  'Persian-inspired',
  // North African
  'Atlas-Berber-inspired',
  // Sub-Saharan African (Yoruba excluded — has pool)
  'Akan-inspired',
  'Igbo-inspired',
  'Swahili-inspired',
  // Pacific
  'Maori-inspired',
  'Hawaiian-inspired',
  // Mesoamerican (Andean excluded — has pool)
  'Maya-inspired',
  'Aztec/Nahuatl-inspired',
  // Indigenous American
  'Lakota-inspired',
  // Caucasus
  'Caucasian-inspired',
];

export function isCatchallPalette(selectedPalette) {
  if (typeof selectedPalette !== 'string') return false;
  return CATCHALL_PALETTE_PREFIXES.some(prefix => selectedPalette.startsWith(prefix));
}

export function buildCatchallPromptBlock(selectedPalette) {
  if (!isCatchallPalette(selectedPalette)) return '';

  const whitelist = getWhitelistForPalette(selectedPalette);
  const characterNameBullet = whitelist
    ? `- ONE character name from this curated list — pick exactly one and use it as written, preserving all macrons and diacriticals; do NOT modify, compound, or affix it. This is the lore's single named figure (typically the creator, primary wielder, or key witness):

  ${whitelist.join(', ')}

  Do NOT generate any character name outside this list. Do NOT construct freehand epithets in the palette's language even if you know the morphology — the list is the only permitted source for this generation's named character.`
    : `- ONE character name in the palette's language. This is the lore's single named figure (typically the creator, primary wielder, or key witness). Construct it as a praise-name epithet — a descriptive identity-handle following the cultural register's epithet conventions, NOT a theophoric or circumstantial given name.`;

  const itemNameAvoidList = getItemNameAvoidList(selectedPalette);
  const itemNameBullet = itemNameAvoidList
    ? `- ONE item name in the palette's language. This is the item's original-language name that appears parenthetically in the lore (e.g., "called [X] in the speech of its makers"). Construct it from non-sacred everyday word components in the palette's language.

  Do NOT use any of these culturally-protected or sacred terms as components of the item name: ${itemNameAvoidList.join(', ')}. These terms carry sacred, ceremonial, or genealogical weight in this register; reusing them as fictional item-name components is appropriative even when the surrounding compound is invented. Reach for material, environmental, or descriptive vocabulary instead (textures, colors, tools, weather, terrain, craft actions).`
    : `- ONE item name in the palette's language. This is the item's original-language name that appears parenthetically in the lore (e.g., "called [X] in the speech of its makers"). Construct it from non-sacred everyday word components in the palette's language.`;

  return `NAMING ARCHITECTURE FOR THIS GENERATION:

This palette uses a cultural register whose phonetics may be unfamiliar to English-speaking readers. To preserve readability while maintaining cultural register, use the following naming pattern:

${characterNameBullet}

${itemNameBullet}

- ZERO place names in the palette's language. Refer to all places using English-descriptive forms that draw on the cultural register's material and atmospheric specificity (e.g., "the high forge-town," "the indigo-dyer's grove," "the salt-trader's crossing," "the cloud-mountain pass").

- ZERO spirit or deity names in the palette's language. Refer to all spirits and deities using English-descriptive forms (e.g., "the river-spirit of the indigo waters," "the mountain-spirit of the high pass," "the keeper of the cowrie-counts").

- Secondary characters (apprentices, family members, witnesses, elders) referred to by role rather than by additional names (e.g., "his apprentice," "the dye-mother who taught him," "the elders of the smith-clan").

REAL FIGURES MUST NOT APPEAR:

Do not use real religious figures (deities, prophets, sacred ancestors) from any tradition as fictional characters or deities. Do not use real historical figures (emperors, kings, generals, founders, named cultural-resistance figures) as fictional characters. If your construction would naturally invoke a real figure's name, use a different epithet or descriptor.

MATERIALS:

Combine real cultural materials from this palette's tradition (substrate, structure) with fantasy materials (starshine pearl, moonstone, voidstone, voltiac copper, witchwood, soulsilver, nebula-cloth, etc.) used as magic-bearing components or embellishments.

EXAMPLE:

"Called [item-name in palette language] in the speech of its makers, this rod was forged by [character-name in palette language], the smith of the high forge-town, who pressed iron from the spirit-touched waters. It was lost when his apprentice fled with it through the cloud-mountains, and recovered generations later by river-fisherfolk near the market crossroads. The river-spirit of the indigo waters is said to whisper warnings to whoever holds it now."

ONE character name. ONE item name. All else in culturally-grounded English.`;
}
