/**
 * Infernal character-epithet pool for the cros.land item generator.
 *
 * Sub-convention diversity is the protective architecture against
 * monotonous outputs. Pool spans (originally) eight sub-conventions:
 * Greco-Roman archdevils, Aramaic/biblical-rooted, female devil
 * names, short imperial / court devils, multisyllabic noble house
 * devils, Latin-construct names (-ax, -ix, -or, -us), devil-house
 * compound names, and compact pact-devils.
 *
 * Phonetic register: devilish / Nine Hells. Latin / Greek / Aramaic /
 * pseudo-biblical phonology. Formal, classical, ordered (in contrast
 * to Abyssal chaos).
 *
 * Curation pass — D&D-canon archdevil removal:
 *   - Sub-convention 1 (Greco-Roman archdevils) emptied entirely:
 *     Asmoreus (Asmodeus), Mephistarion (Mephistopheles), Dispateron
 *     (Dispater), Mammoneus (Mammon), Hutijonis (Hutijin), Levistanus
 *     (Levistus), Geryonus (Geryon), Beliasmus (Belial), Belphegoreus
 *     (Belphegor), Bael-Tarsius (Bael) all referenced D&D-canon Lords
 *     of the Nine.
 *   - Female devils: Glasyetta (Glasya), Fiernazel (Fierna), Zarialith
 *     (Zariel) removed.
 *   - Short imperial: Bael removed.
 *   - Multisyllabic noble: Hutijinarius, Mephistoreon, Levitharion,
 *     Asmodelius, Glasyathorion removed (all D&D archdevil
 *     derivatives).
 *   - Devil-house compound: "Glasyetta of the Sealed Compact" and
 *     "Hutijinarius of the Ninth Quill" removed.
 *   - Compact pact-devils: "Bael the First-Pact" removed.
 *
 * Biblical-demonological figures (Belial, Belphegor, Mammon, Astaroth,
 * Lilith, Adramelech, Sammael, Naberus, Beelzebub-style) appear as
 * derivatives in surviving entries — these are biblical-tradition
 * figures first, fantasy-genre conventional, and not D&D-original.
 * Item-name construction stays freehand.
 *
 * Current entry count: 58. Sub-convention 1 (Greco-Roman archdevils)
 * is entirely empty. Replacement entries should construct Latin/Greek-
 * styled Infernal names without reference to D&D Lords of the Nine.
 */
export const infernalCharacterEpithets = [
  // Greco-Roman Style Archdevils — sub-convention emptied during the
  // D&D-canon archdevil removal. Every entry referenced a Lord of the
  // Nine (Asmodeus, Mephistopheles, Dispater, Mammon, Hutijin,
  // Levistus, Geryon, Belial, Belphegor, Bael). Replacement entries
  // should construct Latin/Greek-styled Infernal names without
  // referencing D&D archdevils.

  // Aramaic / Biblical Rooted
  'Belzeroth',
  'Baalmoroth',
  'Belial-Karm',
  'Sammaeloth',
  'Astaroth-Ven',
  'Lilithriel',
  'Mammon-Var',
  'Beleshtar',
  'Naberath',
  'Adraem-Bel',

  // Female Devil Names
  // 'Glasyetta' (Glasya), 'Fiernazel' (Fierna), 'Zarialith' (Zariel)
  // removed.
  'Belmera',
  'Nyrazelle',
  'Lamashelle',
  'Vexorelle',
  'Helerith',
  'Astarea',
  'Lilithron',

  // Short Imperial / Court Devils
  // 'Bael' removed.
  'Bel',
  'Mox',
  'Tar',
  'Vex',
  'Aux',
  'Cor',
  'Nox',
  'Gar',
  'Sul',

  // Multisyllabic Noble House Devils
  // 'Hutijinarius' (Hutijin), 'Mephistoreon' (Mephistopheles),
  // 'Levitharion' (Levistus), 'Asmodelius' (Asmodeus),
  // 'Glasyathorion' (Glasya) removed.
  'Belzemorron',
  'Baalmorrethon',
  'Samaelorius',
  'Adramelchorr',
  'Belasmorrenus',

  // Latin-Construct Names (-ax, -ix, -or, -us)
  'Vorrax',
  'Tenebrix',
  'Mortifer',
  'Ignavius',
  'Cruorax',
  'Pestilus',
  'Vexillor',
  'Doloreus',
  'Tartrix',
  'Funestor',

  // Devil-House Compound Names
  // 'Glasyetta of the Sealed Compact' (Glasya), 'Hutijinarius of the
  // Ninth Quill' (Hutijin) removed.
  'Vorrax of the Brass Throne',
  'Tenebrix of the Iron Sigil',
  'Belzeroth of the Burning Ledger',
  'Cruorax of the Folded Bargain',
  'Helerith of the Drowned Hearth',
  'Adraem-Bel of the Iron Spire',
  'Lilithriel of the Crimson Veil',
  'Mammon-Var of the Counting House',

  // Compact Pact-Devils (contract-bound)
  // 'Bael the First-Pact' removed.
  'Mortix the Oath-Bound',
  'Vexor the Quill-Holder',
  'Cor the Counter-of-Days',
  'Sul the Scribe of Wrath',
  'Aux the Knot-Tier',
  'Gar the Sealing-Hand',
  'Nox the Last-Judge',
  'Tar the Rest-Denier',
  'Bel the Word-Made-Iron',
];

export const infernalRegister = {
  prefix: 'Infernal',
  descriptor: "Infernal: sharp, aggressive (e.g., Vex'tharion, Morkaal, Sazrith)",
  characterPool: infernalCharacterEpithets,
  characterPoolStrictness: 'preferred',
  thematic: true,
};
