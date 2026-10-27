// Pins for the stage 3 / stage 4 / critic-hold landings of 2026-10-16.
// Categories are the ones proposed at the owner's stop point 2: routing (the
// right source wins), data integrity (a landed row matches what justified it),
// and integration (credit requires a receipt).
import { generateReskin, renameKeysOf, TEXT_GATE, rowWhen, rowOften, printCanonFor, vetQuote } from '../generate.mjs';
import { novasOf, danglingRefIn, rowNamesOf, checkBlock, sustainedOf } from '../checker.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { honestAttackNames } from '../header.mjs';

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

  test('a row name with lowercase particles is found whole', () => {
    // bounding the capture to capitalised words alone broke this: "a use of Vow
    // of Silence" captured "Vow" and the checker failed a correct citation
    // (classes-eight-2026-10-17T00-24-00, Shadowvow Stalker)
    expect(danglingRefIn('It can replace one attack with a use of Vow of Silence.', ['Vow of Silence'])).toBeNull();
    expect(danglingRefIn('It can use Breath of the Grave.', ['Breath of the Grave'])).toBeNull();
    // and the missing-weapon case still fails
    expect(danglingRefIn('It makes use of Vow of Silence.', ['Tanto'])).toBe('Vow of Silence');
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
          clauses: [{ text: 'explodes in rage once per day when wounded', kind: 'mechanical', when: 'when_bloodied', when_quote: 'when wounded', how_often: 'per_day', how_often_quote: 'once per day', shape: 'save_area' }],
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

  // RECEIPT, NOT VOCABULARY (2026-10-17). These pinned the SAYS_WHEN/SAYS_OFTEN
  // word lists, which dropped 24-38 of the call's answers per gate run while
  // keeping one or two. The OUTCOME they protect is kept — an asked trigger or
  // limit with no support in the GM's words is still dropped — but the support is
  // now the call's own verbatim quote, the contract `casts`/`holds`/`bane` use.
  // 1b, THE ASKED TAG PERSISTS (critic's ruling, 2026-10-20). This pin used to
  // assert that an answer with NO quote was dropped. The critic's reading: the
  // call is answering about this clause, so the clause is its own quote, and
  // demanding a second quote from inside it threw the shape away for nothing.
  // OUTCOME CHANGED BY DESIGN; reported to the owner with the landing.
  // What is kept is the half that was really protecting something: a FOREIGN
  // quote, pointing at words the GM never wrote, is a contradiction and drops.
  test('an answer with no quote stands on the clause itself', async () => {
    const c = 'an oathsworn crusader who mends her own wounds';
    const log = await traced(() => generateReskin(
      { archetype: 'defender', style: 'rampart', concept: c, userConcept: c, cr: 8 },
      async () => stub(8, 'rampart', 'defender', {
        type: 'Humanoid',
        clauses: [{ text: 'mends her own wounds', kind: 'mechanical', when: 'on_hit', when_quote: '', how_often: 'at_will', how_often_quote: '', shape: 'heal' }],
      }),
    ));
    expect(log).toMatch(/the clause is its own quote:.*trigger "on_hit"/);
    expect(log).toMatch(/the clause is its own quote:.*limit "at_will"/);
    expect(log).not.toMatch(/asked field dropped/);
  });

  test('a FOREIGN quote still drops — the call pointed at words the GM never wrote', async () => {
    const c = 'an oathsworn crusader who mends her own wounds';
    const log = await traced(() => generateReskin(
      { archetype: 'defender', style: 'rampart', concept: c, userConcept: c, cr: 8 },
      async () => stub(8, 'rampart', 'defender', {
        type: 'Humanoid',
        clauses: [{ text: 'mends her own wounds', kind: 'mechanical', when: 'on_hit', when_quote: 'whenever the moon is full', how_often: 'at_will', how_often_quote: 'three times a day', shape: 'heal' }],
      }),
    ));
    expect(log).toMatch(/asked field dropped:.*trigger "on_hit".*is not the GM's own words/);
    expect(log).toMatch(/asked field dropped:.*limit "at_will".*is not the GM's own words/);
  });

  test('an answer quoting the GM keeps them', async () => {
    const c = 'a temple guardian that slams the ground at the start of each of its turns';
    const log = await traced(() => generateReskin(
      { archetype: 'brute', style: 'charger', concept: c, userConcept: c, cr: 9 },
      async () => stub(9, 'charger', 'brute', {
        type: 'Construct',
        clauses: [{ text: 'slams the ground at the start of each of its turns', kind: 'mechanical', when: 'start_of_turn', when_quote: 'at the start of each of its turns', how_often: 'once_per_turn', how_often_quote: 'each of its turns', shape: 'save_area' }],
      }),
    ));
    expect(log).not.toMatch(/asked field dropped:.*slams the ground/);
    expect(log).toMatch(/ask vs row (ok|MISMATCH):|asked but unanswered:/);
  });
});

// ROUTING — hold 2, worked from the critic's read of
// classes-eight-2026-10-16T22-10-02, where Patient Defense yielded to the cap
// while Fleet Agility (a rules-only chassis row) stood.
describe('the cap and the trait ceiling evict in the same order (critic hold 2)', () => {
  const { checkBlock } = require('../checker.mjs');

  test("a rules-only chassis row is filler, so a kit row lands instead of yielding", async () => {
    const c = 'a lizardfolk monk who strikes pressure points with an open hand';
    const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.map(String).join(' ')); };
    let m;
    try { m = await run(c, 5, 'skirmisher', 'skirmisher', { type: 'Humanoid' }); } finally { console.log = orig; }
    const log = lines.join('\n');
    // whatever the cap does, it may no longer turn a kit row away while a
    // rules-only donor row stands: either nothing yielded, or an eviction ran
    const yielded = /yielded to print's row cap/.test(log);
    const evicted = /row evicted for the cap/.test(log);
    expect(yielded && !evicted).toBe(false);
    expect(checkBlock(m).fails).toEqual([]);
  });

  // The owed-kit-row-vs-signature case is already pinned, and it is what caught
  // this regression: classes.spec.js "a named rogue carries print's Cunning
  // Action, with the clause that asked for it" asserts Assassinate survives.
  // Not duplicated here — a second copy with a different stub shape tests the
  // stub, not the engine.

  test("an aura is not chassis filler (critic's step-3 read)", () => {
    // treating every rules-only donor row as filler evicted "Aura of Authority",
    // the leader line's defining row, twice in cues-2026-10-17T00-36-41
    const { rowNamesOf } = require('../checker.mjs');
    const leader = { sections: { Traits: [
      { name: 'Aura of Authority', rules: true, text: 'While in a 10-foot-radius sphere originating from it, it and its allies have advantage on attack rolls.' },
      { name: 'Fleet Agility', rules: true, text: 'It takes the Dash or Disengage action.' },
    ] } };
    expect(rowNamesOf(leader)).toEqual(['Aura of Authority', 'Fleet Agility']);
  });

  test('a print row is still never evicted, even carrying the rules flag', () => {
    // Spellcasting and Pack Tactics ship as `rules + print`; `print` is the guard
    const { rowNamesOf } = require('../checker.mjs');
    const sheet = { sections: { Traits: [{ name: 'Pack Tactics', rules: true, print: true }], Actions: [{ name: 'Spellcasting', rules: true, print: true }] } };
    expect(rowNamesOf(sheet)).toEqual(['Pack Tactics', 'Spellcasting']);
  });
});

