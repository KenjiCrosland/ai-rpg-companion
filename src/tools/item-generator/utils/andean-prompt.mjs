/**
 * Andean prompt-block builder for the item generator.
 *
 * When the selected palette is Andean, this module returns a prompt
 * block that overrides the abstract universal-invent rule with
 * concrete epithet pools (Quechua agentive -q and possessive -yuq
 * descriptive bynames). Returns an empty string for any other
 * palette, so the caller can append the result unconditionally.
 *
 * Architecture: positive-constraint-only. The pool's "use ONLY these
 * names" instruction is the sole real-name protection. There is no
 * avoid-list block in the prompt — listing real names with "do NOT
 * use" puts them in DeepSeek's working context and can paradoxically
 * increase the chance they surface. Real-name protection is enforced
 * at curation time on the pool data; the avoid-list is exported from
 * andean.mjs for test verification, not for prompt injection.
 *
 * V2 protections (added after production validation):
 *   - "Do NOT construct new compound names from Quechua components"
 *     instruction in the pool-only paragraph, addressing the
 *     Ninakancha / Yawarmayu construction-pattern leakage failure mode.
 *   - Item-name construction guidance is now scoped to the constrained
 *     vocabulary in andeanCulturalNotes (ITEM-NAME CONSTRUCTION
 *     section) rather than open-ended Quechua word components.
 *
 * Architecture note: this is a minimum-viable injection paralleling
 * yoruba-prompt.mjs. The full per-palette prompt architecture plan
 * (`plans/per-palette-prompt-architecture.md`) calls for routing to
 * a dedicated Andean prompt builder; this file is the precursor.
 */

import {
  andeanCharacterEpithets,
  andeanPlaceEpithets,
  andeanSpiritEpithets,
  andeanCulturalNotes,
} from '@/data/cultural-pools/andean.mjs';

export function isAndeanPalette(selectedPalette) {
  return typeof selectedPalette === 'string'
    && selectedPalette.startsWith('Andean-inspired');
}

export function buildAndeanPromptBlock(selectedPalette) {
  if (!isAndeanPalette(selectedPalette)) return '';

  return `${andeanCulturalNotes}

NAMES FOR THIS GENERATION — USE ONLY FROM THESE EPITHET POOLS:

For character names in this item's lore, use these Quechua descriptive bynames:

${andeanCharacterEpithets.join(', ')}

For places (towns, mountains, rivers, forests, ceremonial sites), use these place compounds:

${andeanPlaceEpithets.join(', ')}

For nature-spirits or localized spiritual presences mentioned in the lore, use these spirit epithets:

${andeanSpiritEpithets.join(', ')}

These pools are the ONLY source for proper nouns in this generation. Do NOT invent additional names. Do NOT construct new compound names from Quechua components for characters, places, or spirits — these proper-noun categories are pool-only. Use the pool names directly without translating them in output. Rely on your knowledge of Quechua morphology to pick names that fit the lore's tone.

The single exception is the item's own original-language name, which may be constructed — but ONLY from the constrained vocabulary specified in the ITEM-NAME CONSTRUCTION paragraph above (item-types, material descriptors, quality descriptors). Every constructed item-name compound must clear the COMPOUND CONSTRUCTION PATTERNS TO AVOID checklist (no [X]-kancha, no Yawar-X, no [X]-ñawi, no [X]-Inka, no [X]-amaru, no avoid-list components).

Frame the in-lore language descriptor with an in-world phrase ("the tongue of its makers," "the speech of the [Place from pool] elders") — never "the Quechua tongue" or "in Quechua."

If the user provided lore that contains a proper noun not in these pools, honor the user's name (user input is always the highest authority) but do not generate any additional out-of-pool names.

Pool selection rules:
- Pick names that fit the lore framing and the item's mood. The pools are diverse; not every name fits every story.
- Use 2-4 names total across the lore. Item lore is short — too many names crowd the prose.
- Do NOT alter the spelling, apostrophes (which mark phonemic ejectives), or h-after-stop sequences (which mark aspiration) of pool names. These are correct as written and phonemic, not decorative.`;
}
