/**
 * R8 · QUALITY — the four validations on an AI-written ability, pinned on the
 * frames of forty #2 (`homebrew40-2026-11-02T05-09-26`) that earned them.
 *
 * The critic's split, three reads running: templates are sound and same, free text
 * is original and broken. Three of three surprises AND six of nine breaks on that
 * forty were authored rows — and three of the breaks were REPAIR-authored, which
 * predates R4, so these are owed whatever happens to Author.
 *
 * Built: (a) no amputation, (b) the splice capital, (d) no requiring a condition
 * the sheet never applies.
 * REFUSED AND PROPOSED, not built: (c) "a check or save with no {dc}". Measured
 * against print first — 99 of print's 107 trait/reaction rows that name a check or
 * a saving throw carry NO DC (every Legendary Resistance: "If the dragon fails a
 * saving throw…"), and a tightened "requires a roll" predicate still catches 19 of
 * 20, because the matches are negations: "without needing to make an ability
 * check" (Spider Climb, Ice Walk). Telling those apart is a reading of meaning, and
 * the house rule says propose it rather than write the word rule. See the results
 * block for the proposed call field.
 */
import fs from 'node:fs';
import { parseAuthorResponse } from '@/tools/statblock-generator/reskin/author.mjs';
import { renderForm } from '@/tools/statblock-generator/reskin/forms.mjs';

describe('(a) rules text is never amputated', () => {
  // The Chalk-Hound's Daubing Cling, forty #2 sheet 20: the call wrote a complete
  // sentence, `clean()` sliced it at 240 characters mid-word, and the renderer put a
  // full stop on the stump — "…a creature pulled into an o." 288 characters of
  // rendered text = its 44-character trigger + ", " + a 240-character amputation.
  const daubing = 'the chalk-hound climbs sheer stone and clings to ceilings without an ability check, and when it moves through other creatures or objects using Incorporeal Movement it can pull the Grappled creature along with it; a creature pulled into an object with it takes 5 (1d10) Force damage';
  const form = (effect) => JSON.stringify({ traits: [{ clause: 'c', name: 'Daubing Cling', trigger: 'While the chalk-hound is Grappling a creature', effect, imposes: null, condition_relation: 'none', passive_effect: 'ability' }] });

  test('a 280-character effect survives whole — it is no longer cut at 240', () => {
    expect(daubing.length).toBeGreaterThan(240);
    const t = parseAuthorResponse(form(daubing)).traits[0];
    expect(t).toBeTruthy();
    expect(t.effect.endsWith('Force damage')).toBe(true);
    expect(t.effect).not.toMatch(/ an? [a-z]$/); // the amputation's signature: a stranded article
  });

  test('a form past print\'s own longest trait is REFUSED with its reason, not cut', () => {
    const runaway = `it does ${'word '.repeat(200)}`;
    const p = parseAuthorResponse(form(runaway));
    expect(p.traits).toHaveLength(0);
    expect(p.refused[0].why).toMatch(/runs past 720 characters.*refused rather than cut mid-word/);
  });

  test('the cap is print\'s own maximum, so no print-length trait is refused', () => {
    // print's 324 trait rows: median 95, p95 362, max 714 (Loathsome Limbs); 28 run past 240
    const atPrintMax = `it does ${'x'.repeat(700)}`;
    expect(atPrintMax.length).toBeLessThanOrEqual(720);
    expect(parseAuthorResponse(form(atPrintMax)).traits).toHaveLength(1);
  });

  test('a reaction refused for length says so too — it used to drop silently', () => {
    const p = parseAuthorResponse(JSON.stringify({ reactions: [{ clause: 'c', name: 'Long Answer', trigger: 'When hit', response: `it ${'word '.repeat(200)}`, imposes: null, condition_relation: 'none' }] }));
    expect(p.reactions).toHaveLength(0);
    expect(p.refused.some((r) => r.name === 'Long Answer' && /runs past 720/.test(r.why))).toBe(true);
  });
});

