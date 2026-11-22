/**
 * THE CAP, THE LEAVING, AND FOUR HOLES THE FIRST TWENTY-FIVE FOUND.
 *
 * Fable's amendment of 22 November evening. Every sentence here is quoted from a real sheet of the
 * forty (`BLOCKS-the-forty-ribbons-2026-11-22.md`) or from the eighty
 * (`BLOCKS-ribbon-probe-2026-11-22.md`), so each test asserts on something the model actually wrote
 * and the validator actually passed.
 */
import { ribbonFaults, ribbonFamilyRefusal, wordsIn, MAX_RIBBON_WORDS, MAX_LEAVING_WORDS,
  maxWordsFor } from '../ribbon.mjs';

// ── from the forty, the four that did too much ──
const S20_TRENCH_SIREN = 'The siren can move through water without disturbing it, and can swim '
  + "through the water inside another creature's space. A creature whose space it enters must "
  + 'succeed on a DC 15 Wisdom check or lose its footing in the current.';
const S15_RED_DRAGON = 'While flying, the dragon can drop into a diving glide over any surface, '
  + 'moving up to 120 feet in a straight line without spending movement. It can end this glide on a '
  + 'wall or ceiling it can climb.';
const S11_VAMPIRE = 'The vampire can move through plants and wooden objects as Difficult Terrain '
  + 'without disturbing them, and can pinpoint the location of any creature touching a plant within '
  + '60 feet of itself.';
const S09_STONE_GOLEM = 'The golem cannot move more than 100 feet from the place of its carving. At '
  + 'the end of each minute beyond that tether, it must return; while beyond it, it takes no actions '
  + 'but movement back toward the site.';
const S34_KRENNIK = 'Krennik must remain within 100 feet of the Skullstandard banner. At the end of '
  + 'each of his turns beyond that distance, he must use his movement to move toward the banner by '
  + 'the shortest route.';

// ── from the eighty ──
const L61_WHELP = 'When a thunderhead whelp dies, its heart-stone drops free and keeps rumbling for '
  + '1 hour, like thunder trapped under a cup. A creature that holds it to its ear can make a DC 12 '
  + 'Arcana check to hear the direction of the nearest storm.';
const L16_SIEGE_GOLEM_WITH_A_CHECK = 'The golem speaks by the creak and strain of its lashed beams, '
  + 'and it can only use words it has heard from the masons and carpenters whose walls it has '
  + 'shouldered through — so it introduces itself in stolen voices, always slightly out of order.';

describe('the cap: 45 words, and 55 for a leaving', () => {
  it('is 45 and 55, and the family decides which', () => {
    expect(MAX_RIBBON_WORDS).toBe(45);
    expect(MAX_LEAVING_WORDS).toBe(55);
    expect(maxWordsFor('senses')).toBe(45);
    expect(maxWordsFor('leaves-at-death')).toBe(55);
  });

  it("the Whelp's heart-stone from the eighty — 44 words, accepted as a leaving", () => {
    expect(wordsIn(L61_WHELP)).toBe(44);
    expect(ribbonFaults(L61_WHELP, { family: 'leaves-at-death', name: 'Heart Stone', object: 'heart-stone' })).toEqual([]);
  });

  it("the Siege-Golem's Groaning Timber with a check to follow it — 45 words, accepted", () => {
    expect(wordsIn(L16_SIEGE_GOLEM_WITH_A_CHECK)).toBe(45);
    expect(ribbonFaults(L16_SIEGE_GOLEM_WITH_A_CHECK, { family: 'speaks', name: 'Groaning Timber' })).toEqual([]);
  });

  it('a sentence of 46 words is refused in every family but a leaving', () => {
    const fortySix = `It can pinpoint worked iron within 60 feet of itself ${Array.from({ length: 36 }, () => 'word').join(' ')}`;
    expect(wordsIn(fortySix)).toBe(46);
    expect(ribbonFaults(fortySix, { family: 'senses', name: 'Iron Scent' }))
      .toContain('it is 46 words, and a ribbon is 45 at most');
  });

  it('and 46 words is fine in a leaving, which has 55', () => {
    const fortySix = `When it dies it leaves a bone charm that hums for 1 hour ${Array.from({ length: 33 }, () => 'word').join(' ')}`;
    expect(wordsIn(fortySix)).toBe(46);
    expect(ribbonFaults(fortySix, { family: 'leaves-at-death', name: 'Bone Charm', object: 'bone charm' })).toEqual([]);
  });

  it('56 words is refused even in a leaving', () => {
    const fiftySix = `When it dies it leaves a bone charm that hums for 1 hour ${Array.from({ length: 43 }, () => 'word').join(' ')}`;
    expect(wordsIn(fiftySix)).toBe(56);
    expect(ribbonFaults(fiftySix, { family: 'leaves-at-death', name: 'Bone Charm', object: 'bone charm' }))
      .toContain('it is 56 words, and a leaving is 55 at most');
  });
});

