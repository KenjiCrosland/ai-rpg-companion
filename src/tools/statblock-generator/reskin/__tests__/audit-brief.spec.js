// THE AUDIT'S BRIEF: WHERE EACH ROW CAME FROM, AND THE OWNER'S BAR (items R0 + "not just accuracy",
// 2026-11-11).
//
// Two measured problems with the brief as it stood. (1) It said nothing about provenance, so of 461
// findings over the saved runs 23% landed on a print row and 28% on a chassis row — half the model's
// attention on rows no per-sheet fix can touch, a quarter of it arguing with print (the Crocodile's
// own "While Grappled, the target has the Restrained condition", eleven times). (2) It said "Flavor
// problems … are NOT defects — ignore them entirely", so the one call that reads the finished block
// whole was forbidden from saying whether the block is any good — and the owner's hand-score showed
// his most useful notes ("slag should do damage", "the slime is useless", "how does tar pull") were
// all judgments the brief excluded.
import { buildAuditPrompt } from '@/tools/statblock-generator/format-2024/audit.mjs';

const sheet = () => ({
  name: 'Mire Troll', cr: 5, cr_str: '5', pb: 3, size: 'Large', type: 'Giant', alignment: 'Chaotic Evil',
  ac: 15, hp: 84, hp_formula: '8d10 + 40', speed: '30 ft.', stats: { STR: 18, DEX: 13, CON: 20, INT: 7, WIS: 9, CHA: 7 },
  saves: {}, skills: '', senses: 'darkvision 60 ft.', languages: 'Giant', initiative_bonus: 1, initiative_score: 11,
  sections: {
    Traits: [{ name: 'Regeneration', text: 'The troll regains 15 Hit Points at the start of each of its turns.', print: true },
      { name: 'Fen-Fed Hide', text: 'When it starts its turn in mud, the troll regains 9 (2d8) Hit Points.', freeRow: true }],
    Actions: [{ name: 'Multiattack', text: 'The troll makes three Rend attacks.' },
      { name: 'Rend', text: '*Melee Attack Roll:* +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.', print: true },
      { name: 'Mire Haul', text: '*Strength Saving Throw*: DC 13, each creature in a 15-foot Cone.', template: 'obstacle-pull' }],
  },
});
const brief = () => buildAuditPrompt(sheet(), '2024', { reskin: true });