// DATA INTEGRITY — the defensive half prices defensive traits (owner, 2026-10-16:
// "that's half of the equation when calculating cr"). Sized from print: each
// shape read ~0.5 CR below the reader's own baseline without it.
describe('defensive traits move the defensive half', () => {
  const { dmgRead } = require('../checker.mjs');
  const base = {
    name: 'T', cr: 5, ac: 15, hp: 100,
    sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d6 + 4) Bludgeoning damage.' }] },
  };
  const withTrait = (name, text) => ({ ...base, sections: { ...base.sections, Traits: [{ name, text }] } });
  const crN = (c) => { const s = String(c); return s.includes('/') ? Number(s.split('/')[0]) / Number(s.split('/')[1]) : Number(s); };

  test('Magic Resistance is worth a rung', () => {
    const a = crN(dmgRead(base).def);
    const b = crN(dmgRead(withTrait('Magic Resistance', 'The creature has Advantage on saving throws against spells.')).def);
    expect(b).toBeGreaterThan(a);
  });

  test('Legendary Resistance is worth a rung', () => {
    const a = crN(dmgRead(base).def);
    const b = crN(dmgRead(withTrait('Legendary Resistance (3/Day)', 'If the creature fails a saving throw, it can choose to succeed instead.')).def);
    expect(b).toBeGreaterThan(a);
  });

  test('the rungs stack, and a sheet with none is unchanged', () => {
    const none = crN(dmgRead(base).def);
    const one = crN(dmgRead(withTrait('Magic Resistance', 'Advantage on saving throws against spells.')).def);
    const two = crN(dmgRead({ ...base, sections: { ...base.sections, Traits: [
      { name: 'Magic Resistance', text: 'Advantage on saving throws against spells.' },
      { name: 'Legendary Resistance (3/Day)', text: 'Legendary Resistance: it succeeds instead.' },
    ] } }).def);
    expect(two).toBeGreaterThan(one);
    expect(one).toBeGreaterThan(none);
  });

  test('the offensive half is untouched', () => {
    expect(dmgRead(withTrait('Magic Resistance', 'Advantage on saving throws against spells.')).off)
      .toBe(dmgRead(base).off);
  });
});

// DATA INTEGRITY — two rows for one mechanic. Reports, never repairs: as a lint
// `correctable` it drove the repair path and rewrote unrelated rows.
describe('duplicate-mechanic notes a contained row (critic, 2026-10-16)', () => {
  const { checkBlock } = require('../checker.mjs');
  const sheet = (rows) => ({
    name: 'T', type: 'Humanoid', ac: 15, hp: 80, cr: 5, cr_str: '5', speed: '30 ft.', pb: 3,
    stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 12, CHA: 10 },
    sections: { Traits: rows, Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Bludgeoning damage.' }] },
  });
  const hits = (rows) => (JSON.stringify(checkBlock(sheet(rows))).match(/two rows, one mechanic/g) ?? []).length;

  test('a row whose text is the opening of another is noted', () => {
    expect(hits([
      { name: 'Wounded Rage', text: 'While Bloodied, the hull has Advantage on attack rolls.' },
      { name: 'Bloodied Frenzy', text: 'While Bloodied, the hull has Advantage on attack rolls and saving throws.' },
    ])).toBe(1);
  });

  test('a shared vocabulary is not a shared mechanic — print\'s Swarm trait', () => {
    expect(hits([
      { name: 'Swarm', text: 'The swarm can occupy another creature space and vice versa, and the swarm can move through any opening large enough for a Tiny beast.' },
      { name: 'Grave Hunger', text: 'The swarm can move through any opening large enough for a Tiny beast.' },
    ])).toBe(0);
  });

  test('two unrelated traits are not noted', () => {
    expect(hits([
      { name: 'Pack Tactics', text: 'It has Advantage on an attack roll against a creature if at least one ally is within 5 feet.' },
      { name: 'Magic Resistance', text: 'It has Advantage on saving throws against spells.' },
    ])).toBe(0);
  });

  test('attack rows are exempt — they share their whole frame (print\'s Werebear)', () => {
    const m = sheet([]);
    m.sections.Actions = [
      { name: 'Handaxe', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Slashing damage.' },
      { name: 'Rend', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Slashing damage, plus 2 (1d4) Piercing damage.' },
    ];
    expect((JSON.stringify(checkBlock(m)).match(/two rows, one mechanic/g) ?? []).length).toBe(0);
  });
});

// A VERB CANNOT MAKE A WALKING BODY INCORPOREAL (user feedback, 2026-10-18). "A
// barrow wight who drifts" kept the phantom seat on the verb "drifts"; print's
// Wight has no Incorporeal Movement. The body's own print block decides.
describe('a corporeal print body stands the phantom seat down', () => {
  test('print knows which of its Undead are incorporeal — a closed fact, not a word list', () => {
    expect(printCanonFor('a wight', 4).incorporeal).toBe(false);
    expect(printCanonFor('a mummy', 3).incorporeal).toBe(false);
    expect(printCanonFor('a ghost', 4).incorporeal).toBe(true);
    expect(printCanonFor('a wraith', 5).incorporeal).toBe(true);
  });
  test('a barrow wight who drifts: no phantom donor, no hover, no Incorporeal Movement', async () => {
    // the route hands the engine the phantom seat; the engine stands it down, so
    // the stub answers for the PLAIN lurker donor's slots (the one it will use)
    const concept = 'a barrow wight who drifts between the standing stones at night';
    const answer = JSON.parse(stub(4, null, 'lurker')); answer.renames.Teleport = 'Barrow Step'; // the plain lurker's gated slot, which renameKeysOf leaves to the mechanics
    const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept, userConcept: concept, cr: 4 }, async () => JSON.stringify(answer));
    expect(m.generation.donor).not.toMatch(/phantom/);
    expect(String(m.speed)).not.toMatch(/hover/i);
    expect(Object.values(m.sections).flat().some((e) => /Incorporeal Movement/i.test(e.name ?? ''))).toBe(false);
  });
  test('the ghost keeps its incorporeality — print carries the trait', async () => {
    const m = await run('a ghost of the drowned chapel who drifts through its walls', 4, 'phantom', 'lurker');
    expect(/hover/i.test(String(m.speed)) || Object.values(m.sections).flat().some((e) => /Incorporeal Movement/i.test(e.name ?? ''))).toBe(true);
  });
});

