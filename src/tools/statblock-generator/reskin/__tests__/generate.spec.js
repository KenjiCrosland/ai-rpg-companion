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
  expect(m.generation).toMatchObject({ path: 'reskin', donor: 'skirmisher-8', archetype: 'skirmisher' });
  expect(m.generation.cite).toMatch(/Assassin/); // cited template carries its rung
});

test('an unrenamed entry fails the block LOUDLY — no fallback names', async () => {
  const partial = JSON.parse(answer());
  delete partial.renames['Mobility Trait'];
  await expect(generateReskin({ concept: 'x', cr: 8 }, async () => JSON.stringify(partial)))
    .rejects.toThrow(/unrenamed entry.*Mobility Trait/);
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
    for (const k of ['Mobility Trait', 'Signature Slot', 'Legendary Move and Attack']) expect(p).toContain(`"${k}":`);
    // the escape rows standardized out of the rename pool (2026-08-26)
    expect(p).not.toContain('"Legendary Escape":');
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
    delete partial.renames['Mobility Trait'];
    delete partial.damage_types['Bramble Sweep'];
    const calls = [];
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      calls.push(prompt);
      if (/completing a partial answer/.test(prompt)) {
        return JSON.stringify({ renames: { 'Mobility Trait': 'Fade Out' }, damage_types: { 'Sweeping Area Attack': 'Acid' } });
      }
      return JSON.stringify(partial);
    });
    expect(calls.some((c) => /completing a partial answer/.test(c))).toBe(true);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Fade Out')).toBe(true);
    expect(Object.values(m.sections).flat().find((e) => /Bramble Sweep/.test(e.name)).text).toMatch(/Acid damage/);
  });

  test('a repair that still comes back empty fails loudly — the true last resort', async () => {
    const partial = JSON.parse(answer());
    delete partial.renames['Mobility Trait'];
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
  test('a role-collapsed wildcard FAILS OPEN after repair: the draft ships flagged (tier policy 2026-08-19)', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'When a creature that the target can see attacks it, the target must make a DC 15 Wisdom Saving Throw or be Frightened until the end of its next turn.',
      });
    });
    // judgment tier: the ambiguous-antecedent draft survives the table; it ships over the flag
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Frightened until the end/);
  });

  test('an unrated attack-trigger fails open after repair; a rate-limited one passes clean', async () => {
    const bad = 'When a creature within 60 feet attacks the creature, that creature must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on the attack roll.';
    const good = `${bad.replace('.', ', once per round.')}`;
    const m1 = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: bad });
    });
    expect(Object.values(m1.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/attacks the gloam courser/); // shipped flagged
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
    // chassis rewrite-immunity (2026-08-25): Multiattack is engine-authored,
    // so the judge's rewrite is now BLOCKED — the text stands unchanged
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Multiattack').text)
      .toMatch(/Thorn Rake or Cast Thorn/);
  });

  test('an audit rename repoints the entry and scrubs the old name', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Hedge Runner', section: 'Traits',
          span: 'Hedge Runner',
          issue: 'name promises hedges; text is generic mobility', principle: 1, confidence: 'high',
          rename: 'Vanish Into Hedgerow',
        }] });
      }
      return answer();
    });
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names).toContain('Vanish Into Hedgerow');
    expect(names).not.toContain('Hedge Runner');
    expect(Object.values(m.sections).flat().map((e) => e.text).join(' '))
      .not.toMatch(/Hedge Runner/);
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
    expect(scoped).toMatch(/Remaining elements.*terror of the galloping rider/);
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
    // the damaging-BA override files it as an ACTION now — a 3d8 bonus
    // action is unpriced sustained DPR (Vexing Shriek ruling, 2026-08-24)
    const e = Object.values(m.sections).flat().find((x) => x.name === 'Waylay');
    expect(e.text).toMatch(/returns to the gloam courser's hand/);
    expect((m.sections['Bonus Actions'] ?? []).some((x) => x.name === 'Waylay')).toBe(false);
  });

  test('melee-from-afar is flagged and fails open after repair (judgment tier)', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. The creature can make attack rolls from that point as if it were there.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/from that point/); // ships flagged; the audit-tier owns the remaining judgment
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
      'Ranged Save Effect': 'Luring Gaze', 'Signature Slot': 'False Hope',
      'Escape Action': 'Fade to Fen', 'Teleport': 'Bog Blink',
    },
    damage_types: { 'Lantern Touch': 'Psychic', 'Wisplight Beam': 'Psychic', 'Luring Gaze': 'Psychic' },
    conditions: { condition_minor: 'Frightened' },
    melee_rider: 'none', slot_save: 'Wisdom',
    wildcard: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Charmed condition until the end of its next turn.',
    ...over,
  });

  test('a damage-less gated row (Teleport) needs NO damage type; a save-damage row (Ranged Save Effect) does', () => {
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
    expect(p).toMatch(/the new name you gave "Ranged Save Effect"/);
    expect(p).not.toMatch(/the new name you gave "Teleport"/);
    expect(p).toMatch(/If the damage does not pay the word, drop the word/);
  });

  test('a full skulker reskin ships — the gaze row fills, the teleport stays typeless', async () => {
    const m = await generateReskin({ concept: 'wisp queen', cr: 13, style: 'skulker' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return skulkerAnswer();
    });
    expect(m.generation.donor).toBe('skirmisher-13-skulker');
    expect(m.generation.invented).toBe(true); // no printed skulker above CR 8 — the flag rides to the log
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
        'Ranged Save Effect': 'Luring Gaze', 'Signature Slot': 'False Hope',
        'Escape Action': 'Fade to Fen', 'Teleport': 'Bog Blink',
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

describe('repair-as-retry (owner go, 2026-08-23): defects go to informed repair, not blind resends', () => {
  test('a defective response is accepted structurally and repaired in one informed round', async () => {
    let mainCalls = 0;
    let repairPrompt = null;
    const m = await generateReskin({ concept: 'a gaze-less blade dancer', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        repairPrompt = prompt;
        return JSON.stringify({ renames: { 'Mobility Trait': 'Sliding Feint' } });
      }
      mainCalls += 1;
      const partial = JSON.parse(answer());
      partial.renames['Mobility Trait'] = 'Retreat of the Perfect Silver Form'; // 6 words — defect
      return JSON.stringify(partial);
    });
    expect(mainCalls).toBe(1); // ONE main call — no blind resends
    expect(repairPrompt).toMatch(/Problems found with the previous answer/);
    expect(repairPrompt).toMatch(/over 4 words: "Retreat of the Perfect Silver Form"/);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Sliding Feint')).toBe(true);
  });

  test('a claim-unpaid rename is re-asked as a RENAME with the reason stated', async () => {
    let repairPrompt = null;
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        repairPrompt = prompt;
        return JSON.stringify({ renames: { 'Ranged Attack': 'Grave Bolt' }, damage_types: { 'Ranged Attack': 'Necrotic' } });
      }
      const bad = JSON.parse(answer());
      bad.renames['Ranged Attack'] = 'Burning Bolt';
      bad.damage_types = { 'Thorn Rake': 'Slashing', 'Burning Bolt': 'Necrotic', 'Bramble Sweep': 'Slashing' };
      return JSON.stringify(bad);
    });
    expect(repairPrompt).toMatch(/claims an element its damage/);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Grave Bolt')).toBe(true);
  });

  test('a weld-violating rider is REPLACED by the repair, not kept', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8, energy: 'Poison' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        return JSON.stringify({ melee_rider: 'Poison', damage_types: { 'Cast Thorn': 'Poison', 'Bramble Sweep': 'Poison' } });
      }
      const bad = JSON.parse(answer());
      bad.melee_rider = 'Acid'; // off-family
      bad.damage_types = { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Poison', 'Bramble Sweep': 'Poison' };
      return JSON.stringify(bad);
    });
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).toMatch(/plus \d+ \(\d+d\d+\) Poison damage/);
    expect(melee.text).not.toMatch(/Acid/);
  });

  test('an over-long rename is repair-eligible, not just a missing one', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        expect(prompt).toMatch(/"Mobility Trait"/);
        return JSON.stringify({ renames: { 'Mobility Trait': 'Flowing Steel' } });
      }
      const partial = JSON.parse(answer());
      partial.renames['Mobility Trait'] = 'Grace of the Unbroken Mirror Dance';
      return JSON.stringify(partial);
    });
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Flowing Steel')).toBe(true);
  });
});

