# Review batch — print-heads-2026-10-04T09-15-17

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varcolac the Undying | 15 | 2024 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Sanguine Sovereign | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | soft (1) |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Oathsworn Thanegrast | 18 | 2024 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Morgrave the Muster | 18 (2014) | 2014 | caster-21-warpriest | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuar the Thronebound | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Sunreaper Osswald | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---

## Varcolac the Undying — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Varcolac the Undying | 15 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 91 a round is 21% under the card's 115
- bands · soft · band: reads CR 12.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 66 (3 × Grave Strike); nova Crimson Rush 71; dmg 91

```
Varcolac the Undying

Medium Undead, Neutral Evil

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

Slip Step. When a creature Varcolac can see ends its turn within 5 feet of it, Varcolac can move up to 10 feet without provoking Opportunity Attacks.

Legendary Resistance (3/Day). If Varcolac fails a saving throw, it can choose to succeed instead.

Misty Escape. If Varcolac drops to 0 Hit Points outside its resting place, Varcolac uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its Varcolac form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Varcolac form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Varcolac can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Varcolac has these weaknesses:


- Forbiddance: Varcolac can't enter a residence without an invitation from an occupant.
- Running Water: Varcolac takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Varcolac's heart while Varcolac has the Incapacitated condition in its resting place, Varcolac has the Paralyzed condition until the weapon is removed.
- Sunlight: Varcolac takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Varcolac makes three Grave Strike attacks. It can replace one attack with a use of Vampire's Reprisal.

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Crimson Rush (Recharge 5-6). Strength Saving Throw: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 71 (13d10) Necrotic damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Vampire's Reprisal. Strength Saving Throw: DC 19, one creature within 30 feet that is Prone. Failure: 24 (7d6) Necrotic damage. Success: Half damage.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 19, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 28 (8d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Varcolac regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Varcolac Spawn under Varcolac's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Varcolac isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Varcolac form. Anything it is wearing transforms with it.
While in bat form, Varcolac can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Varcolac can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Varcolac casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of Varcolac's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Varcolac.

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
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-binder: ✓ ("a vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves [behavior] | hexing curses that bind actions [behavior] | blood-fuelled regeneration [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Varcolac curses the strongest foe he can see, binding their will so their limbs answer to him instead of themselves. Until the curse is broken, the victim is dragged one step closer to obeying Varcolac as one of his pack, and he can spend that victim's own movement to pull them into the jaws of his waiting wolves." [action/save/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Opportunist's Lash" EV 18.6 vs floor 15.1 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a living creature is harmed by Varcolac or one of his beasts, some of its spilled vitality seeps through the shroud of bats and into him, knitting his wounds even as he remains untouched in the fight. The more prey his pack savages, the faster their master heals." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Whenever a living creature is harmed by Varcolac or one of his beasts, some of its spilled vitality seeps through the shroud of bats and into him, knitting his wounds even as he remains untouched in the fight. The more prey his pack savages, the faster their master heals." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, warded-mending)
[reskin] chassis nova: "Wolf Rush (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Bat Shroud" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Sunreaper Osswald — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sunreaper Osswald | 24 (2014) | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · aim-dpr: damage 165 a round is 35% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Poisoned rider on every hit with no save
- read: def 22 / off 22 → 22; sustained 165 (3 × Bone Shard + legendary Deathly Teleport); nova none; dmg 165

```
Sunreaper Osswald
Medium undead, neutral evil
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

darkvision 120 ft., truesight 30 ft., passive Perception 19

Languages: 

All

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Dead Sun Cinder. A creature Osswald damages sheds dim light in a 5-foot radius until the end of Osswald's next turn and can't benefit from being invisible while it does.
Legendary Resistance (3/Day). If Osswald fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, Osswald reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within Osswald's lair.
Protective Magic (3/Day) (Reaction). When Osswald is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Osswald makes three attacks, using Bone Shard, Eldritch Burst, or Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast ray of sickness.
Bone Shard: Melee or Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 44 (9d8 + 4) necrotic damage.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) force damage, and the target is poisoned until the start of Osswald's next turn.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) cold damage, and the target is poisoned until the start of Osswald's next turn.
Spellcasting: Osswald casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

At will: ray of sickness, bestow curse
1/day each: blight (cast at 8th level), vampiric touch (cast at 9th level)
Legendary Actions

Osswald can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Osswald regains spent legendary actions at the start of its turn.

