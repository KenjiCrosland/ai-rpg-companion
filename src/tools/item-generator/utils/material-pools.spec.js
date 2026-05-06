import { originMaterialPools, allMaterials } from './material-pools.mjs';

// The 24 origins matching the originDefinitions map in ItemGenerator.vue.
// Adding/removing an origin in originDefinitions should be matched by an
// equivalent change here, so this list doubles as a regression guard
// against pool/origin drift.
const ALL_ORIGINS = [
  'Abyssal', 'Aberrant', 'Alchemical', 'Astral', 'Celestial', 'Deep Sea',
  'Draconic', 'Dwarven', 'Elemental', 'Elven', 'Fey', 'Giant', 'Gnomish',
  'Goblinoid', 'Infernal', 'Lycanthropic', 'Necromantic', 'Orcish',
  'Primordial', 'Shadow', 'Technomagical', 'Vampiric', 'Verdant', 'Wizardry',
];

const CULTURAL_ORIGINS = [
  'Orcish', 'Dwarven', 'Elven', 'Goblinoid', 'Gnomish', 'Giant',
];

const AESTHETIC_ORIGINS = ALL_ORIGINS.filter(
  o => !CULTURAL_ORIGINS.includes(o),
);

describe('originMaterialPools', () => {
  it('covers every origin in originDefinitions', () => {
    expect(Object.keys(originMaterialPools).sort()).toEqual(ALL_ORIGINS.sort());
  });

  it('every aesthetic origin pool has at least 15 entries', () => {
    // Brief target: 15-25 for aesthetic origins, aim for upper end.
    // 15 is the floor — anything below indicates the pool is too thin
    // and likely missing the material variety the brief mandates.
    for (const origin of AESTHETIC_ORIGINS) {
      const pool = originMaterialPools[origin];
      expect(pool.length).toBeGreaterThanOrEqual(15);
    }
  });

  it('every cultural origin pool has at least 30 entries', () => {
    // Brief target: 30-40 for cultural origins. Cultural origins need
    // breadth to honor multidimensional craft traditions and avoid
    // stereotyping into single material registers.
    for (const origin of CULTURAL_ORIGINS) {
      const pool = originMaterialPools[origin];
      expect(pool.length).toBeGreaterThanOrEqual(30);
    }
  });

  it('every entry uses the "<name> — <description>" format', () => {
    // Format mirrors the legacy materials array. The em-dash separator
    // gives the LLM a sensory description after the material name —
    // critical for grounding physical_description text. Catches typos
    // (hyphens instead of em-dashes, missing description).
    for (const [origin, pool] of Object.entries(originMaterialPools)) {
      for (const entry of pool) {
        expect(typeof entry).toBe('string');
        expect(entry).toMatch(/ — .+/);
      }
    }
  });

  it('no entry appears twice within the same pool', () => {
    // Within-pool duplicates over-weight that material in random
    // selection. Cross-pool duplicates are fine and expected (they
    // reflect genuine thematic overlap), but within-pool is always
    // a mistake.
    for (const [origin, pool] of Object.entries(originMaterialPools)) {
      const unique = new Set(pool);
      expect(unique.size).toBe(pool.length);
    }
  });

  describe('cultural-origin breadth (anti-stereotyping guards)', () => {
    // The brief specifies that cultural origins must NOT be reduced
    // to stereotypical material registers. These tests check that
    // each cultural origin's pool contains at least one entry from
    // a category the stereotype would exclude. They're shallow
    // sanity checks, not deep cultural-content audits — but they
    // catch outright reduction.

    it('Orcish pool contains refined/traded materials, not just crude', () => {
      const pool = originMaterialPools.Orcish.join(' | ').toLowerCase();
      // Brief: include refined metals, fine cloths, polished stones
      // alongside beast-tusk and tribal materials. Look for traded/
      // refined indicators.
      expect(pool).toMatch(/silk|silver|gold|jade|pearl|polished/);
    });

    it('Dwarven pool contains non-metal/non-stone materials', () => {
      const pool = originMaterialPools.Dwarven.join(' | ').toLowerCase();
      // Brief: include carved bone, polished wood, leather, woven
      // cloth alongside the obvious mountain-craft.
      expect(pool).toMatch(/leather|cloth|bone|wood|silk/);
    });

    it('Elven pool contains rougher/utility materials, not just elegant', () => {
      const pool = originMaterialPools.Elven.join(' | ').toLowerCase();
      // Brief: include rougher utility materials — leather armor,
      // bone tools, plain woods — alongside the obvious refined.
      expect(pool).toMatch(/plain|raw|knapped|bone tool|clay/);
    });

    it('Gnomish pool contains both delicate and mechanical materials', () => {
      const pool = originMaterialPools.Gnomish.join(' | ').toLowerCase();
      expect(pool).toMatch(/clockwork|gear|spring|piston/);  // mechanical
      expect(pool).toMatch(/inlay|delicate|fine|silk|jewel/);  // delicate
    });

    it('Goblinoid pool contains acquired/traded materials, not only scavenged', () => {
      const pool = originMaterialPools.Goblinoid.join(' | ').toLowerCase();
      // Brief: NOT limited to scavenged or crude; whatever they acquire.
      expect(pool).toMatch(/looted|traded|silk|velvet|gold|silver/);
    });

    it('Giant pool contains both massive-scale and finer-at-giant-proportion materials', () => {
      const pool = originMaterialPools.Giant.join(' | ').toLowerCase();
      expect(pool).toMatch(/enormous|mountain|massive|vast|great/);  // massive-scale
      expect(pool).toMatch(/bronze|polished|carved|hammered/);  // finer at giant scale
    });
  });

  describe('aesthetic-origin integrity (quick smoke checks)', () => {
    // Each aesthetic origin should have materials that thematically
    // belong. These are not audits of every entry — just spot checks
    // that the central register is represented, not accidentally drifted.

    it('Abyssal contains chaotic/corrupted register markers', () => {
      const pool = originMaterialPools.Abyssal.join(' | ').toLowerCase();
      expect(pool).toMatch(/demon|abyss|blood|chaos|corrupted|sulfur|hell/);
    });

    it('Celestial contains radiant/blessed register markers', () => {
      const pool = originMaterialPools.Celestial.join(' | ').toLowerCase();
      expect(pool).toMatch(/sun|blessed|prayer|saint|temple|gospel|liturgical|celestial|alabaster|opal-of-vows/);
    });

    it('Necromantic contains death-coded register markers', () => {
      const pool = originMaterialPools.Necromantic.join(' | ').toLowerCase();
      expect(pool).toMatch(/tomb|grave|crypt|ossuary|shroud|corpse|mortuary|wraith|elegy/);
    });

    it('Verdant contains living/growing register markers', () => {
      const pool = originMaterialPools.Verdant.join(' | ').toLowerCase();
      expect(pool).toMatch(/wood|root|sap|leaf|bark|moss|fungal|bloom|living/);
    });
  });
});

describe('allMaterials', () => {
  it('is a deduplicated union of all per-origin pools', () => {
    const expected = Array.from(
      new Set(Object.values(originMaterialPools).flat()),
    );
    // Set comparison via length + every-includes; arrays may differ
    // in order between Set iteration and the export's iteration.
    expect(allMaterials.length).toBe(expected.length);
    for (const entry of expected) {
      expect(allMaterials).toContain(entry);
    }
  });

  it('contains no duplicate entries', () => {
    const unique = new Set(allMaterials);
    expect(unique.size).toBe(allMaterials.length);
  });

  it('is large enough to provide variety as a fallback', () => {
    // Brief target: 150-200 distinct materials across all pools.
    // The fallback is used when origin is unresolved; if it's small,
    // unresolved-origin generations feel repetitive.
    expect(allMaterials.length).toBeGreaterThanOrEqual(150);
  });

  it('every entry uses the "<name> — <description>" format', () => {
    for (const entry of allMaterials) {
      expect(entry).toMatch(/ — .+/);
    }
  });
});
