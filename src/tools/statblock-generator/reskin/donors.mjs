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
    archetypes: ['skirmisher', 'lurker'],
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
    archetypes: ['skirmisher', 'lurker'],
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
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 15, each creature in a 30-foot-long, 5-foot-wide Line (Recharge 5-6). *Failure:* 45 (10d8) {damage_type} damage, and the target has the {condition_minor} condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
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
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 17, each creature in a 60-foot-long, 5-foot-wide Line (Recharge 5-6). *Failure:* 63 (14d8) {damage_type} damage, and the target has the {condition_minor} condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
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
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 20, each creature in a 60-foot-long, 10-foot-wide Line (Recharge 5-6). *Failure:* 90 (20d8) {damage_type} damage, and the target has the {condition_minor} condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
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
        { name: 'Sweeping Area Attack', text: '*Strength Saving Throw*: DC 22, each creature in a 90-foot-long, 10-foot-wide Line (Recharge 5-6). *Failure:* 77 (14d10) {damage_type} damage, and the target has the {condition_minor} condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 22, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
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
        { name: 'Trampling Rush', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 12. *Failure:* 10 (3d6) {damage_type} damage, and the target has the Prone condition.', gate: 'Recharge 5-6' },
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
        { name: 'Trampling Rush', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 15. *Failure:* 27 (6d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
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
        { name: 'Trampling Rush', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 17. *Failure:* 45 (10d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
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
        { name: 'Trampling Rush', text: 'The creature moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 20. *Failure:* 63 (14d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
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
    cr: 3, archetypes: ['skirmisher', 'lurker'],
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
        { name: 'Ranged Save Effect', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 12, one creature the creature can see within 60 feet. *Failure:* The target has the Frightened condition until the end of the creature\'s next turn. *Success:* The target is immune to this creature\'s gaze for 24 hours.' },
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
    cr: 8, archetypes: ['skirmisher', 'lurker'],
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
    cr: 13, archetypes: ['skirmisher', 'lurker'],
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
        { name: 'Ranged Save Effect', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 17, one creature the creature can see within 60 feet. *Failure:* 18 (4d8) {damage_type} damage, and the target has the Paralyzed condition until the end of the creature\'s next turn.' },
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
    cr: 18, archetypes: ['skirmisher', 'lurker'],
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
        { name: 'Ranged Save Effect', gated_on: 'gaze', text: '*Wisdom Saving Throw*: DC 20, one creature the creature can see within 90 feet. *Failure:* 22 (4d10) {damage_type} damage, and the target has the Paralyzed condition until the end of the creature\'s next turn.' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
        { name: 'Teleport', gated_on: 'teleport', text: 'The creature teleports up to 120 feet to an unoccupied space it can see.', gate: 'Recharge 4-6' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
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
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +8, range 30/90 ft. 12 (2d6 + 5) {damage_type} damage, and {projectile} returns to the creature\'s grasp.' },
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
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +10, range 60/180 ft. 17 (2d10 + 6) {damage_type} damage, and {projectile} returns to the creature\'s grasp.' },
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
        { name: 'Diving Attack', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 12. *Failure:* 10 (3d6) {damage_type} damage, and the target has the Prone condition.', gate: 'Recharge 5-6' },
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
        { name: 'Diving Attack', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 15. *Failure:* 27 (6d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage only.', gate: 'Recharge 5-6' },
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
        { name: 'Diving Attack', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 17. *Failure:* 45 (10d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
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
        { name: 'Diving Attack', text: 'The creature flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. *Strength Saving Throw*: DC 20. *Failure:* 63 (14d8) {damage_type} damage, and the target has the Prone condition. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
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
        { name: 'Ranged Attack', text: '*Ranged Attack Roll:* +13, range 60/180 ft. 29 (6d6 + 8) {damage_type} damage, and {projectile} returns to the creature\'s grasp.' },
        { name: 'Hurled Burst', text: 'The creature hurls {projectile} at a point it can see within 300 feet. *Dexterity Saving Throw*: DC 20, each creature in a 15-foot-radius Sphere centered on that point. *Failure:* 72 (16d8) {damage_type} damage. *Success:* Half damage.', gate: 'Recharge 5-6' },
        { name: 'Signature Slot', wildcard_slot: true, text: '*{save_stat} Saving Throw*: DC 20, one Large or smaller creature within 90 feet. *Failure:* 13 (3d8) {damage_type} damage, and the target is pulled up to 30 feet straight toward the creature.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
      'Legendary Actions': [
        { name: 'Legendary Action Uses: 3', rules: true, text: 'Immediately after another creature\'s turn, the creature can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.' },
        { name: 'Legendary Move and Attack', text: 'The creature moves up to half its Speed without provoking Opportunity Attacks, and it makes one Melee Attack.' },
        { name: 'Legendary Ranged Attack', text: 'The creature makes one Ranged Attack. The creature can\'t take this action again until the start of its next turn.' },
        { name: 'Legendary Escape', text: 'The creature takes the Disengage or Hide action.' },
      ],
    },
  },
];
