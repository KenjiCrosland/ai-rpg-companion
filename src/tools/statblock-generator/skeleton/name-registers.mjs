/**
 * MONSTER NAME REGISTERS (owner call, 2026-08-15: "how do we improve naming
 * without an ever-expanding ban list? our item generator registers are a
 * clue").
 *
 * The failure class: DeepSeek free-coins proper names and clusters on
 * adjective + abstract-or-object nouns — "Pelted Lull", "Gilded Censer",
 * "Bonewrought Ossuary" ("Lull" shipped twice across unrelated houses; it
 * was never in our banks — it is the model's own attractor). Banning nouns
 * one review at a time is the coinage-detector mistake reborn ("our list
 * will never be long enough").
 *
 * The item generator solved the same problem structurally
 * (src/shared/registers/): steer by ROTATED POSITIVE EXAMPLES in a rolled
 * register, so attractors starve without ever being named — the model
 * imitates five concrete examples instead of free-coining. Its documented
 * lesson applies verbatim: STATIC example tails get cargo-culted ("three
 * Thyrsions in a row"), so examples must rotate per generation.
 *
 * Print's proper names fall into three conventions, and every bad name we
 * shipped violated the first:
 *   kenning  — plain words, adjective/material + CONCRETE creature-noun
 *              (Owlbear, Displacer Beast, Shambling Mound, Hell Hound)
 *   coinage  — one invented species-word (Otyugh, Chuul, Behir, Ankheg)
 *   folk     — what the villagers call it (Will-o'-Wisp shape; "the" +
 *              homely epithet, or a kinship name gone wrong)
 *
 * The convention is ROLLED pre-call and stated as fact, exactly like the
 * energy and the body plan — the same anti-attractor mechanism. Coinage
 * phonology reuses the item generator's FICTIONAL register pools, gated by
 * the funnel's type. The real-culture language registers (Maori, Yoruba,
 * Andean, ...) are deliberately NOT used: attaching human cultural
 * phonology to monsters is the exact failure their protection layer exists
 * to prevent.
 *
 * Deliberately ABSENT from the kenning noun bank: Warden and Sentinel —
 * our own live-output attractors (Hadal Warden, Ashgrave Warden,
 * Graspwarden). Starved by omission, not banned.
 */

import { aberrantCharacterEpithets } from '@/shared/registers/aberrant.mjs';
import { abyssalCharacterEpithets } from '@/shared/registers/abyssal.mjs';
import { draconicCharacterEpithets } from '@/shared/registers/draconic.mjs';
import { dwarvenCharacterEpithets } from '@/shared/registers/dwarven.mjs';
import { elvenCharacterEpithets } from '@/shared/registers/elven.mjs';
import { goblinoidCharacterEpithets } from '@/shared/registers/goblinoid.mjs';
import { infernalCharacterEpithets } from '@/shared/registers/infernal.mjs';
import { orcishCharacterEpithets } from '@/shared/registers/orcish.mjs';
import { primordialCharacterEpithets } from '@/shared/registers/primordial.mjs';

/**
 * Print-taste weights, not corpus-measured (SRD names are inherited, not
 * generated; there is no honest frequency to mine). Kenning dominant — it
 * is the shape a generated monster wears best and the one we already
 * attempt; coinage a strong minority; folk as spice.
 */
export const NAMING_WEIGHTS = { kenning: 55, coinage: 30, folk: 15 };
// Folk was retired for half a day (2026-08-16) on a misattribution — the
// disliked names ("Pelted Hound") were KENNING rolls; folk minted "the
// Clacking Tide", arguably the sprint's best name — and restored the same
// day (owner: "oh maybe folk is good and not kenning"). The live scorecard
// keeps all three: every register has a win at n=6, and the real residue
// is cross-block adjective ECHO in the kenning path ("Pelted" twice,
// because it leads hide's four-adjective list), which is ledger-class
// work, not a register's fault. The article-doubling folk once minted is
// fixed deterministically (ingestion strip + doubled-article pass).

export function rollNamingConvention(rand = Math.random) {
  const entries = Object.entries(NAMING_WEIGHTS);
  const total = entries.reduce((n, [, w]) => n + w, 0);
  let roll = rand() * total;
  for (const [convention, w] of entries) {
    roll -= w;
    if (roll < 0) return convention;
  }
  return 'kenning';
}

/**
 * Coinage phonology by funnel type. Epithet pools are calibration, not
 * candidates — the brief says so outright. Unmapped types draw the generic
 * pool below. Character-epithet pools are filtered to single bare words at
 * module load; multi-word court names ("Bael the First-Pact") are item/NPC
 * shaped, not species-shaped.
 */
const bareWords = (pool) => pool.filter((e) => /^[A-Z][a-z]+$/.test(e));

const TYPE_REGISTERS = {
  Dragon: bareWords(draconicCharacterEpithets),
  Fiend: bareWords([...infernalCharacterEpithets, ...abyssalCharacterEpithets]),
  Aberration: bareWords(aberrantCharacterEpithets),
  Elemental: bareWords(primordialCharacterEpithets),
  Fey: bareWords(elvenCharacterEpithets),
  Celestial: bareWords(elvenCharacterEpithets),
  Giant: bareWords(dwarvenCharacterEpithets),
  Humanoid: bareWords([...goblinoidCharacterEpithets, ...orcishCharacterEpithets]),
};

