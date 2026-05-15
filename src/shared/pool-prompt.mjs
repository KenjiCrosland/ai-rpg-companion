/**
 * Generic pool-architecture prompt-block builder.
 *
 * Pool-architecture registers (character pool + place pool + spirit
 * pool + cultural notes + item-name guidance) are the most-protective
 * tier of the cultural-protection ladder (above whitelist+catchall,
 * above bare catchall, above universal-invent).
 *
 * The per-register descriptor table previously lived inline here. It
 * has now consolidated into the register entries themselves —
 * `yorubaRegister` and `andeanRegister` in `src/shared/registers/`
 * declare `promptArchitecture: 'pool'` and carry every pool-prompt
 * field (cultureName, pools, culturalNotes, itemNameGuidance,
 * spellingReminder, properNounsPoolOnly). This builder reads off the
 * register object directly.
 *
 * Adding a new pool-architecture register: create
 * `src/shared/registers/<name>.mjs` exporting an `xxxRegister` object
 * with `promptArchitecture: 'pool'` plus the required fields, add it
 * to `ALL_REGISTERS` in `src/shared/registers/index.mjs`. No edits to
 * this file required.
 *
 * Returns empty string for any register without a registered
 * descriptor, so the caller can append the result unconditionally.
 */

import { ALL_REGISTERS } from '@/shared/registers/index.mjs';

function findPoolRegister(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  return ALL_REGISTERS.find(r =>
    r.promptArchitecture === 'pool' && selectedRegister.startsWith(r.prefix),
  ) || null;
}

export function isPoolArchitectureRegister(selectedRegister) {
  return findPoolRegister(selectedRegister) !== null;
}

export function buildPoolPromptBlock(selectedRegister) {
  const descriptor = findPoolRegister(selectedRegister);
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
