/**
 * Parser tests built from REAL pasted statblocks (the sprint's live batches
 * are exactly the format users paste).
 */
import { detectEdition, parseStatblockText, validateParsedStatblock, modelFromLLMParse } from '../statblock-text-parser.mjs';

const PASTE_2014 = `Kralvag
Large giant, neutral evil
Armor Class17
Hit Points: 199 (21d10 + 84)
Speed: 40 ft., climb 30 ft.
STR\tDEX\tCON\tINT\tWIS\tCHA
22 (+6)\t18 (+4)\t18 (+4)\t6 (-2)\t14 (+2)\t10 (+0)
Skills: Stealth +8, Perception +6
Saving Throws: DEX +8, CON +8
Damage Resistances: cold
Damage Immunities: poison
Condition Immunities: poisoned
Senses: darkvision 60 ft.; passive Perception 16
Languages: understands Giant but does not speak
CR:12 (8,400 XP)
Proficiency Bonus:+4
Wall Climb. The kralvag can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
Quick Step (Bonus Action). The kralvag takes the Disengage action.
Actions
Multiattack: The kralvag makes two Pincer attacks.
Pincer: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 37 (7d8 + 6) slashing damage.
Shard Cone (Recharge 5-6): The kralvag hurls a volley of crystalline shards. Each creature in a 30-foot cone must make a DC 17 Dexterity saving throw, taking 39 (6d12) piercing damage on a failed save, or half as much damage on a successful one.`;

const PASTE_2024 = `Askor
Large Undead, Neutral

AC 20
Initiative +1 (11)

HP 294 (28d10 + 140)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
24
+7
+12
INT
6
-2
-2
MOD
SAVE
DEX
12
+1
+1
WIS
14
+2
+2
MOD
SAVE
CON
20
+5
+10
CHA
22
+6
+6
Skills Perception +7, Athletics +12

Resistances Cold, Thunder

Immunities Fire, Poison; Exhaustion, Paralyzed

Senses darkvision 60 ft.; Passive Perception 17

Languages Common (does not speak)

CR 15 (XP 13,000; PB +5)

Traits
Legendary Resistance (3/Day). If the askor fails a saving throw, it can choose to succeed instead.

Actions
Multiattack. The askor makes three Burning Claw attacks.

Burning Claw. Melee Attack Roll: +12, reach 5 ft. 16 (2d8 + 7) Slashing damage plus 5 (1d10) Fire damage.`;

describe('detectEdition', () => {
  test('classic paste detects 2014, new-layout paste detects 2024', () => {
    expect(detectEdition(PASTE_2014)).toBe('2014');
    expect(detectEdition(PASTE_2024)).toBe('2024');
  });
});

describe('parseStatblockText — 2014 paste', () => {
  const result = parseStatblockText(PASTE_2014);

  test('parses complete with the legacy model shape', () => {
    expect(result.ok).toBe(true);
    expect(result.edition).toBe('2014');
    const m = result.model;
    expect(m.name).toBe('Kralvag');
    expect(m.type_and_alignment).toBe('Large giant, neutral evil');
    expect(m.armor_class).toBe('17');
    expect(m.hit_points).toBe('199 (21d10 + 84)');
    expect(m.attributes).toContain('STR 22 (+6)');
    expect(m.attributes).toContain('INT 6 (-2)');
    expect(m.saving_throws).toBe('DEX +8, CON +8');
    expect(m.challenge_rating).toBe('12 (8,400 XP)');
    expect(m.proficiency_bonus).toBe('+4');
    expect(m.format).toBe('2014');
  });

  test('headerless traits and sections land in the right arrays', () => {
    const m = result.model;
    expect(m.abilities.map((a) => a.name)).toEqual(['Wall Climb', 'Quick Step (Bonus Action)']);
    expect(m.actions.map((a) => a.name)).toEqual(['Multiattack', 'Pincer', 'Shard Cone (Recharge 5-6)']);
    expect(m.actions[1].description).toContain('+10 to hit');
  });
});

