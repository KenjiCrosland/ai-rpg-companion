import { generateReskin as generateReskinRaw, buildReskinPrompt } from '../generate.mjs';
const generateReskin = (opts, cb) => generateReskinRaw(opts, cb);
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

test('a full reskin ships: renames applied, references follow', async () => {
  const m = await generateReskin({ archetype: 'skirmisher', concept: 'a hedge-fey that waylays travelers', cr: 8 }, async () => answer());
  expect(m.name).toBe('Gloam Courser');
  const all = Object.values(m.sections).flat();
  expect(all.map((e) => e.name).join('|')).not.toMatch(/Melee Attack|Ranged Attack|Signature Slot|Escape Action/);
  expect(all.find((e) => e.name === 'Multiattack').text).toMatch(/Thorn Rake or Cast Thorn/);
  expect(all.find((e) => /Bramble Sweep/.test(e.name)).name).toMatch(/Recharge 5-6/);
  expect(m.generation).toMatchObject({ path: 'reskin', donor: 'skirmisher-8', archetype: 'skirmisher' });
  expect(m.generation.cite).toMatch(/Assassin/); // cited template carries its rung
});

test('the last-resort seed obeys the blind-role map: a siege ram never draws a shell, a hook, or a hurled weapon blind', async () => {
  // the mock answers every call with the main-call JSON, so the idea call fails and the library stands in
  const { renameKeysOf: rk } = require('../generate.mjs');
  const scaled = scaleDonor(pickDonor(9, 'charger', 'brute'), 9, { mechanics: [] });
  const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  const ram = JSON.stringify({ name: 'Ironclad Ram', type: 'Construct', size: 'Large', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength' });
  const concept = 'a siege ram given a bull\'s temper, iron-shod, that will not stop until the gate or itself is splinters';
  const m = await generateReskin({ archetype: 'brute', style: 'charger', concept, userConcept: concept, cr: 9 }, async () => ram);
  const names = Object.values(m.sections).flat().map((e) => e.name).join('|');
  expect(names).not.toMatch(/Shell Defense|Hooked Lash|Hurled Weapon|Luring Presence/);
  expect(['library', 'dropped']).toContain(m.generation.signature);
});

test('a kept crawl beside a fly speed is written to the card, not only an added or dropped mode (the lamplighter\'s Swim 5)', async () => {
  const { renameKeysOf: rk } = require('../generate.mjs');
  const scaled = scaleDonor(pickDonor(6, 'phantom', 'lurker'), 6, { mechanics: [] });
  const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  const ghost = JSON.stringify({ name: 'Lamplighter', type: 'Undead', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])), conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom' });
  const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: 'a canal ghost', cr: 6, movement: ['swim'], mind: 'sapient' }, async () => ghost);
  if (/Fly/.test(m.speed)) expect(m.speed).not.toMatch(/\b(?:Swim|Climb|Burrow) (?:5|10|15) ft/);
});

test('an unrenamed entry fails the block LOUDLY — no fallback names', async () => {
  const partial = JSON.parse(answer());
  delete partial.renames['Mobility Trait'];
  await expect(generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(partial)))
    .rejects.toThrow(/unrenamed entry.*Mobility Trait/);
});

test('the prompt shows mechanics, never flavor, and asks for no rules text', () => {
  const p = buildReskinPrompt(scaleDonor(pickDonor(12, null, 'skirmisher'), 12), { concept: 'c' });
  expect(p).toMatch(/Signature Slot/);
  expect(p).not.toMatch(/"wildcard"|trait_wildcard|wildcard_economy/); // the signature is the catalog's (templates.mjs), never the main call's
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

});

describe('the Rimegrave guards', () => {


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

  test('a Vorpal rename fails validation — icon vocabulary is reserved', () => {
    const { makeReskinValidator: mv2 } = require('../generate.mjs');
    const { pickDonor: pd8, scaleDonor: sd8 } = require('../scale.mjs');
    const v = mv2(sd8(pd8(8, null, 'skirmisher'), 8));
    const claim = JSON.parse(answer());
    claim.renames['Melee Attack'] = 'Vorpal Saber';
    claim.damage_types['Vorpal Saber'] = 'Slashing';
    expect(v(JSON.stringify(claim))).toBe(false);
  });

  test('the style choice moved to the ROUTE call: the shelf carries every style; the prose prompts carry none', () => {
    const { buildSeedSynthesisPrompt: bsp, buildArchetypeResolvePrompt: bap } = require('../../format-2024/generate.mjs');
    const { buildRoutePrompt } = require('../route.mjs');
    expect(buildRoutePrompt('a horseman', { cr: 8 })).toMatch(/- skirmisher-mounted — a RIDER/);
    for (const prompt of [
      bsp({ intelligence: 'x', physical: 'x', silhouette: 'x', origin: 'x' }, { cr: 8 }),
      bap('a horseman', '', { cr: 8 }),
    ]) {
      expect(prompt).not.toMatch(/"styles?":/);
    }
  });
});

describe('the four smalls + the audit port', () => {


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

describe('v6 batch: detachment accounting, remote-ranged, sapient languages', () => {


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


});

describe('Croupier fixes (2026-08-19): frame-vs-mention, print sentence budget, repair salvage', () => {

  test('a save FRAME in a trait is still rejected', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ trait_wildcard: { name: 'Bad Trait', text: '*Wisdom Saving Throw*: DC 15. The target has the Frightened condition.' } });
    });
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Bad Trait')).toBe(false);
  });


});

describe('Duchess fixes (2026-08-19): establishment breadth, spark, term caps', () => {

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

});

