/**
 * Encounter Generation Prompts
 *
 * Three-call system: Structure → Scene → Details
 * 1. Structure (JSON metadata: place_name, tone_id, key_npc, situation, centerpiece)
 * 2. Scene (read-aloud prose following tone-specific sentence structure)
 * 3. Details (5 DM sections: situation, space, turn read-aloud, turn DM notes, aftermath)
 *
 * Rationale: Build the story first, write the scene from that story, then fill in mechanics.
 */

import {
  TACTICAL_FRAMEWORKS,
  GROUP_FRAMEWORKS,
} from '@/data/tactical-frameworks.mjs';
import creatureIntelligenceData from '@/data/creature-intelligence.json';

// ─── CREATURE INTELLIGENCE HELPERS ────────────────────────────────────────

/**
 * Get creature intelligence data for creatures in the encounter
 */
export function getCreatureIntelligence(encounterCreatures) {
  const result = {};
  for (const creature of encounterCreatures) {
    const intel = creatureIntelligenceData[creature.name];
    if (intel) result[creature.name] = intel;
  }
  return result;
}

/**
 * Extract the disguised creature's name from Call 1 output.
 * Matches key_npc text against known creature names.
 *
 * @param {Object} call1Result - Parsed Call 1 output
 * @param {string} monsterBrief - Monster brief to extract creature names from
 * @returns {string|null} Creature name or null
 */
