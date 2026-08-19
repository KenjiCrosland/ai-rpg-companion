import { generateReskin, buildReskinPrompt } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const answer = (over = {}) => JSON.stringify({
  name: 'Gloam Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral Evil',
  senses: 'darkvision 60 ft.', languages: 'Sylvan',
  renames: {
    'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Sweeping Area Attack': 'Bramble Sweep',
    'Signature Slot': 'Waylay', 'Escape Action': 'Fade Between Hedges', 'Mobility Trait': 'Hedge Runner',
    'Reactive Reposition': 'Slip the Ring', 'Legendary Move and Attack': 'Circling Cut',
    'Legendary Ranged Attack': 'Parting Thorn', 'Legendary Escape': 'Gone to Green',
  },
  damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Sweep': 'Slashing', 'Molten Glass Lash': 'Slashing', 'Burning Gel Gobbet': 'Fire', 'Glassstorm Scythe': 'Slashing' },
  conditions: { condition_minor: 'Prone' },
  melee_rider: 'none',
  wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition, and its Speed is halved until the start of the creature\'s next turn.',
  ...over,
});

test('a full reskin ships: renames applied, references follow, wildcard lands', async () => {
  const m = await generateReskin({ concept: 'a hedge-fey that waylays travelers', cr: 8 }, async () => answer());
  expect(m.name).toBe('Gloam Courser');
  const all = Object.values(m.sections).flat();
  expect(all.map((e) => e.name).join('|')).not.toMatch(/Melee Attack|Ranged Attack|Signature Slot|Escape Action/);
  expect(all.find((e) => e.name === 'Multiattack').text).toMatch(/Thorn Rake or Cast Thorn/);
  expect(all.find((e) => e.name === 'Waylay').text).toMatch(/DC 15.*Prone/s);
  expect(all.find((e) => /Bramble Sweep/.test(e.name)).name).toMatch(/Recharge 5-6/);
  expect(m.generation).toEqual({ path: 'reskin', donor: 'skirmisher-8', archetype: 'skirmisher' });
});

test('an unrenamed entry fails the block LOUDLY — no fallback names', async () => {
  const partial = JSON.parse(answer());
  delete partial.renames['Escape Action'];
  await expect(generateReskin({ concept: 'x', cr: 8 }, async () => JSON.stringify(partial)))
    .rejects.toThrow(/unrenamed entry.*Escape Action/);
});

test('a cheating wildcard keeps the chassis text', async () => {
  const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
    wildcard: 'It is very scary and no one escapes its judgment, which is dreadful.',
  }));
  expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Disadvantage on its next attack roll/);
});

test('the prompt shows mechanics, never flavor, and prices the wildcard', () => {
  const p = buildReskinPrompt(scaleDonor(pickDonor(12), 12), { concept: 'c' });
  expect(p).toMatch(/Signature Slot/);
  expect(p).toMatch(/damage at most \d+/);
});

