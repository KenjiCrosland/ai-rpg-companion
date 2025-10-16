// loreBuilderPrompts.mjs - Prompt utilities for Lore Builder

// Event type specific instructions
const eventTypeInstructions = {
  'Creation/Forging': {
    focus: 'WHO created it, WHY they needed it, and HOW they made it',
    mustInclude:
      "The creator's name and motivation, the method/materials used, the cost or sacrifice required",
    example:
      "After his son died to poison, Master Smith Gorvak melted his family's ancestral blade with dragon blood to forge this ring. The ritual cost him three fingers but granted the ring its immunity powers.",
  },

  'First Wielder': {
    focus:
      'WHO first used it after creation, HOW they obtained it, WHAT they accomplished',
    mustInclude:
      "The wielder's relationship to creator (if any), their first significant use, immediate impact",
    example:
      "Gorvak's daughter Mira claimed the ring from his corpse and used its protection to survive the Plague of Shadows. Her immunity made her the only healer who could tend the dying, earning her sainthood.",
  },

  'Heroic Deed': {
    focus: 'A moment of triumph using the item to save lives or defeat evil',
    mustInclude:
      "Specific lives saved or evil defeated, the item's power being crucial, positive consequences",
    example:
      "Captain Aldric channeled the staff's lightning through the flooded mines, electrocuting the aboleth and freeing forty enslaved miners. The rescued families founded Haven in his honor.",
  },

  'Dark Deed': {
    focus: 'The item being used for evil, cruelty, or selfish purposes',
    mustInclude:
      'Specific evil act, victims affected, dark consequences or corruption',
    example:
      "Lord Theron used the crown's domination on his own council, forcing them to sign death warrants for their families. The resulting executions sparked the Crimson Rebellion.",
  },

  'Lost/Hidden': {
    focus:
      'HOW the item became lost, WHO hid it or lost it, WHY it disappeared',
    mustInclude:
      'Last known location, circumstances of loss, who was responsible',
    example:
      "As the city burned, priestess Lyanna sealed the amulet in the temple's foundation stones, speaking a curse on any who would disturb it. The ruins swallowed the secret when she died in the flames.",
  },

  Rediscovered: {
    focus: 'WHO found it, WHERE exactly, and WHAT clues led them there',
    mustInclude:
      'The discoverer, specific location, method of discovery, initial reaction',
    example:
      "Tomb robber Silas found the blade when his torch revealed fresh blood on ancient stone—the sword's vampiric edge had been feeding on rats for centuries. His scream brought the whole crew running.",
  },

  'Changed Hands': {
    focus:
      'HOW ownership transferred (not gift/theft), WHO was involved, consequences',
    mustInclude:
      "Previous owner's fate, new owner's first action, method of transfer",
    example:
      'After Duke Morvain died of fever, his bastard son won the armor in the inheritance trial by combat. His first act was executing his half-brothers who had mocked his birth.',
  },

  'Altered/Modified': {
    focus: 'WHAT changed about the item, WHO changed it, WHY they did it',
    mustInclude:
      'Specific modification, method used, new powers or corruptions added',
    example:
      "The wizard Kelzar bound a demon's soul into the hammer's head with molten silver runes. Now it screams when swung and leaves wounds that never heal.",
  },

  'Used in Battle': {
    focus: 'Specific battle where the item turned the tide',
    mustInclude:
      'Battle name/location, specific combat use, casualties, battle outcome',
    example:
      "At Crow's Bridge, General Vayne's horn shattered the enemy's eardrums when blown, leaving three hundred soldiers writhing deaf in the mud. His forces walked through their lines unopposed.",
  },

  'Used in Ritual': {
    focus: 'Specific ritual or ceremony where item was crucial',
    mustInclude:
      'Ritual purpose, participants, ritual outcome, magical effects',
    example:
      'The Circle of Thorns used the chalice to mix their blood with moonwater, opening a gate to the Feywild. Three members aged to dust but the portal remains open still.',
  },

  'Cursed/Blessed': {
    focus:
      'HOW the item gained a curse or blessing, WHO did it, what triggered it',
    mustInclude:
      'The curse/blessing effect, who cast it and why, triggering event',
    example:
      "When Prince Aldwin murdered the hermit with this blade, the dying man's blood turned the steel black and cursed it to betray its wielder. Aldwin's own guards ran him through within the hour.",
  },

  'Nearly Destroyed': {
    focus: 'WHO tried to destroy it, HOW they tried, WHY it survived',
    mustInclude:
      'Destruction method attempted, reason for survival, damage sustained',
    example:
      "Inquisitor Graves threw the tome into the volcano's heart, but the book emerged in his bedroom that night, pages fused but text intact. His hair turned white from what he read in those warped pages.",
  },

  'Legendary Achievement': {
    focus: 'An impossible feat accomplished with the item',
    mustInclude:
      'The impossible nature of the task, how the item made it possible, lasting fame',
    example:
      "Blind archer Tam used the bow's true-sight to shoot through the eclipse, his arrow traveling three miles to pierce the lich's phylactery. Every archer since trains on \"Tam's Range.\"",
  },

  'Failed Quest': {
    focus: 'A quest that failed BECAUSE of or DESPITE the item',
    mustInclude:
      'Quest goal, point of failure, consequences of failure, survivors',
    example:
      "The Company of the Rose reached the dragon's lair with the dragonslayer spear, but the weapon's enchantment failed against an undead dragon. Only young Marcus escaped to tell of their screaming deaths.",
  },

  'Theft/Heist': {
    focus: 'WHO stole it, FROM whom, HOW they did it',
    mustInclude: 'The thief, the victim, the method, immediate consequences',
    example:
      "Master thief Coins drugged the duke's wine, replaced the real crown with a fake during the feast, and was three cities away before anyone noticed. The duke executed his entire guard.",
  },

  'Gift/Inheritance': {
    focus: 'WHO gave it, TO whom, WHY, and what obligations came with it',
    mustInclude:
      'Giver and recipient relationship, reason for gift, conditions or expectations',
    example:
      "On her deathbed, the queen gave her bastard daughter the ring, revealing her true parentage and binding her to protect the kingdom's heir. The gift came with a kingdom's worth of enemies.",
  },

  'Prophetic Use': {
    focus: 'How the item fulfilled or defied a prophecy',
    mustInclude:
      "The prophecy's specific words, how events matched/subverted them, consequences",
    example:
      'The prophecy said "when stars fall, the blade shall choose," so when meteors struck, three princes fought for the sword. It chose none—instead flying to the stable boy who became king.',
  },
};