describe('parseStatblockText — 2024 paste', () => {
  const result = parseStatblockText(PASTE_2024);

  test('parses complete with the 2024 model shape, including grid saves', () => {
    expect(result.ok).toBe(true);
    expect(result.edition).toBe('2024');
    const m = result.model;
    expect(m.name).toBe('Askor');
    expect(m.size).toBe('Large');
    expect(m.type).toBe('Undead');
    expect(m.ac).toBe(20);
    expect(m.hp).toBe(294);
    expect(m.hp_formula).toBe('28d10 + 140');
    expect(m.stats).toEqual({ STR: 24, DEX: 12, CON: 20, INT: 6, WIS: 14, CHA: 22 });
    expect(m.saves.STR).toBe(12); // proficient save from the grid
    expect(m.saves.DEX).toBe(1);
    expect(m.initiative_bonus).toBe(1);
    expect(m.cr).toBe(15);
    expect(m.pb).toBe(5);
    expect(m.xp).toBe(13000);
    expect(m.immunities).toBe('Fire, Poison; Exhaustion, Paralyzed');
    expect(m.format).toBe('2024');
  });

  test('sections parse with suffixed names intact', () => {
    const m = result.model;
    expect(m.sections.Traits[0].name).toBe('Legendary Resistance (3/Day)');
    expect(m.sections.Actions.map((e) => e.name)).toEqual(['Multiattack', 'Burning Claw']);
    expect(m.sections.Actions[1].text).toContain('Melee Attack Roll: +12');
  });
});

describe('incomplete pastes report what is missing', () => {
  test('a fragment fails ok with named gaps', () => {
    const r = parseStatblockText('Gribble\nSome creature of the deep.');
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(expect.arrayContaining(['AC', 'HP', 'ability scores', 'CR']));
  });
});

describe('LLM parse validation + model building', () => {
  const llmJson = JSON.stringify({
    name: 'Gribble', size: 'Small', type: 'Aberration', alignment: 'Chaotic Evil',
    ac: 13, hp: 27, hp_formula: '6d6 + 6', speed: '30 ft.',
    stats: { STR: 8, DEX: 16, CON: 12, INT: 10, WIS: 12, CHA: 6 },
    save_bonuses: { DEX: 5 },
    cr: '1/2', pb: 2,
    sections: { Actions: [{ name: 'Bite', text: 'Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.' }] },
  });

  test('validator accepts the shape and rejects junk', () => {
    expect(validateParsedStatblock(llmJson)).toBe(true);
    expect(validateParsedStatblock('{"name":""}')).toBe(false);
    expect(validateParsedStatblock('not json')).toBe(false);
  });

  test('modelFromLLMParse builds the edition model', () => {
    const m = modelFromLLMParse(llmJson, '2024');
    expect(m.format).toBe('2024');
    expect(m.cr).toBe(0.5);
    expect(m.saves.DEX).toBe(5);
    expect(m.saves.STR).toBe(-1); // unproficient saves fall back to the mod
    const legacy = modelFromLLMParse(llmJson, '2014');
    expect(legacy.format).toBe('2014');
    expect(legacy.saving_throws).toBe('DEX +5');
  });
});

describe('real-world 2024 copy (Sphinx of Wonder, D&D Beyond formatting)', () => {
  const PASTE = `Sphinx of Wonder
Tiny Celestial, Lawful Good

AC13
HP24 (7d4 + 7)
Speed20ft., Fly 40ft
Initiative+3 (13)
MOD\tSAVE
Str\t6\t–2\t–2
Int\t15\t+2\t+2
MOD\tSAVE
Dex\t17\t+3\t+3
Wis\t12\t+1\t+1
MOD\tSAVE
Con\t13\t+1\t+1
Cha\t11\t+0\t+0
SkillsArcana +4, Religion +4, Stealth +5
ResistancesNecrotic, Psychic, Radiant
SensesDarkvision 60 ft., Passive Perception 11
LanguagesCelestial, Common
CR1 (XP 200; PB +2)
Traits
Magic Resistance. The sphinx has Advantage on saving throws against spells and other magical effects.

Actions
Rend. Melee Attack Roll: +5, reach 5ft. Hit 5 (1d4 + 3) Slashing damage plus 7 (2d6) Radiant damage.

Reactions
Burst of Ingenuity (2/Day). Trigger: The sphinx or another creature within 30 feet makes an ability check or a saving throw. Response: The sphinx adds 2 to the roll.`;

  test('no-space labels, Title-case stats, and en-dash negatives all parse', () => {
    const r = parseStatblockText(PASTE);
    expect(r.edition).toBe('2024');
    expect(r.ok).toBe(true);
    const m = r.model;
    expect(m.name).toBe('Sphinx of Wonder');
    expect(m.ac).toBe(13);
    expect(m.hp).toBe(24);
    expect(m.hp_formula).toBe('7d4 + 7');
    expect(m.speed).toBe('20ft., Fly 40ft');
    expect(m.stats).toEqual({ STR: 6, DEX: 17, CON: 13, INT: 15, WIS: 12, CHA: 11 });
    expect(m.saves.STR).toBe(-2); // en-dash negative save
    expect(m.initiative_bonus).toBe(3);
    expect(m.skills).toBe('Arcana +4, Religion +4, Stealth +5');
    expect(m.resistances).toBe('Necrotic, Psychic, Radiant');
    expect(m.cr).toBe(1);
    expect(m.pb).toBe(2);
    expect(m.sections.Traits[0].name).toBe('Magic Resistance');
    expect(m.sections.Actions[0].name).toBe('Rend');
    expect(m.sections.Reactions[0].name).toBe('Burst of Ingenuity (2/Day)');
  });
});