describe('defense derivation (2026-08-19): type floor, self-affinity trio, guarded vulnerability', () => {
  const gen = (over, opts = {}) => generateReskin({ concept: 'x', cr: 8, ...opts }, async (prompt) => {
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return answer(over);
  });

  test('an Elemental gets the measured package', async () => {
    const m = await gen({ type: 'Elemental' });
    expect(m.immunities).toBe('Poison; Exhaustion, Poisoned');
  });

  test('a Fiend gets Poison immunity AND the Cold resistance print gives 21/29 fiends', async () => {
    const m = await gen({ type: 'Fiend' });
    expect(m.immunities).toBe('Poison; Poisoned');
    expect(m.resistances).toMatch(/Cold/);
  });

  test('dealing Fire earns Fire resistance (82% print); dealing Psychic earns nothing (16%)', async () => {
    const fire = await gen({ damage_types: { 'Thorn Rake': 'Fire', 'Cast Thorn': 'Fire', 'Bramble Sweep': 'Fire' } });
    expect(fire.resistances).toMatch(/Fire/);
    const psychic = await gen({ damage_types: { 'Thorn Rake': 'Psychic', 'Cast Thorn': 'Psychic', 'Bramble Sweep': 'Psychic' } });
    expect(psychic.resistances).toBeUndefined();
  });

  test('a concept-warranted vulnerability ships; unwarranted and dealt-type ones are rejected', async () => {
    const ash = await gen(
      { vulnerability: 'Cold', damage_types: { 'Thorn Rake': 'Fire', 'Cast Thorn': 'Fire', 'Bramble Sweep': 'Fire' } },
      { concept: 'an ash revenant that froze to death on the mountain' },
    );
    expect(ash.vulnerabilities).toBe('Cold'); // "froze" warrants the Cold family
    const lottery = await gen({ vulnerability: 'Thunder' }); // concept 'x' — no thunder words anywhere
    expect(lottery.vulnerabilities).toBeUndefined();
    const bad = await gen({ vulnerability: 'Slashing' }, { concept: 'a slashing blade fiend' }); // warranted but dealt
    expect(bad.vulnerabilities).toBeUndefined();
  });
});

describe('element seats + flight tax + stat coherence (owner rulings 2026-08-19)', () => {
  const { assignSeats } = require('../generate.mjs');
  const { pickDonor: pds, scaleDonor: sds } = require('../scale.mjs');
  const { cardBudget: cbs } = require('../card-budgets.mjs');

  test('tagged elements split the seats: behavior to the action, passive to the trait', () => {
    const seats = assignSeats([
      { element: 'the lighthouse lantern that reveals her', kind: 'object' },
      { element: 'the drowning grasp that pulls prey toward the deep', kind: 'behavior' },
      { element: 'the restless pacing', kind: 'aura' },
    ]);
    expect(seats.action).toBe('the drowning grasp that pulls prey toward the deep');
    expect(seats.trait).toBe('the lighthouse lantern that reveals her');
    expect(seats.packaged).toBe(false);
    expect(seats.rest).toEqual(['the restless pacing']);
  });

  test('one dominant element takes both seats — package mode survives', () => {
    const seats = assignSeats([{ element: 'the severed head, carried or wielded', kind: 'object' }]);
    expect(seats.packaged).toBe(true);
  });

  test('untagged strings keep the pre-tag behavior: element[0], packaged', () => {
    const seats = assignSeats(['first thing', 'second thing']);
    expect(seats.action).toBe('first thing');
    expect(seats.packaged).toBe(true);
    expect(seats.rest).toEqual(['second thing']);
  });

  test('the split prompt names both targets', () => {
    const p2 = buildReskinPrompt(scaleDonor(pickDonor(12), 12), {
      concept: 'widow ghost',
      signatureElements: [
        { element: 'the lantern', kind: 'object' },
        { element: 'the drowning grasp', kind: 'behavior' },
      ],
    });
    expect(p2).toMatch(/wildcard builds the MECHANICS of "the drowning grasp"/);
    expect(p2).toMatch(/trait_wildcard is the passive rule that makes "the lantern" true/);
  });

  test('a fly movement grant stamps Fly (hover) and pays the flight tax', () => {
    const scaled = sds(pds(12), 12, { movement: ['fly'] });
    expect(scaled.speed).toMatch(/Fly \d+ ft\. \(hover\)/);
    expect(scaled.hp).toBe(Math.round(cbs(12, {}).hp * 0.9));
  });

  test('the tax keys on the sheet: winged donors pay it once, grounded pay none', () => {
    expect(sds(pds(8, 'winged'), 8).hp).toBe(Math.round(cbs(8, {}).hp * 0.9));
    expect(sds(pds(8), 8).hp).toBe(cbs(8, {}).hp);
  });

  test('the striker stat pays the attack bonus: mod + PB = card atk at every seat', () => {
    for (const cr of [3, 8, 12, 15, 20]) {
      const sc = sds(pds(cr, 'skulker'), cr);
      const mod = Math.max(Math.floor((sc.stats.DEX - 10) / 2), Math.floor((sc.stats.STR - 10) / 2));
      expect(`CR ${cr}: ${mod + sc.pb}`).toBe(`CR ${cr}: ${sc.atk}`);
    }
  });

  test('skills re-derive from final stats — Stealth matches raised DEX', () => {
    const sc = sds(pds(12, 'skulker'), 12);
    const dexMod = Math.floor((sc.stats.DEX - 10) / 2);
    expect(sc.skills).toContain(`Stealth +${dexMod + sc.pb}`);
  });
});

describe('the Gambler batch (2026-08-19): projectile subsystem, three guard false-positives', () => {
  const { makeReskinValidator: mkvG } = require('../generate.mjs');
  const { pickDonor: pdG, scaleDonor: sdG } = require('../scale.mjs');

  const hurlerAnswer = (over = {}) => {
    const scaled = sdG(pdG(8, 'hurler'), 9);
    const renames = {};
    for (const es of Object.values(scaled.sections)) {
      for (const e of es) {
        if (!e.rules && !/^(Multiattack|Legendary Action Uses)/.test(e.name)) renames[e.name] = `Odd ${e.name.split(' ')[0]} Trick`;
      }
    }
    const damage_types = {};
    for (const es of Object.values(scaled.sections)) {
      for (const e of es) { if (e.text.includes('{damage_type}')) damage_types[renames[e.name]] = 'Force'; }
    }
    return JSON.stringify({
      name: 'Knucklebone Gambler', type: 'Fey', size: 'Small', alignment: 'Chaotic Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common, Sylvan',
      renames, damage_types, conditions: { condition_minor: 'Prone' },
      melee_rider: 'none', slot_save: 'Dexterity', projectile: 'a knucklebone',
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll.',
      ...over,
    });
  };

  test('the projectile fills everywhere — no braces ship', async () => {
    const m = await generateReskin({ concept: 'x', cr: 9, style: 'hurler' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return hurlerAnswer();
    });
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{projectile\}/);
    expect(all).toMatch(/a knucklebone returns to the knucklebone gambler's grasp/);
  });

  test('a missing projectile fails validation with its own reason', () => {
    const v = mkvG(sdG(pdG(8, 'hurler'), 9));
    const noProj = JSON.parse(hurlerAnswer());
    delete noProj.projectile;
    expect(v(JSON.stringify(noProj))).toBe(false);
    expect(v(hurlerAnswer())).toBe(true);
  });

  test('the hurler prompt asks for the projectile; grounded donors do not', () => {
    expect(buildReskinPrompt(sdG(pdG(8, 'hurler'), 9), { concept: 'c' })).toMatch(/"projectile":/);
    expect(buildReskinPrompt(sdG(pdG(8), 8), { concept: 'c' })).not.toMatch(/"projectile":/);
  });

  test('"Cursed Dice Blast" dealing Force is legal — ice no longer matches inside Dice', () => {
    const v = mkvG(sdG(pdG(8, 'hurler'), 9));
    const dice = JSON.parse(hurlerAnswer());
    const oldName = Object.values(dice.renames).find((n) => dice.damage_types[n]);
    const key = Object.keys(dice.renames).find((k) => dice.renames[k] === oldName);
    dice.renames[key] = 'Cursed Dice Blast';
    dice.damage_types['Cursed Dice Blast'] = 'Force';
    delete dice.damage_types[oldName];
    expect(v(JSON.stringify(dice))).toBe(true);
  });

  test('"one target it can see" establishes the target — no role collapse', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature tosses shimmering dice at one target it can see within 30 feet. The target must succeed on a DC 15 Dexterity Saving Throw or take 10 (3d6) Force damage.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/shimmering dice/);
  });

  test('"ignores cover" is a rule — the trait guard accepts it', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Curving Shot', text: 'The creature\'s ranged attacks ignore half cover and three-quarters cover.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Curving Shot')).toBe(true);
  });
});