Deathly Teleport: Osswald teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of Osswald must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Osswald can't take this action again until the start of its next turn.
Frightening Gaze: Osswald casts fear, using the same spellcasting ability as Spellcasting. Osswald can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: throne of fused bone that is itself a dead star [object] | necrotic solar blasts and withering aura [body] | unwilling to abandon its throne, fights to the death [behavior]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Osswald tears a splinter of its dead star free and hurls it. The shard explodes at the target, and the necrotic fire devours warmth, leaping to every wounded creature near the impact — those already sickened by its grasp catch like dry tinder." [action/save/damage] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Osswald tears a splinter of its dead star free and hurls it. The shard explodes at the target, and the necrotic fire devours warmth, leaping to every wounded creature near the impact — those already sickened by its grasp catch like dry tinder." [action/save/damage] — the model found no template that holds it (offered: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal)
[reskin] value check: "Leaden Touch" EV 8 vs floor 30.2 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Leaden Touch" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone throne itself is a dead star. Whenever Osswald strikes with its bone shards, a cinder of that dead sun clings to the wound for a moment, dimming the victim's vitality until they shrug it off." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): marking-light -> Traits/"Dead Sun Cinder" ("a cinder of that dead sun clings to the wound for a moment, dimming the victim's [shape fit, no verb match]")
[reskin] chassis nova: "Withering Radiance (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Grasp" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Withering Radiance (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---

## Sanguine Sovereign — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sanguine Sovereign | 15 (2014) | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Hag's Shredding Hex 71; dmg 85

```
Sanguine Sovereign
Medium undead, neutral evil
Armor Class

18 (natural armor)

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

Perception +7, Stealth +8

Saving Throws: 

DEX +8, WIS +7

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

Reactive Glide. When a creature the sanguine sovereign can see ends its turn within 5 feet of it, the sanguine sovereign can move up to 10 feet without provoking opportunity attacks.
Legendary Resistance (3/Day). If the sanguine sovereign fails a saving throw, it can choose to succeed instead.
Misty Escape. If the sanguine sovereign drops to 0 hit points outside its resting place, the sanguine sovereign uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its sanguine sovereign form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its sanguine sovereign form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The sanguine sovereign can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The sanguine sovereign has these weaknesses: Forbiddance: the sanguine sovereign can't enter a residence without an invitation from an occupant.
Running Water: the sanguine sovereign takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the sanguine sovereign's heart while the sanguine sovereign is incapacitated in its resting place, the sanguine sovereign is paralyzed until the weapon is removed.
Sunlight: the sanguine sovereign takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If the sanguine sovereign isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its sanguine sovereign form. Anything it is wearing transforms with it.
While in bat form, the sanguine sovereign can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the sanguine sovereign can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action). The sanguine sovereign casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the sanguine sovereign's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the sanguine sovereign.

Actions
Multiattack: The sanguine sovereign makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Hag's Shredding Hex (Recharge 5-6): Each creature in a 60-foot-long, 5-foot-wide line must make a DC 17 Strength saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 17 Constitution saving throw, taking 24 (7d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the sanguine sovereign regains hit points equal to that amount. A humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a sanguine sovereign spawn under the sanguine sovereign's control.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-binder: ✓ ("a vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves [behavior] | layered curses that steal actions [behavior] | blood-fed vampire body [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The sovereign commands a shadow-flock of its bats and wolves to swarm a wide area, turning loyal beasts into a blood-hungry storm. Every creature caught in the swarm must choose to be torn at by fangs and wings or break its own guard and be quietly fed on by the sovereign. The command cannot be called again until the flock regathers." [action/once_per_fight/damage] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Disarming Twist" EV 0 vs floor 12.5 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its vampire body steals the life it spills: whenever it draws blood from a living creature with its own claws, it is heartened by the stolen vitality and can keep pressing the attack through sheer predatory vigor." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Its vampire body steals the life it spills: whenever it draws blood from a living creature with its own claws, it is heartened by the stolen vitality and can keep pressing the attack through sheer predatory vigor." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] chassis nova: "Hag's Shredding Hex (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "telepathy 120 ft. plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Void Step" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 24
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
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

Gargantuan Monstrosity, Unaligned

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

Resistances Fire

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
[concept] signature elements: tentacle constriction and dragging prey to its maw [behavior] | a body of hyper-pressurized, scalding brine [body] | the crushing, lightless depths of the black trench [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Scalding Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Trench Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Scalding Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
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
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

```
Kraken
Gargantuan monstrosity, unaligned
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
Multiattack: The kraken makes two attacks: one with its Tentacle and one with its Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 34 (7d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its Speed. On a failed or successful save, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and constriction [behavior] | brine-soaked hide and ink cloud [body] | abyssal trench lair [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Abyssal Eruption (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Trench Sovereign" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon attack: "Hooked Arms" -> "Tentacle" — the Kraken's own row
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Abyssal Eruption (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Oathsworn Thanegrast — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Thanegrast | 18 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 5 over; the HP axis pulls the read to 18
- read: def 13 / off 23 → 18; sustained 170 (2 × Graveblade + legendary Render Blow); nova Grave-Soil Bloom 72; dmg 170

```
Oathsworn Thanegrast

Medium Undead, Neutral

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

Senses darkvision 120 ft., tremorsense 30 ft.; Passive Perception 23

Languages the languages it knew in life

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If Thanegrast fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Thanegrast makes two Graveblade attacks. It can replace one attack with a use of Spellcasting to cast Bestow Curse.

Graveblade. Melee or Ranged Attack Roll: +13, reach 5 ft. or range 120 ft. 34 (6d8 + 7) Slashing damage. Hit or Miss: The weapon magically returns to Thanegrast's hand.

Grave-Soil Bloom (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 20-foot Emanation originating from Thanegrast. Failure: 72 (16d8) Necrotic damage. Success: Half damage only.

Spellcasting. Thanegrast casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):

- At Will: Bestow Curse, Blindness/Deafness, Fear
- 1/Day Each: Cloudkill (level 9 version)

Bonus Actions

On the Grave Oath (2/Day). Each ally within 30 feet of Thanegrast gains 26 (4d12) Temporary Hit Points.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Thanegrast can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Render Blow. Thanegrast makes one Graveblade attack.

Death March. Thanegrast moves up to half its Speed without provoking Opportunity Attacks.

Dread Muster. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: raises and commands a damned legion [behavior] | profane war-prayers that heal allies and wither enemies [behavior] | sword wreathed in grave-soil and unholy fire [object]
[reskin] signature idea (action): "Thanegrast plants its blade and calls up every corpse it has ever commanded, and a ring of spectral soldiers rises around it, striking as it strikes. While the circle stands, each time Thanegrast lands a hit, the soldiers replay the same blow on the same foe, and each time an enemy wounds him, one soldier steps in and takes the wound instead, crumbling to dust." [action/once_per_fight/damage] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Thanegrast plants its blade and calls up every corpse it has ever commanded, and a ring of spectral soldiers rises around it, striking as it strikes. While the circle stands, each time Thanegrast lands a hit, the soldiers replay the same blow on the same foe, and each time an enemy wounds him, one soldier steps in and takes the wound instead, crumbling to dust." [action/once_per_fight/damage] — the model found no template that holds it (offered: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 14.3 vs floor 8.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thanegrast's authority over his dead is absolute; whenever a creature he has raised is destroyed, its bones drag themselves back into rank beside him at the start of his next turn, healed enough to fight on." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Thanegrast's authority over his dead is absolute; whenever a creature he has raised is destroyed, its bones drag themselves back into rank beside him at the start of his next turn, healed enough to fight on." [trait/always/resource] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Grave-Soil Bloom (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 19 / off 22 → 20.5; sustained 126 (3 × Bite + legendary Parry For the Line); nova none; dmg 126

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

Guard Aura. While in a 10-foot Emanation originating from the pit fiend, the pit fiend's allies have Advantage on saving throws, provided the pit fiend doesn't have the Incapacitated condition.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes three attacks, using Bite, Devilish Claw, or Fiery Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Force damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Parry For the Line. The pit fiend makes one Bite attack.

Hold the Line. The pit fiend takes the Dodge action. The pit fiend can't take this action again until the start of its next turn.

Break Rank. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend and has the Prone condition.

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
[route] defender-leader type=Fiend mechanics=teleport, aura — defender-leader: ✓ ("general") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: aura of command that buffs allies [aura] | iron-hardened devil body and parry [body] | tactical repositioning and extra attacks for troops [behavior]
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
[reskin] print canon attack: "Iron Glaive" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---

## Ossuar the Thronebound — one marked soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossuar the Thronebound | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 24 → 23; sustained 168 (3 × Bone Bolt + legendary Deathly Teleport); nova none; dmg 168

```
Ossuar the Thronebound

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

Senses truesight 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If Ossuar fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, Ossuar reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within Ossuar's lair.

Actions

Multiattack. Ossuar makes three attacks, using Bone Bolt, Eldritch Burst, or Dread Touch in any combination. It can replace one attack with a use of Spellcasting to cast Ray of Sickness.

Bone Bolt. Ranged Attack Roll: +16, range 80/320 ft. 45 (8d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage, and the target has the Frightened condition until the start of Ossuar's next turn.

Dread Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage, and the target has the Frightened condition until the start of Ossuar's next turn.

Spellcasting. Ossuar casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):

- At Will: Ray of Sickness, Misty Step, Bestow Curse
- 1/Day Each: Blight (level 8 version)

Reactions

Protective Magic (3/Day). Trigger: Ossuar is hit by an attack roll. Response: Ossuar casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Ossuar can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. Ossuar teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from Ossuar. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: Ossuar can't take this action again until the start of its next turn.

Frightening Gaze. Ossuar casts Fear, using the same spellcasting ability as Spellcasting. Ossuar can't take this action again until the start of its next turn.

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
[concept] signature elements: bolts of death loosed from a bone throne [behavior] | a throne that is a sun of bone [object] | the marrow-light of a dead star [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Gathering the throne's cold marrow, Ossuar fires a single great bolt of necrotic death at one enemy it can see. The bolt tears through flesh and soul alike, and the wound it leaves keeps burning: for a short while, every time that enemy is hurt, the same cold eats deeper into it." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Leaden Touch" EV 7.8 vs floor 29.6 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Leaden Touch" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ossuar draws its power from the bone sun it sits upon; when it strikes down a living creature, a mote of that stolen life rises to the throne and steadies its next shot. Until the end of its next turn, attacks loosed from the throne bite deeper." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Ossuar draws its power from the bone sun it sits upon; when it strikes down a living creature, a mote of that stolen life rises to the throne and steadies its next shot. Until the end of its next turn, attacks loosed from the throne bite deeper." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Solar Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Large -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Sceptre" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Solar Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```
