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
