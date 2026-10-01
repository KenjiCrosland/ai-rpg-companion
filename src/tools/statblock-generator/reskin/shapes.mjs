/**
 * THE SHAPE CATALOG (owner design arc, 2026-08-18; per-band templates per
 * owner call: "for each shape one template per band"). Mechanical grammars
 * with ONE explicit template per CR band the shape spans — because print's
 * own forms grow CLAUSES across tiers, not just dice (Dreadful Glare CR 3
 * is Frightened-only; the Mummy Lord's CR 15 version adds damage and
 * Paralyzed). Each band entry is individually owner-tunable.
 *
 * Bands (corpus-verified seams): 0-2 | 3-5 | 6-9 | 10-12 | 13-20 | 21+.
 * Numbers still come from the card at fill time ({dc} {avg} {dice} {atk});
 * distances written literally are print constants for that band. Measured
 * shapes cite their printed rung(s); inventions carry invented: true.
 * `replaces` names the chassis row the shape swaps in for, budget-neutral.
 */

export const BANDS = ['0-2', '3-5', '6-9', '10-12', '13-20', '21+'];
export function bandFor(cr) {
  return cr <= 2 ? '0-2' : cr <= 5 ? '3-5' : cr <= 9 ? '6-9' : cr <= 12 ? '10-12' : cr <= 20 ? '13-20' : '21+';
}

