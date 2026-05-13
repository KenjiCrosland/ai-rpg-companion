/**
 * Catchall prompt-block builder for non-pool risky registers.
 *
 * For registers that carry cultural-protection risk but don't yet have
 * a dedicated pool (Yoruba/Andean are pool-tier; everything else
 * protected lands here), this module returns a prompt block that
 * constrains naming density and protects against real-figure usage.
 * Returns an empty string for registers outside the catchall set, so
 * the caller can append the result unconditionally.
 *
 * Architecture: density-constraint plus per-register item-name avoid-
 * list. The catchall instructs the LLM to use AT MOST one register-
 * language character name and one register-language item name per
 * generation, with all other places/spirits/secondary characters in
 * English-descriptive form. The narrow naming surface reduces collision
 * risk without requiring per-register curation.
 *
 * Character-name whitelist injection happens separately in
 * `buildCharacterWhitelistBlock` (unified registry path). This block
 * stays pure-structural — the character-name bullet describes density
 * and role, the whitelist block describes WHO. Previously the catchall
 * injected the whitelist too, which double-injected the same list when
 * the unified registry also fired. The whitelist now appears once,
 * always via the dedicated block.
 *
 * The set of catchall registers and the per-register item-name avoid-
 * list both derive from `ALL_REGISTERS` — every entry with
 * `promptArchitecture: 'catchall'` is a catchall register, and any
 * such entry with an `itemNameAvoidList` array carries an avoid-list
 * injection.
 *
 * Removed registers (Navajo/Diné) are NOT in this list — they were
 * deleted entirely from the register system under appropriation
 * caution. Diné-coded user input falls through to the LLM's world-
 * knowledge override path with strict universal-invent rules.
 *
 * Graduation tiers (least → most protective):
 *   1. Universal-invent rules in main prompt (Western-canonical and
 *      fictional fantasy registers — no protected flag).
 *   2. Catchall density constraints + freehand epithet construction
 *      (most protected registers without a curated pool; this
 *      module's default behavior).
 *   3. Catchall density constraints + character-name whitelist via
 *      `buildCharacterWhitelistBlock` (this module's structural block
 *      + a separate whitelist injection; Maori is the first).
 *   4. Full pool architecture with dedicated prompt builder (Yoruba,
 *      Andean; characters + places + spirits all pool-sourced via
 *      `buildPoolPromptBlock`).
 */

import { ALL_REGISTERS } from '@/shared/registers/index.mjs';

/**
 * Register prefixes routed to the catchall. Derived from
 * `ALL_REGISTERS` — `promptArchitecture: 'catchall'` opts a register
 * in. Pool-architecture registers (Yoruba, Andean) explicitly take
 * the `'pool'` path instead and don't appear here.
 */
export const CATCHALL_REGISTER_PREFIXES = ALL_REGISTERS
  .filter(r => r.promptArchitecture === 'catchall')
  .map(r => r.prefix);

/**
 * Per-register item-name avoid-lists. Derived from `ALL_REGISTERS` —
 * any catchall register that declares an `itemNameAvoidList` field
 * contributes here.
 *
 * Sacred or ceremonially-weighted terms in the register's language
 * that the LLM must NOT use as components of the generation's single
 * item name. Production output showed DeepSeek selecting from the
 * most prominent register vocabulary regardless — words that happen
 * to sit at the top of any English-language reference are
 * disproportionately the spiritual/ceremonial ones. The avoid-list
 * flips that default: name the specific terms not to use, with the
 * reason ("carries sacred or ceremonial weight"). The LLM has plenty
 * of non-sacred vocabulary to draw on once the sacred surface is
 * fenced off.
 *
 * Adding an avoid-list to a new register: add the `itemNameAvoidList`
 * field to that register's entry in `src/shared/registers/`. No
 * changes to this file required.
 */
export const registerItemNameAvoidLists = Object.fromEntries(
  ALL_REGISTERS
    .filter(r => r.promptArchitecture === 'catchall' && Array.isArray(r.itemNameAvoidList))
    .map(r => [r.prefix, r.itemNameAvoidList]),
);

