export default function determineFeaturesAndBonuses(rarity) {
  let bonus = '';
  let features = {};

  // Helper function to randomly decide between options
  const randomChoice = (options) =>
    options[Math.floor(Math.random() * options.length)];

  switch (rarity) {
    case 'Common':
      // Common items have minor, mostly cosmetic effects
      features = { feature_name_1: 'cosmetic_effect_description' };
      break;
    case 'Uncommon':
      // Uncommon items: decide between +1 and minor effect, or one more impactful feature
      randomChoice([
        () => {
          bonus = '+1';
          features = { feature_name_1: 'minor_magical_effect_description' };
        },
        () => {
          features = { feature_name_1: 'major_feature_description' };
        },
      ])();
      break;
    case 'Rare':
      // Rare items: +1 bonus with significant feature, or +2 bonus with minor feature
      randomChoice([
        () => {
          bonus = '+1';
          features = {
            feature_name_1: 'major_magical_effect_description',
          };
        },
        () => {
          bonus = '+1';
          features = {
            feature_name_1: 'minor_magical_effect_description',
            feature_name_2: 'minor_magical_effect_description',
          };
        },
        () => {
          bonus = '+2';
          features = { feature_name_1: 'minor_magical_effect_description' };
        },
      ])();
      break;
    case 'Very Rare':
      // Very Rare items: +3 bonus with minor features or +2 bonus with significant features
      randomChoice([
        () => {
          bonus = '+3';
          features = { feature_name_1: 'minor_magical_effect_description' };
        },
        () => {
          bonus = '+2';
          features = {
            feature_name_1: 'major_magical_effect_description',
          };
        },
      ])();
      break;
    case 'Legendary':
      // Legendary items have high bonuses with significant effects
      bonus = '+4';
      features = {
        feature_name_1: 'legendary_magical_effect_description_1',
        feature_name_2: 'legendary_magical_effect_description_2',
      };
      break;
    default:
      features = { Error: 'Rarity not recognized.' };
  }

  return {
    bonus,
    features: features,
    feature_count: Object.keys(features).length,
  };
}