describe('batch-review fixes (2026-08-18)', () => {
  test('the roll line survives renaming: "*Melee Attack Roll:*" is rules text, not a reference', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer());
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).toMatch(/\*Melee Attack Roll:\* \+8/);
    const ranged = Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn');
    expect(ranged.text).toMatch(/\*Ranged Attack Roll:\* \+8/);
  });

  test('a "The"-prefixed name sheds its article — no "the the"', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ name: 'The Cindermoss' }));
    expect(m.name).toBe('Cindermoss');
    expect(Object.values(m.sections).flat().map((e) => e.text).join(' ')).not.toMatch(/\bthe the\b/i);
  });

  test('hp formula matches its own dice; XP populates', async () => {
    const m = await generateReskin({ concept: 'x', cr: 5 }, async () => answer());
    const dice = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?/.exec(m.hp_formula);
    const avg = Number(dice[1]) * (Number(dice[2]) + 1) / 2 + Number(dice[3] ?? 0);
    expect(Math.abs(avg - m.hp)).toBeLessThanOrEqual(8);
    expect(m.challenge_rating).not.toMatch(/XP 0;/);
  });

  test('the nova per-use ceiling holds at every pilot CR', async () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    for (const cr of [8, 12, 16, 20]) {
      const s = sd(pd(cr), cr);
      const nova = Object.values(s.sections).flat().find((e) => e.gate);
      const avg = Number(/(\d+) \(/.exec(nova.text)[1]);
      expect(`CR ${cr}: ${avg}`).toBe(`CR ${cr}: ${avg <= Math.min(Math.round(6 * cr), 70) + 7 ? avg : 'OVER CEILING'}`);
    }
  });

  test('an aura-shaped or second-person wildcard keeps chassis text — with the scaled DC', async () => {
    for (const bad of [
      'Each creature that starts its turn within 30 feet of the creature takes 10 (3d6) Fire damage.',
      'When a creature fails a save against your gaze (DC 15), it has Disadvantage on attack rolls.',
    ]) {
      const m = await generateReskin({ concept: 'x', cr: 20 }, async () => answer({ wildcard: bad }));
      const slot = Object.values(m.sections).flat().find((e) => e.name === 'Waylay');
      expect(slot.text).toMatch(/Disadvantage on attack rolls until the start/);
      expect(slot.text).toMatch(/DC 21/); // the fallback carries the SCALED DC now
    }
  });
});

describe('rename completeness is VALIDATED, so retries fire before the loud throw', () => {
  const { makeReskinValidator, buildReskinPrompt: bp } = require('../generate.mjs');
  const { pickDonor: pd2, scaleDonor: sd2 } = require('../scale.mjs');

  test('an omitted rename fails validation (the retry trigger); a complete one passes', () => {
    const scaled = sd2(pd2(8), 8);
    const validate = makeReskinValidator(scaled);
    const full = JSON.parse(answer());
    expect(validate(JSON.stringify(full))).toBe(true);
    const partial = JSON.parse(answer());
    delete partial.renames['Mobility Trait'];
    expect(validate(JSON.stringify(partial))).toBe(false);
  });

  test('the prompt enumerates every required rename key explicitly', () => {
    const scaled = sd2(pd2(20), 20);
    const p = bp(scaled, { concept: 'c' });
    for (const k of ['Mobility Trait', 'Signature Slot', 'Legendary Escape']) expect(p).toContain(`"${k}":`);
    expect(p).toMatch(/none omitted/);
  });
});

describe('batch two (2026-08-18): types are reskin outputs, wildcards land in their section', () => {
  test('donor placeholders fill from the concept register — no physical survives unchosen', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer());
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{damage_type\}/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn').text).toMatch(/Piercing damage/);
  });

  test('a response omitting a typed row fails validation — the retry trigger', () => {
    const { makeReskinValidator } = require('../generate.mjs');
    const { pickDonor: pd3, scaleDonor: sd3 } = require('../scale.mjs');
    const v = makeReskinValidator(sd3(pd3(8), 8));
    const partial = JSON.parse(answer());
    delete partial.damage_types['Bramble Sweep'];
    expect(v(JSON.stringify(partial))).toBe(false);
    expect(v(answer())).toBe(true);
  });

  test('nova ceiling now slopes: 12/16/20 differ', () => {
    const { pickDonor: pd4, scaleDonor: sd4 } = require('../scale.mjs');
    const avgAt = (cr) => Number(/(\d+) \(/.exec(Object.values(sd4(pd4(cr), cr).sections).flat().find((e) => e.gate).text)[1]);
    const [a, b, c] = [12, 16, 20].map(avgAt);
    expect(new Set([a, b, c]).size).toBeGreaterThan(1);
    expect(c).toBeLessThanOrEqual(80);
  });

  test('a bonus-action wildcard moves to Bonus Actions; a reaction mints a Reactions section', async () => {
    const m1 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'As a Bonus Action, the creature emits a chime: one creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    expect((m1.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Waylay')).toBe(true);
    const m2 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature takes damage from a creature within 60 feet, it can use its Reaction to force that creature to make a DC 15 Constitution Saving Throw or have Disadvantage on attack rolls until the end of its next turn.',
    }));
    expect((m2.sections.Reactions ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('a teleport-triggered wildcard on a walker keeps chassis text; a self-label strips', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature teleports within 5 feet of a foe, that foe must succeed on a DC 15 Dexterity Saving Throw or be Blinded until the end of its next turn.',
    }));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Disadvantage on its next attack roll/);
    const m2 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'Corrosive Snare: one creature within 30 feet must succeed on a DC 15 Dexterity Saving Throw or its Speed is halved until the end of its next turn.',
    }));
    expect(Object.values(m2.sections).flat().find((e) => e.name === 'Waylay').text).not.toMatch(/^Corrosive Snare:/);
  });

  test('lowercase renames ship title-cased', async () => {
    const full = JSON.parse(answer());
    full.renames['Melee Attack'] = 'crystal claw';
    full.damage_types['crystal claw'] = 'Cold';
    full.name = 'shivering bedrock';
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    expect(m.name).toBe('Shivering Bedrock');
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Crystal Claw')).toBe(true);
  });
});

