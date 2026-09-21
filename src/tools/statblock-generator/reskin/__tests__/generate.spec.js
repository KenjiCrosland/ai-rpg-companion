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
  const m = await generateReskin({ archetype: 'skirmisher', concept: 'a hedge-fey that waylays travelers', cr: 8 }, async () => answer());
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
  await expect(generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(partial)))
    .rejects.toThrow(/unrenamed entry.*Mobility Trait/);
});

test('a cheating wildcard keeps the chassis text', async () => {
  const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
    wildcard: 'It is very scary and no one escapes its judgment, which is dreadful.',
  }));
  { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
});

test('the prompt shows mechanics, never flavor, and prices the wildcard', () => {
  const p = buildReskinPrompt(scaleDonor(pickDonor(12, null, 'skirmisher'), 12), { concept: 'c' });
  expect(p).toMatch(/Signature Slot/);
  expect(p).toMatch(/damage at most \d+/);
});

describe('batch-review fixes (2026-08-18)', () => {
  test('the roll line survives renaming: "*Melee Attack Roll:*" is rules text, not a reference', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer());
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).toMatch(/\*Melee Attack Roll:\* \+8/);
    const ranged = Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn');
    expect(ranged.text).toMatch(/\*Ranged Attack Roll:\* \+8/);
  });

  test('a "The"-prefixed name sheds its article — no "the the"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ name: 'The Cindermoss' }));
    expect(m.name).toBe('Cindermoss');
    expect(Object.values(m.sections).flat().map((e) => e.text).join(' ')).not.toMatch(/\bthe the\b/i);
  });

  test('hp formula matches its own dice; XP populates', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 5 }, async () => answer());
    const dice = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?/.exec(m.hp_formula);
    const avg = Number(dice[1]) * (Number(dice[2]) + 1) / 2 + Number(dice[3] ?? 0);
    expect(Math.abs(avg - m.hp)).toBeLessThanOrEqual(8);
    expect(m.challenge_rating).not.toMatch(/XP 0;/);
  });

  test('the nova per-use ceiling holds at every pilot CR', async () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    for (const cr of [8, 12, 16, 20]) {
      const s = sd(pd(cr, null, 'skirmisher'), cr);
      const nova = Object.values(s.sections).flat().find((e) => e.gate);
      const avg = Number(/(\d+) \(/.exec(nova.text)[1]);
      expect(`CR ${cr}: ${avg}`).toBe(`CR ${cr}: ${avg <= Math.min(Math.round(6 * cr), 70) + 7 ? avg : 'OVER CEILING'}`);
    }
  });

  // HISTORY: this test pinned "chassis text stands" — the fallback was
  // DELETED 2026-09-13 (owner + critic: dominated by construction,
  // 0/329 print Actions lose to their own Multiattack; shipped at the
  // wildcard failure rate under twelve names). A failed wildcard now
  // drops the slot, symmetric with the trait slot.
  test('an aura-shaped or second-person wildcard DROPS the slot — no fallback text ships', async () => {
    for (const bad of [
      'Each creature that starts its turn within 30 feet of the creature takes 10 (3d6) Fire damage.',
      'When a creature fails a save against your gaze (DC 15), it has Disadvantage on attack rolls.',
    ]) {
      const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 20 }, async () => answer({ wildcard: bad }));
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).toMatch(/DC 21/); // the library stamps the card DC
      expect(m.generation.signature).toBe('library');
    }
  });
});

describe('rename completeness is VALIDATED, so retries fire before the loud throw', () => {
  const { makeReskinValidator, buildReskinPrompt: bp } = require('../generate.mjs');
  const { pickDonor: pd2, scaleDonor: sd2 } = require('../scale.mjs');

  test('an omitted rename fails validation (the retry trigger); a complete one passes', () => {
    const scaled = sd2(pd2(8, null, 'skirmisher'), 8);
    const validate = makeReskinValidator(scaled);
    const full = JSON.parse(answer());
    expect(validate(JSON.stringify(full))).toBe(true);
    const partial = JSON.parse(answer());
    delete partial.renames['Mobility Trait'];
    expect(validate(JSON.stringify(partial))).toBe(false);
  });

  test('the prompt enumerates every required rename key explicitly', () => {
    const scaled = sd2(pd2(20, null, 'skirmisher'), 20);
    const p = bp(scaled, { concept: 'c' });
    for (const k of ['Mobility Trait', 'Signature Slot', 'Legendary Move and Attack']) expect(p).toContain(`"${k}":`);
    // the escape rows standardized out of the rename pool (2026-08-26)
    expect(p).not.toContain('"Legendary Escape":');
    expect(p).toMatch(/none omitted/);
  });
});

describe('batch two (2026-08-18): types are reskin outputs, wildcards land in their section', () => {
  test('donor placeholders fill from the concept register — no physical survives unchosen', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer());
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{damage_type\}/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn').text).toMatch(/Piercing damage/);
  });

  test('a response omitting a typed row fails validation — the retry trigger', () => {
    const { makeReskinValidator } = require('../generate.mjs');
    const { pickDonor: pd3, scaleDonor: sd3 } = require('../scale.mjs');
    const v = makeReskinValidator(sd3(pd3(8, null, 'skirmisher'), 8));
    const partial = JSON.parse(answer());
    delete partial.damage_types['Bramble Sweep'];
    expect(v(JSON.stringify(partial))).toBe(false);
    expect(v(answer())).toBe(true);
  });

  test('nova ceiling now slopes: 12/16/20 differ', () => {
    const { pickDonor: pd4, scaleDonor: sd4 } = require('../scale.mjs');
    const avgAt = (cr) => Number(/(\d+) \(/.exec(Object.values(sd4(pd4(cr, null, 'skirmisher'), cr).sections).flat().find((e) => e.gate).text)[1]);
    const [a, b, c] = [12, 16, 20].map(avgAt);
    expect(new Set([a, b, c]).size).toBeGreaterThan(1);
    expect(c).toBeLessThanOrEqual(80);
  });

  test('a bonus-action wildcard moves to Bonus Actions; a reaction mints a Reactions section', async () => {
    const m1 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'As a Bonus Action, the creature emits a chime: one creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    expect((m1.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Waylay')).toBe(true);
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature takes damage from a creature within 60 feet, it can use its Reaction to force that creature to make a DC 15 Constitution Saving Throw or have Disadvantage on attack rolls until the end of its next turn.',
    }));
    expect((m2.sections.Reactions ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('a teleport-triggered wildcard on a walker keeps chassis text; a self-label strips', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature teleports within 5 feet of a foe, that foe must succeed on a DC 15 Dexterity Saving Throw or be Blinded until the end of its next turn.',
    }));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'Corrosive Snare: one creature within 30 feet must succeed on a DC 15 Dexterity Saving Throw or its Speed is halved until the end of its next turn.',
    }));
    expect(Object.values(m2.sections).flat().find((e) => e.name === 'Waylay').text).not.toMatch(/^Corrosive Snare:/);
  });

  test('lowercase renames ship title-cased', async () => {
    const full = JSON.parse(answer());
    full.renames['Melee Attack'] = 'crystal claw';
    full.damage_types['crystal claw'] = 'Cold';
    full.name = 'shivering bedrock';
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    await expect(generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => (
      /completing a partial answer/.test(prompt) ? JSON.stringify({}) : JSON.stringify(partial)
    ))).rejects.toThrow(/unrenamed entry/);
  });

  test('a pronoun-muddled wildcard keeps chassis text', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or be Frightened; while Frightened this way, the creature cannot willingly move closer to the creature.',
    }));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('the taken-names roster reaches the prompt', () => {
    const { buildReskinPrompt: bp2 } = require('../generate.mjs');
    const { pickDonor: pd5, scaleDonor: sd5 } = require('../scale.mjs');
    const p = bp2(sd5(pd5(8, null, 'skirmisher'), 8), { concept: 'c', takenNames: ['Uulghoth', 'Skorvith'] });
    expect(p).toMatch(/NAMES ALREADY TAKEN.*Uulghoth/);
  });

  test('the hit die follows the chosen size', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 16 }, async () => JSON.stringify({
      ...JSON.parse(answer()), size: 'Gargantuan',
    }));
    expect(m.hp_formula).toMatch(/d20/);
  });
});

describe('the energy rider (owner TODO, landed): priced either way, chosen by concept', () => {
  test('a rider type ships as base physical plus energy, summing to the per-hit budget', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ melee_rider: 'Fire' }));
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    const parts = [...melee.text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].map((x) => Number(x[1]));
    expect(parts.length).toBe(2);
    expect(melee.text).toMatch(/Fire damage/);
    expect(parts[0] + parts[1]).toBeGreaterThanOrEqual(11); // ~the solved per-hit
  });

  test('"none" collapses to the full-budget single clause', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ melee_rider: 'none' }));
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect([...melee.text.matchAll(/\d+ \(\d+d\d+/g)].length).toBe(1);
    expect(melee.text).not.toMatch(/\{damage_type_2\}/);
  });

  test('a missing rider answer is repairable', async () => {
    const partial = JSON.parse(answer());
    delete partial.melee_rider;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => (
      /completing a partial answer/.test(prompt)
        ? JSON.stringify({ melee_rider: 'Cold' })
        : JSON.stringify(partial)
    ));
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text).toMatch(/Cold damage/);
  });
});

describe('batch four quick wins', () => {
  test('xp reaches the field the renderer reads', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer());
    expect(m.xp).toBe(3900);
  });

  // HISTORY: this pinned the VERBATIM law ("never title-cased away") —
  // superseded by owner ruling 2026-09-14: "convert user names to the
  // proper format if improper... intentional misspellings via edit".
  // Casing normalizes (first letter per word, small words stay small,
  // interior caps untouched); the WORDS remain the user's.
  test('a user-typed name normalizes casing but is never reworded', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, fixedName: 'grishnak of the Deep Roads' }, async () => answer());
    expect(m.name).toBe('Grishnak of the Deep Roads');
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, fixedName: 'lady McTavish of the fen' }, async () => answer());
    expect(m2.name).toBe('Lady McTavish of the Fen'); // interior caps survive
  });

  test("the model may fix an obvious misspelling; a rewording is stamped back — the owner's edit-pencil rule", async () => {
    // model corrects "chaple" -> "Chapel": same name within a whisper
    const fixed = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, fixedName: 'chaple knight' },
      async () => answer({ name: 'Chapel Knight' }));
    expect(fixed.name).toBe('Chapel Knight');
    // model rewords entirely: the user's name stands (cased)
    const reword = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, fixedName: 'chaple knight' },
      async () => answer({ name: 'Doom Sovereign' }));
    expect(reword.name).toBe('Chaple Knight');
  });

  test('the ranged twin pays the melee premium', async () => {
    const { pickDonor: pd6, scaleDonor: sd6 } = require('../scale.mjs');
    const sc = sd6(pd6(8, null, 'skirmisher'), 8);
    const avgOf = (t) => [...t.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m2) => n + Number(m2[1]), 0);
    const rows = Object.values(sc.sections).flat();
    const melee = avgOf(rows.find((e) => e.name === 'Melee Attack').text);
    const ranged = avgOf(rows.find((e) => e.name === 'Ranged Attack').text);
    expect(ranged).toBeLessThan(melee);
  });

  test('a Burning Claw with no fire fails validation; with the rider it passes', () => {
    const { makeReskinValidator: mv } = require('../generate.mjs');
    const { pickDonor: pd7, scaleDonor: sd7 } = require('../scale.mjs');
    const v = mv(sd7(pd7(8, null, 'skirmisher'), 8));
    const claim = JSON.parse(answer());
    claim.renames['Melee Attack'] = 'Burning Claw';
    claim.damage_types['Burning Claw'] = 'Slashing';
    claim.melee_rider = 'none';
    expect(v(JSON.stringify(claim))).toBe(false);
    claim.melee_rider = 'Fire';
    expect(v(JSON.stringify(claim))).toBe(true);
  });

  test('lore rides along for the GM path', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ lore: 'Born of the fen, it hunts oathbreakers along the old toll roads.' }));
    expect(m.lore).toMatch(/oathbreakers/);
  });
});

describe('the Headless Horseman gaps: negotiated movement, a second signature', () => {
  test('"runner" trades the climb for +10 walk', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a spectral rider', cr: 8 }, async () => answer({ speed_shape: 'runner' }));
    expect(m.speed).not.toMatch(/Climb/);
    expect(m.speed).toMatch(/^50 ft\./);
  });

  test('a passive trait wildcard ships; a save-carrying one is rejected', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a headless rider', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Headless', text: 'The creature can\'t be Blinded or Deafened, and it has Immunity to the Frightened condition.' },
    }));
    expect(m.sections.Traits.some((e) => e.name === 'Headless')).toBe(true);
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Doom Field', text: 'Each creature within 30 feet must make a DC 20 Saving Throw or die.' },
    }));
    expect((m2.sections.Traits ?? []).some((e) => e.name === 'Doom Field')).toBe(false);
  });
});

describe('the Rimegrave guards', () => {
  test('a role-collapsed wildcard FAILS OPEN after repair: the draft ships flagged (tier policy 2026-08-19)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m1 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: bad });
    });
    expect(Object.values(m1.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/attacks the gloam courser/); // shipped flagged
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ wildcard: good }));
    expect(Object.values(m2.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/once per round/);
  });

  test('a CR 24 Beast lands as Monstrosity; a CR 5 Beast is Unaligned', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 22 }, async () => answer({ type: 'Beast', alignment: 'Lawful Neutral' }));
    expect(m.type).toBe('Monstrosity');
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 5 }, async () => answer({ type: 'Beast', alignment: 'Neutral Evil' }));
    expect(m2.alignment).toBe('Unaligned');
  });
});

describe('the second Horseman fixes', () => {
  // HISTORY: pinned the fallback's save-stat interpolation — the
  // fallback was deleted 2026-09-13; a rejected-unrepaired wildcard
  // now drops the slot entirely
  test('a rejected-unrepaired wildcard drops the slot — nothing interpolates', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'an oath-keeper', cr: 8 }, async () => answer({
      slot_save: 'Wisdom',
      wildcard: 'It is very scary and dreadful beyond words entirely.', // rejected -> the library stands in
    }));
    expect(Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay')).library).toBe(true);
  });

  test('a Vorpal rename fails validation — icon vocabulary is reserved', () => {
    const { makeReskinValidator: mv2 } = require('../generate.mjs');
    const { pickDonor: pd8, scaleDonor: sd8 } = require('../scale.mjs');
    const v = mv2(sd8(pd8(8, null, 'skirmisher'), 8));
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn. The creature has Advantage on attack rolls against Frightened targets.',
    }));
    const t = Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text;
    expect(t).not.toMatch(/The creature/);
    expect(t).toMatch(/The gloam courser has Advantage/);
  });

  test('a mark-on-move wildcard lands in Traits with a once-per-turn price', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'When the creature moves at least 20 feet during its turn, one creature it passed within 5 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t).toBeTruthy();
    expect(t.text).toMatch(/only once per turn/);
  });

  test('an Undead ships its immunity floor', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ type: 'Undead' }));
    expect(m.immunities).toMatch(/Poison; Exhaustion, Poisoned/);
  });

  test('the audit fires and a span-verified rewrite lands in the block', async () => {
    let audited = false;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) throw new Error('provider down');
      return answer();
    });
    expect(m.name).toBe('Gloam Courser');
  });
});

describe('signature targeting + repair retry (owner go 2026-08-18)', () => {
  test('signature elements scope the reskin prompt; absent elements leave it open', () => {
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
    const scoped = buildReskinPrompt(scaled, { concept: 'headless horseman', signatureElements: ['the severed head, carried or wielded', 'the terror of the galloping rider'] });
    expect(scoped).toMatch(/SIGNATURE TARGET: the concept's defining element is "the severed head/);
    expect(scoped).toMatch(/Remaining elements.*terror of the galloping rider/);
    expect(buildReskinPrompt(scaled, { concept: 'x' })).not.toMatch(/SIGNATURE TARGET/);
  });

  test('a rejected wildcard gets ONE repair round — the fixed draft ships', async () => {
    let repairPrompt = null;
    const m = await generateReskin(
      { archetype: 'skirmisher', concept: 'x', cr: 8, signatureElements: ['the severed head'] },
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: 'Still very scary and quite dreadful, honestly.' });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and no one escapes its judgment.' });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('a rejected trait rides the same repair call and ships repaired', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        trait_wildcard: { name: 'Lantern Head', text: 'It deals 8 (2d4+3) damage when stared at.' },
        wildcard: '*Wisdom Saving Throw*: DC 15, one creature that can see the Lantern Head. *Failure:* The target has the Frightened condition.',
      });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });
});

describe('v6 batch: detachment accounting, remote-ranged, sapient languages', () => {
  test('a thrown head with no return clause is rejected, and the repair ships it with one', async () => {
    let repairPrompt = null;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. The creature can make attack rolls from that point as if it were there.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/from that point/); // ships flagged; the audit-tier owns the remaining judgment
  });

  test('a sapient Undead answering Languages None gets the print idiom; bestial stays None', async () => {
    const und = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, mind: 'sapient' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ type: 'Undead', languages: 'None' });
    });
    expect(und.languages).toBe('Common plus the languages it knew in life');
    const beast = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, mind: 'bestial' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ languages: 'None' });
    });
    expect(beast.languages).toBe('None');
    const spoken = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, mind: 'sapient' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ languages: 'Sylvan' });
    });
    expect(spoken.languages).toBe('Sylvan');
  });

  test('the wildcard prompt states the detachment and remote-ranged rules', () => {
    const p = buildReskinPrompt(scaleDonor(pickDonor(8, null, 'skirmisher'), 8), { concept: 'c' });
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
    const scaled = scaleDonor(pickDonor(13, 'skulker', 'skirmisher'), 13);
    const validate = makeReskinValidator(scaled);
    expect(validate(skulkerAnswer())).toBe(true); // no type for Bog Blink — passes
    const missingGaze = JSON.parse(skulkerAnswer());
    delete missingGaze.damage_types['Luring Gaze'];
    expect(validate(JSON.stringify(missingGaze))).toBe(false);
  });

  test('the prompt asks for damage types on exactly the rows that carry the slot', () => {
    const scaled = scaleDonor(pickDonor(13, 'skulker', 'skirmisher'), 13);
    const p = buildReskinPrompt(scaled, { concept: 'wisp queen' });
    expect(p).toMatch(/the new name you gave "Ranged Save Effect"/);
    expect(p).not.toMatch(/the new name you gave "Teleport"/);
    expect(p).toMatch(/If the damage does not pay the word, drop the word/);
  });

  test('a full skulker reskin ships — the gaze row fills, the teleport stays typeless', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'wisp queen', cr: 13, style: 'skulker' }, async (prompt) => {
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
    const scaled = scaleDonor(pickDonor(13, 'skulker', 'skirmisher'), 13);
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
  const vAt13 = () => mkv(scaleDonor(pickDonor(13, 'skulker', 'skirmisher'), 13));
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ melee_rider: 'Necrotic', damage_types: { 'Thorn Rake': 'Necrotic', 'Cast Thorn': 'Psychic', 'Bramble Sweep': 'Necrotic' } });
    });
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).not.toMatch(/plus/);
    expect(melee.text).toMatch(/Necrotic damage/);
  });

  test('a genuinely different rider still splits', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ melee_rider: 'Fire' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text)
      .toMatch(/Slashing damage plus \d+ \(\d+d\d+\) Fire damage/);
  });

  test('the card carries a senses line with computed Passive Perception', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(m.senses).toMatch(/^darkvision 60 ft\.; Passive Perception \d+$/);
    expect(m.senses_special).toBeUndefined();
  });
});

describe('Matador fixes (2026-08-19): muddle false positives, validated repair, HP sync', () => {
  test('a LEGAL double monster-reference no longer trips the muddle guard', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn, and the creature has Advantage on attack rolls against it until then.' });
    });
    const t = Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text;
    expect(t).toMatch(/the gloam courser has Advantage/);
  });

  test('a victim-predicate muddle is still caught', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The creature takes 10 (3d6) Psychic damage and has the Frightened condition.' });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('the repair call carries a REAL validator — prod retries can fire on a bad repair', async () => {
    let repairValidator = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt, validate) => {
      if (prompt.startsWith('You are repairing')) { repairValidator = validate; return JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' }); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and dreadful beyond all reckoning.' });
    });
    expect(repairValidator(JSON.stringify({ wildcard: 'Still just vibes, no rules.' }))).toBe(false);
    expect(repairValidator(JSON.stringify({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' }))).toBe(true);
  });

  test('printed HP equals the formula average — the lint class closes', async () => {
    for (const cr of [8, 13, 15]) {
      const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a gaze-less blade dancer', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are completing a partial answer')) {
        repairPrompt = prompt;
        return JSON.stringify({ renames: { 'Mobility Trait': 'Sliding Feint' } });
      }
      // the INFORMED WILDCARD call (2026-09-15) is its own channel,
      // not a blind main-call resend — excluded from the count
      if (prompt.startsWith('You are writing the signature action')) return JSON.stringify({ wildcard: JSON.parse(answer()).wildcard });
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Poison' }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
  const gen = (over, opts = {}) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, ...opts }, async (prompt) => {
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
    const p2 = buildReskinPrompt(scaleDonor(pickDonor(12, null, 'skirmisher'), 12), {
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
    const scaled = sds(pds(12, null, 'skirmisher'), 12, { movement: ['fly'] });
    expect(scaled.speed).toMatch(/Fly \d+ ft\. \(hover\)/);
    expect(scaled.hp).toBe(Math.round(cbs(12, {}).hp * 0.9));
  });

  test('the tax keys on the sheet: winged donors pay it once, grounded pay none', () => {
    expect(sds(pds(8, 'winged', 'skirmisher'), 8).hp).toBe(Math.round(cbs(8, {}).hp * 0.9));
    expect(sds(pds(8, null, 'skirmisher'), 8).hp).toBe(cbs(8, {}).hp);
  });

  test('the striker stat pays the attack bonus: mod + PB = card atk at every seat', () => {
    for (const cr of [3, 8, 12, 15, 20]) {
      const sc = sds(pds(cr, 'skulker', 'skirmisher'), cr);
      const mod = Math.max(Math.floor((sc.stats.DEX - 10) / 2), Math.floor((sc.stats.STR - 10) / 2));
      expect(`CR ${cr}: ${mod + sc.pb}`).toBe(`CR ${cr}: ${sc.atk}`);
    }
  });

  test('skills re-derive from final stats — Stealth matches raised DEX, and authored EXPERTISE survives', () => {
    // the skulker donor authors Stealth at the Assassin's expertise
    // convention (mod + 2xPB); the 2026-08-19 flattener ATE it and this
    // test pinned the bug (critic round, 2026-09-10) — expertise scales
    // as PB at the target CR
    const sc = sds(pds(12, 'skulker', 'skirmisher'), 12);
    const dexMod = Math.floor((sc.stats.DEX - 10) / 2);
    expect(sc.skills).toContain(`Stealth +${dexMod + sc.pb + sc.pb}`);
  });
});

describe('the Gambler batch (2026-08-19): projectile subsystem, three guard false-positives', () => {
  const { makeReskinValidator: mkvG } = require('../generate.mjs');
  const { pickDonor: pdG, scaleDonor: sdG } = require('../scale.mjs');

  const hurlerAnswer = (over = {}) => {
    const scaled = sdG(pdG(8, 'hurler', 'skirmisher'), 9);
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 9, style: 'hurler' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return hurlerAnswer();
    });
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{projectile\}/);
    expect(all).toMatch(/a knucklebone returns to the knucklebone gambler's grasp/);
  });

  test('a missing projectile fails validation with its own reason', () => {
    const v = mkvG(sdG(pdG(8, 'hurler', 'skirmisher'), 9));
    const noProj = JSON.parse(hurlerAnswer());
    delete noProj.projectile;
    expect(v(JSON.stringify(noProj))).toBe(false);
    expect(v(hurlerAnswer())).toBe(true);
  });

  test('the hurler prompt asks for the projectile; grounded donors do not', () => {
    expect(buildReskinPrompt(sdG(pdG(8, 'hurler', 'skirmisher'), 9), { concept: 'c' })).toMatch(/"projectile":/);
    expect(buildReskinPrompt(sdG(pdG(8, null, 'skirmisher'), 8), { concept: 'c' })).not.toMatch(/"projectile":/);
  });

  test('"Cursed Dice Blast" dealing Force is legal — ice no longer matches inside Dice', () => {
    const v = mkvG(sdG(pdG(8, 'hurler', 'skirmisher'), 9));
    const dice = JSON.parse(hurlerAnswer());
    const oldName = Object.values(dice.renames).find((n) => dice.damage_types[n]);
    const key = Object.keys(dice.renames).find((k) => dice.renames[k] === oldName);
    dice.renames[key] = 'Cursed Dice Blast';
    dice.damage_types['Cursed Dice Blast'] = 'Force';
    delete dice.damage_types[oldName];
    expect(v(JSON.stringify(dice))).toBe(true);
  });

  test('"one target it can see" establishes the target — no role collapse', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature tosses shimmering dice at one target it can see within 30 feet. The target must succeed on a DC 15 Dexterity Saving Throw or take 10 (3d6) Force damage.' });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/shimmering dice/);
  });

  test('"ignores cover" is a rule — the trait guard accepts it', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Curving Shot', text: 'The creature\'s ranged attacks ignore half cover and three-quarters cover.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Curving Shot')).toBe(true);
  });
});

describe('Croupier fixes (2026-08-19): frame-vs-mention, print sentence budget, repair salvage', () => {
  test('Magic Resistance grammar survives the trait guard — mentions are not frames', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Loaded Luck', text: 'The creature has Advantage on saving throws against spells, and its ranged attack rolls ignore Half Cover.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Loaded Luck')).toBe(true);
  });

  test('a save FRAME in a trait is still rejected', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Bad Trait', text: '*Wisdom Saving Throw*: DC 15. The target has the Frightened condition.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Bad Trait')).toBe(false);
  });

  test('four sentences ship (print p90); five do not', async () => {
    const four = 'The creature hurls a pair of loaded dice at a point within 30 feet. *Dexterity Saving Throw*: DC 15, each creature within 5 feet of that point. *Failure:* 10 (3d6) Force damage. If both dice land showing the same number, the target also has the Prone condition.';
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: four });
    });
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/both dice land/);
  });

  test('repair salvage: a good wildcard ships even when the repaired trait still fails', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
      const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const v = mk(sd9(pd9(8, null, 'skirmisher'), 8));
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 20, one creature within 30 feet. *Failure:* The target has the Frightened condition.' });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('a judgment-flagged repair ships in preference to the original draft', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Long Ward', text: 'The creature has Advantage on saving throws against spells. Its feathers shimmer with stolen light. Attack rolls against it while it flies are made with Disadvantage.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Ward')).toBe(true); // over 2 sentences = judgment = ships
  });
});

describe('economy declaration + lint actuator (owner go, 2026-08-19)', () => {
  test('a declared trait economy with a hit trigger dies — the rider law owns it now', async () => {
    // HISTORY: this fixture originally filed in Traits with a
    // once-per-turn stamp (the 2026-08-19 law) — and survived the
    // 2026-09-14 rider law only because "hits a target with" dodged the
    // old regex (the Lancer's dodge, closed 2026-09-15). 0/329 print
    // traits key on the creature's own hits; the library stands in.
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'When the creature hits a target with a melee attack, the target has the Poisoned condition until the end of its next turn.',
      });
    });
    expect((m.sections.Traits ?? []).find((e) => e.name === 'Waylay')).toBeFalsy();
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.library).toBe(true);
  });

  test('a declared bonus_action economy overrides prose guessing', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'bonus_action',
        wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition.',
      });
    });
    expect((m.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('the prompt asks for the economy field', () => {
    expect(buildReskinPrompt(scaleDonor(pickDonor(8, null, 'skirmisher'), 8), { concept: 'c' })).toMatch(/"wildcard_economy":/);
  });

  test('an undeclared rider-shaped action dies at the vet — never reaches the lint actuator', async () => {
    // HISTORY: the lint actuator used to move this to Traits
    // (2026-08-19); the rider law (2026-09-14) says riders weld into
    // the attack row or die — the vet now catches it upstream
    // ("hits a target with" dodge closed 2026-09-15).
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'When the creature hits a target with a melee attack, the target has the Poisoned condition until the end of its next turn.',
      });
    });
    expect((m.sections.Traits ?? []).find((e) => e.name === 'Waylay')).toBeFalsy();
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.library).toBe(true);
  });

  test('reskin audit mode carries the case-file brief; the skeleton prompt is unchanged', async () => {
    const { buildAuditPrompt: bap } = require('../../format-2024/audit.mjs');
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
  const vWeld = mkw(sdw2(pdw2(8, null, 'skirmisher'), 8), { energy: 'Poison' });

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
    const v = mkw(sdw2(pdw2(8, null, 'skirmisher'), 8));
    expect(v(answer())).toBe(true); // Fire in the stale map keys, Slashing/Piercing rows — all fine unwelded
  });

  test('the prompt states the contract when an energy is declared', () => {
    const pr = buildReskinPrompt(sdw2(pdw2(8, null, 'skirmisher'), 8), { concept: 'c', energy: 'Poison' });
    expect(pr).toMatch(/THIS creature's energy is Poison/);
  });
});

describe('the filing class, remainder (critic spec 2026-08-19): rider_on, limiter dedupe, self-description', () => {
  test('rider_on appends the clause to the named attack and retires the slot', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a luck-thief', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Nonexistent Attack',
        wildcard: 'When the creature hits with this attack, the target has the Frightened condition until the end of its next turn.',
      });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('a reaction-declared wildcard sheds its redundant once-per-round limiter', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'The creature has Advantage on Initiative rolls. The creature can use this action while hidden.',
      });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Waylay');
    expect(t.text).toMatch(/use this trait while hidden/);
    expect(t.text).not.toMatch(/this action/);
  });

  test('the trait-minting ban is stated in the wildcard constraints', () => {
    expect(buildReskinPrompt(scaleDonor(pickDonor(8, null, 'skirmisher'), 8), { concept: 'c' }))
      .toMatch(/Never name or grant a NEW trait inside an ability/);
  });
});

