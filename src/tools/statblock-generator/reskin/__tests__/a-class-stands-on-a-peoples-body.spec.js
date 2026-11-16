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

  // SUPERSEDED BY FIX C (2026-11-15). This read "a body the call DID name is never overridden",
  // and the body it used as the example was the Mage — which is precisely the answer fix C now
  // overrules, because a JOB yields to a PEOPLE. What survives of the original rule is that a
  // MONSTER the call names still stands; that is the second case below and the limits in
  // "a named people wins over a job block".
  test('a MONSTER the call named is never overridden', () => {
    const { read } = decide('kobold riding an owlbear', { print_body: 'Owlbear', print_body_receipt: 'owlbear', relation: 'is', class: 'mage', class_receipt: 'kobold' });
    expect(read.print_body).toBe('Owlbear');
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

describe('the mirror: the body is named and the class is missed (fix 3, 2026-11-15)', () => {
  // "Kobold sorcerer" shipped as a plain kobold with a Dagger and nothing answering "sorcerer":
  // the call named the body and dropped the class, about one roll in six. Ruling C's fill covers
  // the opposite miss. The class words are the closed table `classes.mjs` already owns.
  const body = (b) => ({ assembly: 'twist', print_body: b, print_body_receipt: b.split(' ')[0].toLowerCase(), relation: 'is' });

  test.each([['kobold sorcerer', 'Kobold Warrior', 'mage'], ['goblin priest', 'Goblin Warrior', 'cleric']])(
    '"%s" fills the class and lands class_npc on the people', (concept, block, cls) => {
      const { read, d } = decide(concept, body(block));
      expect(read.class).toBe(cls);
      expect(d).toMatchObject({ path: 'class_npc', print_body: block, class: cls });
    },
  );

  test('no class word in the head clause fills nothing', () => {
    const { read, d } = decide("a kobold who guards a wizard's tower", body('Kobold Warrior'));
    expect(read.class).toBeNull();
    expect(d.path).toBe('twist');
  });

  test('two class words fill nothing', () => {
    expect(decide('kobold sorcerer and bard', body('Kobold Warrior')).read.class).toBeNull();
  });

  test('a class the call DID name is never overridden', () => {
    const { read } = decide('kobold sorcerer', { ...body('Kobold Warrior'), class: 'rogue', class_receipt: 'sorcerer' });
    expect(read.class).toBe('rogue');
  });

  // THE WHOLE PRINTED NAME WINS FIRST. "kobold warrior" is the exact block by code, and
  // "warrior" is one of the fighter's keys — so the fill must not reach for it.
  test('"kobold warrior" stays the exact printed block with no class', () => {
    const { read, d } = decide('kobold warrior', body('Kobold Warrior'));
    expect(read.class).toBeNull();
    expect(d).toMatchObject({ path: 'exact', print_body: 'Kobold Warrior' });
  });

  test('a body that is not a declared people fills nothing', () => {
    const { read } = decide('ogre sorcerer', { assembly: 'twist', print_body: 'Ogre', print_body_receipt: 'ogre', relation: 'is' });
    expect(read.class).toBeNull();
  });
});

describe('a named people wins over a job block (fix C, 2026-11-15)', () => {
  // The path probe on "kobold sorcerer" read 9 of 10. On the miss the call answered the MAGE as
  // the body: the class was right and the kobold was lost, about one roll in twenty. The receipt
  // check cannot catch it — a receipt only has to be a SPAN of the GM's words, and "sorcerer" is
  // a true span of "kobold sorcerer" that says nothing about the Mage.
  const job = (body, receipt, concept, cls = 'mage') => decide(concept, { print_body: body, print_body_receipt: receipt, relation: 'is', class: cls, class_receipt: receipt });

  test.each([
    ['Mage', 'sorcerer', 'kobold sorcerer', 'Kobold Warrior'],
    ['Priest', 'priest', 'goblin priest', 'Goblin Warrior'],
    ['Assassin', 'assassin', 'goblin assassin', 'Goblin Warrior'],
  ])('the call answered %s for "%s" — the people takes the body', (body, receipt, concept, want) => {
    const { read, d } = job(body, receipt, concept);
    expect(read.print_body).toBe(want);
    expect(read.relation).toBe('is');
    expect(d).toMatchObject({ path: 'class_npc', print_body: want });
  });

  test('the class the call gave is untouched when the body yields', () => {
    expect(job('Mage', 'sorcerer', 'kobold sorcerer', 'rogue').read.class).toBe('rogue');
  });

  test('the receipt becomes the quote that names the PEOPLE, not the job', () => {
    expect(job('Mage', 'sorcerer', 'kobold sorcerer').read.receipts.print_body).toMatch(/kobold/i);
  });

  test('a fill says so on the notes channel, not as a refusal', () => {
    const { read } = job('Mage', 'sorcerer', 'kobold sorcerer');
    expect(read.notes.join(' ')).toMatch(/job print types Humanoid/);
    expect(read.refused.join(' ')).not.toMatch(/job print types Humanoid/);
  });

  // THE LIMITS.
  test('no people in the head clause and the job stands', () => {
    expect(job('Mage', 'sorcerer', 'a sorcerer who keeps kobolds').read.print_body).toBe('Mage');
  });

  test('two peoples in the words change nothing', () => {
    expect(job('Mage', 'sorcerer', 'a goblin and a kobold, both sorcerers').read.print_body).toBe('Mage');
  });

  test('a MONSTER body does not yield', () => {
    expect(job('Owlbear', 'kobold', 'kobold riding an owlbear').read.print_body).toBe('Owlbear');
  });

  test("a people's own body does not yield to itself", () => {
    const { read } = job('Kobold Warrior', 'kobold', 'kobold sorcerer');
    expect(read.print_body).toBe('Kobold Warrior');
  });

  test('relation "resembles" does not yield — only a body the creature IS', () => {
    const { read } = decide('kobold sorcerer', { print_body: 'Mage', print_body_receipt: 'sorcerer', relation: 'resembles', class: 'mage', class_receipt: 'sorcerer' });
    expect(read.print_body).toBe('Mage');
  });
});

describe("the body is the species (fix B, 2026-11-15)", () => {
  // Sheet 03 of the six: `class_npc — Kobold Warrior (is) — class mage — species lizardfolk`. It
  // shipped Medium, with Hold Breath, Marsh Stride and a swim speed on top of the kobold's own
  // Pack Tactics and Sunlight Sensitivity. The call had answered lizardfolk — its nearest kit for
  // a scaled people — and the kit was applied although the body already said what it was.
  test('a species answered beside a declared people is dropped', () => {
    const { read, d } = decide('kobold sorcerer', {
      print_body: 'Kobold Warrior', print_body_receipt: 'kobold', relation: 'is',
      species: 'lizardfolk', species_receipt: 'kobold', class: 'mage', class_receipt: 'sorcerer',
    });
    expect(read.print_body).toBe('Kobold Warrior');
    expect(read.species).toBeNull();
    expect(read.receipts.species).toBeUndefined();
    expect(d.species).toBeNull();
    expect(read.notes.join(' ')).toMatch(/a people's own printed body is its species/);
  });

  test('it drops after fix C has moved the body to the people', () => {
    const { read } = decide('kobold sorcerer', {
      print_body: 'Mage', print_body_receipt: 'sorcerer', relation: 'is',
      species: 'lizardfolk', species_receipt: 'kobold', class: 'mage', class_receipt: 'sorcerer',
    });
    expect(read.print_body).toBe('Kobold Warrior');
    expect(read.species).toBeNull();
  });

  test('a species with NO body is kept — that is the case the kit exists for', () => {
    const { read } = decide('lizardfolk monk', { species: 'lizardfolk', species_receipt: 'lizardfolk', class: 'monk', class_receipt: 'monk' });
    expect(read.species).toBe('lizardfolk');
    expect(read.print_body).toBeNull();
  });

  test('a species beside a MONSTER body is kept — only a declared people is the species', () => {
    const { read } = decide('lizardfolk riding an owlbear', {
      print_body: 'Owlbear', print_body_receipt: 'owlbear', relation: 'is',
      species: 'lizardfolk', species_receipt: 'lizardfolk', class: 'ranger', class_receipt: 'ranger',
    });
    expect(read.print_body).toBe('Owlbear');
    expect(read.species).toBe('lizardfolk');
  });
});
