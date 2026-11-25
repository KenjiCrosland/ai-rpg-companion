import { isPlaceholderRowName, PLACEHOLDER_ROW_NAMES, valueCheck } from '../templates.mjs';
import { lintSheet } from '../sheet-lints.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { to2014Grammar } from '../../format-2024/generate.mjs';

// N4 — the four things the critic's read of forty #1 found, each pinned against
// the sheet it was found on (`sweep-2026-11-02T01-24-00`).

describe('a placeholder is not a name (Rivenhearted Glacier, S0)', () => {
  test('the catalog list is shared, and reads a gate suffix off', () => {
    expect(PLACEHOLDER_ROW_NAMES).toContain('Composed Row');
    expect(isPlaceholderRowName('Composed Row')).toBe(true);
    expect(isPlaceholderRowName('composed row (Recharge 5-6)')).toBe(true);
    expect(isPlaceholderRowName('Frozen Ground')).toBe(false);
    expect(isPlaceholderRowName(null)).toBe(false);
  });
  test('the lint fires on the row the glacier shipped', () => {
    const sheet = { format: '2024', sections: { Traits: [{ name: 'Composed Row', text: 'The ground in a 10-foot radius originating from the glacier is Difficult Terrain.', template: 'composed:zone:terrain' }] } };
    const hits = lintSheet(sheet).filter((h) => h.rule === 'placeholder-row-name');
    expect(hits).toHaveLength(1);
    expect(hits[0].message).toMatch(/placeholder name shipped as a row name/);
  });
  test('and is silent on a row with a real name', () => {
    const sheet = { format: '2024', sections: { Traits: [{ name: 'Frozen Ground', text: 'The ground in a 10-foot radius originating from the glacier is Difficult Terrain.', template: 'composed:zone:terrain' }] } };
    expect(lintSheet(sheet).filter((h) => h.rule === 'placeholder-row-name')).toHaveLength(0);
  });
});

describe('one template, one mechanic (Sundering Shove on two sheets)', () => {
  const sheet = (cr, style, arch) => scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] });
  const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Slam attacks.' }, { name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage.' }] };
  // ENCODED: the ladder declared when it WIDENED a row to an area, so the rename could not hand a
  // changed row the template's name (N4, 2 November). The lift is half a hit now (24 November) and
  // the mark is the same mark, for the same reason.
  test('the value ladder declares when it changed the row\'s mechanic', () => {
    const row = { name: 'Battering Charge', text: '*Strength Saving Throw:* DC 16, one creature within 5 feet. *Failure:* The target is pushed up to 15 feet away from the creature and has the Prone condition.' };
    const vc = valueCheck(row, { scaled: sheet(8, null, 'brute'), sections, cr: 8, section: 'Actions', template: 'push-prone', hitType: 'Bludgeoning' });
    expect(vc.steps.join(' ')).toMatch(/half a hit added: \d+ \(\d+d\d+\) Bludgeoning damage/);
    expect(vc.widened).toBe(true);            // the field the rename reads
    expect(vc.text).toMatch(/one creature within 5 feet/);
    expect(vc.text).not.toMatch(/Cone/);
  });
  test('a row it did NOT widen declares nothing', () => {
    const row = { name: 'Heavy Swing', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage.' };
    const vc = valueCheck(row, { scaled: sheet(8, null, 'brute'), sections, cr: 8, section: 'Actions' });
    expect(vc.widened).toBeUndefined();
  });
});

describe('the 2014 converter closes its own seams', () => {
  test('a label becomes a clause, so the next word stops being sentence-initial', () => {
    // the Bog Hound and the Drowned Nave Choir, verbatim from forty #1
    expect(to2014Grammar('*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* Until the start of the hound\'s next turn, the target has Disadvantage on attack rolls.'))
      .toMatch(/On a failed save, until the start/);
    expect(to2014Grammar('*Charisma Saving Throw*: DC 15, any creature. *Failure:* While within the aura, the target cannot lie.'))
      .toMatch(/On a failed save, while within the aura/);
  });
  test('but a proper noun keeps its capital', () => {
    expect(to2014Grammar('*Dexterity Saving Throw*: DC 15, one creature. *Failure:* Vashka pushes the target 10 feet.'))
      .toMatch(/On a failed save, Vashka pushes/);
  });
  test('a doubled label is a seam, not a sentence (the Vampire\'s Bite)', () => {
    const out = to2014Grammar('One creature must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) Piercing damage on a failed save. *Failure:* plus 13 (3d8) Necrotic damage.');
    expect(out).toMatch(/on a failed save, plus 13 \(3d8\) necrotic damage/);
    expect((out.match(/on a failed save/gi) ?? []).length).toBe(1);
  });
  test('and the ordinary two-branch save still reads as print 2014 writes it', () => {
    expect(to2014Grammar('*Dexterity Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* 28 (8d6) Fire damage. *Success:* Half damage.'))
      .toBe('Each creature in a 30-foot cone must make a DC 15 Dexterity saving throw, taking 28 (8d6) fire damage on a failed save, or half as much damage on a successful one.');
  });
});

// R3b — a borrowed row answers to print's MEDIAN for the band, not its p90.
// Owner's ruling 2026-11-01 ("reverse it") applies to DEFAULT rows only, and the
// 10-29 ruling still protects a row the call chose. The two meet at rank 3:
// `accepted_closest` is the refused-nearest row the owner called out by name
// ("refusals lead to sameness because we borrow a stock row from the chassis"),
// and 14 of the 19 receiptless rows on forty #1 carry exactly that stamp.
describe('a borrowed row tracks print\'s median', () => {
  const { settleSheetBudgets } = require('../generate.mjs');
  const fixed = (n) => Array.from({ length: n }, (_, i) => ({ name: `Fixed ${i + 1}`, text: `*Melee Attack Roll:* +4, reach 5 ft. 7 (1d8 + 3) Slashing damage.` }));
  const borrowed = (name) => ({ name, text: 'The creature emanates an aura in a 20-foot Emanation. *Wisdom Saving Throw*: DC 12. *Failure:* The target has the Frightened condition.', freeRow: true, accepted_closest: true, template: 'fear-aura' });

  test('a CR 2 card already at print\'s median keeps no borrowed row', () => {
    // print's median at CR 0-2 is 2 rows (non-legendary, Multiattack excluded)
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Claw attacks.' }, ...fixed(2)], Traits: [borrowed('Fear Aura')] };
    settleSheetBudgets({ sections, cr: 2 });
    expect(sections.Traits.map((e) => e.name)).not.toContain('Fear Aura');
  });

  test('a thin CR 2 card still gets one — the floor is not touched', () => {
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Claw attacks.' }, ...fixed(1)], Traits: [borrowed('Fear Aura')] };
    settleSheetBudgets({ sections, cr: 2 });
    expect(sections.Traits.map((e) => e.name)).toContain('Fear Aura');
  });

  test('and a row with the GM\'s own quote is never cut by it', () => {
    const asked = { ...borrowed('Rime-Shedding Hide'), accepted_closest: false, gmQuote: 'a frost-rimed hide' };
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Claw attacks.' }, ...fixed(4)], Traits: [asked] };
    settleSheetBudgets({ sections, cr: 2 });
    expect(sections.Traits.map((e) => e.name)).toContain('Rime-Shedding Hide');
  });
});