describe('(b) the word after the trigger join is lowercased', () => {
  const trait = (trigger, effect, properNouns = []) => renderForm({ kind: 'trait', trigger, effect }, '2024', { properNouns });

  // the four joins forty #2 produced: three wrong, one right
  test('"A memento" — the Wound-Ledger, sheet 18', () => {
    expect(trait('Whenever the wound-ledger takes damage from a melee attack', 'A memento of the attacker is ripped free'))
      .toMatch(/melee attack, a memento of the attacker/);
  });
  test('"That creature" — the Hushfall, sheet 06', () => {
    expect(trait('While a Frightened creature is within reach of the hushfall', 'That creature cannot use its Reaction'))
      .toMatch(/hushfall, that creature cannot/);
  });
  test('"When the bull\'s" — the Fieldbreaker Bull, sheet 12', () => {
    expect(trait('While the bull is moving in a straight line', "When the bull's movement would be reduced to 0, it continues"))
      .toMatch(/straight line, when the bull's movement/);
  });
  test('"Thrust" is KEPT — it is the creature\'s own name (Unanswered Thrust, sheet 34)', () => {
    expect(trait('While in Dim Light or Darkness', 'Thrust has Advantage on Stealth checks', ['Unanswered Thrust']))
      .toMatch(/Darkness, Thrust has Advantage/);
  });
  // THE CRITIC CAUGHT THIS FIX FAILING ON ITS OWN FORTY (forty #3). All eleven live
  // cases were the word "The", and the engine's inline for a KIND is "the
  // cairn-wight" — so "the" entered my proper-noun keep set and the exemption I had
  // just added protected the exact word the fix existed to lowercase. The keep set now
  // reads only words Capitalised where the name is declared, which needs no article
  // list: an inline contributes nothing, a real name still protects itself.
  test('"The" is lowercased even when the creature\'s inline is "the <kind>" — the critic\'s eight sheets', () => {
    for (const [nouns, label] of [[['Barrow Cairn-Wight', 'the cairn-wight'], 'cairn-wight'], [['Spore-Mother', 'the spore-mother'], 'spore-mother'], [['Debt-Bound Collector', 'the collector'], 'collector']]) {
      expect(trait(`While the ${label} is near`, 'The target takes damage', nouns)).toMatch(/near, the target takes damage/);
    }
  });

  test('and a name word that IS capitalised is still protected', () => {
    expect(trait('While in Dim Light or Darkness', 'Thrust has Advantage', ['Unanswered Thrust', 'Thrust'])).toMatch(/Darkness, Thrust has Advantage/);
  });

  test('the old six-word list still works, and is no longer the whole rule', () => {
    expect(trait('While it is Bloodied', 'The creature deals extra damage')).toMatch(/Bloodied, the creature deals/);
  });
  test('a rules term lowercased here is restored by the 2024 caps pass, which runs over every landed row', () => {
    const { capsFix2024 } = require('@/tools/statblock-generator/format-2024/generate.mjs');
    expect(capsFix2024(trait('While it is Bloodied', 'Advantage on attack rolls'))).toMatch(/Bloodied, Advantage on attack rolls/);
  });
});

describe('(d) the condition a row REQUIRES is recorded, and must be one the sheet applies', () => {
  const requiring = JSON.stringify({ traits: [{ clause: 'c', name: 'Daubing Cling', trigger: 'While the chalk-hound is Grappling a creature', effect: 'it climbs sheer stone without an ability check', imposes: 'Grappled', condition_relation: 'requires', passive_effect: 'ability' }] });

  test('the call names Grappled with relation `requires`, and the name survives the parser', () => {
    // it did not before: `imposesFromRelation` correctly returned null and the NAME
    // was discarded, so the consumer's `t.condition` read a field no form carries
    // and `requireOn` never once fired for an authored row.
    const t = parseAuthorResponse(requiring).traits[0];
    expect(t.imposes).toBeNull();                     // it does not hand the condition out
    expect(t.requiresConditionNamed).toBe('Grappled'); // and it is on record that it needs one
    expect(t.condition_relation).toBe('requires');
  });

  test('`inflicts` records an imposition and requires nothing', () => {
    const t = parseAuthorResponse(JSON.stringify({ traits: [{ clause: 'c', name: 'X', trigger: null, effect: 'a creature near it has the Prone condition', imposes: 'Prone', condition_relation: 'inflicts', passive_effect: 'threat' }] })).traits[0];
    expect(t.imposes).toBe('Prone');
    expect(t.requiresConditionNamed).toBeNull();
  });
});

/**
 * AND THE GUARD'S ARMS ARE REACHABLE IN THE PIPELINE, not only in the parser. A
 * rarely-triggered guard cannot be proven by a clean run, and the two landings have
 * separate callers (the seat lands ONE row, the repair pass lands a BATCH), so each
 * is replayed on a frame where that call actually fires. The first attempt at the
 * repair arm used a concept whose clauses the chassis answered, so the repair call
 * was never sent and the test was asserting on a path that never ran — the frame
 * below is the shield-wall concept from pipelines.spec.js, which reaches it.
 */
import { generateReskin, renameKeysOf } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const stub = (cr, style, archetype, over = {}) => {
  const scaled = scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });
  const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
  return JSON.stringify({ name: 'Shieldwall Warlord', type: 'Humanoid', size: 'Medium', alignment: 'Lawful Evil', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.`, extra: over });
};
const twist = (body, receipt) => ({ path: 'twist', by: 'call', print_body: body, relation: 'is', class: null, species: null, receipt });

const REQUIRING_TRAIT = { clause: 'steps into the gap where a soldier beside her falls', name: 'Gap Lock', trigger: 'While the warlord is Grappling a creature', effect: 'it holds the line and cannot be moved against its will', imposes: 'Grappled', condition_relation: 'requires', passive_effect: 'protection' };

const CONCEPT = 'a hobgoblin warlord in lacquered plate who fights from a shield wall and steps into the gap where a soldier beside her falls';
const CLAUSES = { clauses: [{ text: 'fights from a shield wall', kind: 'mechanical' }, { text: 'steps into the gap where a soldier beside her falls', kind: 'mechanical' }] };

const repairRun = async (repairAnswer) => {
  const lines = []; const prompts = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
  let m;
  try {
    m = await generateReskin({ archetype: 'defender', concept: CONCEPT, userConcept: CONCEPT, cr: 6, path: twist('Hobgoblin Warrior', 'hobgoblin') }, async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith('You are repairing')) return JSON.stringify(repairAnswer);
      if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      return stub(6, null, 'defender', CLAUSES);
    });
  } finally { console.log = orig; }
  return { m, trace: lines.join('\n'), ranRepair: prompts.some((q) => q.startsWith('You are repairing')), rows: Object.values(m?.sections ?? {}).flat() };
};

describe('(d) in the pipeline — the REPAIR landing', () => {
  test('a repair row requiring a condition no row on the sheet imposes is refused', async () => {
    const { trace, rows, ranRepair } = await repairRun({ attacks: [], saves: [], traits: [REQUIRING_TRAIT], reactions: [], crossRef: null, unplaced: [] });
    expect(ranRepair).toBe(true); // the path under test actually ran
    expect(trace).toMatch(/authored row refused — requires a condition nothing applies:.*Gap Lock/);
    expect(rows.find((r) => r.name === 'Gap Lock')).toBeUndefined();
  }, 30000);

  test('but one requiring a condition the SAME BATCH applies is kept — a cross-row pair is legitimate', async () => {
    const { trace, rows, ranRepair } = await repairRun({
      attacks: [], reactions: [], crossRef: null, unplaced: [],
      saves: [{ clause: 'fights from a shield wall', name: 'Shield Pin', stat: 'Strength', target: 'one creature within 5 feet', damage: false, type: null, condition: 'Grappled', movement: null, success: 'none', recharge: false }],
      traits: [REQUIRING_TRAIT],
    });
    expect(ranRepair).toBe(true);
    expect(trace).not.toMatch(/requires a condition nothing applies:.*Gap Lock/);
    expect(rows.find((r) => r.name === 'Gap Lock')).toBeTruthy();
  }, 30000);
});

// forty #2 sheet 20's own body. Three frames were tried before this one and the guard
// correctly did NOT fire on any: a Humanoid warlord chassis carries a grappling row,
// and on this brute the ACTION seat's own fallback deals "Hooked Lash", which imposes
// Grappled — so a trait requiring Grappled had its requirement met and keeping it was
// right. Worth recording: on most sheets SOMETHING grapples, so this arm fires rarely
// by design. The row below therefore requires Blinded, which nothing on this sheet
// applies — the same predicate, on a condition the frame genuinely lacks.
const chalkHound = () => {
  const scaled = scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] });
  const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
  return JSON.stringify({ name: 'Chalk Hound', type: 'Undead', size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.` });
};

