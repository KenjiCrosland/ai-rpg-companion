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
const run = async ({ concept, cr, archetype, style = null, path, over = {} }) => {
  const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
  let m; try { m = await generateReskin({ archetype, style, concept, userConcept: concept, cr, path }, async () => JSON.stringify(stub(cr, style, archetype, over))); } finally { console.log = orig; }
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
    const under = checkBlock(r.m, { cr: 13 }).fails.filter((f) => /under/.test(JSON.stringify(f)));
    expect(under).toEqual([]);
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
