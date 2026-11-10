// FOUR ITEMS FROM THE CRITIC'S FIFTH GM FORTY (2026-11-09), each a predicate rather than a rule:
// the shapes are pinned here against print, so a later widening has to argue with print's own rows.
import PRINT from '@/data/srd52-monsters.json';
import { PI_ALIASES, rewritePI, piAliasesIn } from '../lexicon.mjs';
import { WEAPONS, weaponFor } from '../weapons.mjs';

describe('21 — a count is an integer, and "the options below" must be below', () => {
  // Thornback shipped "can take 14 (4d6) Legendary Actions ... choosing from the options below"
  // with no options on the sheet: a damage expression where a number of uses belongs, and a row
  // that promises a list and gives none. 7a refused a described number, a dangling citation and an
  // unfilled slot; neither of these shapes was in it.
  const COUNT = /\b(?:can take|makes|uses|has)\s+\d+\s*\(\s*\d+d\d+[^)]*\)\s*(?:Legendary Actions?|uses?|times?|attacks?)/i;
  const PROMISES = /\b(?:from the options below|one of the following|listed below|from the list below|choose from the options)\b/i;
  // a list may be INLINE after a colon (print's Half-Dragon) as well as on its own lines
  const HAS_LIST = /[.:]\s*\n|\n\s*[-*\d]|\b\d\s*—\s*|:\s*[^.\n]*,[^.\n]*(?:,|\bor\b)/;

  test('the row the critic flagged is refused on both counts', () => {
    const t = "Thornback can take 14 (4d6) Legendary Actions after another creature's turn, choosing from the options below.";
    expect(COUNT.test(t)).toBe(true);
    expect(PROMISES.test(t) && !HAS_LIST.test(t)).toBe(true);
  });

  test("and print's own rows are not — this is the test that matters", () => {
    let listRows = 0, flagged = [];
    for (const m of PRINT) {
      for (const r of Object.values(m.sections ?? {}).flat()) {
        const t = String(r.text ?? '');
        if (COUNT.test(t)) flagged.push(`${m.name} / ${r.name} (count)`);
        if (PROMISES.test(t)) { listRows++; if (!HAS_LIST.test(t)) flagged.push(`${m.name} / ${r.name} (list)`); }
      }
    }
    expect(listRows).toBeGreaterThan(20);   // print says "one of the following" often; the population is real
    expect(flagged).toEqual([]);            // and never with nothing below it, nor dice as a count
  });
});

describe('24 — the GM\'s weapon brings its own die and range', () => {
  test('the table knows a heavy crossbow from a light one', () => {
    expect(WEAPONS['heavy crossbow']).toMatchObject({ die: 10, range: '100/400' });
    expect(WEAPONS['light crossbow']).toMatchObject({ die: 8, range: '80/320' });
  });

  test('and the renamed LABEL does not — which is how "heavy" was lost', () => {
    // print's Goblin Boss Shortbow renamed "Crossbow": weaponFor reads the label, not the GM
    expect(weaponFor('Crossbow')).toBe('crossbow');
    expect(WEAPONS[weaponFor('Crossbow')].die).toBe(8);
  });

  test('the substitution keeps print\'s attack bonus and moves only the die and range', () => {
    const prop = WEAPONS['heavy crossbow'];
    const before = '*Ranged Attack Roll:* +4, range 80/320 ft. 6 (1d8 + 2) Piercing damage.';
    const after = before
      .replace(/(\d+) \((\d+)d(\d+)((?: [+-] \d+)?)\)/, (m0, avg, n, d, mod) => {
        const bonus = Number(String(mod || '').replace(/[^\d-]/g, '') || 0);
        return `${Math.floor((Number(n) * (prop.die + 1)) / 2) + bonus} (${n}d${prop.die}${mod})`;
      })
      .replace(/range \d+\/\d+ ft\./, `range ${prop.range} ft.`);
    expect(after).toBe('*Ranged Attack Roll:* +4, range 100/400 ft. 7 (1d10 + 2) Piercing damage.');
  });
});

describe('26 — an alias\'s signature is its own clause', () => {
  test('seven aliases carry one, and it is additive — the text is untouched', () => {
    const withSig = PI_ALIASES.filter((a) => a.signature);
    expect(withSig.length).toBeGreaterThanOrEqual(7);
    for (const a of withSig) {
      expect(a.text).toBeTruthy();
      expect(a.signature).not.toBe(a.text);
      expect(a.signature.length).toBeGreaterThan(15);
    }
  });

  test('substitution still reads as ONE sentence — the first cut broke this', () => {
    // splitting `text` into sentences produced "...devours its brain that lost its tentacles"
    const r = rewritePI('a mind flayer that lost its tentacles and fights with a sword');
    expect(r.text).not.toMatch(/\.\s+[A-Z][^.]*that lost its tentacles/);
    expect(r.text.split('.').filter((x) => x.trim()).length).toBe(1);
  });

  test("and the text still carries the words routing matches on — the second cut broke this", () => {
    // shortening the beholder to a bare body sent it to a brute seat
    const beholder = PI_ALIASES.find((a) => a.keys.includes('beholder'));
    expect(beholder.text).toMatch(/ray/i);
    expect(PI_ALIASES.find((a) => a.keys.includes('displacer beast')).text).toMatch(/appears a few feet/i);
  });

  test('the hit carries the signature so the concept can append it', () => {
    const [hit] = piAliasesIn('displacer beast');
    expect(hit.signature).toMatch(/illusion|appears a few feet/i);
  });
});
