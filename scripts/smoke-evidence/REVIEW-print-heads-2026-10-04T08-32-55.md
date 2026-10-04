# Review batch — print-heads-2026-10-04T08-32-55

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varnoslav the Night Sovereign | 15 | 2024 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Odrivar the Crimson | 15 (2014) | 2014 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Maddraith | 18 | 2024 | caster-21-warpriest | ok | FAIL: hot-offense | FAIL: punctuation | ok | ok | ok | ok | FAIL (2) |
| Belkharion the Sworn | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | FAIL: punctuation | ok | ok | ok | ok | FAIL (1) |
| Coronarch | 24 | 2024 | caster-21 | ok | SOFT: under | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Solar Ossuary | 24 (2014) | 2014 | caster-21 | FAIL: dc, dc | ok | ok | SOFT: rider-no-save | ok | ok | ok | FAIL (1) |

**Fails by seat and gate:**
- caster-21-warpriest / structure: 2
- caster-21-warpriest / bands: 1
- caster-21 / derivation: 1



---

## Varnoslav the Night Sovereign — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Varnoslav the Night Sovereign | 15 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 91 a round is 21% under the card's 115
- bands · soft · band: reads CR 12.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 66 (3 × Grave Strike); nova Sanguine Backlash 71; dmg 91

```
Varnoslav the Night Sovereign

Medium Undead, Lawful Evil

AC 18
Initiative +6 (16)

HP 212 (25d8 + 100)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+3
MOD
SAVE
DEX
22
+6
+11
WIS
15
+2
+7
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +7, Stealth +11

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 15 (XP 13,000; PB +5)

Traits

Sanguine Reclamation. Varnoslav knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Phantom Shift. When a creature Varnoslav can see ends its turn within 5 feet of it, Varnoslav can move up to 10 feet without provoking Opportunity Attacks.

Legendary Resistance (3/Day). If Varnoslav fails a saving throw, it can choose to succeed instead.

Misty Escape. If Varnoslav drops to 0 Hit Points outside its resting place, Varnoslav uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its Varnoslav form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Varnoslav form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Varnoslav can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Varnoslav has these weaknesses:


- Forbiddance: Varnoslav can't enter a residence without an invitation from an occupant.
- Running Water: Varnoslav takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Varnoslav's heart while Varnoslav has the Incapacitated condition in its resting place, Varnoslav has the Paralyzed condition until the weapon is removed.
- Sunlight: Varnoslav takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Varnoslav makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Sanguine Backlash (Recharge 5-6). Strength Saving Throw: DC 18, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 71 (13d10) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 18, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 28 (8d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Varnoslav regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Varnoslav Spawn under Varnoslav's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Varnoslav isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Varnoslav form. Anything it is wearing transforms with it.
While in bat form, Varnoslav can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Varnoslav can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Varnoslav casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of Varnoslav's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Varnoslav.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: ✓ ("vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves as extensions of its will [behavior] | curses that steal actions instead of dealing damage [behavior] | blood-fed immortality and mist-form retreat [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Varnoslav's will pours into every bat and wolf bound to him. On his command, one beast he can see lunges at a foe and buries its fangs deep, then clings there, tearing and worrying the wound with every movement the victim makes. The beast rides the target until it is torn away or the prey stops moving, its weight and teeth turning a single bite into a slow, dragging death." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch, charge (+ shelf: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Dazzling Burst" EV 4 vs floor 15.1 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every wound Varnoslav inflicts feeds the night inside him. When his claws or fangs draw a creature's blood, tendrils of red mist rise from the injury and coil back to him, sealing his own hurts. If the victim is a beast of the night—a bat, a wolf, or a thing he has already bound to his will—the stolen blood restores him far more deeply." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): faultless-tracker -> Traits/"Sanguine Reclamation" ("none of the templates carry the idea: the concept is a self-healing trigger on i [shape fit, no verb match]")
[reskin] chassis nova: "Sanguine Backlash (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common, Infernal" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Bat Step" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Solar Ossuary — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Solar Ossuary | 24 (2014) | caster-21 | FAIL: dc, dc | ok | ok | SOFT: rider-no-save | ok | ok | ok |

- derivation · fail · dc: Actions/Debt of Ruin: DC 21 is no stat's 8 + PB 7 + mod
- derivation · fail · dc: Legendary Actions/Disrupt Life: DC 21 is no stat's 8 + PB 7 + mod
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 24 → 23; sustained 207 (3 × Grave Bolt + legendary Deathly Teleport); nova none; dmg 207

```
Solar Ossuary
Medium undead, neutral
Armor Class

