import { renderForm, resolutionOf } from '../forms.mjs';
import { to2014Grammar } from '../../format-2024/generate.mjs';
import { attackRowsOf, checkBlock } from '../checker.mjs';

// THE FOUR FORMS (fidelity pipeline step 3): fields in, one sentence per edition out; the checker reads back the same numbers
describe('the four forms render to one sentence per edition', () => {
  test('an attack form: 2024 structured, 2014 classic, and the checker reads the same bonus and damage from the 2024 text', () => {
    const f = { kind: 'attack', bonus: 7, reach: '5', avg: 26, dice: '5d8 + 4', type: 'Slashing' };
    expect(renderForm(f, '2024')).toBe('*Melee Attack Roll:* +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.');
    expect(renderForm(f, '2014')).toBe('Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.');
    const r = attackRowsOf({ sections: { Actions: [{ name: 'Greatsword', text: renderForm(f, '2024') }] } })[0]; expect([r.atk, r.avg, r.bonus]).toEqual([7, 26, 4]);
    const h = { kind: 'attack', bonus: 7, reach: '5', range: '30/120', avg: 17, dice: '3d8 + 4', type: 'Bludgeoning', rider: 'and the target has the Prone condition.' };
    expect(renderForm(h, '2024')).toMatch(/^\*Melee or Ranged Attack Roll:\* \+7, reach 5 ft\. or range 30\/120 ft\. 17 \(3d8 \+ 4\) Bludgeoning damage, and the target has the Prone condition\.$/);
    expect(renderForm(h, '2014')).toMatch(/^Melee or Ranged Weapon Attack: \+7 to hit, reach 5 ft\. or range 30\/120 ft\., one target\. Hit: 17 \(3d8 \+ 4\) bludgeoning damage, and the target has the Prone condition\.$/);
  });
  test('a save form: the 2014 render is the same sentence the grammar pass makes from the 2024 render (canonSave2014 is the model)', () => {
    const f = { kind: 'save', stat: 'Dexterity', dc: 15, target: 'each creature in a 60-foot Cone', failure: '28 (8d6) Fire damage.', success: 'Half damage only.' };
    const t24 = renderForm(f, '2024'); expect(t24).toBe('*Dexterity Saving Throw*: DC 15, each creature in a 60-foot Cone. *Failure:* 28 (8d6) Fire damage. *Success:* Half damage only.');
    expect(renderForm(f, '2014')).toBe(to2014Grammar(t24));
    const c = { kind: 'save', stat: 'Wisdom', dc: 16, target: 'one creature within 60 feet', failure: 'The target has the Paralyzed condition until the end of its next turn.' };
    expect(renderForm(c, '2014')).toBe('One creature within 60 feet must make a DC 16 Wisdom saving throw. On a failed save, the target has the Paralyzed condition until the end of its next turn.');
  });
  test('a trait form with and without a trigger; a reaction form per edition', () => {
    expect(renderForm({ kind: 'trait', effect: 'the creature can breathe air and water' }, '2024')).toBe('The creature can breathe air and water.');
    expect(renderForm({ kind: 'trait', trigger: 'while the creature is in sunlight', effect: 'it has Disadvantage on attack rolls' }, '2024')).toBe('While the creature is in sunlight, it has Disadvantage on attack rolls.');
    expect(renderForm({ kind: 'reaction', trigger: 'the creature is hit by an attack roll', response: 'it gains a +5 bonus to AC until the start of its next turn' }, '2024')).toBe('*Trigger:* The creature is hit by an attack roll. *Response:* It gains a +5 bonus to AC until the start of its next turn.');
    expect(renderForm({ kind: 'reaction', trigger: 'the creature is hit by an attack roll', response: 'it gains a +5 bonus to AC until the start of its next turn' }, '2014')).toBe('The creature is hit by an attack roll, it gains a +5 bonus to AC until the start of its next turn.');
  });
});

