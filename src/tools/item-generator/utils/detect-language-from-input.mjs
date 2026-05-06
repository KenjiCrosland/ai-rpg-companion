/**
 * detectLanguageFromUserInput — bias palette selection based on
 * culturally-specific terms in the user's input.
 *
 * The item generator's broader refactor decoupled origin (thematic) from
 * language palette (linguistic), so they can pair freely. But when a
 * user types something with a clear linguistic signal — "Shiawase Ofuda"
 * implies Japanese, "Atlatl of the Hunt" implies Mesoamerican or
 * Indigenous-North-American — the palette should honor that signal
 * rather than rolling a random one. This function does that detection.
 *
 * Coverage is intentionally incomplete. The map below seeds known terms
 * across ~20 linguistic registers; the LLM falls back to its own
 * interpretation when nothing matches. Adding entries is always allowed.
 *
 * Term-resolution rules:
 *   - Case-insensitive word-boundary match.
 *   - Length-descending sort across ALL terms (not per-palette), so a
 *     more-specific multi-word term beats a shorter one regardless of
 *     which palette they belong to.
 *   - First match wins on length ties (stable sort + iteration order).
 *   - Some terms appear in multiple palettes (e.g. "atlatl" is in both
 *     Mesoamerican and Indigenous-North-American traditions). The
 *     palette listed FIRST in the map wins on ties — document the
 *     resolution in tests.
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
  'Mesoamerican-inspired': [
    'atlatl', 'macuahuitl', 'tepoztopilli', 'tlachtli', 'quetzal',
    'kukulkan', 'tezcatlipoca',
  ],
  'West African-inspired': [
    'kente', 'kpinga', 'shoka', 'mambele', 'ababio', 'ife-kari',
  ],
  'Yoruba-inspired': [
    'orisha', 'olorun', 'shango', 'oshun', 'ifa', 'adégoke', 'ifelola',
  ],
  'Swahili-inspired': [
    'rungu', 'fimbo', 'asante', 'imani', 'pendo', 'zuberi',
  ],
  'Arabic/Persian-inspired': [
    'khanjar', 'jambiya', 'shamshir', 'talwar', 'janbiya', 'simurgh',
    'jinn', 'efrit',
  ],
  'Hebrew-inspired': [
    'shofar', 'menorah', 'sefer', 'kabbalah', 'sephirot', 'golem',
  ],
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
  'Polynesian-inspired': [
    'mere', 'patu', 'taiaha', 'tewhatewha', 'mana', 'tapu', 'tiki',
  ],
  // Indigenous-North-American shares "atlatl" with Mesoamerican; the map
  // ordering above resolves the tie in Mesoamerican's favor (intentional —
  // atlatl is more strongly associated with Aztec/Maya in popular usage,
  // though the technology is shared across many indigenous traditions).
  'Indigenous-North-American-inspired': [
    'tomahawk', 'wampum', 'medicine bundle', 'dreamcatcher', 'kachina',
  ],
  'Andean-inspired': [
    'quipu', 'chuspa', 'macana', 'inti', 'pachamama',
  ],
  'Slavic-inspired': [
    'shashka', 'sablya', 'cherkesska', 'baba yaga', 'rusalka', 'koschei',
    'domovoi',
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
