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
  // the Multiattack is a FAIL now, not a soft (critic's notes, 2026-10-15,
  // flagged soft twice): print's seven swarms all make exactly one attack, and
  // the engine strips the donor's inherited "makes two Melee Attack attacks"
  // THE MULTIATTACK HALF IS CR-BOUND (owner's ruling, 2026-11-08): all seven of print's
  // swarms are CR 0.25-3, print has no swarm above CR 3 and no ooze above CR 4, so the
  // gate stops where its evidence stops. Holding it past that made a high-CR swarm
  // unpriceable — one attack cannot reach a CR 13 card of 100 without breaching the
  // single-target ceiling of 51 — and this gate was what forbade the way out. The size
  // half is unchanged. The fixture is CR 5, so it now passes the Multiattack half.
  test('a swarm that is not Medium fails; its Multiattack fails only at CR 3 and below', () => {
    const r = checkBlock(base({ type: 'Swarm of Tiny Beasts', size: 'Large' }));
    expect(has(r, 'structure', 'swarm-size', 'fail')).toBe(true);
    expect(has(r, 'structure', 'swarm-multiattack', 'fail')).toBe(false); // CR 5: above print's swarm band
    // and inside the band the gate still bites
    const low = checkBlock(base({ type: 'Swarm of Tiny Beasts', size: 'Medium', cr: 2, cr_str: '2' }));
    expect(has(low, 'structure', 'swarm-multiattack', 'fail')).toBe(true);
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
  // RESCOPED 2026-10-29, SECOND PASS. The first pass capped width from the four
  // Young metallic dragons; print caps the CONSEQUENCE instead, and splits by
  // shape. Counted over all 21 at-will multi-target control rows in the 329:
  // Cones 16/16 are duration-bounded or impose only a self-ending condition and
  // 0/16 carry immunity; Emanations past 10 ft are 3/3 with the 24-hour
  // immunity (Pit Fiend 20, Cloaker 60, Harpy 300) and all 5 are free. Width is
  // not capped at any CR — the widest is a 300-foot Emanation at CR 1.
  test('a bounded at-will control Cone is print\'s own shape and stays quiet', () => { expect(has(checkBlock(withRow('Actions', { name: 'Howl', text: '*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* The target has the Frightened condition until the end of its next turn.' })), 'gates', 'control-aoe-ungated')).toBe(false); });
  test('a 90-foot Cone is quiet too — print\'s Ancient metallics are 90 ft, so width is no finding', () => { expect(has(checkBlock(withRow('Actions', { name: 'Howl', text: '*Wisdom Saving Throw*: DC 15, each creature in a 90-foot Cone. *Failure:* The target has the Frightened condition until the end of its next turn.' })), 'gates', 'control-aoe-ungated')).toBe(false); });
  test('an UNBOUNDED Cone is a finding — 16 of print\'s 16 bound it', () => { expect(has(checkBlock(withRow('Actions', { name: 'Howl', text: '*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* The target has the Frightened condition.' })), 'gates', 'control-aoe-ungated')).toBe(true); });
  test('a Cone imposing only Prone is quiet with no duration at all — Bronze\'s Repulsion Breath', () => { expect(has(checkBlock(withRow('Actions', { name: 'Shove Breath', text: '*Strength Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* The target is pushed up to 40 feet straight away from it and has the Prone condition.' })), 'gates', 'control-aoe-ungated')).toBe(false); });

  // THE CASE THE RESCOPE HAS TO DECIDE (critic, 2026-10-29): the Trench Hymn
  // Leviathan's 120-foot Emanation at CR 24. The first pass passed it as narrow
  // because the width test never looked for a shape keyword.
  test('a 120-foot at-will control Emanation with no way out is a finding — the Leviathan', () => {
    const r = withRow('Actions', { name: 'Luring Presence', template: 'luring-presence', library: true, text: '*Wisdom Saving Throw*: DC 24, each creature in a 120-foot Emanation originating from it. *Failure:* The target has the Charmed condition until the end of its next turn.' });
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);
  });
  test('the same Emanation WITH print\'s 24-hour immunity is quiet — the Harpy ships 300 feet at CR 1', () => {
    const r = withRow('Actions', { name: 'Luring Presence', template: 'luring-presence', library: true, text: '*Wisdom Saving Throw*: DC 24, each creature in a 120-foot Emanation originating from it. *Failure:* The target has the Charmed condition until the end of its next turn. *Success:* The target is immune to this creature\'s song for 24 hours.' });
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated')).toBe(false);
  });
  test('a 10-foot Emanation needs no immunity — the Hezrou is print\'s one exception', () => {
    const r = withRow('Actions', { name: 'Stench', text: '*Constitution Saving Throw*: DC 15, each creature in a 10-foot Emanation originating from it. *Failure:* The target has the Poisoned condition until the end of its next turn.' });
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated')).toBe(false);
  });
  test('severity follows the evidence: a chassis row with no engine stamp is soft, not fail', () => {
    const r = withRow('Actions', { name: 'Wail', text: '*Wisdom Saving Throw*: DC 15, each creature in a 60-foot Emanation originating from it. *Failure:* The target has the Frightened condition until the end of its next turn.' });
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated', 'soft')).toBe(true);
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated', 'fail')).toBe(false);
  });
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
  // THE TRADING AXIS IS GONE (2026-10-29, second pass): print ships 9 of its 21
  // at-will control rows free, including the Harpy's 300-foot Emanation at CR 1,
  // so "nothing traded for it" was never the defect. This row stays a finding on
  // the ground that survived measurement — it states no area at all, where all
  // 21 of print's name a Cone or an Emanation. ("each creature of its choice" is
  // itself 0 of 329 print rows, gated or not; that is a separate rule and the
  // owner has not ruled on it.)
  test('at-will mass control with no stated area is a finding whether or not Multiattack trades for it', () => {
    const row = { name: 'Tether Call', template: 'luring-presence', library: true, text: "*Wisdom Saving Throw*: DC 15, each creature of its choice within 120 feet that can see it. *Failure:* The target has the Charmed condition until the start of the stalker's next turn." };
    const free = withRow('Actions', row);
    expect(has(checkBlock(free), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);
    const traded = withRow('Actions', row);
    traded.sections.Actions[0].text = 'The stalker makes two Claw attacks. It can replace one attack with a use of Tether Call.';
    expect(has(checkBlock(traded), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);   // trading buys nothing here; the area is still unstated
  });

  test('a 20-foot control Emanation with no way out is a finding — print\'s Pit Fiend aura at 20 ft grants the 24-hour immunity', () => {
    const narrow = withRow('Actions', { name: 'Dread Pulse', text: '*Wisdom Saving Throw*: DC 15, each creature in a 20-foot Emanation. *Failure:* The target has the Frightened condition until the end of its next turn.' });
    expect(has(checkBlock(narrow), 'gates', 'control-aoe-ungated')).toBe(true);
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

describe('the flavor clause has no rules weight (fidelity pipeline step 2)', () => {
  test('a row\'s flavor can say anything — numbers, conditions, "half as much damage" — and no gate reads it', () => {
    const b = base(); b.sections.Actions[1].flavor = 'It hums a DC 99 lullaby, and the target has the Paralyzed condition in spirit; half as much damage if the sock is unwashed.';
    const r = checkBlock(b); expect(r.status).toBe(checkBlock(base()).status);
    expect(JSON.stringify(r.gates)).not.toMatch(/half-no-referent|DC 99|lullaby/);
  });
});

describe('coverage and concept share (fidelity pipeline step 4): string-work against the clause list', () => {
  test('header clauses match size and speed; mechanical clauses match by stem; descriptive clauses are not counted; rows trace by a clause word', () => {
    const b = base(); b.generation = { clauses: [{ text: 'Large', kind: 'header' }, { text: '30 feet of movement', kind: 'header' }, { text: 'razor sharp claws', kind: 'mechanical' }, { text: 'a vicious bite', kind: 'mechanical' }, { text: 'trained in fighting styles', kind: 'mechanical' }, { text: 'scaly and green', kind: 'descriptive' }] };
    b.speed = '30 ft.'; b.sections.Actions[1].name = 'Claw'; b.sections.Actions[1].clause = 'razor sharp claws'; // provenance (step 8): the row's own clause, not its words
    const f = checkBlock(b).fidelity; expect([f.total, f.covered]).toEqual([5, 3]);
    expect(f.dropped).toEqual(['a vicious bite', 'trained in fighting styles']);
    expect([f.rows, f.conceptRows]).toEqual([1, 1]);
  });
});

describe('fidelity on a print body (fidelity pipeline step 4)', () => {
  test('a bare print name is one clause, present when the block is the print body; rows named for print\'s rows trace to the user', () => {
    const { printCanonFor } = require('../generate.mjs');
    const b = base(); b.name = 'Owlbear'; b.type = 'Monstrosity'; b.sections.Actions = [{ name: 'Multiattack', text: 'The owlbear makes two Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }];
    const r = checkBlock(b, { userConcept: 'owlbear', print: printCanonFor('owlbear', 3) });
    expect([r.fidelity.covered, r.fidelity.total]).toEqual([1, 1]); expect([r.fidelity.conceptRows, r.fidelity.rows]).toEqual([1, 1]);
  });
});

describe('a creature-only prompt (fidelity pipeline step 4)', () => {
  test('when the record holds only descriptive clauses, the creature itself is the denominator', () => {
    const b = base(); b.name = 'Knellwheel'; b.generation = { clauses: [{ text: 'knife ball', kind: 'descriptive', head: true }] }; b.sections.Actions[1].name = 'Knife Cage';
    const f = checkBlock(b).fidelity; expect([f.covered, f.total]).toEqual([1, 1]); // the creature itself is covered by the composition (provenance, step 8)
    const miss = base(); miss.generation = { clauses: [{ text: 'a bog witch', kind: 'descriptive', head: true }] }; miss.sections = { Traits: [], Actions: [] };
    expect(checkBlock(miss).fidelity.total).toBe(1); expect(checkBlock(miss).fidelity.covered).toBe(0); // no rows at all: nothing composed it
  });
});

// STAGE 1 AND 1b, THE SHIP BLOCKERS (owner's fix order, 2026-10-16). Each sheet
// below shipped at the table with every gate passing it, or with a gate that
// could not see it. Categories confirmed by the owner before these were written:
// data integrity, routing, integration — never a prompt string.
describe('stage 1: a sheet that breaks at the table', () => {
  // (1) DATA INTEGRITY — the Courtier Unseen, canaries-2026-10-16T09-26-32: the
  // call named the Mage's hybrid "Force Bolt", the launcher narrowing stripped
  // its melee half, the ranged-off rule deleted what was left (print's ONLY
  // attack), and the Multiattack kept "makes three attacks". The reader printed
  // off 0 and every gate passed. Each gate was checking a different half: the
  // slot-name check only reads names the Multiattack lists, and "makes three
  // attacks" lists none.
  test('a Multiattack over zero attack rows fails, and so does a sheet with no attack at all', () => {
    const noAttack = base({ sections: { Actions: [
      { name: 'Multiattack', text: 'The stalker makes three attacks.' },
      { name: 'Spellcasting', text: 'The stalker casts one of the following spells.\n\n- At Will: *Light*' },
    ] } });
    expect(has(checkBlock(noAttack), 'reader', 'multiattack-integrity')).toBe(true);
    const noAttackNoMa = base({ sections: { Actions: [{ name: 'Spellcasting', text: 'The stalker casts *Light*.' }] } });
    expect(has(checkBlock(noAttackNoMa), 'reader', 'multiattack-integrity')).toBe(true);
    // the control: one attack row and a Multiattack naming it is clean
    const ok = base({ sections: { Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Claw attacks.' },
      { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' },
    ] } });
    expect(has(checkBlock(ok), 'reader', 'multiattack-integrity')).toBe(false);
  });

  // (7) ROUTING + DATA INTEGRITY — the Dirge Swarm vs the Altarstone Warden,
  // canaries/branch-nova 2026-10-16: the same print line, "Understands … but
  // can't speak", failed at INT 4 and passed at INT 3. The line is not "None",
  // so the gate read it as speech. It would have failed PRINT'S OWN Stone Golem
  // (Unaligned, INT 3, that exact line), and the type list missed the Swarm-of
  // wrapper, which is how a Construct swarm reached the gate at all.
  test('alignment-fit reads "understands but can\'t speak" as no speech, through the Swarm-of wrapper', () => {
    const golemShape = { type: 'Construct', alignment: 'Unaligned', stats: { STR: 22, DEX: 9, CON: 20, INT: 3, WIS: 11, CHA: 1 }, languages: "Understands Common plus two other languages but can't speak" };
    expect(has(checkBlock(base(golemShape)), 'reader', 'alignment-fit')).toBe(false);
    expect(has(checkBlock(base({ ...golemShape, type: 'Swarm of Tiny Constructs', stats: { ...golemShape.stats, INT: 4 } })), 'reader', 'alignment-fit')).toBe(false);
    // what the gate still catches: a speaking creature claiming Unaligned
    expect(has(checkBlock(base({ type: 'Humanoid', alignment: 'Unaligned', stats: { STR: 12, DEX: 12, CON: 12, INT: 12, WIS: 12, CHA: 12 }, languages: 'Common' })), 'reader', 'alignment-fit')).toBe(true);
  });

  // (6) ROUTING — ONE KEY DEFINITION. The Bog Cauldron (branch-nova
  // 2026-10-16T09-17-50) was ROUTED to brute-grappler by the router's own key
  // "climbs in" and then failed this gate twice for having "a grapple engine
  // with no key in the words". Two tables disagreeing about one question.
  test('the router\'s own grapple keys satisfy engine-needs-key', () => {
    const grappler = base({ sections: { Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Ladle attacks.' },
      { name: 'Ladle', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).' },
    ] } });
    // "climbs in" is a brute-grappler key in route.mjs's own LINE_VERBS
    expect(has(checkBlock(grappler, { userConcept: "a bog witch's iron cauldron that vents scalding steam over whatever climbs in" }), 'reader', 'engine-needs-key')).toBe(false);
    // the control: a grapple engine the words never ask for is still caught
    expect(has(checkBlock(grappler, { userConcept: 'a templar priest with a mace' }), 'reader', 'engine-needs-key')).toBe(true);
  });
});

// A ROW SAYS WHETHER IT IS BOUNDED; THE GATE NO LONGER GUESSES. `condition-duration`
// had nought true positives across its whole history — every firing was a
// containment row bounding by a STATE ("While swallowed, the target has the
// Blinded and Restrained conditions") that its pattern cannot see. Both cures are
// declarations: `renderTemplate` records the duration key it chose, and the donor
// shelf stamps `engulf_engine` on the print rows it copies.
describe('condition-duration believes what the row declares', () => {
  const grasp = (extra) => withRow('Actions', {
    name: 'Grasp', imposes: 'Blinded',
    text: '*Constitution Saving Throw:* DC 13, one creature the stalker can see within 30 feet. *Failure:* The target has the Blinded condition.',
    ...extra,
  });

  test('silent when the engine row declares a duration', () => {
    expect(has(checkBlock(grasp({ template: 'sensory-strike', library: true, duration: 'source_end' })), 'adjudicability', 'condition-duration')).toBe(false);
  });
  test("silent on a containment row, whose bound is the state print writes", () => {
    expect(has(checkBlock(grasp({ rules: true, engulf_engine: true, name: 'Swallow', text: 'The stalker swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions.' })), 'adjudicability', 'condition-duration')).toBe(false);
  });
  test('still FAILS an engine row that declares neither a duration nor a bound', () => {
    expect(has(checkBlock(grasp({ template: 'sensory-strike', library: true })), 'adjudicability', 'condition-duration', 'fail')).toBe(true);
  });
  test('stays SOFT on a donor row, which had no writer to record the field', () => {
    expect(has(checkBlock(grasp({ rules: true })), 'adjudicability', 'condition-duration', 'soft')).toBe(true);
  });
});

describe('a free control aura in Traits owes print\'s way out (2026-10-29)', () => {
  const aura = (text, over = {}) => ({ name: 'Fear Aura', text, ...over });
  test('a 20-foot trait aura with no immunity is a finding — Krennik at CR 4', () => {
    const r = withRow('Traits', aura("The creature emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. *Wisdom Saving Throw*: DC 13, any enemy that starts its turn in the aura. *Failure:* The target has the Frightened condition until the start of its next turn.", { template: 'fear-aura', library: true }));
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);
  });
  test('the same aura WITH print\'s 24-hour immunity is quiet — the Pit Fiend ships 20 feet at CR 20', () => {
    const r = withRow('Traits', aura("The creature emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. *Wisdom Saving Throw*: DC 13, any enemy that starts its turn in the aura. *Failure:* The target has the Frightened condition until the start of its next turn. *Success:* The target is immune to this creature's aura for 24 hours.", { template: 'fear-aura', library: true }));
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated')).toBe(false);
  });
  test('it reads the 2014 printing too — that is where the defect shipped', () => {
    const r = withRow('Traits', aura('Krennik emanates an aura in a 20-foot-radius sphere while it is not incapacitated. Any enemy that starts its turn in the aura must succeed on a DC 13 Wisdom saving throw or be frightened until the start of its next turn.', { template: 'fear-aura', library: true }));
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated', 'fail')).toBe(true);
  });
  test('a 10-foot aura needs none — the Hezrou is print\'s exception', () => {
    const r = withRow('Traits', aura('*Constitution Saving Throw*: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the creature. *Failure:* The target has the Poisoned condition until the end of its next turn.', { template: 'fear-aura', library: true }));
    expect(has(checkBlock(r), 'gates', 'control-aoe-ungated')).toBe(false);
  });
});

// TEXT HYGIENE (critic, 2026-10-30: "4 of the 6 broken sheets are text bugs a
// lint would catch"). Each of these broke one of that sweep's three best ideas,
// so each is a `fail`: they need no judging, only looking at.
describe('a row ships readable text', () => {
  test('an unsubstituted placeholder fails — the Vampire shipped {energy_type}', () => {
    const r = withRow('Actions', { name: 'Grave Strike', text: '*Melee Attack Roll:* +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 13 (3d8) {energy_type} damage.' });
    expect(JSON.stringify(checkBlock(r))).toMatch(/placeholder-leak/);
  });

  test('text that stops mid-clause fails — the Purple Worm\'s Gullet Drag', () => {
    const r = withRow('Actions', { name: 'Gullet Drag', text: '*Strength Saving Throw:* DC 21, one creature within 60 feet. *Failure:* The target has the Grappled condition (escape DC 22). While Grappled this way,' });
    expect(JSON.stringify(checkBlock(r))).toMatch(/text-truncated/);
  });

  test('but a Spellcasting row ending on a spell name is print\'s own form, not a truncation', () => {
    const r = withRow('Actions', { name: 'Spellcasting', text: 'The creature casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):\n\n- **At Will:** *Thaumaturgy*\n- **1/Day Each:** *Spirit Guardians*' });
    expect(JSON.stringify(checkBlock(r))).not.toMatch(/text-truncated/);
  });

  // NOT TESTED HERE: "a bonus to its Armor Class" with no number (Khordathar).
  // That gate was written as a regex and removed — a word rule catching one
  // phrasing while "grants it improved armor" walks past, where the owner's
  // ruling puts applicability on the audit call. The two above stay because
  // they ask whether substitution finished and whether a sentence ends, which
  // are facts about the engine's own output rather than readings of meaning.
});

// THE ENGINE'S OWN LINT WAS WRITE-ONLY (2026-10-30). `generate.mjs` records
// `monster.lint_findings` at ship; nothing read it — one reference in the whole
// repository, the write. So the engine detected real defects, wrote them down,
// and shipped. On sweep-2026-10-30 that was 4 sheets of 40, and 3 of the 4 were
// on nobody's list: a dual Recharge, an orphan condition reference, and a damage
// expression whose stated average was wrong by 6.5.
describe('the engine\'s own lint reaches the gate', () => {
  test('a finding on the sheet fails adjudicability', () => {
    const r = withRow('Actions', { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' });
    r.lint_findings = ['undefined-attack-ref: Actions/Rend references a "Talons" attack that is not defined anywhere in the statblock'];
    expect(has(checkBlock(r), 'adjudicability', 'undefined-attack-ref', 'fail')).toBe(true);
  });

  test('a finding on the 2024 model of a 2014 sheet is read too — two of the four sat there', () => {
    const r = withRow('Actions', { name: 'Unarmed Strike', text: '*Melee Attack Roll:* +6, reach 5 ft. 23 (3d8 + 3) Bludgeoning damage.' });
    r.other_edition = { format: '2024', sections: r.sections, lint_findings: ['damage-dice: Actions/Unarmed Strike: "23 (3d8 + 3)" — 3d8 + 3 averages 16'] };
    const out = JSON.stringify(checkBlock(r));
    expect(out).toMatch(/damage-dice/);
    expect(out).toMatch(/the 2024 model/);
  });

  test('the rule name is taken from the message, so each kind is its own finding', () => {
    const r = withRow('Traits', { name: 'Slow', text: 'The creature casts the Slow spell.' });
    r.lint_findings = ['dual-recharge: Two Recharge-gated entries — print never fields two'];
    expect(has(checkBlock(r), 'adjudicability', 'dual-recharge', 'fail')).toBe(true);
  });

  test('a rule whose premise is verified fails; one with a known false positive is soft', () => {
    const mk = (msg) => { const r = withRow('Actions', { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }); r.lint_findings = [msg]; return checkBlock(r); };
    // verified against print: a GM cannot run a missing reference; 0 of 329 field
    // two Recharge rows; a stated average must match its dice
    for (const m of ['undefined-attack-ref: cites a "Talons" attack that is not defined', 'dual-recharge: Two Recharge-gated entries', 'damage-dice: "23 (3d8 + 3)" averages 16']) {
      const rule = /^([a-z-]+):/.exec(m)[1];
      expect(`${rule}: ${Object.values(mk(m).gates).flatMap((g) => g.findings).find((f) => f.rule === rule)?.severity}`).toBe(`${rule}: fail`);
    }
  });

  test('orphan-condition-ref is SOFT — it fires on print\'s own Vampire, whose Charmed comes from Charm Person', () => {
    const r = withRow('Bonus Actions', { name: 'Charm (Recharge 5-6)', text: 'The vampire casts *Charm Person*, requiring no spell components.' });
    r.lint_findings = ['orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it'];
    const f = Object.values(checkBlock(r).gates).flatMap((g) => g.findings).find((x) => x.rule === 'orphan-condition-ref');
    expect(f && f.severity).toBe('soft');
  });

  test('and anything new defaults to soft — an unchecked finding may not fail a sheet', () => {
    const r = withRow('Actions', { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' });
    r.lint_findings = ['some-new-rule: something nobody has measured against print'];
    const f = Object.values(checkBlock(r).gates).flatMap((g) => g.findings).find((x) => x.rule === 'some-new-rule');
    expect(f && f.severity).toBe('soft');
  });

  test('an empty or absent array changes nothing', () => {
    const a = withRow('Actions', { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' });
    const b = withRow('Actions', { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' });
    b.lint_findings = [];
    expect(JSON.stringify(checkBlock(a))).toBe(JSON.stringify(checkBlock(b)));
  });
});

// ONE ACTION MAY NOT OUT-HIT PRINT'S HARDEST (critic, 2026-10-30). The cap is the
// largest summed damage any single print row deals to ONE target in one action,
// per band, over all 329 — attacks and single-target saves together — as a
// RUNNING max, since print's sample dips at CR 17-20 (43) below CR 13-16 (51).
// Replayed on sweep-2026-10-30 it matches the critic's hand-read to the unit:
// Clapper 90 at CR 13, Merciless Strike 63 at CR 9, Opportunist's Lash 59 at
// CR 17, Merciless Strike 58 at CR 20.
describe('a single action answers to print\'s hardest hit', () => {
  const atk = (avg, dice, over = {}) => ({ name: 'Clapper', text: `*Melee Attack Roll:* +10, reach 5 ft. ${avg} (${dice}) Bludgeoning damage.`, ...over });

  test('an attack over the band cap fails', () => {
    const r = withRow('Actions', atk(90, '19d8 + 5')); r.cr = 13; r.challenge_rating = 13;
    expect(JSON.stringify(checkBlock(r, { cr: 13 }))).toMatch(/single-target-ceiling/);
  });

  test('one at the cap passes — print\'s own Purple Worm Tail Stinger is 51 at CR 13-16', () => {
    const r = withRow('Actions', atk(51, '10d8 + 6')); r.cr = 13;
    expect(JSON.stringify(checkBlock(r, { cr: 13 }))).not.toMatch(/single-target-ceiling/);
  });

  test('the swarm\'s Bloodied split is ONE attack at two rates, never the sum', () => {
    // 90 or 45 is a 90 hit; summing them reads 135 and inflates by half again
    const r = withRow('Actions', { name: 'Clapper', text: '*Melee Attack Roll:* +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 22 (4d8 + 5) Bludgeoning damage if the swarm is Bloodied.' });
    r.cr = 13;
    expect(JSON.stringify(checkBlock(r, { cr: 13 }))).not.toMatch(/single-target-ceiling/);
  });

  test('a SAVE row counts too — that is the critic\'s extension', () => {
    const r = withRow('Actions', { name: 'Merciless Strike', text: '*Dexterity Saving Throw*: DC 19, one creature within 60 feet that has the Frightened condition. *Failure:* 63 (14d8) Fire damage.' });
    r.cr = 9;
    expect(JSON.stringify(checkBlock(r, { cr: 9 }))).toMatch(/single-target-ceiling/);
  });

  test('an AREA row does not — the cap is single-target', () => {
    const r = withRow('Actions', { name: 'Breath', text: '*Dexterity Saving Throw*: DC 19, each creature in a 60-foot Cone. *Failure:* 63 (14d8) Fire damage.' });
    r.cr = 9;
    expect(JSON.stringify(checkBlock(r, { cr: 9 }))).not.toMatch(/single-target-ceiling/);
  });

  test('the cap never falls as CR rises — a CR 18 sheet is allowed what a CR 15 one is', () => {
    const r = withRow('Actions', atk(51, '10d8 + 6')); r.cr = 18;
    expect(JSON.stringify(checkBlock(r, { cr: 18 }))).not.toMatch(/single-target-ceiling/);
  });

  test('a marginal overage is SOFT, not fail — a CR 5 monk at 35 against 31 wants a reader, not a veto', () => {
    const r = withRow('Actions', { name: 'Unarmed Strike', text: '*Melee Attack Roll:* +6, reach 5 ft. 23 (3d8 + 3) Bludgeoning damage. Once on each of its turns it can deal an extra 12 (2d10) Force damage.' });
    r.cr = 5;
    const out = checkBlock(r, { cr: 5 });
    // a one-row fixture fails other gates (no Multiattack, no ranged option), so
    // assert this finding's own severity rather than the sheet's verdict
    const f = Object.values(out.gates).flatMap((g) => g.findings).find((x) => x.rule === 'single-target-ceiling');
    expect(f && f.severity).toBe('soft');
  });

  test('a print row is exempt — print\'s numbers are print\'s calibration', () => {
    const r = withRow('Actions', atk(90, '19d8 + 5', { print: true })); r.cr = 13;
    expect(JSON.stringify(checkBlock(r, { cr: 13 }))).not.toMatch(/single-target-ceiling/);
  });
});

// THE SENTENCE GOES, NOT HALF OF IT (2026-10-30). The "one mechanic, at most
// twice" pass sheds a condition rider when three rows impose it and print never
// fields three — correct — but its removal matched " the target has the X
// condition." INSIDE the sentence "While Grappled this way, the target has the X
// condition.", so the Purple Worm shipped "…(escape DC 22). While Grappled this
// way," and the critic scored the run's second-best idea at soundness 0.
describe('shedding a rider leaves a readable sentence', () => {
  const shed = (text, cond) => text
    .replace(new RegExp(`,? and (?:the target|it) has the ${cond} condition[^.]*\\.?`, 'i'), '.')
    .replace(new RegExp(`\\s*(?:While [^.,]{0,40},\\s*)?(?:The target|It) has the ${cond} condition[^.]*\\.`, 'i'), '')
    .replace(/\s{2,}/g, ' ').replace(/\.\./g, '.').trim();

  test('the subordinate lead-in is consumed with the clause it introduces', () => {
    const t = '*Strength Saving Throw:* DC 21, one creature within 60 feet. *Failure:* The target is pulled 30 feet and has the Grappled condition (escape DC 22). While Grappled this way, the target has the Restrained condition.';
    expect(shed(t, 'Restrained')).toMatch(/has the Grappled condition \(escape DC 22\)\.$/);
    expect(shed(t, 'Restrained')).not.toMatch(/While Grappled this way,$/);
  });

  test('an "and" rider still sheds as before', () => {
    const t = '*Melee Attack Roll:* +14, reach 10 ft. 22 (3d8 + 9) Piercing damage, and the target has the Restrained condition (escape DC 22).';
    expect(shed(t, 'Restrained')).toMatch(/Piercing damage\.$/);
  });

  test('and text left hanging on a comma or connective is caught by the backstop', () => {
    for (const tail of ['… and has the Grappled condition. While Grappled this way,', 'The target is pulled 30 feet and', 'it is Restrained until the end of its next turn or']) {
      expect(/[,;]$|\b(?:and|or|while|until|then)$/i.test(tail.trim())).toBe(true);
    }
    expect(/[,;]$|\b(?:and|or|while|until|then)$/i.test('has the Grappled condition (escape DC 22).')).toBe(false);
  });
});
