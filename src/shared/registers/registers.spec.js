/**
 * Format walker for every register data file in this directory.
 *
 * One spec for all registers. Validates STRUCTURAL shape only (each
 * exported pool is a non-empty array of non-empty trimmed strings; no
 * exact-string duplicates within a pool). Does NOT validate CONTENT —
 * curation correctness (no real-figure collisions, sacred-term
 * exclusions, construction-pattern restrictions) is verified through
 * manual production-review of generated outputs, not Jest assertions.
 *
 * Per-register specs were deliberately consolidated into this single
 * walker. Adding a new register data file: add the export name to the
 * `REGISTER_POOL_EXPORTS` map below.
 */

import * as aberrant from './aberrant.mjs';
import * as abyssal from './abyssal.mjs';
import * as andean from './andean.mjs';
import * as draconic from './draconic.mjs';
import * as dwarven from './dwarven.mjs';
import * as goblinoid from './goblinoid.mjs';
import * as infernal from './infernal.mjs';
import * as orcish from './orcish.mjs';
import * as primordial from './primordial.mjs';
import * as elven from './elven.mjs';
import * as yoruba from './yoruba.mjs';

// Map of register-name → array-export-names that should pass the
// format walk. Single-pool registers list one export; pool-architecture
// registers (Andean, Yoruba) list multiple (character/place/spirit).
// Non-array exports (cultural notes strings, avoid-lists for curation-
// time reference only) are tested separately below.
const REGISTER_POOL_EXPORTS = {
  aberrant:   { module: aberrant,   pools: ['aberrantCharacterEpithets'] },
  abyssal:    { module: abyssal,    pools: ['abyssalCharacterEpithets'] },
  andean:     { module: andean,     pools: ['andeanCharacterEpithets', 'andeanPlaceEpithets', 'andeanSpiritEpithets'] },
  draconic:   { module: draconic,   pools: ['draconicCharacterEpithets'] },
  dwarven:    { module: dwarven,    pools: ['dwarvenCharacterEpithets'] },
  goblinoid:  { module: goblinoid,  pools: ['goblinoidCharacterEpithets'] },
  infernal:   { module: infernal,   pools: ['infernalCharacterEpithets'] },
  orcish:     { module: orcish,     pools: ['orcishCharacterEpithets'] },
  primordial: { module: primordial, pools: ['primordialCharacterEpithets'] },
  elven:   { module: elven,   pools: ['elvenCharacterEpithets'] },
  yoruba:     { module: yoruba,     pools: ['yorubaCharacterEpithets', 'yorubaPlaceEpithets', 'yorubaSpiritEpithets'] },
};

describe('register data files — format walker', () => {
  it('every named pool export is a non-empty array of non-empty trimmed strings with no duplicates', () => {
    for (const [registerName, { module, pools }] of Object.entries(REGISTER_POOL_EXPORTS)) {
      for (const poolName of pools) {
        const pool = module[poolName];
        // Each named export resolves to an array.
        expect(Array.isArray(pool)).toBe(true);
        // Non-empty.
        expect(pool.length).toBeGreaterThan(0);
        // Every entry is a non-empty trimmed string.
        for (const entry of pool) {
          expect(typeof entry).toBe('string');
          expect(entry.length).toBeGreaterThan(0);
          expect(entry).toBe(entry.trim());
        }
        // No exact-string duplicates within a pool.
        expect(new Set(pool).size).toBe(pool.length);
      }
    }
  });
});
