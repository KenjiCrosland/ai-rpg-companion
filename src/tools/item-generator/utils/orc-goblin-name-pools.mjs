/**
 * Curated name pools for Orcish and Goblin-inspired palettes.
 *
 * Background: orcs and goblins have single-palette conventional pools
 * in fantasyRaceConventionalPalettes (intentional — see that file's
 * docstring on the racism-coding caveat). The multi-palette rotation
 * that gives Elven/Dwarven/Gnomish/Giant generations cross-palette
 * variety doesn't apply here, so static example names in the palette
 * description (Grokthash, Uzgark, Dra'mok / Skragbit, Mukgash, Krik-tak)
 * appear in every conventional generation. DeepSeek pulls names from
 * the (e.g., …) tail directly, which produces visible reuse pressure.
 *
 * The fix mirrors the earlier (later removed) curated-pool approach,
 * but scoped to just these two registers — exactly the cases where
 * cross-palette rotation can't help. Each pool has 100 names; the
 * builder samples three per generation and interpolates them into
 * the palette description's example tail.
 *
 * Style ranges represented in the orc pool:
 *   1. Monosyllabic guttural (Karg, Brak, Drog) — short, brutal.
 *   2. Apostrophied / glottal-stop (Gora'losh, Vrak'tul) — clusters
 *      separated by an apostrophe; reads as a glottal break.
 *   3. Long compound multisyllabic (Gurthrokkar, Burzgolak) — sustained
 *      guttural feel without the glottal stops.
 *   4. Hyphenated compound (Tarbash-Mokk, Gorhak-Drum) — reads as
 *      lineage-marked rather than the apostrophe's glottal break.
 *   5. English title-epithet (Bloodfang, Skullsplitter) — D&D / Tolkien
 *      genre convention; fits orc war-leader figures.
 *
 * Style ranges represented in the goblinoid pool:
 *   1. Sharp percussive monosyllabic (Skrik, Pix, Glop).
 *   2. Doubled / repeating-syllable hyphenated (Krik-tak, Snik-snak).
 *   3. Compound trade-marker (Snikbit, Murkrak, Skragdun).
 *   4. Diminutive-ending (-bit, -kit, -git, -snit): Skragbit, Wibblekit.
 *   5. Whimsical mocking compound (Wibblesnik, Snickerblot, Glompik).
 *
 * The pools mix all five styles so the rotation produces tonal variety
 * across generations rather than always-monosyllabic or always-apostrophe.
 */

export const orcGivenNames = [
  // Monosyllabic guttural (~25)
  'Karg', 'Brak', 'Drog', 'Mokk', 'Grub', 'Skar', 'Vrok', 'Thrak', 'Mug',
  'Gor', 'Krug', 'Skull', 'Burz', 'Throg', 'Vrak', 'Drazk', 'Grut', 'Murk',
  'Kraz', 'Bolg', 'Gnar', 'Stug', 'Hrak', 'Murl', 'Ghor',
  // Apostrophied / glottal-stop (~25)
  'Gora\'losh', 'Vrak\'tul', 'Skar\'bok', 'Mok\'rok', 'Dra\'mok',
  'Hor\'mokk', 'Krug\'thar', 'Bolg\'rul', 'Skuz\'bar', 'Vor\'gash',
  'Throk\'mar', 'Burz\'thuk', 'Grok\'tash', 'Mug\'rakk', 'Kar\'zul',
  'Drazk\'al', 'Vril\'mokk', 'Skel\'tar', 'Tar\'bok', 'Ghor\'thak',
  'Pruz\'kar', 'Mok\'thar', 'Brel\'gar', 'Vrul\'okk', 'Krak\'shul',
  // Long compound multisyllabic (~25)
  'Burzgolak', 'Gurthrokkar', 'Mokthrazek', 'Skarbozhul', 'Vrakalmurk',
  'Grumkazor', 'Kurokvash', 'Throgmurz', 'Drazgrumak', 'Vorbashul',
  'Mokharvar', 'Skuzdragor', 'Gnarvolak', 'Burzkratag', 'Throkmazul',
  'Gurthbalok', 'Vrokzulak', 'Mokrunalak', 'Skarvogrim', 'Drazghorrak',
  'Mugrothbar', 'Vorzulgrim', 'Throbrazek', 'Skuzmokrul', 'Vrakhumar',
  // Hyphenated compound (~15)
  'Tarbash-Mokk', 'Gorhak-Drum', 'Drazk-Bashul', 'Skull-Tul', 'Burz-Vorak',
  'Mokk-Drazel', 'Skar-Bolg', 'Vrok-Rasul', 'Gorr-Mokk', 'Hrak-Vrul',
  'Throg-Murl', 'Grub-Tarrok', 'Mokk-Khazok', 'Bolg-Vrul', 'Vrak-Mokk',
  // English title-epithet (~10)
  'Bloodfang', 'Skullsplitter', 'Ironback', 'Boneripper', 'Throatcrusher',
  'Tuskbreaker', 'Goretooth', 'Stonejaw', 'Warbreaker', 'Ashclaw',
];