describe('batch three (2026-08-18): the repair call, pronouns, roster, size die', () => {
  test('a near-complete response triggers ONE repair call and ships', async () => {
    const partial = JSON.parse(answer());
    delete partial.renames['Escape Action'];
    delete partial.damage_types['Bramble Sweep'];
    const calls = [];
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      calls.push(prompt);
      if (/completing a partial answer/.test(prompt)) {
        return JSON.stringify({ renames: { 'Escape Action': 'Fade Out' }, damage_types: { 'Sweeping Area Attack': 'Acid' } });
      }
      return JSON.stringify(partial);
    });
    expect(calls.some((c) => /completing a partial answer/.test(c))).toBe(true);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Fade Out')).toBe(true);
    expect(Object.values(m.sections).flat().find((e) => /Bramble Sweep/.test(e.name)).text).toMatch(/Acid damage/);
  });

  test('a repair that still comes back empty fails loudly — the true last resort', async () => {
    const partial = JSON.parse(answer());
    delete partial.renames['Escape Action'];
    await expect(generateReskin({ concept: 'x', cr: 8 }, async (prompt) => (
      /completing a partial answer/.test(prompt) ? JSON.stringify({}) : JSON.stringify(partial)
    ))).rejects.toThrow(/unrenamed entry/);
  });

  test('a pronoun-muddled wildcard keeps chassis text', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or be Frightened; while Frightened this way, the creature cannot willingly move closer to the creature.',
    }));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Disadvantage on its next attack roll/);
  });

  test('the taken-names roster reaches the prompt', () => {
    const { buildReskinPrompt: bp2 } = require('../generate.mjs');
    const { pickDonor: pd5, scaleDonor: sd5 } = require('../scale.mjs');
    const p = bp2(sd5(pd5(8), 8), { concept: 'c', takenNames: ['Uulghoth', 'Skorvith'] });
    expect(p).toMatch(/NAMES ALREADY TAKEN.*Uulghoth/);
  });

  test('the hit die follows the chosen size', async () => {
    const m = await generateReskin({ concept: 'x', cr: 16 }, async () => JSON.stringify({
      ...JSON.parse(answer()), size: 'Gargantuan',
    }));
    expect(m.hp_formula).toMatch(/d20/);
  });
});

describe('the energy rider (owner TODO, landed): priced either way, chosen by concept', () => {
  test('a rider type ships as base physical plus energy, summing to the per-hit budget', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ melee_rider: 'Fire' }));
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    const parts = [...melee.text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].map((x) => Number(x[1]));
    expect(parts.length).toBe(2);
    expect(melee.text).toMatch(/Fire damage/);
    expect(parts[0] + parts[1]).toBeGreaterThanOrEqual(11); // ~the solved per-hit
  });

  test('"none" collapses to the full-budget single clause', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ melee_rider: 'none' }));
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect([...melee.text.matchAll(/\d+ \(\d+d\d+/g)].length).toBe(1);
    expect(melee.text).not.toMatch(/\{damage_type_2\}/);
  });

  test('a missing rider answer is repairable', async () => {
    const partial = JSON.parse(answer());
    delete partial.melee_rider;
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => (
      /completing a partial answer/.test(prompt)
        ? JSON.stringify({ melee_rider: 'Cold' })
        : JSON.stringify(partial)
    ));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text).toMatch(/Cold damage/);
  });
});

