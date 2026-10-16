// Pins for the stage 3 / stage 4 / critic-hold landings of 2026-10-16.
// Categories are the ones proposed at the owner's stop point 2: routing (the
// right source wins), data integrity (a landed row matches what justified it),
// and integration (credit requires a receipt).
import { generateReskin, renameKeysOf, TEXT_GATE, rowWhen, rowOften } from '../generate.mjs';
import { novasOf, danglingRefIn, rowNamesOf } from '../checker.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

// The engine fails loudly on an unrenamed row, so a stub must answer a rename
// for every key the picked donor actually carries (the house pattern).
const stub = (cr, style, archetype, over = {}) => {
  const scaled = scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });
  // The engine may route to a different donor than the one named here, so the
  // stub answers a rename for every canonical slot as well as this donor's keys.
  const CANON = ['Melee Attack', 'Ranged Attack', 'Sweeping Area Attack', 'Signature Slot',
    'Escape Action', 'Mobility Trait', 'Reactive Reposition', 'Legendary Move and Attack',
    'Legendary Ranged Attack', 'Legendary Escape'];
  const renames = {};
  [...new Set([...renameKeysOf(scaled), ...CANON])].forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat()
    .filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  return JSON.stringify({
    name: 'Gloam Courser', size: 'Medium', alignment: 'Neutral Evil', languages: 'Common',
    renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])),
    conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity',
    ...over,
  });
};
const run = (concept, cr, style, archetype, over) => generateReskin(
  { archetype, style, concept, userConcept: concept, cr },
  async () => stub(cr, style, archetype, over),
);

// ROUTING — a Humanoid's darkvision needs a warrant; print gives it to 1 of 26.
describe('darkvision needs a warrant (owner, 2026-10-16)', () => {
  test('a plain Humanoid loses the darkvision the call echoed', async () => {
    const m = await run('a veteran soldier with a longsword who bashes with a buckler',
      6, 'charger', 'brute', { type: 'Humanoid', senses: 'darkvision 60 ft.' });
    expect(m.senses).not.toMatch(/darkvision/i);
    expect(m.senses).toMatch(/Passive Perception \d+/); // the line survives, stripped
  });

  test("the GM's own word for the dark is a warrant and keeps it", async () => {
    const m = await run('a cellar-born killer who hunts in the dark and never carries a light',
      6, 'charger', 'brute', { type: 'Humanoid', senses: 'darkvision 60 ft.' });
    expect(m.senses).toMatch(/darkvision/i);
  });

  test('scene-setting is not a warrant: "moves through the shadows" earns nothing', async () => {
    const m = await run('a ninja who moves through the shadows and strikes unseen',
      5, 'charger', 'brute', { type: 'Humanoid', senses: 'darkvision 60 ft.' });
    expect(m.senses).not.toMatch(/darkvision/i);
  });

  test('a Dragon keeps it — print: 45 of 45', async () => {
    const m = await run('an adult storm dragon whose breath is a rolling wall of thunder',
      15, 'charger', 'brute', { type: 'Dragon', senses: 'darkvision 120 ft.' });
    expect(m.senses).toMatch(/darkvision 120 ft\./i);
  });

  test('an Ooze loses invented darkvision but keeps the senses it earned', async () => {
    const m = await run('a cathedral-vault ooze that digests reliquaries',
      9, 'charger', 'brute', { type: 'Ooze', senses: 'blindsight 60 ft., darkvision 60 ft.' });
    expect(m.senses).toMatch(/blindsight 60 ft\./i);
    expect(m.senses).not.toMatch(/darkvision/i);
  });
});

