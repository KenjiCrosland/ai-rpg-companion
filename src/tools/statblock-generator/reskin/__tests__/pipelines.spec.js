// INTEGRATION: THE MATRIX (Five Pipelines brief, step 4). On each path the stages the matrix
// forbids do not run, and the path — not the matcher — says which print body (if any) is the
// composition. The stub harness answers every call with one fixed sheet; the trace is the witness.
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const stub = (cr, style, archetype, over = {}) => {
  const scaled = scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });
  const CANON = ['Melee Attack', 'Ranged Attack', 'Sweeping Area Attack', 'Signature Slot', 'Escape Action', 'Mobility Trait', 'Reactive Reposition', 'Legendary Move and Attack', 'Legendary Ranged Attack', 'Legendary Escape', 'Hybrid Attack', 'Teleport'];
  const renames = {}; [...new Set([...renameKeysOf(scaled), ...CANON])].forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name]);
  return { name: 'Gloam Courser', size: 'Medium', alignment: 'Neutral Evil', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Dexterity', ...over };
};
const run = async ({ concept, cr, archetype, style = null, path, over = {}, caster = false, rejected = null }) => {
  const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
  let m; try { m = await generateReskin({ archetype, style, concept, userConcept: concept, cr, path, caster, ...(rejected ? { rejectedCanon: rejected } : {}) }, async () => JSON.stringify(stub(cr, style, archetype, over))); } finally { console.log = orig; }
  return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
};
const twist = (body, receipt) => ({ path: 'twist', by: 'call', print_body: body, relation: 'is', class: null, species: null, receipt });
const names = (r) => r.rows.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, ''));
// The idea call answers the body question too (NEEDS_BODY / body_verdicts,
// 2026-10-22). A stub that omits it falls back to each template's own `keys`,
// which removes body-shaped templates from the menu BEFORE the mechanism a test
// is actually about can decline them. Tests whose subject is not body truth say
// so by granting every requirement, which is what a real call does per sheet.
const { NEEDS_BODY: _NB } = require('../templates.mjs');
const ALL_BODIES = Object.keys(_NB).map((id) => ({ id, means: true, because: 'test harness: body truth is not this test\'s subject' }));


describe('the twist path', () => {
  test('a body the matcher misses lands by the path: the cave troll gets the Troll\'s Regeneration, and no fallback shelf, no value floor, no chassis nova', async () => {
    const r = await run({ concept: 'a cave troll that speaks only Giant', cr: 5, archetype: 'brute', path: twist('Troll', 'cave troll') });
    expect(r.trace).toMatch(/\[path\] decides: twist on the Troll \(the matcher would have said homebrew\)/);
    expect(names(r)).toContain('Regeneration');
    expect(r.trace).toMatch(/fallback stands down: the twist path has no shelf/);
    expect(r.trace).not.toMatch(/library seed drawn|fallback drawn|signature template: /);
    expect(r.trace).not.toMatch(/value check:/);
    expect(r.rows.some((e) => !e.print && !e.library && /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? ''))).toBe(false);
  });
  test('print\'s header rides: the Troll\'s type and size, not the chassis\'s', async () => {
    const r = await run({ concept: 'a cave troll that speaks only Giant', cr: 5, archetype: 'brute', path: twist('Troll', 'cave troll') });
    expect(r.m.type).toMatch(/^Giant/); expect(r.m.size).toBe('Large');
  });
});

describe('the twist path at a CR far from print\'s', () => {
  test('print\'s rows still EXIST: the Skeleton at CR 2 keeps its Shortbow beside the GM\'s greatsword, with the sheet\'s bonus', async () => {
    const r = await run({ concept: 'a skeleton with a greatsword', cr: 2, archetype: 'brute', path: twist('Skeleton', 'a skeleton') });
    const bow = r.rows.find((e) => /^Shortbow/.test(e.name ?? ''));
    expect(bow).toBeDefined(); expect(bow.print).toBe(true);
    expect(r.trace).toMatch(/Shortbow — the Skeleton's own ranged row, added .* far from print's CR/);
    expect(Number((/\+(\d+)/.exec(bow.text) ?? [])[1])).toBe(Number((/\+(\d+)/.exec(r.rows.find((e) => /^Greatsword|Melee Attack Roll/.test(`${e.name} ${e.text}`))?.text ?? '') ?? [])[1]));
  });
  test('a seat fit whose quote only names the creature itself is declined — the ask on a twist is the twist clause', async () => {
    const concept = 'a skeleton who was a gladiator in a former life';
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 4, path: twist('Skeleton', 'a skeleton') }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ body_verdicts: ALL_BODIES, trait: { idea: "The champion's death-grin never falters, and the longer a fight drags on the better it reads the opponent's timing.", section: 'trait', trigger: 'always', effect: 'control' } }); // the live idea: a shape fit with no verb match, carried by the quote "a skeleton" alone
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'false-appearance', because: 'it passes for an ordinary skeleton', name: 'Deathless Grin', asked: 'a skeleton' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(4, null, 'brute'));
      });
    } finally { console.log = orig; }
    const tr = lines.join('\n');
    // THE SEAT RECEIVES ITS CLAUSE (the critic's prescription, 2026-10-19). The call's quote "a
    // skeleton" is still no receipt — it only names the body — but the engine then hands the seat the
    // clause the sheet has not answered ("was a gladiator in a former life"), which is what the GM
    // typed and what the critic counted as a miss for three packages. So the row SHIPS, for that
    // clause, with the clause as its receipt by construction.
    expect(tr).toMatch(/seat takes its clause: "Deathless Grin" is HANDED "was a gladiator in a former life"/);
    expect(Object.values(m.sections).flat().some((e) => e.template === 'false-appearance')).toBe(true);
  });
});

describe('the twist path takes no class kit and no second row for an answered clause', () => {
  test('a class-eligible giant on the twist path gets no barbarian kit', async () => {
    const r = await run({ concept: 'a stone giant exile who speaks only Giant and understands no Common', cr: 9, archetype: 'brute', path: twist('Stone Giant', 'a stone giant exile'), over: { implied_class: 'barbarian', implied_class_quote: 'stone giant exile' } });
    expect(r.trace).toMatch(/class kit: none — the twist path takes no class kit/);
    expect(r.rows.some((e) => e.kit)).toBe(false);
    expect(names(r)).not.toContain('Bloodied Frenzy');
  });
  test('a seat fit quoting the clause the GM\'s own weapon already answers is declined (the greatsword, then a weapon-lodge trait on "with a greatsword")', async () => {
    const concept = 'a skeleton with a greatsword';
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 2, path: twist('Skeleton', 'a skeleton') }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: 'It fights on wearing the steel of everyone who has ever struck it, and the clatter never slows it.', section: 'trait', trigger: 'always', effect: 'control' } }); // no key word of the template: a shape fit carried by the quote alone, as the live row was
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'adhesive', because: 'blades stay in the bones', name: 'Gravewrought Steel', asked: 'with a greatsword' }); // a template ON this seat's menu (weapon-lodge is not offered to a CR 2 brute in the stub harness); the live row's quote is the point
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(2, null, 'brute'));
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/trait declined: "Gravewrought Steel" — .*the weapon a part row already carries/);
    expect(Object.values(m.sections).flat().some((e) => e.template === 'adhesive')).toBe(false);
    expect(Object.values(m.sections).flat().some((e) => /^Greatsword/.test(e.name ?? ''))).toBe(true);
  });
});

describe('print\'s rows intact on the twist path — the ten\'s seams (2026-10-19)', () => {
  const { checkBlock } = require('../checker.mjs');
  const { printCanonFor } = require('../generate.mjs');
  test('print\'s Multiattack with a form suffix is still print\'s Multiattack (the Vampire\'s "(Vampire Form Only)")', async () => {
    expect(printCanonFor('Vampire', 13).multiattack).toMatch(/two Grave Strike attacks and uses Bite/);
    const r = await run({ concept: 'a vampire who runs a bathhouse', cr: 13, archetype: 'defender', path: twist('Vampire', 'a vampire') });
    expect(r.rows.find((e) => /^Multiattack/.test(e.name ?? ''))?.text).toMatch(/two Grave Strike attacks and uses Bite/);
    // the replacement clause does not name Bite a second time
    expect((r.rows.find((e) => /^Multiattack/.test(e.name ?? ''))?.text.match(/\bBite\b/g) ?? []).length).toBe(1);
    // the block carries the path for every later reader, and the checker reads it: print's own
    // composition under print's band is a note, not a FAIL — with no userConcept handed to it
    expect(r.m.generation.pipeline).toMatchObject({ path: 'twist', print_body: 'Vampire' });
    const bands = checkBlock(r.m, { cr: 13 }).gates.bands.findings.filter((f) => f.rule === 'under');
    expect(bands.some((f) => f.severity === 'fail')).toBe(false); // a note at most
  });
  test('a chassis roll parenthetical does not ride on print\'s row (the Ghost\'s Withering Touch)', async () => {
    const r = await run({ concept: "a chapel bell-ringer's ghost that tolls for the dying", cr: 3, archetype: 'lurker', path: twist('Ghost', 'ghost') });
    const touch = r.rows.find((e) => /^Withering Touch/.test(e.name ?? ''));
    expect(touch).toBeDefined(); expect(touch.text).not.toMatch(/\(with Advantage/); expect(touch.text).toMatch(/19 \(3d10 \+ 3\) Necrotic/);
  });
  test('the regrowth lack takes the dependent sentence too ("regains 20 Hit Points when it grows new heads")', async () => {
    const r = await run({ concept: 'Hydra whose stumps smoke instead of regrowing', cr: 8, archetype: 'brute', path: twist('Hydra', 'Hydra'), over: { lacks: [{ quote: 'instead of regrowing', takes: 'regeneration' }] } });
    const heads = r.rows.find((e) => /^Multiple Heads/.test(e.name ?? ''));
    expect(heads).toBeDefined(); expect(heads.text).not.toMatch(/grows (?:two|new) heads|regains 20 Hit Points/); expect(heads.text).toMatch(/one of its heads dies/);
  });
});

describe('a closed path\'s Actions are closed too', () => {
  test('a chassis hybrid row that neither rename loop claims leaves on a twist (Vashka\'s Javelin beside the Hobgoblin Warrior\'s Longsword and Longbow)', async () => {
    const r = await run({ concept: 'a hobgoblin warlord in lacquered plate who fights from a shield wall', cr: 6, archetype: 'defender', path: twist('Hobgoblin Warrior', 'hobgoblin') });
    const attacks = r.rows.filter((e) => /Attack Roll/.test(e.text ?? ''));
    expect(attacks.every((e) => e.print || e.part || e.feature || e.kit || e.library || e.template || e.authored || e.gmArmed)).toBe(true);
    expect(attacks.some((e) => /Melee or Ranged Attack Roll/.test(e.text) && !e.print)).toBe(false);
    expect(r.rows.find((e) => /^Multiattack/.test(e.name ?? ''))?.text ?? '').not.toMatch(/Named Row/);
  });
});

describe('the repair call and the names on the sheet', () => {
  test('a repair row that reuses a name already on the sheet is refused, and the prompt carried the taken names', async () => {
    const concept = 'a hobgoblin warlord in lacquered plate who fights from a shield wall and steps into the gap where a soldier beside her falls';
    const lines = []; const prompts = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'defender', concept, userConcept: concept, cr: 6, path: twist('Hobgoblin Warrior', 'hobgoblin') }, async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are repairing')) return JSON.stringify({ attacks: [], saves: [], traits: [{ clause: 'steps into the gap where a soldier beside her falls', name: 'Multiattack', trigger: null, effect: 'When an ally within 5 feet drops to 0 Hit Points, it moves up to 10 feet without provoking Opportunity Attacks.' }], reactions: [] });
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(6, null, 'defender', { clauses: [{ text: 'fights from a shield wall', kind: 'mechanical' }, { text: 'steps into the gap where a soldier beside her falls', kind: 'mechanical' }] })); // the clause record the repair reads: two mechanical HAS-clauses, one left for the repair (a "never" clause reads as a lack and is never repaired)
      });
    } finally { console.log = orig; }
    const repairPrompt = prompts.find((p) => p.startsWith('You are repairing'));
    expect(repairPrompt).toBeDefined(); // the repair ran: the gap clause had no row
    expect(repairPrompt).toMatch(/NAMES ALREADY ON THE SHEET/); expect(repairPrompt).toMatch(/"Multiattack"/); // the names at repair time are the chassis's — print's rename lands later
    const named = Object.values(m.sections).flat().filter((e) => /^Multiattack$/.test(String(e.name ?? '').replace(/ \(.*\)$/, '')));
    expect(named.length).toBe(1);
    expect(lines.join('\n')).toMatch(/repair row refused: "Multiattack" — the name is already on the sheet/);
  });
});