describe('Croupier fixes (2026-08-19): frame-vs-mention, print sentence budget, repair salvage', () => {
  test('Magic Resistance grammar survives the trait guard — mentions are not frames', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Loaded Luck', text: 'The creature has Advantage on saving throws against spells, and its ranged attack rolls ignore Half Cover.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Loaded Luck')).toBe(true);
  });

  test('a save FRAME in a trait is still rejected', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Bad Trait', text: '*Wisdom Saving Throw*: DC 15. The target has the Frightened condition.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Bad Trait')).toBe(false);
  });

  test('four sentences ship (print p90); five do not', async () => {
    const four = 'The creature hurls a pair of loaded dice at a point within 30 feet. *Dexterity Saving Throw*: DC 15, each creature within 5 feet of that point. *Failure:* 10 (3d6) Force damage. If both dice land showing the same number, the target also has the Prone condition.';
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: four });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/both dice land/);
  });

  test('repair salvage: a good wildcard ships even when the repaired trait still fails', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) {
        return JSON.stringify({
          wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.',
          trait_wildcard: { name: 'Still Bad', text: '*Wisdom Saving Throw*: DC 15. It is scary.' },
        });
      }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'It is very scary and quite dreadful, honestly, without any rules.',
        trait_wildcard: { name: 'Bad Trait', text: '*Dexterity Saving Throw*: DC 15. It deals 10 (3d6) damage.' },
      });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Frightened condition/);
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Still Bad')).toBe(false);
  });
});

describe('Duchess fixes (2026-08-19): establishment breadth, spark, term caps', () => {
  test('"hits a target" and "One creature ... saving throw" both establish — the steal survives', async () => {
    for (const w of [
      'When the creature hits a target with a melee attack, it steals one nonmagical object the target is wearing. The target can retrieve it by touching the creature with a successful DC 15 Dexterity check.',
      'One creature within 30 feet must make a DC 15 Charisma saving throw. On a failed save, the target has the Charmed condition until the end of its next turn.',
    ]) {
      const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer({ wildcard: w });
      });
      expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
        .not.toMatch(/Disadvantage on its next attack roll/);
    }
  });

  test('"Stolen Spark" dealing Psychic is legal; "Shockspark Bolt" still claims via shock', () => {
    const { makeReskinValidator: mk } = require('../generate.mjs');
    const { pickDonor: pd9, scaleDonor: sd9 } = require('../scale.mjs');
    const v = mk(sd9(pd9(8), 8));
    const base = JSON.parse(answer());
    base.renames['Ranged Attack'] = 'Stolen Spark';
    base.damage_types['Stolen Spark'] = 'Psychic';
    delete base.damage_types['Cast Thorn'];
    expect(v(JSON.stringify(base))).toBe(true);
    base.renames['Ranged Attack'] = 'Shockspark Bolt';
    base.damage_types['Shockspark Bolt'] = 'Psychic';
    delete base.damage_types['Stolen Spark'];
    expect(v(JSON.stringify(base))).toBe(false);
  });

  test('accepted wildcard text ships 2024 capitalization — advantage and conditions', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Plume Ward', text: 'The creature has advantage on saving throws against spells, and it cannot be charmed or frightened.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Plume Ward').text;
    expect(t).toMatch(/has Advantage on saving throws/);
    expect(t).toMatch(/Charmed or Frightened/);
  });
});

describe('the tier policy (2026-08-19): mechanical fails closed, judgment fails open', () => {
  test('a mechanical failure still keeps the chassis: DC differs from the card', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 20, one creature within 30 feet. *Failure:* The target has the Frightened condition.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('a judgment-flagged repair ships in preference to the original draft', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) {
        // repair fixes the DC (mechanical) but runs 5 sentences (judgment) — ships flagged
        return JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. It drops one object it is holding. The creature can pick that object up as part of this action. The fear fades at the end of the target\'s next turn.' });
      }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 20, one creature within 30 feet. *Failure:* The target has the Frightened condition.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/drops one object/);
  });

  test('a judgment-tier trait ships flagged after a failed repair', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Long Ward', text: 'The creature has Advantage on saving throws against spells. Its feathers shimmer with stolen light. Attack rolls against it while it flies are made with Disadvantage.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Ward')).toBe(true); // over 2 sentences = judgment = ships
  });
});

describe('economy declaration + lint actuator (owner go, 2026-08-19)', () => {
  test('a declared trait economy files the wildcard in Traits with a once-per-turn stamp', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'When the creature hits a target with a melee attack, the target has the Poisoned condition until the end of its next turn.',
      });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t).toBeTruthy();
    expect(t.text).toMatch(/only once per turn/);
  });

  test('a declared bonus_action economy overrides prose guessing', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'bonus_action',
        wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition.',
      });
    });
    expect((m.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('the prompt asks for the economy field', () => {
    expect(buildReskinPrompt(scaleDonor(pickDonor(8), 8), { concept: 'c' })).toMatch(/"wildcard_economy":/);
  });

  test('an undeclared rider-shaped action is moved to Traits by the lint actuator', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'When the creature hits a target with a melee attack, the target has the Poisoned condition until the end of its next turn.',
      });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t).toBeTruthy();
    expect(m.lint_findings.join(' ')).not.toMatch(/action-passive-rider/);
  });

  test('reskin audit mode carries the case-file brief; the skeleton prompt is unchanged', async () => {
    const { buildAuditPrompt: bap } = require('../../format-2024/audit.mjs');
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(bap(m, '2024', { reskin: true })).toMatch(/RESKIN MODE/);
    expect(bap(m, '2024')).not.toMatch(/RESKIN MODE/);
  });
});