// ROUTING — the cap evicts filler, never the sheet's ability to attack.
describe('eviction order under the row cap (stage 4 item 1)', () => {
  test('a Multiattack never cites a row that left for the cap', async () => {
    const m = await run('a lizardfolk monk who strikes pressure points with an open hand',
      5, 'skirmisher', 'skirmisher', { type: 'Humanoid' });
    const rows = Object.values(m.sections).flat();
    const live = rows.map((e) => e.name.replace(/\s*\(.*$/, '').trim());
    const ma = rows.find((e) => /^Multiattack$/i.test(e.name));
    if (ma) {
      for (const cited of ma.text.match(/\bNamed Row\d+\b/g) ?? []) {
        expect(live).toContain(cited);
      }
    }
  });

  test('the sheet always keeps something to attack with', async () => {
    const m = await run('a ninja who moves through the shadows and strikes unseen',
      5, 'skirmisher', 'skirmisher', { type: 'Humanoid' });
    const acts = (m.sections.Actions ?? []).filter((e) => !/^Multiattack$/i.test(e.name));
    expect(acts.length).toBeGreaterThan(0);
  });
});

// INTEGRATION — one definition, every reader (critic hold 4). novasOf is
// TEXT_GATE *plus* a damage expression, so the pin is that the gate phrase is
// what flips it, not that the two predicates are equivalent.
describe('TEXT_GATE is the one gate both readers use (critic hold 4)', () => {
  // A nova is the gate AND a saving throw AND damage dice — novasOf prices it,
  // so the pin fixes the gate's contribution, not the whole predicate.
  const save = 'each creature in a 20-foot Emanation makes a DC 15 Dexterity Saving Throw, taking 18 (4d8) Fire damage on a failed save';
  test('a gate phrase makes a priced row a nova; the same row without it is not', () => {
    for (const phrase of ['The first time it is Bloodied in a fight, ' + save + '.',
                          'When it dies, ' + save + '.']) {
      expect(TEXT_GATE.test(phrase)).toBe(true);
      expect(novasOf({ sections: { traits: [{ name: 'Death Throes', text: phrase }] } }).length).toBe(1);
    }
    const plain = 'Once per turn, ' + save + '.';
    expect(TEXT_GATE.test(plain)).toBe(false);
    expect(novasOf({ sections: { traits: [{ name: 'Sneak', text: plain }] } }).length).toBe(0);
  });
});

// INTEGRATION — the dangling-reference scan is one predicate, so generation
// cannot build what the checker will fail (the Court Step-Wizard's Longbow).
describe('a cited row must exist (one definition, every reader)', () => {
  const sheet = { sections: { Actions: [{ name: 'Slam' }, { name: 'Spellcasting' }], Reactions: [{ name: 'Missed Step Riposte' }] } };

  test('a weapon the sheet lacks is caught', () => {
    expect(danglingRefIn('In response to a missed attack, it makes use of Longbow against the attacker.', rowNamesOf(sheet))).toBe('Longbow');
  });

  test('a row the sheet has is not caught', () => {
    expect(danglingRefIn('It makes use of Slam against the attacker.', rowNamesOf(sheet))).toBeNull();
  });

  test('a gate name on the row does not hide it from the scan', () => {
    expect(rowNamesOf({ sections: { Actions: [{ name: 'Fire Breath (Recharge 5-6)' }] } })).toContain('Fire Breath');
  });

  test('the "makes one X attack" shape is caught too — the shape that shipped the Longbow', () => {
    // snap-shot renders "The creature makes one {ranged_name} attack against that
    // creature." The first version of this guard only scanned "uses X" and missed it.
    expect(danglingRefIn('*Trigger:* A creature moves within 5 feet. *Response:* The creature makes one Longbow attack against that creature.', rowNamesOf(sheet))).toBe('Longbow');
    expect(danglingRefIn('The creature makes one Slam attack against that creature.', rowNamesOf(sheet))).toBeNull();
  });

  test('a Multiattack keeps its exemption — naming rows is its whole job', () => {
    expect(danglingRefIn('It makes two Claw attacks.', [], 'Multiattack')).toBeNull();
    expect(danglingRefIn('It makes two Claw attacks.', [], 'Snap Shot')).toBe('Claw');
  });

  test("print's own idioms are not dangling: a spell, an action, another stat block", () => {
    const n = rowNamesOf(sheet);
    expect(danglingRefIn('It can cast Fireball.', n)).toBeNull();
    expect(danglingRefIn('It uses Multiattack.', n)).toBeNull();
    expect(danglingRefIn('It uses the creature\'s stat block.', n)).toBeNull();
  });
});

// ROUTING — the engine may not invent a weapon to fill a slot the sheet cannot
// satisfy. This is the root cause the dangling guard caught downstream.
describe('a ranged-host template needs a ranged row (nothing invented)', () => {
  const { TEMPLATE_BY_ID, renderTemplate } = require('../templates.mjs');
  const ctx = (over = {}) => ({
    scaled: { cr: 5, pb: 3, dc: 13, atk: 6, per_hit: 11, stats: { STR: 10, DEX: 16, CON: 12, INT: 16, WIS: 12, CHA: 14 }, striker_stat: 'DEX', sections: {} },
    sections: {}, archetype: 'skirmisher', cr: 5, concept: 'a court wizard who is never where you struck',
    name: 'Court Step-Wizard', type: 'Humanoid', meleeName: 'Slam', rangedName: null, ...over,
  });

  test('no ranged row: the template declines instead of rendering a Longbow', () => {
    expect(renderTemplate(TEMPLATE_BY_ID.get('snap-shot'), ctx(), {}, { blind: true })).toBeNull();
  });

  test('a ranged row present: it renders with the sheet\'s own row name', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('snap-shot'), ctx({ rangedName: 'Chill Bolt' }), {}, { blind: true });
    expect(r).not.toBeNull();
    expect(r.text).toMatch(/Chill Bolt/);
    expect(r.text).not.toMatch(/Longbow/);
  });

  test('a melee-host template is unaffected', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('interpose'), ctx(), {}, { blind: true });
    if (r) expect(r.text).not.toMatch(/Longbow/);
  });
});