export const goblinoidGivenNames = [
  // Sharp percussive monosyllabic (~20)
  'Skrik', 'Snik', 'Krik', 'Pix', 'Glop', 'Mob', 'Rik', 'Tok', 'Vrelp',
  'Klak', 'Krit', 'Plib', 'Brek', 'Knik', 'Tup', 'Wug', 'Snak', 'Glib',
  'Murp', 'Pook',
  // Doubled / repeating-syllable hyphenated (~20)
  'Krik-tak', 'Snik-snak', 'Pliz-tok', 'Skrik-skrak', 'Tok-tik',
  'Glob-glop', 'Brik-brak', 'Skrip-skrap', 'Pip-tip', 'Skab-skib',
  'Blip-blop', 'Mok-mik', 'Glik-glak', 'Mur-mok', 'Vrek-vrak',
  'Snib-snub', 'Wib-wob', 'Trib-trab', 'Pix-pak', 'Klop-klap',
  // Compound trade-marker (~20)
  'Snikbit', 'Murkrak', 'Skragdun', 'Bogtok', 'Pribsnit', 'Skuzpik',
  'Glibvar', 'Murkrik', 'Pixrik', 'Snagtoof', 'Skuzbrek', 'Wibblepock',
  'Mukgash', 'Vrekkit', 'Snagvar', 'Tobsnik', 'Drekbit', 'Krelpik',
  'Murkglak', 'Snikvor',
  // Diminutive-ending (-bit, -kit, -git, -snit) (~20)
  'Skragbit', 'Wibblekit', 'Mubzit', 'Plubgit', 'Glibkit', 'Bogkit',
  'Pribbit', 'Snagkit', 'Skuzkit', 'Snikgit', 'Murkit', 'Drubbit',
  'Knikkit', 'Tobkit', 'Snibsnit', 'Lubgit', 'Pikbit', 'Skritkit',
  'Sniksnit', 'Vrazbit',
  // Whimsical mocking compound (~20)
  'Wibblesnik', 'Boggrim', 'Glompik', 'Wugzit', 'Brillok', 'Boggle-tok',
  'Snickerwib', 'Glomwig', 'Plibsnak', 'Wugbottle', 'Snickerblot',
  'Plibwiblet', 'Tribbsnig', 'Wibwobsnig', 'Glibblesnak', 'Mubblekrik',
  'Wuggleknit', 'Snicklepok', 'Wobblegrip', 'Skribblepok',
];

/**
 * Map of palette prefix → name pool. The prefix-match logic in
 * `rotatePaletteExamples` looks up by `palette.startsWith(prefix)`.
 */
const POOLS_BY_PREFIX = {
  'Orcish': orcGivenNames,
  'Goblin-inspired': goblinoidGivenNames,
};

/**
 * Picks `count` items uniformly at random from `arr`, without
 * replacement. Uses Math.random via a simple shuffle-and-slice — pool
 * sizes are small (100) and this runs once per generation, so the
 * cost is negligible. Tests stub Math.random for determinism.
 */
function pickRandomFromArray(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * If `selectedPalette` is the Orcish or Goblin-inspired palette,
 * rebuild its trailing "(e.g., …)" example tail with names sampled
 * from the matching pool. Other palettes pass through unchanged.
 *
 * Scoped narrowly to orc/goblin because those are the only fantasy
 * races whose conventional pool is single-palette — multi-palette
 * races (Elven, Dwarven, Gnomish, Giant) get rotation by varying the
 * palette across generations, which provides enough variety on its
 * own.
 *
 * @param {string} selectedPalette
 * @param {number} [exampleCount=3]
 * @returns {string}
 */
export function rotatePaletteExamples(selectedPalette, exampleCount = 3) {
  if (!selectedPalette || typeof selectedPalette !== 'string') {
    return selectedPalette;
  }

  const poolEntry = Object.entries(POOLS_BY_PREFIX).find(([prefix]) =>
    selectedPalette.startsWith(prefix),
  );
  if (!poolEntry) {
    return selectedPalette;
  }
  const [, pool] = poolEntry;

  const sampled = pickRandomFromArray(pool, exampleCount);
  if (sampled.length === 0) {
    return selectedPalette;
  }

  // Strip the trailing "(e.g., …)" group and rebuild it. The regex is
  // anchored at end-of-string so any earlier parenthetical groups
  // ("Sindarin-inspired (elvish)") aren't disturbed.
  const baseDescription = selectedPalette.replace(/\s*\(e\.g\.,[^)]*\)\s*$/, '');
  return `${baseDescription} (e.g., ${sampled.join(', ')})`;
}
