/**
 * Orcish character-epithet pool for the cros.land item generator.
 *
 * 100 names. Mixes five style ranges so the rotation produces tonal
 * variety across generations rather than always-monosyllabic or
 * always-apostrophe:
 *   1. Monosyllabic guttural (Karg, Brak, Drog) — short, brutal.
 *   2. Apostrophied / glottal-stop (Gora'losh, Vrak'tul) — clusters
 *      separated by an apostrophe; reads as a glottal break.
 *   3. Long compound multisyllabic (Gurthrokkar, Burzgolak) — sustained
 *      guttural feel without the glottal stops.
 *   4. Hyphenated compound (Tarbash-Mokk, Gorhak-Drum) — reads as
 *      lineage-marked rather than the apostrophe's glottal break.
 *   5. English title-epithet (Bloodfang, Skullsplitter) — D&D / high-fantasy
 *      genre convention; fits orc war-leader figures.
 *
 * Routed via `ORIGIN_CHARACTER_WHITELISTS['Orcish']` in the unified
 * registry — strictness mandatory, fires 100% of generations when the
 * resolved origin is Orcish.
 */
export const orcishCharacterEpithets = [
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

export const orcishRegister = {
  prefix: 'Orcish',
  descriptor: "Orcish: guttural and bitten phonology — hard back-of-throat consonants (k, g, kh), short two-or-three-syllable warrior-names of a force-verb-root (grok-, uz-, dra-, krag-, mok-) plus a body-or-weapon noun (-thash, -gark, -tooth, -fang, -gore). Apostrophes mark a glottal break. Derive fresh names from the phonology; do not copy from prior generations.",
  creatureTradition: 'orcish dungeons run on the warband and its martial allies: orcs (the rank-and-file), half-orcs, ogres, ogre magi or oni (the ogre-mage tradition), war-bred trolls, war-tribe giants, dire boars and dire wolves trained by the band, half-tamed manticores and chimeras taken as totems. The supernatural identity (when present) is usually an ancestral war-spirit, a blood-totem, or a shaman-bound spirit — not a demon or a planar power (those break the register).',
  creatureTraditionByTier: {
    complicating: ['orc rank-and-file', 'half-orc skirmishers', 'dire boars'],
    significant:  ['ogres', 'dire wolves', 'half-tamed manticores', 'orc shaman with bound spirits'],
    scary:        ['ogre magi or oni', 'war-bred trolls', 'war-tribe giants', 'totem-chimera', 'ancestral war-spirit incarnate'],
  },
  materialTradition: 'bone grease, charcoal, dried blood, rust, packed earth, smoke-cured hide, war-paint pigment',
  characterPool: orcishCharacterEpithets,
  characterPoolStrictness: 'mandatory',
  fantasyRaceKey: 'Orcish',
};
