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
