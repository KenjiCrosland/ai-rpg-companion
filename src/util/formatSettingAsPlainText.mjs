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
    .map((setting) => {
      let text = '';

      function addSection(content) {
        if (Array.isArray(content)) {
          content = content.filter(Boolean).join(' ');
        }
        if (content) {
          text += content + '\n\n';
        }
      }

      function addDoubleDashedSectionTitle(title) {
        const dashes = '-'.repeat(title.length);
        return `${dashes}------\n|  ${title}  |\n------${dashes}`;
      }

      function addDashedSectionTitle(title) {
        const dashes = '-'.repeat(title.length);
        return `${dashes}\n${title}\n${dashes}`;
      }

      function addSingleDashedSectionTitle(title) {
        const dashes = '-'.repeat(title.length);
        return `${title}\n${dashes}`;
      }

      // Add setting overview sections
      addSection(addDoubleDashedSectionTitle(setting.place_name.toUpperCase()));

      addSection([
        setting.setting_overview.overview,
        setting.setting_overview.relation_to_larger_setting,
      ]);
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

      addSection(setting.setting_overview.conclusion);

      // Add NPC List
      addSection(addDashedSectionTitle('NPCs'));

      if (setting.npcs) {
        setting.npcs.forEach((npc) => {
          addSection(addSingleDashedSectionTitle(`${npc.name.toUpperCase()}`));
          if (!npc.description_of_position) {
            addSection(`${npc.description}`);
          } else {
            addSection(npc.read_aloud_description);
            addSection(npc.description_of_position);
            addSection(npc.current_location);
            addSection(npc.distinctive_features_or_mannerisms);
            addSection(npc.character_secret);

            if (npc.relationships) {
              addSection('Relationships');
              Object.keys(npc.relationships).forEach((rel) => {
                addSection(`${rel}: ${npc.relationships[rel]}`);
              });
            }
            addSection('Roleplaying Tips');
            addSection(npc.roleplaying_tips);
          }
        });
      }

      // Add Factions
      if (setting.factions.length > 0) {
        addSection(addDashedSectionTitle('FACTIONS'));
        setting.factions.forEach((faction) => {
          addSection(
            addSingleDashedSectionTitle(`${faction.name.toUpperCase()}`),
          );
          addSection(
            `Influence Level: ${
              factionPowerLevels[faction.influence_level - 1]
            }`,
          );
          addSection(
            `Faction leader, ${faction.faction_leader}: ${faction.faction_leader_description}`,
          );
          addSection(`Key Strengths: ${faction.key_resources_and_assets}`);
          addSection(`Motto: "${faction.motto}"`);
          addSection(faction.history);
          addSection([faction.recent_event, faction.current_situation]);
          addSection([faction.rites_and_ceremonies, faction.recent_ceremony]);
          addSection([faction.challenge_to_power, faction.challenge_event]);
        });
      }

      // Add Important Locations
      if (setting.importantLocations.length > 0) {
        addSection(addDashedSectionTitle('IMPORTANT LOCATIONS'));
        setting.importantLocations.forEach((location) => {
          if (
            !setting.children ||
            !setting.children.some(
              (child) => child.place_name === location.name,
            )
          ) {
            addSection(`${location.title}\n${location.description}`);
          }
        });
      }

      return text;
    })
    .join('\n');
}

export function formatSettingAsPlainText(settings) {
  function formatSettingRecursive(setting, depth = 0) {
    let text = formatSettingOverview([setting]) + '\n';

    if (setting.children && setting.children.length > 0) {
      setting.children.forEach((child) => {
        text += formatSettingRecursive(child, depth + 1);
      });
    }

    return text;
  }

  return settings.map((setting) => formatSettingRecursive(setting)).join('\n');
}
