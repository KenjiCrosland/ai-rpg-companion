// WHAT A PRINT NAME'S TAIL NAMES — labelled once instead of inferred (audit,
// 2026-10-15). ROLE_HEAD and JOB_TAIL absorbed nineteen commits between them,
// the most-patched lines in the engine, and no word rule can be right anyway:
// the same tail is a post in one name and a kind in another. These pins hold the
// label table, the three corrections it makes, and — the one that matters for
// churn — that a NEW print name is a data edit, not a code patch.
import { tailNamesKind, POSTS } from '../print-names.mjs';
import { printCanonFor } from '../generate.mjs';
import printBlocks from '@/data/srd52-monsters.json';

const ALL = Array.isArray(printBlocks) ? printBlocks : Object.values(printBlocks).flat();
const TWO_WORD = [...new Set(ALL.map((m) => String(m.name ?? '').trim()).filter((n) => n.split(/\s+/).length === 2))];

describe('the label table', () => {
  test('every two-word print name is labelled — a new one fails here, not in a bug report', () => {
    // the whole point of the landing: the corpus growing is a DATA edit. If this
    // fails, label the name in print-names.mjs; do not patch a regex.
    expect(TWO_WORD).toHaveLength(119);
    for (const n of POSTS) expect(TWO_WORD.map((x) => x.toLowerCase())).toContain(n);
  });

  test('a tail that names the kind: a GM who types the tail finds the creature', () => {
    for (const n of ['Brown Bear', 'Polar Bear', 'Fire Giant', 'Hill Giant', 'Green Hag', 'Bone Devil', 'Iron Golem', 'Dust Mephit', 'Water Elemental', 'Dire Wolf', 'Phase Spider', 'Reef Shark']) {
      expect(tailNamesKind(n)).toBe(true);
    }
  });

  test('a tail that is a post: the creature holds it, and anyone could', () => {
    for (const n of ['Goblin Boss', 'Goblin Minion', 'Azer Sentinel', 'Bugbear Warrior', 'Centaur Trooper', 'Hobgoblin Captain', 'Kobold Warrior', 'Mummy Lord', 'Sahuagin Warrior']) {
      expect(tailNamesKind(n)).toBe(false);
    }
  });

  test("print's own NPC families keep their tails — the head is the role", () => {
    for (const n of ['Warrior Veteran', 'Warrior Infantry', 'Guard Captain', 'Bandit Captain', 'Pirate Captain', 'Priest Acolyte', 'Cultist Fanatic', 'Tough Boss']) {
      expect(tailNamesKind(n)).toBe(true);
    }
  });

  test('THE CASE NO WORD RULE CAN STATE: one tail, two answers', () => {
    expect(tailNamesKind('Bugbear Stalker')).toBe(false); // a bugbear holding a post
    expect(tailNamesKind('Invisible Stalker')).toBe(true); // its kind IS stalker — the elemental the word names
  });

  test('a creature head does not make the tail a post', () => {
    expect(tailNamesKind('Ogre Zombie')).toBe(true); // it IS a zombie
    expect(tailNamesKind('Warhorse Skeleton')).toBe(true); // it IS a skeleton
  });

  test('the three corrections the regexes could not express', () => {
    expect(tailNamesKind('Merfolk Skirmisher')).toBe(false); // a skirmisher is no kind of merfolk — "skirmisher" was simply missing from JOB_TAIL
    expect(tailNamesKind('Troll Limb')).toBe(false); // a limb is not a creature
    expect(tailNamesKind('Invisible Stalker')).toBe(true); // the other direction
  });

  test('a one-word name has no tail to judge', () => {
    for (const n of ['Goblin', 'Owlbear', 'Mimic', '']) expect(tailNamesKind(n)).toBe(true);
  });
});