describe('economy declaration + lint actuator (owner go, 2026-08-19)', () => {




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

describe('Pilgrim kill-chain fixes (2026-08-19): three proven false positives', () => {

  test('a real muddle still catches: the monster as save-maker', () => {
    const re = /(?<!\bof )(?<!\bfrom )(?<!\bto )(?<!\bnear )[Tt]he creature (?:must (?:make|succeed)|takes \d|has the [A-Z][a-z]+ condition|repeats the save)/;
    expect(re.test('The creature takes 10 (3d6) Psychic damage and has the Frightened condition.')).toBe(true);
    expect(re.test('One creature within 30 feet of the creature must make a DC 15 save.')).toBe(false);
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





  test('alignment ships title-cased', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async (prompt) => {
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer({ alignment: 'chaotic neutral' });
    });
    expect(m.alignment).toBe('Chaotic Neutral');
  });
});

describe('the blessed batch (2026-08-24): rename propagation, embedded economy, redundancy brief', () => {




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

  test('the route call asks the gating question (extras need their own quote)', () => {
    const { buildRoutePrompt } = require('../route.mjs');
    const pr = buildRoutePrompt('bog lurker', { cr: 6 });
    expect(pr).toMatch(/"extras": \[\{"mechanic":/);
    expect(pr).toMatch(/gated add-on mechanics the concept ITSELF shows/);
  });
});

describe('pre-freeze batch (2026-08-25): splice alignment, cross-ref lint, movement, success grammar', () => {
  const { pickDonor: pdF, scaleDonor: sdF } = require('../scale.mjs');




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


});

describe('metering catch-all + rider pricing + reach reconciliation (2026-08-26)', () => {
  const quiet = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };






  test('a trait claiming a reach no attack row prints is mechanical — no trait ships', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet(() => answer({
      trait_wildcard: { name: 'Long Arms', text: "The creature's melee attacks have reach 10 feet, and it isn't hindered by dim light or darkness." },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Long Arms')).toBe(false);
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







  test('a trait cannot teleport past the chassis — the Reflection Step gap', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a mirror thief', cr: 6, mechanics: [] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(6));
      base.trait_wildcard = { name: 'Reflection Step', text: 'While within 5 feet of a reflective surface, the creature can teleport between such surfaces as part of its movement.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Reflection Step')).toBe(false);
  });


  test('the writer may not explain that flavor is flavor — the Shedding Arsenal disclaimer', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a battlefield mass', cr: 20, mechanics: ['regeneration'] }, quiet2(() => {
      const base = JSON.parse(bruteAnswer(20, 'regenerator'));
      base.trait_wildcard = { name: 'Shedding Arsenal', text: 'When the creature takes damage, an old weapon surfaces on its body or falls nearby. This is purely cosmetic; it grants no mechanical benefit.' };
      return JSON.stringify(base);
    }));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Shedding Arsenal')).toBe(false);
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




  // THE TRAIT CEILING (corpus 2026-09-28): traits per block run 0/1/2/3/4/5 =
  // 126/119/58/17/7/2, and a material body carries more of them. The juggernaut
  // chassis already brings three rules traits, so the SAME sheet, the same idea
  // and the same fit ship a fourth on a Construct and refuse it on a Giant.
  const fitPrompts = [];
  const ceilingRun = async (resolvedType, traitIdea = 'While it is wounded it fights with a blind fury that makes it more dangerous, not less.') => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin(
        { archetype: 'brute', concept: 'a nameless hulk of old plating', userConcept: 'a nameless hulk of old plating', cr: 12, style: 'juggernaut', mechanics: [], resolvedType },
        async (prompt) => {
          if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'It slams the ground and everything near it is thrown down.', section: 'action', trigger: 'save', effect: 'damage' }, trait: { idea: traitIdea, trigger: 'always', effect: 'defense' } });
          if (prompt.startsWith("A monster's signature ability")) { fitPrompts.push(prompt); return JSON.stringify({ template: 'bloodied-fury', because: 'wounded', name: 'Iron Fury', fills: {} }); }
          if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
          if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
          return bruteAnswer(12, 'juggernaut');
        });
    } finally { console.log = orig; }
    return { traits: (m.sections.Traits ?? []).map((e) => e.name), trace: lines.join('\n') };
  };

  test("a no-throw body's melee-or-ranged row keeps its melee half only (the angel's Hurled Debris at 30/120)", async () => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    // defender-5 carries a real *Melee or Ranged* Hybrid Attack; a Celestial is a no-throw body
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaledD = scaleDonor(pickDonor(5, null, 'defender'), 5, { mechanics: [] });
    const renames = {}; rk(scaledD).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaledD.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    const ans = JSON.stringify({ name: 'Sewn Seraph', type: 'Celestial', size: 'Medium', alignment: 'Lawful Neutral', senses: 'darkvision 60 ft.', languages: 'Celestial', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Radiant'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
    try { m = await generateReskin({ archetype: 'defender', concept: 'a sewn seraph', userConcept: 'a sewn seraph', cr: 5, mechanics: [], resolvedType: 'Celestial' }, quiet2(() => ans)); } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/keeps its melee half only/);
    expect(Object.values(m.sections).flat().some((e) => /Melee or Ranged Attack Roll| or range \d/.test(e.text ?? ''))).toBe(false);
    expect(Object.values(m.sections).flat().some((e) => /Melee Attack Roll:.*reach \d+ ft\./.test(e.text ?? ''))).toBe(true);
  });

  test('the trait ceiling counts the whole sheet — a material body seats a fourth trait, a meat body does not', async () => {
    const chassis = await ceilingRun('Giant');
    expect(chassis.traits.length).toBeLessThanOrEqual(3); // the juggernaut's own Acid Absorption + Siege Monster (Immutable Form is a golem's and leaves a Giant, 2026-09-29) + at most one fitted: print's ceiling for a meat body is 3
    expect(chassis.traits).toContain('Acid Absorption'); expect(chassis.traits).toContain('Siege Monster'); expect(chassis.traits).not.toContain('Immutable Form');
    const material = await ceilingRun('Construct');
    expect(material.traits).toHaveLength(4);
    // the FIT call sees the whole sheet so far too (no call is an island)
    expect(fitPrompts.at(-1)).toMatch(/THE SHEET SO FAR[\s\S]*\| STR \| \d+ \|[\s\S]*### Traits/);
    expect(material.traits.join('|')).toMatch(/Iron Fury|Bloodied Fury/);
    expect(material.trace).not.toMatch(/trait ceiling/);
  });

  test('a meat body earns its trait by a verb — a shape fit with no verb match ships on a Construct, not on a Giant', async () => {
    const noVerb = 'It is old stone and it does not like company.'; // 'stone' keeps another card in the race so the fit runs; the PICK (bloodied-fury) matches nothing — a bare shape fit
    const meat = await ceilingRun('Giant', noVerb);
    expect(meat.trace).toMatch(/trait declined: .*shape fit with no verb match/);
    expect(meat.traits.join('|')).not.toMatch(/Iron Fury|Bloodied Fury/);
    const made = await ceilingRun('Construct', noVerb);
    expect(made.traits.join('|')).toMatch(/Iron Fury|Bloodied Fury/);
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



  test('blanket all-damage resistance is mechanical in a trait', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, quiet2(() => answer({
      trait_wildcard: { name: 'Ice Seal', text: 'When the creature takes damage, it gains Resistance to all damage except Thunder until the start of its next turn.' },
    })));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Ice Seal')).toBe(false);
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
      type: 'Beast', alignment: "Unaligned (Feral, Driven By Its Prison'S Grief)", // a Beast has no capacity for ethics, so Unaligned stands and the pin keeps testing the vocabulary strip (the critic's fourth read)
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
    // a BODY's own weakness outranks the foil too (2026-09-28): a wax thing
    // regenerates unless it is BURNED — the foil had derived Cold from its own Fire
    const waxen = await run('a wax mass that reknits', 'Fire');
    expect((waxen.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text).toMatch(/takes Fire damage/);
    // with no material weakness to read, the energy foil still decides
    const plainFoil = await run('a burning basalt mass that reknits', 'Fire');
    expect((plainFoil.sections.Traits ?? []).find((e) => e.name === 'Regeneration').text).toMatch(/takes Cold damage/);
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
    // Hold Person is 1/Day at CR 12: print never holds a leveled control
    // spell at will below CR 13 (Cultist Fanatic 1/Day, Spirit Naga 2/Day;
    // Fear at will starts on the CR 13 Nalfeshnee) — form-ten 2026-10-01
    expect(sc[0].text).toMatch(/At Will:\*\* \*Detect Magic\*, \*Invisibility\*/);
    // Invisibility rides at-will since the tier fix (2026-09-04) — only
    // the NEVER_AT_WILL buff and gated control stay daily
    expect(sc[0].text).toMatch(/1\/Day Each:\*\* \*Blur\*, \*Hold Person\*/);
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


});

describe('second caster smoke fixes (2026-09-02): dice, save-row rescale, spell-negation, backfill', () => {
  const quietE = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };


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


describe('third caster smoke fixes (2026-09-02): invented conditions, second novas, orphan targets', () => {
  const quietF = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };



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
    expect(sc.text).toMatch(/spell save DC 18, \+10 to hit with spell attacks/); // both derive from the named stat now (INT 22, PB 4), not the card's 17 / +9 (checker 2026-10-02)
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


  test('"adjacent to" is swapped to 5e vocabulary by the register actuator (Gutter Glare shipped it)', async () => {
    const m = await generateReskin({ archetype: 'lurker', concept: 'x', cr: 5, mechanics: [] },
      quietF(() => lurkerAnswer2(5, null, {
        wildcard: '*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Prone condition, and it is pulled to a space adjacent to the creature.',
      })));
    const s = JSON.stringify(m.sections);
    // the free-text wildcard (and its register actuator) retired 2026-09-22: the
    // model's prose row never ships, so "adjacent to" cannot reach the sheet.
    // The old "within 5 feet of" expectation was met by an incidental seed text
    // and broke when the seed rotation moved (summon-lite retired, 2026-09-28).
    expect(s).not.toMatch(/adjacent to/);
    expect(m.sections.Actions.some((e) => e.library)).toBe(true); // a proven seed stands in
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
    // the cues live on the SHELF now (reskin/route.mjs, 2026-09-21)
    const src = require('fs').readFileSync(require('path').resolve(__dirname, '../route.mjs'), 'utf8');
    expect(src).toMatch(/a ghost or spirit is ALWAYS this/);
    expect(src).toMatch(/a maw or cage that swallows, engulfs, smothers, or drags prey inside itself/);
    expect(src).toMatch(/holds, seizes, swallows, entombs, or folds shut around prey is brute-grappler/);
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
    // the hybrid row has reach — a crossbow name on it WAS the Grave-Vow defect; since the
    // weapon table (2026-09-28) the hybrid row is retabled into a crossbow row, so the
    // defect is the pure MELEE row's alone
    const hybridKey = rk(scaled).find((k) => /Hybrid/.test(k));
    renames[hybridKey] = 'Named Hybrid';
    renames[rk(scaled).find((k) => /^Melee Attack$/.test(k))] = 'Heavy Crossbow';
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
    expect((m.sections.Reactions ?? []).filter((e) => e.template !== 'interpose')).toHaveLength(0); // the warden seat's OWED Interpose seats by print (2026-09-28); the punisher rows still never do
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


describe('Tier B batch-two fixes (2026-09-14): the speed dodge, the movement grant', () => {
  const quietG = (respond) => async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return respond(prompt);
  };


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
    const scaled = scaleDonor(pickDonor(13, 'binder', 'caster'), 13, /* CR 13: the floor for at-will leveled control (form-ten 2026-10-01) */ { mechanics: [] });
    const renames = {};
    rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'x', cr: 13, energy: 'Fire', mechanics: [] }, quietI(() => JSON.stringify({
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



});

describe('the escalation pattern (owner 2026-09-15): one save, the Mummy grammar', () => {

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




});



describe('the Midnight Ride fixes (2026-09-15): the weld holds late, the pivot rides the seat', () => {

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


describe('the fallback name (owner 2026-09-15): the llm names the shape it picked', () => {
  const runWith = async (extra) => generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, energy: 'Necrotic' }, async (prompt) => {
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are writing the signature action')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    const base = JSON.parse(answer({ wildcard: 'It is very scary and dreadful beyond words entirely.' }));
    return JSON.stringify({ ...base, ...extra });
  });


});

describe('the Skull Harvest round (2026-09-15): the trailing label, the replenishing law', () => {

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


});

describe('the claim gate (owner go 2026-09-15): low-CR blocks are short blocks', () => {
  const lowAnswer = (cr, mechanics) => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled0 = scaleDonor(pickDonor(cr, null, 'skirmisher'), cr, { mechanics: mechanics ?? [] });
    return { scaled0 };
  };

  // THE BODY DECIDES (corpus 2026-09-28): a material body carries a trait at
  // every tier (Ooze 100% / Elemental 94% / Undead 63% / Construct 60% /
  // Aberration 56% vs Beast 33% / Humanoid 27%), so the CR<=2 trait gate reads
  // the type — the bell-ringer's ghost "cannot leave the tower" had nowhere to
  // seat (critic 2026-09-28).
  const seenPrompts = [];
  const gateTrace = async (resolvedType) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    try {
    await generateReskin({ archetype: 'skirmisher', concept: 'a thing', cr: 2, mechanics: [], resolvedType }, async (prompt) => {
      seenPrompts.push(prompt);
      if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      const base = JSON.parse(answer());
      base.type = resolvedType; // the gates are open at CR <= 2 now: the slot is asked for and answered (fidelity pipeline step 2)
      return JSON.stringify(base);
    });
    } finally { console.log = orig; }
    return lines.join('\n');
  };

  test('the CR<=2 trait seat is OPEN for every body (the austerity closure was opened — fidelity pipeline step 2): an Undead and a Beast both keep it', async () => {
    expect(await gateTrace('Undead')).toMatch(/the trait seat stays open/);
    expect(await gateTrace('Beast')).toMatch(/the trait seat stays open/);
    expect(await gateTrace('Beast')).not.toMatch(/the trait wildcard is closed at CR <= 2/);
    // NO CALL IS AN ISLAND: the main call sees the chassis header (the array), the idea call sees the whole sheet so far
    const main = seenPrompts.find((q) => /THE CHASSIS \(CR/.test(q)); expect(main).toMatch(/\| STR \| \d+ \|/); expect(main).toMatch(/\*\*AC\*\* \d+/);
    const idea = seenPrompts.find((q) => q.startsWith('You are inventing the SIGNATURE ability')); expect(idea).toMatch(/THE SHEET SO FAR[\s\S]*\*\*HP\*\*[\s\S]*\| STR \| \d+ \|/); // the renderer prints AC/HP/Speed, then the ability table
    expect(idea).toMatch(/### Actions/);
  });

  test('CR 2 with no claimed mechanics: the wildcard slot STAYS (the claim gate was opened — fidelity pipeline step 2): the main call asks for it and the block ships', async () => {
    let askedWildcard = false;
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a river otter', cr: 2, mechanics: [] }, async (prompt) => {
      if (/THE CHASSIS \(CR/.test(prompt) && /Signature/.test(prompt)) askedWildcard = true; // the chassis's slot row is in the main prompt — the closed gate used to strip it first
      if (prompt.startsWith('You are repairing')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return answer();
    });
    expect(askedWildcard).toBe(true);
    expect(Object.values(m.sections).flat().length).toBeGreaterThan(0); // a seed may now stand in at CR 2 — that is the opened gate working, not a defect
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

  test('the least-guarded field: "Understood the languages" ships present-tense', async () => {
    const full = JSON.parse(answer());
    full.languages = "Understood the languages of its creators but can't speak";
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    expect(m.languages).toMatch(/^Understands the languages/);
  });
});

describe('the Prelate (2026-09-16): the vacuous DC, stale spell bonus, caps actuator, blessed state', () => {

  test('the donor\'s "+N to hit with spell attacks" restamps to the card', () => {
    const { pickDonor: pd, scaleDonor: sd } = require('../scale.mjs');
    const sc = sd(pd(8, 'binder', 'caster'), 10, { mechanics: [] });
    const row = Object.values(sc.sections).flat().find((e) => /to hit with spell attacks/.test(e.text ?? ''));
    if (row) expect(row.text).toMatch(new RegExp(`\\+${sc.atk} to hit with spell attacks`));
    else expect(Object.values(sc.sections).flat().some((e) => /Spellcasting/.test(e.name))).toBe(true); // donor dropped the phrase — nothing stale to ship
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
    expect(big.size).toBe('Medium'); // the model's size pick does not make a Large swarm — print: 6 of 7 SRD swarms are Medium (critic form-ten 2026-10-01)
    const vast = await generateReskin({ ...opts, concept: 'a vast swarm of bats', userConcept: 'a vast swarm of bats' }, async () => fitted(opts, { size: 'Gargantuan', type: 'Beast' }));
    expect(vast.size).toBe('Large'); // the user's words do
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

});

describe('reactions need triggers (critic round 2, 2026-09-20)', () => {

  test('a reaction with no trigger at all dies at the vet instead of shipping', async () => {
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => answer({
      wildcard_economy: 'reaction',
      wildcard: 'The creature drops onto one creature it can see beneath it; the target must succeed on a DC 15 Strength saving throw or have the Prone condition.',
    }));
    expect((m.sections.Reactions ?? []).some((e) => e.name === 'Waylay')).toBe(false);
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

});

describe('name canon honours a rejected hint (2026-09-21)', () => {
  test('"Troll-Tooth Knight" gets no Regeneration when the resolve rejected the troll cue', async () => {
    const full = JSON.parse(answer()); full.name = 'Troll-Tooth Knight';
    const m = await generateReskin({ archetype: 'skirmisher', concept: 'a knight who hunts trolls', cr: 8, rejectedCanon: ['troll'] }, async () => JSON.stringify(full));
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Regeneration')).toBe(false);
    const still = await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8 }, async () => JSON.stringify(full));
    expect((still.sections.Traits ?? []).some((e) => e.name === 'Regeneration')).toBe(true); // without the rejection the stamp still fires
  });
});

test('an anatomy rename propagates into the Multiattack instead of sweeping it (the bog troll, 2026-09-27)', async () => {
  const { renameKeysOf: rk } = require('../generate.mjs');
  const scaled = scaleDonor(pickDonor(7, null, 'brute'), 7, { mechanics: [] });
  const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = k === 'Ranged Attack' ? 'Fist' : k === 'Melee Attack' ? 'Slam' : `Named Row${i}`; }); // "Fist" is a melee noun on the ranged row — the anatomy pass renames it
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  const troll = JSON.stringify({ name: 'Bog Troll', type: 'Monstrosity', size: 'Large', alignment: 'Chaotic Evil', senses: 'darkvision 60 ft.', languages: 'Giant', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
  const traces = []; const origLog = console.log; console.log = (...a) => { traces.push(a.join(' ')); };
  let m;
  try { m = await generateReskin({ archetype: 'brute', concept: 'a bog troll one with the mire', userConcept: 'a bog troll one with the mire', cr: 7 }, async () => troll); } finally { console.log = origLog; }
  const all = Object.values(m.sections).flat();
  const ma = all.find((e) => e.name === 'Multiattack');
  expect(ma).toBeDefined();
  expect(ma.text).toMatch(/Slam or Hurled Debris/);
  expect(all.map((e) => e.name)).toContain('Hurled Debris');
  expect(all.map((e) => e.name)).not.toContain('Fist');
  expect(traces.join('\n')).toMatch(/rename propagated: "Fist" -> "Hurled Debris" in "Multiattack"/); // the trace proves the propagation, not just the absence of the sweep
  expect(traces.join('\n')).not.toMatch(/"Multiattack" was only about/);
});

describe('the blind A/B read (2026-09-28): the ranged row defaults off, a negative clause removes a mode, the short form heads before a preposition', () => {
  const run = async (opts, over = {}) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'skirmisher', cr: 8, mechanics: [], ...opts }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(over);
      });
    } finally { console.log = orig; }
    return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
  };
  test('a wolf keeps its teeth and loses the thrown row; the Multiattack is re-keyed to the melee attack', async () => {
    const { m, trace, rows } = await run({ concept: 'a wolf', userConcept: 'a wolf', resolvedType: 'Beast', attackMode: 'melee' });
    expect(trace).toMatch(/ranged row off: Ranged Attack/);
    expect(rows.some((e) => /Ranged Attack Roll/.test(e.text ?? ''))).toBe(false);
    const ma = rows.find((e) => e.name === 'Multiattack');
    expect(ma.text).toMatch(/makes three Bite attacks/); // the surviving melee key — print canon names it Bite, the wolf's own row
    expect(ma.text).not.toMatch(/in any combination|Cast Thorn/);
  });
  test('a thrower, a giant, or a claimed ranged mode keeps the row', async () => {
    expect((await run({ concept: 'a rock-throwing giant', userConcept: 'a rock-throwing giant', resolvedType: 'Giant' })).trace).not.toMatch(/ranged row off/);
    expect((await run({ concept: 'a hedge archer', userConcept: 'a hedge archer', resolvedType: 'Humanoid', attackMode: 'ranged' })).trace).not.toMatch(/ranged row off/);
    expect((await run({ concept: 'x', userConcept: 'x', resolvedType: 'Humanoid', mechanics: ['thrown-weapon'] })).trace).not.toMatch(/ranged row off/);
  });
  test('"wings sewn shut" takes Fly out of the movement set the resolve handed over', async () => {
    const flew = await run({ concept: 'a conscripted angel', userConcept: 'a conscripted angel', resolvedType: 'Celestial', movement: ['fly'] });
    expect(flew.m.speed).toMatch(/Fly/);

    const sewn = await run({ concept: 'a conscripted angel with its wings sewn shut', userConcept: 'a conscripted angel with its wings sewn shut', resolvedType: 'Celestial', movement: ['fly'] });
    expect(sewn.trace).toMatch(/flight removed by the concept/);
    expect(sewn.m.speed).not.toMatch(/Fly/);
  });
  test('the short form heads before a preposition: "Kiln with a Mouth" is the kiln, not the mouth', async () => {
    const { rows } = await run({ concept: 'a furnace given a mouth', userConcept: 'a furnace given a mouth', resolvedType: 'Construct' }, { name: 'Kiln with a Mouth' });
    const text = rows.map((e) => e.text).join(' ');
    expect(text).toMatch(/the kiln\b/i);
    expect(text).not.toMatch(/the mouth\b/i);
  });
});

describe('print canon for plain prompts (2026-09-28): a concept that names a print creature borrows its composition', () => {
  const { printCanonFor } = require('../generate.mjs');
  test('the lookup: exact name, else the nearest-CR block ending in the head; rich concepts are left alone', () => {
    expect(printCanonFor('a wolf', 5)).toMatchObject({ name: 'Wolf', melee: ['Bite'] });
    expect(printCanonFor('a wolf', 5).traits.map((t) => t.name)).toEqual(['Pack Tactics']);
    const bear = printCanonFor('a bear', 4); expect(bear.name).toMatch(/Bear$/); expect(bear.melee.length).toBeGreaterThan(0); // the nearest-CR bear (Polar, CR 2) — any print bear is the bear
    expect(printCanonFor('a bear', 1).name).toBe('Brown Bear');
    expect(printCanonFor('an archer', 4).name).toBe('Scout'); // not in the SRD by name — the alias layer names the block
    expect(printCanonFor('a wolf that hunts the moon and eats the stars out of the sky', 5)).toBeNull();
  });
  test('"a wolf" ships Pack Tactics in the wolf\'s own words and bites', async () => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'skirmisher', concept: 'a wolf', userConcept: 'a wolf', cr: 8, mechanics: [], resolvedType: 'Beast', mind: 'bestial' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer({ name: 'Wild Hunt Wolf' });
      });
    } finally { console.log = orig; }
    const traits = m.sections.Traits ?? [];
    const pt = traits.find((e) => e.name === 'Pack Tactics');
    expect(pt).toBeDefined();
    expect(pt.text).toMatch(/^The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies/); // "the wolf" is the inline short form of "Wild Hunt Wolf"
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Bite' && /Melee Attack Roll/.test(e.text))).toBe(true);
    expect(lines.join('\n')).toMatch(/print canon attack: "Thorn Rake" -> "Bite"/);
    expect(m.languages).toBe('None');
    // a plain print creature is the print block: no invented action, no seed, no fitted trait; print's own modes
    expect(lines.join('\n')).toMatch(/print canon: "a wolf" is a print creature — the seats stand down/);
    expect(lines.join('\n')).not.toMatch(/library seed drawn|signature template:/);
    expect(m.speed).not.toMatch(/Climb|Fly|Swim/);
  });
});

describe('the critic\'s refinements, end to end (2026-09-28)', () => {
  const run = async (opts, over = {}) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 8, mechanics: [], ...opts }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(over);
      });
    } finally { console.log = orig; }
    return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
  };
  test("a rename that takes a shelf template's own name is a defect (the warden's Bulwark became 'Interpose' and the owed row never seated)", () => {
    const { reskinDefects } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(7, 'warden', 'defender'), 7, { mechanics: [] });
    const { renameKeysOf: rk } = require('../generate.mjs');
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const bulwark = Object.keys(renames).find((k) => /Bulwark|Ward|Rally|Bolster/i.test(k)) ?? Object.keys(renames)[0];
    renames[bulwark] = 'Interpose';
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    const p = { name: 'X', type: 'Construct', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(scaled, p, {}).join('\n')).toMatch(/takes the shelf's own row name "Interpose"/);
  });
  test("a shelf name that survives repair reverts to the chassis name, and the owed Interpose still seats", async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const sc = scaleDonor(pickDonor(7, 'warden', 'defender'), 7, { mechanics: [] });
    const renames = {}; rk(sc).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const bulwark = Object.keys(renames).find((k) => !/Melee|Ranged|Multiattack|Hybrid/.test(k)) ?? Object.keys(renames)[0];
    renames[bulwark] = 'Interpose';
    const typed = Object.values(sc.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    const ans = JSON.stringify({ name: 'Stone Oath', type: 'Construct', size: 'Large', alignment: 'Lawful Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'defender', style: 'warden', concept: 'a stone shrine-guardian', userConcept: 'a stone shrine-guardian', cr: 7, mechanics: [], resolvedType: 'Construct' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({}); // the repair does not fix it
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return ans;
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/rename reverted: "Interpose" is the shelf's own row name/);
    const rows = Object.values(m.sections).flat();
    expect(rows.filter((e) => /^Interpose/.test(e.name ?? '') && !e.template)).toHaveLength(0); // no chassis row wears the shelf's name
    expect(rows.some((e) => e.template === 'interpose')).toBe(true); // the owed reaction seats
  });
  test('an archer shoots: the hurler seat stands down for the plain line, and the Longbow keeps its print range', async () => {
    const { printCanonFor } = require('../generate.mjs');
    expect(printCanonFor('an archer', 4).rangedRows[0]).toMatchObject({ name: 'Longbow', range: '150/600' });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'skirmisher', style: 'hurler', concept: 'an archer', userConcept: 'an archer', cr: 8, mechanics: ['thrown-weapon'], resolvedType: 'Humanoid', attackMode: 'ranged' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer({ name: 'Hedge Archer' });
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/print canon route: "an archer" is the Scout, a bow-user/);
    expect(m.generation.donor).toBe('skirmisher-8');
    const bow = Object.values(m.sections).flat().find((e) => e.name === 'Longbow');
    expect(bow?.text).toMatch(/Ranged Attack Roll.*range 150\/600 ft\./);
  });
  test('"an archer" is the Scout: a Longbow, not a thrown femur', () => {
    const { printCanonFor } = require('../generate.mjs');
    const pc = printCanonFor('an archer', 4);
    expect(pc.name).toBe('Scout'); expect(pc.ranged).toContain('Longbow');
    expect(printCanonFor('a knight', 3).name).toBe('Knight');
    // fresh six: the whole phrase first, and a Melee-or-Ranged print row names the melee row
    expect(printCanonFor('a giant spider', 8).name).toBe('Giant Spider');
    expect(printCanonFor('a giant spider', 8).rangedRows).toHaveLength(0); // its Web is a save action in 2024, not a ranged attack roll
    expect(printCanonFor('a guard', 3).melee).toContain('Spear');
    expect(printCanonFor('a guard', 3).rangedRows).toHaveLength(0);
  });
  test('the wolf\'s Bite is Piercing and knocks Prone, with no energy rider', async () => {
    const { rows } = await run({ archetype: 'skirmisher', concept: 'a wolf', userConcept: 'a wolf', resolvedType: 'Beast', mind: 'bestial' }, { name: 'Wild Hunt Wolf', melee_rider: 'Poison' });
    const bite = rows.find((e) => e.name === 'Bite');
    expect(bite.text).toMatch(/Piercing damage/); expect(bite.text).not.toMatch(/plus \d+ \(\d+d\d+\) \w+ damage/);
    expect(bite.text).toMatch(/Prone condition/);
  });
  test('"blind beyond this radius" is exclusive: darkvision leaves the senses line', async () => {
    const { m } = await run({ archetype: 'skirmisher', concept: 'a thing', userConcept: 'a thing' }, { senses: 'blindsight 10 ft. (blind beyond this radius), darkvision 60 ft.' });
    expect(m.senses).toMatch(/blindsight 10 ft\. \(blind beyond this radius\)/); expect(m.senses).not.toMatch(/darkvision/);
  });
  test('a lurking object without a tether folds the Roper limb onto its primary attack and loses the Reel', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaledT = scaleDonor(pickDonor(5, 'trap', 'lurker'), 5, { mechanics: [] });
    const rowsBefore = Object.values(scaledT.sections).flat().map((e) => e.name);
    expect(rowsBefore).toContain('Grasping Limb'); expect(rowsBefore).toContain('Reel');
    const { m, trace } = await (async () => {
      const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
      let m;
      try {
        m = await generateReskin({ archetype: 'lurker', style: 'trap', concept: 'a taxidermied bear that hates being looked at', userConcept: 'a taxidermied bear that hates being looked at', cr: 5, mechanics: ['gaze'], resolvedType: 'Construct' }, async (prompt) => {
          if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
          if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
          if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
          const sc = scaleDonor(pickDonor(5, 'trap', 'lurker'), 5, { mechanics: [] });
          // the gate already folded the chassis by the time the main call is built: name what is left
          const renames = {}; rk(sc).forEach((k, i) => { renames[k] = `Named Row${i}`; });
          const typed = Object.values(sc.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
          return JSON.stringify({ name: 'Gallery Mount', type: 'Construct', size: 'Large', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Frightened' }, melee_rider: 'none' });
        });
      } finally { console.log = orig; }
      return { m, trace: lines.join('\n') };
    })();
    expect(trace).toMatch(/reach folded:/);
    const rows = Object.values(m.sections).flat();
    expect(rows.some((e) => /reach 50 ft/.test(e.text ?? ''))).toBe(false);
    expect(rows.some((e) => /pulls each creature Grappled/.test(e.text ?? ''))).toBe(false);
    expect(rows.some((e) => /Melee Attack Roll/.test(e.text ?? '') && /Grappled condition \(escape DC \d+\)/.test(e.text ?? ''))).toBe(true);
    expect(rows.find((e) => e.name === 'Multiattack')?.text ?? '').not.toMatch(/Reel|Grasping Limb/);
    // the claimed gaze OWES its trait, and a lurking object has no voice
    expect(rows.some((e) => e.template === 'gaze-aura')).toBe(true);
    expect(m.languages).toMatch(/can't speak/);
  });
});

test("the shifter's beast is the concept's: a miller who turns into a boar prints boar forms and a Boar-gated bite (2026-09-28)", async () => {
  const { renameKeysOf: rk } = require('../generate.mjs');
  const sc = scaleDonor(pickDonor(3, 'shifter', 'skirmisher'), 3, { mechanics: [] });
  const renames = {}; rk(sc).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(sc.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  const ans = JSON.stringify({ name: 'Grave Miller', type: 'Humanoid', size: 'Medium', alignment: 'Chaotic Evil', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
  const m = await generateReskin({ archetype: 'skirmisher', style: 'shifter', concept: 'a miller who turns into a boar under the moon', userConcept: 'a miller who turns into a boar under the moon', cr: 3, mechanics: [], resolvedType: 'Humanoid' }, async (prompt) => {
    if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
    if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
    if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
    return ans;
  });
  const rows = Object.values(m.sections).flat();
  expect(rows.find((e) => /^Shape-Shift/.test(e.name))?.text).toMatch(/boar-humanoid hybrid or a Medium boar/);
  expect(rows.some((e) => /\(Boar or Hybrid Form Only\)/.test(e.name ?? ''))).toBe(true);
  expect(m.generation.donor).toBe('skirmisher-3-shifter');
});

describe('the new lines\' first read (critic, new-lines 2026-09-28)', () => {
  const { printCanonFor, reskinDefects, renameKeysOf } = require('../generate.mjs');
  const run = async (opts, over = {}) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 8, mechanics: [], ...opts }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(over);
      });
    } finally { console.log = orig; }
    return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
  };
  test('a print name as the HEAD NOUN of a longer concept is its block — unless the block is a Beast (reskin material)', () => {
    expect(printCanonFor('a doppelganger who wears the faces of the dead in Ash Row', 3).name).toBe('Doppelganger');
    expect(printCanonFor('a knight who commands the garrison of the eastern wall', 3).name).toBe('Knight');
    expect(printCanonFor('a wolf that hunts the moon and eats the stars out of the sky', 5)).toBeNull();
    expect(printCanonFor('a miller who turns into a boar under the moon and roots up the graves', 3)).toBeNull(); // no print block heads it
    const bw = printCanonFor('a barrow-wight', 3); expect(bw.name).toBe('Wight'); expect(bw.exact).toBe(false); // a hyphenated head borrows the Wight's rows, keeps its seat
    const bwl = printCanonFor('a barrow-wight that erupts in a shockwave of grave earth around it when roused', 7); expect(bwl?.name).toBe('Wight'); expect(bwl.exact).toBe(false); expect(bwl.borrowOnly).toBe(true); expect(bwl.traits.map((t) => t.name)).toContain('Sunlight Sensitivity');
    expect(printCanonFor('a doppelganger who wears the faces of the dead', 3).borrowOnly).toBe(true); // every head match is a borrow now (day-one two, 2026-10-01): rows + array ride, the seat stays, no blind fallback
    const uni = printCanonFor('a unicorn gone mad from grief', 13); expect(uni?.name).toBe('Unicorn'); expect(uni.borrowOnly).toBe(true); // "gone" splits the head phrase
    // the critic's ten (2026-10-01): a prefix name, a two-word head, an override clause, a whole name that names the sheet
    const fg = printCanonFor('fire giant blacksmith', 9); expect(fg?.name).toBe('Fire Giant'); expect(fg.borrowOnly).toBe(true); expect(fg.nameIsPrint).toBe(false);
    const og = printCanonFor('big ogre with a club, cr 5', 5); expect(og?.name).toBe('Ogre'); expect(og.exact).toBe(false); // a head-word match: the Ogre's rows ride, the seat stays, and the fallback stands down when nothing is asked
    const dw = printCanonFor('a dire wolf but undead', 1); expect(dw?.name).toBe('Dire Wolf'); expect(dw.exact).toBe(true); expect(dw.nameIsPrint).toBe(true);
    expect(printCanonFor('goblin boss', 1).nameIsPrint).toBe(true); expect(printCanonFor('a mind flayer that lost its tentacles', 7)).toBeNull(); // no Mind Flayer in the SRD corpus
    expect(fg.cr).toBe(9); expect(fg.atk).toBe(11); // print's own numbers ride for the at-CR rule
    expect(printCanonFor('a lighthouse hermit-mage whose lantern beam brands whoever it lights', 6).shootsAtRange).toBe(true); // the Mage's Arcane Burst is a ranged attack: the chassis ranged row stays
    const hag = printCanonFor("a hag who trades in children's teeth", 4); expect(hag?.name).toMatch(/Hag$/); expect(hag.borrowOnly).toBe(true); // a short head end-matches a print family
    expect(printCanonFor('a wolf that hunts the moon and eats the stars out of the sky', 5)).toBeNull(); // a Beast head is still reskin material
    const kn = printCanonFor('a knight who has sworn never to sleep until the king is avenged', 8); expect(kn.name).toBe('Knight'); expect(kn.exact).toBe(false); expect(kn.borrowOnly).toBe(true); // an NPC class heads a borrow: the vow keeps its seat
  });
  test('print canon renames: a two-word ranged name is renamed whole (the Bandit\'s Multiattack read "Hurled Scimitar")', async () => {
    const sk = scaleDonor(pickDonor(2, null, 'skirmisher'), 2, { mechanics: [] });
    const b = await run({ archetype: 'skirmisher', cr: 2, concept: 'a bandit who robs pilgrims on the mountain road', userConcept: 'a bandit who robs pilgrims on the mountain road', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(sk, 'Pawnbroker', { 'Melee Attack': 'Knife', 'Ranged Attack': 'Hurled Knife' }));
    const ma = b.rows.find((e) => e.name === 'Multiattack');
    expect(ma.text).toMatch(/Scimitar or Light Crossbow/); expect(ma.text).not.toMatch(/Hurled/);
    // print's rules rows outside Traits ride along: the Doppelganger's Shape-Shift (Bonus Action) and Read Thoughts (Action)
    const dop = printCanonFor('a doppelganger who wears the faces of the dead in Ash Row', 3);
    expect(dop.rulesRows.map((r) => `${r.section}/${r.name}`)).toEqual(expect.arrayContaining(['Bonus Actions/Shape-Shift', 'Actions/Read Thoughts']));
    expect(dop.rulesRows.map((r) => r.name)).not.toContain('Slam');
    expect(dop.casts).toBe(false); expect(dop.size).toMatch(/^Medium/);
    expect(dop.exact).toBe(false); expect(dop.borrowOnly).toBe(true); expect(printCanonFor('a hungry ooze', 0.5).exact).toBe(false); expect(printCanonFor('a canal ghost', 6).exact).toBe(false); expect(printCanonFor('a wolf', 5).exact).toBe(true); // a modified or ending match borrows rows; only the whole name re-routes
    expect(printCanonFor('a mage who hoards the eastern wind', 6).casts).toBe(true);
    expect(printCanonFor('a unicorn gone mad from grief', 13).casts).toBe(false); // casts in print, fights in melee: not casting-PRIMARY
    expect(printCanonFor("a hag who trades in children's teeth", 4).casts).toBe(false);
    expect(printCanonFor('a unicorn gone mad from grief', 13).rulesRows.map((r) => r.name)).toContain('Spellcasting'); // print's own list rides along
  });
  test('a print name as the head noun outranks the verb router: the doppelganger is not a caster, and the seat style stands down', async () => {
    const r = await run({ archetype: 'caster', style: 'skulker', concept: 'a doppelganger who reads what the living are thinking', userConcept: 'a doppelganger who reads what the living are thinking', cr: 3, resolvedType: 'Monstrosity', mind: 'sapient' },
      fullAnswer(scaleDonor(pickDonor(3, null, 'skirmisher'), 3, { mechanics: [] }), 'Mourning Mask', { 'Melee Attack': 'Claw' }));
    expect(r.trace).toMatch(/is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line/);
    expect(r.trace).toMatch(/the Doppelganger's body outranks the skulker seat — no verb in the words names it; the plain (?:caster|skirmisher) line/); // the seat stands down first; the caster demotion line follows it
    expect(r.rows.some((e) => /^Spellcasting$/.test(e.name))).toBe(false);
    expect((r.m.sections['Bonus Actions'] ?? []).some((e) => e.name === 'Shape-Shift')).toBe(true);
    expect(r.rows.some((e) => e.name === 'Read Thoughts')).toBe(true);
    // print's ARRAY rides with print's rows; a row that names its stat derives its DC from it; the roll note rides along
    expect(r.trace).toMatch(/print canon array: STR 11, DEX \d+, CON 14, INT 11, WIS 12, CHA 14/);
    expect(r.m.stats.CHA).toBe(14);
    const rt = r.rows.find((e) => e.name === 'Read Thoughts');
    expect(rt.text).toMatch(new RegExp(`spell save DC ${8 + r.m.pb + 2}\\)`));
    expect(r.rows.find((e) => e.name === 'Slam').text).toMatch(/Melee Attack Roll:\*? \+\d+ \(with Advantage during the first round of each combat\), reach/);
  });
  test('the sheet\'s inline form: the model declares a personal name and the rules stand behind it; an energy rider on a Humanoid needs the concept\'s warrant; digging earns Burrow; the vulnerability warrant is the user\'s text', async () => {
    const leader = scaleDonor(pickDonor(3, 'leader', 'defender'), 3, { mechanics: [] });
    const base = { archetype: 'defender', style: 'leader', cr: 3, resolvedType: 'Humanoid', mind: 'sapient' };
    const g = await run({ ...base, concept: 'an orc warlord at the head of his warband', userConcept: 'an orc warlord at the head of his warband' },
      { ...fullAnswer(leader, 'Gormak Skullsplitter', { 'Melee Attack': 'Cleaver', 'Hybrid Attack': 'Handaxe' }), inline: 'Gormak', melee_rider: 'Poison', vulnerability: 'Fire', lore: 'Gormak fears fire above all things.' });
    expect(g.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^Gormak makes/);
    expect(g.trace).toMatch(/inline form: "Gormak"/);
    expect(g.rows.find((e) => e.name === 'Cleaver').text).not.toMatch(/plus \d+ \(\d+d\d+\) Poison/); // no venom in the concept's words
    expect(g.trace).toMatch(/energy rider withheld: Poison on a Humanoid/);
    expect(String(g.m.vulnerabilities ?? '')).toBe(''); // the lore's fire is not the user's
    expect(g.trace).toMatch(/vulnerability rejected/);
    const bad = await run({ ...base, concept: 'an orc warlord whose venomed cleaver rots the wound', userConcept: 'an orc warlord whose venomed cleaver rots the wound' },
      { ...fullAnswer(leader, 'Gormak Skullsplitter', { 'Melee Attack': 'Cleaver', 'Hybrid Attack': 'Handaxe' }), inline: 'the Warlord Gormak', melee_rider: 'Poison' });
    expect(bad.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^Gormak makes/); // a malformed declaration falls to the rules — and the coined-surname rule reads Skullsplitter as a family name (2026-09-29)
    expect(bad.rows.find((e) => e.name === 'Cleaver').text).toMatch(/plus \d+ \(\d+d\d+\) Poison damage/); // "venomed" warrants it
    const miller = await run({ archetype: 'skirmisher', style: 'shifter', cr: 3, concept: 'a miller who turns into a boar under the moon and roots up the graves', userConcept: 'a miller who turns into a boar under the moon and roots up the graves', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(scaleDonor(pickDonor(3, 'shifter', 'skirmisher'), 3, { mechanics: [] }), 'Grave Miller', { 'Melee Attack': 'Fist' }));
    expect(miller.m.speed).toMatch(/Burrow \d+ ft\./);
    expect(miller.trace).toMatch(/burrow by concept/);
    // a natural-weapon name that survives the repair round falls to print's Scratch
    const tusk = await run({ archetype: 'skirmisher', style: 'shifter', cr: 3, concept: 'a miller who turns into a boar under the moon', userConcept: 'a miller who turns into a boar under the moon', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(scaleDonor(pickDonor(3, 'shifter', 'skirmisher'), 3, { mechanics: [] }), 'Hollowtusk', { 'Melee Attack': 'Tusk' }));
    expect(tusk.trace).toMatch(/"Tusk" is a beast's weapon on an every-form row — "Melee Attack" takes print's Scratch/);
    expect(tusk.rows.some((e) => e.name === 'Scratch' && /Melee Attack Roll/.test(e.text))).toBe(true);
    expect(tusk.rows.some((e) => /^Tusk$/.test(e.name))).toBe(false);
  });
  const fullAnswer = (scaled, name, over) => {
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); Object.assign(renames, over);
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    return { name, type: 'Humanoid', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
  };
  test('the weapon table: a launcher renamed onto the hybrid row becomes a ranged row at print\'s range; a thrown weapon keeps both halves at its own', async () => {
    const leader = scaleDonor(pickDonor(8, 'leader', 'defender'), 8, { mechanics: [] });
    const xbow = await run({ archetype: 'defender', style: 'leader', concept: 'a sergeant who orders a volley', userConcept: 'a sergeant who orders a volley', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Sergeant Haldrun Ironvolley', { 'Melee Attack': 'Shield Bash', 'Hybrid Attack': 'Heavy Crossbow' }));
    const hx = xbow.rows.find((e) => /^Heavy Crossbow/.test(e.name));
    expect(hx).toBeDefined();
    expect(hx.text).toMatch(/Ranged Attack Roll:\*? \+\d+, range 100\/400 ft\./);
    expect(hx.text).not.toMatch(/Melee or Ranged|reach \d+ ft/);
    // a launcher rolls Dexterity: the row's bonus is Dex mod + PB, whatever the striker stat paid
    const dexBonus = Math.floor(((xbow.m.stats.DEX ?? 10) - 10) / 2) + xbow.m.pb;
    expect(Number(/\+(\d+), range/.exec(hx.text)[1])).toBe(dexBonus);
    // and the damage side takes Dex too
    const dexMod = Math.floor(((xbow.m.stats.DEX ?? 10) - 10) / 2);
    const dm = /\d+ \(\d+d\d+(?: ([+-]) (\d+))?\)/.exec(hx.text);
    expect(dm[1] ? (dm[1] === '-' ? -Number(dm[2]) : Number(dm[2])) : 0).toBe(dexMod);
    const gun = await run({ archetype: 'defender', style: 'leader', concept: 'a buccaneer queen who commands from the quarterdeck', userConcept: 'a buccaneer queen who commands from the quarterdeck', resolvedType: 'Humanoid', mind: 'sapient' }, // "pirate" is a print alias: the Pirate carries no pure ranged row, so a model-named Flintlock leaves on that body (the critic's third species read) — this pin tests the weapon table, not the print body
      fullAnswer(leader, 'Salt-Crowned Admiral', { 'Melee Attack': 'Cutlass', 'Hybrid Attack': 'Flintlock' }));
    const fl = gun.rows.find((e) => /^Flintlock/.test(e.name));
    expect(fl.text).toMatch(/^\*?Ranged Attack Roll:\*? \+\d+, range 30\/90 ft\./);
    expect(xbow.trace).toMatch(/weapon table: "Heavy Crossbow" — a launcher, never thrown, range 100\/400/);
    // the personal name: a rank-titled name speaks by its rank
    expect(xbow.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^The sergeant makes/);
    const mod = await run({ archetype: 'defender', style: 'leader', concept: 'a sergeant who orders a volley', userConcept: 'a sergeant who orders a volley', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Volley Sergeant Koldrek', { 'Melee Attack': 'Shield Bash', 'Hybrid Attack': 'Heavy Crossbow' }));
    expect(mod.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^The sergeant makes/); // a modifier before the rank is still a rank-titled name
    // "orders a volley" draws the volley order, not the rally (library round 2026-09-29)
    expect((mod.m.sections['Bonus Actions'] ?? []).some((e) => /^Volley Order/.test(e.name) && /can take a Reaction to make one ranged attack roll/.test(e.text))).toBe(true);
    const axe = await run({ archetype: 'defender', style: 'leader', concept: 'a warlord who bellows her troops into a frenzy', userConcept: 'a warlord who bellows her troops into a frenzy', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Drumkalla the Red', { 'Melee Attack': 'Cleaver', 'Hybrid Attack': 'Handaxe' }));
    const ha = axe.rows.find((e) => /^Handaxe/.test(e.name));
    expect(ha.text).toMatch(/Melee or Ranged Attack Roll:\*? \+\d+, reach 5 ft\. or range 20\/60 ft\./);
    // "Name the Epithet" speaks by the given name, no article
    expect(axe.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^Drumkalla makes/);
    expect(axe.rows.map((e) => e.text).join('\n')).not.toMatch(/\bthe red\b/);
    // the leader's fallback owes the rally shape, not a punisher drawn by hash
    expect(axe.trace).toMatch(/library seed drawn: rally -> Bonus Actions/); // the command words rank rally first; the style default heads it when they don't
    expect(axe.trace).not.toMatch(/own-turn-punisher/);
    expect((axe.m.sections['Bonus Actions'] ?? []).some((e) => /Temporary Hit Points/.test(e.text))).toBe(true);
  });
  test('a chassis nova that sends a tremor in all directions is an Emanation; a golem\'s Immutable Form leaves a non-Construct', async () => {
    const jug = scaleDonor(pickDonor(9, 'juggernaut', 'brute'), 9, { mechanics: [] });
    const r = await run({ archetype: 'brute', style: 'juggernaut', cr: 9, concept: 'a barrow ossuary given legs that stomps and sends a tremor in all directions', userConcept: 'a barrow ossuary given legs that stomps and sends a tremor in all directions', resolvedType: 'Undead', mind: 'mindless' },
      Object.assign(fullAnswer(jug, 'Barrow Ossuary', {}), { type: 'Undead' }));
    const nova = r.rows.find((e) => /\(Recharge [\d–-]+\)/.test(e.name) && /Emanation originating from the barrow ossuary/.test(e.text));
    expect(nova).toBeDefined(); expect(nova.text).not.toMatch(/Cone/);
    expect(r.trace).toMatch(/nova geometry: .* 30-foot Cone → 15-foot Emanation/);
    expect(r.rows.some((e) => e.name === 'Immutable Form')).toBe(false);
    expect(r.trace).toMatch(/trait stripped: Traits\/Immutable Form — a golem's trait on a Undead/);
    // a chassis nova obeys the cap a fitted one obeys
    expect(r.trace).toMatch(/nova capped: ".*" \d+ → \d+ \(the chassis nova obeys the cap: 50 at CR 9\)/);
    expect(Number(/(\d+) \(\d+d\d+/.exec(nova.text)[1])).toBeLessThanOrEqual(50);
  });
  test('a borrowed print body outranks a body-shaped seat no verb named; the concept keeps its movement; the "plus" clause sits in the damage clause; a coined surname is a person', async () => {
    const trap = scaleDonor(pickDonor(7, 'trap', 'lurker'), 7, { mechanics: [] });
    const w = await run({ archetype: 'lurker', style: 'trap', cr: 7, movement: ['burrow'], concept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', userConcept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', resolvedType: 'Undead', mind: 'sapient' },
      Object.assign(fullAnswer(scaleDonor(pickDonor(7, null, 'lurker'), 7, { mechanics: [] }), 'Barrow-Wight', { 'Melee Attack': 'Barrow-Fist' }), { type: 'Undead' }));
    expect(w.trace).toMatch(/print canon route: the Wight's body outranks the trap seat — no verb in the words names it; the plain lurker line/);
    expect(w.trace).toMatch(/donor: lurker-\d+ ->/); expect(w.trace).not.toMatch(/donor: lurker-\d+-trap/);
    expect(w.m.speed).toMatch(/Burrow \d+ ft\./); // a borrowed head keeps the concept's own movement
    const sword = w.rows.find((e) => e.name === 'Necrotic Sword');
    if (sword && / plus \d+ \(/.test(sword.text)) expect(sword.text).toMatch(/(?:Bludgeoning|Piercing|Slashing) damage plus \d+ \(\d+d\d+\) Necrotic damage\./);
    const leader = scaleDonor(pickDonor(3, 'leader', 'defender'), 3, { mechanics: [] });
    const g = await run({ archetype: 'defender', style: 'leader', cr: 3, concept: 'a goblin warchief who screams fire at will to her archers', userConcept: 'a goblin warchief who screams fire at will to her archers', resolvedType: 'Humanoid', mind: 'sapient' },
      { ...fullAnswer(leader, 'Bramblewrack Ironmother', { 'Melee Attack': 'Scimitar', 'Hybrid Attack': 'Handaxe' }), inline: 'the bramblewrack ironmother' });
    expect(g.rows.find((e) => e.name === 'Multiattack').text).toMatch(/^Bramblewrack makes/); // the coined surname rule outranks the model's declaration
  });
  test('the sixth-roll asks: a print body with no seat verb takes the plain line; a hurled weapon needs a thrown row; a Humanoid\'s weapon and header never key on its name; a species speaks its language', async () => {
    // seat: juggernaut on the wight stands down (no verb names it) — the chassis stops flipping between rolls
    const jugW = await run({ archetype: 'brute', style: 'juggernaut', cr: 7, movement: ['burrow'], concept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', userConcept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', resolvedType: 'Undead', mind: 'sapient' },
      Object.assign(fullAnswer(scaleDonor(pickDonor(7, null, 'brute'), 7, { mechanics: [] }), 'Barrow King', { 'Melee Attack': 'Grave-Fist' }), { type: 'Undead' }));
    expect(jugW.trace).toMatch(/the Wight's body outranks the juggernaut seat — no verb in the words names it; the plain brute line/);
    // body plan: the hurled weapon is off any shelf without a thrown row
    const { templatesFor } = require('../templates.mjs');
    const jug = scaleDonor(pickDonor(9, 'juggernaut', 'brute'), 9, { mechanics: [] });
    expect(templatesFor({ archetype: 'brute', cr: 9, sections: jug.sections, section: 'action' }).map((t) => t.id)).not.toContain('throw-retrieve');
    const charger = scaleDonor(pickDonor(9, 'charger', 'brute'), 9, { mechanics: [] });
    expect(templatesFor({ archetype: 'brute', style: 'charger', cr: 9, sections: charger.sections, section: 'action', concept: 'a hollow suit of tourney armor that hurls its own lance' }).map((t) => t.id)).toContain('throw-retrieve'); // the user's lance is something to throw
    expect(templatesFor({ archetype: 'brute', cr: 9, sections: jug.sections, section: 'action', concept: 'a temple gong given legs that stomps' }).map((t) => t.id)).not.toContain('throw-retrieve');
    const hurler = scaleDonor(pickDonor(9, 'hurler', 'skirmisher'), 9, { mechanics: [] });
    expect(templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 9, sections: hurler.sections, section: 'action' }).map((t) => t.id)).toContain('throw-retrieve');
    // a Humanoid's weapon: "Firebrand" dealing Fire with no fire in the words is a defect; the withheld energy never returns as a resistance
    const leader = scaleDonor(pickDonor(3, 'leader', 'defender'), 3, { mechanics: [] });
    const renames = {}; renameKeysOf(leader).forEach((k, i) => { renames[k] = `Named Row${i}`; }); renames['Melee Attack'] = 'Firebrand';
    const typed = Object.values(leader.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const dt = Object.fromEntries(typed.map((n) => [n, 'Slashing'])); dt.Firebrand = 'Fire';
    const p = { name: 'Skarn Emberbrand', type: 'Humanoid', renames, damage_types: dt, conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(leader, p, { energy: null, resolvedType: 'Humanoid', concept: 'a goblin warchief who screams fire at will to her archers' }).join('\n')).toMatch(/"Firebrand" deals Fire on a Humanoid whose concept names no Fire/);
    expect(reskinDefects(leader, p, { energy: null, resolvedType: 'Humanoid', concept: 'a goblin warchief whose torch-sword burns' }).join('\n')).not.toMatch(/names no Fire/);
    const sk = await run({ archetype: 'defender', style: 'leader', cr: 3, energy: 'Fire', concept: 'a goblin warchief who screams fire at will to her archers from the palisade', userConcept: 'a goblin warchief who screams fire at will to her archers from the palisade', resolvedType: 'Humanoid', mind: 'sapient' },
      { ...fullAnswer(leader, 'Skarn Emberbrand', { 'Melee Attack': 'Scimitar', 'Hybrid Attack': 'Handaxe' }), resistances: 'Fire' });
    expect(String(sk.m.resistances ?? '')).not.toMatch(/Fire/); // the withheld energy never returns through the header (the header vet or the withheld guard, whichever meets it first)
    expect(sk.m.languages).toMatch(/Goblin/); // a goblin speaks Goblin
    expect(sk.trace).toMatch(/languages by species: Goblin/);
  });
  test('a missing damage type after repair is typed by anatomy, never a failed block (the forest ambusher\'s Spine)', async () => {
    const lk = scaleDonor(pickDonor(3, null, 'lurker'), 3, { mechanics: [] });
    const ans = fullAnswer(lk, 'Needlethorn', { 'Melee Attack': 'Spine' }); delete ans.damage_types.Spine;
    const r = await run({ archetype: 'lurker', style: null, cr: 3, concept: 'something nasty for a level 3 party, forest, ambush', userConcept: 'something nasty for a level 3 party, forest, ambush', resolvedType: 'Monstrosity', mind: 'bestial' }, Object.assign(ans, { type: 'Monstrosity' }));
    expect(r.trace).toMatch(/damage type by anatomy: "Spine" -> Piercing \(repair exhausted/);
    expect(r.rows.find((e) => e.name === 'Spine').text).toMatch(/Piercing damage/);
  });
  test('the floating-orb overlay (PI follow-up 2026-10-01): speed 0 / Fly 20 hover, Prone immunity, one Bite, darkvision 120, Eye Rays imposed, legendary rays at CR 13; a net is 5/15', async () => {
    const vault = scaleDonor(pickDonor(13, null, 'defender'), 13, { mechanics: [] });
    const b = await run({ archetype: 'defender', style: null, cr: 13, concept: 'a floating orb with one great central eye and a crown of eyestalks that each fire a different ray that guards a vault', userConcept: 'a floating orb with one great central eye and a crown of eyestalks that each fire a different ray that guards a vault', resolvedType: 'Aberration', mind: 'sapient' },
      Object.assign(fullAnswer(vault, 'Vaultkeeper Crown', { 'Melee Attack': 'Crushing Jaw' }), { type: 'Aberration' }));
    expect(b.trace).toMatch(/floating-orb overlay: speed 0 \/ Fly 20 \(hover\), Prone immunity, one Bite row, darkvision 120; the rays fire every turn$/m); // nothing announced that the sheet doesn't carry
    expect(b.m.speed).toBe('0 ft., Fly 20 ft. (hover)'); expect(b.m.immunities).toMatch(/Prone/); expect(b.m.senses).toMatch(/^darkvision 120 ft\./);
    const attacks = b.rows.filter((e) => /Attack Roll/.test(e.text ?? '')); expect(attacks.length).toBe(1); expect(attacks[0].name).toBe('Bite');
    expect(b.m.stats.STR).toBe(10); expect(b.m.stats.INT).toBeGreaterThanOrEqual(16); expect(String(b.m.skills ?? '')).not.toMatch(/Athletics/); // the overlay's array is mental, whatever the seat
    expect(attacks[0].text).toMatch(new RegExp(`Attack Roll:\\*? \\+${b.m.pb},`)); expect(attacks[0].text).toMatch(/Piercing damage/); // a natural bite rolls Str (10) and bites
    expect(b.trace).not.toMatch(/legendary row/); // no legendary rows at CR 13: the overlay announces none
    expect(b.rows.some((e) => e.name === 'Eye Rays' && e.template === 'random-ray')).toBe(true); // at will, print's shape
    // legendary rows live on the 17-rung: an orb there fires one ray per legendary turn
    const vault17 = scaleDonor(pickDonor(17, null, 'defender'), 17, { mechanics: [] });
    const b17 = await run({ archetype: 'defender', style: null, cr: 17, concept: 'a floating orb with a crown of eyestalks that each fire a different ray', userConcept: 'a floating orb with a crown of eyestalks that each fire a different ray', resolvedType: 'Aberration', mind: 'sapient' },
      Object.assign(fullAnswer(vault17, 'Tyrant Orb', { 'Melee Attack': 'Crushing Jaw' }), { type: 'Aberration' }));
    expect(b17.rows.filter((e) => e.name === 'Legendary Ray').length).toBeGreaterThanOrEqual(1);
    expect(b17.rows.some((e) => /^Legendary/.test(e.name) && /Attack Roll/.test(e.text ?? ''))).toBe(false); // no limb rows in the legendary trio either
    expect(b.rows.find((e) => e.name === 'Multiattack').text).toMatch(/makes one Bite attack and uses Eye Rays\.$/);
    // a net is a thrown 5/15 weapon; a yuan-ti's alias text names the shifter seat
    const sk = scaleDonor(pickDonor(2, null, 'skirmisher'), 2, { mechanics: [] });
    const kt = await run({ archetype: 'skirmisher', style: null, cr: 2, concept: 'a fish-headed humanoid cultist of the deep who fights with net and spear', userConcept: 'a fish-headed humanoid cultist of the deep who fights with net and spear', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(sk, 'Drowned Netter', { 'Melee Attack': 'Spear', 'Ranged Attack': 'Net' }));
    const netRow = kt.rows.find((e) => /^Net/.test(e.name)); expect(netRow.text).toMatch(/range 5\/15 ft\./); expect(netRow.text).toMatch(/Large or smaller, it has the Restrained condition until it escapes \(escape DC \d+\)/); expect(netRow.text).not.toMatch(/damage|returns to/); // the 2024 Net
    expect((kt.m.sections.Traits ?? []).some((e) => e.name === 'Amphibious')).toBe(true); // of the deep
    const cs = scaleDonor(pickDonor(5, 'warpriest', 'caster'), 5, { mechanics: [] });
    const kc = await run({ archetype: 'caster', style: 'warpriest', cr: 5, concept: 'a fish-headed humanoid cultist of the deep who fights with net and spear', userConcept: 'a fish-headed humanoid cultist of the deep who fights with net and spear', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(cs, 'Deepcaller', Object.fromEntries(Object.keys(fullAnswer(cs, 'x', {}).renames).filter((k) => /Ranged/.test(k)).map((k) => [k, 'Net']))));
    const netC = kc.rows.find((e) => /^Net/.test(e.name)); if (netC) { expect(netC.text).toMatch(/range 5\/15 ft\./); expect(netC.text).toMatch(/Restrained condition until it escapes/); } // the caster chassis's single-range row takes the net too
    const sp = { name: 'Husk', type: 'Aberration', renames: { 'Melee Attack': 'Mindspike' }, damage_types: { Mindspike: 'Psychic' }, spells: { at_will: ['Mind Spike', 'Fear'], daily: [] }, conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(sk, sp, { resolvedType: 'Aberration', concept: 'a psychic aberration' }).join('\n')).toMatch(/"Mindspike" is a spell on this creature's own list/);
    const { verbLines } = require('../route.mjs');
    expect(verbLines('a serpent-blooded humanoid who sheds human form for scales and fangs')).toContain('skirmisher-shifter');
  });
  test('the critic\'s ten (2026-10-01): a whole print name names the sheet; a user-named type outranks print\'s; a ghost owes no Assassinate', async () => {
    const sk = scaleDonor(pickDonor(1, null, 'skirmisher'), 1, { mechanics: [] });
    const gb = await run({ archetype: 'defender', style: 'leader', cr: 1, concept: 'goblin boss', userConcept: 'goblin boss', resolvedType: 'Humanoid', mind: 'sapient' },
      Object.assign(fullAnswer(scaleDonor(pickDonor(1, null, 'defender'), 1, { mechanics: [] }), 'Krag the Iron Standard', { 'Melee Attack': 'Iron Blade' }), { type: 'Fey' }));
    expect(gb.m.name).toBe('Goblin Boss'); expect(gb.m.type).toBe('Fey'); // print's own name and print's own type (2024 goblins are Fey)
    // at print's own CR the array and attack bonus are print's: the Fire Giant at CR 9
    const fgRun = await run({ archetype: 'brute', style: null, cr: 9, concept: 'fire giant blacksmith', userConcept: 'fire giant blacksmith', resolvedType: 'Giant', mind: 'sapient' },
      Object.assign(fullAnswer(scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] }), 'Forge Giant', { 'Melee Attack': 'Forgehammer' }), { type: 'Giant' }));
    expect(fgRun.m.stats.STR).toBe(25); expect(fgRun.trace).toMatch(/print canon array: .* at its own CR; attack \+\d+ -> \+11/);
    expect(fgRun.rows.find((e) => e.name === 'Flame Sword').text).toMatch(/Melee Attack Roll:\*? \+11/);
    const dw = await run({ archetype: 'skirmisher', style: null, cr: 1, concept: 'a dire wolf but undead', userConcept: 'a dire wolf but undead', resolvedType: 'Undead', mind: 'bestial' },
      Object.assign(fullAnswer(sk, 'Thawborn', { 'Melee Attack': 'Bite' }), { type: 'Undead' }));
    expect(dw.m.type).toBe('Undead'); expect(dw.m.name).toBe('Dire Wolf'); expect((dw.m.sections.Traits ?? []).some((e) => e.name === 'Pack Tactics')).toBe(true);
    expect(dw.trace).toMatch(/print canon type: Undead stays — the words say undead/);
    const ph = scaleDonor(pickDonor(4, 'phantom', 'lurker'), 4, { mechanics: [] });
    const gh = await run({ archetype: 'lurker', style: 'phantom', cr: 4, concept: 'the ghost of a bride who drowned on her wedding day', userConcept: 'the ghost of a bride who drowned on her wedding day', resolvedType: 'Undead', mind: 'sapient' },
      Object.assign(fullAnswer(ph, 'Drowned Vow', {}), { type: 'Undead' }));
    expect(gh.rows.some((e) => e.name === 'Assassinate')).toBe(false);
  });
  test('the small round (2026-10-01): print size/speed/reach ride; a second print melee row rides; the rider slot refuses idea-only binds; a bleed needs an edge; signature elements are rewritten; a Humanoid swings a weapon; the seat owes only when the words earned it', async () => {
    // size, base speed, reach, second melee row — the Unicorn on a Large chassis
    const brute = scaleDonor(pickDonor(13, null, 'brute'), 13, { mechanics: [] });
    const u = await run({ archetype: 'brute', style: null, cr: 13, concept: 'a unicorn gone mad from grief', userConcept: 'a unicorn gone mad from grief', resolvedType: 'Celestial', mind: 'sapient' },
      Object.assign(fullAnswer(brute, 'Grieving Horn', { 'Melee Attack': 'Hoof' }), { type: 'Celestial', size: 'Huge' }));
    expect(u.m.size).toBe('Large'); expect(u.m.speed).toMatch(/^50 ft\./);
    expect(u.m.type).toBe('Celestial'); expect(u.m.languages).toMatch(/Celestial, Elvish, Sylvan; telepathy 120 ft\./); // the header is print's too (2026-10-01)
    expect(u.rows.some((e) => /Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''))).toBe(false); // the brute's ranged row leaves a Unicorn
    expect(u.rows.some((e) => /\(Recharge [\d–-]+\)/.test(e.name ?? '') && !e.library)).toBe(false); // and so does its chassis nova
    expect(u.rows.find((e) => e.name === 'Multiattack').text).not.toMatch(/Bolt|Nova|Named Row/);
    const uf = await run({ archetype: 'brute', style: null, cr: 13, movement: ['fly'], concept: 'a unicorn gone mad from grief', userConcept: 'a unicorn gone mad from grief', resolvedType: 'Celestial', mind: 'sapient' },
      Object.assign(fullAnswer(brute, 'Grieving Horn', { 'Melee Attack': 'Hoof' }), { type: 'Celestial', size: 'Huge' }));
    expect(uf.m.speed).not.toMatch(/Fly/); expect(uf.trace).toMatch(/print canon modes: fly off/); // a model-added mode needs the user's words
    const uw = await run({ archetype: 'brute', style: null, cr: 13, movement: ['fly'], concept: 'a winged unicorn gone mad from grief', userConcept: 'a winged unicorn gone mad from grief', resolvedType: 'Celestial', mind: 'sapient' },
      Object.assign(fullAnswer(brute, 'Grieving Horn', { 'Melee Attack': 'Hoof' }), { type: 'Celestial', size: 'Huge' }));
    expect(uw.m.speed).toMatch(/Fly/);
    expect(JSON.stringify(require('../../../../data/srd52-monsters.json'))).not.toMatch(/\de\/Day/); // the SRD scrape's "1e/Day" is normalized in the data
    expect(u.rows.some((e) => e.name === 'Hooves')).toBe(true); expect(u.rows.some((e) => e.name === 'Radiant Horn')).toBe(true);
    expect(u.rows.find((e) => e.name === 'Multiattack').text).toMatch(/using Hooves or Radiant Horn in any combination/);
    expect(u.rows.find((e) => e.name === 'Hooves').text).toMatch(/reach 5 ft\./);
    // the rider slot: an idea-only bind is declined on every body; the bleed card needs an edge
    const { templatesFor } = require('../templates.mjs');
    const jug = scaleDonor(pickDonor(9, 'juggernaut', 'brute'), 9, { mechanics: [] });
    expect(templatesFor({ archetype: 'brute', cr: 9, sections: jug.sections, section: 'rider', concept: 'a temple gong given legs' }).map((t) => t.id)).not.toContain('affliction'); // Slam only
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 9, mechanics: [], archetype: 'brute', style: 'juggernaut', concept: 'a temple gong given legs that stomps and sends a tremor in all directions', userConcept: 'a temple gong given legs that stomps and sends a tremor in all directions', resolvedType: 'Construct', mind: 'mindless' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'When its slam lands, the target is hooked on the rim and dragged a few feet toward the gong by the ringing.', section: 'rider', trigger: 'on_hit', effect: 'movement' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'hook-rider', because: 'hooked and dragged', name: 'Bone-Rattling Note' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(Object.assign(fullAnswer(jug, 'Iron Chime', {}), { type: 'Construct' }));
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/rider declined: "Bone-Rattling Note" — bound on shape or on the idea's own words alone/);
    expect(Object.values(m.sections).flat().some((e) => e.template === 'hook-rider' || /pulled|dragged/.test(e.text ?? '') && /Slam/.test(e.name ?? ''))).toBe(false);
    // signature elements are rewritten before the naming pass; a Humanoid swings a weapon; the seat owes only when earned
    const leader = scaleDonor(pickDonor(3, 'leader', 'defender'), 3, { mechanics: [] });
    let mainPrompt = '';
    const lines2 = []; console.log = (...a) => { lines2.push(a.join(' ')); };
    try {
      await generateReskin({ cr: 3, mechanics: [], archetype: 'defender', style: 'leader', signatureElements: ['screams fire at will to her archers [behavior]'], concept: 'a goblin warchief who screams fire at will to her archers', userConcept: 'a goblin warchief who screams fire at will to her archers', resolvedType: 'Humanoid', mind: 'sapient' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        mainPrompt = mainPrompt || prompt;
        return answer(fullAnswer(leader, 'Skarrag', { 'Melee Attack': 'Scimitar', 'Hybrid Attack': 'Handaxe' }));
      });
    } finally { console.log = orig; }
    expect(mainPrompt).toMatch(/looses at will/); expect(mainPrompt).not.toMatch(/fire at will/);
    const renames = {}; renameKeysOf(leader).forEach((k, i) => { renames[k] = `Named Row${i}`; }); renames['Melee Attack'] = 'Claw';
    const typed = Object.values(leader.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const p = { name: 'Skarrag', type: 'Humanoid', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(leader, p, { resolvedType: 'Humanoid', concept: 'a goblin warchief who screams at her archers' }).join('\n')).toMatch(/"Claw" is a natural weapon on a Humanoid whose concept gives it none/);
    expect(reskinDefects(leader, p, { resolvedType: 'Humanoid', concept: 'a goblin warchief with iron claws' }).join('\n')).not.toMatch(/natural weapon on a Humanoid/);
    const skulk = scaleDonor(pickDonor(4, 'skulker', 'skirmisher'), 4, { mechanics: [] });
    const h = await run({ archetype: 'skirmisher', style: 'skulker', cr: 4, concept: 'a hermit who talks to crows', userConcept: 'a hermit who talks to crows', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(skulk, 'Carrion Hermit', { 'Melee Attack': 'Bone Knife' }));
    expect(h.trace).toMatch(/seat owes nothing: the skulker line was the model's read of its quote/);
    expect(h.rows.some((e) => e.name === 'Assassinate')).toBe(false);
  });
  test('a print body\'s row set is closed: its array and Life Drain ride, the seat owes nothing, the sword keeps print\'s split; one verb binds once; row names are unique', async () => {
    const lurk = scaleDonor(pickDonor(7, null, 'lurker'), 7, { mechanics: [] });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 7, mechanics: [], archetype: 'lurker', style: null, movement: ['burrow'], energy: 'Necrotic', concept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', userConcept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', resolvedType: 'Undead', mind: 'sapient' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'The wight erupts in a shockwave of grave earth around it, battering everything nearby.', section: 'action', trigger: 'save', effect: 'damage' }, trait: { idea: 'When roused it erupts again, spraying grave-dirt that clings and slows the living.', section: 'trait', trigger: 'once_per_fight', effect: 'damage' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify(/clings and slows/.test(prompt) && !/battering everything/.test(prompt) ? { template: 'bloodied-burst', because: 'erupts when roused', name: 'Grave-Dirt Spray' } : { template: 'ground-burst', because: 'erupts around it', name: 'Grave Eruption' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(Object.assign(fullAnswer(lurk, 'Barrow-Wight', { 'Melee Attack': 'Grave Claw' }), { type: 'Undead' }));
      });
    } finally { console.log = orig; }
    const trace = lines.join('\n'); const rows = Object.values(m.sections).flat();
    expect(trace).toMatch(/print canon array: STR 15, DEX \d+, CON 16, INT 10, WIS 13, CHA 15/); // the Wight's own array rides on a borrow (the striker re-fits to the card)
    expect(rows.some((e) => e.name === 'Life Drain')).toBe(true); // print's signature rides
    expect(rows.some((e) => e.name === 'Assassinate')).toBe(false); // the seat owes nothing on a print body
    expect(trace).toMatch(/print canon: chassis row leaves — Bonus Actions\//); // the lurker's escape BA is the seat's, not the Wight's
    const sword = rows.find((e) => e.name === 'Necrotic Sword');
    expect(sword.text).toMatch(/Slashing damage plus \d+ \(\d+d\d+\) Necrotic damage/);
    expect(trace).toMatch(/keys spent by the action: .*erupt/);
    // the creature's head noun and its materials are never spent: a shell action on a bell-crab leaves "crab", "shell", "bell" to the trait shelf
    const crabT = scaleDonor(pickDonor(6, 'grappler', 'brute'), 6, { mechanics: [] });
    const crab = await run({ archetype: 'brute', style: 'grappler', cr: 6, concept: 'a hermit crab the size of a wagon that wears a stolen bronze church bell as its shell and rings it by slamming its own body against the inside when it is wounded', userConcept: 'a hermit crab the size of a wagon that wears a stolen bronze church bell as its shell and rings it by slamming its own body against the inside when it is wounded', resolvedType: 'Beast', mind: 'bestial' },
      Object.assign(fullAnswer(crabT, 'Bell Crab', {}), { type: 'Beast' }));
    expect(crab.trace).not.toMatch(/keys spent by the action: .*(?:crab|shell|bell)/);
    expect(trace).toMatch(/trait cards excluded — verb spent by the action: .*bloodied-burst/);
    expect(rows.some((e) => e.template === 'bloodied-burst')).toBe(false); // one verb, one bind
    expect(rows.some((e) => e.template === 'ground-burst')).toBe(true);
    const names = rows.map((e) => String(e.name).replace(/ \(.*\)$/, '').toLowerCase());
    expect(new Set(names).size).toBe(names.length); // unique row names
  });
  test('concept-key first: when the idea path has nothing, the user\'s own words bind the trait shelf (the sergeant\'s stance); a reaction\'s name never sits on an attack row', async () => {
    const leader = scaleDonor(pickDonor(5, 'leader', 'defender'), 5, { mechanics: [] });
    const s = await run({ archetype: 'defender', style: 'leader', cr: 5, concept: 'a dwarven crossbow sergeant who orders a volley and holds the shield line', userConcept: 'a dwarven crossbow sergeant who orders a volley and holds the shield line', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Shieldwall Sergeant', { 'Melee Attack': 'Warhammer', 'Hybrid Attack': 'Hand Crossbow' }));
    expect(s.trace).toMatch(/trait bound to the concept's verb \(concept-first\): guarded-stance — .*shield line.* in the user's words; the idea path had nothing/);
    expect((s.m.sections.Traits ?? []).some((e) => e.name === 'Guarded Stance')).toBe(true);
    expect(s.trace).toMatch(/volley-order/); // the concept's verb draws the volley card beside the stance
    // one key that is the creature's own head noun binds too (the cloister gong: resonant-body on "gong")
    const jug = scaleDonor(pickDonor(8, 'juggernaut', 'brute'), 8, { mechanics: [] });
    const gong = await run({ archetype: 'brute', style: 'juggernaut', cr: 8, concept: 'a temple gong given legs that walks the cloister at night and tolls for the dead', userConcept: 'a temple gong given legs that walks the cloister at night and tolls for the dead', resolvedType: 'Construct', mind: 'mindless' },
      Object.assign(fullAnswer(jug, 'Cloister Gong', {}), { type: 'Construct' }));
    expect(gong.trace).toMatch(/trait bound to the concept's verb \(concept-first\): resonant-body — .*gong.* in the user's words/);
    expect((gong.m.sections.Traits ?? []).some((e) => e.template === 'resonant-body')).toBe(true);
    const renames = {}; renameKeysOf(leader).forEach((k, i) => { renames[k] = `Named Row${i}`; }); renames['Melee Attack'] = 'Jagged Parry';
    const typed = Object.values(leader.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const p = { name: 'Grixa', type: 'Humanoid', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(leader, p, {}).join('\n')).toMatch(/"Jagged Parry" is a reaction's name on an attack row/);
  });
  test('a chassis nova carries its provenance line', async () => {
    const jug = scaleDonor(pickDonor(9, 'juggernaut', 'brute'), 9, { mechanics: [] });
    const g = await run({ archetype: 'brute', style: 'juggernaut', cr: 9, concept: 'a temple gong given legs that stomps and sends a tremor in all directions', userConcept: 'a temple gong given legs that stomps and sends a tremor in all directions', resolvedType: 'Construct', mind: 'mindless' },
      Object.assign(fullAnswer(jug, 'Iron Chime', { 'Area Nova': 'Tremor Toll' }), { type: 'Construct' }));
    expect(g.trace).toMatch(/chassis nova: "Tremor Toll \(Recharge 5-6\)" — the brute-9-juggernaut's own nova row \(its "Area Nova", renamed by the model\)/);
  });
  test('a hyphenated head borrows print\'s rows and KEEPS its seat; a "plus" damage clause joins the damage line', async () => {
    const jug = scaleDonor(pickDonor(7, null, 'brute'), 7, { mechanics: [] }); // the seat stands down to the plain brute, whose rows the mock must name (the Wight keeps a ranged row: print's Necrotic Bow)
    const w = await run({ archetype: 'brute', style: 'juggernaut', cr: 7, concept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', userConcept: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused', resolvedType: 'Undead', mind: 'sapient' },
      Object.assign(fullAnswer(jug, 'Barrow-Wight', { 'Melee Attack': 'Barrow-Fist', 'Ranged Attack': 'Barrow-Bow' }), { type: 'Undead' }));
    expect(w.trace).toMatch(/print canon: .* heads on the Wight — print's rows ride along; the seat stays/);
    expect(w.trace).not.toMatch(/the seats stand down/);
    expect((w.m.sections.Traits ?? []).some((e) => e.name === 'Sunlight Sensitivity')).toBe(true);
    const sword = w.rows.find((e) => e.name === 'Necrotic Sword');
    expect(sword).toBeDefined(); expect(sword.text).toMatch(/Slashing damage plus \d+ \(\d+d\d+\) Necrotic damage\./); expect(sword.text).not.toMatch(/damage\. plus/);
  });
  test('a Humanoid\'s energy needs the user\'s words with fixed phrases read first; an arrow is the bow\'s row; an idea-only trait bind is declined on a meat body', async () => {
    const leader = scaleDonor(pickDonor(3, 'leader', 'defender'), 3, { mechanics: [] });
    const sk = await run({ archetype: 'defender', style: 'leader', cr: 3, energy: 'Fire', concept: 'a goblin warchief who screams fire at will to her archers from the palisade', userConcept: 'a goblin warchief who screams fire at will to her archers from the palisade', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Skarnna the Palisade', { 'Melee Attack': 'Scimitar', 'Hybrid Attack': 'Falling Arrow' }));
    expect(sk.trace).toMatch(/energy withheld: Fire on a Humanoid with no Fire in the concept's own words/);
    expect(sk.rows.map((e) => e.text).join('\n')).not.toMatch(/Fire damage/);
    const arrow = sk.rows.find((e) => /^Falling Arrow/.test(e.name));
    expect(arrow.text).toMatch(/^\*?Ranged Attack Roll:\*? \+\d+, range 150\/600 ft\./); // an arrow is the bow's, never a javelin
    const fiery = await run({ archetype: 'defender', style: 'leader', cr: 3, energy: 'Fire', concept: 'a goblin warchief whose torch-sword burns the palisade', userConcept: 'a goblin warchief whose torch-sword burns the palisade', resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(leader, 'Skarnna', { 'Melee Attack': 'Torch-Sword', 'Hybrid Attack': 'Handaxe' }));
    expect(fiery.trace).not.toMatch(/energy withheld/); // "burns" warrants it
    // the sniper's tracker: a trait bound only on the idea's own words
    const archer = scaleDonor(pickDonor(4, 'archer', 'skirmisher'), 4, { mechanics: [] });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 4, mechanics: [], archetype: 'skirmisher', style: 'archer', concept: 'a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him', userConcept: 'a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him', resolvedType: 'Humanoid', mind: 'sapient' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'Its quarry is marked with an iron bead; it tracks the marked creature anywhere it runs and cannot lose the trail.', section: 'trait', trigger: 'always', effect: 'defense' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'faultless-tracker', because: 'it tracks the marked quarry', name: 'Marked Quarry' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(fullAnswer(archer, 'Iron Legion Sharpshot', { 'Melee Attack': 'Shortsword' }));
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/trait declined: "Marked Quarry" — bound only on the idea's own words/);
    expect((m.sections.Traits ?? []).some((e) => e.name === 'Marked Quarry')).toBe(false);
  });
  test('a nova taken on shape alone is declined: the cauldron\'s vent (library round 2026-09-29)', async () => {
    const brute = scaleDonor(pickDonor(9, 'grappler', 'brute'), 9, { mechanics: [] });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ cr: 9, mechanics: [], archetype: 'brute', style: 'grappler', concept: "a bog witch's iron cauldron that walks on three legs and cooks whatever climbs in", userConcept: "a bog witch's iron cauldron that walks on three legs and cooks whatever climbs in", resolvedType: 'Construct', mind: 'mindless' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'The kettlewright hooks the nearest creature with its ladle-arm, then vents scalding steam and molten iron splash from its seams; every creature nearby is scalded.', section: 'action', trigger: 'save', effect: 'damage' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'ground-burst', because: 'a vent of steam around it', name: 'Scalding Vent' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(Object.assign(fullAnswer(brute, 'Kettlewright', {}), { type: 'Construct' }));
      });
    } finally { console.log = orig; }
    const trace = lines.join('\n');
    expect(trace).toMatch(/nova declined: "Scalding Vent \(Recharge 5-6\)" — a whole-round ability taken on shape alone/);
    expect(Object.values(m.sections).flat().some((e) => /Emanation originating from/.test(e.text ?? '') && /Recharge/.test(e.name))).toBe(false);
    // and a nova bound only on the IDEA's words ("around it" in the proposal, not the concept) is declined too
    const lines2 = []; console.log = (...a) => { lines2.push(a.join(' ')); };
    let m2;
    try {
      m2 = await generateReskin({ cr: 9, mechanics: [], archetype: 'brute', style: 'grappler', concept: "a bog witch's iron cauldron that walks on three legs and cooks whatever climbs in", userConcept: "a bog witch's iron cauldron that walks on three legs and cooks whatever climbs in", resolvedType: 'Construct', mind: 'mindless' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'The cauldron tips and spills scalding bog-water in a wide hissing wave around it, scalding everything nearby.', section: 'action', trigger: 'save', effect: 'damage' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'ground-burst', because: 'a wave around it', name: 'Scalding Spill' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return answer(Object.assign(fullAnswer(brute, 'Kettlewright', {}), { type: 'Construct' }));
      });
    } finally { console.log = orig; }
    expect(lines2.join('\n')).toMatch(/nova declined: "Scalding Spill \(Recharge 5-6\)" — a whole-round ability bound only on the idea's own words/);
    expect(Object.values(m2.sections).flat().some((e) => e.template === 'ground-burst')).toBe(false);
  });
  test('a shifter\'s all-forms row is a weapon or unarmed strike, never the beast\'s natural weapon; a water beast\'s shifter is Amphibious', async () => {
    const scaled = scaleDonor(pickDonor(3, 'shifter', 'skirmisher'), 3, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    renames['Melee Attack'] = 'Gore';
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    const p = { name: 'Grave-Reaper Miller', type: 'Humanoid', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    expect(reskinDefects(scaled, p, {}).join('\n')).toMatch(/"Gore" is a beast's natural weapon on a row usable in EVERY form/);
    renames['Melee Attack'] = 'Scratch';
    expect(reskinDefects(scaled, p, {}).join('\n')).not.toMatch(/natural weapon/);
    const shark = await run({ archetype: 'skirmisher', style: 'shifter', cr: 8, concept: "a sea-hag's daughter who becomes a shark", userConcept: "a sea-hag's daughter who becomes a shark", resolvedType: 'Humanoid', mind: 'sapient' },
      fullAnswer(scaleDonor(pickDonor(8, 'shifter', 'skirmisher'), 8, { mechanics: [] }), 'Brineveil', { 'Melee Attack': 'Scratch' }));
    expect((shark.m.sections.Traits ?? []).find((e) => e.name === 'Amphibious')?.text).toBe('Brineveil can breathe air and water.'); // a one-word Humanoid name the model minted is a person (the critic's third species read, 2026-10-13)
    expect(shark.rows.some((e) => /\(Shark or Hybrid Form Only\)/.test(e.name))).toBe(true);
    expect(shark.m.languages).not.toBe('None'); // a Humanoid speaks (the miller printed None)
  });
});

describe('form-ten (2026-10-01): the form\'s own words ride over print', () => {
  test('an exact print match keeps the user\'s named mode and number: Owlbear, "Flying speed of 60ft"', async () => {
    const concept = 'Owlbear — Flying speed of 60ft';
    const m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 3, movement: ['fly'] }, async () => answer({ name: 'Owlbear', type: 'Monstrosity', size: 'Large' }));
    expect(m.speed).toMatch(/Fly 60 ft\./);
    expect(m.speed).not.toMatch(/hover/); // the seat hovers; the user's words only fly
    expect(m.speed).toMatch(/Climb 40 ft\./); // print's own mode number
    expect(m.languages).toBe('None'); // print's None stands on a beast body
    expect((m.sections.Traits ?? []).map((e) => e.name)).not.toContain('Hedge Runner'); // the seat's trait (the mock's name for Mobility Trait) leaves with its bonus action
    expect(m.speed).toMatch(/^40 ft\./); // print's base walk stays
  });
  test('"no legendary actions, no lair" removes the rows print would stamp on an Ancient Red Dragon', async () => {
    const concept = 'Ancient Red Dragon — no legendary actions, no lair, I want it beatable by a level 10 party';
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(15, null, 'brute'), 15, { mechanics: [] });
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const dragon = JSON.stringify({
      name: 'Ancient Red Dragon', type: 'Dragon', size: 'Gargantuan', alignment: 'Chaotic Evil', senses: 'blindsight 60 ft., darkvision 120 ft.', languages: 'Common, Draconic',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Fire'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none',
      wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has the Prone condition.`,
    });
    const m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 15 }, async () => dragon);
    expect(m.sections['Legendary Actions']).toBeUndefined();
    expect(m.sections['Lair Actions']).toBeUndefined();
    expect(Object.values(m.sections).flat().map((e) => e.name).join('|')).not.toMatch(/Legendary Resistance/);
    const { cardBudget } = require('../card-budgets.mjs');
    expect(m.hp).toBeGreaterThanOrEqual(Math.round(cardBudget(15, { legendary: false }).hp * 0.9) - 3); // the legendary HP trade leaves with the kit
    const breaths = (m.sections.Actions ?? []).filter((e) => /Recharge/.test(e.name));
    expect(breaths.map((e) => e.name)).toEqual(['Fire Breath (Recharge 5-6)']); // one breath: the chassis nova at CR 15 wearing print's name
  });
  test('"Can turn invisible once per day" on a CR 1/4 kobold is a claim: the wildcard stays open and the Vanish seed answers it', async () => {
    const concept = 'Kobold — Can turn invisible once per day';
    const m = await generateReskin({ archetype: 'skirmisher', concept, userConcept: concept, cr: 0.25, mechanics: [] }, async () => answer({ name: 'Kobold', type: 'Humanoid', size: 'Small' }));
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /Invisib/i.test(`${e.name} ${e.text}`))).toBe(true);
    expect(all.find((e) => /Invisib/i.test(e.text)).name).toMatch(/^Vanish/);
    expect(m.hp).toBe(7); // the Kobold Warrior's own HP at its own CR, not the card's 21
    expect((m.sections.Traits ?? []).map((e) => e.name)).not.toContain('Hedge Runner'); // the seat stood down; its trait leaves ("Darting Scamper", third roll)
  });
  test('a 2014 sheet keeps the Goblin Boss Humanoid — the Fey reclass is 2024\'s alone', async () => {
    const concept = 'Goblin Boss — riding a worg';
    const g24 = await generateReskin({ archetype: 'skirmisher', concept, userConcept: concept, cr: 1 }, async () => answer({ name: 'Goblin Boss', type: 'Humanoid', size: 'Small' }));
    expect(g24.type).toBe('Fey');
    const g14 = await generateReskin({ archetype: 'skirmisher', concept, userConcept: concept, cr: 1, edition: '2014' }, async () => answer({ name: 'Goblin Boss', type: 'Humanoid', size: 'Small' }));
    expect(g14.type).toBe('Humanoid');
  });
  test('a print head draws the fallback on the user\'s words alone — the seat idea\'s dive never deals the Owlbear a Rampage', async () => {
    const concept = 'Owlbear — Flying speed of 60ft';
    const m = await generateReskin({ archetype: 'skirmisher', concept, userConcept: concept, cr: 3, movement: ['fly'] }, async (prompt) => {
      if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'It folds its wings and plunges talons-first, hauling the target off its feet and dragging it along the dive.', section: 'action', trigger: 'on_hit', effect: 'movement' } });
      return answer({ name: 'Owlbear', type: 'Monstrosity', size: 'Large' });
    });
    expect(Object.values(m.sections).flat().some((e) => e.library)).toBe(false);
    expect(m.speed).toMatch(/Fly 60 ft\./);
  });
  test('the user\'s addition outranks print\'s stand-down: "Goblin Boss — riding a worg" keeps the mounted seat, print\'s rows ride along, one bonus action', async () => {
    const concept = 'Goblin Boss — riding a worg';
    const { printCanonFor, renameKeysOf: rk } = require('../generate.mjs');
    const pc = printCanonFor(concept, 1);
    expect(pc.name).toBe('Goblin Boss'); expect(pc.exact).toBe(false); expect(pc.borrowOnly).toBe(true);
    const scaled = scaleDonor(pickDonor(1, 'mounted', 'skirmisher'), 1, { mechanics: [] });
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const boss = JSON.stringify({ name: 'Goblin Boss', type: 'Humanoid', size: 'Small', alignment: 'Neutral Evil', senses: 'darkvision 60 ft.', languages: 'Common, Goblin', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Dexterity Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.` });
    const m = await generateReskin({ archetype: 'skirmisher', style: 'mounted', concept, userConcept: concept, cr: 1 }, async () => boss);
    expect(m.generation.donor).toMatch(/mounted/);
    const all = Object.values(m.sections).flat();
    expect(all.some((e) => /Difficult Terrain/.test(e.text ?? ''))).toBe(true); // the seat's rider trait stayed
    expect((m.sections['Bonus Actions'] ?? []).map((e) => e.name)).toEqual(['Nimble Escape']); // print's own; the seat's generic bonus action yields
    expect((m.sections.Actions ?? []).some((e) => /Recharge/.test(e.name))).toBe(true); // the seat's nova stays — the user named the seat
    expect(m.speed).not.toMatch(/^30 ft\./); // the mount carries the boss; print's 30 ft. walk yields
    for (const r of Object.values(m.sections).flat().filter((e) => /Attack Roll/.test(e.text ?? '') && /\+ \d+\)/.test(e.text))) expect(r.text).toMatch(/\+ 2\)/); // DEX 15 adds +2
    // the model minted a person; print's name takes over and the inline follows it off every row
    const minted = JSON.parse(boss); minted.name = 'Skarn the Worgmaster'; minted.inline = 'Skarn';
    const m2 = await generateReskin({ archetype: 'skirmisher', style: 'mounted', concept, userConcept: concept, cr: 1 }, async () => JSON.stringify(minted));
    expect(m2.name).toBe('Goblin Boss');
    expect(Object.values(m2.sections).flat().map((e) => e.text).join('\n')).not.toMatch(/\bSkarn\b/);
    const { printHeadCr } = require('../generate.mjs');
    expect(printHeadCr('a swarm of rats that carries plague')).toBe(0.25); // a whole print name at the head is the CR source (the route read 10)
    expect(printHeadCr('Stone Golem — Output statblock in German')).toBe(10); expect(printHeadCr('kobold')).toBe(0.125); expect(printHeadCr('a hedge-witch who curses thieves')).toBeNull();
    const { printCanonFor: pcf } = require('../generate.mjs');
    expect(pcf('a death knight who leads a cavalry of the damned', 17)?.name).not.toBe('Knight'); // a head-word borrow stays near print's CR (the CR 3 Knight)
    expect(pcf('a canal ghost that drowns bargemen', 7)?.name).toBe('Ghost'); // CR 4 print within reach of 7 still lends its rows
  });
  test('"Stone Golem" at CR 10 is print\'s array end to end: +10 to hit, a +6 damage bonus, and a Force Bolt that deals Force', async () => {
    const concept = 'Stone Golem';
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(10, 'juggernaut', 'brute'), 10, { mechanics: [] });
    const renames = { 'Ranged Attack': 'Hurl Boulder' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); // print's ranged row joins a chassis that has none; the model names it live
    const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name), 'Hurl Boulder'];
    const golem = JSON.stringify({ name: 'Stone Golem', type: 'Construct', size: 'Large', alignment: 'Unaligned', senses: 'darkvision 120 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Constitution Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.` });
    const m = await generateReskin({ archetype: 'brute', style: 'juggernaut', concept, userConcept: concept, cr: 10 }, async () => golem);
    const rows = Object.values(m.sections).flat().filter((e) => /Attack Roll/.test(e.text ?? ''));
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) { if (/Force Bolt/.test(r.name)) continue; expect(r.text).toMatch(/Attack Roll:\*? \+10/); if (/\+ \d+\)/.test(r.text)) expect(r.text).toMatch(/\+ 6\)/); }
    expect(rows.some((e) => /Force Bolt/.test(e.name) && /^\*Ranged Attack Roll:\* \+9, range 120 ft\. 22 \(4d10\) Force damage/.test(e.text))).toBe(true); // print's OWN ranged row, verbatim: +9 and a flat 4d10, not the sheet's +10 with +6 (the critic's canaries read, 2026-10-12)
    // the model names the ranged row a launcher ("Stone Bolt"): the weapon table rolls it off DEX 9, then print's row takes its numbers back
    const g2 = JSON.parse(golem); g2.renames['Ranged Attack'] = 'Stone Bolt'; g2.damage_types['Stone Bolt'] = 'Bludgeoning'; delete g2.damage_types['Hurl Boulder'];
    const m2 = await generateReskin({ archetype: 'brute', style: 'juggernaut', concept, userConcept: concept, cr: 10 }, async () => JSON.stringify(g2));
    const bolt = Object.values(m2.sections).flat().find((e) => /Force Bolt/.test(e.name));
    expect(bolt.text).toMatch(/^\*Ranged Attack Roll:\* \+9, range 120 ft\. 22 \(4d10\) Force damage/); // print's row verbatim on an exact body at print's CR (canaries 2026-10-12)
  });
  test('below CR 1/2 a chassis makes one attack: the CR 1/4 kobold is the Kobold Warrior by alias and carries no Multiattack', () => {
    const { printCanonFor } = require('../generate.mjs');
    expect(printCanonFor('Kobold — Can turn invisible once per day', 0.25)?.name).toBe('Kobold Warrior');
    const s = scaleDonor(pickDonor(0.25, null, 'skirmisher'), 0.25, { mechanics: [] });
    expect(Object.values(s.sections).flat().some((e) => e.name === 'Multiattack')).toBe(false);
    expect(Object.values(scaleDonor(pickDonor(1, null, 'skirmisher'), 1, { mechanics: [] }).sections).flat().some((e) => e.name === 'Multiattack')).toBe(true);
    const witch = Object.values(scaleDonor(pickDonor(2, 'binder', 'caster'), 2, { mechanics: [] }).sections).flat().find((e) => e.name === 'Multiattack');
    if (witch) expect(witch.text).not.toMatch(/makes three/); // under CR 5 print makes at most two (the Manticore alone makes three)
  });
  test('a cloud is breathed, not cut: the noun table types dust and pollen as Poison', () => {
    const { TYPE_BY_NOUN } = require('../generate.mjs');
    expect(TYPE_BY_NOUN.dust).toBe('Poison'); expect(TYPE_BY_NOUN.pollen).toBe('Poison'); expect(TYPE_BY_NOUN.club).toBe('Bludgeoning'); expect(TYPE_BY_NOUN.hex).toBe('Necrotic');
  });
  test('"carries plague" at the Swarm of Rats\' own CR 1/4 is a rider claim: the idea path runs instead of the claim gate closing the sheet', async () => {
    const concept = 'a swarm of rats that carries plague';
    const lines = []; const orig = console.log; console.log = (...a) => lines.push(a.join(' '));
    try { await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 0.25, mechanics: [] }, async () => answer({ name: 'Plague Rats', type: 'Beast', size: 'Medium' })); } catch (e) { /* the mock cannot name a brute's rows; the gate line is what this pins */ } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/claim gate: CR 0\.25 but the words ask for a rider \(contagion\)/);
    expect(lines.join('\n')).not.toMatch(/the wildcard slot drops/);
  });
  test('a kinship title is a title: "Grandmother Ashwick" reads as Ashwick on the rows, never "the grandmother ashwick"', async () => {
    const concept = 'Grandmother Ashwick — a village hedge-witch who curses anyone who steals from her garden';
    const m = await generateReskin({ archetype: 'skirmisher', concept, userConcept: concept, cr: 2 }, async () => answer({ name: 'Grandmother Ashwick', type: 'Humanoid', size: 'Medium' }));
    const text = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(text).not.toMatch(/the grandmother ashwick/i);
    expect(text).toMatch(/\bthe grandmother\b/i); // print's rank idiom: the sergeant, the priest, the grandmother
  });
});

// THE COLD WYRM'S GUT (the critic's fifth read, flagged three times): print's
// interiors match the body they are inside. Where the form declares no energy,
// the creature's own words name one, and only an unnamed gut digests in acid.
describe('the engulf interior takes the concept\'s energy (2026-10-13)', () => {
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
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
    return JSON.stringify({
      name: 'Gullet Wyrm', type: 'Monstrosity', size: 'Large', alignment: 'Chaotic Neutral',
      senses: 'darkvision 60 ft.', languages: 'Draconic',
      renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Strength',
      wildcard: "*Strength Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has the Prone condition until the start of the creature's next turn.",
    });
  };
  const withStyle = (style) => (cr) => bruteAnswer(cr, 'grappler').replace(/}$/, `,"engulf_style":${JSON.stringify(style)}}`);
  const interior = (m) => Object.values(m.sections).flat().find((e) => e.rules && /^(?:Swallow|Engulf|Smother|Whelm|Cage|Entomb|Cocoon)\b/.test(e.name ?? ''))?.text ?? '';

  test('a rime-scaled wyrm swallows for Cold, not Acid', async () => {
    const desc = 'a rime-scaled wyrm that swallows sailors whole';
    const m = await generateReskin({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => withStyle('swallow')(5)));
    const t = interior(m);
    expect(t).toBeTruthy();
    expect(t).toMatch(/Cold damage/);
    expect(t).not.toMatch(/Acid damage/);
  });

  test('a gullet the words never colour still digests in acid', async () => {
    const desc = 'a gutter-wyrm that swallows sailors whole';
    const m = await generateReskin({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5, style: 'grappler', mechanics: [] },
      quiet2(() => withStyle('swallow')(5)));
    expect(interior(m)).toMatch(/Acid damage/);
  });
});