describe('(d) in the pipeline — the SEAT landing', () => {
  // the seat lands ONE row and has its own caller for the predicate, so it is
  // replayed separately. This is the Chalk-Hound's own frame from forty #2 sheet 20.
  test('the seat refuses a row requiring a condition no row on the sheet imposes', async () => {
    const concept = 'a chalk-hound that walks through walls and drags you back out through them';
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 8, mechanics: [] }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'It drags you back out through the wall.', section: 'trait', trigger: 'always', effect: 'movement' } });
        if (prompt.startsWith("A monster's signature ability")) return JSON.stringify({ template: 'none', because: '', declined_because: 'no_fit', closest: 'bloodied-fury', missing: 'a drag through solid stone' });
        if (prompt.startsWith('You are writing ONE ability for a D&D monster')) return JSON.stringify({ attacks: [], saves: [], reactions: [], crossRef: null, unplaced: [], traits: [{ clause: 'drags you back out through them', name: 'Daubing Cling', trigger: 'While a creature near the chalk-hound cannot see', effect: 'it can pull that creature with it through solid stone', imposes: 'Blinded', condition_relation: 'requires', passive_effect: 'ability' }] });
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        return chalkHound();
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/seat authoring refused:.*needs its target to have Blinded and no row on this sheet imposes it/);
    expect(Object.values(m.sections).flat().find((r) => r.name === 'Daubing Cling')).toBeUndefined();
  }, 30000);
});