describe('D&D Beyond 2024 copy with 2014-phrased attacks (Knight, 2025 MM)', () => {
  const PASTE = `Knight
Medium or Small Humanoid, Neutral
Armor Class 18
Hit Points 52 (8d8 + 16)
Speed 30 ft.
Initiative +0 (10)
STR
16 (3)
DEX
11 (0)
CON
14 (2)
INT
11 (0)
WIS
11 (0)
CHA
15 (2)
Saving Throws Str +3, Dex +0, Con +4, Int +0, Wis +2, Cha +2
Condition Immunities Frightened
Senses passive Perception 10
Languages Common plus one other language
Challenge 3 (700 XP)
Habitat Any
Treasure Armaments, Individual
Gear Greatsword, Heavy Crossbow, Plate Armor
Actions
Multiattack. The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.
Greatsword. Melee Weapon Attack: +5 to hit, reach 5 ft., One Target. Hit: (2d6 + 3) Slashing damage plus (1d8)Radiant damage.
Heavy Crossbow. Ranged Weapon Attack: +2 to hit, reach 100/400 ft., One Target. Hit: (2d10) Piercing damage plus (1d8)Radiant damage.
Reactions
Parry. *Trigger:* The knight is hit by a melee attack roll while holding a weapon. *Response:* The knight adds 2 to its AC against that attack, possibly causing it to miss.`;

  test('2024 chrome (Initiative, Habitat/Treasure/Gear, Trigger/Response) outvotes the 2014 attack phrasing', () => {
    expect(detectEdition(PASTE)).toBe('2024');
  });

  test('stat-name-then-unsigned-mod rows and the Saving Throws line parse', () => {
    const r = parseStatblockText(PASTE);
    expect(r.ok).toBe(true);
    const m = r.model;
    expect(m.size).toBe('Medium or Small');
    expect(m.type).toBe('Humanoid');
    expect(m.stats).toEqual({ STR: 16, DEX: 11, CON: 14, INT: 11, WIS: 11, CHA: 15 });
    expect(m.saves).toEqual({ STR: 3, DEX: 0, CON: 4, INT: 0, WIS: 2, CHA: 2 });
    expect(m.initiative_bonus).toBe(0);
    expect(m.cr).toBe(3);
    expect(m.pb).toBe(2);
    expect(m.gear).toBe('Greatsword, Heavy Crossbow, Plate Armor');
    expect(m.immunities).toBe('Frightened');
    expect(m.sections.Traits).toBeUndefined(); // Habitat/Treasure/Gear are not traits
    expect(m.sections.Actions.map((e) => e.name)).toEqual(['Multiattack', 'Greatsword', 'Heavy Crossbow']);
    expect(m.sections.Reactions[0].name).toBe('Parry');
  });
});

