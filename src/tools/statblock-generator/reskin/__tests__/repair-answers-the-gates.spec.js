// A REPAIR ANSWERS TO THE GATES ITS ROW ALREADY ANSWERED TO (owner's ruling 2026-11-11, item H8:
// the end of the line polishes — and "I don't want to lose brand new rows if they are good", so the
// writer is KEPT and its output is checked).
//
// Measured over the 318 sheets since the repair call started landing: a repaired free row sits on a
// FAILing row 5.1% of the time (3 of 59) against 1.9% for every other non-print row — and all three
// broke a DIFFERENT gate from the one that sent them: name-mechanic, save-fit, grapple-no-escape.
// The repair path validated three things (not empty, no raw token, no dangling reference) and the
// row it replaced had satisfied the save table, the name-claim reader and the relation record.
//
// The refusal is a closure inside generateReskin, so this pins the two readers it is MADE of,
// against the rows that actually shipped broken, plus the end-to-end behaviour through checkBlock.
import { saveStatsFor } from '@/tools/statblock-generator/reskin/templates.mjs';
import { mechanicUnkept } from '@/tools/statblock-generator/reskin/name-claims.mjs';
import { damageIsThePoint, imposedConditions } from '@/tools/statblock-generator/reskin/author.mjs';
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';

// the engine's own refusal, composed exactly as the call site composes it
const wouldBreak = (row) => {
  const sv = /\*?([A-Z][a-z]+) Saving Throw/.exec(row?.text ?? '');
  if (sv) {
    const want = saveStatsFor({ imposes: imposedConditions(row)[0] ?? null, damageDominant: damageIsThePoint(row), movement: !!row.imposesMovement });
    if (want.length && !want.includes(sv[1])) return `roll a ${sv[1]} save for an effect that calls for ${[...new Set(want)].join(' or ')}`;
  }
  const unkept = mechanicUnkept(String(row?.name ?? '').replace(/ \(.*\)$/, ''), row?.text ?? '');
  if (unkept) return `leave the name promising ${unkept} the text lacks`;
  return null;
};

// the two repaired rows that shipped broken, verbatim off their sheets
const brokenGroundSlam = { name: 'Broken-Ground Slam (Recharge 5-6)', imposes: 'Prone', freeRowRepaired: true,
  text: '*Strength Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* 21 (6d6) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage only.' };

describe('a repair that would break a gate is not a repair', () => {
  test('the save-stat table catches the cone that rolled Strength for 6d6', () => {
    expect(wouldBreak(brokenGroundSlam)).toMatch(/roll a Strength save/);
  });

  test('and the same row, re-rolled on a stat the table allows, is accepted', () => {
    const ok = { ...brokenGroundSlam, text: brokenGroundSlam.text.replace('Strength Saving', 'Dexterity Saving') };
    expect(wouldBreak(ok)).toBeNull();
  });

  // the second of the three, verbatim: a repaired row named "Grip" whose text grapples nobody
  test('a name that promises what the text lacks is refused', () => {
    const mirefastGrip = { name: 'Mirefast Grip', imposes: 'Restrained',
      text: '*Strength Saving Throw*: DC 16, one creature within 10 feet. *Failure:* The target is pulled up to 10 feet straight toward the lurker, and the target has the Restrained condition until the end of its next turn.' };
    expect(wouldBreak(mirefastGrip)).toMatch(/name promising the Grappled condition/);
    // and it passes once the text delivers what the name says
    expect(wouldBreak({ ...mirefastGrip, text: mirefastGrip.text.replace('the Restrained condition until the end of its next turn', 'the Grappled condition (escape DC 13)') })).toBeNull();
  });

  // the refusal must not swallow the ordinary case, or every repair declines and the flagged row
  // stands forever — "a flagged row beats no row" is still the rule
  test('an ordinary repaired row passes', () => {
    expect(wouldBreak({ name: 'Silt Cloak', text: 'While the creature is in mud or shallow water, it has Advantage on Dexterity (Stealth) checks.' })).toBeNull();
    expect(wouldBreak({ name: 'Reeking Hide', imposes: 'Poisoned', text: '*Constitution Saving Throw*: DC 13, each creature within 10 feet. *Failure:* The target has the Poisoned condition until the end of its next turn.' })).toBeNull();
  });

  // and the gate it answers to is the checker's own: the refused row really does fail a block
  test('the row it refuses is a row the checker fails', () => {
    const block = { name: 'Ridge Stalker', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned', ac: 15, hp: 85, hp_formula: '10d10 + 30', speed: '40 ft.',
      stats: { STR: 18, DEX: 14, CON: 16, INT: 3, WIS: 12, CHA: 10 }, saves: {}, skills: '', senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'None',
      initiative_bonus: 2, initiative_score: 12, cr: 5, cr_str: '5', pb: 3, xp: 1800, generation: { donor: 'brute-5' },
      sections: { Traits: [], Actions: [
        { name: 'Multiattack', text: 'The stalker makes two Claw attacks.' },
        { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' },
        brokenGroundSlam,
      ] } };
    const fails = Object.values(checkBlock(block).gates).flatMap((g) => g.findings ?? []).filter((f) => f.severity === 'fail').map((f) => f.rule);
    expect(fails).toContain('save-fit');
  });
});
