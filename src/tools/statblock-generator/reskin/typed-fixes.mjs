/**
 * TYPED FIXES FOR AUDIT FINDINGS (owner's ruling, 2026-11-16).
 *
 * A fix is deterministic, hybrid or a drop. The model is not relied on to write a fix alone: the
 * audit NAMES the kind of fix from a closed list and supplies its one parameter, and the engine
 * writes the change and checks it. The one-row re-authoring call — which re-authored a row from
 * nothing into a closed form with a damage field, and whose own prompt called leaving the row alone
 * "the worst outcome available" — is no longer reached from an audit finding.
 *
 * WHY THESE TWO KINDS ACT AND THE REST ARE LOGGED. The reviewer read the 31 high findings on the
 * baseline tape against the row each points at. Twelve were defects the engine had already made
 * before the audit read the row; four needed a rule redesigned; two were the audit misreading sound
 * wording. Of the fixes that looked available, noun substitution and span deletion did not survive
 * contact with the rows they would touch — two of four delete_span candidates were the audit being
 * wrong and one would have removed a limit. What is left is a name that does not fit its row, and a
 * state that never ends.
 *
 * Nothing here reads generateReskin's locals: every function takes a row, a finding and the few
 * facts it needs, and returns the row or a refusal with its reason.
 */
import { DURATIONS, durationClause, durationFormOf } from './templates.mjs';

/** The closed list. `acts` is the whole difference; the rest are labels that count. */
export const FIX_KINDS = {
  // RENAME IS NOT APPLIED HERE (2026-11-17). The engine already had a rename path — the audit's own
  // loop, which carries the claims, weapon and part-name guards and the confidence policy the
  // owner's hand-score set on 11 November — and a finding carrying `rename` never reached this
  // route anyway. Two places a name could change is one too many, so this one logs and the older
  // loop keeps the job, with its GM-word guard widened to every row.
  rename: { acts: false },
  add_duration: { acts: true },
  fix_reference: { acts: false },
  delete_span: { acts: false },
  fill_number: { acts: false },
  reformat: { acts: false },
  clarify: { acts: false },
  none: { acts: false },
};
export const FIX_NAMES = Object.keys(FIX_KINDS);

/**
 * WHERE THE ROW CAME FROM, by the engine's own test (generate.mjs:11041). `freeRow || authored` is
 * what it means by a row the model wrote, and it is what decides whether add_duration may act.
 */
export const rowOrigin = (row) => {
  if (!row) return 'missing';
  if (row.print || row.printNamed || row.rules) return 'print';
  if (row.freeRow || row.authored) return 'model';
  return 'body';
};

