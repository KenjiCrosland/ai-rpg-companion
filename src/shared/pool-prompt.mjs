/**
 * Generic pool-architecture prompt-block builder.
 *
 * Replaces the previous per-register prompt builders (yoruba-prompt.mjs,
 * andean-prompt.mjs) with a single descriptor-driven builder. Each
 * pool-architecture register (character pool + place pool + spirit
 * pool + cultural notes + item-name guidance) is described by an
 * entry in `POOL_DESCRIPTORS` below; the builder reads the descriptor
 * for the rolled register and emits a uniform block.
 *
 * Pool-architecture registers are the most-protective tier of the
 * cultural-protection ladder (above whitelist+catchall, above bare
 * catchall, above universal-invent). Currently all entries here are
 * flag-gated off (`enableProtectedRegisters: false` makes Yoruba and
 * Andean unreachable). When the flag re-enables, the descriptor
 * registry below drives all of them — no per-register prompt-builder
 * file required.
 *
 * Adding a new pool-architecture register: add an entry to
 * `POOL_DESCRIPTORS` referencing the data file's exports. No new
 * prompt-builder file needed.
 *
 * Returns empty string for any register without a registered
 * descriptor, so the caller can append the result unconditionally.
 */

import {
  yorubaCharacterEpithets,
  yorubaPlaceEpithets,
  yorubaSpiritEpithets,
  yorubaCulturalNotes,
} from '@/shared/registers/yoruba.mjs';
import {
  andeanCharacterEpithets,
  andeanPlaceEpithets,
  andeanSpiritEpithets,
  andeanCulturalNotes,
} from '@/shared/registers/andean.mjs';

/**
 * Per-register descriptor schema:
 *
 *   registerPrefix:   string startsWith key (e.g., 'Yoruba-inspired')
 *   cultureName:      human-readable culture name for the in-prompt
 *                     phrasing (e.g., 'Yoruba', 'Quechua')
 *   pools:            { character, place, spirit } — each
 *                     `{ label, entries }`. The label appears in the
 *                     prompt sentence introducing the pool.
 *   culturalNotes:    pre-built cultural-notes prose from the data
 *                     file; injected verbatim at the top of the block.
 *   itemNameGuidance: per-register paragraph governing the single
 *                     constructable proper noun (the item's own name)
 *   spellingReminder: per-register reminder about diacriticals,
 *                     apostrophes, ejective marks, etc.
 *   properNounsPoolOnly: when true, characters/places/spirits are
 *                     strictly pool-sourced (no construction allowed);
 *                     when false, the construction option is permitted.
 *                     Tightens the construction-rule sentence below.
 */
const POOL_DESCRIPTORS = [
  {
    registerPrefix: 'Yoruba-inspired',
    cultureName: 'Yoruba',
    pools: {
      character: { label: 'Yoruba praise-name epithets', entries: yorubaCharacterEpithets },
      place:     { label: 'place epithets',              entries: yorubaPlaceEpithets },
      spirit:    { label: 'spirit epithets',             entries: yorubaSpiritEpithets },
    },
    culturalNotes: yorubaCulturalNotes,
    itemNameGuidance: `For the item's own name in lore, construct an original-language compound from Yoruba word components (Ọpá = staff/wand, Adé = crown, Ìlù = drum, Òfò = cloak, Idà = sword, Ọkọ̀ = vehicle/spear, etc.) joined with descriptive elements.`,
    spellingReminder: `Do NOT alter the spelling, tone marks, or diacriticals of pool names. They are correct as written.`,
    properNounsPoolOnly: false,
  },
  {
    registerPrefix: 'Andean-inspired',
    cultureName: 'Quechua',
    pools: {
      character: { label: 'Quechua descriptive bynames', entries: andeanCharacterEpithets },
      place:     { label: 'place compounds',             entries: andeanPlaceEpithets },
      spirit:    { label: 'spirit epithets',             entries: andeanSpiritEpithets },
    },
    culturalNotes: andeanCulturalNotes,
    itemNameGuidance: `The single exception is the item's own original-language name, which may be constructed — but ONLY from the constrained vocabulary specified in the ITEM-NAME CONSTRUCTION paragraph above (item-types, material descriptors, quality descriptors). Every constructed item-name compound must clear the COMPOUND CONSTRUCTION PATTERNS TO AVOID checklist (no [X]-kancha, no Yawar-X, no [X]-ñawi, no [X]-Inka, no [X]-amaru, no avoid-list components).`,
    spellingReminder: `Do NOT alter the spelling, apostrophes (which mark phonemic ejectives), or h-after-stop sequences (which mark aspiration) of pool names. These are correct as written and phonemic, not decorative.`,
    properNounsPoolOnly: true,
  },
];

export function isPoolArchitectureRegister(selectedRegister) {
  if (typeof selectedRegister !== 'string') return false;
  return POOL_DESCRIPTORS.some(d => selectedRegister.startsWith(d.registerPrefix));
}

export function buildPoolPromptBlock(selectedRegister) {
  if (typeof selectedRegister !== 'string') return '';
  const descriptor = POOL_DESCRIPTORS.find(d => selectedRegister.startsWith(d.registerPrefix));
  if (!descriptor) return '';

  const {
    cultureName,
    pools,
    culturalNotes,
    itemNameGuidance,
    spellingReminder,
    properNounsPoolOnly,
  } = descriptor;

  const constructionRule = properNounsPoolOnly
    ? `Do NOT invent additional names. Do NOT construct new compound names from ${cultureName} components for characters, places, or spirits — these proper-noun categories are pool-only.`
    : `Do NOT invent additional names. Do NOT use any name not in these pools.`;

  return `${culturalNotes}

NAMES FOR THIS GENERATION — USE ONLY FROM THESE EPITHET POOLS:

For character names in this item's lore, use these ${pools.character.label}:

${pools.character.entries.join(', ')}

For places (towns, mountains, rivers, forests, ceremonial sites), use these ${pools.place.label}:

${pools.place.entries.join(', ')}

For nature-spirits or localized spiritual presences mentioned in the lore, use these ${pools.spirit.label}:

${pools.spirit.entries.join(', ')}

These pools are the ONLY source for proper nouns in this generation. ${constructionRule} Use the pool names directly without translating them in output. Rely on your knowledge of ${cultureName} morphology to pick names that fit the lore's tone.

${itemNameGuidance}

Frame the in-lore language descriptor with an in-world phrase ("the tongue of its makers," "the speech of the [Place from pool] elders") — never "the ${cultureName} tongue" or "in ${cultureName}."

If the user provided lore that contains a proper noun not in these pools, honor the user's name (user input is always the highest authority) but do not generate any additional out-of-pool names.

Pool selection rules:
- Pick names that fit the lore framing and the item's mood. The pools are diverse; not every name fits every story.
- Use 2-4 names total across the lore. Item lore is short — too many names crowd the prose.
- ${spellingReminder}`;
}