describe('the energy weld (owner go, 2026-08-19): call 1 wins', () => {
  const { makeReskinValidator: mkw } = require('../generate.mjs');
  const { pickDonor: pdw2, scaleDonor: sdw2 } = require('../scale.mjs');
  const vWeld = mkw(sdw2(pdw2(8), 8), { energy: 'Poison' });

  test('an off-family energy fails with the rule stated; the declared family and physical pass', () => {
    const acid = JSON.parse(answer());
    acid.damage_types['Cast Thorn'] = 'Acid'; // quicksilver drift
    expect(vWeld(JSON.stringify(acid))).toBe(false);
    const poison = JSON.parse(answer());
    poison.damage_types['Cast Thorn'] = 'Poison';
    poison.damage_types['Bramble Sweep'] = 'Poison';
    expect(vWeld(JSON.stringify(poison))).toBe(true); // Slashing melee + Poison = physical + family
  });

  test('an off-family melee rider fails too', () => {
    const r = JSON.parse(answer());
    r.melee_rider = 'Acid';
    r.damage_types['Cast Thorn'] = 'Poison';
    r.damage_types['Bramble Sweep'] = 'Poison';
    expect(vWeld(JSON.stringify(r))).toBe(false);
    r.melee_rider = 'Poison';
    expect(vWeld(JSON.stringify(r))).toBe(true);
  });

  test('no declared energy -> no weld (blank-path and legacy behavior)', () => {
    const v = mkw(sdw2(pdw2(8), 8));
    expect(v(answer())).toBe(true); // Fire in the stale map keys, Slashing/Piercing rows — all fine unwelded
  });

  test('the prompt states the contract when an energy is declared', () => {
    const pr = buildReskinPrompt(sdw2(pdw2(8), 8), { concept: 'c', energy: 'Poison' });
    expect(pr).toMatch(/THIS creature's energy is Poison/);
  });
});

describe('the filing class, remainder (critic spec 2026-08-19): rider_on, limiter dedupe, self-description', () => {
  test('rider_on appends the clause to the named attack and retires the slot', async () => {
    const m = await generateReskin({ concept: 'a luck-thief', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Thorn Rake',
        wildcard: 'When the creature hits with this attack, it steals one nonmagical trinket the target is wearing, and the target has Disadvantage on its next attack roll.',
      });
    });
    const all = Object.values(m.sections).flat();
    const host = all.find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/steals one nonmagical trinket/);
    expect(all.some((e) => e.name === 'Waylay')).toBe(false); // the slot's seat was consumed
  });

  test('an unknown rider host degrades to a trait, never silently to Actions', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Nonexistent Attack',
        wildcard: 'When the creature hits with this attack, the target has the Frightened condition until the end of its next turn.',
      });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('a reaction-declared wildcard sheds its redundant once-per-round limiter', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'reaction',
        wildcard: 'When a creature within 30 feet misses the creature with an attack roll, the creature takes the Disengage action and can move up to 10 feet. It can use this only once per round.',
      });
    });
    const e = (m.sections.Reactions ?? []).find((x) => x.name === 'Waylay');
    expect(e).toBeTruthy();
    expect(e.text).not.toMatch(/once per round/);
  });

  test('a trait calling itself "this action" is rewritten to match its section', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'When the creature hits a target with a melee attack, the target has the Poisoned condition. The creature can use this action while hidden.',
      });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t.text).toMatch(/use this trait while hidden/);
    expect(t.text).not.toMatch(/this action/);
  });

  test('the trait-minting ban is stated in the wildcard constraints', () => {
    expect(buildReskinPrompt(scaleDonor(pickDonor(8), 8), { concept: 'c' }))
      .toMatch(/Never name or grant a NEW trait inside an ability/);
  });
});

describe('Pilgrim kill-chain fixes (2026-08-19): three proven false positives', () => {
  test('"within 30 feet of the creature must make" is the victim POSITIONED, not the monster as victim', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'One creature within 30 feet of the creature must make a DC 15 Wisdom Saving Throw. On a failed save, the target has the Frightened condition until the end of its next turn.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Frightened condition/);
  });

  test('a real muddle still catches: the monster as save-maker', () => {
    const re = /(?<!\bof )(?<!\bfrom )(?<!\bto )(?<!\bnear )[Tt]he creature (?:must (?:make|succeed)|takes \d|has the [A-Z][a-z]+ condition|repeats the save)/;
    expect(re.test('The creature takes 10 (3d6) Psychic damage and has the Frightened condition.')).toBe(true);
    expect(re.test('One creature within 30 feet of the creature must make a DC 15 save.')).toBe(false);
  });

  test('template row grammar IS a game term (the capability manifest still gates teleports to teleport chassis)', async () => {
    // unit: the vocabulary accepts template grammar...
    const GAME_TERM = /Attack Roll|Saving Throw|DC \d+|\b(Frightened|Poisoned|Blinded|Deafened|Prone|Restrained|Grappled|Charmed|Stunned|Incapacitated) condition\b|Advantage|Disadvantage|Dash|Disengage|Hide action|Speed|[Tt]eleports?|Opportunity Attacks?|Difficult Terrain|unoccupied space|without provoking|Hit Points|\d+ feet/;
    expect(GAME_TERM.test('It teleports up to 30 feet to an unoccupied space it can see.')).toBe(true);
    // ...and the e2e on a plain (no-teleport) chassis still fails CLOSED on
    // the capability manifest — which is the mechanical tier doing its job
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature teleports up to 30 feet to an unoccupied space it can see, and it leaves behind a swirl of gray ash.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('print movement-trait grammar survives the trait guard', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Gray Drift', text: 'The creature\'s movement doesn\'t provoke Opportunity Attacks, and it can move through the space of any creature.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Gray Drift')).toBe(true);
  });

  test('an audit span quoted without markdown asterisks still verifies', () => {
    const { verifyAuditFindings } = require('../../format-2024/audit.mjs');
    const monster = { sections: { Actions: [{ name: 'Sorrowful Gaze', text: '*Wisdom Saving Throw*: DC 15. *Failure:* The target has the Frightened condition.' }] } };
    const raw = JSON.stringify({ findings: [{ entry: 'Sorrowful Gaze', section: 'Actions', span: 'Failure: The target has the Frightened condition.', issue: 'test finding', principle: 1, confidence: 'high' }] });
    expect(verifyAuditFindings(monster, raw).length).toBe(1);
  });
});

describe('acceptance-batch fixes (2026-08-23): the verified five', () => {
  const { pickDonor: pdA, scaleDonor: sdA } = require('../scale.mjs');

  test('the PB ladder reaches print: +7/+8/+9 at 21/25/29', () => {
    expect(sdA(pdA(22), 22).pb).toBe(7);
    expect(sdA(pdA(26), 26).pb).toBe(8);
    expect(sdA(pdA(30), 30).pb).toBe(9);
    expect(sdA(pdA(18), 18).pb).toBe(6);
  });

  test('a collapsed rider re-runs its transforms — no "the creature" ships', async () => {
    const mountedAnswer = JSON.stringify({
      name: 'Gloam Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral',
      renames: { 'Mobility Trait': 'Hedge Runner', 'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Trampling Rush': 'Bramble Charge', 'Signature Slot': 'Waylay', 'Escape Action': 'Fade Out' },
      damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Charge': 'Bludgeoning' },
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.',
    });
    const m = await generateReskin({ concept: 'x', cr: 8, style: 'mounted' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return mountedAnswer;
    });
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).toMatch(/If the gloam courser moved at least 20 feet/);
    expect(melee.text).not.toMatch(/the creature/);
  });

  test('fractional CR looks up real XP', async () => {
    const m = await generateReskin({ concept: 'x', cr: 0.5 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(m.xp).toBeGreaterThan(0);
    expect(m.challenge_rating).not.toMatch(/XP 0;/);
  });

  test('lowercase damage types normalize instead of failing four checks at once', () => {
    const { makeReskinValidator: mkA } = require('../generate.mjs');
    const v = mkA(sdA(pdA(8), 8));
    const low = JSON.parse(answer());
    low.damage_types['Cast Thorn'] = 'piercing';
    low.melee_rider = 'cold';
    expect(v(JSON.stringify(low))).toBe(true);
  });

  test('the lantern trait ships: light levels are rules vocabulary', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Guiding Lantern', text: 'The creature\'s lantern sheds bright light in a 30-foot radius and dim light for an additional 30 feet.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Guiding Lantern')).toBe(true);
  });

  test('monster-actor double references pass; victim-position doubles still catch', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'When the creature hits a target with Thorn Rake, one creature within 30 feet that the creature can see must succeed on a DC 15 Wisdom Saving Throw or have the Frightened condition until the end of its next turn.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Frightened condition/);
  });

  test('a host with the charge rider re-anchors the rider to its free twin', async () => {
    const mountedAnswer = (over = {}) => JSON.stringify({
      name: 'Gloam Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral',
      renames: { 'Mobility Trait': 'Hedge Runner', 'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Trampling Rush': 'Bramble Charge', 'Signature Slot': 'Waylay', 'Escape Action': 'Fade Out' },
      damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Charge': 'Bludgeoning' },
      conditions: { condition_minor: 'Prone' }, melee_rider: 'Fire', slot_save: 'Dexterity',
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, the target has Disadvantage on its next attack roll.',
      ...over,
    });
    const m = await generateReskin({ concept: 'x', cr: 8, style: 'mounted' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return mountedAnswer();
    });
    // the declared host keeps its one rider; the wildcard rides the free
    // twin instead of demoting to a trait (the Petrel's Dazzling Static)
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).not.toMatch(/Disadvantage on its next attack roll/);
    const ranged = Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn');
    expect(ranged.text).toMatch(/Disadvantage on its next attack roll/);
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Waylay')).toBe(false);
  });

  test('a targeting save frame declared "trait" stays an action', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'One creature within 30 feet that the creature can see must succeed on a DC 15 Wisdom Saving Throw or have the Frightened condition until the end of its next turn.',
      });
    });
    expect((m.sections.Actions ?? []).some((e) => e.name === 'Waylay')).toBe(true);
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Waylay')).toBe(false);
  });

  test('alignment ships title-cased', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ alignment: 'chaotic neutral' });
    });
    expect(m.alignment).toBe('Chaotic Neutral');
  });
});

