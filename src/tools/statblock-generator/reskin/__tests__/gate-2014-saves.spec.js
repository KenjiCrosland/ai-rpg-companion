// 2014 GATES A CONDITION THE WAY ITS OWN BOOK DOES (owner's design, 2026-10-21).
//
// 2024 lets a condition ride a hit unqualified; 2014 almost always gates it, and
// WHICH gate depends on the condition. Measured across the SRD 5.1 corpus:
//
//   bodily    poisoned, paralyzed, unconscious, petrified -> a SAVING THROW,
//             23 of 24 rows (96%). Something happening inside the target.
//   restraint grappled, restrained -> an ESCAPE DC (25 of 30, 19 of 27), never
//             a save. An ongoing hold you keep trying to break.
//   knockdown prone -> a SAVING THROW, 14 of 19 (74%), escape DC in none.
//
// Our own 2014 printings measured 33% on bodily and 18% on prone against the
// book's 96% and 74% — an ungated "the target is paralyzed" was shipping on a
// 2014 sheet, materially stronger than anything in that book. Restraints already
// matched at 88%, because the engine computes escape DCs deliberately.
//
// It is a CLOSED TABLE keyed on the condition the row RECORDS, never a reading of
// its prose, and it runs in code rather than in the conversion call — that call
// is forbidden from changing mechanics ("rewrite ONLY the wording"), and this is
// a mechanical difference between the editions by design.
import { toLegacyModel } from '@/tools/statblock-generator/format-2024/generate.mjs';

const sheet = (rows) => ({
  name: 'X', type: 'Humanoid', size: 'Medium', alignment: 'Neutral', ac: 15, hp: 90, hp_formula: '12d8+36',
  speed: '30 ft.', stats: { STR: 18, DEX: 14, CON: 16, INT: 10, WIS: 12, CHA: 10 },
  saves: { STR: 4, DEX: 2, CON: 3, INT: 0, WIS: 1, CHA: 0 }, cr: 5, pb: 3, senses: '', languages: '—',
  sections: { Actions: rows }, immunities: '', resistances: '',
});
const render = (row) => toLegacyModel(sheet([row])).actions[0].description;
const hit = (cond, imposes) => ({ name: 'Strike', text: `*Melee Attack Roll:* +7, reach 5 ft. 9 (2d4 + 4) Piercing damage, and the target has the ${cond} condition.`, ...(imposes ? { imposes } : {}) });

describe('2014: a bodily condition on a hit gains the book\'s saving throw', () => {
  test('poisoned, paralyzed, unconscious and petrified all gate on Constitution', () => {
    for (const c of ['Poisoned', 'Paralyzed', 'Unconscious', 'Petrified']) {
      expect(render(hit(c, c))).toMatch(new RegExp(`must succeed on a DC \\d+ Constitution saving throw or be ${c.toLowerCase()}`));
    }
  });

  test("prone gates on Strength, in 2014's own phrasing", () => {
    const out = render(hit('Prone', 'Prone'));
    expect(out).toMatch(/must succeed on a DC \d+ Strength saving throw or be knocked prone/);
    expect(out).not.toMatch(/or be prone\b/);
  });

  test('the DC is derived the way the engine derives one: 8 + PB + the best mod', () => {
    // STR 18 (+4), PB 3 -> DC 15
    expect(render(hit('Poisoned', 'Poisoned'))).toMatch(/DC 15 /);
  });
});

describe('2014: the escape-DC family is never given a save', () => {
  test('grappled and restrained keep their escape DC and gain nothing', () => {
    for (const c of ['Grappled', 'Restrained']) {
      const row = { name: 'Coil', text: `*Melee Attack Roll:* +7, reach 10 ft. 9 (2d4 + 4) Bludgeoning damage, and the target has the ${c} condition (escape DC 13).`, imposes: c };
      const out = render(row);
      expect(out).toMatch(/escape DC 13/);
      expect(out).not.toMatch(/saving throw/);
    }
  });

  test('incapacitated is in the same family and is left alone', () => {
    expect(render(hit('Incapacitated', 'Incapacitated'))).not.toMatch(/saving throw/);
  });
});

describe('2014: the gate touches nothing it should not', () => {
  test('a row already gated is unchanged', () => {
    const row = { name: 'Sting', text: '*Melee Attack Roll:* +7. 7 (1d8 + 3) Piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned.', imposes: 'Poisoned' };
    expect(render(row)).toBe(row.text);
  });

  // CHANGED BY DESIGN (2026-10-21). This asserted that a row without a record is
  // left alone. Measured reach showed that meant the gate fired on 0 of 6 bodily
  // rows and 1 of 13 prone rows live — a correct rule limited by a data gap, not
  // by its own logic. The shared reader now falls back to parsing our own
  // canonical output, so a row with no record still gates. What it must NEVER do
  // is gate on a condition the row only REQUIRES, which is asserted below.
  test('a row with no record still gates, via the shared reader', () => {
    expect(render(hit('Poisoned', null))).toMatch(/must succeed on a DC \d+ Constitution saving throw or be poisoned/);
  });

  test('a condition the row only REQUIRES never gates — the distinction that matters', () => {
    const row = { name: 'Stomp', text: '*Melee Attack Roll:* +7. 11 (2d6 + 4) Bludgeoning damage, and extra damage if the target has the Prone condition.' };
    expect(render(row)).not.toMatch(/saving throw/);
  });

  test('a save-based row (no attack) is not the gate\'s business', () => {
    const row = { name: 'Spores', text: '*Constitution Saving Throw*: DC 13, each creature in a 10-foot Emanation. *Failure:* The target has the Poisoned condition.', imposes: 'Poisoned' };
    expect(render(row)).toBe(row.text);
  });
});