describe('the brief tells the audit where each row came from', () => {
  test('every row is listed under its origin, by the declared field', () => {
    const p = brief();
    expect(p).toMatch(/WHERE THESE ROWS CAME FROM/);
    expect(p).toMatch(/OFFICIAL — copied word for word from the published Monster Manual: [^\n]*Traits\/Regeneration/);
    expect(p).toMatch(/THE BODY'S OWN ROW[^\n]*: [^\n]*Actions\/Multiattack/);
    expect(p).toMatch(/THE BODY'S CATALOG ROW[^\n]*: [^\n]*Actions\/Mire Haul/);
    expect(p).toMatch(/WRITTEN FOR THIS CREATURE[^\n]*: [^\n]*Traits\/Fen-Fed Hide/);
  });

  // THE LABEL AND THE EXCLUSION, both of which the first cut got wrong (owner, 2026-11-12). "PRINT"
  // was engine shorthand the brief used before defining it, and the exclusion covered WORDING only —
  // so the model dutifully reported a published row's missing escape DC and missing duration, which
  // are RULES. Two of the four bad findings on that twelve were exactly that.
  test('the official rows are named plainly, and their RULES are out of review too', () => {
    const p = brief();
    expect(p).toMatch(/Wizards of the Coast's own text, copied word for word from the published/);
    expect(p).toMatch(/their\s*\n?\s*RULES, their counterplay, a missing escape DC or duration or limit/);
    expect(p).toMatch(/you are not auditing the Monster Manual/);
    expect(p).toMatch(/a reference to something THIS block does not\s*\n?\s*have/);
  });

  // the engine's own word for it never reaches the model
  test('"print" as a bare term appears nowhere in the brief', () => {
    expect(brief()).not.toMatch(/\bprint\b/i);
  });

  // read before the principles that say "flag X", not 6,000 characters after them
  test('the legend is read BEFORE the principles', () => {
    const p = brief();
    expect(p.indexOf('WHERE THESE ROWS CAME FROM')).toBeLessThan(p.indexOf('1. COUNTERPLAY'));
  });

  test("the body's rows are named a catalog fix, not a sheet fix", () => {
    expect(brief()).toMatch(/fixed once in the catalog, not\s*\n?\s*on this sheet/);
  });

  // a block with no rows must not emit a legend of empty buckets, and each bucket appears only
  // when something is in it (the renderer needs a whole model, so this is a real sheet, emptied)
  test('a sheet with no rows adds no legend, and absent origins print no empty line', () => {
    const bare = { ...sheet(), sections: { Traits: [], Actions: [] } };
    expect(buildAuditPrompt(bare, '2024', { reskin: true })).not.toMatch(/WHERE THESE ROWS CAME FROM/);
    const onlyPrint = { ...sheet(), sections: { Actions: [{ name: 'Rend', text: '*Melee Attack Roll:* +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.', print: true }] } };
    const p = buildAuditPrompt(onlyPrint, '2024', { reskin: true });
    expect(p).toMatch(/OFFICIAL[^\n]*: [^\n]*Actions\/Rend/);
    // the BUCKET line, not the paragraph below that explains what the bucket means
    expect(p).not.toMatch(/^- WRITTEN FOR THIS CREATURE[^\n]*:/m);
  });
});

describe("the brief carries the owner's bar, not just accuracy", () => {
  test('worth-the-action and practical-sense are principles the model is asked for', () => {
    const p = brief();
    expect(p).toMatch(/6\. WORTH THE ACTION/);
    expect(p).toMatch(/7\. PRACTICAL SENSE/);
    expect(p).toMatch(/"principle": <1-7>/);
  });

  test('the blanket flavor exclusion is gone — it forbade exactly those two', () => {
    expect(brief()).not.toMatch(/Flavor problems/);
    expect(brief()).not.toMatch(/ignore them entirely/);
  });

  // what must NOT change: balance is the chassis's, and the owner's own IGNOREs
  test('CR balance stays out of scope', () => {
    expect(brief()).toMatch(/Balance is out of scope/);
    expect(brief()).toMatch(/"too strong," "too weak,"/);
  });

  test("a cone pull written 'straight toward' is calibrated out — the books' own wording", () => {
    expect(brief()).toMatch(/the published books' own wording for forced\s*\n?\s*movement in an area/);
  });

  test('the judgment principles still say what a finding may not be: a number or a CR comparison', () => {
    expect(brief()).toMatch(/never a\s*\n?\s*number and never a comparison to its CR/);
  });
});

// THE GATE, AND THE FIX KNOWING WHAT KIND OF DEFECT IT IS (item R, 2026-11-12).
//
// The owner hand-scored 33 findings this gate had dropped on rows a fix can reach: ACT 22 / IGNORE 10
// / WRONG 1 — 67% he would have acted on, 3% actually wrong. A filter discarding good work two to one
// is not a quality gate. So on a reachable row a spanned finding is kept whatever its label; on a row
// no fix can reach (official text, a catalog row) the old caution stands, because a low-confidence
// finding there is noise nobody can act on. And the finding now carries its PRINCIPLE, which is the
// class the owner's scoring produced — a two-in-one is split, a dead row gains its payload.
describe('the gate keeps what a fix can reach, and the fix is told the class', () => {
  const { verifyAuditFindings } = require('@/tools/statblock-generator/format-2024/audit.mjs');
  const { buildFreeRowFixPrompt } = require('@/tools/statblock-generator/reskin/author.mjs');
  const SPAN = 'the target has the Frightened condition';
  const monster = (over = {}) => ({
    name: 'X',
    sections: { Traits: [{ name: 'Dread Hide', text: `While it is Bloodied, ${SPAN} until the end of its next turn.`, ...over }] },
  });
  const answer = (confidence, principle = 6) => JSON.stringify({ name_grade: 'B', type_correction: null, element_claims: [],
    findings: [{ principle, section: 'Traits', entry: 'Dread Hide', span: SPAN, issue: 'The row is not worth its action.', confidence }] });

  test('a low-confidence judgment finding on a row a fix CAN reach is kept', () => {
    expect(verifyAuditFindings(monster({ freeRow: true }), answer('low'))).toHaveLength(1);
    expect(verifyAuditFindings(monster({ authored: true }), answer('low'))).toHaveLength(1);
  });

  test('…and on a row no fix can reach it is still dropped', () => {
    expect(verifyAuditFindings(monster({ print: true }), answer('low'))).toHaveLength(0);
    expect(verifyAuditFindings(monster({ template: 'phobia' }), answer('low'))).toHaveLength(0);
  });

  // the field is simply missing on some answers; absent is not a verdict of "low"
  test('a finding with no confidence field at all survives on a reachable row', () => {
    const noLabel = JSON.stringify({ name_grade: 'B', type_correction: null, element_claims: [],
      findings: [{ principle: 6, section: 'Traits', entry: 'Dread Hide', span: SPAN, issue: 'Not worth its action.' }] });
    expect(verifyAuditFindings(monster({ freeRow: true }), noLabel)).toHaveLength(1);
    expect(verifyAuditFindings(monster({ print: true }), noLabel)).toHaveLength(0);
  });

  test('a high-confidence finding is kept on every kind of row, as before', () => {
    for (const over of [{ freeRow: true }, { print: true }, { template: 'phobia' }, {}]) {
      expect(verifyAuditFindings(monster(over), answer('high'))).toHaveLength(1);
    }
  });

  test('the finding carries its principle, and the fix call turns it into an instruction', () => {
    const [f] = verifyAuditFindings(monster({ freeRow: true }), answer('medium', 5));
    expect(f.principle).toBe(5);
    const p = buildFreeRowFixPrompt({ name: 'X', inline: 'Small Beast', cr: 1, sheet: 'S', row: { name: 'Dread Hide', text: 't' }, problems: [f.message], principles: [f.principle] });
    expect(p).toMatch(/WHAT KIND OF DEFECT THAT IS/);
    expect(p).toMatch(/SPLIT it/);                       // 5 = two-in-one
    expect(p).not.toMatch(/Give it the payload it lacks/); // not 6
  });

  test('each class gives its own instruction, and no class gives none', () => {
    const forP = (n) => buildFreeRowFixPrompt({ name: 'X', inline: 'y', cr: 1, sheet: 'S', row: { name: 'R', text: 't' }, problems: ['x'], principles: [n] });
    expect(forP(1)).toMatch(/COUNTERPLAY/);
    expect(forP(2)).toMatch(/Name the thing the GM cannot find/);
    expect(forP(3)).toMatch(/Prefer keeping the NAME/);
    expect(forP(6)).toMatch(/pays for the action it costs/);
    expect(forP(7)).toMatch(/the fiction decides the mechanic/);
    expect(forP(99)).not.toMatch(/WHAT KIND OF DEFECT THAT IS/); // an unknown number adds nothing
  });
});