function getDisguisedCreatureName(call1Result, monsterBrief) {
  if (!call1Result?.disguised_as || !call1Result?.key_npc) return null;

  // Extract creature names from monster brief
  const creatureNames = [];
  const lines = monsterBrief.split('\n');
  for (const line of lines) {
    const match = line.match(/^-\s+\d+×\s+([^(]+)/);
    if (match) {
      creatureNames.push(match[1].trim());
    }
  }

  // Match key_npc text against creature names (case-insensitive)
  // key_npc format: "Jhalmuk, an **oni** disguised as a wounded traveler..."
  // Sort by length descending to match longer names first (prevents "Rat" matching before "Wererat")
  const sortedNames = creatureNames.sort((a, b) => b.length - a.length);
  const npc = call1Result.key_npc.toLowerCase();
  for (const name of sortedNames) {
    if (npc.includes(name.toLowerCase())) {
      return name;
    }
  }

  return null;
}

/**
 * Build minimal brief - count, name, type, CR + description
 * Used by Calls 1 and 2 for story context without mechanical clutter
 *
 * @param {string} monsterBrief - Raw monster brief
 * @param {Object} creatureIntelligence - Creature intelligence lookup
 * @param {Object} [call1Result] - Optional Call 1 result for disguise swapping (Call 2 only)
 */
export function buildMinimalBrief(monsterBrief, creatureIntelligence, call1Result = null) {
  const lines = monsterBrief.split('\n');
  const minimalLines = [];

  // Determine which creature is disguised (if any)
  const disguisedCreature = call1Result ? getDisguisedCreatureName(call1Result, monsterBrief) : null;

  if (disguisedCreature && call1Result?.disguised_as) {
    console.log(`[DISGUISE SWAP] Creature "${disguisedCreature}" will use disguise: "${call1Result.disguised_as}"`);
  }

  for (const line of lines) {
    // Match pattern like "- 1× Oni (fiend, CR 7)"
    // buildEnrichedMonsterBrief outputs (type, CR X) without size
    const match = line.match(/^-\s+(\d+)×\s+([^(]+)\s+\(([^,]+),\s+(CR\s+[^)]+)\)/);
    if (match) {
      const [, count, name, type, cr] = match;
      const creatureName = name.trim();
      minimalLines.push(`- ${count}× ${creatureName} (${type.trim()}, ${cr.trim()})`);

      // Append description, retreat, and social if available (case-insensitive lookup)
      if (creatureIntelligence && typeof creatureIntelligence === 'object') {
        // Find matching creature by name (case-insensitive)
        const matchingKey = Object.keys(creatureIntelligence).find(
          key => key.toLowerCase() === creatureName.toLowerCase()
        );

        if (matchingKey) {
          const intel = creatureIntelligence[matchingKey];

          // Swap description for disguised creature (Call 2 only)
          const isDisguised = disguisedCreature && creatureName === disguisedCreature;
          if (isDisguised && call1Result.disguised_as) {
            console.log(`[DISGUISE SWAP] Replacing true description with: "${call1Result.disguised_as}"`);
            minimalLines.push(`  ${call1Result.disguised_as}`);
          } else if (intel?.description) {
            minimalLines.push(`  ${intel.description}`);
          }

          // Retreat and Social (unchanged for both calls)
          if (intel?.retreat) {
            minimalLines.push(`  RETREAT: ${intel.retreat}`);
          }

          if (intel?.social) {
            minimalLines.push(`  SOCIAL: ${intel.social}`);
          }
        }
      }
    } else if (line.trim().startsWith('-')) {
      minimalLines.push(line);
    }
  }

  return minimalLines.join('\n');
}

/**
 * Build tactical brief - full tactical_identity + abilities allowlist
 * Used by Call 3 for mechanical combat details
 */
export function buildTacticalBrief(monsterBrief, creatureIntelligence) {
  if (!creatureIntelligence || Object.keys(creatureIntelligence).length === 0) {
    return monsterBrief;
  }

  const lines = monsterBrief.split('\n');
  const enrichedLines = [];

  for (const line of lines) {
    enrichedLines.push(line);

    for (const [name, intel] of Object.entries(creatureIntelligence)) {
      if (line.toLowerCase().includes(name.toLowerCase()) && intel) {
        if (intel.tactical_identity) {
          enrichedLines.push(`  TACTICAL IDENTITY: ${intel.tactical_identity}`);
        }
        if (intel.abilities?.length) {
          enrichedLines.push(`  ALLOWED ABILITIES (use ONLY these):`);
          for (const ability of intel.abilities) {
            enrichedLines.push(`    - ${ability}`);
          }
        }

        // NEW: Retreat
        if (intel.retreat) {
          enrichedLines.push(`  Retreat: ${intel.retreat}`);
        }

        // NEW: Social
        if (intel.social) {
          enrichedLines.push(`  Social: ${intel.social}`);
        }

        // NEW: Aftermath Seeds
        if (intel.aftermath_hooks && intel.aftermath_hooks.length > 0) {
          enrichedLines.push(`  Aftermath Seeds:`);
          for (const hook of intel.aftermath_hooks) {
            enrichedLines.push(`  - ${hook}`);
          }
        }

        break;
      }
    }
  }

  return enrichedLines.join('\n');
}

// ─── TONE SYSTEM ───────────────────────────────────────────────────────────

/**
 * Tone definitions with narrative implications and centerpiece candidates
 * Each tone defines WHAT STATE the encounter is in when the party arrives
 */
const TONES = {
  interrupted_activity: {
    id: 'interrupted_activity',
    label: 'INTERRUPTED ACTIVITY',
    narrative_implication: 'The creatures are already doing something. The encounter exists before the players arrive. They have a REASON to be here that isn\'t "waiting for adventurers."',
    centerpieces: [
      'The creatures are butchering a fresh kill on a makeshift table, arguing over the choicest parts. The carcass belongs to something the party might recognize.',
      'One creature is being held down by the others while a crude brand or marking is applied. A punishment? An initiation?',
      'The creatures are dismantling a wagon and sorting its contents into piles. One pile has adventuring gear. Fresh adventuring gear.',
      'A creature is chained to a post while the others throw things at it, jeering. It\'s unclear if this is punishment or entertainment.',
      'The creatures are feeding something in a pit — tossing chunks of meat into a hole and watching whatever is down there fight over it.',
      'Two creatures are arm-wrestling over a contested item while the others watch and place bets using teeth and coins.',
      'The creatures are building something — a barricade, a cage, a crude catapult. They\'re about halfway done and the materials are scattered everywhere.',
      'A creature is painting or scratching symbols on the wall while the others stand watch. The symbols match something the party has seen before.'
    ]
  },

  quiet_tension: {
    id: 'quiet_tension',
    label: 'QUIET TENSION',
    narrative_implication: 'Stillness about to break. The danger is visible but hasn\'t activated. Nobody has attacked — the tension comes from what MIGHT happen.',
    centerpieces: [
      'A creature sits alone in the center of the room, not moving, surrounded by the bodies of others of its kind. It doesn\'t attack. It\'s waiting for something.',
      'Two groups of creatures face each other from opposite sides of the space, weapons drawn but not fighting. The party has walked into a standoff.',
      'A creature guards a doorway, visibly terrified of whatever is on the other side. It doesn\'t want to fight the party — it wants to stop them from opening the door.',
      'A lit fuse burns slowly toward a barrel. The creatures don\'t seem worried about it. The party doesn\'t know what\'s in the barrel.',
      'A creature is trapped — pinned under rubble, caught in its own trap, stuck in a web. The others haven\'t decided whether to help it or leave it.',
      'The creatures are asleep. All of them. Except one, who sits with its back to the party, rocking slowly back and forth, holding something.',
      'A cage in the center of the room holds something the creatures are clearly afraid of. The cage door is held shut by a rope that runs across the floor.',
      'Every creature in the room is staring at the same spot on the ceiling. Nothing is visibly there.'
    ]
  },

  triggered_mistake: {
    id: 'triggered_mistake',
    label: 'TRIGGERED MISTAKE',
    narrative_implication: 'The players cause the problem. Their presence activates a dormant threat. The scene was stable before they arrived.',
    centerpieces: [
      'The floor is a pressure plate. The creatures know where to stand — the party doesn\'t. Moving to the wrong tile triggers something.',
      'The creatures are dormant until a condition is met — torchlight wakes them, sound above a threshold activates them, crossing a threshold brings them to life.',
      'A corpse in the room is rigged. Moving it, searching it, or stepping over it triggers a mechanical trap the creatures have set.',
      'The creatures guard an object the party needs. Taking it starts a countdown — the room begins to seal, or the creatures become frenzied, or something worse wakes up.',
      'The room has been marked with a warning in a language the party might not read. Entering despite the warning activates the ward.',
      'Something in the room is leaking — gas, water, sand, spores. It\'s slow now. The combat vibrations make it worse. Every round of fighting accelerates the leak.',
      'A mirror or reflective surface in the room shows something different from reality. When the party looks into it, whatever is in the reflection starts coming through.',
      'The creatures are statue-still, arranged in a pattern. Disturbing one — bumping it, casting a spell near it, making noise — wakes them all simultaneously.'
    ]
  },

  already_in_motion: {
    id: 'already_in_motion',
    label: 'ALREADY IN MOTION',
    narrative_implication: 'Chaos is already happening. The players are thrown into the middle of something gone wrong. Things are actively getting worse.',
    centerpieces: [
      'The creatures are fleeing from something deeper in the dungeon and collide with the party head-on. Whatever they\'re running from is still coming.',
      'A structure is actively collapsing. The creatures are trying to escape through the same exit the party needs to enter. Everyone is in each other\'s way.',
      'One creature is dragging another (wounded or prisoner) while the rest provide covering fire against an unseen attacker. The party is now in the crossfire.',
      'A fire is spreading. The creatures are grabbing valuables and running. The party must decide: stop the creatures, stop the fire, or grab the valuables themselves.',
      'A vehicle is in motion — a cart rolling downhill, a raft in fast water, a mine elevator descending. The fight happens on or around it while it moves.',
      'Two factions of creatures are already fighting each other. The party arrives mid-battle. Both sides might turn on the party, or one side might try to recruit them.',
      'A creature has just set off its own trap by accident. The room is filling with smoke/water/gas and the creatures are panicking, attacking anything near them.',
      'An alarm has just been triggered. The creatures are scrambling into defensive positions. The party has seconds before the defenses are set.'
    ]
  },

  something_wrong: {
    id: 'something_wrong',
    label: 'SOMETHING WRONG',
    narrative_implication: 'The scene doesn\'t make sense at first. Something is off — uncanny, unexpected, contradictory. The expected situation is subverted.',
    centerpieces: [
      'The creatures are arranged symmetrically — too perfectly. Like someone positioned them. They move in unison, mechanically, as if controlled.',
      'One creature is treating the others gently — feeding them, cleaning them, speaking softly. It doesn\'t match what these creatures normally do. Something has changed them.',
      'The creatures ignore the party entirely. They\'re focused on a task and won\'t stop even when attacked. What are they doing that matters more than survival?',
      'The room is set up like a home — beds, a table with food, decorations. These creatures have been living here. Comfortably. For a long time.',
      'A creature is standing over a freshly dead creature of its OWN kind, weapon bloody. The others watch, uncertain. The party has walked into a murder scene.',
      'The creatures are building something that makes no sense for their intelligence — a complex mechanism, a written document, a piece of art. Who taught them?',
      'One creature is much larger/different than the others but acts subservient to the smallest. The power dynamic is inverted from what the party would expect.',
      'The bodies of previous adventurers are arranged in chairs around a table, posed as if having a meal. The creatures sit among them, eating.'
    ]
  }
};

/**
 * Tone sentence structures for Call 2 (read-aloud prose)
 * Each tone defines a different sentence order because the SEQUENCE matters
 */
const TONE_SENTENCE_STRUCTURES = {
  interrupted_activity: {
    structure: `Sentence 1 — A SENSORY HOOK: What players notice BEFORE they see anything. A sound, a smell, a temperature change. Something specific and physical.
Examples:
- "You hear them before you see them — grunting, the scrape of metal on stone, and a wet tearing sound."
- "The smell of smoke and charred meat hits you ten feet before the tunnel opens up."
- "Singing — low, rhythmic, in a language you don't recognize — echoes off the stone."

Sentence 2 — THE SPACE: Players get a snapshot of the environment. Dimensions, terrain, light, key features. One sentence that orients them.
Examples:
- "The tunnel opens into a low-ceilinged chamber thick with the smell of blood and offal."
- "A clearing, maybe forty feet across, ringed by dead trees with bark stripped white."
- "The chapel is small — four pews, a cracked altar, a hole in the roof letting in rain."

Sentence 3 — THE ACTIVITY: What the creatures are doing, described as a scene in progress. This is the core of the tone — the encounter was happening before the party arrived. The centerpiece should be visible here.
Examples:
- "Three goblins crouch over the carcass of a horse, hacking it apart with crude cleavers and stuffing meat into sacks."
- "A massive serpent is coiled around the rim of a stone pit, dropping something into the darkness below while three translucent figures drift around it."
- "Two hobgoblins are loading crates onto a worg's back, working fast, checking the treeline between every crate."

Sentence 4 — THE MOMENT: The instant the creatures notice the party OR the instant something shifts. A reaction, a look, a sound that changes everything. Short and punchy.
Examples:
- "A bugbear leans against the far wall, picking its teeth with a bone and watching the tunnel entrance. Its eyes find yours."
- "One of them looks up. Then they all do."
- "The serpent's head swings toward you. It was expecting someone — but not you."`
  },

  quiet_tension: {
    structure: `Sentence 1 — THE STILLNESS: Establish that nothing is moving. The silence or near-silence IS the sensory detail.
Examples:
- "Nothing moves."
- "The only sound is water dripping from the ceiling into a pool that has long since overflowed."
- "It is quiet in a way that feels deliberate, like everything in the room is holding its breath."

Sentence 2 — THE SPACE AND THE CREATURES: Show the room and the creatures in a single frozen tableau. They are visible, positioned, and watching. The centerpiece is part of this tableau.
Examples:
- "The chapel is small — four pews, a stone altar, a collapsed section of roof letting in gray rain. A woman in torn robes kneels at the altar, her back to you. Two wolves lie on either side of her, ears flat."
- "A hexagonal chamber, every wall carved with empty shelves. Four eyeless figures crouch along the walls, heads tilted, listening. At the center, something floats above a stone pedestal, watching."
- "The room is set up like a campsite — bedrolls, a dead fire, packs against the wall. Six shapes sit in a circle, motionless, facing inward."

Sentence 3 — THE DETAIL THAT'S WRONG: Something specific that tells the players this situation is unstable. A fuse burning, a weapon drawn, a cage with a fraying rope, eyes tracking movement.
Examples:
- "One of the wolves growls, low and steady, without breaking eye contact."
- "The fuse is halfway burned. None of them seem worried about it."
- "A cage in the center of the room holds something the creatures are clearly afraid of. The cage door is held shut by a rope that runs across the floor — right where you're standing."

Sentence 4 — THE HELD BREATH: A final beat of tension. The moment before. Keep it short.
Examples:
- "Nobody has moved yet."
- "The woman's whispering stops."
- "Then one of them tilts its head toward the sound of your footstep."`
  },

  triggered_mistake: {
    structure: `Sentence 1 — THE DORMANT SCENE: The space and the creatures, completely still. Everything is arranged, positioned, waiting. The read-aloud begins with the tableau BEFORE the trigger.
Examples:
- "The corridor widens into a crypt. Bones are scattered across the floor in a pattern that looks deliberate — almost geometric."
- "The chamber is dark and dry. Shapes line the walls — hunched, motionless, coated in dust. They might be statues."
- "A massive serpent lies coiled around a stone basin, utterly still, its scales dry and dull. Three faint shapes hover near the walls like stains in the air."

Sentence 2 — THE CENTERPIECE: The object or feature at the center of the encounter, described in its dormant state. It should be notable, interesting, something players would approach or touch.
Examples:
- "Four skeletons stand in a loose ring around the arrangement, motionless, each facing outward."
- "A crystal flask sits on the pedestal, lid slightly ajar, catching the torchlight."
- "The pit at the center of the room is covered with a stone lid. The lid has a crack. Something warm rises from the crack."

Sentence 3 — THE TRIGGER: The players do something — step forward, make noise, touch something, cast light — and the dormant scene responds. This sentence is in present tense and describes the activation.
Examples:
- "As you step closer, their skulls turn in unison — not toward you, but toward the open sarcophagus."
- "Your boot hits the wrong stone. Something clicks beneath the floor."
- "The torchlight touches the serpent's scales. Its eyes open — milky, ancient, and furious."

Sentence 4 — THE CONSEQUENCE: What happens next, fast. The room wakes up. Keep it short and immediate.
Examples:
- "It was perfectly still until you spoke. Now it is not."
- "The shapes in the walls pull free. They are not stains. They are not friendly."
- "Everything in the room turns toward you at once."`
  },

  already_in_motion: {
    structure: `Sentence 1 — CHAOS FIRST: Open with the action already happening. Something is burning, collapsing, charging, fleeing, exploding. The biggest, loudest, most urgent thing.
Examples:
- "The bridge is already burning."
- "Something crashes through the underbrush ahead of you — running, not toward you, but away from something."
- "The wall collapses inward and dust fills the passage. Through the gap, you hear screaming."

Sentence 2 — THE CREATURES IN THE CHAOS: Who is doing what, mid-action. They are not posed or waiting — they are running, fighting, fleeing, scrambling.
Examples:
- "A hobgoblin captain hacks at the anchor line with a hatchet while four hobgoblins behind him loose arrows at something on your side of the river — and now at you."
- "Three goblins are scrambling over each other to get through a narrow crack in the far wall. Something large is pushing through behind them."
- "Two ogres are dragging a cage between them, running. Whatever is in the cage is slamming against the bars."

Sentence 3 — THE CENTERPIECE IN MOTION: The unusual element, already active, already a problem. It is doing something that will get worse.
Examples:
- "'Cut it!' the captain shouts over the roar. 'Cut it before they cross!'"
- "A cart loaded with black-powder barrels is rolling downhill toward the gatehouse. Nobody is steering."
- "The pit is overflowing — whatever they were keeping down there is climbing out."

Sentence 4 — THE PLAYER'S POSITION: Where the party is relative to the chaos. Are they in the crossfire? Blocking an escape? About to be hit? This grounds them in the action.
Examples:
- "You are standing in the only exit."
- "The arrows are not aimed at you — not yet. But you are between them and the bridge."
- "The stampede is heading directly for the tunnel you just came through."`
  },

  something_wrong: {
    structure: `Sentence 1 — THE NORMAL PART: Describe what the players expect to see — a room, creatures, a situation — presented as if everything is fine. Lull them.
Examples:
- "The chamber looks lived-in. Bedrolls, a cooking pot, crates stacked neatly against the wall."
- "Two groups of kobolds face each other across a narrow cavern, screeching."
- "A campfire burns in the center of the ruin. Figures sit around it, eating."

Sentence 2 — THE DETAIL THAT'S OFF: One specific thing that doesn't fit. Not a big dramatic reveal — a quiet wrongness that nags.
Examples:
- "The bedrolls are arranged in a perfect circle, each exactly the same distance apart."
- "The larger group clusters behind a barricade. The smaller group is backed against a crack in the far wall. Something heavy shifts behind the crack."
- "The figures are not all alive. Two of them are skeletons, propped upright, bowls in their laps. The others eat beside them as if nothing is wrong."

Sentence 3 — THE CREATURES' BEHAVIOR: What the creatures are doing that contradicts expectations. They should be attacking but aren't. They should be hostile but are gentle. They should be stupid but are building something complex.
Examples:
- "The goblins are building something — a complex mechanism of gears and wire that no goblin should know how to make."
- "The largest creature acts subservient to the smallest. It flinches when the small one moves."
- "They ignore you entirely. Whatever they are focused on matters more than survival."

Sentence 4 — THE QUESTION: Leave the players with something unresolved. Do NOT answer it. The tension comes from not understanding.
Examples:
- "Both sides freeze. Then they notice you."
- "One of them looks at you. It is smiling. It should not be able to smile."
- "The skeleton in the center chair has a fresh flower tucked behind its ear. Someone put it there today."`
  }
};

/**
 * Select an encounter tone based on creature preferences.
 *
 * @param {Object[]} creatures - Array of creature entries from creature-intelligence.json
 * @param {string|null} forcedTone - Optional user-specified tone override
 * @returns {string} A tone_id from the available tones
 */
export function selectTone(creatures, forcedTone = null) {
  if (forcedTone) return forcedTone;

  // Score each tone by how many creatures prefer it, weighted by priority.
  // Position 0 = weight 4, position 1 = weight 3, position 2 = weight 2, position 3 = weight 1
  const scores = {};
  for (const creature of creatures) {
    const tones = creature.preferred_tones || [];
    tones.forEach((tone, i) => {
      const weight = 4 - i;  // First tone gets highest weight
      scores[tone] = (scores[tone] || 0) + weight;
    });
  }

  // Sort by score descending
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // If no tones scored, fall back to random selection
  if (ranked.length === 0) {
    const toneKeys = Object.keys(TONES);
    return toneKeys[Math.floor(Math.random() * toneKeys.length)];
  }

  // Pick from the top 3 with weighted randomness (top gets more weight)
  // This prevents encounters from always using the same tone for the same creature
  const topN = ranked.slice(0, Math.min(3, ranked.length));
  const totalWeight = topN.reduce((sum, [, score]) => sum + score, 0);
  let roll = Math.random() * totalWeight;
  for (const [tone, score] of topN) {
    roll -= score;
    if (roll <= 0) return tone;
  }

  return topN[0][0]; // Fallback
}

/**
 * Select a random tone and get matching centerpiece scenarios
 * Mixes creature encounter hooks into centerpiece pool if available
 */
export function getReadAloudToneAndCenterpieces(creatureIntelligence) {
  const toneKeys = Object.keys(TONES);
  const randomKey = toneKeys[Math.floor(Math.random() * toneKeys.length)];
  const tone = TONES[randomKey];

  // Extract encounter hooks from creature intelligence
  const creatureHooks = !creatureIntelligence ? [] :
    Object.values(creatureIntelligence)
      .filter(intel => intel?.encounter_hooks?.length)
      .flatMap(intel => intel.encounter_hooks);

  let pool;
  if (creatureHooks.length >= 3) {
    // Creature hooks primary, 2 generic for variety
    const shuffledHooks = [...creatureHooks].sort(() => Math.random() - 0.5);
    const shuffledGeneric = [...tone.centerpieces].sort(() => Math.random() - 0.5);
    pool = [...shuffledHooks.slice(0, 3), ...shuffledGeneric.slice(0, 2)];
  } else if (creatureHooks.length > 0) {
    // Mix creature hooks with generic
    const shuffledGeneric = [...tone.centerpieces].sort(() => Math.random() - 0.5);
    pool = [...creatureHooks, ...shuffledGeneric.slice(0, 4 - creatureHooks.length)];
  } else {
    // No creature hooks, use generic only
    pool = [...tone.centerpieces].sort(() => Math.random() - 0.5);
  }

  // Select 3-4 centerpieces from pool
  const centerpieceShortlist = [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(4, pool.length));

  return { tone, centerpieceShortlist };
}

// ─── CALL 1: STRUCTURE (STORY + METADATA) ─────────────────────────────────

/**
 * Build Call 1 prompt: Generate story structure and metadata (no prose)
 */
export function buildCall1StructurePrompt(
  location,
  minimalBrief,
  includeNPC,
  tone,
  centerpieceShortlist
) {
  // Extract creature list for checklist
  const creatureChecklist = minimalBrief
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, '☐ '))
    .join('\n  ');

  const npcBlock = includeNPC
    ? `
NAMED NPC:
The highest-CR creature that can speak gets a name, one physical detail, and an immediate motive. Format:
"[Name], a **[statblock name]** [one vivid physical detail], wants to [specific immediate goal]."

GOOD: "Vexara, a **mage** with burn scars covering her hands, wants to extract a memory from the dying goblin before the others destroy the body."
GOOD: "Skarn, a **hobgoblin captain** wearing a human knight's tabard as a trophy, wants to hold this bridge until reinforcements arrive at dawn."
BAD: "Zarthox the Destroyer, an evil mage who seeks ultimate power" (generic, no physical detail, vague motive)

If no creature can plausibly speak or lead, set key_npc to null.

SOCIAL INTERACTION RULE:
Check the creature's Intelligence and description to determine social options.

INT 5 OR BELOW (beasts, oozes, most undead, plants):
There is no negotiation. State what the creature is protecting, hunting, or doing. Describe what happens if the party avoids combat (sneak past, distract, flee). Set key_npc to null.

INT 6 OR ABOVE (humanoids, fiends, dragons, intelligent undead):
The situation MUST include what the creature wants and how it responds to non-violent approach. This should fit the creature's personality:
- A hobgoblin demands surrender or tribute
- A night hag offers a deal with terrible strings attached
- An ogre can be bribed with food
- A dragon demands worship or treasure
- A bandit captain negotiates ransom

Check the creature description — it tells you the creature's social personality. Use it.`
    : `
SOCIAL INTERACTION RULE:
Check the creature's Intelligence and description to determine social options.

INT 5 OR BELOW (beasts, oozes, most undead, plants):
There is no negotiation. State what the creature is protecting, hunting, or doing. Describe what happens if the party avoids combat (sneak past, distract, flee). Set key_npc to null.

INT 6 OR ABOVE (humanoids, fiends, dragons, intelligent undead):
The situation MUST include what the creature wants and how it responds to non-violent approach. This should fit the creature's personality:
- A hobgoblin demands surrender or tribute
- A night hag offers a deal with terrible strings attached
- An ogre can be bribed with food
- A dragon demands worship or treasure
- A bandit captain negotiates ransom

Check the creature description — it tells you the creature's social personality. Use it.`;

  return `══════════════════════════════════════════════
CREATURE CHECKLIST — VERIFY BEFORE RESPONDING
══════════════════════════════════════════════
This encounter contains EXACTLY:
  ${creatureChecklist}
This is the COMPLETE list.
- No other creatures exist
- Do not add, summon, spawn, or imply any creature not listed
- Every creature above MUST appear in your response
- The quantities are EXACT — not "several," not "a pack"
══════════════════════════════════════════════

You are building the STORY STRUCTURE for a D&D 5e encounter. No prose. No read-aloud. Pure story decisions and mechanical definitions.

LOCATION: ${location || 'Not specified — infer from the creatures'}

CREATURES:
${minimalBrief}

CREATURE DESCRIPTIONS are provided below each creature. Use these to understand what the creature IS — its appearance, its nature, how it behaves. Build your situation around the creature's actual identity. Do NOT copy the descriptions into your output. Use them to inform your decisions about the situation, the NPC personality, and what the creatures want.

RETREAT AND SOCIAL DATA:
Some creatures have RETREAT and SOCIAL lines in the brief.

RETREAT tells you how the creature behaves when losing:
- Use this to write the escape/failure condition in the situation
- If a creature has no RETREAT line, it fights to the death — there is no escape or surrender scene
- Reference the specific escape method (Etherealness, Burrow, Teleport, formation withdrawal) when writing what happens if the party is winning

SOCIAL tells you what the creature wants from a non-violent approach:
- Use this to write the negotiation/interaction option in the situation
- If a creature has no SOCIAL line, there is no negotiation — the creature cannot communicate or has no interest in talking
- The social personality defines HOW the creature negotiates: a hobgoblin demands, a hag bargains, an ogre can be bribed, a dragon demands worship
- The situation MUST include the social option if one exists — do not default to combat-only for creatures that can talk

If NEITHER RETREAT nor SOCIAL is present, the creature is mindless or instinct-driven. The situation should describe what it's doing (hunting, guarding, feeding) and what happens if the party avoids combat (sneak past, distract, flee). Set key_npc to null.

If SOCIAL is present but RETREAT is not, the creature will negotiate but fights to the death if talks fail.

If RETREAT is present but SOCIAL is not, the creature can't negotiate but will flee rather than die.

TONE: ${tone.label}
${tone.narrative_implication}
${npcBlock}

CENTERPIECE CANDIDATES — Pick the BEST fit or adapt one:
${centerpieceShortlist.map((c, i) => `${i + 1}. ${c}`).join('\n')}

The centerpiece must be structured with THREE parts:
1. DESCRIPTION: What it is (1-2 factual sentences for the DM)
2. MECHANIC: At least one DC, damage value, HP, AC, or trigger condition. Must be mechanical, not flavor-only.
3. PLAYER_EXPLOIT: One thing clever players can do to turn it to their advantage

GOOD centerpiece:
{
  "description": "A 10-foot stone-lined pit containing a chained fire elemental the naga feeds to keep weakened.",
  "mechanic": "If nothing is dropped into the pit for 2 consecutive rounds, the elemental breaks its chains and attacks everything within 30 feet. 50 HP, AC 13.",
  "player_exploit": "Vials of elemental essence on a stone shelf can be thrown in to buy an extra round of calm, or broken as 2d6 fire grenades in a 5-foot radius."
}

BAD centerpiece: "A glowing crystal that pulses with arcane energy" (no mechanic, no exploit)

SITUATION — Answer these questions in 3-5 sentences:
- Why are these creatures here? What are they doing RIGHT NOW?
- What do they want from the party (if anything)?
- What happens if the party talks instead of fights?
- What secret does the DM know that the players don't?

The situation should feel like the middle of a story, not the beginning. Something is already happening or has already happened.

SITUATION SCOPE:
The situation describes the STATE OF THE SCENE when players arrive, the creature's MOTIVATION, and the STAKES if things go wrong.

KEEP in the situation:
- What the creature is doing NOW
- What it wants from the party
- What the DM knows that players don't
- What happens if negotiation fails ("this becomes hostile")
- Conditions that trigger the Turn ("if the ritual completes...")

LEAVE OUT of the situation:
- Specific combat actions ("casts Fireball," "uses glaive reach")
- Escape sequences ("turns invisible and flies away")
- Post-retreat plans ("returns in a new disguise to infiltrate")
- Round-by-round tactics

Call 3 has the full tactical brief with abilities and retreat data. It doesn't need combat choreography from the situation.

Examples:
- GOOD: "The oni is disguised as a wounded traveler, offering help to gain the party's trust. It wants to isolate one member to feed. If the party sees through the disguise, this becomes hostile immediately."
- BAD: "The oni is disguised as a wounded traveler. If threatened, it turns invisible and flies away, planning to return later in a new disguise to infiltrate the party's allies."

- GOOD: "The wererat thieves are dividing stolen goods in the cellar. They want the party to leave before noticing the crates bear the merchant guild's seal. If discovered, they defend the goods to the death."
- BAD: "The wererat thieves are dividing stolen goods. If discovered, they shift to rat form and flee through the sewer grates, regrouping at their guild hall to plan revenge."

DISGUISE REQUIREMENT:
Read the creature descriptions and preferred_tones. If a creature has "false_hospitality" or "hidden_predator" in its preferred_tones AND has shapeshifting/disguise abilities (Change Shape, Shapechanger, Disguise Self), the situation MUST use the disguise. The entire point of these creatures is the deception.

Required disguises by creature:
- Oni → wounded traveler, lost merchant, or friendly giant (uses Change Shape)
- Night Hag → villager, healer, grandmother, or merchant (uses Disguise Self or Change Shape)
- Wererat/Werewolf/Wereboar → human form (uses Shapechanger - they ARE humanoid in the encounter, not hybrid)
- Doppelganger → someone the party expects to meet (uses Shapechanger)
- Green Hag → harmless old woman or herbalist (uses Illusory Appearance)
- Succubus/Incubus → attractive humanoid (uses Shapechanger)
- Couatl → humanoid or beast form (uses Change Shape)

The opening scene shows ONLY the disguise. The situation tells the DM the truth. The Turn reveals the transformation. Do not write the creature in its true form in the opening unless it has NO shapeshifting ability or the tone is not deception-focused.

TURN DECISION:
Set "has_turn" to true ONLY if the situation has a genuine mid-encounter shift:
- A hidden, disguised, or dormant creature that reveals itself
- A social encounter that could turn violent
- A centerpiece that changes state (breaks, activates, transforms)
- A third party that arrives or intervenes
- A betrayal, escape attempt, or change of allegiance

Set "has_turn" to false if the encounter is straightforward combat where the interesting elements are the terrain, the creature abilities, and the centerpiece mechanics. Not every encounter needs a twist. A remorhaz guarding its kill in an ice cavern is compelling without a scripted dramatic beat.

DISGUISE APPEARANCE (CRITICAL):
If you wrote a situation where a creature uses a disguise (per the DISGUISE REQUIREMENT above), you MUST output a "disguised_as" field. This field describes what the players ACTUALLY SEE — the false appearance, NOT the true form.

Write it as a 2-sentence description: physical appearance + one behavioral detail that sells the disguise.

REQUIRED format:
- Oni disguised as traveler: "A limping man in torn traveling clothes, one arm hanging limp, face half-hidden by a muddy hood. Nothing about him reads as dangerous."
- Wererat in human form: "A wiry man in a stained leather jacket, sharp eyes darting between the rats as if counting them. He smells faintly of wet fur and old cheese."
- Night hag as village healer: "An elderly woman with kind eyes and flour-dusted hands, offering warm bread from a basket. Her smile reaches her eyes — or seems to."

CRITICAL RULES:
1. NO mention of the true form (no blue skin, no horns, no claws, no fur if in human form)
2. The disguise must be COMPLETE and CONVINCING
3. Any detail that would reveal the true creature is FORBIDDEN in this field
4. If "disguised_as" is not null, "has_turn" MUST be true — the reveal needs a Turn
5. Set "disguised_as" to null ONLY if the situation does NOT use a disguise

HARD RULES:
1. ONLY the creatures listed in the CREATURES section above exist. Do not add any others — not in the situation, not in the centerpiece, not watching from the shadows. The creature count is final and exact.
2. The quantities are exact.
3. Do not write read-aloud prose. That comes in the next step.
4. The centerpiece MUST have a concrete mechanic (DC, damage, HP, or trigger) and player_exploit.
5. Do NOT invent creatures based on the teaching examples. If the encounter doesn't have a night hag, don't mention one.
6. BANNED ENERGY PATTERNS — applies to ALL output:
The following phrases are all the same cliché. Do not use ANY of them:
- "pulsing/radiating/emanating energy/power/force"
- "flickering/shimmering/crackling aura"
- "glowing with power/dark magic/arcane force"
- "dark/unholy/necromantic/arcane/eldritch energy"
- "deep resonance pulsing with dark intent"
- "magical aura/field/presence"
- "charged with energy/anticipation/dark power"
- "the air vibrates/hums/crackles with energy"

If magic is involved, describe what it DOES, not what it LOOKS LIKE:
- BAD: "A tome emanates a flickering aura of necromantic energy."
- GOOD: "A tome lies open on the pedestal. The pages turn on their own, and each page that turns crumbles to ash. Three pages remain."

- BAD: "The altar radiates dark energy, filling the room with dread."
- GOOD: "The altar is warm to the touch. Frost forms on everything else in the room — walls, floor, your armor. The cold comes from everywhere except the altar."

- BAD: "The air vibrates with unholy energy as the ritual takes shape."
- GOOD: "The shadows in the room are moving wrong — stretching toward the altar instead of away from the light."

Return JSON only:
{
  "place_name": "2-4 words, specific and atmospheric",
  "tone_id": "${tone.id}",
  ${includeNPC ? '"key_npc": "Name, a **creature** with detail, wants to goal.",' : '"key_npc": null,'}
  "situation": "3-5 sentences answering why/what/secret",
  "centerpiece": {
    "description": "What it is",
    "mechanic": "DC/damage/HP/trigger",
    "player_exploit": "Clever thing players can do"
  },
  "has_turn": true,
  "disguised_as": "A limping man in torn traveling clothes, one arm hanging limp. Nothing about him reads as dangerous."
}

CRITICAL: If the situation uses a shapeshifter disguise (oni, hag, wererat, etc.), disguised_as must describe the FALSE appearance. If no disguise is used, set disguised_as to null.`;
}

