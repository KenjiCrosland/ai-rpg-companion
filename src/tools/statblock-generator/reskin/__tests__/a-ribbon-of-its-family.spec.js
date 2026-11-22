/**
 * THE SIX FAMILIES' RULES, OVER THE EIGHTY.
 *
 * Every sentence here is quoted from `scripts/smoke-evidence/BLOCKS-ribbon-probe-2026-11-22.md` by
 * its line number, so each test asserts on something the model actually wrote rather than on
 * something written to pass.
 *
 * Print is NOT the gate for these rules, and that is deliberate. `ribbonRefusal` — no damage, no
 * save, no condition — still accepts every printed trait, and `what-counts-as-a-ribbon.spec.js`
 * holds that gate. The FAMILY rules are a tighter spec that print predates: the Azer's Illumination
 * sheds light in a 10-foot radius, and 10 feet is not one of the four distances the engine may now
 * write. That is the owner's call, not a fault in print.
 */
import { ribbonFaults, ribbonFamilyRefusal, RIBBON_FAMILIES, familyKeys, ribbonDcFor,
  applyRibbonDc, similesIn, wordsIn, MAX_RIBBON_WORDS } from '../ribbon.mjs';

// ── the eighty, by line number ──
const L26_PURPLE_WORM = 'The purple worm can pinpoint the location of worked metal—weapons, armour, '
  + 'or coin—within 60 feet, its gullet forever recalling the war-band it swallowed.';
const L46_VASHKA = "Vashka's lacquered plate never creaks, and he moves in the exact cadence of a "
  + 'marching shield wall even when alone, so watchers lose track of him mid-stride. A creature '
  + 'that studies him closely can follow the motion with a successful DC 14 Wisdom (Perception) check.';
const L51_MIRE_HULDRA = 'The Mire Huldra moves as if the marsh itself makes way for her: reeds lean '
  + 'aside, mud closes over her footprints, and she can cross quicksand or standing fen water '
  + 'without sinking.';
const L22_VAMPIRE = 'The vampire is rooted to its thorn garden: it always knows the direction and '
  + "distance to any thorn cut from that garden, and within 1 mile it can hear the garden's rustle "
  + 'as a whispered voice.';
const L59_RELIQUARY_OOZE = 'Bound to the altar stone of the vault it haunts, the reliquary ooze '
  + 'cannot willingly travel more than 100 feet from it, and it always knows the direction of any '
  + 'reliquary carried within a mile of that stone.';
const L16_SIEGE_GOLEM = 'The golem speaks by the creak and strain of its lashed beams, and it can '
  + 'only use words it has heard from the masons and carpenters whose walls it has shouldered '
  + 'through — so it introduces itself in stolen voices, always slightly out of order.';
const L40_TRENCH_SIREN = 'When a trench siren dies, its larynx calcifies into a black, bell-like '
  + 'organ called a drowning toll. For 1d20 days the bell hums the last verse the siren heard, '
  + 'audible for 10 miles underwater, and a creature touching it can make a DC 15 Arcana check to '
  + 'sense the direction of the nearest shipwreck.';
const L61_THUNDERHEAD_WHELP = 'When a thunderhead whelp dies, its heart-stone drops free and keeps '
  + 'rumbling for 1 hour, like thunder trapped under a cup. A creature that holds it to its ear can '
  + 'make a DC 12 Arcana check to hear the direction of the nearest storm.';
const L69_WELL_DROWNED = 'The Well Drowned speaks only by gurgling fragments of the last words of '
  + 'creatures drowned in its well, echoing them wetly from somewhere inside its body. A listener '
  + 'who succeeds on a DC 12 Insight check can piece together what it means.';
const L28_GLACIER_HEART = 'As the Heart of the Glacier moves, it sheds a trail of milky blue ice '
  + 'nodules that glimmer faintly for 1 hour before melting into ordinary meltwater. A creature can '
  + 'follow this trail with a successful DC 13 Wisdom (Survival) check.';
const L9_AIR_ELEMENTAL = 'Stolen voices are a trust the air elemental cannot break: it cannot use a '
  + 'borrowed voice to lie, and if it does, that voice slips free and returns to its owner.';

