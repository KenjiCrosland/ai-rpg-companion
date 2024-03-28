export function convertLoreToMarkdown(loreObj) {
  let markdown = '';

  markdown += `# Historic Summary of ${loreObj.subject}\n\n`;
  markdown += `${loreObj.timelineSummary}\n\n`;
  markdown += `${loreObj.currentState}\n\n`;

  markdown += `# Full Historic Timeline of ${loreObj.subject}\n\n`;

  console.log(loreObj.timelineEvents);
  if (loreObj.timelineEvents > 0) {
    loreObj.timelineEvents.forEach((timelineEvent) => {
      markdown += `### ${timelineEvent.title}\n\n`;
      markdown += `#### ${timelineEvent.eventYear}\n\n`;
      markdown += `#### ${timelineEvent.details}\n\n`;
    });
  }
  return markdown;
}

export function convertLocationsToMarkdown(locations) {
  let markdown = '';

  locations.forEach((location, index) => {
    // If it's the first location, use an h1 with '#' instead of '##'.
    markdown +=
      index === 0 ? `# ${location.name}\n\n` : `## ${location.name}\n\n`;
    markdown += `${location.description}\n\n`;

    if (location.npcs && location.npcs.length > 0) {
      markdown += `### NPCs in ${location.name}\n\n`;
      location.npcs.forEach((npc) => {
        markdown += `#### ${npc.character_name}\n\n`;
        if (npc.read_aloud_description) {
          markdown += `{{descriptive \n${npc.read_aloud_description}\n}}\n\n`;
        }
        markdown += `${npc.description_of_position}\n\n`;
        markdown += `${npc.reason_for_being_there}\n\n`;
        markdown += `${npc.distinctive_feature_or_mannerism}\n\n`;
        markdown += `${npc.character_secret}\n\n`;

        if (npc.relationships) {
          markdown += `##### Relationships\n\n`;
          Object.entries(npc.relationships).forEach(
            ([relationshipName, relationshipDescription]) => {
              markdown += `- **${relationshipName}**: ${relationshipDescription}\n`;
            },
          );
          markdown += '\n';
        }

        if (npc.roleplaying_tips) {
          markdown += `{{note\n##### Roleplaying Tips\n${npc.roleplaying_tips}\n}}`;
        }
      });
    }
  });

  return addPageBreaks(markdown);
}

const parseRarity = (rarity) => {
  return rarity.split(' // ')[0];
};

export function convertItemToMarkdown(item) {
  let markdown = `#### ${item.name}\n\n`;
  markdown += `*${item.item_type}, ${parseRarity(item.rarity)}*\n\n`;
  markdown += `:\n\n`;
  markdown += `${item.physical_description}\n\n`;
  markdown += `${item.lore}\n\n`;
  if (item.modifier) {
    markdown += `:\n\n`;
    markdown += `${item.modifier}\n\n`;
    markdown += `:\n\n`;
  }
  Object.entries(item.features).forEach(([featureName, featureDescription]) => {
    markdown += `**${featureName}**: ${featureDescription}\n\n`;
    markdown += `:\n\n`;
  });

  return addPageBreaks(markdown);
}

export function convertDungeonToMarkdown(
  dungeonName,
  dungeonSummary,
  detailedRooms,
) {
  let markdown = `# ${dungeonName}\n\n`;

  // Dungeon Summary Details
  markdown += `### General Description\n${dungeonSummary.general_description}\n\n`;
  markdown += `{{descriptive\n${dungeonSummary.historical_background}\n}}\n\n`;
  markdown += `### Current Situation\n${dungeonSummary.current_situation}\n\n`;
  markdown += `${dungeonSummary.adventurers_motivation}\n\n`;
  markdown += `{{note\n${dungeonSummary.secret}\n}}\n\n`;
  markdown += `### Features\n${dungeonSummary.environmental_features}\n\n`;
  markdown += `### Factions or NPCs\n${dungeonSummary.factions_or_npcs}\n\n`;

  // Iterating through detailed rooms
  if (detailedRooms && detailedRooms.length > 0) {
    detailedRooms.forEach((room, index) => {
      markdown += `## ${index + 1}. ${room.room_name}\n`;
      markdown += `${room.read_aloud_description}\n\n`;
      markdown += `${room.detailed_description.dungeon_room_dimensions}\n\n`;
      markdown += `${room.detailed_description.unique_feature_extra_details}\n\n`;
      markdown += `${room.detailed_description.interactive_element_extra_details}\n\n`;
      if (room.detailed_description.hidden_secret) {
        markdown += `${room.detailed_description.hidden_secret}\n\n`;
      }

      if (
        room.detailed_description.npc_or_monster_list &&
        room.detailed_description.npc_or_monster_list.length > 0
      ) {
        room.detailed_description.npc_or_monster_list.forEach((npc) => {
          markdown += `### ${npc.name}\n`;
          markdown += `${npc.description}\n\n`;
          markdown += `${npc.motivation}\n\n`;
          if (npc.statblock) {
            markdown +=
              statblockToMarkdown(npc.statblock, 'two_columns') + '\n\n'; // Assuming you have this function defined
          }
        });
      }
    });
  }

  return dungeonPageBreaks(markdown);
}

