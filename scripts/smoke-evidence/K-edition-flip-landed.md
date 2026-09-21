## 03. Throne-of-Ribs Sovereign — CR 17

**Input:** `a titan of fused corpses that rules a plague-pit from a throne of ribs`
**Donor:** caster-12 -> CR 17
**Signature:** custom · **elapsed** 24s

### Block
```
Throne-of-Ribs Sovereign
Gargantuan undead, neutral evil
Armor Class

18 (natural armor)

Hit Points: 

232 (15d20 + 75)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

14 (+2)

	

20 (+5)

	

22 (+6)

	

15 (+2)

	

16 (+3)

Skills: 

Arcana +12, Perception +8

Saving Throws: 

INT +12, WIS +8

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

blindsight 120 ft., darkvision 120 ft., passive Perception 18

Languages: 

understands Common and one language of the plague cult but can't speak

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Throne of Ribs. The throne-of-ribs sovereign is fused to a mound of corpses and ribs. While it is within 5 feet of the throne, it has advantage on Constitution saving throws, and the throne is difficult terrain for other creatures.
Protective Magic (3/Day) (Reaction). When the throne-of-ribs sovereign is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The throne-of-ribs sovereign makes four Grave Slam attacks. It can replace one attack with a use of Spellcasting to cast ray of sickness.
Grave Slam: Melee or Ranged Spell Attack: +12 to hit, reach 5 ft. or range 150 ft., one target. Hit: 30 (7d6 + 6) necrotic damage.
Spellcasting: The throne-of-ribs sovereign casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

At will: ray of sickness, bestow curse
1/day each: cloudkill (cast at 6th level), blight
Rib-Cage Eruption (Recharge 5-6): Each creature within 30 feet of the sovereign that isn't a construct or undead must make a DC 19 Dexterity saving throw. On a failed save, the target takes 21 (6d6) necrotic damage and becomes grappled (escape DC 19) in a cage of fused ribs and writhing corpses that erupts from the throne. While grappled by this effect, the target is restrained, takes 7 (2d6) necrotic damage at the start of each of the sovereign's turns, and its speed is halved rather than 0. If the sovereign hits the grappled target with a Grave Slam, that target has disadvantage on its next escape attempt.
```

### Converted
```
Throne-of-Ribs Sovereign
Gargantuan undead, neutral evil
Armor Class

18 (natural armor)

Hit Points: 

232 (15d20 + 75)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

14 (+2)

	

20 (+5)

	

22 (+6)

	

15 (+2)

	

16 (+3)

Skills: 

Arcana +12, Perception +8

Saving Throws: 

INT +12, WIS +8

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

blindsight 120 ft., darkvision 120 ft., passive Perception 18

Languages: 

understands Common and one language of the plague cult but can't speak

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Throne of Ribs. The throne-of-ribs sovereign is fused to a mound of corpses and ribs. While it is within 5 feet of the throne, it has advantage on Constitution saving throws, and the throne is difficult terrain for other creatures.
Protective Magic (3/Day) (Reaction). When the throne-of-ribs sovereign is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The throne-of-ribs sovereign makes four Grave Slam attacks. It can replace one attack with a use of Spellcasting to cast ray of sickness.
Grave Slam: Melee or Ranged Spell Attack: +12 to hit, reach 5 ft. or range 150 ft., one target. Hit: 30 (7d6 + 6) necrotic damage.
Spellcasting: The throne-of-ribs sovereign casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

At will: ray of sickness, bestow curse
1/day each: cloudkill (cast at 6th level), blight
Rib-Cage Eruption (Recharge 5-6): Each creature within 30 feet of the sovereign that isn't a construct or undead must make a DC 19 Dexterity saving throw. On a failed save, the target takes 21 (6d6) necrotic damage and becomes grappled (escape DC 19) in a cage of fused ribs and writhing corpses that erupts from the throne. While grappled by this effect, the target is restrained, takes 7 (2d6) necrotic damage at the start of each of the sovereign's turns, and its speed is halved rather than 0. If the sovereign hits the grappled target with a Grave Slam, that target has disadvantage on its next escape attempt.
```

### Trace
```
[concept] synthesis: archetype=controller type=Undead themes=grave/devouring mind=sapient lore=✓
[concept] lore: Born from a mass grave where a plague cult's final ritual collapsed the boundary between death and dominion, the Corpse-Titan rules the plague-pit as a petty god, demanding offerings of the living to add to its throne.
[concept] resolve: archetype=controller type=Undead themes=grave/devouring mind=sapient style=juggernaut energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: engulf, aura, summon, grapple
[concept] signature elements: a throne of fused ribs and writhing corpses [object] | plague-bloom exhalation that rots and charms [behavior] | engulfing prey into its mass of bodies [behavior]
[concept] identity: The Corpse-Titan rises from its throne of ribs and exhales a rolling plague-bloom, seeding the battlefield with a miasmic aura that rots flesh and locks joints. Every round it slams its fused mass of bodies into the ground, sending a shockwave of corpse-matter that grapples and pins survivors while it wades forward to engulf the weakest. It does not flee; it is a sovereign of rot, and it toys with prey by letting them crawl before dragging them back into the pit.
[concept] lore: Born from a mass grave where a plague cult's final ritual collapsed the boundary between death and dominion, the Corpse-Titan rules the plague-pit as a petty god, demanding offerings of the living to add to its throne.
[reskin] donor: caster-12 -> CR 17
[reskin] style unserved: "juggernaut" has no caster line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] seats: action <- "plague-bloom exhalation that rots and charms" | trait <- "a throne of fused ribs and writhing corpses"
[reskin] trait wildcard: "Throne of Ribs"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard accepted: Each creature within 30 feet of the sovereign that isn't a Construct or Undead must make a DC 19 Dex
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Ray of Sickness*.
[reskin] lint: orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
audit finding below confidence gate: Plague-Bloom Exhalation This clause requires the GM to track a Grappled target that is also Restrained and whose Speed is halved rather than reduced to 0, layering multiple conditions and a recurring damage tick that must be remembered at the start of every sovereign turn.
[reskin] audit: [Plague-Bloom Exhalation (Recharge 5-6): The Grappl…nd writhing corpses that erupts from the throne"), Throne of Ribs: The trait references 'the throne' …about: "While it is within 5 feet of the throne"), Plague-Bloom Exhalation (Recharge 5-6): The name p…n and grapple. (about: "Plague-Bloom Exhalation")]
[reskin] audit rename: "Plague-Bloom Exhalation (Recharge 5-6)" -> "Rib-Cage Eruption (Recharge 5-6)"
[reskin] done: "Throne-of-Ribs Sovereign" — donor caster-12, CR 17
[harness] converted 2024 -> 2014
```
