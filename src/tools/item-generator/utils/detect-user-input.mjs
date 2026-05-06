/**
 * detectFromUserInput — scan free-form user input for a known seed term.
 *
 * Used by the item generator to let user-provided text override random
 * seed selection. If the user mentions "longbow" in the lore field, the
 * code should select longbow as the weapon type instead of rolling
 * randomly. The seed system's previous unconditional-random behavior
 * was producing items that contradicted user intent.
 *
 * Behavior:
 *   - Case-insensitive word-boundary match. "Longbow" in "She wielded a
 *     longbow at dawn" matches; "longbow" inside another word ("longbows"
 *     plural is matched, "longboard" is not — `\b` boundary).
 *   - Length-descending sort so longer/more-specific terms match before
 *     shorter substrings. Critical for cases like "shortsword" beating
 *     "sword", or multi-word terms like "musical instrument" matching
 *     before "instrument".
 *   - First match wins. If multiple terms appear in the input, the
 *     longest one is returned (because of the sort order).
 *   - Regex-special characters in terms are escaped, so terms containing
 *     punctuation (e.g. "double-bladed scimitar") match as literals.
 *   - Returns null if no term matches or input is empty.
 *
 * @param {string} userInput  — free-form text (item name + lore concatenated).
 * @param {string[]} terms    — list of known terms to scan for.
 * @returns {string|null}     — the matched term (in its original casing
 *                              from the terms list), or null.
 */
export function detectFromUserInput(userInput, terms) {
  if (!userInput || !terms || terms.length === 0) return null;

  // Sort by length descending so longer/multi-word terms match before
  // shorter ones. "shortsword" beats "sword"; "musical instrument" beats
  // "instrument". Length on the sorted list is the term's character
  // count (multi-word phrases include the space, which is what we want).
  const sorted = [...terms].sort((a, b) => b.length - a.length);

  for (const term of sorted) {
    // Escape regex-special characters in the term so terms containing
    // hyphens, parens, etc. match as literal substrings.
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Word-boundary on both sides — `\b` won't cross word characters.
    // For multi-word terms the boundaries land on the outer edges of the
    // phrase, which is what we want.
    const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
    if (pattern.test(userInput)) return term;
  }
  return null;
}