// A PRINT NAME WITH A REMAINDER IS A BORROW (owner's spot check, 2026-10-18).
// "skeleton with a greatsword" read as the bare Skeleton — exact — and an exact
// body closes the row set, so the greatsword never arrived. Any word beyond the
// print name is the GM's addition; a but/except/only tail is a lacks or type edit
// the exact path already makes, and a bare name stays verbatim.
describe('a print name with a remainder is a borrow, not an exact body', () => {
  test('additions make a borrow', () => {
    for (const [t, cr] of [['skeleton with a greatsword', 2], ['an ogre with a greataxe', 3], ['a wolf with two heads', 2], ['a skeleton archer', 1], ['a scout with a javelin', 3]]) {
      const r = printCanonFor(t, cr); expect(r?.exact).toBe(false); expect(r?.borrowOnly).toBe(true);
    }
  });
  test('a bare name, or a but/except/only tail, stays exact', () => {
    for (const [t, cr] of [['Skeleton', 1], ['Owlbear', 3], ['Goblin Boss', 1], ['a pit fiend', 20], ['a dire wolf but undead', 1]]) expect(printCanonFor(t, cr)?.exact).toBe(true);
  });
});

// THE FORTY'S OWN FINDINGS (2026-10-18). Each of these shipped on a sheet the
// rebuilt forty generated, and each is pinned at the layer that judges it,
// because a smoke draw may not present the shape twice.
// THE CRITIC'S A1 (2026-10-18): a borrow is print's body plus the GM's additions,
// in EVERY seat — the action seat, the trait seat, the fallback shelf, the
// last-resort hash, and the class kit.
describe('a print body takes only what the user\'s words ask — every seat', () => {
  test('a class claim must point at the words that name the class, not hand back the prompt', () => {
    const v = (q, src) => vetQuote(q, src, { soloLen: 5, pointAt: true });
    // the call answered "barbarian" and quoted the whole prompt, which names no class
    expect(v('an ogre with a greataxe', 'an ogre with a greataxe')).toBe('');
    expect(v('Goblin Boss — riding a worg', 'Goblin Boss — riding a worg')).toBe('');
    // a span of a longer concept stands, and a concept too short to have one stands whole
    expect(v('a gladiator', 'a skeleton who was a gladiator in a former life')).toBe('a gladiator');
    expect(v('lizardfolk monk', 'lizardfolk monk')).toBe('lizardfolk monk');
    expect(v('a ninja', 'a ninja who moves through the shadows and strikes unseen')).toBe('a ninja');
  });

  test('neither fallback path nor the trait seat invents a row on a print body that asks for nothing', async () => {
    const concept = 'skeleton with a greatsword';
    const answer = JSON.parse(stub(2, null, 'brute'));
    const m = await generateReskin(
      { archetype: 'brute', concept, userConcept: concept, cr: 2 },
      async () => JSON.stringify(answer),
    );
    const rows = Object.values(m.sections).flat();
    // the shelf stands down AND the last-resort hash honours it: no library row
    expect(rows.filter((e) => e.library || e.seed)).toEqual([]);
    // and the trait seat declines an idea-matched fit the way the action seat does
    expect(rows.filter((e) => e.template && !e.owed && !e.kit && !e.bound)).toEqual([]);
  });
});

