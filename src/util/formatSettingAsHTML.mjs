function formatSettingOverview(settings) {
  const factionPowerLevels = [
    'Nonexistent',
    'Marginal',
    'Emerging',
    'Moderate',
    'Noteworthy',
    'Influential',
    'Powerful',
    'Dominant',
    'Controlling',
    'Totalitarian',
  ];

  return settings
    .map((setting, index) => {
      let text = '';

      function addSection(content, tag = 'p') {
        if (Array.isArray(content)) {
          content = content.filter(Boolean).join(' ');
        }
        if (content) {
          text += `<${tag}>${content}</${tag}>\n`;
        }
      }

      function addHtmlSectionTitle(title, level = 1) {
        return `<h${level}>${title}</h${level}>`;
      }

      // Add setting overview sections
      if (index > 0) {
        text += '<hr/>\n';
      }
      text += addHtmlSectionTitle(setting.place_name.toUpperCase(), 1);

      addSection(
        `${setting.setting_overview.overview} ${setting.setting_overview.relation_to_larger_setting}`,
        'p',
      );
      addSection(setting.setting_overview.history);

      // Combine specific sections
      addSection([
        setting.setting_overview.current_ruler_sentence,
        setting.setting_overview.recent_event_current_ruler,
      ]);
      addSection([
        setting.setting_overview.social_history,
        setting.setting_overview.recent_event_social,
      ]);
      addSection([
        setting.setting_overview.economic_history,
        setting.setting_overview.impactful_economic_event,
      ]);
      addSection([
        setting.setting_overview.military_history,
        setting.setting_overview.recent_event_military,
      ]);
      addSection([
        setting.setting_overview.main_problem,
        setting.setting_overview.potential_solutions,
      ]);

      addSection(setting.setting_overview.conclusion, 'p');

      // Add NPC List
      addSection(addHtmlSectionTitle('NPCs', 2));

      if (setting.npcs) {
        setting.npcs.forEach((npc) => {
          addSection(addHtmlSectionTitle(`${npc.name.toUpperCase()}`, 3));
          if (!npc.description_of_position) {
            addSection(`${npc.description}`, 'p');
          } else {
            addSection(npc.read_aloud_description, 'p');
            addSection(npc.description_of_position, 'p');
            addSection(npc.current_location, 'p');
            addSection(npc.distinctive_features_or_mannerisms, 'p');
            addSection(npc.character_secret, 'p');

            if (npc.relationships) {
              addSection(addHtmlSectionTitle('Relationships', 4));
              Object.keys(npc.relationships).forEach((rel) => {
                addSection(
                  `<strong>${rel}:</strong> ${npc.relationships[rel]}`,
                  'p',
                );
              });
            }
            addSection(addHtmlSectionTitle('Roleplaying Tips', 4));
            addSection(npc.roleplaying_tips, 'p');
          }
        });
      }

      // Add Factions
      if (setting.factions.length > 0) {
        addSection(addHtmlSectionTitle('Factions', 2));
        setting.factions.forEach((faction) => {
          addSection(addHtmlSectionTitle(`${faction.name.toUpperCase()}`, 3));
          addSection(
            `<strong>Influence Level:</strong> ${
              factionPowerLevels[faction.influence_level - 1]
            }`,
            'p',
          );
          addSection(
            `<strong>Faction Leader:</strong> ${faction.faction_leader}: ${faction.faction_leader_description}`,
            'p',
          );
          addSection(
            `<strong>Key Strengths:</strong> ${faction.key_resources_and_assets}`,
            'p',
          );
          addSection(`<strong>Motto:</strong> "${faction.motto}"`, 'p');
          addSection(faction.history, 'p');
          addSection([faction.recent_event, faction.current_situation], 'p');
          addSection(
            [faction.rites_and_ceremonies, faction.recent_ceremony],
            'p',
          );
          addSection(
            [faction.challenge_to_power, faction.challenge_event],
            'p',
          );
        });
      }

      // Add Important Locations
      if (setting.importantLocations.length > 0) {
        addSection(addHtmlSectionTitle('Important Locations', 2));
        setting.importantLocations.forEach((location) => {
          if (
            !setting.children ||
            !setting.children.some(
              (child) => child.place_name === location.name,
            )
          ) {
            addSection(addHtmlSectionTitle(location.title, 3));
            addSection(location.description, 'p');
          }
        });
      }

      return text;
    })
    .join('\n');
}

export function formatSettingAsHtml(settings) {
  function formatSettingRecursive(setting, depth = 0) {
    let text = formatSettingOverview([setting]) + '\n';

    if (setting.children && setting.children.length > 0) {
      setting.children.forEach((child) => {
        text += formatSettingRecursive(child, depth + 1);
      });
    }

    return text;
  }

  return settings
    .map((setting, index) => formatSettingRecursive(setting, index))
    .join('\n');
}