describe('PDF-style 2024 copy with zero-whitespace stat grid (Adult Black Dragon)', () => {
  const PASTE = `Adult Black Dragon
Huge Dragon (Chromatic), Chaotic Evil
Initiative +12 (22)AC 19
HP 195 (17d12 + 85)
Speed 40 ft., Fly 80 ft., Swim 40 ft.
MODSAVEMODSAVEMODSAVE
Str23+6+6Dex14+2+7Con21+5+5
Int14+2+2Wis13+1+6Cha19+4+4
Skills Perception +11, Stealth +7
Immunities Acid
Senses Blindsight 60 ft., Darkvision 120 ft., Passive Perception 21
Languages Common, Draconic
CR 14 (XP 11 500, or 13 000 in Lair; PB +5)
Traits
Amphibious. The dragon can breathe air and water.

Legendary Resistance (3/Day, or 4/Day in Lair). If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack. The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Melf's Acid Arrow (level 3 version).

Rend. Melee Attack Roll: +11, reach 10 ft. Hit: 13 (2d6 + 6) Slashing damage plus 4 (1d8) Acid damage.

Acid Breath (Recharge 5–6). Dexterity Saving Throw: DC 18, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 54 (12d8) Acid damage. Success: Half damage.

Spellcasting. The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17, +9 to hit with spell attacks):

At Will: Detect Magic, Fear, Melf's Acid Arrow (level 3 version)
1/Day Each: Speak with Dead, Vitriolic Sphere
Legendary actions
Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns.
Cloud of Insects. Dexterity Saving Throw: DC 17, one creature the dragon can see within 120 feet. Failure: 22 (4d10) Poison damage, and the target has Disadvantage on saving throws to maintain Concentration until the end of its next turn. Failure or Success: The dragon can't take this action again until the start of its next turn.

Frightful Presence. The dragon uses Spellcasting to cast Fear. The dragon can't take this action again until the start of its next turn.

Pounce. The dragon moves up to half its Speed, and it makes one Rend attack.`;

  test('glued stat grid, glued AC line, and space-thousands XP all parse', () => {
    const r = parseStatblockText(PASTE);
    expect(r.edition).toBe('2024');
    expect(r.ok).toBe(true);
    const m = r.model;
    expect(m.ac).toBe(19);
    expect(m.hp).toBe(195);
    expect(m.stats).toEqual({ STR: 23, DEX: 14, CON: 21, INT: 14, WIS: 13, CHA: 19 });
    expect(m.saves).toEqual({ STR: 6, DEX: 7, CON: 5, INT: 2, WIS: 6, CHA: 4 });
    expect(m.initiative_bonus).toBe(12);
    expect(m.cr).toBe(14);
    expect(m.xp).toBe(11500);
    expect(m.pb).toBe(5);
    expect(m.immunities).toBe('Acid');
  });

  test('spell tiers stay inside Spellcasting; lowercase section header and boilerplate handled', () => {
    const m = parseStatblockText(PASTE).model;
    expect(m.sections.Traits.map((e) => e.name)).toEqual(['Amphibious', 'Legendary Resistance (3/Day, or 4/Day in Lair)']);
    expect(m.sections.Actions.map((e) => e.name)).toEqual(['Multiattack', 'Rend', 'Acid Breath (Recharge 5-6)', 'Spellcasting']);
    expect(m.sections.Actions[3].text).toContain('At Will: Detect Magic');
    expect(m.sections.Actions[3].text).toContain('1/Day Each: Speak with Dead');
    expect(m.sections['Legendary Actions'].map((e) => e.name)).toEqual(['Cloud of Insects', 'Frightful Presence', 'Pounce']);
  });
});

describe('D&D Beyond homebrew: 2014 phrasing with Traits/Bonus Actions headers and custom tags', () => {
  const PASTE = `🤖 "Engineer."
Medium Humanoid, Lawful Neutral

Armor Class 16 (Hardhat)
Hit Points 125 (25d10)
Speed 25 ft.

STR
14 (+2)
DEX
10 (+0)
CON
15 (+2)
INT
27 (+8)
WIS
19 (+4)
CHA
10 (+0)

Senses Passive Perception 20
Languages Common
Challenge 15 (13,000 XP)
Proficiency Bonus +5

Traits
Class Weapons. The Heavy does not carry all the weapons listed in his actions so he can pick one primary, one secondary, and one melee.

Melee. If the engineer is using the Gunslinger then his hit point maximum is increased by 25, if he's using the Southern Hospitality he has vulnerability to fire damage.
Actions
Shotgun (Primary). Ranged Weapon Attack: +10 to hit, range 15/20 ft., 1 target. Hit: 26 (8d4) piercing damage and this attack deals an additional 1d4 damage for every 5 ft. of closeness the Engineer has to the target.

Short Circuit (Secondary, Recharge 4-6). The engineer fire a ball of energy in one direction that travels up to 45 ft. and passes through creatures, creatures caught in the ball take 8 (4d4) lightning damage and have their movement speed reduced by 5 ft. for one minute.

Wrench (Melee). Melee Weapon Attack: +10 to hit, reach 5 ft., 1 target. Hit: 10 (1d12 + 10) bludgeoning damage and if the target is a building it instead restores 20 of the buildings hit points and instead upgrades it after hitting it three times if it is at full health.

Bonus Actions
Deploy Building. The engineer deploys a sentry or dispenser within 5 ft. of him that start as level one (mini sentry if using gunslinger).

Sentry Level 1. 50 hit points, AC 10, automatically locks onto closest hostiles within 60 ft. and fires a burst of high power rounds that deal 12 (4d6) piercing damage however it takes a full round to lock onto something behind it.`;

  test('detects 2014 and custom parenthetical tags parse as entry names', () => {
    const r = parseStatblockText(PASTE);
    expect(r.edition).toBe('2014');
    expect(r.ok).toBe(true);
    const m = r.model;
    expect(m.armor_class).toBe('16 (Hardhat)');
    expect(m.actions.map((a) => a.name)).toEqual([
      'Shotgun (Primary)', 'Short Circuit (Secondary, Recharge 4-6)', 'Wrench (Melee)',
    ]);
    // Traits header respected; Bonus Actions fold into abilities with suffix.
    expect(m.abilities.map((a) => a.name)).toEqual([
      'Class Weapons', 'Melee', 'Deploy Building (Bonus Action)', 'Sentry Level 1 (Bonus Action)',
    ]);
  });
});