describe('batch four quick wins', () => {
  test('xp reaches the field the renderer reads', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer());
    expect(m.xp).toBe(3900);
  });

  test('a user-typed name ships verbatim — never renamed, never title-cased away', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8, fixedName: 'grishnak of the Deep Roads' }, async () => answer());
    expect(m.name).toBe('grishnak of the Deep Roads');
  });

  test('the ranged twin pays the melee premium', async () => {
    const { pickDonor: pd6, scaleDonor: sd6 } = require('../scale.mjs');
    const sc = sd6(pd6(8), 8);
    const avgOf = (t) => [...t.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m2) => n + Number(m2[1]), 0);
    const rows = Object.values(sc.sections).flat();
    const melee = avgOf(rows.find((e) => e.name === 'Melee Attack').text);
    const ranged = avgOf(rows.find((e) => e.name === 'Ranged Attack').text);
    expect(ranged).toBeLessThan(melee);
  });

  test('a Burning Claw with no fire fails validation; with the rider it passes', () => {
    const { makeReskinValidator: mv } = require('../generate.mjs');
    const { pickDonor: pd7, scaleDonor: sd7 } = require('../scale.mjs');
    const v = mv(sd7(pd7(8), 8));
    const claim = JSON.parse(answer());
    claim.renames['Melee Attack'] = 'Burning Claw';
    claim.damage_types['Burning Claw'] = 'Slashing';
    claim.melee_rider = 'none';
    expect(v(JSON.stringify(claim))).toBe(false);
    claim.melee_rider = 'Fire';
    expect(v(JSON.stringify(claim))).toBe(true);
  });

  test('lore rides along for the GM path', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ lore: 'Born of the fen, it hunts oathbreakers along the old toll roads.' }));
    expect(m.lore).toMatch(/oathbreakers/);
  });
});

describe('the Headless Horseman gaps: negotiated movement, a second signature', () => {
  test('"runner" trades the climb for +10 walk', async () => {
    const m = await generateReskin({ concept: 'a spectral rider', cr: 8 }, async () => answer({ speed_shape: 'runner' }));
    expect(m.speed).not.toMatch(/Climb/);
    expect(m.speed).toMatch(/^50 ft\./);
  });

  test('a passive trait wildcard ships; a save-carrying one is rejected', async () => {
    const m = await generateReskin({ concept: 'a headless rider', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Headless', text: 'The creature can\'t be Blinded or Deafened, and it has Immunity to the Frightened condition.' },
    }));
    expect(m.sections.Traits.some((e) => e.name === 'Headless')).toBe(true);
    const m2 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Doom Field', text: 'Each creature within 30 feet must make a DC 20 Saving Throw or die.' },
    }));
    expect((m2.sections.Traits ?? []).some((e) => e.name === 'Doom Field')).toBe(false);
  });
});

describe('the Rimegrave guards', () => {
  test('a role-collapsed wildcard keeps chassis text', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When a creature that the target can see attacks it, the target must make a DC 15 Wisdom Saving Throw or be Frightened until the end of its next turn.',
    }));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Disadvantage on its next attack roll/);
  });

  test('an unrated attack-trigger is rejected; a rate-limited one passes', async () => {
    const bad = 'When a creature within 60 feet attacks the creature, that creature must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on the attack roll.';
    const good = `${bad.replace('.', ', once per round.')}`;
    const m1 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ wildcard: bad }));
    expect(Object.values(m1.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Disadvantage on its next attack roll/);
    const m2 = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ wildcard: good }));
    expect(Object.values(m2.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/once per round/);
  });

  test('a CR 24 Beast lands as Monstrosity; a CR 5 Beast is Unaligned', async () => {
    const m = await generateReskin({ concept: 'x', cr: 22 }, async () => answer({ type: 'Beast', alignment: 'Lawful Neutral' }));
    expect(m.type).toBe('Monstrosity');
    const m2 = await generateReskin({ concept: 'x', cr: 5 }, async () => answer({ type: 'Beast', alignment: 'Neutral Evil' }));
    expect(m2.alignment).toBe('Unaligned');
  });
});