// THE CRITIC'S A2 (2026-10-18): a body's size sets a floor under its Strength.
describe("a big body's Strength has print's floor under it", () => {
  const mk = async (size, archetype, cr) => {
    const concept = 'a trench leviathan that drags ships under';
    const answer = JSON.parse(stub(cr, null, archetype, { size }));
    answer.renames.Teleport = 'Trench Step';
    return generateReskin({ archetype, concept, userConcept: concept, cr }, async () => JSON.stringify(answer));
  };
  test('Huge starts at 18 and Gargantuan at 25 — print prints no corporeal body under them', async () => {
    expect((await mk('Huge', 'brute', 5)).stats.STR).toBeGreaterThanOrEqual(18);
    expect((await mk('Gargantuan', 'brute', 5)).stats.STR).toBeGreaterThanOrEqual(25);
  });
  test('the attack follows the floor, as print\'s own 49 do', async () => {
    const m = await mk('Gargantuan', 'brute', 5);
    const mod = Math.floor((m.stats.STR - 10) / 2);
    for (const e of Object.values(m.sections).flat()) {
      const atk = Number((/Attack Roll:\*? \+(\d+)/.exec(e.text ?? '') ?? [])[1]);
      if (!Number.isFinite(atk) || !/Melee/.test(e.text ?? '')) continue;
      // every melee row's bonus is a real derivation off some stat, STR included
      const mods = Object.values(m.stats).map((v) => Math.floor((Number(v) - 10) / 2));
      expect(mods.map((x) => x + Number(m.pb))).toContain(atk);
    }
    expect(mod).toBeGreaterThanOrEqual(7);
  });
  test('the floor carries the STR save and Athletics with it, not just the attack', async () => {
    const m = await mk('Huge', 'brute', 5); const mod = Math.floor((m.stats.STR - 10) / 2);
    if (m.saves && m.saves.STR != null) expect([mod, mod + m.pb]).toContain(Number(m.saves.STR));
    const ath = (/Athletics \+(\d+)/.exec(String(m.skills ?? '')) ?? [])[1];
    if (ath) expect([mod + m.pb, mod + 2 * m.pb]).toContain(Number(ath));
  });
  test('a Large body keeps its own Strength — print draws no floor there (Fire Elemental 10)', async () => {
    const m = await mk('Large', 'brute', 5);
    expect(m.stats.STR).toBeLessThan(25);
  });
});

// THE CRITIC'S A2c / C1 (2026-10-18): the identity call's own canon ✗ outranks the
// noun match. `rejectedCanon` had one reader (the canon-ROW stamp) and the BODY
// matcher was not it, so "a siege-engine golem of lashed timber" — answered
// `golem→canon ✗ ("lashed timber, not golem-flesh")` — took the Clay Golem's body.
describe("the call's canon ✗ outranks the noun match", () => {
  const concept = 'a siege-engine golem of lashed timber that shoulders through walls';
  const mk = async (rejectedCanon) => {
    const answer = JSON.parse(stub(9, null, 'brute'));
    answer.type = 'Construct';
    return generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 9, rejectedCanon }, async () => JSON.stringify(answer));
  };
  test('the rejected cue stands the print body down', async () => {
    const m = await mk(['golem']);
    expect(String(m.immunities ?? '')).not.toMatch(/Acid/i);
    for (const e of Object.values(m.sections).flat()) expect(String(e.text ?? '')).not.toMatch(/Hit Point maximum/i);
  });
  test('with nothing rejected, the same words still reach print', async () => {
    const m = await mk([]);
    const sawPrint = /Acid/i.test(String(m.immunities ?? ''))
      || Object.values(m.sections).flat().some((e) => /Hit Point maximum/i.test(e.text ?? '') || /^(?:Acid Absorption|Berserk|Immutable Form)/.test(e.name ?? ''));
    expect(sawPrint).toBe(true);
  });
});

// THE CRITIC'S A4 (2026-10-18): lacks — the receipt, the organ, the repair call.
describe('a lack is the GM\'s own span; a stood-down seat takes its organ with it', () => {
  // the engine traces through logger.log -> console.log; the capture is the same the blind A/B harness uses
  const captured = async (fn) => { const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); }; try { return { m: await fn(), log: lines.join('\n') }; } finally { console.log = orig; } };
  test('"lost its life" is not a lack on "a gladiator in a former life" — one shared word is no receipt', async () => {
    const concept = 'a skeleton who was a gladiator in a former life';
    const answer = JSON.parse(stub(4, null, 'defender')); answer.lacks = ['lost its life'];
    const { m, log } = await captured(() => generateReskin({ archetype: 'defender', concept, userConcept: concept, cr: 4 }, async () => JSON.stringify(answer)));
    expect(log).toMatch(/lacks refused: "lost its life" is not the GM's own span/);
    expect(log).not.toMatch(/lacks asked: "lost its life"/);
    expect(m.name).toBeTruthy();
    // and a true lack still passes the same vet
    const c2 = 'a templar priest with a mace and no magic at all';
    const a2 = Object.assign(JSON.parse(stub(6, null, 'brute')), { lacks: ['no magic at all'] });
    const r2 = await captured(() => generateReskin({ archetype: 'brute', concept: c2, userConcept: c2, cr: 6 }, async () => JSON.stringify(a2)));
    expect(r2.log).toMatch(/lacks asked: "no magic at all"/);
  });
  test('the repair prompt carries the lacks to the author', () => {
    const { buildRepairPrompt } = require('../author.mjs');
    const p = buildRepairPrompt({ name: 'Griever', inline: 'the griever', clauses: [{ text: 'squeezes prey in its coils' }], cr: 6, sheet: '', lacks: ['never holds'] });
    expect(p).toMatch(/DOES NOT HAVE: "never holds"/);
    expect(buildRepairPrompt({ name: 'X', inline: 'x', clauses: [{ text: 'y' }], cr: 1, sheet: '' })).not.toMatch(/DOES NOT HAVE/);
  });
});

