/**
 * WHO IS A PERSON (owner's ruling, 2026-11-14).
 *
 * "A creature is not a person if its identity is inseparable from its abilities. Goblins can
 * do all sorts of things; hags are limited." So a goblin is a people and takes a class; a hag
 * is a monster and a job word rides on her. For a person the class decides the body; for a
 * monster the body stands and a class, if there is one, sits on top.
 *
 * `isPersonBody` called every Humanoid AND every Fey block a person, which ranked a hag below
 * a class word — half of why "Mother Ash | hag midwife" shipped as a Priest on four saved rolls.
 *
 * The 2024 book files the goblinoids and the hags under ONE type, Fey, so the type cannot
 * carry the ruling. A declared list of the Fey blocks that are peoples does, and the first
 * test below is what keeps it honest: the list must PARTITION the Fey type exactly, so a Fey
 * block added to the corpus fails here instead of silently defaulting either way.
 */
import PRINT from '@/data/srd52-monsters.json';
import { isPersonBody, FEY_PEOPLES, readPath, dispatch } from '../path.mjs';

const BLOCKS = Array.isArray(PRINT) ? PRINT : Object.values(PRINT);
const feyBlocks = BLOCKS.filter((b) => /^Fey\b/i.test(String(b?.type ?? ''))).map((b) => b.name);

const raw = (o) => JSON.stringify({ assembly: 'class_npc', print_body: null, relation: null, species: null, class: null, title: null, ...o });
const decide = (concept, o) => dispatch({ name: '', concept }, readPath(raw(o), { concept }));

describe('the list is a fact about the blocks, and a complete one', () => {
  test('every name on the list is a real Fey block', () => {
    for (const n of FEY_PEOPLES) expect(feyBlocks).toContain(n);
  });

  // THE ONE THAT KEEPS IT HONEST. 15 Fey blocks, 9 peoples and 6 monsters, all accounted for.
  // A new Fey block in the corpus fails here and gets a decision, rather than defaulting.
  test('the list PARTITIONS the Fey type — nothing is unaccounted for', () => {
    const monsters = feyBlocks.filter((n) => !FEY_PEOPLES.includes(n));
    expect(FEY_PEOPLES).toHaveLength(9);
    expect(monsters.sort()).toEqual(['Blink Dog', 'Dryad', 'Green Hag', 'Sea Hag', 'Sprite', 'Worg']);
    expect(FEY_PEOPLES.length + monsters.length).toBe(feyBlocks.length);
  });

  test('the ruling, block by block', () => {
    for (const n of ['Goblin Warrior', 'Goblin Boss', 'Goblin Minion', 'Hobgoblin Warrior', 'Hobgoblin Captain', 'Bugbear Warrior', 'Bugbear Stalker', 'Centaur Trooper']) expect(isPersonBody(n)).toBe(true);
    for (const n of ['Green Hag', 'Sea Hag', 'Dryad', 'Blink Dog', 'Worg', 'Sprite']) expect(isPersonBody(n)).toBe(false);
    // a fiend is a monster that can carry a class on top of its abilities
    for (const n of ['Gnoll Warrior', 'Sahuagin Warrior']) expect(isPersonBody(n)).toBe(false);
  });

  test('every Humanoid block is still a person', () => {
    for (const b of BLOCKS.filter((x) => /^Humanoid\b/i.test(String(x?.type ?? '')))) expect(isPersonBody(b.name)).toBe(true);
  });

  // NOT RULED, pinned so a later change to either is deliberate rather than incidental.
  test('the Satyr and the Kobold Warrior are deliberately unchanged', () => {
    expect(isPersonBody('Satyr')).toBe(true); // Fey, on the list, a person today and left one
    expect(isPersonBody('Kobold Warrior')).toBe(false); // print types it Dragon
  });
});

describe('what it changes at the routing decision', () => {
  test('a class word with a HAG named as itself is now a twist, with the class riding', () => {
    const d = decide('hag midwife', { print_body: 'Green Hag', print_body_receipt: 'hag', relation: 'is', class: 'cleric', class_receipt: 'midwife' });
    expect(d).toMatchObject({ path: 'twist', print_body: 'Green Hag', class: 'cleric' });
  });

  test('a class word with a GOBLIN is unchanged — the class still decides the body', () => {
    const d = decide('goblin assassin', { print_body: 'Goblin Warrior', print_body_receipt: 'goblin', relation: 'is', class: 'rogue', class_receipt: 'assassin' });
    expect(d).toMatchObject({ path: 'class_npc', print_body: 'Goblin Warrior', class: 'rogue' });
  });

  test('a Humanoid block is unchanged — a priest keeps the class path', () => {
    const d = decide('a temple priest who duels', { print_body: 'Priest', print_body_receipt: 'priest', relation: 'is', class: 'cleric', class_receipt: 'priest' });
    expect(d.path).toBe('class_npc');
  });

  test('a monster with no class word is a twist either way', () => {
    expect(decide('hag midwife', { assembly: 'twist', print_body: 'Green Hag', print_body_receipt: 'hag', relation: 'is' })).toMatchObject({ path: 'twist', print_body: 'Green Hag' });
  });
});