19 (natural armor)

Hit Points: 

487 (65d8 + 195)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

16 (+3)

	

18 (+4)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +11, Perception +9

Saving Throws: 

CON +10, INT +11, WIS +9

Damage Resistances: 

cold

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

darkvision 120 ft., passive Perception 19

Languages: 

All

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the solar ossuary fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the solar ossuary reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the solar ossuary's lair.
Protective Magic (3/Day) (Reaction). When the solar ossuary is hit by an attack roll, the solar ossuary casts shield, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The solar ossuary makes three attacks: one with its Grave Bolt, one with its Eldritch Burst, and one with its Paralyzing Touch. It can replace one attack with a use of Debt of Ruin or Spellcasting to cast ray of sickness.
Grave Bolt: Ranged Spell Attack: +11 to hit, range 80/320 ft., one target. Hit: 58 (12d8 + 4) necrotic damage.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 35 (7d8 + 4) force damage, and the target is frightened until the start of the solar ossuary's next turn.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 35 (7d8 + 4) cold damage, and the target is frightened until the start of the solar ossuary's next turn.
Spellcasting: The solar ossuary casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

At will: ray of sickness, bestow curse, fear

1/day each: blight (cast at 8th level)
Debt of Ruin: One creature within 60 feet of the solar ossuary must make a DC 21 Charisma saving throw. On a failed save, the target is cursed until the end of the solar ossuary's next turn. The first time the cursed target deals damage to any creature before then, it takes 58 (13d8) necrotic damage, or half as much damage on a successful one.
Legendary Actions

The solar ossuary can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The solar ossuary regains spent legendary actions at the start of its turn.