// THE CRITIC'S A5 (2026-10-18): print's rows ride intact on a print body at print's
// CR — exact or borrowed. Five writers, one condition.
describe("print's rows stand at print's CR", () => {
  const onPrint = async (name, description, cr, archetype, over = {}) => {
    const concept = description ? `${name} — ${description}` : name;
    const answer = JSON.parse(stub(cr, null, archetype, over));
    answer.renames.Teleport = 'Step';
    return generateReskin({ archetype, concept, userConcept: concept, cr, fixedName: name }, async () => JSON.stringify(answer));
  };
  const rows = (m) => Object.values(m.sections).flat();
  test('the Goblin Boss\'s Shortbow lands though the defender chassis has no ranged row to rename', async () => {
    const m = await onPrint('Goblin Boss', '', 1, 'defender');
    const bow = rows(m).find((e) => /^Shortbow/.test(e.name ?? ''));
    expect(bow).toBeDefined();
    expect(bow.text).toMatch(/Ranged Attack Roll/);
    expect(rows(m).find((e) => /^Multiattack/.test(e.name ?? ''))?.text ?? '').toMatch(/Shortbow/);
  });
  test('the Pit Fiend keeps print\'s Legendary Resistance and gains no chassis Legendary Actions', async () => {
    const m = await onPrint('Pit Fiend', 'who collects the oaths of dying knights', 20, 'brute');
    expect(m.sections['Legendary Actions'] ?? []).toEqual([]);
    expect(rows(m).some((e) => /^Legendary Resistance/.test(e.name ?? ''))).toBe(true);
  });
  test('a borrowed Vampire at print\'s CR keeps print\'s small Bite dice', async () => {
    const m = await onPrint('Vampire', 'who keeps a garden of thorns', 13, 'brute');
    const bite = rows(m).find((e) => /^Bite/.test(e.name ?? ''));
    expect(bite).toBeDefined();
    expect(bite.text).toMatch(/6 \(1d4 \+ 4\) Piercing damage plus 13 \(3d8\) Necrotic/); // print's own row: a save, small dice, the drain is the point — re-priced it read 26
  });
  test('the Druid\'s Vine Staff lands though the caster chassis has no melee row to rename', async () => {
    const m = await onPrint('Druid', '', 2, 'caster');
    const staff = rows(m).find((e) => /^Vine Staff/.test(e.name ?? ''));
    expect(staff).toBeDefined();
    expect(staff.text).toMatch(/7 \(1d8 \+ 3\) Bludgeoning damage plus 2 \(1d4\) Poison/);
  });
  test('a print body with a TRAIT idea reaches the trait seat without throwing (gmAsked was block-scoped: the Owlbear/Dire Wolf "timeouts", 2026-10-18)', async () => {
    const answer = JSON.parse(stub(3, null, 'brute')); answer.renames.Teleport = 'Step';
    const concept = 'Owlbear — that tracks its quarry by scent';
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 3, fixedName: 'Owlbear' }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'It takes the scent of one creature it has wounded and tracks that quarry anywhere it runs, never losing the trail.', section: 'trait', trigger: 'always', effect: 'control' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'faultless-tracker', because: 'it tracks its quarry by scent', name: 'Scent Tracker', asked: 'tracks its quarry by scent' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(answer);
      });
    } finally { console.log = orig; }
    expect(m.name).toBe('Owlbear');
    const tr = lines.join('\n');
    // the seat was reached with a live fit on a print body — the line the throw used to cut off
    // label changed 2026-10-27: the keys rank and gate but no longer INJECT a
    // template onto the menu; the row still reaches the seat off the POOL
    // (faultless-tracker declares trigger=always and is in it), which the row
    // assertion two lines down is the real proof of.
    expect(tr).toMatch(/keys would have bound: trait — faultless-tracker/);
    expect(tr).not.toMatch(/gmAsked is not defined/);
    expect(rows(m).some((e) => e.template === 'faultless-tracker')).toBe(true);
  });
  test('a Ghost borrow keeps print\'s full resistance line, not a derived B/P/S', async () => {
    const m = await onPrint('Ghost', 'of the drowned chapel who drifts through its walls', 4, 'lurker', { size: 'Medium' });
    expect(String(m.resistances)).toMatch(/Acid/); // print's Ghost: Acid, Fire, Lightning, Thunder; Bludgeoning, Piercing, and Slashing from nonmagical attacks
  });
});

// THE CRITIC'S A4/A5 residuals (2026-10-18): a lack names the mechanic it takes; a
// same-named chassis nova takes print's text at print's CR.
describe('a lack keyed to its mechanism, and print\'s breath over a renamed chassis nova', () => {
  test('"never holds it" takes GRAPPLE: no row imposes or exploits Grappled, the blows stay', async () => {
    const concept = 'a vice-rock griever of living scree that squeezes prey but never holds it';
    const answer = JSON.parse(stub(6, 'grappler', 'brute')); answer.lacks = [{ quote: 'never holds it', takes: 'grapple' }];
    const m = await generateReskin({ archetype: 'brute', style: 'grappler', concept, userConcept: concept, cr: 6 }, async () => JSON.stringify(answer));
    const rows = Object.values(m.sections).flat();
    expect(rows.some((e) => /Grappled/.test(e.text ?? ''))).toBe(false);
    expect(rows.some((e) => /Attack Roll/.test(e.text ?? ''))).toBe(true);
  });
  test('"instead of regrowing" takes REGENERATION: the Hydra keeps its heads, loses their regrowth', async () => {
    const concept = 'Hydra — whose stumps smoke instead of regrowing';
    const answer = JSON.parse(stub(8, null, 'brute')); answer.lacks = [{ quote: 'instead of regrowing', takes: 'regeneration' }]; answer.renames.Teleport = 'Step';
    const m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 8, fixedName: 'Hydra' }, async () => JSON.stringify(answer));
    const rows = Object.values(m.sections).flat();
    const heads = rows.find((e) => /^Multiple Heads/.test(e.name ?? ''));
    expect(heads).toBeDefined();
    expect(heads.text).not.toMatch(/grows? (?:two|a new|back)|regrow/i);
    expect(rows.some((e) => /^Regeneration/.test(e.name ?? ''))).toBe(false);
  });
  test('the Adult Red Dragon breathes print\'s 59 (17d6), not the chassis nova that wore its name', async () => {
    const concept = 'Adult Red Dragon — blind in one eye from an old lance';
    const scaled = scaleDonor(pickDonor(17, null, 'brute'), 17, { mechanics: [] });
    const answer = JSON.parse(stub(17, null, 'brute')); answer.renames.Teleport = 'Step';
    const novaKey = Object.values(scaled.sections).flat().find((e) => / \((?:Recharge [\d–-]+)\)$/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? ''))?.name?.replace(/ \(.*\)$/, '');
    if (novaKey) answer.renames[novaKey] = 'Fire Breath'; // the model names the chassis nova after print's row
    const m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 17, fixedName: 'Adult Red Dragon' }, async () => JSON.stringify(answer));
    const breath = Object.values(m.sections).flat().filter((e) => /Fire Breath/.test(e.name ?? ''));
    expect(breath).toHaveLength(1);
    expect(breath[0].text).toMatch(/59 \(17d6\) Fire damage/);
  });
});