// ─── CALL 2: SCENE (READ-ALOUD PROSE) ──────────────────────────────────────

/**
 * Build Call 2 prompt: Generate read-aloud prose following tone sentence structure
 *
 * NOTE: The minimalBrief passed here should be built with call1Result for disguise swapping.
 * Use: buildMinimalBrief(monsterBrief, creatureIntelligence, call1Result)
 * This ensures disguised creatures show their false appearance in the read-aloud.
 */
export function buildCall2ScenePrompt(
  call1Result,
  minimalBrief
) {
  // Extract creature list for checklist
  const creatureChecklist = minimalBrief
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, '☐ '))
    .join('\n  ');

  const toneStructure = TONE_SENTENCE_STRUCTURES[call1Result.tone_id];

  // CRITICAL: If disguised_as is present, do NOT pass key_npc to Call 2
  // The key_npc field contains the creature's true appearance ("a **giant oni** with blue skin...")
  // which would leak into the read-aloud. Call 2 only needs the situation and creature brief.
  const call2Npc = call1Result.disguised_as ? null : call1Result.key_npc;

  if (call1Result.disguised_as && call1Result.key_npc) {
    console.log(`[DISGUISE PROTECTION] Hiding key_npc from Call 2 to prevent leak: "${call1Result.key_npc}"`);
  }

  const npcReminder = call2Npc
    ? '\n- Do NOT name NPCs in the read-aloud. Describe them ("a massive serpent," "a hobgoblin in dented armor"). The DM has the NPC name from Call 1.'
    : '';

  return `══════════════════════════════════════════════
CREATURE CHECKLIST — VERIFY BEFORE RESPONDING
══════════════════════════════════════════════
This encounter contains EXACTLY:
  ${creatureChecklist}
This is the COMPLETE list.
- No other creatures exist
- Do not add, summon, spawn, or imply any creature not listed
- Every creature above MUST appear in your response
- The quantities are EXACT — not "several," not "a pack"
══════════════════════════════════════════════

You are writing the opening read-aloud text for a D&D 5e encounter.

You have already written the story structure. Now write the prose that brings it to life.

CONTEXT FROM CALL 1:
Place Name: ${call1Result.place_name}
Tone: ${call1Result.tone_id.toUpperCase().replace('_', ' ')}
${call2Npc ? `Key NPC: "${call2Npc}"` : 'No NPC'}
Situation: "${call1Result.situation}"
Centerpiece: "${call1Result.centerpiece.description}"

CREATURES:
${minimalBrief}

CREATURE DESCRIPTIONS are provided below each creature. These tell you what the creature looks like and how it behaves. Use this as a REFERENCE, not a script.

Your job is to RE-DESCRIBE the creature in the context of THIS encounter's situation. The description says what a remorhaz generally looks like. You write what THIS remorhaz looks like RIGHT NOW — mid-hunt, coiled around its kill, erupting from the ice, whatever the situation calls for.

GOOD (contextual re-description):
- Description says: "A massive, centipede-like creature whose body glows with searing internal heat"
- Situation says the remorhaz is feeding
- You write: "A segmented body the length of a wagon curls around something steaming on the ice, its plates glowing a dull volcanic orange from within."

BAD (copied description):
- "A massive, centipede-like creature glows with searing internal heat nearby."

BAD (ignored description, invented wrong details):
- "A massive serpent with glowing blue eyes lunges from its lair."

The description gives you accuracy. The situation gives you context. Combine them into something specific to THIS moment.

SENTENCE STRUCTURE — Follow this EXACTLY:

${toneStructure.structure}

GLOBAL READ-ALOUD RULES:
- Second person ("you"), present tense
- Do NOT open with "You enter..." or "You step into..." — start with what players NOTICE first
- Mention EVERY creature type with exact quantities (3 goblins = three goblins, not "several" or "a group")
- No game mechanics (DCs, saves, checks, ability names)
- No rhetorical questions, no meta-narration ("you can't help but feel")${npcReminder}
- Use the situation to inform SUBTLE foreshadowing (heat rising from a pit if something burns inside, specters moving jerkily if bound unwillingly)
- Do NOT reveal secrets from the situation. Show what players SEE and SENSE, not what they know.
- 4-6 sentences, 80-150 words total

CREATURE VISIBILITY:
Every creature in the encounter must appear in this read-aloud UNLESS the situation from Call 1 specifies that a creature is hidden, disguised, or dormant. Hidden creatures will be revealed in a later read-aloud moment — but you must still account for every OTHER creature being visible with exact counts.

BANNED ENERGY PATTERNS — applies to ALL output:
The following phrases are all the same cliché. Do not use ANY of them:
- "pulsing/radiating/emanating energy/power/force"
- "flickering/shimmering/crackling aura"
- "glowing with power/dark magic/arcane force"
- "dark/unholy/necromantic/arcane/eldritch energy"
- "deep resonance pulsing with dark intent"
- "magical aura/field/presence"
- "charged with energy/anticipation/dark power"
- "the air vibrates/hums/crackles with energy"

If magic is involved, describe what it DOES, not what it LOOKS LIKE:
- BAD: "A tome emanates a flickering aura of necromantic energy."
- GOOD: "A tome lies open on the pedestal. The pages turn on their own, and each page that turns crumbles to ash. Three pages remain."

- BAD: "The altar radiates dark energy, filling the room with dread."
- GOOD: "The altar is warm to the touch. Frost forms on everything else in the room — walls, floor, your armor. The cold comes from everywhere except the altar."

- BAD: "The air vibrates with unholy energy as the ritual takes shape."
- GOOD: "The shadows in the room are moving wrong — stretching toward the altar instead of away from the light."

The examples above are STYLE references for different creatures. Follow the STRUCTURE and TONE, not the content.

Return JSON only:
{
  "encounter_intro": "80-150 words of read-aloud prose following the sentence structure above"
}`;
}