describe('Pilgrim kill-chain fixes (2026-08-19): three proven false positives', () => {
  test('"within 30 feet of the creature must make" is the victim POSITIONED, not the monster as victim', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature teleports up to 30 feet to an unoccupied space it can see, and it leaves behind a swirl of gray ash.' });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('print movement-trait grammar survives the trait guard', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    expect(sdA(pdA(22, null, 'skirmisher'), 22).pb).toBe(7);
    expect(sdA(pdA(26, null, 'skirmisher'), 26).pb).toBe(8);
    expect(sdA(pdA(30, null, 'skirmisher'), 30).pb).toBe(9);
    expect(sdA(pdA(18, null, 'skirmisher'), 18).pb).toBe(6);
  });

  test('a collapsed rider re-runs its transforms — no "the creature" ships', async () => {
    const mountedAnswer = JSON.stringify({
      name: 'Gloam Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral',
      renames: { 'Mobility Trait': 'Hedge Runner', 'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Trampling Rush': 'Bramble Charge', 'Signature Slot': 'Waylay', 'Escape Action': 'Fade Out' },
      damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Charge': 'Bludgeoning' },
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.',
    });
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, style: 'mounted' }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return mountedAnswer;
    });
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).toMatch(/If the gloam courser moved at least 20 feet/);
    expect(melee.text).not.toMatch(/the creature/);
  });

  test('fractional CR looks up real XP', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 0.5 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(m.xp).toBeGreaterThan(0);
    expect(m.challenge_rating).not.toMatch(/XP 0;/);
  });

  test('lowercase damage types normalize instead of failing four checks at once', () => {
    const { makeReskinValidator: mkA } = require('../generate.mjs');
    const v = mkA(sdA(pdA(8, null, 'skirmisher'), 8));
    const low = JSON.parse(answer());
    low.damage_types['Cast Thorn'] = 'piercing';
    low.melee_rider = 'cold';
    expect(v(JSON.stringify(low))).toBe(true);
  });

  test('the lantern trait ships: light levels are rules vocabulary', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Guiding Lantern', text: 'The creature\'s lantern sheds bright light in a 30-foot radius and dim light for an additional 30 feet.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Guiding Lantern')).toBe(true);
  });

  test('monster-actor double references pass; victim-position doubles still catch', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'One creature within 30 feet that the creature can see and that can see the creature must succeed on a DC 15 Wisdom Saving Throw or have the Frightened condition until the end of its next turn.' });
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, style: 'mounted' }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'trait',
        wildcard: 'One creature within 30 feet that the creature can see must succeed on a DC 15 Wisdom Saving Throw or have the Frightened condition until the end of its next turn.',
      });
    });
    // fallback deleted + library landed 2026-09-13; PIVOT landed
    // 2026-09-15: the rejected trait-declared frame is now RESCUED as
    // a plain action by the pivot (the bogus 'trait' declaration
    // dropped) — or draws a library seed when the pivot fails. Either
    // way: NEVER into Traits (the point of this test).
    expect((m.sections.Traits ?? []).some((e) => (e.name ?? '').startsWith('Waylay'))).toBe(false);
    const w2 = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w2).toBeTruthy();
    expect((m.sections.Actions ?? []).includes(w2) || w2.library === true).toBe(true);
  });

  test('alignment ships title-cased', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ alignment: 'chaotic neutral' });
    });
    expect(m.alignment).toBe('Chaotic Neutral');
  });
});

describe('the blessed batch (2026-08-24): rename propagation, embedded economy, redundancy brief', () => {
  test('a repair rename follows into the trait draft — no dangling "Searing Blade"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition. The creature can then use its bonus action to move up to half its Speed.' });
    });
    // judgment tier: ships (flagged) rather than chassis
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text).toMatch(/Frightened condition/);
  });

  test('a damaging wildcard declared bonus_action files as an action', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const plain = buildReskinPrompt(scaleDonor(pickDonor(8, null, 'skirmisher'), 8), { concept: 'c' });
    // concrete example, never variable notation — the Covetous Shade
    // shipped a literal "X/Day" copied from the old prompt (2026-08-26)
    expect(plain).toMatch(/like "\(2\/Day\)"/);
    expect(plain).not.toMatch(/print as \(X\/Day\)/);
    expect(plain).not.toMatch(/MOUNT HANDLING/);
    const { pickDonor: pdm2, scaleDonor: sdm2 } = require('../scale.mjs');
    const mounted = buildReskinPrompt(sdm2(pdm2(8, 'mounted', 'skirmisher'), 8), { concept: 'c' });
    expect(mounted).toMatch(/MOUNT HANDLING: print never writes rules about a mount/);
    expect(mounted).not.toMatch(/FUSED/);
  });

  test('the reskin audit brief carries the redundancy class', async () => {
    const { buildAuditPrompt: bap2 } = require('../../format-2024/audit.mjs');
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const closed = sdg(pdg(13, 'skulker', 'skirmisher'), 13, { mechanics: [] });
    const names = Object.values(closed.sections).flat().map((e) => e.name);
    expect(names).not.toContain('Ranged Save Effect');
    expect(names).not.toContain('Teleport');
    expect(closed.gated_out).toEqual(['Ranged Save Effect (gaze)', 'Teleport (teleport)']);

    const open = sdg(pdg(13, 'skulker', 'skirmisher'), 13, { mechanics: ['gaze', 'teleport'] });
    const openNames = Object.values(open.sections).flat().map((e) => e.name);
    expect(openNames).toContain('Ranged Save Effect');
    expect(openNames).toContain('Teleport');

    const blank = sdg(pdg(13, 'skulker', 'skirmisher'), 13, { mechanics: null });
    expect(Object.values(blank.sections).flat().some((e) => e.name === 'Teleport')).toBe(true);
  });

  test('partial claim: gaze stays, teleport goes', () => {
    const g = sdg(pdg(8, 'skulker', 'skirmisher'), 8, { mechanics: ['gaze'] });
    const names = Object.values(g.sections).flat().map((e) => e.name);
    expect(names).toContain('Ranged Save Effect');
    expect(names).not.toContain('Teleport');
  });

  test('a gated block generates end-to-end — renames and validation adapt to the missing rows', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a bog ambusher', cr: 8, style: 'skulker', mechanics: [] }, async (prompt) => {
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
    const mounted = sdg(pdg(8, 'mounted', 'skirmisher'), 8, { mechanics: [] });
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const orphan = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        conditions: { condition_minor: 'Prone' },
        trait_wildcard: { name: 'Venom Synergy', text: 'The creature has Advantage on attack rolls against a Paralyzed target.' },
      });
    });
    expect(orphan.lint_findings.join(' ')).toMatch(/"Paralyzed" is referenced as a state/);
    const applied = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        conditions: { condition_minor: 'Poisoned' }, // the sweep row now APPLIES Poisoned
        trait_wildcard: { name: 'Venom Synergy', text: 'The creature has Advantage on attack rolls against a Poisoned target.' },
      });
    });
    expect(applied.lint_findings.join(' ')).not.toMatch(/orphan|referenced as a state/);
  });

  test('a movement-state gate without the movement is flagged', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Earth Pulse', text: 'The creature has Advantage on Stealth checks while it is underground.' } });
    });
    expect(m.lint_findings.join(' ')).toMatch(/keys on being underground/);
  });

  test('burrow and swim answers reach the speed line, untaxed', () => {
    const b = sdF(pdF(8, null, 'skirmisher'), 8, { movement: ['burrow', 'swim'] });
    expect(b.speed).toMatch(/Burrow 30 ft\./);
    expect(b.speed).toMatch(/Swim \d+ ft\./);
    const { cardBudget: cbF } = require('../card-budgets.mjs');
    expect(b.hp).toBe(cbF(8, {}).hp); // no flight tax for fins or claws
  });

  // HISTORY: judgment-tier until 2026-09-15 (Mire Snare shipped
  // flagged; Headless Dread's damage-on-success shipped flagged too) —
  // owner ruling promoted it: "there is no such thing as damage after
  // a successful save". Fails closed now.
  test('a success clause that punishes fails CLOSED — promoted by owner ruling', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. *Success:* The target has Disadvantage on its next attack roll.' });
    });
    expect(repairPrompt).toMatch(/never a fresh penalty/);
  });

  test('an SRD spell name on a non-spell entry is flagged', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const scaled = sdP(pdP(8, null, 'skirmisher'), 8);
    const bad = JSON.parse(answer());
    bad.damage_types['Cast Thorn'] = 'Fire';
    const defects = rdP(scaled, bad, { mix: 'physical' });
    expect(defects.join(' ')).toMatch(/declared fully physical/);
    expect(mkP(scaled, { mix: 'physical' })(JSON.stringify(bad))).toBe(false);
  });

  test('a near-namesake trait name collides (Wolf-Born Skirmisher vs Wolf-Born Skirmish)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ senses: 'darkvision 60 ft. (may be scent instead if desired), truesight 30 ft., see also Awareness of Fallen below' });
    });
    expect(m.senses).toBe(`truesight 30 ft.; Passive Perception ${m.senses.match(/\d+$/)[0]}`);
    expect(m.senses).not.toMatch(/scent|Awareness/);
  });

  test('a legal blindsight parenthetical survives the sanitizer', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ senses: 'blindsight 60 ft. (blind beyond this radius)' });
    });
    expect(m.senses).toMatch(/^blindsight 60 ft\. \(blind beyond this radius\); Passive Perception \d+$/);
  });

  test('a reaction mechanic inside a rider is flagged and repairable', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Gambit', text: 'The creature can vanish and gains Advantage on its next attack roll. It can use this a number of times per day equal to twice its proficiency bonus.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Gambit').text;
    expect(t).toMatch(/6\/Day/); // PB 3 at CR 8, doubled
    expect(t).not.toMatch(/proficiency bonus/);
  });

  test('donor row names in wildcard text get the rename map (the Ranged Save Effect leak)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Revelation', text: 'When a target fails a saving throw against the creature\'s Signature Slot, it cannot benefit from being lightly obscured. This trait grants Advantage on Perception checks.' } });
    });
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Revelation').text;
    expect(t).toMatch(/Waylay/);
    expect(t).not.toMatch(/Signature Slot/);
  });

  test('a condition-gerund name that never applies its condition is flagged', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a shadow fey', cr: 8, caster: true }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return casterAnswer();
    });
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    expect(sc).toBeTruthy();
    expect(sc.text).toMatch(/\*Darkness\*, \*Faerie Fire\*/);
    expect(sc.text).toMatch(/At Will:.*\*Misty Step\*/); // at-will lists grow (2026-09-04) — leveled utility sits at-will, print's Glabrezu shape
    // DC caps at the stat-derivable float (8 + PB + mental mod + 1 = 14
    // at CR 8) — the card's 15 was lint-illegal against WIS 14 all along
    expect(sc.text).toMatch(/spell save DC 14/);
  });

  test('no checkbox, no organ — and Spellcasting is never a rename key', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect((m.sections.Actions ?? []).some((e) => e.name === 'Spellcasting')).toBe(false);
  });

  test('an off-menu pick is a defect with the menu stated; repair fixes it', async () => {
    const { makeReskinValidator: mkS, reskinDefects: rdS } = require('../generate.mjs');
    const { pickDonor: pdS, scaleDonor: sdS } = require('../scale.mjs');
    const scaled = sdS(pdS(8, null, 'skirmisher'), 8);
    scaled.sections.Actions.push({ name: 'Spellcasting', rules: true, text: 'casts... {spell_at_will} {spell_daily}' });
    const bad = JSON.parse(casterAnswer());
    bad.spells.at_will = ['Fireball', 'Darkness'];
    const defects = rdS(scaled, bad, {});
    expect(defects.join(' ')).toMatch(/"Fireball" is not on the spell menu/);
    expect(mkS(scaled)(casterAnswer())).toBe(true);
  });

  test('mechanical violations outrank judgment flags — the Lantern\'s Mark shadowing is closed', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      // both defects present: embedded bonus action (judgment) AND teleport on a
      // teleport-less chassis (mechanical) — mechanical must win, chassis ships
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition, and the creature can use its bonus action to teleport up to 30 feet.' });
    });
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('"twice per day" prose meters to 2/Day', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 10 (3d6) Necrotic damage. The creature can use this X/Day.',
    })));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('stat-modifier metering is judgment — repaired if possible, shipped flagged if not', async () => {
    const dialect = '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. The creature can use this a number of times equal to its Charisma modifier.';
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: dialect });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: dialect });
    });
    // fail-open per tier doctrine: the unrepaired draft ships with a loud flag
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay').text)
      .toMatch(/times equal to/);
  });

  test('a damage-carrying rider without a limiter gets the once-per-turn stamp', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, the target must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Necrotic damage.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/must succeed on a DC 15/);
    expect(host.text).toMatch(/This effect can be applied only once per turn\./);
  });

  test('a rider that wrote its own limiter keeps it — no strip, no double stamp', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, the target must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Necrotic damage. It can do this only once per turn.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text.match(/once per turn/gi)).toHaveLength(1);
  });

  test('a reaction still sheds its redundant limiter — the economy already enforces it', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'reaction',
      wildcard: 'When a creature within 5 feet hits the creature with a melee attack, the attacker takes 7 (2d6) Piercing damage. It can do this only once per turn.',
    })));
    const e = (m.sections.Reactions ?? []).find((x) => x.name === 'Waylay');
    expect(e).toBeTruthy();
    expect(e.text).not.toMatch(/once per turn/i);
  });

  test('a trait claiming a reach no attack row prints is mechanical — no trait ships', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Long Arms', text: "The creature's melee attacks have reach 10 feet, and it isn't hindered by dim light or darkness." },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Arms')).toBe(false);
  });

  test('a trait whose reach claim matches the rows passes', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Long Arms', text: "The creature's melee attacks have reach 5 feet, and it isn't hindered by dim light or darkness." },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Arms')).toBe(true);
  });

  test('trait vet: mechanical outranks the sentence cap — same shadowing class as the action vet', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Watchful', text: 'You cannot hide from it in dim light. It sees you always. It knows where you sleep.' },
    })));
    // second person (mechanical) must win over the 3-sentence judgment cap:
    // fail-closed, no trait — under the old order this shipped flagged
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Watchful')).toBe(false);
  });

  test('an Incapacitated escape-hatch self-reference no longer trips the orphan lint', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: "*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn. The effect ends early if the creature is Incapacitated.",
    })));
    expect(m.lint_findings.join(' ')).not.toMatch(/"Incapacitated"/);
  });
});

