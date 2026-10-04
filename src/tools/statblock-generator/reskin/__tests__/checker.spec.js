// THE MECHANICS CHECKER'S TESTS (owner's brief 2026-10-02): one test per predicate
// against a hand-built violating block, asserting the gate names the violation.
// No generated output here — the sweep is that.
import { sustainedOf, corpusAt, checkBlock, checkTable, GATES, effectiveHp } from '../checker.mjs';

const base = (over = {}) => ({
  name: 'Ridge Stalker', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned', ac: 15, hp: 85, hp_formula: '10d10 + 30', speed: '40 ft.',
  stats: { STR: 18, DEX: 14, CON: 16, INT: 3, WIS: 12, CHA: 10 }, saves: {}, skills: '', senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'None', initiative_bonus: 2, initiative_score: 12,
  cr: 5, cr_str: '5', pb: 3, xp: 1800, generation: { donor: 'brute-5' },
  sections: { Traits: [], Actions: [
    { name: 'Multiattack', text: 'The stalker makes two Claw attacks.' },
    { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' },
  ] },
  ...over,
});
const withRow = (sec, row, over = {}) => { const b = base(over); b.sections = { ...b.sections, [sec]: [...(b.sections[sec] ?? []), row] }; return b; };
const legacy = (over = {}, model = {}) => ({
  name: 'Ridge Stalker', format: '2014', type_and_alignment: 'Large beast, unaligned', armor_class: '15 (natural armor)', hit_points: '136 (16d10 + 48)', speed: '40 ft.',
  attributes: 'STR 18 (+4), DEX 14 (+2), CON 16 (+3), INT 3 (-4), WIS 12 (+1), CHA 10 (+0)', saving_throws: '', skills: '', senses: 'darkvision 60 ft., passive Perception 11', languages: '—',
  challenge_rating: '5 (1,800 XP)', proficiency_bonus: '+3', abilities: [], reactions: [], legendary_actions: [],
  actions: [{ name: 'Multiattack', description: 'The stalker makes two Claw attacks.' }, { name: 'Claw', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.' }],
  other_edition: base({ hp: 136, hp_formula: '16d10 + 48', sections: { Traits: [], Actions: [{ name: 'Multiattack', text: 'The stalker makes two Claw attacks.' }, { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 17 (3d8 + 4) Slashing damage.' }] }, ...model }),
  ...over,
});
const has = (res, gate, rule, severity) => res.gates[gate].findings.some((f) => f.rule === rule && (!severity || f.severity === severity));
const why = (res, gate) => res.gates[gate].findings.map((f) => `${f.severity}:${f.rule}`).join(', ');

describe('harness', () => {
  test('the clean block clears every gate: seven cells, each ok with a value-bearing finding list', () => {
    const res = checkBlock(base());
    expect(Object.keys(res.gates)).toEqual(GATES);
    for (const g of GATES) expect([g, res.gates[g].status, res.gates[g].findings.filter((f) => f.severity !== 'ok').map((f) => `${f.rule}: ${f.message}`)]).toEqual([g, 'ok', []]);
    expect(res.fails).toEqual([]);
  });
  test('the clean 2014 block clears every gate too', () => {
    const res = checkBlock(legacy());
    expect(res.edition).toBe('2014'); expect(res.fails).toEqual([]);
  });
  test('the table renders one row per block with a verdict and the fails sorted by seat', () => {
    const md = checkTable([checkBlock(base()), checkBlock(base({ hp: 90 }))]);
    expect(md).toMatch(/\| Ridge Stalker \| 5 \| 2024 \| brute-5 \|/); expect(md).toMatch(/\| clean \|/); expect(md).toMatch(/FAIL \(1\)/); expect(md).toMatch(/brute-5 \/ derivation: 1/);
  });
});

describe('derivation', () => {
  test('attack bonus that no stat derives', () => { const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +9, reach 10 ft. 20 (3d10 + 4) Slashing damage.'; expect(has(checkBlock(b), 'derivation', 'attack-bonus', 'fail')).toBe(true); });
  test('damage mod off the row stat; a print row is exempt', () => {
    const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 18 (3d10 + 2) Slashing damage.'; expect(has(checkBlock(b), 'derivation', 'damage-mod', 'fail')).toBe(true);
    b.sections.Actions[1].print = true; expect(has(checkBlock(b), 'derivation', 'damage-mod')).toBe(false);
  });
  test('DC two off the derived DC fails; one off is logged as the chassis float', () => {
    const b = withRow('Actions', { name: 'Roar', text: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* 7 (2d6) Thunder damage.' }); expect(has(checkBlock(b), 'derivation', 'dc', 'fail')).toBe(true);
    const c = withRow('Actions', { name: 'Roar', text: '*Wisdom Saving Throw*: DC 16, one creature within 30 feet. *Failure:* 7 (2d6) Thunder damage.' }); const r = checkBlock(c); expect(has(r, 'derivation', 'dc-float', 'ok')).toBe(true); expect(has(r, 'derivation', 'dc')).toBe(false);
  });
  test('escape DC off 8 + PB + STR', () => { const b = base(); b.sections.Actions[1].text += ' If the target is Medium or smaller, it has the Grappled condition (escape DC 14).'; expect(has(checkBlock(b), 'derivation', 'escape-dc', 'fail')).toBe(true); });
  test('a save that is neither mod nor mod + PB', () => { expect(has(checkBlock(base({ saves: { STR: 5 } })), 'derivation', 'save', 'fail')).toBe(true); expect(has(checkBlock(base({ saves: { STR: 7 } })), 'derivation', 'save')).toBe(false); });
  test('a skill off mod + PB (expertise allowed)', () => { expect(has(checkBlock(base({ skills: 'Perception +6', senses: 'darkvision 60 ft.; Passive Perception 16' })), 'derivation', 'skill', 'fail')).toBe(true); expect(has(checkBlock(base({ skills: 'Perception +7', senses: 'darkvision 60 ft.; Passive Perception 17' })), 'derivation', 'skill')).toBe(false); });
  test('passive Perception off 10 + Perception', () => { expect(has(checkBlock(base({ senses: 'darkvision 60 ft.; Passive Perception 15' })), 'derivation', 'passive', 'fail')).toBe(true); });
  test('initiative off the DEX mod', () => { expect(has(checkBlock(base({ initiative_bonus: 6 })), 'derivation', 'initiative', 'fail')).toBe(true); });
  test('HP off the formula, the bonus off Con × dice, the die off the size', () => {
    expect(has(checkBlock(base({ hp: 90 })), 'derivation', 'hp-formula', 'fail')).toBe(true);
    expect(has(checkBlock(base({ hp: 75, hp_formula: '10d10 + 20' })), 'derivation', 'hp-con', 'fail')).toBe(true);
    expect(has(checkBlock(base({ hp: 75, hp_formula: '10d8 + 30' })), 'derivation', 'hit-die', 'soft')).toBe(true);
  });
});

describe('bands', () => {
  test('damage drifted more than 20% under the aim is soft; under print is fail', () => {
    const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 14 (2d10 + 4) Slashing damage.'; expect(has(checkBlock(b), 'bands', 'aim-dpr', 'soft')).toBe(true);
    const c = base(); c.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 2 (1d4) Slashing damage.'; expect(has(checkBlock(c), 'bands', 'under', 'fail')).toBe(true); // print's band pools a CR either side, so the floor is print's lightest neighbour
  });
  test('HP under print at the CR is fail; under the aim alone is soft', () => {
    expect(has(checkBlock(base({ hp: 40, hp_formula: '5d10 + 15' })), 'bands', 'under', 'fail')).toBe(true);
    expect(has(checkBlock(base({ hp: 70, hp_formula: '8d10 + 24' })), 'bands', 'aim-hp', 'soft')).toBe(true);
  });
  test('a 2014 block under print\'s 2014 spread with the read at or under the CR is fail (the SRD 5.1 is the 2014 corpus)', () => { expect(has(checkBlock(legacy({ hit_points: '30 (4d10 + 8)' }, { hp: 30, hp_formula: '4d10 + 8' })), 'bands', 'under', 'fail')).toBe(true); });
  test('more than three CRs hot is fail', () => { const b = base({ cr: 1, cr_str: '1', pb: 2, hp: 136, hp_formula: '16d10 + 48' }); b.sections.Actions[1].text = '*Melee Attack Roll:* +6, reach 10 ft. 40 (8d8 + 4) Slashing damage.'; expect(has(checkBlock(b), 'bands', 'hot', 'fail')).toBe(true); });
  test('a nova over the cap', () => { expect(has(checkBlock(withRow('Actions', { name: 'Quake (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 15, each creature in a 20-foot Cone. *Failure:* 60 (11d10) Thunder damage. *Success:* Half damage.' })), 'bands', 'nova-cap', 'fail')).toBe(true); });
  test('one attack worth the whole budget beside a Multiattack is the ceiling', () => { const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 40 (8d8 + 4) Slashing damage.'; expect(has(checkBlock(b), 'bands', 'per-attack-ceiling', 'fail')).toBe(true); });
  test('a hit under a quarter share is the floor', () => { const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 4 (1d2 + 3) Slashing damage.'; expect(has(checkBlock(b), 'bands', 'per-attack-floor', 'soft')).toBe(true); });
  test('the legendary HP trade with no Legendary Actions section', () => { const b = base({ cr: 15, cr_str: '15', pb: 5, hp: 190, hp_formula: '20d10 + 80', stats: { STR: 22, DEX: 14, CON: 18, INT: 10, WIS: 12, CHA: 10 } }); b.sections.Actions[1].text = '*Melee Attack Roll:* +11, reach 10 ft. 36 (6d10 + 6) Slashing damage.'; expect(has(checkBlock(b), 'bands', 'legendary-hp-trade', 'soft')).toBe(true); });
});

describe('structure', () => {
  test('Multiattack naming a row that does not exist', () => { const b = base(); b.sections.Actions[0].text = 'The stalker makes two Bite attacks.'; expect(has(checkBlock(b), 'structure', 'multiattack-row', 'fail')).toBe(true); });
  test('a replacement clause naming a missing row', () => { const b = base(); b.sections.Actions[0].text = 'The stalker makes two Claw attacks. It can replace one attack with a use of Venom Spit.'; expect(has(checkBlock(b), 'structure', 'dangling-ref', 'fail')).toBe(true); });
  test('a legendary action naming a missing row', () => { expect(has(checkBlock(withRow('Legendary Actions', { name: 'Pounce', text: 'The stalker makes one Fang attack.' })), 'structure', 'dangling-ref', 'fail')).toBe(true); });
  test('two rows with one name', () => { expect(has(checkBlock(withRow('Actions', { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 9 (1d10 + 4) Slashing damage.' })), 'structure', 'duplicate-row', 'fail')).toBe(true); });
  test('a damage number with no dice', () => { expect(has(checkBlock(withRow('Actions', { name: 'Spit', text: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 12 Acid damage.' })), 'structure', 'diceless-damage', 'fail')).toBe(true); });
  test('a condition payoff nothing on the sheet produces', () => { expect(has(checkBlock(withRow('Actions', { name: 'Finish', text: '*Strength Saving Throw*: DC 15, one creature within 30 feet that has the Prone condition. *Failure:* 10 (3d6) Bludgeoning damage.' })), 'structure', 'payoff-producer', 'soft')).toBe(true); });
  test('an engulfer taking a creature larger than itself', () => { expect(has(checkBlock(withRow('Bonus Actions', { name: 'Swallow', text: 'The stalker swallows one Huge or smaller creature it is grappling.' })), 'structure', 'engulf-size', 'fail')).toBe(true); expect(has(checkBlock(withRow('Bonus Actions', { name: 'Swallow', text: 'The stalker swallows one Large or smaller creature it is grappling.' })), 'structure', 'engulf-size')).toBe(false); });
  test('a swarm that is not Medium fails; a swarm with a Multiattack is soft', () => {
    const r = checkBlock(base({ type: 'Swarm of Tiny Beasts', size: 'Large' })); expect(has(r, 'structure', 'swarm-size', 'fail')).toBe(true); expect(has(r, 'structure', 'swarm-multiattack', 'soft')).toBe(true);
    expect(has(checkBlock(base({ type: 'Swarm of Tiny Beasts', size: 'Large', monsterDescription: 'a vast swarm of rats' })), 'structure', 'swarm-size')).toBe(false);
  });
  test('reach beyond the size with no tether word: soft within ten feet, fail beyond', () => {
    const b = base({ size: 'Medium', hp_formula: '10d8 + 30', hp: 75 }); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.'; expect(has(checkBlock(b), 'structure', 'reach', 'soft')).toBe(true);
    b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 20 ft. 20 (3d10 + 4) Slashing damage.'; expect(has(checkBlock(b), 'structure', 'reach', 'fail')).toBe(true);
    b.sections.Actions[1] = { name: 'Chain Lash', text: '*Melee Attack Roll:* +7, reach 20 ft. 20 (3d10 + 4) Slashing damage.' }; b.sections.Actions[0].text = 'The stalker makes two Chain Lash attacks.'; expect(has(checkBlock(b), 'structure', 'reach')).toBe(false);
  });
});

describe('gates', () => {
  test('a KO condition at will on each creature fails; single target with no repeat save or one-turn cap fails', () => {
    expect(has(checkBlock(withRow('Actions', { name: 'Glare', text: '*Wisdom Saving Throw*: DC 15, each creature within 30 feet. *Failure:* The target has the Paralyzed condition.' })), 'gates', 'ko-ungated', 'fail')).toBe(true);
    expect(has(checkBlock(withRow('Actions', { name: 'Glare', text: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Paralyzed condition.' })), 'gates', 'ko-ungated', 'fail')).toBe(true);
  });
  test('a KO at will on one target with a one-turn cap or a repeat save is soft (the Ghoul)', () => {
    expect(has(checkBlock(withRow('Actions', { name: 'Glare', text: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Paralyzed condition until the end of its next turn.' })), 'gates', 'ko-at-will', 'soft')).toBe(true);
    expect(has(checkBlock(withRow('Actions', { name: 'Glare', text: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Paralyzed condition. It repeats the save at the end of each of its turns, ending the effect on a success.' })), 'gates', 'ko-at-will', 'soft')).toBe(true);
  });
  test('at-will multi-target control with no damage and no gate', () => { expect(has(checkBlock(withRow('Actions', { name: 'Howl', text: '*Wisdom Saving Throw*: DC 15, each creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' })), 'gates', 'control-aoe-ungated', 'soft')).toBe(true); });
  test('hard control at will below CR 13 fails; a damage spell at will outside a replacement clause is soft', () => {
    expect(has(checkBlock(withRow('Actions', { name: 'Spellcasting', text: 'The stalker casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12):\n\n- At Will: Hold Person' })), 'gates', 'control-at-will', 'fail')).toBe(true);
    const r = checkBlock(withRow('Actions', { name: 'Spellcasting', text: 'The stalker casts one of the following spells (spell save DC 12):\n\n- At Will: Fireball' })); expect(has(r, 'gates', 'damage-spell-at-will', 'soft')).toBe(true);
    const c = withRow('Actions', { name: 'Spellcasting', text: 'The stalker casts one of the following spells (spell save DC 12):\n\n- At Will: Fireball' }); c.sections.Actions[0].text = 'The stalker makes two Claw attacks. It can replace one attack with a use of Spellcasting to cast *Fireball*.'; expect(has(checkBlock(c), 'gates', 'damage-spell-at-will')).toBe(false);
  });
});

describe('header-body', () => {
  test('Earth Glide with no Burrow', () => { expect(has(checkBlock(withRow('Traits', { name: 'Earth Glide', text: 'The stalker can burrow through nonmagical, unworked earth and stone.' })), 'headerBody', 'earth-glide-burrow', 'fail')).toBe(true); });
  test('Spider Climb with no Climb', () => { expect(has(checkBlock(withRow('Traits', { name: 'Spider Climb', text: 'The stalker can climb difficult surfaces, including along ceilings, without needing to make an ability check.' })), 'headerBody', 'spider-climb-climb', 'fail')).toBe(true); });
  test('blind beyond its blindsight beside darkvision', () => { expect(has(checkBlock(base({ senses: 'blindsight 60 ft. (blind beyond this radius), darkvision 60 ft.; Passive Perception 11' })), 'headerBody', 'blind-beyond-darkvision', 'fail')).toBe(true); });
  test('a type without its immunity set', () => { expect(has(checkBlock(base({ type: 'Undead', immunities: '' })), 'headerBody', 'type-immunities', 'soft')).toBe(true); expect(has(checkBlock(base({ type: 'Undead', immunities: 'Poison; Exhaustion, Poisoned' })), 'headerBody', 'type-immunities')).toBe(false); });
  test('languages against the type idiom', () => { expect(has(checkBlock(base({ languages: 'Common' })), 'headerBody', 'languages-type', 'soft')).toBe(true); });
});

describe('edition purity', () => {
  test('2014 wording inside a 2024 block', () => { const b = base(); b.sections.Actions[1].text += ' On a hit, the target is knocked prone.'; expect(has(checkBlock(b), 'edition', 'vocab-2014-in-2024', 'fail')).toBe(true); });
  test('2024 wording inside a 2014 block', () => { const l = legacy(); l.actions[1].description = 'Melee Attack Roll: +7, reach 10 ft. 17 (3d8 + 4) slashing damage.'; expect(has(checkBlock(l), 'edition', 'vocab-2024-in-2014', 'fail')).toBe(true); });
  test('a 2014 armor parenthetical the stat does not derive', () => { expect(has(checkBlock(legacy({ armor_class: '17 (chain shirt)' })), 'edition', 'armor-parenthetical', 'fail')).toBe(true); expect(has(checkBlock(legacy({ armor_class: '15 (chain shirt)' })), 'edition', 'armor-parenthetical')).toBe(false); });
});

describe('donor fidelity', () => {
  const owl = (over = {}) => base({ name: 'Owlbear', type: 'Monstrosity', cr: 3, cr_str: '3', pb: 2, ac: 13, hp: 59, hp_formula: '7d10 + 21', stats: { STR: 20, DEX: 12, CON: 17, INT: 3, WIS: 12, CHA: 7 }, senses: 'darkvision 60 ft.; Passive Perception 11', monsterName: 'Owlbear', sections: { Traits: [], Actions: [{ name: 'Multiattack', text: 'The owlbear makes two Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }] }, ...over });
  test('a row outside print, the named seat and the keyed seeds — soft at one, fail at three', () => {
    expect(has(checkBlock(withRow('Actions', { name: 'Hex Bolt', text: '*Ranged Attack Roll:* +7, range 60 ft. 9 (1d8 + 5) Necrotic damage.' }, owl())), 'donor', 'print-rows', 'soft')).toBe(true);
    let b = owl(); for (const n of ['Hex Bolt', 'Dread Howl', 'Scurry']) b = withRow('Traits', { name: n, text: 'Something invented.' }, b); expect(has(checkBlock(b), 'donor', 'print-rows', 'fail')).toBe(true);
    const r = checkBlock(withRow('Bonus Actions', { name: 'Vanish (1/Day)', text: 'The owlbear casts Invisibility on itself.', library: true }, owl())); expect(has(r, 'donor', 'print-rows')).toBe(false); expect(has(r, 'donor', 'print-row-exception', 'ok')).toBe(true);
  });
  test('array, HP and AC off the print block at its own CR', () => { const r = checkBlock(owl({ ac: 15, hp: 75, hp_formula: '9d10 + 27', stats: { STR: 18, DEX: 12, CON: 17, INT: 3, WIS: 12, CHA: 7 } })); expect(has(r, 'donor', 'print-array', 'fail')).toBe(true); expect(has(r, 'donor', 'print-hp', 'fail')).toBe(true); expect(has(r, 'donor', 'print-ac', 'fail')).toBe(true); });
  test('a Product Identity token on the sheet', () => { expect(has(checkBlock(base({ name: 'Mind Flayer Lord' })), 'donor', 'pi-denylist', 'fail')).toBe(true); });
  test('three or more of the 2014 beholder rays by name', () => { expect(has(checkBlock(withRow('Actions', { name: 'Eye Rays', text: 'Charm Ray, Paralyzing Ray, or Fear Ray.' })), 'donor', 'ray-overlap', 'fail')).toBe(true); });
});

describe('print is print (owner amendments, 2026-10-02)', () => {
  test('a print-flagged row is exempt from the diceless, KO and edition predicates', () => {
    const r = checkBlock(withRow('Traits', { name: 'Vampire Weakness', text: 'The vampire takes 20 Acid damage when it ends its turn in running water. If it is Incapacitated it is destroyed.', print: true }));
    expect(has(r, 'structure', 'diceless-damage')).toBe(false); expect(has(r, 'gates', 'ko-ungated')).toBe(false);
    const k = base(); k.sections.Actions[1] = { ...k.sections.Actions[1], text: k.sections.Actions[1].text + ' The target must succeed on a DC 15 Strength saving throw or be knocked prone.', print: true };
    expect(has(checkBlock(k), 'edition', 'vocab-2014-in-2024')).toBe(false);
  });
  test('a block at print\'s own CR is judged by the donor gate, not the band (the band notes it)', () => {
    const owl = base({ name: 'Owlbear', type: 'Monstrosity', cr: 3, cr_str: '3', pb: 2, ac: 13, hp: 59, hp_formula: '7d10 + 21', stats: { STR: 20, DEX: 12, CON: 17, INT: 3, WIS: 12, CHA: 7 }, monsterName: 'Owlbear', sections: { Traits: [], Actions: [{ name: 'Multiattack', text: 'The owlbear makes two Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }] } });
    const r = checkBlock(owl); expect(has(r, 'bands', 'print-numbers', 'ok')).toBe(true); expect(r.gates.bands.status).toBe('ok');
  });
  test('a chassis legendary row where print carries its own kit is soft and named', () => {
    const drake = base({ name: 'Adult Green Dragon', type: 'Dragon', cr: 15, cr_str: '15', pb: 5, monsterName: 'Adult Green Dragon', sections: { Traits: [], Actions: [{ name: 'Multiattack', text: 'The dragon makes three Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +12, reach 10 ft. 15 (2d10 + 4) Slashing damage.' }], 'Legendary Actions': [{ name: 'Tail Swipe', text: 'The dragon makes one Rend attack.' }] } });
    const r = checkBlock(drake); expect(has(r, 'donor', 'print-legendary', 'soft')).toBe(true);
  });
  test('effective HP follows the DMG\'s resistance table: a CR 10 body resisting the three physical types counts 1.5×', () => {
    expect(effectiveHp({ hp: 100, resistances: 'Bludgeoning, Piercing, Slashing' }, 10)).toBe(150);
    expect(effectiveHp({ hp: 100, immunities: 'Bludgeoning, Piercing, Slashing' }, 14)).toBe(150);
    expect(effectiveHp({ hp: 100, resistances: 'Fire' }, 10)).toBe(100);
  });
  test('a lint finding on a print row is dropped', () => {
    const b = base(); b.sections.Actions[1] = { ...b.sections.Actions[1], text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 2) Slashing damage.', print: true };
    expect(checkBlock(b).gates.derivation.findings.some((f) => /^lint:/.test(f.rule) && f.severity !== 'ok')).toBe(false);
  });
});

describe('the critic\'s audit of the checker (2026-10-02)', () => {
  test('legendary damage counts every use: a cost-1 damaging option without a repeat clause fires Uses times; with the clause, once', () => {
    const b = withRow('Legendary Actions', { name: 'Pounce', text: 'The stalker makes one Claw attack.' }, { legendary_uses: 3 });
    const r1 = checkBlock(b); expect(r1.read.legendary.times).toBe(3); expect(r1.read.legendary.avg).toBe(60);
    const c = withRow('Legendary Actions', { name: 'Pounce', text: "The stalker makes one Claw attack. The stalker can't take this action again until the start of its next turn." }, { legendary_uses: 3 });
    expect(checkBlock(c).read.legendary.times).toBe(1);
  });
  test('a conditional rider is not always-on damage', () => {
    const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage, plus 7 (2d6) Slashing damage if the attack roll had Advantage.';
    expect(checkBlock(b).read.used.avg).toBe(20);
  });
  test('a weapon row rolls STR or DEX; a spell row rolls the casting stat; a 2014 label decides', () => {
    const l = legacy(); l.actions[1].description = 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.'; l.other_edition.stats = { STR: 10, DEX: 10, CON: 16, INT: 18, WIS: 12, CHA: 10 }; l.other_edition.sections.Actions.push({ name: 'Spellcasting', text: 'It casts spells using Intelligence as the spellcasting ability (spell save DC 15).' });
    expect(has(checkBlock(l), 'derivation', 'attack-stat', 'fail')).toBe(true); // +7 is Int's, under a Weapon Attack label
    const ok = JSON.parse(JSON.stringify(l)); ok.actions[1].description = 'Melee Spell Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.';
    expect(has(checkBlock(ok), 'derivation', 'attack-stat')).toBe(false);
  });
  test('a ". ," sequence fails structure; a condition on every hit with no save is soft', () => {
    const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage. , plus 2 (1d4) Slashing damage if the attack roll had Advantage.';
    expect(has(checkBlock(b), 'structure', 'punctuation', 'fail')).toBe(true);
    const c = base(); c.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage, and the target has the Frightened condition until the start of its next turn.';
    expect(has(checkBlock(c), 'gates', 'rider-no-save', 'soft')).toBe(true);
  });
});

describe('one axis under print is a fail only when the block is underpowered (the Archlich at 24, sweep 2026-10-03)', () => {
  test('HP under print\'s spread with the read within one of the CR is soft; with the read more than one under the CR it is fail', () => {
    const c = corpusAt(5); const lowHp = Math.round(c.hp[0] * 0.9);
    const hot = base({ hp: lowHp, hp_formula: `${Math.round(lowHp / 6)}d10 + ${lowHp - Math.floor(Math.round(lowHp / 6) * 5.5)}` });
    hot.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 42 (7d10 + 4) Slashing damage.'; hot.sections.Actions[0].text = 'The beast makes two Claw attacks.';
    const r1 = checkBlock(hot); expect(r1.read.read).toBeGreaterThan(5); // precondition: damage carries the read
    expect(has(r1, 'bands', 'under', 'soft')).toBe(true); expect(has(r1, 'bands', 'under', 'fail')).toBe(false);
    const weak = base({ hp: lowHp, hp_formula: hot.hp_formula }); weak.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 9 (2d4 + 4) Slashing damage.';
    const r2 = checkBlock(weak); expect(r2.read.read).toBeLessThan(4);
    expect(has(r2, 'bands', 'under', 'fail')).toBe(true);
  });
});

describe('a grapple\'s Restrained clause is not a rider without a save (the Latchwarden\'s Slam, rerun 2026-10-03)', () => {
  test('"While Grappled, the target has the Restrained condition" after an escape DC is print\'s shape; a bare Restrained on hit still reads soft', () => {
    const g = base(); g.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 18 (4d6 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.';
    expect(has(checkBlock(g), 'gates', 'rider-no-save')).toBe(false);
    const k = base(); k.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 30 ft. 24 (4d8 + 6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Grappled condition (escape DC 20) from one of ten tentacles, and it has the Restrained condition until the grapple ends.';
    expect(has(checkBlock(k), 'gates', 'rider-no-save')).toBe(false); // the Kraken's own wording
    const r = base(); r.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 18 (4d6 + 4) Bludgeoning damage, and the target has the Restrained condition until the end of its next turn.';
    expect(has(checkBlock(r), 'gates', 'rider-no-save', 'soft')).toBe(true);
  });
});

describe('an at-will ray table is sustained damage (the orb at 13, rerun 2026-10-03)', () => {
  test('three rays a round at the table\'s mean: two damaging entries of six add 3 × (24 + 24) / 6 = 24 to the round', () => {
    const table = '1 — Numbing Ray: *Constitution Saving Throw*: DC 15. *Failure:* The target\'s Speed is halved. 2 — Binding Ray: *Dexterity Saving Throw*: DC 15. *Failure:* The target has the Restrained condition. 3 — Blinding Ray: *Constitution Saving Throw*: DC 15. *Failure:* The target has the Blinded condition. 4 — Dread Ray: *Wisdom Saving Throw*: DC 15. *Failure:* The target has the Paralyzed condition. 5 — Shoving Ray: *Strength Saving Throw*: DC 15. *Failure:* 24 (7d6) Force damage, and the target has the Prone condition. 6 — Withering Ray: *Constitution Saving Throw*: DC 15. *Failure:* 24 (7d6) Necrotic damage.';
    const atWill = withRow('Actions', { name: 'Eye Rays', text: `The stalker fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray: ${table}` });
    const r0 = sustainedOf(base()); const r1 = sustainedOf(atWill); expect(r1.sustained - r0.sustained).toBe(24);
    const gated = withRow('Actions', { name: 'Eye Rays (Recharge 5-6)', text: atWill.sections.Actions[2].text });
    expect(sustainedOf(gated).sustained).toBe(r0.sustained); // a recharge table is a nova, not the round
  });
});

describe("the critic's blockers audit (2026-10-03)", () => {
  test('Multiattack naming a row nested in another row\'s name is caught: "Slam or Mirror Slam" where the rows are Slam and Mirror Shard', () => {
    const b = withRow('Actions', { name: 'Mirror Shard', text: '*Ranged Attack Roll:* +7, range 80/320 ft. 22 (4d8 + 4) Piercing damage.' });
    b.sections.Actions[0].text = 'The stalker makes three attacks, using Slam or Mirror Slam in any combination.';
    b.sections.Actions[1].name = 'Slam';
    expect(has(checkBlock(b), 'structure', 'multiattack-row', 'fail')).toBe(true);
  });
  test('at-will mass control is fail when it is wide and nothing is traded for it, soft when Multiattack trades an attack (print\'s 13 breaths)', () => {
    const row = { name: 'Tether Call', text: "*Wisdom Saving Throw*: DC 15, each creature of its choice within 120 feet that can see it. *Failure:* The target has the Charmed condition until the start of the stalker's next turn." };
    const free = withRow('Actions', row);
    expect(has(checkBlock(free), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);
    const traded = withRow('Actions', row);
    traded.sections.Actions[0].text = 'The stalker makes two Claw attacks. It can replace one attack with a use of Tether Call.';
    expect(has(checkBlock(traded), 'gates', 'control-aoe-ungated', 'soft')).toBe(true);
    expect(has(checkBlock(traded), 'gates', 'control-aoe-ungated', 'fail')).toBe(false);
    const narrow = withRow('Actions', { name: 'Dread Pulse', text: '*Wisdom Saving Throw*: DC 15, each creature in a 20-foot Emanation. *Failure:* The target has the Frightened condition until the end of its next turn.' });
    expect(has(checkBlock(narrow), 'gates', 'control-aoe-ungated', 'fail')).toBe(false);
  });
  test('a ". and" join fails the punctuation rule', () => {
    const b = base(); b.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 20 (3d10 + 4) Cold damage. and the target has the Paralyzed condition until the start of its next turn.';
    expect(has(checkBlock(b), 'structure', 'punctuation', 'fail')).toBe(true);
  });
});

describe('the ". and" rule does not fire on a hybrid row\'s range (sweep 2026-10-04)', () => {
  test('"reach 5 ft. or range 30/120 ft." is clean; ". and" and ". plus" still fail', () => {
    const ok = base(); ok.sections.Actions[1].text = '*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 30/120 ft. 29 (7d6 + 5) Thunder damage.';
    expect(has(checkBlock(ok), 'structure', 'punctuation')).toBe(false);
    const bad = base(); bad.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Cold damage. and the target has the Paralyzed condition.';
    expect(has(checkBlock(bad), 'structure', 'punctuation', 'fail')).toBe(true);
  });
});

describe("print's stat-block reference is not a dangling row (the Treant's Animate Trees, 2026-10-04)", () => {
  test('a reference ending in "stat block" points at another creature, not a row', () => {
    const b = withRow('Actions', { name: 'Animate Trees', text: 'The stalker animates two trees it can see within 60 feet. They use the Awakened Tree stat block and act on their own initiative.' });
    expect(has(checkBlock(b), 'structure', 'dangling-ref')).toBe(false);
    const bad = withRow('Actions', { name: 'Signal', text: 'The stalker uses Thunder Call, if available.' });
    expect(has(checkBlock(bad), 'structure', 'dangling-ref', 'fail')).toBe(true);
  });
});

describe("the critic's regressions brief (2026-10-04)", () => {
  test('a doubled attack label fails; "half as much damage" with no damage on the row fails; a legendary action that is only its recharge clause fails', () => {
    const l = legacy(); l.actions[1].description = 'Melee or Melee or Ranged Spell Attack: +7 to hit, reach 5 ft. or range 120 ft., one target. Hit: 17 (3d8 + 4) slashing damage.';
    expect(has(checkBlock(l), 'structure', 'punctuation', 'fail')).toBe(true);
    expect(checkBlock(l).gates.structure.findings.some((f) => f.rule === 'punctuation' && /on the 2014 sheet/.test(f.message))).toBe(true); // read from the legacy render, not the saved 2024 rows
    const h = withRow('Actions', { name: 'Judgment', text: 'One creature within 60 feet must make a DC 15 Charisma saving throw. On a failed save, the target is cursed. On a successful save, the target takes half as much damage.' });
    expect(has(checkBlock(h), 'structure', 'half-no-referent', 'fail')).toBe(true);
    const g = withRow('Legendary Actions', { name: 'Storm Volley', text: "The stalker can't take this action again until the start of its next turn." }, { legendary_uses: 3 });
    expect(has(checkBlock(g), 'structure', 'legendary-no-effect', 'fail')).toBe(true);
  });
});