const bareName = (n) => String(n ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\)$/, '').trim();
const gate = (n) => { const m = / (\((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\))$/.exec(String(n ?? '')); return m ? ` ${m[1]}` : ''; };

/**
 * THE ONE CHECK, used after every fix that acts.
 *
 * The row's dice, damage types, conditions, save ability, DC, area and form must be what they were,
 * apart from the one thing the fix allows. If anything else moved, the caller keeps the original
 * row and traces why. This exists because the step it replaces added damage to ten rows, a
 * condition to six, and turned three passive traits into saves.
 */
const DICE = /\d+d\d+(?:\s*[+-]\s*\d+)?/g;
const DAMAGE_TYPES = /\b(Acid|Bludgeoning|Cold|Fire|Force|Lightning|Necrotic|Piercing|Poison|Psychic|Radiant|Slashing|Thunder)\b/g;
const CONDITIONS = /\b(Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Invisible|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious|Exhaustion)\b/g;
const SAVE_ABILITY = /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw\b/g;
const DC = /\bDC\s*\d+\b/g;
const AREA = /\b\d+-foot\b|\bwithin \d+ feet\b|\brange \d+\/\d+\b|\breach \d+ ft\.|\bEmanation\b|\bCone\b|\bLine\b|\bCube\b|\bSphere\b/g;
const FORM = /(Melee or Ranged Attack Roll|Melee Attack Roll|Ranged Attack Roll|Saving Throw|Trigger:|Response:)/g;

const shapeOf = (text) => ({
  dice: (String(text).match(DICE) ?? []).join('|'),
  damage: (String(text).match(DAMAGE_TYPES) ?? []).sort().join('|'),
  conditions: (String(text).match(CONDITIONS) ?? []).sort().join('|'),
  save: (String(text).match(SAVE_ABILITY) ?? []).join('|'),
  dc: (String(text).match(DC) ?? []).join('|'),
  area: (String(text).match(AREA) ?? []).join('|'),
  form: (String(text).match(FORM) ?? []).join('|'),
});

/**
 * @param allow 'name' — the text must be byte for byte what it was
 *              'duration' — one end clause may have been appended, nothing else
 * @returns null when the change is within what the fix allows, or the reason it is not
 */
export const onlyTheAllowedThingMoved = (before, after, allow) => {
  if (allow === 'name') {
    return String(before.text) === String(after.text) ? null : 'the rules text changed, and a rename may not touch it';
  }
  const a = shapeOf(before.text); const b = shapeOf(after.text);
  for (const k of Object.keys(a)) if (a[k] !== b[k]) return `the row's ${k} changed (${a[k] || 'none'} -> ${b[k] || 'none'})`;
  if (bareName(before.name) !== bareName(after.name)) return 'the name changed, and only a rename may do that';
  return null;
};

/**
 * ADD_DURATION. One clause saying when an imposed state ends, appended to the sentence that imposes
 * it. The audit picks from the engine's own duration vocabulary — the same four forms the fit call
 * fills — and the engine renders and appends it.
 *
 * Refused when the row is not free or authored, when the quoted sentence is not found exactly once,
 * or when that sentence already says when the state ends.
 */
export const applyAddDuration = (row, finding) => {
  if (rowOrigin(row) !== 'model') {
    return { row, outcome: 'refused', reason: `the row is ${rowOrigin(row)}, and a duration is added only to a row the model wrote` };
  }
  const span = String(finding?.span ?? '').trim();
  if (!span) return { row, outcome: 'refused', reason: 'the finding quoted no span' };
  const text = String(row.text ?? '');
  const at = text.split(span).length - 1;
  if (at !== 1) return { row, outcome: 'refused', reason: `the quoted sentence appears ${at} times in the row, not once` };
  if (durationFormOf(span)) return { row, outcome: 'refused', reason: 'the quoted sentence already says when the state ends' };
  // the parameter is a form name, or the clause itself — accept either, and nothing else
  const param = String(finding?.fix_param ?? '').trim();
  const form = DURATIONS.includes(param) ? param : DURATIONS.find((f) => durationClause(f) === param) ?? durationFormOf(param);
  const clause = durationClause(form);
  if (!clause) {
    return { row, outcome: 'refused', reason: `"${param}" is not one of the engine's duration forms (${DURATIONS.join(', ')})` };
  }
  const withClause = span.replace(/\s*\.?\s*$/, '') + ` ${clause}.`;
  const after = { ...row, text: text.replace(span, withClause) };
  const bad = onlyTheAllowedThingMoved(row, after, 'duration');
  if (bad) return { row, outcome: 'refused', reason: bad };
  // EXACTLY ONE CLAUSE WAS INSERTED, and nothing else: take the clause back out of the result and
  // it must be the row it started as. This replaces a weaker rule that asked whether the original
  // text was a PREFIX of the result — which is only ever true when the quoted span sits at the END
  // of the row, so a mid-row span was refused however correct it was. It cost a real fix on the
  // live run (Echo of the Stolen Chorus) and my own tests missed it by quoting an end-of-row span.
  const undone = String(after.text).replace(` ${clause}.`, '.').replace(/\s{2,}/g, ' ');
  if (undone.replace(/\s*\.\s*$/, '') !== String(text).replace(/\s*\.\s*$/, '')) {
    return { row, outcome: 'refused', reason: 'the result is not the original row with one clause added' };
  }
  return { row: after, outcome: 'acted', reason: `${form}: "${clause}" appended to the sentence that imposes it` };
};

/**
 * THE ROUTING. One answer per finding, and the row is returned unchanged unless a fix acted.
 *
 * Only HIGH findings act: this is what removes the exception that kept a finding "whatever its
 * confidence label" on a row a fix could reach. Medium and low are logged, and so is every kind
 * that does not act, a finding with no fix at all, and any finding on a printed or body row.
 */
export const routeFinding = ({ row, finding, gmWords = [] } = {}) => {
  const kind = String(finding?.fix ?? '') || null;
  const conf = String(finding?.confidence ?? '').toLowerCase();
  const origin = rowOrigin(row);
  const log = (outcome, reason) => ({ row, outcome, kind: kind ?? 'unlabelled', origin, reason });

  if (!row) return log('logged', 'no row of that name on the sheet');
  if (origin === 'print') return log('logged', "a printed row — classified and traced, not fixed here");
  if (origin === 'body') return log('logged', "the body's row — a catalog queue, fixed once for every creature on that body");
  if (!kind) return log('logged', 'the finding carries no fix');
  if (!FIX_NAMES.includes(kind)) return log('logged', `"${kind}" is not one of the fixes`);
  if (!FIX_KINDS[kind].acts) return log('logged', `${kind} is logged, not applied`);
  if (conf !== 'high') return log('logged', `${conf || 'no'} confidence — only high acts`);

  const applied = applyAddDuration(row, finding);
  return { ...applied, kind, origin };
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