/**
 * FORTY #3's REGRESSED LINTS AND THE UNDEFINED REFERENT, each closed at its source
 * and replayed on the sheet that earned it.
 */
/**
 * FORTY #3's TWO REGRESSED LINTS — replayed from the SAVED SHEETS, which is what the
 * brief asked for and what my first attempt did not do. That attempt built a fresh
 * harness run instead, no composed candidate was ever offered, the fit call answered
 * `none`, the new arm never executed, and the assertion ("no row has a placeholder
 * name") was true of a sheet that could not have had one. A test that cannot fail is
 * worse than no test. Both halves are pinned here against real data: the DETECTOR on
 * the sheet that shipped the defect, and the EFFECT across the run that followed.
 */
describe("forty #3's regressed lints, on the saved sheets", () => {
  const { lintSheet } = require('@/tools/statblock-generator/reskin/sheet-lints.mjs');
  const load = (dir, n) => {
    const d = `smoke-out/${dir}`;
    const f = fs.readdirSync(d).find((x) => x.startsWith(`${n}-`) && x.endsWith('.json'));
    return f ? JSON.parse(fs.readFileSync(`${d}/${f}`, 'utf8')) : null;
  };
  const BAD = 'homebrew40-2026-11-02T13-47-49';   // forty #3: shipped both defects
  const FIXED = 'homebrew40-2026-11-02T18-48-33'; // forty #4: the run after the fixes
  const sheets = (dir) => fs.readdirSync(`smoke-out/${dir}`).filter((x) => /^\d\d-.*\.json$/.test(x))
    .map((x) => JSON.parse(fs.readFileSync(`smoke-out/${dir}/${x}`, 'utf8')));

  test('the placeholder lint fires on the sheet that shipped "Composed Row" (#35)', () => {
    const sheet = load(BAD, 35);
    expect(sheet).toBeTruthy();
    const found = lintSheet(sheet).filter((f) => f.rule === 'placeholder-row-name');
    expect(found.length).toBeGreaterThan(0);
    expect(JSON.stringify(found)).toMatch(/Composed Row/);
  });

  test('and no sheet of the run that followed ships one', () => {
    const hits = sheets(FIXED).flatMap((sh) => lintSheet(sh).filter((f) => f.rule === 'placeholder-row-name'));
    expect(hits).toEqual([]);
  });

  test('the empty lettered option is gone from the run that followed (#37 shipped "(A) or (B) Spellcasting")', () => {
    const bad = load(BAD, 37);
    expect(JSON.stringify(bad)).toMatch(/\(A\) or \(B\)/); // the known-bad sheet, for the record
    for (const sh of sheets(FIXED)) {
      const m = sh.monster ?? sh;
      for (const r of Object.values(m.sections ?? m.other_edition?.sections ?? {}).flat()) {
        expect(r.text ?? '').not.toMatch(/use of \(A\) or\b/);  // an empty first option
        expect(r.text ?? '').not.toMatch(/use of \(B\)/);         // an orphan second
      }
    }
  });
});

