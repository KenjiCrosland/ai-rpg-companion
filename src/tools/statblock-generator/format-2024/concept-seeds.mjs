/**
 * Random concept seeding for blank-form generations (owner design,
 * 2026-07-19). Four independent dimensions sampled client-side compose a
 * concept the archetype resolver and generation prompt both consume —
 * ~26k combinations, so random monsters stop feeling samey. Deliberate
 * mismatches (metallic + Feywild + mindless) are a feature: the prompt tells
 * the model contradictions are creative fuel.
 *
 * The intelligence axis does double duty: its INT range flows into the
 * concept text, so the seed shapes the statline as well as the name.
 */

export const SEED_DIMENSIONS = {
  intelligence: [
    'mindless (INT 1-2)',
    'instinct-driven (INT 2-4)',
    'cunning but bestial (INT 5-7)',
    'crudely sapient (INT 6-8)',
    'fully sapient (INT 10-14)',
    'scheming (INT 14-16)',
    'possessed of alien genius (INT 17-20)',
  ],
  physical: [
    'metallic', 'furred', 'scaled', 'chitinous', 'stone-skinned',
    'crystalline', 'fungal', 'woven from plant fiber', 'gelatinous',
    'skeletal', 'translucent', 'molten-veined', 'ice-sheathed',
    'porcelain-smooth', 'tar-slick', 'moss-grown',
  ],
  silhouette: [
    'serpent', 'many-legged skitterer', 'hulking biped', 'quadrupedal stalker',
    'amorphous mass', 'broad-winged flier', 'burrower', 'spider-limbed climber',
    'eel-slender swimmer', 'crab-like scuttler', 'towering thin-limbed strider',
    'squat dense-bodied brute', 'floating drifting form',
  ],
  origin: [
    'the Abyss', 'the Feywild', 'the Shadowfell', 'a scorching desert',
    'the deep ocean', 'a storm-wracked coast', 'the Underdark',
    'the arctic tundra', 'a volcanic waste', 'ancient ruins',
    'a city of graves', 'the Astral Sea', 'an elemental rift',
    'a drowned swamp', 'the high mountain passes', 'a cursed battlefield',
    'the dreams of sleepers', 'a sunken temple',
  ],
  // Linguistic registers for the NAME (owner direction, 2026-07-19; trimmed
  // to the folk family same day — coinage and Latinate registers produced
  // non-evocative word salad, and folk-style descriptive English is how most
  // real monsters are actually named: Owlbear, Shambling Mound, Displacer
  // Beast). Shape templates only, never proper-noun examples (examples leak
  // into output verbatim). Every register requires the name to EVOKE the
  // creature — built from plain words describing its body or behavior.
  naming: [
    'a folk name: what frightened villagers would whisper, shaped like "the <adjective> <noun>", built from plain words that describe its body or behavior',
    'an archaic compound: two short CONCRETE English roots fused into one word that reads smoothly aloud — one root for its body, material, or sound; one for its movement, weapon, or habit',
    'a title with an epithet, shaped like "<Title> of the <Domain>", where the title names what it does',
    'a single stark word: one short, heavy English word that names what it looks like or does',
    'a common noun for what it does or resembles, made unsettling by capitalization alone',
    'a paired name: one gentle word and one dreadful word joined, both describing the creature',
  ],
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const TOKEN_STOPWORDS = new Set([
  'the', 'from', 'with', 'that', 'form', 'fully', 'crudely', 'driven',
  'possessed', 'made', 'wide',
]);

/**
 * Content-word tokens from a seed's trait values (naming register excluded —
 * its words describe the name's SHAPE, not the creature). Light stemming
 * (drop -ing/-ed/-s) so "drifting" catches "Driftking". Used by the
 * seed-leakage lint rule: none of these may appear in the creature's name or
 * ability names.
 */
export function seedLeakTokens(traits) {
  const words = ['intelligence', 'physical', 'silhouette', 'origin']
    .flatMap((dim) => (traits[dim] ?? '').toLowerCase().split(/[^a-z]+/));
  const tokens = new Set();
  for (const w of words) {
    if (w.length < 4 || TOKEN_STOPWORDS.has(w)) continue;
    let stem = w;
    for (const suffix of ['ing', 'ed', 's']) {
      // Plural -s only; don't mangle -us/-ss words (genius, grass).
      if (suffix === 's' && /(us|ss)$/.test(stem)) continue;
      if (stem.endsWith(suffix) && stem.length - suffix.length >= 4) {
        stem = stem.slice(0, -suffix.length);
        break;
      }
    }
    tokens.add(stem);
  }
  return [...tokens];
}

/**
 * Sample one option per dimension and compose the concept string used for
 * both the archetype resolve call and the generation prompt.
 */
export function buildRandomConceptSeed() {
  const traits = {
    intelligence: pick(SEED_DIMENSIONS.intelligence),
    physical: pick(SEED_DIMENSIONS.physical),
    silhouette: pick(SEED_DIMENSIONS.silhouette),
    origin: pick(SEED_DIMENSIONS.origin),
    naming: pick(SEED_DIMENSIONS.naming),
  };
  const concept =
    `a ${traits.intelligence}, ${traits.physical} ${traits.silhouette} from ${traits.origin}. ` +
    'Blend every trait into one coherent creature — contradictions between traits are creative fuel, not errors. ' +
    `Name it as ${traits.naming}. ` +
    'Name concrete things — body, material, movement, sound, habit — never abstract menace words (terror, doom, dread, horror, death, fear). ' +
    'The trait words above are design guidance ONLY — never use them, or obvious derivatives of them, in the creature\'s name or its ability names.';
  return { ...traits, concept };
}