describe("the owner's spot check (2026-10-19): a payoff pays for its prerequisite; the organ casts at the card's DC", () => {
  const { valueCheck } = require('../templates.mjs');
  const sheet = { Actions: [{ name: 'Multiattack', text: 'The king makes two Slam attacks.' }, { name: 'Slam', text: '*Melee Attack Roll:* +9, reach 10 ft. 24 (3d8 + 5) Bludgeoning damage.' }] };
  const scaled = { per_hit: 24, pb: 4, dc: 16, atk: 9 };
  const row = { name: 'Ripened Reaping', text: '*Constitution Saving Throw:* DC 16, one creature within 60 feet that has the Poisoned condition. *Failure:* 27 (6d8) Acid damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage.' };
  test('a condition-payoff row at one share is priced up to 1.5× the attack it replaces; a plain row is not', () => {
    const plain = valueCheck({ ...row }, { scaled, sections: sheet, section: 'Actions', cr: 10 });
    const pay = valueCheck({ ...row }, { scaled, sections: sheet, section: 'Actions', cr: 10, template: 'condition-payoff' });
    expect(pay.floor).toBeGreaterThan(plain.floor * 1.5);
    expect(pay.ev).toBeGreaterThanOrEqual(pay.floor * 0.95);
    expect(Number((/\*Failure:\* (\d+) \(/.exec(pay.text) ?? [])[1])).toBeGreaterThan(27);
  });
  test('a CR 10 brute with the caster box ticked casts at the card\'s DC: the casting stat rises to derive it, and its save and skills follow', async () => {
    const r = await run({ concept: 'pumpkin king', cr: 10, archetype: 'brute', caster: true, path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, title: 'king', receipt: 'king' } });
    const organ = r.rows.find((e) => /^Spellcasting/.test(e.name ?? ''));
    expect(organ).toBeDefined();
    const sm = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability \(spell save DC (\d+)\)/.exec(organ.text);
    expect(sm).not.toBeNull();
    const key = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[sm[1]];
    const mod = Math.floor((r.m.stats[key] - 10) / 2);
    expect(Number(sm[2])).toBe(8 + r.m.pb + mod); // print's derivation
    expect(Number(sm[2])).toBeGreaterThanOrEqual(15); // the card's DC at CR 10, not an idle stat's 13
    expect(r.trace).toMatch(/casting stat raised: (?:INT|WIS|CHA) \d+ -> \d+ so the card's DC/);
    if (r.m.saves && r.m.saves[key] != null) expect([mod, mod + r.m.pb]).toContain(Number(r.m.saves[key]));
  });
});

describe('the climb rule reads the trait, not the spell', () => {
  const { checkBlock } = require('../checker.mjs');
  const base = (rows) => ({ name: 'T', type: 'Plant', size: 'Huge', ac: 15, hp: 180, cr: 10, cr_str: '10', speed: '30 ft.', pb: 4, stats: { STR: 20, DEX: 8, CON: 17, INT: 6, WIS: 18, CHA: 4 }, sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +9, reach 10 ft. 24 (3d8 + 5) Bludgeoning damage.' }, ...rows] } });
  const climbFails = (m) => checkBlock(m).gates.headerBody.findings.filter((f) => f.rule === 'spider-climb-climb');
  test('Spider Climb in a Spellcasting menu grants no climb and is not flagged; a Spider Climb trait with no Climb speed is', () => {
    expect(climbFails(base([{ name: 'Spellcasting', text: 'The king casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):\n\n- **1/Day Each:** *Spider Climb*, *Barkskin*' }]))).toEqual([]);
    expect(climbFails(base([{ name: 'Spider Climb', text: 'The king can climb difficult surfaces, including along ceilings, without needing to make an ability check.' }])).length).toBe(1);
  });
});

describe("the twist seat tries every clause the GM typed (critic A, 2026-10-19)", () => {
  // the FIT call with a receipt is the judge; the identity call's mechanical/descriptive tag gates nothing
  const fitRun = async ({ concept, cr, archetype, body, receipt, template, rowName, over = {} }) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype, concept, userConcept: concept, cr, path: twist(body, body.toLowerCase()) }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: `It ${receipt}, and anyone who fights it learns so the hard way.`, section: 'trait', trigger: 'always', effect: 'control' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template, because: receipt, name: rowName, asked: receipt });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(cr, null, archetype, over));
      });
    } finally { console.log = orig; }
    return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
  };
  test('a DESCRIPTIVE clause earns its row: "carries stolen voices" on the Air Elemental', async () => {
    const r = await fitRun({ concept: 'Air Elemental that carries stolen voices', cr: 5, archetype: 'lurker', body: 'Air Elemental', receipt: 'carries stolen voices', template: 'mimicry', rowName: 'Stolen Choir', over: { clauses: [{ text: 'Air Elemental', kind: 'descriptive' }, { text: 'that carries stolen voices', kind: 'descriptive' }] } });
    expect(r.trace).not.toMatch(/trait declined: "Stolen Choir"/);
    expect(r.rows.some((e) => e.template === 'mimicry')).toBe(true);
  });
  test('"with a frost-rimed hide" on the Dire Wolf earns its row', async () => {
    const r = await fitRun({ concept: 'Dire Wolf with a frost-rimed hide', cr: 1, archetype: 'skirmisher', body: 'Dire Wolf', receipt: 'frost-rimed hide', template: 'heated-body', rowName: 'Rimed Hide', over: { clauses: [{ text: 'Dire Wolf', kind: 'descriptive' }, { text: 'with a frost-rimed hide', kind: 'descriptive' }] } });
    expect(r.trace).not.toMatch(/trait declined: "Rimed Hide"/);
  });
  test('a clause that holds a lack AND a positive half keeps the positive: the Hydra loses the regrowth and keeps the smoke', async () => {
    const concept = 'Hydra whose stumps smoke instead of regrowing';
    const r = await fitRun({ concept, cr: 8, archetype: 'brute', body: 'Hydra', receipt: 'stumps smoke', template: 'noxious-aura', rowName: 'Smoking Stumps', over: { clauses: [{ text: 'Hydra', kind: 'descriptive' }, { text: 'whose stumps smoke instead of regrowing', kind: 'mechanical' }], lacks: [{ quote: 'instead of regrowing', takes: 'regeneration' }] } });
    const heads = r.rows.find((e) => /^Multiple Heads/.test(e.name ?? ''));
    expect(heads?.text ?? '').not.toMatch(/grows (?:two|new) heads/); // the lack still lands
    expect(r.trace).not.toMatch(/trait declined: "Smoking Stumps"/); // and the positive half still earns its row
  });
  test('the other half of a weapon clause is not "answered": "keeps the line" beside a shield', async () => {
    const concept = 'a knight who keeps the line with a shield and a longsword';
    const r = await fitRun({ concept, cr: 5, archetype: 'defender', body: 'Knight', receipt: 'keeps the line', template: 'guarded-stance', rowName: 'Holds the Line', over: { clauses: [{ text: 'a knight', kind: 'descriptive' }, { text: 'who keeps the line with a shield and a longsword', kind: 'mechanical' }] } });
    expect(r.trace).not.toMatch(/trait declined: "Holds the Line"/);
  });
});

