/**
 * Māori-inspired register — consolidated single-file definition.
 *
 * Pilot for the per-register hybrid architecture: every piece of data
 * the system holds about this register lives here in a single object
 * export, instead of being scattered across `register-list.mjs`,
 * `catchall-prompt.mjs`, `register-whitelists.mjs`,
 * `character-whitelist-registry.mjs`, and `detect-register-from-input.mjs`.
 *
 * Pools stay structured (arrays) so the existing
 * `rotateRegisterExamples` and prompt-injection paths keep working
 * unchanged — what changes is WHERE the data lives, not HOW it's
 * shaped or consumed.
 *
 *   prefix                    — startsWith key used by the rest of the
 *                               register machinery
 *   descriptor                — the line that flows into `registerList`
 *   protected: true           — gated by `enableProtectedRegisters`
 *   promptArchitecture        — 'catchall' here; 'pool' for Yoruba/Andean
 *   characterPool             — curated praise-name epithet whitelist
 *   characterPoolStrictness   — 'mandatory'; whitelist fires 100% of
 *                               generations when the register is active
 *   itemNameAvoidList         — sacred-term avoid-list with rationale in
 *                               the catchall prompt's narrative paragraph
 *   culturalNotes             — LLM-facing register prose. Plumbed
 *                               into the catchall prompt block via
 *                               `buildCatchallPromptBlock` — sets the
 *                               cultural frame (sacred-boundary
 *                               commitment, favored narrative forms,
 *                               Western-fantasy defaults to avoid) the
 *                               LLM works within.
 *
 * Cultural-language detection terms (mere, patu, taiaha, mana, …) used
 * to live in `detect-register-from-input.mjs`. They were removed during
 * the pilot: the LANGUAGE REGISTER OVERRIDE block in the main prompt
 * already lets the LLM detect cultural signals from its training; the
 * hand-curated keyword map was a redundant safety net.
 */

