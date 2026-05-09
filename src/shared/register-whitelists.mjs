/**
 * Catchall-only register character-name whitelists.
 *
 * Reduced after Phase-1 unification: the unified character-whitelist
 * registry at `character-whitelist-registry.mjs` is now the source of
 * truth for race-origin pools (Orcish/Goblinoid/Elven/Dwarven) and
 * fictional-register pools (Sindarin/Draconic/Aberrant/Abyssal/
 * Infernal/Primordial). This file retains only the entries that
 * `catchall-prompt.mjs` consumes through `getWhitelistForRegister` —
 * currently just Maori. The catchall path is flag-off today
 * (enableProtectedRegisters: false makes Maori unreachable) but the
 * data and helper survive for re-enable.
 *
 * When the protected-registers flag flips back on, decide between:
 *   (a) keep this file and the catchall's inline whitelist injection
 *       (current path), OR
 *   (b) migrate Maori into the unified registry (mandatory strictness)
 *       and delete this file.
 *
 * See `src/shared/registers/ARCHITECTURE.md` for the full
 * architectural rationale (epithets-not-given-names, sacred-boundary
 * commitment, residual-risk acknowledgment).
 */

export const registerCharacterEpithetWhitelists = {
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
};

/**
 * Look up the whitelist for a given selected register. Returns the
 * array of epithet strings if a whitelist exists for this register, or
 * null if the register has no whitelist (catchall falls back to
 * freehand-construction instruction).
 *
 * Matched with prefix-startsWith for consistency with the rest of the
 * register-routing system.
 */
export function getWhitelistForRegister(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  for (const [prefix, list] of Object.entries(registerCharacterEpithetWhitelists)) {
    if (selectedRegister.startsWith(prefix)) return list;
  }
  return null;
}
