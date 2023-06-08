import crObjects from '../data/challengeRatings.json'

export function getDefensiveCR(monster) {
  // Get numeric hit points and armor class from monster data
  let baseHitPoints = parseInt(monster.hit_points.match(/\d+/)[0]);
  const armorClass = parseInt(monster.armor_class.match(/\d+/)[0]);

  // Get resistances and immunities
  const hasResistances = getEffectiveDamageFactors(monster.damage_resistances || false);
  const hasImmunities = getEffectiveDamageFactors(monster.damage_immunities || false);

  let effectiveHitPoints = calculateEffectiveHitPoints(baseHitPoints, hasImmunities, hasResistances, crObjects);
  
  let hitPointCR = 0;
  let armorClassCr = 0;

  Object.values(crObjects).forEach(crObj => {
    const minHP = crObj.min_hit_points;
    const maxHP = crObj.max_hit_points;
    if (effectiveHitPoints >= minHP && effectiveHitPoints <= maxHP) {
      hitPointCR = parseInt(crObj.CR);
    }
  });

  armorClassCr = getArmorClassCr(hitPointCR, armorClass, crObjects);

  // Calculate the final CR by averaging armorClassCr and hitPointCR
  const finalCR = Math.round((armorClassCr + hitPointCR) / 2);

  return finalCR.toString();
}


function calculateEffectiveHitPoints(baseHitPoints, hasImmunities, hasResistances, crObject) {
  let bracket;
  let brackets = crObject.hitPointBrackets;

  // Determine which bracket the monster is in
  for (let key in brackets) {
      if (baseHitPoints >= brackets[key].min_hit_points && baseHitPoints <= brackets[key].max_hit_points) {
          bracket = brackets[key];
          break;
      }
  }

  // If no bracket was found, return the base hit points
  if (!bracket) return baseHitPoints;

  // Determine the multiplier based on immunities and resistances
  let multiplier = 1;
  if (hasImmunities) {
      multiplier = bracket.immunity_mod;
  } else if (hasResistances) {
      multiplier = bracket.resistance_mod;
  }

  // Return the effective hit points
  return baseHitPoints * multiplier;
}

export function getArmorClassCr(hitPointCR, armorClass, crObjects) {
  let armorClassCr;
  let suggestedAC = crObjects[hitPointCR.toString()]['armor_class'];
  let difference = armorClass - suggestedAC;
  if (Math.abs(difference) >= 2) {
    let adjust = Math.floor(difference / 2);
    let parsedHitPointCR = Number(hitPointCR);
    if (isNaN(parsedHitPointCR)) {
      let [numerator, denominator] = hitPointCR.split('/');
      parsedHitPointCR = parseInt(numerator) / parseInt(denominator);
    }
    armorClassCr = Math.round(parsedHitPointCR + adjust);
    if (armorClassCr <= 0) {
      armorClassCr = 0;
    }
  } else {
    armorClassCr = hitPointCR;
  }
  return armorClassCr;
}

function getEffectiveDamageFactors(damageFactorsString) {
  // Define damage types to be searched
  const damageTypes = [
    "acid", "cold", "fire", "force", "lightning", "necrotic", "poison", 
    "psychic", "radiant", "thunder", "bludgeoning", "slashing", "piercing"
  ];

  // Make damage factors lowercase for easier comparison
  const lowerCaseFactors = damageFactorsString.toLowerCase();

  let effectiveFactorCount = 0;
  
  damageTypes.forEach((type) => {
    if (lowerCaseFactors.includes(type)) {
      effectiveFactorCount++;
    }
  });

  return effectiveFactorCount >= 1;
}


  