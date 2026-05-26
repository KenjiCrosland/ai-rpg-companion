/**
 * Abyssal character-epithet pool for the cros.land item generator.
 *
 * Sub-convention diversity is the protective architecture against
 * monotonous outputs. Pool spans (originally) eight sub-conventions:
 * demon-lord, apostrophe-broken demon princes, female demon-lord,
 * biblical/Aramaic-rooted, brutal grunt-names, sin-coded epithets,
 * marrow-drinker / lesser demon, and twisted-tongue long-form.
 *
 * Phonetic register: demonic / chaotic evil. Harsh, brutal, guttural.
 *
 * Curation pass — D&D-canon demon-lord removal:
 *   - Apostrophe-broken: Graz'morr (Graz'zt) removed.
 *   - Female demon-lord: Lolthrim (Lolth) removed.
 *   - Twisted-tongue long-form: Yeenoggrenoth (Yeenoghu),
 *     Demogorthrazz (Demogorgon), Orcuvargheth (Orcus), Baphomarroch
 *     (Baphomet), Juiblexovol (Juiblex), Pazurniggrath (Pazuzu),
 *     Graz'zthuvor (Graz'zt) removed. The three remaining entries
 *     (Vurmaggorroth, Saggrolithex, Drovgaragheth) are derived from
 *     pool-internal originals (Vurmagor, Saggrolith, Drovgar) and
 *     stay.
 *
 * Biblical-demonological figures (Belial, Belphegor, Mammon, Astaroth,
 * Lilith, Behemoth, Moloch, Beelzebub) appear as derivatives in
 * surviving entries — these are biblical-tradition figures first,
 * fantasy-genre conventional, and not D&D-original.
 *
 * Public-domain Lovecraftian-mythos derivatives are NOT used in this
 * pool (those live in the Aberrant pool). Item-name construction
 * stays freehand.
 *
 * Current entry count: 71.
 */
export const abyssalCharacterEpithets = [
  // Demon Lord Names (brutal, imperious)
  'Yzarroth',
  'Vurmagor',
  'Drovgar',
  'Ghaltherex',
  'Krylzoroth',
  'Mungrothex',
  'Pazurnal',
  'Vhalkaroth',
  'Saggrolith',
  'Thurmagar',

  // Apostrophe-Broken Demon Princes
  // 'Graz\'morr' (Graz'zt) removed.
  "Khra'zekul",
  "Vol'thrash",
  "Maz'gholun",
  "Drez'vakor",
  "Ph'rotor",
  "Bol'gorrash",
  "Sk'venul",
  "Thor'gosh",
  "Vur'zaelmoth",

  // Female Demon-Lord Names
  // 'Lolthrim' (Lolth) removed.
  'Shyazoreth',
  'Maelgorra',
  'Nyxalith',
  'Drexalla',
  'Vorralla',
  'Belzira',
  'Khazmara',
  'Threlyssa',
  'Ozvellith',

  // Biblical/Aramaic-Rooted Demonic
  'Belzaroth',
  'Baalmox',
  'Beshemoth',
  'Moloth',
  'Azzazor',
  'Lilithran',
  'Pazurim',
  'Belphegath',
  'Mazzoroth',
  'Astarot',

  // Brutal Grunt-Names (short, glottal)
  'Vurm',
  'Skreth',
  'Glok',
  'Throx',
  'Krudge',
  'Gorr',
  'Mok',
  'Vrek',
  'Skull',
  'Brak',

  // Sin-Coded Epithets (descriptive demon-lords)
  'Vurmagor the Bone-Counter',
  'Drovgar Eight-Mouthed',
  'Maelgorra of the Iron Sty',
  'Ghaltherex Whose-Eyes-Bleed',
  "Khra'zekul the Promise-Breaker",
  'Saggrolith of the Thousand-Maw',
  'Drexalla Throne-of-Skulls',
  'Pazurnal Tongue-of-Ash',
  'Threlyssa the Loom-Drinker',
  "Bol'gorrash Plague-Crowned",

  // Marrow-Drinker / Lesser-Demon Names
  'Khrelzar',
  'Yetlogor',
  'Mungrolax',
  'Drelmorr',
  'Vothzaroth',
  'Skreggrul',
  'Thuumog',
  'Ghozzakar',
  'Vrelthog',
  'Burglosh',

  // Twisted-Tongue Long-Form Names
  // 'Yeenoggrenoth' (Yeenoghu), 'Demogorthrazz' (Demogorgon),
  // 'Orcuvargheth' (Orcus), 'Baphomarroch' (Baphomet), 'Juiblexovol'
  // (Juiblex), 'Pazurniggrath' (Pazuzu), 'Graz\'zthuvor' (Graz'zt)
  // removed.
  'Vurmaggorroth',
  'Saggrolithex',
  'Drovgaragheth',
];

export const abyssalRegister = {
  prefix: 'Abyssal',
  descriptor: "Abyssal: guttural, throat-rough phonology; jagged consonant clusters (ghr, zhr, vth), harsh fricatives, syllables that resolve into accusation or threat. Apostrophes mark glottal breaks. Compound names commonly pair a violence-verb or decay-noun (rot-, vile-, gore-, maw-) with a body-part or anatomical noun (-zuul, -sung, -tooth, -spine). Derive fresh names from the phonology; do not copy from prior generations.",
  characterPool: abyssalCharacterEpithets,
  characterPoolStrictness: 'preferred',
  thematic: true,
};
