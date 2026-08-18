/**
 * AUTHORED DONOR CHASSIS (owner call, 2026-08-17: "maybe we make our own
 * donors... we need at least one legendary action set that's not an erinyes
 * or solar — something that says 'generic skirmisher', easy to reskin").
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
        { name: 'Signature Slot', wildcard_slot: true, text: '*Dexterity Saving Throw*: DC 11, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-3',
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
        { name: 'Signature Slot', wildcard_slot: true, text: '*Dexterity Saving Throw*: DC 12, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-8',
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
        { name: 'Signature Slot', wildcard_slot: true, text: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-13',
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
        { name: 'Signature Slot', wildcard_slot: true, text: '*Dexterity Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
      ],
      'Bonus Actions': [
        { name: 'Escape Action', text: 'The creature takes the Dash, Disengage, or Hide action.' },
      ],
    },
  },
  {
    id: 'skirmisher-18',
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
        { name: 'Signature Slot', wildcard_slot: true, text: '*Dexterity Saving Throw*: DC 20, one creature within 60 feet. *Failure:* The target has Disadvantage on attack rolls until the start of the creature\'s next turn.' },
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
