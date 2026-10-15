/**
 * WHAT A PRINT NAME'S TAIL WORD NAMES (audit, 2026-10-15).
 *
 * print's two-word names split two ways. In "Brown Bear", "Fire Giant" and
 * "Green Hag" the tail names the creature's KIND — a Brown Bear is a bear, so a
 * GM who types "a bear" should find one. In "Goblin Boss", "Azer Sentinel" and
 * "Bugbear Warrior" the tail is a POST a creature holds — a Goblin Boss is a
 * goblin, and a GM who types "a boss" has not asked for a goblin.
 *
 * This was inferred from the two words by a pair of regexes, ROLE_HEAD and
 * JOB_TAIL, which between them absorbed NINETEEN commits — the most-patched
 * lines in the engine. Every new print name shape cost another patch, and no
 * word rule can get it right anyway, because:
 *
 *   - the same tail is a post in one name and a kind in another ("Bugbear
 *     Stalker" is a bugbear; an "Invisible Stalker" IS a stalker)
 *   - a creature head does not imply a post ("Ogre Zombie" and "Warhorse
 *     Skeleton" have creature heads and ARE a zombie and a skeleton)
 *
 * So it is not a pattern. It is a FACT about 119 specific names, in a corpus of
 * 329 blocks that does not change between releases. Stated once, here. A new
 * print name is a data edit; `every two-word print name is labelled` fails until
 * someone makes it.
 *
 * The list holds the MINORITY — the names whose tail is a post — because 102 of
 * the 119 are ordinary families and listing those would be noise.
 *
 * It was FROZEN from the old rules' own output and then corrected, so day one is
 * behaviour-identical apart from three deliberate changes, each named below.
 * `print-names.spec.js` re-derives the old rule and asserts exactly that, rather
 * than taking my word for it — which is how the two it would otherwise have
 * silently dropped (Vampire Familiar, Vampire Spawn) were caught.
 */
const TAIL_IS_A_POST = new Set([
  // the thirteen the old regexes had arrived at, each a creature holding a post
  'azer sentinel',
  'bugbear stalker',
  'bugbear warrior',
  'centaur trooper',
  'gnoll warrior',
  'goblin boss',
  'goblin minion',
  'goblin warrior',
  'hobgoblin captain',
  'hobgoblin warrior',
  'kobold warrior',
  'mummy lord',
  'sahuagin warrior',
  // a familiar and a spawn are posts too: print's Vampire Familiar is a thrall
  // and nobody typing "a familiar" has asked for a vampire's (the rank-word rule
  // these came in under: "a vampire lord" borrowed the Mummy Lord, 2026-10-02)
  'vampire familiar',
  'vampire spawn',
  // CORRECTIONS the word rules could not express:
  // a skirmisher is not a kind of merfolk — the same reading as Goblin Warrior.
  // "skirmisher" was simply missing from JOB_TAIL, and adding it would have been
  // patch twenty.
  'merfolk skirmisher',
  // a limb is not a creature at all, so no concept ending in "limb" may draw
  // this block.
  'troll limb',
]);

/**
 * Does this print name's tail word name the creature's kind? True for a family
 * ("Brown Bear"), false where the tail is a post ("Goblin Boss").
 *
 * The ONE correction in the other direction lives here rather than in the set:
 * an Invisible Stalker's kind IS "stalker" — it is the elemental the word names.
 * The old rule called it a post only because "invisible" is not a role word,
 * which is a fact about English adjectives and nothing about the creature.
 */
export function tailNamesKind(printName) {
  const n = String(printName ?? '').trim().toLowerCase();
  if (n.split(/\s+/).length < 2) return true;
  return !TAIL_IS_A_POST.has(n);
}

/** The labelled names, for the coverage pin. */
export const POSTS = TAIL_IS_A_POST;