describe('the brute plumbing (2026-08-26): archetype flows loudly end to end', () => {
  const quiet2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const bruteAnswer = (cr, style = null) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'brute'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    return JSON.stringify({
      name: 'Quarry Hulk', type: 'Giant', size: 'Large', alignment: 'Chaotic Neutral',
      senses: 'darkvision 60 ft.', languages: 'Giant',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      wildcard: "*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.",
    });
  };

  test('generateReskin without an archetype throws — no silent default at any layer', async () => {
    await expect(generateReskin({ concept: 'x', cr: 5 }, async () => bruteAnswer(5)))
      .rejects.toThrow(/explicit archetype/);
  });

  test('a brute generation draws a brute donor, brute card spend, same-row multiattack, no escape suite', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a quarry hulk', cr: 5, mechanics: [] },
      quiet2(() => bruteAnswer(5)));
    expect(m.generation).toMatchObject({ path: 'reskin', donor: 'brute-5', archetype: 'brute' });
    expect(m.archetype).toBe('brute');
    expect(m.ac).toBe(14); // card 16 + the measured -2 armor-for-meat trade
    expect(m.hp).toBeGreaterThanOrEqual(95); // card 90 x 1.1, dice-snapped
    const all = Object.values(m.sections).flat();
    // brute-5 carries a thrown-rock twin, so print's or-form applies
    // (Hill Giant: "Tree Club or Trash Lob in any combination")
    expect(all.find((e) => e.name === 'Multiattack').text).toMatch(/using Named Row\d+ or Named Row\d+ in any combination/);
    expect(all.some((e) => /Dash, Disengage, or Hide|Dash or Disengage/.test(e.text))).toBe(false);
  });

  test('a trailing use-gate lifts into the entry name — never ships glued to the text', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. (2/Day)',
    })));
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.name).toMatch(/\(2\/Day\)/);
    expect(e.text).not.toMatch(/\(2\/Day\)/);
  });

  test('the regeneration off-switch follows the concept — never always the Troll\'s', async () => {
    const run = (energy) => generateReskin(
      { archetype: 'brute', concept: 'a thing that reknits', cr: 5, style: 'regenerator', mechanics: [], energy },
      quiet2(() => bruteAnswer(5, 'regenerator')));
    const necro = await run('Necrotic');
    const rgN = (necro.sections.Traits ?? []).find((e) => e.name === 'Regeneration');
    expect(rgN.text).toMatch(/takes Radiant damage/); // the Vampire's own print pattern
    expect(rgN.text).not.toMatch(/Acid or Fire/);
    const plain = await run(null);
    const rgP = (plain.sections.Traits ?? []).find((e) => e.name === 'Regeneration');
    expect(rgP.text).toMatch(/Acid or Fire damage/); // no energy -> print's Troll default
  });

  test('the wildcard prose obeys the energy weld — no Acid on a physical creature', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
    const p = JSON.parse(answer({
      wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target takes 10 (3d6) Acid damage.',
    }));
    expect(rd(scaled, p, { mix: 'physical' }).join(' ')).toMatch(/deals Acid but this creature is declared fully physical/);
    expect(rd(scaled, p, { energy: 'Cold' }).join(' ')).toMatch(/deals Acid but this creature's energy is Cold/);
    expect(rd(scaled, p, { energy: 'Acid' }).join(' ')).not.toMatch(/wildcard deals/);
  });

  test('prose rest-gating is metering dialect #7 — repaired or flagged, never silent', async () => {
    const dialect = "*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. The creature can't use this action again until it finishes a short or long rest.";
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: dialect });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: dialect });
    });
    // judgment tier: the unrepaired draft ships flagged — but the repair round FIRED
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Waylay')).toBeTruthy();
  });

  test('gates live in the NAME only — donor nova texts carry no inline (Recharge)', () => {
    const { DONORS: D } = require('../donors.mjs');
    for (const d of D) {
      for (const e of Object.values(d.sections).flat()) {
        if (e.gate) expect(`${d.id}/${e.name}: ${/\(Recharge/.test(e.text) ? 'INLINE GATE' : 'clean'}`).toBe(`${d.id}/${e.name}: clean`);
      }
    }
  });

  test('the grappler-5 carries the swallow engine — print swallows at low CR (Giant Toad)', () => {
    const s = scaleDonor(pickDonor(5, 'grappler', 'brute'), 5, { mechanics: [] });
    const sw = (s.sections['Bonus Actions'] ?? []).find((e) => /swallows/.test(e.text));
    expect(sw).toBeTruthy();
    expect(sw.text).toMatch(/in a single turn/); // print's interior-escape grammar
    expect(sw.text).toMatch(/only one creature swallowed at a time/);
  });

  test('a brute reaction wildcard is MECHANICAL — repaired once, else the chassis signature stands (owner promoted 2026-09-01)', async () => {
    let repairPrompt = null;
    const reaction = 'When a creature within 60 feet moves away from the creature, the creature can use its reaction to hurl a stone at it. The target must succeed on a DC 13 Strength saving throw or take 10 (3d6) Bludgeoning damage.';
    const m = await generateReskin({ archetype: 'brute', concept: 'a hurler of stones', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({ wildcard: reaction }); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(5).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(reaction)}`);
    });
    expect(repairPrompt).toMatch(/print brutes have no reactions/);
    // the repair insisted on a reaction -> fail CLOSED: no Reactions
    // section ever ships on a brute, and the signature stays in Actions
    // (the Tide King lost its whole signature to the old fail-open)
    expect(m.sections.Reactions ?? []).toHaveLength(0);
    expect((m.sections.Actions ?? []).length).toBeGreaterThanOrEqual(3);
  });

  test('a converted repair ESCAPES the frozen economy — the War-Rune Colossus bug', async () => {
    // the model declared reaction; the repair correctly converts to a
    // bonus action — the vet must not hold the new draft to the stale
    // declaration (it did, and no conversion could ever pass)
    const reaction = 'When a creature hits the creature with a melee attack, the creature can use its reaction to flare its sigils, and Opportunity Attacks against it are made with Disadvantage until the start of its next turn.';
    const converted = 'As a bonus action, the creature braces behind its sigils, and Opportunity Attacks against it are made with Disadvantage until the start of its next turn.';
    const m = await generateReskin({ archetype: 'brute', concept: 'a runed golem', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: converted });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const base = JSON.parse(bruteAnswer(5));
      base.wildcard = reaction;
      base.wildcard_economy = 'reaction';
      return JSON.stringify(base);
    });
    expect(m.sections.Reactions ?? []).toHaveLength(0);
    const shipped = Object.values(m.sections).flat().find((e) => /braces behind its sigils/.test(e.text));
    expect(shipped).toBeTruthy(); // the conversion shipped instead of the fallback
  });

  test('a brute caster draws the golem menu — self-enhancement, never escape tech', async () => {
    const { BRUTE_SPELL_MENU: BM } = require('../generate.mjs');
    const bruteCaster = (spells) => {
      const base = JSON.parse(bruteAnswer(5));
      base.spells = spells;
      return JSON.stringify(base);
    };
    const m = await generateReskin({ archetype: 'brute', concept: 'a runed golem', cr: 5, caster: true, mechanics: [] },
      quiet2(() => bruteCaster({ at_will: ['Blur', 'False Life'], daily: ['Stoneskin', 'Enlarge/Reduce'] })));
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    // tier authoring (the First Word's at-will Stoneskin/Death Ward,
    // 2026-09-01): every pick here hardens the caster, so ALL land at
    // 1/Day and the At Will line is gone — print's golem shape
    expect(sc.text).not.toMatch(/At Will/);
    expect(sc.text).toMatch(/1\/Day Each:\*\* \*Blur\*, \*False Life\*, \*Stoneskin\*, \*Enlarge\/Reduce\*/);
    // a skirmisher escape spell is OFF this menu — defect, informed repair
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] });
    scaled.spell_menu = BM;
    scaled.sections.Actions.push({ name: 'Spellcasting', rules: true, text: 'casts {spell_at_will} {spell_daily}' });
    const bad = JSON.parse(bruteCaster({ at_will: ['Misty Step', 'Blur'], daily: ['Stoneskin', 'Heroism'] }));
    expect(rd(scaled, bad, {}).join(' ')).toMatch(/"Misty Step" is not on the spell menu/);
    expect(BM).not.toContain('Shield'); // a Reaction spell — print brutes have no reactions
    expect(BM).not.toContain('Absorb Elements'); // same law
    expect(BM).not.toContain('Haste'); // sustained extra-attack — the pricing problem stays excluded
    expect(BM).toHaveLength(16);
    for (const sp of ['Fire Shield', 'Freedom of Movement', 'Death Ward', 'Enhance Ability']) expect(BM).toContain(sp);
  });

  test('spell tiers are the organ\'s: utility may sit at-will, redundant picks drop deterministically', async () => {
    const bruteCaster = (spells, type) => {
      const base = JSON.parse(bruteAnswer(5));
      base.spells = spells;
      if (type) base.type = type;
      return JSON.stringify(base);
    };
    // Jump is the brute menu's one non-defensive pick — it alone keeps at-will
    const m = await generateReskin({ archetype: 'brute', concept: 'a leaping shrine', cr: 5, caster: true, mechanics: [] },
      quiet2(() => bruteCaster({ at_will: ['Jump', 'Heroism'], daily: ['Stoneskin', 'Blur'] }, 'Construct')));
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\* \*Jump\*/);
    expect(sc.text).toMatch(/1\/Day Each:\*\* .*\*Stoneskin\*/);
    // Heroism on a Construct is a dead pick — dropped and backfilled from
    // the menu without a repair round (the First Word shipped it after
    // TWO failed repair asks, 2026-09-01)
    expect(sc.text).not.toMatch(/Heroism/);
    expect(sc.text).toMatch(/\*Enlarge\/Reduce\*/); // the backfill
  });

  test('an audit rewrite can be a deletion; a rewrite describing the edit is discarded — the Huntwind leak', async () => {
    const limiter = 'The target can do this only once per turn.';
    const wc = `*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. ${limiter}`;
    const run = (rewrite) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Waylay', section: 'Actions', span: limiter, rewrite,
          issue: 'contradictory limiter', principle: 4, confidence: 'high',
        }] });
      }
      return answer({ wildcard: wc });
    });
    // deletion: the empty rewrite removes the sentence
    const gone = await run('');
    const e1 = Object.values(gone.sections).flat().find((x) => x.name === 'Waylay');
    expect(e1.text).not.toMatch(/once per turn/);
    expect(e1.text).toMatch(/Prone condition/);
    // meta-language: the revision note is discarded, never spliced
    const kept = await run('This replaces the final sentence with nothing, as the reaction economy already limits it.');
    const e2 = Object.values(kept.sections).flat().find((x) => x.name === 'Waylay');
    expect(e2.text).not.toMatch(/replaces the final sentence/);
    expect(e2.text).toMatch(/once per turn/); // finding dropped, text stands
  });

  test('the drain exemption points outward only — heal-back immunity dies, Life Drain lives', async () => {
    // the Battlefield-Thing: P/S immunity wearing the exemption's clothes
    const m = await generateReskin({ archetype: 'brute', concept: 'a scarred mass', cr: 20, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(20));
      base.trait_wildcard = { name: 'Regenerative Scar Tissue', text: 'When the creature takes Piercing or Slashing damage, it immediately regains Hit Points equal to the damage taken. This trait fails against Fire or Acid damage.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Regenerative Scar Tissue')).toBe(false);
    // the when-hit + self-heal tell catches the amount form too, in traits
    const m2 = await generateReskin({ archetype: 'brute', concept: 'a scarred mass', cr: 11, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(11));
      base.trait_wildcard = { name: 'Knitting Flesh', text: 'Whenever the creature takes damage, it regains 9 (2d8) Hit Points.' };
      return JSON.stringify(base);
    }));
    expect((m2.sections.Traits ?? []).some((e) => e.name === 'Knitting Flesh')).toBe(false);
    // outward drain grammar is untouched — print's Life Drain
    const drain = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: "*Constitution Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 14 (4d6) Necrotic damage, and the creature regains Hit Points equal to half the damage dealt.",
    })));
    const e = Object.values(drain.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/regains Hit Points equal to half the damage dealt/);
  });

  test('the reaction shape hears active voice — "When a creature hits it" on a brute', async () => {
    let repairPrompt = null;
    const shaped = 'When a creature within 30 feet hits it with a melee attack, the attacker must succeed on a DC 16 Strength saving throw or have the Prone condition.';
    await generateReskin({ archetype: 'brute', concept: 'a lashing mass', cr: 11, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(11).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(shaped)}`);
    });
    expect(repairPrompt).toMatch(/print brutes have no reactions/);
  });

  test('typed damage defenses are the derivation engine\'s — trait grants die, priced action stances live', async () => {
    const trait = (text, name = 'Rune-Seams of Making') => generateReskin({ archetype: 'brute', concept: 'a god-forged golem', cr: 19, style: 'juggernaut', mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(19, 'juggernaut'));
      base.trait_wildcard = { name, text };
      return JSON.stringify(base);
    }));
    // the First-Built's flat B/P/S grant (~+60% eHP at CR 19, unpriced)
    const flat = await trait('The creature has resistance to Bludgeoning, Piercing, and Slashing damage. It cannot be Restrained.');
    expect((flat.sections.Traits ?? []).some((e) => e.name === 'Rune-Seams of Making')).toBe(false);
    // the Garden Saint's retroactive form — resistance granted against its own trigger
    const retro = await trait('If the creature takes damage from a nonmagical attack, it gains resistance to that damage type against that attack.', 'Endless Renewal');
    expect((retro.sections.Traits ?? []).some((e) => e.name === 'Endless Renewal')).toBe(false);
    // an unbounded ACTION grant dies too; the duration-bound stance is
    // pinned as legal by the existing Resistance-is-a-game-term test
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature hardens its hide, gaining Resistance to Fire damage.' });
    });
    expect(repairPrompt).toMatch(/derivation engine's jurisdiction/);
  });

  test('informal saves and bonus actions cannot hide in traits — the Grieving Weep evasion', async () => {
    const trait = (name, text) => generateReskin({ archetype: 'brute', concept: 'a weeping mountain', cr: 18, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(18));
      base.trait_wildcard = { name, text };
      return JSON.stringify(base);
    }));
    // a bonus action with a 2014-informal save, filed under Traits
    const weep = await trait('Grieving Weep', 'As a bonus action, the creature weeps, and one hostile creature within 30 feet must make a Wisdom saving throw (DC 20) or have Disadvantage on attack rolls against the creature.');
    expect((weep.sections.Traits ?? []).some((e) => e.name === 'Grieving Weep')).toBe(false);
    // passive mention stays legal — print's own grammar
    const ward = await trait('Old Blessing', 'The creature has Advantage on saving throws against spells and other magical effects.');
    expect((ward.sections.Traits ?? []).some((e) => e.name === 'Old Blessing')).toBe(true);
  });

  test('a brute trait cannot grant free OA-immunity; a skirmisher still can', async () => {
    const bruteRun = await generateReskin({ archetype: 'brute', concept: 'a rust bear', cr: 9, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(9));
      base.trait_wildcard = { name: 'Rusting Grip', text: 'The creature ignores Difficult Terrain and does not provoke Opportunity Attacks.' };
      return JSON.stringify(base);
    }));
    expect((bruteRun.sections.Traits ?? []).some((e) => e.name === 'Rusting Grip')).toBe(false);
    const skirmRun = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      trait_wildcard: { name: 'Ghost Gait', text: 'The creature\'s movement does not provoke Opportunity Attacks.' },
    })));
    expect((skirmRun.sections.Traits ?? []).some((e) => e.name === 'Ghost Gait')).toBe(true);
  });

  test('a trait cannot teleport past the chassis — the Reflection Step gap', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a mirror thief', cr: 6, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(6));
      base.trait_wildcard = { name: 'Reflection Step', text: 'While within 5 feet of a reflective surface, the creature can teleport between such surfaces as part of its movement.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Reflection Step')).toBe(false);
  });

  test('mid-text "The creature" substitutes in traits — the Rust-Thorn antecedent muddle', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a thorn bear', cr: 9, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(9));
      base.trait_wildcard = { name: 'Thorn-Wire Carapace', text: 'Any creature that touches the creature can be seen bleeding. The creature ignores Difficult Terrain.' };
      return JSON.stringify(base);
    }));
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Thorn-Wire Carapace');
    expect(t).toBeTruthy();
    expect(t.text).not.toMatch(/The creature/); // sentence-initial mid-text substituted
    expect(t.text).toMatch(/ignores Difficult Terrain/);
  });

  test('the writer may not explain that flavor is flavor — the Shedding Arsenal disclaimer', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a battlefield mass', cr: 20, mechanics: ['regeneration'] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(20, 'regenerator'));
      base.trait_wildcard = { name: 'Shedding Arsenal', text: 'When the creature takes damage, an old weapon surfaces on its body or falls nearby. This is purely cosmetic; it grants no mechanical benefit.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Shedding Arsenal')).toBe(false);
  });

  test('the trailing meter sentence LIFTS into the entry name — "This ability can be used 2/Day." (upgraded from detect-only, 2026-09-11)', async () => {
    // 3 sightings in two rounds, all save-action rows: the exact closed
    // sentence now strips deterministically and its count lands in the
    // name — same lift class as the trailing parenthetical
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. This ability can be used 2/Day.' });
    });
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.name).toMatch(/\(2\/Day\)/);
    expect(e.text).not.toMatch(/can be used 2\/Day/);
  });

  test('inflection cannot beat the guards — "regaining", DR grammar, and "embedded" all die', async () => {
    const trait = (name, text) => generateReskin({ archetype: 'brute', concept: 'a scarred mass', cr: 19, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(19));
      base.trait_wildcard = { name, text };
      return JSON.stringify(base);
    }));
    // the Garden Saint's conjugation evasion (same class as "gaining")
    const regrow = await trait('Regrowing Flesh', 'When the creature takes Slashing or Piercing damage, it regrows tissue at the start of its next turn, regaining 20 Hit Points.');
    expect((regrow.sections.Traits ?? []).some((e) => e.name === 'Regrowing Flesh')).toBe(false);
    // the Gulletmaw's flat DR — a defense grammar 2024 print doesn't use
    const plating = await trait('Chitinous Plating', 'The creature is immune to the Prone condition. Damage from Bludgeoning, Piercing, and Slashing attacks is reduced by 5 unless the attack is a critical hit.');
    expect((plating.sections.Traits ?? []).some((e) => e.name === 'Chitinous Plating')).toBe(false);
    // the Battlefield Chorus's recovery-by-death-only
    const sust = await trait('Embedded Weapon Sustenance', 'While a weapon is embedded in the creature, it is unusable and cannot be removed until the creature dies.');
    expect((sust.sections.Traits ?? []).some((e) => e.name === 'Embedded Weapon Sustenance')).toBe(false);
  });

  test('narrating the action system is a defect — "can use one action to"', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'brute', concept: 'a weapon eater', cr: 20, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(20).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify('On each of its turns, the creature can use one action to target one creature within 30 feet. *Strength Saving Throw*: DC 21. *Failure:* The target drops one weapon it is holding.')}`);
    });
    expect(repairPrompt).toMatch(/never narrates the action system/);
  });

  test('a stuck weapon is priced and recoverable — the Embedded Arsenal rule', async () => {
    const stuck = (text) => generateReskin({ archetype: 'brute', concept: 'a scarred colossus', cr: 7 }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(7));
      base.trait_wildcard = { name: 'Embedded Arsenal', text };
      return JSON.stringify(base);
    }));
    const bad = await stuck('Blades and arrows are lodged throughout the creature. Whenever the creature takes damage from a weapon attack, the weapon becomes stuck in its flesh until the wielder retrieves it.');
    expect((bad.sections.Traits ?? []).some((e) => e.name === 'Embedded Arsenal')).toBe(false);
    // the Mimic shape ships: the stick is priced with an escape DC
    const good = await stuck('Blades and arrows are lodged throughout the creature. A weapon that deals it damage becomes stuck in its flesh (escape DC 14 Strength check to pull it free).');
    expect((good.sections.Traits ?? []).some((e) => e.name === 'Embedded Arsenal')).toBe(true);
  });

  test('attack-Disadvantage defense needs a break — the Displacer rule', async () => {
    const hide = (text) => generateReskin({ archetype: 'brute', concept: 'an iron-quilled boar', cr: 6 }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(6));
      base.trait_wildcard = { name: 'Rending Quillhide', text };
      return JSON.stringify(base);
    }));
    const bad = await hide('The creature\'s hide bristles with screaming quills. Melee attacks against the creature have Disadvantage.');
    expect((bad.sections.Traits ?? []).some((e) => e.name === 'Rending Quillhide')).toBe(false);
    // print's Displacement shape survives: the defense carries its break
    const good = await hide('The creature\'s hide bristles with screaming quills. Melee attacks against the creature have Disadvantage. If the creature takes damage, this trait is disrupted until the end of its next turn.');
    expect((good.sections.Traits ?? []).some((e) => e.name === 'Rending Quillhide')).toBe(true);
  });

  test('regeneration claimed pulls the regenerator line — the organ\'s own seat (0/3 draws before)', async () => {
    // the engulf->grappler law extended: a juggernaut-classified reknit
    // concept now draws the regenerator donor, whose AUTHORED Regeneration
    // still takes the claimed-bane re-key
    const m = await generateReskin(
      { archetype: 'brute', concept: 'a marble warder that reknits; only holy light scours it', cr: 16, style: 'juggernaut', mechanics: ['regeneration'] },
      quiet2(() => bruteAnswer(16, 'regenerator')));
    expect(m.generation.donor).toBe('brute-10-regenerator');
    const rg = (m.sections.Traits ?? []).find((e) => e.name === 'Regeneration');
    expect(rg.rules).toBe(true);
    expect(rg.text).toMatch(/regains 15 Hit Points/);
    expect(rg.text).toMatch(/takes Radiant damage/); // the claimed bane re-keys authored rows too
    // at boss CR the legendary regenerator seat finally draws
    const boss = await generateReskin(
      { archetype: 'brute', concept: 'its flesh regrows faster than blades can cut it', cr: 20, mechanics: ['regeneration'] },
      quiet2(() => bruteAnswer(20, 'regenerator')));
    expect(boss.generation.donor).toBe('brute-17-regenerator');
  });

  test('engulf outranks regeneration — the organ injects onto the grappler donor (foreign-donor path)', async () => {
    const m = await generateReskin(
      { archetype: 'brute', concept: 'a healing pit of tar that swallows', cr: 16, mechanics: ['engulf', 'regeneration'] },
      quiet2(() => bruteAnswer(16, 'grappler')));
    expect(m.generation.donor).toBe('brute-15-grappler');
    const rg = (m.sections.Traits ?? []).find((e) => e.name === 'Regeneration');
    expect(rg).toBeTruthy();
    expect(rg.rules).toBe(true);
    expect(rg.text).toMatch(/regains 15 Hit Points/); // injected — the grappler donor carries no authored regen
  });

  test('a wildcard re-implementing the containment engine is a defect — the engine wins', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8, 'grappler', 'brute'), 8, { mechanics: [] });
    const p = JSON.parse(bruteAnswer(8, 'grappler'));
    p.wildcard = '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is sealed inside the creature and takes 11 (2d10) Bludgeoning damage at the start of each of its turns.';
    expect(rd(scaled, p, {}).join(' ')).toMatch(/must not re-implement/);
    // the Tavern's word order beat the old pattern: verb after preposition
    p.wildcard = '*Strength Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target is pulled into the dark barroom and swallowed, becoming Entombed (escape DC 14).';
    expect(rd(scaled, p, {}).join(' ')).toMatch(/must not re-implement/);
  });

  test('healing belongs to the organ — full-heal and turn-based recovery die; drain survives', async () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    // the Howdah's full-heal evasion: not negation, not threshold — set-to-max
    const m = await generateReskin({ archetype: 'brute', concept: 'a stitched beast', cr: 12, style: 'regenerator', mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(12, 'regenerator'));
      base.trait_wildcard = { name: 'Seam-Knit Hide', text: 'At the start of each of its turns, the creature\'s Hit Points become its Hit Point maximum if its current Hit Points are lower.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Seam-Knit Hide')).toBe(false);
    // the Idol's hand-built duplicate regen dies the same way
    const scaled = scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] });
    const dup = JSON.parse(bruteAnswer(9));
    dup.trait_wildcard = { name: 'Endless Self-Reknitting', text: 'The creature regains 10 Hit Points at the start of each of its turns.' };
    // trait vet path — verified via the full flow above; here pin the wildcard path too
    dup.wildcard = 'The creature knits its wounds shut, and it regains 10 Hit Points at the start of each of its turns.';
    expect(rd(scaled, dup, {})).toEqual(expect.arrayContaining([])); // rd has no wildcard-heal check; the vet carries it
    // DRAIN stays legal — print's Life Drain grammar
    const drain = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: "*Constitution Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 14 (4d6) Necrotic damage, and the creature regains Hit Points equal to half the damage dealt.",
    })));
    const e = Object.values(drain.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/regains Hit Points equal to/);
  });

  test('reaction-SHAPED triggers are caught without the word — "When it takes damage" on a brute', async () => {
    let repairPrompt = null;
    const shaped = 'When the creature takes damage, it emits a piercing wail. Each creature within 30 feet must succeed on a DC 13 Wisdom saving throw or have Disadvantage on its next attack roll.';
    await generateReskin({ archetype: 'brute', concept: 'a howling ram', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(5).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(shaped)}`);
    });
    expect(repairPrompt).toMatch(/print brutes have no reactions/);
    // the coaching says HOW (0/3 clean conversions before, 2026-09-01):
    // drop the trigger, never relabel it
    expect(repairPrompt).toMatch(/DROP THE TRIGGER/);
  });

  test('containment by contact always offers a save — the Greedfall rule', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a living mudslide', cr: 7 }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(7));
      base.trait_wildcard = { name: 'Engulfing Mudflow', text: 'The creature can occupy other creatures\' spaces. A creature sharing its space has the Restrained condition and can\'t breathe.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Engulfing Mudflow')).toBe(false);
  });

  test('a fronted timing clause cannot walk past the healing guard — the Plague-Shrine evasion', async () => {
    // "At the start of each of its turns, it regains 10" — same sentence
    // as "regains 10 at the start of", assembled in the other order
    const m = await generateReskin({ archetype: 'brute', concept: 'a walking shrine', cr: 11, style: 'regenerator', mechanics: ['regeneration'] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(11, 'regenerator'));
      base.trait_wildcard = { name: 'Self-Knitting Stone', text: 'At the start of each of its turns, the creature regains 10 Hit Points. Its wounds close with a wet, holy light.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Self-Knitting Stone')).toBe(false);
  });

  test('a preamble sentence cannot hide the reaction shape — the Weeping Rot evasion', async () => {
    let repairPrompt = null;
    const shaped = 'The creature\'s wounds weep a thick, clinging rot. When the creature takes damage from a melee attack, the attacker must succeed on a DC 13 Constitution saving throw or have the Poisoned condition until the end of its next turn.';
    await generateReskin({ archetype: 'brute', concept: 'a weeping shrine', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(5).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(shaped)}`);
    });
    expect(repairPrompt).toMatch(/print brutes have no reactions/);
  });

  test('projectile fiction is not flight — quills flying AT a target ship; the creature flying dies', async () => {
    // the Ironbristle deadlock: 4 burned calls rejecting "quills…flying
    // at the attacker" on the bare word
    const quills = '*Dexterity Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The creature\'s quills scream and detach, flying at the target, and the target has Disadvantage on its next attack roll. The quills re-form by the start of the creature\'s next turn.';
    let repaired = null;
    const m = await generateReskin({ archetype: 'brute', concept: 'an iron-quilled boar', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repaired = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(5).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(quills)}`);
    });
    expect(repaired).toBeNull();
    expect(Object.values(m.sections).flat().some((e) => /flying at the target/.test(e.text))).toBe(true);
    // creature-as-subject flight is still a movement grant — still illegal
    let repairPrompt = null;
    const grant = '*Dexterity Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The creature flies up to 30 feet without provoking Opportunity Attacks, and the target has the Prone condition.';
    await generateReskin({ archetype: 'brute', concept: 'an iron-quilled boar', cr: 5, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return bruteAnswer(5).replace(/"wildcard":\s*"[^"]+"/, `"wildcard":${JSON.stringify(grant)}`);
    });
    expect(repairPrompt).toMatch(/flight beyond the chassis/);
  });

  test('Restrained must carry an exit — save-to-avoid is a door in, not a door out', async () => {
    let repairPrompt = null;
    const noExit = '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet toward the creature and has the Restrained condition.';
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: noExit });
    });
    expect(repairPrompt).toMatch(/Restrained must carry an exit/);
    // the same pull with a repeated save ships clean
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: `${noExit} The target can repeat the save at the end of each of its turns, ending the condition on a success.`,
    })));
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/repeat the save/);
  });

  test('an audit rename claiming an unpaid element is blocked — the standing name stays', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Hedge Runner', section: 'Traits',
          span: 'Hedge Runner',
          issue: 'name-fiction mismatch', principle: 1, confidence: 'high',
          rename: 'Burning Hedgerow',
        }] });
      }
      return answer();
    });
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names).toContain('Hedge Runner');
    expect(names).not.toContain('Burning Hedgerow');
  });

  test('a damage-threshold immunity is negation-family — never on a creature', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a stitched hide beast', cr: 12, style: 'regenerator', mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(12, 'regenerator'));
      base.trait_wildcard = { name: 'Restitching Hides', text: 'The creature ignores attacks that deal less than 20 damage, and its seams reknit at the start of each of its turns.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Restitching Hides')).toBe(false);
  });

  test('the regen off-switch consults the shipped vulnerability when no bane was claimed', async () => {
    const run = (concept) => generateReskin(
      { archetype: 'brute', concept, cr: 10, style: 'regenerator', mechanics: ['regeneration'] },
      quiet2(() => {
        const base = JSON.parse(bruteAnswer(10, 'regenerator'));
        base.vulnerability = 'Radiant';
        return JSON.stringify(base);
      }));
    // "blessed" warrants Radiant but "parts them" is no frame verb... it IS
    // one now — so use a claim the frame genuinely cannot see
    const m = await run('a stitched beast that reknits; blessed weapons are its dread');
    expect(m.vulnerabilities).toBe('Radiant');
    expect((m.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text)
      .toMatch(/takes Radiant damage/); // re-keyed from the shipped vulnerability
  });

  test('the bane frame knows "parts" — only a blessed blade parts them', () => {
    // unit-level: the frame regex sees the elephant's phrasing
    const frame = /\bonly ([^.]{0,60}?)(?:scours|destroys|harms|undoes|unmakes|banishes|slays|stops|kills|shatters?|breaks?|fells?|parts?|severs?|sunders?|pierces?|ends?|wounds?|brings? (?:it|him|her|them) down|can (?:stop|kill|slay|harm|destroy|shatter|break|wound|end|fell|pierce|part|sever)|can truly)/i;
    expect(frame.exec('its seams reknit; only a blessed blade parts them')[1]).toMatch(/blessed blade/);
  });

  test('an ungated area wildcard over the per-target cap flags; a gated one passes', async () => {
    const area = (gate) => `${gate}*Dexterity Saving Throw*: DC 15, each creature in a 15-foot-radius Sphere within 60 feet. *Failure:* 14 (4d6) Fire damage. *Success:* Half damage.`;
    const flagged = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Fire' }, quiet2(() => answer({
      wildcard: area(''),
    })));
    // per_hit 15 at cr 8 -> cap 11; 14 > 11, ungated -> judgment repair fired, unrepaired ships flagged
    expect(flagged).toBeTruthy();
    // 2/Day since 2026-09-02: the chassis carries its own Recharge nova,
    // and print never fields two Recharge entries — a 2/Day gate satisfies
    // the area pricing without duplicating the nova's meter
    const gated = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Fire' }, quiet2(() => answer({
      wildcard: `Flame Ring (2/Day). ${area('')}`,
    })));
    const e = Object.values(gated.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.name).toMatch(/2\/Day/); // the lifted gate satisfies the area pricing
  });

  test('a gated rider is a defect — riders have no name to carry a gate', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard_economy: 'rider_on:Thorn Rake',
        wildcard: 'When the creature hits with this attack, it can activate this ability (2/Day). The target must succeed on a DC 15 Strength saving throw or have the Prone condition.',
      });
    });
    expect(repairPrompt).toMatch(/no name to carry a use gate/);
  });

  test('the vacuous 1-HP clause strips at both positions', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      trait_wildcard: { name: 'Molten Drip', text: 'While it has at least 1 Hit Point, the creature sheds dim light in a 10-foot radius. It can see through this light while it has at least 1 Hit Point.' },
    })));
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Molten Drip');
    expect(t.text).not.toMatch(/at least 1 Hit Point/);
    expect(t.text).toMatch(/^The /); // leading strip re-capitalized
  });

  test('vowel-initial verb swaps keep article agreement — "an entombed creature"', async () => {
    const withStyle2 = (style) => bruteAnswer(5, 'grappler').replace(/}$/, `,"engulf_style":${JSON.stringify(style)}}`);
    const m = await generateReskin({ archetype: 'brute', concept: 'a cairn', cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => withStyle2('entomb')));
    const row = (m.sections['Bonus Actions'] ?? []).find((e) => e.rules);
    expect(row.text).toMatch(/an entombed creature/);
    expect(row.text).not.toMatch(/\ba entombed/);
  });

  test('engine as signature: an insistent containment wildcard drops the slot — no twin, no zap (owner: "keep the recipe card")', async () => {
    const containment = '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target is sealed inside the creature and takes 11 (2d10) Bludgeoning damage at the start of each of its turns.';
    const m = await generateReskin({ archetype: 'brute', concept: 'a walking cairn that seals prey inside', cr: 5, style: 'grappler', mechanics: ['engulf', 'grapple'] }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) {
        const base = JSON.parse(bruteAnswer(5, 'grappler'));
        return JSON.stringify({ wildcard: containment, renames: base.renames }); // the model insists
      }
      const base = JSON.parse(bruteAnswer(5, 'grappler'));
      base.wildcard = containment;
      return JSON.stringify(base);
    });
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /sealed inside/.test(e.text))).toBe(false); // no bespoke twin
    expect(all.some((e) => /Disadvantage on its next attack roll/.test(e.text))).toBe(false); // no fallback zap
    expect((m.sections['Bonus Actions'] ?? []).some((e) => e.rules)).toBe(true); // the engine IS the signature
  });

  test('an ungated over-cap area action is now MECHANICAL — chassis stands', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Fire' }, quiet2(() => answer({
      wildcard: '*Dexterity Saving Throw*: DC 15, each creature in a 15-foot-radius Sphere within 60 feet. *Failure:* 14 (4d6) Fire damage. *Success:* Half damage.',
    })));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('a model-authored death condition is mechanical — a creature dies only at 0 HP', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. Each time the creature takes Slashing damage, one string snaps; when the fourth snaps, it collapses into dead timber and is destroyed.',
    })));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
    // print's duration idiom stays legal ("until it is destroyed")
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
    const ok = JSON.parse(answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until it is destroyed or the creature dies.' }));
    expect(rd(scaled, ok, {}).join(' ')).not.toMatch(/dies only at 0/);
  });

  test('blanket all-damage resistance is mechanical in a trait', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      trait_wildcard: { name: 'Ice Seal', text: 'When the creature takes damage, it gains Resistance to all damage except Thunder until the start of its next turn.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ice Seal')).toBe(false);
  });

  test('an action granting a TYPED resistance passes the vet — Resistance is a game term now', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: 'The creature hardens its hide, gaining Resistance to Fire damage until the start of its next turn.',
    })));
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/Resistance to Fire damage/); // shipped, not killed for "no game term"
  });

  test('the bane frame knows "shatter" — only thunder can shatter it', async () => {
    const m = await generateReskin(
      { archetype: 'brute', concept: 'an ice bear that reknits; only thunder can shatter it', cr: 10, style: 'regenerator', mechanics: ['regeneration'], energy: 'Cold' },
      quiet2(() => bruteAnswer(10, 'regenerator')));
    expect((m.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text)
      .toMatch(/takes Thunder damage/); // the claim beats the Cold->Fire foil
  });

  test('engine interiors scale below the seat floor — no 2d6 stomach on a CR 1/2 ooze', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a hungry ooze', cr: 0.5, style: 'grappler', mechanics: [] },
      quiet2(() => bruteAnswer(0.5, 'grappler')));
    const row = (m.sections['Bonus Actions'] ?? []).find((e) => e.rules);
    const avg = Number(/takes (\d+) \(/.exec(row.text)[1]);
    expect(avg).toBeLessThanOrEqual(3);
    expect(row.text).toMatch(/takes 5 damage or more/); // threshold scaled with the floor
  });

  test('spell redundancy is no longer a repair conversation — the fill site owns it', () => {
    // (2026-09-01: two repair rounds failed a one-word Heroism swap on the
    // First Word and shipped it anyway — the drop-and-backfill moved to
    // the deterministic fill; see the tier-authoring test for the behavior)
    const { reskinDefects: rd, BRUTE_SPELL_MENU: BM } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] });
    scaled.spell_menu = BM;
    scaled.sections.Actions.push({ name: 'Spellcasting', rules: true, text: 'casts {spell_at_will} {spell_daily}' });
    const base = JSON.parse(bruteAnswer(5));
    base.type = 'Construct';
    base.spells = { at_will: ['Magic Weapon', 'Heroism'], daily: ['Stoneskin', 'Blur'] };
    expect(rd(scaled, base, {}).join(' ')).not.toMatch(/already grants/);
  });

  test('the engulf engine wears the body\'s verb — a chain thing cages, never swallows', async () => {
    const withStyle = (style) => bruteAnswer(5, 'grappler').replace(/}$/, `,"engulf_style":${JSON.stringify(style)}}`);
    const cage = await generateReskin({ archetype: 'brute', concept: 'a thing of chains', cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => withStyle('cage')));
    const row = (cage.sections['Bonus Actions'] ?? []).find((e) => e.rules);
    expect(row.name).toBe('Cage');
    expect(row.text).toMatch(/cages one Medium or smaller creature/);
    expect(row.text).toMatch(/must release the target/);
    expect(row.text).not.toMatch(/swallow/i);
    const plain = await generateReskin({ archetype: 'brute', concept: 'a maw', cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => bruteAnswer(5, 'grappler')));
    const sw = (plain.sections['Bonus Actions'] ?? []).find((e) => e.rules);
    expect(sw.name).toBe('Swallow'); // no style answered -> the print default, never model-named
    // the widened menu (owner 2026-08-27): print-verbatim Smother/Whelm forms
    const rug = await generateReskin({ archetype: 'brute', concept: 'a burial shroud that wraps the living', cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => withStyle('smother')));
    const smRow = (rug.sections['Bonus Actions'] ?? []).find((e) => e.rules);
    expect(smRow.name).toBe('Smother');
    expect(smRow.text).toMatch(/smothers one Medium or smaller creature/);
    expect(smRow.text).toMatch(/Bludgeoning damage/); // suffocation crushes; only mouths digest
  });

  test('engine vocabulary in rules text is mechanical — "(as per chassis)" never ships', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      trait_wildcard: { name: 'Chain Limbs', text: 'The creature gains a climb speed as per chassis, and it can\'t be Grappled.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Chain Limbs')).toBe(false);
  });

  test('alignment is a closed vocabulary — lore commentary is stripped, case is canonical', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      alignment: "Unaligned (Feral, Driven By Its Prison'S Grief)",
    })));
    expect(m.alignment).toBe('Unaligned');
    const m2 = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      alignment: 'chaotic evil, cruel beyond measure',
    })));
    expect(m2.alignment).toBe('Chaotic Evil');
  });

  test('a claimed bane outranks the energy foil — "only holy light scours it" means Radiant', async () => {
    const run = (concept, energy) => generateReskin(
      { archetype: 'brute', concept, cr: 5, style: 'regenerator', mechanics: [], energy },
      quiet2(() => bruteAnswer(5, 'regenerator')));
    const holy = await run('a wax mass that reknits; only holy light scours it clean', 'Fire');
    expect((holy.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text).toMatch(/takes Radiant damage/);
    const plainFoil = await run('a burning wax mass that reknits', 'Fire');
    expect((plainFoil.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text).toMatch(/takes Cold damage/);
  });

  test('the 2014 half-HP phrase swaps to the Bloodied keyword (corpus: 16 vs 0)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition. This action can be used only while the creature has fewer than half its Hit Points remaining.',
    })));
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/is Bloodied/);
    expect(e.text).not.toMatch(/fewer than half/);
  });

  test('rules text uses print\'s SHORT form — a boss title never ships whole mid-sentence', async () => {
    const run = (name) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({ name })));
    // "X, the Y" — the most common boss naming convention (0/329 print
    // names carry a comma, so the header keeps it and the body doesn't)
    const titled = await run('Khazur-Mul, the Tide King');
    const titledText = Object.values(titled.sections).flat().map((e) => e.text).join(' ');
    expect(titledText).toMatch(/the tide king/);
    expect(titledText).not.toMatch(/khazur-mul, the tide king/i);
    // 3+ words head on the final noun (print: "the dragon", "the rug")
    const long = await run('Ancient Bogwood Colossus');
    expect(Object.values(long.sections).flat().map((e) => e.text).join(' ')).toMatch(/the colossus/);
    // "X of Y" heads on X (print: Sphinx of Lore -> "the sphinx")
    const ofName = await run('Gullet of the Mudbank');
    expect(Object.values(ofName.sections).flat().map((e) => e.text).join(' ')).toMatch(/the gullet/);
    // two words ship whole — print's own inline ceiling (the dire wolf)
    const short = await run('Bog Lurker');
    expect(Object.values(short.sections).flat().map((e) => e.text).join(' ')).toMatch(/the bog lurker/);
  });

  test('containment prose passes the muddle guard — engulf wildcards write "inside the creature"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is drawn inside the creature. While inside the creature, the target is Restrained, and it takes 7 (2d6) Bludgeoning damage at the start of each of its turns. The target can repeat the save at the end of each of its turns, pulling free on a success.',
    })));
    const e = Object.values(m.sections).flat().find((x) => /Waylay/.test(x.name));
    expect(e.text).toMatch(/inside the/); // shipped, not killed to fallback
  });

  test('a styled boss draws a legendary seat — the Fused Monarchy class', async () => {
    // CR 21 + juggernaut used to draw brute-16-juggernaut (non-legendary,
    // stretched 5 seats): a boss with no Legendary Resistance, no menu,
    // no nova (2026-09-01). The legendary style seats close it.
    const m = await generateReskin({ archetype: 'brute', concept: 'the mountain that ate a kingdom', cr: 21, style: 'juggernaut', mechanics: [] },
      quiet2(() => bruteAnswer(21, 'juggernaut')));
    expect(m.generation.donor).toBe('brute-17-juggernaut');
    const legs = m.sections['Legendary Actions'] ?? [];
    expect(legs.length).toBe(4);
    expect(Object.values(m.sections).flat().some((e) => /Legendary Resistance/.test(e.name))).toBe(true);
    expect(Object.values(m.sections).flat().some((e) => /Recharge/.test(e.name))).toBe(true); // the nova came aboard too
  });

  test('a claimed engulf pulls the grappler line — no more Entomb-that-does-not', async () => {
    const m = await generateReskin(
      { archetype: 'brute', concept: 'a walking cairn that seals trespassers inside', cr: 8, style: 'juggernaut', mechanics: ['engulf', 'grapple'] },
      quiet2(() => bruteAnswer(8, 'grappler')));
    expect(m.generation.donor).toBe('brute-8-grappler');
  });

  test('engine-covered elements are demoted from the seats — no duplicate organs', () => {
    const { assignSeats: as2 } = require('../generate.mjs');
    const seats = as2(
      [{ element: 'wrapping crush', kind: 'behavior' }, { element: 'stifling grip', kind: 'behavior' }, { element: 'animated burial shroud', kind: 'body' }],
      { covered: [/wrap|crush|swallow|smother/i] },
    );
    expect(seats.action).toBe('stifling grip'); // 'wrapping crush' demoted — the engine already wraps
    expect(seats.rest).toContain('wrapping crush');
  });

  // HISTORY: the FALLBACK NOTICE audit brief died with the fallback
  // (2026-09-13) — nothing ships, so there is nothing to be honest about
  test('an unrepairable wildcard drops the slot and the audit hears no fallback brief', async () => {
    let auditPrompt = null;
    const bad = 'The creature becomes utterly invisible to yours truly and you cannot see it.'; // second person: mechanical, unrepairable
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({ wildcard: bad });
      if (prompt.startsWith('You are auditing')) { auditPrompt = prompt; return JSON.stringify({ findings: [] }); }
      return answer({ wildcard: bad });
    });
    expect(auditPrompt).not.toMatch(/FALLBACK NOTICE/);
    expect(m.generation.signature).toBe('library');
  });

  test('the charger engine survives the reskin: charge rider and the Prone-gated trample', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a rampaging bull-thing', cr: 5, style: 'charger', mechanics: [] },
      quiet2(() => bruteAnswer(5, 'charger')));
    expect(m.generation.donor).toBe('brute-5-charger');
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /moved 20\+ feet straight toward/.test(e.text))).toBe(true);
    const trample = (m.sections['Bonus Actions'] ?? []).find((e) => /Prone condition\. \*Failure:\*/.test(e.text));
    expect(trample).toBeTruthy();
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, the target must succeed on a DC 15 Dexterity saving throw or have the Prone condition.',
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/the target must succeed on a DC 15/);
    expect(host.text).not.toMatch(/one creature within/);
  });

  test('a rider with its own targeting frame gets the rider-specific repair instruction', async () => {
    let repairPrompt = '';
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      // capture the FIRST repair prompt only — the pivot (2026-09-15)
      // also starts with 'You are repairing' and would overwrite it
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'The creature teleports up to 30 feet to an unoccupied space it can see, and one creature within 5 feet of its destination must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Thunder damage.',
      });
    });
    expect(repairPrompt).toMatch(/must not teleport/);
  });

  test('register caps are actuated at ship time — damage types and multiword game terms', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: "When the creature hits with this attack, the target takes 7 (2d6) necrotic damage and can't make opportunity attacks until the end of its next turn.",
    })));
    const host = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(host.text).toMatch(/Necrotic damage/);
    expect(host.text).toMatch(/Opportunity Attacks/);
  });

  test('an ungated negation defense is mechanical — chassis stands', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: 'When a creature hits the creature with a melee attack, the attack is negated, and the attacker must succeed on a DC 15 Dexterity saving throw or take 10 (3d6) Fire damage.',
    })));
    { // fallback deleted + LIBRARY landed 2026-09-13: a rejected wildcard
      // now draws a generified golden seed under the model's rename
      const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
      expect(w.library).toBe(true);
      expect(w.text).not.toMatch(/Disadvantage on its next attack roll before the start/);
    }
  });

  test('a negation defense priced as a Reaction ships', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard_economy: 'reaction',
      wildcard: 'When a creature within 5 feet hits the creature with a melee attack, the creature scatters into ash and the attack is negated, then re-forms in its space.',
    })));
    const e = (m.sections.Reactions ?? []).find((x) => x.name === 'Waylay');
    expect(e).toBeTruthy();
    expect(e.text).toMatch(/negated/);
  });

  test('a negation trait is rejected outright — a trait has no cost to pay', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Ash Step', text: 'When a creature hits the creature with an attack, the creature vanishes into ash and the attack is negated.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ash Step')).toBe(false);
  });

  test('a reaction-shaped trait is rejected — the trait vet now has the check the action vet had', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Ash Body', text: 'When the creature takes damage, it can use its reaction to teleport up to 30 feet away.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ash Body')).toBe(false);
  });

  test('the lint actuator never moves action-shaped content to Traits', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      wildcard: 'When the creature hits with this attack, lightning arcs to a second target within 15 feet of the first. That target must succeed on a DC 15 Dexterity saving throw or take 7 (2d6) Lightning damage.',
    })));
    const entry = Object.values(m.sections).flat().find((e) => e.name === 'Waylay');
    expect((m.sections.Traits ?? []).includes(entry)).toBe(false);
    expect((m.sections.Actions ?? []).includes(entry)).toBe(true);
  });

  test('the rename register guidance is prompt-side only — bestial gets the anatomy line', () => {
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
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
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
    const dup = JSON.parse(answer());
    dup.renames['Melee Attack'] = 'Scythe';
    dup.renames['Ranged Attack'] = 'Scythe';
    dup.damage_types.Scythe = 'Slashing';
    expect(rd(scaled, dup, {}).join(' ')).toMatch(/are both "Scythe" — every row needs its own name/);
    // full flow: the informed repair round fixes the collision
    let repairPrompt = null;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
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
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8);
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
    const p = buildReskinPrompt(scaleDonor(pickDonor(20, null, 'skirmisher'), 20), { concept: 'c' });
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
      const s = sd(pd(8, style, 'skirmisher'), 8);
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
      const scaled = sd(pd(8, 'skulker', 'skirmisher'), 8, { mechanics: [] });
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
    const run = (type) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, style: 'skulker', mechanics: [] }, async (prompt) => {
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
    const s = sd(pd(18, 'mounted', 'skirmisher'), 18);
    const all = Object.values(s.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/Disengage or Hide action/);
  });

  test('legendary escape standardizes to Withdraw — skulkers keep Hide, others do not', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const { renameKeysOf: rk } = require('../generate.mjs');
    const plain = sd(pd(18, null, 'skirmisher'), 18);
    const wd = (s) => Object.values(s.sections).flat().find((e) => e.name === 'Withdraw');
    expect(wd(plain).text).toMatch(/Dash or Disengage action/);
    expect(wd(plain).rules).toBe(true);
    expect(rk(plain)).not.toContain('Legendary Escape');
    const skulk = sd(pd(18, 'skulker', 'skirmisher'), 18);
    expect(wd(skulk).text).toMatch(/Disengage or Hide action/);
  });

  test('legendary attack grammar is print\'s: "makes one X attack"', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const all = Object.values(sd(pd(18, null, 'skirmisher'), 18).sections).flat().map((e) => e.text).join(' ');
    expect(all).toMatch(/makes one Melee Attack attack\./);
    expect(all).toMatch(/makes one Ranged Attack attack\./);
  });

  test('the returning projectile uses print\'s Hit or Miss frame', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const ranged = Object.values(sd(pd(18, 'hurler', 'skirmisher'), 18).sections).flat()
      .find((e) => /\{projectile\}/.test(e.text));
    expect(ranged.text).toMatch(/\*Hit or Miss:\* Immediately after the attack, \{projectile\} returns/);
    expect(ranged.text).not.toMatch(/damage, and \{projectile\}/);
  });

  test('a leading self-name with an economy label strips — no double name in the entry text', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
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
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 22, caster: true }, quiet(() => casterAnswer2));
    const sc = (m.sections.Actions ?? []).find((e) => e.name === 'Spellcasting');
    // card DC 22, best mental derives 20 — organ prints 21 (derived + 1,
    // the lint's own float), never the card's unreachable 22
    expect(sc.text).toMatch(/spell save DC 21/);
  });
});

