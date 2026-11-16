// DID THIS REPAIR MAKE THE SHEET WORSE? (owner's ruling 2026-11-11 item H8, generalised 2026-11-12.)
//
// The first cut enumerated two gates — the save-stat table and the name-claim reader — because they
// were the two a repair had been measured breaking. The mole moved: a repaired row on the drowned
// coil eel broke `ko-ungated`, a third gate nobody had listed. Of 72 landed repairs across the saved
// runs, 6 shipped a row the checker fails and each broke a DIFFERENT gate than the one that sent it.
// So the repair site asks the one question that covers every gate, written and unwritten: does the
// sheet fail something it did not fail before?
//
// The comparison lives inside generateReskin (it closes over `monster`), so this pins the RULE it
// composes, against the rows that actually shipped broken, through the real `checkBlock`.
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';

const sheet = (rows) => ({
  name: 'Ridge Stalker', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned', ac: 15, hp: 85,
  hp_formula: '10d10 + 30', speed: '40 ft.', stats: { STR: 18, DEX: 14, CON: 16, INT: 3, WIS: 12, CHA: 10 },
  saves: {}, skills: '', senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'None',
  initiative_bonus: 2, initiative_score: 12, cr: 5, cr_str: '5', pb: 3, xp: 1800, generation: { donor: 'brute-5' },
  sections: { Traits: [], Actions: [
    { name: 'Multiattack', text: 'The stalker makes two Claw attacks.' },
    { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' },
    ...rows,
  ] },
});
const failsOf = (m) => new Set(Object.values(checkBlock(m).gates).flatMap((g) => g.findings ?? []).filter((f) => f.severity === 'fail').map((f) => f.rule));
// the rule, exactly as the repair site composes it
const makesItWorse = (rows, rowName, newText) => {
  const before = sheet(rows); const was = failsOf(before);
  const probe = JSON.parse(JSON.stringify(before));
  Object.values(probe.sections).flat().find((e) => e.name === rowName).text = newText;
  const gained = [...failsOf(probe)].filter((r) => !was.has(r));
  return gained.length ? gained.join(', ') : null;
};

describe('a repair that makes the sheet worse is not a repair', () => {
  const flagged = { name: 'Broken-Ground Slam (Recharge 5-6)', text: 'The stalker slams the ground and the earth shakes.' };

  // the two the first cut enumerated — still caught, now by the checker itself
  test('a cone that rolls the wrong save stat is refused', () => {
    expect(makesItWorse([flagged], flagged.name,
      '*Strength Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* 21 (6d6) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage only.')).toMatch(/save-fit/);
  });

  // A PRE-EXISTING FAILURE IS NOT THE REPAIR'S FAULT — and this is the comparison's real limit,
  // worth writing down: it catches what the repair ADDS, not what it leaves. `Mirefast Grip` was
  // already failing `name-mechanic` before its repair (the name promised a grapple its old text did
  // not have either), so a repair that still fails it is not "worse" and is not declined. That is
  // deliberate — the owner's rule is that a flagged row beats no row — but it means the enumerated
  // check caught one thing this does not. If leaving a pre-existing failure ever matters, the fix is
  // to require the sent-for gate to CLEAR, which is a different question from this one.
  test("a failure the row already had is not blamed on the repair", () => {
    const grip = { name: 'Mirefast Grip', text: 'The stalker tightens its hold.' };
    expect(failsOf(sheet([grip])).has('name-mechanic')).toBe(true);       // already failing
    expect(makesItWorse([grip], grip.name,
      '*Strength Saving Throw*: DC 16, one creature within 10 feet. *Failure:* The target is pulled up to 10 feet straight toward the stalker, and the target has the Restrained condition until the end of its next turn.')).toBeNull();
  });

  // THE POINT OF GENERALISING: a gate the enumeration never listed is caught by the same question.
  // (The live case was `ko-ungated` on the drowned coil eel; it needs that whole sheet to fire, so
  // this uses a gate that fires on a hand-built block — the mechanism is what is under test.)
  test('a gate nobody listed is caught the same way', () => {
    const row = { name: 'Silt Cloak', text: 'The stalker is dusty.' };
    const worse = makesItWorse([row], row.name,
      'A creature that touches the stalker has the Grappled condition until the end of its next turn.');
    expect(worse).toMatch(/grapple-no-escape/);                           // not save-fit, not name-mechanic
  });

  test('an ordinary repair passes, or every repair declines and the flagged row stands forever', () => {
    const hide = { name: 'Silt Cloak', text: 'The stalker is dusty.' };
    expect(makesItWorse([hide], hide.name, 'While the stalker is in mud or shallow water, it has Advantage on Dexterity (Stealth) checks.')).toBeNull();
  });

  // a sheet that ALREADY fails a gate must not have that held against the repair
  test('a FAIL the sheet already had is not blamed on the repair', () => {
    const bare = { name: 'Coat Lash', text: '*Strength Saving Throw*: DC 13, each creature within 5 feet. *Failure:* The target has the Grappled condition until the end of its next turn.' };
    const before = sheet([bare]);
    expect(failsOf(before).has('grapple-no-escape')).toBe(true);     // the sheet is already failing it
    expect(makesItWorse([bare], bare.name, '*Strength Saving Throw*: DC 13, each creature within 5 feet. *Failure:* The target has the Grappled condition until the end of its next turn, and is Prone.')).toBeNull();
  });
});
