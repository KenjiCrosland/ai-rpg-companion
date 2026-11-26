/**
 * PART B — A ROW WRITTEN FOR A TYPED ASK IS NOT CUT (Fable's round one, 2026-11-25).
 *
 * The owner's ruling of 25 November: the row budget limits only rows the engine invents. On gm40
 * the budget took Snarling Commands (s21, "fights harder when low on health") and Scripted Echo
 * (s22) at ship. These assert on the sheet `settleSheetBudgets` leaves behind.
 */
import { settleSheetBudgets, isTypedAskRow } from '../generate.mjs';

const TYPED = { id: 'c1', text: 'fights harder when low on health', kind: 'mechanical' };
const row = (name, over) => ({ name, text: `*Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target has the Prone condition.`, freeRow: true, ...over });
const namesOf = (sections) => Object.values(sections).flat().map((e) => e.name);
// print's card for CR 8 runs 3-5 rows, so a card must already carry its fixed rows for the budget
// to bite at all. These are the chassis's own, not free rows.
const FIXED = () => ({
  Actions: [
    { name: 'Multiattack', text: 'The creature makes two attacks.' },
    { name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage.' },
    { name: 'Hurl', text: '*Ranged Attack Roll:* +7, range 30/120 ft. 14 (3d6 + 4) Bludgeoning damage.' },
  ],
  Traits: [
    { name: 'Keen Smell', text: 'The creature has Advantage on Wisdom (Perception) checks that rely on smell.' },
    { name: 'Siege Monster', text: 'The creature deals double damage to objects and structures.' },
    { name: 'Pack Tactics', text: 'The creature has Advantage on an attack roll against a creature if at least one ally is within 5 feet of it.' },
  ],
});

const settle = (sections, clauses) => {
  settleSheetBudgets({ sections, printExact: false, scaled: { dc: 13, pb: 2 }, cr: 8,
    generation: { clauses }, noteDrop: () => {}, noteRemoval: () => {}, trace: () => {} });
  return sections;
};

describe('the predicate', () => {
  it('a row bound to a mechanical clause is protected, by any of the three bindings', () => {
    expect(isTypedAskRow(row('A', { clause: TYPED.text }), [TYPED])).toBe(true);
    expect(isTypedAskRow(row('A', { clauseId: 'c1' }), [TYPED])).toBe(true);
    expect(isTypedAskRow(row('A', { clauseIds: ['c1'] }), [TYPED])).toBe(true);
  });

  it('a row bound only to a descriptive clause is not', () => {
    expect(isTypedAskRow(row('A', { clause: 'a river spirit' }), [{ id: 'h', text: 'a river spirit', kind: 'descriptive', head: true }])).toBe(false);
  });

  it('and an unbound row is not', () => {
    expect(isTypedAskRow(row('A'), [TYPED])).toBe(false);
  });
});

describe('a card already at its row limit', () => {
  it('keeps the typed row and cuts the invented one', () => {
    const sections = FIXED();
    sections.Traits.push(row('Snarling Commands', { clause: TYPED.text, template: null }));
    sections['Bonus Actions'] = [row('Invented Flourish', { template: 'flourish' })];
    settle(sections, [TYPED]);
    const names = namesOf(sections);
    expect(names).toContain('Snarling Commands');
    expect(names).not.toContain('Invented Flourish');
  });

  it('keeps EVERY typed row, even past the allowance', () => {
    // the case the guard governs rather than the ordering: three typed rows on a card whose
    // free-row allowance is one. The ordering alone would keep the first and cut the other two.
    const T2 = { id: 'c2', text: 'pulls a victim under', kind: 'mechanical' };
    const T3 = { id: 'c3', text: 'howls to call the pack', kind: 'mechanical' };
    const sections = FIXED();
    sections.Traits.push(row('Snarling Commands', { clause: TYPED.text }));
    sections.Traits.push(row('Dragging Pull', { clause: T2.text }));
    sections['Bonus Actions'] = [row('Pack Howl', { clause: T3.text })];
    settle(sections, [TYPED, T2, T3]);
    const names = namesOf(sections);
    expect(names).toContain('Snarling Commands');
    expect(names).toContain('Dragging Pull');
    expect(names).toContain('Pack Howl');
  });

  it('cuts as it does today when no ask is typed', () => {
    const sections = FIXED();
    sections.Traits.push(row('Invented One', { template: 'one' }));
    sections['Bonus Actions'] = [row('Invented Two', { template: 'two' })];
    settle(sections, []);
    // with nothing typed, the budget cuts as it does today: not both free rows survive
    const kept = namesOf(sections).filter((n) => /^Invented/.test(n));
    expect(kept.length).toBeLessThan(2);
  });
});
