import { settleSheetBudgets } from '@/tools/statblock-generator/reskin/generate.mjs';
import { parseAuthorResponse, TURN_DENIAL } from '@/tools/statblock-generator/reskin/author.mjs';
/**
 * R9 · RELEASE PASS — the critic's deterministic list from forty #4
 * (`homebrew40-2026-11-02T18-48-33`), each item pinned on the sheet that shipped it.
 *
 * The owner's rule for this pass: if it needs string surgery it has to be justified.
 * Group A is three REMOVALS of surgery; nothing here adds a regex over the GM's or the
 * model's prose.
 *
 * One lint was PROPOSED AND REFUSED by measurement, and is recorded here so nobody
 * builds it: a "names the creature twice" detector for the substitution bug fires on
 * PRINT — 83 of print's own sentences name the creature's short form twice, and the
 * Aboleth's Probing Telepathy names it three times. The removal is pinned by replay.
 */
import fs from 'node:fs';
import { applyCorrections } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { generateReskin, renameKeysOf } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

// ONE CORPUS READ FOR THE FILE. Three tests here each re-read and re-parsed the 329
// monsters, and the whole statblock suite went from ~45s to over 300s. Memoised.
let _corpus = null;
const corpus = () => { if (!_corpus) { const a = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8')); _corpus = Array.isArray(a) ? a : Object.values(a).flat(); } return _corpus; };
let _printRows = null;
const allPrintRows = () => { if (!_printRows) _printRows = corpus().flatMap((m) => Object.values(m.sections ?? {}).flat()); return _printRows; };

const FOUR = 'smoke-out/homebrew40-2026-11-02T18-48-33';
const sheet = (n) => {
  const f = fs.readdirSync(FOUR).find((x) => x.startsWith(`${String(n).padStart(2, '0')}-`) && x.endsWith('.json'));
  return f ? JSON.parse(fs.readFileSync(`${FOUR}/${f}`, 'utf8')) : null;
};
const rowsOf = (j) => { const m = j.monster ?? j; return Object.values(m.sections ?? m.other_edition?.sections ?? {}).flat(); };

const answer = (name, type, cr, archetype, extra = {}) => {
  const scaled = scaleDonor(pickDonor(cr, null, archetype), cr, { mechanics: [] });
  const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
  return JSON.stringify({ name, type, size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])), conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.`, ...extra });
};

describe('A1 — the engine does not rewrite an authored sentence', () => {
  test('the saved sheets show what the stamp did (#36, #08)', () => {
    expect(rowsOf(sheet(36)).find((r) => r.name === "Frozen Heart's Echo").text).toMatch(/the scream cannot move away from the scream/);
    expect(rowsOf(sheet(8)).find((r) => r.name === 'Listening Slats').text).toMatch(/the hunger pinpoints the hunger's position/);
  });

  test("an authored row's \"the creature\" survives to the sheet", async () => {
    const concept = 'a glacier scream that freezes whoever hears it';
    let m;
    const orig = console.log; console.log = () => {};
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 10, mechanics: [] }, async (p) => {
        if (p.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'A frightened creature cannot flee from it.', section: 'trait', trigger: 'always', effect: 'condition' } });
        if (p.startsWith("A monster's signature ability")) return JSON.stringify({ template: 'none', because: '', declined_because: 'no_fit', closest: 'bloodied-fury', missing: 'a fear that pins' });
        if (p.startsWith('You are writing ONE ability')) return JSON.stringify({ attacks: [], saves: [], reactions: [], crossRef: null, unplaced: [], traits: [{ clause: 'freezes whoever hears it', name: 'Frozen Echo', trigger: 'While a creature within 60 feet has the Frightened condition', effect: 'the creature cannot move away from the scream', imposes: null, condition_relation: 'requires', acts: null, passive_effect: 'threat' }] });
        if (p.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (p.startsWith('You are repairing') || p.startsWith('You are completing')) return JSON.stringify({});
        return answer('Glacier Scream', 'Elemental', 10, 'brute');
      });
    } finally { console.log = orig; }
    const row = rowsOf(m).find((r) => r.name === 'Frozen Echo');
    if (row) {
      expect(row.text).toMatch(/the creature cannot move away/); // not "the scream cannot move away from the scream"
      expect(row.text).not.toMatch(/the scream.{0,30}the scream/);
    }
  }, 30000);
});

describe('A2 — a vocabulary rewrite stands down on a row the model authored', () => {
  test('the saved sheet shows the garble (#22)', () => {
    expect(rowsOf(sheet(22)).find((r) => r.name === 'Span-Anchored').text).toMatch(/cannot be has the Prone condition/);
  });

  const run = (rows) => applyCorrections({ sections: { Traits: rows } },
    [{ rule: 'prone-vocab', severity: 'correctable' }, { rule: 'garbled-condition-grammar', severity: 'correctable' }], { chassis: null }).sections.Traits;

  test("an authored row's own idiom is left alone", () => {
    const [r] = run([{ name: 'Span-Anchored', text: 'the larder cannot be knocked Prone or forcibly moved.', authored: true }]);
    expect(r.text).toBe('the larder cannot be knocked Prone or forcibly moved.');
  });

  test('and an engine row still gets 2024 vocabulary', () => {
    const [r] = run([{ name: 'Chassis Row', text: 'A creature that fails the save is knocked Prone.' }]);
    expect(r.text).toBe('A creature that fails the save has the Prone condition.');
  });

  test('the safety net now runs after the rule that can create the garble', () => {
    const [r] = run([{ name: 'Garbled', text: 'The target cannot be has the Prone condition.' }]);
    expect(r.text).toBe('The target cannot have the Prone condition.');
  });
});

describe('A3 — a name collision refuses the row; the engine mints nothing', () => {
  test('the saved sheet shows the minted name (#28)', () => {
    expect(rowsOf(sheet(28)).some((r) => / II$/.test(r.name))).toBe(true);
  });

  test('no " II" name can be minted: a colliding authored trait declines', async () => {
    const concept = 'a kiln-priest whose prayers are spoken in fire';
    let m;
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 8, mechanics: [] }, async (p) => {
        if (p.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'Its prayers burn whoever stands near.', section: 'trait', trigger: 'always', effect: 'damage' } });
        if (p.startsWith("A monster's signature ability")) return JSON.stringify({ template: 'none', because: '', declined_because: 'no_fit', closest: 'bloodied-fury', missing: 'a prayer that burns' });
        // the authoring call names a row that is already on the sheet
        if (p.startsWith('You are writing ONE ability')) {
          const taken = (/never reuse one, the new row needs a name of its own: "([^"]+)"/.exec(p) ?? [, 'Multiattack'])[1];
          return JSON.stringify({ attacks: [], saves: [], reactions: [], crossRef: null, unplaced: [], traits: [{ clause: 'prayers are spoken in fire', name: taken, trigger: null, effect: 'it sheds burning light', imposes: null, condition_relation: 'none', acts: null, passive_effect: 'threat' }] });
        }
        if (p.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (p.startsWith('You are repairing') || p.startsWith('You are completing')) return JSON.stringify({});
        return answer('Kiln-Priest', 'Humanoid', 8, 'brute');
      });
    } finally { console.log = orig; }
    for (const r of rowsOf(m)) expect(r.name).not.toMatch(/ II$/);
  }, 30000);
});

describe('B4 — a condition the game does not have is refused', () => {
  const { parseAuthorResponse } = require('@/tools/statblock-generator/reskin/author.mjs');
  const t = (eff) => JSON.stringify({ traits: [{ clause: 'c', name: 'Bell-Slumber', trigger: null, effect: eff, imposes: null, condition_relation: 'none', acts: null, passive_effect: 'protection' }] });

  test('the saved sheet shows it (#13 "the sleep condition")', () => {
    expect(rowsOf(sheet(13)).find((r) => r.name === 'Bell-Slumber').text).toMatch(/the sleep condition/);
  });
  test('"the sleep condition" is refused, with its reason', () => {
    const p = parseAuthorResponse(t('it is not subject to the sleep condition'));
    expect(p.traits).toHaveLength(0);
    expect(p.refused[0].why).toMatch(/not a condition in this game/);
  });
  test('a real condition is kept — the list is the engine\'s own', () => {
    expect(parseAuthorResponse(t('it is not subject to the Frightened condition')).traits).toHaveLength(1);
  });
});

describe('E14 — the anchor answers an index, not a line', () => {
  const { buildIdeaPrompt, parseIdeas } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const open = [{ handed: 'drags fishermen under', mechanic: 'grapple' }, { handed: 'whose hide steams', mechanic: null }];
  const handed = open.map((c) => c.handed);
  const idea = (clause) => JSON.stringify({ action: { idea: 'x'.repeat(40), section: 'action', trigger: 'save', effect: 'damage', clause } });

  test('the prompt asks for a number and makes the field required', () => {
    const t = buildIdeaPrompt({ name: 'X', cr: 5, concept: 'c', sheetLines: 's', openClauses: open });
    expect(t).toMatch(/WHICH BY ITS NUMBER/);
    expect(t).toMatch(/"clause" is REQUIRED on every idea/);
    expect(t).toMatch(/"clause": <required: the NUMBER 1-2 of the ask this answers, or 0 for none>/);
    expect(t).not.toMatch(/left out if it answers none/); // the wording that invited 49 blanks
  });

  test('an index resolves to its ask; 0 and out-of-range resolve to none', () => {
    expect(parseIdeas(idea(1), handed).action.clause).toBe('drags fishermen under');
    expect(parseIdeas(idea('2'), handed).action.clause).toBe('whose hide steams');
    expect(parseIdeas(idea(0), handed).action.clause).toBeNull();
    expect(parseIdeas(idea(7), handed).action.clause).toBeNull();
  });

  test('an exact string still resolves — one release of overlap, so a mid-deploy run keeps its anchors', () => {
    expect(parseIdeas(idea('drags fishermen under'), handed).action.clause).toBe('drags fishermen under');
  });

  test('and forty #4\'s failure mode is still recorded rather than guessed at', () => {
    const p = parseIdeas(idea('"drags fishermen under" — an earlier call read this as asking for: grapple'), handed);
    expect(p.action.clause).toBeNull();
    expect(p.action.clauseRaw).toMatch(/an earlier call read this/);
  });
});

describe('G — the repair landing refuses what the seat refuses', () => {
  test('the saved sheets show all three (#11 Grappled thrice, #12 Prone thrice, #33 dangling)', () => {
    const grappled = rowsOf(sheet(11)).filter((r) => [].concat(r.imposes ?? []).includes('Grappled'));
    expect(grappled.length).toBeGreaterThanOrEqual(3);
    const prone = rowsOf(sheet(12)).filter((r) => [].concat(r.imposes ?? []).includes('Prone'));
    expect(prone.length).toBeGreaterThanOrEqual(3);
    expect(rowsOf(sheet(33)).find((r) => r.name === 'Who Swings?').text).toMatch(/Committed Haymaker|Mistimed Backhand/);
  });
});

/**
 * R10 · H1 — WITHDRAWN AND REBUILT AT THE DECLARED FIELD (owner's catch, 2026-11-03:
 * "is this string matching? looks like string matching"). It was. `referentsOf` read
 * finished prose for a Sphere with no origin and for "its tremorsense" — class D in §2's
 * table, meaning read off engine-written text where a declared field exists. Both checks
 * had reached 0 false positives on print's 1,291 rows, which is exactly why they looked
 * safe: a clean corpus is necessary and not sufficient. The test is whether a declared
 * answer already exists.
 *
 * The Sphere's declared answer is `TARGET_OK`, the save form's own target enum, which
 * was accepting "each creature in a 10-foot Sphere". It no longer does.
 */
describe('H1 — a Sphere target carries its origin, refused at the enum', () => {
  const { parseAuthorResponse } = require('@/tools/statblock-generator/reskin/author.mjs');
  const save = (target) => JSON.parse(JSON.stringify(parseAuthorResponse(JSON.stringify({
    saves: [{ clause: 'c', name: 'Snare', stat: 'Strength', target, damage: false, type: null, condition: 'Restrained', movement: null, success: 'none', recharge: false }],
  }))));

  test('an origin-less Sphere is not an accepted target — it falls back, it does not ship (G09)', () => {
    expect(save('each creature in a 10-foot Sphere').saves[0].target).not.toBe('each creature in a 10-foot Sphere');
  });

  test('a Sphere that says where it is centred is accepted', () => {
    expect(save('each creature in a 10-foot Sphere centered on a point within 60 feet').saves[0].target)
      .toBe('each creature in a 10-foot Sphere centered on a point within 60 feet');
  });

  test('a Cone, Line or Emanation needs no origin — they come from the creature by convention', () => {
    for (const t of ['each creature in a 60-foot Cone', 'each creature in a 30-foot Line', 'each creature in a 20-foot Emanation']) {
      expect(save(t).saves[0].target).toBe(t);
    }
  });

  // Recorded so nobody rebuilds them as predicates over prose: the sense check ("within
  // its tremorsense range", H10) wants a `senses` field on the forms naming what a row
  // leans on; "a phrase that deals or restores states an amount" (H30, G32) and "a DC
  // belongs to a roll" (H16) were measured at 75 false positives on print and want the
  // same treatment. All three are proposed, none is built.
});

/**
 * R10 · H3 (one piece) — one per-turn heal a sheet, at ship, across every provenance.
 * Measured first: **4 printed blocks carry one per-turn heal and not one carries two.**
 * The critic found the stack twice and the gate traced it to the CHASSIS's Regeneration
 * sitting beside an authored or templated heal, so no single-provenance guard can see it.
 */
describe('H3 — one per-turn heal a sheet', () => {
  const { settleSheetBudgets } = require('@/tools/statblock-generator/reskin/generate.mjs');
  const run = (rows) => {
    const sections = { Traits: rows.map((r) => ({ ...r })) }; const lines = [];
    settleSheetBudgets({ sections, scaled: { pb: 3 }, cr: 7, trace: (a, b) => lines.push(`${a} ${b}`) });
    return { left: sections.Traits.map((r) => r.name), trace: lines.join('\n') };
  };

  test('which rows heal is DECLARED: the call answers `heals`, and print is known by its own row name', () => {
    const { parseAuthorResponse } = require('@/tools/statblock-generator/reskin/author.mjs');
    const t = (h) => JSON.stringify({ traits: [{ clause: 'c', name: 'Tithe', trigger: 'At the start of each of its turns', effect: 'it regains {dmg} Hit Points', imposes: null, condition_relation: 'none', acts: null, heals: h, mechanics: 1, passive_effect: 'ability' }] });
    expect(parseAuthorResponse(t(true)).traits[0].heals).toBe(true);
    expect(parseAuthorResponse(t(undefined)).traits[0].heals).toBe(false);
  });

  test('print carries no block with two per-turn heals', () => {
    const list = corpus();
    const PERTURN = /regains? \d+[^.]{0,40}(?:at the start of each of (?:its|the)|each turn|every turn)|\bRegeneration\b/i;
    const two = list.filter((m) => Object.values(m.sections ?? {}).flat().filter((r) => PERTURN.test(String(r.text ?? '')) || /^Regeneration/.test(String(r.name ?? ''))).length >= 2);
    expect(two.map((m) => m.name)).toEqual([]);
  });

  test("the row that answers the GM stays; the chassis's filler leaves — the gate's own case", () => {
    const { left, trace } = run([
      { name: 'Regeneration', text: 'The ledger regains 10 Hit Points at the start of each of its turns.' },
      { name: "Debtor's Tithe", text: 'It regains 7 (2d6) Hit Points at the start of each of its turns.', heals: true, clause: 'takes something every time it is wounded', authored: true },
    ]);
    expect(left).toEqual(["Debtor's Tithe"]);
    expect(trace).toMatch(/second per-turn heal removed: "Regeneration" leaves/);
  });

  test("print's own row outranks an unreceipted addition", () => {
    expect(run([
      { name: 'Regeneration', text: 'The troll regains 15 Hit Points at the start of each of its turns.', print: true },
      { name: 'Knitting Rime', text: 'It regains 5 Hit Points at the start of each of its turns.', heals: true, authored: true },
    ]).left).toEqual(['Regeneration']);
  });

  test('one heal alone is untouched, and an exact print sheet is never touched', () => {
    expect(run([{ name: 'Regeneration', text: 'regains 10 Hit Points at the start of each of its turns.' }]).left).toEqual(['Regeneration']);
    const sections = { Traits: [{ name: 'Regeneration', text: 'regains 10 Hit Points at the start of each of its turns.' }, { name: 'Second', text: 'regains 5 Hit Points at the start of each of its turns.', heals: true }] };
    settleSheetBudgets({ sections, printExact: true, scaled: { pb: 3 }, cr: 7 });
    expect(sections.Traits).toHaveLength(2);
  });
});

/**
 * R10 · H3 — the ceilings a GM cannot see. Each measured against print BEFORE it was
 * set, and each reading declared data: a CR is a number, `Legendary Resistance` and
 * `Regeneration` are print's own row names, `Legendary Actions` is a section, a row that
 * answers the GM carries a `clause`, and the nova cap compares numbers.
 */
describe('H3 — legendary machinery starts at CR 10', () => {
  const { settleSheetBudgets } = require('@/tools/statblock-generator/reskin/generate.mjs');
  const LR = { name: 'Legendary Resistance (3/Day)', text: 'If it fails a saving throw, it can choose to succeed instead.' };
  const run = (cr, traits, la) => {
    const sections = { Traits: traits.map((r) => ({ ...r })), ...(la ? { 'Legendary Actions': la.map((r) => ({ ...r })) } : {}) };
    settleSheetBudgets({ sections, scaled: { pb: 2 }, cr });
    return { traits: sections.Traits.map((r) => r.name), la: (sections['Legendary Actions'] ?? []).map((r) => r.name) };
  };

  test("print's floor: 32 blocks carry Legendary Resistance and exactly one sits below CR 10", () => {
    const list = corpus();
    const crOf = (m) => { const c = String(m.challenge_rating ?? m.cr ?? ''); return c.includes('/') ? Number(c.split('/')[0]) / Number(c.split('/')[1]) : Number(c); };
    const withLR = list.filter((m) => Object.values(m.sections ?? {}).flat().some((r) => /^Legendary Resistance/.test(String(r.name ?? ''))));
    expect(withLR).toHaveLength(32);
    expect(withLR.filter((m) => crOf(m) < 10).map((m) => m.name)).toEqual(['Unicorn']);
  });

  test('a CR 4 sheet loses unasked Legendary Resistance and its legendary actions — the Coal-Cat', () => {
    expect(run(4, [LR], [{ name: 'Pounce' }, { name: 'Ember Step' }])).toEqual({ traits: [], la: [] });
  });

  test('but a row the GM asked for is kept at any CR — print keeps the Unicorn at CR 5', () => {
    expect(run(4, [{ ...LR, clause: 'a legendary coal-cat' }], null).traits).toEqual(['Legendary Resistance (3/Day)']);
  });

  test('and CR 10 and up is untouched', () => {
    expect(run(13, [LR], [{ name: 'Pounce' }])).toEqual({ traits: ['Legendary Resistance (3/Day)'], la: ['Pounce'] });
  });
});

describe('H3 — the nova cap is print\'s plateau, not a line', () => {
  const { NOVA_CAP } = require('@/tools/statblock-generator/reskin/templates.mjs');
  // print's recharge-gated area maxima by CR: 66 @11 · 55 @13 · 54 @14 · 56 @15 · 60 @16
  // · 66 @17 · 63 @20 · 67 @21 · 82 @22 · 88 @23 · 91 @24. The old curve (4*cr + 15) ran
  // 12-32 over those from CR 13 up.
  test('no CR from 12 up is capped above print\'s own maximum anywhere in its band', () => {
    for (const [cr, printMax] of [[13, 55], [14, 54], [15, 56], [16, 60], [17, 66], [20, 63]]) {
      expect(NOVA_CAP(cr)).toBeLessThanOrEqual(66); // print's maximum across CR 12-20
      expect(NOVA_CAP(cr)).toBeGreaterThanOrEqual(printMax - 12); // and never cuts below the round
    }
    expect(NOVA_CAP(22)).toBe(82);
    expect(NOVA_CAP(24)).toBe(91);
  });

  test('at or below CR 11 the old curve stands — it is a ceiling on abuse, not a cut', () => {
    expect(NOVA_CAP(6)).toBe(41);
    expect(NOVA_CAP(11)).toBe(69);
  });
});

/**
 * R10 · H3 — a free every-turn defensive posture counts as effective Hit Points.
 * Owner's ruling, 2026-11-03: "keep the abilities, raise the number — the GM asked for a
 * monk." So Patient Defense and Guarded Stance stay on the sheet and the band reads the
 * truth about them, which is the critic's own ask ("in band with the unpriced rows
 * counted" — the invisible check the user cannot do).
 */
describe('H3 — the defensive posture is priced, not removed', () => {
  const { effectiveHp, defensivePostureMult } = require('@/tools/statblock-generator/reskin/checker.mjs');

  const printRows = () => {
    const list = corpus();
    return list.flatMap((m) => Object.values(m.sections ?? {}).flat());
  };

  test('print offers no tier to copy for the DODGE — hence the arithmetic', () => {
    expect(printRows().filter((r) => /Dodge/i.test(String(r.text ?? '')))).toHaveLength(0);
  });

  // THE OTHER TWO RIDERS ARE PRINT'S OWN AND ARE NOT PRICED. Recorded here because an
  // earlier measurement in this very file claimed "0 attack rows stun" — it searched
  // `Stunned` alone and missed `Paralyzed`, which is strictly worse, and I nearly built
  // a ceiling on it. 54 print rows impose Stunned, Paralyzed or Incapacitated.
  test('print DOES put unlimited turn-denial on an attack row, from CR 1 up', () => {
    const turnDenial = printRows().filter((r) => /Attack Roll/.test(String(r.text ?? '')) && /\b(Stunned|Paralyzed)\b/.test(String(r.text ?? '')));
    expect(turnDenial.map((r) => r.name).sort()).toEqual(['Bite', 'Claw', 'Claw', 'Paralyzing Touch', 'Umbral Dagger']);
    // the Ghoul's Claw: DC 10, no per-turn limit at all. Ours is once per turn WITH a save.
    expect(turnDenial.some((r) => /DC 10/.test(String(r.text ?? '')))).toBe(true);
  });

  test('and print puts Disadvantage on a hit, unlimited — the Ettin at CR 4', () => {
    const dis = printRows().filter((r) => /Attack Roll/.test(String(r.text ?? '')) && /Disadvantage/.test(String(r.text ?? '')));
    expect(dis).toHaveLength(3);
  });

  // Disadvantage turns a hit chance p into p², so damage taken falls to p of itself and
  // effective Hit Points rise by 1/p: 1.54x at 65%, 1.82x at 55%. 1.6 is the middle of
  // print's own typical band.
  test('1.6x, and it stacks with a resistance because both are real', () => {
    const base = { hp: 120, resistances: '', immunities: '' };
    expect(effectiveHp({ ...base, sections: { Traits: [{ name: 'Stone Hide' }] } }, 10)).toBe(120);
    expect(effectiveHp({ ...base, sections: { 'Bonus Actions': [{ name: 'Patient Defense', template: 'patient-defense' }] } }, 10)).toBe(192);
    expect(effectiveHp({ ...base, resistances: 'Bludgeoning, Piercing, Slashing', sections: { 'Bonus Actions': [{ name: 'Patient Defense', template: 'patient-defense' }] } }, 10)).toBe(288);
  });

  test('read by DECLARED template id, never by the row\'s words', () => {
    expect(defensivePostureMult({ sections: { Traits: [{ name: 'Patient Defense', text: 'It takes the Dodge action.' }] } })).toBe(1);
    expect(defensivePostureMult({ sections: { Traits: [{ name: 'Anything At All', template: 'patient-defense' }] } })).toBe(1.6);
  });

  test('both printings are read — a 2014-active sheet keeps its rows under other_edition', () => {
    expect(defensivePostureMult({ other_edition: { sections: { 'Bonus Actions': [{ name: 'Patient Defense', template: 'patient-defense' }] } } })).toBe(1.6);
  });

  test('the three sheets the critic called hot now read 1.6, and a control reads 1', () => {
    const fs2 = fs;
    const load = (dir, n) => { const f = fs2.readdirSync(dir).find((x) => x.startsWith(`${n}-`) && x.endsWith('.json')); const j = JSON.parse(fs2.readFileSync(`${dir}/${f}`, 'utf8')); return j.monster ?? j; };
    const SW = 'smoke-out/sweep-2026-11-02T20-21-41'; const HB = 'smoke-out/homebrew40-2026-11-02T20-39-39';
    expect(defensivePostureMult(load(SW, '33'))).toBe(1.6); // Reedmarch Kin, 2014
    expect(defensivePostureMult(load(HB, '17'))).toBe(1.6); // Pane-Ascetic
    expect(defensivePostureMult(load(SW, '40'))).toBe(1.6); // Brother Halric, Guarded Stance
    expect(defensivePostureMult(load(HB, '21'))).toBe(1);   // Drowned Silence, no posture row
  });
});

describe("R11 — an authored row declares an economy print would recognise", () => {
  // The critic's hottest class on the gate forty of 2026-11-03: 5 of the 7 invisible
  // calibration misses were rows the engine authored new, landing the concept and
  // shipping with no action-economy price. Each rule below is a COUNT from print, and
  // the two the critic proposed that print REFUTED are pinned as refusals, not rules.
  const print = corpus();
  const rows = (sec) => print.flatMap((m) => (m.sections?.[sec] ?? []).map((e) => ({ m, e })));
  const DENY = /has the (?:Stunned|Paralyzed|Incapacitated) condition/;

  it('print never denies a turn from a Bonus Action, though it does impose conditions there', () => {
    const bonus = rows('Bonus Actions');
    expect(bonus.filter(({ e }) => /has the \w+ condition/.test(String(e.text ?? ''))).length).toBe(15);
    expect(bonus.filter(({ e }) => DENY.test(String(e.text ?? ''))).length).toBe(0);
  });

  it('…but print DOES deny a turn at will from an action, so no CR ceiling is set', () => {
    // the rule "stun is recharge or X/day below CR 10" was proposed twice and refused
    // twice: print's Ghoul paralyzes at CR 1 with DC 10 and no limit.
    const LIM = /\(Recharge|\/Day|Once per|once per turn|once on each of|Recharges/i;
    const unlimited = print.flatMap((m) => Object.entries(m.sections ?? {})
      .filter(([sec]) => sec !== 'Reactions')
      .flatMap(([, es]) => (es ?? []).map((e) => ({ cr: m.cr, e }))))
      .filter(({ e }) => DENY.test(String(e.text ?? '')) && !LIM.test(`${e.name ?? ''} ${e.text ?? ''}`));
    expect(unlimited.filter((x) => x.cr < 10).length).toBe(16);
  });

  it('print never writes "the first time each turn", and never damages and heals in one row', () => {
    const all = print.flatMap((m) => Object.values(m.sections ?? {}).flat()).filter(Boolean);
    expect(all.filter((e) => /first time (?:each|on each of)/i.test(String(e.text ?? ''))).length).toBe(0);
    expect(all.filter((e) => /\btakes? \d+ \(\d+d\d+\)/.test(String(e.text ?? '')) && /regains \d+/.test(String(e.text ?? ''))).length).toBe(0);
  });

  it("refuses Brother Halric's trait — it fires on every creature's turn AND heals", () => {
    // replayed from smoke-out/sweep-2026-11-03T16-53-32/40-brother-halric.json
    const got = parseAuthorResponse(JSON.stringify({
      traits: [{
        clause: 'blood-sworn', name: 'Blood-Sworn Radiance', heals: true, mechanics: 1, passive_effect: 'other',
        trigger: 'While he is Bloodied, the first time each turn he takes damage',
        effect: 'each creature of his choice within 15 feet takes {dmg} Radiant damage, and a creature of his choice within 15 feet regains {dmg} Hit Points',
      }],
    }));
    expect(got.traits).toHaveLength(0);
    expect(got.refused.map((r) => r.why).join(' ')).toMatch(/first time each turn/);
  });

  it('a trait that heals without dealing damage still lands', () => {
    // the refusal is the PAIR, not the heal: print splits them across rows, it does not ban either
    const got = parseAuthorResponse(JSON.stringify({
      traits: [{
        clause: 'mends', name: 'Grave-Wax Mending', heals: true, mechanics: 1, passive_effect: 'other',
        trigger: 'At the start of each of its turns', effect: 'it regains {dmg} Hit Points',
      }],
    }));
    expect(got.refused).toHaveLength(0);
    expect(got.traits).toHaveLength(1);
  });
});

describe('R11 — the bonus-action guard reads declared data, not prose', () => {
  it("the Mirebind Witch's row declares the condition the guard keys on", () => {
    // replayed from smoke-out/sweep-2026-11-03T16-53-32/26-mirebind-witch.json, the
    // sheet the critic called hottest. The guard in generateReskin needs two facts and
    // both are declared: the condition (a validated enum on the save form) and the
    // section (the seat's own placement). Neither is read off the rendered sentence.
    const got = parseAuthorResponse(JSON.stringify({
      saves: [{ clause: 'binds', name: 'Waxen Likeness', stat: 'Constitution', target: 'one creature within 60 feet', condition: 'Stunned' }],
    }));
    expect(got.saves[0].condition).toBe('Stunned');
    expect(TURN_DENIAL).toContain(got.saves[0].condition);
  });

  it('a bonus action imposing a condition print DOES field there is untouched', () => {
    const got = parseAuthorResponse(JSON.stringify({
      saves: [{ clause: 'holds', name: 'Quick Grapple', stat: 'Strength', target: 'one creature within 5 feet', condition: 'Grappled' }],
    }));
    expect(TURN_DENIAL).not.toContain(got.saves[0].condition);
  });
});

describe('R12 — a row states every number it promises (the critic, 2026-11-03)', () => {
  // The top Fix cause all week: four rows across one forty and the Pumpkin set promised
  // a quantity and never gave it. These are the real rows, verbatim from
  // sweep-2026-11-03T23-14-10 (#07 Hydra) and pumpkin-ten-2026-11-03T23-04-17 (#04, #07),
  // with the engine's tokens restored to their pre-fill form.
  //
  // A word list was refused as the implementation: two of the three rows DO carry a
  // number elsewhere ("10 (3d6) Fire damage"), so "does this row contain a number"
  // passes all three. The call counts what it promised; the engine counts what is
  // written. Counting is on EXPRESSIONS, not digits — "10 (3d6)" is one quantity.
  const trait = (t) => parseAuthorResponse(JSON.stringify({ traits: [{ clause: 'c', mechanics: 1, passive_effect: 'other', ...t }] }));

  it("refuses the Hydra's Knitting Flesh — temporary Hit Points with no amount", () => {
    const got = trait({ name: 'Knitting Flesh', quantities: 1, trigger: 'When the hydra takes Slashing or Piercing damage', effect: 'the hydra gains Temporary Hit Points as its flesh knits furiously shut' });
    expect(got.traits).toHaveLength(0);
    expect(got.refused[0].why).toMatch(/counts 1 number\(s\).*only 0 are written/);
  });

  it("refuses Ember Regrowth — 'extra Fire damage' with no amount, beside one that has it", () => {
    const got = trait({ name: 'Ember Regrowth', quantities: 2, trigger: 'While standing on soil at the start of its turn', effect: 'its vine attacks deal extra Fire damage, and a creature that starts its turn within reach takes {dmg} Fire damage' });
    expect(got.traits).toHaveLength(0);
    expect(got.refused[0].why).toMatch(/only 1 are written/);
  });

  it('refuses Cracked Candleflare — an Emanation with no size', () => {
    const got = parseAuthorResponse(JSON.stringify({ reactions: [{ clause: 'c', name: 'Cracked Candleflare', mechanics: 1, quantities: 3, trigger: 'When a creature within reach hits the pumpkin king with a melee attack', response: 'each creature in an Emanation originating from the pumpkin king makes a {dc} Dexterity Saving Throw, taking {dmg} Fire damage on a failure, and the flare is fiercer while Bloodied' }] }));
    expect(got.reactions).toHaveLength(0);
    expect(got.refused[0].why).toMatch(/counts 3 number\(s\).*only 2 are written/);
  });

  it('keeps a row that states every number it promised', () => {
    const got = trait({ name: 'Ember Coat', quantities: 1, trigger: 'At the start of each of its turns', effect: 'a creature within 5 feet takes {dmg} Fire damage' });
    expect(got.refused).toHaveLength(0);
    expect(got.traits).toHaveLength(1);
  });

  it('counts a filled damage expression as ONE quantity, not three numerals', () => {
    // "10 (3d6)" is 10, 3 and 6 to a digit scan; it is one number to a GM.
    const got = trait({ name: 'Filled', quantities: 1, trigger: 'At the start of each of its turns', effect: 'a creature within 5 feet takes 10 (3d6) Fire damage' });
    expect(got.traits).toHaveLength(1);
  });

  it('a missing count passes, as every other declared field does when absent', () => {
    const got = trait({ name: 'Old Shape', trigger: 'When hit', effect: 'the king gains Temporary Hit Points' });
    expect(got.traits).toHaveLength(1);
  });

  it('answering 0 on a row that needs no numbers passes', () => {
    const got = trait({ name: 'No Numbers', quantities: 0, trigger: null, effect: 'The king cannot have the Frightened condition' });
    expect(got.traits).toHaveLength(1);
  });
});

describe('R13 — a payoff gets its enabler at ship (the critic\'s effect-claim item)', () => {
  // Both authoring paths already refuse a row whose required condition nothing imposes
  // — and both check it when the row LANDS, while the budget settles afterwards. The
  // gate forty's Anvilcloud Drake proves the ordering bug: the action seat authored
  // "Anvil Breath" (a 60-foot Line that knocked Prone), the trait seat then authored
  // "Storm-Charge Corona" (requires Prone) and its check PASSED, and the free-row
  // budget then evicted Anvil Breath — so Corona shipped with nothing causing Prone.
  //
  // The enabler is a RIDER on an existing attack, so it costs no row slot and that
  // eviction cannot recur. Print chooses the host: of its 65 attack rows imposing
  // Grappled/Prone/Restrained, 62 are melee and 61 name a body part.
  const sheet = (need, hostName, holds) => ({
    sections: {
      Traits: [{ name: 'Payoff', requiresCondition: need, authored: true, text: `It exploits a ${need} target.` }],
      Actions: [
        { name: 'Multiattack', text: 'It makes two attacks.' },
        { name: hostName, text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.' },
      ],
    },
    scaled: { pb: 3, stats: { STR: 18 } }, cr: 7, generation: { holds },
  });
  const run = (need, host, holds) => {
    const m = sheet(need, host, holds);
    settleSheetBudgets({ ...m, trace: () => {} });
    return m.sections.Actions[1].text;
  };

  it("replays the Drake: Corona's Prone arrives on the Talons", () => {
    const m = {
      sections: {
        Traits: [{ name: 'Storm-Charge Corona', requiresCondition: 'Prone', authored: true, text: 'each creature within 10 feet that has the Prone condition takes 9 (2d8) Thunder damage.' }],
        Actions: [{ name: 'Multiattack', text: 'The drake makes two Talons attacks.' },
          { name: 'Talons', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.' }],
      },
      scaled: { pb: 3, stats: { STR: 18 } }, cr: 7, generation: { holds: null },
    };
    settleSheetBudgets({ ...m, trace: () => {} });
    expect(m.sections.Actions[1].text).toMatch(/has the Prone condition/);
    expect(m.sections.Actions[1].imposes).toBe('Prone');
  });

  it('a Grappled rider carries the size gate and the escape DC, as print does 27 of 27', () => {
    expect(run('Grappled', 'Tentacle', true)).toMatch(/If the target is a Large or smaller creature, it has the Grappled condition \(escape DC 15\)\./);
  });

  it('holds=false gives no grip — the route call decides, not a word list', () => {
    expect(run('Grappled', 'Tentacle', false)).not.toMatch(/Grappled/);
  });

  it('a sword cannot hold, but it can knock down — print splits these', () => {
    expect(run('Grappled', 'Greatsword', true)).not.toMatch(/Grappled/);   // 61 of 65 print hosts are body parts
    expect(run('Prone', 'Greatsword', true)).toMatch(/has the Prone condition/); // print's Battleaxe, Tree Club
  });

  it('a condition print never rides on an attack gets no rider', () => {
    // print: Stunned appears 0 times as an attack rider, matching the turn-denial findings
    expect(run('Stunned', 'Tentacle', true)).not.toMatch(/Stunned/);
  });

  it('does nothing when the condition already has a source', () => {
    const m = sheet('Prone', 'Claw', true);
    m.sections.Actions[1].text += ' If the target is a Large or smaller creature, it has the Prone condition.';
    const before = m.sections.Actions[1].text;
    settleSheetBudgets({ ...m, trace: () => {} });
    expect(m.sections.Actions[1].text).toBe(before);
  });

  it('does nothing to a row with no declared requirement', () => {
    const m = sheet('Prone', 'Claw', true);
    delete m.sections.Traits[0].requiresCondition;
    const before = m.sections.Actions[1].text;
    settleSheetBudgets({ ...m, trace: () => {} });
    expect(m.sections.Actions[1].text).toBe(before);
  });
});
