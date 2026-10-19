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
const run = async ({ concept, cr, archetype, style = null, path, over = {}, caster = false }) => {
  const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
  let m; try { m = await generateReskin({ archetype, style, concept, userConcept: concept, cr, path, caster }, async () => JSON.stringify(stub(cr, style, archetype, over))); } finally { console.log = orig; }
  return { m, trace: lines.join('\n'), rows: Object.values(m.sections).flat() };
};
const twist = (body, receipt) => ({ path: 'twist', by: 'call', print_body: body, relation: 'is', class: null, species: null, receipt });
const names = (r) => r.rows.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, ''));

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
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ trait: { idea: "The champion's death-grin never falters, and the longer a fight drags on the better it reads the opponent's timing.", section: 'trait', trigger: 'always', effect: 'control' } }); // the live idea: a shape fit with no verb match, carried by the quote "a skeleton" alone
        if (prompt.startsWith("A monster's signature ability has been described")) return JSON.stringify({ template: 'false-appearance', because: 'it passes for an ordinary skeleton', name: 'Deathless Grin', asked: 'a skeleton' });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        return JSON.stringify(stub(4, null, 'brute'));
      });
    } finally { console.log = orig; }
    const tr = lines.join('\n');
    expect(tr).toMatch(/trait declined: "Deathless Grin" — a print body takes only what the user's words ask; the call quotes "a skeleton", which only names the creature itself/);
    expect(Object.values(m.sections).flat().some((e) => e.template === 'false-appearance')).toBe(false);
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
    expect(lines.join('\n')).toMatch(/trait declined: "Gravewrought Steel" — .*no unanswered twist clause/);
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
