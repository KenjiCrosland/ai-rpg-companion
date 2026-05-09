/**
 * Palette character-name whitelists.
 *
 * Single shared file. Each entry is keyed by palette prefix (matched
 * with .startsWith() at lookup time) and maps to a flat array of
 * curated character-name epithets. Two prompt-block builders consume
 * this map:
 *
 *   - The catchall prompt-block builder (`buildCatchallPromptBlock`)
 *     looks up the whitelist for catchall palettes and replaces its
 *     freehand-construction instruction with a "pick from this list"
 *     instruction. Maori uses this path.
 *
 *   - The fictional-palette prompt-block builder
 *     (`buildFictionalPaletteWhitelistBlock`) looks up the whitelist
 *     for fictional-fantasy palettes (Sindarin, Draconic, Aberrant,
 *     Abyssal, Infernal, Primordial). The block is leaner than the
 *     catchall because fictional registers don't carry real-figure
 *     prohibition / English-descriptive place-name / cultural-
 *     materials-fusion concerns. Only the named character is
 *     restricted to the list; item names, place names, and lore
 *     elements stay freehand in the palette's register.
 *
 * Architecture rationale:
 *
 *   - For real-world cultural palettes (Maori): whitelist + catchall
 *     = pool-level real-figure protection at much lower curation cost
 *     than full pool architecture. Maori was added after the Kawea's
 *     Gift output showed Tangaroa (real atua) used as a fictional
 *     smith. The catchall alone was insufficient — DeepSeek's training
 *     data on Polynesian pantheons is dense enough that freehand
 *     construction pulled real atua names.
 *
 *   - For fictional-fantasy palettes (Draconic, Aberrant, Abyssal,
 *     Sindarin, Infernal, Primordial): the whitelist serves a
 *     different purpose — sub-convention diversity. Each pool spans
 *     multiple sub-conventions so that picking "one name from this
 *     list" produces variety across many generations, not the same
 *     kind of dragon / demon / elf / archdevil over and over. No
 *     real-figure protection is needed (no living traditions to
 *     protect); the protection is against monotony AND against
 *     trademarked-IP collision (see curation rules below).
 *
 * Pool palettes (Yoruba, Andean) do NOT use this whitelist file.
 * Their dedicated prompt builders provide full pool architecture
 * (character + place + spirit pools, cultural notes, item-name
 * construction guidance). They could be retroactively simplified to
 * whitelist + catchall if production data supports it, but that's a
 * later decision.
 *
 * Curation guidance for adding a new real-world cultural whitelist:
 *   - Target 25-35 entries per palette
 *   - Each entry is a praise-name epithet / descriptive byname,
 *     NOT a given name and NOT a theophoric construction
 *   - Verify at curation time that no entry matches:
 *     * any deity / atua / sacred-figure name
 *     * any sacred concept or ceremonial term
 *     * any common modern given-name pattern in that culture
 *     * any named historical figure of cultural-resistance significance
 *   - Native-speaker review encouraged but not blocking
 *   - Production user feedback is the primary post-ship verification
 *
 * Curation guidance for adding a new fictional-fantasy pool:
 *   - Target ~80 entries spanning 6-8 sub-conventions
 *   - Sub-convention diversity is the variety-generating mechanism;
 *     the more distinct sub-conventions, the more flavor variety
 *     across generations
 *   - Reject Tolkien-published character or item names AND close
 *     derivatives (Mithrandir → out, Galadhriel → out, Glamdring-
 *     anything → out, etc.) for Sindarin pools
 *   - Reject D&D-canon character names AND close derivatives:
 *     archdevils (Asmodeus, Mephistopheles, Dispater, Mammon,
 *     Hutijin, Levistus, Geryon, Bael, Glasya, Fierna, Zariel),
 *     demon lords (Lolth, Yeenoghu, Demogorgon, Orcus, Baphomet,
 *     Juiblex, Pazuzu, Graz'zt), Princes of Elemental Evil/Good
 *     (Imix, Olhydra, Ogremoch, Yan-C-Bin, Cryonax, Chan, Sunnis,
 *     Akadi, Bwimb), etc.
 *   - Public-domain mythos derivatives (Cthulhu/Lovecraftian,
 *     biblical-demonological figures like Belial / Belphegor /
 *     Lilith / Astaroth / Adramelech / Sammael that predate D&D)
 *     are permitted because they're tradition figures first
 *   - Generic Latin / Greek / archaic-English / constructed-fictional
 *     phonemes are always permitted
 *
 * See `src/data/cultural-pools/ARCHITECTURE.md` for the full
 * architectural rationale (epithets-not-given-names, sacred-boundary
 * commitment, residual-risk acknowledgment).
 */
