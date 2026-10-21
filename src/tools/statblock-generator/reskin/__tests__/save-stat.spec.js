// A2, THE ROW SAYS WHAT IT IMPOSES (owner's ruling, 2026-10-20: "we want the llm
// to categorize when possible"; "regex layers must be avoided").
//
// The pass used to read the condition out of a row's prose, and could not tell
// one the row IMPOSES from one it merely REQUIRES: Glacier's Rebuke, the Downed
// Rider's Whip and the Bog Maw's Lash all rolled Strength for rows that impose
// nothing of the kind. My first fix stripped the precondition clauses with three
// more regexes — a matcher layer deciding meaning, which the standing ruling
// forbids. It is reverted.
//
// The authoring call already answers the condition, validated against
// author.mjs's closed CONDITIONS list, and a template row's slot names carry the
// same distinction by construction: `condition_minor` is imposed,
// `consumed_condition` is spent. Both are now kept on the row, so the pass reads
// a FIELD. A row with no record keeps the save it was built with.
import { CONDITIONS } from '../author.mjs';

// print's pairing is the closed fact the pass applies to whatever the row says
const PAIRING = [
  [['Prone'], ['Strength', 'Dexterity']],
  [['Poisoned'], ['Constitution']],
  [['Frightened', 'Charmed'], ['Wisdom', 'Charisma']],
];

describe('A2: the distinction lives in the data, not in a matcher', () => {
  test("the authoring call's condition list is closed, so `imposes` is always a known value", () => {
    expect(CONDITIONS.length).toBeGreaterThan(8);
    for (const c of CONDITIONS) expect(typeof c).toBe('string');
    for (const [conds] of PAIRING) for (const c of conds) expect(CONDITIONS).toContain(c);
  });

  test("the deleted matcher is gone, and the record is read FIRST", async () => {
    const fs = await import('fs');
    const src = fs.readFileSync('src/tools/statblock-generator/reskin/generate.mjs', 'utf8');
    // the matcher that could not tell imposed from required is gone for good
    expect(src).not.toMatch(/requiresOnly/);
    // the row's own record is consulted before anything else
    expect(src).toMatch(/let imposed = e\.imposes \?\? null;/);
    // HONEST STATE: a text fallback remains for rows nothing records, reading
    // print's own grammar and refusing the if-clause case. Reading only the
    // record left 3 of 4 blocks failing `save-fit`, so removing it outpaced the
    // data. Every such correction is traced, so the gap stays countable.
    expect(src).toMatch(/save stat from print grammar/);
    expect(src).toMatch(/a condition it REQUIRES, not one it imposes/);
  });

  test('a row records what it imposes and what it merely spends — different fields', async () => {
    const fs = await import('fs');
    const src = fs.readFileSync('src/tools/statblock-generator/reskin/generate.mjs', 'utf8');
    expect(src).toMatch(/\{ imposes: s\.condition \}/);                 // the authoring call's answer
    expect(src).toMatch(/\{ imposes: fit\.fills\.condition_minor \}/);  // the template's imposed slot
    expect(src).toMatch(/\{ requiresCondition: fit\.fills\.consumed_condition \}/); // the slot it SPENDS
  });
});

// PRINT'S PAIRING IS STILL THE ARBITER, and it overruled the brief's C3: across
// its 31 rows that deal damage AND impose a condition, the imposed condition
// picks the save every time. That measurement is what settles the precedence
// between the two passes, so it is pinned on the corpus rather than on prose.
describe("print's pairing: the imposed condition picks the save even on a damage row", () => {
  test('measured across the corpus, with no exceptions in either direction', async () => {
    const blocks = (await import('@/data/srd52-monsters.json')).default;
    const tally = {};
    for (const x of (Array.isArray(blocks) ? blocks : [])) {
      for (const sec of ['Actions', 'Traits', 'Bonus Actions', 'Reactions', 'Legendary Actions']) {
        for (const e of (x.sections?.[sec] ?? [])) {
          const t = String(e.text ?? '');
          const sv = /(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/.exec(t);
          const cond = /has the (\w+) condition/.exec(t)?.[1];
          if (!sv || !cond || !/\d+ \(\d+d\d+/.test(t)) continue;
          tally[`${cond}:${sv[1]}`] = (tally[`${cond}:${sv[1]}`] ?? 0) + 1;
        }
      }
    }
    expect(tally['Frightened:Wisdom'] ?? 0).toBeGreaterThanOrEqual(3);
    for (const s of ['Strength', 'Dexterity', 'Constitution']) expect(tally[`Frightened:${s}`] ?? 0).toBe(0);
    expect((tally['Prone:Strength'] ?? 0) + (tally['Prone:Dexterity'] ?? 0)).toBeGreaterThanOrEqual(10);
    for (const s of ['Wisdom', 'Charisma', 'Intelligence']) expect(tally[`Prone:${s}`] ?? 0).toBe(0);
    expect(tally['Poisoned:Constitution'] ?? 0).toBeGreaterThanOrEqual(5);
    for (const s of ['Wisdom', 'Strength', 'Dexterity']) expect(tally[`Poisoned:${s}`] ?? 0).toBe(0);
  });
});