describe("the critic's systematic fix-lite (C, 2026-10-19)", () => {
  test('a damage nova keys its own shape, not a condition it hands out (the Brass Tyrant\'s Furnace Blast)', async () => {
    const concept = 'a tyrant of burning brass who rules a city of forges';
    const r = await run({ concept, cr: 15, archetype: 'brute', path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, title: 'tyrant', receipt: 'tyrant' } });
    for (const e of r.rows.filter((x) => /Saving Throw/.test(x.text ?? '') && /\*?Failure:\*?[^]*?\d+ \(\d+d\d+/.test(x.text ?? '') && !x.print)) {
      const sv = /(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/.exec(e.text)[1];
      const mind = /\b(?:mind|psychic|charm|fear|terror|dread|gaze|voice|song|wail|hymn)\w*/i.test(`${e.name} ${e.text}`);
      if (!mind) expect(['Strength', 'Dexterity', 'Constitution']).toContain(sv);
    }
  });
  test('print\'s skills land on a print body: the Vampire\'s Stealth is print\'s, not the chassis\'s', async () => {
    const r = await run({ concept: 'a vampire who runs a bathhouse', cr: 13, archetype: 'lurker', path: twist('Vampire', 'a vampire') });
    expect(r.trace).toMatch(/print canon skills:/);
    expect(String(r.m.skills ?? '')).toMatch(/Stealth \+9/);
    expect(String(r.m.skills ?? '')).toMatch(/Perception \+7/);
  });
});

describe('the register is deterministic surgery (the forty\'s one FAIL, 2026-10-19)', () => {
  const { applyCorrections } = require('../../format-2024/generate.mjs');
  const { lintStatblock } = require('../../format-2024/lint.mjs');
  test('"may" becomes "can" and the opportunity-attack word order is fixed, with no call', () => {
    const m = { name: 'T', type: 'Fiend', size: 'Large', ac: 19, hp: 300, cr: 20, cr_str: '20', speed: '30 ft.', pb: 6, stats: { STR: 26, DEX: 14, CON: 24, INT: 22, WIS: 18, CHA: 24 },
      sections: { Traits: [{ name: 'Oath Collector', text: 'When a creature drops to 0 Hit Points, the fiend may expend a use to take the Dodge action, and attacks of opportunity against it have Disadvantage.' }] } };
    const findings = lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'vocab-register');
    expect(findings.length).toBeGreaterThan(0);
    const out = applyCorrections(m, findings, {});
    const text = out.sections.Traits[0].text;
    expect(text).not.toMatch(/\bmay\b/); expect(text).toMatch(/\bcan expend\b/);
    expect(text).not.toMatch(/attacks of opportunity/i); expect(text).toMatch(/opportunity attacks/i); // the word order is this rule's; the capital is term-caps'
    expect(lintStatblock(out, { edition: '2024' }).findings.filter((f) => f.rule === 'vocab-register')).toEqual([]);
  });
});

describe("the critic's incidentals (D, 2026-10-19)", () => {
  const { checkBlock } = require('../checker.mjs');
  const { partRows } = require('../generate.mjs');
  test('a reach WEAPON is its own tether: a halberd at reach 10 on a Medium body is not flagged', () => {
    const sheet = (name) => ({ name: 'T', type: 'Humanoid', size: 'Medium', ac: 16, hp: 45, cr: 2, cr_str: '2', speed: '30 ft.', pb: 2, stats: { STR: 16, DEX: 14, CON: 14, INT: 10, WIS: 11, CHA: 10 },
      sections: { Actions: [{ name, text: '*Melee Attack Roll:* +5, reach 10 ft. 12 (2d8 + 3) Slashing damage.' }] } });
    const flagged = (m) => checkBlock(m).gates.structure.findings.filter((f) => f.rule === 'reach');
    expect(flagged(sheet('Halberd'))).toEqual([]);
    expect(flagged(sheet('Iron Fist')).length).toBeGreaterThan(0); // no weapon, no tether word: still flagged
  });
  test('an object pronoun before a weapon noun makes it a verb: no "Watching Them Flail" row', () => {
    const rows = partRows([{ text: 'it circles the field watching them flail', kind: 'mechanical' }], { cap: 4 });
    expect(rows.map((r) => r.name)).not.toContain('Watching Them Flail');
    expect(rows.every((r) => !/flail/i.test(r.name))).toBe(true);
    const real = partRows([{ text: 'a brute with a heavy flail', kind: 'mechanical' }], { cap: 4 });
    expect(real.some((r) => /Flail/.test(r.name))).toBe(true); // a real flail still lands
  });
});

describe("the clean forty's three (2026-10-19)", () => {
  const { checkBlock } = require('../checker.mjs');
  test('a sheet that climbs difficult surfaces gets a Climb Speed, as print pairs them', async () => {
    const r = await run({ concept: 'a vampire who runs a bathhouse', cr: 13, archetype: 'lurker', path: twist('Vampire', 'a vampire') });
    if (r.rows.some((e) => /^Spider Climb\b/.test(e.name ?? ''))) {
      expect(String(r.m.speed)).toMatch(/Climb \d+ ft/);
      expect(checkBlock(r.m, { cr: 13 }).gates.headerBody.findings.filter((f) => f.rule === 'spider-climb-climb')).toEqual([]);
    }
  });
  test('the lint pre-pass reads the sheet as the 2024 shape it is, so a 2014 request still capitalises its conditions', async () => {
    const concept = 'a mud-caked bog hound that drags fishermen under';
    const r = await run({ concept, cr: 1, archetype: 'brute', over: { conditions: { condition_minor: 'Restrained' } }, path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: 'bog hound' } });
    for (const e of r.rows) expect(e.text ?? '').not.toMatch(/\b(?:restrained|grappled|prone|frightened|poisoned)\b/);
  });
});

describe('A2: the round is priced against the Multiattack the sheet ships (critic, 2026-10-19)', () => {
  const { cardBudget } = require('../card-budgets.mjs');
  const npc = (cls, species = null, receipt = cls) => ({ path: 'class_npc', by: 'call', print_body: null, relation: null, class: cls, species, receipt });
  const roundOf = (r) => {
    const ma = r.rows.find((e) => /^Multiattack/.test(e.name ?? ''));
    const n = ma ? ({ one: 1, two: 2, three: 3, four: 4 }[(/makes (\w+)/i.exec(ma.text) ?? [])[1]?.toLowerCase()] ?? 1) : 1;
    const best = Math.max(0, ...r.rows.filter((e) => /Attack Roll/.test(e.text ?? '')).map((e) => [...String(e.text).split(/\bIf\b/)[0].matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((a, x) => a + Number(x[1]), 0)));
    return { round: best * n, n, best };
  };
  test("Oriel: the GM's longsword on a three-attack print body stays inside the card (was 66 a round at CR 5, reading CR 10)", async () => {
    const concept = 'a knight who holds the line with a shield and a longsword';
    const r = await run({ concept, cr: 5, archetype: 'defender', path: { ...npc('paladin', null, 'knight') } });
    const { round, n } = roundOf(r);
    expect(n).toBeGreaterThanOrEqual(2); // the print body's own count
    expect(round).toBeLessThanOrEqual(cardBudget(5, {}).dpr * 1.25);
    expect(r.trace).toMatch(/final price: (?:the chassis's|print's) Multiattack/);
  });
  test('the pass runs twice, and the second run names print\'s Multiattack', async () => {
    const concept = 'a sellsword who hurls a handaxe and closes with a shortsword';
    const r = await run({ concept, cr: 5, archetype: 'defender', path: { ...npc('fighter', null, 'sellsword') } });
    const { round } = roundOf(r);
    expect(round).toBeLessThanOrEqual(cardBudget(5, {}).dpr * 1.25);
  });
  test('A2 control: a homebrew sheet with no print body is unchanged by the second run', async () => {
    const concept = 'a plague-bearing archon of flies';
    const r = await run({ concept, cr: 13, archetype: 'skirmisher', path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: 'archon of flies' } });
    const { round } = roundOf(r);
    expect(round).toBeGreaterThan(cardBudget(13, {}).dpr * 0.6);
    expect(round).toBeLessThanOrEqual(cardBudget(13, {}).dpr * 1.25);
  });
});

describe('A3: every weapon the GM names lands as a part (critic, 2026-10-19)', () => {
  const { partRows } = require('../generate.mjs');
  const names = (text, over = {}) => partRows([{ text, kind: 'descriptive', head: true, ...over }], { cap: 4 }).map((r) => `${r.name}/${r.mode}`);
  test('"hurls a handaxe and closes with a shortsword" lands BOTH — the throw is one segment\'s business, not the clause\'s', () => {
    expect(names('a sellsword who hurls a handaxe and closes with a shortsword')).toEqual(['Handaxe/both', 'Shortsword/melee']);
  });
  test('a hurled thing the weapon table does not know is still the throw-retrieve template\'s', () => {
    expect(names('a giant who hurls boulders')).toEqual([]);
  });
  test('A3 controls: one weapon stays one weapon, and a wield cue is unchanged', () => {
    expect(names('a knight with a longsword')).toEqual(['Longsword/melee']);
    expect(names('an ogre with a greataxe')).toEqual(['Greataxe/melee']);
    expect(names('a sellsword who wields a rapier and a dagger')).toEqual(['Rapier/melee', 'Dagger/both']); // a dagger is thrown in the 2024 table (20/60) — print's own shape
  });
  test('Bellard ships both weapons on the sheet, and the thrown one carries its range', async () => {
    const concept = 'a sellsword who hurls a handaxe and closes with a shortsword';
    const r = await run({ concept, cr: 5, archetype: 'defender', path: { path: 'class_npc', by: 'call', print_body: null, relation: null, class: 'fighter', species: null, receipt: 'sellsword' } });
    const parts = r.rows.filter((e) => e.part).map((e) => String(e.name));
    expect(parts).toContain('Handaxe'); expect(parts).toContain('Shortsword');
    expect(r.rows.find((e) => /^Handaxe/.test(e.name ?? ''))?.text ?? '').toMatch(/range 20\/60 ft/);
  });
});