describe('the second Horseman fixes', () => {
  test('the slot fallback save stat interpolates — an oath threatens Wisdom', async () => {
    const m = await generateReskin({ concept: 'an oath-keeper', cr: 8 }, async () => answer({
      slot_save: 'Wisdom',
      wildcard: 'It is very scary and dreadful beyond words entirely.', // rejected -> fallback ships
    }));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/\*Wisdom Saving Throw\*/);
  });

  test('a Vorpal rename fails validation — icon vocabulary is reserved', () => {
    const { makeReskinValidator: mv2 } = require('../generate.mjs');
    const { pickDonor: pd8, scaleDonor: sd8 } = require('../scale.mjs');
    const v = mv2(sd8(pd8(8), 8));
    const claim = JSON.parse(answer());
    claim.renames['Melee Attack'] = 'Vorpal Saber';
    claim.damage_types['Vorpal Saber'] = 'Slashing';
    expect(v(JSON.stringify(claim))).toBe(false);
  });

  test('the style field is in both concept-call JSON schemas', () => {
    const { buildSeedSynthesisPrompt: bsp, buildArchetypeResolvePrompt: bap } = require('../../format-2024/generate.mjs');
    for (const prompt of [
      bsp({ intelligence: 'x', physical: 'x', silhouette: 'x', origin: 'x' }, { cr: 8 }),
      bap('a horseman', '', { cr: 8 }),
    ]) {
      expect(prompt).toMatch(/"style": "<mounted\|skulker\|hurler/);
    }
  });
});

describe('the four smalls + the audit port', () => {
  test('sentence-initial "The creature" substitutes in wildcards', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn. The creature has Advantage on attack rolls against Frightened targets.',
    }));
    const t = Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text;
    expect(t).not.toMatch(/The creature/);
    expect(t).toMatch(/The gloam courser has Advantage/);
  });

  test('a mark-on-move wildcard lands in Traits with a once-per-turn price', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature moves at least 20 feet during its turn, one creature it passed within 5 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t).toBeTruthy();
    expect(t.text).toMatch(/only once per turn/);
  });

  test('an Undead ships its immunity floor', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async () => answer({ type: 'Undead' }));
    expect(m.immunities).toMatch(/Poison; Exhaustion, Poisoned/);
  });

  test('the audit fires and a span-verified rewrite lands in the block', async () => {
    let audited = false;
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        audited = true;
        return JSON.stringify({ findings: [{
          entry: 'Multiattack', section: 'Actions',
          span: 'Thorn Rake or Cast Thorn', rewrite: 'Cast Thorn or Thorn Rake',
          issue: 'attack order test', principle: 4, confidence: 'high',
        }] });
      }
      return answer();
    });
    expect(audited).toBe(true);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Multiattack').text)
      .toMatch(/Cast Thorn or Thorn Rake/);
  });

  test('an audit rename repoints the entry and scrubs the old name', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Fade Between Hedges', section: 'Bonus Actions',
          span: 'Fade Between Hedges',
          issue: 'name promises fading; text teleports', principle: 1, confidence: 'high',
          rename: 'Vanish Into Hedgerow',
        }] });
      }
      return answer();
    });
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names).toContain('Vanish Into Hedgerow');
    expect(names).not.toContain('Fade Between Hedges');
    expect(Object.values(m.sections).flat().map((e) => e.text).join(' '))
      .not.toMatch(/Fade Between Hedges/);
  });

  test('a failing audit call never kills the block', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) throw new Error('provider down');
      return answer();
    });
    expect(m.name).toBe('Gloam Courser');
  });
});

