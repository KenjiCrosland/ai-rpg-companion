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

});