// ─── CALL 3: DETAILS (MECHANICS) ───────────────────────────────────────────

/**
 * Build tactics guidance - uses creature intelligence if available, falls back to generic
 */
function getTacticsGuidance(encounterProfile, keyNPC, creatureIntelligence) {
  const hasIntelligence = creatureIntelligence
    && Object.keys(creatureIntelligence).length > 0
    && Object.values(creatureIntelligence).some(i => i?.tactical_identity);

  if (hasIntelligence) {
    return buildSpecificTacticsGuidance(creatureIntelligence, keyNPC, encounterProfile);
  }
  return buildGenericTacticsGuidance(encounterProfile, keyNPC);
}

/**
 * Creature-aware tactics guidance
 */
function buildSpecificTacticsGuidance(creatureIntelligence, keyNPC, encounterProfile) {
  const npcLine = keyNPC ? '\n- If the NPC\'s personality affects group behavior, mention it.' : '';
  const squadLine = encounterProfile?.totalCount >= 5
    ? '\n- Describe SQUADS of 2-4 with distinct roles if many creatures. The DM needs to know where ALL of them are.'
    : '';

  return `The creature intelligence data already tells the DM how each creature fights individually. Do NOT restate tactical identities. Focus on what is unique to THIS encounter:
- How does the situation affect their behavior?
- What are they protecting/doing/wanting?
- How do they respond to negotiation vs. attack?${squadLine}${npcLine}`;
}

