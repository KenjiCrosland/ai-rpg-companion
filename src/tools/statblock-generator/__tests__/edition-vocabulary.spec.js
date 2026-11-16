import { to2014Grammar } from '../format-2024/generate.mjs';
import { EDITION_TERMS_2024_TO_2014 } from '../format-2024/lint.mjs';

// FORTY #1 (2026-11-02). R3.2 stopped sending a row we wrote from a form to the
// conversion call — the call that dropped Krennik's "immune for 24 hours". The
// call had also been silently converting 2024 vocabulary on the way past, so
// three sheets shipped 2024 labels in a 2014 block and the checker's own
// `vocab-2024-in-2014` gate failed them. These are the real rows from that run.
const GATED = ['Trigger:', 'Response:', ...EDITION_TERMS_2024_TO_2014.map(([f]) => f)];

describe('a 2014 printing carries no 2024 vocabulary', () => {
  test.each([
    ['Black Iron Sentinel / Interpose', 'Trigger: A creature within 5 feet of the iron sentinel that it guards is hit by an attack roll. Response: The attack hits the iron sentinel instead, and the iron sentinel has Resistance to the attack damage.'],
    ['Ilvareth / Protective Magic', 'Trigger: Ilvareth is hit by an attack roll. Response: Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn.'],
    ['Vashka / Riposte', 'Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.'],
    ['Adult Red Dragon / Spellcasting', 'At Will: *detect magic*; 1/Day Each: *fireball*'],
    ['Goblin Boss / Scimitar', 'The goblin boss attacks with Advantage if an ally is within 5 feet of the target.'],
    ['Vampire / Vampire Weakness', 'The vampire has Disadvantage on attack rolls while in sunlight.'],
  ])('%s', (_label, src) => {
    const out = to2014Grammar(src);
    for (const w of GATED) expect(out).not.toContain(w);
  });

  test('a reaction becomes one 2014 sentence, and a proper noun keeps its capital', () => {
    const sentinel = to2014Grammar('Trigger: A creature within 5 feet of the iron sentinel is hit by an attack roll. Response: The attack hits the iron sentinel instead.');
    expect(sentinel).toBe('When a creature within 5 feet of the iron sentinel is hit by an attack roll, the attack hits the iron sentinel instead.');
    const named = to2014Grammar('Trigger: Ilvareth is hit by an attack roll. Response: Ilvareth casts Shield in response.');
    expect(named).toBe('When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response.'); // never lowercased
  });

  test('the converter and the checker read ONE table, so they cannot disagree', () => {
    for (const [from, to] of EDITION_TERMS_2024_TO_2014) {
      expect(to2014Grammar(`x ${from} y`)).toContain(to);
      expect(to2014Grammar(`x ${from} y`)).not.toContain(from);
    }
  });

  test('a row with no 2024 vocabulary is left alone', () => {
    const plain = 'The creature can breathe air and water.';
    expect(to2014Grammar(plain)).toBe(plain);
  });
});

describe("the 2014 reaction sentence (the critic, 2026-11-03: \"When X. ,  Y\")", () => {
  // The engine writes `*Trigger:* … *Response:* …`, and the converter matched `Trigger:`
  // INSIDE those asterisks — so the captured trigger ended in "*", the trailing-stop
  // strip never fired, and a later emphasis strip left both artifacts at once: a doubled
  // space where "* " had been, and ". ," where the kept stop met the added comma.
  // Reproduced on exactly the four sheets the critic named in
  // sweep-2026-11-03T23-14-10 (#18, #23, #25, #28) — these are their stored rows.
  const CASES = [
    ['#18 Protective Magic', '*Trigger:* The osseo-solar lich is hit by an attack roll. *Response:* The osseo-solar lich casts *Shield* in response, gaining a +5 bonus to AC.'],
    ['#23 Riposte', '*Trigger:* A creature within 5 feet of Vashka misses it with a melee attack roll. *Response:* Vashka makes one Longsword attack against that creature.'],
    ['#25 Interpose', '*Trigger:* A creature within 5 feet of the sentinel that it guards is hit by an attack roll. *Response:* The attack hits the sentinel instead.'],
    ['#28 Protective Magic', '*Trigger:* Ilvareth is hit by an attack roll. *Response:* Ilvareth casts *Shield* in response.'],
  ];

  it.each(CASES)('%s renders with no ". ," and no doubled space', (_name, row) => {
    const out = to2014Grammar(row);
    expect(out).not.toMatch(/\.\s+,/);
    expect(out).not.toMatch(/\S {2,}\S/);
    expect(out).toMatch(/^When \S/);
    expect(out).not.toMatch(/Trigger:|Response:/);
  });

  it('lowercases the determiner, which the asterisk used to block', () => {
    // `uncap` only lowercases a leading determiner or pronoun; with the asterisk
    // captured, the first "word" was "*" and every trigger kept its capital.
    expect(to2014Grammar(CASES[1][1])).toMatch(/^When a creature within 5 feet/);
    expect(to2014Grammar(CASES[0][1])).toMatch(/^When the osseo-solar lich/);
  });

  it('a proper name keeps its capital', () => {
    expect(to2014Grammar(CASES[3][1])).toMatch(/^When Ilvareth is hit/);
  });
});
