/**
 * detectLanguageFromUserInput — bias palette selection based on
 * culturally-specific terms in the user's input.
 *
 * The item generator's broader refactor decoupled origin (thematic) from
 * language palette (linguistic), so they can pair freely. But when a
 * user types something with a clear linguistic signal — "Shiawase Ofuda"
 * implies Japanese, "Atlatl of the Hunt" implies Aztec/Nahuatl,
 * "Tane-mahuta's Mere" implies Maori — the palette should honor that
 * signal rather than rolling a random one. This function does that
 * detection.
 *
 * Coverage is intentionally incomplete. The map below seeds known terms
 * across the registers that ship in the language palette list; the LLM
 * falls back on world knowledge via the LANGUAGE PALETTE OVERRIDE prompt
 * block when nothing matches. Adding entries is always allowed.
 *
 * The map favors specific cultural-linguistic traditions over generic
 * regional categories — earlier versions used "Mesoamerican-inspired",
 * "Polynesian-inspired", "West African-inspired", "Indigenous-North-
 * American-inspired", and "Eastern European-inspired" as catch-alls,
 * but those flatten distinct living cultures (Maya ≠ Aztec, Maori ≠
 * Hawaiian, Yoruba ≠ Akan ≠ Igbo, etc.). Splits were applied where
 * DeepSeek demonstrably engages with the underlying traditions
 * distinctly. Pan-traditional popular-fiction terms (tomahawk, wampum,
 * dreamcatcher, kachina, kpinga, mambele) are deliberately NOT mapped —
 * they don't cleanly belong to a single specific tradition, and the
 * LLM can interpret them from world knowledge.
 *
 * Term-resolution rules:
 *   - Case-insensitive word-boundary match.
 *   - Length-descending sort across ALL terms (not per-palette), so a
 *     more-specific multi-word term beats a shorter one regardless of
 *     which palette they belong to.
 *   - First match wins on length ties (stable sort + iteration order).
 *   - When a term genuinely belongs to multiple traditions, the
 *     palette listed FIRST in the map wins on ties.
 *
 * @param {string} userInput  — combined name + lore.
 * @param {string[]} languagePalettes  — the full palette pool to look up
 *                                       the resolved language string in.
 * @returns {string|null}  — the matching languagePalettes entry, or null
 *                           if no detection fired.
 */

/**
 * Map of palette-prefix → detection terms. The palette prefix is matched
 * against the start of each entry in languagePalettes (e.g. the prefix
 * 'Japanese-inspired' matches the entry that begins
 * 'Japanese-inspired: clean syllables...').
 */
