// timelinePrompts.mjs — Prompts for the standalone Timeline (lore) generator.
//
// Generic counterpart to loreBuilderPrompts.mjs: the item Lore Builder is
// coupled to a magic item (name, rarity, features); this one builds a history
// for an arbitrary subject — a person, place, or thing the user names. Same
// one-event-at-a-time model (generate → preview → keep) and the same derived
// `yearsAgo` time-axis, so it can drive the shared LoreSummonCard + spine.

// The standalone tool's generic event-type list, each mapped to a short focus
// phrase the prompt expands. `${subject}` is interpolated by the caller.
const eventTypeFocus = {
  'Origin Event': 'the origin or beginning — how the subject came to be, who or what was responsible, and why',
  'Transformative Event (Bad)': 'a negative transformative event that changed the subject for the worse',
  'Transformative Event (Good)': 'a positive transformative event that changed the subject for the better',
  'Transformative Event (Mixed Consequences)': 'a transformative event with mixed consequences — gains paid for with losses',
  'Unusual/Weird Event': 'a weird, strange, or unusual event in the subject’s history',
  'Alteration/Modification': 'an alteration or modification to the subject',
  'Movement/Relocation': 'a time when the subject moved, was relocated, or changed hands',
  'Peak/Milestone': 'a peak, height of power, or significant milestone',
  'Decline/Deterioration': 'a period of decline, decay, or deterioration',
  'Revival/Renewal': 'a revival, restoration, or renewal',
  'Conflict/Struggle': 'a conflict, struggle, or contest involving the subject',
  'Resolution/Agreement': 'a resolution, treaty, or agreement',
  'Discovery/Recognition': 'a moment of discovery, revelation, or recognition',
  'End/Destruction': 'an ending, downfall, or moment of destruction',
  'Association/Connection': 'a significant association or connection the subject formed',
  'Separation/Isolation': 'a period of separation, exile, or isolation',
  'Conservation/Preservation': 'an act of conservation or preservation',
  'Expansion/Growth': 'a phase of expansion or growth',
};

export const generateTimelineEventPrompt = ({
  subject,
  background,
  eventBefore,
  eventAfter,
  eventType,
  eventYear,
  yearsAgo,
  additionalContext,
  recentEvents,
}) => {
  const focus = eventTypeFocus[eventType] || 'a significant moment in the subject’s history';

  // Context from the neighbouring events so the new event slots into the
  // existing chronology with cause-and-effect on both sides.
  let contextPrompt = '';
  if (eventBefore) {
    const timeSince = eventBefore.yearsAgo - yearsAgo;
    contextPrompt += `\nPREVIOUS EVENT (${timeSince} years before, in ${eventBefore.eventYear}):\n`;
    contextPrompt += `"${eventBefore.title}": ${eventBefore.description}\n`;
    contextPrompt += `\nYour event happens ${timeSince} years later. Show how the previous event's consequences led to this moment.\n`;
  }
  if (eventAfter) {
    const timeUntil = yearsAgo - eventAfter.yearsAgo;
    contextPrompt += `\nLATER EVENT (${timeUntil} years after, in ${eventAfter.eventYear}):\n`;
    contextPrompt += `"${eventAfter.title}": ${eventAfter.description}\n`;
    contextPrompt += `\nYour event must set up conditions that lead to this later event.\n`;
  }

  let varietyInstructions = '';
  if (recentEvents && recentEvents.length > 0) {
    varietyInstructions = `\nAVOID REPETITION from recent events:\n`;
    recentEvents.forEach((e) => {
      varietyInstructions += `- ${e.title}: ${(e.description || '').substring(0, 50)}...\n`;
    });
    varietyInstructions += `\nMake this event DIFFERENT: different location, different people, different kind of turn.\n`;
  }

  return `You are a tabletop RPG lore designer. Be concise and table-ready.

HISTORICAL EVENT RULES:
- Title: 3-6 words. Clearly indicates the kind of event.
- Description: 2-3 sentences maximum (50-70 words total).
- Include: Specific names, places, and consequences.
- Show: Concrete action and immediate result.
- Avoid: Flowery language, vague descriptions, purple prose.

Generate ONE historical event about "${subject}".

${background ? `BACKGROUND ON ${subject}:\n${background}\n` : ''}
${contextPrompt}

EVENT TYPE: ${eventType}
This event is ${focus}.
Year: ${eventYear}
${additionalContext ? `Additional context: ${additionalContext}` : ''}
${varietyInstructions}

CRITICAL WRITING RULES:
1. This MUST be ${focus}.
2. Maximum 2-3 sentences, 50-70 words total.
3. Name specific people, places, and factions.
4. Build on the background and any neighbouring events above — reference their people, places, or fallout.
5. Concrete, visceral detail. Clear cause → action → consequence.
6. Describe only the event itself; do not resolve it or jump ahead.

Format:
{
  "title": "Short title (3-6 words)",
  "description": "A ${eventType} event following the rules above. 2-3 sentences maximum."
}
`;
};

export const generateTimelineSummaryPrompt = ({ subject, background, sortedEvents }) => {
  const timelineText = sortedEvents
    .map((event, i) => {
      const timeSincePrevious = i > 0 ? sortedEvents[i - 1].yearsAgo - event.yearsAgo : 0;
      return `${i + 1}. ${event.title} (${event.eventYear})${
        timeSincePrevious > 0 ? ` [${timeSincePrevious} years after previous]` : ''
      }
    ${event.description}`;
    })
    .join('\n\n');

  return `You are a tabletop RPG lore designer. Be concise and table-ready.

SUMMARY RULES:
- Historical summary: 3-5 sentences. Flowing narrative with years, cause and effect.
- Current state: 1-3 sentences. Where things stand now, and the challenges, opportunities, or schemes in play.
- Use concrete language. No clichés or purple prose.

Create a historical summary for "${subject}".

${background ? `Background on ${subject}:\n${background}\n` : ''}
Timeline (oldest to newest):
${timelineText}

Write a flowing narrative (3-5 sentences) that connects these events with specific years and shows cause and effect.

Then describe the current state of ${subject} (1-3 sentences): how things stand now, plus the plans or schemes of important parties who may change it for better or worse.

Format:
{
  "timeline_summary": "Narrative connecting all events with years and transitions",
  "current_state": "Current state of ${subject} — challenges, opportunities, and who is shaping it"
}
`;
};

export const validateTimelineEventJson = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return Boolean(obj.title && obj.description);
  } catch {
    return false;
  }
};

export const validateTimelineSummaryJson = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return Boolean(obj.timeline_summary && obj.current_state);
  } catch {
    return false;
  }
};