// THE CRITIC'S A7/A8/A9 — the reader and the gates, pinned on crafted blocks.
describe('the reader and the gates (A7, A8, A9)', () => {
  const base = (over = {}) => ({ name: 'Probe', inline: 'the probe', format: '2024', cr: 3, cr_str: '3', type: 'Undead', size: 'Medium', alignment: 'Neutral', ac: 13, hp: 45, hp_formula: '10d8', pb: 2, speed: '30 ft.', stats: { STR: 12, DEX: 14, CON: 12, INT: 10, WIS: 12, CHA: 10 }, sections: { Actions: [{ name: 'Freezing Touch', text: '*Melee Attack Roll:* +4, reach 5 ft. 11 (2d8 + 2) Cold damage.' }] }, ...over });
  test('A7: an unknown count word reads as one attack, never NaN', () => {
    const m = base(); m.sections.Actions.unshift({ name: 'Multiattack', text: 'The probe makes as many Freezing Touch attacks as it has heads.' });
    const r = sustainedOf(m); expect(Number.isFinite(r.sustained)).toBe(true); expect(r.attacks).toBe(1);
  });
  test('A8: a passive damage aura is sustained damage; a creature\'s self-damage clause is not', () => {
    const m = base(); m.sections.Traits = [{ name: 'Trailing Cold', text: 'Any creature that starts its turn within 5 feet of the probe takes 13 (3d8) Cold damage.' }];
    expect(sustainedOf(m).sustained).toBe(24);
    const n = base(); n.sections.Traits = [{ name: 'Incorporeal Movement', text: 'The probe can move through creatures. It takes 5 (1d10) Force damage if it ends its turn inside an object.' }];
    expect(sustainedOf(n).sustained).toBe(11);
  });
  test('A8: an at-will stun in a Multiattack is ko-ungated in 2014 prose too ("is stunned")', () => {
    const m = base(); m.sections.Actions = [{ name: 'Multiattack', text: 'The probe makes two Pressure Point attacks.' }, { name: 'Pressure Point', text: '*Melee Attack Roll:* +4, reach 5 ft. 7 (1d8 + 2) Bludgeoning damage, and the target is stunned until the end of its next turn.' }];
    expect(checkBlock(m).gates.gates.findings.map((f) => f.rule)).toContain('ko-ungated');
  });
  test('A9: a 2014 block that leaks 2024 vocabulary, or ships a failed conversion, fails the edition gate', () => {
    const legacy = { name: 'Probe', format: '2014', challenge_rating: '3 (700 XP)', armor_class: '13', hit_points: '45 (10d8)', speed: '30 ft.', attributes: 'STR 12 (+1) DEX 14 (+2) CON 12 (+1) INT 10 (+0) WIS 12 (+1) CHA 10 (+0)', actions: [{ name: 'Riposte (Reaction)', description: 'Trigger: a creature misses the probe. Response: the probe makes one attack with Advantage.' }], abilities: [], generation: { conversion: 'failed' } };
    const rules = checkBlock(legacy, { edition: '2014' }).gates.edition.findings.map((f) => f.rule);
    expect(rules).toContain('conversion-failed'); expect(rules).toContain('vocab-2024-in-2014');
  });
});

