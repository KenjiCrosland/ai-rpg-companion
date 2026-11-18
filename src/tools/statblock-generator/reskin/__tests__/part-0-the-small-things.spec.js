/**
 * PART 0 — THE FOUR SMALL THINGS (2026-11-18).
 *
 * 0.1 DEAFENED ALONE IS SWAPPED, NOT DROPPED (owner's ruling, 18 November evening). The bells'
 * Knellsong was refused for Deafened alone, the second ask answered Deafened again, and the swarm
 * shipped with no Reaction at all. When the SECOND answer is refused for this and nothing else, the
 * engine makes the condition Frightened and keeps the row otherwise as the model wrote it.
 *
 * 0.2 AN AMOUNT STATED BY RELATION IS STATED. The Oathbroken Warder's trait — "the warder can deal
 * maximum damage instead of rolling, but takes psychic damage equal to the damage dealt" — declared
 * one number and writes no numeral, so the gate refused it twice. Measured on the baseline: the gate
 * would refuse 4 rows and 2 state their amount this way.
 *
 * 0.4 A SHEET IS UNREPLAYABLE WHEN ITS CR IS ROLLED, not when the field says "auto". The engine
 * reads `selectedChallengeRating || crFromPrompt(name + description)` and rolls only when both are
 * absent; the marsh witch types "cr 7" in her words.
 */
import { parseAuthorResponse, swapDeafenedToFrightened, REFUSED_FOR_DEAFENED_ALONE } from '../author.mjs';
import { crFromPrompt } from '../lexicon.mjs';

describe('0.1 Deafened alone is swapped, not dropped', () => {
  const knellsong = (over) => JSON.stringify({ reactions: [{
    clause: 'ring themselves over the dying', name: 'Knellsong', trigger: "A creature within the swarm's reach drops to 0 Hit Points",
    mechanics: 1, quantities: 3,
    save: { stat: 'Constitution', target: "each other creature of the swarm's choice within 30 feet", damage: true, type: 'Necrotic', condition: 'Deafened', ...over },
  }] });

  test('the answer is refused for Deafened alone, and for nothing else', () => {
    const p = parseAuthorResponse(knellsong(), {});
    expect(p.reactions).toHaveLength(0);                       // the subject is present
    expect(p.refused).toHaveLength(1);
    expect(REFUSED_FOR_DEAFENED_ALONE.test(p.refused[0].why)).toBe(true);
  });

  test('swapped, the same answer lands, with Frightened and nothing else changed', () => {
    const swapped = swapDeafenedToFrightened(knellsong());
    expect(swapped).toBeTruthy();
    const p = parseAuthorResponse(swapped, {});
    expect(p.reactions).toHaveLength(1);
    expect(p.reactions[0].name).toBe('Knellsong');
    expect(p.reactions[0].save.condition).toBe('Frightened');
    expect(p.reactions[0].save.target).toBe("each other creature of the swarm's choice within 30 feet");
    expect(p.reactions[0].trigger).toMatch(/drops to 0 Hit Points/);
  });

  test('an answer refused for Deafened AND something else is not swapped into landing', () => {
    // two mechanics in one row is the something else; the swap leaves that refusal standing
    const two = JSON.stringify({ reactions: [{ clause: 'x', name: 'Knellsong', trigger: 'a creature drops to 0 Hit Points',
      mechanics: 2, quantities: 1, save: { stat: 'Constitution', target: 'the triggering creature', condition: 'Deafened' } }] });
    const before = parseAuthorResponse(two, {});
    expect(before.refused.every((r) => REFUSED_FOR_DEAFENED_ALONE.test(r.why))).toBe(false);
    const p = parseAuthorResponse(swapDeafenedToFrightened(two) ?? two, {});
    expect(p.reactions).toHaveLength(0);
  });

  test('an answer with no Deafened anywhere returns null, so nothing is rewritten', () => {
    expect(swapDeafenedToFrightened(JSON.stringify({ reactions: [{ name: 'x', save: { condition: 'Restrained' } }] }))).toBeNull();
    expect(swapDeafenedToFrightened('not json')).toBeNull();
  });

  test('the reason offers Stunned only where the row has a Recharge', () => {
    const save = (recharge) => parseAuthorResponse(JSON.stringify({ saves: [{ clause: 'x', name: 'Peal', stat: 'Constitution',
      target: 'each creature in a 30-foot Emanation', damage: false, condition: 'Deafened', success: 'none', recharge }] }), {}).refused[0].why;
    expect(save(true)).toMatch(/Frightened, Charmed or Stunned/);
    expect(save(false)).toMatch(/Frightened or Charmed/);
    expect(save(false)).not.toMatch(/Stunned/);
  });
});

describe('0.2 an amount stated by relation is stated', () => {
  const trait = (effect, quantities) => parseAuthorResponse(JSON.stringify({ traits: [{
    clause: 'an oath of silence', name: "The Oath's Silence", trigger: 'When the warder hits with a Mace attack',
    effect, passive_effect: 'threat', condition_relation: 'none', heals: false, mechanics: 1, quantities,
  }] }), {});

  test("the warder's trait counts its amount and lands", () => {
    const p = trait('The warder can deal maximum damage instead of rolling, but takes psychic damage equal to the damage dealt.', 1);
    expect(p.traits).toHaveLength(1);
    expect(p.traits[0].name).toBe("The Oath's Silence");
  });

  test('every relation the owner listed counts', () => {
    for (const eff of [
      'the target takes damage equal to the damage dealt',
      'the target takes half the damage',
      'the warder deals double damage to it',
      'it can deal maximum damage instead of rolling',
      'the worm moves up to its Speed toward the water',
      'a creature within its reach is pulled to it',
      'it loses Hit Points equal to its Hit Point maximum',
    ]) expect(trait(eff, 1).traits).toHaveLength(1);
  });

  test('a promise with no amount at all is still refused, with the reason', () => {
    const p = trait('The target is slowed somewhat for a while.', 1);
    expect(p.traits).toHaveLength(0);
    expect(p.refused[0].why).toMatch(/number\(s\) the row promises/);
  });
});

describe('0.4 a sheet is unreplayable when its CR is rolled', () => {
  // the harness's rule, stated here against the engine's own reader — the harness itself is a
  // script and cannot be imported, so what is asserted is the question it now asks
  const rolled = (e) => {
    const field = String(e?.cr ?? '').trim();
    const inWords = crFromPrompt(`${e?.name ?? ''} ${e?.description ?? ''}`);
    return (!field || field.toLowerCase() === 'auto') && !inWords;
  };

  test("the marsh witch's CR is in her words, so she is replayable", () => {
    const s26 = { cr: 'auto', name: '', description: 'a marsh witch who curses trespassers, cr 7' };
    expect(crFromPrompt(s26.description)).toBe('7');     // the subject is present
    expect(rolled(s26)).toBe(false);
  });

  test('a sheet with no CR anywhere is rolled, and skipped', () => {
    expect(rolled({ cr: 'auto', name: 'Goblin Boss', description: '' })).toBe(true);
    expect(rolled({ cr: 'auto', name: '', description: '' })).toBe(true);
  });

  test('a CR in the field is read, whatever the words say', () => {
    expect(rolled({ cr: '9', name: 'x', description: 'y' })).toBe(false);
  });

  test('a level in the words counts as a CR the engine reads', () => {
    expect(crFromPrompt('a 5th-level fighter')).toBe('5');
    expect(rolled({ cr: 'auto', name: '', description: 'a 5th-level fighter' })).toBe(false);
  });
});