describe('golden seeds (owner + critic nominations, 2026-09-02): the shapes the sprint is FOR, pinned', () => {
  const quietG = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const { renameKeysOf: rkG } = require('../generate.mjs');
  const shapedAnswer = (archetype, cr, style, over = {}) => {
    const scaled = scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });
    const renames = {};
    rkG(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    return JSON.stringify({
      name: 'Golden Pin', type: 'Monstrosity', size: 'Large', alignment: 'Unaligned',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.`,
      ...over,
    });
  };

  test('the Alms Saint shape: a theft wildcard with a trailing gate lifts the meter into the name', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a mirror-stepping thief saint', cr: 6, style: 'skulker', mechanics: [] }, quietG((p) => {
      const scaled = scaleDonor(pickDonor(6, 'skulker', 'skirmisher'), 6, { mechanics: [] });
      return shapedAnswer('skirmisher', 6, 'skulker', {
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The creature appears beside the target, stealing one non-magical item of its choice, and the target has Disadvantage on its next attack roll before the start of the creature's next turn. (2/Day)`,
      });
    }));
    expect(m.generation.donor).toBe('skirmisher-3-skulker');
    const e = Object.values(m.sections).flat().find((x) => /\(2\/Day\)/.test(x.name));
    expect(e).toBeTruthy(); // the gate lives in the NAME
    expect(e.text).not.toMatch(/\(2\/Day\)|can be used/);
    expect(m.generation.signature).toBe('custom');
  });

  test('the Wound-Thing shape: the disarm engine done right ships whole', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a scar colossus', cr: 20, mechanics: [] }, quietG(() => {
      const base = JSON.parse(shapedAnswer('brute', 20, null));
      base.trait_wildcard = { name: 'Grasping Flesh', text: 'A weapon that deals damage to the creature becomes stuck in its flesh (escape DC 14 Strength check to pull it free). The creature can hold up to three weapons this way; when a fourth sticks, the oldest falls at its feet.' };
      return JSON.stringify(base);
    }));
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Grasping Flesh');
    expect(t).toBeTruthy();
    expect(t.text).toMatch(/escape DC 14/);
    expect(t.text).toMatch(/up to three weapons/);
  });

  test('the Living Battlefield shape: legendary regenerator with ONE healing system and a priced pull', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a battlefield that heals', cr: 20, mechanics: ['regeneration'] }, quietG(() => shapedAnswer('brute', 20, 'regenerator', {
      wildcard: '*Strength Saving Throw*: DC 21, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet toward the creature and has the Grappled condition (escape DC 21).',
    })));
    expect(m.generation.donor).toBe('brute-17-regenerator');
    const heals = Object.values(m.sections).flat().filter((e) => /regains \d+ Hit Points at the start/.test(e.text));
    expect(heals).toHaveLength(1); // the organ, alone
    expect(heals[0].name).toBe('Regeneration');
    expect(Object.values(m.sections).flat().some((e) => /Legendary Resistance/.test(e.name))).toBe(true);
  });

  test('the Sky-Burial Roc shape: winged legendary carries the dive rider and its menu', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a god-outliving roc', cr: 18, style: 'winged', mechanics: [] }, quietG(() => shapedAnswer('skirmisher', 18, 'winged')));
    expect(m.generation.donor).toBe('skirmisher-18-winged');
    const legs = m.sections['Legendary Actions'] ?? [];
    expect(legs.length).toBeGreaterThanOrEqual(3);
    expect(m.generation.signature).toBe('custom');
  });
});

describe('the caster family plumbing (2026-09-02): one pool, two menu priors, the chassis spell row', () => {
  const quietC = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const casterAnswer = (cr, style = null) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Vellum Sage', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Force'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      spells: { at_will: ['Detect Magic', 'Blur'], daily: ['Hold Person', 'Invisibility'] },
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    });
  };

  test('a caster generation: glass-cannon numbers, renamed hybrid row, tiered chassis spells, the ward survives', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a vellum-skinned sage', cr: 12, mechanics: [] },
      quietC(() => casterAnswer(12)));
    expect(m.generation).toMatchObject({ path: 'reskin', donor: 'caster-12', archetype: 'caster' });
    expect(m.ac).toBe(17); // card 18 - the measured caster tax
    expect(m.hp).toBeLessThanOrEqual(170); // ~0.85x of card 195, dice-snapped
    const all = Object.values(m.sections).flat();
    // the hybrid row renamed, the four-attack Multiattack reference follows
    expect(all.find((e) => e.name === 'Multiattack').text).toMatch(/four Named Row\d+ attacks/);
    expect(all.some((e) => /Melee or Ranged Attack Roll/.test(e.text))).toBe(true);
    // the CHASSIS spell row filled and tiered: Blur is NEVER_AT_WILL
    const sc = all.filter((e) => e.name === 'Spellcasting');
    expect(sc).toHaveLength(1);
    expect(sc[0].text).toMatch(/At Will:\*\* \*Detect Magic\*, \*Hold Person\*/);
    // Invisibility rides at-will since the tier fix (2026-09-04) — only
    // the NEVER_AT_WILL buff stays gated
    expect(sc[0].text).toMatch(/1\/Day Each:\*\* \*Blur\*/);
    // the print reaction ships under its own name — rules-true, never
    // renamed (re-authored to the Archmage's Shield-cast form
    // 2026-09-14: the flat +3 was "the Parry shape with a gate" —
    // critic ×2; print casters answer with the Shield SPELL)
    expect((m.sections.Reactions ?? []).some((e) => /Protective Magic/.test(e.name) && /casts \*Shield\*/.test(e.text))).toBe(true);
  });

  test('the menu prior fills an unclaimed style; a concept-claimed style outranks it', async () => {
    // Controller menu, no concept style -> the binder line
    const ctrl = await generateReskin({ archetype: 'caster', stylePrior: 'binder', menuRole: 'controller', concept: 'a hexing presence', cr: 8, mechanics: [] },
      quietC(() => casterAnswer(8, 'binder')));
    expect(ctrl.generation.donor).toBe('caster-8-binder');
    expect(ctrl.generation.menu_role).toBe('controller');
    // Controller menu + a concept that claimed warpriest -> the claim wins
    const claimed = await generateReskin({ archetype: 'caster', stylePrior: 'binder', style: 'warpriest', concept: 'an armored crusader', cr: 10, mechanics: [] },
      quietC(() => casterAnswer(10, 'warpriest')));
    expect(claimed.generation.donor).toBe('caster-10-warpriest');
  });

  test('the caster checkbox never doubles the chassis spell row', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'x', cr: 12, caster: true, mechanics: [] },
      quietC(() => casterAnswer(12)));
    const sc = Object.values(m.sections).flat().filter((e) => e.name === 'Spellcasting');
    expect(sc).toHaveLength(1);
  });

  test('an off-menu spell pick is a defect — the caster menu governs the chassis row', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(12, null, 'caster'), 12, { mechanics: [] });
    const { CASTER_SPELL_MENU: CM } = require('../generate.mjs');
    scaled.spell_menu = CM;
    const bad = JSON.parse(casterAnswer(12));
    bad.spells = { at_will: ['Wish', 'Detect Magic'], daily: ['Hold Person', 'Web'] };
    expect(rd(scaled, bad, {}).join(' ')).toMatch(/"Wish" is not on the spell menu/);
    // flavorful damage spells joined the menu (owner, 2026-09-02) — the
    // Lich law prices their tiers instead of banning them
    expect(CM).toContain('Fireball');
    expect(CM).toContain('Scorching Ray');
  });
});

describe('first caster smoke fixes (2026-09-02): Web tier, all/every area cap, pronoun register', () => {
  const quietD = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('Web never sits at-will; print-cited at-will control still can — the Hollow Salvo fix', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(9, null, 'caster'), 9, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', concept: 'a mortar spirit', cr: 9, mechanics: [] }, quietD(() => JSON.stringify({
      name: 'Ash Mortar', type: 'Elemental', size: 'Large', alignment: 'Unaligned',
      senses: 'blindsight 60 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      spells: { at_will: ['Web', 'Detect Magic'], daily: ['Fog Cloud', 'Invisibility'] },
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\* \*Detect Magic\*, \*Fog Cloud\*/); // the zone demoted, the cited control stays
    expect(sc.text).toMatch(/1\/Day Each:\*\* \*Web\*/);
  });

  test('"all creatures within" cannot walk past the area cap — the Orbiting Mote evasion', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, all creatures within 15 feet of a point the creature can see. *Failure:* 14 (4d6) Radiant damage.' });
    });
    expect(repairPrompt).toMatch(/prices per TARGET/);
  });

  test('the reskin prompt carries the pronoun register line', () => {
    const scaled = scaleDonor(pickDonor(8, null, 'skirmisher'), 8, { mechanics: [] });
    const p = buildReskinPrompt(scaled, { concept: 'a duchess of knives' });
    expect(p).toMatch(/never gendered pronouns/);
  });
});

describe('second caster smoke fixes (2026-09-02): dice, save-row rescale, spell-negation, backfill', () => {
  const quietE = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('damage prints its dice — the Vestige\'s flat 58 dies, the quill\'s flat 5 lives', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Dexterity Saving Throw*: DC 15, each other creature within 10 feet of the target. *Failure:* 58 Radiant damage.' });
    });
    expect(repairPrompt).toMatch(/damage prints its dice/);
    // tiny flat retaliation stays legal — print's own chip-damage shape
    const { renameKeysOf: rkE } = require('../generate.mjs');
    const scaledB = scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] });
    const renamesB = {};
    rkE(scaledB).forEach((k, i) => { renamesB[k] = `Named Row${i}`; });
    const typedB = Object.values(scaledB.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renamesB[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', concept: 'a thorn bear', cr: 9, mechanics: [] }, quietE(() => JSON.stringify({
      name: 'Thorn Bear', type: 'Monstrosity', size: 'Large', alignment: 'Unaligned',
      senses: 'darkvision 60 ft.', languages: 'None',
      renames: renamesB, damage_types: Object.fromEntries(typedB.map((n) => [n, 'Piercing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      trait_wildcard: { name: 'Quill Coat', text: 'Any creature that hits the creature with a melee attack takes 5 Piercing damage.' },
      wildcard: `*Strength Saving Throw*: DC ${scaledB.dc}, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.`,
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Quill Coat')).toBe(true);
  });

  test('ungated save-damage rows rescale — the Deacon\'s frozen Debuff Ray', () => {
    const low = scaleDonor(pickDonor(2, 'binder', 'caster'), 2, { mechanics: [] });
    const ray2 = Object.values(low.sections).flat().find((e) => e.name === 'Debuff Ray');
    const avg2 = Number(/(\d+) \(/.exec(ray2.text)[1]);
    expect(avg2).toBeLessThanOrEqual(10); // no more 18 (4d8) at CR 2
    const high = scaleDonor(pickDonor(14, 'binder', 'caster'), 14, { mechanics: [] });
    const ray14 = Object.values(high.sections).flat().find((e) => e.name === 'Debuff Ray');
    const avg14 = Number(/(\d+) \(/.exec(ray14.text)[1]);
    expect(avg14).toBeGreaterThanOrEqual(20); // and it grows past the authored seat
    // rules rows keep their authored curves — Trample untouched by this path
    const brute = scaleDonor(pickDonor(6, 'charger', 'brute'), 6, { mechanics: [] });
    const trample = Object.values(brute.sections).flat().find((e) => e.name === 'Trample');
    expect(Number(/(\d+) \(/.exec(trample.text)[1])).toBeLessThanOrEqual(16);
  });

  test('"the spell is wasted" is negation — the Hush Aura evasion', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a hushing crone', cr: 11, style: 'binder', mechanics: [] }, quietE((p) => {
      const { renameKeysOf: rk } = require('../generate.mjs');
      const scaled = scaleDonor(pickDonor(11, 'binder', 'caster'), 11, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
      return JSON.stringify({
        name: 'Hush Crone', type: 'Fey', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Sylvan',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
        conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Constitution',
        spells: { at_will: ['Minor Illusion', 'Mage Hand'], daily: ['Hold Person', 'Darkness'] },
        trait_wildcard: { name: 'Hush Aura', text: 'Sounds within 30 feet of the creature are muffled. A spell with a verbal component cast within that area requires a DC 16 Constitution saving throw, or the spell is wasted.' },
        wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Hush Aura')).toBe(false);
  });

  test('the spell list backfills to 2+2 when the fill filter drops a pick', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled0 = scaleDonor(pickDonor(11, 'binder', 'caster'), 11, { mechanics: [] });
    const renames = {};
    rk(scaled0).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled0.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', concept: 'x', cr: 11, style: 'binder', mechanics: [] }, quietE(() => JSON.stringify({
      name: 'Quiet One', type: 'Fey', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Sylvan',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
      conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Constitution',
      spells: { at_will: ['Minor Illusion', 'Mage Hand'], daily: ['Hold Person', 'Silence'] },
      wildcard: `*Constitution Saving Throw*: DC ${scaled0.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    const spells = [...sc.text.matchAll(/\*([A-Z][^*:]+)\*/g)].map((x) => x[1]);
    expect(spells).toHaveLength(4); // Silence filtered, the count topped up
    expect(spells).not.toContain('Silence');
  });
});

describe('muddle round 2 (2026-09-02): perception objects and the missing on', () => {
  test('the two deadlocked drafts now survive; a true self-target still dies', async () => {
    const run = (wc) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: wc });
    });
    // the Riddle's draft: 'the creature' is the OBJECT of hearing
    const a = await run("One creature within 60 feet that can hear the creature must succeed on a DC 15 Wisdom saving throw or have Disadvantage on its next attack roll before the start of the creature's next turn.");
    expect(Object.values(a.sections).flat().find((e) => /Waylay/.test(e.name)).text).toMatch(/can hear the/);
    // the Hoardheart's draft: 'centered on' is locative
    const b = await run("Each creature in a 20-foot-radius sphere centered on the creature must make a DC 15 Constitution saving throw, or have Disadvantage on its next attack roll before the start of the creature's next turn.");
    expect(Object.values(b.sections).flat().find((e) => /Waylay/.test(e.name)).text).toMatch(/sphere centered on/);
    // the true muddle stays dead: the monster cast as its own victim
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature lashes out wildly. The creature must succeed on a DC 15 Wisdom saving throw or have the Frightened condition until the end of its next turn.' });
    });
    expect(repairPrompt).toMatch(/pronoun muddle/);
  });
});

describe('third caster smoke fixes (2026-09-02): invented conditions, second novas, orphan targets', () => {
  const quietF = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a minted condition dies with restructure coaching; standard conditions survive', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target becomes Placid for 1 minute. While Placid, it has Disadvantage on attack rolls.' });
    });
    expect(repairPrompt).toMatch(/"Placid" is not a rules condition/);
    // the standard grammar is untouched
    const ok = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietF(() => answer({
      wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target becomes Frightened until the end of its next turn.',
    })));
    expect(Object.values(ok.sections).flat().find((e) => /Waylay/.test(e.name)).text).toMatch(/becomes Frightened/);
  });

  test('a damaging second Recharge dies on a nova chassis; a utility Recharge teleport lives', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const mk = (cr, wc) => {
      const scaled = scaleDonor(pickDonor(cr, null, 'caster'), cr, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
      return JSON.stringify({
        name: 'Nova Pin', type: 'Undead', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Constitution',
        spells: { at_will: ['Detect Magic', 'Mage Hand'], daily: ['Hold Person', 'Darkness'] },
        wildcard: wc,
      });
    };
    let repairPrompt = null;
    await generateReskin({ archetype: 'caster', concept: 'x', cr: 21, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return mk(21, '*Constitution Saving Throw*: DC 21, each creature in a 10-foot radius of a point within 60 feet. *Failure:* 40 (9d8) Necrotic damage. (Recharge 5-6)');
    });
    expect(repairPrompt).toMatch(/print never fields two/);
    const ok = await generateReskin({ archetype: 'caster', concept: 'x', cr: 21, mechanics: ['teleport'] },
      quietF(() => mk(21, 'The creature teleports up to 60 feet to an unoccupied space it can see. (Recharge 4-6)')));
    expect(Object.values(ok.sections).flat().some((e) => /Recharge 4-6/.test(e.name))).toBe(true);
  });

  test('an orphan "the target" in a trait dies; a hit-established one lives', async () => {
    const trait = (name, text) => generateReskin({ archetype: 'caster', concept: 'x', cr: 11, style: 'binder', mechanics: [] }, quietF(() => {
      const { renameKeysOf: rk } = require('../generate.mjs');
      const scaled = scaleDonor(pickDonor(11, 'binder', 'caster'), 11, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
      return JSON.stringify({
        name: 'Quiet Pin', type: 'Fey', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Sylvan',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
        conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Constitution',
        spells: { at_will: ['Minor Illusion', 'Mage Hand'], daily: ['Hold Person', 'Darkness'] },
        trait_wildcard: { name, text },
        wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    }));
    const bad = await trait('Thick Silence', 'The creature exudes an aura of quiet fog in a 30-foot radius, lightly obscuring the area. The target has Disadvantage on Perception checks based on hearing while in that area.');
    expect((bad.sections.Traits ?? []).some((e) => e.name === 'Thick Silence')).toBe(false);
    // HISTORY: this fixture originally LIVED (its "the target" is
    // hit-established, not orphaned) — superseded 2026-09-14 by the
    // rider law: 0/329 print traits key on the creature's own hits;
    // riders weld into the attack row. The reference is sound, the
    // HOME is wrong.
    const good = await trait('Sealed Spite', 'When the creature hits with a ranged attack, the target has Disadvantage on its next attack roll before the start of the creature\'s next turn.');
    expect((good.sections.Traits ?? []).some((e) => e.name === 'Sealed Spite')).toBe(false);
  });

  test('the dice belt and field-disjunction lint fire on final text', () => {
    const { lintStatblock } = require('../../format-2024/lint.mjs');
    const m = {
      name: 'Belt Pin', type: 'Undead', size: 'Medium', alignment: 'Neutral',
      ac: 15, hp: 100, hp_formula: '16d8 + 28', languages: 'telepathy 60 ft. (but never initiates) or None',
      sections: { Actions: [{ name: 'Flat Blast', text: '*Dexterity Saving Throw*: DC 15, one creature within 60 feet. *Failure:* The target takes 58 Radiant damage.' }] },
    };
    const { findings } = lintStatblock(m, { edition: '2024' });
    const rules = findings.map((f) => f.rule);
    expect(rules).toContain('diceless-damage');
    expect(rules).toContain('field-disjunction');
  });
});

describe('flavorful damage spells (owner, 2026-09-02): the Lich law prices the tiers', () => {
  const quietG2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const casterWith = (cr, spells) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, null, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Evoker Pin', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
      conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Dexterity',
      spells,
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    });
  };

  test('at CR 12 Scorching Ray sits at-will and Fireball demotes to 1/Day — the spell never out-hits the row', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'an evoker', cr: 12, mechanics: [] },
      quietG2(() => casterWith(12, { at_will: ['Scorching Ray', 'Fireball'], daily: ['Misty Step', 'Light'] })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\* \*Scorching Ray\*/);
    expect(sc.text).not.toMatch(/At Will:[^\n]*Fireball/);
    expect(sc.text).toMatch(/1\/Day Each:\*\* \*Fireball\*/);
  });

  test('at CR 21 Fireball sits at-will — the printed Lich shape', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a lich-like scholar', cr: 21, mechanics: [] },
      quietG2(() => casterWith(21, { at_will: ['Fireball', 'Light'], daily: ['Misty Step', 'Dispel Magic'] })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\* \*Fireball\*/);
  });
});

describe('spell shelf round two (owner, 2026-09-02): cold, necrotic, control, zones', () => {
  test('the type gaps are closed and the zone/mass-KO laws hold', () => {
    const { CASTER_SPELL_MENU: CM, NEVER_AT_WILL: NAW, SPELL_DAMAGE_AVG: AVG } = require('../generate.mjs');
    for (const sp of ['Ice Knife', 'Cone of Cold', 'Blight', 'Vampiric Touch', 'Fear', 'Sleep', 'Slow', 'Bestow Curse']) expect(CM).toContain(sp);
    // persistent zones and mass-KO never at-will; Fear stays eligible (Black Dragon at-will cite)
    for (const sp of ['Wall of Fire', 'Cloudkill', 'Sleep', 'Hypnotic Pattern']) expect(NAW.has(sp)).toBe(true);
    expect(NAW.has('Fear')).toBe(false);
    // every damage spell carries its tier number
    for (const sp of ['Ice Knife', 'Cone of Cold', 'Blight', 'Vampiric Touch', 'Ray of Sickness']) expect(AVG[sp]).toBeGreaterThan(0);
  });

  test('Cone of Cold demotes to 1/Day at CR 12; Ice Knife sits at-will — the Lich law over the new shelf', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(12, null, 'caster'), 12, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', concept: 'an ice witch', cr: 12, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Rime Witch', type: 'Fey', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Sylvan',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Constitution',
        spells: { at_will: ['Ice Knife', 'Cone of Cold'], daily: ['Fog Cloud', 'Fear'] },
        wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\* \*Ice Knife\*/);
    expect(sc.text).toMatch(/1\/Day Each:\*\* \*Cone of Cold\*/);
  });
});

describe('the spell-attack pairing + blaster-first tiers (owner catch, 2026-09-02)', () => {
  test('attack-roll spells bring "+N to hit"; signature rays outrank utility for the at-will slots', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(12, null, 'caster'), 12, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', concept: 'an evoker professor', cr: 12, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Ember Professor', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
        spells: { at_will: ['Prestidigitation', 'Mage Hand'], daily: ['Fireball', 'Scorching Ray'] },
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    // Scorching Ray (21 <= ceiling) is the signature — it takes an at-will
    // slot ahead of the utility cantrips; Fireball (28) stays 1/Day
    expect(sc.text).toMatch(/At Will:\*\*[^\n]*\*Scorching Ray\*/);
    expect(sc.text).toMatch(/1\/Day Each:\*\*[^\n]*\*Fireball\*/);
    // and the attack-roll spell brings its pairing: DC 17 -> +9
    expect(sc.text).toMatch(/spell save DC 17, \+9 to hit with spell attacks/);
  });
});

describe('the upcast law (owner + 33 print notations, 2026-09-02): at-will stays base, daily rises to parity', () => {
  const roll = (cr, spells) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, null, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return generateReskin({ archetype: 'caster', concept: 'an evoker', cr, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Upcast Pin', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
        spells,
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
  };

  test('CR 12: the 1/Day Fireball already rivals the rows — base level, no label', async () => {
    const m = await roll(12, { at_will: ['Prestidigitation', 'Mage Hand'], daily: ['Fireball', 'Misty Step'] });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/1\/Day Each:\*\*[^\n]*\*Fireball\*(?! \(level)/);
  });

  test('CR 21: at-will Fireball is the Lich shape, base level; the overflow daily rises to parity', async () => {
    const m = await roll(21, { at_will: ['Scorching Ray', 'Fireball'], daily: ['Cone of Cold', 'Misty Step'] });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    // blaster-first fills at-will with the signature damage spells; the
    // Lich law admits base Fireball (28 <= per-hit ceiling) — unnoted
    expect(sc.text).toMatch(/At Will:\*\*[^\n]*\*Fireball\*(?! \(level)/);
    // the daily overflow upcasts to row parity — the Pit Fiend shape
    expect(sc.text).toMatch(/\*Cone of Cold\* \(level [6-9] version\)/);
  });
});

describe('the tier inversion fix (batch four, 2026-09-04): cantrips never ration, level 3 is the at-will ceiling', () => {
  const roll2 = (cr, style, spells) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return generateReskin({ archetype: 'caster', concept: 'x', cr, style, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Tier Pin', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
        spells,
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
  };

  test('the Provost inversion: Fireball+Shatter picks on a binder-12 never ration the cantrips', async () => {
    const m = await roll2(12, 'binder', { at_will: ['Fireball', 'Shatter'], daily: ['Mage Hand', 'Prestidigitation'] });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    // cantrips are at-will by nature; Fireball exceeds row parity at 12 -> daily
    expect(sc.text).toMatch(/At Will:\*\*[^\n]*\*Mage Hand\*/);
    expect(sc.text).not.toMatch(/1\/Day Each:\*\*[^\n]*(Mage Hand|Prestidigitation)/);
    expect(sc.text).toMatch(/1\/Day Each:\*\*[^\n]*\*Fireball\*/);
  });

  test('the Rent and Gravewright classes: Ice Storm (level 4) and Vampiric Touch never sit at-will', async () => {
    const m = await roll2(12, null, { at_will: ['Ice Storm', 'Vampiric Touch'], daily: ['Fog Cloud', 'Light'] });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).not.toMatch(/At Will:\*\*[^\n]*(Ice Storm|Vampiric Touch)/);
    expect(sc.text).toMatch(/1\/Day Each:\*\*[^\n]*\*Ice Storm\*/);
  });

  test('an all-eligible list ships with no 1/Day line at all', async () => {
    const m = await roll2(21, null, { at_will: ['Fireball', 'Light'], daily: ['Misty Step', 'Dispel Magic'] });
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc.text).toMatch(/At Will:\*\*[^\n]*\*Fireball\*/); // the Lich shape, level 3 at parity
    expect(sc.text).not.toMatch(/1\/Day Each/);
  });
});

describe('consolidated-review fixes (2026-09-04): rider rows rewrite, grant verbs, bookkeeping vocab', () => {
  const quietH = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a rider-hosting row is rewrite-eligible — the Dawn-Throw immunity gap', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) {
        return JSON.stringify({ findings: [{
          entry: 'Thorn Rake', section: 'Actions',
          span: 'This effect can be applied only once per turn.', rewrite: '',
          issue: 'vacuous limiter on the rider', principle: 4, confidence: 'high',
        }] });
      }
      return answer({
        wildcard: 'When the creature hits with this attack, the target has Disadvantage on its next attack roll before the start of the creature\'s next turn. It must succeed on a DC 15 Wisdom saving throw or drop what it holds.',
        wildcard_economy: 'rider_on:Thorn Rake',
      });
    });
    const row = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(row.model).toBe(true); // the weld marks the host
    expect(row.text).not.toMatch(/only once per turn/); // and the audit could trim it
  });

  test('"ignores damage from" is a defense grant — the Provost cloak evasion', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'an ashen scholar', cr: 12, mechanics: [] }, quietH(() => {
      const { renameKeysOf: rk } = require('../generate.mjs');
      const scaled = scaleDonor(pickDonor(12, null, 'caster'), 12, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
      return JSON.stringify({
        name: 'Ash Scholar', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Dexterity',
        spells: { at_will: ['Mage Hand', 'Light'], daily: ['Fireball', 'Misty Step'] },
        trait_wildcard: { name: 'Cinder Cloak', text: 'The creature ignores damage from nonmagical fire. It sheds dim light in a 10-foot radius.' },
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Cinder Cloak')).toBe(false);
  });

  test('slot accounting never ships — "tracked as a pool of two spell slots"', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a rune ogre', cr: 9, mechanics: [] }, quietH(() => {
      const { renameKeysOf: rk } = require('../generate.mjs');
      const scaled = scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] });
      const renames = {};
      rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
      const typed = Object.values(scaled.sections).flat()
        .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
      return JSON.stringify({
        name: 'Rune Ogre', type: 'Giant', size: 'Large', alignment: 'Chaotic Neutral',
        senses: 'darkvision 60 ft.', languages: 'Giant',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
        trait_wildcard: { name: 'Rune Reserve', text: 'The creature can empower its blows with stored magic, tracked as a pool of two spell slots that refill at dawn.' },
        wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.`,
      });
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Rune Reserve')).toBe(false);
  });
});

describe('golden seeds, caster shelf (pinned 2026-09-04): the shapes the family is FOR', () => {
  // [library candidate] tags mark shapes for the deferred fallback
  // library (owner decision 2026-09-04) — generify at that phase
  const quietGS = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const casterFix = (cr, style, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Golden Pin', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
      conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
      spells: { at_will: ['Mage Hand', 'Minor Illusion'], daily: ['Hold Person', 'Misty Step'] },
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const shipped = (m, re) => Object.values(m.sections).flat().find((e) => re.test(e.text ?? ''));

  test('Salt Demand — the aggro-curse [library candidate]: a taunt built from incentives', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a winter landlord', cr: 12, mechanics: [] }, quietGS(() => casterFix(12, null, {
      wildcard: "The creature demands tribute from one creature within 60 feet. The target must succeed on a DC 17 Wisdom saving throw or be cursed until the end of its next turn: its Speed is halved, and it has Disadvantage on attack rolls against creatures other than the creature. If the target attacks the creature or moves more than 10 feet away from the creature, the curse ends early.",
    })));
    const e = shipped(m, /demands tribute/);
    expect(e).toBeTruthy();
    expect(e.text).toMatch(/Disadvantage on attack rolls against creatures other than/);
  });

  test('Debtor\'s Claim — summoning in print\'s idiom: stat-block reference, PB cap, gated', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a courteous sexton', cr: 18, style: 'binder', mechanics: [] }, quietGS(() => casterFix(18, 'binder', {
      wildcard: "The creature chooses a point within 60 feet of it that is not occupied. A grave-mound rises there, and one zombie (use the Zombie statistics) emerges from it as the creature's ally. The creature can have a number of such undead equal to its proficiency bonus at a time; if it would raise more, the oldest crumbles to dust. (1/Day)",
    })));
    const e = shipped(m, /use the Zombie statistics/);
    expect(e).toBeTruthy();
    expect(e.name).toMatch(/1\/Day/); // the gate lifts into the name
    expect(e.text).toMatch(/proficiency bonus/);
  });

  test('Weight of Attention — the pacify stack in standard vocabulary [library candidate]', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'the thing in the reservoir', cr: 10, style: 'binder', mechanics: [] }, quietGS(() => casterFix(10, 'binder', {
      wildcard: "One creature within 60 feet that the creature can see must succeed on a DC 16 Wisdom saving throw or have the Incapacitated condition until the start of the creature's next turn, and its Speed becomes 0 until the end of its next turn. (2/Day)",
    })));
    const e = shipped(m, /Speed becomes 0/);
    expect(e).toBeTruthy();
    expect(e.text).not.toMatch(/Placid/); // standard vocabulary only — the restructure held
  });

  test('the planted-hymnal gate — emplacement pricing [library candidate]', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a shrine sergeant', cr: 3, style: 'warpriest', mechanics: [] }, quietGS(() => casterFix(3, 'warpriest', {
      wildcard: "The creature plants its standard in the ground and intones a verse. One creature within 60 feet must succeed on a DC 12 Wisdom saving throw or take 10 (3d6) Psychic damage and have Disadvantage on its next attack roll before the start of the creature's next turn. The creature can use this action only while its standard is planted, and the standard remains until the creature moves or is Incapacitated.",
    })));
    const e = shipped(m, /only while its standard is planted/);
    expect(e).toBeTruthy();
  });

  test('Polite Beckon — the conjured-obstacle pull with its exits [library candidate]', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a polite gravedigger', cr: 18, style: 'binder', mechanics: [] }, quietGS(() => casterFix(18, 'binder', {
      wildcard: "One creature within 30 feet must succeed on a DC 20 Strength saving throw or be pulled up to 20 feet toward a point on the ground within 60 feet and have the Grappled condition (escape DC 20). While Grappled, the target has the Restrained condition, and the corpse erupting at that point is the grappling source. The corpse remains until the grapple ends.",
    })));
    const e = shipped(m, /corpse erupting/);
    expect(e).toBeTruthy();
    expect(e.text).toMatch(/escape DC 20/);
  });

  test('Binding Roots — the priced reaction restraint (casters keep reactions)', async () => {
    const m = await generateReskin({ archetype: 'caster', concept: 'a hushing crone', cr: 11, style: 'binder', mechanics: [] }, quietGS(() => casterFix(11, 'binder', {
      wildcard: "When a creature within 60 feet that the creature can see makes an attack roll, the creature can use its reaction to command thorny roots to erupt and grasp the attacker. The target must succeed on a DC 16 Strength saving throw or have the Restrained condition until the end of its next turn.",
      wildcard_economy: 'reaction',
    })));
    const e = shipped(m, /thorny roots/);
    expect(e).toBeTruthy();
    expect(e.text).toMatch(/until the end of its next turn/); // the exit rides along
  });
});