describe('a keyed lack is judged by its mechanic, not its words (feature thirty, 2026-10-18)', () => {
  const { checkBlock } = require('../checker.mjs');
  const sheet = (over) => ({
    name: 'Pale Snout-Hunter', type: 'Monstrosity', size: 'Large', ac: 14, hp: 60, cr: 5, cr_str: '5', speed: '40 ft.', pb: 3,
    senses: 'blindsight 60 ft. (blind beyond this radius); Passive Perception 13', languages: 'None',
    stats: { STR: 16, DEX: 14, CON: 14, INT: 3, WIS: 14, CHA: 6 },
    sections: { Traits: [{ name: 'Blood Scent', text: 'Its eyeless snout reads warm blood so keenly that a creature it has wounded cannot hide from it.' }], Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage.' }] },
    generation: { clauses: [{ text: 'an eyeless hunter', kind: 'mechanical', polarity: 'lacks', takes: 'sight' }, { text: 'tracks prey by scent alone', kind: 'descriptive' }] },
    ...over,
  });
  const rules = (m) => JSON.stringify(checkBlock(m)).match(/lack-honored/g) ?? [];
  test('"an eyeless hunter" with blindsight (blind beyond) is honoured though "eyeless" sits in its own trait', () => {
    expect(rules(sheet())).toEqual([]);
  });
  test('the same key breaks when the senses line grants sight', () => {
    expect(rules(sheet({ senses: 'darkvision 60 ft.; Passive Perception 13' })).length).toBeGreaterThan(0);
  });
  test('a grapple key reads the imposed condition, in either edition idiom', () => {
    const g = (text) => sheet({ generation: { clauses: [{ text: 'never holds its prey', kind: 'mechanical', polarity: 'lacks', takes: 'grapple' }] }, sections: { Actions: [{ name: 'Bite', text }] } });
    expect(rules(g('*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage.'))).toEqual([]);
    expect(rules(g('*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage. If the target is Medium or smaller, it has the Grappled condition (escape DC 13).')).length).toBeGreaterThan(0);
  });
});

describe("the forty's second run, pinned (2026-10-18 night)", () => {
  const { checkBlock } = require('../checker.mjs');
  const rows = (m) => Object.values(m.sections).flat();
  test('the STR floor carries a STR-keyed RANGED row (a giant\'s thrown boulder), not only melee', async () => {
    const answer = JSON.parse(stub(9, null, 'brute')); answer.size = 'Huge'; answer.renames.Teleport = 'Step';
    const concept = 'a huge stone giant exile who hurls quarried boulders';
    const m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 9, resolvedSize: 'Huge' }, async () => JSON.stringify(answer));
    const mod = Math.floor((m.stats.STR - 10) / 2);
    expect(m.stats.STR).toBeGreaterThanOrEqual(18);
    for (const e of rows(m).filter((e) => /Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''))) {
      const atk = Number((/Attack Roll:\*? \+(\d+)/.exec(e.text) ?? [])[1]);
      const dexMod = Math.floor((m.stats.DEX - 10) / 2);
      // a STR-keyed thrown row follows the floor; a DEX row keeps DEX
      expect([mod + m.pb, dexMod + m.pb]).toContain(atk);
      const flat = (/\d+ \(\d+d\d+ \+ (\d+)\)/.exec(e.text) ?? [])[1];
      if (flat && atk === mod + m.pb) expect(Number(flat)).toBe(mod);
    }
    // not vacuous: the brute chassis carries a thrown row and the floor moved STR
    expect(rows(m).some((e) => /Ranged Attack Roll/.test(e.text ?? ''))).toBe(true);
    expect(m.stats.STR).toBe(18);
  });
  test('a type word inside the creature\'s own name is its name, not a damage claim (the Cold Lamp Widow)', () => {
    const sheet = (name) => ({
      name, type: 'Undead', size: 'Medium', ac: 13, hp: 45, cr: 3, cr_str: '3', speed: '30 ft.', pb: 2,
      stats: { STR: 1, DEX: 14, CON: 10, INT: 10, WIS: 12, CHA: 15 },
      sections: { Actions: [{ name: 'Shroud of the Cold Lamp', text: '*Wisdom Saving Throw:* DC 12, one creature within 30 feet. *Failure:* 9 (2d8) Necrotic damage.' }] },
    });
    expect(JSON.stringify(checkBlock(sheet('Cold Lamp Widow'))).match(/no-type-in-name/g) ?? []).toEqual([]);
    expect((JSON.stringify(checkBlock(sheet('Lamp Widow'))).match(/no-type-in-name/g) ?? []).length).toBeGreaterThan(0);
  });
  test('"understands no Common" beside Languages: Giant is an honoured lack (speech falls to the word rule)', () => {
    const sheet = {
      name: 'Quarried Exile', type: 'Giant', size: 'Huge', ac: 17, hp: 126, cr: 9, cr_str: '9', speed: '40 ft.', pb: 4, languages: 'Giant',
      stats: { STR: 18, DEX: 8, CON: 20, INT: 10, WIS: 12, CHA: 9 },
      sections: { Actions: [{ name: 'Fist', text: '*Melee Attack Roll:* +8, reach 10 ft. 17 (3d8 + 4) Bludgeoning damage.' }] },
      generation: { clauses: [{ text: 'understands no Common', kind: 'mechanical', polarity: 'lacks', takes: 'speech' }] },
    };
    expect(JSON.stringify(checkBlock(sheet)).match(/lack-honored/g) ?? []).toEqual([]);
    sheet.languages = 'Common, Giant';
    expect((JSON.stringify(checkBlock(sheet)).match(/lack-honored/g) ?? []).length).toBeGreaterThan(0);
  });
  test('the lacks prompt sends a partial impairment to `part`, never the whole sense', () => {
    const src = require('fs').readFileSync(require.resolve('../generate.mjs'), 'utf8');
    expect(src).toMatch(/"blind in one eye"[^.]*take part, never sight/);
  });
  test('print\'s Lich keeps its Paralyzing Touch: a print-named melee row is print\'s composition and the KO gate skips it', async () => {
    const answer = JSON.parse(stub(21, null, 'caster')); answer.renames.Teleport = 'Step';
    const m = await generateReskin({ archetype: 'caster', concept: 'Lich', userConcept: 'Lich', cr: 21, fixedName: 'Lich' }, async () => JSON.stringify(answer));
    const touch = rows(m).find((e) => /^Paralyzing Touch/.test(e.name ?? ''));
    expect(touch).toBeDefined(); expect(touch.print).toBe(true);
    expect(JSON.stringify(checkBlock(m)).match(/ko-ungated/g) ?? []).toEqual([]);
  });
});

