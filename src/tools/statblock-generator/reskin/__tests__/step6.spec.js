// STEP 6 OF THE FIDELITY PIPELINE (critic's step-5 read, 2026-10-04): the gate predicates, the renderer rules, the reader's
// denominator and polarity in the extraction, the 2014 Multiattack renderer, the floor-as-pricer opening — each against a
// hand-built case. The generated proof is the regression forty and the baseline set.
import { checkBlock, checkTable } from '../checker.mjs';
import { groundedClauses, partRows, printCanonFor, hagFor } from '../generate.mjs';
import fs from 'node:fs';
import { multiattack2014, to2014Grammar } from '../../format-2024/generate.mjs';
import { parseAuthorResponse, buildRepairPrompt } from '../author.mjs';
import { verbHits } from '../route.mjs';
import { valueCheck } from '../templates.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const base = (over = {}) => ({
  name: 'Ridge Stalker', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned', ac: 15, hp: 85, hp_formula: '10d10 + 30', speed: '40 ft.',
  stats: { STR: 18, DEX: 14, CON: 16, INT: 3, WIS: 12, CHA: 10 }, saves: {}, skills: '', senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'None',
  cr: 5, cr_str: '5', pb: 3, xp: 1800, generation: { donor: 'brute-5' },
  sections: { Traits: [], Actions: [
    { name: 'Multiattack', text: 'The stalker makes two Claw attacks.' },
    { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.' },
  ] },
  ...over,
});
const has = (res, gate, rule, severity) => res.gates[gate].findings.some((f) => f.rule === rule && (!severity || f.severity === severity));
const nova = (name, dice = '36 (8d8)') => ({ name: `${name} (Recharge 5-6)`, text: `*Constitution Saving Throw*: DC 14, each creature in a 30-foot Cone. *Failure:* ${dice} Cold damage. *Success:* Half damage.` });