describe('six families, and what each one declares it can check', () => {
  it('is six, and hiding and bound are gone', () => {
    expect(familyKeys()).toEqual(['senses', 'speaks', 'taboo', 'leaves-at-death', 'moves', 'sheds']);
    expect(familyKeys()).not.toContain('hides');
    expect(familyKeys()).not.toContain('bound');
  });

  it('only sheds is kept for a Large creature or larger', () => {
    expect(RIBBON_FAMILIES.filter((f) => f.largeOrLarger).map((f) => f.key)).toEqual(['sheds']);
  });

  it('each family says what it must hold and what this file can decide', () => {
    for (const f of RIBBON_FAMILIES) {
      expect(f.mustHold.length).toBeGreaterThan(20);
      expect(f.checks.length).toBeGreaterThan(10);
      expect(f.print).toMatch(/: /);
    }
  });
});

describe('the sentences from the eighty', () => {
  it("26, the Purple Worm's Armoury Scent, as senses — accepted", () => {
    expect(ribbonFaults(L26_PURPLE_WORM, { family: 'senses', name: 'Armoury Scent' })).toEqual([]);
  });

  it("46, Vashka's marching cadence, as moves — refused: it grants no movement", () => {
    // 45 words exactly, so the cap no longer touches it and the family fault stands alone.
    expect(wordsIn(L46_VASHKA)).toBe(45);
    expect(ribbonFaults(L46_VASHKA, { family: 'moves', name: 'Marching Cadence' }))
      .toEqual(['it grants no movement the creature could not otherwise make']);
  });

  it('51, the marsh witch, as moves — accepted: she can cross quicksand', () => {
    expect(ribbonFaults(L51_MIRE_HULDRA, { family: 'moves', name: 'Marsh Way' })).toEqual([]);
  });

  it('22, the Vampire rooted to its thorn garden, as a tether — refused', () => {
    expect(ribbonFamilyRefusal(L22_VAMPIRE, { family: 'taboo', name: 'Thorn Rooted' }))
      .toBe('it names nothing the creature cannot do, must do, or will not do — and no tether, '
        + 'which is a distance it cannot pass and what it does at the end of one');
  });

  it('59, the ooze bound to the altar stone, as a tether — accepted', () => {
    expect(ribbonFaults(L59_RELIQUARY_OOZE, { family: 'taboo', name: 'Altar Bound' })).toEqual([]);
  });

  it('9, the Air Elemental that cannot lie in a borrowed voice, as a taboo — accepted', () => {
    expect(ribbonFaults(L9_AIR_ELEMENTAL, { family: 'taboo', name: 'Borrowed Trust' })).toEqual([]);
  });

  // Accepted outright once the cap went to 45. It was refused at 40 for its 42 words.
  it('69, the Well Drowned, as speaks — accepted: a limit and a check, in 42 words', () => {
    expect(wordsIn(L69_WELL_DROWNED)).toBe(42);
    expect(ribbonFaults(L69_WELL_DROWNED, { family: 'speaks', name: 'Drowned Words' })).toEqual([]);
  });

  /**
   * THE ONE PLACE I READ THE HANDOFF DIFFERENTLY, AND DID NOT BEND THE RULE TO MATCH.
   *
   * The handoff expects 16 refused "as written: no check and no limit". The family's stated
   * requirement is "a check to understand it or a LIMIT ON WHAT IT CAN SAY", and the sentence says
   * the golem "can only use words it has heard from the masons and carpenters" — which is a limit
   * on what it can say, and one with a consequence at the table. Implementing the requirement as
   * the owner stated it accepts this sentence.
   *
   * Refusing it would mean narrowing "a limit" until it excluded a plain "can only", which would
   * refuse good ribbons as well. The rule is implemented as stated; the disagreement is in the
   * round's report for the owner to settle.
   */
  // The owner loved this one and the 40-word cap was refusing it at 45 words. The cap is 45 now.
  it("16, the Siege-Golem's Groaning Timber, as speaks — accepted, at exactly 45 words", () => {
    expect(wordsIn(L16_SIEGE_GOLEM)).toBe(45);
    expect(ribbonFaults(L16_SIEGE_GOLEM, { family: 'speaks', name: 'Groaning Timber' })).toEqual([]);
  });

  it('16 cut to length, with a check to understand it added — accepted outright', () => {
    const cut = 'The golem speaks by the creak of its lashed beams, and it can only use words it '
      + 'has heard from masons. A creature can make a DC 13 Wisdom (Insight) check to sort them '
      + 'into sense.';
    expect(wordsIn(cut)).toBeLessThanOrEqual(MAX_RIBBON_WORDS);
    expect(ribbonFaults(cut, { family: 'speaks', name: 'Groaning Timber' })).toEqual([]);
  });

  /** 40 is stopped by TWO rules, and the test names both. */
  /**
   * The handoff asked which rule stops this one. At the 40-word cap it was two — its length and its
   * "10 miles". A leaving has 55 words now and the toll is 54, so ONLY RULE 4 STOPS IT. The length
   * it was refused for is no longer a fault at all.
   */
  it("40, the Trench Siren's drowning toll, as leaves-at-death — stopped by rule 4 alone", () => {
    expect(wordsIn(L40_TRENCH_SIREN)).toBe(54);
    expect(ribbonFaults(L40_TRENCH_SIREN, { family: 'leaves-at-death', name: 'Drowning Toll', object: 'drowning toll' }))
      .toEqual(['"10 miles" is not one of the distances a ribbon may use (30 feet, 60 feet, 120 feet, 1 mile)']);
  });

  it('with its length and its 10 miles fixed, the same toll is accepted', () => {
    const fixed = 'When a trench siren dies, its larynx calcifies into a bell that hums the last '
      + 'verse it heard for 1d20 days. A creature touching it can make a DC 15 Arcana check to '
      + 'sense the nearest shipwreck.';
    expect(wordsIn(fixed)).toBeLessThanOrEqual(MAX_RIBBON_WORDS);
    expect(ribbonFaults(fixed, { family: 'leaves-at-death', name: 'Drowning Toll', object: 'bell' })).toEqual([]);
  });

  it('28, the Glacier Heart, as sheds — accepted: a trail and the check that follows it', () => {
    expect(wordsIn(L28_GLACIER_HEART)).toBe(41);
    expect(ribbonFaults(L28_GLACIER_HEART, { family: 'sheds', name: 'Ice Trail' })).toEqual([]);
  });

  /**
   * 61 is the handoff's EXAMPLE of what the leaves-at-death family must hold, and it does hold it —
   * an object, a sound, a direction on a check, and an hour. It is 44 words, so the owner's own
   * 40-word cap refuses it. Recorded here because the cap and the example disagree, and the cap is
   * the rule.
   */
  // The handoff's own example of what a leaving must hold. At 40 words it was refused for its 44;
  // a leaving has 55 now, because it has to name an object AND say when it ends.
  it("61, the Whelp's heart-stone, accepted as a leaving at 44 words", () => {
    expect(ribbonFaults(L61_THUNDERHEAD_WHELP, { family: 'leaves-at-death', name: 'Heart Stone', object: 'heart-stone' })).toEqual([]);
  });
});

