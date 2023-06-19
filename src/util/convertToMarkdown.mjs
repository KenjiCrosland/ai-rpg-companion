export function convertLocationsToMarkdown(locations) {
    let markdown = '';
  
    locations.forEach((location, index) => {
      // If it's the first location, use an h1 with '#' instead of '##'.
      markdown += index === 0 ? `# ${location.name}\n\n` : `## ${location.name}\n\n`;
      markdown += `${location.description}\n\n`;
  
      if (location.npcs && location.npcs.length > 0) {
        markdown += `### NPCs in ${location.name}\n\n`;
        location.npcs.forEach(npc => {
          markdown += `#### ${npc.characterName}\n\n`;
          markdown += `${npc.descriptionOfPosition}\n`;
          markdown += `${npc.reasonForBeingThere}\n`;
          markdown += `${npc.distinctiveFeatureOrMannerism}\n`;
          markdown += `${npc.characterSecret}\n\n`;
  
          if (npc.relationships) {
            markdown += `##### Relationships\n\n`;
            Object.entries(npc.relationships).forEach(([relationshipName, relationshipDescription]) => {
              markdown += `- **${relationshipName}**: ${relationshipDescription}\n`;
            });
            markdown += '\n';
          }
  
          if (npc.roleplaying_tips) {
            markdown += `##### Roleplaying Tips\n\n`;
            markdown += `${npc.roleplaying_tips}\n\n`;
          }
        });
      }
    });
  
    return addPageBreaks(markdown);
  }
  
  

  function addPageBreaks(text) {
    const pageBreak = '\\page';
    const maxCharacters = 4800;
    let result = '';
    let remainingText = text;
  
    while (remainingText.length > maxCharacters) {
      let lastSpaceIndex = remainingText.slice(0, maxCharacters).lastIndexOf(' ');
      result += remainingText.slice(0, lastSpaceIndex) + '\n\n' + pageBreak + '\n\n';
      remainingText = remainingText.slice(lastSpaceIndex + 1);
    }
  
    result += remainingText;
    return result;
  }
  
 export function statblockToMarkdown(obj, columns) {
  let wide = ''
  if (columns === 'two_columns') {
    wide = ',wide'
  }
    let markdown = `{{monster,frame${wide}\n`;
    markdown += `## ${obj.name}\n`;
    markdown += `*${obj.type_and_alignment}*\n___\n`;
    markdown += `**Armor Class** :: ${obj.armor_class}\n`;
    markdown += `**Hit Points**  :: ${obj.hit_points}\n`;
    markdown += `**Speed**       :: ${obj.speed}\n`;
    if (obj.saving_throws?.trim() !== "") {
        markdown += `**Saving Throws** :: ${obj.saving_throws}\n`;
    }
    if (obj.skills?.trim() !== "") {
        markdown += `**Skills** :: ${obj.skills}\n`;
    }
    if (obj.damage_resistances?.trim() !== "") {
        markdown += `**Damage Resistances** :: ${obj.damage_resistances}\n`;
    }
    if (obj.damage_immunities?.trim() !== "") {
        markdown += `**Damage Immunities** :: ${obj.damage_immunities}\n`;
    }
    markdown += "___\n";
    
    let attrs = obj.attributes.split(", ");
    markdown += "|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n";
    attrs.forEach((attr, index) => {
        // Include the entire attribute string between the pipes
        markdown += `|${attr.split(" ")[1]} ${attr.split(" ")[2]}`;
        if(index === attrs.length - 1) { // If it is the last attribute
            markdown += "|"; // Add a single pipe at the end
        }
    });
    markdown += "\n___\n";    
    
    markdown += `**Condition Immunities** :: ${obj.condition_immunities}\n`;
    markdown += `**Senses**               :: ${obj.senses}\n`;
    markdown += `**Languages**            :: ${obj.languages}\n`;
    markdown += `**Challenge**            :: ${obj.challenge_rating}\n___\n`;

    obj.abilities.forEach(ability => {
        markdown += `***${ability.name}.*** ${ability.description}\n:\n`;
    });
    
    markdown += "### Actions\n";
    obj.actions.forEach(action => {
        markdown += `***${action.name}.*** ${action.description}\n:\n`;
    });
    if (obj.legendary_actions) {
      markdown += "### Legendary Actions\n";
      obj.legendary_actions.forEach(action => {
        markdown += `***${action.name}.*** ${action.description}\n:\n`;
    });
    }

    markdown += "}}\n";
    
    return markdown;
}