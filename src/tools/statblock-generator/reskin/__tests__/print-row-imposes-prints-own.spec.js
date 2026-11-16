// PRINT'S ROW IMPOSES WHAT PRINT'S ROW IMPOSES (item H14, 2026-11-11).
//
// The print-canon rename puts print's NAME, dice, reach and rider on a chassis row. The chassis's own
// condition clause has to leave first, and the strip that did it knew one form — print's own "If the
// target is a … it has the X condition". The grappler chassis writes its hold in TWO sentences, and
// the standalone second one survived: the Troll's Rend shipped "While Grappled, the target has the
// Restrained condition" on 13 of 13 trolls where print's Rend is bare damage, and the card promised a
// Restrained nothing on the sheet could impose. 16 of 517 pasted print attack rows across the saved
// runs. Found by comparing our pasted rows to the corpus, not by the audit (which raised it and had
// the finding dropped by the confidence gate).
//
// The rule is PER CONDITION, not all-or-nothing: print's Giant Frog Bite really does grapple, and ours
// added Restrained on top, so "print imposes nothing" would have missed 2 of the 16.
import { imposedConditions } from '@/tools/statblock-generator/reskin/author.mjs';
import { printCanonFor } from '@/tools/statblock-generator/reskin/generate.mjs';
import CORPUS from '@/data/srd52-monsters.json';

// the rule as the rename composes it
const strip = (text, printText) => {
  const printImposes = new Set(imposedConditions({ name: '', text: printText }));
  return text.split(/(?<=\.)\s+/).filter((sent) => {
    if (/Attack Roll/.test(sent)) return true;
    const mine = imposedConditions({ name: '', text: sent });
    return !mine.length || mine.some((c) => printImposes.has(c));
  }).join(' ');
};
const printRow = (concept, cr, name) => (printCanonFor(concept, cr)?.meleeRows ?? []).find((r) => r.name === name);
const ATTACK = '*Melee Attack Roll:* +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.';

describe("the chassis's condition clause leaves with the rename", () => {
  test("print's Troll Rend is bare damage, so the chassis's Restrained goes", () => {
    const pr = printRow('a troll', 5, 'Rend');
    expect(imposedConditions({ name: '', text: pr.text })).toEqual([]);           // print imposes nothing
    expect(strip(`${ATTACK} While Grappled, the target has the Restrained condition.`, pr.text)).toBe(ATTACK);
  });

  // the case an all-or-nothing guard misses
  test("print's Giant Frog Bite DOES grapple — its grapple stays, our Restrained goes", () => {
    const pr = printRow('a giant frog', 1, 'Bite');
    expect(imposedConditions({ name: '', text: pr.text })).toContain('Grappled');
    const ours = '*Melee Attack Roll:* +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. While Grappled, the target has the Restrained condition. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11).';
    const out = strip(ours, pr.text);
    expect(out).not.toMatch(/Restrained/);
    expect(out).toMatch(/has the Grappled condition \(escape DC 11\)/);
  });

  test('a condition print also imposes is KEPT — this is a strip, not a purge', () => {
    const pr = printRow('a dire wolf', 3, 'Bite');
    expect(imposedConditions({ name: '', text: pr.text })).toContain('Prone');
    expect(strip(`${ATTACK} The target has the Prone condition.`, pr.text)).toMatch(/Prone/);
    expect(strip(`${ATTACK} The target has the Poisoned condition until the end of its next turn.`, pr.text)).toBe(ATTACK);
  });

  test('a plain attack row and a damage-plus rider are untouched', () => {
    const bare = printRow('a troll', 5, 'Rend').text;
    expect(strip(ATTACK, bare)).toBe(ATTACK);
    const plus = '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Cold damage.';
    expect(strip(plus, bare)).toBe(plus);
  });

  // the corpus fact the fix rests on: print's own attack rows that impose nothing
  test('print really does write bare attack rows — the premise', () => {
    const bare = CORPUS.flatMap((m) => (m.sections?.Actions ?? [])
      .filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !imposedConditions({ name: '', text: e.text }).length)
      .map((e) => `${m.name}/${e.name}`));
    expect(bare.length).toBeGreaterThan(50);
    expect(bare).toContain('Troll/Rend');
  });
});