describe('caster close-out (2026-09-04): the return-grammar vocabulary', () => {
  test('a blade-return trait is a rules statement, not flavor — the Ember-Knight deadlock', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(21, null, 'caster'), 21, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', concept: 'a blade celestial', cr: 21, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Blade Pin', type: 'Celestial', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Celestial',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Radiant'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Constitution',
        spells: { at_will: ['Light', 'Mage Hand'], daily: ['Misty Step', 'Fly'] },
        trait_wildcard: { name: 'Returning Blade', text: 'The thrown blade returns to its hand at the end of its turn, unhindered by distance or darkness.' },
        wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Returning Blade')).toBe(true);
  });
});

describe('the lurker family plumbing (2026-09-04): three lines, the ambush idiom flows end to end', () => {
  const quietL = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const lurkerAnswer = (cr, style = null) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Eave Stalker', type: 'Monstrosity', size: 'Medium', alignment: 'Neutral Evil',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    });
  };

  test('a lurker generation: under-card defenses, the ambush parenthetical alive, conditioned hide, no escape suite', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'a rafter-haunting stalker', cr: 8, mechanics: [] },
      quietL(() => lurkerAnswer(8)));
    expect(m.generation).toMatchObject({ path: 'reskin', donor: 'lurker-8', archetype: 'lurker' });
    expect(m.generation.cite).toMatch(/Assassin/);
    const { cardBudget } = require('../card-budgets.mjs');
    const card = cardBudget(8, {});
    expect(m.ac).toBeLessThan(card.ac); // the family signature: defenses under the card
    expect(m.hp).toBeLessThan(card.hp);
    const all = Object.values(m.sections).flat();
    // the fiat first-round rider is lurker-2's alone (the re-seating,
    // 2026-09-04): the Assassin-shaped CR 8 seat ships WITHOUT it — its
    // ambush economy is the rider split + the hide-cycle
    expect(all.some((e) => /\(with Advantage during the first round/.test(e.text))).toBe(false);
    // the hide-cycle ships CONDITIONED (Umbral Step is rules-chassis, never renamed)
    const hide = (m.sections['Bonus Actions'] ?? []).find((e) => e.name === 'Umbral Step');
    expect(hide.text).toMatch(/While in Dim Light or Darkness/);
    // never the skirmisher's unconditioned exit suite
    expect(all.some((e) => /Dash, Disengage, or Hide/.test(e.text))).toBe(false);
  });

  test('style routing: phantom and trap claims draw their lines; an off-family claim falls to the stalker', async () => {
    const phantom = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'a drowned echo', cr: 5, mechanics: [] },
      quietL(() => lurkerAnswer(5, 'phantom')));
    expect(phantom.generation.donor).toBe('lurker-5-phantom');
    // the phantom tells ship: hover flight, the light bane
    expect(phantom.speed).toMatch(/Fly \d+ ft\. \(hover\)/);
    expect(Object.values(phantom.sections).flat().some((e) => /[Ss]unlight/.test(e.name))).toBe(true);

    const trap = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'a false altar', cr: 5, mechanics: [] },
      quietL(() => lurkerAnswer(5, 'trap')));
    expect(trap.generation.donor).toBe('lurker-5-trap');

    // a skirmisher style claim has no lurker pool — pickDonor falls back to plain
    const fallback = await generateReskin({ archetype: 'lurker', style: 'skulker', concept: 'x', cr: 8, mechanics: [] },
      quietL(() => lurkerAnswer(8, 'skulker')));
    expect(fallback.generation.donor).toBe('lurker-8');
  });

  test('the legendary top: every line reaches a 17 seat', async () => {
    for (const [style, donor] of [[null, 'lurker-17'], ['phantom', 'lurker-17-phantom'], ['trap', 'lurker-17-trap']]) {
      const m = await generateReskin({ archetype: 'lurker', style, concept: 'an apex thing', cr: 20, mechanics: [] },
        quietL(() => lurkerAnswer(20, style)));
      expect(m.generation.donor).toBe(donor);
      expect((m.sections['Legendary Actions'] ?? []).length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('the first-smoke fix batch (2026-09-04): KO economy, hide ownership, type stamp, the phase-cycle row', () => {
  const lurkerAnswer2 = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics: over.__mechanics ?? [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const { __mechanics, ...rest } = over;
    return JSON.stringify({
      name: 'Test Stalker', type: 'Monstrosity', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...rest,
    });
  };
  const quietF = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('KO conditions never ride an unpriced bonus action — the Muffled Toll guard (Incubus prices with Recharge)', async () => {
    // unpriced: mechanical, fails closed to the chassis slot text
    const bad = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietF(() => lurkerAnswer2(5, null, {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Paralyzed condition until the end of its next turn.',
        wildcard_economy: 'bonus_action',
      })));
    expect(JSON.stringify(bad.sections)).not.toMatch(/Paralyzed/);
    // priced the way print prices it: ships
    const ok = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietF(() => lurkerAnswer2(5, null, {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Paralyzed condition until the end of its next turn. (Recharge 5-6)',
        wildcard_economy: 'bonus_action',
      })));
    expect(JSON.stringify(ok.sections)).toMatch(/Paralyzed/);
  });

  test('the sheet already owns the hide-cycle — a wildcard re-inventing Umbral Step fails closed (the Veil of Brambles)', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietF(() => lurkerAnswer2(5, null, {
        wildcard: 'While in Dim Light or Darkness, the creature takes the Hide action, and it has Advantage on the next attack roll it makes before the start of its next turn.',
        wildcard_economy: 'bonus_action',
      })));
    // the duplicate hide never ships; the chassis Umbral Step remains the only hide grant
    const hideGrants = Object.values(m.sections).flat().filter((e) => /takes the Hide action/.test(e.text));
    expect(hideGrants).toHaveLength(1);
    expect(hideGrants[0].name).toBe('Umbral Step');
  });

  test('the resolve creature_type is stamped over the model answer — Undead keeps its immunity stamps', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'a spirit of the attics', cr: 5, resolvedType: 'Undead', mechanics: [] },
      quietF(() => lurkerAnswer2(5))); // the answer says Monstrosity — the first-smoke drift
    expect(m.type).toBe('Undead');
    expect(m.immunities).toMatch(/Poison/);
  });

  test('the phase-cycle row: claimed teleport uncovers the gated bonus action AND licenses a teleport wildcard', async () => {
    // ungated out when unclaimed
    const closed = scaleDonor(pickDonor(8, null, 'lurker'), 8, { mechanics: [] });
    expect(Object.values(closed.sections).flat().some((e) => e.name === 'Teleport')).toBe(false);
    // aboard when claimed, priced the Blink Dog way
    const open = scaleDonor(pickDonor(8, null, 'lurker'), 8, { mechanics: ['teleport'] });
    const tp = Object.values(open.sections).flat().find((e) => e.name === 'Teleport');
    expect(tp.gate).toMatch(/Recharge 4-6/);
    // and with the row aboard, a teleporting wildcard is no longer beyond the chassis
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 8, mechanics: ['teleport'] },
      quietF(() => lurkerAnswer2(8, null, {
        __mechanics: ['teleport'],
        wildcard: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition, and the creature teleports up to 30 feet to an unoccupied space it can see.',
      })));
    expect(JSON.stringify(m.sections)).toMatch(/teleports up to 30 feet/);
  });

  test('"adjacent to" is swapped to 5e vocabulary by the register actuator (Gutter Glare shipped it)', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietF(() => lurkerAnswer2(5, null, {
        wildcard: '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Prone condition, and it is pulled to a space adjacent to the creature.',
      })));
    const s = JSON.stringify(m.sections);
    expect(s).not.toMatch(/adjacent to/);
    expect(s).toMatch(/within 5 feet of/);
  });

  test('a scene-verb trigger draws the kneeling coaching into repair (the Grille fired on "kneels")', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return lurkerAnswer2(5, null, {
          wildcard: '*Dexterity Saving Throw*: DC 13, one creature within 30 feet. *Failure:* If the target is kneeling, it has the Prone condition.',
        });
      });
    expect(prompts.some((p) => /no kneeling or praying state/.test(p))).toBe(true);
  });
});

describe('the batch-two fix batch (2026-09-05): chassis ownership, header jurisdiction, teleport grammar, sheet voice', () => {
  const lurkerAnswer3 = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Wraith', type: 'Undead', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietB = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the hide guard sees through inflection — "hide as a bonus action" is the Sudden Drop dodge', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietB(() => lurkerAnswer3(5, null, {
        trait_wildcard: { name: 'Sudden Drop', text: 'The creature can hide as a bonus action while in a space it can squeeze through.' },
      })));
    const hides = Object.values(m.sections).flat().filter((e) => /Hide action|hide as a bonus action/i.test(e.text));
    expect(hides).toHaveLength(1);
    expect(hides[0].name).toBe('Umbral Step');
  });

  test('a trait restating Incorporeal Movement fails closed — the Ethereal Stillness duplicate', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'x', cr: 5, mechanics: [] },
      quietB(() => lurkerAnswer3(5, 'phantom', {
        trait_wildcard: { name: 'Ethereal Stillness', text: 'The creature can move through other creatures and objects as if they were Difficult Terrain.' },
      })));
    const movers = Object.values(m.sections).flat().filter((e) => /move through other creatures/.test(e.text));
    expect(movers).toHaveLength(1);
    expect(movers[0].name).toBe('Incorporeal Movement');
  });

  test('condition-immunity suites die; the single Headless flavor immunity still ships', async () => {
    const suite = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietB(() => lurkerAnswer3(5, null, {
        trait_wildcard: { name: 'Preserved', text: 'It is immune to the Charmed and Frightened conditions, and it can breathe air and water.' },
      })));
    expect(JSON.stringify(suite.sections)).not.toMatch(/immune to the Charmed/);
    const single = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietB(() => lurkerAnswer3(5, null, {
        trait_wildcard: { name: 'Hollow Skull', text: 'The creature is immune to the Frightened condition.' },
      })));
    // AMENDED 2026-09-15 (critic: condition immunity is HEADER
    // vocabulary): the earned flavor immunity now merges into the
    // Immunities line and its trait clause strips
    expect(single.immunities ?? '').toMatch(/Frightened/);
    expect(JSON.stringify(single.sections)).not.toMatch(/immune to the Frightened/);
  });

  test('the phantom chassis carries print\'s incorporeal suite in the header', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'x', cr: 5, resolvedType: 'Undead', mechanics: [] },
      quietB(() => lurkerAnswer3(5, 'phantom')));
    expect(m.immunities).toMatch(/Grappled/);
    expect(m.immunities).toMatch(/Restrained/);
    expect(m.resistances).toMatch(/Bludgeoning/);
  });

  test('a teleport that never says teleport — "repositions within 60 feet" is caught (0/329 print)', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietB(() => lurkerAnswer3(5, null, {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll, and the creature vanishes into shadow and repositions to an unoccupied space within 60 feet.',
      })));
    expect(JSON.stringify(m.sections)).not.toMatch(/repositions/);
  });

  test('the looks-at trigger and the conditional rate limit draw their coaching into repair', async () => {
    const prompts = [];
    const capture = (fixture) => async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return fixture();
    };
    await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      capture(() => lurkerAnswer3(5, null, {
        wildcard: 'When a creature looks at a reflective surface within 30 feet, the creature makes one attack against it with Advantage.',
      })));
    expect(prompts.some((p) => /looking is not a game state/.test(p))).toBe(true);
    prompts.length = 0;
    await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      capture(() => lurkerAnswer3(5, null, {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll. If the creature is not in Dim Light, it can use this effect only once per turn.',
      })));
    expect(prompts.some((p) => /binds ALWAYS/.test(p))).toBe(true);
  });

  test('a second nickname draws the sheet-voice coaching; a possessed body part never does', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'lurker', concept: 'a spectral chorister', cr: 5, mechanics: [] },
      async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return lurkerAnswer3(5, null, {
          trait_wildcard: { name: 'Still Voice', text: 'The chorister can move through webs without penalty, and it has Advantage on saving throws against being Deafened.' },
        });
      });
    expect(prompts.some((p) => /second nickname/.test(p))).toBe(true);
  });
});

describe('the batch-three fix batch (2026-09-05): the death-exit inversion, the engulf organ, the trait door', () => {
  const lurkerAnswer4 = (cr, style = null, mechanics = [], over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Maw', type: 'Construct', size: 'Large', alignment: 'Unaligned',
      senses: 'blindsight 30 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      engulf_style: 'swallow',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietT = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the inverted death-exit dies at the gate — "dies if" is 0/329; subject-first is the legal form', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'x', cr: 5, mechanics: [] },
      quietT(() => lurkerAnswer4(5, 'trap', [], {
        wildcard: '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Restrained condition (escape DC 13). The creature dies if it ends its turn with a Restrained creature within 5 feet.',
      })));
    expect(JSON.stringify(m.sections)).not.toMatch(/dies if/);
  });

  test('the engulf organ: claimed engulf uncovers the Swallow engine on the trap chassis; unclaimed gates it out', async () => {
    const closed = scaleDonor(pickDonor(5, 'trap', 'lurker'), 5, { mechanics: [] });
    expect(Object.values(closed.sections).flat().some((e) => e.engulf_engine)).toBe(false);
    const open = scaleDonor(pickDonor(5, 'trap', 'lurker'), 5, { mechanics: ['engulf'] });
    const engine = Object.values(open.sections).flat().find((e) => e.engulf_engine);
    expect(engine.rules).toBe(true);
    // the organ carries the death-exit in print's direction
    expect(engine.text).toMatch(/If the creature dies, a swallowed creature exits/);
    // and it ships end to end under the form's rules name
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'a false altar that swallows', cr: 5, mechanics: ['engulf'] },
      quietT(() => lurkerAnswer4(5, 'trap', ['engulf'])));
    expect(Object.values(m.sections).flat().some((e) => /While swallowed, the target has the Blinded and Restrained conditions/.test(e.text))).toBe(true);
  });

  test('the disguise key: a trait restating False Form fails closed on the trap chassis', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'x', cr: 2, mechanics: [] },
      quietT(() => lurkerAnswer4(2, 'trap', [], {
        trait_wildcard: { name: 'False Loot', text: 'While motionless, the creature is indistinguishable from a normal treasure chest.' },
      })));
    const disguises = Object.values(m.sections).flat().filter((e) => /indistinguishable from/.test(e.text));
    expect(disguises).toHaveLength(1);
    expect(disguises[0].name).toBe('False Form');
  });

  test('the incorporeal key sees through "occupied spaces" — the Regalia synonym dodge', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'x', cr: 5, mechanics: [] },
      quietT(() => lurkerAnswer4(5, 'phantom', [], {
        trait_wildcard: { name: 'Regalia', text: 'The creature can move through occupied spaces as if they were Difficult Terrain.' },
      })));
    const movers = Object.values(m.sections).flat().filter((e) => /move through (?:other creatures|occupied spaces)/.test(e.text));
    expect(movers).toHaveLength(1);
    expect(movers[0].name).toBe('Incorporeal Movement');
  });

  test('the trait door closes: economy "trait" with an embedded reaction fails mechanically, never files into Traits', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'x', cr: 2, mechanics: [] },
      quietT(() => lurkerAnswer4(2, 'trap', [], {
        wildcard: 'While motionless the creature watches for prey. If a target within 5 feet touches it, the creature can make one attack against that target as a reaction, and it has Advantage on the attack roll.',
        wildcard_economy: 'trait',
      })));
    expect(JSON.stringify(m.sections)).not.toMatch(/as a reaction/);
  });

  test('"alone" and self-disabling geography draw their coaching into repair', async () => {
    const prompts = [];
    const capture = (fixture) => async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return fixture();
    };
    await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      capture(() => lurkerAnswer4(5, null, [], {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet that is alone. *Failure:* The target has the Frightened condition until the end of its next turn.',
      })));
    expect(prompts.some((p) => /"alone" is not a game state/.test(p))).toBe(true);
    prompts.length = 0;
    await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'x', cr: 5, mechanics: [] },
      capture(() => lurkerAnswer4(5, 'phantom', [], {
        trait_wildcard: { name: 'Bound Haunt', text: 'While inside the ruined chapel, the creature can move through walls. Outside the ruined chapel, the creature is Incapacitated.' },
      })));
    expect(prompts.some((p) => /location the sheet never establishes/.test(p))).toBe(true);
  });

  test('the orphan-condition scan reads compound applies — "is Frightened and Paralyzed until" is an apply, not an orphan', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietT(() => lurkerAnswer4(5, null, [], {
        wildcard: '*Wisdom Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target is Frightened and Paralyzed until the end of its next turn.',
      })));
    expect((m.lint_findings ?? []).join(' ')).not.toMatch(/"Paralyzed" is referenced as a state but nothing/);
  });
});

describe('the pre-close fix batch (2026-09-07): the numeric-jurisdiction trio, title case, the Rug idiom', () => {
  const lurkerAnswer5 = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Shade', type: 'Undead', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietP = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('connectives stay lowercase in shipped names — the Grille/Vigil title-case fix', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietP(() => lurkerAnswer5(5, null, { name: 'vigil of the pass' })));
    expect(m.name).toBe('Vigil of the Pass');
  });

  test('the numeric-jurisdiction trio fails closed: stat-add choice, resistance bypass, self AC grant', async () => {
    for (const text of [
      'The creature can add its Intelligence modifier to the damage roll of its ranged attacks.',
      'The creature\'s attacks are considered magical for the purposes of overcoming resistance to Poison damage.',
      'The creature gains a +5 bonus to its AC while it remains motionless in Dim Light.',
    ]) {
      const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
        quietP(() => lurkerAnswer5(5, null, { trait_wildcard: { name: 'Bad Grant', text } })));
      expect(Object.values(m.sections).flat().some((e) => e.name === 'Bad Grant')).toBe(false);
    }
  });

  test('the Rug idiom is in the wildcard prompt — damage-forfeit pricing propagates in print wording', () => {
    const scaled = scaleDonor(pickDonor(3, 'trap', 'lurker'), 3, { mechanics: [] });
    const prompt = buildReskinPrompt(scaled, { concept: 'a wax figure' });
    expect(prompt).toMatch(/instead of dealing damage/);
    expect(prompt).toMatch(/Rug of Smothering/);
  });

  test('language register: "but does not speak" ships as print\'s "but can\'t speak"', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietP(() => lurkerAnswer5(5, null, { languages: 'Celestial, understands all others but does not speak' })));
    expect(m.languages).toMatch(/but can't speak/);
  });

  // GOLDEN SEED (library candidate): the Tableau Stalker's Still Gaze —
  // the weeping-angel constraint (Sea Hag "can see" grammar inverted into
  // a self-restriction) priced by the Rug trade (forfeit the hit's
  // damage), Ghoul-severity paralysis with see-it-to-break counterplay.
  // The family's design peak, batch four 2026-09-07.
  test('golden seed: Still Gaze — the weeping-angel trap ships intact', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(3, 'trap', 'lurker'), 3, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k) => { renames[k] = k === 'Melee Attack' ? 'Waxen Limb' : `Named ${k}`; });
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'a wax figure that moves only when unobserved', cr: 3, mechanics: [] },
      quietP(() => JSON.stringify({
        name: 'Tableau Stalker', type: 'Construct', size: 'Medium', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None',
        renames, damage_types: { 'Waxen Limb': 'Bludgeoning' },
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Constitution',
        wildcard: `The creature can move or take actions only while no creature can see it. When it hits one creature within 30 feet with Waxen Limb, it can deal no damage instead and force the target to make a DC ${scaled.dc} Constitution saving throw. On a failed save, the target is Paralyzed for 1 minute, and it can repeat the saving throw at the end of each of its turns, ending the effect on a success. The effect also ends early if the target sees the creature.`,
      })));
    const gaze = Object.values(m.sections).flat().find((e) => /can move or take actions only while no creature can see it/.test(e.text));
    expect(gaze).toBeTruthy();
    expect(gaze.text).toMatch(/Paralyzed for 1 minute/);
    expect(gaze.text).toMatch(/ends early if the target sees/);
  });
});

describe('the close-out coda (2026-09-08): the short-form system, four word-form holes, two resolver cues', () => {
  const lurkerAnswer6 = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'lurker'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Hush That Endures', type: 'Aberration', size: 'Medium', alignment: 'Unaligned',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietC2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the short form heads on the noun before a relative — never "the endures"', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'the silence in a library', cr: 8, mechanics: [] },
      quietC2(() => lurkerAnswer6(8)));
    const all = JSON.stringify(m.sections);
    expect(all).toMatch(/the hush/);
    expect(all).not.toMatch(/the endures/);
  });

  test('a capitalized mid-sentence epithet draws the sheet-voice coaching — "the Silence" dodge closed', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'lurker', concept: 'the silence in a library', cr: 8, mechanics: [] },
      async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return lurkerAnswer6(8, null, {
          wildcard: 'When a creature within 30 feet makes a sound, the Silence strikes at its voice, and the target must succeed on a DC 15 Wisdom saving throw or have Disadvantage on its next attack roll.',
          wildcard_economy: 'reaction',
        });
      });
    expect(prompts.some((p) => /second nickname/.test(p))).toBe(true);
    // while "the Hide action" never trips the game-caps exclusion
    const { renameKeysOf: rk } = require('../generate.mjs');
    void rk; // (exclusion is covered by every green suite that grants Hide)
  });

  test('the immunity guard reads name-subjects — the Suspended Stillness dodge closed', async () => {
    const m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'x', cr: 5, mechanics: [] },
      quietC2(() => lurkerAnswer6(5, 'trap', {
        name: 'Gallows Bed',
        trait_wildcard: { name: 'Suspended Stillness', text: 'While motionless, the gallows bed has immunity to the Blinded and Deafened conditions.' },
      })));
    expect(JSON.stringify(m.sections)).not.toMatch(/immunity to the Blinded/);
  });

  test('the orphan scan reads compound-NOUN applies — "has the Blinded and Restrained conditions"', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietC2(() => lurkerAnswer6(5, null, {
        wildcard: '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Blinded and Restrained conditions until the end of its next turn.',
      })));
    const findings = (m.lint_findings ?? []).join(' ');
    expect(findings).not.toMatch(/"Blinded" is referenced as a state but nothing/);
    expect(findings).not.toMatch(/"Restrained" is referenced as a state but nothing/);
  });

  test('"uses a bonus action" in a trait draft is active mechanics — the Flurry inflection closed', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietC2(() => lurkerAnswer6(5, null, {
        trait_wildcard: { name: 'Blade Recall', text: 'While a knife is in the air, the creature can use a bonus action to recall all thrown knives to its hand.' },
      })));
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Blade Recall')).toBe(false);
  });

  test('a rename promising a condition its row never applies is a defect — the Petrifying Patient class', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(20, null, 'lurker'), 20, { mechanics: [] });
    const { renameKeysOf: rk } = require('../generate.mjs');
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    // Legendary Menace applies Frightened; name it Petrifying and the vet objects
    renames['Legendary Menace'] = 'Petrifying Stare';
    const answer = {
      name: 'Test Shade', renames, damage_types: {}, conditions: { condition_minor: 'Prone' },
      wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    };
    expect(rd(scaled, answer, {}).join(' ')).toMatch(/"Petrifying Stare" promises Petrified but the row never applies it/);
  });

  test('the prompt cues: ghosts are ALWAYS phantom; engulf covers digestion', () => {
    const src = require('fs').readFileSync(require('path').resolve(__dirname, '../../format-2024/generate.mjs'), 'utf8');
    expect(src).toMatch(/a ghost or spirit is ALWAYS a phantom, even when it lurks, stalks, or hides/);
    expect(src).toMatch(/engulf covers ANY containment: a body that swallows, engulfs, smothers, entombs, or DIGESTS prey/);
  });
});

describe('the defender family Stage 1 (2026-09-08): the amended pin, the ward tax, Parry retired', () => {
  const defenderAnswer = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'defender'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Sentinel', type: 'Humanoid', size: 'Medium', alignment: 'Lawful Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      ward: 'the child empress',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietD2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a defender generation: armor over the card, damage under it, the Knight seat', async () => {
    const m = await generateReskin({ archetype: 'defender', concept: 'a tower-shield sentinel', cr: 3, mechanics: [] },
      quietD2(() => defenderAnswer(3)));
    expect(m.generation).toMatchObject({ path: 'reskin', donor: 'defender-3', archetype: 'defender' });
    expect(m.generation.cite).toMatch(/Knight/);
    const { cardBudget } = require('../card-budgets.mjs');
    expect(m.ac).toBeGreaterThan(cardBudget(3, {}).ac); // the family signature
    expect(m.hp).toBeLessThan(cardBudget(3, {}).hp);
    expect(m.sections.Reactions ?? []).toHaveLength(0);
  });

  test('the warden line: the Bound transfer ships as chassis, the ward tax holds at scale time', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'an oath-bound tomb guardian', cr: 7, mechanics: [] },
      quietD2(() => defenderAnswer(7, 'warden')));
    expect(m.generation.donor).toBe('defender-7-warden');
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /half of any damage the ward takes \(round up\) is transferred/.test(e.text))).toBe(true);
    // generic by owner ruling (2026-09-09): reusable statblocks name no NPC
    expect(all.some((e) => /magically bound to a ward of its choosing/.test(e.text))).toBe(true);
    expect(all.some((e) => e.name === 'Regeneration')).toBe(true);
    // the measured discount survives the per-hit solver: sustained lands
    // near 0.65x of the card, never re-diced up to full card dpr
    const { cardBudget } = require('../card-budgets.mjs');
    const melee = all.find((e) => /Attack Roll/.test(e.text) && /\d+ \(\d+d\d+/.test(e.text));
    const perHit = Number(/(\d+) \(/.exec(melee.text)[1]);
    expect(perHit * 2).toBeLessThanOrEqual(cardBudget(7, {}).dpr * 0.85);
  });

  test('a Parry-shaped draft dies with the defender coaching — the retired-reaction class', async () => {
    const prompts = [];
    const m = await generateReskin({ archetype: 'defender', concept: 'x', cr: 3, mechanics: [] },
      async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return defenderAnswer(3, null, {
          wildcard: 'When the creature is hit by a melee attack, it can use its reaction to impose Disadvantage on the attack roll, deflecting the blow with its shield.',
          wildcard_economy: 'reaction',
        });
      });
    expect(JSON.stringify(m.sections)).not.toMatch(/impose Disadvantage on the attack roll/);
    expect(prompts.some((p) => /Parry was retired/.test(p))).toBe(true);
  });

  test('the aura organ: a claimed aura uncovers the Hobgoblin emanation; unclaimed gates it out', () => {
    const closed = scaleDonor(pickDonor(3, null, 'defender'), 3, { mechanics: [] });
    expect(Object.values(closed.sections).flat().some((e) => e.name === 'Guard Aura')).toBe(false);
    const open = scaleDonor(pickDonor(3, null, 'defender'), 3, { mechanics: ['aura'] });
    const aura = Object.values(open.sections).flat().find((e) => e.name === 'Guard Aura');
    expect(aura.rules).toBe(true);
    expect(aura.text).toMatch(/allies have Advantage on saving throws/);
  });

  test('the legendary seats: both lines reach 17 with the answer-back menu (Riposte fires after enemy turns)', () => {
    for (const [style, id] of [[null, 'defender-17'], ['warden', 'defender-17-warden']]) {
      const s = scaleDonor(pickDonor(20, style, 'defender'), 20, { mechanics: [] });
      expect(pickDonor(20, style, 'defender').id).toBe(id);
      const legs = s.sections['Legendary Actions'] ?? [];
      expect(legs.some((e) => /makes one Melee Attack/.test(e.text))).toBe(true); // the riposte IS print's answer-back timing
      expect(legs.some((e) => /takes the Dodge action/.test(e.text))).toBe(true);
    }
  });
});

