import { renderStatblock2024 as statblock2024Markdown } from '@/tools/statblock-generator/format-2024/render.mjs';
import { renderOverview } from './renderDungeonOverview.mjs';
import { overviewAstToText } from '@/util/renderSettingOverview.mjs';

export function dungeonToPlainText(dungeon) {
  let text = '';

  function addSection(content) {
    if (Array.isArray(content)) {
      content = content.filter(Boolean).join(' ');
    }
    if (content) {
      text += `${content}\n\n`;
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

  // Dungeon Overview — render via the shared AST path so both new and
  // legacy field shapes work. overviewAstToText emits section headings
  // as underlined `Section\n-------` blocks + paragraphs. The
  // difficulty_level field is rendered as part of the "Difficulty"
  // section heading, so the separate `Difficulty Level:` line that the
  // legacy exporter emitted is dropped.
  text += `${addDoubleDashedSectionTitle(
    (dungeon.dungeonOverview.name || '').toUpperCase(),
  )}\n`;
  const ast = renderOverview(dungeon.dungeonOverview);
  text += overviewAstToText(ast) + '\n\n';

  // NPCs
  if (dungeon.npcs && dungeon.npcs.length > 0) {
    text += `${addDashedSectionTitle('NPCs')}\n`;
    dungeon.npcs.forEach((npc) => {
      text += `${addSingleDashedSectionTitle(npc.name.toUpperCase())}\n`;

      // If the NPC has some sort of "detailedDescription"
      if (npc.detailedDescription) {
        text += monsterDetailsToPlainText(npc); // or npcDetailsToPlainText
      } else if (!npc.read_aloud_description) {
        addSection(npc.short_description);
      } else {
        addSection(npc.read_aloud_description);
        addSection(npc.description_of_position);
        addSection(npc.why_in_dungeon);
        addSection(npc.distinctive_features_or_mannerisms);
        addSection(npc.character_secret);
      }

      // If it has relationships
      if (npc.relationships) {
        text += `Relationships\n`;
        Object.keys(npc.relationships).forEach((rel) => {
          addSection(`${rel}: ${npc.relationships[rel]}`);
        });
      }

      // Roleplaying tips
      if (npc.roleplaying_tips) {
        text += `Roleplaying Tips\n`;
        addSection(npc.roleplaying_tips);
      }

      // If NPC also has a statblock
      if (npc.statblock) {
        text += anyStatblockToPlainText(npc.statblock);
      }
    });
  }

  // Rooms
  if (dungeon.rooms && dungeon.rooms.length > 0) {
    text += `${addDashedSectionTitle('Rooms')}\n`;
    dungeon.rooms.forEach((room) => {
      text += `${addSingleDashedSectionTitle(
        `Room ${room.id}: ${room.name || 'Unnamed Room'}`,
      )}\n`;
      if (room.contentArray) {
        room.contentArray.forEach((content) => {
          if (content.format === 'read_aloud') {
            addSection(content.content);
          } else if (content.format === 'header') {
            text += `${addSingleDashedSectionTitle(content.content)}\n`;
          } else {
            addSection(content.content);
          }
        });
      }
    });
  }

  // Monsters
  if (dungeon.monsters && dungeon.monsters.length > 0) {
    text += `${addDashedSectionTitle('Monsters')}\n`;
    dungeon.monsters.forEach((monster) => {
      // Title for each monster
      text += `${addSingleDashedSectionTitle(monster.name)}\n`;

      // If monster has a detailedDescription
      if (monster.detailedDescription) {
        text += monsterDetailsToPlainText(monster);
      } else {
        // fallback to top-level description
        addSection(monster.description);
        if (monster.danger && typeof monster.danger === 'string' && monster.danger.trim()) {
          addSection(`Danger: ${monster.danger.trim()}`);
        }
      }

      // If monster has a statblock
      if (monster.statblock) {
        text += anyStatblockToPlainText(monster.statblock);
      }
    });
  }

  return text;
}

// 2024-format embedded statblocks render via the engine's markdown
// renderer with markup stripped (plain-text surface).
function anyStatblockToPlainText(sb) {
  if (sb?.format === '2024') {
    // Lazy import avoided — converter files are sync; markdown → plain.
    return statblock2024Markdown(sb).replace(/[*_#]/g, '') + '\n';
  }
  return statblockToPlainText(sb);
}

function statblockToPlainText(statblock) {
  let txt = '';
  txt += `Name: ${statblock.name}\n`;
  txt += `Type & Alignment: ${statblock.type_and_alignment}\n`;
  txt += `Armor Class: ${statblock.armor_class}\n`;
  txt += `Hit Points: ${statblock.hit_points}\n`;
  txt += `Speed: ${statblock.speed}\n`;

  if (statblock.saving_throws?.trim()) {
    txt += `Saving Throws: ${statblock.saving_throws}\n`;
  }
  if (statblock.skills?.trim()) {
    txt += `Skills: ${statblock.skills}\n`;
  }
  if (statblock.damage_resistances?.trim()) {
    txt += `Damage Resistances: ${statblock.damage_resistances}\n`;
  }
  if (statblock.damage_immunities?.trim()) {
    txt += `Damage Immunities: ${statblock.damage_immunities}\n`;
  }

  txt += `\nAttributes:\n`;
  // "STR 10 (+0), DEX 14 (+2), CON 10 (+0), INT 3 (-4), WIS 12 (+1), CHA 16 (+3)"
  const attrs = statblock.attributes.split(', ');
  attrs.forEach((attr) => {
    txt += `  ${attr}\n`;
  });

  txt += `\nCondition Immunities: ${statblock.condition_immunities}\n`;
  txt += `Senses: ${statblock.senses}\n`;
  txt += `Languages: ${statblock.languages}\n`;
  txt += `Challenge: ${statblock.challenge_rating}\n\n`;

  if (statblock.abilities && statblock.abilities.length) {
    txt += `Abilities:\n`;
    statblock.abilities.forEach((ability) => {
      txt += `  * ${ability.name}: ${ability.description}\n`;
    });
    txt += `\n`;
  }

  if (statblock.actions && statblock.actions.length) {
    txt += `Actions:\n`;
    statblock.actions.forEach((action) => {
      txt += `  * ${action.name}: ${action.description}\n`;
    });
    txt += `\n`;
  }

  if (statblock.legendary_actions && statblock.legendary_actions.length) {
    txt += `Legendary Actions:\n`;
    statblock.legendary_actions.forEach((legendary) => {
      txt += `  * ${legendary.name}: ${legendary.description}\n`;
    });
    txt += `\n`;
  }
  return txt;
}

function monsterDetailsToPlainText(monster) {
  // If it has a detailedDescription object, we handle its fields
  // fallback to monster.name if detailedDescription.name is missing
  const detail = monster.detailedDescription;
  const name = detail?.name || monster.name || 'Unnamed Monster';
  let txt = `${name}\n`;

  if (detail?.intro) {
    txt += `${detail.intro}\n\n`;
  }
  if (detail?.appearance) {
    txt += `${detail.appearance}\n\n`;
  }
  if (detail?.behaviorAbilities) {
    txt += `${detail.behaviorAbilities}\n\n`;
  }
  if (detail?.lore) {
    txt += `${detail.lore}\n\n`;
  }
  if (monster.danger && typeof monster.danger === 'string' && monster.danger.trim()) {
    txt += `Danger: ${monster.danger.trim()}\n\n`;
  }

  return txt;
}