describe('the adjudicability gate (fidelity pipeline step 3): one predicate, one hand-built violating row', () => {
  const base = () => ({ name: 'Ridge Stalker', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned', ac: 15, hp: 85, hp_formula: '10d10 + 30', speed: '40 ft.', stats: { STR: 18, DEX: 14, CON: 16, INT: 3, WIS: 12, CHA: 6 }, pb: 3, cr: 5, initiative_score: 12, senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'None',
    sections: { Traits: [], Actions: [{ name: 'Multiattack', text: 'The stalker makes two Claw attacks.' }, { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' }] } });
  const has = (b, rule) => checkBlock(b).gates.adjudicability.findings.some((f) => f.rule === rule && f.severity === 'fail');
  test('a trait that imposes a condition with no trigger, attack, or save fails resolution; the same text with a trigger passes; an action needs no trigger', () => {
    const t = base(); t.sections.Traits.push({ name: 'Dread', text: 'The target has the Frightened condition.' }); expect(has(t, 'adjudicable-resolution')).toBe(true);
    const ok = base(); ok.sections.Traits.push({ name: 'Dread', text: 'While a creature can see the stalker, it has the Frightened condition.' }); expect(has(ok, 'adjudicable-resolution')).toBe(false);
    const inc = base(); inc.sections.Traits.push({ name: 'Incorporeal Movement', text: 'The stalker can move through objects. It takes 5 (1d10) Force damage if it ends its turn inside an object.' }); expect(has(inc, 'adjudicable-resolution')).toBe(false);
    const act = base(); act.sections['Bonus Actions'] = [{ name: 'Venomed Edge', text: "The stalker coats its claws; its next Claw deals an extra 7 (2d6) Poison damage." }]; expect(has(act, 'adjudicable-resolution')).toBe(false);
  });
  test('a save whose target is neither a count nor an area fails; a count, an area, and "of its choice within N feet" pass; a mention of saving throws is not a save row', () => {
    const bad = base(); bad.sections.Actions.push({ name: 'Howl', text: '*Wisdom Saving Throw:* DC 14, the forest. *Failure:* 10 (3d6) Psychic damage.' }); expect(has(bad, 'adjudicable-target')).toBe(true);
    for (const target of ['one creature within 60 feet', 'each creature in a 30-foot Cone', 'each creature of its choice within 120 feet that can see it']) { const g = base(); g.sections.Actions.push({ name: 'Howl', text: `*Wisdom Saving Throw:* DC 14, ${target}. *Failure:* 10 (3d6) Psychic damage.` }); expect([target, has(g, 'adjudicable-target')]).toEqual([target, false]); }
    const mr = base(); mr.sections.Traits.push({ name: 'Magic Resistance', text: 'The stalker has Advantage on saving throws against spells and other magical effects.' }); expect(has(mr, 'adjudicable-target')).toBe(false); expect(has(mr, 'adjudicable-outcome')).toBe(false);
    expect(resolutionOf('The stalker has Advantage on saving throws against spells.')).toBe('passive');
  });
  test('a save with no stated outcome fails; "*Failure:*", "On a failed save", and "or be" pass', () => {
    const bad = base(); bad.sections.Actions.push({ name: 'Glare', text: '*Wisdom Saving Throw:* DC 14, one creature within 30 feet. The stalker stares.' }); expect(has(bad, 'adjudicable-outcome')).toBe(true);
    const l = base(); l.sections.Actions.push({ name: 'Glare', text: 'One creature within 30 feet must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its next turn.' }); expect(has(l, 'adjudicable-outcome')).toBe(false);
  });
  test('a row\'s flavor field is exempt from every predicate', () => {
    const b = base(); b.sections.Actions[1].flavor = 'The target has the Frightened condition, the forest must make a DC 99 save, and nothing has an outcome.'; expect(checkBlock(b).gates.adjudicability.status).toBe('ok');
  });
});

describe('a prose rider-save inside a trait becomes the skeleton (the authored Bag of Caltrops, step 5)', () => {
  test('"each creature within 5 feet must succeed on a DC 12 Dexterity saving throw or take …" renders as the structured save; a leading "The" after a trigger lowercases', () => {
    const t = renderForm({ kind: 'trait', trigger: 'when the scurrier is reduced to 0 Hit Points', effect: 'The bag bursts: each creature within 5 feet must succeed on a DC 12 Dexterity saving throw or take 3 (1d6) Piercing damage' }, '2024');
    expect(t).toBe('When the scurrier is reduced to 0 Hit Points, the bag bursts: *Dexterity Saving Throw*: DC 12, each creature within 5 feet. *Failure:* The target takes 3 (1d6) Piercing damage.');
  });
});
