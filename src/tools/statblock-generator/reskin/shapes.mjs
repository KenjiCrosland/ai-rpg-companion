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
    id: 'condition-payoff', name: 'Condition Payoff', composing: true,
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
    id: 'affliction', name: 'Lingering Wound', cite: 'Bearded Devil/Infernal Glaive (CR 3); Horned Devil/Infernal Tail (CR 11)',
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
    roles: ['skirmisher', 'brute', 'artillery', 'controller', 'lurker', 'defender'], styles: [], cr_range: [1, 30], replaces: 'trait',
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
    id: 'throw-retrieve', name: 'Hurled Weapon', invented: true, supersedes: /returns to (?:its|the creature's|the \w+'s) hand|Hit or Miss/i, // one lance, one physics: the chassis's returning throw leaves when this ships // the critic's v2 pick from the free-text side: hurl the weapon, Speed halved until it is recovered
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
    frames: Object.fromEntries(['3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, '*Strength Saving Throw*: DC {dc}, one Medium or smaller creature the creature is touching. *Failure:* {avg_half} ({dice_half}) {damage_type} damage, and the creature drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved but takes the damage again.'])),
  },
  // THE RIDER ROADMAP (critic's table from the balance read, 2026-09-22): six
  // of the ten action misses were on-hit riders print already has.
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
    roles: ['defender', 'lurker', 'skirmisher', 'controller', 'artillery'], styles: [], cr_range: [1, 30], replaces: 'reaction',
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
    frames: Object.fromEntries(['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].map((b) => [b, 'When a creature hits the creature with a melee weapon attack using a nonmagical weapon, the weapon lodges in the creature\'s body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC {dc} Strength (Athletics) check as an action; while lodged, the creature can use it: its {melee_name} attacks deal an extra {avg_half} ({dice_half}) {damage_type} damage per lodged weapon (maximum two).'])),
  },
  {
    id: 'interpose', name: 'Interpose', cite: 'Shield Guardian/Shield (CR 7)',
    roles: ['defender', 'controller', 'artillery', 'lurker', 'skirmisher'], styles: [], cr_range: [1, 30], replaces: 'reaction',
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
    roles: ['skirmisher', 'lurker'], styles: ['skulker'], cr_range: [2, 16], replaces: 'signature', gate: 'Recharge 5-6',
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
