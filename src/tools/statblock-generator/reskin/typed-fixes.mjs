/**
 * WHAT KIND OF DEFECT THE AUDIT FOUND (owner's ruling, 2026-11-17).
 *
 * NOTHING HERE ACTS. The audit reads a finished sheet and names what is wrong with the row from a
 * closed list; the engine logs it with the row's origin and the quoted span, and changes nothing.
 * The label is a GAUGE, not an instruction: it gives the count before the change to how abilities
 * are written, and the count after.
 *
 * WHY NOTHING ACTS AT THE END OF THE LINE. Two things acted here and both are gone.
 *
 *   the one-row repair   deleted 2026-11-17. Across the tapes it added damage to ten rows, a
 *                        condition to six, and turned three passive traits into saves; on the arms
 *                        round it made five rows worse for the three it improved.
 *   add_duration         deleted with this commit. It was named six times across two runs and acted
 *                        on NONE of them, rightly each time — four were medium confidence and the
 *                        two high ones quoted a span that was not a whole sentence, so appending a
 *                        clause there would have produced "…of the weapon's type until the end of
 *                        its next turn., and it has advantage…". Four of 65 clarify findings plus
 *                        those four is too few, and too often quoted mid-sentence, to earn a second
 *                        appending fix.
 *
 * A row the model wrote badly is fixed where the row is WRITTEN. That is a later handoff.
 *
 * RENAMING IS NOT HERE AND NEVER WAS. The audit's own loop takes a finding carrying `rename`, with
 * the claims, weapon and part-name guards and the GM-word guard. This module only ever logged it.
 *
 * Nothing here reads generateReskin's locals: every function takes a row and a finding and returns
 * a log entry.
 */

/**
 * The closed list the audit answers from. `clarify` used to stand for all of this — it said a row
 * needed rewriting and not what was wrong with it, and it was 86% of everything the audit asked
 * for, so it could not be acted on or even counted usefully.
 */
export const DEFECTS = {
  misnamed: 'the name promises something the rules text does not do',
  untrackable: 'the trigger or condition rests on something the table cannot check: facing, a remembered position, history beyond the round, a zone nothing on the sheet defines',
  open_ended: 'a state with no end and no escape, or an ability with no stated cost or timing',
  dead_reference: 'the row names an attack, creature, feature or condition that is not on the sheet',
  wording: 'grammar, format or pronoun. The rule itself is clear',
  weak: 'the row runs as written, and the audit thinks it underpowered or outclassed',
  other: 'none of the above describes it — the issue sentence carries the rest, and a run where this passes one finding in six means the list needs re-cutting',
};
export const DEFECT_NAMES = Object.keys(DEFECTS);

/**
 * WHERE THE ROW CAME FROM, in the four values the log reports.
 *
 * `freeRow || authored` is the engine's own test for a row the model wrote (generate.mjs). A row
 * marked `accepted_closest` is its own case: the fit call refused every template and the engine
 * seated the nearest shape anyway, so the row does something its name was never about — the
 * Owlbear's "Learned to Climb" on a pounce. Counting those as model-written hides the one defect
 * class that has a known cause and a fix already queued.
 */
export const rowOrigin = (row) => {
  if (!row) return 'missing';
  if (row.print || row.printNamed || row.rules) return 'print';
  if (row.accepted_closest) return 'closest';
  if (row.freeRow || row.authored) return 'model';
  return 'catalog';
};

/** How the log names each origin, so a reader needs no key. */
export const ORIGIN_WORDS = {
  model: 'model-written',
  catalog: 'catalog',
  print: 'print',
  closest: "a refused template's stand-in",
  missing: 'no such row',
};

/**
 * ONE ANSWER PER FINDING, and the row is returned UNCHANGED every time.
 *
 * A defect outside the list is logged as `other` rather than refused: the list is the owner's and a
 * value it does not cover is a fact about the list, which is why `other` passing one finding in six
 * is the signal to re-cut it.
 */
export const routeFinding = ({ row, finding } = {}) => {
  const named = String(finding?.defect ?? '').trim();
  const defect = DEFECT_NAMES.includes(named) ? named : 'other';
  return {
    row,
    outcome: 'logged',
    defect,
    declared: named || null,            // what the audit actually said, even when it is not on the list
    origin: rowOrigin(row),
    confidence: String(finding?.confidence ?? '').toLowerCase() || 'none',
    // THE SPAN IS PRINTED ONCE. The engine's finding normaliser appends the quoted span to
    // `message` as `(about: "…")`, so reading the issue off it and then printing `span` beside it
    // said the same sentence twice — and these spans run to 150 characters.
    issue: String(finding?.issue ?? finding?.message ?? '').replace(/\s*\(about: "[\s\S]*"\)\s*$/, '').trim(),
    span: String(finding?.span ?? ''),
  };
};

/** The log line, with everything needed to read it without the tape beside you. */
export const formatFinding = ({ sheet = '', section = '', name = '', entry }) => {
  const e = entry;
  return `${sheet ? `${sheet} ` : ''}${section}/"${name}" [${ORIGIN_WORDS[e.origin] ?? e.origin}] ${e.confidence} ${e.defect}`
    + `${e.declared && e.declared !== e.defect ? ` (the audit said "${e.declared}")` : ''}`
    + ` — ${e.issue}${e.span ? ` (about: "${e.span}")` : ''}`;
};

/**
 * WOULD THIS RENAME DROP A WORD THE GM TYPED? (owner's rule, widened 2026-11-17, exempted the same
 * day.) Returns the words that would be lost, or an empty array when the rename is free to proceed.
 *
 * The audit renames a row whose name promises what its text does not deliver, and that is usually
 * right. It is wrong when the name is built from the GM's own words: the Trench Leviathan's
 * "Drowning Song" became "Abyssal Roar" and the request's "song" went with it.
 *
 * THE EXEMPTION. A row marked `accepted_closest` landed as a refused template's stand-in — the fit
 * call said no and the engine took the nearest shape anyway — so its name describes something the
 * row does not do. The Owlbear's "Learned to Climb" is a pounce: a jump, a Dexterity save, Slashing
 * damage and Prone. Keeping that name because it quotes the request kept a label on the wrong
 * thing, and the sheet shipped "It can replace one attack with a use of Learned to Climb."
 *
 * A name made of the GM's words is worth keeping on a row that does what the words say.
 *
 * @param gmWords the request's own significant words, and the row's clause words
 */
export const renameDropsAGmWord = (row, oldName, newName, gmWords = []) => {
  if (row?.accepted_closest) return [];
  const wordsOf = (x) => String(x ?? '').toLowerCase().match(/[a-z]{4,}/g) ?? [];
  const gm = new Set(gmWords.map((w) => String(w).toLowerCase()).filter((w) => w.length >= 4));
  const kept = new Set(wordsOf(newName));
  return [...new Set(wordsOf(oldName))].filter((w) => gm.has(w) && !kept.has(w));
};
