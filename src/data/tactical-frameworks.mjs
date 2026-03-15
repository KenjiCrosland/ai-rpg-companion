export const TACTICAL_FRAMEWORKS = {
  MINDLESS: `TACTICAL FRAMEWORK: MINDLESS
These creatures have no intelligence or self-preservation. They don't use tactics — they are OBSTACLES. Describe them as environmental hazards that happen to move:
- How do they move as a group? (Toward noise? Toward warmth? In a patrol pattern? Randomly?)
- What triggers them? (Proximity? Sound? Light? Movement?)
- What happens when one is destroyed? (Others ignore it? They swarm the attacker? They scatter?)
- Do they block paths, create chokepoints, or herd players toward the centerpiece?
Do NOT give them coordinated tactics, target priority, or self-preservation instincts. They don't "target spellcasters" or "flank." They shamble, swarm, or patrol.`,

  INSTINCTIVE: `TACTICAL FRAMEWORK: INSTINCTIVE
These creatures fight on instinct — territorial, predatory, or defensive. They don't coordinate verbally, but they DO have survival instincts:
- Pack behavior: do they surround prey, take turns attacking, or all pile on the weakest?
- Flight threshold: when do they run? (Half the pack dead? Leader dead? Loud noise? Fire?)
- Territorial triggers: what provokes them? (Approaching the nest? Touching their food? Eye contact?)
- Hunting patterns: do they ambush, chase, circle, or bull-rush?
They act on instinct, not strategy. They don't "target spellcasters" — they target whatever their animal brain tells them to (closest, loudest, smallest, wounded).`,

  BASIC: `TACTICAL FRAMEWORK: BASIC
These creatures have basic intelligence — they can follow orders, use simple tactics, and adapt when things go wrong. But they're not brilliant:
- Simple coordination: one group attacks while another flanks, or some hold a line while others shoot
- Self-preservation: they take cover when hurt, retreat when outnumbered, call for help
- Leader dependence: if a leader is present, they follow orders. If the leader falls, they may panic, scatter, or fight recklessly
- Exploitable patterns: they favor one tactic and repeat it. Clever players can predict and counter.`,

  CUNNING: `TACTICAL FRAMEWORK: CUNNING
These creatures are intelligent and dangerous. They adapt, set traps, and exploit weaknesses:
- They assess the party and prioritize targets based on actual threat (not just "the spellcaster")
- They use the environment: kick over tables for cover, break light sources, collapse passages
- They have a plan B: if losing, they negotiate, flee with valuables, set the building on fire, or take a hostage
- They communicate mid-fight: calling out warnings, coordinating focus fire, signaling retreat
- They may have prepared the battlefield in advance: traps, ambush positions, pre-staged escape routes`
};

export const GROUP_FRAMEWORKS = {
  SOLO: `GROUP DYNAMIC: SOLO
This is a single creature. All drama comes from:
- Its PHYSICALITY: how it uses its body, how the room reacts to its size and movement
- The ENVIRONMENT: terrain features it can exploit or that threaten it
- Its PERSONALITY (if intelligent): arrogance, desperation, curiosity, territorial rage
- The CENTERPIECE: the one unusual element that creates decisions
A solo creature should feel like a FORCE — describe what it looks like when it moves, how the space reacts to it.`,

  PACK: `GROUP DYNAMIC: PACK
All creatures are the same type. Differentiate them through POSITION and ROLE, not personality:
- Front group vs back group, high ground vs low ground
- First wave vs reserves
- Which ones are near the centerpiece, which ones are between it and the party
- If there are 5+, use SQUADS: groups of 2-4 with distinct roles (e.g. "three operate the catapult, four provide covering fire, three guard the tunnel")`,

  LED: `GROUP DYNAMIC: LED
One creature is clearly the leader. The encounter's personality comes from the leader; the followers are extensions of the leader's will:
- What does the leader ORDER the followers to do? (Specific commands, not "attack")
- How do followers react when the leader is threatened? (Rally? Panic? Sacrifice themselves?)
- Does the leader fight alongside followers or direct from safety?
- What happens when the leader drops? (Followers scatter? Fight harder? Surrender?)`,

  MIXED: `GROUP DYNAMIC: MIXED
Multiple creature types with roughly equal agency. Each type should fight DIFFERENTLY based on its nature:
- What is each type's natural fighting style?
- How do the types interact? (Do they coordinate? Ignore each other? Get in each other's way?)
- Is there tension between types? (An uneasy alliance, a forced partnership, mutual distrust?)
- Each type should have a distinct role the DM can track`
};