describe('the blessed batch (2026-08-24): rename propagation, embedded economy, redundancy brief', () => {
  test('a repair rename follows into the trait draft — no dangling "Searing Blade"', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        return JSON.stringify({ renames: { 'Ranged Attack': 'Judgment Stroke' }, damage_types: { 'Ranged Attack': 'Radiant' } });
      }
      const bad = JSON.parse(answer());
      bad.renames['Ranged Attack'] = 'Searing Bolt'; // claims Fire, deals Necrotic -> repair renames it
      bad.damage_types = { 'Thorn Rake': 'Slashing', 'Searing Bolt': 'Necrotic', 'Bramble Sweep': 'Slashing' };
      bad.trait_wildcard = { name: 'Blessed Arm', text: 'The creature\'s Searing Bolt attacks ignore Resistance to Necrotic damage.' };
      return JSON.stringify(bad);
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Blessed Arm');
    expect(t.text).toMatch(/Judgment Stroke attacks/);
    expect(t.text).not.toMatch(/Searing Bolt/);
  });

  test('an embedded bonus action inside an action wildcard is flagged (judgment), repaired or shipped flagged', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. The creature can then use its bonus action to move up to half its Speed.' });
    });
    // judgment tier: ships (flagged) rather than chassis
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Frightened condition/);
  });

  test('a damaging wildcard declared bonus_action files as an action', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'bonus_action',
        wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 10 (3d6) Force damage, and the target has the Prone condition.',
      });
    });
    expect((m.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Waylay')).toBe(false);
    expect((m.sections.Actions ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('prompt carries the X/Day register rule and the fused-mount line on mounted chassis only', () => {
    const plain = buildReskinPrompt(scaleDonor(pickDonor(8), 8), { concept: 'c' });
    // concrete example, never variable notation — the Covetous Shade
    // shipped a literal "X/Day" copied from the old prompt (2026-08-26)
    expect(plain).toMatch(/like "\(2\/Day\)"/);
    expect(plain).not.toMatch(/print as \(X\/Day\)/);
    expect(plain).not.toMatch(/MOUNT HANDLING/);
    const { pickDonor: pdm2, scaleDonor: sdm2 } = require('../scale.mjs');
    const mounted = buildReskinPrompt(sdm2(pdm2(8, 'mounted'), 8), { concept: 'c' });
    expect(mounted).toMatch(/MOUNT HANDLING: print never writes rules about a mount/);
    expect(mounted).not.toMatch(/FUSED/);
  });

  test('the reskin audit brief carries the redundancy class', async () => {
    const { buildAuditPrompt: bap2 } = require('../../format-2024/audit.mjs');
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(bap2(m, '2024', { reskin: true })).toMatch(/REDUNDANT RULES/);
  });
});

describe('mount handling (owner ruling 2026-08-24: no dragoon, no fused language)', () => {
  const { assignSeats: asg } = require('../generate.mjs');

  test('on a mounted chassis, mount elements are skipped by the seats', () => {
    const seats = asg([
      { element: 'dire wolf mount', kind: 'object' },
      { element: 'javelin volleys and stab-and-run tactics', kind: 'behavior' },
      { element: 'tribal war-paint', kind: 'body' },
    ], { style: 'mounted' });
    expect(seats.action).toBe('javelin volleys and stab-and-run tactics');
    expect(seats.trait).toBe('tribal war-paint');
    expect(seats.rest).toContain('dire wolf mount');
  });

  test('a mount-only element list still seats (never empty), and other styles are untouched', () => {
    const only = asg([{ element: 'the tireless iron steed', kind: 'object' }], { style: 'mounted' });
    expect(only.action).toBe('the tireless iron steed'); // all we have — keep it
    const skulker = asg([{ element: 'rides the night wind', kind: 'behavior' }], { style: 'skulker' });
    expect(skulker.action).toBe('rides the night wind'); // no filtering off-style
  });
});

describe('concept gating (owner "let\'s do it", 2026-08-24): stock organs ship only when claimed', () => {
  const { pickDonor: pdg, scaleDonor: sdg } = require('../scale.mjs');

  test('no mechanics claimed -> gaze and teleport rows omit; both claimed -> both stay; null -> ungated', () => {
    const closed = sdg(pdg(13, 'skulker'), 13, { mechanics: [] });
    const names = Object.values(closed.sections).flat().map((e) => e.name);
    expect(names).not.toContain('Ranged Save Effect');
    expect(names).not.toContain('Teleport');
    expect(closed.gated_out).toEqual(['Ranged Save Effect (gaze)', 'Teleport (teleport)']);

    const open = sdg(pdg(13, 'skulker'), 13, { mechanics: ['gaze', 'teleport'] });
    const openNames = Object.values(open.sections).flat().map((e) => e.name);
    expect(openNames).toContain('Ranged Save Effect');
    expect(openNames).toContain('Teleport');

    const blank = sdg(pdg(13, 'skulker'), 13, { mechanics: null });
    expect(Object.values(blank.sections).flat().some((e) => e.name === 'Teleport')).toBe(true);
  });

  test('partial claim: gaze stays, teleport goes', () => {
    const g = sdg(pdg(8, 'skulker'), 8, { mechanics: ['gaze'] });
    const names = Object.values(g.sections).flat().map((e) => e.name);
    expect(names).toContain('Ranged Save Effect');
    expect(names).not.toContain('Teleport');
  });

  test('a gated block generates end-to-end — renames and validation adapt to the missing rows', async () => {
    const m = await generateReskin({ concept: 'a bog ambusher', cr: 8, style: 'skulker', mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      // full skulker answer minus the gated rows' renames — they no longer exist to rename
      return JSON.stringify({
        name: 'Bog Lurker', type: 'Monstrosity', size: 'Medium', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None',
        renames: { 'Mobility Trait': 'Murk Slide', 'Melee Attack': 'Webbed Claw', 'Ranged Attack': 'Mud Spit', 'Signature Slot': 'Fen Grip', 'Escape Action': 'Slip Under' },
        damage_types: { 'Webbed Claw': 'Slashing', 'Mud Spit': 'Bludgeoning' },
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
        wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition.',
      });
    });
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names).not.toContain('Ranged Save Effect');
    expect(names.join('|')).not.toMatch(/Teleport/);
    expect(names).toContain('Webbed Claw');
  });

  test('untagged rows and other styles are never touched by gating', () => {
    const mounted = sdg(pdg(8, 'mounted'), 8, { mechanics: [] });
    expect(Object.values(mounted.sections).flat().some((e) => /Trampling/.test(e.name))).toBe(true);
    expect(mounted.gated_out).toEqual([]);
  });

  test('the interview asks the gating question', () => {
    const { buildArchetypeResolvePrompt: barG } = require('../../format-2024/generate.mjs');
    const pr = barG('bog lurker', '', { cr: 6 });
    expect(pr).toMatch(/"mechanics": \["<zero or more of/);
    expect(pr).toMatch(/gates for pre-built abilities/);
  });
});

describe('pre-freeze batch (2026-08-25): splice alignment, cross-ref lint, movement, success grammar', () => {
  const { pickDonor: pdF, scaleDonor: sdF } = require('../scale.mjs');

  test('an audit rewrite opening with a sentence subject splices at the sentence boundary', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Venom Synergy', section: 'Traits', principle: 4, confidence: 'high',
          span: 'has Advantage on attack rolls against a Poisoned target',
          rewrite: 'The gloam courser has Advantage on attack rolls against any Poisoned creature',
          issue: 'subject clarity',
        }] });
      }
      return answer({
        conditions: { condition_minor: 'Poisoned' },
        trait_wildcard: { name: 'Venom Synergy', text: 'A creature that touches it takes 2 Poison damage. The creature has Advantage on attack rolls against a Poisoned target.' },
      });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Venom Synergy').text;
    expect(t).toMatch(/The gloam courser has Advantage on attack rolls against any Poisoned creature/);
    expect(t).not.toMatch(/gloam courser The gloam courser/); // the Bog Lurker seam, prevented
    expect(t).not.toMatch(/\.\./);
  });

  test('a dependent condition reference with no applier is flagged; an applied one is not', async () => {
    const orphan = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        conditions: { condition_minor: 'Prone' },
        trait_wildcard: { name: 'Venom Synergy', text: 'The creature has Advantage on attack rolls against a Paralyzed target.' },
      });
    });
    expect(orphan.lint_findings.join(' ')).toMatch(/"Paralyzed" is referenced as a state/);
    const applied = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        conditions: { condition_minor: 'Poisoned' }, // the sweep row now APPLIES Poisoned
        trait_wildcard: { name: 'Venom Synergy', text: 'The creature has Advantage on attack rolls against a Poisoned target.' },
      });
    });
    expect(applied.lint_findings.join(' ')).not.toMatch(/orphan|referenced as a state/);
  });

  test('a movement-state gate without the movement is flagged', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Earth Pulse', text: 'The creature has Advantage on Stealth checks while it is underground.' } });
    });
    expect(m.lint_findings.join(' ')).toMatch(/keys on being underground/);
  });

  test('burrow and swim answers reach the speed line, untaxed', () => {
    const b = sdF(pdF(8), 8, { movement: ['burrow', 'swim'] });
    expect(b.speed).toMatch(/Burrow 30 ft\./);
    expect(b.speed).toMatch(/Swim \d+ ft\./);
    const { cardBudget: cbF } = require('../card-budgets.mjs');
    expect(b.hp).toBe(cbF(8, {}).hp); // no flight tax for fins or claws
  });

  test('a success clause that punishes is flagged judgment-tier and repairable', async () => {
    let repairPrompt = null;
    await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. *Success:* The target has Disadvantage on its next attack roll.' });
    });
    expect(repairPrompt).toMatch(/never a penalty/);
  });

  test('an SRD spell name on a non-spell entry is flagged', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const p = JSON.parse(answer());
      p.renames['Signature Slot'] = 'Misty Step';
      return JSON.stringify(p);
    });
    expect(m.lint_findings.join(' ')).toMatch(/"Misty Step" is an SRD spell name/);
  });

  test('"mounted skirmishing" and "its mount\'s pace" now demote', () => {
    const { assignSeats: asgF } = require('../generate.mjs');
    const seats = asgF([
      { element: 'mounted skirmishing', kind: 'behavior' },
      { element: 'javelin volleys', kind: 'object' },
      { element: 'iron discipline', kind: 'aura' },
    ], { style: 'mounted' });
    expect(seats.action).not.toBe('mounted skirmishing');
    expect(seats.rest).toContain('mounted skirmishing');
  });
});