/**
 * Generic tactics guidance (fallback for homebrew/missing creatures)
 */
function buildGenericTacticsGuidance(encounterProfile, keyNPC) {
  const npcLine = keyNPC
    ? `\n- If the NPC's personality drives group behavior, mention it.`
    : '';

  const squadLine = encounterProfile?.totalCount >= 5
    ? `\n- Describe SQUADS of 2-4 with distinct roles. The DM needs to know where ALL of them are.`
    : '';

  const bannedWords = `\n\nBANNED WORDS: "strategically," "tactically," "effectively," "advantageous," "utilize."`;

  if (encounterProfile?.tacticalLevel === 'MINDLESS') {
    return `- These creatures have NO intelligence. Describe them as moving hazards, not fighters.
- What draws them toward targets? (Noise? Movement? Warmth?)
- What pattern do they follow? (Nearest target? Straight line? Random?)
- Do NOT give them coordination, leaders, flanking, or retreat behavior.${squadLine}${npcLine}${bannedWords}`;
  }

  if (encounterProfile?.tacticalLevel === 'INSTINCTIVE') {
    return `- These creatures act on INSTINCT, not strategy. No leaders, no coordination, no "flanking."
- What triggers their aggression? (Closest? Loudest? Wounded prey?)
- How do they behave as a group without communicating?
- When do they flee or freeze? (Half dead? Fire? Loud noise?)${squadLine}${npcLine}${bannedWords}`;
  }

  if (encounterProfile?.tacticalLevel === 'BASIC') {
    return `- Simple coordination: one group attacks while another flanks, or some hold a line while others shoot
- Who gives orders and what happens when that creature falls?
- What one tactic do they repeat? (Clever players can predict it.)${squadLine}${npcLine}${bannedWords}`;
  }

  // CUNNING
  return `- How do they assess the party and pick targets? (Be specific.)
- What's their plan B if losing? (Negotiate? Flee? Take hostage? Set fire?)
- How do they use the environment? (Break lights, kick furniture, collapse passages.)
- How do they communicate mid-fight? (Signals, shouts, telepathy?)${squadLine}${npcLine}${bannedWords}`;
}