Deathly Teleport: The solar ossuary teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the solar ossuary must make a DC 21 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn. The solar ossuary can't take this action again until the start of its next turn.
Frightening Gaze: The solar ossuary casts fear, using the same spellcasting ability as Spellcasting. The solar ossuary can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: enthroned on a sun of bone [body] | radiant death-bolts that rot the living [behavior] | the calcified sun's pulse commands the skeletal dead [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Solar Ossuary reaches into its own calcified sun and tears free a shard of the dead star's core, then hurls it at the ground amid its enemies. The shard bursts in a wave of black light, and every soul it touches is dragged a step closer to the grave, their warmth stolen to feed the throne's dimming fire." [action/always/damage] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Debt of Ruin" EV 45 vs floor 30.2 (one attack of 3) — added Success: Half; dice 35 → 58
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Solar Ossuary does not truly die while its bone-sun throne endures; when its body is destroyed, its soul sinks into the throne and it rises again from the calcified star, diminished but unbroken. Only the complete destruction of the throne itself can end it for good." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The Solar Ossuary does not truly die while its bone-sun throne endures; when its body is destroyed, its soul sinks into the throne and it rises again from the calcified star, diminished but unbroken. Only the complete destruction of the throne itself can end it for good." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Ossuary Pulse (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Bone Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Ossuary Pulse (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---

## Odrivar the Crimson — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Odrivar the Crimson | 15 (2014) | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 69 a round is 28% under the table's 96
- bands · soft · band: reads CR 10.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 11 → 10.5; sustained 69 (3 × Grave Strike); nova none; dmg 69

```
Odrivar the Crimson
Medium undead, neutral evil
Armor Class

17 (natural armor)

Hit Points: 

212 (25d8 + 100)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +13

Saving Throws: 

DEX +8, INT +8

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Legendary Resistance (3/Day). If Odrivar fails a saving throw, it can choose to succeed instead.
Misty Escape. If Odrivar drops to 0 hit points outside its resting place, Odrivar uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its Odrivar form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Odrivar form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. Odrivar can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. Odrivar has these weaknesses: Forbiddance: Odrivar can't enter a residence without an invitation from an occupant.
Running Water: Odrivar takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into Odrivar's heart while Odrivar is incapacitated in its resting place, Odrivar is paralyzed until the weapon is removed.
Sunlight: Odrivar takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If Odrivar isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Odrivar form. Anything it is wearing transforms with it.
While in bat form, Odrivar can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Odrivar can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, Odrivar casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of Odrivar's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by Odrivar.

Actions
Multiattack: Odrivar makes three Grave Strike attacks. It can replace one attack with a use of Vitality Leech.
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) by one of two hands.
Vitality Leech: One creature within 30 feet of Odrivar must make a DC 18 Constitution saving throw, taking 28 (8d6) necrotic damage on a failed save, or half as much damage on a successful one. Odrivar regains hit points equal to half the damage dealt.
Bite (Bat or Vampire Form Only): One creature within 5 feet of Odrivar that is willing or is grappled, incapacitated, or restrained must make a DC 18 Constitution saving throw, taking 28 (8d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and Odrivar regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as an Odrivar Spawn under Odrivar's control.
```

**Engine trace**

```
[route] lurker type=Undead mechanics=none — defender-leader: a Undead commands no troops | lurker: ✓ ("vampire lord") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: ambush from the fold of its own pack [behavior] | bat-and-wolf swarm command [behavior] | blood-drinking bite that heals [body]
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The creature's flesh bursts apart into a shrieking swarm of bats that spreads across a wide space, lacerating every enemy it washes over with a hundred tiny bites; a heartbeat later the swarm pours back together into the vampire somewhere within its own reach. It can only call on this host once before the bats must be regathered from the dark." [action/once_per_fight/damage] — menu: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into drain
[reskin] value check: "Vitality Leech" EV 21.7 vs floor 15.1 (one attack of 3) — added Success: Half; dice 17 → 28
[reskin] signature template: drain -> Actions/"Vitality Leech" ("the concept's central verb is 'vampire' — draining a creature within 30 feet, de [verb: vampire:concept]")
[reskin] signature idea (trait): "Wounds it opens on a living creature keep weeping toward it — whenever it strikes a foe already bleeding from its bite, the stolen blood knits its own torn flesh." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Wounds it opens on a living creature keep weeping toward it — whenever it strikes a foe already bleeding from its bite, the stolen blood knits its own torn flesh." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, absorption, warded-mending)
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Bite" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Kraken — a 2024 sheet

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

```
Kraken

Gargantuan Monstrosity, Neutral

AC 18
Initiative +0 (10)

HP 481 (26d20 + 208)

Speed 30 ft., Swim 120 ft.

MOD
SAVE
STR
30
+10
+17
INT
22
+6
+6
MOD
SAVE
DEX
11
+0
+0
WIS
18
+4
+11
MOD
SAVE
CON
26
+8
+15
CHA
20
+5
+5

Skills Athletics +17, Perception +11

Immunities Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained

Senses truesight 120 ft.; Passive Perception 21

Languages Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.

Amphibious. The kraken can breathe air and water.

Siege Monster. The kraken deals double damage to objects and structures.

Actions

Multiattack. The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.

Tentacle. Melee Attack Roll: +17, reach 30 ft. 34 (7d6 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.

Fling. The kraken throws a Large or smaller creature Grappled by it to a space it can see within 60 feet of itself that isn't in the air. Dexterity Saving Throw: DC 25, the creature thrown and each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Lightning Strike. Dexterity Saving Throw: DC 25, one creature the kraken can see within 120 feet. Failure: 58 (13d8) Lightning damage. Success: Half damage.

Swallow. Dexterity Saving Throw: DC 25, one creature Grappled by the kraken (it can have up to four creatures swallowed at a time). Failure: 23 (3d8 + 10) Piercing damage. If the target is Large or smaller, it is swallowed and no longer Grappled. A swallowed creature has the Restrained condition, has Total Cover against attacks and other effects outside the kraken, and takes 24 (7d6) Acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken with the Prone condition. If the kraken dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 15 feet of movement, exiting Prone.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the kraken can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Bolt. The kraken uses Lightning Strike.

Toxic Ink. Constitution Saving Throw: DC 25, each creature in a 15-foot Emanation originating from the kraken while it is underwater. Failure: The target has the Blinded and Poisoned conditions until the end of the kraken's next turn. The kraken then moves up to its Speed. Failure or Success: the kraken can't take this action again until the start of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and drag into the trench [behavior] | body of living abyssal brine [body] | lamprey maw at the mantle's base [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Black Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Muravath the Sable" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Black Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Kraken — a print donor

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 17 → 19.5; sustained 82 (2 × Tentacle); nova none; dmg 82

```
Kraken
Gargantuan monstrosity, neutral evil
Armor Class 18 (natural armor)
Hit Points 481 (26d20 + 208)
Speed 30 ft., swim 120 ft.
STR 30 (+10), DEX 11 (+0), CON 26 (+8), INT 22 (+6), WIS 18 (+4), CHA 20 (+5)
Saving Throws STR +17, CON +15, WIS +11
Skills Athletics +17, Perception +11
Damage Immunities cold, lightning
Condition Immunities frightened, grappled, paralyzed, restrained
Senses truesight 120 ft., passive Perception 21
Languages understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.
Challenge 24 (62,000 XP)
Proficiency Bonus +7

Traits
Legendary Resistance (3/Day): If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious: The kraken can breathe air and water.
Siege Monster: The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 41 (7d8 + 10) bludgeoning damage. The target is grappled (escape DC 25) by one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (it can have up to four creatures swallowed at a time). On a failed save, the target takes 23 (3d8 + 10) piercing damage. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. Regardless of whether the saving throw succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: dragging prey into crushing depths [behavior] | a body condensed from black trench brine [body] | choking clouds of superdense brine [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Brine Burst (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Trench Sovereign" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Brine Burst (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Maddraith — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Maddraith | 18 | caster-21-warpriest | ok | FAIL: hot-offense | FAIL: punctuation | ok | ok | ok | ok |

- bands · soft · band: reads CR 20 (print at 18 reads 12.5–18.5, n=5)
- bands · fail · hot-offense: offense alone reads CR 27, 9 over — past print's own ceiling (the Adult Brass Dragon at +7)
- structure · fail · punctuation: Actions/Grimsword: a ". ,", ", ," or ". and" sequence in the text
- read: def 13 / off 27 → 20; sustained 260 (2 × Grimsword + legendary Graveblade Swing); nova Grave Oath 72; dmg 260

```
Maddraith

Medium Undead, Neutral Evil

AC 19
Initiative +3 (13)

HP 247 (26d8 + 130)

Speed 40 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
16
+3
+3
WIS
24
+7
+13
MOD
SAVE
CON
21
+5
+11
CHA
20
+5
+11

Skills Perception +13, Religion +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 23

Languages Common

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If Maddraith fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Maddraith makes two Grimsword attacks. It can replace one attack with a use of Spellcasting to cast Hold Person.

Grimsword. Melee or Ranged Attack Roll: +13, reach 5 ft. or range 120 ft. 52 (10d8 + 7) Necrotic damage. Hit or Miss: The weapon magically returns to Maddraith's hand.

Grave Oath (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 20-foot Emanation originating from Maddraith. Failure: 72 (16d8) Necrotic damage. Success: Half damage only.

Spellcasting. Maddraith casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):

- At Will: Light, Hold Person, Blindness/Deafness, Bestow Curse

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Maddraith gains 26 (4d12) Temporary Hit Points.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Maddraith can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Graveblade Swing. Maddraith makes one Grimsword attack.

Rise to War. Maddraith moves up to half its Speed without provoking Opportunity Attacks.

Damned Recall. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("a death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: profane prayers as weapon strikes [behavior] | raising the slain into a damned legion [behavior] | grave-wreathed plate and unblessed blade [object]
[reskin] signature idea (action): "Maddraith drives his weapon into a foe and uses the wound as a mouthpiece, leaving a fragment of his profane prayer lodged in the flesh. Until the target tears free or someone else breaks the prayer, Maddraith's nearby undead servants hear the litany and fight with unnatural precision. If the target dies while still bearing the prayer, the nearest fallen ally rises immediately as a grave-wreathed " [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature miss: action — "Maddraith drives his weapon into a foe and uses the wound as a mouthpiece, leaving a fragment of his profane prayer lodged in the flesh. Until the target tears free or someone else breaks the prayer, Maddraith's nearby undead servants hear the litany and fight with unnatural precision. If the target dies while still bearing the prayer, the nearest fallen ally rises immediately as a grave-wreathed " [rider/on_hit/damage] — the model found no template that holds it (offered: bolt-restrain, bolt-drag, bolt-mark, condition-payoff, herd, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 14.3 vs floor 8.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Each time Maddraith lays low a living creature, the death rattle becomes a new verse of his gospel. For a short while afterward, his weapon and his voice carry that verse, and any enemy he strikes feels the prayer crawl toward its own end." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Each time Maddraith lays low a living creature, the death rattle becomes a new verse of his gospel. For a short while afterward, his weapon and his voice carry that verse, and any enemy he strikes feels the prayer crawl toward its own end." [trait/always/damage] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Grave Oath (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Parry Strike); nova none; dmg 156

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Athletics +14, Perception +10

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses truesight 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes three attacks, using Bite, Devilish Claw, or Fiery Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Force damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Parry Strike. The pit fiend makes one Bite attack.

Hold the Line. The pit fiend takes the Dodge action. The pit fiend can't take this action again until the start of its next turn.

Iron Shove. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend and has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender-leader type=Fiend mechanics=none — defender-leader: ✓ ("a pit fiend general") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: command aura that bolsters allies [aura] | iron-shod body and parry [body] | tactical leadership on the front line [behavior]
[reskin] print canon route: "a pit fiend general" is the Pit Fiend — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] print canon: "a pit fiend general" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes fly — the Pit Fiend's
[reskin] print canon senses: "truesight 120 ft." — the Pit Fiend's
[reskin] print canon name: "Pit Fiend General" -> "Pit Fiend" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Iron Maul" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---

## Coronarch — one marked soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Coronarch | 24 | caster-21 | ok | SOFT: under | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 24, within print's own ±1
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 26 → 24; sustained 207 (3 × Grave Bolt + legendary Deathly Teleport); nova none; dmg 207

```
Coronarch

Medium Undead, Neutral Evil

AC 21
Initiative +3 (13)

HP 442 (59d8 + 177)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
28
+9
+16
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +16, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft., truesight 30 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the coronarch fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the coronarch reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the coronarch's lair.

Actions

Multiattack. The coronarch makes three attacks, using Grave Bolt, Eldritch Burst, or Necrotic Chill in any combination. It can replace one attack with a use of (A) Grave Binding or (B) Spellcasting to cast Bestow Curse.

Grave Bolt. Ranged Attack Roll: +16, range 80/320 ft. 58 (11d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 33 (7d6 + 9) Force damage, and the target has the Frightened condition until the start of the coronarch's next turn.

Necrotic Chill. Melee Attack Roll: +16, reach 5 ft. 33 (7d6 + 9) Cold damage, and the target has the Frightened condition until the start of the coronarch's next turn.

Spellcasting. The coronarch casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 24):

- At Will: Misty Step, Bestow Curse
- 1/Day Each: Blight (level 8 version), Cloudkill (level 9 version)

Grave Binding. Dexterity Saving Throw: DC 23, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the coronarch's next turn.

Reactions

Protective Magic (3/Day). Trigger: The coronarch is hit by an attack roll. Response: The coronarch casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the coronarch can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The coronarch teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 23, each creature that isn't an Undead in a 20-foot Emanation originating from the coronarch. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the coronarch can't take this action again until the start of its next turn.

Crushing Dread. The coronarch casts Fear, using the same spellcasting ability as Spellcasting. The coronarch can't take this action again until the start of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("an archlich enthroned on a sun of bone") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: a throne made from a dead sun's bone [body] | raining grave-bolts from on high [behavior] | a corona of consuming necrotic light [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The coronarch tears a fistful of bone from its own throne and hurls it at a foe, where it takes root and grows into a cage of splintered sun-bone. The victim is trapped in place and the bone slowly grinds away at them, but the coronarch can only spare so much of the throne; doing this too often shortens its own reach and power." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Binding Lash" EV 31.4 vs floor 29.6 (one attack of 3) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a creature is frightened by the coronarch, its terror kindles the bone sun: the corona flares brighter, and the coronarch draws vigor from the fear, mending its own wounds as it feeds. The more fear it spreads, the harder it is to kill." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Whenever a creature is frightened by the coronarch, its terror kindles the bone sun: the corona flares brighter, and the coronarch draws vigor from the fear, mending its own wounds as it feeds. The more fear it spreads, the harder it is to kill." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, warded-mending, absorption, bloodied-burst)
[reskin] chassis nova: "Corona Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Bone Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Corona Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---

## Belkharion the Sworn — bands soft

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Belkharion the Sworn | 18 (2014) | caster-21-warpriest | ok | SOFT: hot-offense | FAIL: punctuation | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- structure · fail · punctuation: Actions/Graveblade: a ". ,", ", ," or ". and" sequence in the text
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Graveblade + legendary Cut Down); nova Profane Command 72; dmg 200

```
Belkharion the Sworn
Medium undead, neutral
Armor Class

19 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


22 (+6)

	

16 (+3)

	

21 (+5)

	

16 (+3)

	

18 (+4)

	

20 (+5)

Skills: 

Perception +10, Religion +9

Saving Throws: 

CON +11, WIS +10, CHA +11

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 20

Languages: 

All languages

Challenge

18 (20,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Belkharion fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: Belkharion makes two Graveblade attacks. It can replace one attack with a use of Vitality Leech or Spellcasting to cast suggestion.
Graveblade: Melee or Melee or Ranged Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) necrotic damage. The weapon magically returns to Belkharion's hand.
Profane Command (Recharge 5-6): Each creature within 20 feet of Belkharion must make a DC 19 Constitution saving throw, taking 72 (16d8) necrotic damage on a failed save, or half as much damage on a successful one.
Spellcasting: Belkharion casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 18):

At will: misty step, suggestion, fear, bestow curse
Vitality Leech: One creature within 30 feet of Belkharion must make a DC 19 Constitution saving throw, taking 42 (12d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, Belkharion regains hit points equal to half the damage dealt.
Legendary Actions

Belkharion can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Belkharion regains spent legendary actions at the start of its turn.

Cut Down: Belkharion makes one Graveblade attack.
Grave March: Belkharion moves up to half its speed without provoking opportunity attacks.
Damned Rebuke: One creature within 30 feet of Belkharion must succeed on a DC 19 Wisdom saving throw or be frightened of Belkharion until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: commanding a damned legion [behavior] | grave-armed death knight [body] | blade that carries unholy war-prayers [object]
[reskin] signature idea (action): "Belkharion drives his blade into the ground and pours himself into the blade as it goes. Every nearby creature the graveblade has already wounded, or that has already been marked by his profane command, feels the blood-cooling weight of death settle on it, and any of them that flee or seek to strike at the knight's flank find the grave pulling at their heels." [action/save/condition] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Grave-Brand Interment" EV 11 vs floor 21.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Grave-Brand Interment" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 32.6 vs floor 21.3 (one attack of 2) — added Success: Half; dice 24 → 42
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The blade is not merely a weapon but a banner. While Belkharion holds the graveblade out and unbroken, the death he scatters with it does not disperse; it clings to those it touches, and rallies back to him, so that danger turned against him is drawn back into the doomed ranks he leads." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "The blade is not merely a weapon but a banner. While Belkharion holds the graveblade out and unbroken, the death he scatters with it does not disperse; it clings to those it touches, and rallies back to him, so that danger turned against him is drawn back into the doomed ranks he leads." [trait/always/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Profane Command (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```