export const maoriRegister = {
  prefix: 'Maori-inspired',
  descriptor: 'Maori-inspired: vowel-rich Te Reo phonetics, nature-grounded',
  protected: true,
  promptArchitecture: 'catchall',

  /**
   * Praise-name epithets (kupu whakanui). Avoids all atua names
   * (Tangaroa, Tāne, Tūmatauenga, Tāwhirimātea, Whiro, Rongo, Haumia,
   * Aituā, Ranginui, Papatūānuku, Hine-* prefix, Mahuika, Māui, Kupe,
   * Paikea, Tāwhaki, Rūaumoko), sacred concepts (mana, tapu, mauri,
   * hau, wairua, atua, taonga, kaitiaki, marae, tohunga), common
   * modern Maori given names (Kauri, Kiri, Manaaki, Mahina, Hoki,
   * Koa), and te + simple-noun surname patterns (Te Aho, Te Awa).
   *
   * Four entries from the v1 brief were flagged for native-speaker
   * verification (Waewae-Tere, Kororā-Iti, Kapua-Ringa, Te Whetu-
   * Hōhonu); they're omitted from this v1 whitelist and can be added
   * after review.
   */
  characterPool: [
    // Body part + element/quality compounds
    'Manawa-Kaha', // strong-hearted
    'Manawa-Roa', // long-hearted (patient)
    'Manawa-Whero', // red-hearted (passionate)
    'Manawa-Whetu', // star-hearted
    'Karu-Maunga', // mountain-eyed
    'Karu-Ata', // dawn-eyed
    'Karu-Ahi', // fire-eyed
    'Karu-Whetu', // star-eyed
    'Ringa-Ahi', // fire-handed
    'Ringa-Whero', // red-handed
    'Ringa-Toa', // warrior-handed
    'Ringa-Pakari', // strong-handed
    'Niho-Mako', // shark-toothed
    'Niho-Kaha', // strong-toothed
    'Reo-Roa', // long-voiced (orator)

    // Animal-attribute compounds
    'Kāhu-Karu', // hawk-eyed
    'Kāhu-Mōhio', // hawk-knower (vigilant)
    'Mako-Toa', // shark-warrior
    'Tūī-Reo', // tūī-voiced

    // Element + quality compounds
    'Ata-Whetu', // dawn-star
    'Ata-Mōhio', // dawn-knower
    'Whetu-Iti', // small star
    'Whetu-Roa', // long star (constellation)
    'Wai-Tika', // straight-water (true one)
    'Kohu-Roa', // long-mist (lasting mystery)
    'Kapua-Toa', // cloud-warrior
    'Ngahere-Pae', // forest-perched (forest-dweller)

    // Quality-prefixed compounds
    'Toa-Mōhio', // knowing warrior
    'Toa-Iti', // small warrior
    'Toa-Pae', // perch-warrior (steadfast warrior)
    'Pakari-Manawa', // mature-hearted

    // Agentive kai- forms (the doer of X)
    'Kaimaumahara', // the rememberer
    'Kaiwhakairo', // the carver
    'Kaiwhakatipu', // the grower
    'Kaikōrero', // the speaker
    'Kairaranga', // the weaver

    // Te-prefixed (sparingly, with non-collision-prone descriptors)
    'Te Pae-Kaha', // the strong perch
  ],

  characterPoolStrictness: 'mandatory',

  /**
   * Living-religion register. Real atua names MUST NOT appear in any
   * context (patron, epithet, mythological reference). Religious life
   * is rendered through fully-constructed fictional deities or generic
   * divine references — see the shared deity-mode block for the rule.
   */
  deityMode: 'restricted',

  /**
   * Real Māori atua and named ancestral-religious figures the LLM must
   * NEVER use as fictional patrons, epithets, or mythological
   * references. The list duplicates the curation-time exclusion
   * documented in the characterPool docstring above; formalizing it
   * here surfaces the names in the prompt as do-not-use terms rather
   * than just relying on the curated pool to be free of them.
   */
  deityAvoidList: [
    'Tangaroa', 'Tāne', 'Tūmatauenga', 'Tāwhirimātea', 'Whiro', 'Rongo',
    'Haumia', 'Aituā', 'Ranginui', 'Papatūānuku', 'Mahuika', 'Māui',
    'Kupe', 'Paikea', 'Tāwhaki', 'Rūaumoko',
    // Hine- is a productive prefix for goddess names (Hine-nui-te-pō,
    // Hine-titama, Hine-rauamoa, etc.); enumerate the prefix so the
    // LLM doesn't construct a Hine-X compound that lands on a real
    // atua.
    'Hine-',
  ],

  /**
   * Sacred or ceremonially-weighted terms in Te Reo Māori that the
   * LLM must NOT use as components of an item name. Production output
   * showed DeepSeek selecting from the most prominent Te Reo
   * vocabulary regardless — words that happen to sit at the top of
   * any English-language reference are disproportionately the
   * spiritual/ceremonial ones, which is exactly the wrong end of the
   * corpus to reach for. The avoid-list flips that default by naming
   * the specific terms not to use, with the reason ("carries sacred
   * or ceremonial weight"). The LLM has plenty of non-sacred Te Reo
   * to draw on (material, environmental, descriptive vocabulary) once
   * the sacred surface is fenced off.
   *
   * The catchall prompt block wraps this list with the rationale and
   * the "reach for material vocabulary instead" instruction; the array
   * itself is just the terms.
   *
   * 'korero', 'roimata', and 'ao' are included on suspicion and flagged
   * for native-speaker verification. 'korero' is the root of whaikōrero
   * (formal oratory). 'roimata' (tears) is connected to tangihanga
   * (mourning ritual) and sits in the same emotional-ceremonial
   * register as tangi, which is already on the list. 'ao' has
   * cosmological weight in compound forms (Te Ao Mārama, the world of
   * light, paired against Te Pō which is on the list), though its
   * common-noun senses (cloud, dawn) may be fine. A native speaker may
   * determine some of these are acceptable in non-ceremonial contexts;
   * until verified, restrict (better to over-restrict than to ship
   * ceremonial terms as item-name decoration).
   */
  itemNameAvoidList: [
    'whakapapa',
    'pō',
    'mana',
    'tapu',
    'mauri',
    'hau',
    'wairua',
    'kaitiaki',
    'atua',
    'whatu',
    'karakia',
    'tohunga',
    'marae',
    'tangi',
    'tipuna',
    'korero', // flagged for verification — see comment above
    'roimata', // flagged for verification — see comment above
    'ao', // flagged for verification — see comment above
  ],

  /**
   * LLM-facing register guidance. Plumbed into the catchall prompt
   * by `buildCatchallPromptBlock` — these sections set the cultural
   * frame the LLM works within. Voice is direct second-person
   * imperative: tell the LLM what to do, not describe how the LLM
   * behaves.
   */
  culturalNotes: `Māori (Te Reo Māori) is the indigenous language of Aotearoa New Zealand and an active living tradition. Preserve macrons and diacriticals exactly as written, and treat sacred-religious vocabulary as off-limits for fictional decoration.

NAMING SCOPE. Character names follow kupu whakanui-style descriptive compounds drawn from Te Reo morphology — body-part + quality compounds, animal-attribute compounds, element + quality compounds, agentive kai- forms. These function as character names in lore but are STRUCTURALLY epithets, not given names. They don't collide with real Māori personal names because the construction pattern is different (no parent names their child "Manawa-Whetu" / "star-hearted"). Use whitelist entries directly, unmodified — do NOT add honorifics, do NOT add affixes, do NOT compound whitelist entries with each other.

SACRED-BOUNDARY COMMITMENT. Real Māori atua (Tangaroa, Tāne, Tūmatauenga, Tāwhirimātea, Whiro, Rongo, Haumia, Aituā, Ranginui, Papatūānuku, Hine-* prefix, Mahuika, Māui, Kupe, Paikea, Tāwhaki, Rūaumoko) MUST NOT appear in fictional contexts as characters, place-references, or item-references. Sacred concepts (mana, tapu, mauri, hau, wairua, atua, taonga, kaitiaki, marae, tohunga, whakapapa) MUST NOT be used as components of item names — these terms carry sacred, ceremonial, or genealogical weight, and reusing them as fictional item-name components is appropriative even when the surrounding compound is invented. Real historical figures (named cultural-resistance figures, named chiefs of recorded history) MUST NOT appear as fictional characters.

ENGLISH-FALLBACK FOR PLACES AND SPIRITS. Render place names in English-descriptive form drawing on Māori material and atmospheric specificity ("the high forge-clearing," "the green-stone river-bend," "the salt-spray cliffs") rather than in Te Reo. Render spirits and supernatural figures in English-descriptive form ("the river-spirit of the indigo waters," "the keeper of the cowrie-counts") rather than naming them in Te Reo. Use ONE Te Reo character name + ONE Te Reo item name per generation; everything else stays in culturally-grounded English.

ITEM-NAMING VOCABULARY. When constructing a Te Reo item name, reach for material, environmental, or descriptive vocabulary (textures, colors, tools, weather, terrain, craft actions). Avoid the item-name avoid-list above.

FAVORED NARRATIVE FORMS. Items in this register are taonga — treasured objects connected to whakapapa that pass between generations of a whānau or hapū rather than being commissioned or crafted to order. Their power accumulates from the ancestors who have held them, not from magical energy stored at creation. Carving traditions (whakairo) treat patterns as language, not decoration; reference spirals, koru, manaia, and pakati in lore as meaningful content. Describe materials with specific cultural weight — pounamu, whalebone, paua shell, harakeke — in their cultural place, not just their physical properties. Frame magical effects as karakia spoken by a tohunga that the item participates in, rather than as item-emitted energy. Treat mountains, rivers, and harbors as literal ancestors of specific iwi, not as territories of magical creatures. Use collective stakes (whānau, hapū, or iwi consequences); avoid lone-hero arcs.

WESTERN-FANTASY DEFAULTS TO AVOID. European-fantasy item structure pulls hard here, and naming defaults explicitly outperform positive instruction alone. Do NOT use the verbs "forge," "forged," or "forging" at all in lore for this register, even colloquially; substitute "carved," "wove," "made," "shaped," or "grew" depending on the item's actual creation method. Do NOT frame items as forged-by-a-smith-from-raw-materials; substitute carving, weaving, or growing-into-being. Do NOT use the spirit-bound-into-object-as-power-source template; power accumulates through whakapapa, not by imprisonment. Do NOT recast the spirit-binding template with non-spirit objects — a "cage for a forgotten promise," "vessel for a stolen oath," "binding of a name," or "prison of a song" is the same imprisonment-as-power-source pattern, and the prohibition is the imprisonment frame itself rather than the literal word "spirit." Do NOT extend the imprisonment template to abstract captured-fragments either — phrases like "fixed in it the memory of," "captured the [spirit's element] within," "imbued with the essence of," "sealed away the laughter of," and similar recastings are the same pattern even when the captured thing is a memory, a laugh, a moment, a name, a song, or a feeling. Items in this register are not containers for captured fragments of other beings. Power accumulates through whakapapa, comes from the cultural significance of materials, or is participated in through karakia spoken by a tohunga; it does not come from anything held or fixed or sealed inside the object. Do NOT source materials from harvested body parts of anthropomorphized landscape ("the finger-bone of the mountain-spirit"); maunga are ancestors, not extractable creatures. Do NOT use the apprentice-steals-master's-work theft arc with individual moral-corruption consequences; if a theft narrative appears at all, frame its consequences through utu at a collective and relational scale. Do NOT treat items as commodities bought in markets — taonga change hands through inheritance, gift, formal exchange, or capture in justified contexts. Do NOT write items as "blessed by a god"; atua are off-limits as characters per the sacred-boundary commitment, and the patron-deity convention does not translate. Do NOT treat mana as a resource-pool, charge meter, or quantified magical reserve; quantification trivializes a sacred concept of inherited spiritual authority. Do NOT use the cursed-item-slowly-corrupts-wielder arc; dangerous items here breach tapu with collective consequences rather than individual moral degradation. Do NOT import European political-fantasy roles — kings, queens, witches, warlocks, wizards, knights. Māori leadership ran through ariki, rangatira, and kaumātua; esoteric specialists were tohunga (which can appear in lore as a character role, though not in item names per the sacred-boundary commitment). Frame leaders and specialists by function and cultural context ("the rangatira of the high forge-town," "the keeper of the carvings," "the tohunga raranga of the salt-spray weavers") rather than reaching for European political vocabulary.`,
};
