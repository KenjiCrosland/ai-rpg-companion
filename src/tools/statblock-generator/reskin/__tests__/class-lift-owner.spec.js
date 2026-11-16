// A CLASS LIFT BELONGS TO ITS CLASS (item 27, 2026-11-10).
//
// The class-NPC path stands a class on a print donor chosen by FUNCTION, and several classes share
// a donor — classes.mjs gives the Spy to rogue, monk and bard alike. Print's own rows then land on
// the sheet as canon, so both monks in the 2026-11-09 forty shipped the Spy's Cunning Action, a row
// the catalog itself assigns to the rogue. `classLiftOwner` is the predicate the print-canon row
// pass consults to withhold a lift the sheet's own class does not own.
//
// This imports the real helper and the real catalog on purpose: a spec that re-implements the
// predicate passes while the engine ships the bug (the header-speed spec's own lesson).
import { classLiftOwner, CLASSES } from '@/tools/statblock-generator/reskin/classes.mjs';

describe('classLiftOwner', () => {
  it('names the class that claims an SRD lift', () => {
    expect(classLiftOwner('Cunning Action')).toBe('rogue');
    expect(classLiftOwner('Bloodied Frenzy')).toBe('barbarian');
    expect(classLiftOwner('Protective Magic')).toBe('mage');
    expect(classLiftOwner('Divine Aid')).toBe('cleric');
  });

  it('reads through a gate in the row name, which is how print writes it', () => {
    expect(classLiftOwner('Misty Step (3/Day)')).toBe('mage');
    expect(classLiftOwner('Cunning Action (Bonus Action)')).toBe('rogue');
  });

  it('gives a FUNCTION row no owner, so a shared template still rides', () => {
    // fighter.rows carries shield-bash and riposte as templates, not lifts: the Gladiator's own
    // Shield Bash is why a war chief on that body keeps it.
    expect(classLiftOwner('Shield Bash')).toBeNull();
    expect(classLiftOwner('Riposte')).toBeNull();
  });

  it('gives an ordinary print row no owner', () => {
    expect(classLiftOwner('Mace')).toBeNull();
    expect(classLiftOwner('Spellcasting')).toBeNull();
    expect(classLiftOwner('Multiattack')).toBeNull();
  });

  it('answers null for nothing rather than throwing', () => {
    expect(classLiftOwner('')).toBeNull();
    expect(classLiftOwner(undefined)).toBeNull();
    expect(classLiftOwner(null)).toBeNull();
  });

  it('withholds exactly the rows the 11-09 forty got wrong, and keeps the ones it got right', () => {
    // [declared class, print row the donor brought, should it be withheld]
    const cases = [
      ['monk', 'Cunning Action', true],        // Vaskis, Cinder — on the Spy. The defect.
      ['bard', 'Cunning Action', true],        // the Spy is the bard's body too
      ['rogue', 'Cunning Action', false],      // Thessaly — the rogue's own
      ['mage', 'Misty Step (3/Day)', false],   // Vexmoor, Grizzelda — B2's gated row
      ['mage', 'Protective Magic', false],     // Grizzelda — item 23's canary
      ['cleric', 'Divine Aid', false],         // Maudra, Mother Ash, Hollow Cardinal
      ['fighter', 'Shield Bash', false],       // Grask, Vell, Orrin — a template, no owner
    ];
    for (const [declared, row, withheld] of cases) {
      const owner = classLiftOwner(row);
      expect(!!(owner && owner !== declared)).toBe(withheld);
    }
  });

  it('every lift in the catalog is claimed by exactly one class', () => {
    // two claimants would make the row nobody's identity and the predicate would go quiet —
    // this pins the catalog shape the rule depends on.
    const lifts = CLASSES.flatMap((c) => (c.rows ?? []).filter((r) => Array.isArray(r.srd)).map((r) => r.srd[1]));
    expect(lifts.length).toBeGreaterThan(0);
    for (const name of lifts) expect(classLiftOwner(name)).not.toBeNull();
  });
});
