import { renderOverview, overviewAstToText } from './renderSettingOverview.mjs';

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

      // Add setting overview sections — compose the name with the
      // subtitle so the export carries the full identity (the UI
      // separates name/title typographically; plain text doesn't).
      const settingSubtitle = setting.setting_overview?.title;
      const settingTitle = settingSubtitle
        ? `${setting.place_name.toUpperCase()}, ${settingSubtitle}`
        : setting.place_name.toUpperCase();
      addSection(addDoubleDashedSectionTitle(settingTitle));

      // Single source of truth: walk the rendered AST. Strips markdown
      // markers and lays out section headings as dashed underlines.
      // Handles both structured-field and legacy combined_content cases.
      addSection(overviewAstToText(renderOverview(setting.setting_overview)));

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
      addSection(addDashedSectionTitle('QUEST HOOKS'));
      setting.questHooks.forEach((quest) => {
        addSection(addSingleDashedSectionTitle(quest.quest_title));
        addSection(quest.quest_giver_encounter);
        addSection(quest.quest_details);
        addSection(quest.quest_giver_name);
        addSection(quest.quest_giver_background);
        addSection('OBJECTIVES');
        quest.objectives.forEach((objective) => {
          addSection(`- ${objective}`);
        });
        addSection('CHALLENGES');
        quest.challenges.forEach((challenge) => {
          addSection(`- ${challenge}`);
        });
        addSection('REWARDS');
        quest.rewards.forEach((reward) => {
          addSection(`- ${reward}`);
        });
        addSection('TWIST');
        addSection(quest.twist);
      });

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
            const locationTitle = location.title
              ? `${location.name}, ${location.title}`
              : location.name;
            addSection(`${locationTitle}\n${location.description}`);
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
