// Effect definitions for the GPT prompt
export const effectDefinitions = {
  minor_utility_or_cosmetic_effect:
    'A small, flavorful effect with no combat impact. Examples: changes color, makes sounds, produces light, minor comfort (stays clean, perfect temperature), cosmetic transformations.',

  useful_magical_effect:
    'A practical utility feature. Examples: advantage on specific skill checks, resistance to one damage type, cast a cantrip at will, limited storage/carrying capacity, minor movement benefit (climbing speed, water breathing), immunity to one minor condition.',

  moderate_magical_effect:
    'A meaningful magical ability. Examples: cast a 1st-2nd level spell 1-3 times per day, bonus to saving throws vs specific effect type, temporary hit points on a trigger, enhanced senses (darkvision, tremorsense range), situational damage bonus (extra 1d6 damage vs creature type).',

  powerful_magical_effect:
    'A significant magical power. Examples: cast 3rd-4th level spell once per day or 1st-2nd level spell at will, immunity to one condition (charmed, frightened), major once-per-day ability, scaling damage feature (extra 2d6-3d6), strong defensive benefit (half damage from element).',

  very_powerful_magical_effect:
    'A major magical capability. Examples: cast 5th-6th level spell once per day, multiple immunities, regeneration or constant healing, flight speed, legendary resistance (1/day), powerful offensive feature (save DC 17-18), transformation ability.',

  legendary_magical_effect:
    'An extraordinary, campaign-defining power. Examples: cast 7th-9th level spell, true seeing, powerful summoning ability, reality-bending feature, multiple legendary resistances, massive damage output, reshape terrain, cheat death once.',
};