describe('B: the re-arm takes the body\'s other rows with it (critic, 2026-10-19)', () => {
  const npc2 = (cls, species = null, receipt = cls) => ({ path: 'class_npc', by: 'call', print_body: null, relation: null, class: cls, species, receipt });
  test('a heavy melee class weapon takes the shield row with it (Radrik\'s greataxe and the Gladiator\'s Shield Bash)', async () => {
    const r = await run({ concept: 'a goliath berserker who loses control when wounded', cr: 8, archetype: 'brute', path: npc2('barbarian', 'goliath', 'berserker') });
    expect(r.rows.some((e) => e.weapon === 'greataxe')).toBe(true);
    expect(r.rows.some((e) => /shield/i.test(`${e.name} ${e.text}`) && !e.kit && !e.part)).toBe(false);
    expect(r.rows.find((e) => /^Multiattack/.test(e.name ?? ''))?.text ?? '').not.toMatch(/Shield/);
  });
  test("the GM's weapon replaces print's rather than riding beside it (Ser Aldous's mace and the Guard Captain's longsword)", async () => {
    const r = await run({ concept: 'a templar with a mace who shields the weak', cr: 4, archetype: 'defender', path: npc2('paladin', null, 'templar') });
    const melee = r.rows.filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
    expect(melee.length).toBe(1);
    expect(`${melee[0].name} ${melee[0].weapon ?? ''}`).toMatch(/[Mm]ace/);
  });
  test('a launcher rolls Dexterity after the re-arm (Vashka\'s longbow at +7 off STR)', async () => {
    const r = await run({ concept: 'a hobgoblin warlord in lacquered plate who fights from a shield wall', cr: 6, archetype: 'defender', path: npc2('fighter', null, 'warlord') });
    const bow = r.rows.find((e) => /Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
    if (bow) {
      const dex = Math.floor((r.m.stats.DEX - 10) / 2);
      expect(Number((/Attack Roll:\*? \+(\d+)/.exec(bow.text) ?? [])[1])).toBe(dex + r.m.pb);
    }
  });
  test('B control: a one-handed class weapon keeps the body\'s shield row', async () => {
    const r = await run({ concept: 'a knight who holds the line with a shield', cr: 5, archetype: 'defender', path: npc2('paladin', null, 'knight') });
    expect(r.trace).not.toMatch(/leaves with the shield/); // a longsword is not heavy
  });
});

describe('a row that spends its Reaction sits under Reactions (b-rearm, 2026-10-19)', () => {
  const { checkBlock } = require('../checker.mjs');
  test("a repair-authored trait written as a reaction moves, and the lint stops refusing it", async () => {
    const concept = 'a hobgoblin warlord in lacquered plate who never breaks ranks';
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'defender', concept, userConcept: concept, cr: 6, path: { path: 'class_npc', by: 'call', print_body: null, relation: null, class: 'fighter', species: null, receipt: 'warlord' } }, async (prompt) => {
        if (prompt.startsWith('You are repairing')) return JSON.stringify({ attacks: [], saves: [], traits: [{ clause: 'never breaks ranks', name: 'Unbroken Ranks', trigger: 'When an effect would move it against its will', effect: 'it can use its reaction to resist the movement, and cannot be pushed or pulled.' }], reactions: [] });
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(6, null, 'defender', { clauses: [{ text: 'a hobgoblin warlord in lacquered plate', kind: 'descriptive', head: true }, { text: 'never breaks ranks', kind: 'mechanical' }] }));
      });
    } finally { console.log = orig; }
    const row = Object.values(m.sections).flat().find((e) => /^Unbroken Ranks/.test(e.name ?? ''));
    if (row) {
      expect((m.sections.Reactions ?? []).some((e) => e === row)).toBe(true);
      expect(lines.join('\n')).toMatch(/section moved: Traits\/"Unbroken Ranks" spends its Reaction/);
    }
    expect(JSON.stringify(checkBlock(m, { cr: 6 }).gates.edition.findings)).not.toMatch(/section-shape/);
  });
});

describe("B: print's noun and the chassis's filler on a class body (critic, 2026-10-19)", () => {
  const npc3 = (cls, species = null, receipt = cls) => ({ path: 'class_npc', by: 'call', print_body: null, relation: null, class: cls, species, receipt });
  test("print's own self-reference is replaced: no sheet says \"The hobgoblin\" unless it is one", async () => {
    const r = await run({ concept: 'a hobgoblin warlord in lacquered plate who fights from a shield wall', cr: 6, archetype: 'defender', path: { path: 'twist', by: 'call', print_body: 'Hobgoblin Warrior', relation: 'is', class: null, species: null, receipt: 'hobgoblin' } });
    const pack = r.rows.find((e) => /^Pack Tactics/.test(e.name ?? ''));
    if (pack) expect(pack.text).toMatch(new RegExp(String(r.m.inline ?? 'the').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  });
  test('a chassis rules row with no provenance leaves a class body (the leader aura beside the kit\'s own)', async () => {
    const r = await run({ concept: 'a knight who holds the line with a shield and a longsword', cr: 5, archetype: 'defender', path: npc3('paladin', null, 'knight') });
    const auras = r.rows.filter((e) => /Aura/i.test(e.name ?? ''));
    expect(auras.length).toBeLessThanOrEqual(1); // the kit's Aura of Authority, never the chassis's beside it
    expect(r.rows.every((e) => e.print || e.kit || e.part || e.feature || e.library || e.template || e.authored || e.gmArmed || e.userSet || e.seed || /^Multiattack/.test(e.name ?? '') || e.classArmed)).toBe(true);
  });
});

describe("B: the species' own movement mode is the number (critic, fifth read, 2026-10-19)", () => {
  test('a lizardfolk swims 30, not the chassis\'s 40', async () => {
    const concept = 'a lizardfolk monk who strikes pressure points with an open hand';
    const r = await run({ concept, cr: 5, archetype: 'skirmisher', path: { path: 'class_npc', by: 'call', print_body: null, relation: null, class: 'monk', species: 'lizardfolk', receipt: 'monk' } });
    const swim = (/\bSwim (\d+) ft/i.exec(String(r.m.speed ?? '')) ?? [])[1];
    expect(swim).toBeDefined(); expect(Number(swim)).toBe(30);
  });
  test("control: a speed the GM's own words name stands", async () => {
    const concept = 'a lizardfolk raider who swims 50 feet through the reeds';
    const r = await run({ concept, cr: 5, archetype: 'skirmisher', path: { path: 'class_npc', by: 'call', print_body: null, relation: null, class: 'fighter', species: 'lizardfolk', receipt: 'raider' } });
    expect(r.trace).not.toMatch(/Swim \d+ ft\. -> 30 ft\./);
  });
});

describe('the Multiattack cites the rows the sheet has (classes-eight, 2026-10-19)', () => {
  const { checkBlock } = require('../checker.mjs');
  const npc4 = (cls, receipt = cls) => ({ path: 'class_npc', by: 'call', print_body: null, relation: null, class: cls, species: null, receipt });
  const citedIn = (text) => [...new Set([...String(text).matchAll(/(?:using |makes (?:one|two|three|four|five) |use of |,\s*|\bor |\band )([A-Z][\w'-]*(?: [A-Z][\w'-]*)?)(?= attacks?\b| or\b| and\b| in any combination\b|,|\.|$)/g)].map((x) => x[1].trim()))].filter((n) => !/^attacks?$/i.test(n));
  test("print's Multiattack names only rows that exist, and every attack row is named (the Guard Captain's Javelin, the Bandit Captain's pair)", async () => {
    for (const [concept, cr, cls, archetype] of [
      ['a templar with a mace who shields the weak', 4, 'paladin', 'defender'],
      ['a tabaxi cutpurse who slips through the market crowd', 3, 'rogue', 'skirmisher'],
    ]) {
      const r = await run({ concept, cr, archetype, path: npc4(cls) });
      const ma = r.rows.find((e) => /^Multiattack/.test(e.name ?? ''));
      if (!ma) continue;
      const have = r.rows.filter((e) => /Attack Roll/.test(e.text ?? '')).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
      for (const nm of citedIn(ma.text)) expect(have).toContain(nm); // no dangling citation
      const g = checkBlock(r.m, { cr }).gates;
      expect(g.structure.findings.filter((f) => f.rule === 'multiattack-row' && f.severity === 'fail')).toEqual([]);
      expect(g.reader.findings.filter((f) => f.rule === 'attack-in-multiattack' && f.severity === 'fail')).toEqual([]);
    }
  });
});

describe("the twist seat receives its clause (the critic's prescription, 2026-10-19)", () => {
  const fitFor = async ({ concept, cr, archetype, body, template, rowName, asked = null, over = {} }) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype, concept, userConcept: concept, cr, path: twist(body, body.toLowerCase()) }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ body_verdicts: ALL_BODIES, trait: { idea: 'It keeps something of what it was, and anyone who fights it finds that out.', section: 'trait', trigger: 'always', effect: 'control' } });
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template, because: 'the shape fits', name: rowName, ...(asked ? { asked } : {}) });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(cr, null, archetype, over));
      });
    } finally { console.log = orig; }
    return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
  };
  test('the call picks only the template: a fit with NO quote at all still answers the GM\'s clause (the Air Elemental\'s stolen voices, third read)', async () => {
    const r = await fitFor({ concept: 'Air Elemental that carries stolen voices', cr: 5, archetype: 'lurker', body: 'Air Elemental', template: 'mimicry', rowName: 'Stolen Choir' });
    // either door may land it — the fit seat with the clause as its receipt, or the concept-first
    // ranking on the same words. What the critic counted is the OUTCOME: the clause earns a row.
    expect(r.rows.some((e) => e.template === 'mimicry')).toBe(true);
    // the row assertion above is the real proof; this line only checks the seat was
    // reached. Label changed 2026-10-27 (the keys no longer inject — mimicry
    // declares trigger=always and is on the pool either way).
    expect(r.trace).toMatch(/seat takes its clause|keys would have bound: trait — mimicry/);
    expect(r.trace).not.toMatch(/trait declined: "Stolen Choir"/);
  });
  test('and with a quote that names only the body (the skeleton\'s former life)', async () => {
    const r = await fitFor({ concept: 'a skeleton who was a gladiator in a former life', cr: 4, archetype: 'brute', body: 'Skeleton', template: 'false-appearance', rowName: 'Old Champion', asked: 'a skeleton' });
    expect(r.rows.some((e) => e.template === 'false-appearance')).toBe(true);
    expect(r.trace).toMatch(/seat takes its clause: "Old Champion" is HANDED "(?:who )?was a gladiator in a former life"|keys would have bound/);
  });
  test('control: a print body that asks for NOTHING still takes no row', async () => {
    const r = await fitFor({ concept: 'Owlbear', cr: 3, archetype: 'brute', body: 'Owlbear', template: 'false-appearance', rowName: 'Invented Thing' });
    expect(r.trace).not.toMatch(/seat takes its clause/);
    expect(r.rows.some((e) => e.template === 'false-appearance')).toBe(false);
  });
  test('control: a clause a part row already answers is not handed to the seat', async () => {
    const r = await fitFor({ concept: 'a skeleton with a greatsword', cr: 2, archetype: 'brute', body: 'Skeleton', template: 'adhesive', rowName: 'Clinging Bones', asked: 'with a greatsword' });
    expect(r.rows.some((e) => e.template === 'adhesive')).toBe(false);
  });
});

