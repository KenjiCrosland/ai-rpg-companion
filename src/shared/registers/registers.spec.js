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
import {
  ALL_REGISTERS,
  REGISTERS_WITH_DESCRIPTOR,
  findRegisterByPrefix,
} from './index.mjs';
import { registerList } from '../register-list.mjs';

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

describe('Dwarven register promotion (2026-05)', () => {
  // Before the promotion, Dwarven was origin-only (no `prefix` /
  // `descriptor`), so it never appeared in `registerList` and never
  // rolled in the dungeon or item generators. These tests guard
  // against a regression to that state.

  it('the Dwarven entry exposes a register prefix', () => {
    const entry = ALL_REGISTERS.find(r => r.prefix === 'Dwarven');
    expect(entry).toBeTruthy();
    expect(entry.prefix).toBe('Dwarven');
  });

  it('the Dwarven entry carries a descriptor string', () => {
    const entry = ALL_REGISTERS.find(r => r.prefix === 'Dwarven');
    expect(typeof entry.descriptor).toBe('string');
    expect(entry.descriptor.length).toBeGreaterThan(0);
  });

  it('Dwarven appears in the consumer-facing registerList', () => {
    const dwarvenEntry = registerList.find(d => d.startsWith('Dwarven'));
    expect(dwarvenEntry).toBeTruthy();
  });

  it('findRegisterByPrefix resolves the Dwarven descriptor back to the registry entry', () => {
    const dwarvenDescriptor = registerList.find(d => d.startsWith('Dwarven'));
    const entry = findRegisterByPrefix(dwarvenDescriptor);
    expect(entry).toBeTruthy();
    expect(entry.prefix).toBe('Dwarven');
  });

  it('Dwarven retains its fantasyRaceKey so ORIGIN_CHARACTER_WHITELISTS still routes through it', () => {
    const entry = ALL_REGISTERS.find(r => r.prefix === 'Dwarven');
    expect(entry.fantasyRaceKey).toBe('Dwarven');
  });
});

describe('creatureTradition coverage', () => {
  // The 2026-05 register-injection work added curated non-human
  // creature lists to every non-protected register, so the dungeon
  // generator could pull from them when populating monsters /
  // inhabitants / supernatural identity. Protected registers
  // intentionally have NO creatureTradition (avoiding sacred-figure
  // invocation from living traditions).

  it('every non-protected register has a non-empty creatureTradition string', () => {
    const missing = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (entry.protected) continue;
      if (typeof entry.creatureTradition !== 'string' || entry.creatureTradition.trim().length === 0) {
        missing.push(entry.prefix);
      }
    }
    expect(missing).toEqual([]);
  });

  it('every protected register has NO creatureTradition (avoids sacred-figure invocation)', () => {
    const unexpected = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (!entry.protected) continue;
      if (entry.creatureTradition !== undefined) {
        unexpected.push(entry.prefix);
      }
    }
    expect(unexpected).toEqual([]);
  });

  it('the fictional-fantasy registers each have a creatureTradition', () => {
    // Spot-check: these are the registers most likely to suffer the
    // anthropocentric-drift bias the injection was designed to fix.
    const fictionalPrefixes = [
      'Elven', 'Dwarven', 'Draconic', 'Goblin-inspired',
      'Orcish', 'Aberrant', 'Abyssal', 'Infernal', 'Primordial',
      'Gnomish', 'Technomagical',
    ];
    for (const prefix of fictionalPrefixes) {
      const entry = ALL_REGISTERS.find(r => r.prefix === prefix);
      expect(entry).toBeTruthy();
      expect(typeof entry.creatureTradition).toBe('string');
      expect(entry.creatureTradition.length).toBeGreaterThan(0);
    }
  });
});

