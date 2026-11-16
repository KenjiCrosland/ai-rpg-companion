/**
 * CODE FINDS THE PRINTED NAMES, THE CALL JUDGES THEM (the names arm, 2026-11-14).
 *
 * The swap test showed the path call often fails to RECOGNISE a printed creature the prompt
 * does not use as an example: the Troll is named five times in the prompt and scores 10/10,
 * the Ogre and Ghoul are named nowhere and score 3-6/10. That is recall, not judgement. So
 * code offers the names and the call chooses among them — a selection problem.
 *
 * THE FIRST ARM MISSED ITS BAR and was reverted: it offered job and people blocks too, and
 * "clockwork spider" fell 10/10 to 6/10 while "goblin assassin" fell 8/10 to 6/10 when the
 * call took the Assassin as the body. It did fix recall — "ogre blacksmith" 5/10 to 10/10.
 *
 * THE NARROWED ARM (monsters only, the GM's own word, one mention) ALSO MISSED ITS BAR and is
 * also reverted: the monster group rose 89/160 to 118/160 against a bar of 144, because the
 * call answers "resembles" for a medusa sculptor or a mummy librarian even when asked outright.
 * Recall was the fixable half; judgement is not.
 *
 * The FINDER is kept and tested — `scripts/probe-path-key.mjs` reads it, and whatever replaces
 * the arm needs the same closed-fact lookup. These test its return value only. No test asserts
 * on the prompt's wording.
 */
import { namesInTheWords, buildPathPrompt } from '../path.mjs';

const names = (t, ed = '2024') => namesInTheWords(t, { edition: ed }).map((x) => x.name);

describe('the finder: closed facts only', () => {
  test('a whole printed name is found as a whole word', () => {
    expect(names('a dire wolf with a frost-rimed hide')).toEqual(['Dire Wolf']);
    expect(names('frost giant jarl')).toEqual(['Frost Giant']);
    expect(names('ghoul gravedigger')).toEqual(['Ghoul']);
  });

  test('the longest name wins WITHIN ONE MENTION', () => {
    expect(names('a dire wolf')).toEqual(['Dire Wolf']); // the "wolf" inside it yields
    // two creatures in two PLACES both stand — the first arm offered only the Dire Wolf, and
    // the call's "resembles" was the right answer to the wrong offer
    expect(names("the druid's wolf companion, bigger than a dire wolf").sort()).toEqual(['Dire Wolf', 'Wolf']);
  });

  test('MONSTERS ONLY — a job block or a people\'s block is never offered', () => {
    // where "goblin assassin" regressed: the Assassin was on offer and the call took it
    expect(names('goblin assassin')).toEqual([]);
    expect(names('goblin wizard')).toEqual([]);
    expect(names('goblin boss with a heavy crossbow')).toEqual([]);
    expect(names('vampire pirate')).toEqual(['Vampire']); // the Pirate is a job block
  });

  test("the GM's own word is what the call is asked about", () => {
    // the first arm asked whether the creature is a "Green Hag"; the GM wrote "hag", and
    // "not" was a fair answer to the wrong question. Code still picks WHICH hag.
    const hag = namesInTheWords('hag midwife')[0];
    expect(hag).toMatchObject({ name: 'Green Hag', ask: 'hag' });
    // a DIRECT hit already is the GM's word, so it is asked under print's spelling
    expect(namesInTheWords('ogre blacksmith')[0]).toMatchObject({ name: 'Ogre', ask: 'Ogre' });
  });

  test('a 2014 sheet searches both books without a name cancelling itself', () => {
    // both corpora carry the Ogre, so it hit twice on one span and the two hits each
    // "covered" the other — every 2014 monster prompt silently offered nothing
    expect(names('ogre', '2014')).toEqual(['Ogre']);
    expect(names('owlbear but CR 8', '2014')).toEqual(['Owlbear']);
  });

  test('an alias word resolves through the table this file already owns', () => {
    expect(names('an archlich enthroned on a sun of bone')).toEqual(['Lich']);
    expect(names('hag midwife')).toEqual(['Green Hag']); // hagFor picks by context
  });

  test('a word that merely CONTAINS a name finds nothing', () => {
    expect(names('cathedral-vault ooze')).toEqual([]); // the block is the Gray Ooze
    expect(names('orc blacksmith')).toEqual([]); // orc is a species kit, not a print block
    expect(names('Mind Flayer')).toEqual([]); // Product Identity, in neither corpus
  });

  test('the edition rule: a name only the 2014 book carries is found only on a 2014 sheet', () => {
    // the Banshee is in 5.1 and not in 5.2
    expect(names('a banshee that wails for the drowned', '2014')).toContain('Banshee');
    expect(names('a banshee that wails for the drowned', '2024')).toEqual([]);
  });

  test('every name comes with the span of the GM\'s words that found it', () => {
    for (const hit of namesInTheWords('an archlich enthroned on a sun of bone')) {
      expect(typeof hit.quote).toBe('string');
      expect(hit.quote.length).toBeGreaterThan(0);
    }
  });

  test('the finder is not wired into the prompt — neither arm shipped', () => {
    expect(buildPathPrompt({ name: '', concept: 'ogre blacksmith', cr: 5 })).not.toMatch(/offered_verdicts/);
  });
});