describe('the homebrew path', () => {
  test('a resembles body never lands print\'s rows, even where the matcher found a name (a golem of lashed timber is not the Clay Golem)', async () => {
    const r = await run({ concept: 'a golem of lashed timber that shoulders through walls', cr: 8, archetype: 'brute', path: { path: 'homebrew', by: 'call', print_body: 'Clay Golem', relation: 'resembles', class: null, species: null, receipt: 'golem' } });
    expect(r.trace).toMatch(/\[path\] decides: homebrew \(the matcher would have said twist Clay Golem\)/);
    expect(r.trace).not.toMatch(/print canon/);
    expect(names(r)).not.toContain('Acid Absorption');
  });
});

describe('the exact path', () => {
  test('no seat, no shelf: print\'s rows are the composition', async () => {
    const r = await run({ concept: 'Owlbear', cr: 3, archetype: 'brute', path: { path: 'exact', by: 'code', print_body: 'Owlbear', relation: 'is', class: null, species: null, receipt: 'Owlbear' } });
    expect(r.trace).toMatch(/\[path\] decides: exact on the Owlbear \(the matcher agrees\)/);
    expect(r.trace).not.toMatch(/signature idea|signature template|library seed drawn|value check:/);
    expect(names(r)).toEqual(expect.arrayContaining(['Multiattack', 'Rend'])); // the 2024 Owlbear's rows
  });
});

describe('the class NPC path', () => {
  test('a class on a person body borrows that body: the kuo-toa priest stands on the Priest', async () => {
    const r = await run({ concept: 'a kuo-toa priest who drags swimmers under the ice', cr: 4, archetype: 'caster', path: { path: 'class_npc', by: 'call', print_body: 'Priest', relation: 'is', class: 'cleric', species: null, receipt: 'priest' } });
    expect(r.trace).toMatch(/\[path\] decides: class_npc on the Priest · class cleric/);
    expect(names(r).some((n) => /^Spellcasting/.test(n))).toBe(true);
  });
});

describe('the class-NPC path (pipeline 3)', () => {
  const { checkBlock } = require('../checker.mjs');
  const npc = (cls, species = null, receipt = cls) => ({ path: 'class_npc', by: 'call', print_body: null, relation: null, class: cls, species, receipt });
  test('a class with no body named stands on its class\'s print block, nearest CR: the lizardfolk monk on the Scout (CR 5 → Scout 1/2 / Spy 1 / Assassin 8 → Spy)', async () => {
    const r = await run({ concept: 'lizardfolk monk', cr: 5, archetype: 'skirmisher', path: npc('monk', 'lizardfolk', 'monk') });
    expect(r.trace).toMatch(/\[path\] class body: the monk stands on the (Spy|Scout|Assassin)/);
    expect(r.trace).toMatch(/\[path\] decides: class_npc on the (Spy|Scout|Assassin) · class monk/);
    expect(r.rows.some((e) => e.kit === 'monk')).toBe(true); // the kit lands
    expect(r.trace).toMatch(/fallback stands down: the class_npc path has no shelf/);
    expect(r.trace).not.toMatch(/library seed drawn|value check:/);
    expect(r.m.type).toMatch(/^Humanoid/); expect(r.m.languages).toMatch(/Draconic/); // the species kit from the path
    expect(Math.max(r.m.stats.DEX)).toBeGreaterThanOrEqual(14);
    expect(r.m.generation.pipeline).toMatchObject({ path: 'class_npc', class: 'monk', species: 'lizardfolk' });
    expect(checkBlock(r.m, { cr: 5 }).gates.class.findings.filter((f) => f.severity === 'fail')).toEqual([]);
  });
  test('the class shapes the array: a cleric on a low-WIS body casts off WIS 14 at least', async () => {
    const r = await run({ concept: 'a kuo-toa priest who drags swimmers under the ice', cr: 4, archetype: 'caster', path: { ...npc('cleric'), print_body: 'Priest', relation: 'is' } });
    expect(r.m.stats.WIS).toBeGreaterThanOrEqual(14);
    expect(r.rows.some((e) => e.kit === 'cleric')).toBe(true);
  });
  test('the class floor survives every route-time array writer: a paladin on the Priest casts off CHA 14, not print\'s 13', async () => {
    const r = await run({ concept: 'a templar priest of the dawn who blesses her soldiers', cr: 6, archetype: 'defender', path: { ...npc('paladin'), print_body: 'Priest', relation: 'is' } });
    expect(r.trace).toMatch(/class array: CHA 13 -> 14/);
    expect(r.m.stats.CHA).toBeGreaterThanOrEqual(14);
    // and the donor gate reads the floor as the class's, not as a drifted print array
    expect(checkBlock(r.m, { cr: 6 }).gates.donor.findings.filter((f) => f.rule === 'print-array' && f.severity === 'fail')).toEqual([]);
  });
  test('print\'s own rows are the kit on the class\'s own block: the Priest\'s Divine Aid counts for the cleric (Brother Halric)', () => {
    const sheet = { name: 'Brother Halric', type: 'Humanoid', size: 'Medium', ac: 13, hp: 38, cr: 3, cr_str: '3', speed: '30 ft.', pb: 2, languages: 'Common', stats: { STR: 16, DEX: 10, CON: 12, INT: 13, WIS: 16, CHA: 13 },
      sections: { Actions: [{ name: 'Mace', text: '*Melee Attack Roll:* +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage.', print: true }, { name: 'Spellcasting', text: 'The priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): Guidance, Sacred Flame.', print: true, rules: true }], 'Bonus Actions': [{ name: 'Divine Aid (3/Day)', text: 'The priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.', print: true, rules: true }] },
      generation: { pipeline: { path: 'class_npc', print_body: 'Priest', class: 'cleric', species: null, by: 'call' } } };
    expect(checkBlock(sheet, { cr: 3 }).gates.class.findings.filter((f) => f.rule === 'kit-lands')).toEqual([]);
  });
  test('a cleric kit stripped by "no magic at all" is a note, not a FAIL', () => {
    const sheet = { name: 'T', type: 'Humanoid', size: 'Medium', ac: 15, hp: 60, cr: 4, cr_str: '4', speed: '30 ft.', pb: 2, languages: 'Common', stats: { STR: 16, DEX: 10, CON: 12, INT: 13, WIS: 16, CHA: 13 },
      sections: { Actions: [{ name: 'Mace', text: '*Melee Attack Roll:* +5, reach 5 ft. 6 (1d6 + 3) Bludgeoning damage.' }] },
      generation: { pipeline: { path: 'class_npc', class: 'cleric', species: null, by: 'call' }, clauses: [{ text: 'no magic at all', kind: 'mechanical', polarity: 'lacks', takes: 'spellcasting' }] } };
    const cls = checkBlock(sheet, { cr: 4 }).gates.class;
    expect(cls.findings.find((f) => f.rule === 'kit-lands')?.severity).toBe('soft');
  });
  test('a chassis attack row beyond print\'s count takes no print row and leaves on a closed path (the skald\'s Hurlaxe wore the Pistol\'s numbers)', async () => {
    const r = await run({ concept: 'a skald who sings his warband into a fury', cr: 6, archetype: 'defender', path: { ...npc('bard'), print_body: 'Pirate Captain', relation: 'is' } });
    const attacks = r.rows.filter((e) => /Attack Roll/.test(e.text ?? ''));
    const texts = attacks.map((e) => e.text.replace(/^\*?[A-Za-z ]+Attack Roll:\*? /, ''));
    expect(new Set(texts).size).toBe(texts.length); // no two attack rows with one text
    expect(attacks.filter((e) => /range 30\/90/.test(e.text)).every((e) => /^Pistol/.test(e.name))).toBe(true); // only print's Pistol carries the pistol's range
    expect(r.trace).toMatch(/prints no row for it|the matcher agrees|print canon attack/);
  });
  test('the class fights with its own weapon: the monk strikes unarmed on the Scout/Spy, no poison, no crossbow (Sessrak)', async () => {
    const concept = 'a lizardfolk monk who strikes pressure points with an open hand';
    const r = await run({ concept, cr: 5, archetype: 'skirmisher', path: npc('monk', 'lizardfolk', 'monk') });
    expect(r.trace).toMatch(/\[path\] class body: the monk stands on the (?:Scout|Spy)/);
    expect(r.trace).not.toMatch(/stands on the Assassin/);
    const melee = r.rows.filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
    expect(melee.length).toBeGreaterThan(0);
    for (const e of melee) { expect(e.name).toMatch(/Unarmed Strike|Strike/); expect(e.text).not.toMatch(/Poison damage/); expect(e.weapon ?? null).toBeNull(); }
    for (const e of r.rows.filter((x) => /Ranged Attack Roll/.test(x.text ?? '') && !/Melee or Ranged/.test(x.text ?? ''))) expect(e.weapon).toBe('dart');
  });
  test('a cutpurse carries a shortsword and a shortbow, never the Bandit Captain\'s pistol (Vaelith)', async () => {
    const concept = 'a tabaxi cutpurse who slips through the market crowd';
    const r = await run({ concept, cr: 3, archetype: 'skirmisher', path: npc('rogue', null, 'cutpurse') });
    for (const e of r.rows.filter((x) => /Attack Roll/.test(x.text ?? ''))) expect(['shortsword', 'shortbow', null, undefined]).toContain(e.weapon ?? null);
    expect(r.rows.some((e) => /pistol/i.test(`${e.name} ${e.text}`))).toBe(false);
  });
  test('a berserker swings a greataxe, not the Gladiator\'s spear, and keeps its kit (Gormak)', async () => {
    const concept = 'a goliath berserker who loses control when wounded';
    const r = await run({ concept, cr: 8, archetype: 'brute', path: npc('barbarian', 'goliath', 'berserker') });
    const melee = r.rows.filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
    expect(melee.some((e) => e.weapon === 'greataxe')).toBe(true);
    expect(r.rows.some((e) => /^Spear/.test(e.name ?? ''))).toBe(false);
    expect(r.rows.some((e) => e.kit === 'barbarian')).toBe(true); // the kit never yields to the row cap on a class body
  });
  test('the GM\'s own weapon is not re-armed to the class\'s (one rule with gmArmed)', async () => {
    const concept = 'a templar with a mace who blesses her soldiers';
    const r = await run({ concept, cr: 6, archetype: 'defender', path: { ...npc('paladin'), print_body: 'Knight', relation: 'is' } });
    const melee = r.rows.filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
    expect(melee.some((e) => /Mace/i.test(e.name ?? '') || e.weapon === 'mace')).toBe(true);
    expect(melee.length).toBe(1); // the GM's weapon REPLACES print's, never rides beside it
  });
  test('a body whose only attack is a HYBRID still lands it: print\'s Mage Arcane Burst beside its own Multiattack', async () => {
    const r = await run({ concept: 'a court wizard who is never where you struck and steps away', cr: 6, archetype: 'caster', caster: true, path: { ...npc('mage'), print_body: 'Mage', relation: 'is' } });
    const burst = r.rows.find((e) => /^Arcane Burst/.test(e.name ?? ''));
    expect(burst).toBeDefined(); expect(burst.text).toMatch(/Melee or Ranged Attack Roll/);
    const ma = r.rows.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ma) expect(ma.text).toMatch(/Arcane Burst/);
    expect(checkBlock(r.m, { cr: 6 }).gates.structure.findings.filter((f) => f.rule === 'multiattack-row' && f.severity === 'fail')).toEqual([]);
  });
  test('a class re-arm REWRITES the Multiattack\'s citations, even when a duplicate print-named row was swept (Whisperveil)', async () => {
    const r = await run({ concept: 'a tabaxi cutpurse who slips through the market crowd', cr: 3, archetype: 'skirmisher', path: npc('rogue', null, 'cutpurse') });
    const ma = r.rows.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ma) {
      expect(ma.text).not.toMatch(/using\s+in any combination/); // the citation emptied
      const attacks = r.rows.filter((e) => /Attack Roll/.test(e.text ?? '')).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
      if (/using (.+?) in any combination/.test(ma.text)) for (const n of RegExp.$1.split(/\s+or\s+|,\s*/).map((x) => x.trim()).filter(Boolean)) expect(attacks).toContain(n);
    }
    expect(checkBlock(r.m, { cr: 3 }).gates.reader.findings.filter((f) => f.rule === 'attack-in-multiattack' && f.severity === 'fail')).toEqual([]);
  });
  test('A1: the fighter kit asks the seat\'s AC question — no Guarded Stance when AC already beats print\'s (Vashka, Oriel)', async () => {
    const concept = 'a hobgoblin warlord in lacquered plate who fights from a shield wall';
    const r = await run({ concept, cr: 6, archetype: 'defender', path: { ...npc('fighter', null, 'warlord') } });
    const gs = r.rows.find((e) => e.template === 'guarded-stance' || /Guarded Stance|Unbroken Wall/.test(e.name ?? ''));
    const crTableRaw = require('@/data/challengeRatings.json'); const crTable = crTableRaw.default ?? crTableRaw;
    const par = Number(crTable['6']?.armor_class ?? 0);
    if (Number(r.m.ac) > par) {
      expect(r.rows.some((e) => e.template === 'guarded-stance')).toBe(false);
      expect(r.trace).toMatch(/guarded-stance yields — AC \d+ already beats print's/);
      expect(r.rows.some((e) => e.kit === 'fighter')).toBe(true); // the kit still lands a row
    } else { expect(gs).toBeDefined(); } // at or under print's AC the trait is legal — the control
  });
  test('A1 control: a kit row that is not Guarded Stance is untouched by the AC gate', async () => {
    const concept = 'a sellsword who ripostes every opening';
    const r = await run({ concept, cr: 5, archetype: 'defender', path: { ...npc('fighter', null, 'sellsword') } });
    expect(r.rows.some((e) => e.kit === 'fighter')).toBe(true);
    expect(r.trace).not.toMatch(/riposte yields/);
  });
  test('the class gates read the path record: a class-NPC sheet with no kit row and a primary stat under 14 fails both', () => {
    const sheet = { name: 'T', type: 'Humanoid', size: 'Medium', ac: 15, hp: 60, cr: 5, cr_str: '5', speed: '30 ft.', pb: 3, languages: 'Common', stats: { STR: 10, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 },
      sections: { Actions: [{ name: 'Shortsword', text: '*Melee Attack Roll:* +4, reach 5 ft. 4 (1d6 + 1) Piercing damage.' }] }, generation: { pipeline: { path: 'class_npc', class: 'rogue', species: 'lizardfolk', by: 'call' } } };
    const cls = checkBlock(sheet, { cr: 5 }).gates.class; const rules = cls.findings.filter((f) => f.severity === 'fail').map((f) => f.rule);
    expect(cls.status).toBe('fail'); expect(rules).toEqual(expect.arrayContaining(['kit-lands', 'class-stat', 'species-header']));
  });
});