export const SHAPES = [
  {
    id: 'trample', name: 'Trample', cite: 'Centaur Trooper/Trampling Charge (CR 2)',
    roles: ['skirmisher', 'brute'], styles: ['mounted'], cr_range: [2, 30], replaces: 'nova', gate: 'Recharge 5-6',
    frames: {
      '0-2': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition.',
      '3-5': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition.',
      '6-9': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.',
      '10-12': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage, and the target is pushed 5 feet straight away.',
      '13-20': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.',
      '21+': 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC {dc}. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition and can\'t take Reactions until the start of its next turn. *Success:* Half damage.',
    },
  },
  {
    id: 'leap', name: 'Crushing Leap', cite: 'Bulette/Deadly Leap (CR 5)',
    roles: ['skirmisher', 'brute', 'lurker'], styles: [], cr_range: [3, 12], replaces: 'nova', // lurker joined + style gate dropped: the pounce is the Tiger's shape (the canopy leopard, critic 2026-09-22)
    frames: {
      '3-5': 'The creature spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. *Dexterity Saving Throw*: DC {dc}, each creature in the destination space. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage, and the target is pushed 5 feet straight away.',
      '6-9': 'The creature spends 5 feet of movement to jump to a space within 20 feet that contains one or more Large or smaller creatures. *Dexterity Saving Throw*: DC {dc}, each creature in the destination space. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage, and the target is pushed 5 feet straight away.',
      '10-12': 'The creature spends 5 feet of movement to jump to a space within 30 feet that contains one or more Huge or smaller creatures. *Dexterity Saving Throw*: DC {dc}, each creature in the destination space. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage, and the target is pushed 5 feet straight away.',
    },
  },
  {
    id: 'thrown-burst', name: 'Hurled Burst', cite: 'Giant Ape/Boulder Toss (CR 7); Storm Giant/Lightning Storm (CR 13)',
    roles: ['skirmisher', 'artillery', 'brute'], styles: ['hurler'], cr_range: [6, 30], replaces: 'nova', gate: 'Recharge 5-6',
    frames: {
      '6-9': 'The creature hurls {projectile} at a point it can see within 90 feet. *Dexterity Saving Throw*: DC {dc}, each creature in a 5-foot-radius Sphere centered on that point. *Failure:* {avg} ({dice}) {damage_type} damage. If the target is Large or smaller, it has the Prone condition. *Success:* Half damage.',
      '10-12': 'The creature hurls {projectile} at a point it can see within 120 feet. *Dexterity Saving Throw*: DC {dc}, each creature in a 10-foot-radius Sphere centered on that point. *Failure:* {avg} ({dice}) {damage_type} damage. If the target is Large or smaller, it has the Prone condition. *Success:* Half damage.',
      '13-20': 'The creature hurls {projectile} at a point it can see within 300 feet. *Dexterity Saving Throw*: DC {dc}, each creature in a 10-foot-radius Sphere centered on that point. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '21+': 'The creature hurls {projectile} at a point it can see within 500 feet. *Dexterity Saving Throw*: DC {dc}, each creature in a 15-foot-radius Sphere centered on that point. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.',
    },
  },
  {
    id: 'gaze-single', name: 'Dread Gaze', cite: 'Mummy/Dreadful Glare (CR 3); Mummy Lord/Dreadful Glare (CR 15); Solar/Blinding Gaze (CR 21)',
    roles: ['skirmisher', 'controller', 'lurker'], styles: ['skulker'], cr_range: [2, 30], replaces: 'signature',
    frames: {
      '0-2': '*Wisdom Saving Throw*: DC {dc}, one creature the creature can see within 30 feet. *Failure:* The target has the Frightened condition until the end of the creature\'s next turn.',
      '3-5': '*Wisdom Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* The target has the Frightened condition until the end of the creature\'s next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.',
      '6-9': '*Wisdom Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* The target has the {condition_minor} condition until the end of the creature\'s next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.',
      '10-12': '*Wisdom Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the {condition_minor} condition until the end of the creature\'s next turn.',
      '13-20': '*Wisdom Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Paralyzed condition until the end of the creature\'s next turn.',
      '21+': '*Constitution Saving Throw*: DC {dc}, one creature the creature can see within 120 feet. *Failure:* The target has the Blinded condition for 1 minute. *Failure or Success:* The creature can\'t use this gaze again until the start of its next turn.',
    },
  },
  {
    id: 'snare', name: 'Binding Snare', cite: 'Giant Spider/Web (CR 1); Ettercap/Web Strand (CR 2); Erinyes/Entangling Rope (CR 12)',
    roles: ['skirmisher', 'controller'], styles: ['skulker', 'hurler'], cr_range: [1, 23], replaces: 'signature', gate: 'Recharge 5-6',
    frames: {
      '0-2': '*Dexterity Saving Throw*: DC {dc}, one Large or smaller creature the creature can see within 30 feet. *Failure:* The target has the Restrained condition until the {restraint} is destroyed (AC 10; HP 5; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
      '3-5': '*Dexterity Saving Throw*: DC {dc}, one Large or smaller creature the creature can see within 60 feet. *Failure:* The target has the Restrained condition until the {restraint} is destroyed (AC 10; HP 10; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
      '6-9': '*Dexterity Saving Throw*: DC {dc}, one Huge or smaller creature the creature can see within 60 feet. *Failure:* The target has the Restrained condition until the {restraint} is destroyed (AC 12; HP 15; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
      '10-12': '*Strength Saving Throw*: DC {dc}, one creature the creature can see within 120 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Restrained condition until the {restraint} is destroyed (AC 15; HP 20; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
      '13-20': '*Strength Saving Throw*: DC {dc}, one creature the creature can see within 120 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Restrained condition until the {restraint} is destroyed (AC 15; HP 20; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
      '21+': '*Strength Saving Throw*: DC {dc}, one creature the creature can see within 120 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Restrained condition until the {restraint} is destroyed (AC 18; HP 30; Vulnerability to {r_vuln} damage; Immunity to Poison and Psychic damage).',
    },
  },
  {
    id: 'reel', name: 'Reel', cite: 'Merrow/Harpoon (CR 2); Ettercap/Reel (CR 2); Shambling Mound/Charged Tendril (CR 5)',
    roles: ['skirmisher', 'controller'], styles: ['hurler', 'skulker'], cr_range: [2, 19], replaces: 'signature',
    frames: {
      '0-2': '*Strength Saving Throw*: DC {dc}, one Medium or smaller creature within 30 feet. *Failure:* The target is pulled up to 15 feet straight toward the creature.',
      '3-5': '*Strength Saving Throw*: DC {dc}, one Medium or smaller creature within 30 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target is pulled up to 15 feet straight toward the creature.',
      '6-9': '*Strength Saving Throw*: DC {dc}, one Large or smaller creature within 30 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target is pulled up to 20 feet straight toward the creature.',
      '10-12': '*Strength Saving Throw*: DC {dc}, one Large or smaller creature within 60 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target is pulled up to 25 feet straight toward the creature.',
      '13-20': '*Strength Saving Throw*: DC {dc}, one Huge or smaller creature within 60 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target is pulled up to 25 feet straight toward the creature, and it has the Prone condition.',
    },
  },
  {
    id: 'condition-payoff', name: 'Merciless Strike', composing: true, // the shape's print-register name — "Condition Payoff" is a design term and reached a page (fresh ten, 2026-09-22)
    cite: 'Sea Hag/Death Glare (Frightened, CR 2); Gorgon/Trample (Prone, CR 5); Succubus/Draining Kiss (Charmed, CR 4); Glabrezu/Pummel (Grappled, CR 9)',
    roles: ['skirmisher', 'controller', 'lurker', 'brute'], styles: [], cr_range: [2, 23], replaces: 'signature',
    frames: {
      '0-2': '*{save_stat} Saving Throw*: DC {dc}, one creature within 30 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage. *Success:* Half damage.',
      '3-5': '*{save_stat} Saving Throw*: DC {dc}, one creature within 30 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage. *Success:* Half damage.',
      '6-9': '*{save_stat} Saving Throw*: DC {dc}, one creature within 30 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage. *Success:* Half damage.',
      '10-12': '*{save_stat} Saving Throw*: DC {dc}, one creature within 60 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage.',
      '13-20': '*{save_stat} Saving Throw*: DC {dc}, one creature within 60 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage.',
      '21+': '*{save_stat} Saving Throw*: DC {dc}, one creature within 60 feet that has the {consumed_condition} condition. *Failure:* {avg_x2} ({dice_x2}) {damage_type} damage, and the target has the Stunned condition until the end of its next turn. *Success:* Half damage.',
    },
  },
  {
    id: 'rampage', name: 'Rampage', cite: 'Gnoll Warrior/Rampage (CR 1/2); Giant Hyena/Rampage (CR 1)',
    roles: ['skirmisher', 'brute'], styles: ['mounted', 'skulker'], cr_range: [1, 12], replaces: 'bonus-alt', gate: '1/Day',
    frames: {
      '0-2': 'Immediately after dealing damage to a creature that is already Bloodied, the creature moves up to half its Speed, and it makes one {melee_name} attack.',
      '3-5': 'Immediately after dealing damage to a creature that is already Bloodied, the creature moves up to half its Speed, and it makes one {melee_name} attack.',
      '6-9': 'Immediately after dealing damage to a creature that is already Bloodied, the creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one {melee_name} attack.',
      '10-12': 'Immediately after dealing damage to a creature that is already Bloodied, the creature moves up to its Speed without provoking Opportunity Attacks, and it makes one {melee_name} attack.',
    },
  },
  {
    id: 'blink', name: 'Blink Step', cite: 'Blink Dog/Teleport (40 ft, CR 1/4); Marilith/Teleport (120 ft, CR 16); Solar/Radiant Teleport (CR 21)',
    roles: ['skirmisher', 'lurker'], styles: ['skulker'], cr_range: [0.25, 30], replaces: 'bonus-alt', gate: 'Recharge 4-6',
    frames: {
      '0-2': 'The creature teleports up to 40 feet to an unoccupied space it can see.',
      '3-5': 'The creature teleports up to 40 feet to an unoccupied space it can see.',
      '6-9': 'The creature teleports up to 60 feet to an unoccupied space it can see.',
      '10-12': 'The creature teleports up to 60 feet to an unoccupied space it can see.',
      '13-20': 'The creature teleports up to 120 feet to an unoccupied space it can see.',
      '21+': 'The creature teleports up to 60 feet to an unoccupied space it can see. *Dexterity Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature at its destination space. *Failure:* {avg_half} ({dice_half}) {damage_type} damage.',
    },
  },
  {
    id: 'zone', name: 'Sustained Zone', cite: 'Darkmantle/Darkness Aura (CR 1/2); Djinni/Create Whirlwind (CR 11); Harpy/Luring Song (CR 1)',
    roles: ['controller'], styles: ['skulker'], cr_range: [0.5, 12], replaces: 'signature', gate: '1/Day',
    frames: {
      '0-2': 'The creature creates {zone_effect} in a 15-foot Emanation originating from itself. The effect lasts while the creature maintains Concentration on it, up to 10 minutes. {zone_rule}',
      '3-5': 'The creature creates {zone_effect} in a 15-foot Emanation originating from itself. The effect lasts while the creature maintains Concentration on it, up to 10 minutes. {zone_rule}',
      '6-9': 'The creature creates {zone_effect} in a 20-foot Emanation originating from itself. The effect lasts while the creature maintains Concentration on it, up to 10 minutes. {zone_rule}',
      '10-12': 'The creature creates {zone_effect} filling a 20-foot-radius, 60-foot-high Cylinder centered on a point it can see within 120 feet. The effect lasts while the creature maintains Concentration on it, up to 10 minutes. As a Bonus Action, the creature can move the zone up to 20 feet. {zone_rule}',
    },
  },
  {
    id: 'execute', name: 'Threshold Execute', cite: 'Sea Hag/Death Glare (CR 2, <=20 -> 0 HP); Incubus/Nightmare (CR 4, <=20 -> Unconscious); Solar/Slaying Bow (CR 21, <=100 -> dies)',
    roles: ['lurker', 'controller'], styles: ['skulker'], cr_range: [2, 30], replaces: 'signature', gate: '1/Day',
    frames: {
      '0-2': '*{save_stat} Saving Throw*: DC {dc}, one Frightened creature the creature can see within 30 feet. *Failure:* If the target has 20 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
      '3-5': '*{save_stat} Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* If the target has 20 Hit Points or fewer, it has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
      '6-9': '*{save_stat} Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* If the target has 30 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
      '10-12': '*{save_stat} Saving Throw*: DC {dc}, one creature the creature can see within 60 feet. *Failure:* If the target has 50 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
      '13-20': '*{save_stat} Saving Throw*: DC {dc}, one creature the creature can see within 90 feet. *Failure:* If the target has 75 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
      '21+': '*{save_stat} Saving Throw*: DC {dc}, one creature the creature can see within 120 feet. *Failure:* If the target has 100 Hit Points or fewer, it dies. Otherwise, it takes {avg} ({dice}) {damage_type} damage.',
    },
  },
  {
    id: 'affliction', name: 'Lingering Wound', cite: 'Bearded Devil/Infernal Glaive (CR 3); Horned Devil/Infernal Tail (CR 11)', requires_row: /(?:Slashing|Piercing) damage/, // a wound that bleeds needs an edge (a bandaged concussion on a Slam, critic 2026-09-30)
    roles: ['skirmisher', 'brute', 'lurker'], styles: [], cr_range: [3, 12], replaces: 'melee-rider',
    frames: {
      '3-5': 'If the target is a creature and doesn\'t already have a {wound_noun}, it is subjected to the following effect. *Constitution Saving Throw*: DC {dc}. *Failure:* The target receives a {wound_noun}. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC {dc} Wisdom (Medicine) check.',
      '6-9': 'If the target is a creature and doesn\'t already have a {wound_noun}, it is subjected to the following effect. *Constitution Saving Throw*: DC {dc}. *Failure:* The target receives a {wound_noun}. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC {dc} Wisdom (Medicine) check.',
      '10-12': 'If the target is a creature and doesn\'t already have a {wound_noun}, it is subjected to the following effect. *Constitution Saving Throw*: DC {dc}. *Failure:* The target receives a {wound_noun}. While wounded, the target loses 10 (3d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC {dc} Wisdom (Medicine) check.',
    },
  },
  // THE FIRST TEMPLATE-BACKLOG PASS (2026-09-21): the template signature's
  // miss log asked for these on 6 of its first 17 blocks. Both are print-
  // exact trait grammars; neither depends on the CR band.
  {
    id: 'heated-body', name: 'Heated Body', cite: 'Remorhaz/Heated Body (CR 11); Fire Elemental/Fire Form (CR 5); Azer (CR 2)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait', deny_types: ['Humanoid'],
    // contact damage is a print CONSTANT by band, not a budget fraction: Azer 5 (1d10) at CR 2, Fire Elemental 5 (1d10) at CR 5, Remorhaz 10 (3d6) at CR 11, Balor 10 (3d6) at CR 19 — a nuisance, not an attack (critic, four runs)
    frames: { '0-2': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 3 (1d6) {damage_type} damage.', '3-5': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 5 (1d10) {damage_type} damage.', '6-9': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 7 (2d6) {damage_type} damage.', '10-12': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 10 (3d6) {damage_type} damage.', '13-20': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 10 (3d6) {damage_type} damage.', '21+': 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 14 (4d6) {damage_type} damage.' },
  },
  {
    id: 'false-appearance', name: 'False Appearance', cite: 'Mimic/False Appearance (CR 2); Gargoyle/False Appearance (CR 2); Animated Armor (CR 1)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'While the creature remains motionless, it is indistinguishable from {disguise}.'])),
  },
  {
    id: 'absorption', name: 'Absorption', cite: 'Iron Golem/Fire Absorption (CR 16); Flesh Golem/Lightning Absorption (CR 5); Clay Golem/Acid Absorption (CR 9)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Whenever the creature is subjected to {damage_type} damage, it takes no damage and instead regains a number of Hit Points equal to the {damage_type} damage dealt.'])),
  },
  // BACKLOG PASS TWO (2026-09-21, from scripts/smoke-misses.mjs): the bell
  // hermit's wound-rung peal (on_being_hit emanation, asked 3/3) and the
  // "my shell is my armor" trait (asked 2x). Print has no exact wound-
  // triggered emanation — Death Burst's shape on the Bloodied trigger is the
  // nearest honest kin, so it is marked invented; Shell Defense is Tortle.
  {
    id: 'bloodied-burst', name: 'Bloodied Burst', invented: true, // Death Burst's shape (Magmin, Balor) on the 2024 Bloodied trigger — no printed peer
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: {
      '0-2': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn.',
      '3-5': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn.',
      '6-9': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.',
      '10-12': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 20-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.',
      '13-20': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.',
      '21+': 'The first time the creature is Bloodied in a fight, it releases a burst. *Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.',
    },
  },
  {
    id: 'shell-withdraw', name: 'Shell Defense', cite: 'Tortle/Shell Defense (Monsters of the Multiverse)',
    roles: ['brute', 'defender', 'lurker'], styles: [], cr_range: [0, 30], replaces: 'bonus-alt',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature withdraws into {shell}. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can\'t increase, it has Disadvantage on Dexterity saving throws, it can\'t take Reactions, and the only action it can take is a Bonus Action to emerge.'])),
  },
  // BACKLOG PASS THREE (2026-09-21, the keys-and-templates pass): four cards
  // the miss log and the critic's v2 read asked for by name.
  {
    id: 'resonant-body', name: 'Resonant Body', invented: true, // Heated Body's shape (Remorhaz) with Thunder + Deafened; asked by the bell hermit 3/3
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: { '0-2': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 3 (1d6) Thunder damage and has the Deafened condition until the end of its next turn.', '3-5': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.', '6-9': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.', '10-12': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.', '13-20': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.', '21+': 'A creature that hits the creature with a melee attack while within 5 feet of it takes 14 (4d6) Thunder damage and has the Deafened condition until the end of its next turn.' },
  },
  {
    id: 'throw-retrieve', name: 'Hurled Weapon', invented: true, requires_row: /Ranged Attack Roll|hurls|throws|returns to/i, // something to throw: a thrown, ranged or returning row (the charger's lance) // a body with nothing to throw never draws it (the gong's Discordant Toll, critic 2026-09-29)
    supersedes: /returns to (?:its|the creature's|the \w+'s) hand|Hit or Miss/i, // one lance, one physics: the chassis's returning throw leaves when this ships // the critic's v2 pick from the free-text side: hurl the weapon, Speed halved until it is recovered
    roles: ['skirmisher', 'brute', 'defender'], styles: [], cr_range: [1, 30], replaces: 'signature',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature hurls {projectile}. *Ranged Attack Roll:* {atk}, range 30/120 ft. {avg} ({dice}) {damage_type} damage. The weapon lands in an unoccupied space within 5 feet of the target; until the creature spends 5 feet of movement in that space to recover it, the creature\'s Speed is halved and it can\'t use this action.'])),
  },
  {
    id: 'seal', name: 'Sealing Touch', invented: true, // "sermons seal": a save that stops healing (2014 kin: Wight/Vampire life drain; 2024 kin: the Chasme's drone) — the preacher's verb, asked twice
    roles: ['controller', 'artillery', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'signature',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*{save_stat} Saving Throw*: DC {dc}, one creature within 30 feet. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target can\'t regain Hit Points until the end of the creature\'s next turn.'])),
  },
  {
    id: 'adhesive', name: 'Adhesive', cite: 'Mimic/Adhesive (CR 2)',
    roles: ['brute', 'lurker', 'skirmisher', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature adheres to anything that touches it. A Huge or smaller creature adhered to the creature is also Grappled by it (escape DC {dc}). Ability checks made to escape this grapple have Disadvantage.'])),
  },
  // THE TRAIT SHELF PASS (2026-09-27, from scripts/smoke-misses.mjs): traits
  // were two thirds of every miss (62 of 94) and the always-on shelf held
  // nothing that MOVES — always/movement missed 11 times, and a "knows where
  // its quarry is" idea missed seven times across the movement and condition
  // tags (the jurist's tether, the keeper's lit bolt, the ashwalker's brand).
  // Three print-exact grammars and one flagged invention. None carry numbers,
  // so none climb the ladder; a trait that grants a mode reads the header.
  {
    id: 'spider-climb', name: 'Spider Climb', cite: 'Drider/Spider Climb (CR 6); Roper (CR 5); Vampire (CR 13); Black Pudding (CR 4); Giant Spider (CR 1)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait', requires_movement: 'Climb', // print pairs the trait with a Climb Speed every time (the Swarm's "if the swarm has a Climb Speed")
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature can climb difficult surfaces, including along ceilings, without needing to make an ability check.'])),
  },
  {
    id: 'terrain-walk', name: 'Sure Footing', cite: 'Adult White Dragon/Ice Walk (CR 13); White Dragon Wyrmling (CR 2); Drider/Web Walker (CR 6) — the Ice Walk grammar with the terrain as the slot',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Difficult Terrain composed of {terrain} doesn\'t cost the creature extra movement, and the creature can move across {terrain} without needing to make an ability check.'])),
  },
  {
    id: 'aberrant-ground', name: 'Aberrant Ground', cite: 'Gibbering Mouther/Aberrant Ground (CR 2)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The ground in a 10-foot Emanation originating from the creature is Difficult Terrain.'])),
  },
  {
    id: 'faultless-tracker', name: 'Faultless Tracker', invented: true, // Invisible Stalker/Faultless Tracker (2014 SRD: a quarry named by its summoner) with the quarry earned by a wound; Drider's Web Walker "knows the location" is the 2024 kin
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.'])),
  },
  {
    id: 'web-walker', name: 'Web Walker', cite: 'Drider/Web Walker (CR 6); Ettercap/Web Walker (CR 2) — the 2024 text folds 2014\'s Web Sense into it', // the rafter widow's "knows every thread of its web" (critic, trait-shelf run 2026-09-27)
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature ignores movement restrictions caused by webs, and the creature knows the location of any other creature in contact with the same web.'])),
  },
  // THE FOURTEEN (owner go 2026-09-28): print's whole recurring trait
  // vocabulary the shelf lacked (eight families, measured over the 329-block
  // corpus: 144 text families, 39 recurring, the rest chassis/header/lore) plus
  // six inventions the miss log asked for by cluster, each with a print kin and
  // print grammar only. Numbers are band constants from print, never budget.
  {
    id: 'fire-aura', name: 'Searing Aura', cite: 'Azer Sentinel/Fire Aura (CR 2, 5 ft 1d10); Fire Elemental (CR 5, 1d10); Remorhaz/Heat Aura (CR 11, 3d10); Balor (CR 19, 3d8)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait', deny_types: ['Humanoid'],
    frames: { '0-2': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 5 (1d10) {damage_type} damage.', '3-5': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 5 (1d10) {damage_type} damage.', '6-9': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 7 (2d6) {damage_type} damage.', '10-12': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 10 (3d6) {damage_type} damage.', '13-20': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 13 (3d8) {damage_type} damage.', '21+': 'At the end of each of the creature\'s turns, each creature in a 5-foot Emanation originating from the creature takes 16 (3d10) {damage_type} damage.' },
  },
  {
    id: 'noxious-aura', name: 'Noxious Aura', cite: 'Ghast/Stench (CR 2, 5 ft); Hezrou/Stench (CR 8, 10 ft); Pit Fiend/Fear Aura (CR 20, 20 ft); Sea Hag/Vile Appearance (CR 2)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait', deny_types: ['Humanoid'],
    frames: { '0-2': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 5-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.', '3-5': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 5-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.', '6-9': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 10-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.', '10-12': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 10-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.', '13-20': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 20-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.', '21+': '*{save_stat} Saving Throw*: DC {dc}, any creature that starts its turn in a 20-foot Emanation originating from the creature. *Failure:* The target has the {condition_minor} condition until the start of its next turn. *Success:* The target is immune to this creature\'s aura for 24 hours.' },
  },
  {
    id: 'bloodied-fury', name: 'Bloodied Fury', cite: 'Boar/Bloodied Fury (CR 1/4); Giant Boar (CR 2); Berserker/Bloodied Frenzy (CR 2); Sahuagin/Blood Frenzy (CR 1/2)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'While Bloodied, the creature has Advantage on attack rolls.'])),
  },
  {
    id: 'uncanny-sense', name: 'Uncanny Sense', cite: 'Rust Monster/Iron Scent (CR 1/2, 30 ft); Xorn/Treasure Sense (CR 5, 60 ft); Chuul/Sense Magic (CR 4, 120 ft)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: { '0-2': 'The creature can pinpoint the location of {sense_target} within 30 feet of itself.', '3-5': 'The creature can pinpoint the location of {sense_target} within 60 feet of itself.', '6-9': 'The creature can pinpoint the location of {sense_target} within 60 feet of itself.', '10-12': 'The creature can pinpoint the location of {sense_target} within 60 feet of itself.', '13-20': 'The creature can pinpoint the location of {sense_target} within 120 feet of itself.', '21+': 'The creature can pinpoint the location of {sense_target} within 120 feet of itself.' },
  },
  {
    id: 'earth-glide', name: 'Earth Glide', cite: 'Earth Elemental/Earth Glide (CR 5); Xorn (CR 5)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait', requires_movement: 'Burrow',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature can burrow through nonmagical, unworked earth and stone. While doing so, the creature doesn\'t disturb the material it moves through.'])),
  },
  {
    id: 'tunneler', name: 'Tunneler', cite: 'Ankheg/Tunneler (CR 2); Purple Worm (CR 15)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait', requires_movement: 'Burrow',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.'])),
  },
  {
    id: 'berserk', name: 'Berserk', cite: 'Clay Golem/Berserk (CR 9); Flesh Golem (CR 5)',
    roles: ['brute', 'defender', 'skirmisher'], styles: [], cr_range: [2, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Whenever the creature starts its turn Bloodied, roll 1d6. On a 6, the creature goes berserk. On each of its turns while berserk, the creature attacks the nearest creature it can see. If no creature is near enough to move to and attack, the creature attacks an object. Once the creature goes berserk, it remains so until it is destroyed or it is no longer Bloodied.'])),
  },
  {
    id: 'shielded-mind', name: 'Shielded Mind', cite: 'Couatl/Shielded Mind (CR 4); Sphinx of Lore/Inscrutable (CR 11)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature\'s thoughts can\'t be read by any means, and other creatures can communicate with it telepathically only if it allows them.'])),
  },
  {
    id: 'evasion', name: 'Evasion', cite: 'Assassin/Evasion (CR 8)',
    roles: ['lurker', 'skirmisher'], styles: [], cr_range: [2, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the creature is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creature instead takes no damage if it succeeds on the save and only half damage if it fails. It can\'t use this trait if it has the Incapacitated condition.'])),
  },
  // ----- the six inventions (kin in the comment; grammar is print's) -----
  {
    id: 'relentless-pursuit', name: 'Relentless Pursuit', invented: true, // Ice Walk's clause + Faultless Tracker's quarry; the ox, the gallows, the causeway knight, the ashwalker (4 sightings)
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'While the creature is moving toward a creature it has damaged within the last 24 hours, the creature\'s Speed can\'t be reduced and Difficult Terrain doesn\'t cost it extra movement.'])),
  },
  {
    id: 'bound', name: 'Bound', invented: true, // Shield Guardian/Bound (print, to an amulet) with the anchor as a place: the hour's warden "cannot leave the tower"
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature is bound to {anchor}. It can\'t willingly move more than 120 feet from {anchor}, and it always knows the direction and distance to {anchor}.'])),
  },
  {
    id: 'marking-light', name: 'Marking Light', invented: true, // Faerie Fire's 2024 clause on a damage trigger: the lighthouse keeper's lit bolt, the orrery's star-shard (5 sightings)
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'A creature the creature damages sheds Dim Light in a 5-foot radius until the end of the creature\'s next turn and can\'t benefit from the Invisible condition while it does.'])),
  },
  {
    id: 'sealed-body', name: 'Sealed Body', invented: true, // Immutable Form + Shielded Mind fused for the sealed reliquary (the bishop, the penitent)
    roles: ['brute', 'defender', 'controller'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature can\'t shape-shift, and its thoughts can\'t be read by any means. Other creatures can communicate with it telepathically only if it allows them.'])),
  },
  {
    id: 'warded-mending', name: 'Warded Mending', invented: true, // Regeneration (Troll 15 at CR 5, Oni 10 at CR 7) with the ward as the off-switch: the altar sentinel
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait', supersedes: /regains \d+ Hit Points at the start of each of its turns/, // one body, one mending: the warden chassis's Regeneration leaves when the ward-gated form ships (the litanist warden bound absorption on "mend" because this was excluded)
    frames: { '0-2': 'The creature regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.', '3-5': 'The creature regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.', '6-9': 'The creature regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.', '10-12': 'The creature regains 15 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.', '13-20': 'The creature regains 20 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.', '21+': 'The creature regains 20 Hit Points at the start of each of its turns if it has at least 1 Hit Point and {ward} is within 30 feet of it.' },
  },
  {
    id: 'guarded-stance', name: 'Guarded Stance', invented: true, // Blurred Form (Steam Mephit, CR 1/4, unpriced) with the Bloodied off-switch: the iron riposte's seamless guard, the gloam weasel
    roles: ['defender', 'skirmisher'], styles: [], cr_range: [3, 30], replaces: 'trait', // no 0-2 rung: the only print instance is a CR 1/4 mephit and the pricing question starts there
    frames: Object.fromEntries(['3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'While the creature isn\'t Bloodied, melee attack rolls against it are made with Disadvantage.'])),
  },
  // FRESH THREE (2026-09-28): two print families the held-out set asked for by
  // clause — the hedge knight "whose oath keeps him standing after his body
  // should have quit" (the Zombie's own trait) and the magpie that "steals
  // voices and mimics them" (the Green Hag's, the Raven's).
  {
    id: 'undead-fortitude', name: 'Undead Fortitude', cite: 'Zombie/Undead Fortitude (CR 1/4); Ogre Zombie (CR 2)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If damage reduces the creature to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the creature drops to 1 Hit Point instead.'])),
  },
  {
    id: 'mimicry', name: 'Mimicry', cite: 'Green Hag/Mimicry (CR 3, DC 14); Raven (CR 0, DC 10)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'The creature can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC {dc} Wisdom (Insight) check.'])),
  },
  {
    id: 'wail', name: 'Wail', invented: true, // Banshee/Wail (2024 MM, not in this corpus) = the area form of Threshold Execute (Sea Hag/Death Glare, cited there): the drowned choir "whose hymn stops hearts" (critic, fresh three)
    roles: ['lurker', 'controller', 'artillery'], styles: [], cr_range: [3, 30], replaces: 'nova', gate: '1/Day',
    frames: { '3-5': '*Constitution Saving Throw*: DC {dc}, each creature within 30 feet of the creature that can hear it. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and if the target has 20 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. *Success:* Half damage only.', '6-9': '*Constitution Saving Throw*: DC {dc}, each creature within 30 feet of the creature that can hear it. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and if the target has 30 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. *Success:* Half damage only.', '10-12': '*Constitution Saving Throw*: DC {dc}, each creature within 30 feet of the creature that can hear it. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and if the target has 50 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. *Success:* Half damage only.', '13-20': '*Constitution Saving Throw*: DC {dc}, each creature within 60 feet of the creature that can hear it. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and if the target has 75 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. *Success:* Half damage only.', '21+': '*Constitution Saving Throw*: DC {dc}, each creature within 60 feet of the creature that can hear it. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and if the target has 100 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. *Success:* Half damage only.' },
  },
  {
    id: 'truth-aura', name: 'Aura of Truth', invented: true, // Zone of Truth as an aura (the spell's own save and clause); the reliquary knight "will not let a lie be spoken near it" — mechanics=aura detected, nothing rendered (critic, fresh four 2026-09-28)
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Charisma Saving Throw*: DC {dc}, any creature that starts its turn in a 15-foot Emanation originating from the creature. *Failure:* Until the start of its next turn, the target can\'t speak a deliberate lie.'])),
  },
  // THE GAZE, TRAIT FORM (critic, fresh five 2026-09-28: two of ten concepts
  // wanted "looks at / looks into" and the shelf had only the action form,
  // which seats standalone against the whole Multiattack and floors). Print's
  // passive gaze is the Sea Hag's Vile Appearance: a save each turn, keyed on
  // sight, Frightened-tier — the {condition_minor} vocabulary IS the tier cap
  // (Prone/Poisoned/Deafened/Frightened; a Medusa's Petrifying Gaze earns KO
  // only as a gated bonus action with the escalation clause).
  {
    id: 'gaze-aura', name: 'Vile Appearance', cite: 'Sea Hag/Vile Appearance (CR 2, 30 ft, Wis, Frightened)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Wisdom Saving Throw*: DC {dc}, any creature that starts its turn within 30 feet of the creature and can see it. *Failure:* The target has the Frightened condition until the start of its next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.'])), // print literal: a gaze frightens (the barrel's took Prone on a Strength save, 2026-09-28)
  },
  // THE CHARGE, PUSH FORM (critic: "off the cliff" is a push, not a bite-down;
  // kin the 2024 Minotaur's Gore — moved 20+ feet straight, pushed 10 feet and
  // Prone — not in this corpus). Opened to the phantom and lurker seats too:
  // the courier who runs anyone off the cliff had no row for its own verb.
  {
    id: 'charge-push', name: 'Run-Down', invented: true,
    roles: ['skirmisher', 'brute', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'melee-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Large or smaller, is pushed up to 10 feet straight away from the creature and has the Prone condition.'])),
  },
  // PROMOTED SEEDS (2026-09-22): the two most-drawn seeds become shapes —
  // one frame per band (print grows range and reach with tier) and a flavor
  // slot for the fiction the seed used to bake in. The seeds retire.
  {
    id: 'lure', name: 'Luring Presence', cite: 'Harpy/Luring Song (CR 1); Siren-class lures',
    roles: ['lurker', 'artillery', 'controller', 'skirmisher'], styles: [], cr_range: [0, 30], replaces: 'signature',
    frames: {
      '0-2': "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn.",
      '3-5': "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn.",
      '6-9': "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn and can't take Reactions.",
      '10-12': "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice within 60 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn and can't take Reactions.",
      '13-20': "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice within 90 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn and can't take Reactions.",
      '21+': "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice within 120 feet that can see or hear {lure_source}. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn and can't take Reactions.",
    },
  },
  {
    id: 'hook-drag', name: 'Hooked Lash', cite: 'Roper/Tendril + Reel (CR 5); Chain Devil class',
    roles: ['brute', 'lurker', 'defender'], styles: [], cr_range: [0, 30], replaces: 'signature',
    frames: {
      '0-2': '*Strength Saving Throw:* DC {dc}, one creature within 20 feet. *Failure:* The target is pulled up to 15 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}).',
      '3-5': '*Strength Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}).',
      '6-9': '*Strength Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target is pulled up to 25 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}).',
      '10-12': '*Strength Saving Throw:* DC {dc}, one Huge or smaller creature within 60 feet. *Failure:* The target is pulled up to 30 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}). While Grappled this way, the target has the Restrained condition.',
      '13-20': '*Strength Saving Throw:* DC {dc}, one Huge or smaller creature within 60 feet. *Failure:* The target is pulled up to 30 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}). While Grappled this way, the target has the Restrained condition.',
      '21+': '*Strength Saving Throw:* DC {dc}, one Huge or smaller creature within 90 feet. *Failure:* The target is pulled up to 30 feet straight toward the creature by {hook} and has the Grappled condition (escape DC {dc}). While Grappled this way, the target has the Restrained condition.',
    },
  },
  // THE TWO OWED DONOR ROWS (critic, from the free-text winners, 2026-09-22)
  {
    id: 'active-toll', name: 'Tolling Peal', invented: true, // the crab's active toll: Thunder + Deafened from the creature, a nova
    roles: ['brute', 'defender', 'lurker', 'controller', 'artillery'], styles: [], cr_range: [1, 30], replaces: 'nova', gate: 'Recharge 5-6',
    frames: {
      '0-2': '*Constitution Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
      '3-5': '*Constitution Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
      '6-9': '*Constitution Saving Throw*: DC {dc}, each creature in a 20-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
      '10-12': '*Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
      '13-20': '*Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
      '21+': '*Constitution Saving Throw*: DC {dc}, each creature in a 60-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.',
    },
  },
  {
    id: 'pull-through', name: 'Dragging Passage', invented: true, // the keeper's pull-through-walls, BOUNDED: the target lands in the nearest unoccupied space
    roles: ['lurker'], styles: [], cr_range: [3, 30], replaces: 'signature', // phantom by verb (through walls, drown, phase), not by style gate
    frames: Object.fromEntries(['3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Strength Saving Throw*: DC {dc}, one Medium or smaller creature the creature is touching. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the creature drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved.'])), // the "takes the damage again" clause left: a failed drag is a failed drag (critic 2026-10-01)
  },
  // THE RIDER ROADMAP (critic's table from the balance read, 2026-09-22): six
  // of the ten action misses were on-hit riders print already has.
  // THE BARBED-LANCE CLUSTER (wide run 2026-09-22: four rider misses — the
  // ashen lancer, the bridle of bones, the star-binder's shard): "when it
  // hits, the barbs hook and drag". Merrow Harpoon (2024 MM) grammar on the
  // melee row — the pull is the whole rider; the lodge is the name's.
  {
    id: 'hook-rider', name: 'Hooking Strike', invented: true, // kin: Merrow/Harpoon (2024 MM, not in this corpus); bolt-drag's melee twin
    roles: ['skirmisher', 'brute', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'melee-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the creature.'])),
  },
  {
    id: 'pounce', name: 'Pounce', cite: 'Tiger/Pounce (CR 1); Saber-Toothed Tiger (CR 2); Lion (CR 1)',
    roles: ['skirmisher', 'lurker', 'brute'], styles: [], cr_range: [0, 30], replaces: 'melee-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the creature moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and the creature can make one {melee_name} attack against it as a Bonus Action.'])),
  },
  {
    id: 'isolation', name: 'Isolated Prey', invented: true, // Convention 26 rendered as distance — the lone straggler takes more
    roles: ['skirmisher', 'lurker'], styles: [], cr_range: [1, 30], replaces: 'melee-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If no creature other than the creature is within 5 feet of the target, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage.'])),
  },
  {
    id: 'snatch', name: 'Snatch', cite: 'Roc/Talons (CR 11); Giant Eagle (CR 1); Griffon (CR 2)',
    roles: ['skirmisher', 'brute', 'lurker'], styles: [], cr_range: [1, 30], replaces: 'melee-rider', requires_movement: 'Fly',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the target is a Medium or smaller creature, it has the Grappled condition (escape DC {dc}) and is carried by the creature; the creature can drop it as part of its movement, and a dropped target falls.'])),
  },
  {
    id: 'ward-retaliation', name: 'Guardian\'s Answer', cite: 'Shield Guardian/Shield (CR 7) and the bodyguard reaction family',
    roles: ['defender', 'lurker', 'skirmisher', 'controller', 'artillery'], styles: [], cr_range: [1, 30], replaces: 'reaction', requires_style: 'warden', // "a creature that the creature guards" presupposes a ward: the iron-march duelist seated it with none (critic, the fourteen)
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Trigger:* A creature within 30 feet that the creature guards is hit by an attack roll. *Response:* The creature moves up to half its Speed toward the attacker without provoking Opportunity Attacks and makes one {melee_name} attack against it if it is within reach.'])),
  },
  {
    id: 'assassinate', name: 'Assassinate', cite: 'Assassin/Assassinate (CR 8, 2024)',
    roles: ['lurker', 'skirmisher'], styles: [], cr_range: [2, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'During the first round of each combat, the creature has Advantage on attack rolls against any creature that hasn\'t taken a turn. If the creature hits a creature during that round, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage.'])),
  },
  // THE TWO 4/4 PROPOSALS (critic run four): weapon-lodge and the Shield
  // Guardian's interpose — asked in every run of the held-out set.
  {
    id: 'weapon-lodge', name: 'Weapon Lodge', invented: true, // the mound's "knits shut around the axes": a hit weapon stays
    roles: ['brute', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'When a creature hits the creature with a nonmagical weapon, the weapon lodges in the creature\'s body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC {dc} Strength (Athletics) check as an action; while lodged, the creature can use it: its {melee_name} attacks deal an extra {avg_half} ({dice_half}) {damage_type} damage per lodged weapon (maximum two).'])),
  },
  // THE DUELIST CLUSTER (wide run 2026-09-22: three reaction misses — the
  // sable notch, the scarred duelist, the coin-bought duelist): "when a blow
  // misses, the off-hand answers". Parry (Bandit Captain, 2024 MM) answered
  // with the Battle Master's Riposte: one attack bought by the miss.
  {
    id: 'random-ray', name: 'Eye Rays', invented: true, gate: 'Recharge 5-6', // kin: the dragon's breath in the nova slot. The TABLE IS COMPOSED BY THE ENGINE from library bolt cards (slow-bolt, snare-bolt, sensory-strike, gaze-single, push-prone, drain) — the model flavors a ray, it never defines one (critic 2026-10-01: the authored table was the MM's ten)
    roles: ['brute', 'defender', 'controller', 'artillery', 'lurker', 'skirmisher'], styles: [], cr_range: [3, 30], replaces: 'nova',
    frames: {
      '3-5': 'The creature fires three rays at random creatures it can see within 120 feet, rolling a d4 for each ray (a creature can be the target of only one ray a turn): {ray_table}',
      '6-9': 'The creature fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): {ray_table}',
      '10-12': 'The creature fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): {ray_table}',
      '13-20': 'The creature fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): {ray_table}',
      '21+': 'The creature fires three rays at random creatures it can see within 120 feet, rolling a d6 for each ray (a creature can be the target of only one ray a turn): {ray_table}',
    },
  },
  {
    id: 'blurred-form', name: 'Blurred Form', invented: true, // kin: Steam Mephit/Blurred Form (CR 1/4) + Blur (PHB); the displaced image a few feet from where it stands — owed to the ghost seats since the first lurker review (PI follow-up 2026-10-01)
    roles: ['lurker', 'skirmisher', 'controller'], styles: [], cr_range: [1, 30], replaces: 'trait',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Attack rolls against the creature have Disadvantage. If the creature is hit by an attack roll, this trait is disabled until the end of its next turn.'])),
  },
  {
    id: 'volley-order', name: 'Volley Order', invented: true, gate: '2/Day', // kin: Hobgoblin Warlord/Leadership (2014 MM) + Commander's Strike (PHB); the leader-seat shape "orders a volley" named (critic 2026-09-28) — allies' Reaction attacks, so a shape, not a seed (seeds are reaction-free by construction)
    roles: ['defender'], styles: [], cr_range: [1, 30], replaces: 'bonus-alt', requires_style: 'leader',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Each ally within 30 feet of the creature that can see or hear it can take a Reaction to make one ranged attack roll.'])),
  },
  {
    id: 'ground-burst', name: 'Shockwave', cite: 'Nalfeshnee/Horror Nimbus (CR 13); Vrock/Stunning Screech (CR 6)', // print's SELF-CENTRED Emanation nova; "eruption" concepts borrowed the leap (critic 2026-09-29)
    roles: ['brute', 'defender', 'controller', 'skirmisher', 'lurker'], styles: [], cr_range: [3, 30], replaces: 'nova', gate: 'Recharge 5-6', // lurker too: a barrow-wight routed to the trap seat lost its eruption (2026-09-29)
    frames: {
      '3-5': '*{save_stat} Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '6-9': '*{save_stat} Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '10-12': '*{save_stat} Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '13-20': '*{save_stat} Saving Throw*: DC {dc}, each creature in a 20-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '21+': '*{save_stat} Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
    },
  },
  {
    id: 'snap-shot', name: 'Snap Shot', invented: true, host: 'ranged', // kin: riposte (this shelf) + Bandit Captain/Parry (2024 MM): the ranged punisher a sergeant's "snaps off a shot as they close" asked for (critic 2026-09-28)
    roles: ['skirmisher', 'artillery', 'defender'], styles: [], cr_range: [1, 30], replaces: 'reaction',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Trigger:* A creature the creature can see moves to within 5 feet of it. *Response:* The creature makes one {ranged_name} attack against that creature.'])),
  },
  {
    id: 'riposte', name: 'Riposte', invented: true, // kin: Bandit Captain/Parry (2024 MM) + Riposte maneuver (PHB); neither is in this corpus
    roles: ['skirmisher', 'defender', 'lurker'], styles: [], cr_range: [1, 30], replaces: 'reaction',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Trigger:* A creature within 5 feet of the creature misses it with a melee attack roll. *Response:* The creature makes one {melee_name} attack against that creature.'])),
  },
  {
    id: 'interpose', name: 'Interpose', cite: 'Shield Guardian/Shield (CR 7)',
    roles: ['defender', 'controller', 'artillery', 'lurker', 'skirmisher'], styles: [], cr_range: [1, 30], replaces: 'reaction', requires_style: 'warden',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Trigger:* A creature within 5 feet of the creature that it guards is hit by an attack roll. *Response:* The attack hits the creature instead, and the creature has Resistance to the attack\'s damage.'])),
  },
  // THE CASTER LINE'S RIDER SECTION (the hermit's mile-bolt missed four runs
  // with "no template exists for this section on this line"): riders that
  // append to the RANGED or hybrid attack row.
  {
    id: 'bolt-restrain', name: 'Binding Bolt', invented: true, // Web / Hold-style rider on a spell attack
    roles: ['artillery', 'controller'], styles: [], cr_range: [1, 30], replaces: 'ranged-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the target is a Large or smaller creature, it has the Restrained condition until the end of its next turn.'])),
  },
  {
    id: 'bolt-drag', name: 'Reeling Bolt', invented: true, // Thorn Whip / Lightning Lure grammar as a rider
    roles: ['artillery', 'controller', 'lurker'], styles: [], cr_range: [1, 30], replaces: 'ranged-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'If the target is a Large or smaller creature, it is pulled up to 15 feet straight toward the creature.'])),
  },
  {
    id: 'bolt-mark', name: 'Marking Bolt', invented: true, // Hunter\'s Mark grammar as a rider: the struck target is easier to strike again
    roles: ['artillery', 'controller', 'skirmisher'], styles: [], cr_range: [1, 30], replaces: 'ranged-rider',
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'Until the end of the creature\'s next turn, the creature has Advantage on attack rolls against the target, and the target can\'t take the Hide action.'])),
  },
  // (3) a bodily emission comes FROM the creature — a Cone, not a lobbed sphere (the goat's vomit, critic run seven)
  {
    id: 'spew', name: 'Noxious Spew', cite: 'Poison-breath Cone family (Green Dragon Wyrmling CR 2, Black Dragon Wyrmling CR 2)',
    roles: ['skirmisher', 'brute', 'lurker', 'controller'], styles: [], cr_range: [0, 30], replaces: 'nova', gate: 'Recharge 5-6',
    frames: {
      '0-2': '*Constitution Saving Throw*: DC {dc}, each creature in a 15-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
      '3-5': '*Constitution Saving Throw*: DC {dc}, each creature in a 15-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
      '6-9': '*Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
      '10-12': '*Constitution Saving Throw*: DC {dc}, each creature in a 30-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
      '13-20': '*Constitution Saving Throw*: DC {dc}, each creature in a 60-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
      '21+': '*Constitution Saving Throw*: DC {dc}, each creature in a 90-foot Cone. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Poisoned condition until the end of its next turn. *Success:* Half damage only.',
    },
  },
  {
    id: 'death-burst', name: 'Death Burst', cite: 'Dust Mephit (CR 1/2, 5 ft); Magmin (CR 1/2, 10 ft); Balor/Death Throes (CR 19, 30 ft dual-type)',
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker'], styles: [], cr_range: [0.5, 20], replaces: 'trait',
    frames: {
      '0-2': 'The creature explodes when it dies. *Dexterity Saving Throw*: DC {dc}, each creature in a 5-foot Emanation originating from the creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage. *Success:* Half damage.',
      '3-5': 'The creature explodes when it dies. *Dexterity Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage. *Success:* Half damage.',
      '6-9': 'The creature explodes when it dies. *Dexterity Saving Throw*: DC {dc}, each creature in a 10-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '10-12': 'The creature explodes when it dies. *Dexterity Saving Throw*: DC {dc}, each creature in a 15-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage.',
      '13-20': 'The creature explodes when it dies. *Dexterity Saving Throw*: DC {dc}, each creature in a 30-foot Emanation originating from the creature. *Failure:* {avg} ({dice}) {damage_type} damage. *Success:* Half damage. The explosion destroys the creature\'s body.',
    },
  },
  // ----- inventions: no printed frame exists at any band; flagged -----
  {
    id: 'charge', name: 'Charge', invented: true,
    roles: ['skirmisher', 'brute'], styles: ['mounted'], cr_range: [1, 30], replaces: 'melee-rider',
    frames: {
      '0-2': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage.',
      '3-5': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Medium or smaller, has the Prone condition.',
      '6-9': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Large or smaller, has the Prone condition.',
      '10-12': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Large or smaller, has the Prone condition.',
      '13-20': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Huge or smaller, has the Prone condition.',
      '21+': 'If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra {avg_half} ({dice_half}) {damage_type} damage and, if it is Huge or smaller, has the Prone condition and can\'t take Reactions until the start of its next turn.',
    },
  },
  {
    id: 'throw-recall', name: 'Throw and Recall', invented: true,
    roles: ['skirmisher', 'artillery'], styles: ['hurler'], cr_range: [3, 20], replaces: 'ranged',
    frames: {
      '3-5': '*Ranged Attack Roll:* +{atk}, range 30/90 ft. {avg} ({dice}) {damage_type} damage, and {projectile} returns to the creature\'s grasp. While {projectile} is thrown and not yet returned, the creature can\'t make this attack.',
      '6-9': '*Ranged Attack Roll:* +{atk}, range 30/90 ft. {avg} ({dice}) {damage_type} damage, and {projectile} returns to the creature\'s grasp. While {projectile} is thrown and not yet returned, the creature can\'t make this attack.',
      '10-12': '*Ranged Attack Roll:* +{atk}, range 60/180 ft. {avg} ({dice}) {damage_type} damage, and {projectile} returns to the creature\'s grasp. While {projectile} is thrown and not yet returned, the creature can\'t make this attack.',
      '13-20': '*Ranged Attack Roll:* +{atk}, range 60/180 ft. {avg} ({dice}) {damage_type} damage, and {projectile} returns to the creature\'s grasp. While {projectile} is thrown and not yet returned, the creature can\'t make this attack.',
    },
  },
  {
    id: 'burrow-ambush', name: 'Erupting Ambush', invented: true,
    roles: ['skirmisher', 'lurker', 'brute', 'controller', 'defender', 'artillery'], styles: [], cr_range: [2, 16], replaces: 'signature', gate: 'Recharge 5-6', // any BURROWER's row, not the skulker's alone — requires_movement already gates it (the grave-worm, a brute-grappler, could not see it: critic 2026-09-28)
    requires_movement: 'Burrow',
    frames: {
      '0-2': 'If the creature is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC {dc}, that creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Prone condition.',
      '3-5': 'If the creature is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC {dc}, that creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Prone condition. The creature then makes one {melee_name} attack against the target.',
      '6-9': 'If the creature is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC {dc}, that creature. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the target has the Prone condition. The creature then makes one {melee_name} attack against the target.',
      '10-12': 'If the creature is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC {dc}, that creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. The creature then makes one {melee_name} attack against the target.',
      '13-20': 'If the creature is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC {dc}, that creature. *Failure:* {avg} ({dice}) {damage_type} damage, and the target has the Prone condition. The creature then makes one {melee_name} attack against the target.',
    },
  },
];

export const STYLES = {
  mounted: 'a charger or rider — speed, momentum, ride-down attacks',
  skulker: 'an ambusher — stealth, gazes, leaps, vanishing',
  hurler: 'a thrower — projectiles, bursts, reeling lines',
  archer: 'a shooter — bows and bolts, distance, a marked target',
  shifter: 'a creature of two forms — a beast side and a human side, gated attacks',
  leader: 'a commander — an aura for allies, a parry, a captain among troops',
};

/** The triple filter, band-resolved: returns shapes with `frame` set for the CR. */
export function shapesFor({ role, style = null, cr, movement = '' }) {
  const band = bandFor(cr);
  return SHAPES.filter((s) => s.roles.includes(role)
    && (!style || s.styles.length === 0 || s.styles.includes(style))
    && cr >= s.cr_range[0] && cr <= s.cr_range[1]
    && s.frames[band]
    && (!s.requires_movement || new RegExp(s.requires_movement, 'i').test(movement)))
    .map((s) => ({ ...s, frame: s.frames[band] }));
}
