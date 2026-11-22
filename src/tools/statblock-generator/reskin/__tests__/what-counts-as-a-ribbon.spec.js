/**
 * THE RIBBON VALIDATOR, OVER PRINT AND OVER THIS BRANCH.
 *
 * Print is the gate. If the validator refuses a printed trait in one of the eight families, the
 * rule is wrong, not the trait — the same discipline as every other gate on this branch.
 *
 * The print text is quoted from src/data/srd52-monsters.json, read at test time rather than pasted,
 * so a corpus change cannot leave the test asserting a sentence print no longer carries.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ribbonRefusal, isRibbon, RIBBON_FAMILIES } from '../ribbon.mjs';

const CORPUS = JSON.parse(readFileSync(path.resolve('src/data/srd52-monsters.json'), 'utf8'));
const printTrait = (creature, row) => {
  const m = CORPUS.find((x) => x.name === creature);
  if (!m) throw new Error(`no ${creature} in the corpus`);
  const t = (m.sections?.Traits ?? []).find((x) => x.name === row);
  if (!t) throw new Error(`${creature} has no ${row}`);
  return t.text;
};

describe('the eight families each have print\'s row as their example', () => {
  it('names eight families, each with a key, a label and an example', () => {
    expect(RIBBON_FAMILIES).toHaveLength(8);
    for (const f of RIBBON_FAMILIES) {
      expect(f.key).toMatch(/^[a-z-]+$/);
      expect(f.label.length).toBeGreaterThan(4);
      expect(f.example).toMatch(/: /); // "Creature, Row: the text"
    }
  });

  // Every example the ask will show the model must itself pass the validator, or the ask teaches
  // the model to write something the validator then refuses.
  it.each(RIBBON_FAMILIES.map((f) => [f.key, f.example]))('%s — its own example is a ribbon', (_key, example) => {
    const sentence = example.slice(example.indexOf(': ') + 2);
    expect(ribbonRefusal(sentence)).toBeNull();
  });
});

describe('it accepts every printed trait in the eight families', () => {
  const PRINTED = [
    ['senses', 'Rust Monster', 'Iron Scent'],
    ['sheds', 'Azer Sentinel', 'Illumination'],
    ['moves', 'Earth Elemental', 'Earth Glide'],
    ['moves', 'Giant Spider', 'Web Walker'],
    ['speaks', 'Green Hag', 'Mimicry'],
    ['speaks', 'Dryad', 'Speak with Beasts and Plants'],
    ['hides', 'Sphinx of Lore', 'Inscrutable'],
    ['hides', 'Gelatinous Cube', 'Transparent'],
    ['taboo', 'Sahuagin Warrior', 'Limited Amphibiousness'],
    ["taboo", "Will-o'-Wisp", 'Ephemeral'],
    ['bound', 'Homunculus', 'Telepathic Bond'],
    ['bound', 'Vampire Familiar', 'Vampiric Connection'],
    ['leaves-at-death', 'Troll Limb', 'Troll Spawn'],
  ];

  it.each(PRINTED)('%s — the %s\'s %s', (_family, creature, row) => {
    expect(ribbonRefusal(printTrait(creature, row))).toBeNull();
  });

  // Why length is not checked. Print's own row for the eighth family is four sentences.
  it("Troll Spawn is four sentences and print still prints it", () => {
    const text = printTrait('Troll Limb', 'Troll Spawn');
    expect(text.split(/(?<=\.)\s+/).length).toBeGreaterThan(2);
    expect(isRibbon(text)).toBe(true);
  });

  // Mimicry and Transparent carry a DC. A number is allowed as the DC of an ability check.
  it.each([['Green Hag', 'Mimicry'], ['Gelatinous Cube', 'Transparent']])(
    "the %s's %s keeps its ability-check DC", (creature, row) => {
      const text = printTrait(creature, row);
      expect(text).toMatch(/DC \d+/);
      expect(ribbonRefusal(text)).toBeNull();
    });

  // Inscrutable is the reason Advantage is read per sentence rather than banned outright.
  it("Inscrutable's Disadvantage is on an Insight check, so it stands", () => {
    const text = printTrait('Sphinx of Lore', 'Inscrutable');
    expect(text).toMatch(/Disadvantage/);
    expect(ribbonRefusal(text)).toBeNull();
  });
});

describe('it refuses the three printed rows that have a price', () => {
  it('Pack Tactics — for the Advantage on an attack roll', () => {
    expect(ribbonRefusal(printTrait('Hobgoblin Warrior', 'Pack Tactics')))
      .toBe('it gives Advantage or Disadvantage on an attack roll');
  });

  it("the Azer's Fire Aura — for the damage", () => {
    expect(ribbonRefusal(printTrait('Azer Sentinel', 'Fire Aura'))).toBe('it does damage');
  });

  it("the Ghoul's Claw — because it is an attack", () => {
    const ghoul = CORPUS.find((m) => m.name === 'Ghoul');
    const claw = ghoul.sections.Actions.find((a) => a.name === 'Claw');
    expect(ribbonRefusal(claw.text)).toBe('it is an attack');
  });
});

describe('on sentences from this branch', () => {
  // Quoted from the idea call on sheet 11 of the forty, as the blocks file carries it
  // (BLOCKS-the-forty-after-soundness-2026-11-21.md, "signature idea (trait)"). This is the FIRST
  // Briar Blood — the trait that put Poisoned on any melee attacker with no saving throw. The
  // owner's words moved it to a Reaction with a save; the validator refuses the version it replaced.
  const BRIAR_BLOOD_FIRST = 'Briar Blood. When the vampire takes damage from a melee weapon, its '
    + 'veins split the skin in a spray of thorn and black blood; the attacker is Splattered — it has '
    + 'the Poisoned condition as briar-dust-laced blood burns into its wounds until the end of its '
    + 'next turn.';

  // Quoted from the idea call on Halric (BLOCKS-air-elemental-2026-11-18.md, "signature idea (trait)").
  const HALRIC_SENSES_THE_GUILTY = "Halric's senses are bent toward the guilty: he knows the "
    + 'direction and rough distance of any creature that has harmed another creature since his last '
    + 'long rest, slipping through the dusk toward it as though following a scent only he can smell.';

  it("refuses the Vampire's first Briar Blood", () => {
    expect(ribbonRefusal(BRIAR_BLOOD_FIRST)).toBe('it does damage');
  });

  it("accepts Halric's \"senses the guilty\"", () => {
    expect(ribbonRefusal(HALRIC_SENSES_THE_GUILTY)).toBeNull();
  });

  /**
   * THE PAIR: REFUSED FOR AN ADVANTAGE CLAUSE, ACCEPTED WITH IT TAKEN OUT.
   *
   * The handoff names this case as "the Knife Ball's Edge-Sense". There is no row by that name
   * anywhere in the repo — not in any blocks file, not in either recording, and the Knife Ball's
   * own traits on BLOCKS-fix-ef-2026-11-16.md are Bloodied Fury, Immutable Form and Magic
   * Resistance. Rather than attribute a sentence to a run that does not carry it, the pair below is
   * CONSTRUCTED to the shape the handoff describes: a sensing ribbon whose only fault is an
   * Advantage-on-an-attack clause. Flagged here, and in the round's report, so the owner can
   * replace it with the real sentence if he has it.
   */
  const WITH_THE_ADVANTAGE = 'The knife ball knows the direction of every bladed object within 30 '
    + 'feet of itself, and it has Advantage on attack rolls against a creature carrying one.';
  const CLAUSE_TAKEN_OUT = 'The knife ball knows the direction of every bladed object within 30 '
    + 'feet of itself.';

  it('refuses a sensing ribbon that grants Advantage on an attack roll', () => {
    expect(ribbonRefusal(WITH_THE_ADVANTAGE))
      .toBe('it gives Advantage or Disadvantage on an attack roll');
  });

  it('accepts the same sentence with that clause taken out', () => {
    expect(ribbonRefusal(CLAUSE_TAKEN_OUT)).toBeNull();
  });
});