describe('twenty-smoke prerequisites (2026-08-25): the four must-fixes', () => {
  test('audit rewrites are blocked on chassis rows, allowed on model-written entries', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [
          { entry: 'Hedge Runner', section: 'Traits', principle: 4, confidence: 'high', span: 'ignores Difficult Terrain', rewrite: 'The gloam courser has Advantage on saving throws', issue: 'dup' },
        ] });
      }
      return answer({ renames: { ...JSON.parse(answer()).renames, 'Mobility Trait': 'Hedge Runner' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Hedge Runner').text;
    expect(t).toMatch(/ignores Difficult Terrain/); // engine text untouched
  });

  test('capTerms leaves hyphenated compounds alone', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Tunnel Digger', text: 'The creature digs a collapse-prone tunnel behind it, and creatures inside have Disadvantage on Strength checks.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Tunnel Digger').text;
    expect(t).toMatch(/collapse-prone/);
    expect(t).not.toMatch(/collapse-Prone/);
  });

  test('a declared-physical creature dealing Fire is a defect with the reason stated', () => {
    const { makeReskinValidator: mkP, reskinDefects: rdP } = require('../generate.mjs');
    const { pickDonor: pdP, scaleDonor: sdP } = require('../scale.mjs');
    const scaled = sdP(pdP(8), 8);
    const bad = JSON.parse(answer());
    bad.damage_types['Cast Thorn'] = 'Fire';
    const defects = rdP(scaled, bad, { mix: 'physical' });
    expect(defects.join(' ')).toMatch(/declared fully physical/);
    expect(mkP(scaled, { mix: 'physical' })(JSON.stringify(bad))).toBe(false);
  });

  test('a near-namesake trait name collides (Wolf-Born Skirmisher vs Wolf-Born Skirmish)', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const p = JSON.parse(answer());
      p.renames['Mobility Trait'] = 'Wolf-Born Skirmish';
      p.trait_wildcard = { name: 'Wolf-Born Skirmisher', text: 'The creature has Advantage on Perception checks and ignores Difficult Terrain.' };
      return JSON.stringify(p);
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Wolf-Born Skirmisher')).toBe(false);
  });
});

describe('steady-state pattern fixes (2026-08-25): the five counted families', () => {
  test('the senses field admits only print grammar — commentary and references drop', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ senses: 'darkvision 60 ft. (may be scent instead if desired), truesight 30 ft., see also Awareness of Fallen below' });
    });
    expect(m.senses).toBe(`truesight 30 ft.; Passive Perception ${m.senses.match(/\d+$/)[0]}`);
    expect(m.senses).not.toMatch(/scent|Awareness/);
  });

  test('a legal blindsight parenthetical survives the sanitizer', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ senses: 'blindsight 60 ft. (blind beyond this radius)' });
    });
    expect(m.senses).toMatch(/^blindsight 60 ft\. \(blind beyond this radius\); Passive Perception \d+$/);
  });

  test('a reaction mechanic inside a rider is flagged and repairable', async () => {
    let repairPrompt = null;
    await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Thorn Rake',
        wildcard: 'When the creature hits with this attack, it can use its reaction to move up to 30 feet without provoking Opportunity Attacks.',
      });
    });
    expect(repairPrompt).toMatch(/one entry, one economy/);
  });

  test('metering dialects rewrite to the closed vocabulary', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Gambit', text: 'The creature can vanish and gains Advantage on its next attack roll. It can use this a number of times per day equal to twice its proficiency bonus.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Gambit').text;
    expect(t).toMatch(/6\/Day/); // PB 3 at CR 8, doubled
    expect(t).not.toMatch(/proficiency bonus/);
  });

  test('donor row names in wildcard text get the rename map (the Ranged Save Effect leak)', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Revelation', text: 'When a target fails a saving throw against the creature\'s Signature Slot, it cannot benefit from being lightly obscured. This trait grants Advantage on Perception checks.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Revelation').text;
    expect(t).toMatch(/Waylay/);
    expect(t).not.toMatch(/Signature Slot/);
  });

  test('a condition-gerund name that never applies its condition is flagged', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const p = JSON.parse(answer());
      p.renames['Signature Slot'] = 'Blinding Flare';
      return JSON.stringify(p);
    });
    expect(m.lint_findings.join(' ')).toMatch(/"Blinding Flare" promises Blinded/);
  });
});