// ROUTING — the implied class is the call's judgement, inside the engine's vetoes.
describe('implied class as a call field (stage 4 item 2)', () => {
  const traced = async (fn) => {
    const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.map(String).join(' ')); };
    try { return { m: await fn(), lines }; } finally { console.log = orig; }
  };
  const ninja = 'a lizardfolk ninja who strikes from the reeds';

  test("a class the key table misses lands on the GM's own word", async () => {
    const { lines } = await traced(() => run(ninja, 5, 'skirmisher', 'skirmisher',
      { type: 'Humanoid', implied_class: 'rogue', implied_class_quote: 'ninja' }));
    expect(lines.join('\n')).toMatch(/implied class kept:.*rogue.*ninja.*key table found none/);
  });

  test('an off-list class is dropped, not coerced — there is no druid kit', async () => {
    const { lines } = await traced(() => run(ninja, 5, 'skirmisher', 'skirmisher',
      { type: 'Humanoid', implied_class: 'druid', implied_class_quote: 'ninja' }));
    expect(lines.join('\n')).toMatch(/implied class refused:.*druid.*not one of the eight/);
  });

  test("a quote that is not the GM's own words is refused", async () => {
    const { lines } = await traced(() => run(ninja, 5, 'skirmisher', 'skirmisher',
      { type: 'Humanoid', implied_class: 'rogue', implied_class_quote: 'a trained killer of the shadow clans' }));
    expect(lines.join('\n')).toMatch(/implied class refused:.*not the GM's own words/);
  });

  test('no quote at all is refused', async () => {
    const { lines } = await traced(() => run(ninja, 5, 'skirmisher', 'skirmisher',
      { type: 'Humanoid', implied_class: 'rogue', implied_class_quote: '' }));
    expect(lines.join('\n')).toMatch(/implied class refused:.*offered no quote/);
  });

  test('a beast takes no class kit however good the quote', async () => {
    const c = 'a dire wolf that hunts in a pack';
    const { lines } = await traced(() => generateReskin(
      { archetype: 'brute', style: 'charger', concept: c, userConcept: c, cr: 3, mind: 'beast' },
      async () => stub(3, 'charger', 'brute', { type: 'Beast', implied_class: 'fighter', implied_class_quote: 'hunts in a pack' }),
    ));
    expect(lines.join('\n')).not.toMatch(/implied class kept/);
  });
});

// DATA INTEGRITY — the asked trigger/limit are checked against the row that
// answered the clause, and the verdict is visible (stage 3 item 3).
describe('the GM\'s asked trigger and limit are checked against the landed row', () => {
  test('a mismatch is reported, not silently rewritten', async () => {
    const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.map(String).join(' ')); };
    const c = 'a berserker who explodes in rage once per day when wounded';
    try {
      await generateReskin({ archetype: 'brute', style: 'charger', concept: c, userConcept: c, cr: 6 },
        async () => stub(6, 'charger', 'brute', {
          type: 'Humanoid',
          clauses: [{ text: 'explodes in rage once per day when wounded', kind: 'mechanical', when: 'when_bloodied', how_often: 'once_per_fight', shape: 'save_area' }],
        }));
    } finally { console.log = orig; }
    const log = lines.join('\n');
    // either a verdict or an honest "unanswered" — never silence on an asked field
    expect(log).toMatch(/ask vs row (ok|MISMATCH):|asked but unanswered:/);
  });
});