describe('the gate it feeds behaves as it did', () => {
  test('a post tail never draws the block, the whole name still does', () => {
    expect(printCanonFor('a bulwark-sworn sentinel with a broken greatsword and a battered shield', 7)).toBeNull();
    expect(printCanonFor('an azer sentinel', 2)?.name).toBe('Azer Sentinel');
  });

  test("print's NPC families still answer their tail word", () => {
    expect(printCanonFor('a hardened veteran of the border wars', 3)?.name).toBe('Warrior Veteran');
    expect(printCanonFor('a guard captain of the dusk watch', 4)?.name).toBe('Guard Captain');
  });

  test('a creature tail still answers: "a bear" is a bear', () => {
    expect(printCanonFor('a bear', 2)?.name).toMatch(/Bear$/);
    expect(printCanonFor('a dire wolf that hunts in a pack', 3)?.name).toBe('Dire Wolf');
  });

  test('the corrections hold at the gate too', () => {
    expect(printCanonFor('a reef-born skirmisher who harries the shallows', 2)).toBeNull(); // no longer the Merfolk Skirmisher
    expect(printCanonFor('a severed limb that still twitches', 1)).toBeNull(); // no longer the Troll Limb
  });
});

describe('the freeze is checked, not asserted', () => {
  // The old rules, re-derived here from the code they were deleted from. The
  // table must equal their verdict apart from the three named corrections —
  // this is what caught Vampire Familiar and Vampire Spawn being dropped.
  const GENERIC_HEAD = new Set(['lord', 'lady', 'king', 'queen', 'prince', 'princess', 'child', 'elder', 'master', 'mistress', 'boss', 'chief', 'spawn', 'familiar', 'warrior', 'infantry', 'veteran', 'general', 'captain']);
  const ROLE_HEAD = /^(?:warrior|guard|bandit|cultist|pirate|priest|tough|noble|commoner|scout|spy|mage|archer|soldier|veteran|infantry|knight)$/i;
  const JOB_TAIL = new Set([...GENERIC_HEAD, 'sentinel', 'minion', 'trooper', 'fanatic', 'acolyte', 'stalker', 'guard', 'scout', 'spy', 'sergeant', 'champion']);
  const oldRule = (n) => { const ws = n.toLowerCase().split(' '); return ws.length < 2 || !JOB_TAIL.has(ws.at(-1)) || ROLE_HEAD.test(ws[0]); };

  const CORRECTIONS = new Set(['merfolk skirmisher', 'troll limb', 'invisible stalker']);

  test('every print name reads the same as before, except the three corrections', () => {
    const drift = TWO_WORD.filter((n) => tailNamesKind(n) !== oldRule(n)).map((n) => n.toLowerCase()).sort();
    expect(drift).toEqual([...CORRECTIONS].sort());
  });

  test('and the corrections really do flip', () => {
    for (const n of ['Merfolk Skirmisher', 'Troll Limb']) { expect(oldRule(n)).toBe(true); expect(tailNamesKind(n)).toBe(false); }
    expect(oldRule('Invisible Stalker')).toBe(false); expect(tailNamesKind('Invisible Stalker')).toBe(true);
  });
});

// A HYBRID ROW IS STILL THE MELEE ROW — found by branch-printnames 02
// (2026-10-15), pre-existing and unrelated to the labelling, surfaced because
// the corrected label stopped that concept borrowing a print body and routed it
// through the library seed instead.
describe('{melee_name} on a sheet whose only melee row is thrown', () => {
  const { generateReskin, renameKeysOf } = require('../generate.mjs');
  const { pickDonor, scaleDonor } = require('../scale.mjs');

  test('a template that names an attack row never prints the literal default', async () => {
    const scaled = scaleDonor(pickDonor(4, null, 'skirmisher'), 4, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Barbed Spear${i ? ` ${i}` : ''}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const answer = JSON.stringify({ name: 'Reef Spine Stalker', type: 'Monstrosity', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
    const m = await generateReskin({ cr: 4, concept: 'a reef-born skirmisher who harries the shallows with a barbed spear', mechanics: ['thrown-weapon'], archetype: 'skirmisher' }, async () => answer);
    const rows = Object.values(m.sections).flat();
    const names = rows.filter((e) => /Attack Roll/.test(e.text ?? '')).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
    // every attack a row's text says it makes must be a row that exists
    for (const e of rows) {
      const ref = /makes one ([A-Z][\w' -]*?) attack/.exec(e.text ?? '');
      if (ref) expect(names).toContain(ref[1]);
    }
  });
});
