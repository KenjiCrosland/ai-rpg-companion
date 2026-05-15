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

      function addSection(content, spacing = 1) {
        if (Array.isArray(content)) {
          content = content.filter(Boolean).join(' ');
        }
        if (content) {
          text += content + `\n${':'.repeat(spacing)}\n\n`;
        }
      }

      function addMarkdownSectionTitle(title, level = 2) {
        return `${'#'.repeat(level)} ${title}`;
      }

      // Add setting overview sections — emit the name as H1 and
      // setting_overview.title as an italicized subtitle line so the
      // markdown export mirrors the UI's hierarchy.
      const settingSubtitle = setting.setting_overview?.title;
      text += `# ${setting.place_name.toUpperCase()}\n`;
      if (settingSubtitle) {
        text += `*${settingSubtitle}*\n`;
      }

      const ov = setting.setting_overview;

      // Consolidated body (combined_content) for edited or migrated
      // legacy settings; individual new-key fields for fresh data.
      // combined_content already contains overview + relation +
      // history + the rest, so it replaces all subsequent sections.
      if (ov.combined_content) {
        text += '\n\n';
        addSection(ov.combined_content);
      } else {
        text += `\n ${ov.overview}  ${ov.relation_to_larger_setting}\n:\n\n`;
        addSection(ov.history);
        addSection([ov.current_ruler_sentence]);
        addSection([ov.social_history, ov.notable_social_facet]);
        addSection([ov.economic_history, ov.notable_economic_facet]);
        addSection([ov.military_history, ov.notable_security_facet]);
        addSection([ov.central_dynamic, ov.responses_in_motion]);
        addSection(ov.present_state, 2);
      }

      // Add NPC List
      addSection(addMarkdownSectionTitle('NPCs'), 2);

      if (setting.npcs) {
        setting.npcs.forEach((npc) => {
          addSection(addMarkdownSectionTitle(`${npc.name.toUpperCase()}`, 3));
          if (!npc.description_of_position) {
            addSection(`${npc.description}`, 2);
          } else {
            addSection(
              ['{{descriptive\n', npc.read_aloud_description, '\n}}'],
              0,
            );
            addSection(npc.description_of_position);
            addSection(npc.current_location);
            addSection(npc.distinctive_features_or_mannerisms);
            addSection(npc.character_secret);

            if (npc.relationships) {
              addSection(addMarkdownSectionTitle('Relationships', 4));
              Object.keys(npc.relationships).forEach((rel) => {
                addSection(`**${rel}:** ${npc.relationships[rel]}`);
              });
            }
            addSection(addMarkdownSectionTitle('Roleplaying Tips', 4));
            addSection(npc.roleplaying_tips, 2);
          }
        });
      }

      // Add Factions
      if (setting.factions.length > 0) {
        addSection(addMarkdownSectionTitle('Factions'), 2);
        setting.factions.forEach((faction) => {
          addSection(
            addMarkdownSectionTitle(`${faction.name.toUpperCase()}`, 3),
          );
          addSection(
            `{{descriptive\n **Influence Level:** ${
              factionPowerLevels[faction.influence_level - 1]
            }`,
          );
          addSection(
            `**Faction Leader:** ${faction.faction_leader}: ${faction.faction_leader_description}`,
          );
          addSection(`**Key Strengths:** ${faction.key_resources_and_assets}`);
          addSection(`**Motto:** "${faction.motto}" \n }}`);
          addSection(faction.history);
          addSection([faction.recent_event, faction.current_situation]);
          addSection([faction.rites_and_ceremonies, faction.recent_ceremony]);
          addSection([faction.challenge_to_power, faction.challenge_event]);
        });
      }

      if (setting.questHooks.length > 0) {
        addSection(addMarkdownSectionTitle('Quests'), 2);
        setting.questHooks.forEach((quest) => {
          addSection(addMarkdownSectionTitle(`${quest.quest_title}`, 3));
          addSection(`{{descriptive\n ${quest.quest_giver_encounter}`);
          addSection([quest.quest_details, '\n}}']);
          addSection(
            addMarkdownSectionTitle(
              `Quest Giver: ${quest.quest_giver_name}`,
              4,
            ),
          );
          addSection(`${quest.quest_giver_background}`);

          addSection(addMarkdownSectionTitle('Objectives', 4));
          for (let objective of quest.objectives) {
            text += `- ${objective}\n`;
          }
          addSection(addMarkdownSectionTitle('Challenges', 4));
          for (let challenge of quest.challenges) {
            text += `- ${challenge}\n`;
          }
          addSection(addMarkdownSectionTitle('Rewards', 4));
          for (let reward of quest.rewards) {
            text += `- ${reward}\n`;
          }
          addSection(addMarkdownSectionTitle('Twist', 4));
          addSection(quest.twist);
        });
      }

      // Add Important Locations
      if (setting.importantLocations.length > 0) {
        addSection(addMarkdownSectionTitle('Important Locations'));
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
            addSection(addMarkdownSectionTitle(locationTitle, 3));
            addSection(location.description, 2);
          }
        });
      }

      return text;
    })
    .join('\n');
}

export function formatSettingAsMarkdown(settings) {
  function formatSettingRecursive(setting, depth = 0) {
    let text = formatSettingOverview([setting]) + '\n';

    if (setting.children && setting.children.length > 0) {
      setting.children.forEach((child) => {
        text += '\\page\n';
        text += formatSettingRecursive(child, depth + 1);
      });
    }

    return text;
  }

  return settings
    .map((setting) => formatSettingRecursive(setting))
    .join('\n\\page\n');
}