// DATA INTEGRITY — the engine's half of the asked trigger/limit, calibrated
// against REAL rows. The first version read all four of these wrong and the
// run came back 0 ok / 4 MISMATCH, which looked like an engine fault and was a
// metric fault: "While Bloodied" demanded "is Bloodied", "hits with" demanded
// "hits a creature", and every N/Day was called once_per_fight.
describe('the row readers, against rows that actually shipped', () => {
  const CASES = [
    ['Bloodied Frenzy', 'While Bloodied, the marauder has Advantage on attack rolls and saving throws.', 'when_bloodied', 'at_will'],
    ['Lay on Hands (2/Day)', 'The censor touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.', 'at_will', 'per_day'],
    ['Divine Smite (2/Day)', 'The censor charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.', 'on_hit', 'per_day'],
    ['Slam', '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d6 + 4) Bludgeoning damage.', 'at_will', 'at_will'],
    ['Death Burst', 'When it dies, the construct explodes.', 'on_death', 'at_will'],
    ['Fire Breath (Recharge 5-6)', 'The dragon exhales fire in a 60-foot Cone.', 'at_will', 'recharge'],
  ];
  test.each(CASES)('%s reads trigger=%s limit=%s', (name, text, wantWhen, wantOften) => {
    expect(rowWhen({ name, text })).toBe(wantWhen);
    expect(rowOften({ name, text })).toBe(wantOften);
  });

  test('a daily budget is not a per-fight gate', () => {
    expect(rowOften({ name: 'Lay on Hands (2/Day)', text: '' })).toBe('per_day');
    expect(rowOften({ name: 'Scream', text: 'The first time it is Bloodied in a fight, it screams.' })).toBe('once_per_fight');
  });
});

// PRINT OVERRULES — a row named for a real weapon carries that weapon's range,
// whatever the chassis numbers fitted. The Pit Champion shipped "Spear ... range
// 30/120 ft." (a javelin's) because the fitted weapon outvoted the row's name.
describe('a weapon row takes the range of the weapon it is named for', () => {
  const { weaponFor, WEAPONS } = require('../weapons.mjs');

  test("the name resolves ahead of a fitted weapon", () => {
    expect(weaponFor('Spear')).toBe('spear');
    expect(WEAPONS[weaponFor('Spear')].range).toBe('20/60');
    expect(WEAPONS.javelin.range).toBe('30/120'); // what it used to inherit
  });

  test('an invented name still falls through to the fitted weapon', () => {
    expect(weaponFor('Thorn Rake')).toBeFalsy();
  });

  test('a compound name still finds its weapon', () => {
    expect(weaponFor('Pit Spear')).toBe('spear');
    expect(weaponFor('Gladiator Spear')).toBe('spear');
  });
});

// DATA INTEGRITY — an asked trigger/limit with no supporting word in the GM's
// own clause is dropped. Without this, the call's over-answering ("mends her own
// wounds" -> on_hit + at_will) is counted as an engine mismatch.
describe('an asked field needs a receipt in the clause', () => {
  const traced = async (fn) => {
    const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.map(String).join(' ')); };
    try { await fn(); return lines.join('\n'); } finally { console.log = orig; }
  };

  test('a clause naming no trigger and no limit drops both', async () => {
    const c = 'an oathsworn crusader who mends her own wounds';
    const log = await traced(() => generateReskin(
      { archetype: 'defender', style: 'rampart', concept: c, userConcept: c, cr: 8 },
      async () => stub(8, 'rampart', 'defender', {
        type: 'Humanoid',
        clauses: [{ text: 'mends her own wounds', kind: 'mechanical', when: 'on_hit', how_often: 'at_will', shape: 'heal' }],
      }),
    ));
    expect(log).toMatch(/asked field dropped:.*mends her own wounds.*no trigger word/);
    expect(log).toMatch(/asked field dropped:.*mends her own wounds.*no frequency word/);
  });

  test('a clause that does name them keeps them', async () => {
    const c = 'a temple guardian that slams the ground at the start of each of its turns';
    const log = await traced(() => generateReskin(
      { archetype: 'brute', style: 'charger', concept: c, userConcept: c, cr: 9 },
      async () => stub(9, 'charger', 'brute', {
        type: 'Construct',
        clauses: [{ text: 'slams the ground at the start of each of its turns', kind: 'mechanical', when: 'start_of_turn', how_often: 'once_per_turn', shape: 'save_area' }],
      }),
    ));
    expect(log).not.toMatch(/asked field dropped:.*slams the ground/);
    expect(log).toMatch(/ask vs row (ok|MISMATCH):|asked but unanswered:/);
  });
});