export function getItemNameAvoidList(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  const entry = Object.entries(registerItemNameAvoidLists).find(
    ([prefix]) => selectedRegister.startsWith(prefix),
  );
  return entry ? entry[1] : null;
}

export function isCatchallRegister(selectedRegister) {
  if (typeof selectedRegister !== 'string') return false;
  return CATCHALL_REGISTER_PREFIXES.some(prefix => selectedRegister.startsWith(prefix));
}

export function buildCatchallPromptBlock(selectedRegister) {
  if (!isCatchallRegister(selectedRegister)) return '';

  // Character-name bullet is pure-structural: the WHO comes from
  // `buildCharacterWhitelistBlock` when the register has a whitelist,
  // freehand epithet construction otherwise. Both routes are governed
  // by the unified registry now — no per-register branching here.
  const characterNameBullet = `- ONE character name in the register's language. This is the lore's single named figure (typically the creator, primary wielder, or key witness). If a separate CHARACTER WHITELIST FOR THIS GENERATION block is present below, pick the name from that list; otherwise construct a praise-name epithet — a descriptive identity-handle following the cultural register's epithet conventions, NOT a theophoric or circumstantial given name.`;

  const itemNameAvoidList = getItemNameAvoidList(selectedRegister);
  const itemNameBullet = itemNameAvoidList
    ? `- ONE item name in the register's language. This is the item's original-language name that appears parenthetically in the lore (e.g., "called [X] in the speech of its makers"). Construct it from non-sacred everyday word components in the register's language.

  Do NOT use any of these culturally-protected or sacred terms as components of the item name: ${itemNameAvoidList.join(', ')}. These terms carry sacred, ceremonial, or genealogical weight in this register; reusing them as fictional item-name components is appropriative even when the surrounding compound is invented. Reach for material, environmental, or descriptive vocabulary instead (textures, colors, tools, weather, terrain, craft actions).`
    : `- ONE item name in the register's language. This is the item's original-language name that appears parenthetically in the lore (e.g., "called [X] in the speech of its makers"). Construct it from non-sacred everyday word components in the register's language.`;

  return `NAMING ARCHITECTURE FOR THIS GENERATION:

This register uses a cultural register whose phonetics may be unfamiliar to English-speaking readers. To preserve readability while maintaining cultural register, use the following naming pattern:

${characterNameBullet}

${itemNameBullet}

- ZERO place names in the register's language. Refer to all places using English-descriptive forms drawn from THIS register's actual material culture, occupations, landforms, trade goods, or craft processes. Invent the place description freshly per generation; do not borrow place-descriptor vocabulary from other traditions.

- ZERO spirit or deity names in the register's language. Refer to all spirits and deities using English-descriptive forms drawn from this register's own cosmological domains (water-features, terrain features, craft-domains, natural cycles specific to this register's environment). Invent the spirit description freshly per generation.

- Secondary characters (apprentices, family members, witnesses, elders) referred to by role rather than by additional names. Build the role description from this register's actual occupational and kinship vocabulary.

REAL FIGURES MUST NOT APPEAR:

Do not use real religious figures (deities, prophets, sacred ancestors) from any tradition as fictional characters or deities. Do not use real historical figures (emperors, kings, generals, founders, named cultural-resistance figures) as fictional characters. If your construction would naturally invoke a real figure's name, use a different epithet or descriptor.

MATERIALS:

Combine real cultural materials from this register's actual tradition (substrate, structure) with invented fantasy materials of your own choosing used as magic-bearing components or embellishments. Generate fresh fantasy materials per generation rather than reaching for stock fantasy-material vocabulary.

STRUCTURE FOR THE LORE'S COSMOLOGICAL FRAMING:

Build the lore as a short scene with: an item-name in the register's language; a single named character (drawn from the whitelist if one is registered, or constructed per the rule above) with an occupation rooted in this register's craft tradition; a place referred to by English-descriptive form; a brief history that moves the item from creation to current location; an English-descriptive spirit or cosmological reference that gives the item magical weight. Do not import phrasing from other registers' traditions — every descriptor should be plausibly drawn from THIS register's actual material and environmental record.

ONE character name. ONE item name. All else in culturally-grounded English.`;
}