describe('spellcasting organ + ordering + metering completion (2026-08-25)', () => {
  const casterAnswer = (over = {}) => JSON.stringify({
    ...JSON.parse(answer()),
    spells: { at_will: ['Darkness', 'Faerie Fire'], daily: ['Misty Step', 'Mirror Image'] },
    ...over,
  });

  test('the checkbox injects a print-standard Spellcasting entry with thematic picks', async () => {
    const m = await generateReskin({ concept: 'a shadow fey', cr: 8, caster: true }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return casterAnswer();
    });
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    expect(sc).toBeTruthy();
    expect(sc.text).toMatch(/\*Darkness\*, \*Faerie Fire\*/);
    expect(sc.text).toMatch(/1\/Day Each:.*\*Misty Step\*/);
    // DC caps at the stat-derivable float (8 + PB + mental mod + 1 = 14
    // at CR 8) — the card's 15 was lint-illegal against WIS 14 all along
    expect(sc.text).toMatch(/spell save DC 14/);
  });

  test('no checkbox, no organ — and Spellcasting is never a rename key', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect((m.sections.Actions ?? []).some((e) => e.name === 'Spellcasting')).toBe(false);
  });

  test('an off-menu pick is a defect with the menu stated; repair fixes it', async () => {
    const { makeReskinValidator: mkS, reskinDefects: rdS } = require('../generate.mjs');
    const { pickDonor: pdS, scaleDonor: sdS } = require('../scale.mjs');
    const scaled = sdS(pdS(8), 8);
    scaled.sections.Actions.push({ name: 'Spellcasting', rules: true, text: 'casts... {spell_at_will} {spell_daily}' });
    const bad = JSON.parse(casterAnswer());
    bad.spells.at_will = ['Fireball', 'Darkness'];
    const defects = rdS(scaled, bad, {});
    expect(defects.join(' ')).toMatch(/"Fireball" is not on the spell menu/);
    expect(mkS(scaled)(casterAnswer())).toBe(true);
  });

  test('mechanical violations outrank judgment flags — the Lantern\'s Mark shadowing is closed', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      // both defects present: embedded bonus action (judgment) AND teleport on a
      // teleport-less chassis (mechanical) — mechanical must win, chassis ships
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition, and the creature can use its bonus action to teleport up to 30 feet.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/); // fail-closed, not fail-open
  });

  test('"twice per day" prose meters to 2/Day', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Gloom Veil', text: 'The creature can become heavily obscured until the start of its next turn. It can do this twice per day.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Gloom Veil').text;
    expect(t).toMatch(/2\/Day/);
    expect(t).not.toMatch(/twice per day/);
  });
});

describe('metering catch-all + rider pricing + reach reconciliation (2026-08-26)', () => {
  const quiet = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a literal X/Day placeholder is mechanical — chassis stands', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 10 (3d6) Necrotic damage. The creature can use this X/Day.',
    })));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('stat-modifier metering is judgment — repaired if possible, shipped flagged if not', async () => {
    const dialect = '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. The creature can use this a number of times equal to its Charisma modifier.';
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: dialect });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: dialect });
    });
    // fail-open per tier doctrine: the unrepaired draft ships with a loud flag
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/times equal to/);
  });

  test('a damage-carrying rider without a limiter gets the once-per-turn stamp', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, one creature within 30 feet must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Necrotic damage.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/must succeed on a DC 15/);
    expect(host.text).toMatch(/This effect can be applied only once per turn\./);
  });

  test('a rider that wrote its own limiter keeps it — no strip, no double stamp', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, one creature within 30 feet must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Necrotic damage. It can do this only once per turn.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text.match(/once per turn/gi)).toHaveLength(1);
  });

  test('a reaction still sheds its redundant limiter — the economy already enforces it', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'reaction',
      wildcard: 'When a creature within 5 feet hits the creature with a melee attack, the attacker takes 7 (2d6) Piercing damage. It can do this only once per turn.',
    })));
    const e = (m.sections.Reactions ?? []).find((x) => x.name === 'Waylay');
    expect(e).toBeTruthy();
    expect(e.text).not.toMatch(/once per turn/i);
  });

  test('a trait claiming a reach no attack row prints is mechanical — no trait ships', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Long Arms', text: "The creature's melee attacks have reach 10 feet, and it isn't hindered by dim light or darkness." },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Arms')).toBe(false);
  });

  test('a trait whose reach claim matches the rows passes', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Long Arms', text: "The creature's melee attacks have reach 5 feet, and it isn't hindered by dim light or darkness." },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Arms')).toBe(true);
  });

  test('trait vet: mechanical outranks the sentence cap — same shadowing class as the action vet', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Watchful', text: 'You cannot hide from it in dim light. It sees you always. It knows where you sleep.' },
    })));
    // second person (mechanical) must win over the 3-sentence judgment cap:
    // fail-closed, no trait — under the old order this shipped flagged
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Watchful')).toBe(false);
  });

  test('an Incapacitated escape-hatch self-reference no longer trips the orphan lint', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: "*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn. The effect ends early if the creature is Incapacitated.",
    })));
    expect(m.lint_findings.join(' ')).not.toMatch(/"Incapacitated"/);
  });
});

