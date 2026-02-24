import { getDefensiveCR, getArmorClassCr } from './calculateCR.js';
import crObjects from '../data/challengeRatings.json'

describe('getDefensiveCR', () => {
  it('should return the appropriate CR value for Crystal Centipede', () => {
    const monster = {
      "name": "Crystal Centipede",
      "armor_class": "20 (natural armor)",
      "hit_points": "300 (24d12 + 120)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Poison",
    };
    expect(getDefensiveCR(monster)).toBe('22');
  });

  it('should return the appropriate CR value for a monster in CR 1-4', () => {
    const monster = {
      "name": "Goblin",
      "armor_class": "15 (leather armor)",
      "hit_points": "7 (2d6)",
      "damage_resistances": "Piercing from Nonmagical Attacks",
      "damage_immunities": "Poison",
    };
    expect(getDefensiveCR(monster)).toBe('2');
  });

  it('should return the appropriate CR value for a monster in CR 5-10', () => {
    const monster = {
      "name": "Stone Golem",
      "armor_class": "17 (natural armor)",
      "hit_points": "178 (17d10 + 85)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Poison, Psychic",
    };
    expect(getDefensiveCR(monster)).toBe('20');
  });

  it('should return the appropriate CR value for a monster in CR 11-16', () => {
    const monster = {
      "name": "Elder Elemental",
      "armor_class": "18 (natural armor)",
      "hit_points": "199 (19d10 + 95)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Poison, Fire, Cold",
    };
    expect(getDefensiveCR(monster)).toBe('20');
  });

  it('should return the appropriate CR value for a monster in CR 17+', () => {
    const monster = {
      "name": "Ancient Red Dragon",
      "armor_class": "22 (natural armor)",
      "hit_points": "546 (28d20 + 252)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Fire, Poison, Cold",
    };
    expect(getDefensiveCR(monster)).toBe('28');
  });
});

describe('getArmorClassCr', () => {
  it('returns the correct CR when AC is as suggested', () => {
    expect(getArmorClassCr(2, crObjects["2"]["armor_class"], crObjects)).toEqual(2);
  });

  it('returns the correct CR when AC is 2 points higher than suggested', () => {
    expect(getArmorClassCr(2, crObjects["2"]["armor_class"] + 2, crObjects)).toEqual(3);
  });

  it('returns the correct CR when AC is 2 points lower than suggested', () => {
    expect(getArmorClassCr(2, crObjects["2"]["armor_class"] - 2, crObjects)).toEqual(1);
  });

  it('handles fractional CR values correctly', () => {
    expect(getArmorClassCr("1/2", crObjects["1/2"]["armor_class"] - 2, crObjects)).toEqual(0);
  });

  it('returns the original CR when AC difference is less than 2', () => {
    expect(getArmorClassCr(2, crObjects["2"]["armor_class"] + 1, crObjects)).toEqual(2);
  });

  it('handles very high AC adjustments', () => {
    expect(getArmorClassCr(2, crObjects["2"]["armor_class"] + 10, crObjects)).toBeGreaterThan(2);
  });

  it('handles very low AC adjustments', () => {
    const result = getArmorClassCr(5, crObjects["5"]["armor_class"] - 10, crObjects);
    expect(result).toBeLessThan(5);
  });

  it('handles AC adjustments for high CR monsters', () => {
    const result = getArmorClassCr(20, crObjects["20"]["armor_class"] + 2, crObjects);
    expect(result).toBeGreaterThanOrEqual(20);
  });
});

describe('getDefensiveCR - Additional Edge Cases', () => {
  it('should handle monster with only resistances, no immunities', () => {
    const monster = {
      name: 'Resistant Beast',
      armor_class: '14',
      hit_points: '50 (8d8 + 16)',
      damage_resistances: 'Fire, Cold',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle monster with only immunities, no resistances', () => {
    const monster = {
      name: 'Immune Construct',
      armor_class: '16',
      hit_points: '100 (12d10 + 36)',
      damage_resistances: '',
      damage_immunities: 'Poison, Psychic',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle monster with multiple resistances and immunities', () => {
    const monster = {
      name: 'Heavily Armored Golem',
      armor_class: '22',
      hit_points: '250 (20d12 + 120)',
      damage_resistances: 'Bludgeoning, Piercing, and Slashing from Nonmagical Attacks',
      damage_immunities: 'Poison, Fire, Cold, Lightning',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle very low HP monsters', () => {
    const monster = {
      name: 'Fragile Creature',
      armor_class: '10',
      hit_points: '1 (1d4 - 1)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });

  it('should handle very high HP monsters', () => {
    const monster = {
      name: 'Tarrasque',
      armor_class: '25',
      hit_points: '676 (33d20 + 330)',
      damage_resistances: 'Fire, Cold, Lightning; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks',
      damage_immunities: 'Poison',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
    expect(parseInt(result)).toBeGreaterThan(20);
  });

  it('should handle monsters with fractional CR HP values', () => {
    const monster = {
      name: 'Kobold',
      armor_class: '12',
      hit_points: '5 (2d6 - 2)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });

  it('should handle monsters with very high AC', () => {
    const monster = {
      name: 'Adamantine Armor',
      armor_class: '25 (natural armor)',
      hit_points: '150 (12d12 + 72)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });

  it('should handle monsters with very low AC', () => {
    const monster = {
      name: 'Unarmored Mage',
      armor_class: '8',
      hit_points: '40 (9d8)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });

  it('should handle empty resistance and immunity strings', () => {
    const monster = {
      name: 'Normal Warrior',
      armor_class: '15 (chain mail)',
      hit_points: '60 (8d8 + 24)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle missing resistance and immunity fields', () => {
    const monster = {
      name: 'Basic Monster',
      armor_class: '13',
      hit_points: '45 (7d8 + 14)',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });

  it('should handle CR 1/8 and 1/4 monsters', () => {
    const tinyMonster = {
      name: 'Tiny Beast',
      armor_class: '10',
      hit_points: '2 (1d4)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(tinyMonster);
    expect(result).toBeDefined();
  });

  it('should handle monsters at CR boundaries', () => {
    // Test at CR 4-5 boundary
    const boundaryMonster = {
      name: 'Boundary Beast',
      armor_class: '15',
      hit_points: '85 (10d10 + 30)',
      damage_resistances: '',
      damage_immunities: '',
    };
    const result = getDefensiveCR(boundaryMonster);
    expect(result).toBeDefined();
  });

  it('should handle monsters at CR 10-11 boundary', () => {
    const highCRMonster = {
      name: 'Mid-Tier Monster',
      armor_class: '17',
      hit_points: '150 (16d10 + 64)',
      damage_resistances: 'Fire',
      damage_immunities: '',
    };
    const result = getDefensiveCR(highCRMonster);
    expect(result).toBeDefined();
    expect(parseInt(result)).toBeGreaterThanOrEqual(8);
  });

  it('should handle monsters with complex resistance strings', () => {
    const monster = {
      name: 'Complex Defender',
      armor_class: '18',
      hit_points: '120 (16d8 + 48)',
      damage_resistances: 'Acid, Cold; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks that aren\'t Silvered',
      damage_immunities: 'Fire, Lightning, Poison',
    };
    const result = getDefensiveCR(monster);
    expect(result).toBeDefined();
  });
});


