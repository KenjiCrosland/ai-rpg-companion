/**
 * AUTHORED DONOR CHASSIS (owner call, 2026-08-17: "maybe we make our own
 * donors... we need at least one legendary action set that's not an erinyes
 * or solar — something that says 'generic skirmisher', easy to reskin").
 *
 * NOTE FOR REVIEWERS: the damage dice and attack bonuses written here are
 * SHAPE PLACEHOLDERS — scale.mjs re-solves every payload from the card at
 * generation time (per-hit solver, ranged x0.85 premium, rider split
 * carved from inside the solved per-hit). Authored numbers never ship;
 * auditing them as if they did produces phantom findings (the flat-twin
 * and untracked-rider reviews, 2026-08-19).
 *
 * Four hand-designed skirmisher blocks, one per seat CR, built to the 2024
 * business card (card-budgets.mjs) and to every print shape this sprint
 * measured: melee-capable at CR 5+, or-form multiattack for ranged parity,
 * one Recharge at most, <=2 bonus actions, exit bonus action (the
 * skirmisher identity), WIS among the saves at 15+, legendary menu of 3
 * with at least one unlocked option. No icon mechanics anywhere — the
 * strip stage is a no-op on these; the wildcard still replaces the SLOT
 * marked `wildcard_slot` with the concept's signature.
 *
 * Entry names ARE their mechanics ('Melee Attack', 'Sweeping Area
 * Attack', 'Escape Action') — owner call: donor templates carry ZERO
 * flavor, so no donor word can survive a reskin and an unrenamed entry
 * is unmistakable on sight. The reskin pass renames every entry or fails
 * loudly. Damage types are physical placeholders; the
 * reskin stamps the concept's palette. The spec test verifies each donor
 * against withinBudget at its own CR — the math is enforced, not trusted.
 */