function addPageBreaks(text) {
  const pageBreak = '\\page';
  const maxCharacters = 4800;
  let result = '';
  let remainingText = text;

  while (remainingText.length > maxCharacters) {
    let lastSpaceIndex = remainingText.slice(0, maxCharacters).lastIndexOf(' ');
    result +=
      remainingText.slice(0, lastSpaceIndex) + '\n\n' + pageBreak + '\n\n';
    remainingText = remainingText.slice(lastSpaceIndex + 1);
  }

  result += remainingText;
  return result;
}

function dungeonPageBreaks(text) {
  const pageBreak = '\\page';
  const maxCharacters = 4800;
  let result = '';
  let remainingText = text;

  while (remainingText.length > 0) {
    // Check if the remaining text is shorter than the max limit
    if (remainingText.length <= maxCharacters) {
      result += remainingText;
      break;
    }

    let breakPoint = maxCharacters;
    let lastSpaceIndex = remainingText.lastIndexOf(' ', breakPoint);
    let specialStart = remainingText.lastIndexOf('{{monster', breakPoint);
    let specialEnd = remainingText.indexOf('}}', specialStart) + 2;

    // Adjust break point if it's inside a special section
    if (
      specialStart !== -1 &&
      specialEnd < breakPoint &&
      specialEnd > specialStart
    ) {
      breakPoint = specialEnd;
    } else if (lastSpaceIndex !== -1 && lastSpaceIndex > specialStart) {
      breakPoint = lastSpaceIndex;
    }

    result += remainingText.slice(0, breakPoint) + '\n\n' + pageBreak + '\n\n';
    remainingText = remainingText.slice(breakPoint).trimStart();
  }

  return result;
}

export function statblockToMarkdown(obj, columns) {
  let wide = '';
  if (columns === 'two_columns') {
    wide = ',wide';
  }
  let markdown = `{{monster,frame${wide}\n`;
  markdown += `## ${obj.name}\n`;
  markdown += `*${obj.type_and_alignment}*\n___\n`;
  markdown += `**Armor Class** :: ${obj.armor_class}\n`;
  markdown += `**Hit Points**  :: ${obj.hit_points}\n`;
  markdown += `**Speed**       :: ${obj.speed}\n`;
  if (obj.saving_throws?.trim() !== '') {
    markdown += `**Saving Throws** :: ${obj.saving_throws}\n`;
  }
  if (obj.skills?.trim() !== '') {
    markdown += `**Skills** :: ${obj.skills}\n`;
  }
  if (obj.damage_resistances?.trim() !== '') {
    markdown += `**Damage Resistances** :: ${obj.damage_resistances}\n`;
  }
  if (obj.damage_immunities?.trim() !== '') {
    markdown += `**Damage Immunities** :: ${obj.damage_immunities}\n`;
  }
  markdown += '___\n';

  let attrs = obj.attributes.split(', ');
  markdown +=
    '|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n';
  attrs.forEach((attr, index) => {
    // Include the entire attribute string between the pipes
    markdown += `|${attr.split(' ')[1]} ${attr.split(' ')[2]}`;
    if (index === attrs.length - 1) {
      // If it is the last attribute
      markdown += '|'; // Add a single pipe at the end
    }
  });
  markdown += '\n___\n';

  markdown += `**Condition Immunities** :: ${obj.condition_immunities}\n`;
  markdown += `**Senses**               :: ${obj.senses}\n`;
  markdown += `**Languages**            :: ${obj.languages}\n`;
  markdown += `**Challenge**            :: ${obj.challenge_rating}\n___\n`;

  obj.abilities.forEach((ability) => {
    markdown += `***${ability.name}.*** ${ability.description}\n:\n`;
  });

  markdown += '### Actions\n';
  obj.actions.forEach((action) => {
    markdown += `***${action.name}.*** ${action.description}\n:\n`;
  });
  if (obj.legendary_actions) {
    markdown += '### Legendary Actions\n';
    obj.legendary_actions.forEach((action) => {
      markdown += `***${action.name}.*** ${action.description}\n:\n`;
    });
  }

  markdown += '}}\n';

  return markdown;
}
