/**
 * ONE WAY TO READ A CITATION (fault 2, owner 2026-11-20).
 *
 * Print writes the replacement clause in three forms. The sync knew one of them — it anchored on
 * "use of <name>" — so in the lettered form, where the name is preceded by "(A) ", nothing
 * matched. The Leviathan shipped "(A) Gravewake (Recharge 5-6)" over a row named "Gravewake",
 * which is the Brass Tyrant's mismatch of 18 November returning through the form the fix did not
 * read. The owner graded that a Fix the first time.
 *
 * One reader for all three forms, used by the sync and by the `citation-gate-mismatch` lint.
 */
import { syncMultiattackCitations } from '../generate.mjs';
import { citationsIn } from '../templates.mjs'; // the one reader lives where both the sync and the lint can see it
import srd from '@/data/srd52-monsters.json';

const ma = (sections) => Object.values(sections).flat().find((r) => /^Multiattack/.test(r.name));
const leviathan = (clause) => ({
  Actions: [
    { name: 'Multiattack', text: `The leviathan makes two Flukes attacks. It can replace one attack with ${clause}` },
    { name: 'Flukes', text: '*Melee Attack Roll:* +11, reach 15 ft. 21 (3d8 + 8) Bludgeoning damage.' },
    { name: 'Gravewake', text: '*Strength Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 18 (4d8) Thunder damage, and the target is pulled up to 30 feet.' },
    { name: 'Drowning Hymn (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 19, each creature in a 30-foot Emanation. *Failure:* 78 (12d12) Thunder damage, and the target has the Deafened condition.' },
  ],
});

describe('the reader sees all three forms', () => {
  test('plain', () => {
    const c = citationsIn('It can replace one attack with a use of Gravewake.');
    expect(c).toHaveLength(1);
    expect([c[0].name, c[0].letter]).toEqual(['Gravewake', null]);
  });

  test('"X or Y"', () => {
    const c = citationsIn('It can replace one attack with a use of Gravewake or Drowning Hymn.');
    expect(c.map((x) => x.name)).toEqual(['Gravewake', 'Drowning Hymn']);
  });

  test('THE LETTERED LIST — the form the sync could not see', () => {
    const c = citationsIn('It can replace one attack with a use of (A) Gravewake (Recharge 5-6) or (B) Spellcasting to cast *Thunderwave*.');
    expect(c).toHaveLength(2);
    expect([c[0].letter, c[0].name, c[0].gate]).toEqual(['A', 'Gravewake', 'Recharge 5-6']);
    expect([c[1].letter, c[1].name]).toEqual(['B', 'Spellcasting to cast *Thunderwave*']);
  });
});

describe('the sync carries the row\'s own gate into each form', () => {
  test('PLAIN: a row that lost its Recharge is cited bare', () => {
    const s = leviathan('a use of Gravewake (Recharge 5-6).');
    expect(ma(s).text).toContain('(Recharge 5-6)');            // the defect is present
    syncMultiattackCitations(s);
    expect(ma(s).text).toContain('a use of Gravewake.');
    expect(ma(s).text).not.toContain('Gravewake (Recharge 5-6)');
  });

  test('"X OR Y": each side takes its own row\'s gate', () => {
    const s = leviathan('a use of Gravewake (Recharge 5-6) or Drowning Hymn.');
    syncMultiattackCitations(s);
    expect(ma(s).text).toContain('a use of Gravewake or Drowning Hymn if available.');
  });

  test('THE LETTERED LIST: the letter is kept and the stale gate goes — s20', () => {
    const s = leviathan('a use of (A) Gravewake (Recharge 5-6) or (B) Spellcasting to cast *Thunderwave*.');
    expect(ma(s).text).toContain('(A) Gravewake (Recharge 5-6)');   // the shipped defect
    syncMultiattackCitations(s);
    expect(ma(s).text).toContain('a use of (A) Gravewake or (B) Spellcasting to cast *Thunderwave*.');
    expect(citationsIn(ma(s).text)[0].gate).toBeNull();
  });

  test('a GATED row gains "if available" in the lettered form too', () => {
    const s = leviathan('a use of (A) Drowning Hymn or (B) Spellcasting to cast *Thunderwave*.');
    syncMultiattackCitations(s);
    expect(ma(s).text).toContain('(A) Drowning Hymn if available');
  });
});

describe('and print is not rewritten', () => {
  test("every citation print writes already reads as this pass would leave it", () => {
    const rowsOf = (mo) => Object.values(mo.sections ?? {}).flat().filter((r) => r?.name);
    let checked = 0;
    for (const mo of srd.filter((x) => x?.sections)) {
      const rows = rowsOf(mo);
      const line = rows.find((r) => /^Multiattack/.test(r.name));
      if (!line) continue;
      for (const c of citationsIn(line.text)) {
        const row = rows.find((r) => String(r.name).replace(/ \(.*\)$/, '').toLowerCase() === c.name.toLowerCase());
        if (!row) continue;
        checked += 1;
        expect([mo.name, c.name, c.gate]).toEqual([mo.name, c.name, null]);   // print never writes the parenthetical
      }
    }
    expect(checked).toBeGreaterThan(0);                                        // the subject is present
  });
});
