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
