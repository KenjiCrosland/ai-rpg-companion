/**
 * A SAVE A GM CANNOT ROLL IS BROKEN TEXT (owner's ruling, 2026-11-13).
 *
 * Two shapes reached cards before this lint existed, and neither the checker nor the
 * audit could see either:
 *
 *   (a) a DC with no ability named beside it. OUR OWN CORPUS shipped this — the
 *       Stone Giant's Deflect Missile came out of the vendored SRD markdown with its
 *       *Dexterity Saving Throw* and *Failure* labels stripped, and the row is pasted
 *       verbatim onto anything borrowing that body.
 *   (b) a save that names a DC and then stops. The monk kit's Stunning Strike is
 *       welded onto a melee row; the print-canon rename strips the clause naming the
 *       condition and leaves the frame, so the row ends "...the target is subjected
 *       to the following effect. Constitution Saving Throw: DC 14." Three monks of
 *       three shipped it on the GM forty of 2026-11-13.
 *
 * The rule is structural: it reads the grammar of rendered rules text and never what
 * a row means. Measured at ZERO findings across all 329 print monsters before it
 * shipped — print writes four things that look like this and are not.
 *
 * IT IS NOT IN THE `unfinished-text` FAMILY, deliberately. Those findings DELETE the
 * row. That is right when the broken save is the whole row, and wrong when it rides a
 * complete attack: shipped as `unfinished-text`, this rule removed the monk's Unarmed
 * Strike outright — attack roll, damage and all — which `pipelines.spec` caught. A
 * monk with no melee attack is worse than a monk with a dangling save.
 */
import { lintStatblock } from '@/tools/statblock-generator/format-2024/lint.mjs';
import srd from '@/data/srd52-monsters.json';

const lintRow = (text) => lintStatblock(
  { name: 'Test', cr: 5, sections: { Actions: [{ name: 'Row', text }] } },
  { edition: '2024' },
).findings.filter((f) => f.rule === 'save-unrollable');

describe('a save a GM can roll', () => {
  test('a DC with no ability named beside it is broken text (the Stone Giant, as the corpus shipped it)', () => {
    const f = lintRow("*Trigger:* The giant is hit by a ranged attack roll. *Response:* The giant reduces the damage, and if that damage is reduced to 0, the giant can redirect some of the attack's force. DC 17, one creature the giant can see within 60 feet. 11 (1d10 + 6) Force damage.");
    expect(f).toHaveLength(1);
    expect(f[0].message).toMatch(/names no saving throw/);
    expect(f[0].severity).toBe('audit');
  });

  test('a save that names a DC and then stops is broken text (the monk rider, 3 of 3 monks)', () => {
    const f = lintRow('Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. Once on each of its turns when it hits with this attack, the target is subjected to the following effect. *Constitution Saving Throw*: DC 14.');
    expect(f).toHaveLength(1);
    expect(f[0].message).toMatch(/no outcome/);
  });

  // THE FOUR THINGS PRINT WRITES THAT LOOK LIKE THIS AND ARE NOT.
  test.each([
    ['the repaired row, 2024 form', "*Response:* the giant can redirect some of the attack's force. *Dexterity Saving Throw*: DC 17, one creature the giant can see within 60 feet. *Failure:* 11 (1d10 + 6) Force damage."],
    ['2014 prose, the stat named AFTER the DC', 'One creature Bob can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.'],
    ["print's two-stage form, which carries no colons", '*Constitution Saving Throw*: DC 13, each creature in a 30-foot Cone. *First Failure* The target has the Restrained condition. *Second Failure* The target has the Petrified condition.'],
    ['a row naming another row\'s save, with a CHECK DC of its own (Gelatinous Cube)', "The cube fills its entire space. A creature that enters is subjected to the cube's Engulf and has Disadvantage on the saving throw. As an action, a creature within 5 feet can pull a creature out by succeeding on a DC 12 Strength (Athletics) check."],
    ['a spell save DC', 'The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 15): At Will: Mage Hand'],
    ['an escape DC', 'The target has the Grappled condition (escape DC 14).'],
  ])('does not flag %s', (_label, text) => {
    expect(lintRow(text)).toHaveLength(0);
  });

  // 2014 STATES ITS OUTCOME INLINE, AND IN MANY SHAPES. "to avoid the rust monster's
  // touch", "or be knocked prone", "taking 13 damage on a failed save" — enumerating
  // those would be the word list this engine does not write, so the outcome arm judges
  // the LABELLED skeleton only, where there is exactly one place for the outcome.
  // The item 2 review caught this arm flagging the Rust Monster, whose outcome is
  // perfectly well stated.
  test.each([
    ["2014's infinitive outcome (Rust Monster, Antennae)", 'If the object is being worn or carried by a creature, the creature can make a DC 11 Dexterity saving throw to avoid the rust monster\'s touch.'],
    ['2014 prose with the stat after the DC and no label at all', 'Each creature in the area must make a DC 15 Dexterity saving throw, taking 22 (4d10) fire damage on a failed save, or half as much on a successful one.'],
  ])('does not flag %s', (_label, text) => {
    expect(lintRow(text)).toHaveLength(0);
  });

  test('ZERO findings across every print row — print overrules the rule', () => {
    const monsters = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd));
    const offenders = [];
    for (const m of monsters) {
      const findings = lintStatblock({ ...m, sections: m.sections ?? {}, cr: Number(m.cr) }, { edition: '2024' })
        .findings.filter((f) => f.rule === 'save-unrollable');
      for (const f of findings) offenders.push(`${m.name}: ${f.message}`);
    }
    expect(offenders).toEqual([]);
    expect(monsters.length).toBeGreaterThan(300); // the sweep actually ran
  });
});