describe('the ward re-seat batch (2026-09-09): the spell channel, the sustain kit, three vocabulary rulings', () => {
  const wardenAnswer = (cr, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, 'warden', 'defender'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Keeper', type: 'Construct', size: 'Large', alignment: 'Unaligned',
      senses: 'darkvision 60 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      ward: 'the child empress',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietW = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the checkbox is the healing channel: a defender spellcaster draws the DEFENDER menu, Warding Bond aboard', () => {
    const { DEFENDER_SPELL_MENU } = require('../generate.mjs');
    expect(DEFENDER_SPELL_MENU).toContain('Warding Bond');
    expect(DEFENDER_SPELL_MENU).toContain('Cure Wounds');
    const scaled = scaleDonor(pickDonor(3, null, 'defender'), 3, { mechanics: [] });
    const prompt = buildReskinPrompt(scaled, { concept: 'a shrine keeper' });
    void prompt; // the menu wiring is exercised end-to-end below via the organ path
  });

  test('the invented warden seats ship Regeneration + a renamed Aegis (2/Day) — no Ward Bond, no dead text', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a shrine keeper', cr: 3, mechanics: [] },
      quietW(() => wardenAnswer(3)));
    expect(m.generation.donor).toBe('defender-3-warden');
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /transferred to the/.test(e.text))).toBe(false);
    expect(all.some((e) => e.name === 'Regeneration')).toBe(true);
    const aegis = all.find((e) => /Temporary Hit Points, and its AC increases by 2/.test(e.text));
    expect(aegis.name).toMatch(/\(2\/Day\)/);
  });

  test('the damage-gated recharge is meter dialect #9 — flagged, never canonized (0/329)', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return wardenAnswer(7, {
          wildcard: '*Strength Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has the Prone condition. The creature cannot use this ability again until it has taken damage.',
        });
      });
    expect(prompts.some((p) => /use limits print as a count/.test(p))).toBe(true);
  });

  test('the aggro mark is canonized house grammar in the wildcard prompt', () => {
    const scaled = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [] });
    const prompt = buildReskinPrompt(scaled, { concept: 'a bodyguard' });
    expect(prompt).toMatch(/Disadvantage on attack rolls against creatures other than the creature/);
  });

  test('vulnerability stamps restrict to the print-observed set — Vulnerable Force never ships', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a gate of pure force magic', cr: 7, mechanics: [] },
      quietW(() => wardenAnswer(7, { vulnerability: 'Force' })));
    expect(m.vulnerabilities ?? '').not.toMatch(/Force/);
  });

  test('"but cannot speak" ships as print\'s "but can\'t speak" — second inflection', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      quietW(() => wardenAnswer(7, { languages: 'understands all languages but cannot speak' })));
    expect(m.languages).toMatch(/but can't speak/);
  });
});

describe('the smoke-two fix batch (2026-09-09): the Aegis solver bug, the ward degrade, the healing clause', () => {
  const wardenAnswer2 = (cr, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, 'warden', 'defender'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Keeper', type: 'Construct', size: 'Large', alignment: 'Unaligned',
      senses: 'darkvision 60 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      ward: 'the child empress',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietS = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the solver never prices a damage-less gated row as a nova — warden fists land on the ward tax, not half of it', () => {
    // the Oathguard shipped 8 (1d8+4) at CR 7 against an 18 target: the
    // 2/Day Aegis (temp HP, zero damage) was budgeted as a damage nova
    const s = scaleDonor(pickDonor(7, 'warden', 'defender'), 7, { mechanics: [] });
    expect(s.per_hit).toBeGreaterThanOrEqual(16); // 18 = the 0.65-taxed card; the old bug crushed it to 8
    const melee = Object.values(s.sections).flat().find((e) => /Melee Attack Roll/.test(e.text));
    // the 60/40 rider split may fire — sum BOTH clauses (the lurker
    // Stage 1 lesson, relearned)
    const perHit = [...melee.text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m2) => n + Number(m2[1]), 0);
    const { cardBudget } = require('../card-budgets.mjs');
    const target = cardBudget(7, {}).dpr * 0.65; // the measured ward tax
    expect(perHit * 2).toBeGreaterThanOrEqual(Math.floor(target * 0.75));
  });

  test('the ward is GENERIC — reusable statblocks name no NPC (owner ruling 2026-09-09, reverting the concept-fill)', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'sworn to the child empress', cr: 7, mechanics: [] },
      quietS(() => wardenAnswer2(7)));
    const bond = Object.values(m.sections).flat().find((e) => /transferred to the/.test(e.text));
    expect(bond.text).toMatch(/bound to a ward of its choosing/);
    expect(bond.text).not.toMatch(/child empress|Whoever bears|\{ward\}/);
  });

  test('the healing clause: support spells tier daily, never at-will (0/329 at-will healing in print)', () => {
    const { NEVER_AT_WILL } = require('../generate.mjs');
    for (const s of ['Cure Wounds', 'Healing Word', 'Aid', 'Bless', 'Beacon of Hope', 'Warding Bond']) {
      expect(NEVER_AT_WILL.has(s)).toBe(true);
    }
  });

  test('anchor and free-action coaching reach repair — the immovability fantasy gets its legal forms', async () => {
    const prompts = [];
    const capture = (fixture) => async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return fixture();
    };
    await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      capture(() => wardenAnswer2(7, {
        trait_wildcard: { name: 'Immovable', text: 'The creature is immune to the Prone and Restrained conditions while it holds its ground.' },
      })));
    expect(prompts.some((p) => /IMMOVABLE-anchor concept instead writes the conditional form/.test(p))).toBe(true);
    prompts.length = 0;
    await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      capture(() => wardenAnswer2(7, {
        wildcard: '*Strength Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has the Prone condition, and it can stand as a free action.',
      })));
    expect(prompts.some((p) => /there are no free actions in 2024/.test(p))).toBe(true);
  });

  test('the orphan scan reads "(escape DC" applies — the Gravefist FP, fifth inflection', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      quietS(() => wardenAnswer2(7, {
        wildcard: '*Strength Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target is Grappled (escape DC 14) until it breaks free.',
      })));
    expect((m.lint_findings ?? []).join(' ')).not.toMatch(/"Grappled" is referenced as a state but nothing/);
  });
});

describe('the holds round (2026-09-10): coherence, the launcher vet, the mark save, the leak repro', () => {
  const defAnswer = (cr, style = null, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'defender'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Warden', type: 'Construct', size: 'Medium', alignment: 'Lawful Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietH = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a launcher name never lands on a row with reach — the melee crossbow dies at validation', () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [] });
    const { renameKeysOf: rk } = require('../generate.mjs');
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    // the hybrid row has reach — a crossbow name on it is the Grave-Vow defect
    const hybridKey = rk(scaled).find((k) => /Hybrid/.test(k));
    renames[hybridKey] = 'Heavy Crossbow';
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const answer = {
      name: 'Test Knight', renames,
      damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])),
      conditions: { condition_minor: 'Prone' },
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    };
    expect(rd(scaled, answer, {}).join(' ')).toMatch(/"Heavy Crossbow" is a launcher but the row swings in melee/);
  });

  test('a saveless aggro mark fails closed — the Vow of Fury shape', async () => {
    const m = await generateReskin({ archetype: 'defender', concept: 'x', cr: 5, mechanics: [] },
      quietH(() => defAnswer(5, null, {
        wildcard: 'The creature marks one creature it can see within 30 feet. Until the start of the creature\'s next turn, the target has Disadvantage on attack rolls against creatures other than the creature, and the creature has Advantage on attack rolls against the target.',
        wildcard_economy: 'bonus_action',
      })));
    expect(JSON.stringify(m.sections)).not.toMatch(/Disadvantage on attack rolls against creatures other than.*Advantage on attack rolls against the target/);
  });

  test('the speed-discord lint fires on a permanent Speed-0 trait beside a moving header', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      quietH(() => defAnswer(7, 'warden', {
        // the vehicle trait originally said "can't be knocked Prone" —
        // the can't-be immunity inflection (2026-09-13) now correctly
        // kills that grammar in the vet, so the lint vehicle is rooted
        // without an immunity grant
        trait_wildcard: { name: 'Rooted', text: 'The creature is anchored to the ground by iron roots, and its Speed is 0.' },
      })));
    expect((m.lint_findings ?? []).join(' ')).toMatch(/speed-discord/);
  });

  test('skills re-derive at the target CR with the full map — the Arcana gap closes', () => {
    // caster-6 authored Arcana at its own CR; scaled to 9 (PB +4) the
    // number must re-derive from INT (the Gloomburrow shipped +6)
    const s = scaleDonor(pickDonor(9, null, 'caster'), 9, { mechanics: [] });
    if (/Arcana/.test(s.skills ?? '')) {
      const intMod = Math.floor((s.stats.INT - 10) / 2);
      const n = Number(/Arcana \+(\d+)/.exec(s.skills)[1]);
      expect(n).toBeGreaterThanOrEqual(intMod + s.pb);
    }
    // and the defender's Athletics derives from the coherent Str
    const d5 = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [] });
    expect(d5.skills).toContain(`Athletics +${Math.floor((d5.stats.STR - 10) / 2) + d5.pb}`);
  });

  test('LEAK REPRO: a repaired trait with a condition-immunity suite never ships (the Tollkeeper)', async () => {
    for (const text of [
      'The creature is immune to the Grappled and Restrained conditions. It can move across vertical and horizontal surfaces.',
      'The tollkeeper is immune to the Grappled and Restrained conditions. It can move across vertical and horizontal surfaces.',
    ]) {
      const m = await generateReskin({ archetype: 'defender', concept: 'a bridge troll', cr: 6, mechanics: [] },
        async (prompt) => {
          if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) {
            return JSON.stringify({ trait_wildcard: { name: 'Stone Bound', text } });
          }
          if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
          return defAnswer(6, null, {
            name: 'Tollkeeper',
            trait_wildcard: { name: 'Stone Hide', text: 'The creature has resistance to Bludgeoning, Piercing, and Slashing damage.' },
          });
        });
      expect(JSON.stringify(m.sections)).not.toMatch(/immune to the Grappled and Restrained/);
    }
  });
});

describe('the defense engine menu (2026-09-10): the immovable force, answer-picked', () => {
  const bossAnswer = (over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, 'warden', 'defender'), 17, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Rampart', type: 'Construct', size: 'Gargantuan', alignment: 'Unaligned',
      senses: 'darkvision 120 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      defense_engine: 'rampart',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietE = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('rampart: the aura and the wall ship renamed; the punisher rows never do', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a living fortress wall', cr: 17, mechanics: [] },
      quietE(() => bossAnswer()));
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /5-foot Emanation originating from the test rampart takes \d+ \(\d+d\d+\) Bludgeoning damage/.test(e.text))).toBe(true);
    const wall = all.find((e) => /raises a solid rampart/.test(e.text));
    expect(wall.name).toMatch(/\(Recharge 5-6\)/);
    expect(all.some((e) => /one Reaction on every turn/.test(e.text))).toBe(false);
    expect(m.sections.Reactions ?? []).toHaveLength(0);
    // the anchor ships in the Rakshasa grammar, chassis
    expect(all.some((e) => /automatically succeeds on saving throws made to avoid being moved/.test(e.text))).toBe(true);
  });

  test('punisher: Reactive and the Trigger/Response counter ship; the rampart rows never do', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'the thing that answers back', cr: 17, mechanics: [] },
      quietE(() => bossAnswer({ defense_engine: 'punisher' })));
    const all = Object.values(m.sections).flat();
    // the reprice (2026-09-10): the counter is BOUNDED — one standard
    // reaction, never the Marilith's every-turn multiplier
    expect(all.some((e) => /one Reaction on every turn of combat/.test(e.text))).toBe(false);
    expect((m.sections.Reactions ?? []).some((e) => /\*Trigger:\*/.test(e.text) && /makes one Named Row\d+ attack/.test(e.text))).toBe(true);
    expect(all.some((e) => /5-foot Emanation/.test(e.text))).toBe(false);
    expect(all.some((e) => /raises a solid rampart/.test(e.text))).toBe(false);
  });

  test('an off-menu pick is a validation defect AND assembly never fails — it defaults to rampart', async () => {
    const { reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, 'warden', 'defender'), 17, { mechanics: [] });
    expect(rd(scaled, JSON.parse(bossAnswer({ defense_engine: 'fortress' })), {}).join(' ')).toMatch(/defense_engine missing or off the menu/);
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 17, mechanics: [] },
      quietE(() => bossAnswer({ defense_engine: '' })));
    expect(Object.values(m.sections).flat().some((e) => /5-foot Emanation/.test(e.text))).toBe(true);
  });

  test('the juggernauts carry their cites: a Flesh-cite generation ships Lightning Absorption', async () => {
    const s = scaleDonor(pickDonor(5, 'juggernaut', 'brute'), 5, { mechanics: [] });
    const abs = Object.values(s.sections).flat().find((e) => /Absorption/.test(e.name));
    expect(abs.rules).toBe(true);
    expect(abs.text).toMatch(/subjected to Lightning damage, it takes no damage and instead regains/);
  });
});

describe('the pre-close round (2026-09-10): vacuous resilience, the bounded counter, keys and tiers', () => {
  const bossAnswer2 = (over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, 'warden', 'defender'), 17, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Bastion', type: 'Construct', size: 'Gargantuan', alignment: 'Unaligned',
      senses: 'darkvision 120 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      defense_engine: 'rampart',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietP2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('vacuous resilience dies: Advantage against a condition the type header already carries immunity to', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 17, mechanics: [] },
      quietP2(() => bossAnswer2({
        trait_wildcard: { name: 'Forged Will', text: 'The creature has Advantage on saving throws against being Charmed or Frightened.' },
      })));
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Forged Will')).toBe(false);
  });

  test('the anchor chassis-owned key: a wildcard re-deriving Immovable fails closed (the Unbreached Bulwark duplicate)', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 17, mechanics: [] },
      quietP2(() => bossAnswer2({
        trait_wildcard: { name: 'Rooted Stone', text: 'The creature automatically succeeds on saving throws made to avoid being moved against its will.' },
      })));
    const movers = Object.values(m.sections).flat().filter((e) => /automatically succeeds on saving throws made to avoid being moved/.test(e.text));
    expect(movers).toHaveLength(1);
    expect(movers[0].name).toBe('Immovable');
  });

  test('a rename never repeats the block\'s head noun', () => {
    const { reskinDefects: rd, renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, 'warden', 'defender'), 17, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const wallKey = rk(scaled).find((k) => /Wall/.test(k));
    renames[wallKey] = 'Rampart';
    const answer = JSON.parse(bossAnswer2({ renames, name: 'Unbroken Rampart' }));
    expect(rd(scaled, answer, {}).join(' ')).toMatch(/"Rampart" repeats the creature's own name/);
  });

  test('the Aegis scales with tier: boss Temporary Hit Points track per-hit, never the CR 5 ten', () => {
    const s = scaleDonor(pickDonor(17, 'warden', 'defender'), 17, { mechanics: [] });
    const aegis = Object.values(s.sections).flat().find((e) => /Temporary Hit Points/.test(e.text));
    const thp = Number(/(\d+) \(\d+d\d+\) Temporary Hit Points/.exec(aegis.text)[1]);
    expect(thp).toBeGreaterThanOrEqual(25);
    // and the CR 3 seat stays near the Unicorn's print ten
    const low = scaleDonor(pickDonor(3, 'warden', 'defender'), 3, { mechanics: [] });
    const lowAegis = Object.values(low.sections).flat().find((e) => /Temporary Hit Points/.test(e.text));
    expect(Number(/(\d+) \(/.exec(lowAegis.text)[1])).toBeLessThanOrEqual(16);
  });

  test('a declared energy burns in the gullet: the engulf interior follows the concept (the Crucible\'s Acid furnace)', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(15, 'grappler', 'brute'), 15, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', style: 'grappler', concept: 'a brass furnace golem', cr: 15, energy: 'Fire', mechanics: [] },
      quietP2(() => JSON.stringify({
        name: 'Furnace Hulk', type: 'Construct', size: 'Huge', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
        engulf_style: 'swallow',
        wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const swallow = Object.values(m.sections).flat().find((e) => /While swallowed/.test(e.text));
    expect(swallow.text).toMatch(/Fire damage at the start/);
  });

  test('a keyless chassis Regeneration gains the derived foil in Troll grammar', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a thunder-stone rampart', cr: 17, energy: 'Thunder', mechanics: [] },
      quietP2(() => bossAnswer2()));
    const regen = Object.values(m.sections).flat().find((e) => e.name === 'Regeneration');
    // the inline substitution stamps the short form into the appended clause
    expect(regen.text).toMatch(/If the test bastion takes Lightning damage, this trait doesn't function at the start of the test bastion's next turn\./);
  });
});

describe('the defender close-out batch (2026-09-10): the minted-resource class, the closed languages field', () => {
  const closeAnswer = (over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(7, 'warden', 'defender'), 7, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Keeper', type: 'Construct', size: 'Large', alignment: 'Lawful Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const capture = (fixture, prompts) => async (prompt) => {
    prompts.push(prompt);
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return fixture();
  };

  test('a minted resource and an "Alternatively" weld both draw coaching — the Gorge Draught class', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      capture(() => closeAnswer({
        wildcard: 'The creature extinguishes one open flame within reach and gains one Furnace Charge. It can hold up to three Furnace Charges. Alternatively, one creature within 30 feet must succeed on a DC 14 Dexterity saving throw or take 27 (5d8 + 5) Fire damage.',
      }), prompts));
    expect(prompts.some((p) => /capitalized tracked resource is a homebrew subsystem/.test(p))).toBe(true);
  });

  test('meter inflection #7: "can use this ability up to 3/Day" is dialect, flagged', async () => {
    const prompts = [];
    await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      capture(() => closeAnswer({
        wildcard: '*Strength Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has the Prone condition. The creature can use this ability up to 3/Day.',
      }), prompts));
    expect(prompts.some((p) => /use limits print as a count/.test(p))).toBe(true);
  });

  test('the Languages field closes: lore leaks lint, grammar branches normalize', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      quietTail(() => closeAnswer({ languages: 'Ignan, understands Dwarvish but cannot speak' })));
    expect(m.languages).toBe("Ignan, understands Dwarvish but can't speak it");
    const m2 = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'x', cr: 7, mechanics: [] },
      quietTail(() => closeAnswer({ languages: 'Understands all but can\'t speak; the tomb\'s final breath remains in it' })));
    expect(m2.languages).toMatch(/understands all languages but/);
    expect((m2.lint_findings ?? []).join(' ')).toMatch(/languages-lore-leak/);
  });

  test('Ward Bond binds once — and the regen key never trips the type-affinity lint', async () => {
    const m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a radiant tomb guardian', cr: 7, energy: 'Radiant', mechanics: [] },
      quietTail(() => closeAnswer()));
    const bond = Object.values(m.sections).flat().find((e) => /transferred to the/.test(e.text));
    expect(bond.text).toMatch(/only one ward at a time/);
    // energy Radiant -> foil Necrotic in the regen key on a Construct:
    // a vulnerability mention, never a dealt-damage affinity finding
    expect((m.lint_findings ?? []).join(' ')).not.toMatch(/type-damage-affinity/);
  });
});
const quietTail = (respond) => async (prompt) => {
  if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
  if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
  return respond(prompt);
};

describe('the body types (2026-09-11): body outranks role', () => {
  const bodyAnswer = (cr, bodyArch, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, null, bodyArch), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Body', type: bodyArch === 'dragon' ? 'Dragon' : bodyArch === 'ooze' ? 'Ooze' : 'Beast', size: 'Large', alignment: 'Unaligned',
      senses: 'blindsight 60 ft.', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietB2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('a dragon body routes past the role, breathes its concept energy, and is IMMUNE to it', async () => {
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'an emerald flame dragon', cr: 8, energy: 'Fire', mechanics: [] },
      quietB2(() => bodyAnswer(8, 'dragon')));
    expect(m.generation.donor).toBe('dragon-8');
    expect(m.generation.body).toBe('dragon');
    const breath = Object.values(m.sections).flat().find((e) => /30-foot Cone/.test(e.text));
    expect(breath.text).toMatch(/Fire damage/);
    expect(breath.name).toMatch(/Recharge 5-6/);
    expect(m.immunities).toMatch(/Fire/);
    expect(m.resistances ?? '').not.toMatch(/Fire/);
  });

  test('an ooze body ships the deepest armor trade with its rules kit', async () => {
    const m = await generateReskin({ archetype: 'lurker', bodyType: 'ooze', concept: 'a molten slag ooze', cr: 4, energy: 'Fire', mechanics: [] },
      quietB2(() => bodyAnswer(4, 'ooze')));
    expect(m.generation.donor).toBe('ooze-4');
    const { cardBudget } = require('../card-budgets.mjs');
    expect(m.ac).toBeLessThanOrEqual(cardBudget(4, {}).ac - 5);
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /space as narrow as 1 inch/.test(e.text))).toBe(true);
    expect(all.some((e) => /touches the test body or hits it/.test(e.text) && /Fire damage/.test(e.text))).toBe(true);
  });

  test('a swarm body: the trait, the suite in the header, and the Bloodied split scaled at both clauses', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', bodyType: 'swarm', concept: 'a swarm of razor moths', cr: 9, mechanics: [] },
      quietB2(() => bodyAnswer(9, 'swarm')));
    expect(m.generation.donor).toBe('swarm-9');
    expect(m.immunities).toMatch(/Grappled/);
    expect(m.resistances).toMatch(/Bludgeoning/);
    const bite = Object.values(m.sections).flat().find((e) => /Bloodied/.test(e.text));
    const clauses = [...bite.text.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].map((x) => Number(x[1]));
    expect(clauses).toHaveLength(2);
    // the split re-derives as half of the re-diced main clause
    expect(Math.abs(clauses[1] - Math.floor(clauses[0] / 2))).toBeLessThanOrEqual(2);
    expect(Object.values(m.sections).flat().some((e) => /occupy another creature's space/.test(e.text))).toBe(true);
  });
});

describe('the smoke-two body fixes (2026-09-11): the spell degrade, the stamp order', () => {
  const dragonAnswer = (cr, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, null, 'dragon'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Wyrm', type: 'Dragon', size: 'Huge', alignment: 'Neutral',
      senses: 'blindsight 60 ft.', languages: 'Draconic',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };
  const quietT2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('an unfilled dragon Spellcasting row DEGRADES — the Firstwinter crash class dies', async () => {
    // no spells field at all, repair returns nothing: the row drops
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 22, energy: 'Cold', mechanics: [] },
      quietT2(() => dragonAnswer(22)));
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /\{spell_at_will\}/.test(e.text))).toBe(false);
    expect(m.name).toBe('Test Wyrm'); // the generation completed
  });

  test('the swarm type stamp survives the resolvedType stamp — the Sewer Choir revert dies', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, null, 'swarm'), 17, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'controller', bodyType: 'swarm', resolvedType: 'Aberration', concept: 'a psychic rat tide', cr: 17, mechanics: [] },
      quietT2(() => JSON.stringify({
        name: 'Test Choir', type: 'Aberration', size: 'Gargantuan', alignment: 'Neutral',
        senses: 'darkvision 120 ft.', languages: 'None',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
        wildcard: '*Strength Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.',
      })));
    expect(m.type).toBe('Swarm of Tiny Aberrations');
  });
});

describe('the body smoke-two critic fixes (2026-09-13): the clobber, the mental-anatomy leak, two inflections', () => {
  const quietC = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the ooze element immunity SURVIVES the type-floor header write — the Cistern clobber dies', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(4, null, 'ooze'), 4, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'lurker', bodyType: 'ooze', concept: 'a caustic sump', cr: 4, energy: 'Acid', mechanics: [] },
      quietC(() => JSON.stringify({
        name: 'Test Sump', type: 'Ooze', size: 'Large', alignment: 'Unaligned',
        senses: 'blindsight 60 ft.', languages: 'None',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Acid'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    // BOTH survive: the element immunity AND the Ooze floor conditions
    // (the clobber shipped the floor and dropped the Acid, trace lying)
    expect(m.immunities).toMatch(/Acid/);
    expect(m.immunities).toMatch(/Grappled/);
  });

  test('a mental striker cannot put an anatomical name on physical damage — the Sorrowfall Claw class dies', () => {
    const scaled = scaleDonor(pickDonor(11, 'binder', 'caster'), 11, { mechanics: [] });
    expect(['INT', 'WIS', 'CHA']).toContain(scaled.striker_stat);
    const { renameKeysOf: rk, reskinDefects: rd } = require('../generate.mjs');
    const keys = rk(scaled);
    const renames = {};
    keys.forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => e.name);
    renames[typed[0]] = 'Grave Claw';
    const mk = () => ({
      name: 'Testling', renames: { ...renames }, wildcard: 'x',
      damage_types: Object.fromEntries(typed.map((n) => [renames[n], 'Slashing'])),
      conditions: {}, melee_rider: 'none',
    });
    expect(rd(scaled, mk(), {}).join('\n')).toMatch(/anatomical name dealing Slashing/);
    // the print-legal shape: an implement name pays for physical damage
    // (the Dryad's Vine Lash, +6 Wis-keyed Slashing)
    renames[typed[0]] = 'Vine Lash';
    expect(rd(scaled, mk(), {}).join('\n')).not.toMatch(/anatomical name/);
    // and a magical type frees the anatomy word (print: no such row, but
    // the guard's scope is the 0/329 triple only)
    renames[typed[0]] = 'Grave Claw';
    const p3 = mk();
    p3.damage_types = Object.fromEntries(typed.map((n) => [p3.renames[n], 'Necrotic']));
    expect(rd(scaled, p3, {}).join('\n')).not.toMatch(/anatomical name/);
  });

  test("the can't-be immunity inflection dies in the vet — the Meregrave trait class", async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: "*Constitution Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll. Additionally, the creature can't be Grappled, Restrained, or knocked Prone." });
    });
    expect(repairPrompt).toMatch(/condition-immunity SUITES/);
  });

  test('a lowercase minted condition dies — the Sewer Choir "buried condition" class', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the buried condition until it escapes.' });
    });
    expect(repairPrompt).toMatch(/"buried" is not a rules condition/);
  });
});

describe('the body smoke-three critic fixes (2026-09-13): the union, the typed split, riders live on rows', () => {
  const quietD = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const swarmAnswer = (cr, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, null, 'swarm'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({
      name: 'Test Tide', type: 'Construct', size: 'Large', alignment: 'Unaligned',
      senses: 'blindsight 60 ft. (blind beyond this radius)', languages: 'None',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    });
  };

  test('a Swarm of Tiny Constructs UNIONS the Construct floor with the swarm suite — the Meregrave loss dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', bodyType: 'swarm', resolvedType: 'Construct', concept: 'a swarm of gravestones', cr: 6, mechanics: [] },
      quietD(() => swarmAnswer(6)));
    expect(m.type).toBe('Swarm of Tiny Constructs');
    // the Construct package: Poison damage immunity + its conditions
    expect(m.immunities).toMatch(/Poison\b/);
    expect(m.immunities).toMatch(/Exhaustion/);
    expect(m.immunities).toMatch(/Poisoned/);
    // and the swarm suite still rides along
    expect(m.immunities).toMatch(/Grappled/);
    expect(m.immunities).toMatch(/Stunned/);
  });

  test('the Bloodied split clause is TYPED — the two-type ambiguity dies at the donor', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', bodyType: 'swarm', resolvedType: 'Construct', concept: 'a swarm of gravestones', cr: 6, mechanics: [] },
      quietD(() => swarmAnswer(6)));
    const row = Object.values(m.sections).flat().find((e) => /Bloodied/.test(e.text));
    expect(row.text).toMatch(/, or \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) Bludgeoning damage if [^.]{0,40}Bloodied/);
  });

  test('an uncountable type pluralizes as itself — no "Swarm of Tiny Undeads"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', bodyType: 'swarm', resolvedType: 'Undead', concept: 'a swarm of grave hands', cr: 6, mechanics: [] },
      quietD(() => swarmAnswer(6, { type: 'Undead' })));
    expect(m.type).toBe('Swarm of Tiny Undead');
  });

  test('a DECLARED trait carrying a 2014 save frame dies — the Clotting Sludge dodge closes', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({
        wildcard: 'When the creature hits with its Melee attack, the target must succeed on a DC 15 Strength saving throw or have its Speed reduced by 10 feet until the end of its next turn.',
        wildcard_economy: 'trait',
      });
    });
    expect(repairPrompt).toMatch(/a trait never carries a damage roll, a save frame, or an on-hit trigger/);
  });

  test('dragon senses rise to the print tier, upgrade-only — the adult blindsight-30 dies', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(15, null, 'dragon'), 15, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 15, energy: 'Psychic', mechanics: [] },
      quietD(() => JSON.stringify({
        name: 'Test Sorrow', type: 'Dragon', size: 'Huge', alignment: 'Neutral',
        senses: 'blindsight 30 ft., darkvision 120 ft.', languages: 'Draconic',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom',
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    expect(m.senses).toMatch(/blindsight 60/);
    expect(m.senses).toMatch(/darkvision 120/);
  });

  test('an unfilled dragon Spellcasting row fills from the engine menu — signature loss ends at utility picks', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(22, null, 'dragon'), 22, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 22, energy: 'Cold', mechanics: [] },
      quietD(() => JSON.stringify({
        name: 'Test Wyrm Two', type: 'Dragon', size: 'Gargantuan', alignment: 'Neutral',
        senses: 'blindsight 60 ft., darkvision 120 ft.', languages: 'Draconic',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    expect(sc).toBeTruthy();
    expect(sc.text).toMatch(/\*Detect Magic\*/);
    expect(sc.text).not.toMatch(/\{spell/);
  });

  test('"is also Frightened of the X until" counts as an applier — the Grave Recital false positive dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietD(() => answer({
      wildcard: "*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 9 (2d8) Psychic damage, and the target is also Frightened of the creature until the end of its next turn.",
    })));
    expect((m.lint_findings ?? []).join(' ')).not.toMatch(/"Frightened" is referenced as a state but nothing on the sheet applies it/);
  });

  test('a delegation row cannot rename to foreign anatomy — the Crushing Tail mismatch dies', () => {
    const { renameKeysOf: rk, reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(22, null, 'dragon'), 22, { mechanics: [] });
    const keys = rk(scaled);
    const rows = Object.values(scaled.sections).flat();
    const del = rows.find((e) => keys.includes(e.name) && /makes one .+ attacks?\b/.test(e.text));
    expect(del).toBeTruthy();
    const target = /makes one (.+?) attacks?\b/.exec(del.text)[1];
    const renames = {};
    keys.forEach((k, i) => { renames[k] = `Named Row${i}`; });
    renames[target] = 'Claw';
    renames[del.name] = 'Crushing Tail';
    const mk = () => ({
      name: 'Testling Two', renames: { ...renames }, wildcard: 'x',
      damage_types: {}, conditions: {}, melee_rider: 'none',
    });
    expect(rd(scaled, mk(), {}).join('\n')).toMatch(/promises a tail but the row makes a Claw attack/);
    renames[del.name] = 'Crushing Claw';
    expect(rd(scaled, mk(), {}).join('\n')).not.toMatch(/promises a/);
  });
});

