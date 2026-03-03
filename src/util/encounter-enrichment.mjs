/**
 * Extract action/ability names from HTML strings used in creature data.
 *
 * Input:  "<p><em><strong>Multiattack.</strong></em> The dragon makes three attacks..."
 * Output: ["Multiattack", "Bite", "Claw", "Breath Weapons", "Fire Breath", "Sleep Breath"]
 */
function parseActionNames(html) {
  if (!html) return [];
  const regex = /<strong>([^<]+?)\s*\.?\s*<\/strong>/g;
  const names = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const name = match[1].replace(/\s*\(.*?\)\s*$/, '').trim();
    if (name) names.push(name);
  }
  return [...new Set(names)];
}

/**
 * Build a one-line tactical summary of a creature for prompt injection.
 *
 * Example output:
 * "STR 21 DEX 9 INT 18 WIS 15 | Speed: 10 ft., swim 40 ft. |
 *  Senses: Darkvision 120 ft. | Actions: Multiattack, Tentacle, Tail, Enslave |
 *  Legendary: Detect, Tail Swipe, Psychic Drain |
 *  Traits: Amphibious, Mucous Cloud, Probing Telepathy |
 *  Immune: Lightning | Languages: Deep Speech, Telepathy 120 ft."
 */
export function buildCreatureAbilitySummary(creature) {
  const parts = [];

  // Core stats
  parts.push(`STR ${creature.STR} DEX ${creature.DEX} INT ${creature.INT} WIS ${creature.WIS}`);

  // Speed — already a readable string
  if (creature.Speed) {
    parts.push(`Speed: ${creature.Speed.trim()}`);
  }

  // Senses — strip passive perception (not useful for tactics)
  if (creature.Senses) {
    const senses = creature.Senses
      .replace(/,?\s*Passive Perception \d+/i, '')
      .trim()
      .replace(/,\s*$/, '');
    if (senses) parts.push(`Senses: ${senses}`);
  }

  // Actions — parse names from HTML
  const actionNames = parseActionNames(creature.Actions);
  if (actionNames.length) {
    parts.push(`Actions: ${actionNames.join(', ')}`);
  }

  // Legendary Actions
  const legendaryNames = parseActionNames(creature['Legendary Actions']);
  if (legendaryNames.length) {
    parts.push(`Legendary: ${legendaryNames.join(', ')}`);
  }

  // Reactions
  const reactionNames = parseActionNames(creature.Reactions);
  if (reactionNames.length) {
    parts.push(`Reactions: ${reactionNames.join(', ')}`);
  }

  // Traits / Special Abilities
  const traitNames = parseActionNames(creature.Traits || creature['Special Abilities']);
  if (traitNames.length) {
    parts.push(`Traits: ${traitNames.join(', ')}`);
  }

  // Mark "no abilities" explicitly if creature has no traits, legendary, or reactions
  if (!legendaryNames.length && !reactionNames.length && !traitNames.length) {
    parts.push(`Abilities: none`);
  }

  // Immunities, resistances, and vulnerabilities
  if (creature['Damage Immunities']) {
    parts.push(`Immune: ${creature['Damage Immunities']}`);
  }
  if (creature['Damage Resistances']) {
    parts.push(`Resist: ${creature['Damage Resistances']}`);
  }
  if (creature['Damage Vulnerabilities']) {
    parts.push(`Vuln: ${creature['Damage Vulnerabilities']}`);
  }
  if (creature['Condition Immunities']) {
    parts.push(`Cond. Immune: ${creature['Condition Immunities']}`);
  }

  // Languages
  if (creature.Languages) {
    parts.push(`Languages: ${creature.Languages}`);
  }

  return parts.join(' | ');
}

/**
 * Build the enriched monster brief for prompt injection.
 * Drop-in replacement for the old monsterBrief builder.
 *
 * @param {Array} encounterMonsters - Array of creature objects with quantity added
 * @returns {string} Formatted string with tactical summaries
 */
export function buildEnrichedMonsterBrief(encounterMonsters) {
  return encounterMonsters.map(m => {
    const type = m.creatureType || m.meta?.split(',')[0]?.trim() || 'creature';
    const cr = m.cr || m.Challenge?.split('(')[0]?.trim() || '?';
    const summary = buildCreatureAbilitySummary(m);
    return `- ${m.quantity}× ${m.name} (${type}, CR ${cr})\n  ${summary}`;
  }).join('\n');
}

/**
 * Calculate the encounter's tactical profile from creature data.
 *
 * @param {Array} encounterMonsters - Array of creature objects with quantity
 * @returns {{ totalCount: number, avgInt: number, tacticalLevel: string, groupType: string }}
 */
export function getEncounterProfile(encounterMonsters) {
  const totalCount = encounterMonsters.reduce((sum, m) => sum + (m.quantity || 1), 0);

  // Average INT weighted by quantity
  const totalInt = encounterMonsters.reduce((sum, m) => {
    const int = parseInt(m.INT, 10) || 10;
    return sum + (int * (m.quantity || 1));
  }, 0);
  const avgInt = Math.round(totalInt / totalCount);

  // Tactical sophistication based on average INT
  let tacticalLevel;
  if (avgInt <= 4) tacticalLevel = 'MINDLESS';
  else if (avgInt <= 7) tacticalLevel = 'INSTINCTIVE';
  else if (avgInt <= 11) tacticalLevel = 'BASIC';
  else tacticalLevel = 'CUNNING';

  // Group dynamic
  let groupType;
  if (totalCount === 1) {
    groupType = 'SOLO';
  } else if (encounterMonsters.length === 1) {
    // All same creature type
    groupType = 'PACK';
  } else {
    // Multiple types — check if one is clearly smarter (leader)
    const sorted = [...encounterMonsters].sort((a, b) => {
      return (parseInt(b.INT, 10) || 10) - (parseInt(a.INT, 10) || 10);
    });
    const topInt = parseInt(sorted[0].INT, 10) || 10;
    const nextInt = parseInt(sorted[1].INT, 10) || 10;
    groupType = (topInt >= nextInt + 4) ? 'LED' : 'MIXED';
  }

  return { totalCount, avgInt, tacticalLevel, groupType };
}