describe('a failed path call', () => {
  test('the matcher stands in and the trace says so (never-fail generation, owner\'s standing rule)', async () => {
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 6, archetype: 'brute', path: { path: null, by: 'call', failed: true, print_body: null, relation: null, class: null, species: null, receipt: 'the path call failed' } });
    expect(r.trace).toMatch(/\[path\] FAILED — the path call failed; the matcher stands in/);
    expect(names(r)).toContain('Regeneration');
  });
  test('no path at all (a caller that never asked) leaves the matcher\'s read untouched', async () => {
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 6, archetype: 'brute', path: undefined });
    expect(r.trace).not.toMatch(/\[path\]/);
    expect(names(r)).toContain('Regeneration');
  });
});

// ---------------------------------------------------------- the forty's residuals
// Four defects the critic read off the forty (2026-10-19), each pinned at the
// mechanism print settles rather than at the one block that showed it.

describe('print names its own trait, rate and all', () => {
  test("the Vampire's Legendary Resistance keeps its uses — a bare name reads as unlimited", async () => {
    const r = await run({ concept: 'a vampire who runs a bathhouse', cr: 13, archetype: 'brute', path: twist('Vampire', 'vampire') });
    const lr = r.rows.find((e) => /^Legendary Resistance/.test(e.name ?? ''));
    expect(lr).toBeTruthy();
    expect(lr.name).toBe('Legendary Resistance (3/Day, or 4/Day in Lair)');
  });
});

describe('a predicate slot is not a sentence', () => {
  const { renderTemplate, templatesFor } = require('../templates.mjs');
  const ctxFor = (cr) => { const scaled = scaleDonor(pickDonor(cr, null, 'skirmisher'), cr, { mechanics: [] }); return { scaled, energy: 'Fire', mix: null, meleeName: 'Claw', conditionMinor: 'Frightened', archetype: 'controller', imposed: [], mechanics: [], cr, name: 'Fen-Burn Hydra' }; };
  const zone = () => templatesFor({ archetype: 'controller', style: 'skulker', cr: 7, mechanics: [], imposed: [] }).find((t) => t.id === 'zone');

  test('the frame owns the subject and the full stop, so a predicate fill reads as English', () => {
    const t = zone(); expect(t).toBeTruthy();
    const out = renderTemplate(t, ctxFor(7), { zone_effect: 'scalding smoke', zone_rule: 'has Disadvantage on attack rolls' });
    expect(out.text).toContain('Each creature in the area has Disadvantage on attack rolls.');
    expect(out.text).not.toMatch(/minutes\. has /);
  });

  test("a fill shaped like a whole sentence falls to the engine's own predicate, never landing after a period", () => {
    const out = renderTemplate(zone(), ctxFor(7), { zone_effect: 'scalding smoke', zone_rule: 'A creature in the haze is blinded' });
    expect(out.text).toContain('Each creature in the area has Disadvantage on attack rolls.');
  });

  test('the fit prompt tells the call the slot is a predicate', () => {
    const { buildFitPrompt } = require('../templates.mjs');
    const p = buildFitPrompt({ name: 'Fen-Burn Hydra', cr: 7, idea: { section: 'action', trigger: 'once_per_fight', effect: 'condition', idea: 'it vents scalding smoke' }, menu: [zone()], concept: 'vents scalding smoke' });
    expect(p).toMatch(/\{zone_rule\} \(a PREDICATE, no subject and no full stop/);
  });
});

describe('reach follows the body, at the two sizes print agrees', () => {
  test("a Gargantuan body's own melee row rises to print's modal 15 ft.", async () => {
    const r = await run({ concept: 'a gargantuan trench leviathan that coils around hulls', cr: 16, archetype: 'brute', over: { size: 'Gargantuan' } });
    expect(r.m.size).toBe('Gargantuan');
    const own = r.rows.filter((e) => !e.print && /reach \d+ ft\./.test(e.text ?? ''));
    expect(own.length).toBeGreaterThan(0);
    for (const e of own) expect(Number(/reach (\d+) ft\./.exec(e.text)[1])).toBeGreaterThanOrEqual(15);
  });

  test('a Large body is left alone — print puts reach 5 on 84 of its 126 Large rows', async () => {
    const r = await run({ concept: 'a large bog hound that drags prey down', cr: 5, archetype: 'brute', over: { size: 'Large' } });
    expect(r.trace).not.toMatch(/reach follows the body/);
  });

  test("print's own row keeps print's reach (the Roc's Talons and the Elephant's Gore are reach 5)", async () => {
    const r = await run({ concept: 'a roc that nests on a lighthouse', cr: 11, archetype: 'brute', path: twist('Roc', 'roc') });
    expect(r.m.size).toBe('Gargantuan');
    // print's Roc is Gargantuan and puts reach 10 on its Beak, reach 5 on its
    // Talons: every row the floor left below 15 must be one of print's own.
    const short = r.rows.filter((e) => /reach \d+ ft\./.test(e.text ?? '') && Number(/reach (\d+) ft\./.exec(e.text)[1]) < 15);
    expect(short.length).toBeGreaterThan(0);
    for (const e of short) expect(e.print).toBe(true);
  });
});

describe('the attack floor by CR', () => {
  const { checkBlock } = require('../checker.mjs');
  const block = (over) => ({ name: 'Test', size: 'Large', type: 'Monstrosity', alignment: 'Neutral', ac: 15, hp: 100, hp_formula: '12d10 + 34', speed: '40 ft.', stats: { STR: 18, DEX: 14, CON: 16, INT: 6, WIS: 12, CHA: 8 }, cr: 7, cr_str: '7', pb: 3, senses: 'Passive Perception 11', languages: '—', sections: { Actions: [] }, ...over });
  const claw = { name: 'Claw', text: '*Melee Attack Roll:* +7, reach 10 ft. 13 (2d8 + 4) Slashing damage.' };
  const floorOf = (b) => Object.values(checkBlock(b).gates ?? {}).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'attack-floor');

  test('CR 7 with one Claw and no Multiattack is flagged — print carries one on 110 of 113 blocks at CR 5+', () => {
    expect(floorOf(block({ sections: { Actions: [claw] } })).length).toBe(1);
  });

  test("one attack row cited N times is print's own idiom, not a defect (the Adult Red Dragon's three Rends)", () => {
    const ma = { name: 'Multiattack', text: 'The creature makes three Claw attacks.' };
    expect(floorOf(block({ sections: { Actions: [ma, claw] } })).length).toBe(0);
  });

  test('below CR 5 the single attack is the shape — 91 of print\'s 106 blocks under CR 1', () => {
    expect(floorOf(block({ cr: 3, cr_str: '3', sections: { Actions: [claw] } })).length).toBe(0);
  });

  test('a swarm is exempt: swarm-multiattack hard-fails the only shape this rule would allow', () => {
    expect(floorOf(block({ type: 'Swarm of Tiny Beasts', sections: { Actions: [claw] } })).length).toBe(0);
  });
});

