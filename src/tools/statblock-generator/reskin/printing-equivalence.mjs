/**
 * PRINTING EQUIVALENCE (the critic's test 6, 2026-10-20). A 2014 sheet is saved
 * beside its 2024 printing. The two may differ in FORMAT as much as they like;
 * they may not differ in STRUCTURE — the attack bonus, the damage dice, the save
 * stat and DC, and the conditions a row names.
 *
 * This exists because one call used to rewrite the whole 2014 sheet, and a
 * translator that can change rules will: the critic found a Multiattack's "in
 * any combination" become "one with each". Most of that is already deterministic
 * (names, entry order, the section set and the Multiattack text are rendered by
 * code, and only a row's prose goes to the call), and this is the gate that
 * keeps it so.
 *
 * Measured across 1,411 saved block pairs on 2026-10-20: 19 rows differed in any
 * field, about 0.2%.
 *
 * THE TWO IDIOMS DIFFER AND BOTH MUST BE READ. 2024 writes "Attack Roll:* +8"
 * and capitalises conditions; 2014 writes "+8 to hit" and lowercases them. A
 * comparator blind to that reports thousands of false differences — it did, on
 * the first run of this measurement.
 */
const CONDITIONS = ['prone', 'grappled', 'restrained', 'poisoned', 'frightened', 'charmed', 'blinded', 'stunned', 'paralyzed', 'incapacitated', 'deafened', 'unconscious', 'petrified', 'invisible'];

/** Every row of a block, in either printing's shape. */
export function rowsOfPrinting(b) {
  if (b?.sections) return Object.values(b.sections).flat().map((e) => ({ name: String(e.name ?? ''), text: String(e.text ?? '') }));
  const out = [];
  for (const k of ['abilities', 'actions', 'bonus_actions', 'reactions', 'legendary_actions']) {
    for (const e of (b?.[k] ?? [])) out.push({ name: String(e.name ?? ''), text: String(e.description ?? e.text ?? '') });
  }
  return out;
}

/** A row's name, stripped of the economy suffix and the edition's own term. */
export const equivalenceKey = (n) => String(n ?? '')
  .replace(/\s*\((?:Bonus Action|Reaction|Recharge [\d–-]+|\d\/Day)[^)]*\)\s*$/i, '')
  .replace(/\bWounded\b/g, 'Bloodied')
  .trim().toLowerCase();

/** The structure of one row — what may not change between printings. */
export function rowStructure(text) {
  const t = String(text ?? '');
  return {
    hit: (/Attack Roll:?\*?\s*\+?(\d+)/i.exec(t)?.[1] ?? /\+(\d+) to hit/i.exec(t)?.[1]) ?? null,
    dmg: [...t.matchAll(/(\d+) \((\d+d\d+(?: ?[+-] ?\d+)?)\)/g)].map((x) => x[2].replace(/\s/g, '')).join('|') || null,
    save: /(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b[^.]{0,24}saving throw/i.exec(t)?.[1] ?? null,
    dc: /DC\s*(\d+)/i.exec(t)?.[1] ?? null,
    conds: [...new Set([...t.matchAll(new RegExp(`\\b(${CONDITIONS.join('|')})\\b`, 'gi'))].map((x) => x[1].toLowerCase()))].sort().join(','),
  };
}

/** The structure of a whole printing, keyed by row. */
export function printingStructure(b) {
  const out = {};
  for (const r of rowsOfPrinting(b)) out[equivalenceKey(r.name)] = rowStructure(r.text);
  return out;
}

/**
 * Compare two printings of the same block. Returns the rows whose structure
 * differs. A row only one printing carries is the ROW-SET question, which other
 * gates own, so it is not reported here.
 */
export function printingDifferences(a, b) {
  const A = printingStructure(a); const B = printingStructure(b);
  const out = [];
  for (const key of Object.keys(A)) {
    if (!(key in B)) continue;
    for (const field of ['hit', 'dmg', 'save', 'dc', 'conds']) {
      if (String(A[key][field]) !== String(B[key][field])) out.push({ row: key, field, a: A[key][field], b: B[key][field] });
    }
  }
  return out;
}