describe('signature targeting + repair retry (owner go 2026-08-18)', () => {
  test('signature elements scope the reskin prompt; absent elements leave it open', () => {
    const scaled = scaleDonor(pickDonor(8), 8);
    const scoped = buildReskinPrompt(scaled, { concept: 'headless horseman', signatureElements: ['the severed head, carried or wielded', 'the terror of the galloping rider'] });
    expect(scoped).toMatch(/SIGNATURE TARGET: the concept's defining element is "the severed head/);
    expect(scoped).toMatch(/Secondary elements.*terror of the galloping rider/);
    expect(buildReskinPrompt(scaled, { concept: 'x' })).not.toMatch(/SIGNATURE TARGET/);
  });

  test('a rejected wildcard gets ONE repair round — the fixed draft ships', async () => {
    let repairPrompt = null;
    const m = await generateReskin(
      { concept: 'x', cr: 8, signatureElements: ['the severed head'] },
      async (prompt) => {
        if (prompt.startsWith('You are repairing rejected ability drafts')) {
          repairPrompt = prompt;
          return JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' });
        }
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer({ wildcard: 'If the target is within 30 feet, it must succeed or be afraid, which is bad.' });
      },
    );
    expect(repairPrompt).toMatch(/role collapse/);
    expect(repairPrompt).toMatch(/the severed head/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Frightened condition/);
  });

  test('a failed repair leaves the chassis text standing', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: 'Still very scary and quite dreadful, honestly.' });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and no one escapes its judgment.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('a rejected trait rides the same repair call and ships repaired', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) {
        expect(prompt).toMatch(/TRAIT draft rejected/);
        return JSON.stringify({ trait_wildcard: { name: 'Grave Sight', text: 'The creature has darkvision out to 120 feet and can see through magical darkness.' } });
      }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Grave Sight', text: 'It deals 10 (3d6) damage to anyone who meets its gaze.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Grave Sight');
    expect(t.text).toMatch(/darkvision out to 120 feet/);
  });

  test('a wildcard referencing a trait that did not ship is dangling — rejected', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        trait_wildcard: { name: 'Lantern Head', text: 'It deals 8 (2d4+3) damage when stared at.' },
        wildcard: '*Wisdom Saving Throw*: DC 15, one creature that can see the Lantern Head. *Failure:* The target has the Frightened condition.',
      });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });
});

describe('v6 batch: detachment accounting, remote-ranged, sapient languages', () => {
  test('a thrown head with no return clause is rejected, and the repair ships it with one', async () => {
    let repairPrompt = null;
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) {
        repairPrompt = prompt;
        return JSON.stringify({ wildcard: 'As a Bonus Action, the creature throws its severed head to a point within 30 feet. Each creature within 10 feet must succeed on a DC 15 Dexterity Saving Throw or take 10 (3d8) Fire damage. The head returns to the creature\'s hand at the start of its next turn.' });
      }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'As a Bonus Action, the creature throws its severed head to a point within 30 feet. Each creature within 10 feet must succeed on a DC 15 Dexterity Saving Throw or take 10 (3d8) Fire damage.' });
    });
    expect(repairPrompt).toMatch(/no return clause/);
    const e = (m.sections['Bonus Actions'] ?? []).find((x) => x.name === 'Waylay');
    expect(e.text).toMatch(/returns to the gloam courser's hand/);
  });

  test('acting from a distant point must be ranged — melee-from-afar is rejected', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. The creature can make attack rolls from that point as if it were there.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('a sapient Undead answering Languages None gets the print idiom; bestial stays None', async () => {
    const und = await generateReskin({ concept: 'x', cr: 8, mind: 'sapient' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ type: 'Undead', languages: 'None' });
    });
    expect(und.languages).toBe('Common plus the languages it knew in life');
    const beast = await generateReskin({ concept: 'x', cr: 8, mind: 'bestial' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ languages: 'None' });
    });
    expect(beast.languages).toBe('None');
    const spoken = await generateReskin({ concept: 'x', cr: 8, mind: 'sapient' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ languages: 'Sylvan' });
    });
    expect(spoken.languages).toBe('Sylvan');
  });

  test('the wildcard prompt states the detachment and remote-ranged rules', () => {
    const p = buildReskinPrompt(scaleDonor(pickDonor(8), 8), { concept: 'c' });
    expect(p).toMatch(/detaches part of the creature's body must state/);
    expect(p).toMatch(/RANGED attacks only/);
  });
});