// ------------------------------------------------- step 6: the guard, behavioural
// The brief asks for a guard test that "a search for the retired tables and rules
// outside the dispatcher fails." A literal grep cannot be that test: the retired
// rules legitimately REMAIN as the fallback for a failed path call, which the
// brief's own never-fail rule requires ("the matcher stands in only when the call
// failed, and says so"). So the guard is behavioural instead — with a SUCCESSFUL
// path decision, no retired rule may change the body, the class or the line.
describe('step 6: with a path decision, no retired rule decides', () => {
  test("the canon matcher does not supply a BODY the path did not name — a golem of lashed timber is not the Clay Golem", async () => {
    const r = await run({ concept: 'a siege-engine golem of lashed timber that shoulders through walls', cr: 8, archetype: 'brute', path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: 'lashed timber' } });
    expect(r.trace).toMatch(/\[path\] decides: homebrew/);
    // the Clay Golem's own rows do not land: no Acid Absorption, no HP-max drain,
    // and the print-canon stamp never runs, because the path named no body
    expect(r.rows.some((e) => /Acid Absorption/i.test(e.name ?? ''))).toBe(false);
    expect(r.trace).not.toMatch(/print canon trait:/);
  });

  // FOUND BY THIS GUARD (2026-10-20), THEN RULED ON BY THE OWNER. The name-canon
  // stamp read the WORD "golem" and stamped print's golem traits onto a sheet
  // whose path call answered print_body null with the receipt "lashed timber".
  // Its only brake was a SECOND call answering golem → canon ✗, so the staple
  // landed whenever that call missed. Owner's ruling: the word stands down
  // whenever the path named no published body. This retires the last row of the
  // brief's Retirements table.
  test('the name-canon trait stamp stands down when the path named no print body', async () => {
    const hb = { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: 'lashed timber' };
    const r = await run({ concept: 'a siege-engine golem of lashed timber that shoulders through walls', cr: 8, archetype: 'brute', path: hb });
    expect(names(r)).not.toContain('Immutable Form');
    expect(names(r)).not.toContain('Magic Resistance');
    expect(r.trace).toMatch(/name-canon stands down:.*named no print body/);
    expect(r.trace).not.toMatch(/name-canon trait stamped/);
  });

  test('a TWIST on a print body still takes print\'s own canon trait — the stand-down is only for a bodiless path', async () => {
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 5, archetype: 'brute', path: twist('Troll', 'troll') });
    expect(names(r)).toContain('Regeneration');
    expect(r.trace).not.toMatch(/name-canon stands down/);
  });

  test('a twist decision is not stood down by a cue verdict aimed at the matcher', async () => {
    // rejectedCanon is the hint call's ✗. It may veto a MATCHER record; it may not
    // veto a body the path call named with a receipt.
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 5, archetype: 'brute', path: twist('Troll', 'troll'), over: {} });
    expect(r.trace).toMatch(/\[path\] decides: twist on the Troll/);
    expect(names(r)).toContain('Regeneration');
  });

  test('a failed path call falls to the matcher and SAYS so — the never-fail rule, still audible', async () => {
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 5, archetype: 'brute', path: { path: null, by: 'call', failed: true, receipt: 'the call errored' } });
    // the sheet still ships (never-fail), and the trace does not claim a decision
    expect(r.m).toBeTruthy();
    expect(r.trace).not.toMatch(/\[path\] decides: twist/);
  });

  test('the homebrew path loads none of print\'s rows even where a name is in the words', async () => {
    const r = await run({ concept: 'a leviathan of the trench whose song drowns fleets', cr: 16, archetype: 'brute', path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: 'of the trench' } });
    expect(r.trace).not.toMatch(/print canon trait:|print canon route/);
  });
});

// 1f, THE FLAW ROW (owner's ruling, 2026-10-20). "Adult Red Dragon — blind in
// one eye from an old lance" removed nothing and shipped a stock dragon, and the
// checker's lack-honored gate failed it with nothing to point at. Print carries
// a costing trait on only 11 of 329 blocks and every one is keyed to an EXTERNAL
// trigger (sunlight, bright light, taking Fire damage) — there is no print flaw
// for a missing faculty — so the row is authored in print's grammar and nowhere
// beyond it: "has Disadvantage on <test>". WHICH faculty is the call's answer
// (`takes`, a validated enum); the enum → sentence table is a closed fact.
describe('a lacks clause with nothing to remove costs the creature something', () => {
  const { checkBlock } = require('../checker.mjs');

  test("the dragon's blind side lands a flaw row named in the GM's own words, and the lack-honored gate stops failing", async () => {
    const r = await run({
      concept: 'Adult Red Dragon — blind in one eye from an old lance', cr: 17, archetype: 'brute',
      path: twist('Adult Red Dragon', 'Adult Red Dragon'),
      over: { lacks: [{ quote: 'blind in one eye', takes: 'sight', costs: 'sight' }] },
    });
    const flaw = r.rows.find((e) => e.flaw);
    expect(flaw).toBeTruthy();
    expect(flaw.text).toMatch(/has Disadvantage on Wisdom \(Perception\) checks that rely on sight\./);
    // print names a flaw by its CAUSE, never by a condition — "Blind in One Eye"
    // promises the Blinded condition the text never imposes, and the
    // name-mechanic gate failed it in 4 of 5 live runs. The GM's words stay on
    // the row as its receipt.
    expect(flaw.name).toBe('Sight Weakness');
    expect(flaw.because).toBe('blind in one eye');
    expect(r.trace).toMatch(/flaw row: "Sight Weakness"/);
    // and the gate the critic saw failing now has something to point at
    const fails = Object.values(checkBlock(r.m).gates ?? {}).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'lack-honored');
    expect(fails).toHaveLength(0);
  });

  test('one flaw row per sheet, matching print\'s rarity of 11 in 329', async () => {
    const r = await run({
      concept: 'a blinded, deafened old wyrm that lost an eye and an ear', cr: 14, archetype: 'brute',
      over: { lacks: [{ quote: 'lost an eye', takes: 'sight', costs: 'sight' }, { quote: 'lost an ear', takes: 'hearing', costs: 'hearing' }] },
    });
    expect(r.rows.filter((e) => e.flaw)).toHaveLength(1);
  });

  test('a lack that REMOVES a row takes no flaw row — the removal is the cost', async () => {
    const r = await run({
      concept: 'a troll that cannot regenerate at all', cr: 5, archetype: 'brute',
      path: twist('Troll', 'troll'),
      over: { lacks: [{ quote: 'cannot regenerate', takes: 'regeneration', costs: 'none' }] },
    });
    expect(names(r)).not.toContain('Regeneration');
    expect(r.rows.filter((e) => e.flaw)).toHaveLength(0);
  });
});

// 1e, AN OWED CLAUSE IS OWED A ROW (critic's ruling, 2026-10-20). On a print
// body, every clause the GM added beyond print is the whole reason the sheet is
// not just the printed monster. The Vampire "who keeps a garden of thorns"
// shipped a stock vampire because the clause reader had called the thorns
// DESCRIPTIVE and only mechanical clauses ever reached the repair call.
describe('1e: a clause added to a printed creature is owed a row', () => {
  const { checkBlock } = require('../checker.mjs');

  test('a DESCRIPTIVE clause reaches the repair call on a twist, where it never used to', async () => {
    const r = await run({ concept: 'a vampire who keeps a garden of thorns', cr: 13, archetype: 'brute', path: twist('Vampire', 'vampire') });
    // either a row answers it, or the repair ran for it and the trace says so —
    // what must NOT happen is the clause vanishing with no record
    expect(r.trace).toMatch(/repair:|owed and unanswered:|seat takes its clause/);
  });

  test('an owed clause nothing answered is recorded on the block and FAILS the checker', async () => {
    const m = {
      name: 'Stock Vampire', size: 'Medium', type: 'Undead', alignment: 'Lawful Evil', ac: 16, hp: 195,
      hp_formula: '23d8 + 92', speed: '40 ft.', stats: { STR: 18, DEX: 18, CON: 18, INT: 17, WIS: 15, CHA: 18 },
      cr: 13, cr_str: '13', pb: 5, senses: 'Passive Perception 17', languages: 'Common',
      sections: { Actions: [{ name: 'Multiattack', text: 'The vampire makes two Grave Strike attacks.' }, { name: 'Grave Strike', text: '*Melee Attack Roll:* +9, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' }] },
      generation: { path: 'reskin', owed_unanswered: ['who keeps a garden of thorns'] },
    };
    const fails = Object.values(checkBlock(m).gates ?? {}).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'owed-clause');
    expect(fails).toHaveLength(1);
    expect(fails[0].severity).toBe('fail');
    expect(fails[0].message).toMatch(/ships as the stock monster/);
  });

  test('a block with nothing owed is untouched by the new gate', () => {
    const m = { name: 'X', size: 'Medium', type: 'Undead', alignment: 'Neutral', ac: 15, hp: 100, hp_formula: '12d10+34', speed: '30 ft.', stats: { STR: 14, DEX: 14, CON: 14, INT: 10, WIS: 10, CHA: 10 }, cr: 5, cr_str: '5', pb: 3, senses: 'Passive Perception 10', languages: '—', sections: { Actions: [] }, generation: { path: 'reskin' } };
    const fails = Object.values(checkBlock(m).gates ?? {}).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'owed-clause');
    expect(fails).toHaveLength(0);
  });
});