export const DONORS = [
  {
    id: 'skirmisher-1',
    cite: 'composition after Goblin Warrior / Spy (CR 1/4-1)',
    cr: 1,
    archetypes: ['skirmisher'],
    ac: 15, hp: 30, hp_formula: '7d8', atk: 4, dc: 11, pb: 2,
    speed: '30 ft.',
    stats: { STR: 10, DEX: 14, CON: 10, INT: 8, WIS: 12, CHA: 8 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +4',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +4, reach 5 ft. 5 (1d6 + 2) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +4, range 30/90 ft. 4 (1d4 + 2) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-3',
    cite: 'composition after Vampire Familiar (CR 3)',
    cr: 3,
    archetypes: ['skirmisher'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '40 ft., Climb 30 ft.',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 8, WIS: 12, CHA: 8 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +5',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 30/90 ft. 8 (2d4 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8',
    cite: 'composition after Assassin (CR 8) — the print skirmisher ceiling',
    cr: 8,
    archetypes: ['skirmisher'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '40 ft., Climb 40 ft.',
    stats: { STR: 14, DEX: 20, CON: 16, INT: 10, WIS: 14, CHA: 10 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +8',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 14 (2d8 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 12 (2d6 + 5) {damage_type} damage.' },
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. *Failure:* 45 (10d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13',
    invented: true, // no printed skirmisher above CR 8 (measured); card + band-sweep composition
    cr: 13,
    archetypes: ['skirmisher', 'artillery'],
    ac: 18, hp: 210, hp_formula: '28d10 + 56', atk: 10, dc: 17, pb: 5,
    speed: '50 ft., Climb 40 ft.',
    stats: { STR: 18, DEX: 22, CON: 14, INT: 10, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +8, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 10 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 20 (4d6 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 17 (2d10 + 6) {damage_type} damage.' },
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 17, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 63 (14d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18',
    invented: true, // no printed skirmisher above CR 8; legendary economy after the adult-dragon pattern
    cr: 18,
    legendary: true,
    archetypes: ['skirmisher', 'artillery'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '60 ft., Climb 60 ft.',
    stats: { STR: 20, DEX: 26, CON: 14, INT: 14, WIS: 18, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +10, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 15 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 10 ft. 26 (4d8 + 8) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 24 (3d10 + 8) {damage_type} damage.' },
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 20, each creature in a 60-foot-long, 10-foot-wide Line. *Failure:* 90 (20d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-22',
    invented: true, // 21+ band: composition from the band sweep (entries ~10, gated+legendary always)
    cr: 22,
    legendary: true,
    archetypes: ['skirmisher', 'artillery'],
    ac: 21, hp: 415, hp_formula: '43d10 + 179', atk: 15, dc: 22, pb: 7,
    speed: '60 ft., Climb 60 ft.',
    stats: { STR: 22, DEX: 28, CON: 24, INT: 16, WIS: 20, CHA: 18 },
    saves: ['DEX', 'WIS'], skills: 'Perception +12, Stealth +16',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (4/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 20 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +15, reach 10 ft. 39 (6d10 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +15, range 90/240 ft. 37 (9d6 + 6) {damage_type} damage.' },
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 22, each creature in a 90-foot-long, 10-foot-wide Line. *Failure:* 77 (14d10) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 22, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  // ---- MOUNTED style line (owner call 2026-08-18: full templates, not
  // runtime swaps — the shape catalog is the AUTHORING vocabulary; these
  // blocks are composed from its band frames by hand). Charger identity:
  // runner speed, trample nova, charge rider on the melee (conditional,
  // priced from the rider split so budget never exceeds the plain seat).
  {
    id: 'skirmisher-3-mounted',
    invented: true, // mounted style: trample cited (Centaur Trooper), charge rider invented
    style: 'mounted',
    cr: 3, archetypes: ['skirmisher'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '50 ft.',
    stats: { STR: 14, DEX: 16, CON: 12, INT: 8, WIS: 12, CHA: 8 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +5',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 (1d8 + 3) {damage_type} damage. If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) {damage_type} damage and, if it is Medium or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 30/90 ft. 7 (1d8 + 3) {damage_type} damage.' },
        { name: 'Trampling Rush', imposes: 'Prone', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 12. *Failure:* 10 (3d6) {damage_type} damage, and the target has the Prone condition.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8-mounted',
    invented: true, // mounted style above the Centaur: charge rider invented
    style: 'mounted',
    cr: 8, archetypes: ['skirmisher'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '50 ft.',
    stats: { STR: 16, DEX: 20, CON: 16, INT: 10, WIS: 14, CHA: 10 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +8',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 9 (1d8 + 5) {damage_type} damage. If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) {damage_type} damage and, if it is Large or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 12 (2d6 + 5) {damage_type} damage.' },
        { name: 'Trampling Rush', imposes: 'Prone', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 15. *Failure:* 27 (6d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13-mounted',
    invented: true, // mounted style, no printed peer
    style: 'mounted',
    cr: 13, archetypes: ['skirmisher'],
    ac: 18, hp: 210, hp_formula: '28d10 + 56', atk: 10, dc: 17, pb: 5,
    speed: '60 ft.',
    stats: { STR: 18, DEX: 22, CON: 14, INT: 10, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +8, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 10 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 17 (2d10 + 6) {damage_type} damage. If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) {damage_type} damage and, if it is Large or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 17 (2d10 + 6) {damage_type} damage.' },
        { name: 'Trampling Rush', imposes: 'Prone', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 17. *Failure:* 45 (10d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18-mounted',
    invented: true, // mounted style, no printed peer
    style: 'mounted', legendary: true,
    cr: 18, archetypes: ['skirmisher'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '70 ft.',
    stats: { STR: 20, DEX: 26, CON: 14, INT: 14, WIS: 18, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +10, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 15 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 10 ft. 17 (2d8 + 8) {damage_type} damage. If the creature moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) {damage_type} damage and, if it is Huge or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 24 (3d10 + 8) {damage_type} damage.' },
        { name: 'Trampling Rush', imposes: 'Prone', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 20. *Failure:* 63 (14d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  // ---- SKULKER style line: the deepest reskin of the three — gaze
  // (Mummy -> Mummy Lord progression), blink (Blink Dog -> Marilith),
  // stealth chassis after the Phase Spider / Assassin. No nova: the
  // sustained line carries the band (print's own skulker economy).
  {
    id: 'skirmisher-3-skulker',
    cite: 'composition after Phase Spider (CR 3) + Blink Dog; gaze after Mummy (CR 3)',
    style: 'skulker',
    cr: 3, archetypes: ['skirmisher'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '40 ft., Climb 30 ft.',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 8, WIS: 12, CHA: 8 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +7',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 30/90 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Ranged Save Effect', imposes: 'Frightened', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 12, one creature the creature can see within 60 feet. *Failure:* The target has the Frightened condition until the end of the creature\'s next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 40 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    id: 'skirmisher-8-skulker',
    cite: 'composition after Assassin (CR 8); gaze after Mummy; blink after Blink Dog',
    style: 'skulker',
    cr: 8, archetypes: ['skirmisher'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '40 ft., Climb 40 ft.',
    stats: { STR: 14, DEX: 20, CON: 16, INT: 10, WIS: 14, CHA: 10 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 18 (3d8 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 16 (2d10 + 5) {damage_type} damage.' },
        { name: 'Ranged Save Effect', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 15, one creature the creature can see within 60 feet. *Failure:* The target has the {condition_minor} condition until the end of the creature\'s next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 60 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    id: 'skirmisher-13-skulker',
    invented: true, // no printed skulker above CR 8; gaze rung cited (Mummy Lord CR 15)
    style: 'skulker',
    cr: 13, archetypes: ['skirmisher'],
    ac: 18, hp: 210, hp_formula: '28d10 + 56', atk: 10, dc: 17, pb: 5,
    speed: '50 ft., Climb 40 ft.',
    stats: { STR: 16, DEX: 22, CON: 14, INT: 10, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +8, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 10 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 25 (3d12 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 22 (3d10 + 6) {damage_type} damage.' },
        { name: 'Ranged Save Effect', imposes: 'Paralyzed', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 17, one creature the creature can see within 60 feet. *Failure:* 18 (4d8) {damage_type} damage, and the target has the Paralyzed condition until the end of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 120 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    id: 'skirmisher-18-skulker',
    invented: true, // no printed peer; gaze at the Solar rung, blink after Marilith
    style: 'skulker', legendary: true,
    cr: 18, archetypes: ['skirmisher'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '60 ft., Climb 60 ft.',
    stats: { STR: 20, DEX: 26, CON: 14, INT: 14, WIS: 18, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +10, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 15 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 10 ft. 30 (5d8 + 8) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 29 (6d6 + 8) {damage_type} damage.' },
        { name: 'Ranged Save Effect', imposes: 'Paralyzed', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 20, one creature the creature can see within 90 feet. *Failure:* 22 (4d10) {damage_type} damage, and the target has the Paralyzed condition until the end of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 120 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  // ---- HURLER style line: thrown-burst nova (Giant Ape / Storm Giant),
  // throw-and-recall ranged (flagged invention), reel at the low seat.
  {
    id: 'skirmisher-8-hurler',
    invented: true, // burst cited (Giant Ape CR 7); throw-and-recall invented
    style: 'hurler',
    cr: 8, archetypes: ['skirmisher', 'artillery'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '40 ft., Climb 40 ft.',
    stats: { STR: 18, DEX: 18, CON: 16, INT: 10, WIS: 14, CHA: 10 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +8',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 14 (2d8 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 12 (2d6 + 5) {damage_type} damage. *Hit or Miss:* Immediately after the attack, {projectile} returns to the creature\'s grasp.' },
        { name: 'Hurled Burst', text: 'The creature hurls {projectile} at a point it can see within 90 feet. *Dexterity Saving Throw*: DC 15, each creature in a 5-foot-radius Sphere centered on that point. *Failure:* 45 (10d8) {damage_type} damage. If the target is Large or smaller, it has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one Medium or smaller creature within 30 feet. *Failure:* 7 (2d6) {damage_type} damage, and the target is pulled up to 20 feet straight toward the creature.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13-hurler',
    invented: true, // burst rung cited (Storm Giant CR 13); composition invented
    style: 'hurler',
    cr: 13, archetypes: ['skirmisher', 'artillery'],
    ac: 18, hp: 210, hp_formula: '28d10 + 56', atk: 10, dc: 17, pb: 5,
    speed: '50 ft., Climb 40 ft.',
    stats: { STR: 20, DEX: 22, CON: 14, INT: 10, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +8, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 10 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 20 (4d6 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 17 (2d10 + 6) {damage_type} damage. *Hit or Miss:* Immediately after the attack, {projectile} returns to the creature\'s grasp.' },
        { name: 'Hurled Burst', text: 'The creature hurls {projectile} at a point it can see within 300 feet. *Dexterity Saving Throw*: DC 17, each creature in a 10-foot-radius Sphere centered on that point. *Failure:* 63 (14d8) {damage_type} damage. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one Large or smaller creature within 60 feet. *Failure:* 10 (3d6) {damage_type} damage, and the target is pulled up to 25 feet straight toward the creature.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-3-winged',
    invented: true, // winged: Flyby cited (Gargoyle/Hippogriff/Giant Wasp, all <=CR 2); dive rider after the 2014 Peryton pattern; composition has no printed peer at this CR
    style: 'winged',
    cr: 3, archetypes: ['skirmisher'],
    ac: 15, hp: 54, hp_scale: 0.9, hp_formula: '10d8 + 10', atk: 5, dc: 12, pb: 2,
    speed: '30 ft., Fly 60 ft.',
    stats: { STR: 14, DEX: 16, CON: 12, INT: 8, WIS: 12, CHA: 8 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +5',
    sections: {
      Traits: [
        { name: 'Flyby Trait', text: 'The creature doesn\'t provoke Opportunity Attacks when it flies out of an enemy\'s reach.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 (1d8 + 3) {damage_type} damage. If the creature flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) {damage_type} damage and, if it is Medium or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 30/90 ft. 7 (1d8 + 3) {damage_type} damage.' },
        { name: 'Diving Attack', imposes: 'Prone', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 12. *Failure:* 10 (3d6) {damage_type} damage, and the target has the Prone condition.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8-winged',
    invented: true, // winged: Flyby cited (Gargoyle/Hippogriff/Giant Wasp, all <=CR 2); dive rider after the 2014 Peryton pattern; composition has no printed peer at this CR
    style: 'winged',
    cr: 8, archetypes: ['skirmisher'],
    ac: 17, hp: 122, hp_scale: 0.9, hp_formula: '16d8 + 48', atk: 8, dc: 15, pb: 3,
    speed: '40 ft., Fly 70 ft.',
    stats: { STR: 16, DEX: 20, CON: 16, INT: 10, WIS: 14, CHA: 10 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +8',
    sections: {
      Traits: [
        { name: 'Flyby Trait', text: 'The creature doesn\'t provoke Opportunity Attacks when it flies out of an enemy\'s reach.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 9 (1d8 + 5) {damage_type} damage. If the creature flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) {damage_type} damage and, if it is Large or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 12 (2d6 + 5) {damage_type} damage.' },
        { name: 'Diving Attack', imposes: 'Prone', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 15. *Failure:* 27 (6d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13-winged',
    invented: true, // winged: Flyby cited (Gargoyle/Hippogriff/Giant Wasp, all <=CR 2); dive rider after the 2014 Peryton pattern; composition has no printed peer at this CR
    style: 'winged',
    cr: 13, archetypes: ['skirmisher'],
    ac: 18, hp: 189, hp_scale: 0.9, hp_formula: '25d10 + 50', atk: 10, dc: 17, pb: 5,
    speed: '40 ft., Fly 80 ft.',
    stats: { STR: 18, DEX: 22, CON: 14, INT: 10, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +8, Stealth +11',
    sections: {
      Traits: [
        { name: 'Flyby Trait', text: 'The creature doesn\'t provoke Opportunity Attacks when it flies out of an enemy\'s reach.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 10 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 17 (2d10 + 6) {damage_type} damage. If the creature flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) {damage_type} damage and, if it is Large or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 17 (2d10 + 6) {damage_type} damage.' },
        { name: 'Diving Attack', imposes: 'Prone', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 17. *Failure:* 45 (10d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18-winged',
    invented: true, // winged: Flyby cited (Gargoyle/Hippogriff/Giant Wasp, all <=CR 2); dive rider after the 2014 Peryton pattern; composition has no printed peer at this CR
    style: 'winged', legendary: true,
    cr: 18, archetypes: ['skirmisher'],
    ac: 20, hp: 256, hp_scale: 0.9, hp_formula: '34d10 + 68', atk: 13, dc: 20, pb: 6,
    speed: '40 ft., Fly 90 ft.',
    stats: { STR: 20, DEX: 26, CON: 14, INT: 14, WIS: 18, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +10, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Flyby Trait', text: 'The creature doesn\'t provoke Opportunity Attacks when it flies out of an enemy\'s reach.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 15 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 10 ft. 17 (2d8 + 8) {damage_type} damage. If the creature flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) {damage_type} damage and, if it is Huge or smaller, has the Prone condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 24 (3d10 + 8) {damage_type} damage.' },
        { name: 'Diving Attack', imposes: 'Prone', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 20. *Failure:* 63 (14d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18-hurler',
    invented: true, // no printed hurler above CR 13; burst after the Storm Giant rung, legendary frame after the 18-seat law
    style: 'hurler', legendary: true,
    cr: 18, archetypes: ['skirmisher', 'artillery'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '60 ft., Climb 60 ft.',
    stats: { STR: 20, DEX: 26, CON: 14, INT: 14, WIS: 18, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +10, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
        { name: 'Reactive Reposition', text: 'When a creature the creature can see ends its turn within 5 feet of it, the creature can move up to 15 feet without provoking Opportunity Attacks.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 10 ft. 30 (5d8 + 8) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 29 (6d6 + 8) {damage_type} damage. *Hit or Miss:* Immediately after the attack, {projectile} returns to the creature\'s grasp.' },
        { name: 'Hurled Burst', text: 'The creature hurls {projectile} at a point it can see within 300 feet. *Dexterity Saving Throw*: DC 20, each creature in a 15-foot-radius Sphere centered on that point. *Failure:* 72 (16d8) {damage_type} damage. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one Large or smaller creature within 90 feet. *Failure:* 13 (3d8) {damage_type} damage, and the target is pulled up to 30 feet straight toward the creature.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // THE BRUTE LINES (corpus composition sweep, 2026-08-26, n=40 print
  // brutes CR 2-30). The archetype is NOT a skirmisher reskin — the sweep's
  // structural facts, each encoded below:
  //   - AC runs 2-3 UNDER the card, HP ~1.1 over (ac_offset / hp_scale —
  //     the brute spends the same budget on meat instead of armor)
  //   - multiattack is TWO of the SAME row ("makes two X attacks"); the
  //     whole low-CR tier (Ogre, Rhino, Minotaur) has NO multiattack —
  //     one colossal hit
  //   - melee-only by default (9/40 print brutes have ANY ranged option);
  //     reach 10 replaces range from CR 5 up; plain giants throw rocks
  //   - engines, not rows: charge (moved 20+ feet straight toward ->
  //     extra + Prone), Prone->Trample (BA gated on the state the attack
  //     creates), Grapple->Swallow (same)
  //   - ZERO reactions in the print cohort; no escape suite of any kind
  //   - HALF of print brutes have zero traits — sheets are LEAN; the
  //     trait families that exist (Immutable Form, Siege Monster, Magic
  //     Resistance, Regeneration) are print-standard names, rules:true
  //   - save effects exist only as Recharge novas (breath-shaped)
  // -------------------------------------------------------------------------
  // SINGLE-ATTACK LOW-CR BRUTES ARE PRINT-CITED, not underbuilt (critic
  // challenged it 2026-09-01, overruled): the Boar, Giant Boar, Rhino,
  // and Ogre all swing once; the Gorgon (CR 5) attacks once with Gore
  // and takes its second swing as Trample on Prone targets. One big hit
  // + trample IS the charger shape until Multiattack arrives at the
  // Dragon Turtle tier.
  {
    id: 'brute-2',
    cite: 'composition after Ogre (CR 2) — one colossal hit, no traits',
    cr: 2, archetypes: ['brute'],
    ac: 12, ac_offset: -3, hp: 50, hp_scale: 1.1, hp_formula: '7d10 + 14', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 8, CON: 15, INT: 6, WIS: 8, CHA: 6 },
    saves: ['STR'], skills: 'Athletics +5, Perception +1',
    sections: {
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 15 (2d10 + 4) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-5',
    cite: 'composition after Hill Giant (CR 5) — two of the same swing, thrown rock',
    cr: 5, archetypes: ['brute'],
    ac: 14, ac_offset: -2, hp: 100, hp_scale: 1.1, hp_formula: '10d12 + 35', atk: 6, dc: 13, pb: 3,
    speed: '40 ft.',
    stats: { STR: 16, DEX: 8, CON: 16, INT: 6, WIS: 10, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +6, Perception +3',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 10 ft. 19 (3d10 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +6, range 60/240 ft. 16 (3d8 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-9',
    cite: 'composition after Fire Giant (CR 9) — the giant ladder continues',
    cr: 9, archetypes: ['brute'],
    ac: 15, ac_offset: -2, hp: 165, hp_scale: 1.1, hp_formula: '17d12 + 55', atk: 8, dc: 15, pb: 4,
    speed: '40 ft.',
    stats: { STR: 18, DEX: 8, CON: 17, INT: 8, WIS: 10, CHA: 8 },
    saves: ['STR', 'CON'], skills: 'Athletics +8, Perception +4',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 10 ft. 35 (7d8 + 4) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 60/240 ft. 29 (6d8 + 2) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-13',
    invented: true, // no printed plain brute at 13 outside dragons; card + sweep composition
    cr: 13, archetypes: ['brute'],
    ac: 17, ac_offset: -1, hp: 230, hp_scale: 1.1, hp_formula: '20d12 + 100', atk: 10, dc: 17, pb: 5,
    speed: '40 ft.',
    stats: { STR: 20, DEX: 10, CON: 19, INT: 8, WIS: 12, CHA: 8 },
    saves: ['STR', 'CON'], skills: 'Athletics +10, Perception +6',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 45 (9d8 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/240 ft. 38 (8d8 + 2) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *Failure:* 55 (10d10) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-2-charger',
    cite: 'composition after Rhinoceros (CR 2) — the Gore engine, no multiattack',
    style: 'charger',
    cr: 2, archetypes: ['brute'],
    ac: 12, ac_offset: -3, hp: 50, hp_scale: 1.1, hp_formula: '7d10 + 14', atk: 5, dc: 12, pb: 2,
    speed: '40 ft.',
    stats: { STR: 16, DEX: 8, CON: 15, INT: 4, WIS: 10, CHA: 4 },
    saves: ['STR'], skills: 'Athletics +5, Perception +2',
    sections: {
      Actions: [
        { name: 'Melee Attack', imposes: 'Prone', text: '*Melee Attack Roll:* +5, reach 5 ft. 9 (2d8) {damage_type} damage. If the target is a Large or smaller creature and the creature moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) {damage_type} damage and has the Prone condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Trample', rules: true, text: '*Dexterity Saving Throw*: DC 12, one creature within 5 feet that has the Prone condition. *Failure:* 9 (2d8) {damage_type} damage. *Success:* Half damage.' },
      ],
    },
  },
  {
    id: 'brute-5-charger',
    cite: 'composition after Gorgon (CR 5) — charge plus a breath-shaped nova',
    style: 'charger',
    cr: 5, archetypes: ['brute'],
    ac: 14, ac_offset: -2, hp: 100, hp_scale: 1.1, hp_formula: '10d12 + 35', atk: 6, dc: 13, pb: 3,
    speed: '40 ft.',
    stats: { STR: 16, DEX: 10, CON: 16, INT: 4, WIS: 12, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +6, Perception +4',
    sections: {
      Actions: [
        { name: 'Melee Attack', imposes: 'Prone', text: '*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) {damage_type} damage. If the target is a Large or smaller creature and the creature moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) {damage_type} damage and has the Prone condition.' },
        { name: 'Area Breath Attack', text: '*Constitution Saving Throw*: DC 13, each creature in a 30-foot Cone. *Failure:* 22 (5d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Trample', rules: true, text: '*Dexterity Saving Throw*: DC 13, one creature within 5 feet that has the Prone condition. *Failure:* 13 (3d8) {damage_type} damage. *Success:* Half damage.' },
      ],
    },
  },
  {
    id: 'brute-5-grappler',
    cite: 'composition after Giant Crocodile (CR 5) jaws + Giant Toad (CR 1) swallow — print swallows at LOW CR',
    style: 'grappler',
    cr: 5, archetypes: ['brute'],
    ac: 14, ac_offset: -2, hp: 100, hp_scale: 1.1, hp_formula: '10d12 + 35', atk: 6, dc: 13, pb: 3,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 8, CON: 16, INT: 4, WIS: 10, CHA: 4 },
    saves: ['STR'], skills: 'Athletics +6, Perception +3',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', imposes: ['Grappled', 'Restrained'], text: '*Melee Attack Roll:* +6, reach 5 ft. 19 (3d10 + 3) {damage_type} damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        // the swallow engine belongs at the low seat too (the Gullet,
        // 2026-08-26: with no chassis swallow at CR 5, the model
        // improvised its own at 22 Acid/round — over double the priced
        // rate; print's Giant Toad swallows at CR 1)
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], text: 'The creature swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 7 (2d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 15 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 5 feet of movement.' },
      ],
    },
  },
  {
    id: 'brute-8-grappler',
    cite: 'composition after Tyrannosaurus Rex / Purple Worm — the swallow engine',
    style: 'grappler',
    cr: 8, archetypes: ['brute'],
    ac: 15, ac_offset: -2, hp: 150, hp_scale: 1.1, hp_formula: '15d12 + 52', atk: 8, dc: 15, pb: 3,
    speed: '40 ft.',
    stats: { STR: 20, DEX: 8, CON: 17, INT: 4, WIS: 12, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +8, Perception +4',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', imposes: ['Grappled', 'Restrained'], text: '*Melee Attack Roll:* +8, reach 10 ft. 27 (4d10 + 5) {damage_type} damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], text: 'The creature swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 10 (3d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 25 damage or more on a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 10 feet of movement.' },
      ],
    },
  },
  {
    id: 'brute-5-juggernaut',
    cite: 'composition after Flesh Golem (CR 5) — the made thing that cannot be unmade',
    style: 'juggernaut',
    cr: 5, archetypes: ['brute'],
    ac: 14, ac_offset: -2, hp: 100, hp_scale: 1.1, hp_formula: '10d12 + 35', atk: 6, dc: 13, pb: 3,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 8, CON: 16, INT: 6, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +6, Perception +3',
    sections: {
      Traits: [
        { name: 'Lightning Absorption', rules: true, text: 'Whenever the creature is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.' },
        { name: 'Immutable Form', rules: true, text: 'The creature can\'t shape-shift.' },
        { name: 'Magic Resistance', rules: true, text: 'The creature has Advantage on saving throws against spells and other magical effects.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 5 ft. 19 (3d10 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-9-juggernaut',
    cite: 'composition after Clay Golem / Stone Golem (CR 9-10)',
    style: 'juggernaut',
    cr: 9, archetypes: ['brute'],
    ac: 15, ac_offset: -2, hp: 165, hp_scale: 1.1, hp_formula: '17d12 + 55', atk: 8, dc: 15, pb: 4,
    speed: '30 ft.',
    stats: { STR: 18, DEX: 8, CON: 17, INT: 6, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +8, Perception +4',
    sections: {
      Traits: [
        { name: 'Acid Absorption', rules: true, text: 'Whenever the creature is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt.' },
        { name: 'Immutable Form', rules: true, text: 'The creature can\'t shape-shift.' },
        { name: 'Siege Monster', rules: true, text: 'The creature deals double damage to objects and structures.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 10 ft. 35 (7d8 + 4) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* 45 (10d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  // --- the high-CR expansion (2026-08-27): boss seats + line ceilings.
  // The armor-for-meat discount SHRINKS with CR (sweep: -3 at 2, -2 mid,
  // 0 by the golem/titan tier where print AC meets or beats the card).
  {
    id: 'brute-11-charger',
    invented: true, // no printed charger above the Gorgon; Gore-family composition scaled
    style: 'charger',
    cr: 11, archetypes: ['brute'],
    ac: 15, ac_offset: -2, hp: 198, hp_scale: 1.1, hp_formula: '22d10 + 77', atk: 9, dc: 16, pb: 4,
    speed: '50 ft.',
    stats: { STR: 20, DEX: 10, CON: 18, INT: 5, WIS: 12, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +9, Perception +5',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', imposes: 'Prone', text: '*Melee Attack Roll:* +9, reach 10 ft. 27 (4d10 + 5) {damage_type} damage. If the target is a Large or smaller creature and the creature moved 20+ feet straight toward it immediately before the hit, the target takes an extra 11 (2d10) {damage_type} damage and has the Prone condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 16, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Trample', rules: true, text: '*Dexterity Saving Throw*: DC 16, one creature within 5 feet that has the Prone condition. *Failure:* 18 (4d8) {damage_type} damage. *Success:* Half damage.' },
      ],
    },
  },
  {
    id: 'brute-15-grappler',
    cite: 'composition after Purple Worm (CR 15) — the swallow engine at boss scale',
    style: 'grappler',
    cr: 15, archetypes: ['brute'],
    ac: 17, ac_offset: -1, hp: 252, hp_scale: 1.05, hp_formula: '24d12 + 96', atk: 11, dc: 18, pb: 5,
    speed: '40 ft.',
    stats: { STR: 22, DEX: 8, CON: 19, INT: 4, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +11, Perception +5',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', imposes: ['Grappled', 'Restrained'], text: '*Melee Attack Roll:* +11, reach 10 ft. 55 (11d8 + 6) {damage_type} damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 18). While Grappled, the target has the Restrained condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 18, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], text: 'The creature swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 17 (5d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 35 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 10 feet of movement.' },
      ],
    },
  },
  {
    id: 'brute-16-juggernaut',
    cite: 'composition after Iron Golem (CR 16) — print AC meets the card at this tier',
    style: 'juggernaut',
    cr: 16, archetypes: ['brute'],
    ac: 19, ac_offset: 0, hp: 268, hp_scale: 1.05, hp_formula: '24d12 + 112', atk: 12, dc: 19, pb: 5,
    speed: '30 ft.',
    stats: { STR: 24, DEX: 8, CON: 20, INT: 6, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +12, Perception +5',
    sections: {
      Traits: [
        { name: 'Fire Absorption', rules: true, text: 'Whenever the creature is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.' },
        { name: 'Immutable Form', rules: true, text: 'The creature can\'t shape-shift.' },
        { name: 'Siege Monster', rules: true, text: 'The creature deals double damage to objects and structures.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 58 (13d8) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  // THE LEGENDARY STYLE SEATS (owner, 2026-09-01: "a sub archetype for
  // every CR" — the skirmisher rule, every style line carries a legendary
  // top seat, applied to brute after the Fused Monarchy drew a CR-16
  // non-legendary juggernaut at CR 21). One seat per line at 17, the brute
  // family's legendary boundary, mirroring skirmisher's one-per-line 18s.
  // Melee-only lines swap the plain menu's Legendary Ranged Attack for a
  // style-flavored control option — the third slot stays control-only.
  {
    id: 'brute-17-charger',
    invented: true, // no printed charger boss — the Gorgon line under a giant-king legendary menu
    legendary: true,
    style: 'charger',
    cr: 17, archetypes: ['brute'],
    ac: 17, ac_offset: -2, hp: 238, hp_scale: 1.1, hp_formula: '25d12 + 75', atk: 12, dc: 19, pb: 6,
    speed: '50 ft.',
    stats: { STR: 22, DEX: 10, CON: 18, INT: 5, WIS: 12, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +12, Perception +7',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', imposes: 'Prone', text: '*Melee Attack Roll:* +12, reach 10 ft. 42 (8d8 + 6) {damage_type} damage. If the target is a Large or smaller creature and the creature moved 20+ feet straight toward it immediately before the hit, the target takes an extra 18 (4d8) {damage_type} damage and has the Prone condition.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Trample', rules: true, text: '*Dexterity Saving Throw*: DC 19, one creature within 5 feet that has the Prone condition. *Failure:* 22 (4d10) {damage_type} damage. *Success:* Half damage.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Stampede', text: 'The creature moves up to its Speed in a straight line without provoking Opportunity Attacks, and it can move through the spaces of Large or smaller creatures. *Dexterity Saving Throw:* DC 19, each creature whose space it enters. *Failure:* The target is pushed 10 feet out of the creature\'s path.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  {
    id: 'brute-17-grappler',
    cite: 'composition after Kraken (CR 23) — the swallow engine at the legendary tier',
    legendary: true,
    style: 'grappler',
    cr: 17, archetypes: ['brute'],
    ac: 18, ac_offset: -1, hp: 227, hp_scale: 1.05, hp_formula: '22d12 + 84', atk: 12, dc: 19, pb: 6,
    speed: '40 ft.',
    stats: { STR: 22, DEX: 8, CON: 20, INT: 4, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +12, Perception +6',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        // the or-form + ranged twin is the Kraken amendment (critic +
        // owner, 2026-09-01): a legendary grappler must threaten the
        // party members its engine is not currently eating — the Kraken
        // (CR 23) adds its storm on top of its swallow; the Purple Worm
        // shape (CR 15, melee-only, NO nova — grapplers carry no cone by
        // print's own shape, the swallow IS the payoff) holds below the
        // legendary boundary. Do not re-file the missing nova as a gap.
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', imposes: ['Grappled', 'Restrained'], text: '*Melee Attack Roll:* +12, reach 10 ft. 60 (12d8 + 6) {damage_type} damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 19). While Grappled, the target has the Restrained condition.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +12, range 60/240 ft. 49 (11d8) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], text: 'The creature swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 21 (6d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 40 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 10 feet of movement.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Drag', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, carrying each creature it is grappling along with it.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  {
    id: 'brute-17-juggernaut',
    cite: 'composition after Tarrasque (CR 30) — the juggernaut shapes under a legendary menu',
    legendary: true,
    style: 'juggernaut',
    cr: 17, archetypes: ['brute'],
    ac: 19, ac_offset: 0, hp: 227, hp_scale: 1.05, hp_formula: '22d12 + 84', atk: 12, dc: 19, pb: 6,
    speed: '30 ft.',
    stats: { STR: 24, DEX: 8, CON: 20, INT: 6, WIS: 10, CHA: 4 },
    saves: ['STR', 'CON'], skills: 'Athletics +13, Perception +6',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Immutable Form', rules: true, text: 'The creature can\'t shape-shift.' },
        { name: 'Siege Monster', rules: true, text: 'The creature deals double damage to objects and structures.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 58 (13d8) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* 55 (10d10) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Wrecking Path', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  {
    id: 'brute-17-regenerator',
    invented: true, // no printed regenerating boss — Troll composition under a legendary menu
    legendary: true,
    style: 'regenerator',
    cr: 17, archetypes: ['brute'],
    ac: 17, ac_offset: -2, hp: 238, hp_scale: 1.1, hp_formula: '25d12 + 75', atk: 12, dc: 19, pb: 6,
    speed: '30 ft.',
    stats: { STR: 22, DEX: 12, CON: 20, INT: 6, WIS: 10, CHA: 8 },
    saves: ['STR', 'CON'], skills: 'Athletics +12, Perception +6',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Regeneration', rules: true, text: 'The creature regains 20 Hit Points at the start of each of its turns. If the creature takes Acid or Fire damage, this trait doesn\'t function on the creature\'s next turn. The creature dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 46 (9d8 + 6) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Baleful Glare', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  {
    id: 'brute-10-regenerator',
    invented: true, // Troll composition scaled toward the Hydra's tier, no head-count icon
    style: 'regenerator',
    cr: 10, archetypes: ['brute'],
    ac: 15, ac_offset: -2, hp: 182, hp_scale: 1.1, hp_formula: '20d10 + 72', atk: 9, dc: 16, pb: 4,
    speed: '30 ft.',
    stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 8, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +9, Perception +4',
    sections: {
      Traits: [
        { name: 'Regeneration', rules: true, text: 'The creature regains 15 Hit Points at the start of each of its turns. If the creature takes Acid or Fire damage, this trait doesn\'t function on the creature\'s next turn. The creature dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +9, reach 10 ft. 24 (3d12 + 5) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 16, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'brute-17',
    invented: true, // no printed non-dragon brute boss at 17 — giant-king composition, legendary menu
    legendary: true,
    cr: 17, archetypes: ['brute'],
    ac: 18, ac_offset: -1, hp: 238, hp_scale: 1.1, hp_formula: '25d12 + 75', atk: 12, dc: 19, pb: 6,
    speed: '40 ft.',
    stats: { STR: 22, DEX: 8, CON: 20, INT: 10, WIS: 14, CHA: 12 },
    saves: ['STR', 'CON', 'WIS'], skills: 'Athletics +12, Perception +8',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 46 (9d8 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +12, range 60/240 ft. 39 (6d10 + 6) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* 55 (10d10) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  {
    id: 'brute-21',
    invented: true, // titan-tier composition after the Tarrasque's shapes; the discount is gone up here
    legendary: true,
    cr: 21, archetypes: ['brute'],
    ac: 20, ac_offset: 0, hp: 383, hp_scale: 1.05, hp_formula: '35d12 + 156', atk: 14, dc: 21, pb: 7,
    speed: '40 ft.',
    stats: { STR: 24, DEX: 10, CON: 24, INT: 10, WIS: 14, CHA: 14 },
    saves: ['STR', 'CON', 'WIS'], skills: 'Athletics +14, Perception +9',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +14, reach 10 ft. 56 (11d8 + 7) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +14, range 60/240 ft. 44 (8d10) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 21, each creature in a 60-foot Cone. *Failure:* 63 (14d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 21, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Ground Stomp', imposes: 'Prone', text: '*Strength Saving Throw*: DC 21, each creature within 10 feet of the creature. *Failure:* The target has the Prone condition.' },
      ],
    },
  },
  // ===== THE CASTER FAMILY (corpus sweep 2026-09-02, owner + critic
  // counter-offer ratified: ONE chassis family; the Artillery and
  // Controller menu entries are style PRIORS over this pool, not
  // separate archetypes — neither exists as a body plan in the 2024 SRD).
  // Family laws, measured (n=49 Spellcasting blocks): damage lives in
  // ATTACK ROWS (49/49 — never the spell list); the signature grammar is
  // the HYBRID row ("Melee or Ranged Attack Roll: +X, reach 5 ft. or
  // range 120 ft."); multiattack scales like a martial's (Mage x3,
  // Archmage x4); at-will damage spells never exceed sustained row
  // output; the nova is a gated save-damage EMANATION, not a spell;
  // the defensive trade is the INVERSE of brute's — AC -1..-2, HP
  // 0.8-0.9x, DPR at-to-above card (glass cannon). Casters keep their
  // print reaction (the Mage's Protective Magic shape) — the no-reaction
  // law is brute's, never this family's.
  // Lines: plain = burst-mage (Artillery's prior), 'warpriest' = the
  // armored twin-attack shape, 'binder' = the or-form ray/debuff shape
  // (Controller's prior).
  {
    id: 'caster-6',
    cite: 'composition after Mage (CR 6) — three Arcane Bursts and the utility list',
    cr: 6, archetypes: ['caster'],
    // hp_scale 0.8 -> 0.85 (druid smoke 2026-10-18). This seat is the floor caster
    // from CR 3 up, and at CR 5 the card's 90 x 0.8 scaled to 71 — under print's
    // effective floor of 75 (n=52), the lurker-5 defect one donor over. Print's
    // Mage at its own CR 6 is 0.77 of card (81, print's own floor there); 0.85
    // gives 89 at CR 6 and 77 at CR 5, over the floor at every CR this seat serves.
    ac: 15, ac_offset: -1, hp: 89, hp_scale: 0.85, hp_formula: '14d8 + 26', atk: 7, dc: 14, pb: 3,
    speed: '30 ft.',
    stats: { STR: 9, DEX: 14, CON: 12, INT: 17, WIS: 12, CHA: 11 },
    saves: ['INT', 'WIS'], skills: 'Arcana +6, Perception +4',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Hybrid Attack attacks.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 120 ft. 16 (3d8 + 3) {damage_type} damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 14, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      Reactions: [
        { name: 'Protective Magic (3/Day)', rules: true, text: '*Trigger:* The creature is hit by an attack roll. *Response:* The creature casts *Shield* in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.' },
      ],
    },
  },
  {
    id: 'caster-12',
    cite: 'composition after Archmage (CR 12) — four bursts, DPR above the card, the glass cannon',
    cr: 12, archetypes: ['caster'],
    ac: 17, ac_offset: -1, hp: 166, hp_scale: 0.85, hp_formula: '27d8 + 44', atk: 10, dc: 17, pb: 4,
    speed: '30 ft.',
    stats: { STR: 10, DEX: 14, CON: 14, INT: 20, WIS: 15, CHA: 16 },
    saves: ['INT', 'WIS'], skills: 'Arcana +9, Perception +6',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes four Hybrid Attack attacks.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. 27 (4d10 + 5) {damage_type} damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      Reactions: [
        { name: 'Protective Magic (3/Day)', rules: true, text: '*Trigger:* The creature is hit by an attack roll. *Response:* The creature casts *Shield* in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.' },
      ],
    },
  },
  {
    id: 'caster-21',
    cite: 'composition after Lich (CR 21) — the printed legendary caster boss: bursts, a touch, the emanation',
    legendary: true,
    cr: 21, archetypes: ['caster'],
    ac: 20, ac_offset: 0, hp: 314, hp_scale: 0.86, hp_formula: '51d8 + 85', atk: 14, dc: 21, pb: 7,
    speed: '30 ft.',
    stats: { STR: 11, DEX: 16, CON: 14, INT: 24, WIS: 17, CHA: 16 },
    saves: ['INT', 'WIS', 'CON'], skills: 'Arcana +14, Perception +10',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Hybrid Attack or Melee Attack in any combination.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +14, reach 5 ft. or range 120 ft. 42 (6d12 + 3) {damage_type} damage.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +14, reach 5 ft. 42 (12d6) {damage_type} damage, and the target has the {condition_minor} condition until the start of the creature\'s next turn.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 21, each creature in a 20-foot Emanation originating from the creature. *Failure:* 63 (14d8) {damage_type} damage. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 21):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 21, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      Reactions: [
        { name: 'Protective Magic (3/Day)', rules: true, text: '*Trigger:* The creature is hit by an attack roll. *Response:* The creature casts *Shield* in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Blast', text: 'The creature makes one Hybrid Attack attack.' },
        { name: 'Legendary Shift', text: 'The creature teleports up to 30 feet to an unoccupied space it can see. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Dread', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 21, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'caster-2-warpriest',
    cite: 'composition after Priest (CR 2) — mace-and-flame twins with the energy rider',
    style: 'warpriest',
    cr: 2, archetypes: ['caster'],
    ac: 13, ac_offset: -2, hp: 38, hp_scale: 0.85, hp_formula: '7d8 + 7', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 12, DEX: 10, CON: 12, INT: 11, WIS: 16, CHA: 13 },
    saves: ['WIS'], skills: 'Perception +5, Religion +4',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 60 ft. 7 (2d6) {damage_type} damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 12):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'caster-10-warpriest',
    cite: 'composition after Deva (CR 10) — two radiant-rider strikes on an armored chassis',
    style: 'warpriest',
    cr: 10, archetypes: ['caster'],
    ac: 16, ac_offset: -1, hp: 140, hp_scale: 0.85, hp_formula: '24d8 + 32', atk: 9, dc: 16, pb: 4,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 12, CON: 13, INT: 12, WIS: 20, CHA: 16 },
    saves: ['WIS', 'CHA'], skills: 'Perception +8, Religion +6',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +9, reach 5 ft. 37 (6d10 + 4) {damage_type} damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 16, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'caster-21-warpriest',
    cite: 'composition after Solar (CR 21) — the returning hybrid blade under a legendary menu',
    legendary: true,
    style: 'warpriest',
    cr: 21, archetypes: ['caster'],
    ac: 20, ac_offset: 0, hp: 299, hp_scale: 0.82, hp_formula: '46d8 + 92', atk: 14, dc: 21, pb: 7,
    speed: '40 ft.',
    stats: { STR: 22, DEX: 16, CON: 15, INT: 16, WIS: 24, CHA: 20 },
    saves: ['WIS', 'CHA', 'CON'], skills: 'Perception +12, Religion +10',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Hybrid Attack attacks.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +14, reach 5 ft. or range 120 ft. 58 (9d10 + 9) {damage_type} damage. *Hit or Miss:* The weapon magically returns to the creature\'s hand.' },
        { name: 'Area Nova', text: '*Constitution Saving Throw*: DC 21, each creature in a 20-foot Emanation originating from the creature. *Failure:* 63 (14d8) {damage_type} damage. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 21, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Strike', text: 'The creature makes one Hybrid Attack attack.' },
        { name: 'Legendary Step', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Rebuke', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 21, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'caster-8-binder',
    cite: 'composition after Spirit Naga (CR 8) — the or-form bite-and-ray with the debuff single',
    style: 'binder',
    cr: 8, archetypes: ['caster'],
    ac: 16, ac_offset: -1, hp: 121, hp_scale: 0.9, hp_formula: '18d10 + 22', atk: 8, dc: 15, pb: 3,
    speed: '30 ft.',
    stats: { STR: 14, DEX: 15, CON: 13, INT: 14, WIS: 15, CHA: 18 },
    saves: ['CHA', 'WIS'], skills: 'Perception +5, Deception +7',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 20 (3d10 + 4) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 60 ft. 17 (5d6) {damage_type} damage.' },
        { name: 'Debuff Ray', text: '*Constitution Saving Throw*: DC 15, one creature within 60 feet. *Failure:* 18 (4d8) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'caster-17-binder',
    cite: 'composition after Sphinx of Valor (CR 17) — the roar-nova controller under a legendary menu',
    legendary: true,
    style: 'binder',
    cr: 17, archetypes: ['caster'],
    ac: 18, ac_offset: -1, hp: 194, hp_scale: 0.9, hp_formula: '31d10 + 24', atk: 12, dc: 19, pb: 6,
    speed: '40 ft.',
    stats: { STR: 18, DEX: 15, CON: 14, INT: 18, WIS: 22, CHA: 18 },
    saves: ['WIS', 'INT', 'CON'], skills: 'Perception +12, Arcana +10',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 5 ft. 47 (7d12 + 2) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +12, range 60 ft. 40 (9d8) {damage_type} damage.' },
        { name: 'Area Nova', text: '*Wisdom Saving Throw*: DC 19, each enemy in a 30-foot Emanation originating from the creature. *Failure:* 55 (10d10) {damage_type} damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 19):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Strike', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Prowl', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Glare', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  // ===== THE LURKER FAMILY (corpus sweep 2026-09-04, n~22, CR 1/4-8).
  // Family laws: UNDER-CARD DEFENSES paid by unconventional-defense tech
  // (the Ghost runs AC -5 / HP 0.6x — Incorporeal and hover ARE the
  // armor) balanced by a LIGHT BANE (Sunlight Sensitivity — the family's
  // foil, the regenerator's Acid/Fire analog); the ambush idiom is the
  // INLINE ATTACK-ROLL CONDITION ("+N (with Advantage during the first
  // round of each combat)" — the Doppelganger's opener); the burst is
  // RIDER-HEAVY (Assassin: 1d6+4 plus 5d6 — the rider is the hit); the
  // hide-cycle is CONDITIONED (Shadow Stealth's dim-light gate) —
  // concealment re-entry, never the skirmisher's free mobility.
  // THE FIAT RIDER IS ONE SEAT'S, NOT THE FAMILY'S (critic + corpus,
  // 2026-09-04): "(with Advantage during the first round of each
  // combat)" is verbatim print — but on exactly ONE block of 9 inline-
  // advantage sightings, the Doppelganger, whose DISGUISE is the state
  // it prices (an unrecognized infiltrator can't be worded as
  // "hidden"). The Assassin-shaped seats carry NO advantage rider:
  // their ambush economy is rider damage + the hide-cycle, and hidden-
  // attacker advantage is a CORE RULE print never restates. So the
  // rider lives on lurker-2 (its cite) and the grappled-form on traps
  // (Mimic/Ankheg/Bugbear, 4 print sightings) — never on 5/8/17.
  // Lines: plain = stalker (Assassin/Doppelganger/Phase Spider),
  // 'phantom' (Ghost/Wraith/Specter — incorporeal, drain, sunlight
  // bane), 'trap' (Mimic/Roper/Cloaker — disguise, attach, stationary).
  // No print lurker above CR 8 — the 17 seats are invented, the
  // hide-cycle migrating into the legendary menu (the brute playbook).
  {
    id: 'lurker-2',
    cite: 'composition after Doppelganger (CR 3) — the first-round-advantage opener',
    cr: 2, archetypes: ['lurker'],
    ac: 14, ac_offset: -1, hp: 32, hp_scale: 0.72, hp_formula: '5d8 + 10', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 12, DEX: 16, CON: 14, INT: 11, WIS: 12, CHA: 12 },
    saves: ['DEX'], skills: 'Perception +3, Stealth +7',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5 (with Advantage during the first round of each combat), reach 5 ft. 8 (1d10 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Umbral Step', rules: true, text: 'While in Dim Light or Darkness, the creature takes the Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 40 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    // the mid seat (first smoke, 2026-09-04): lurker-2 served CR 3-6 and
    // dragged the Doppelganger's infiltrator rider onto plain stalkers
    id: 'lurker-5',
    cite: 'composition after Phase Spider (CR 3) — the rider-heavy bite and the phase-cycle bonus action, scaled into the band',
    cr: 5, archetypes: ['lurker'],
    // hp_scale 0.75 -> 0.90 (owner's lurker work, 2026-10-18). At 0.75 the sheet
    // shipped 65 HP at CR 5 (10d8 + 20), under print's effective floor of 75
    // (n=52) and under every print CR 5 creature: the thinnest unmitigated is
    // the Xorn at 84 (AC 19), the thinnest of all the Wraith at 67 raw — which
    // resists six damage types and is immune to two. This donor carried the
    // lurker's thin HP and none of the lurker's payment: the phantom line pays
    // with its defense_suite resistances (lurker-5-phantom at 0.75 reads 102
    // effective), this line pays only with Umbral Step, which the reader now
    // prices at +4 effective AC (the DMG's Shadow Stealth). 0.90 -> 78 on the
    // sheet (12d8 + 24): over the floor, under the Crocodile, and the sheet reads
    // CR 4.5 by the DMG method where 65 read 4. Print pays a trade with HP, never
    // with the attack bonus: of 223 print blocks at CR 1+, 211 sit under the DMG
    // table's HP and 2 under its attack bonus — so this is the lever.
    ac: 15, ac_offset: -1, hp: 78, hp_scale: 0.90, hp_formula: '12d8 + 24', atk: 6, dc: 13, pb: 3,
    speed: '30 ft., Climb 30 ft.',
    stats: { STR: 12, DEX: 18, CON: 14, INT: 12, WIS: 13, CHA: 10 },
    saves: ['DEX'], skills: 'Perception +4, Stealth +10',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 5 ft. 17 (3d8 + 4) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Umbral Step', rules: true, text: 'While in Dim Light or Darkness, the creature takes the Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 40 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    id: 'lurker-8',
    cite: 'composition after Assassin (CR 8) — the rider-heavy burst and the expertise Stealth',
    cr: 8, archetypes: ['lurker'],
    ac: 16, ac_offset: -1, hp: 97, hp_scale: 0.72, hp_formula: '15d8 + 30', atk: 8, dc: 15, pb: 3,
    speed: '30 ft.',
    stats: { STR: 12, DEX: 20, CON: 14, INT: 13, WIS: 14, CHA: 11 },
    saves: ['DEX', 'INT'], skills: 'Perception +5, Stealth +11',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 19 (4d6 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 80/320 ft. 16 (2d10 + 5) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Umbral Step', rules: true, text: 'While in Dim Light or Darkness, the creature takes the Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 40 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
    },
  },
  {
    id: 'lurker-17',
    invented: true, // no printed lurker above CR 8 — the Assassin composition under a legendary menu, the hide-cycle as legendary economy
    legendary: true,
    cr: 17, archetypes: ['lurker'],
    ac: 18, ac_offset: -1, hp: 173, hp_scale: 0.8, hp_formula: '27d8 + 52', atk: 12, dc: 19, pb: 6,
    speed: '40 ft.',
    stats: { STR: 14, DEX: 24, CON: 16, INT: 16, WIS: 18, CHA: 14 },
    saves: ['DEX', 'INT', 'WIS'], skills: 'Perception +10, Stealth +13',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 5 ft. 40 (6d10 + 7) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +12, range 80/320 ft. 34 (6d8 + 7) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Umbral Step', rules: true, text: 'While in Dim Light or Darkness, the creature takes the Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 40 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Stalk', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Vanish', text: 'While in Dim Light or Darkness, the creature takes the Hide action. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Menace', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'lurker-1-phantom',
    cite: 'composition after Specter (CR 1) — the drain touch on the incorporeal frame',
    style: 'phantom',
    cr: 1, archetypes: ['lurker'],
    defense_suite: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Grappled', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] }, // print's incorporeal suite (Specter/Wraith/Ghost) — the tech that pays the 0.7x HP

    ac: 12, ac_offset: -3, hp: 22, hp_scale: 0.72, hp_formula: '5d8', atk: 4, dc: 11, pb: 2,
    speed: '5 ft., Fly 50 ft. (hover)',
    stats: { STR: 1, DEX: 14, CON: 11, INT: 10, WIS: 10, CHA: 11 },
    saves: ['DEX'], skills: 'Stealth +4',
    sections: {
      Traits: [
        { name: 'Incorporeal Movement', rules: true, text: 'The creature can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.' },
        { name: 'Sunlight Sensitivity', rules: true, text: 'While in sunlight, the creature has Disadvantage on ability checks and attack rolls.' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +4, reach 5 ft. 10 (3d6) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'lurker-5-phantom',
    cite: 'composition after Wraith (CR 5) — Life Drain under the sunlight bane',
    style: 'phantom',
    cr: 5, archetypes: ['lurker'],
    defense_suite: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Grappled', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] }, // print's incorporeal suite (Specter/Wraith/Ghost) — the tech that pays the 0.7x HP

    ac: 13, ac_offset: -3, hp: 63, hp_scale: 0.75, hp_formula: '14d8', atk: 6, dc: 13, pb: 3,
    speed: '5 ft., Fly 60 ft. (hover)',
    stats: { STR: 6, DEX: 16, CON: 16, INT: 12, WIS: 14, CHA: 15 },
    saves: ['DEX'], skills: 'Stealth +6',
    sections: {
      Traits: [
        { name: 'Incorporeal Movement', rules: true, text: 'The creature can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.' },
        { name: 'Sunlight Sensitivity', rules: true, text: 'While in sunlight, the creature has Disadvantage on ability checks and attack rolls.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 5 ft. 21 (4d8 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'lurker-17-phantom',
    invented: true, // no printed phantom boss — the Wraith composition under a legendary menu
    legendary: true,
    style: 'phantom',
    cr: 17, archetypes: ['lurker'],
    defense_suite: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Grappled', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] }, // print's incorporeal suite (Specter/Wraith/Ghost) — the tech that pays the 0.7x HP

    ac: 16, ac_offset: -3, hp: 151, hp_scale: 0.7, hp_formula: '33d8 + 3', atk: 12, dc: 19, pb: 6,
    speed: '5 ft., Fly 60 ft. (hover)',
    stats: { STR: 6, DEX: 22, CON: 16, INT: 15, WIS: 17, CHA: 20 },
    saves: ['DEX', 'CHA', 'WIS'], skills: 'Stealth +12, Perception +9',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Incorporeal Movement', rules: true, text: 'The creature can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.' },
        { name: 'Sunlight Sensitivity', rules: true, text: 'While in sunlight, the creature has Disadvantage on ability checks and attack rolls.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 5 ft. 44 (8d8 + 8) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Drift', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Fade', imposes: 'Invisible', text: 'The creature has the Invisible condition until the start of its next turn or until immediately after it makes an attack roll. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Chill', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'lurker-2-trap',
    cite: 'composition after Mimic (CR 2) — disguise, adhesion, and the grappled-prey advantage',
    style: 'trap',
    cr: 2, archetypes: ['lurker'],
    ac: 12, ac_offset: -3, hp: 58, hp_scale: 1.25, hp_formula: '9d8 + 18', atk: 5, dc: 12, pb: 2,
    speed: '20 ft.',
    stats: { STR: 17, DEX: 12, CON: 15, INT: 5, WIS: 13, CHA: 8 },
    saves: ['STR'], skills: 'Stealth +5',
    sections: {
      Traits: [
        { name: 'Adhesive Hide', imposes: 'Grappled', rules: true, text: 'The creature adheres to anything that touches it. A Huge or smaller creature adhered to the creature has the Grappled condition (escape DC 12).' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5 (with Advantage if the target is Grappled by the creature), reach 5 ft. 13 (2d8 + 4) {damage_type} damage.' },
        // the engulf ENGINE, gated on the claim (batch three 2026-09-05:
        // two swallowing traps hand-rolled containment — one inverted the
        // death-exit clause into suicide; the organ knows the direction)
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 7 (2d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 15 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 5 feet of movement.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'False Form', rules: true, text: 'The creature shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.' },
      ],
    },
  },
  {
    id: 'lurker-5-trap',
    cite: 'composition after Roper (CR 5) — reach-tentacle grapples, Reel, and the armored stillness',
    style: 'trap',
    cr: 5, archetypes: ['lurker'],
    ac: 20, ac_offset: 4, hp: 93, hp_scale: 1.03, hp_formula: '11d10 + 33', atk: 6, dc: 13, pb: 3,
    speed: '10 ft., Climb 20 ft.',
    stats: { STR: 18, DEX: 8, CON: 17, INT: 7, WIS: 16, CHA: 6 },
    saves: ['STR'], skills: 'Perception +6, Stealth +5',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks, makes two Grasping Limb attacks, and uses Reel.' }, // the Roper's line: bites, tentacles, Reel — the limb had sat outside the Multiattack (critic, fresh six); the damaging count leads so the budget reads it
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6 (with Advantage if the target is Grappled by the creature), reach 5 ft. 18 (3d8 + 5) {damage_type} damage.' },
        { name: 'Grasping Limb', imposes: 'Grappled', text: '*Melee Attack Roll:* +6, reach 50 ft. The target has the Grappled condition (escape DC 13).' },
        { name: 'Reel', rules: true, text: 'The creature pulls each creature Grappled by it up to 25 feet straight toward it.' },
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 10 (3d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 25 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 5 feet of movement.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'False Form', rules: true, text: 'The creature shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.' },
      ],
    },
  },
  {
    id: 'lurker-8-trap',
    cite: 'composition after Cloaker (CR 8) — the Attach opener under Light Sensitivity',
    style: 'trap',
    cr: 8, archetypes: ['lurker'],
    ac: 14, ac_offset: -3, hp: 91, hp_scale: 0.67, hp_formula: '14d10 + 14', atk: 8, dc: 15, pb: 3,
    speed: '10 ft., Fly 40 ft.',
    stats: { STR: 17, DEX: 15, CON: 14, INT: 13, WIS: 12, CHA: 13 },
    saves: ['DEX'], skills: 'Stealth +5',
    sections: {
      Traits: [
        { name: 'Light Sensitivity', rules: true, text: 'While in Bright Light, the creature has Disadvantage on attack rolls.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8 (with Advantage if the target is Grappled by the creature), reach 10 ft. 24 (3d10 + 8) {damage_type} damage.' },
        { name: 'Attach', imposes: 'Grappled', text: '*Melee Attack Roll:* +8, reach 5 ft. 13 (3d6 + 3) {damage_type} damage. If the target is a Large or smaller creature, the creature attaches to it: the target has the Grappled condition (escape DC 15), and the creature\'s attacks hit only the Grappled target while attached.' },
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 10 (3d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 25 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 5 feet of movement.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'False Form', rules: true, text: 'The creature shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.' },
      ],
    },
  },
  {
    id: 'lurker-17-trap',
    invented: true, // no printed trap boss — the Roper composition under a legendary menu, the armored ambush at scale
    legendary: true,
    style: 'trap',
    cr: 17, archetypes: ['lurker'],
    ac: 21, ac_offset: 2, hp: 227, hp_scale: 1.05, hp_formula: '35d8 + 70', atk: 12, dc: 19, pb: 6,
    speed: '10 ft., Climb 20 ft.',
    stats: { STR: 22, DEX: 10, CON: 19, INT: 10, WIS: 18, CHA: 8 },
    saves: ['STR', 'CON', 'WIS'], skills: 'Perception +10, Stealth +8',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks, makes two Grasping Limb attacks, and uses Reel.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12 (with Advantage if the target is Grappled by the creature), reach 5 ft. 44 (8d8 + 8) {damage_type} damage.' },
        { name: 'Grasping Limb', imposes: 'Grappled', text: '*Melee Attack Roll:* +12, reach 60 ft. The target has the Grappled condition (escape DC 19).' },
        { name: 'Reel', rules: true, text: 'The creature pulls each creature Grappled by it up to 30 feet straight toward it.' },
        { name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creature, and takes 17 (5d6) {damage_type} damage at the start of each of the creature\'s turns. The creature can have only one creature swallowed at a time. If the creature takes 35 damage or more in a single turn from the swallowed creature, the creature must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the creature. If the creature dies, a swallowed creature exits the body Prone by using 10 feet of movement.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'False Form', rules: true, text: 'The creature shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Snap', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Drag', text: 'The creature pulls one creature Grappled by it up to 15 feet straight toward it.' },
        { name: 'Legendary Stillness', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'brute-5-regenerator',
    cite: 'composition after Troll (CR 5) — three claws and the off-switch',
    style: 'regenerator',
    cr: 5, archetypes: ['brute'],
    ac: 14, ac_offset: -2, hp: 100, hp_scale: 1.1, hp_formula: '10d12 + 35', atk: 6, dc: 13, pb: 3,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 12, CON: 16, INT: 6, WIS: 8, CHA: 6 },
    saves: ['STR', 'CON'], skills: 'Athletics +6, Perception +2',
    sections: {
      Traits: [
        { name: 'Regeneration', rules: true, text: 'The creature regains 10 Hit Points at the start of each of its turns. If the creature takes Acid or Fire damage, this trait doesn\'t function on the creature\'s next turn. The creature dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 10 ft. 13 (3d6 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },

  // ==== THE DEFENDER FAMILY (corpus sweep 2026-09-08, owner "go") ====
  // THE PIN AMENDED BY PRINT: the 2026-09-02 design said "reaction-
  // defined protector" — that was 2014 memory. SRD 5.2 retired Parry
  // (0/329; the only Reactions in the corpus are three casters'
  // Protective Magic). Print's 2024 protector package: AC OVER the card
  // (+2..+3, Knight 18 at CR 3 / Guard Captain 18 at CR 4 / Guard 16 at
  // CR 1/8) paid by under-card HP and damage; the WARD as a passive
  // transfer link (Shield Guardian's Bound: "half of any damage the
  // wearer takes (round up) is transferred to the guardian" — no
  // reaction, and print-solo: the ward is table-designated); ally-buff
  // EMANATIONS (Hobgoblin Captain) as the leader half. The warden line
  // prices its tech with a measured damage discount (dpr_scale 0.65 =
  // the Shield Guardian's own 36-of-55). Answer-back economy lives in
  // the LEGENDARY menu (structurally the reaction budget that scales) —
  // the surviving insight of the original pin. Juggernaut stays brute.
  // Lines: plain = soldier (Knight/Guard Captain), 'warden' (Shield
  // Guardian — construct guardian, transfer + Regeneration).
  // ================================================================
  // THE THREE NEW LINES (owner 2026-09-28: "make these new donor templates").
  // Print roles the five families never carried: the ARCHER (primary ranged,
  // a bow not a throw), the LEADER (a modest attacker whose signature is what
  // it does for allies), the SHIFTER (two forms, "(X Form Only)" gates). Card
  // numbers copied from the same-CR donors; composition after the cited
  // print blocks; the wildcard slot and the family's exit row per the spec.
  // ================================================================
  // ----- archer: Scout (CR 1/2) / Hobgoblin Captain's longbow line / Spy -----
  {
    id: 'skirmisher-3-archer',
    cite: 'composition after Scout (CR 1/2, Shortsword + Longbow 150/600) and Spy (CR 1, Cunning Action) scaled to the CR 3 card',
    style: 'archer',
    cr: 3, archetypes: ['skirmisher', 'artillery'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 11, DEX: 16, CON: 12, INT: 11, WIS: 14, CHA: 11 },
    saves: ['DEX'], skills: 'Perception +4, Stealth +5',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 150/600 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 60 feet. *Failure:* 7 (2d6) {damage_type} damage, and the target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8-archer',
    invented: true, // the Scout line at CR 8 — no printed archer sits here; the Archer (2024 MM, CR 3) is not in this corpus
    style: 'archer',
    cr: 8, archetypes: ['skirmisher', 'artillery'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '30 ft.',
    stats: { STR: 12, DEX: 20, CON: 16, INT: 12, WIS: 16, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +6, Stealth +8',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 21 (3d10 + 5) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 150/600 ft. 21 (3d10 + 5) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 60 feet. *Failure:* 10 (3d6) {damage_type} damage, and the target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13-archer',
    invented: true, // the Scout line at CR 13
    style: 'archer',
    cr: 13, archetypes: ['skirmisher', 'artillery'],
    ac: 18, hp: 210, hp_formula: '28d10 + 56', atk: 10, dc: 17, pb: 5,
    speed: '30 ft.',
    stats: { STR: 14, DEX: 22, CON: 14, INT: 12, WIS: 18, CHA: 12 },
    saves: ['DEX', 'WIS'], skills: 'Perception +9, Stealth +11',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 5 ft. 25 (3d12 + 6) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 150/600 ft. 25 (3d12 + 6) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 60 feet. *Failure:* 16 (3d10) {damage_type} damage, and the target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  // ----- leader: Hobgoblin Captain (CR 3) / Bandit Captain (CR 2) / Pirate Captain (CR 6) -----
  {
    id: 'defender-3-leader',
    cite: 'composition after Hobgoblin Captain (CR 3: Aura of Authority + Greatsword/Longbow); the Bandit Captain\'s Parry is retired by the family sweep (2026-09-08: defenders carry no reactions)',
    style: 'leader',
    cr: 3, archetypes: ['defender'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 14, CON: 14, INT: 12, WIS: 11, CHA: 15 }, // STR mod + PB = the card's attack bonus
    saves: ['CON', 'CHA'], skills: 'Athletics +4, Persuasion +4',
    sections: {
      Traits: [
        { name: 'Aura of Authority', rules: true, text: 'While in a 10-foot Emanation originating from the creature, the creature and its allies have Advantage on attack rolls and saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Hybrid Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 30/120 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-8-leader',
    invented: true, // the captain line at CR 8 — Pirate Captain (CR 6) is the nearest print rung
    style: 'leader',
    cr: 8, archetypes: ['defender'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '30 ft.',
    stats: { STR: 20, DEX: 14, CON: 16, INT: 12, WIS: 13, CHA: 18 },
    saves: ['CON', 'CHA'], skills: 'Athletics +7, Persuasion +7',
    sections: {
      Traits: [
        { name: 'Aura of Authority', rules: true, text: 'While in a 10-foot Emanation originating from the creature, the creature and its allies have Advantage on attack rolls and saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Hybrid Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 21 (3d10 + 5) {damage_type} damage.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 30/120 ft. 18 (3d8 + 5) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  // ----- shifter: Werewolf (CR 3) / Weretiger (CR 4) / Doppelganger (CR 3) -----
  {
    id: 'skirmisher-3-shifter',
    cite: 'composition after Werewolf (CR 3: Scratch + gated Bite + Shape-Shift) and Weretiger (CR 4: Prowl)',
    style: 'shifter',
    cr: 3, archetypes: ['skirmisher'],
    ac: 15, hp: 60, hp_formula: '11d8 + 11', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 14, CON: 14, INT: 10, WIS: 11, CHA: 10 },
    saves: ['STR'], skills: 'Perception +2, Stealth +4',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks. It can replace one attack with a Bite Attack attack.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Bite Attack', imposes: 'Poisoned', gate: 'Beast or Hybrid Form Only', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw*: DC 12. *Failure:* The target has the Poisoned condition until the end of its next turn.' },
        { name: 'Signature Slot', imposes: 'Frightened', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* 7 (2d6) {damage_type} damage, and the target has the Frightened condition until the end of its next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Shape-Shift', rules: true, text: 'The creature shape-shifts into a Large beast-humanoid hybrid or a Medium beast, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed.' },
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8-shifter',
    invented: true, // the were line at CR 8 — Werebear (CR 5) is the highest print rung
    style: 'shifter',
    cr: 8, archetypes: ['skirmisher'],
    ac: 17, hp: 135, hp_formula: '18d8 + 54', atk: 8, dc: 15, pb: 3,
    speed: '30 ft.',
    stats: { STR: 20, DEX: 16, CON: 16, INT: 10, WIS: 12, CHA: 10 },
    saves: ['STR', 'CON'], skills: 'Perception +4, Stealth +6',
    sections: {
      Traits: [
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks. It can replace one attack with a Bite Attack attack.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 21 (3d10 + 5) {damage_type} damage.' },
        { name: 'Bite Attack', imposes: 'Poisoned', gate: 'Beast or Hybrid Form Only', text: '*Melee Attack Roll:* +8, reach 5 ft. 21 (3d10 + 5) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw*: DC 15. *Failure:* The target has the Poisoned condition until the end of its next turn.' },
        { name: 'Signature Slot', imposes: 'Frightened', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 10 (3d6) {damage_type} damage, and the target has the Frightened condition until the end of its next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Shape-Shift', rules: true, text: 'The creature shape-shifts into a Large beast-humanoid hybrid or a Medium beast, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed.' },
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  // ----- the three lines' legendary top seats (owner rule 2026-09-01: every style line tops out in a legendary seat) -----
  {
    id: 'skirmisher-18-archer',
    invented: true, // no printed archer boss — the Scout line at the skulker-18 card
    style: 'archer', legendary: true,
    cr: 18, archetypes: ['skirmisher', 'artillery'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '40 ft.',
    stats: { STR: 16, DEX: 26, CON: 14, INT: 14, WIS: 20, CHA: 14 },
    saves: ['DEX', 'WIS'], skills: 'Perception +11, Stealth +14',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 5 ft. 30 (5d8 + 8) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 150/600 ft. 30 (5d8 + 8) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 120 feet. *Failure:* 22 (4d10) {damage_type} damage, and the target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18-shifter',
    invented: true, // no printed were boss — the were line at the skulker-18 card
    style: 'shifter', legendary: true,
    cr: 18, archetypes: ['skirmisher'],
    ac: 20, hp: 285, hp_formula: '38d10 + 76', atk: 13, dc: 20, pb: 6,
    speed: '40 ft.',
    stats: { STR: 24, DEX: 20, CON: 18, INT: 12, WIS: 16, CHA: 14 },
    saves: ['STR', 'CON'], skills: 'Perception +9, Stealth +11',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Mobility Trait', text: 'The creature ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks. It can replace one attack with a Bite Attack attack.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +13, reach 5 ft. 30 (5d8 + 8) {damage_type} damage.' },
        { name: 'Bite Attack', imposes: 'Poisoned', gate: 'Beast or Hybrid Form Only', text: '*Melee Attack Roll:* +13, reach 5 ft. 30 (5d8 + 8) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw*: DC 20. *Failure:* The target has the Poisoned condition until the end of its next turn.' },
        { name: 'Signature Slot', imposes: 'Frightened', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 30 feet. *Failure:* 22 (4d10) {damage_type} damage, and the target has the Frightened condition until the end of its next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Shape-Shift', rules: true, text: 'The creature shape-shifts into a Large beast-humanoid hybrid or a Large beast, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed.' },
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Rend', text: 'The creature makes one Melee Attack attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
  {
    id: 'defender-17-leader',
    invented: true, // no printed captain boss — the leader line at the warden-17 card (the defender family's armor-over-card, meat-over-damage tax)
    style: 'leader', legendary: true,
    cr: 17, archetypes: ['defender'],
    ac: 20, ac_offset: 1, hp: 238, hp_scale: 1.1, hp_formula: '35d8 + 80', atk: 12, dc: 19, pb: 6, dpr_scale: 0.7,
    speed: '30 ft.',
    stats: { STR: 22, DEX: 14, CON: 20, INT: 14, WIS: 16, CHA: 20 },
    saves: ['CON', 'CHA'], skills: 'Athletics +12, Persuasion +11',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Aura of Authority', rules: true, text: 'While in a 10-foot Emanation originating from the creature, the creature and its allies have Advantage on attack rolls and saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 40 (6d10 + 7) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack attack.' },
        { name: 'Legendary Command', text: 'One ally of the creature that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.' },
        { name: 'Legendary Rally', text: 'The creature and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.' },
      ],
    },
  },
  {
    id: 'defender-1',
    cite: 'composition after Guard (CR 1/8) and the Knight\'s armor line — the shield-wall floor',
    cr: 1, archetypes: ['defender'],
    ac: 17, ac_offset: 2, hp: 26, hp_scale: 0.85, hp_formula: '4d8 + 8', atk: 4, dc: 11, pb: 2,
    speed: '30 ft.',
    // stats CARD-COHERENT (critic hold, 2026-09-09): striker mod + PB
    // must equal the stamped attack bonus — every number derives
    stats: { STR: 14, DEX: 11, CON: 14, INT: 10, WIS: 12, CHA: 11 },
    saves: ['CON'], skills: 'Athletics +4, Perception +3',
    sections: {
      Traits: [
        // print files auras as TRAITS (Hobgoblin Captain; owner catch
        // 2026-09-09 — it shipped under Actions for two smokes)
        { name: 'Guard Aura', rules: true, gated_on: 'aura', text: 'While in a 10-foot Emanation originating from the creature, the creature\'s allies have Advantage on saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +4, reach 5 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-3',
    cite: 'composition after Knight (CR 3) — AC 18 over 52 HP, the armor-over-everything trade',
    cr: 3, archetypes: ['defender'],
    ac: 18, ac_offset: 3, hp: 52, hp_scale: 0.87, hp_formula: '8d8 + 16', atk: 5, dc: 12, pb: 2,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 11, CON: 14, INT: 11, WIS: 12, CHA: 14 },
    saves: ['CON', 'WIS'], skills: 'Athletics +5, Perception +3',
    sections: {
      Traits: [
        // print files auras as TRAITS (Hobgoblin Captain; owner catch
        // 2026-09-09 — it shipped under Actions for two smokes)
        { name: 'Guard Aura', rules: true, gated_on: 'aura', text: 'While in a 10-foot Emanation originating from the creature, the creature\'s allies have Advantage on saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +5, range 30/120 ft. 11 (2d10) {damage_type} damage.' }, // thrown-shape: Str-coherent with the stamp (a crossbow can't be)
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-5',
    cite: 'composition after Guard Captain (CR 4) — the hybrid javelin twin, scaled into the band',
    cr: 5, archetypes: ['defender'],
    ac: 19, ac_offset: 3, hp: 78, hp_scale: 0.87, hp_formula: '12d8 + 24', atk: 6, dc: 13, pb: 3,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 12, CON: 14, INT: 11, WIS: 13, CHA: 14 },
    saves: ['STR', 'CON'], skills: 'Athletics +6, Perception +4',
    sections: {
      Traits: [
        // print files auras as TRAITS (Hobgoblin Captain; owner catch
        // 2026-09-09 — it shipped under Actions for two smokes)
        { name: 'Guard Aura', rules: true, gated_on: 'aura', text: 'While in a 10-foot Emanation originating from the creature, the creature\'s allies have Advantage on saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two attacks, using Melee Attack or Hybrid Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 5 ft. 17 (3d8 + 4) {damage_type} damage.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-17',
    invented: true, // no printed defender above CR 7 — the Knight composition under a legendary menu; the parry kit lives THERE (legendary actions are the reaction economy that scales)
    legendary: true,
    cr: 17, archetypes: ['defender'],
    ac: 21, ac_offset: 2, hp: 184, hp_scale: 0.85, hp_formula: '32d8 + 40', atk: 12, dc: 19, pb: 6,
    speed: '30 ft.',
    stats: { STR: 22, DEX: 12, CON: 16, INT: 12, WIS: 16, CHA: 16 },
    saves: ['STR', 'CON', 'WIS'], skills: 'Athletics +12, Perception +9',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Guard Aura', rules: true, gated_on: 'aura', text: 'While in a 10-foot Emanation originating from the creature, the creature\'s allies have Advantage on saving throws, provided the creature doesn\'t have the Incapacitated condition.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three attacks, using Melee Attack or Ranged Attack in any combination.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 40 (6d10 + 7) {damage_type} damage.' },
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +12, range 30/120 ft. 33 (6d8 + 6) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Riposte', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Brace', text: 'The creature takes the Dodge action. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Rebuke', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, one creature within 5 feet. *Failure:* The target is pushed up to 15 feet away from the creature and has the Prone condition.' },
      ],
    },
  },
  {
    id: 'defender-3-warden',
    invented: true, // no printed warden below the Shield Guardian — its Bound composition at the band's entry
    style: 'warden',
    cr: 3, archetypes: ['defender'],
    ac: 15, ac_offset: 0, hp: 66, hp_scale: 1.1, hp_formula: '12d8 + 12', atk: 5, dc: 12, pb: 2, dpr_scale: 0.8,
    speed: '30 ft.',
    stats: { STR: 16, DEX: 8, CON: 13, INT: 6, WIS: 12, CHA: 5 },
    saves: ['CON'], skills: 'Perception +3',
    sections: {
      // THE WARD RE-SEAT (owner, 2026-09-09: "isn't warding bond a
      // spell?"): the transfer link is the Shield Guardian SEAT's
      // signature (amulet grammar, below), never the family default —
      // the invented seats keep their trait space for the wildcard's
      // creative defenses, and the bodyguard-link fantasy travels as
      // Warding Bond the SPELL on the defender checkbox menu.
      Traits: [
        { name: 'Regeneration', rules: true, text: 'The creature regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Aegis', gate: '2/Day', text: 'The creature targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-7-warden',
    cite: 'composition after Shield Guardian (CR 7) — Bound transfer, Regeneration, the measured 0.65 damage discount',
    style: 'warden',
    cr: 7, archetypes: ['defender'],
    ac: 17, ac_offset: 1, hp: 142, hp_scale: 1.18, hp_formula: '15d10 + 60', atk: 7, dc: 14, pb: 3, dpr_scale: 0.65,
    speed: '30 ft.',
    stats: { STR: 18, DEX: 8, CON: 18, INT: 7, WIS: 10, CHA: 3 },
    saves: ['CON'], skills: 'Perception +3',
    sections: {
      Traits: [
        // GENERIC BY OWNER RULING (2026-09-09, after live concept-filled
        // blocks named "the child empress" and "the sealed crypt door"):
        // statblocks are REUSABLE — a named ward makes the block
        // single-use; the DM designates the ward at the table. The
        // {ward} concept-fill was built, shipped once, and reverted —
        // do not re-derive it.
        { name: 'Ward Bond', rules: true, text: 'The creature is magically bound to a ward of its choosing, and it can have only one ward at a time. While the creature is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the creature.' },
        { name: 'Regeneration', rules: true, text: 'The creature regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +7, reach 10 ft. 18 (4d6 + 4) {damage_type} damage.' },
        { name: 'Aegis', gate: '2/Day', text: 'The creature targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'defender-17-warden',
    invented: true, // no printed warden boss — the immovable force (owner design 2026-09-10), carrying a DEFENSE ENGINE the concept picks: 'rampart' (Balor 5-ft Emanation aura + a raised wall, ally-sparing per the Azer) or 'punisher' (a Trigger/Response counter on the STANDARD one-reaction economy — the family's "answers back" sentence, finally literal; Reactive was cut at the critic's hold 2026-09-10: the Marilith pairs Reactive with a PARRY, never a damage reaction, and an every-turn counter scales with the party instead of the card). Engine rows sit OUTSIDE the damage budget like gated organs: the 0.7 ward tax prices the slams alone, and the chosen engine restores effective output toward the card BOUNDED (aura ~2x14/round, or ONE riposte ~40/round) — the wall that hurts to touch, by design not by accident.
    legendary: true,
    style: 'warden',
    cr: 17, archetypes: ['defender'],
    ac: 20, ac_offset: 1, hp: 238, hp_scale: 1.1, hp_formula: '35d8 + 80', atk: 12, dc: 19, pb: 6, dpr_scale: 0.7,
    speed: '20 ft.',
    stats: { STR: 22, DEX: 8, CON: 20, INT: 8, WIS: 14, CHA: 3 },
    saves: ['STR', 'CON'], skills: 'Perception +8',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Regeneration', rules: true, text: 'The creature regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.' },
        // the anchor in the Rakshasa's auto-success grammar (the
        // coaching's blessed form, now chassis)
        { name: 'Immovable', rules: true, text: 'The creature automatically succeeds on saving throws made to avoid being moved against its will, and it can\'t have the Prone condition.' },
        // RAMPART engine: the Balor's 5-foot Emanation aura with the
        // Azer's ally-sparing choice clause, verbatim grammar
        { name: 'Rampart Aura', engine: 'rampart', text: 'At the end of each of the creature\'s turns, each creature of the creature\'s choice in a 5-foot Emanation originating from the creature takes 14 (4d6) {damage_type} damage.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 40 (6d10 + 7) {damage_type} damage.' },
        { name: 'Aegis', gate: '2/Day', text: 'The creature targets itself or one creature it can see within 60 feet. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the creature\'s next turn.' },
        // RAMPART engine: the wall row, metered the print way (the
        // Gatekeeper's wildcard built this shape unprompted; as chassis
        // it gets "(Recharge 5-6)" instead of the recharge-by-bleeding
        // dialect)
        { name: 'Raise Wall', engine: 'rampart', gate: 'Recharge 5-6', text: 'The creature raises a solid rampart 30 feet long, 10 feet high, and 1 foot thick in a line within 60 feet of itself. Each creature in the line\'s space is pushed to one side of the line (target\'s choice). The rampart provides Three-Quarters Cover to creatures behind it, blocks movement through it, and crumbles at the start of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      Reactions: [
        // PUNISHER engine: the priced counter the Parry retirement left
        // room for — attacking it (or its charge) is how you get hurt
        { name: 'Punishing Counter', engine: 'punisher', text: '*Trigger:* A creature within 10 feet of the creature hits it or an ally of the creature with an attack roll. *Response:* The creature makes one Melee Attack attack against the triggering creature.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Riposte', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Brace', text: 'The creature takes the Dodge action. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Rebuke', imposes: 'Prone', text: '*Strength Saving Throw*: DC 19, one creature within 5 feet. *Failure:* The target is pushed up to 15 feet away from the creature and has the Prone condition.' },
      ],
    },
  },

  // ==== BODY TYPES (owner design + corpus sweep 2026-09-11) ====
  // A body OUTRANKS a role: the resolve's "body" field routes here
  // regardless of archetype. DRAGON: 42 print true dragons CR 1-24,
  // pure composition (breath = gated Cone nova in the CONCEPT's energy;
  // the element becomes an IMMUNITY at assembly). OOZE: print stops at
  // the Black Pudding (CR 4) — AC 6-9, the deepest armor trade in the
  // corpus, paid by Amorphous + Corrosive Form; invented seats above.
  // SWARM: print stops at CR 3 — the Swarm rules trait + the Bloodied
  // damage split + the 8-condition suite (defense_suite, the phantom
  // precedent); invented seats above.
  {
    id: 'dragon-2',
    cite: 'composition across the ten wyrmlings (CR 1-4) — bite, breath, wings',
    cr: 2, archetypes: ['dragon'],
    ac: 17, ac_offset: 2, hp: 49, hp_scale: 1.1, hp_formula: '9d8 + 9', atk: 5, dc: 12, pb: 2,
    speed: '30 ft., Fly 60 ft.',
    stats: { STR: 16, DEX: 12, CON: 14, INT: 12, WIS: 12, CHA: 14 },
    saves: ['DEX', 'WIS'], skills: 'Perception +3, Stealth +3',
    sections: {
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) {damage_type} damage.' },
        { name: 'Breath Weapon', gate: 'Recharge 5-6', text: '*Dexterity Saving Throw*: DC 12, each creature in a 15-foot Cone. *Failure:* 18 (4d8) {damage_type} damage. *Success:* Half damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'dragon-8',
    cite: 'composition across the ten young dragons (CR 6-10)',
    cr: 8, archetypes: ['dragon'],
    ac: 18, ac_offset: 1, hp: 148, hp_scale: 1.1, hp_formula: '17d10 + 55', atk: 8, dc: 15, pb: 3,
    speed: '40 ft., Fly 80 ft.',
    stats: { STR: 20, DEX: 12, CON: 18, INT: 14, WIS: 12, CHA: 16 },
    saves: ['DEX', 'WIS'], skills: 'Perception +5, Stealth +4',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 10 ft. 15 (2d8 + 6) {damage_type} damage.' },
        { name: 'Breath Weapon', gate: 'Recharge 5-6', text: '*Dexterity Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* 40 (9d8) {damage_type} damage. *Success:* Half damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    // THE CR 10-16 DEFENDER GAP (owner's go, 2026-10-29, after the legend12 probe).
    // The twelve put a defender-shaped CR 15 concept on `defender-5` — a CR 5
    // chassis stretched TEN CRs, worse than the `lurker-8`-at-CR-13 case the
    // lurker rung was added for. Measured: the defender family had NO donor
    // anywhere in CR 10-16 (nor did swarm, ooze or controller), while brute had 5
    // and skirmisher 6, all at CR 13 — which is also why band concepts misroute
    // to those archetypes.
    //
    // NON-LEGENDARY ON PURPOSE. Print's CR 12-16 defenders are the Rakshasa (CR
    // 13, AC 17, HP 221), the Ice Devil (CR 14, AC 18, HP 228) and the Iron Golem
    // (CR 16, AC 20, HP 252) — not one of them has legendary actions. Only the
    // dragons, the Vampire and the Mummy Lord do in that band, which the two
    // legendary rungs added above already mirror.
    //
    // Numbered to the plain CR 13 card (hp 210, dpr 100, atk 10, ac 18, dc 17):
    // the defender law is AC OVER the card paid by under-card HP, so ac_offset +2
    // at AC 20, and hp_scale 0.86 clears print's own CR 13 floor of 170.
    id: 'defender-13',
    cite: 'composition after Rakshasa (CR 13) and Ice Devil (CR 14) — print\'s CR 13-16 defenders: high AC, a ward, no legendary kit',
    cr: 13, archetypes: ['defender'],
    ac: 20, ac_offset: 2, hp: 181, hp_scale: 0.86, hp_formula: '19d10 + 76', atk: 10, dc: 17, pb: 5,
    speed: '30 ft.',
    stats: { STR: 20, DEX: 14, CON: 20, INT: 14, WIS: 16, CHA: 16 },
    saves: ['CON', 'WIS'], skills: 'Athletics +10, Perception +8',
    sections: {
      Traits: [
        { name: 'Magic Resistance', text: 'The creature has Advantage on saving throws against spells and other magical effects.' },
        // the leader half's grammar, filed as print files auras — a trait
        // `gated_on: 'aura'` is how the claim gate finds it — an ally-buff
        // emanation ships only when the concept claims one (Hobgoblin Captain's
        // grammar), and the defender shape law looks it up by this stamp
        // `rules: true` as every other defender's aura carries it — a rules row is
        // exempt from the rename pass. Without it the engine tried to rename this
        // and threw "unrenamed entry: Aura of Authority", which took down six
        // tests the moment this donor became reachable.
        { name: 'Aura of Authority', rules: true, gated_on: 'aura', text: 'While in a 10-foot Emanation originating from the creature, the creature and its allies have Advantage on saving throws against being Charmed or Frightened.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 10 ft. 28 (4d10 + 6) {damage_type} damage plus 22 (4d10) {energy_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    // THE CR 13-16 LEGENDARY GAP (owner's go, 2026-10-29: "where we're under we
    // should pump up and I think it's because we're missing legendaries in the
    // 10-16 range... mostly dragons and like a vampire/mummy lord", then "adding
    // is better than subtracting").
    //
    // Measured: 10 of print's 18 blocks at CR 13-16 are legendary (56%), and a
    // legendary block there carries 8.3 rows against 5.4 without — about three
    // rows, which is the whole of the shortfall. Our own five forties since
    // 2026-10-25 shipped legendaries on 22% of CR 13-16 sheets and ran 6.5 rows
    // against print's 7.0, the one band where we sit UNDER print.
    //
    // The cause was the donor table, not a gate: 1 of 10 donors in the band had a
    // Legendary Actions section (`dragon-15`), and the band had no lurker or
    // caster chassis at all — print's Vampire routed to `lurker-8` and stretched
    // five CRs. Print's own non-dragon legendaries at CR 13-16 are exactly two,
    // the Vampire and the Mummy Lord, so these two donors mirror that population
    // rather than inventing one. Nothing is removed; CR 17-20 keeps all 21 of its
    // legendary donors.
    //
    // SHAPED after print's Vampire — AC under the card, Climb speed, the grave
    // strike, the beguiling — but NUMBERED to the CR card, which is what every
    // donor obeys (`cardBudget(13, {legendary:true})` = hp 168, dpr 145, atk 10,
    // ac 18, dc 17). Print's own Vampire sits well under that card at AC 16 /
    // HP 195 / +9, so copying its figures would have failed `donors.spec.js` on
    // four counts. The lurker law is "defenses UNDER the card, paid by tech", so
    // the AC offset is negative and hp_scale sits below 1.
    id: 'lurker-13',
    cite: 'composition after Vampire (CR 13) — print\'s non-dragon legendary lurker: the grave strike, the shape-shift, the beguiling',
    legendary: true,
    cr: 13, archetypes: ['lurker'],
    // HP answers to BOTH laws: print's thinnest CR 13 block (170 over the spec's
    // 11-block window) is the floor, and the legendary card is 168, so the lurker's
    // under-card discount is paid in AC (-2) rather than in meat.
    // hp_scale is what the HP floor reads (`cardBudget(13).hp * hp_scale` against
    // print's thinnest CR 13 block x 0.95 = 161.5), so 0.95 came out at 160 and
    // failed by a point and a half; 0.98 clears it and still sits under the card.
    ac: 16, ac_offset: -2, hp: 170, hp_scale: 0.98, hp_formula: '20d8 + 80', atk: 10, dc: 17, pb: 5,
    speed: '40 ft., Climb 40 ft.',
    stats: { STR: 18, DEX: 20, CON: 18, INT: 17, WIS: 15, CHA: 18 },
    // THE CHASSIS IS NOT THE VAMPIRE. Its own skills follow its own card (DEX 20,
    // PB 5), and carry a third the Vampire has not — so when a Vampire rides this
    // chassis, print canon still has something to install. Authoring these as
    // print's exact pair made the derived line identical and the revision silently
    // stopped firing, which is what `pipelines.spec.js` pins.
    saves: ['DEX', 'CHA'], skills: 'Perception +7, Stealth +10, Acrobatics +10',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +10, reach 5 ft. 26 (4d10 + 4) {damage_type} damage plus 22 (4d10) {energy_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        // every lurker line pays for its under-card defenses with the family's
        // own ambush grammar, and the reader prices it
        { name: 'Umbral Step', rules: true, text: 'While in Dim Light or Darkness, the creature takes the Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Lunge', text: 'The creature moves up to half its Speed, and it makes one Melee Attack attack.' },
        { name: 'Legendary Withdraw', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dread', imposes: 'Frightened', duration: 'target_end', text: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    // SHAPED after print's Mummy Lord — the glare, the rotting fist, magic
    // resistance, a spell row aboard — and NUMBERED to the card
    // (`cardBudget(15, {legendary:true})` = hp 192, dpr 170, atk 11, ac 18,
    // dc 18). The caster law is the glass cannon: HP under the card, the spell
    // row present, the mind stats high.
    id: 'caster-15',
    cite: 'composition after Mummy Lord (CR 15) — print\'s non-dragon legendary caster: the glare, the rotting fist, the dread command',
    legendary: true,
    cr: 15, archetypes: ['caster'],
    // print's thinnest CR 15 block is 184 (the spec's 12-block window), and the
    // legendary card is 192 — so the glass-cannon discount is small here and paid
    // mostly in AC. A legendary block already trades HP for action economy.
    ac: 17, ac_offset: -1, hp: 187, hp_scale: 0.95, hp_formula: '22d8 + 88', atk: 11, dc: 18, pb: 5,
    speed: '30 ft.',
    stats: { STR: 14, DEX: 12, CON: 18, INT: 20, WIS: 19, CHA: 16 },
    saves: ['WIS', 'INT'], skills: 'Perception +9, Religion +5',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Magic Resistance', text: 'The creature has Advantage on saving throws against spells and other magical effects.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Hybrid Attack attacks.' },
        { name: 'Hybrid Attack', text: '*Melee or Ranged Attack Roll:* +11, reach 5 ft. or range 120 ft. 30 (4d12 + 4) {damage_type} damage plus 27 (6d8) {energy_type} damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 18):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 18, one creature within 60 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Strike', text: 'The creature makes one Hybrid Attack attack.' },
        { name: 'Legendary Step', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dread', imposes: 'Frightened', duration: 'target_end', text: '*Wisdom Saving Throw*: DC 18, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'dragon-15',
    cite: 'composition across the ten adult dragons (CR 13-17) — the legendary tier begins',
    legendary: true,
    cr: 15, archetypes: ['dragon'],
    ac: 19, ac_offset: 1, hp: 202, hp_scale: 1.05, hp_formula: '25d12 + 40', atk: 11, dc: 18, pb: 5,
    speed: '40 ft., Fly 80 ft.',
    stats: { STR: 24, DEX: 12, CON: 22, INT: 16, WIS: 14, CHA: 18 },
    saves: ['DEX', 'WIS'], skills: 'Perception +9, Stealth +6',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +11, reach 10 ft. 33 (4d12 + 7) {damage_type} damage.' },
        { name: 'Breath Weapon', gate: 'Recharge 5-6', text: '*Dexterity Saving Throw*: DC 18, each creature in a 60-foot Cone. *Failure:* 58 (13d8) {damage_type} damage. *Success:* Half damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC {dc}):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' }, // every 2024 adult+ dragon casts; labeled + DC per print (critic 2026-09-14 x2)
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 18, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Strike', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Wing Beat', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dread', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 18, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'dragon-22',
    cite: 'composition across the ten ancient dragons (CR 20-24)',
    legendary: true,
    cr: 22, archetypes: ['dragon'],
    ac: 21, ac_offset: 1, hp: 440, hp_scale: 1.06, hp_formula: '35d20 + 72', atk: 15, dc: 22, pb: 7,
    speed: '40 ft., Fly 80 ft.',
    stats: { STR: 26, DEX: 12, CON: 26, INT: 18, WIS: 16, CHA: 22 },
    saves: ['DEX', 'WIS'], skills: 'Perception +12, Stealth +8',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (4/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' }, // print ancients run 4/Day
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +15, reach 15 ft. 44 (8d8 + 8) {damage_type} damage.' },
        { name: 'Breath Weapon', gate: 'Recharge 5-6', text: '*Dexterity Saving Throw*: DC 22, each creature in a 90-foot Cone. *Failure:* 72 (16d8) {damage_type} damage. *Success:* Half damage.' },
        { name: 'Spellcasting', rules: true, text: 'The creature casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC {dc}):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}' }, // every 2024 adult+ dragon casts; labeled + DC per print (critic 2026-09-14 x2)
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 22, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Strike', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Wing Beat', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dread', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 22, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'ooze-1',
    cite: 'composition after Gray Ooze / Ochre Jelly (CR 1/2-2) — the deepest armor trade in the corpus',
    cr: 1, archetypes: ['ooze'],
    ac: 8, ac_offset: -7, hp: 33, hp_scale: 1.1, hp_formula: '6d8 + 6', atk: 4, dc: 11, pb: 2,
    speed: '15 ft., Climb 15 ft.',
    stats: { STR: 14, DEX: 6, CON: 13, INT: 1, WIS: 6, CHA: 1 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Amorphous', rules: true, text: 'The creature can move through a space as narrow as 1 inch wide without squeezing.' },
        { name: 'Corrosive Form', rules: true, text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 5 (1d10) {damage_type} damage.' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +4, reach 5 ft. 10 (2d6 + 3) {damage_type} damage.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'ooze-4',
    cite: 'composition after Black Pudding / Gelatinous Cube (CR 2-4)',
    cr: 4, archetypes: ['ooze'],
    ac: 9, ac_offset: -7, hp: 83, hp_scale: 1.1, hp_formula: '15d8 + 15', atk: 6, dc: 13, pb: 2,
    speed: '20 ft., Climb 20 ft.',
    stats: { STR: 18, DEX: 6, CON: 13, INT: 1, WIS: 6, CHA: 1 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Amorphous', rules: true, text: 'The creature can move through a space as narrow as 1 inch wide without squeezing.' },
        { name: 'Corrosive Form', rules: true, text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 5 (1d10) {damage_type} damage.' },
        { name: 'Spider Climb', rules: true, text: 'The creature can climb difficult surfaces, including along ceilings, without needing to make an ability check.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +6, reach 5 ft. 15 (2d10 + 4) {damage_type} damage.' },
        { name: 'Engulf', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature moves up to its Speed without provoking Opportunity Attacks. It can move through the spaces of Medium or smaller creatures if it has room inside itself to contain them. *Dexterity Saving Throw*: DC 13, each creature whose space the creature enters for the first time during this move. *Failure:* 10 (3d6) {damage_type} damage, and the target is engulfed. *Success:* Half the damage only, and the target is pushed out of the creature\'s space. An engulfed target is suffocating, can\'t cast spells with a Verbal component, has the Blinded and Restrained conditions, and takes 10 (3d6) {damage_type} damage at the start of each of the creature\'s turns. When the creature moves, the engulfed target moves with it. An engulfed target can take an action to make a DC 13 Strength (Athletics) check, escaping into the nearest unoccupied space on a success.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 13, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'ooze-9',
    invented: true, // no printed ooze above the Black Pudding (CR 4) — its composition scaled into the mid band
    cr: 9, archetypes: ['ooze'],
    ac: 11, ac_offset: -6, hp: 165, hp_scale: 1.1, hp_formula: '22d10 + 44', atk: 8, dc: 15, pb: 4,
    speed: '20 ft., Climb 20 ft.',
    stats: { STR: 18, DEX: 6, CON: 15, INT: 2, WIS: 8, CHA: 1 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Amorphous', rules: true, text: 'The creature can move through a space as narrow as 1 inch wide without squeezing.' },
        { name: 'Corrosive Form', rules: true, text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 9 (2d8) {damage_type} damage.' },
        { name: 'Spider Climb', rules: true, text: 'The creature can climb difficult surfaces, including along ceilings, without needing to make an ability check.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 10 ft. 30 (4d12 + 4) {damage_type} damage.' },
        { name: 'Engulf', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature moves up to its Speed without provoking Opportunity Attacks. It can move through the spaces of Large or smaller creatures if it has room inside itself to contain them. *Dexterity Saving Throw*: DC 15, each creature whose space the creature enters for the first time during this move. *Failure:* 13 (3d8) {damage_type} damage, and the target is engulfed. *Success:* Half the damage only, and the target is pushed out of the creature\'s space. An engulfed target is suffocating, can\'t cast spells with a Verbal component, has the Blinded and Restrained conditions, and takes 13 (3d8) {damage_type} damage at the start of each of the creature\'s turns. When the creature moves, the engulfed target moves with it. An engulfed target can take an action to make a DC 15 Strength (Athletics) check, escaping into the nearest unoccupied space on a success.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'ooze-17',
    invented: true, // no printed ooze boss — the pudding composition under a legendary menu
    legendary: true,
    cr: 17, archetypes: ['ooze'],
    ac: 13, ac_offset: -6, hp: 238, hp_scale: 1.1, hp_formula: '35d8 + 80', atk: 12, dc: 19, pb: 6,
    speed: '20 ft., Climb 20 ft.',
    stats: { STR: 22, DEX: 6, CON: 18, INT: 2, WIS: 10, CHA: 1 },
    saves: ['CON'], skills: '',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Amorphous', rules: true, text: 'The creature can move through a space as narrow as 1 inch wide without squeezing.' },
        { name: 'Corrosive Form', rules: true, text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 13 (3d8) {damage_type} damage.' },
        { name: 'Spider Climb', rules: true, text: 'The creature can climb difficult surfaces, including along ceilings, without needing to make an ability check.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes three Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 10 ft. 40 (6d10 + 7) {damage_type} damage.' },
        { name: 'Engulf', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], gated_on: 'engulf', text: 'The creature moves up to its Speed without provoking Opportunity Attacks. It can move through the spaces of Large or smaller creatures if it has room inside itself to contain them. *Dexterity Saving Throw*: DC 19, each creature whose space the creature enters for the first time during this move. *Failure:* 17 (5d6) {damage_type} damage, and the target is engulfed. *Success:* Half the damage only, and the target is pushed out of the creature\'s space. An engulfed target is suffocating, can\'t cast spells with a Verbal component, has the Blinded and Restrained conditions, and takes 17 (5d6) {damage_type} damage at the start of each of the creature\'s turns. When the creature moves, the engulfed target moves with it. An engulfed target can take an action to make a DC 19 Strength (Athletics) check, escaping into the nearest unoccupied space on a success.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Lash', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Surge', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dissolution', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
  {
    id: 'swarm-1',
    cite: 'composition across the seven print swarms (CR 1/4-3) — the Swarm trait and the Bloodied split',
    cr: 1, archetypes: ['swarm'],
    ac: 12, ac_offset: -3, hp: 27, hp_scale: 0.9, hp_formula: '6d8', atk: 4, dc: 11, pb: 2, striker_stat: 'DEX',
    defense_suite: { damage: [], conditions: ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] },
    speed: '20 ft., Climb 20 ft.',
    stats: { STR: 6, DEX: 14, CON: 10, INT: 2, WIS: 8, CHA: 1 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Swarm', rules: true, text: 'The creature can occupy another creature\'s space and vice versa, and the creature can move through any opening large enough for a Tiny creature. The creature can\'t regain Hit Points or gain Temporary Hit Points.' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +4, reach 5 ft. 10 (4d4) {damage_type} damage, or 5 (2d4) {damage_type} damage if the creature is Bloodied.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'swarm-3',
    cite: 'composition after Swarm of Crawling Claws (CR 3) — the swarm ceiling in print',
    cr: 3, archetypes: ['swarm'],
    ac: 12, ac_offset: -3, hp: 52, hp_scale: 0.87, hp_formula: '12d8', atk: 5, dc: 12, pb: 2, striker_stat: 'DEX',
    defense_suite: { damage: [], conditions: ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] },
    speed: '30 ft., Climb 30 ft.',
    stats: { STR: 8, DEX: 16, CON: 10, INT: 4, WIS: 10, CHA: 2 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Swarm', rules: true, text: 'The creature can occupy another creature\'s space and vice versa, and the creature can move through any opening large enough for a Tiny creature. The creature can\'t regain Hit Points or gain Temporary Hit Points.' },
      ],
      Actions: [
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +5, reach 5 ft. 22 (4d8 + 4) {damage_type} damage, or 11 (2d8 + 2) {damage_type} damage if the creature is Bloodied.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'swarm-9',
    invented: true, // no printed swarm above CR 3 — the claws composition scaled into the mid band
    cr: 9, archetypes: ['swarm'],
    ac: 14, ac_offset: -3, hp: 135, hp_scale: 0.9, hp_formula: '27d8 + 14', atk: 8, dc: 15, pb: 4, striker_stat: 'DEX',
    defense_suite: { damage: [], conditions: ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] },
    speed: '30 ft., Climb 30 ft.',
    stats: { STR: 8, DEX: 18, CON: 11, INT: 4, WIS: 10, CHA: 2 },
    saves: [], skills: '',
    sections: {
      Traits: [
        { name: 'Swarm', rules: true, text: 'The creature can occupy another creature\'s space and vice versa, and the creature can move through any opening large enough for a Tiny creature. The creature can\'t regain Hit Points or gain Temporary Hit Points.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +8, reach 5 ft. 28 (7d6 + 4) {damage_type} damage, or 14 (4d6) {damage_type} damage if the creature is Bloodied.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
    },
  },
  {
    id: 'swarm-17',
    invented: true, // no printed swarm boss — the swarm laws under a legendary menu
    legendary: true,
    cr: 17, archetypes: ['swarm'],
    ac: 16, ac_offset: -3, hp: 194, hp_scale: 0.9, hp_formula: '36d8 + 32', atk: 12, dc: 19, pb: 6, striker_stat: 'DEX',
    defense_suite: { damage: [], conditions: ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned'], resist: ['Bludgeoning', 'Piercing', 'Slashing'] },
    speed: '30 ft., Climb 30 ft.',
    stats: { STR: 8, DEX: 22, CON: 12, INT: 6, WIS: 12, CHA: 4 },
    saves: ['DEX'], skills: '',
    sections: {
      Traits: [
        { name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' },
        { name: 'Swarm', rules: true, text: 'The creature can occupy another creature\'s space and vice versa, and the creature can move through any opening large enough for a Tiny creature. The creature can\'t regain Hit Points or gain Temporary Hit Points.' },
      ],
      Actions: [
        { name: 'Multiattack', text: 'The creature makes two Melee Attack attacks.' },
        { name: 'Melee Attack', text: '*Melee Attack Roll:* +12, reach 5 ft. 51 (13d6 + 6) {damage_type} damage, or 25 (7d6) {damage_type} damage if the creature is Bloodied.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Harry', text: 'The creature makes one Melee Attack attack.' },
        { name: 'Legendary Flow', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks.' },
        { name: 'Legendary Dread Hum', imposes: 'Frightened', text: '*Wisdom Saving Throw*: DC 19, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.' },
      ],
    },
  },
];