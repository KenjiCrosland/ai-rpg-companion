/**
 * CODE FINDS THE PRINTED NAMES, THE CALL JUDGES THEM (the names arm, 2026-11-14).
 *
 * The swap test showed the path call often fails to RECOGNISE a printed creature the prompt
 * does not use as an example: the Troll is named five times in the prompt and scores 10/10,
 * the Ogre and Ghoul are named nowhere and score 3-6/10. That is recall, not judgement. So
 * code offers the names and the call chooses among them — a selection problem.
 *
 * THE ARM THAT OFFERED THESE NAMES TO THE CALL MISSED ITS BAR and did not ship (measured
 * 2026-11-14 against path-key.json: "clockwork spider" 10/10 -> 6/10, "goblin assassin" 8/10
 * -> 6/10, more-than-one-path 6 -> 10; "ogre blacksmith" 5/10 -> 10/10). The finder itself is
 * kept and tested: `scripts/probe-path-key.mjs` reads it to reproduce that measurement, and
 * whatever replaces the arm needs the same closed-fact lookup.
 *
 * These test the FINDER's return value only. No test asserts on the prompt's wording.
 */
import { namesInTheWords, buildPathPrompt } from '../path.mjs';

const names = (t, ed = '2024') => namesInTheWords(t, { edition: ed }).map((x) => x.name);

describe('the finder: closed facts only', () => {
  test('a whole printed name is found as a whole word', () => {
    expect(names('a dire wolf with a frost-rimed hide')).toEqual(['Dire Wolf']);
    expect(names('frost giant jarl')).toEqual(['Frost Giant']);
    expect(names('ghoul gravedigger')).toEqual(['Ghoul']);
  });

  test('the longest name wins', () => {
    // "Dire Wolf" over "Wolf"; and an alias yields to a whole name already carrying its word
    expect(names('a dire wolf')).toEqual(['Dire Wolf']);
    expect(names('goblin boss with a heavy crossbow')).toEqual(['Goblin Boss']);
  });

  test('an alias word resolves through the table this file already owns', () => {
    expect(names('goblin wizard')).toEqual(expect.arrayContaining(['Goblin Warrior', 'Mage']));
    expect(names('an archlich enthroned on a sun of bone')).toEqual(['Lich']);
    expect(names('hag midwife')).toEqual(['Green Hag']); // hagFor picks by context
  });

  test('a word that merely CONTAINS a name finds nothing', () => {
    expect(names('cathedral-vault ooze')).toEqual([]); // the block is the Gray Ooze
    expect(names('orc blacksmith')).toEqual([]); // orc is a species kit, not a print block
    expect(names('Mind Flayer')).toEqual([]); // Product Identity, in neither corpus
  });

  test('the edition rule: a name is found in the book the sheet is on', () => {
    // 5.1 names it "Goblin", 5.2 "Goblin Warrior" — the alias covers both, and each edition
    // resolves to a block that edition actually carries
    expect(names('goblin wizard', '2014').some((n) => /^Goblin/.test(n))).toBe(true);
    expect(names('goblin wizard', '2024').some((n) => /^Goblin/.test(n))).toBe(true);
  });

  test('every name comes with the span of the GM\'s words that found it', () => {
    for (const hit of namesInTheWords('an archlich enthroned on a sun of bone')) {
      expect(typeof hit.quote).toBe('string');
      expect(hit.quote.length).toBeGreaterThan(0);
    }
  });

  test('the finder is not wired into the prompt — the arm did not ship', () => {
    expect(buildPathPrompt({ name: '', concept: 'ogre blacksmith', cr: 5 })).not.toMatch(/offered_verdicts/);
  });
});
