/**
 * Yoruba prompt-block builder for the item generator.
 *
 * When the selected palette is Yoruba, this module returns a prompt
 * block that overrides the abstract universal-invent rule with
 * concrete epithet pools. Returns an empty string for any other
 * palette, so the caller can append the result unconditionally.
 *
 * Architecture: positive-constraint-only. The pool's "use ONLY these
 * names" instruction is the sole real-name protection. There is no
 * avoid-list block — listing real names with "do NOT use" puts them
 * in DeepSeek's working context and can paradoxically increase the
 * chance they surface. Real-name protection is enforced at curation
 * time on the pool data, not at prompt time.
 *
 * Architecture note: this is a minimum-viable injection. The full
 * per-palette prompt architecture plan (`plans/per-palette-prompt-
 * architecture.md`) calls for routing to a dedicated Yoruba prompt
 * builder; this file is the precursor that proves the pool approach
 * works end-to-end before committing to the larger refactor.
 */

import {
  yorubaCharacterEpithets,
  yorubaPlaceEpithets,
  yorubaSpiritEpithets,
  yorubaCulturalNotes,
} from '@/data/cultural-pools/yoruba.mjs';

export function isYorubaPalette(selectedPalette) {
  return typeof selectedPalette === 'string'
    && selectedPalette.startsWith('Yoruba-inspired');
}

export function buildYorubaPromptBlock(selectedPalette) {
  if (!isYorubaPalette(selectedPalette)) return '';

  return `${yorubaCulturalNotes}

NAMES FOR THIS GENERATION — USE ONLY FROM THESE EPITHET POOLS:

For character names in this item's lore, use these Yoruba praise-name epithets:

${yorubaCharacterEpithets.join(', ')}

For places (towns, mountains, rivers, forests, ceremonial sites), use these place epithets:

${yorubaPlaceEpithets.join(', ')}

For nature-spirits or localized spiritual presences mentioned in the lore, use these spirit epithets:

${yorubaSpiritEpithets.join(', ')}

These pools are the ONLY source for proper nouns in this generation. Do NOT invent additional names. Do NOT use any name not in these pools. Use the names directly without translating them in output. Rely on your knowledge of Yoruba morphology to pick names that fit the lore's tone.

For the item's own name in lore, construct an original-language compound from Yoruba word components (Ọpá = staff/wand, Adé = crown, Ìlù = drum, Òfò = cloak, Idà = sword, Ọkọ̀ = vehicle/spear, etc.) joined with descriptive elements. Frame the language with an in-world descriptor ("the tongue of its makers," "the speech of the [Place from pool] elders") — never "the Yoruba tongue" or "in Yoruba."

If the user provided lore that contains a proper noun not in these pools, honor the user's name (user input is always the highest authority) but do not generate any additional out-of-pool names.

Pool selection rules:
- Pick names that fit the lore framing and the item's mood. The pools are diverse; not every name fits every story.
- Use 2-4 names total across the lore. Item lore is short — too many names crowd the prose.
- Do NOT alter the spelling, tone marks, or diacriticals of pool names. They are correct as written.`;
}