describe('the gates (critic\'s step-5 read)', () => {
  test('two Recharge novas on one sheet is a structure fail; one is not', () => {
    const two = base(); two.sections.Actions.push(nova('Freezing Breath'), nova('Glacial Breath'));
    expect(has(checkBlock(two), 'structure', 'two-novas', 'fail')).toBe(true);
    const one = base(); one.sections.Actions.push(nova('Freezing Breath'));
    expect(has(checkBlock(one), 'structure', 'two-novas')).toBe(false);
  });
  // THE VROCK IS AN EXCEPTION TO PATTERN FROM, NOT ONE TO SHIP (owner's ruling,
  // 2026-10-22). Re-measured under novasOf's own predicate — which counts
  // "(N/Day)", not only "(Recharge N)" — 1 of 329 print blocks carries two: the
  // Vrock's Spores (Recharge 6) beside Stunning Screech (1/Day). A tweak off the
  // Vrock keeps the pair print gave it; an engine-written second nova is still a
  // defect.
  test("both novas being PRINT's is allowed — the Vrock ships a pair", () => {
    const b = base();
    b.sections.Actions.push({ ...nova('Spores'), print: true }, { ...nova('Stunning Screech'), print: true });
    expect(has(checkBlock(b), 'structure', 'two-novas')).toBe(false);
  });
  test("a print nova beside an ENGINE-written one still fails", () => {
    const b = base();
    b.sections.Actions.push({ ...nova('Spores'), print: true }, nova('Chorus Barrage'));
    expect(has(checkBlock(b), 'structure', 'two-novas', 'fail')).toBe(true);
  });
  test('the message names which nova is not print\'s', () => {
    const b = base();
    b.sections.Actions.push({ ...nova('Spores'), print: true }, nova('Chorus Barrage'));
    const f = checkBlock(b).gates.structure.findings.find((x) => x.rule === 'two-novas');
    expect(f.message).toMatch(/"Chorus Barrage" is not print's/);
  });
  test('"in any combination" with one row is a structure fail', () => {
    const b = base(); b.sections.Actions[0].text = 'The stalker makes two attacks, using Claw in any combination.';
    expect(has(checkBlock(b), 'structure', 'multiattack-combination', 'fail')).toBe(true);
    const ok = base(); ok.sections.Actions.push({ name: 'Bite', text: '*Melee Attack Roll:* +7, reach 5 ft. 15 (2d10 + 4) Piercing damage.' }); ok.sections.Actions[0].text = 'The stalker makes two attacks, using Claw or Bite in any combination.';
    expect(has(checkBlock(ok), 'structure', 'multiattack-combination')).toBe(false);
  });
  test('a Grappled rider with no escape DC fails adjudicability; the escape DC, a prerequisite and "While Grappled" pass', () => {
    const bad = base(); bad.sections.Actions[1].text += ' The target has the Grappled condition until the end of its next turn.';
    expect(has(checkBlock(bad), 'adjudicability', 'grapple-no-escape', 'fail')).toBe(true);
    const good = base(); good.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.';
    good.sections.Actions.push({ name: 'Crush', text: '*Strength Saving Throw*: DC 14, one creature within 5 feet that has the Grappled condition. *Failure:* 18 (4d8) Bludgeoning damage. *Success:* Half damage.' });
    expect(has(checkBlock(good), 'adjudicability', 'grapple-no-escape')).toBe(false);
  });
  test('print\'s "DC 5 plus the damage taken" is its own derivation, not a DC fail', () => {
    const b = base(); b.sections.Traits.push({ name: 'Grave Debt Unpaid', text: 'If damage reduces the stalker to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the stalker drops to 1 Hit Point instead.' });
    expect(has(checkBlock(b), 'derivation', 'dc')).toBe(false);
  });
  test('a user-set AC or HP is a declared field: derivation and bands stand down and the table says so (Resolution 3)', () => {
    const b = base({ ac: 22, hp: 300, hp_formula: '10d10 + 30', generation: { donor: 'brute-5', declared: { ac: 22, hp: 300 } } });
    const r = checkBlock(b);
    expect(has(r, 'derivation', 'hp-formula')).toBe(false);
    expect(r.gates.bands.findings.map((f) => f.severity)).toEqual(['ok']);
    expect(checkTable([r])).toMatch(/\| user-set: AC 22, HP 300 · reads CR [\d.]+ \|/);
    expect(has(checkBlock(base({ hp: 300 })), 'derivation', 'hp-formula', 'fail')).toBe(true); // the same number with no declaration is a derivation fail
  });
});

describe('the reader\'s denominator and polarity (extraction, step 6)', () => {
  test('sentences and commas are phrases; "and" joins short fragments; a relative clause splits only off the head; the head is marked', () => {
    const rec = groundedClauses([], 'An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.');
    expect(rec.map((c) => c.text)).toEqual(['An old hag', 'lives in the burned forest', 'She can turn into a cloud of ash', 'choke anyone who breathes her in', 'She hates fire', 'takes extra damage from it', 'Her nails are long and black and carry rot', 'She keeps three crows that warn her of intruders']);
    expect(rec[0].head).toBe(true); expect(rec.filter((c) => c.head).length).toBe(1);
    expect(rec.find((c) => /extra damage/.test(c.text)).kind).toBe('header'); // a vulnerability is a header value
  });
  test('a negated phrase is a lacks clause; "but" splits; speech is a header clause; "large teeth" is not the size', () => {
    const w = groundedClauses([], 'a wizard but he cannot cast any spells, he just hits people with his staff');
    expect(w.map((c) => `${c.kind}${c.polarity ? `/${c.polarity}` : ''}${c.head ? '/head' : ''}:${c.text}`)).toEqual(['descriptive/head:a wizard', 'mechanical/lacks:he cannot cast any spells', 'mechanical:he just hits people with his staff']);
    const s = groundedClauses([], 'a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks');
    expect(s.map((c) => `${c.kind}:${c.text}`)).toEqual(['descriptive:a sentient pile of laundry', 'mechanical:smothers people', 'descriptive:smells like old socks', 'header:it speaks only in the language of socks']);
    expect(groundedClauses([{ text: 'large teeth', kind: 'header' }], 'Large lizard folk, has large teeth for a vicious bite').map((c) => c.kind)).toEqual(['header', 'mechanical']);
    expect(groundedClauses([], 'an iron bull that is immune to anything but adamantine weapons').map((c) => `${c.kind}:${c.text}`)).toEqual(['descriptive:an iron bull', 'header:is immune to anything but adamantine weapons']); // "but" meaning except
    expect(groundedClauses([], 'a goblin that rides a giant frog and throws nets').map((c) => c.text)).toEqual(['a goblin', 'rides a giant frog', 'throws nets']); // a verb opens a clause after "and"
    expect(groundedClauses([{ text: 'a sentient pile of laundry that smothers people', kind: 'descriptive' }], 'a sentient pile of laundry that smothers people').map((c) => c.kind)).toEqual(['descriptive', 'mechanical']); // a combat verb outranks the model's kind
    expect(groundedClauses([], 'a stone gargoyle that only moves when no one is looking')[1].polarity).toBeUndefined(); // "no one" is a trigger, not a lack
  });
  test('coverage: the head is not counted; a lacks clause is covered only when the lacked thing is absent; a header value only when the header carries it', () => {
    const rec = [{ text: 'a wizard', kind: 'descriptive', head: true }, { text: 'he cannot cast any spells', kind: 'mechanical', polarity: 'lacks' }, { text: 'takes extra damage from fire', kind: 'header' }, { text: 'hits people with his staff', kind: 'mechanical' }];
    const withSpells = base({ generation: { donor: 'brute-5', clauses: rec } }); withSpells.sections.Actions.push({ name: 'Staff', text: '*Melee Attack Roll:* +7, reach 5 ft. 9 (1d8 + 4) Bludgeoning damage.', clause: 'hits people with his staff' }, { name: 'Spellcasting', text: 'The stalker casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):\n\n- **At Will:** *Fire Bolt*' });
    const f1 = checkBlock(withSpells).fidelity;
    expect(f1.total).toBe(3); expect(f1.dropped).toEqual(['he cannot cast any spells', 'takes extra damage from fire']); // "fire" on a spell row is not a Vulnerabilities line
    const without = base({ vulnerabilities: 'Fire', generation: { donor: 'brute-5', clauses: rec } }); without.sections.Actions.push({ name: 'Staff', text: '*Melee Attack Roll:* +7, reach 5 ft. 9 (1d8 + 4) Bludgeoning damage.', clause: 'hits people with his staff' });
    const f2 = checkBlock(without).fidelity;
    expect(f2.covered).toBe(3); expect(f2.dropped).toEqual([]);
    expect(checkBlock(base({ generation: { donor: 'brute-5', clauses: [{ text: 'knife ball', kind: 'descriptive', head: true }] } })).fidelity.total).toBe(1); // a creature-only prompt: the head is the one clause
    const turtle = base({ vulnerabilities: 'Fire', generation: { donor: 'brute-5', clauses: [{ text: 'a turtle', kind: 'descriptive', head: true }, { text: 'bites for 50 damage', kind: 'mechanical' }, { text: 'hates fire', kind: 'descriptive' }, { text: 'takes extra damage from it', kind: 'header' }], unplaced: [{ clause: 'hates fire', where: 'description', text: 'It hates fire.' }] } }); // provenance (step 8): a descriptive clause is covered when it reached the description
    turtle.sections.Actions.push({ name: 'Bite', text: '*Melee Attack Roll:* +7, reach 5 ft. 49 (10d8 + 4) Piercing damage.', clause: 'bites for 50 damage' });
    expect(checkBlock(turtle).fidelity.dropped).toEqual([]); // "bites" stems to the Bite row; the pronoun resolves to the previous phrase's Fire
    const shore = base({ generation: { donor: 'brute-5', clauses: [{ text: 'a drowned sailor', kind: 'descriptive', head: true }, { text: 'he cannot leave the shoreline', kind: 'mechanical', polarity: 'lacks' }] } });
    expect(checkBlock(shore).fidelity.covered).toBe(1); // absent from the sheet: covered
    shore.sections.Traits.push({ name: 'Bound to the Shore', text: 'The sailor can\'t willingly move more than 60 feet from the shoreline.', clause: 'he cannot leave the shoreline' });
    expect(checkBlock(shore).fidelity.covered).toBe(1); // restated as a restriction: covered
    shore.sections.Traits[0].text = 'The sailor leaves the shoreline at dusk to hunt.'; expect(checkBlock(shore).fidelity.covered).toBe(0); // contradicted: not covered
  });
});

describe('named parts are engine rows (step 7)', () => {
  test('the user\'s phrases become attack forms: name, type, mode, rider from the noun tables; thrown and non-striking parts are not parts', () => {
    const rec = groundedClauses([], 'Large lizard folk, 30 feet of movement, Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite.');
    const parts = partRows(rec, { cap: 4 });
    expect(parts.map((p) => `${p.name}/${p.type}/${p.mode}/${p.rider ?? '-'}`)).toEqual(['Greatsword/Slashing/melee/-', 'Tail Swipe/Bludgeoning/melee/Prone', 'Razor Sharp Claws/Slashing/melee/-', 'Vicious Bite/Piercing/melee/-']);
    expect(partRows(groundedClauses([], 'a hermit who hurls her lantern at thieves'), { cap: 4 })).toEqual([]); // hurled: the thrown-weapon template's
    expect(partRows(groundedClauses([], 'a gargoyle with stone wings and a shield'), { cap: 4 })).toEqual([]); // wings and shields do not strike
    expect(partRows(groundedClauses([], 'a snapping turtle that bites for 50 damage'), { cap: 4 }).map((p) => p.name)).toEqual(['Bite']);
    expect(partRows(groundedClauses([], 'a kraken with crushing tentacles'), { cap: 4 })[0]).toMatchObject({ name: 'Crushing Tentacles', rider: 'Grappled', type: 'Bludgeoning' });
  });
});

describe('print on an exact body (step 8 fix round)', () => {
  test('a hag resolves by context; an exact print body carries print\'s Multiattack and attack numbers; the corpus carries no glued spell lists', () => {
    expect(hagFor('an old hag who lives in the burned forest')).toBe('Green Hag'); expect(hagFor('a hag of the salt shore')).toBe('Sea Hag'); expect(hagFor('a hag that haunts dreams')).toBe('Night Hag');
    expect(printCanonFor('an old hag who lives in the burned forest', 7)?.name).toBe('Green Hag');
    const pf = printCanonFor('a pit fiend', 20); expect(pf.exact).toBe(true); expect(pf.multiattack).toMatch(/makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack/); expect(pf.meleeRows.find((r) => r.name === 'Bite').dmg).toBe('18 (3d6 + 8)');
    const corpus = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8')); const list = Array.isArray(corpus) ? corpus : Object.values(corpus).flat();
    const glued = list.flatMap((m) => Object.values(m.sections ?? {}).flat().filter((a) => !/^Spellcasting/.test(a.name ?? '') && /\n- \*\*(?:At Will|\d+\/Day)/.test(a.text ?? '')).map((a) => `${m.name}/${a.name}`));
    expect(glued).toEqual([]); // the Night Hag's Nightmare Haunting carried its Spellcasting list on its tail (eleven rows, a converter artifact)
  });
});

describe('the 2014 Multiattack is rendered, never translated', () => {
  test('one row, as many names as attacks, and a mixed set', () => {
    expect(multiattack2014('The bog hound makes two attacks, using Mud-Caked Jaws in any combination. It can replace one attack with a use of Drag Under.')).toBe('The bog hound makes two Mud-Caked Jaws attacks. It can replace one attack with a use of Drag Under.');
    expect(multiattack2014('The knight makes two attacks, using Blade or Shield Bash in any combination.')).toBe('The knight makes two attacks: one with its Blade and one with its Shield Bash.');
    expect(multiattack2014('Grandmother makes three attacks, using Long Black Nails or Hurled Debris in any combination. It can replace one attack with a use of Choke Ash.')).toBe('Grandmother makes three attacks, using Long Black Nails or Hurled Debris. It can replace one attack with a use of Choke Ash.');
    expect(multiattack2014('Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws or Vicious Bite in any combination.')).toBe('Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws, or Vicious Bite.');
    expect(to2014Grammar('One creature within 60 feet must make a DC 14 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, and is poisoned until the end of its next turn on a failed save.')).toBe('One creature within 60 feet must make a DC 14 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save. On a failed save, the target is also poisoned until the end of its next turn.'); // the Ash Choke double (step 6 round three)
  });
});

describe('the author forms (step 6 repairs)', () => {
  test('a save with no effect deals damage; movement prose normalises; a damage-taken trigger gains once per turn', () => {
    const p = parseAuthorResponse(JSON.stringify({ attacks: [], saves: [{ clause: 'drags under', name: 'Drag Under', stat: 'Strength', target: 'one creature within 30 feet', damage: false, condition: null, movement: 'pulled up to 10 feet toward the hound', success: 'none', recharge: false }],
      traits: [{ clause: 'cloud of ash', name: 'Cloud of Ash', trigger: 'When she would take damage', effect: 'she dissolves into ash and has Resistance to that damage' }], reactions: [] }), { attackKeys: [], attackCap: 2 });
    expect(p.saves[0].movement).toBe('pulled up to 10 feet'); expect(p.saves[0].damage).toBe(false);
    expect(p.traits[0].trigger).toBe('Once per turn, when she would take damage');
    const imm = parseAuthorResponse(JSON.stringify({ traits: [{ clause: 'adamantine', name: 'Adamantine Shell', trigger: 'When the bull is hit by a weapon that is not adamantine', effect: 'the bull takes no damage from the attack' }] }), { attackKeys: [] });
    expect(imm.traits[0].trigger).toBe('When the bull is hit by a weapon that is not adamantine'); // an immunity is a rule, not a once-per-turn resource
    expect(parseAuthorResponse(JSON.stringify({ saves: [{ clause: 'breathes scalding steam', name: 'Scalding Steam', stat: 'Dexterity', target: 'each creature in a 20-foot Cone', damage: true, type: 'Fire', recharge: true }] }), { attackKeys: [] }).saves[0].type).toBe('Fire');
    const q = parseAuthorResponse(JSON.stringify({ saves: [{ clause: 'x', name: 'Reeking Hug', stat: 'Constitution', target: 'one creature within 30 feet', damage: false, condition: null, movement: null }] }), { attackKeys: [] });
    expect(q.saves[0].damage).toBe(true); // a save must DO something
    expect(buildRepairPrompt({ name: 'Meshrin', inline: 'Meshrin', clauses: [{ text: 'is trained in fighting styles' }], cr: 8, sheet: 'Actions / Greatsword: …' })).toMatch(/^You are repairing the ABILITIES[^]*1\. is trained in fighting styles/);
  });
  test('a negated key does not route: "cannot cast any spells" is not a caster', () => {
    expect(verbHits('a wizard but he cannot cast any spells, he just hits people with his staff').some((h) => h.id === 'caster')).toBe(false);
    expect(verbHits('a hermit who casts spells at thieves').some((h) => h.id === 'caster')).toBe(true);
  });
  test('floor-as-pricer: a damage row under the floor is priced at the floor instead of logged as still under', () => {
    const scaled = scaleDonor(pickDonor(13, null, 'defender'), 13, { mechanics: [] }); const per = Math.round(scaled.per_hit);
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Antlers attacks.' }, { name: 'Antlers', text: `*Melee Attack Roll:* +8, reach 5 ft. ${per} (3d8 + 3) Piercing damage.` }] };
    const vc = valueCheck({ name: 'Driving Bellow (2/Day)', text: '*Strength Saving Throw*: DC 17, one creature within 30 feet. *Failure:* 7 (2d6) Thunder damage, and the target has the Prone condition.' }, { scaled, sections, section: 'Actions', cr: 13 });
    expect(vc.steps.some((s) => /priced at the (?:floor|cap)/.test(s))).toBe(true); // a gated single-target row whose floor sits above the nova cap: the cap is the price, the row ships
    expect(vc.steps.some((s) => /still under/.test(s))).toBe(false);
    const single = valueCheck({ name: 'Lash', text: '*Dexterity Saving Throw*: DC 17, one creature within 30 feet. *Failure:* 4 (1d8) Thunder damage. *Success:* Half damage.' }, { scaled, sections, section: 'Actions', cr: 13 });
    expect(single.steps.some((s) => /still under/.test(s))).toBe(false); expect(single.ev).toBeGreaterThanOrEqual(single.floor * 0.95);
  });
});