/**
 * Build Call 3 prompt: Generate 3 or 5 DM paragraphs (conditional on has_turn)
 */
export function buildCall3DetailsPrompt(
  call1Result,
  call2Result,
  tacticalBrief,
  location,
  difficultyRating,
  partyDescription,
  encounterProfile,
  creatureIntelligence
) {
  // Extract creature list for checklist
  const creatureChecklist = tacticalBrief
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => {
      const match = line.match(/^-\s+(\d+)×\s+([^(]+)/);
      return match ? `☐ ${match[1]}× ${match[2].trim()}` : line.trim().replace(/^-\s*/, '☐ ');
    })
    .join('\n  ');

  const locationContext = location ? `\nLOCATION: ${location}` : '';
  const difficultyContext = difficultyRating ? `\nDIFFICULTY: ${difficultyRating}` : '';
  const partyContext = partyDescription ? `\nPARTY: ${partyDescription}` : '';
  const npcContext = call1Result.key_npc ? `\nKEY NPC: "${call1Result.key_npc}"` : '';
  const tacticsGuidance = getTacticsGuidance(encounterProfile, call1Result.key_npc, creatureIntelligence);

  const groupFramework = encounterProfile ? GROUP_FRAMEWORKS[encounterProfile.groupType] : '';
  const hasIntelligence = creatureIntelligence
    && Object.keys(creatureIntelligence).length > 0
    && Object.values(creatureIntelligence).some(i => i?.tactical_identity);
  const frameworkBlock = hasIntelligence
    ? groupFramework
    : encounterProfile ? `${TACTICAL_FRAMEWORKS[encounterProfile.tacticalLevel]}\n\n${groupFramework}` : '';

  const hasTurn = call1Result.has_turn;
  const paragraphCount = hasTurn ? 5 : 3;

  // Conditional turn paragraphs (only included if has_turn is true)
  const turnParagraphs = hasTurn ? `

PARAGRAPH 3 — THE TURN (Read-Aloud, 3 sentences exactly, 40-60 words)
The dramatic beat of the encounter — the moment everything changes. This might happen mid-combat, or it might be the moment a non-combat encounter becomes dangerous. Write EXACTLY 3 sentences following this structure:

Sentence 1 — THE TRIGGER. What the players perceive that signals the shift. A sound, a movement, a crack, a word.
Examples:
- "The stone behind the pedestal moves."
- "The ice cracks with a sound like a thunderclap."
- "The chief slams the table."
- "The old woman's smile doesn't change, but her shadow does."

Sentence 2 — THE CHANGE. What the players see happening. The reveal, the collapse, the transformation, the creature emerging.
Examples:
- "What you took for a carving uncurls — a serpent longer than the room is wide, its face disturbingly human."
- "Something massive surges upward through the floor in an explosion of frost and steam, directly beneath your feet."
- "Every goblin in the hall turns to look at you, and not one of them is smiling anymore."
- "Her shadow stretches across the wall, too long, too thin, with fingers that end in points."

Sentence 3 — THE DIALOGUE OR ACTION. A line of speech, a gesture, a sound — the last beat before the DM returns to mechanics.
Examples:
- "Its mouth is already forming words you don't want to hear."
- "The hobgoblin behind you shouts something, and the net falls."
- "'I offered you a deal,' she says. 'You should have taken it.'"
- "It screams — not in pain, but in hunger."

DISGUISE REVEAL:
If a creature was disguised in the opening scene, the Turn MUST be the reveal. The creature's true appearance is in the tactical brief. Describe the transformation — the disguise breaking, skin rippling, form growing, features twisting. Contrast the false form against the true form.

The players saw the disguise in the opening read-aloud. Now they see the truth. Make the moment visceral and physical, not magical hand-waving.

Examples:
- "The traveler's hunched frame straightens — and keeps going. Skin splits along blue-black fault lines as horns push through the muddy hood."
- "The old woman's flour-dusted hands twist — fingers elongating, nails blackening into claws. Her kind eyes go iron-gray and cold."
- "The wiry man's grin widens past where a human mouth should stop. Fur ripples up from his collar, and his teeth are all wrong."

Rules:
- No game mechanics in this paragraph — this is prose for the players to hear
- No creature stat block names — describe what players perceive ("a massive serpent," not "the Spirit Naga")
- Do NOT re-introduce a creature already visible in the opening read-aloud. If the creature was already present, the turn must be a DIFFERENT event.
- Exactly 3 sentences. Trigger, change, punctuation. The DM reads it in 10 seconds.
- Second person, present tense, sensory — same style as the opening read-aloud

CREATURE VISIBILITY RULE:
Every creature in the encounter must be visible to players in EITHER:
- The opening read-aloud (from Call 2), OR
- The Turn read-aloud (paragraph 3 — for hidden, disguised, or dormant creatures)

If a creature is hidden in the opening scene, its reveal MUST appear in the Turn read-aloud. No creature can exist in the encounter without the players seeing it at some point during the read-aloud prose.

BANNED ENERGY PATTERNS:
The following phrases are all the same cliché. Do not use ANY of them:
- "pulsing/radiating/emanating energy/power/force"
- "flickering/shimmering/crackling aura"
- "glowing with power/dark magic/arcane force"
- "dark/unholy/necromantic/arcane/eldritch energy"
- "deep resonance pulsing with dark intent"
- "magical aura/field/presence"
- "charged with energy/anticipation/dark power"
- "the air vibrates/hums/crackles with energy"

Describe what magic DOES, not what it LOOKS like. Describe physical actions only.

PARAGRAPH 4 — THE TURN (DM Notes, 30-50 words, DM-facing paragraph)
The mechanical companion to the read-aloud above. Tell the DM:
- What mechanically changed (new abilities activate, terrain shifts, reinforcements arrive)
- What choice this forces on the players (engage the new threat, prevent the escape, avoid the hazard)
- Any new DCs, damage values, or conditions
` : '';

  return `══════════════════════════════════════════════
CREATURE CHECKLIST — VERIFY BEFORE RESPONDING
══════════════════════════════════════════════
This encounter contains EXACTLY:
  ${creatureChecklist}
This is the COMPLETE list.
- No other creatures exist
- Do not add, summon, spawn, or imply any creature not listed
- Every creature above MUST appear in your response
- The quantities are EXACT — not "several," not "a pack"
══════════════════════════════════════════════

You are writing ${paragraphCount} paragraphs of DM notes for a D&D 5e encounter. The story and read-aloud have already been written.

HARD RULES:
1. ONLY the creatures listed in the CREATURES section below exist. Do not add any others — not in the situation, not in the aftermath, not "watching from the shadows." If Call 1's situation mentions a creature not in the list below, ignore that reference.
2. CREATURE ABILITY RULE: Reference creature abilities by NAME. Do not restate DCs, damage values, save types, or hit bonuses — the DM has the statblock. GOOD: "The naga casts Dominate Person on the strongest martial character." BAD: "The naga casts Dominate Person (DC 14 WIS save or charmed)." ENVIRONMENTAL and CENTERPIECE mechanics ARE fully specified because the encounter invented them.
3. Never use: "strategically," "tactically," "effectively," "advantageous," "utilize."
4. ACTIONABLE DM NOTES (applies to all DM-facing paragraphs): Every sentence must describe something the DM can ACT on. If a sentence doesn't help the DM make a decision, describe a position, name an ability, or state what happens, delete it. BANNED: "tension rises," "grows more aggressive," "becomes desperate," "battlefield dynamic shifts," "creating chaos," "spreading confusion," "overwhelming the party," "forcing the players to adapt," "altering the dynamic," "things grow more intense," "attacks with increased ferocity." Name the specific action instead.
5. STATE EACH FACT ONCE: Do not restate the same concept in different words to fill the word count. If you've stated a fact, move on. Introduce information once, in the sentence where it is most relevant. Treat word counts as CEILINGS, not targets. Shorter is better than redundant.
6. FORMAT FOR SCANNING: DMs read these notes during play. Write short sentences — one fact per sentence.

CONTEXT FROM CALL 1:
Place: ${call1Result.place_name}
Tone: ${call1Result.tone_id.toUpperCase().replace('_', ' ')}
Situation (from Call 1): "${call1Result.situation}"
Centerpiece: "${call1Result.centerpiece.description}"
Centerpiece Mechanic: "${call1Result.centerpiece.mechanic}"
Player Exploit: "${call1Result.centerpiece.player_exploit}"${npcContext}${locationContext}${difficultyContext}${partyContext}

CONTEXT FROM CALL 2:
Read-aloud (already shown): "${call2Result.encounter_intro}"

CREATURES (with tactical data):
${tacticalBrief}

${frameworkBlock ? frameworkBlock : ''}

WRITE EXACTLY ${paragraphCount} PARAGRAPHS (paragraph numbers below are for YOUR reference only — do NOT include them in your output):

PARAGRAPH 1 — THE SITUATION (50-80 words, DM-facing paragraph)
Rewrite the Call 1 situation as a tight DM-facing paragraph. This appears right after the read-aloud. Answer:
- Why are these creatures here? What are they doing?
- What does the NPC want? What will they do if approached non-violently?
- What is the centerpiece ACTUALLY about (the story behind it)?
- What secret does the DM know?

This is NOT tactics. It is story context. "The naga will bargain — it needs two more feeding cycles" not "the naga opens with Dominate Person." The creature intelligence already tells the DM how it fights. This tells the DM WHY it fights.

RETREAT AND SOCIAL IN DM NOTES:
If the creature has a Retreat line in the tactical brief, the situation paragraph MUST include what happens when the creature starts losing. State the trigger ("below half HP," "when allies fall," "if ambush fails") and the method ("flees via Etherealness," "burrows underground," "retreats in formation").

If the creature has a Social line, the situation paragraph MUST include the negotiation option — what the creature wants and what it offers. This is not flavor; it's a decision point the DM needs to run.

If neither is present, state clearly: "Fights to the death. No negotiation." This tells the DM not to improvise a surrender scene.

THE SITUATION IS NOT AN ESSAY:
Do not analyze the encounter's themes, explain symbolism, or comment on why something is interesting. State facts the DM needs.

BANNED PATTERNS:
- "The [object] symbolizes / represents / signifies..."
- "This demonstrates / reveals / showcases how..."
- "Creating perilous conditions that could lead to..."
- "The [creature] embodies / exemplifies..."
- "Unbeknownst to all, [thematic observation]"

INSTEAD, state actionable facts:
- BAD: "The barricade represents Skarn's desperation to reclaim control."
- GOOD: "The barricade has 30 HP and AC 15. Skarn retreats behind it if wounded."

${tacticsGuidance}

PARAGRAPH 2 — THE SPACE (40-70 words, DM-facing paragraph)
Where everything is and how the centerpiece works mechanically:
- Where each creature starts (distances from entrance)
- Centerpiece mechanics from Call 1 (expand if needed: DCs, damage, triggers, dimensions)
- Player exploit from Call 1 (expand if needed)
- Do not redescribe the read-aloud
${turnParagraphs}

PARAGRAPH ${hasTurn ? 5 : 3} — AFTERMATH (30-50 words, DM-facing paragraph)

The creature's Aftermath Seeds in the tactical brief provide raw material. Pick ONE seed and develop it into a reward + hook:

THE REWARD is a physical object with one UNEXPLAINED detail:
- BAD: "A map leading to a forgotten temple of great power."
- GOOD: "The map marks six locations. Three are crossed out. This was the fourth."
- BAD: "An amulet etched with arcane symbols."
- GOOD: "An amulet bearing the seal of the city watch. It's dated last week."

THE HOOK is an UNANSWERED QUESTION, not a destination:
- BAD: "This hints at a larger conspiracy the party must investigate."
- GOOD: "The letter is addressed to someone named Voss. It's unopened."

The Aftermath Seeds contain creature-specific material — objects, mechanics, and world connections. Use them. Do NOT ignore the seeds and invent generic fantasy loot.

POST-COMBAT CREATURE MECHANICS — if the tactical brief mentions Rejuvenation, Etherealness, Phylactery, Change Shape, or vampire coffin mechanics, the aftermath MUST reference it. These are not optional flavor — they ARE the hook. A spirit naga encounter where the aftermath doesn't mention Rejuvenation has missed the point.

Total: ${hasTurn ? '190-310' : '120-200'} words across all ${paragraphCount} paragraphs. HARD CEILING.

Return JSON only:
{
  "dm_notes": [
    "Paragraph 1 content (The Situation)...",
    "Paragraph 2 content (The Space)..."${hasTurn ? `,
    "Paragraph 3 content (The Turn read-aloud — 3 sentences only)...",
    "Paragraph 4 content (The Turn DM notes)...",
    "Paragraph 5 content (Aftermath)..."` : `,
    "Paragraph 3 content (Aftermath)..."`}
  ]
}`;
}