export default function determineFeaturesAndBonuses(rarity, itemType) {
  let bonus = '';
  let features = {};

  // Helper function to randomly decide between options
  const randomChoice = (options) =>
    options[Math.floor(Math.random() * options.length)];

  // Determine if this item type supports numerical bonuses
  // Armor and Weapons: Always can have bonuses (common in 5e)
  // Rods and Staffs: 30% chance (examples: Rod of the Pact Keeper, Staff of Power)
  // Rings: 20% chance (examples: Ring of Protection)
  // Wands: 15% chance (less common, but possible)
  // Other items: No bonuses
  let supportsBonus = false;
  if (['Armor', 'Weapon'].includes(itemType)) {
    supportsBonus = true;
  } else if (['Rod', 'Staff'].includes(itemType)) {
    supportsBonus = Math.random() < 0.3;
  } else if (itemType === 'Ring') {
    supportsBonus = Math.random() < 0.2;
  } else if (itemType === 'Wand') {
    supportsBonus = Math.random() < 0.15;
  }

  switch (rarity) {
    case 'Common':
      // Common items: purely utility/cosmetic, NO combat bonuses
      // Examples: Cloak of Billowing, Pot of Awakening, Mystery Key
      features = {
        feature_name_1: 'minor_utility_or_cosmetic_effect',
      };
      break;

    case 'Uncommon':
      // Uncommon items: +1 bonus OR one useful feature (not both)
      // Examples: +1 Weapon, Bag of Holding, Slippers of Spider Climbing
      if (supportsBonus) {
        randomChoice([
          () => {
            bonus = '+1';
            // Just the bonus, no additional features
          },
          () => {
            // No bonus, but a single useful magical feature
            features = {
              feature_name_1: 'useful_magical_effect',
            };
          },
        ])();
      } else {
        // Non-combat items get one useful feature
        features = {
          feature_name_1: 'useful_magical_effect',
        };
      }
      break;

    case 'Rare':
      // Rare items: +2 bonus OR +1 bonus with feature OR multiple features
      // Examples: +2 Weapon, Flame Tongue, Ring of Spell Storing
      if (supportsBonus) {
        randomChoice([
          () => {
            bonus = '+2';
            // Just +2, no additional features
          },
          () => {
            bonus = '+1';
            features = {
              feature_name_1: 'moderate_magical_effect',
            };
          },
          () => {
            // No bonus, but powerful feature(s)
            features = {
              feature_name_1: 'powerful_magical_effect',
            };
          },
        ])();
      } else {
        // Non-combat items get 1-2 features
        randomChoice([
          () => {
            features = {
              feature_name_1: 'powerful_magical_effect',
            };
          },
          () => {
            features = {
              feature_name_1: 'moderate_magical_effect',
              feature_name_2: 'moderate_magical_effect',
            };
          },
        ])();
      }
      break;

    case 'Very Rare':
      // Very Rare items: +3 bonus OR +2 with feature OR powerful features
      // Examples: +3 Weapon, Holy Avenger (before attunement), Cloak of Invisibility
      if (supportsBonus) {
        randomChoice([
          () => {
            bonus = '+3';
            // Just +3, potentially one minor feature
            if (Math.random() < 0.4) {
              features = {
                feature_name_1: 'useful_magical_effect',
              };
            }
          },
          () => {
            bonus = '+2';
            features = {
              feature_name_1: 'powerful_magical_effect',
            };
          },
          () => {
            bonus = '+1';
            features = {
              feature_name_1: 'very_powerful_magical_effect',
            };
          },
        ])();
      } else {
        // Non-combat items get powerful features
        randomChoice([
          () => {
            features = {
              feature_name_1: 'very_powerful_magical_effect',
            };
          },
          () => {
            features = {
              feature_name_1: 'powerful_magical_effect',
              feature_name_2: 'moderate_magical_effect',
            };
          },
        ])();
      }
      break;

    case 'Legendary':
      // Legendary items: +3 with features OR multiple powerful features
      // Very rarely +4 (DMG suggests +3 max for most items)
      // Examples: Holy Avenger, Luck Blade, Staff of the Magi
      if (supportsBonus) {
        randomChoice([
          () => {
            bonus = '+3';
            features = {
              feature_name_1: 'legendary_magical_effect',
              feature_name_2: 'powerful_magical_effect',
            };
          },
          () => {
            bonus = '+2';
            features = {
              feature_name_1: 'legendary_magical_effect',
              feature_name_2: 'legendary_magical_effect',
            };
          },
          () => {
            // Rare case: +4 for truly exceptional items
            bonus = '+4';
            features = {
              feature_name_1: 'legendary_magical_effect',
            };
          },
        ])();
      } else {
        // Non-combat items get multiple powerful features
        features = {
          feature_name_1: 'legendary_magical_effect',
          feature_name_2: 'legendary_magical_effect',
        };
        // 30% chance for a third feature
        if (Math.random() < 0.3) {
          features.feature_name_3 = 'powerful_magical_effect';
        }
      }
      break;

    case 'Artifact':
      // Artifact items: Campaign-defining relics with major drawbacks
      // +3 bonus (consistent), 5-6 legendary effects with serious consequences
      // Examples: Eye of Vecna, Hand of Vecna, Book of Vile Darkness, Wand of Orcus
      if (supportsBonus) {
        bonus = '+3';
        features = {
          feature_name_1: 'legendary_magical_effect',
          feature_name_2: 'legendary_magical_effect',
          feature_name_3: 'legendary_magical_effect',
          feature_name_4: 'very_powerful_magical_effect',
          feature_name_5: 'powerful_magical_effect',
        };
        // 50% chance for a sixth feature (artifacts are campaign-defining)
        if (Math.random() < 0.5) {
          features.feature_name_6 = 'powerful_magical_effect';
        }
      } else {
        // Non-combat artifacts get many legendary features
        features = {
          feature_name_1: 'legendary_magical_effect',
          feature_name_2: 'legendary_magical_effect',
          feature_name_3: 'legendary_magical_effect',
          feature_name_4: 'very_powerful_magical_effect',
          feature_name_5: 'very_powerful_magical_effect',
        };
        // Always include a sixth feature for non-combat artifacts
        features.feature_name_6 = 'powerful_magical_effect';
      }
      break;

    default:
      features = { Error: 'Rarity not recognized.' };
  }

  return {
    bonus,
    features: features,
    feature_count: Object.keys(features).length,
    effectDefinitions,
  };
}