describe('probe-smoke pattern fixes (2026-08-26)', () => {
  const quiet = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the prompt\'s own rider grammar passes the guard: a hit-trigger establishes the target', async () => {
    // the roleCollapse guard rejected "When the creature hits with this
    // attack, the target..." three times (Surveyor, Archivist) — the exact
    // grammar the prompt prescribes for riders
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, the target must succeed on a DC 15 Dexterity saving throw or have the Prone condition.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/the target must succeed on a DC 15/);
    expect(host.text).not.toMatch(/one creature within/);
  });

  test('a rider with its own targeting frame gets the rider-specific repair instruction', async () => {
    let repairPrompt = '';
    await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Thorn Rake',
        wildcard: 'When the creature hits with this attack, one creature within 30 feet must succeed on a DC 15 Wisdom saving throw or have the Frightened condition.',
      });
    });
    expect(repairPrompt).toMatch(/the hit already establishes the target/);
    expect(repairPrompt).not.toMatch(/establish the target FIRST/);
  });

  test('a teleport rejection becomes an explicit repair constraint — no more blind identical drafts', async () => {
    let repairPrompt = '';
    await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'The creature teleports up to 30 feet to an unoccupied space it can see, and one creature within 5 feet of its destination must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Thunder damage.',
      });
    });
    expect(repairPrompt).toMatch(/must not teleport/);
  });

  test('register caps are actuated at ship time — damage types and multiword game terms', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: "When the creature hits with this attack, the target takes 7 (2d6) necrotic damage and can't make opportunity attacks until the end of its next turn.",
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/Necrotic damage/);
    expect(host.text).toMatch(/Opportunity Attacks/);
  });

  test('an ungated negation defense is mechanical — chassis stands', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: 'When a creature hits the creature with a melee attack, the attack is negated, and the attacker must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Fire damage.',
    })));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/Disadvantage on its next attack roll/);
  });

  test('a negation defense priced as a Reaction ships', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'reaction',
      wildcard: 'When a creature within 5 feet hits the creature with a melee attack, the creature scatters into ash and the attack is negated, then re-forms in its space.',
    })));
    const e = (m.sections.Reactions ?? []).find((x) => x.name === 'Waylay');
    expect(e).toBeTruthy();
    expect(e.text).toMatch(/negated/);
  });

  test('a negation trait is rejected outright — a trait has no cost to pay', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Ash Step', text: 'When a creature hits the creature with an attack, the creature vanishes into ash and the attack is negated.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ash Step')).toBe(false);
  });

  test('a reaction-shaped trait is rejected — the trait vet now has the check the action vet had', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Ash Body', text: 'When the creature takes damage, it can use its reaction to teleport up to 30 feet away.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ash Body')).toBe(false);
  });

  test('the lint actuator never moves action-shaped content to Traits', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: 'When the creature hits with this attack, lightning arcs to a second target within 15 feet of the first. That target must succeed on a DC 15 Dexterity saving throw or take 7 (2d6) Lightning damage.',
    })));
    const entry = Object.values(m.sections).flat().find((e) => e.name === 'Waylay');
    expect((m.sections.Traits ?? []).includes(entry)).toBe(false);
    expect((m.sections.Actions ?? []).includes(entry)).toBe(true);
  });

  test('the rename register guidance is prompt-side only — bestial gets the anatomy line', () => {
    const scaled = scaleDonor(pickDonor(8), 8);
    const plain = buildReskinPrompt(scaled, { concept: 'c' });
    expect(plain).toMatch(/NAME REGISTER — print's name BUDGET/);
    expect(plain).toMatch(/wall-to-wall kennings read as a generator/);
    expect(plain).toMatch(/never "Frostaxe"/);
    expect(plain).not.toMatch(/THIS creature is bestial/);
    const bestial = buildReskinPrompt(scaled, { concept: 'c', mind: 'bestial' });
    expect(bestial).toMatch(/name its attack rows by anatomy alone/);
  });

  test('twin renames may not collide — "Scythe or Scythe" is a defect the repair re-asks', async () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8), 8);
    const dup = JSON.parse(answer());
    dup.renames['Melee Attack'] = 'Scythe';
    dup.renames['Ranged Attack'] = 'Scythe';
    dup.damage_types.Scythe = 'Slashing';
    expect(rd(scaled, dup, {}).join(' ')).toMatch(/are both "Scythe" — every row needs its own name/);
    // full flow: the informed repair round fixes the collision
    let repairPrompt = null;
    const m = await generateReskin({ concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        repairPrompt = prompt;
        return JSON.stringify({
          renames: { 'Melee Attack': 'Scythe', 'Ranged Attack': 'Hurled Scythe' },
          damage_types: { Scythe: 'Slashing', 'Hurled Scythe': 'Piercing' },
        });
      }
      return JSON.stringify(dup);
    });
    expect(repairPrompt).toMatch(/are both "Scythe"/);
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names).toContain('Scythe');
    expect(names).toContain('Hurled Scythe');
  });

  test('a rename that copies a prompt exemplar is a defect — Dreadful Glare is the mummy\'s', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8), 8);
    const echo = JSON.parse(answer());
    echo.renames['Signature Slot'] = 'Dreadful Glare';
    expect(rd(scaled, echo, {}).join(' ')).toMatch(/copies the prompt's own example "Dreadful Glare"/);
    // generic standards stay legal — a scimitar-wielder answers Scimitar
    const generic = JSON.parse(answer());
    generic.renames['Melee Attack'] = 'Scimitar';
    generic.damage_types.Scimitar = 'Slashing';
    expect(rd(scaled, generic, {}).join(' ')).not.toMatch(/Scimitar/);
  });

  test('each rename key carries its own register hint at the fill site', () => {
    const p = buildReskinPrompt(scaleDonor(pickDonor(20), 20), { concept: 'c' });
    expect(p).toMatch(/"Melee Attack": "<the weapon or body part ALONE, one word/);
    expect(p).toMatch(/"Signature Slot": "<THE flavored name — two words/);
    expect(p).toMatch(/"Legendary Move and Attack": "<verb-forward, two words \(Pounce/);
  });

  test('escape rows standardize: Cunning Action for skulkers, [Adjective] Agility elsewhere, never renamed', () => {
    const { pickDonor: pd, scaleDonor: sd, } = require('../scale.mjs');
    const { renameKeysOf: rk } = require('../generate.mjs');
    const cases = [
      ['skulker', 'Cunning Action', /Dash, Disengage, or Hide/],
      ['mounted', 'Mounted Agility', /Dash or Disengage action/],
      ['winged', 'Aerial Agility', /Dash or Disengage action/],
      ['hurler', 'Fleet Agility', /Dash or Disengage action/],
      [null, 'Fleet Agility', /Dash or Disengage action/],
    ];
    for (const [style, expectName, textRe] of cases) {
      const s = sd(pd(8, style), 8);
      const row = Object.values(s.sections).flat().find((e) => /Dash(?:,| or) Disengage/.test(e.text));
      expect(`${style}: ${row?.name}`).toBe(`${style}: ${expectName}`);
      expect(row.text).toMatch(textRe);
      if (style !== 'skulker') expect(row.text).not.toMatch(/Hide/);
      expect(rk(s)).not.toContain('Escape Action');
    }
  });

  test('Cunning Action is Humanoid-coded — creature skulkers get Nimble Escape (print\'s own split)', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const mkAnswer = (type) => {
      const scaled = sd(pd(8, 'skulker'), 8, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
      return JSON.stringify({
        name: 'Gloam Cat', type, size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'None',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.",
      });
    };
    const run = (type) => generateReskin({ concept: 'x', cr: 8, style: 'skulker', mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      return mkAnswer(type);
    });
    const beast = await run('Monstrosity');
    const bRow = (beast.sections['Bonus Actions'] ?? []).find((e) => /Escape|Cunning/.test(e.name));
    expect(bRow.name).toBe('Nimble Escape');
    expect(bRow.text).toMatch(/the Disengage or Hide action/);
    expect(bRow.text).not.toMatch(/Dash/);
    const human = await run('Humanoid');
    const hRow = (human.sections['Bonus Actions'] ?? []).find((e) => /Escape|Cunning/.test(e.name));
    expect(hRow.name).toBe('Cunning Action');
    expect(hRow.text).toMatch(/Dash, Disengage, or Hide/);
  });

  test('a mounted legendary escape drops Hide too — mounts do not hide', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const s = sd(pd(18, 'mounted'), 18);
    const all = Object.values(s.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/Disengage or Hide action/);
  });

  test('legendary escape standardizes to Withdraw — skulkers keep Hide, others do not', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const { renameKeysOf: rk } = require('../generate.mjs');
    const plain = sd(pd(18), 18);
    const wd = (s) => Object.values(s.sections).flat().find((e) => e.name === 'Withdraw');
    expect(wd(plain).text).toMatch(/Dash or Disengage action/);
    expect(wd(plain).rules).toBe(true);
    expect(rk(plain)).not.toContain('Legendary Escape');
    const skulk = sd(pd(18, 'skulker'), 18);
    expect(wd(skulk).text).toMatch(/Disengage or Hide action/);
  });

  test('legendary attack grammar is print\'s: "makes one X attack"', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const all = Object.values(sd(pd(18), 18).sections).flat().map((e) => e.text).join(' ');
    expect(all).toMatch(/makes one Melee Attack attack\./);
    expect(all).toMatch(/makes one Ranged Attack attack\./);
  });

  test('the returning projectile uses print\'s Hit or Miss frame', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const ranged = Object.values(sd(pd(18, 'hurler'), 18).sections).flat()
      .find((e) => /\{projectile\}/.test(e.text));
    expect(ranged.text).toMatch(/\*Hit or Miss:\* Immediately after the attack, \{projectile\} returns/);
    expect(ranged.text).not.toMatch(/damage, and \{projectile\}/);
  });

  test('a leading self-name with an economy label strips — no double name in the entry text', async () => {
    const m = await generateReskin({ concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: 'Shadow Coil (Trait). When the creature hits with this attack, the target has Disadvantage on its next attack roll.',
      wildcard_economy: 'trait',
    })));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/Shadow Coil \(Trait\)/);
  });

  test('the organ DC caps at the stat-derivable float at high CR', async () => {
    const casterAnswer2 = JSON.stringify({
      ...JSON.parse(answer()),
      spells: { at_will: ['Darkness', 'Faerie Fire'], daily: ['Misty Step', 'Mirror Image'] },
    });
    const m = await generateReskin({ concept: 'x', cr: 22, caster: true }, quiet(() => casterAnswer2));
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    // card DC 22, best mental derives 20 — organ prints 21 (derived + 1,
    // the lint's own float), never the card's unreachable 22
    expect(sc.text).toMatch(/spell save DC 21/);
  });
});