import { draconicCharacterEpithets } from './draconic.mjs';
import { aberrantCharacterEpithets } from './aberrant.mjs';
import { abyssalCharacterEpithets } from './abyssal.mjs';
import { sindarinCharacterEpithets } from './sindarin.mjs';
import { infernalCharacterEpithets } from './infernal.mjs';
import { primordialCharacterEpithets } from './primordial.mjs';

export const paletteCharacterEpithetWhitelists = {
  /**
   * Maori praise-name epithets. Avoids all atua names (Tangaroa, Tāne,
   * Tūmatauenga, Tāwhirimātea, Whiro, Rongo, Haumia, Aituā, Ranginui,
   * Papatūānuku, Hine-* prefix, Mahuika, Māui, Kupe, Paikea, Tāwhaki,
   * Rūaumoko), sacred concepts (mana, tapu, mauri, hau, wairua, atua,
   * taonga, kaitiaki, marae, tohunga), common modern Maori given names
   * (Kauri, Kiri, Manaaki, Mahina, Hoki, Koa), and te + simple-noun
   * surname patterns (Te Aho, Te Awa).
   *
   * Four entries from the v1 brief were flagged for native-speaker
   * verification (Waewae-Tere, Kororā-Iti, Kapua-Ringa, Te Whetu-
   * Hōhonu); they're omitted from this v1 whitelist and can be added
   * after review.
   */
  'Maori-inspired': [
    // Body part + element/quality compounds
    'Manawa-Kaha',          // strong-hearted
    'Manawa-Roa',           // long-hearted (patient)
    'Manawa-Whero',         // red-hearted (passionate)
    'Manawa-Whetu',         // star-hearted
    'Karu-Maunga',          // mountain-eyed
    'Karu-Ata',             // dawn-eyed
    'Karu-Ahi',             // fire-eyed
    'Karu-Whetu',           // star-eyed
    'Ringa-Ahi',            // fire-handed
    'Ringa-Whero',          // red-handed
    'Ringa-Toa',            // warrior-handed
    'Ringa-Pakari',         // strong-handed
    'Niho-Mako',            // shark-toothed
    'Niho-Kaha',            // strong-toothed
    'Reo-Roa',              // long-voiced (orator)

    // Animal-attribute compounds
    'Kāhu-Karu',            // hawk-eyed
    'Kāhu-Mōhio',           // hawk-knower (vigilant)
    'Mako-Toa',             // shark-warrior
    'Tūī-Reo',              // tūī-voiced

    // Element + quality compounds
    'Ata-Whetu',            // dawn-star
    'Ata-Mōhio',            // dawn-knower
    'Whetu-Iti',            // small star
    'Whetu-Roa',            // long star (constellation)
    'Wai-Tika',             // straight-water (true one)
    'Kohu-Roa',             // long-mist (lasting mystery)
    'Kapua-Toa',            // cloud-warrior
    'Ngahere-Pae',          // forest-perched (forest-dweller)

    // Quality-prefixed compounds
    'Toa-Mōhio',            // knowing warrior
    'Toa-Iti',              // small warrior
    'Toa-Pae',              // perch-warrior (steadfast warrior)
    'Pakari-Manawa',        // mature-hearted

    // Agentive kai- forms (the doer of X)
    'Kaimaumahara',         // the rememberer
    'Kaiwhakairo',          // the carver
    'Kaiwhakatipu',         // the grower
    'Kaikōrero',            // the speaker
    'Kairaranga',           // the weaver

    // Te-prefixed (sparingly, with non-collision-prone descriptors)
    'Te Pae-Kaha',          // the strong perch
  ],

  // Fictional-fantasy palettes. Each pool spans 8 sub-conventions
  // intentionally — picking "one name from this list" produces
  // variety across many generations rather than the same flavor of
  // entity over and over. No real-world living-tradition concerns;
  // the protection is against monotony, not appropriation. See each
  // per-palette source file for sub-convention details.
  'Draconic': draconicCharacterEpithets,
  'Aberrant': aberrantCharacterEpithets,
  'Abyssal': abyssalCharacterEpithets,
  'Sindarin-inspired': sindarinCharacterEpithets,
  'Infernal': infernalCharacterEpithets,
  'Primordial': primordialCharacterEpithets,
};

/**
 * Look up the whitelist for a given selected palette. Returns the
 * array of epithet strings if a whitelist exists for this palette, or
 * null if the palette has no whitelist (catchall falls back to
 * freehand-construction instruction).
 *
 * Matched with prefix-startsWith for consistency with the rest of the
 * palette-routing system.
 */
export function getWhitelistForPalette(selectedPalette) {
  if (typeof selectedPalette !== 'string') return null;
  for (const [prefix, list] of Object.entries(paletteCharacterEpithetWhitelists)) {
    if (selectedPalette.startsWith(prefix)) return list;
  }
  return null;
}
