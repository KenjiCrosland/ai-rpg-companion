export function convertToFoundryVTT(monster) {
    let lines = [];

    // Basic info
    lines.push(monster.name);
    lines.push(monster.type_and_alignment);
    lines.push(`Armor Class ${monster.armor_class}`);
    lines.push(`Hit Points ${monster.hit_points}`);
    lines.push(`Speed ${monster.speed}`);
  
    // Separate attribute names and values and add them on separate lines
    const attributes = monster.attributes
      .split(',')
      .map(attribute => attribute.trim().split(' ')[0]);
    const attributeValues = monster.attributes
      .split(',')
      .map(attribute => attribute.match(/(\d+ \(\+\d+\)|\d+ \(\-\d+\))/)[0]); // use regex to get values with both positive and negative modifiers
    lines.push(attributes.join(' '));
    lines.push(attributeValues.join(' '));
  
    // Add optional properties if they exist in the JSON object
    if(monster.saving_throws) lines.push(`Saving Throws ${monster.saving_throws}`);
    if(monster.skills) lines.push(`Skills ${monster.skills}`);
    if(monster.damage_resistances) lines.push(`Damage Resistances ${monster.damage_resistances}`);
    if(monster.damage_immunities) lines.push(`Damage Immunities ${monster.damage_immunities}`);
    if(monster.condition_immunities) lines.push(`Condition Immunities ${monster.condition_immunities}`);
    if(monster.senses) lines.push(`Senses ${monster.senses}`);
    if(monster.languages) lines.push(`Languages ${monster.languages}`);
    lines.push(`Challenge ${monster.challenge_rating}`);
  
    // Abilities
    monster.abilities.forEach((ability) => {
      if (ability.name !== 'Spellcasting') {
        lines.push(`${ability.name}. ${ability.description}`);
      } else {
        // Special handling for spellcasting
        const spellcastingLines = ability.description.split('\n').filter(line => line);
        lines.push(`${ability.name}. ${spellcastingLines[0]}`);
        for(let i = 1; i < spellcastingLines.length; i++) {
          lines.push(spellcastingLines[i]);
        }
      }
    });
  
    // Actions
    lines.push('Actions');
    monster.actions.forEach((action) => {
      lines.push(`${action.name}. ${action.description}`);
    });
  
    // Add legendary actions if they exist in the JSON object
    if(monster.legendary_actions) {
      lines.push('Legendary Actions');
      monster.legendary_actions.forEach((action) => {
        lines.push(`${action.name}. ${action.description}`);
      });
    }
  
    // Join all lines with newlines and return the result
    return lines.join('\n');
  }
  