/** Species-coinage calibration for types with no register of their own. */
const GENERIC_COINAGES = [
  'Vhorlek', 'Skirrith', 'Brakkun', 'Ghulvar', 'Threnk', 'Ossqua',
  'Drenvash', 'Korrith', 'Ulmoth', 'Chorvax', 'Gnarruk', 'Yelvash',
  'Murrgen', 'Thwelk', 'Obrix', 'Ferrusk', 'Krovva', 'Zhulmek',
  'Lophrix', 'Wrusk',
];

/**
 * Concrete creature-nouns for the kenning convention — every entry a BODY
 * the reader pictures alive. Print's own dominant pattern is a real animal
 * (Owlbear, Blink Dog, Hell Hound, Death Dog, Shadow Mastiff).
 */
export const KENNING_NOUNS = [
  // animals, print's favorite anchor
  'Hound', 'Mastiff', 'Boar', 'Sow', 'Stag', 'Ram', 'Ox', 'Bull', 'Wolf',
  'Crow', 'Shrike', 'Heron', 'Owl', 'Vulture', 'Jackal', 'Serpent',
  'Adder', 'Eel', 'Pike', 'Lamprey', 'Crab', 'Spider', 'Mantis', 'Moth',
  'Wasp', 'Leech', 'Toad', 'Hare', 'Bat',
  // monster bodies
  'Maw', 'Wyrm', 'Drake', 'Hulk', 'Brute', 'Husk', 'Shade', 'Colossus',
  'Whelp', 'Brood',
  // figures with a trade or a hunger
  'Stalker', 'Prowler', 'Lurker', 'Reaver', 'Mauler', 'Strangler',
  'Butcher', 'Angler', 'Trapper', 'Weaver', 'Shepherd', 'Piper', 'Crone',
  'Widow', 'Matron', 'Knacker',
];

/** The folk-name voice: hearth-words, trade-words, kinship gone wrong. */
export const FOLK_NAMES = [
  // Fused compounds, never hyphenated: the hyphenated example this list
  // launched with ("the Rattle-Wife") coincided with two live blocks whose
  // ENTRY names went hyphen-heavy (Ash-Claw, Grave-Choke, Cinder-Breath) —
  // examples teach more than instructions, and the proper-name rules
  // already say compounds fuse.
  'the Rattlewife', 'Old Grindmarrow', 'the Fen Butcher',
  'the Ditch Piper', 'Granny Hollowbone', 'the Tollman',
  'the Weeping Ferryman', 'Old Sallow', 'the Bone Shepherd',
  'the Knacker', 'Wet Annie', 'the Midden King', 'Mother Casket',
  'Old Threadneedle',
];

/** Seeded rotation (mulberry32) so a reported seed reproduces its brief. */
function makeRand(seed) {
  if (seed == null) return Math.random;
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(pool, k, rand) {
  const copy = [...pool];
  const out = [];
  while (out.length < k && copy.length) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  }
  return out;
}

/**
 * The prompt block both callers splice verbatim — the synthesis prompt
 * (which proposes the candidate name) and the flavor prompt (which weighs
 * it and names the block). Same rolled convention on both sides, so the
 * two calls can't fight over the name's SHAPE; rotation may differ, which
 * is fine — examples calibrate, the convention binds.
 *
 * Returns '' for a missing/unknown convention: older callers and every
 * never-fail fixture see exactly the prompt they saw before.
 */
export function buildNamingBrief(convention, { type = null, seed = null } = {}) {
  const rand = makeRand(seed);
  if (convention === 'kenning') {
    const nouns = sample(KENNING_NOUNS, 8, rand).join(', ');
    return `
THE NAME — the convention is rolled, like the energy, and is not negotiable: this creature's proper name is a KENNING — one or two plain English words, a MODIFIER joined to a CONCRETE creature-noun. The modifier is TESTIMONY, not lore: what a survivor who watched the creature for six seconds would report — its gait (Shambling Mound), a power seen happening (Displacer Beast, Blink Dog), its substance (Gelatinous Cube), its doubled body (Owlbear). Never its origin, maker, or mood: "Dreamt", "Cursed", "Forgotten" are backstory no witness can see — and an adjective every such creature earns ("Pelted" on a furred beast) picks out nothing. Creature-nouns in this register (calibration — coin beyond them freely): ${nouns}. The noun must be a BODY the reader pictures alive: an animal, a figure, a physique. Never an object, container, structure, or state of mind — if the noun could sit on a shelf or name a mood, it cannot anchor a monster. If the name you wanted fights the convention, change the name, not the convention.
`;
  }
  if (convention === 'coinage') {
    const pool = TYPE_REGISTERS[type] ?? GENERIC_COINAGES;
    const examples = sample(pool, 5, rand).join(', ');
    return `
THE NAME — the convention is rolled, like the energy, and is not negotiable: this creature's proper name is a COINED SPECIES-WORD — one invented word, two or three syllables, pronounceable at the table, the Otyugh / Chuul / Ankheg shape. Its phonetic register: ${examples}. Coin a NEW word in that phonology — NEVER reuse or lightly respell an example (they are calibration, not candidates), and never a personal name or a name with a title: this word names what the creature IS.
`;
  }
  if (convention === 'folk') {
    const examples = sample(FOLK_NAMES, 4, rand).join('; ');
    return `
THE NAME — the convention is rolled, like the energy, and is not negotiable: this creature's proper name is a FOLK-NAME — what the nearest village calls the thing, half fear, half nickname: "the" plus a homely epithet, or a kinship or trade name gone wrong. In this voice: ${examples}. Coin your own from hearth-words, trade-words, family-words — never grand fantasy vocabulary, and never reuse an example.
`;
  }
  return '';
}
