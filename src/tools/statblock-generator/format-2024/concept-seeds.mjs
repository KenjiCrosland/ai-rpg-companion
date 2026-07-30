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
  disposition: [
    'a relentless ambush predator',
    'a territorial guardian that defends its home ground to the death',
    'a frontline berserker that revels in open violence',
    'a skirmishing pack-hunter that harries, withdraws, and circles back',
    'a patient killer that strikes from extreme range',
    'a battlefield manipulator that herds and traps rather than brawls',
    'a protective herd-beast that shields its own kind',
    'a curious trickster, more mischief than malice',
    'a benevolent warden sworn to protect travelers who show respect',
    'a mindless scavenger drawn to carrion and ruin',
    'a proud sentinel bound to an ancient oath it no longer remembers',
    'a colony of many small bodies acting as one will',
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
  const words = ['intelligence', 'physical', 'silhouette', 'origin', 'disposition']
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
    'The name must express what the creature IS — its nature, material, origin, and story — never a summary of its attacks or combat routine, and never a generic monster vibe. ' +
    'Ability names likewise must name what each ability actually does, in PLAIN ENGLISH — coined or invented words belong to the creature\'s name only, never to ability names. Never mood words the creature doesn\'t earn (nothing "laments" unless an ability laments). ' +
    'Never hyphenate names: two-word names use a space; compound names fuse into one word — but a COINED name is built from sound, never by gluing two English words together ("Disshadow" is a glue-word, not a coinage). ' +
    'The name\'s SOUND should fit the creature: heavy slow things take heavy sounds (long vowels; b, d, g, m), quick things take sharp short sounds (k, t, short vowels), sinuous or stealthy things take sibilants and liquids (s, sh, l). ' +
    'Name concrete things — body, material, movement, sound, habit. Abstract menace words (terror, doom, dread, horror, death, fear) are banned as the name\'s HEAD noun — as a leading adjective before a concrete doer they are allowed. ' +
    'Never cutesy, comedic, or diminutive words (slinky, bouncy, squishy) — satisfy the sound profile with words that keep their menace. The head noun should be a creature, agent, or evocative form, not a plain object, unless the creature genuinely IS an animated object. ' +
    'The rolled trait words are design guidance ONLY — never use them, or obvious derivatives of them, in the creature\'s name or its ability names.';
}

/**
 * Generation concept built from a synthesis sentence (produced by the seed
 * synthesis call): the model designs from ONE fused identity instead of a
 * list of axes — the anti-discombobulation mechanism. The intelligence tier
 * rides along because the synthesis sentence may drop the INT guidance.
 */
export function buildSynthesizedConcept(traits, synthesis) {
  return `${synthesis.trim()} It is ${traits.intelligence}, and it is ${traits.disposition ?? 'true to its nature'}. ` +
    typeMandate(traits.creature_type) +
    'Its alignment must FOLLOW that disposition (guardians and wardens are not evil; tricksters are not brutes). ' +
    'Every ability should express that single identity — do not give each physical detail its own separate ability. ' +
    namingRules(traits);
}

/**
 * Sample one option per dimension and compose the concept string used for
 * both the archetype resolve call and the generation prompt (fallback path —
 * the synthesis call produces a fused concept when available).
 */
// Creature-type dimension (owner call, 2026-07-27): without one, the model's
// physical/origin seeds funnel everything into monstrosity/plant/ooze —
// lifetime output had ZERO fiends, celestials, or humanoids. Weights are
// corpus-inspired with the mundane-animal tail trimmed (Beast low: a random
// "monster" generator shouldn't roll a deer).
const TYPE_WEIGHTS = [
  ['Monstrosity', 13], ['Aberration', 11], ['Fiend', 11], ['Undead', 11],
  ['Fey', 9], ['Construct', 8], ['Elemental', 8], ['Dragon', 7],
  ['Celestial', 6], ['Giant', 6], ['Humanoid', 6], ['Plant', 5],
  ['Beast', 5], ['Ooze', 3],
];
const TYPE_WEIGHT_TOTAL = TYPE_WEIGHTS.reduce((s, [, w]) => s + w, 0);

export function rollCreatureType() {
  let roll = Math.random() * TYPE_WEIGHT_TOTAL;
  for (const [type, weight] of TYPE_WEIGHTS) {
    if (roll < weight) return type;
    roll -= weight;
  }
  return 'Monstrosity';
}

