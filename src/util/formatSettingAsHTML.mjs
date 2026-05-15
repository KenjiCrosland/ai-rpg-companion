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
      // Render the bare name as the H1, then setting_overview.title
      // as a styled subtitle paragraph below. Mirrors the UI's
      // hierarchy.
      const settingSubtitle = setting.setting_overview?.title;
      text += addHtmlSectionTitle(setting.place_name.toUpperCase(), 1);
      if (settingSubtitle) {
        text += `<p style="font-style: italic; color: #6b7280; margin-top: -0.5rem;">${settingSubtitle}</p>\n`;
      }

      const ov = setting.setting_overview;

      // Consolidated body for edited or migrated legacy settings;
      // individual new-key fields for fresh data. combined_content
      // already contains overview + relation + history + body, so
      // it replaces all subsequent sections.
      if (ov.combined_content) {
        addSection(ov.combined_content);
      } else {
        addSection(`${ov.overview} ${ov.relation_to_larger_setting}`);
        addSection(ov.history);
        addSection([ov.current_ruler_sentence]);
        addSection([ov.social_history, ov.notable_social_facet]);
        addSection([ov.economic_history, ov.notable_economic_facet]);
        addSection([ov.military_history, ov.notable_security_facet]);
        addSection([ov.central_dynamic, ov.responses_in_motion]);
        addSection(ov.present_state);
      }

      // Add NPC List
      text += addHtmlSectionTitle('NPCs', 2);

      if (setting.npcs) {
        setting.npcs.forEach((npc) => {
          text += addHtmlSectionTitle(`${npc.name.toUpperCase()}`, 3);
          if (!npc.description_of_position) {
            addSection(`${npc.description}`);
          } else {
            addSection(npc.read_aloud_description);
            addSection(npc.description_of_position);
            addSection(npc.current_location);
            addSection(npc.distinctive_features_or_mannerisms);
            addSection(npc.character_secret);

            if (npc.relationships) {
              text += addHtmlSectionTitle('Relationships', 4);
              Object.keys(npc.relationships).forEach((rel) => {
                addSection(
                  `<strong>${rel}:</strong> ${npc.relationships[rel]}`,
                );
              });
            }
            text += addHtmlSectionTitle('Roleplaying Tips', 4);
            addSection(npc.roleplaying_tips);
          }
        });
      }

      // Add Factions
      if (setting.factions.length > 0) {
        text += addHtmlSectionTitle('Factions', 2);
        setting.factions.forEach((faction) => {
          text += addHtmlSectionTitle(`${faction.name.toUpperCase()}`, 3);
          addSection(
            `<strong>Influence Level:</strong> ${
              factionPowerLevels[faction.influence_level - 1]
            }`,
          );
          addSection(
            `<strong>Faction Leader:</strong> ${faction.faction_leader}: ${faction.faction_leader_description}`,
          );
          addSection(
            `<strong>Key Strengths:</strong> ${faction.key_resources_and_assets}`,
          );
          addSection(`<strong>Motto:</strong> "${faction.motto}"`);
          addSection(faction.history);
          addSection([faction.recent_event, faction.current_situation]);
          addSection([faction.rites_and_ceremonies, faction.recent_ceremony]);
          addSection([faction.challenge_to_power, faction.challenge_event]);
        });
      }

      // Add Quest Hooks
      if (setting.questHooks.length > 0) {
        text += addHtmlSectionTitle('Quests', 2);
        setting.questHooks.forEach((quest) => {
          text += addHtmlSectionTitle(`${quest.quest_title}`, 3);
          addSection(quest.quest_giver_encounter);
          addSection(quest.quest_details);
          text += addHtmlSectionTitle(
            `Quest Giver: ${quest.quest_giver_name}`,
            4,
          );
          addSection(quest.quest_giver_background);
          // Add Objectives, Challenges, Rewards as <ul> lists
          text += addHtmlSectionTitle('Objectives', 4);
          addSection(
            quest.objectives.map((obj) => `<li>${obj}</li>`).join(''),
            'ul',
          );
          text += addHtmlSectionTitle('Challenges', 4);
          addSection(
            quest.challenges.map((chal) => `<li>${chal}</li>`).join(''),
            'ul',
          );
          text += addHtmlSectionTitle('Rewards', 4);
          addSection(
            quest.rewards.map((rew) => `<li>${rew}</li>`).join(''),
            'ul',
          );

          text += addHtmlSectionTitle('Twist', 4);
          addSection(quest.twist);
        });
      }

      // Add Important Locations
      if (setting.importantLocations.length > 0) {
        text += addHtmlSectionTitle('Important Locations', 2);
        setting.importantLocations.forEach((location) => {
          if (
            !setting.children ||
            !setting.children.some(
              (child) => child.place_name === location.name,
            )
          ) {
            const locationTitle = location.title
              ? `${location.name}, ${location.title}`
              : location.name;
            text += addHtmlSectionTitle(locationTitle, 3);
            addSection(location.description);
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