describe('the rules that are the validator\'s to enforce', () => {
  it('rule 1 — a sentence of 46 words is refused', () => {
    const fortySix = Array.from({ length: 46 }, (_, i) => (i === 0 ? 'It' : 'word')).join(' ');
    expect(wordsIn(fortySix)).toBe(46);
    expect(ribbonFaults(fortySix, { family: 'senses', name: 'Long Winded' }))
      .toContain('it is 46 words, and a ribbon is 45 at most');
  });

  it('rule 1 — forty-five words is not', () => {
    const fortyFive = `It can pinpoint iron within 60 feet ${Array.from({ length: 38 }, () => 'word').join(' ')}`;
    expect(wordsIn(fortyFive)).toBe(45);
    expect(ribbonFaults(fortyFive, { family: 'senses', name: 'Just Short' })).toEqual([]);
  });

  it.each([['one', 'Scent'], ['four', 'The Scent Of Iron']])('rule 1 — a name of %s words is refused', (_n, name) => {
    expect(ribbonFaults(L26_PURPLE_WORM, { family: 'senses', name }).join(' ')).toMatch(/name is \d word/);
  });

  it.each([['30 feet', 30], ['60 feet', 60], ['120 feet', 120]])('rule 4 — %s stands', (_s, feet) => {
    expect(ribbonFaults(`It can pinpoint worked iron within ${feet} feet of itself.`,
      { family: 'senses', name: 'Iron Scent' })).toEqual([]);
  });

  it.each([[10], [45], [100], [300]])('rule 4 — %i feet is refused outside a tether', (feet) => {
    expect(ribbonFaults(`It can pinpoint worked iron within ${feet} feet of itself.`,
      { family: 'senses', name: 'Iron Scent' }).join(' ')).toMatch(/is not one of the distances/);
  });

  it('rule 4 — 100 feet stands for a tether and nowhere else', () => {
    expect(ribbonFaults('It cannot willingly travel more than 100 feet from the altar stone.',
      { family: 'taboo', name: 'Altar Bound' })).toEqual([]);
    expect(ribbonFaults('It can pinpoint worked iron within 100 feet of itself.',
      { family: 'senses', name: 'Iron Scent' }).join(' ')).toMatch(/is not one of the distances/);
  });

  it('rule 4 — a length of time is not a distance', () => {
    expect(ribbonFaults('When it dies, its heart-stone hums for 1d20 days, then goes silent.',
      { family: 'leaves-at-death', name: 'Heart Stone', object: 'heart-stone' })).toEqual([]);
  });

  it('rule 6 — a leave-behind that gives +1 to attack rolls is refused', () => {
    expect(ribbonFaults('When it dies it leaves a bone charm that gives +1 to attack rolls for 1 hour.',
      { family: 'leaves-at-death', name: 'Bone Charm', object: 'bone charm' })[0]).toBe('it gives a bonus');
  });

  it('rule 6 — a leave-behind that casts a spell is refused for what the spell does', () => {
    expect(ribbonFaults('When it dies it leaves an ember that casts fireball once, dealing 8d6 Fire damage.',
      { family: 'leaves-at-death', name: 'Last Ember', object: 'ember' })).toContain('it does damage');
  });

  // The list of four things a leaving may do is GONE (22 November). `four-holes-in-the-ribbon-rules`
  // holds the leaving's rules as they now stand: an object, an ending, and no spell.
  it('rule 6 — a leave-behind that never ends is refused', () => {
    expect(ribbonFaults('When it dies, its heart-stone rumbles like far-off thunder.',
      { family: 'leaves-at-death', name: 'Heart Stone', object: 'heart-stone' }))
      .toContain('it never says when what it leaves ends, and it does not work only once');
  });

  it('a family outside the six is refused, and so is none at all', () => {
    expect(ribbonFaults(L26_PURPLE_WORM, { family: 'hides', name: 'Still Shape' }))
      .toContain('"hides" is not one of the six families');
    expect(ribbonFaults(L26_PURPLE_WORM, { name: 'Still Shape' })).toContain('it names no family');
  });

  it('a senses ribbon with no range at all is refused', () => {
    expect(ribbonFaults('It can pinpoint the location of worked metal anywhere in the dungeon.',
      { family: 'senses', name: 'Iron Scent' }))
      .toContain('it names no range, and a ribbon that senses says how far');
  });

  it('a sheds ribbon with neither a radius nor a check is refused', () => {
    expect(ribbonFaults('It sheds a faint trail of milky ice nodules wherever it walks.',
      { family: 'sheds', name: 'Ice Trail' }))
      .toContain('it gives neither a radius for its light nor a check for following its trail');
  });

  it('the base rules still hold inside a family', () => {
    expect(ribbonFaults('A creature within 30 feet has the Frightened condition.',
      { family: 'senses', name: 'Dread Scent' })).toContain('it imposes the Frightened condition');
  });
});