// Type ESSENCES (owner call, 2026-07-28 — the anti-reskinning mechanism):
// a bare type mandate produced retrofits ("a spore creature... OH, make it
// sparkly" — the Shusspore). The essence tells the synthesis what the type's
// body and powers ARE, so the fusion is built FROM type material instead of
// painted with it. The substance-override stamp remains the backstop.
export const TYPE_ESSENCES = {
  Aberration: 'a wrongness from outside reality — alien anatomy, minds and senses that work by other laws, powers that violate expectation (psychic force, impossible geometry)',
  Beast: 'a natural animal, however large or strange — animal intelligence, animal weapons (bite, claw, gore), no magic',
  Celestial: 'a being OF the higher planes — its body is light, law, sanctified matter, or divine purpose given form; its powers are judgments, wards, and radiant wrath. Even a stalker or ambusher among them is a huntsman of justice, not a skulking animal',
  Construct: 'a MADE thing — animated matter, worked material, or machinery; it does not tire, fear, or bleed, and its powers come from its construction',
  Dragon: 'a draconic creature — reptilian majesty, a breath or elemental gift, pride and territory in its bones, however small or young',
  Elemental: 'living elemental matter — its body IS fire, water, air, earth, or some fusion; its attacks and defenses are that element behaving like a creature',
  Fey: 'a creature of the dreaming otherworld — bargains, glamours, seasons, and rules-with-loopholes; its magic is trickery and enchantment, its logic is story-logic',
  Fiend: 'a being of the lower planes — cruelty, corruption, or hunger given form; its powers tempt, torment, burn, or bind',
  Giant: 'a massive humanoid-shaped person — a folk, however monstrous, with culture and tools scaled huge; it throws, smashes, and strides',
  Humanoid: 'a person of a mortal people — tools, training, language, and tactics rather than innate monstrousness',
  Monstrosity: 'an unnatural predator — a creature that should not exist but hunts as if it always has; frightening anatomy turned to killing use',
  Ooze: 'mindless hungry liquid — it engulfs, dissolves, splits, and seeps; no plan, only appetite and chemistry',
  Plant: 'ambulatory vegetation or fungus — roots, spores, vines, and bark; patient, territorial, feeding on what it catches',
  Undead: 'the dead refusing to rest — a corpse, spirit, or necromantic residue animated by will, curse, or hunger for the living',
};

const typeMandate = (type) => (type
  ? `Its creature type MUST be ${type}: ${TYPE_ESSENCES[type] ?? 'build the concept from what that type IS'}. Build the creature FROM this essence — the other traits are raw material the essence shapes, never a finished creature the type is painted onto. `
  : '');

export function buildRandomConceptSeed() {
  const traits = {
    intelligence: pick(SEED_DIMENSIONS.intelligence),
    physical: pick(SEED_DIMENSIONS.physical),
    silhouette: pick(SEED_DIMENSIONS.silhouette),
    origin: pick(SEED_DIMENSIONS.origin),
    disposition: pick(SEED_DIMENSIONS.disposition),
    naming: pick(SEED_DIMENSIONS.naming),
    creature_type: rollCreatureType(),
  };
  const concept =
    `a ${traits.intelligence}, ${traits.physical} ${traits.silhouette} from ${traits.origin} — ${traits.disposition}. ` +
    typeMandate(traits.creature_type) +
    'Its alignment and combat role must FOLLOW the disposition (guardians and wardens are not evil; tricksters are not brutes). ' +
    'Blend every trait into ONE coherent creature with a single unifying identity — contradictions between traits are creative fuel, not errors. ' +
    namingRules(traits);
  return { ...traits, concept };
}

// Anti-clustering name bans (owner call, 2026-07-27): the naming call
// converges hard on attractor stems — six "Chit-" swarms lifetime, "Feymire"
// twice for feywild-mud, shard/whisper/grim/cinder recurring across batches.
// Each naming call samples bans from the pool at 50% per stem: statistical,
// not absolute — the stems stay reachable, the attractor breaks. Keyed by
// creature type/archetype where the evidence is type-specific.
export const OVERUSED_NAME_STEMS = {
  // 'uul'/'ulg': the guttural Uu-/Ulg- attractor produced Uuloth, Uulghul,
  // Ulghoch, and Uulgrath across soaks — two in a single 2014 batch.
  global: ['shard', 'whisper', 'grim', 'gloom', 'storm', 'dread', 'cinder', 'uul', 'ulg'],
  swarm: ['chit', 'skitter', 'scuttl', 'hive'],
  Ooze: ['mire', 'muck', 'gulch'],
  Fey: ['mire', 'gloam'],
};

export function rollNameBans({ type = '', archetypeName = '' } = {}) {
  // GLOBAL stems ban unconditionally — they are owner-vetoed sounds
  // ('uul', 'ulg'), and the old coin-flip let "Ulgoth" ship on a tails.
  // Type/archetype stems still roll at 50% so those namespaces breathe.
  const rolled = [];
  if (archetypeName === 'swarm' || /swarm/i.test(type)) rolled.push(...OVERUSED_NAME_STEMS.swarm);
  for (const [key, stems] of Object.entries(OVERUSED_NAME_STEMS)) {
    if (key === 'global' || key === 'swarm') continue;
    if (type.toLowerCase().includes(key.toLowerCase())) rolled.push(...stems);
  }
  return [...new Set([
    ...OVERUSED_NAME_STEMS.global,
    ...rolled.filter(() => Math.random() < 0.5),
  ])];
}

// Weighted CR roll for blank-form generations (defect investigation task 6,
// 2026-07-25): the old uniform 1-30 roll put the median random monster at
// CR ~15, but actual-play demand concentrates at CR 1/4-10. Bands weight
// low CRs heavily with a thin tail to 30. Returns the CR *key* string the
// generator's crInput consumes ('1/4' ... '30').
const CR_BANDS = [
  { weight: 38, crs: ['1/4', '1/2', '1', '2', '3', '4'] },
  { weight: 30, crs: ['5', '6', '7', '8'] },
  { weight: 17, crs: ['9', '10', '11', '12'] },
  { weight: 10, crs: ['13', '14', '15', '16', '17', '18', '19', '20'] },
  { weight: 5, crs: ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'] },
];
const CR_WEIGHT_TOTAL = CR_BANDS.reduce((sum, b) => sum + b.weight, 0);

export function rollRandomCR() {
  let roll = Math.random() * CR_WEIGHT_TOTAL;
  for (const band of CR_BANDS) {
    if (roll < band.weight) return pick(band.crs);
    roll -= band.weight;
  }
  return pick(CR_BANDS[0].crs); // float-edge fallback
}