describe('the reasons a ribbon is refused', () => {
  it.each([
    ['a condition with no save', 'The target has the Frightened condition until the end of its next turn.', 'it imposes the Frightened condition'],
    ['a saving throw', 'Each creature within 10 feet must make a Dexterity saving throw.', 'it calls for a saving throw'],
    ['damage', 'Each creature in the area takes 7 (2d6) Cold damage.', 'it does damage'],
    ['Armor Class', 'While hidden in the reeds, the hound has a +2 bonus to its Armor Class.', 'it touches Armor Class'],
    ['Advantage on a save', 'The construct has Advantage on saving throws against spells.', 'it gives Advantage or Disadvantage on a saving throw'],
    ['Advantage on nothing named', 'When the moon is full, the wolf has Advantage.', 'it gives Advantage or Disadvantage and does not say on what'],
    ['an empty answer', '   ', 'it is empty'],
  ])('%s', (_what, sentence, reason) => {
    expect(ribbonRefusal(sentence)).toBe(reason);
  });

  // A condition NAMED is not a condition IMPOSED — print's own Pack Tactics reads one.
  it.each([
    ["doesn't have", "The hound knows where its pack is while an ally doesn't have the Incapacitated condition."],
    ['unless', 'It sheds Dim Light for 10 feet unless it has the Invisible condition.'],
  ])('lets a condition stand where it is only read (%s)', (_what, sentence) => {
    expect(ribbonRefusal(sentence)).toBeNull();
  });

  // From Probe A of 2026-11-22, line 29 — the one answer of eighty the validator refused, and the
  // refusal was wrong. The GM had typed "blind in one eye"; nothing gains a condition here.
  it("lets a lowercase condition word stand as flavour (the red dragon's blinded eye)", () => {
    expect(ribbonRefusal('When the dragon dies, its blinded eye collapses into a fist-sized red '
      + "crystal around the ancient lance tip; for a day afterward, the crystal stays warm and "
      + "shows a faint flicker of the dragon's last view.")).toBeNull();
  });

  it('still refuses the capitalized rules term', () => {
    expect(ribbonRefusal('A creature that starts its turn there has the Blinded condition.'))
      .toBe('it imposes the Blinded condition');
  });

  // Flavour is not a price. The word "damage" with nothing rules-shaped beside it stands.
  it('lets "damage" stand as flavour', () => {
    expect(ribbonRefusal('Its chains show the damage of a hundred years in the churchyard dirt.')).toBeNull();
  });
});
