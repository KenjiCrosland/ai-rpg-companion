import { rotateRegisterExamples } from './rotate-register-examples.mjs';
import { goblinoidCharacterEpithets } from '@/shared/registers/goblinoid.mjs';
import { orcishCharacterEpithets } from '@/shared/registers/orcish.mjs';
import { elvenCharacterEpithets } from '@/shared/registers/elven.mjs';
import { draconicCharacterEpithets } from '@/shared/registers/draconic.mjs';
import { aberrantCharacterEpithets } from '@/shared/registers/aberrant.mjs';
import { abyssalCharacterEpithets } from '@/shared/registers/abyssal.mjs';
import { infernalCharacterEpithets } from '@/shared/registers/infernal.mjs';
import { primordialCharacterEpithets } from '@/shared/registers/primordial.mjs';

const TAIL = /\(e\.g\.,\s*([^)]*)\)\s*$/;

function extractTailNames(descriptor) {
  const match = descriptor.match(TAIL);
  if (!match) return null;
  return match[1].split(',').map(s => s.trim()).filter(Boolean);
}

describe('rotateRegisterExamples', () => {
  describe('whitelisted fictional palettes — tail rotated from pool', () => {
    const cases = [
      { name: 'Goblin-inspired', descriptor: 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)', pool: goblinoidCharacterEpithets },
      { name: 'Orcish',          descriptor: 'Orcish: brutal, guttural (e.g., Grokthash, Uzgark, Dra\'mok)',                pool: orcishCharacterEpithets },
      { name: 'Elven',           descriptor: 'Elven: lyrical, vowel-rich (e.g., Aelindariel, Saereldreth, Glorwenneth)',   pool: elvenCharacterEpithets },
      { name: 'Draconic',        descriptor: 'Draconic: harsh sibilants, ancient weight (e.g., Szarthrax, Vyrmokk, Kaelsithur)', pool: draconicCharacterEpithets },
      { name: 'Aberrant',        descriptor: 'Aberrant: unpronounceable clusters, wrong-sounding (e.g., Xith\'vaar, Qolenth, Uurm)', pool: aberrantCharacterEpithets },
      { name: 'Abyssal',         descriptor: 'Abyssal: guttural, chaotic (e.g., Ghar\'zuul, Rotmaw, Vilesung)',            pool: abyssalCharacterEpithets },
      { name: 'Infernal',        descriptor: 'Infernal: sharp, aggressive (e.g., Vex\'tharion, Morkaal, Sazrith)',         pool: infernalCharacterEpithets },
      { name: 'Primordial',      descriptor: 'Primordial: pre-language sounds, elemental (e.g., Aath\'kol, Rumblith, Dross)', pool: primordialCharacterEpithets },
    ];

    for (const { name, descriptor, pool } of cases) {
      it(`${name}: replaces the tail with three names drawn from the pool`, () => {
        const result = rotateRegisterExamples(descriptor);
        const names = extractTailNames(result);
        expect(names).not.toBeNull();
        expect(names).toHaveLength(3);
        for (const n of names) {
          expect(pool).toContain(n);
        }
      });

      it(`${name}: preserves the descriptor body before the tail`, () => {
        const result = rotateRegisterExamples(descriptor);
        const bodyOriginal = descriptor.replace(TAIL, '').trimEnd();
        const bodyResult = result.replace(TAIL, '').trimEnd();
        expect(bodyResult).toBe(bodyOriginal);
      });
    }

    it('produces three distinct names per call', () => {
      const descriptor = 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)';
      // Use a sequence-based fake random so the test is deterministic
      // and would fail if the implementation didn't dedupe.
      const seq = [0.0, 0.0, 0.01, 0.02];
      let i = 0;
      const fakeRandom = () => seq[i++ % seq.length];
      const result = rotateRegisterExamples(descriptor, fakeRandom);
      const names = extractTailNames(result);
      expect(new Set(names).size).toBe(3);
    });

    it('uses the injected randomness deterministically', () => {
      const descriptor = 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)';
      // Three fixed picks: indices 0, 50, 99 of the goblinoid pool.
      const pool = goblinoidCharacterEpithets;
      const targets = [0, 50, pool.length - 1];
      const fakeRandom = () => {
        const idx = targets.shift();
        return idx / pool.length;
      };
      const result = rotateRegisterExamples(descriptor, fakeRandom);
      const names = extractTailNames(result);
      expect(names).toEqual([pool[0], pool[50], pool[pool.length - 1]]);
    });

    it('rotates fresh names across many calls (anti-anchor smoke)', () => {
      const descriptor = 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)';
      const seen = new Set();
      for (let i = 0; i < 50; i += 1) {
        const result = rotateRegisterExamples(descriptor);
        for (const n of extractTailNames(result)) seen.add(n);
      }
      // 50 generations × 3 picks = 150 picks across a 100-name pool;
      // distinct-name count should clear half the pool comfortably.
      expect(seen.size).toBeGreaterThan(20);
    });
  });

  describe('non-whitelisted real-cultural registers — descriptor passes through', () => {
    const cases = [
      'Welsh-inspired: soft consonants (ll, dd, ch), vowel-rich, mythic-poetic register (e.g., Branwen, Caelith, Dunmara)',
      'Hungarian-inspired: distinctive vowel harmony, Magyar register (e.g., Csaba, Kinga, Zoltán)',
      'Old-Norse-inspired: Eddaic register, archaic compound names, kennings (e.g., Sigrún, Hjorleif, Thrym)',
      'Latin-inspired: formal, structured (e.g., Aurelium, Ferrata, Nexus Imperium)',
      'Celtic-inspired: soft consonants, nature references (e.g., Branwen, Caelith, Dunmara)',
      'Gnomish: clever, playful, mechanical (e.g., Fizzwocket, Cogsworth, Tinberlin)',
      'Technomagical: clinical with flair (e.g., Arcanaforge Mark IV, Voltspire, Aethercog)',
    ];
    for (const descriptor of cases) {
      it(`returns ${descriptor.split(':')[0]} unchanged`, () => {
        expect(rotateRegisterExamples(descriptor)).toBe(descriptor);
      });
    }
  });

  describe('edge cases', () => {
    it('returns null/undefined/empty inputs unchanged', () => {
      expect(rotateRegisterExamples(null)).toBeNull();
      expect(rotateRegisterExamples(undefined)).toBeUndefined();
      expect(rotateRegisterExamples('')).toBe('');
    });

    it('returns non-string inputs unchanged', () => {
      const obj = { register: 'Goblin-inspired' };
      expect(rotateRegisterExamples(obj)).toBe(obj);
    });

    it('descriptor with no example tail still gets a tail when whitelist matches', () => {
      const descriptor = 'Goblin-inspired: sharp, crude, percussive';
      const result = rotateRegisterExamples(descriptor);
      const names = extractTailNames(result);
      expect(names).not.toBeNull();
      expect(names).toHaveLength(3);
      for (const n of names) {
        expect(goblinoidCharacterEpithets).toContain(n);
      }
    });
  });
});