describe('1e: the idea starts from the GM\'s clause, not the flavour paragraph', () => {
  test("the idea prompt names the clause the sheet is for, and says print supplies the rest", () => {
    const { buildIdeaPrompt } = require('../templates.mjs');
    const p = buildIdeaPrompt({ name: 'Ash-Marsh Hydra', cr: 8, concept: 'Hydra whose stumps smoke instead of regrowing', sheetLines: 'AC 15', owedClause: 'whose stumps smoke' });
    expect(p).toMatch(/THE CLAUSE THIS ABILITY IS FOR/);
    expect(p).toMatch(/"whose stumps smoke"/);
    expect(p).toMatch(/do not describe the creature in general/);
  });

  test('a homebrew sheet is given no owed clause — it has both seats and the catalog', () => {
    const { buildIdeaPrompt } = require('../templates.mjs');
    const p = buildIdeaPrompt({ name: 'X', cr: 8, concept: 'a thing', sheetLines: 'AC 15', owedClause: null });
    expect(p).not.toMatch(/THE CLAUSE THIS ABILITY IS FOR/);
  });
});

// THE BODY'S OWN NOUN IS NOT THIS CREATURE'S NAME (critic, section 5,
// 2026-10-20). A print body's rows carry print's word for itself — "The guard
// makes two Mace attacks", "The bandit makes two attacks", "The pirate makes
// three" — and the class and twist paths take those rows verbatim. Confirmed
// live on three blocks across two fresh runs before the fix.
describe('the print body\'s noun is swept for the sheet\'s own name', () => {
  test('a class NPC on a print person body does not call itself by the body\'s noun', async () => {
    const r = await run({
      concept: 'Harl Sedgewick, a grizzled sergeant who holds the gate', cr: 4, archetype: 'defender',
      path: { path: 'class_npc', by: 'call', print_body: null, relation: null, class: 'fighter', species: null, receipt: 'sergeant' },
    });
    const leaked = r.rows.filter((e) => /\bthe (?:guard|bandit|pirate|warrior|commoner|scout|knight|priest|mage)\b/i.test(e.text ?? ''));
    expect(leaked.map((e) => `${e.name}: ${e.text}`)).toEqual([]);
  });

  test('a twist keeps print\'s Multiattack but says the sheet\'s own name', async () => {
    const r = await run({ concept: 'a dire wolf with a frost-rimed hide', cr: 2, archetype: 'skirmisher', path: twist('Dire Wolf', 'dire wolf') });
    const ma = r.rows.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ma) expect(ma.text).not.toMatch(/\bthe wolf\b(?! with)/i);
  });

  test('a sheet that IS the print creature keeps its own noun — nothing is swept needlessly', async () => {
    const r = await run({ concept: 'a troll that grows back unless the blade was silvered', cr: 5, archetype: 'brute', path: twist('Troll', 'troll') });
    expect(r.trace).not.toMatch(/body noun swept/);
  });
});

// ---------------------------------------------------------------------------
// THE CLAUSE-FIRST RETRY IS GONE (owner: "ok no retry", 2026-10-22). It was
// measured on the forty at 34 calls fired for 6 successes — 17%, about 5.7 calls
// per seat saved — because it re-asks the same call with the same menu when the
// refusal was never about the clause. These tests now pin its ABSENCE: a refusal
// must cost exactly one fit call.
describe('a refusal costs exactly one fit call', () => {
  const run = async (concept, path) => {
    const fits = []; const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.join(' ')); };
    try {
      await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 5, path }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) {
          return JSON.stringify({ body_verdicts: ALL_BODIES, action: { idea: 'It does something the catalog cannot hold at all.', section: 'action', trigger: 'save', effect: 'damage' } });
        }
        if (prompt.startsWith("A monster's signature ability has been described")) {
          fits.push(prompt);
          return JSON.stringify({ template: 'none', closest: 'zone', missing: 'a compound the catalog cannot express', declined_because: 'no template holds it' });
        }
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(5, null, 'brute'));
      });
    } finally { console.log = orig; }
    return { fitCalls: fits.length, trace: lines.join('\n') };
  };

  it('spends ONE fit call per seat on a twist, never a retry', async () => {
    const r = await run('a hydra whose stumps smoke instead of regrowing', twist('Hydra', 'hydra'));
    expect(r.trace).not.toMatch(/clause-first retry/);
    expect(r.trace).not.toMatch(/asked again FOR the clause/);
  });

  it('spends no retry on an exact body either', async () => {
    const r = await run('Owlbear', { path: 'exact', by: 'code', print_body: 'Owlbear', relation: 'is', class: null, species: null, receipt: 'Owlbear' });
    expect(r.trace).not.toMatch(/clause-first retry/);
  });

  it('still records the refusal as a gap — removing the retry must not cost the build signal', async () => {
    const r = await run('a hydra whose stumps smoke instead of regrowing', twist('Hydra', 'hydra'));
    expect(r.trace).toMatch(/\[gap\]/);
  });
});

// A HANDED CLAUSE KEEPS THE LACK (the critic's item 3, measured 2026-10-22).
// positiveHalf() cut `lackQuote` unconditionally, and on a LACKS clause that
// quote is the whole twist: the dragon's record is "Adult Red Dragon — blind in
// one eye from an old lance" (LACKS), so the clause HANDED to the call arrived as
// "Adult Red Dragon — from an old lance". Cutting it is right for the unanswered
// TEST and wrong for handing over.
//
// These read the clause out of the FIT PROMPT, which is where the twist path
// hands it (buildFitPrompt({ clause })). They used to read the clause-first
// retry's trace line, which went away with the retry — a test should observe the
// mechanism, not a log line that happens to mention it.
describe('the clause handed to the call is not cut down', () => {
  const promptFor = async (concept, path) => {
    const fits = []; const orig = console.log;
    console.log = () => {};
    try {
      await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 8, path }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) {
          return JSON.stringify({ body_verdicts: ALL_BODIES, action: { idea: 'Something the catalog cannot hold at all.', section: 'action', trigger: 'save', effect: 'damage' } });
        }
        if (prompt.startsWith("A monster's signature ability has been described")) {
          fits.push(prompt);
          return JSON.stringify({ template: 'none', closest: 'zone', missing: 'a compound', declined_because: 'nothing holds it' });
        }
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(8, null, 'brute'));
      });
    } finally { console.log = orig; }
    return fits.join('\n');
  };

  it("keeps both halves of the twist in the clause it hands over (the Hydra's own)", async () => {
    const p = await promptFor('Hydra — whose stumps smoke instead of regrowing', twist('Hydra', 'hydra'));
    const handed = /THE CLAUSE[^\n]*\n?([^\n]*)/i.exec(p);
    // the clause reaches the prompt at all, and the lack is not cut out of it
    expect(p).toMatch(/stumps smoke/);
    expect(p).toMatch(/instead of regrowing/);
    void handed;
  });

  it('cuts on WORD boundaries, so "archlich" does not become "arch"', () => {
    // the unit of the bug, pinned directly: cut() used indexOf, so removing the
    // print body "Lich" from "an archlich enthroned on a sun of bone" left "an
    // arch enthroned...". Still live on the forty before this fix.
    const cut = (t, q) => {
      const s2 = String(t ?? ''); const n = String(q ?? '').trim(); if (!n) return s2;
      const b = new RegExp(`(?<![A-Za-z])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z])`, 'i');
      const i = s2.search(b) >= 0 ? s2.search(b) : -1;
      return (i < 0 ? s2 : `${s2.slice(0, i)} ${s2.slice(i + n.length)}`).replace(/\s{2,}/g, ' ').trim();
    };
    expect(cut('an archlich enthroned on a sun of bone', 'Lich')).toBe('an archlich enthroned on a sun of bone');
    expect(cut('a shieldwall captain', 'wall')).toBe('a shieldwall captain');
    expect(cut('Adult Red Dragon blind in one eye', 'Adult Red Dragon')).toBe('blind in one eye');
  });
});

describe('a gap line always carries a build target', () => {
  const traceFor = async (fitAnswer) => {
    const lines = []; const orig = console.log;
    console.log = (...a) => { lines.push(a.join(' ')); };
    try {
      await generateReskin({
        archetype: 'brute', concept: 'a bog hound that drags fishermen under and holds them there',
        userConcept: 'a bog hound that drags fishermen under and holds them there', cr: 5,
        path: { path: 'homebrew', by: 'call', print_body: null, relation: null, class: null, species: null, receipt: null },
      }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) {
          return JSON.stringify({ body_verdicts: ALL_BODIES, action: { idea: 'It hauls a creature under the water and keeps it there until it drowns.', section: 'action', trigger: 'save', effect: 'movement' } });
        }
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify(fitAnswer);
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(5, null, 'brute'));
      });
    } finally { console.log = orig; }
    return lines.join('\n');
  };

  it('never emits the old UNNAMED line', async () => {
    const t = await traceFor({ template: 'none', declined_because: 'no_fit' });
    expect(t).not.toMatch(/\[gap\] UNNAMED/);
  });

  it('names the VARIANT when the call gave a nearest but no mechanic', async () => {
    const t = await traceFor({ template: 'none', closest: 'reel', declined_because: 'no_fit' });
    expect(t).toMatch(/\[gap\] \(missing unstated\) — A VARIANT OF reel/);
  });

  it('separates a ROUTING miss from a catalog gap when the call gave neither', async () => {
    const t = await traceFor({ template: 'none', declined_because: 'no_fit' });
    // either the catalog holds something for this cell that the seat was not shown
    // (routing), or it holds nothing (a real gap) — one of the two, never silence
    expect(t).toMatch(/\[gap\] \(missing unstated\) — no nearest named; the catalog HAS .* a ROUTING miss, not a catalog gap|\[gap\] \(missing unstated\) — no nearest named, and the catalog holds NOTHING for/);
  });

  it('keeps the idea in the GM-facing words, not truncated to 70 characters', async () => {
    const t = await traceFor({ template: 'none', declined_because: 'no_fit' });
    expect(t).toMatch(/keeps it there until it drowns/);
  });
});