describe('the wisp-queen death (2026-08-18): skulker donors and the typed-row definition', () => {
  const { makeReskinValidator } = require('../generate.mjs');
  const skulkerAnswer = (over = {}) => JSON.stringify({
    name: 'Wisp Queen', type: 'Fey', size: 'Medium', alignment: 'Chaotic Neutral',
    senses: 'darkvision 120 ft.', languages: 'Common, Sylvan',
    renames: {
      'Mobility Trait': 'Marsh Dancer', 'Reactive Reposition': 'Flicker Away',
      'Melee Attack': 'Lantern Touch', 'Ranged Attack': 'Wisplight Beam',
      'Dread Gaze': 'Luring Gaze', 'Signature Slot': 'False Hope',
      'Escape Action': 'Fade to Fen', 'Blink Step': 'Bog Blink',
    },
    damage_types: { 'Lantern Touch': 'Psychic', 'Wisplight Beam': 'Psychic', 'Luring Gaze': 'Psychic' },
    conditions: { condition_minor: 'Frightened' },
    melee_rider: 'none', slot_save: 'Wisdom',
    wildcard: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Charmed condition until the end of its next turn.',
    ...over,
  });

  test('a damage-less gated row (Blink Step) needs NO damage type; a save-damage row (Dread Gaze) does', () => {
    const scaled = scaleDonor(pickDonor(13, 'skulker'), 13);
    const validate = makeReskinValidator(scaled);
    expect(validate(skulkerAnswer())).toBe(true); // no type for Bog Blink — passes
    const missingGaze = JSON.parse(skulkerAnswer());
    delete missingGaze.damage_types['Luring Gaze'];
    expect(validate(JSON.stringify(missingGaze))).toBe(false);
  });

  test('the prompt asks for damage types on exactly the rows that carry the slot', () => {
    const scaled = scaleDonor(pickDonor(13, 'skulker'), 13);
    const p = buildReskinPrompt(scaled, { concept: 'wisp queen' });
    expect(p).toMatch(/the new name you gave "Dread Gaze"/);
    expect(p).not.toMatch(/the new name you gave "Blink Step"/);
    expect(p).toMatch(/If the damage does not pay the word, drop the word/);
  });

  test('a full skulker reskin ships — the gaze row fills, the teleport stays typeless', async () => {
    const m = await generateReskin({ concept: 'wisp queen', cr: 13, style: 'skulker' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return skulkerAnswer();
    });
    expect(m.generation.donor).toBe('skirmisher-13-skulker');
    const all = Object.values(m.sections).flat();
    expect(all.find((e) => e.name === 'Luring Gaze').text).toMatch(/Psychic damage/);
    expect(all.find((e) => /Bog Blink/.test(e.name)).text).toMatch(/teleports up to 120 feet/);
  });

  test('a fire-claiming name on a psychic row fails validation WITH a reason', () => {
    const scaled = scaleDonor(pickDonor(13, 'skulker'), 13);
    const validate = makeReskinValidator(scaled);
    const searing = JSON.parse(skulkerAnswer());
    searing.renames['Ranged Attack'] = 'Searing Marshfire Beam';
    searing.damage_types['Searing Marshfire Beam'] = 'Psychic';
    delete searing.damage_types['Wisplight Beam'];
    expect(validate(JSON.stringify(searing))).toBe(false);
  });
});