export const generateEventPrompt = ({
  itemName,
  itemType,
  rarity,
  features,
  eventBefore,
  eventAfter,
  eventType,
  eventYear,
  yearsAgo,
  additionalContext,
  recentEvents,
}) => {
  // Get specific instructions for this event type
  const typeInstructions = eventTypeInstructions[eventType] || {
    focus: "A significant moment in the item's history",
    mustInclude: 'Specific people, places, and consequences',
    example: 'A dramatic event with clear cause and effect',
  };

  // Build context from adjacent events
  let contextPrompt = '';
  if (eventBefore) {
    const timeSince = eventBefore.yearsAgo - yearsAgo;
    contextPrompt += `\nPREVIOUS EVENT (${timeSince} years before, in ${eventBefore.eventYear}):\n`;
    contextPrompt += `"${eventBefore.title}": ${eventBefore.description}\n`;
    contextPrompt += `\nYour event happens ${timeSince} years later. Show how the previous event's consequences led to this moment.\n`;
  }

  if (eventAfter) {
    const timeUntil = yearsAgo - eventAfter.yearsAgo;
    contextPrompt += `\nFUTURE EVENT (${timeUntil} years later, in ${eventAfter.eventYear}):\n`;
    contextPrompt += `"${eventAfter.title}": ${eventAfter.description}\n`;
    contextPrompt += `\nYour event must set up conditions that lead to this future event.\n`;
  }

  // Create variety instructions based on previous events
  let varietyInstructions = '';
  if (recentEvents && recentEvents.length > 0) {
    varietyInstructions = `\nAVOID REPETITION from recent events:\n`;
    recentEvents.forEach((e) => {
      varietyInstructions += `- ${e.title}: ${e.description.substring(
        0,
        50,
      )}...\n`;
    });
    varietyInstructions += `\nMake this event DIFFERENT: different location, different people, different type of conflict.\n`;
  }

  // Build features string
  const featuresString = Object.entries(features || {})
    .map(([name, desc]) => `${name}: ${desc}`)
    .join('; ');

  return `
    Generate ONE historical event for the magic item "${itemName}" (${itemType}, ${rarity}).
    
    Item Powers: ${featuresString}
    
    ${contextPrompt}
    
    EVENT TYPE: ${eventType}
    Year: ${eventYear} 
    ${additionalContext ? `Additional Context: ${additionalContext}` : ''}
    
    SPECIFIC REQUIREMENTS FOR ${eventType.toUpperCase()}:
    - Focus: ${typeInstructions.focus}
    - Must Include: ${typeInstructions.mustInclude}
    - Example Structure: ${typeInstructions.example}
    
    ${varietyInstructions}
    
    CRITICAL WRITING RULES:
    1. This MUST be a ${eventType} event - follow the specific requirements above
    2. Maximum 2-3 sentences, 50-70 words total
    3. Include specific names of people, places, and factions
    4. Show the item's specific magical properties in action
    5. Concrete details: blood, iron, fire, bone, gold - visceral and specific
    6. Clear cause → action → consequence structure
    
    ${
      eventBefore
        ? `Connect to previous: Show how "${eventBefore.title}" led to this ${eventType}`
        : ''
    }
    ${
      eventAfter
        ? `Set up future: Explain what about this ${eventType} enables "${eventAfter.title}"`
        : ''
    }
    
    Format:
    {
      "title": "Short title (3-6 words) that clearly indicates this is a ${eventType}",
      "description": "A ${eventType} event following the requirements above. ${
    typeInstructions.mustInclude
  }. 2-3 sentences maximum."
    }
  `;
};

export const generateSummaryPrompt = ({
  itemName,
  itemType,
  rarity,
  itemLore,
  sortedEvents,
}) => {
  const timelineText = sortedEvents
    .map((event, i) => {
      const timeSincePrevious =
        i > 0 ? sortedEvents[i - 1].yearsAgo - event.yearsAgo : 0;
      return `${i + 1}. ${event.title} (${event.eventYear})${
        timeSincePrevious > 0
          ? ` [${timeSincePrevious} years after previous]`
          : ''
      }
    ${event.description}`;
    })
    .join('\n\n');

  return `
    Create a historical summary for the magic item "${itemName}".
    
    Item: ${itemName} (${itemType}, ${rarity})
    Original Lore: ${itemLore}
    
    Timeline:
    ${timelineText}
    
    Write a flowing narrative (3-4 sentences) that connects these events with specific years.
    Show cause and effect. Use concrete language. No clichés or purple prose.
    
    Then describe the item's current status (1-2 sentences): where it is now and why people seek it.
    
    Format:
    {
      "historical_summary": "Narrative connecting all events with years and transitions",
      "item_legacy": "Current location/status and why it matters"
    }
  `;
};

export const validateEventJson = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return obj.title && obj.description;
  } catch {
    return false;
  }
};

export const validateSummaryJson = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return obj.historical_summary && obj.item_legacy;
  } catch {
    return false;
  }
};
