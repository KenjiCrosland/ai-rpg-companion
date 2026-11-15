/**
 * A KOBOLD IS A KOBOLD FIRST, WITH MAGE FEATURES (owner's ruling C, 2026-11-15).
 *
 * "Kobold sorcerer" and "goblin wizard" both shipped as the Mage — Small Humanoid, the Mage's
 * own scores, no darkvision, nothing of the people but a language and a flavour trait. The
 * people's-body fill existed, but it needed the call to NAME the people as a species with a
 * receipt, and on those sheets the call named a class and no species at all. Measured earlier,
 * "goblin wizard" kept its body on 7 of 10, 5 of 10 and 0 of 5 rolls.
 *
 * So the fill no longer depends on that answer: when the call names a class and no body and the
 * HEAD CLAUSE names exactly one declared people, that people's printed block is the body.
 */
import { readPath, dispatch, FEY_PEOPLES, OFF_TYPE_PEOPLES, namesInTheWords } from '../path.mjs';

const raw = (o = {}) => JSON.stringify({ assembly: 'class_npc', print_body: null, print_body_receipt: null, relation: null, species: null, species_receipt: null, class: null, class_receipt: null, title: null, ...o });
const decide = (concept, o) => { const read = readPath(raw(o), { concept }); return { read, d: dispatch({ name: '', concept }, read) }; };

describe('the fill, with a class and no species answered', () => {
  test.each([
    ['kobold sorcerer', 'mage', 'sorcerer', 'Kobold Warrior'],
    ['goblin wizard', 'mage', 'wizard', 'Goblin Warrior'],
    ['goblin assassin', 'rogue', 'assassin', 'Goblin Warrior'],
    ['bugbear monk', 'monk', 'monk', 'Bugbear Warrior'],
  ])('"%s" stands on the %s\'s body', (concept, cls, receipt, body) => {
    const { read, d } = decide(concept, { class: cls, class_receipt: receipt });
    expect(read.print_body).toBe(body);
    expect(read.relation).toBe('is');
    expect(d).toMatchObject({ path: 'class_npc', print_body: body, class: cls });
  });

  test.each([
    ['a wizard who hunts goblins', 'mage', 'wizard', 'the people is not in the head clause'],
    ['a goblin and a hobgoblin, both clerics', 'cleric', 'clerics', 'the words name two peoples'],
    ['elf ranger', 'ranger', 'ranger', 'print carries no elf block'],
  ])('"%s" fills nothing — %s', (concept, cls, receipt) => {
    expect(decide(concept, { class: cls, class_receipt: receipt }).read.print_body).toBeNull();
  });

  test('a body the call DID name is never overridden', () => {
    const { read } = decide('kobold sorcerer', { print_body: 'Mage', print_body_receipt: 'sorcerer', relation: 'is', class: 'mage', class_receipt: 'sorcerer' });
    expect(read.print_body).toBe('Mage');
  });

  test('with no class answered the fill does not fire', () => {
    expect(decide('kobold sorcerer', {}).read.print_body).toBeNull();
  });
});

describe('the declared peoples, and nothing else', () => {
  test('a job block in the words is not a people — the Assassin is not filled', () => {
    // "goblin assassin" names the Goblin Warrior AND print's Assassin; only the first is a people
    const found = namesInTheWords('goblin assassin', { peoples: true }).map((h) => h.name);
    expect(found).toEqual(expect.arrayContaining(['Goblin Warrior', 'Assassin']));
    expect(decide('goblin assassin', { class: 'rogue', class_receipt: 'assassin' }).read.print_body).toBe('Goblin Warrior');
  });

  test('every declared people is a real block the finder can reach by its own name', () => {
    // by FULL name: the alias table resolves a bare "goblin" to one block, the Goblin Warrior,
    // so the Boss and the Minion are reachable only when the words name them outright
    for (const n of [...FEY_PEOPLES, ...OFF_TYPE_PEOPLES]) {
      expect(namesInTheWords(`${n} wizard`, { peoples: true }).map((h) => h.name)).toContain(n);
    }
  });

  test('a bare people word resolves to the one block the alias table names', () => {
    for (const [word, block] of [['goblin', 'Goblin Warrior'], ['kobold', 'Kobold Warrior'], ['hobgoblin', 'Hobgoblin Warrior'], ['bugbear', 'Bugbear Warrior']]) {
      expect(decide(`${word} wizard`, { class: 'mage', class_receipt: 'wizard' }).read.print_body).toBe(block);
    }
  });

  test('the finder still offers MONSTERS ONLY by default — ruling C does not widen the names arm', () => {
    expect(namesInTheWords('goblin wizard').filter((h) => /Goblin/.test(h.name))).toEqual([]);
    expect(namesInTheWords('goblin wizard', { peoples: true }).some((h) => /Goblin/.test(h.name))).toBe(true);
  });
});
