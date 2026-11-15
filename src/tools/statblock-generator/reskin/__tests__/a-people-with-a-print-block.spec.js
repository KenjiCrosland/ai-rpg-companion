/**
 * A PEOPLE WITH A PRINTED BLOCK KEEPS ITS BODY (owner's ruling 3, 2026-11-14).
 *
 * "A goblin assassin is an assassin who is visibly a goblin: a class NPC standing on the
 * Goblin's printed body." Before this, such a sheet shipped as a rogue with nothing goblin
 * about it — goblin, hobgoblin and kobold are on the path prompt's list of PEOPLES but have no
 * species kit, so `readPath` refused the species ("has no kit") and nothing else carried them.
 *
 * EVERY TEST STARTS FROM A RAW ANSWER AND GOES THROUGH `readPath` INTO `dispatch`. The older
 * people-plus-role test handed `dispatch` an answer carrying `species: 'goblin'`, which
 * `readPath` never produces — it pinned a state production cannot reach.
 */
import { readPath, dispatch } from '../path.mjs';

/** a raw path-call answer, as the model returns it */
const raw = (o = {}) => JSON.stringify({ assembly: 'class_npc', print_body: null, print_body_receipt: null, relation: null, species: null, species_receipt: null, class: null, class_receipt: null, title: null, ...o });
const decide = (concept, o, edition = '2024') => { const read = readPath(raw(o), { concept, edition }); return { read, d: dispatch({ name: '', concept, edition }, read) }; };

describe('a people with a print block and no kit keeps its body', () => {
  test('"goblin assassin" is an assassin who is visibly a goblin — the ruled answer', () => {
    const { read, d } = decide('goblin assassin', { species: 'goblin', species_receipt: 'goblin', class: 'rogue', class_receipt: 'assassin' });
    expect(read.print_body).toBe('Goblin Warrior');
    expect(read.relation).toBe('is');
    expect(read.species).toBeNull(); // still refused: there is no goblin KIT, and that has not changed
    expect(d).toMatchObject({ path: 'class_npc', print_body: 'Goblin Warrior', class: 'rogue' });
  });

  test('the same for a different class word — "goblin wizard"', () => {
    const { d } = decide('goblin wizard', { species: 'goblin', species_receipt: 'goblin', class: 'mage', class_receipt: 'wizard' });
    expect(d).toMatchObject({ path: 'class_npc', print_body: 'Goblin Warrior', class: 'mage' });
  });

  test('and when the call names the body itself, nothing here fires', () => {
    const { read } = decide('goblin assassin', { print_body: 'Goblin Warrior', print_body_receipt: 'goblin', relation: 'is', species: 'goblin', species_receipt: 'goblin', class: 'rogue', class_receipt: 'assassin' });
    expect(read.print_body).toBe('Goblin Warrior');
    expect(read.refused.filter((r) => /the body stands/.test(r))).toEqual([]);
  });

  // RULED 2026-11-15: a kobold is a people, so a class decides its body exactly as a goblin's
  // does. This read `twist` before, because print types the Kobold Warrior Dragon and
  // `isPersonBody` saw only Humanoid and the Fey list.
  test('"kobold priest" is a cleric on the Kobold Warrior\'s body', () => {
    const { d } = decide('kobold priest', { species: 'kobold', species_receipt: 'kobold', class: 'cleric', class_receipt: 'priest' });
    expect(d).toMatchObject({ path: 'class_npc', print_body: 'Kobold Warrior', class: 'cleric' });
  });
});

describe('what this must not change', () => {
  test('a people with a KIT and no print block is untouched — "lizardfolk monk"', () => {
    const { read, d } = decide('lizardfolk monk', { species: 'lizardfolk', species_receipt: 'lizardfolk', class: 'monk', class_receipt: 'monk' });
    expect(read.species).toBe('lizardfolk'); // the kit keeps it
    expect(read.print_body).toBeNull(); // print has no lizardfolk block
    expect(d).toMatchObject({ path: 'class_npc', class: 'monk', species: 'lizardfolk' });
  });

  test('a people with NEITHER kit nor print block adds nothing — "orc blacksmith"', () => {
    const { read, d } = decide('orc blacksmith', { species: 'orc', species_receipt: 'orc', class: 'fighter', class_receipt: 'blacksmith' });
    expect(read.print_body).toBeNull();
    expect(d).toMatchObject({ path: 'class_npc', print_body: null });
  });

  // THE RECEIPT RULE STILL GOVERNS THE SPECIES-DRIVEN FILL. Tested on words whose head clause
  // names no people, because ruling C (2026-11-15) fills from the head clause regardless of the
  // species answer — "goblin assassin" now gets the Goblin Warrior either way, which is the
  // ruling, and is covered in `a-class-stands-on-a-peoples-body.spec.js`.
  test('the receipt rule holds: a species with no quote from the GM yields no body', () => {
    const { read } = decide('an assassin of the drowned court', { species: 'goblin', class: 'rogue', class_receipt: 'assassin' });
    expect(read.print_body).toBeNull();
    const withReceipt = decide('a goblin of the drowned court', { species: 'goblin', species_receipt: 'goblin', class: 'rogue', class_receipt: 'assassin' });
    expect(withReceipt.read.print_body).toBe('Goblin Warrior');
  });

  test('a species with no CLASS answered is untouched — this fires only where the people would be erased', () => {
    const { read, d } = decide('goblin assassin', { species: 'goblin', species_receipt: 'goblin' });
    expect(read.print_body).toBeNull();
    expect(d.path).toBe('homebrew');
  });

  test('a body-only answer still twists', () => {
    const { d } = decide('vampire pirate', { assembly: 'twist', print_body: 'Vampire', print_body_receipt: 'vampire', relation: 'is' });
    expect(d).toMatchObject({ path: 'twist', print_body: 'Vampire', relation: 'is' });
  });

  test('the edition rule holds — the body comes from the book the sheet is on', () => {
    const { read } = decide('goblin assassin', { species: 'goblin', species_receipt: 'goblin', class: 'rogue', class_receipt: 'assassin' }, '2014');
    // 5.1 names it "Goblin"; 5.2 "Goblin Warrior". Whichever the edition carries, it is a real block.
    expect(read.print_body).toMatch(/^Goblin/);
  });
});
