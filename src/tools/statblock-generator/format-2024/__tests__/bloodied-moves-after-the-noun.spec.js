/**
 * GM40 FAULT 2 — BLOODIED BEFORE A NOUN MOVES AFTER IT (Fable, 2026-11-25).
 *
 * The Butcher of Karrow's 2014 row shipped "One below half its hit point maximum creature the
 * butcher can see within 60 feet must make a DC 14 Dexterity saving throw." The conversion swaps
 * the word Bloodied for its phrase, which is right where the word is predicative and wrong where
 * it qualifies a noun.
 *
 * Red with the fix out: take the attributive rewrite away and the phrase lands before the noun.
 */
import { to2014Grammar } from '../generate.mjs';

describe('the 2014 conversion and the word Bloodied', () => {
  it('moves the phrase after the noun it describes', () => {
    const out = to2014Grammar('One Bloodied creature the butcher can see within 60 feet must make a DC 14 Dexterity saving throw.');
    expect(out).toContain('One creature the butcher can see within 60 feet that is below half its hit point maximum must make');
    expect(out).not.toMatch(/below half its hit point maximum creature/);
  });

  it('leaves a predicative use where it stands', () => {
    expect(to2014Grammar('While Bloodied, Gorrak gains Advantage on attack rolls.'))
      .toContain('While below half its hit point maximum, Gorrak gains');
  });

  it('still reads "has half its hit points or fewer" for "is Bloodied"', () => {
    expect(to2014Grammar('The target is Bloodied.')).toContain('has half its hit points or fewer');
  });
});