describe('a leaving: an object, an ending, and no spell', () => {
  it('names an object, and the sentence has to say it', () => {
    expect(ribbonFaults(L61_WHELP, { family: 'leaves-at-death', name: 'Heart Stone' }))
      .toContain('it names no object left behind');
    expect(ribbonFaults(L61_WHELP, { family: 'leaves-at-death', name: 'Heart Stone', object: 'storm-glass' }))
      .toContain('the sentence never says "storm-glass", the object it claims to leave');
  });

  it('a leaving that never ends is refused', () => {
    expect(ribbonFaults('When it dies, its heart-stone drops free and rumbles like far thunder.',
      { family: 'leaves-at-death', name: 'Heart Stone', object: 'heart-stone' }))
      .toContain('it never says when what it leaves ends, and it does not work only once');
  });

  it('a leaving that casts a spell is refused', () => {
    expect(ribbonFaults('When it dies it leaves an ember that casts light once before it fades.',
      { family: 'leaves-at-death', name: 'Last Ember', object: 'ember' }))
      .toContain('what it leaves casts a spell');
  });

  it('a leaving that gives a bonus is refused by the base rules', () => {
    expect(ribbonFaults('When it dies it leaves a bone charm that gives +1 to attack rolls for 1 hour.',
      { family: 'leaves-at-death', name: 'Bone Charm', object: 'bone charm' })[0]).toBe('it gives a bonus');
  });

  /**
   * THE LIST OF FOUR THINGS IS GONE. It was Fable's, not the owner's, and it is what the model
   * could not fit: four of the eleven refusals on the forty were a leaving failing it. A leaving
   * that does something not on that list now stands.
   */
  it('a leaving that does something the old list of four never allowed now stands', () => {
    expect(ribbonFaults('When it dies, its shell hardens into a grey stone that stays warm to the '
      + 'touch for 1 hour, then goes cold.',
    { family: 'leaves-at-death', name: 'Grey Stone', object: 'grey stone' })).toEqual([]);
  });
});

describe('a check is one a creature chooses to make', () => {
  it("s20's Trench Current — refused: a check a creature must pass", () => {
    expect(ribbonFamilyRefusal(S20_TRENCH_SIREN, { family: 'moves', name: 'Trench Current' }))
      .toBe("it makes a creature pass a check or suffer something, and a ribbon's check is one a "
        + 'creature chooses to make — to learn, notice, follow or understand');
  });

  it('and accepted with the consequence taken off', () => {
    const fixed = 'The siren can move through water without disturbing it, and can swim through the '
      + "water inside another creature's space.";
    expect(ribbonFaults(fixed, { family: 'moves', name: 'Trench Current' })).toEqual([]);
  });

  it("print's own Transparent still stands — a check to LEARN something", () => {
    const transparent = 'Even when the cube is in plain sight, a creature must succeed on a DC 15 '
      + "Wisdom (Perception) check to notice the cube if the creature hasn't witnessed the cube move.";
    expect(ribbonFaults(transparent, { family: 'senses', name: 'Clear Body', object: null }))
      .not.toContain("it makes a creature pass a check or suffer something, and a ribbon's check is one a "
        + 'creature chooses to make — to learn, notice, follow or understand');
  });

  it('a check to follow a trail still stands', () => {
    const trail = 'It sheds a trail of frost that remains for 1 hour, and a creature can follow it '
      + 'with a successful DC 15 Wisdom (Survival) check.';
    expect(ribbonFaults(trail, { family: 'sheds', name: 'Frost Trail' })).toEqual([]);
  });
});