describe('materialTradition coverage', () => {
  // Parallel to creatureTradition. Production showed generic materials
  // (wax, salt, ash) clustering across registers that shouldn't share
  // them. Every non-protected register carries a curated list; the
  // dungeon prompt directs the LLM to reach for these before generic
  // fantasy defaults when describing surfaces, hazards, and atmosphere.

  it('every non-protected register has a non-empty materialTradition string', () => {
    const missing = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (entry.protected) continue;
      if (typeof entry.materialTradition !== 'string' || entry.materialTradition.trim().length === 0) {
        missing.push(entry.prefix);
      }
    }
    expect(missing).toEqual([]);
  });

  it('every protected register has NO materialTradition (same protective convention as creatureTradition)', () => {
    const unexpected = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (!entry.protected) continue;
      if (entry.materialTradition !== undefined) {
        unexpected.push(entry.prefix);
      }
    }
    expect(unexpected).toEqual([]);
  });

  it('materialTradition coverage matches creatureTradition coverage (every register has both or neither)', () => {
    // Either-both-or-neither: the two fields ride together, and if one
    // gets added to a register without the other it's a curation gap.
    const mismatched = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      const hasCT = typeof entry.creatureTradition === 'string';
      const hasMT = typeof entry.materialTradition === 'string';
      if (hasCT !== hasMT) {
        mismatched.push(`${entry.prefix}: creatureTradition=${hasCT}, materialTradition=${hasMT}`);
      }
    }
    expect(mismatched).toEqual([]);
  });

  it('user-specified registers carry the exact materials provided', () => {
    // Regression guard for the 2026-05 material-injection: the user
    // specified curated lists for 9 named registers. These must not
    // drift on edits.
    const userSpecified = {
      'Mesopotamian-inspired': ['bitumen', 'fired clay', 'lapis lazuli', 'salt', 'copper verdigris', 'palm resin'],
      'Norse-inspired':        ['ice', 'amber', 'iron rust', 'bone ash', 'pine resin', 'frozen blood'],
      'Romanian-inspired':     ['salt brine', 'cave calcite', 'iron oxide', 'cave pearl formations'],
      'Finnish-inspired':      ['pine tar', 'birch bark', 'lake ice', 'iron slag', 'frozen mud'],
      'Egyptian-inspired':     ['natron', 'bitumen', 'linen', 'alabaster dust', 'kohl'],
      'Goblin-inspired':       ['bone grease', 'charcoal', 'dried blood', 'rust', 'packed earth'],
      'Orcish':                ['bone grease', 'charcoal', 'dried blood', 'rust', 'packed earth'],
      'Gnomish':               ['gear grease', 'coal dust', 'brass filings', 'lumen residue', 'clockwork oil'],
      'Abyssal':               ['ichor', 'obsidian dust', 'scorched bone', 'sulfur crust', 'congealed shadow'],
    };
    for (const [prefix, materials] of Object.entries(userSpecified)) {
      const entry = ALL_REGISTERS.find(r => r.prefix === prefix);
      expect(entry).toBeTruthy();
      for (const material of materials) {
        expect(entry.materialTradition).toContain(material);
      }
    }
  });
});

describe('creatureTraditionByTier coverage', () => {
  // Tier-bucketed creature data backs the dungeon prompt's per-
  // generation interpolation of worked examples. Each non-protected
  // register MUST carry all three tier buckets non-empty so the
  // picker can always return a tier-appropriate creature. Without
  // this guarantee, worked examples could fall back to bracket
  // placeholders for whole registers, defeating the cargo-cult fix.

  it('every non-protected register has complicating / significant / scary buckets, each non-empty', () => {
    const issues = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (entry.protected) continue;
      const buckets = entry.creatureTraditionByTier;
      if (!buckets || typeof buckets !== 'object') {
        issues.push(`${entry.prefix}: missing creatureTraditionByTier`);
        continue;
      }
      for (const band of ['complicating', 'significant', 'scary']) {
        const arr = buckets[band];
        if (!Array.isArray(arr) || arr.length === 0) {
          issues.push(`${entry.prefix}: bucket "${band}" is empty or missing`);
        } else if (arr.some(s => typeof s !== 'string' || s.trim().length === 0)) {
          issues.push(`${entry.prefix}: bucket "${band}" contains non-string or empty entries`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it('protected registers have NO creatureTraditionByTier (same protective convention as creatureTradition)', () => {
    const unexpected = [];
    for (const entry of REGISTERS_WITH_DESCRIPTOR) {
      if (!entry.protected) continue;
      if (entry.creatureTraditionByTier !== undefined) {
        unexpected.push(entry.prefix);
      }
    }
    expect(unexpected).toEqual([]);
  });

  it('the Norse Tier 5 bucket contains scale-appropriate apex creatures', () => {
    // Regression-guard: someone editing the buckets might accidentally
    // demote a major Norse creature (jötunn, draugr) to the
    // complicating tier. The user's tier-scale concern was the
    // origin of the bucketing architecture — this test pins the
    // emotional category to the apex creatures.
    const norse = ALL_REGISTERS.find(r => r.prefix === 'Norse-inspired');
    expect(norse).toBeTruthy();
    const scary = norse.creatureTraditionByTier.scary.join(' | ');
    // At least one of the canonical Norse cosmic-tier threats must
    // appear in the scary bucket.
    expect(scary).toMatch(/draugr|jötunn|lindworm|fenrisúlfr/i);
  });
});