describe('a row may not make something act that the sheet never defines', () => {
  const trait = (acts, effect) => ({ clause: 'c', name: 'Anchored Dead', trigger: 'When a creature dies within 10 feet of the dowager', effect, imposes: null, condition_relation: 'none', acts, passive_effect: 'ability' });

  test('the call answers `acts`, and the parser keeps the name it gave', () => {
    const t = parseAuthorResponse(JSON.stringify({ traits: [trait('spore-puppet', 'it rises as a spore-puppet that moves and claws on her turn')] })).traits[0];
    expect(t.acts).toBe('spore-puppet');
  });

  test('null when the creature itself does all the work', () => {
    expect(parseAuthorResponse(JSON.stringify({ traits: [trait(null, 'the dowager regains {dmg} Hit Points')] })).traits[0].acts).toBeNull();
  });

  test('the repair landing refuses a row whose acting noun is on no row — the Spore-Mother, sheet 14', async () => {
    const { trace, rows, ranRepair } = await repairRun({ attacks: [], saves: [], reactions: [], crossRef: null, unplaced: [], traits: [trait('spore-puppet', 'it rises as a spore-puppet that moves and claws on the warlord\'s turn')] });
    expect(ranRepair).toBe(true);
    expect(trace).toMatch(/makes something act that the sheet never defines:.*spore-puppet/);
    expect(rows.find((r) => r.name === 'Anchored Dead')).toBeUndefined();
  }, 30000);

  test("but one naming a row that IS on the sheet is KEPT — the guard's other arm", async () => {
    // The first version of this test was titled "is kept" and asserted refusal, so the
    // keep arm was never proven. Multiattack is on every sheet this harness builds.
    const { trace, rows, ranRepair } = await repairRun({ attacks: [], saves: [], reactions: [], crossRef: null, unplaced: [], traits: [{ ...trait('Multiattack', 'the warlord directs an ally to strike with it'), name: 'Called Volley' }] });
    expect(ranRepair).toBe(true);
    expect(trace).not.toMatch(/makes something act that the sheet never defines:.*Called Volley/);
    expect(rows.find((r) => r.name === 'Called Volley')).toBeTruthy();
  }, 30000);

  test('and a name the sheet does not carry is refused, batch-mates included', async () => {
    // deliberate: the guard reads the SHEET, not the batch. A save row landed alongside
    // is not stats for a creature, so naming one does not license an acting noun.
    const { trace, rows } = await repairRun({
      attacks: [], saves: [{ clause: 'c', name: 'Shield Pin', stat: 'Strength', target: 'one creature within 5 feet', damage: false, type: null, condition: 'Grappled', movement: null, success: 'none', recharge: false }],
      reactions: [], crossRef: null, unplaced: [], traits: [{ ...trait('a pinned soldier', 'the creature it has pinned acts on its turn'), name: 'Held Fast' }],
    });
    expect(trace).toMatch(/makes something act that the sheet never defines:.*a pinned soldier/);
    expect(rows.find((r) => r.name === 'Held Fast')).toBeUndefined();
  }, 30000);
});