describe('moves grants a way of moving, not more of it', () => {
  it("s15's Lance-Scarred Glide — refused: movement that costs nothing", () => {
    expect(ribbonFamilyRefusal(S15_RED_DRAGON, { family: 'moves', name: 'Lance Glide' }))
      .toBe('it grants movement that costs nothing, and a ribbon grants a way of moving, not more of it');
  });

  it('"without spending EXTRA movement" still stands — that is the difficult-terrain cost', () => {
    const vashka = 'Vashka can move through the space of any ally within 30 feet of it without '
      + 'spending extra movement. It must end this movement in a space adjacent to that ally.';
    expect(ribbonFaults(vashka, { family: 'moves', name: 'Shield Step' })).toEqual([]);
  });

  it('a ribbon that grants additional speed is refused', () => {
    expect(ribbonFaults('While on open stone the hound gains an extra 30 feet of movement each turn.',
      { family: 'moves', name: 'Stone Runner' }))
      .toContain('it grants movement that costs nothing, and a ribbon grants a way of moving, not more of it');
  });
});

describe('one family to a ribbon, and only a senses ribbon pinpoints', () => {
  it("s11's Thorn Step — refused: two families", () => {
    expect(ribbonFamilyRefusal(S11_VAMPIRE, { family: 'moves', name: 'Thorn Step' }))
      .toBe('only a ribbon that senses pinpoints, and this one is two ribbons in one');
  });

  it('and accepted with the pinpoint clause removed', () => {
    const fixed = 'The vampire can move through plants and wooden objects as Difficult Terrain '
      + 'without disturbing them.';
    expect(ribbonFaults(fixed, { family: 'moves', name: 'Thorn Step' })).toEqual([]);
  });

  it('a senses ribbon may pinpoint, which is its whole job', () => {
    expect(ribbonFaults('The worm can pinpoint the location of worked metal within 60 feet of itself.',
      { family: 'senses', name: 'Armoury Scent' })).toEqual([]);
  });

  it('"knows the DIRECTION of" is not pinpointing, and the ooze\'s tether keeps it', () => {
    const ooze = 'Bound to the altar stone of the vault it haunts, the reliquary ooze cannot '
      + 'willingly travel more than 100 feet from it, and it always knows the direction of any '
      + 'reliquary carried within a mile of that stone.';
    expect(ribbonFaults(ooze, { family: 'taboo', name: 'Altar Bound' })).toEqual([]);
  });
});

describe('a tether never takes away actions', () => {
  it("s09's Sealed in Weeping — refused: it takes the creature's actions", () => {
    expect(ribbonFamilyRefusal(S09_STONE_GOLEM, { family: 'taboo', name: 'Sealed Weeping' }))
      .toBe("it takes the creature's actions, and a tether only stops it going farther or sends it back");
  });

  it('and accepted when it only must return', () => {
    const fixed = 'The golem cannot move more than 100 feet from the place of its carving. At the '
      + 'end of each minute beyond that tether, it must return to the site by the shortest route.';
    expect(ribbonFaults(fixed, { family: 'taboo', name: 'Sealed Weeping' })).toEqual([]);
  });

  it("s34's Skullstandard Tether, as it is — accepted", () => {
    expect(ribbonFaults(S34_KRENNIK, { family: 'taboo', name: 'Skullstandard Tether' })).toEqual([]);
  });
});

describe('the four hold together', () => {
  it('each of the four sentences is refused for its own reason and no other', () => {
    const cases = [
      [S20_TRENCH_SIREN, 'moves', /pass a check or suffer/],
      [S15_RED_DRAGON, 'moves', /costs nothing/],
      [S11_VAMPIRE, 'moves', /two ribbons in one/],
      [S09_STONE_GOLEM, 'taboo', /takes the creature's actions/],
    ];
    for (const [sentence, family, pattern] of cases) {
      const faults = ribbonFaults(sentence, { family, name: 'Two Words' });
      expect(faults).toHaveLength(1);
      expect(faults[0]).toMatch(pattern);
    }
  });
});