export const userInputLanguageDetection = {
  'Japanese-inspired': [
    'ofuda', 'kasaya', 'tsuba', 'wakizashi', 'nodachi', 'tonfa', 'sai',
    'shuriken', 'tessen', 'kanabo', 'naginata', 'shiawase', 'kage',
    'tsuki', 'sora', 'haru', 'ame',
  ],
  // Mesoamerican was previously a single generic palette flattening Maya
  // and Aztec/Nahuatl. Split per the cultural-specificity refactor:
  // atlatl/macuahuitl/tepoztopilli/quetzal/tezcatlipoca are Nahuatl;
  // kukulkan and the day-name register go to Maya.
  'Maya-inspired': [
    'kukulkan', 'itzamna', 'ixchel', 'kʼinich', 'balam', 'tikal',
    'palenque', 'chichen', 'cenote',
  ],
  'Aztec/Nahuatl-inspired': [
    'atlatl', 'macuahuitl', 'tepoztopilli', 'tlachtli', 'quetzal',
    'tezcatlipoca', 'xochipilli', 'huitzilopochtli', 'tenochtitlan',
  ],
  // West African was previously a single generic palette flattening
  // hundreds of distinct cultures. Yoruba was already separate; Akan
  // (Ghana) and Igbo (Nigeria) added. Some former entries were dropped
  // from detection because they don't cleanly map to either Akan or
  // Igbo: kpinga (Zande, Central Africa), mambele (Mangbetu/Azande),
  // shoka (ambiguous), ababio (Akan but not in the brief's term list),
  // ife-kari (Yoruba — already covered in Yoruba below). The LLM can
  // still pick up these signals from world knowledge via the LANGUAGE
  // PALETTE OVERRIDE prompt block.
  'Yoruba-inspired': [
    'orisha', 'olorun', 'shango', 'oshun', 'ifa', 'adégoke', 'ifelola',
    'ife-kari',
  ],
  'Akan-inspired': [
    'kente', 'ashanti', 'kumasi', 'sankofa', 'adinkra', 'kwame', 'akwasi',
  ],
  'Igbo-inspired': [
    'ofo', 'ikenga', 'mmanwu', 'igbo', 'biafra',
  ],
  // Swahili is East African — labeling clarified in the palette list.
  'Swahili-inspired': [
    'rungu', 'fimbo', 'asante', 'imani', 'pendo', 'zuberi',
  ],
  // Arabic/Persian: detection terms restricted to weapon names
  // (pre-Islamic and broadly Persianate vocabulary) and folkloric
  // creatures (jinn, simurgh). Specifically Islamic-religious terms
  // do NOT appear here — the palette is constrained at the descriptor
  // level to pre-Islamic Arabic OR Persian; the detection terms
  // mirror that constraint.
  'Arabic/Persian-inspired': [
    'khanjar', 'jambiya', 'shamshir', 'talwar', 'janbiya', 'simurgh',
    'jinn', 'efrit',
  ],
  // Hebrew-inspired removed from the detection map alongside its
  // removal from the palette list. User-typed Hebrew signals (shofar,
  // menorah, golem, etc.) fall through to the LLM's world-knowledge
  // override path, where the universal-invent rule still governs.
  'Hindi/Sanskrit-inspired': [
    'urumi', 'katar', 'chakram', 'bagh nakh', 'pata', 'mandala',
    'yantra', 'mudra',
  ],
  'Chinese-inspired': [
    'jian', 'dao', 'qiang', 'guandao', 'feng huang', 'baihu', 'qilin',
  ],
  'Korean-inspired': [
    'jang-do', 'gwandal', 'hwando', 'sangmo',
  ],
  'Mongolian-inspired': [
    'ger', 'ovoo', 'urga', 'morin khuur',
  ],
  'Tibetan-inspired': [
    'phurba', 'kapala', 'mala', 'thangka',
  ],
  'Thai-inspired': [
    'krabi', 'krabong', 'daab',
  ],
  // Polynesian was previously a single generic palette flattening Maori,
  // Hawaiian, Samoan, Tongan, etc. Split into Maori and Hawaiian per the
  // cultural-specificity refactor; other Polynesian traditions (Samoan,
  // Tongan, Tahitian, Marquesan, Rapa Nui) are not detected for now —
  // the LLM falls back on world knowledge via LANGUAGE PALETTE OVERRIDE.
  'Maori-inspired': [
    'mere', 'patu', 'taiaha', 'tewhatewha', 'mana', 'tapu', 'tiki', 'pou',
    'maunga', 'whenua', 'aroha', 'aotearoa', 'maori', 'iwi', 'hapu',
    'whakapapa',
  ],
  'Hawaiian-inspired': [
    'lei', 'pikake', 'hula', 'kahuna', 'mahalo', 'aloha', 'lehua', 'koa',
    'kapu', 'pueo', 'nene', 'ohana',
  ],
  // The Indigenous-North-American generic was removed. Lakota and
  // Navajo/Diné are added with conservative term lists. Pan-Indigenous
  // popular-fiction terms (tomahawk, wampum, medicine bundle,
  // dreamcatcher, kachina) are intentionally NOT mapped — they don't
  // cleanly belong to either Lakota or Navajo, and Hopi-sacred terms
  // like kachina warrant the appropriation caution the brief flags.
  // The LLM can interpret these terms from world knowledge.
  'Lakota-inspired': [
    'wakinyan', 'tatanka', 'wakan', 'tipi', 'paha-sapa', 'wiyaka',
  ],
  'Navajo/Diné-inspired': [
    'hózhǫ́', 'diyin', 'hooghan', 'navajo', 'diné',
  ],
  'Andean-inspired': [
    'quipu', 'chuspa', 'macana', 'inti', 'pachamama',
  ],
  // Slavic stays as a broad pan-Slavic register. Russian-coded terms
  // (shashka, sablya, cherkesska, baba yaga, rusalka, koschei, etc.)
  // moved to Russian-inspired below. domovoi remains here because it's
  // a genuinely pan-Slavic household-spirit concept.
  'Slavic-inspired': [
    'domovoi',
  ],
  'Russian-inspired': [
    'shashka', 'sablya', 'cherkesska', 'baba yaga', 'rusalka', 'koschei',
    'tsar', 'kremlin', 'volga',
  ],
  'Romanian-inspired': [
    'draculesti', 'wallachia', 'transilvania', 'voievod',
  ],
  'Hungarian-inspired': [
    'magyar', 'puszta', 'hortobagy', 'csikos',
  ],
  'Celtic-inspired': [
    'claymore', 'sgian-dubh', 'targe', 'banshee', 'tuatha', 'sidhe',
  ],
  'Norse-inspired': [
    'seax', 'langeax', 'ulfberht', 'aegis', 'mjolnir', 'gungnir',
  ],
  'Germanic-inspired': [
    'katzbalger', 'zweihander', 'flamberge', 'bidenhander',
  ],
  'Greek-inspired': [
    'xiphos', 'kopis', 'sarissa', 'aspis',
  ],
  'Latin-inspired': [
    'gladius', 'pilum', 'spatha', 'scutum',
  ],
};

export function detectLanguageFromUserInput(userInput, languagePalettes) {
  if (!userInput || !languagePalettes || languagePalettes.length === 0) {
    return null;
  }

  // Build a flat list of {term, palettePrefix} pairs so we can sort
  // ALL terms together by length descending. Per-palette sort would
  // miss the "atlatl" cross-palette case.
  const allTerms = Object.entries(userInputLanguageDetection).flatMap(
    ([palettePrefix, terms]) => terms.map(term => ({ term, palettePrefix }))
  );
  allTerms.sort((a, b) => b.term.length - a.term.length);

  for (const { term, palettePrefix } of allTerms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
    if (pattern.test(userInput)) {
      // Find the full palette string in the provided languagePalettes
      // pool. The map keys are prefixes; entries in languagePalettes
      // start with the prefix followed by ": ...".
      const palette = languagePalettes.find(p => p.startsWith(palettePrefix));
      if (palette) return palette;
      // If the palette prefix isn't found in the pool (e.g. caller
      // passed a reduced set), keep scanning for another matching
      // term. Don't return a string the caller didn't provide.
    }
  }

  return null;
}