describe("the forty's findings, pinned", () => {
  test('a bestial mind holds Unaligned inside print\'s norm and takes Neutral above it (owner: "neutral")', async () => {
    const concept = 'an eyeless hunter that tracks prey by scent alone';
    // the INT the alignment reads is the DONOR's, so the two branches are
    // exercised by two donors: brute-5 is INT 6, lurker-5 is INT 12
    const mk = async (archetype) => {
      const answer = JSON.parse(stub(5, null, archetype));
      answer.type = 'Monstrosity'; answer.alignment = 'Unaligned';
      answer.renames.Teleport = 'Scent Step'; // a gated slot renameKeysOf leaves to the mechanics
      return generateReskin(
        { archetype, concept, userConcept: concept, cr: 5, mind: 'bestial', resolvedType: 'Monstrosity' },
        async () => JSON.stringify(answer),
      );
    };
    // print: of 128 creatures with INT <= 8 and no language, 120 are Unaligned
    const dim = await mk('brute');
    expect(dim.stats.INT).toBeLessThanOrEqual(8);
    expect(dim.alignment).toBe('Unaligned');
    // above that norm a thinking creature can hold an ethic, bestial or not
    const bright = await mk('lurker');
    expect(bright.stats.INT).toBeGreaterThan(8);
    expect(bright.alignment).toBe('Neutral');
  });

  test('a melee weapon\'s name on a ranged-only row takes the projectile; a thrown one stands (owner: "rename")', () => {
    const RANGED = '*Ranged Attack Roll:* +6, range 20/60 ft. 12 (2d8 + 3) Bludgeoning damage.';
    const MELEE = '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.';
    const nameAfter = (name, text) => { const s = { Actions: [{ name, text }] }; honestAttackNames(s, {}); return s.Actions[0].name; };
    // "whip" is a type-only anatomy noun, so the mode guard let it through: the
    // weapon table is what decides melee-only, and it is the checker's own table
    for (const n of ['Tailwhip', 'Tail Whip', 'Whip Lash']) expect(nameAfter(n, RANGED)).toBe('Hurled Debris');
    // and nothing else moves: a melee row keeps its name, a thrown weapon and a launcher keep theirs
    expect(nameAfter('Tail Whip', MELEE)).toBe('Tail Whip');
    for (const n of ['Handaxe', 'Javelin', 'Longbow']) expect(nameAfter(n, RANGED)).toBe(n);
  });

  test('every row that cites an attack points at a live row — the Multiattack and a Legendary Action alike', async () => {
    // "Adult Red Dragon — blind in one eye from an old lance": the GM's words take
    // the melee slot, so print's Rend never lands, while print's Multiattack AND
    // its legendary Pounce ("makes one Rend attack") both ride along citing it
    const concept = 'Adult Red Dragon — blind in one eye from an old lance';
    const answer = JSON.parse(stub(17, null, 'brute'));
    answer.renames.Teleport = 'Lance Step';
    const m = await generateReskin(
      { archetype: 'brute', concept, userConcept: concept, cr: 17 },
      async () => JSON.stringify(answer),
    );
    const rows = Object.values(m.sections).flat();
    const live = rows.filter((e) => /Attack Roll/.test(e.text ?? '') && !/^Multiattack/i.test(e.name ?? ''))
      .map((e) => String(e.name).replace(/\s*\(.*\)$/, '').toLowerCase());
    expect(live.length).toBeGreaterThan(0);
    // no row may cite an attack the sheet does not carry
    for (const e of rows) {
      for (const [, cited] of String(e.text ?? '').matchAll(/\bmakes one ([A-Z][\w'-]*(?: [A-Z][\w'-]*){0,2}) attack\b/g)) {
        expect(live).toContain(cited.toLowerCase());
      }
    }
    expect(rowNamesOf(m).length).toBeGreaterThan(0);
    for (const e of rows) expect(danglingRefIn(e.text ?? '', rowNamesOf(m), String(e.name ?? ''))).toBeFalsy();
  });

  test('a bare attack row earns a strike noun, and a specific noun still wins where the row earns one', () => {
    const { honestNouns, mechanicUnkept, claimWordIn } = require('../name-claims.mjs');
    const bare = '*Melee Attack Roll:* +7, reach 5 ft. 30 (6d8 + 3) Necrotic damage.';
    // the forty shipped "Drowned Grasp" over this row: the claim table had no noun to offer
    expect(mechanicUnkept('Drowned Grasp', bare)).toMatch(/Grappled/);
    expect(honestNouns(bare)[0]).toBe('Strike');
    const w = claimWordIn('Drowned Grasp');
    expect('Drowned Grasp'.replace(new RegExp(`\\b${w}\\b`, 'i'), honestNouns(bare)[0])).toBe('Drowned Strike');
    // a row that DOES earn a specific noun is still named for the thing it does
    expect(honestNouns('*Strength Saving Throw:* DC 19. *Failure:* The target has the Prone condition.')[0]).toBe('Shove');
    expect(honestNouns('the target has the Grappled condition (escape DC 14)')[0]).toBe('Grasp');
    expect(honestNouns('The creature moves up to half its Speed without provoking Opportunity Attacks.')[0]).toBe('Stride');
  });

  test("a qualified anatomy name may carry the energy its qualifier names; a bare noun answers for its type", () => {
    const sheet = (name, type) => ({
      name: 'Probe', inline: 'the probe', format: '2024', cr: 5, cr_str: '5', type: 'Elemental', size: 'Medium',
      alignment: 'Neutral', ac: 15, hp: 90, hp_formula: '12d8 + 36', pb: 3, speed: '30 ft.',
      stats: { STR: 16, DEX: 14, CON: 16, INT: 10, WIS: 12, CHA: 10 },
      sections: { Actions: [{ name, text: `*Melee Attack Roll:* +6, reach 5 ft. 13 (2d8 + 4) ${type} damage.` }] },
    });
    const ruleOf = (m) => checkBlock(m).gates.reader.findings.filter((f) => f.rule === 'type-fit').map((f) => f.message);
    // print's own idiom: the Air Elemental's Thunderous Slam deals Thunder, the Pit Fiend's Devilish Claw Necrotic
    expect(ruleOf(sheet('Thunderous Slam', 'Force'))).toEqual([]);
    expect(ruleOf(sheet('Arcane Slam', 'Force'))).toEqual([]);
    // and the HEAD word owns the type: print writes the Manticore's "Tail Spike"
    // and the Purple Worm's "Tail Stinger" as Piercing, not the tail's Bludgeoning
    expect(ruleOf(sheet('Tail Spines', 'Piercing'))).toEqual([]);
    expect(ruleOf(sheet('Tail Spike', 'Piercing'))).toEqual([]);
    // a BARE anatomy noun still answers for it
    expect(ruleOf(sheet('Slam', 'Force'))).not.toEqual([]);
    expect(ruleOf(sheet('Tail', 'Piercing'))).not.toEqual([]);
    expect(ruleOf(sheet('Bite', 'Bludgeoning'))).not.toEqual([]);
    expect(ruleOf(sheet('Slam', 'Bludgeoning'))).toEqual([]);
    expect(ruleOf(sheet('Tail', 'Bludgeoning'))).toEqual([]);
  });
});