describe('name claims: the Radiant Flame precedent (34/35 corpus measurement)', () => {
  const { makeReskinValidator: mkv } = require('../generate.mjs');
  const vAt13 = () => mkv(scaleDonor(pickDonor(13, 'skulker'), 13));
  const withRanged = (rename, type) => {
    const base = {
      name: 'Wisp Queen', type: 'Fey', size: 'Medium', alignment: 'Neutral',
      renames: {
        'Mobility Trait': 'Marsh Dancer', 'Reactive Reposition': 'Flicker Away',
        'Melee Attack': 'Lantern Touch', 'Ranged Attack': rename,
        'Dread Gaze': 'Luring Gaze', 'Signature Slot': 'False Hope',
        'Escape Action': 'Fade to Fen', 'Blink Step': 'Bog Blink',
      },
      damage_types: { 'Lantern Touch': 'Psychic', [rename]: type, 'Luring Gaze': 'Psychic' },
      conditions: { condition_minor: 'Frightened' }, melee_rider: 'none',
      wildcard: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Charmed condition.',
    };
    return JSON.stringify(base);
  };

  test('"Witchfire Lance" dealing Psychic is legal — spectral compound', () => {
    expect(vAt13()(withRanged('Witchfire Lance', 'Psychic'))).toBe(true);
  });

  test('"Radiant Flame Bolt" dealing Radiant is legal — the qualified claim, print\'s own move', () => {
    expect(vAt13()(withRanged('Radiant Flame Bolt', 'Radiant'))).toBe(true);
  });

  test('"Burning Lance" dealing Psychic still fails — the unqualified claim stands', () => {
    expect(vAt13()(withRanged('Burning Lance', 'Psychic'))).toBe(false);
  });

  test('"Frostfire Bolt" dealing Cold is legal — one claim paid carries the name', () => {
    expect(vAt13()(withRanged('Frostfire Bolt', 'Cold'))).toBe(true);
  });
});

describe('wisp-queen card fixes: same-type rider merge, senses line', () => {
  test('a rider matching the base type collapses to one full-budget clause', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ melee_rider: 'Necrotic', damage_types: { 'Thorn Rake': 'Necrotic', 'Cast Thorn': 'Psychic', 'Bramble Sweep': 'Necrotic' } });
    });
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).not.toMatch(/plus/);
    expect(melee.text).toMatch(/Necrotic damage/);
  });

  test('a genuinely different rider still splits', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ melee_rider: 'Fire' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text)
      .toMatch(/Slashing damage plus \d+ \(\d+d\d+\) Fire damage/);
  });

  test('the card carries a senses line with computed Passive Perception', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(m.senses).toMatch(/^darkvision 60 ft\.; Passive Perception \d+$/);
    expect(m.senses_special).toBeUndefined();
  });
});

describe('Matador fixes (2026-08-19): muddle false positives, validated repair, HP sync', () => {
  test('a LEGAL double monster-reference no longer trips the muddle guard', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn, and the creature has Advantage on attack rolls against it until then.' });
    });
    const t = Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text;
    expect(t).toMatch(/the gloam courser has Advantage/);
  });

  test('a victim-predicate muddle is still caught', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The creature takes 10 (3d6) Psychic damage and has the Frightened condition.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('the repair call carries a REAL validator — prod retries can fire on a bad repair', async () => {
    let repairValidator = null;
    await generateReskin({ concept: 'x', cr: 8 }, async (prompt, validate) => {
      if (prompt.startsWith('You are repairing')) { repairValidator = validate; return JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' }); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and dreadful beyond all reckoning.' });
    });
    expect(repairValidator(JSON.stringify({ wildcard: 'Still just vibes, no rules.' }))).toBe(false);
    expect(repairValidator(JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' }))).toBe(true);
  });

  test('printed HP equals the formula average — the lint class closes', async () => {
    for (const cr of [8, 13, 15]) {
      const m = await generateReskin({ concept: 'x', cr }, async (prompt) => {
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer();
      });
      const dm = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?/.exec(m.hp_formula);
      expect(m.hp).toBe(Math.floor(Number(dm[1]) * (Number(dm[2]) + 1) / 2) + Number(dm[3] ?? 0));
    }
  });
});
