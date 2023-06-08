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
    expect(getDefensiveCR(monster)).toBe('17');
  });

  it('should return the appropriate CR value for a monster in CR 1-4', () => {
    const monster = {
      "name": "Goblin",
      "armor_class": "15 (leather armor)",
      "hit_points": "7 (2d6)",
      "damage_resistances": "Piercing from Nonmagical Attacks",
      "damage_immunities": "Poison",
    };
    expect(getDefensiveCR(monster)).toBe('1');
  });

  it('should return the appropriate CR value for a monster in CR 5-10', () => {
    const monster = {
      "name": "Stone Golem",
      "armor_class": "17 (natural armor)",
      "hit_points": "178 (17d10 + 85)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Poison, Psychic",
    };
    expect(getDefensiveCR(monster)).toBe('10');
  });

  it('should return the appropriate CR value for a monster in CR 11-16', () => {
    const monster = {
      "name": "Elder Elemental",
      "armor_class": "18 (natural armor)",
      "hit_points": "199 (19d10 + 95)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Poison, Fire, Cold",
    };
    expect(getDefensiveCR(monster)).toBe('13');
  });

  it('should return the appropriate CR value for a monster in CR 17+', () => {
    const monster = {
      "name": "Ancient Red Dragon",
      "armor_class": "22 (natural armor)",
      "hit_points": "546 (28d20 + 252)",
      "damage_resistances": "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      "damage_immunities": "Fire, Poison, Cold",
    };
    expect(getDefensiveCR(monster)).toBe('24');
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
});