describe('rule 3 — the engine sets every DC', () => {
  it.each([[0, 10], [4, 10], [5, 13], [12, 13], [13, 15], [20, 15], [24, 15]])(
    'CR %s takes DC %i', (cr, dc) => { expect(ribbonDcFor(cr)).toBe(dc); });

  it('replaces every DC the model wrote, however many', () => {
    expect(applyRibbonDc('A DC 20 Insight check, then a DC 18 Survival check.', 3))
      .toBe('A DC 10 Insight check, then a DC 10 Survival check.');
  });

  it("leaves a sentence with no DC alone", () => {
    expect(applyRibbonDc(L51_MIRE_HULDRA, 8)).toBe(L51_MIRE_HULDRA);
  });

  it('is applied after the validator, so the number the model chose never reaches the sheet', () => {
    const written = 'The purple worm can pinpoint worked metal within 60 feet, and a creature can '
      + 'make a DC 20 Wisdom (Perception) check to tell what it has found.';
    expect(ribbonFaults(written, { family: 'senses', name: 'Armoury Scent' })).toEqual([]);
    expect(applyRibbonDc(written, 15)).toContain('DC 15');
    expect(applyRibbonDc(written, 15)).not.toContain('DC 20');
  });
});

describe('rule 8 — a simile is counted, never refused', () => {
  it('counts the similes in the eighty\'s own sentences', () => {
    expect(similesIn(L61_THUNDERHEAD_WHELP)).toBe(1); // "like thunder trapped under a cup"
    expect(similesIn(L51_MIRE_HULDRA)).toBe(1); // "as if the marsh itself makes way"
    expect(similesIn(L26_PURPLE_WORM)).toBe(0);
    expect(similesIn(L59_RELIQUARY_OOZE)).toBe(0);
  });

  it('does not refuse one', () => {
    expect(ribbonFaults(L51_MIRE_HULDRA, { family: 'moves', name: 'Marsh Way' })).toEqual([]);
  });
});
