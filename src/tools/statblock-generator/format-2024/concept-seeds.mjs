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
  // Register list rebuilt against the SRD's measured conventions
  // (2026-07-19): 47% single words, 36% two-word "<descriptor> <creature
  // noun>" pairs, and only 3.6% "X of Y" — so the title-epithet register is
  // gone and the two corpus-dominant two-word patterns are in.
  naming: [
    'a folk name: what frightened villagers would whisper — an <adjective> <noun> pair built from plain words that describe its body or behavior (store it WITHOUT a leading "the"; prose adds the article)',
    'an archaic compound: two short CONCRETE English roots fused into one unhyphenated word that reads smoothly aloud — one root for its body, material, or sound; one for its movement, weapon, or habit. Never pick the creature\'s two most obvious features; the pairing should surprise',
    'two words: an element, material, or time of day, then a plain creature noun (hag, hound, moth, worm, crawler...) — both words true of the creature',
    'two words: a vivid, predatory present-participle of how it moves or hunts, then a concrete SINGULAR noun for what it is or resembles — never weak participles (swaying, moving) or abstract plurals',
    'a common noun for what it does or resembles, made unsettling by capitalization alone',
    'a paired name: one soft, tender word and one dreadful word joined, both describing the creature — gentle means quiet or sorrowful, never cute or silly',
    'an atmospheric adjective, then an AGENT noun — what the creature does turned into a doer word (one who rings becomes a ringer). The adjective may be ominous (dread, pale, hollow); the doer must be concrete',
    // Coinage registers, reinstated 2026-07-19 with discipline (owner's
    // taxonomy of the SRD's real coinages): STRICT 1-2 syllables, blunt,
    // never melodic — the failure mode being three-syllable fantasy soup.
    'a mythological coinage: ONE or TWO syllables that sound excavated from a forgotten real-world pantheon — blunt old-epic phonology, endings like -or, -ar, -oth, -un, -eg. Never three syllables, never melodic',
    'an onomatopoeic coinage: ONE syllable (two at most) that imitates the actual sound of this creature moving or hunting — say it aloud and you hear the monster. A click, scrape, gulp, or hiss rendered as a word',
    'an alien-tongue coinage: ONE or TWO syllables transliterated from a language not meant for human mouths — deep, wet, back-of-the-throat sounds (uu, gh, ch, ul, oth). Pronounceable but wrong. Never three syllables',
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

// Naming directives shared by the raw-seed concept and the synthesized one.
export function namingRules(traits) {
  return `Name it as ${traits.naming}. ` +
    'The name must match the creature you actually designed — its primary movement, attack, material, or sound as expressed in its abilities, not a generic monster vibe. ' +
    'Ability names likewise must name what each ability actually does — never mood words the creature doesn\'t earn (nothing "laments" unless an ability laments). ' +
    'Never hyphenate names: two-word names use a space; compound names fuse into one word. ' +
    'The name\'s SOUND should fit the creature: heavy slow things take heavy sounds (long vowels; b, d, g, m), quick things take sharp short sounds (k, t, short vowels), sinuous or stealthy things take sibilants and liquids (s, sh, l). ' +
    'Name concrete things — body, material, movement, sound, habit. Abstract menace words (terror, doom, dread, horror, death, fear) are banned as the name\'s HEAD noun — as a leading adjective before a concrete doer they are allowed. ' +
    'The rolled trait words are design guidance ONLY — never use them, or obvious derivatives of them, in the creature\'s name or its ability names.';
}

/**
 * Generation concept built from a synthesis sentence (produced by the seed
 * synthesis call): the model designs from ONE fused identity instead of a
 * list of axes — the anti-discombobulation mechanism. The intelligence tier
 * rides along because the synthesis sentence may drop the INT guidance.
 */
export function buildSynthesizedConcept(traits, synthesis) {
  return `${synthesis.trim()} It is ${traits.intelligence}. ` +
    'Every ability should express that single identity — do not give each physical detail its own separate ability. ' +
    namingRules(traits);
}

/**
 * Sample one option per dimension and compose the concept string used for
 * both the archetype resolve call and the generation prompt (fallback path —
 * the synthesis call produces a fused concept when available).
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
    'Blend every trait into ONE coherent creature with a single unifying identity — contradictions between traits are creative fuel, not errors. ' +
    namingRules(traits);
  return { ...traits, concept };
}