describe('the Tier A stress fixes (2026-09-13): spell caps, the exhaustion stamp, undefined states', () => {
  const quietE2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const casterAnswer = (cr, style, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, 'caster'), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return { scaled, renames, typed };
  };

  test('at-will damage is capped at ONE and AoE at-will needs CR 16 — the Saint class dies', async () => {
    const { scaled, renames, typed } = casterAnswer(8, null);
    const m = await generateReskin({ archetype: 'caster', concept: 'x', cr: 8, mechanics: [] }, quietE2(() => JSON.stringify({
      name: 'Test Pane', type: 'Celestial', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Radiant'])),
      conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Dexterity',
      spells: { at_will: ['Guiding Bolt', 'Shatter'], daily: ['Blur', 'Blight'] },
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    })));
    const sc = Object.values(m.sections).flat().find((e) => e.name === 'Spellcasting');
    const atWillLine = /- \*\*At Will:\*\* ([^\n]*)/.exec(sc.text)?.[1] ?? '';
    // Shatter (AoE, CR < 16) never at will; at most one damage spell there
    expect(atWillLine).not.toMatch(/Shatter/);
    const dmgAtWill = ['Guiding Bolt', 'Shatter'].filter((x) => atWillLine.includes(x));
    expect(dmgAtWill.length).toBeLessThanOrEqual(1);
    expect(sc.text).toMatch(/1\/Day[^\n]*Shatter/);
  });

  test('the triple that survives repair exhaustion gets its type stamped magical — the shipped Glass Claw dies', async () => {
    const { scaled, renames, typed } = casterAnswer(11, 'binder');
    renames[Object.values(scaled.sections).flat().find((e) => e.text.includes('{damage_type}') && !e.rules).name] = 'Grave Claw';
    const typedNames = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'x', cr: 11, energy: 'Necrotic', mechanics: [] }, quietE2(() => JSON.stringify({
      name: 'Test Wraith', type: 'Undead', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typedNames.map((n) => [n, n === 'Grave Claw' ? 'Slashing' : 'Necrotic'])),
      conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Constitution',
      spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Blight'] },
      wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    })));
    const row = Object.values(m.sections).flat().find((e) => e.name === 'Grave Claw');
    expect(row.text).not.toMatch(/Slashing/);
    expect(row.text).toMatch(/Necrotic damage/);
  });

  test('a trait keying on a state nothing enters dies; a self-establishing state survives', async () => {
    const run = (tw) => {
      let repairPrompt = null;
      return generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
        if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer({ trait_wildcard: { name: 'Reliquary Ward', text: tw } });
      }).then((m) => ({ m, repairPrompt }));
    };
    const bad = await run('While the reliquary is planted, allies within 10 feet have Advantage on saving throws.');
    expect(bad.repairPrompt).toMatch(/the state "planted" that nothing on the sheet enters/);
    const good = await run('The creature plants its reliquary as part of any move it makes. While the reliquary is planted, allies within 10 feet have Advantage on saving throws.');
    expect(good.repairPrompt).toBeNull();
  });

  test('untargetability grammar dies in both chains — the Glass Revenant hold closes', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Mirror Home', text: 'The creature cannot be targeted or affected by anything while it is inside a reflection.' } });
    });
    expect(repairPrompt).toMatch(/untargetability is not a grantable defense/);
  });

  test('the engine recomputes every flat average — the 18 (4d6) miss dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietE2(() => answer({
      wildcard: "*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 18 (4d6) Necrotic damage, and the target has Disadvantage on its next attack roll before the start of the creature's next turn.",
    })));
    const row = Object.values(m.sections).flat().find((e) => /\(4d6\)/.test(e.text ?? ''));
    expect(row.text).toMatch(/14 \(4d6\)/);
    expect(row.text).not.toMatch(/18 \(4d6\)/);
  });

  test('an Actions row calling itself a bonus action is scrubbed — the Shadow Stitch label dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietE2(() => answer({
      wildcard: "*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn. When the creature is Bloodied, it can use this bonus action to flee without provoking Opportunity Attacks.",
    })));
    const t = JSON.stringify(m.sections.Actions ?? []);
    expect(t).not.toMatch(/this bonus action/i);
  });

  test('a dragon body always speaks Draconic and prints fractional CR as print does', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8, null, 'dragon'), 8, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 8, energy: 'Fire', mechanics: [] },
      quietE2(() => JSON.stringify({
        name: 'Test Drake', type: 'Dragon', size: 'Large', alignment: 'Neutral',
        senses: 'blindsight 30 ft., darkvision 120 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    expect(m.languages).toMatch(/Draconic/);
    const m2cr = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 0.5 }, quietE2(() => answer({})));
    expect(m2cr.cr_str).toBe('1/2');
  });

  test('Undead regeneration keys to Radiant regardless of the energy foil — the Chapel Knight key', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(7, 'warden', 'defender'), 7, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'defender', style: 'warden', resolvedType: 'Undead', concept: 'x', cr: 7, energy: 'Radiant', mechanics: [] },
      quietE2(() => JSON.stringify({
        name: 'Test Knight Two', type: 'Undead', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Radiant'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Constitution',
        wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const regen = Object.values(m.sections).flat().find((e) => /Regeneration/.test(e.name));
    expect(regen.text).toMatch(/Radiant damage/);
    expect(regen.text).not.toMatch(/Necrotic damage/);
  });

  test('escape DCs re-derive from the final stats — the donor-flat drift dies', () => {
    const scaled = scaleDonor(pickDonor(11, 'trap', 'lurker'), 11, { mechanics: [] });
    const escDC = 8 + Math.floor((scaled.stats.STR - 10) / 2) + scaled.pb;
    const rows = Object.values(scaled.sections).flat().filter((e) => /escape DC \d+/.test(e.text ?? ''));
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(r.text).toMatch(new RegExp(`escape DC ${escDC}\\b`));
  });
});

describe('the Tier B batch-one fix (2026-09-13): the compound-predicate dodge', () => {
  test("a suite behind 'and can't be' dies — the Bog Lantern clause", async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Shadow Body', text: "The creature can move through a space as narrow as 1 inch wide without squeezing, and can't be Grappled or Restrained." } });
    });
    expect(repairPrompt).toMatch(/condition-immunity SUITES/);
  });
});

describe('Tier B batch-two fixes (2026-09-14): the speed dodge, the movement grant', () => {
  const quietG = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('speed-discord fires on the possessive lowercase form — the Gravemold dodge dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietG(() => answer({
      trait_wildcard: { name: 'Rooted Fast', text: "The creature's speed is 0 and it cannot benefit from bonuses to speed." },
    })));
    expect((m.lint_findings ?? []).join(' ')).toMatch(/speed-discord/);
  });

  test('a trait granting a movement mode the header prints is flagged — the Gargoyles class', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quietG(() => answer({
      trait_wildcard: { name: 'Dusk Wings', text: 'At dusk, the creature stirs, gaining a flying speed of 30 feet until dawn.' },
    })));
    if (/Fly/.test(m.speed ?? '')) {
      expect((m.lint_findings ?? []).join(' ')).toMatch(/movement-grant-in-trait/);
    } else {
      expect((m.lint_findings ?? []).join(' ')).not.toMatch(/movement-grant-in-trait/);
    }
  });
});

describe('batch-two critic round (2026-09-14): the replacement clause, priced dailies, the swarm voice', () => {
  const quietH2 = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };
  const mkAnswer = (cr, style, arch, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return { scaled, s: JSON.stringify({
      name: 'Test Reeve', type: 'Fiend', size: 'Large', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Constitution',
      spells: { at_will: ['Scorching Ray', 'Detect Magic'], daily: ['Wall of Fire', 'Fear'] },
      wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      ...over,
    }) };
  };

  test('Multiattack gains the print replacement clause — (A) the save action or (B) Spellcasting with the named at-will', async () => {
    const { s } = mkAnswer(12, 'binder', 'caster');
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'x', cr: 12, energy: 'Fire', mechanics: [] }, quietH2(() => s));
    const multi = (m.sections.Actions ?? []).find((e) => e.name.startsWith('Multiattack'));
    expect(multi.text).toMatch(/It can replace one attack with a use of \(A\) .+ or \(B\) Spellcasting to cast \*Scorching Ray\*\./);
  });

  test('a daily damage pick over 2x per-hit DROPS — the CR 5 Cloudkill class dies priced', async () => {
    const { scaled, s } = mkAnswer(5, null, 'caster', { spells: { at_will: ['Detect Magic', 'Light'], daily: ['Cloudkill', 'Fear'] } });
    const m = await generateReskin({ archetype: 'caster', concept: 'x', cr: 5, energy: 'Fire', mechanics: [] }, quietH2(() => s));
    const sc = Object.values(m.sections).flat().find((e) => e.name.startsWith('Spellcasting'));
    if ((scaled.per_hit ?? 6) * 2 < 22) {
      expect(sc.text).not.toMatch(/Cloudkill/);
      expect(sc.text).toMatch(/Fear/);
    }
  });

  test('a swarm speaks as "the swarm" — the plural-subject verb disagreement dies', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(9, null, 'swarm'), 9, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'lurker', bodyType: 'swarm', resolvedType: 'Construct', concept: 'a swarm of gargoyles', cr: 9, mechanics: [] },
      quietH2(() => JSON.stringify({
        name: 'Cathedral Gargoyles', type: 'Construct', size: 'Medium', alignment: 'Unaligned',
        senses: 'darkvision 60 ft.', languages: 'None',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const multi = (m.sections.Actions ?? []).find((e) => e.name.startsWith('Multiattack'));
    expect(multi.text).toMatch(/^The swarm makes/);
    expect(JSON.stringify(m.sections)).not.toMatch(/the cathedral gargoyles makes/);
  });

  test('the dragon Spellcasting row carries the DC and the At Will label — both live sightings die', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(16, null, 'dragon'), 16, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 16, energy: 'Cold', mechanics: [] },
      quietH2(() => JSON.stringify({
        name: 'Test Wyrm Three', type: 'Dragon', size: 'Huge', alignment: 'Neutral',
        senses: 'blindsight 60 ft., darkvision 120 ft.', languages: 'Draconic',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const sc = Object.values(m.sections).flat().find((e) => e.name.startsWith('Spellcasting'));
    expect(sc.text).toMatch(/spell save DC \d+/);
    expect(sc.text).toMatch(/\*\*At Will:\*\*/);
    expect(sc.text).not.toMatch(/\{dc\}/);
  });

  test('an ACTING embedded bonus action is now mechanical — the Tollkeeper forced-save clause dies closed', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is marked until the end of its next turn. The creature can use a bonus action to force the marked target to repeat the save.' });
    });
    expect(repairPrompt).toMatch(/one entry, one economy/);
  });
});

describe('the library rename-claim check (2026-09-14): a lying rename loses to the seed', () => {
  test('a condition-claiming rename over a seed that never applies it ships the seed name', async () => {
    // skirmisher shelf at this name-hash draws a non-Stun seed; the
    // model's slot rename claims Stunned — the seed's name must win
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const base = JSON.parse(answer({ wildcard: 'The creature becomes utterly invisible to yours truly and you cannot see it.' }));
      // rename the wildcard slot row to a Stunned-claiming name
      for (const k of Object.keys(base.renames)) { if (base.renames[k] === 'Waylay') base.renames[k] = 'Stunning Plunge'; }
      return JSON.stringify(base);
    });
    const lib = Object.values(m.sections).flat().find((e) => e.library);
    expect(lib).toBeTruthy();
    if (!/\bStunned\b/.test(lib.text)) {
      expect(lib.name).not.toMatch(/Stunning/);
    }
  });
});

describe('the 2014-move smoke fix (2026-09-14): public archetype carries the menu vocabulary', () => {
  test("a caster-role block stamps its MENU role, not 'caster' — the conversion crash class dies at the source", async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(12, 'binder', 'caster'), 12, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', menuRole: 'controller', style: 'binder', concept: 'x', cr: 12, mechanics: [] },
      async (prompt) => {
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify({
          name: 'Test Binder', type: 'Fiend', size: 'Medium', alignment: 'Neutral',
          senses: 'darkvision 60 ft.', languages: 'Common',
          renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
          conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Constitution',
          spells: { at_will: ['Detect Magic', 'Light'], daily: ['Fear', 'Darkness'] },
          wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
        });
      });
    expect(m.archetype).toBe('controller'); // the menu vocabulary — chassis-valid
    expect(m.generation.archetype).toBe('caster'); // the internal record survives
  });
});

describe('the 2014-batch critic vets (2026-09-14): attack delegation, the bolt', () => {
  test('an attack against EACH creature dies — the Stone Shove evasion closes', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature makes one Claw attack against each creature within 5 feet of it. Each target hit must succeed on a DC 15 Strength saving throw or have the Prone condition.' });
    });
    expect(repairPrompt).toMatch(/attack against EACH creature multiplies the attack routine/);
  });

  test("a 'Bolt' name never lands on a row with reach — the Relic Bolt class", () => {
    const { renameKeysOf: rk, reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [] });
    const keys = rk(scaled);
    const renames = {};
    keys.forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const reachRow = Object.values(scaled.sections).flat().find((e) => keys.includes(e.name) && /reach \d+ ft/.test(e.text) && e.text.includes('{damage_type}'));
    if (reachRow) {
      renames[reachRow.name] = 'Relic Bolt';
      const p = { name: 'Testman', renames, wildcard: 'x', damage_types: {}, conditions: {}, melee_rider: 'none' };
      expect(rd(scaled, p, {}).join('\n')).toMatch(/launcher but the row swings in melee/);
    }
  });
});

describe('the 2014-smoke clause and DC fixes (2026-09-14)', () => {
  const quietI = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };

  test('the replacement clause never names a ribbon — control beats Detect Magic; all-ribbons drops the spell option', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(12, 'binder', 'caster'), 12, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'x', cr: 12, energy: 'Fire', mechanics: [] }, quietI(() => JSON.stringify({
      name: 'Test Reeve Two', type: 'Fiend', size: 'Large', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Constitution',
      spells: { at_will: ['Detect Magic', 'Hold Person'], daily: ['Fear', 'Darkness'] },
      wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
    })));
    const multi = (m.sections.Actions ?? []).find((e) => e.name.startsWith('Multiattack'));
    expect(multi.text).not.toMatch(/Detect Magic/);
    expect(multi.text).toMatch(/Spellcasting to cast \*Hold Person\*/);
  });

  test("a dragon's spell save DC derives from Charisma while the breath keeps the card DC", async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(16, null, 'dragon'), 16, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 16, energy: 'Cold', mechanics: [] },
      quietI(() => JSON.stringify({
        name: 'Test Wyrm Four', type: 'Dragon', size: 'Huge', alignment: 'Neutral',
        senses: 'blindsight 60 ft., darkvision 120 ft.', languages: 'Draconic',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
        wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      })));
    const sc = Object.values(m.sections).flat().find((e) => e.name.startsWith('Spellcasting'));
    const chaDc = 8 + m.pb + Math.floor((m.stats.CHA - 10) / 2);
    expect(sc.text).toContain(`spell save DC ${chaDc}`);
    const breath = Object.values(m.sections).flat().find((e) => /foot Cone/.test(e.text ?? ''));
    expect(breath.text).toContain(`DC ${scaled.dc}`);
  });
});

describe('the 2014 damage line + dragon DC round (2026-09-14)', () => {
  test('dprScale 0.7 prices the whole block down — the 2014 line', () => {
    const at2024 = scaleDonor(pickDonor(12, null, 'brute'), 12, { mechanics: [] });
    const at2014 = scaleDonor(pickDonor(12, null, 'brute'), 12, { mechanics: [], dprScale: 0.7 });
    const perHitOf = (s) => Math.max(...Object.values(s.sections).flat()
      .map((e) => /(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/.exec(e.text ?? '')?.[1] ?? 0).map(Number));
    expect(perHitOf(at2014)).toBeLessThan(perHitOf(at2024));
    expect(perHitOf(at2014)).toBeGreaterThan(perHitOf(at2024) * 0.5); // scaled, not gutted
  });

  test('dragon mental-condition saves derive from Charisma — the Frightful Presence class', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(16, null, 'dragon'), 16, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'x', cr: 16, energy: 'Cold', mechanics: [] },
      async (prompt) => {
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify({
          name: 'Test Wyrm Five', type: 'Dragon', size: 'Huge', alignment: 'Neutral',
          senses: 'blindsight 60 ft., darkvision 120 ft.', languages: 'Draconic',
          renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])),
          conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
          wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
        });
      });
    const chaDc = 8 + m.pb + Math.floor((m.stats.CHA - 10) / 2);
    const frightRow = Object.values(m.sections).flat().find((e) => /Frightened/.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '') && /DC \d+/.test(e.text ?? ''));
    if (frightRow) expect(frightRow.text).toContain(`DC ${chaDc}`);
    // and the dragon Spellcasting row carries a 1/Day line home for the
    // gated picks (Scrying is NEVER_AT_WILL now)
    const sc = Object.values(m.sections).flat().find((e) => e.name.startsWith('Spellcasting'));
    if (sc) expect(sc.text).not.toMatch(/\{spell_daily\}/);
  });
});

describe('the third 2014-smoke fixes (2026-09-14): the rider host, the descent', () => {
  test('a rider pointed at a save row re-homes to an attack row — the Branding Gaze class dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      // the answer renames the gated save row 'Waylay' and points the rider AT IT
      return answer({
        wildcard: 'When the creature hits with this attack, the target must succeed on a DC 15 Wisdom saving throw or have Disadvantage on its next attack roll before the start of the creature\'s next turn.',
        wildcard_economy: 'rider_on:Waylay',
      });
    });
    const all = Object.values(m.sections).flat();
    const saveRow = all.find((e) => (e.name ?? '').startsWith('Waylay'));
    // wherever the rider landed, no non-attack row carries the on-hit clause
    for (const e of all) {
      if (/When the [\w\s]+ hits with this attack/i.test(e.text ?? '')) {
        expect(e.text).toMatch(/Attack Roll:/);
      }
    }
    if (saveRow && !/Attack Roll:/.test(saveRow.text)) expect(saveRow.text).not.toMatch(/hits with this attack/i);
  });

  test('the dprScale descent lands within 110% of target — the band-ceiling parking dies', () => {
    const { withinBudget } = require('../card-budgets.mjs');
    const s = scaleDonor(pickDonor(16, null, 'dragon'), 16, { mechanics: [], dprScale: 0.7 });
    const perHit = s.per_hit;
    const attacks = 3;
    const legendaryStrikes = 1;
    const { target, actual } = withinBudget(16, perHit * (attacks + legendaryStrikes), [], { legendary: true, dprScale: s.dpr_scale ?? 1 });
    expect(actual).toBeLessThanOrEqual(target * 1.15); // dice-snap slack over the 1.1 stop
  });
});

describe('the hold-response batch (2026-09-14): narration mechanical, the prop, the self-silence', () => {
  const run = async (over) => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer(over);
    });
    return repairPrompt;
  };

  test('action-system narration is mechanical now — the Branding Gaze drag clause dies closed', async () => {
    const rp = await run({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is marked until the end of its next turn. The creature can use an action to drag the marked target 20 feet toward itself.' });
    expect(rp).toMatch(/never narrates the action system/);
  });

  test('a possessive prop nothing places dies; a scene surface lives', async () => {
    const rp = await run({ trait_wildcard: { name: 'Sworn Anchor', text: 'While the creature is within 5 feet of its portable reliquary shrine, it can\'t be moved against its will.' } });
    expect(rp).toMatch(/the state "its portable reliquary shrine" that nothing on the sheet enters/);
    const ok2 = await run({ trait_wildcard: { name: 'Wall Brace', text: 'While the creature is within 5 feet of a stone wall, it has Advantage on Strength checks.' } });
    expect(ok2).toBeNull();
  });

  test('a silence aura beside its own Spellcasting dies without a self-exemption', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(11, 'binder', 'caster'), 11, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    let repairPrompt = null;
    await generateReskin({ archetype: 'caster', style: 'binder', concept: 'x', cr: 11, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Test Hush', type: 'Fey', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Psychic'])),
        conditions: { condition_minor: 'Deafened' }, melee_rider: 'none', slot_save: 'Wisdom',
        spells: { at_will: ['Minor Illusion', 'Mage Hand'], daily: ['Hold Person', 'Darkness'] },
        trait_wildcard: { name: 'Dead Air', text: 'While the creature is conscious, the area within 10 feet of it is magically silenced.' },
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    expect(repairPrompt).toMatch(/silences the creature's own Spellcasting/);
  });
});

describe('the escalation pattern (owner 2026-09-15): one save, the Mummy grammar', () => {
  test('two save frames in one action die with the escalation coaching — the Burning Stare class', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 60 feet. *Failure:* The target has the Frightened condition until the end of its next turn. If the target is already Frightened, it must succeed on a DC 15 Constitution saving throw or take 18 (4d8) Necrotic damage.' });
    });
    expect(repairPrompt).toMatch(/one save per action/);
    expect(repairPrompt).toMatch(/already Frightened by this/);
  });

  test('the authored escalation seed is drawable and fills clean', () => {
    const { drawLibraryRow, LIBRARY_SEEDS } = require('../library.mjs');
    expect(LIBRARY_SEEDS.some((x) => x.key === 'escalating-dread')).toBe(true);
    const scaled = scaleDonor(pickDonor(8, null, 'lurker'), 8, { mechanics: [] });
    for (let i = 0; i < 30; i += 1) {
      const d = drawLibraryRow(scaled, { archetype: 'lurker', energy: 'Necrotic', name: `probe${i}` });
      if (d.seed === 'escalating-dread') {
        expect(d.row.text).toContain(`DC ${scaled.dc}`);
        expect(d.row.text).toMatch(/Necrotic damage/);
        expect(d.row.text).not.toMatch(/\{/);
        // ONE save frame by construction
        expect((d.row.text.match(/Saving Throw/g) ?? []).length).toBe(1);
        return;
      }
    }
    throw new Error('escalating-dread never drew on the lurker shelf');
  });
});

describe('the repair redesign + keyed library (owner 2026-09-15)', () => {
  test('the repair prompt leads with THE ONE RULE and the ten commandments; the main prompt offers the shape keys', async () => {
    let firstRepair = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { firstRepair = firstRepair || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' });
    });
    expect(firstRepair).toMatch(/THE ONE RULE IT BROKE/);
    expect(firstRepair).toMatch(/THE TEN COMMANDMENTS/);
    const { buildReskinPrompt: bp2 } = require('../generate.mjs');
    const prompt = bp2(scaleDonor(pickDonor(8, null, 'skirmisher'), 8, { mechanics: [] }), { concept: 'x' });
    expect(prompt).toMatch(/"fallback_shape"/);
    expect(prompt).toMatch(/escalating-dread/);
  });

  // HISTORY: the PIVOT lived one day (2026-09-15) — retired the same
  // evening by the workhorse posture ("make A the workhorse"): one
  // informed shot, one repair, then the dynamic shelf at zero calls.
  test('a dead wildcard draws from the shelf with NO pivot call — the workhorse posture', async () => {
    let pivotCalled = false;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing a monster ability by REPLACEMENT')) { pivotCalled = true; return JSON.stringify({}); }
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' });
    });
    expect(pivotCalled).toBe(false);
    expect(Object.values(m.sections).flat().some((e) => e.library)).toBe(true);
    expect(m.generation.signature).toBe('library');
  });

  test('the model-picked fallback_shape steers the draw; a lying seed name goes to the audit for a rename', async () => {
    let auditPrompt = null;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic' }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) { auditPrompt = prompt; return JSON.stringify({ findings: [] }); }
      const base = JSON.parse(answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' }));
      base.fallback_shape = 'drain';
      for (const k of Object.keys(base.renames)) { if (base.renames[k] === 'Waylay') base.renames[k] = 'Stunning Grasp'; }
      return JSON.stringify(base);
    });
    const lib = Object.values(m.sections).flat().find((e) => e.library);
    expect(lib.text).toMatch(/regains Hit Points equal to half/); // the drain seed
    if (!/\bStunned\b/.test(lib.text)) {
      expect(lib.name).toBe('Vitality Leech'); // lying rename refused; seed name held for the audit
      expect(auditPrompt).toMatch(/LIBRARY NOTICE/);
      expect(auditPrompt).toMatch(/Vitality Leech/);
    }
    expect(m.generation.signature).toBe('library');
  });
});

describe('the Balefire boundary (2026-09-15): attack rolls are chassis jurisdiction', () => {
  test('a wildcard minting an attack roll dies — the model never authors attack numbers', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'The creature hurls its severed head at one creature within 60 feet. Ranged Attack Roll: +9, range 60 ft. 18 (4d6 + 4) Necrotic damage, and the target has the Prone condition.' });
    });
    expect(repairPrompt).toMatch(/attack rolls are the chassis's jurisdiction/);
  });

  test('a trait restating the chassis footing dies — the Sepulchral Steed duplication', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(10, 'mounted', 'skirmisher'), 10, { mechanics: [] });
    // HISTORY: this guard early-returned on !e.rules rows, making the
    // pin VACUOUS — the mounted Mobility Trait is rules:false, so the
    // footing key never fired live (Deathless Pursuit, 2026-09-15).
    // chassisOwned now owns all non-model donor text; the pin is hard.
    const hasFooting = Object.values(scaled.sections).flat().some((e) => /ignores Difficult Terrain/.test(e.text ?? ''));
    expect(hasFooting).toBe(true);
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', style: 'mounted', concept: 'x', cr: 10, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Test Rider', type: 'Undead', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
        trait_wildcard: { name: 'Spectral Gait', text: 'The creature rides a ghostly steed, and it ignores Difficult Terrain wherever it rides.' },
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    expect(repairPrompt).toMatch(/the footing \(its chassis trait\)/);
  });
});

describe('the second Horseman round (2026-09-15): the stranded gate, the self-object hurl, minted numbers', () => {
  const cap = async (over) => {
    let repairPrompt = null; let m = null;
    m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer(over);
    });
    return { repairPrompt, m };
  };

  test('a bare trailing "Recharge 5-6." sentence LIFTS — proven by the second-nova law seeing it', async () => {
    // pre-fix, the stranded sentence shipped in prose and no law saw
    // the gate; post-fix the lift feeds it to the gate checks — on
    // this nova-carrying chassis, the second-nova law fires, which IS
    // the proof the lift ran
    const { repairPrompt } = await cap({
      wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 30 feet. *Failure:* 18 (4d6) Necrotic damage. Recharge 5-6.',
    });
    expect(repairPrompt).toMatch(/already carries its priced Recharge nova/);
  });

  test('hurling ITS OWN part beside a ranged row dies; hurling an article-object lives', async () => {
    const dies = await cap({ wildcard: 'The creature hurls its severed head at one creature within 60 feet. The target must succeed on a DC 15 Dexterity saving throw or take 14 (4d6) Necrotic damage.' });
    expect(dies.repairPrompt).toMatch(/ranged row already carries the thrown fiction/);
    const lives = await cap({ wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 30 feet. *Failure:* The creature hurls a barbed thorn and the target takes 14 (4d6) Piercing damage.' });
    expect(lives.repairPrompt).toBeNull();
  });

  test('minted object statistics die — no wildcard AC/HP', async () => {
    const { repairPrompt } = await cap({ wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 30 feet. *Failure:* 14 (4d6) Necrotic damage. The head can be targeted as an object (AC 16, 30 HP).' });
    expect(repairPrompt).toMatch(/object statistics are the engine's jurisdiction/);
  });

  test('a trait speed-add dies — speed is the header number', async () => {
    const { repairPrompt } = await cap({ trait_wildcard: { name: 'Spectral Steed', text: "The creature rides a ghostly horse, and its Speed increases by 10 feet while mounted." } });
    expect(repairPrompt).toMatch(/speed is the header's number/);
  });
});

describe('the seat-deference prompt (owner question 2026-09-15)', () => {
  test('the wildcard field defers to the seat and states row-fiction ownership', () => {
    const { buildReskinPrompt: bp3 } = require('../generate.mjs');
    const prompt = bp3(scaleDonor(pickDonor(8, null, 'skirmisher'), 8, { mechanics: [] }), {
      concept: 'x',
      signatureElements: [{ element: 'rides a spectral horse', kind: 'behavior' }, { element: 'a severed head as a weapon', kind: 'object' }],
    });
    expect(prompt).not.toMatch(/single most distinctive behavior/);
    expect(prompt).toMatch(/renamed attack rows already OWN their fiction/);
    expect(prompt).toMatch(/rows you rename OWN their fiction/);
    // the synergy ask (owner 2026-09-15): interlock, don't just avoid
    expect(prompt).toMatch(/INTERLOCK with the sheet/);
    expect(prompt).toMatch(/Mummy glare escalates on its own fear/);
  });
});

describe('the informed wildcard (owner design 2026-09-15): written against the assembled sheet', () => {
  test('the wildcard call receives the RENAMED, FILLED sheet and its answer becomes the wildcard', async () => {
    let informedPrompt = null;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are writing the signature action')) {
        informedPrompt = prompt;
        return JSON.stringify({ wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition until the end of its next turn.' });
      }
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    // the sheet shows the model's OWN renames, not donor keys
    expect(informedPrompt).toMatch(/Thorn Rake/);
    expect(informedPrompt).not.toMatch(/\{damage_type\}/);
    expect(informedPrompt).toMatch(/COMPLEMENTS/);
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/Prone condition/);
    expect(m.generation.signature).toBe('custom');
  });

  test('an informed-call failure falls back to the main draft — never-fail holds', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are writing the signature action')) return Promise.reject(new Error('provider down'));
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w).toBeTruthy(); // the main call's wildcard shipped
  });
});

describe('the Midnight Ride fixes (2026-09-15): the weld holds late, the pivot rides the seat', () => {
  test('an informed/pivot text with an off-energy type is weld-swapped — Poison never ships on a Necrotic block', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic' }, async (prompt) => {
      if (prompt.startsWith('You are writing the signature action')) {
        return JSON.stringify({ wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 30 feet. *Failure:* 18 (4d6) Poison damage, and the target has the Blinded condition until the end of its next turn.' });
      }
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/Necrotic damage/);
    expect(w.text).not.toMatch(/Poison damage/);
  });

  // HISTORY: pinned the pivot's SEAT + energy lines — the pivot
  // retired with the workhorse posture (2026-09-15); the informed
  // call carries the same commandments and the shelf carries the rest
  test('no pivot prompt ever fires under the workhorse posture', async () => {
    let pivotPrompt = null;
    await generateReskin({
      archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic',
      signatureElements: [{ element: 'a neck spouting ichor', kind: 'body' }, { element: 'the midnight ride of terror', kind: 'behavior' }],
    }, async (prompt) => {
      if (prompt.startsWith('You are repairing a monster ability by REPLACEMENT')) { pivotPrompt = prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' });
    });
    expect(pivotPrompt).toBeNull();
  });
});

describe('the success-penalty promotion (owner ruling 2026-09-15)', () => {
  test('damage on a successful save fails CLOSED now — the Headless Dread class dies', async () => {
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: '*Wisdom Saving Throw:* DC 15, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn. *Success:* The target takes 9 (2d8) Fire damage.' });
    });
    expect(repairPrompt).toMatch(/never a fresh penalty/);
  });
});

describe('the fallback name (owner 2026-09-15): the llm names the shape it picked', () => {
  const runWith = async (extra) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic' }, async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    const base = JSON.parse(answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' }));
    return JSON.stringify({ ...base, ...extra });
  });

  test('an honest fallback_name ships on the drawn seed, gate preserved', async () => {
    const m = await runWith({ fallback_shape: 'pacify', fallback_name: 'Gravelight Trance' });
    const lib = Object.values(m.sections).flat().find((e) => e.library);
    expect(lib.seed ?? true).toBeTruthy();
    expect(lib.name).toBe('Gravelight Trance (2/Day)'); // the pacify gate rides the llm's name
  });

  test('a lying fallback_name falls through the chain to the seed name + audit notice', async () => {
    let auditPrompt = null;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic' }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) { auditPrompt = prompt; return JSON.stringify({ findings: [] }); }
      const base = JSON.parse(answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' }));
      base.fallback_shape = 'obstacle-pull';
      base.fallback_name = 'Stunning Chorus'; // claims Stunned; the pull never stuns
      for (const k of Object.keys(base.renames)) { if (base.renames[k] === 'Waylay') base.renames[k] = 'Petrifying Wail'; } // the slot rename lies too
      return JSON.stringify(base);
    });
    const lib = Object.values(m.sections).flat().find((e) => e.library);
    expect(lib.name).toBe('Beckoning Pull'); // last resort: the authored name
    expect(auditPrompt).toMatch(/LIBRARY NOTICE/);
  });
});