// ─── VALIDATION & PROCESSING ────────────────────────────────────────────────

export function validateCall1Structure(jsonString) {
  try {
    const obj = JSON.parse(jsonString);

    // Basic validation
    const isValid = (
      typeof obj.place_name === 'string' &&
      obj.place_name.length > 0 &&
      typeof obj.tone_id === 'string' &&
      'key_npc' in obj &&
      typeof obj.situation === 'string' &&
      obj.situation.length > 20 &&
      typeof obj.centerpiece === 'object' &&
      typeof obj.centerpiece.description === 'string' &&
      typeof obj.centerpiece.mechanic === 'string' &&
      typeof obj.centerpiece.player_exploit === 'string' &&
      typeof obj.has_turn === 'boolean' &&
      'disguised_as' in obj &&
      (obj.disguised_as === null || (typeof obj.disguised_as === 'string' && obj.disguised_as.length > 20))
    );

    if (!isValid) return false;

    // If disguised_as is not null, has_turn MUST be true
    if (obj.disguised_as !== null && !obj.has_turn) {
      obj.has_turn = true; // Auto-correct
    }

    // CRITICAL: If disguised_as is present, it must NOT contain creature's true appearance words
    if (obj.disguised_as && typeof obj.disguised_as === 'string') {
      const forbidden = ['blue skin', 'horn', 'claw', 'fang', 'withered', 'crone', 'hag', 'fur', 'tail', 'snout', 'oni', 'fiend', 'demon'];
      const lower = obj.disguised_as.toLowerCase();
      for (const word of forbidden) {
        if (lower.includes(word)) {
          console.warn(`Validation failed: disguised_as contains forbidden word "${word}": ${obj.disguised_as}`);
          return false;
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}

export function validateCall2Scene(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return typeof obj.encounter_intro === 'string' && obj.encounter_intro.length > 50;
  } catch {
    return false;
  }
}

export function validateCall3Details(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return (
      Array.isArray(obj.dm_notes) &&
      (obj.dm_notes.length === 3 || obj.dm_notes.length === 5) &&
      obj.dm_notes.every((note) => typeof note === 'string' && note.length > 20)
    );
  } catch {
    return false;
  }
}

// ─── DM NOTES AUTO-BOLD POST-PROCESSOR ─────────────────────────────────────

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extract creature names from monster brief
 * Parses lines like "- 1× Spirit Naga (Medium monstrosity, CR 8)"
 * Returns array of creature names: ['Spirit Naga', 'Shadow']
 */
export function getCreatureNamesFromBrief(monsterBrief) {
  const names = [];
  const lines = monsterBrief.split('\n');

  for (const line of lines) {
    // Match pattern like "- 1× Spirit Naga (Medium monstrosity, CR 8)"
    const match = line.match(/^-\s+\d+×\s+([^(]+)/);
    if (match) {
      names.push(match[1].trim());
    }
  }

  return names;
}

/**
 * Extract NPC name from key_npc field
 * Input: "Nysira, a **mage** with burn scars, wants to extract a memory..."
 * Output: "Nysira"
 */
function extractNpcName(keyNpc) {
  if (!keyNpc || typeof keyNpc !== 'string') return null;

  // Extract everything before the first comma
  const match = keyNpc.match(/^([^,]+)/);
  return match ? match[1].trim() : null;
}

/**
 * Format DM notes text with bold anchors for scannable information
 * Applies markdown **bold** to: creature names, DCs, damage, distances, HP, AC, round triggers
 *
 * @param {string} text - Raw DM notes paragraph
 * @param {Object} options - Formatting options
 * @param {string[]} options.creatureNames - Array of creature type names from encounter
 * @param {string|null} options.npcName - Named NPC from Call 1's key_npc
 * @returns {string} Text with bold markdown applied
 */
export function formatDmNotes(text, { creatureNames = [], npcName = null } = {}) {
  if (!text || typeof text !== 'string') return text;

  // Step 1: Strip existing bold
  let clean = text.replace(/\*\*/g, '');

  // Step 2: Collect spans to bold
  const spans = [];

  function collectFromRegex(regex) {
    let match;
    regex.lastIndex = 0; // Reset regex state
    while ((match = regex.exec(clean)) !== null) {
      spans.push([match.index, match.index + match[0].length]);
    }
  }

  // Creature names (case-insensitive, with optional plural "s")
  for (const name of creatureNames) {
    collectFromRegex(new RegExp(`\\b${escapeRegex(name)}s?\\b`, 'gi'));
  }

  // NPC name (case-sensitive)
  if (npcName) {
    collectFromRegex(new RegExp(`\\b${escapeRegex(npcName)}\\b`, 'g'));
  }

  // DC patterns
  const abilityWords = [
    'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA',
    'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma',
    'Arcana', 'Religion', 'Athletics', 'Acrobatics', 'Perception', 'Stealth',
    'Investigation', 'Nature', 'Survival', 'Medicine', 'Insight', 'Persuasion',
    'Deception', 'Intimidation', 'Performance'
  ].join('|');
  collectFromRegex(new RegExp(`\\bDC\\s+\\d+(?:\\s+(?:${abilityWords}))?\\b`, 'gi'));

  // Dice damage
  const damageTypes = [
    'cold', 'fire', 'lightning', 'thunder', 'acid', 'poison',
    'necrotic', 'radiant', 'force', 'psychic',
    'bludgeoning', 'piercing', 'slashing'
  ].join('|');
  collectFromRegex(new RegExp(`\\b\\d+d\\d+(?:\\s+(?:${damageTypes}))?(?:\\s+damage)?\\b`, 'gi'));

  // Flat damage (number + damage type + "damage")
  collectFromRegex(new RegExp(`\\b\\d+\\s+(?:${damageTypes})\\s+damage\\b`, 'gi'));

  // Distances
  collectFromRegex(/\b\d+[\s-](?:feet|foot|ft\.?)(?:[\s-]?(?:radius|diameter|square|wide|long|tall|deep|away|apart))?\b/gi);

  // HP
  collectFromRegex(/\b\d+\s*HP\b/gi);

  // AC
  collectFromRegex(/\bAC\s*\d+\b/gi);

  // Round triggers
  const writtenNumbers = 'one|two|three|four|five|six|seven|eight|nine|ten';
  const ordinals = 'first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth';

  collectFromRegex(/\bround\s+\d+\b/gi);
  collectFromRegex(new RegExp(`\\bround\\s+(?:${writtenNumbers})\\b`, 'gi'));
  collectFromRegex(new RegExp(`\\b(?:${writtenNumbers})\\s+rounds?\\b`, 'gi'));
  collectFromRegex(/\b\d+\s+rounds?\b/gi);
  collectFromRegex(new RegExp(`\\b(?:${ordinals})\\s+rounds?\\b`, 'gi'));
  collectFromRegex(new RegExp(`\\bevery\\s+(?:${ordinals}|other)\\s+rounds?\\b`, 'gi'));

  // Step 3: Merge overlapping spans
  if (spans.length === 0) return clean;

  spans.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const merged = [];
  for (const span of spans) {
    if (merged.length === 0 || span[0] > merged[merged.length - 1][1]) {
      merged.push([span[0], span[1]]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], span[1]);
    }
  }

  // Step 4: Apply bold markers (work backwards)
  let result = clean;
  for (let i = merged.length - 1; i >= 0; i--) {
    const [start, end] = merged[i];
    const boldedText = result.slice(start, end);
    // Skip if the match is only whitespace or punctuation
    if (!/\w/.test(boldedText)) continue;
    result = result.slice(0, start) + '**' + boldedText + '**' + result.slice(end);
  }

  return result;
}

/**
 * Combine Call 1 + Call 2 + Call 3 into final encounter output
 * Applies auto-bold formatting to DM notes paragraphs
 *
 * dm_notes structure (conditional on has_turn):
 *
 * When has_turn = true (5 elements):
 * [0] = The Situation (paragraph)
 * [1] = The Space (paragraph)
 * [2] = The Turn read-aloud (read_aloud) - NOT bolded
 * [3] = The Turn DM notes (paragraph)
 * [4] = Aftermath (paragraph)
 *
 * When has_turn = false (3 elements):
 * [0] = The Situation (paragraph)
 * [1] = The Space (paragraph)
 * [2] = Aftermath (paragraph)
 *
 * @param {Object} call1Data - Result from Call 1 (structure)
 * @param {Object} call2Data - Result from Call 2 (scene)
 * @param {Object} call3Data - Result from Call 3 (details)
 * @param {string} monsterBrief - Monster brief string to extract creature names
 * @returns {Object} Final encounter output with formatted contentArray
 */
export function processEncounterResponse(call1Data, call2Data, call3Data, monsterBrief = '') {
  const hasTurn = call3Data.dm_notes.length === 5;

  // Extract creature names and NPC name for auto-bold formatting
  const creatureNames = getCreatureNamesFromBrief(monsterBrief);
  const npcName = extractNpcName(call1Data.key_npc);

  // Apply auto-bold formatting to DM notes (but not the Turn read-aloud)
  const formattedDmNotes = call3Data.dm_notes.map((note, index) => {
    // Skip the Turn read-aloud (index 2 when length is 5) - it's player-facing
    const shouldFormat = !(hasTurn && index === 2);
    return shouldFormat ? formatDmNotes(note, { creatureNames, npcName }) : note;
  });

  return {
    place_name: call1Data.place_name,
    centerpiece: call1Data.centerpiece.description,
    key_npc: call1Data.key_npc,
    contentArray: [
      { format: 'read_aloud', content: call2Data.encounter_intro },
      ...formattedDmNotes.map((note, index) => ({
        // When has_turn is true, index 2 is the Turn read-aloud
        // When has_turn is false, all are paragraphs
        format: (hasTurn && index === 2) ? 'read_aloud' : 'paragraph',
        content: note
      })),
    ]
  };
}

/**
 * Parse **bold** markup into segments for safe template rendering (no v-html)
 */
export function parseInlineMarkup(text) {
  const segments = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }

  return segments;
}