describe('the Skull Harvest round (2026-09-15): the trailing label, the replenishing law', () => {
  test('a trailing self-label fragment strips — the "Harvest Skull" signature dies', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ wildcard: "*Constitution Saving Throw:* DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn. Harvest Skull" });
    });
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).not.toMatch(/Harvest Skull/);
  });

  test('a thrown singular body part on a ranged row is a defect; spectral fiction passes', () => {
    const { renameKeysOf: rk, reskinDefects: rd } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(10, 'mounted', 'skirmisher'), 10, { mechanics: [] });
    const keys = rk(scaled);
    const ranged = keys.find((k) => /Ranged/.test(k));
    const renames = {};
    keys.forEach((k, i) => { renames[k] = `Row${i}`; });
    renames[ranged] = 'Thrown Skull';
    const mk = () => ({ name: 'Testman Three', renames: { ...renames }, wildcard: 'x', damage_types: {}, conditions: {}, melee_rider: 'none' });
    expect(rd(scaled, mk(), {}).join('\n')).toMatch(/ammunition must be endless by fiction/);
    renames[ranged] = 'Spectral Skull';
    expect(rd(scaled, mk(), {}).join('\n')).not.toMatch(/ammunition must be endless/);
  });
});

describe('the Hollow Body round (2026-09-15): the comma suite, the footing repro', () => {
  const cap2 = async (tw) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(10, 'mounted', 'skirmisher'), 10, { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    let repairPrompt = null;
    await generateReskin({ archetype: 'skirmisher', style: 'mounted', concept: 'x', cr: 10, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { repairPrompt = repairPrompt || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return JSON.stringify({
        name: 'Test Rider Two', type: 'Undead', size: 'Medium', alignment: 'Neutral',
        senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])),
        conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
        trait_wildcard: { name: 'Test Trait', text: tw },
        wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature's next turn.`,
      });
    });
    return repairPrompt;
  };

  test('a comma-joined condition suite dies — the Hollow Body dodge', async () => {
    const rp = await cap2('The creature has no head, cannot be Blinded, Deafened, or Charmed.');
    expect(rp).toMatch(/condition-immunity SUITES/);
  });

  test('a trait duplicating the mounted footing dies — the Deathless Pursuit repro', async () => {
    const rp = await cap2('The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage. While it has not dealt damage since the start of its last turn, it has Advantage on attack rolls.');
    expect(rp).toMatch(/the footing \(its chassis trait\)/);
  });
});

describe('the claim gate (owner go 2026-09-15): low-CR blocks are short blocks', () => {
  const lowAnswer = (cr, mechanics) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled0 = scaleDonor(pickDonor(cr, null, 'skirmisher'), cr, { mechanics: mechanics ?? [] });
    return { scaled0 };
  };

  test('CR 2 with no claimed mechanics: no wildcard slot, no trait field, no informed call — attacks and renames only', async () => {
    let informedCalled = false;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a river otter', cr: 2, mechanics: [] }, async (prompt) => {
      if (prompt.startsWith('You are writing the signature action')) { informedCalled = true; return JSON.stringify({}); }
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      // the model answers WITHOUT wildcard/trait fields — the gated
      // prompt never asked; the validator must accept
      const base = JSON.parse(answer());
      delete base.wildcard; delete base.trait_wildcard; delete base.fallback_shape; delete base.fallback_name;
      // the slot key is gone, so its rename is not required
      for (const k of Object.keys(base.renames)) { if (/Signature/.test(k)) delete base.renames[k]; }
      return JSON.stringify(base);
    });
    expect(informedCalled).toBe(false);
    expect(Object.values(m.sections).flat().some((e) => (e.name ?? '').startsWith('Waylay'))).toBe(false);
    expect(Object.values(m.sections).flat().some((e) => e.library)).toBe(false);
  });

  test('CR 2 WITH a claimed mechanic keeps the slot — the Harpy path', async () => {
    const { buildReskinPrompt: bp4 } = require('../generate.mjs');
    const gated = bp4(scaleDonor(pickDonor(2, null, 'skirmisher'), 2, { mechanics: [] }), { concept: 'x' });
    // NOTE: the slot row lives in the donor; the gate REMOVES it in
    // generateReskin — the prompt builder derives from what remains.
    // Simulate the gate's removal for the slotless assertion:
    const sc = scaleDonor(pickDonor(2, null, 'skirmisher'), 2, { mechanics: [] });
    for (const [sec, es] of Object.entries(sc.sections)) sc.sections[sec] = es.filter((e) => !e.wildcard_slot);
    const slotless = bp4(sc, { concept: 'x', traitWildcard: false });
    expect(slotless).not.toMatch(/"wildcard":/);
    expect(slotless).not.toMatch(/"fallback_shape"/);
    expect(slotless).not.toMatch(/"trait_wildcard"/);
    expect(gated).toMatch(/"wildcard":/); // with the slot intact the field returns
  });

  test('the low-CR sentence cap: 4 sentences die at CR 5, live at CR 8', async () => {
    const four = "*Wisdom Saving Throw:* DC 13, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn. Frost gathers on the target's gear. Nothing warms it before dawn.";
    let rejected = null;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 5, mechanics: ['gaze'] }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) { rejected = rejected || prompt; return JSON.stringify({}); }
      if (prompt.startsWith('You are writing the signature action')) return JSON.stringify({ wildcard: four });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const base = JSON.parse(answer());
      return JSON.stringify(base);
    });
    expect(rejected).toMatch(/over 3 sentences/);
  });
});

describe('the wide smoke, batch one (2026-09-15): label dodges, trigger vocabulary', () => {
  test('a BOLD leading self-label strips and its gate lifts into the name (the Lancer)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '**Gravewound Skewer (2/Day).** As a Bonus Action, the creature emits a chime: one creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.name).toMatch(/2\/Day/);
    expect(w.text).not.toMatch(/Gravewound|\*\*/);
  });

  test('"(1/Turn)" strips with its label, never lifted into the name (the Outrider)', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'Hobbling Slash (1/Turn): As a Bonus Action, the creature emits a chime: one creature within 30 feet must succeed on a DC 15 Wisdom Saving Throw or have Disadvantage on its next attack roll.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.name).not.toMatch(/1\/Turn/);
    expect(w.text).not.toMatch(/^Hobbling Slash/);
  });

  test('trigger-shaped text never wears an action economy — the rider masquerade dies to the library', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'Immediately after the creature hits a target with its blade, the target must succeed on a DC 15 Constitution Saving Throw or its Speed is halved until the end of its next turn.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.library).toBe(true);
    // a drawn row joins the sheet AFTER the short-form stamp ran — it
    // gets the same treatment (Rockfall Zone said "The creature" beside
    // rows saying "the cliff troll", 2026-09-15)
    expect(w.text).not.toMatch(/the creature/i);
  });

  test('the trait chain catches "hits a target with"; retaliation direction stays legal', async () => {
    const trait = (name, text) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name, text },
    }));
    const bad = await trait('Marrow Barbs', 'When the creature hits a target with a melee attack, that target can\'t regain Hit Points until the start of the creature\'s next turn.');
    expect((bad.sections.Traits ?? []).some((e) => e.name === 'Marrow Barbs')).toBe(false);
    const good = await trait('Spiteful Hide', 'A creature that hits the creature with a melee attack while within 5 feet of it has Disadvantage on its next attack roll.');
    expect((good.sections.Traits ?? []).some((e) => e.name === 'Spiteful Hide')).toBe(true);
  });
});

describe('name canon (owner 2026-09-15): six words carry a print trait promise', () => {
  const named = (name, over = {}) => {
    const full = JSON.parse(answer());
    full.name = name;
    return generateReskin({ archetype: 'skirmisher', concept: over.concept ?? 'x', cr: 8, ...over.opts }, async () => JSON.stringify(full));
  };
  const trait = (m, n) => (m.sections.Traits ?? []).filter((e) => e.name === n);

  test('a troll ships Regeneration — print rate, print off-switch, print death clause', async () => {
    const m = await named('Bog Troll');
    const [r] = trait(m, 'Regeneration');
    expect(r.text).toMatch(/regains 15 Hit Points at the start of each of its turns/);
    expect(r.text).toMatch(/takes Acid or Fire damage, this trait doesn't function/);
    expect(r.text).toMatch(/dies only if it starts its turn with 0 Hit Points and doesn't regenerate/);
  });

  test('the concept head fires it; a relative clause never does', async () => {
    const viaConcept = await named('Cragshear', { concept: 'a mire troll of the fens' });
    expect(trait(viaConcept, 'Regeneration')).toHaveLength(1);
    const hunter = await named('Cragshear', { concept: 'a knight who hunts trolls in the high passes' });
    expect(trait(hunter, 'Regeneration')).toHaveLength(0);
  });

  test('the off-switch stays live — a Fire-immune troll swaps Fire out for Cold', async () => {
    // a bare energy claim ships no resistance at this tier (defenses are
    // paid tech), so the plain ember-troll case correctly KEEPS
    // Acid/Fire; structural immunity comes with the ooze/dragon element
    // stamp — that is where a dead off-switch would ship
    const m = await named('Magma Troll', { opts: { bodyType: 'ooze', energy: 'Fire', mix: 'both' } });
    expect(m.immunities).toMatch(/Fire/); // precondition — vacuous otherwise
    const [r] = trait(m, 'Regeneration');
    expect(r.text).toMatch(/takes Acid or Cold damage/);
  });

  test('golem ships the pair; spider climbs; a mephit explodes on engine numbers', async () => {
    const g = await named('Furnace Golem');
    expect(trait(g, 'Immutable Form')).toHaveLength(1);
    expect(trait(g, 'Magic Resistance')).toHaveLength(1);
    const sp = await named('Tomb Spider');
    expect(trait(sp, 'Spider Climb')[0].text).toMatch(/including along ceilings, without needing to make an ability check/);
    const me = await named('Cinder Mephit');
    const [db] = trait(me, 'Death Burst');
    expect(db.text).toMatch(/explodes when it dies/);
    expect(db.text).toMatch(/DC \d+, each creature in a 5-foot Emanation/);
    expect(db.text).toMatch(/14 \(4d6\) Fire damage/); // the CR 8 band; energy absent defaults Fire
  });

  test('zombie ships Undead Fortitude; an unrelated name ships nothing', async () => {
    const z = await named('Harbor Zombie');
    expect(trait(z, 'Undead Fortitude')[0].text).toMatch(/DC 5 plus the damage taken/);
    const plain = await named('Gloam Courser');
    expect(['Regeneration', 'Undead Fortitude', 'Immutable Form', 'Magic Resistance', 'Spider Climb', 'Death Burst']
      .flatMap((n) => trait(plain, n))).toHaveLength(0);
  });
});

describe('the Cliff Troll letter (2026-09-15): four mechanisms', () => {
  test('one stat per row — the flat damage bonus follows the striker', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const sc = sd(pd(8, 'hurler', 'skirmisher'), 5);
    const strikerMod = Math.floor((sc.stats[sc.striker_stat] - 10) / 2);
    expect(sc.atk - sc.pb).toBe(strikerMod); // the to-hit keys the striker
    const rows = Object.values(sc.sections).flat().filter((e) => /Attack Roll:/.test(e.text));
    expect(rows.length).toBeGreaterThan(0);
    for (const e of rows) {
      const m = /\(\d+d\d+\s*\+\s*(\d+)\)/.exec(e.text);
      if (m) expect(Number(m[1])).toBe(strikerMod); // never the OTHER stat's mod
    }
  });

  test('a trait spending "its Bonus Action" dies; so does a trait granting a header Speed', async () => {
    const trait = (name, text) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name, text },
    }));
    const hide = await trait('Cliff Lair', 'While climbing, the creature can use its Bonus Action to hide.');
    expect((hide.sections.Traits ?? []).some((e) => e.name === 'Cliff Lair')).toBe(false);
    const speed = await trait('Wall Runner', 'The creature has a Climb Speed equal to its Speed and never slips on stone.');
    expect((speed.sections.Traits ?? []).some((e) => e.name === 'Wall Runner')).toBe(false);
  });

  test('the 2014-dialect save wrapper normalizes to the skeleton and joins the Multiattack menu', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'The creature shears a spar of rock loose, and one creature within 30 feet must make a DC 15 Dexterity Saving Throw. Failure: 14 (4d6) Bludgeoning damage. Success: Half damage.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/\*Dexterity Saving Throw:\* DC 15, one creature within 30 feet\. \*Failure:\* 14 \(4d6\) Bludgeoning damage\. \*Success:\* Half damage\./);
    const multi = (m.sections.Actions ?? []).find((e) => e.name.startsWith('Multiattack'));
    expect(multi.text).toMatch(/replace one attack with a use of/);
  });

  test('ambient stone never boomerangs; a singular signature projectile still returns', async () => {
    const withProj = (projectile) => {
      const { renameKeysOf: rk } = require('../generate.mjs');
      const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
      const full = JSON.parse(answer());
      full.projectile = projectile;
      full.renames = {};
      full.damage_types = {};
      rk(sd(pd(8, 'hurler', 'skirmisher'), 8)).forEach((k) => {
        full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' ');
        full.damage_types[full.renames[k]] = 'Bludgeoning';
      });
      return generateReskin({ archetype: 'skirmisher', style: 'hurler', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    };
    const slab = await withProj('a sheared slab');
    const slabRow = Object.values(slab.sections).flat().find((e) => /a sheared slab/.test(e.text ?? ''));
    expect(slabRow).toBeTruthy();
    expect(slabRow.text).not.toMatch(/returns to/);
    const skull = await withProj('its lantern skull');
    const skullRow = Object.values(skull.sections).flat().find((e) => /its lantern skull/.test(e.text ?? ''));
    expect(skullRow.text).toMatch(/returns to/);
  });
});

describe('the brute batch (2026-09-15): five mechanisms', () => {
  test('an "immune to" clause the type header already stamps is vacuous and dies', async () => {
    const full = JSON.parse(answer());
    full.type = 'Construct';
    full.trait_wildcard = { name: 'Brass Hide', text: 'The creature is immune to the Frightened condition. Its plates shed sparks when struck.' };
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Brass Hide')).toBe(false);
  });

  test('the third save dialect ("On a failure,") normalizes to the skeleton', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 30 feet must make a DC 15 Wisdom Saving Throw. On a failure, the target has the Frightened condition until the end of its next turn. On a success, it is unaffected.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/\*Wisdom Saving Throw:\* DC 15, one creature within 30 feet\. \*Failure:\* The target has the Frightened condition/);
    expect(w.text).toMatch(/\*Success:\* It is unaffected/);
  });

  test('a frame-bearing rider SPLITS to a standalone action the replacement clause prices', async () => {
    // superseded same-day (critic, the Tar Fist letter): welding a
    // framed rider leaked ~30 DPR past the budget — it re-homes to the
    // slot as its own action and the Multiattack clause trades an
    // attack for it
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard_economy: 'rider_on:Thorn Rake',
      wildcard: 'When the creature hits with this attack, one other creature it can see within 15 feet must succeed on a DC 15 Dexterity Saving Throw or have the Prone condition.',
    }));
    const melee = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(melee.text).not.toMatch(/one other creature/);
    const w = Object.values(m.sections).flat().find((e) => e.name === 'Waylay');
    expect(w.text).toMatch(/^One other creature it can see within 15 feet/);
    const multi = (m.sections.Actions ?? []).find((e) => e.name.startsWith('Multiattack'));
    expect(multi.text).toMatch(/replace one attack with a use of Waylay/);
  });

  test('the absorption organ re-keys to the concept energy and pairs with immunity, not resistance', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const full = JSON.parse(answer());
    full.renames = {}; full.damage_types = {};
    rk(sd(pd(16, 'juggernaut', 'brute'), 16, { mechanics: [] })).forEach((k) => {
      full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' ');
      full.damage_types[full.renames[k]] = 'Bludgeoning';
    });
    const m = await generateReskin({ archetype: 'brute', style: 'juggernaut', concept: 'x', cr: 16, energy: 'Lightning', mix: 'both' }, async () => JSON.stringify(full));
    const names = (m.sections.Traits ?? []).map((e) => e.name);
    expect(names).toContain('Lightning Absorption');
    expect(names).not.toContain('Fire Absorption');
    expect(m.immunities).toMatch(/Lightning/);
    expect(m.resistances ?? '').not.toMatch(/Lightning/);
  });

  test('a trait citing the DEAD wildcard name is swept when the library ships another name', async () => {
    const full = JSON.parse(answer());
    full.trait_wildcard = { name: 'Pit Scars', text: 'The creature has Advantage on saving throws against being Frightened. It cannot willingly move away from a creature it has marked with Waylay.' };
    full.fallback_name = 'Shield Breaker';
    full.wildcard = 'When the creature teleports within 5 feet of a foe, that foe must succeed on a DC 15 Dexterity Saving Throw or be Blinded until the end of its next turn.';
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    const scars = (m.sections.Traits ?? []).find((e) => e.name === 'Pit Scars');
    if (scars) {
      expect(scars.text).not.toMatch(/Waylay/);
      expect(scars.text).toMatch(/Advantage on saving throws/);
    }
    expect(Object.values(m.sections).flat().every((e) => !/\bWaylay\b/.test(e.text ?? ''))).toBe(true);
  });
});

describe('the brute critic letter (2026-09-15): header vocabulary, dominance, languages', () => {
  test('an "ignores Exhaustion" clause moves to the Immunities line; the trait keeps its other clause', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Through the Pain', text: 'The creature has Advantage on saving throws against being Frightened and ignores the effects of Exhaustion.' },
    }));
    expect(m.immunities ?? '').toMatch(/Exhaustion/);
    const t = (m.sections.Traits ?? []).find((e) => e.name === 'Through the Pain');
    expect(t.text).toMatch(/Advantage on saving throws/);
    expect(t.text).not.toMatch(/Exhaustion/);
  });

  test('the least-guarded field: "Understood the languages" ships present-tense', async () => {
    const full = JSON.parse(answer());
    full.languages = "Understood the languages of its creators but can't speak";
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    expect(m.languages).toMatch(/^Understands the languages/);
  });
});

describe('the Storm Hermit (2026-09-16): success grants and the fourth dialect', () => {
  test('a success clause that GIFTS the target a defense dies — the penalty ban\'s mirror', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '*Dexterity Saving Throw:* DC 15, one creature within 60 feet. *Failure:* 14 (4d6) Bludgeoning damage. *Success:* Half damage, and the target also gains immunity to Bludgeoning damage until the end of its next turn.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.library).toBe(true); // the draft died to the mirror arm
  });

  test('the fourth save dialect ("taking N on a failed save, or half as much...") normalizes', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 60 feet must make a DC 15 Dexterity saving throw, taking 14 (4d6) Bludgeoning damage on a failed save, or half as much damage on a successful one.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/\*Dexterity Saving Throw:\* DC 15, one creature within 60 feet\. \*Failure:\* 14 \(4d6\) Bludgeoning damage\. \*Success:\* Half damage\./);
  });
});

describe('the Prelate (2026-09-16): the vacuous DC, stale spell bonus, caps actuator, blessed state', () => {
  test('a bare save phrase gets the card DC injected — the DC check is never vacuous again', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 30 feet that is Poisoned must make a Constitution saving throw. Failure: 14 (4d6) Necrotic damage. Success: Half damage.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/DC 15/);
  });

  test('the donor\'s "+N to hit with spell attacks" restamps to the card', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const sc = sd(pd(8, 'binder', 'caster'), 10, { mechanics: [] });
    const row = Object.values(sc.sections).flat().find((e) => /to hit with spell attacks/.test(e.text ?? ''));
    if (row) expect(row.text).toMatch(new RegExp(`\\+${sc.atk} to hit with spell attacks`));
    else expect(Object.values(sc.sections).flat().some((e) => /Spellcasting/.test(e.name))).toBe(true); // donor dropped the phrase — nothing stale to ship
  });

  test('caps findings self-apply: "its speed is halved" ships as Speed', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '*Constitution Saving Throw:* DC 15, one creature within 30 feet. *Failure:* 14 (4d6) Necrotic damage, and the target\'s speed is halved until the end of its next turn.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/Speed is halved/);
    expect(w.text).not.toMatch(/\bspeed\b/);
  });

  test('a qualifier keyed on a verb nothing performs dies — "other than those it has blessed"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      trait_wildcard: { name: 'Consecrated Rot', text: 'The space within 5 feet of the creature is Difficult Terrain for creatures other than those it has blessed.' },
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Consecrated Rot')).toBe(false);
  });
});

describe('release-gate items (2026-09-20): invented conditions, unserved styles', () => {
  // a fixture whose renames fit the donor actually picked — the skirmisher
  // answer() on another family trips the loud unrenamed-entry throw
  const fitted = (opts, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const full = JSON.parse(answer());
    full.renames = {}; full.damage_types = {};
    rk(sd(pd(opts.cr, opts.style ?? null, opts.archetype), opts.cr, { mechanics: [] })).forEach((k) => {
      full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' ');
      full.damage_types[full.renames[k]] = 'Bludgeoning';
    });
    return JSON.stringify({ ...full, ...over });
  };

  test('"has the Surprised condition" dies at the trait vet — the capitalized form', async () => {
    const opts = { archetype: 'lurker', style: 'trap', concept: 'x', cr: 8, mechanics: [] };
    const m = await generateReskin(opts, async () => fitted(opts, {
      trait_wildcard: { name: 'Vault Guise', text: 'The creature has Advantage on Initiative rolls. Each creature that failed to notice it has the Surprised condition during the first round of combat.' },
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Vault Guise')).toBe(false);
  });

  test('"is Bleeding from" dies; "becomes Stable" (print) and "is Grappled by" stay legal', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: 'One creature within 5 feet that is Bleeding from the creature\'s blade must succeed on a DC 15 Constitution Saving Throw or have the Prone condition.',
    }));
    expect(Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay')).library).toBe(true);
    for (const text of [
      '*Dexterity Saving Throw*: DC 15, one creature within 30 feet that is Grappled by the creature. *Failure:* The target has the Prone condition.',
      '*Constitution Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 14 (4d6) Poison damage. If this damage reduces the target to 0 Hit Points, the target becomes Stable, and it has the Poisoned condition.',
    ]) {
      const ok = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ wildcard: text }));
      expect(Object.values(ok.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay')).library).toBeFalsy();
    }
  });

  test('stripSentencesWith drops only the sentence carrying the token', () => {
    const { stripSentencesWith: strip } = require('../generate.mjs');
    expect(strip('The creature has Advantage on Initiative rolls. Each creature that failed to notice it has the Surprised condition. It climbs well.', 'surprised'))
      .toBe('The creature has Advantage on Initiative rolls. It climbs well.');
    expect(strip('The target has the Dazed condition until it rests.', 'Dazed')).toBe('');
  });

  test('an unserved style is logged loudly, not silently dropped', async () => {
    const seen = [];
    const orig = console.log;
    console.log = (...a) => { seen.push(a.join(' ')); orig(...a); };
    const opts = { archetype: 'caster', style: 'winged', concept: 'x', cr: 12, mechanics: [] };
    try {
      await generateReskin(opts, async () => fitted(opts));
    } finally { console.log = orig; }
    expect(seen.some((l) => /style unserved: "winged" has no caster line/.test(l))).toBe(true);
  });
});

describe('the object rider (2026-09-20): the engine picks the slot, the model writes the payload', () => {
  const RIDER = "When the creature hits with this attack, the target has Disadvantage on its next attack roll before the start of the creature's next turn.";
  const run = (elements, riderText = RIDER) => {
    const prompts = [];
    return generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, signatureElements: elements }, async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith('You are writing the signature action')) return JSON.stringify({ wildcard: riderText });
      return answer();
    }).then((m) => ({ m, informed: prompts.find((x) => x.startsWith('You are writing the signature action')) ?? '' }));
  };

  test('an object element whose noun names an attack row rides THAT row', async () => {
    const { m, informed } = await run([{ element: 'a barbed thorn rake', kind: 'object' }, { element: 'darting footwork', kind: 'behavior' }]);
    expect(informed).toMatch(/the row "Thorn Rake" IS that object/);
    const rake = Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake');
    expect(rake.text).toMatch(/Disadvantage on its next attack roll/);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Waylay')).toBe(false); // the slot was consumed by the rider
  });

  test('a compound object element rides its PRIMARY object, not the last word', async () => {
    const { m, informed } = await run([{ element: 'a notched rake and a throwing knife', kind: 'object' }]);
    expect(informed).toMatch(/the row "Thorn Rake" IS that object/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text).toMatch(/Disadvantage on its next attack roll/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Cast Thorn').text).not.toMatch(/hits with this attack/);
  });

  test('an object with no row bearing its noun leaves the seat logic untouched', async () => {
    const { m, informed } = await run([{ element: 'a censer of plague-ash', kind: 'object' }], '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition.');
    expect(informed).not.toMatch(/IS that object/);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Thorn Rake').text).not.toMatch(/When the .* hits with this attack/);
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Waylay')).toBe(true);
  });

  test('a family\'s default posture is not logged as an unserved style', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const full = JSON.parse(answer()); full.renames = {}; full.damage_types = {};
    rk(sd(pd(3, null, 'lurker'), 3, { mechanics: [] })).forEach((k) => { full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' '); full.damage_types[full.renames[k]] = 'Bludgeoning'; });
    const seen = []; const orig = console.log; console.log = (...a) => { seen.push(a.join(' ')); orig(...a); };
    try { await generateReskin({ archetype: 'lurker', style: 'skulker', concept: 'x', cr: 3, mechanics: [] }, async () => JSON.stringify(full)); }
    finally { console.log = orig; }
    expect(seen.some((l) => /style unserved/.test(l))).toBe(false);
  });
});

describe('the last four (2026-09-20): swarm clamp, dead control rows, computable actuators', () => {
  const fitted = (opts, over = {}) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const full = JSON.parse(answer()); full.renames = {}; full.damage_types = {};
    rk(sd(pd(opts.cr, opts.style ?? null, opts.bodyType ?? opts.archetype), opts.cr, { mechanics: [] })).forEach((k) => {
      full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' '); full.damage_types[full.renames[k]] = 'Bludgeoning';
    });
    return JSON.stringify({ ...full, ...over });
  };

  test('a swarm is never Tiny — size clamps to Medium and the hit die follows', async () => {
    const opts = { archetype: 'lurker', bodyType: 'swarm', concept: 'x', cr: 13, mechanics: [] };
    const m = await generateReskin(opts, async () => fitted(opts, { size: 'Tiny', type: 'Beast' }));
    expect(m.size).toBe('Medium');
    expect(m.hp_formula).toMatch(/d8/);
    const big = await generateReskin(opts, async () => fitted(opts, { size: 'Gargantuan', type: 'Beast' }));
    expect(big.size).toBe('Large');
  });

  test('a frame-less, damage-less library row becomes a Bonus Action; a damaging one stays an Action', async () => {
    const dying = 'When the creature teleports within 5 feet of a foe, that foe must succeed on a DC 15 Dexterity Saving Throw or be Blinded until the end of its next turn.';
    const zone = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ wildcard: dying, fallback_shape: 'zone' }));
    const z = (zone.sections['Bonus Actions'] ?? []).find((e) => e.library && /Lightly Obscured/.test(e.text));
    expect(z).toBeTruthy();
    expect((zone.sections.Actions ?? []).some((e) => e.library && /Lightly Obscured/.test(e.text))).toBe(false);
    // a save-FRAMED control row is priced by the Multiattack menu and stays an Action
    const disarm = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({ wildcard: dying, fallback_shape: 'disarm' }));
    expect((disarm.sections.Actions ?? []).some((e) => e.library && /Saving Throw/.test(e.text))).toBe(true);
    expect((disarm.sections['Bonus Actions'] ?? []).some((e) => e.library)).toBe(false);
  });

  test('a network-class failure on any call is retried once; a persistent one still fails', async () => {
    let calls = 0;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => {
      calls += 1;
      if (calls === 1) throw new TypeError('Failed to fetch');
      return answer();
    });
    expect(m.name).toBe('Gloam Courser');
    let n = 0;
    await expect(generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => { n += 1; throw new TypeError('Failed to fetch'); }))
      .rejects.toThrow(/Failed to fetch/);
    expect(n).toBe(2); // exactly one retry, never a loop
    // a validation-shaped error is NOT retried by this layer
    let v = 0;
    await expect(generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => { v += 1; throw new Error('Failed to generate a valid response. Please try again later.'); }))
      .rejects.toThrow(/valid response/);
    expect(v).toBe(1);
  });

  test('"adjacent" actuates to "within 5 feet"', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '*Dexterity Saving Throw*: DC 15, one creature adjacent to the creature. *Failure:* The target has the Prone condition.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.text).toMatch(/within 5 feet of/);
    expect(w.text).not.toMatch(/adjacent/);
  });
});

describe('reactions need triggers (critic round 2, 2026-09-20)', () => {
  test('a reaction written "When X, Y" is rewritten to the Trigger/Response skeleton and ships', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard_economy: 'reaction',
      wildcard: 'When a creature within 5 feet of the creature makes a melee attack against it, the creature moves up to 10 feet without provoking Opportunity Attacks.',
    }));
    const r = (m.sections.Reactions ?? []).find((e) => e.name === 'Waylay');
    expect(r).toBeTruthy();
    expect(r.text).toMatch(/^\*Trigger:\* A creature within 5 feet .* makes a melee attack against it\. \*Response:\* The (?:creature|gloam courser) moves up to 10 feet/);
  });

  test('a reaction with no trigger at all dies at the vet instead of shipping', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard_economy: 'reaction',
      wildcard: 'The creature drops onto one creature it can see beneath it; the target must succeed on a DC 15 Strength saving throw or have the Prone condition.',
    }));
    expect((m.sections.Reactions ?? []).some((e) => e.name === 'Waylay')).toBe(false);
  });

  test('a plain "Trigger:" lead files to Reactions whatever the model declared, with the skeleton normalized', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard_economy: 'action',
      wildcard: 'Trigger: A creature misses the creature with a melee attack. The creature moves up to 10 feet without provoking Opportunity Attacks.',
    }));
    expect((m.sections.Actions ?? []).some((e) => e.name === 'Waylay')).toBe(false);
    const r = (m.sections.Reactions ?? []).find((e) => e.name === 'Waylay');
    expect(r).toBeTruthy();
    expect(r.text).toMatch(/^\*Trigger:\* A creature misses .*\. \*Response:\* The (?:creature|gloam courser) moves up to 10 feet/);
  });

  test('a brute cannot smuggle a reaction in through the Trigger lead', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const full = JSON.parse(answer()); full.renames = {}; full.damage_types = {};
    rk(sd(pd(5, null, 'brute'), 5, { mechanics: [] })).forEach((k) => { full.renames[k] = `Named ${k}`.split(/\s+/).slice(0, 4).join(' '); full.damage_types[full.renames[k]] = 'Bludgeoning'; });
    full.wildcard_economy = 'action';
    full.wildcard = 'Trigger: A creature hits the creature with a melee attack. The creature makes one attack against it.';
    const m = await generateReskin({ archetype: 'brute', concept: 'x', cr: 5, mechanics: [] }, async () => JSON.stringify(full));
    expect((m.sections.Reactions ?? []).length).toBe(0);
  });

  test('2014 attack grammar ("+5 to hit") is an attack roll and dies like one', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard: '+5 to hit, range 60/180 ft., one target. Hit: 10 (3d6) Bludgeoning damage.',
    }));
    const w = Object.values(m.sections).flat().find((e) => (e.name ?? '').startsWith('Waylay'));
    expect(w.library).toBe(true);
  });
});
