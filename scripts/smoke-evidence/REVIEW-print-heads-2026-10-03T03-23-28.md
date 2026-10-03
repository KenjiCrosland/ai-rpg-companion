# Review batch — print-heads-2026-10-03T03-23-28

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands fail). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varrick Von Bluttenburg | 15 | 2024 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Crimson Bridegroom | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Grim Sanguine | 18 | 2024 | caster-21-warpriest | ok | FAIL: hot-offense | ok | ok | ok | ok | ok | FAIL (1) |
| Mortis Rex | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Suncorpse King | 24 | 2024 | lurker-17 | ok | FAIL: under | ok | ok | ok | ok | ok | FAIL (1) |
| Ossuary Sun | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- caster-21-warpriest / bands: 1
- lurker-17 / bands: 1



---

## Varrick Von Bluttenburg — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Varrick Von Bluttenburg | 15 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 81 a round is 30% under the card's 115
- bands · soft · band: reads CR 11.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 9 / off 14 → 11.5; sustained 81 (3 × Grave Strike); nova none; dmg 81

```
Varrick Von Bluttenburg

Small Undead, Neutral Evil

AC 17
Initiative +6 (16)

HP 202 (27d6 + 108)

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
+8
MOD
SAVE
DEX
22
+6
+11
WIS
15
+2
+2
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

Skills Perception +7, Stealth +16

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 15 (XP 13,000; PB +5)

Traits

Bleeding Compass. Varrick knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Legendary Resistance (3/Day). If Varrick fails a saving throw, it can choose to succeed instead.

Misty Escape. If Varrick drops to 0 Hit Points outside its resting place, Varrick uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Varrick can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Varrick has these weaknesses:


- Forbiddance: Varrick can't enter a residence without an invitation from an occupant.
- Running Water: Varrick takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Varrick's heart while Varrick has the Incapacitated condition in its resting place, Varrick has the Paralyzed condition until the weapon is removed.
- Sunlight: Varrick takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Varrick makes three Grave Strike attacks. It can replace one attack with a use of Sanguine Command.

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 20 (4d6 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Sanguine Command. Constitution Saving Throw: DC 18, one creature within 30 feet. Failure: 35 (10d6) Necrotic damage, and Varrick regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 18, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Varrick regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under Varrick's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Varrick isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, Varrick can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Varrick can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Varrick casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of Varrick's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Varrick.

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
[route] lurker-phantom type=Undead mechanics=aura — defender-leader: a Undead commands no troops | lurker-phantom: ✓ ("vampire lord") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves as extensions of its will [behavior] | drifts through walls and stone [behavior] | blood-draining bite that heals it [behavior]
[reskin] print canon route: the Vampire's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Varrick reaches through the blood-oath that binds his court, commanding every bat and wolf sworn to him to fight through one another's eyes. For as long as he keeps his hold on that link, and for a short time after he lets it drop, his beasts do not act on base instinct — they read the battlefield the way he does, refusing to be baited or divided and giving no ground even when wounded. He may brea" [action/always/condition] — menu: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into drain
[reskin] value check: "Sanguine Command" EV 27.1 vs floor 18.2 (one attack of 3) — added Success: Half; dice 21 → 35
[reskin] signature template: drain -> Actions/"Sanguine Command" ("The idea's own verb is vampire — a vampire lord drains and heals from the damage [verb: vampire:concept]")
[reskin] signature idea (trait): "Wounds Varrick deals to a living creature do not simply bleed — they answer him. Any creature he fangs continues to seep life toward him for a short while afterward, and the next time his bats or wolves strike that creature, they carry a trace of its stolen blood back to him, mending him a little further." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): faultless-tracker -> Traits/"Bleeding Compass" ("the wounds Varrick deals answer him — his bats and wolves strike the marked crea [shape fit, no verb match]")
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common, Infernal, telepathy 60 ft." -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Bite" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 35
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---

## Ossuary Sun — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossuary Sun | 24 (2014) | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 171 a round is 33% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Corona Shift
- read: def 22 / off 22 → 22; sustained 171 (3 × Eldritch Burst + legendary Deathly Teleport); nova none; dmg 171

```
Ossuary Sun
Medium undead, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

487 (65d8 + 195)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

18 (+4)

	

16 (+3)

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +9, Stealth +11

Saving Throws: 

DEX +11, WIS +9

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

Scouring Mark. The ossuary sun knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Legendary Resistance (4/Day). If the ossuary sun fails a saving throw, it can choose to succeed instead.
Corona Shift. When a creature the ossuary sun can see ends its turn within 5 feet of it, the ossuary sun can move up to 20 feet without provoking Opportunity Attacks.
Spirit Jar. If destroyed, the ossuary sun reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the ossuary sun's lair.
Protective Magic (Reaction). The ossuary sun casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The ossuary sun makes three attacks, using Eldritch Burst, Hurled Debris, or Paralyzing Touch. It can replace one attack with a use of Opportunist's Lash.
Eldritch Burst: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 46 (12d6 + 4) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 46 (12d6 + 4) cold damage. and the target has the Paralyzed condition until the start of the ossuary sun's next turn.
Hurled Debris: Ranged Weapon Attack: +11 to hit, range 90/240 ft., one target. Hit: 40 (8d8 + 4) necrotic damage.
Opportunist's Lash: Strength Saving Throw: DC 21, one creature within 30 feet that is Frightened of the ossuary sun. On a failed save, 38 (11d6) necrotic damage. On a successful save, half as much damage.
Spellcasting: The ossuary sun casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20): At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/Day Each: Animate Dead, Dimension Door, Plane Shift
1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions

The ossuary sun can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ossuary sun regains spent legendary actions at the start of its turn.

Deathly Teleport: The ossuary sun teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the ossuary sun must make a DC 21 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Dread Command: The ossuary sun casts Fear, using the same spellcasting ability as Spellcasting. The ossuary sun can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura — caster: ✓ ("an archlich enthroned") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: throne of fused skeletal remains that orbits and attacks [object] | ranged necrotic eclipse beams that strip flesh to bone [behavior] | corona of blinding bone-dust that punishes approach [aura]
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 18, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The lich tears free a cluster of its own ribs and skulls and hurls them spinning around one foe. Until the start of the lich's next turn, the wreckage orbits that creature, whispering names of the dead, and the lich can reach through the ring to strike the creature no matter how far it runs or hides." [action/always/condition] — menu: gaze-single, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: lure, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge)
[reskin] signature miss: action — "The lich tears free a cluster of its own ribs and skulls and hurls them spinning around one foe. Until the start of the lich's next turn, the wreckage orbits that creature, whispering names of the dead, and the lich can reach through the ring to strike the creature no matter how far it runs or hides." [action/always/condition] — the model found no template that holds it (offered: gaze-single, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter, lure, hook-rider)
[reskin] value check: "Opportunist's Lash" EV 29.5 vs floor 23.9 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bone sun's calcified halo remembers every creature the lich has scoured with its eclipse. Those scorched by that beam catch the staring light of a thousand skulls; they cannot hide from the lich's sight, and its bone lances find them unerringly." [trait/always/condition] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): faultless-tracker -> Traits/"Scouring Mark" ("Those scorched by that beam catch the staring light of a thousand skulls; they c [verb: unerringly:idea, cannot hide:idea]")
[reskin] chassis nova: "Eclipse Beam (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Rib Spear" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Eclipse Beam (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Orbital Drift" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---

## Crimson Bridegroom — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Crimson Bridegroom | 15 (2014) | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Crimson Torrent 71; dmg 85

```
Crimson Bridegroom
Small undead, neutral evil
Armor Class

18 (natural armor)

Hit Points: 

210 (28d6 + 112)

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

Sanguine Scent. The crimson bridegroom can pinpoint the location of moving creatures within 120 feet of itself.
Batwings. When a creature the crimson bridegroom can see ends its turn within 5 feet of it, the crimson bridegroom can move up to 10 feet without provoking opportunity attacks.
Legendary Resistance (3/Day). If the crimson bridegroom fails a saving throw, it can choose to succeed instead.
Misty Escape. If the crimson bridegroom drops to 0 hit points outside its resting place, the crimson bridegroom uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The crimson bridegroom can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The crimson bridegroom has these weaknesses: - Forbiddance: the crimson bridegroom can't enter a residence without an invitation from an occupant.
Running Water: the crimson bridegroom takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the crimson bridegroom's heart while the crimson bridegroom is incapacitated in its resting place, the crimson bridegroom is paralyzed until the weapon is removed.
Sunlight: the crimson bridegroom takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift. As a bonus action, if the crimson bridegroom isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the crimson bridegroom can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the crimson bridegroom can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6). As a bonus action, the crimson bridegroom casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the crimson bridegroom's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the crimson bridegroom.

Actions
Multiattack: The crimson bridegroom makes three Grave Strike attacks. It can replace one attack with a use of Bridal Omen.
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Crimson Torrent (Recharge 5-6): Each creature in a 60-foot-long, 5-foot-wide line must make a DC 18 Strength saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn.
Bridal Omen: One creature within 60 feet must succeed on a DC 18 Wisdom saving throw or be frightened until the end of the crimson bridegroom's next turn. If the target was already frightened by this ability, it also takes 24 (7d6) necrotic damage.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 18 Constitution saving throw, taking 24 (7d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the crimson bridegroom regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the crimson bridegroom's control.
```

**Engine trace**

```
[route] skirmisher-skulker type=Undead mechanics=aura — defender-leader: a Undead commands no troops | skirmisher-skulker: ✓ ("vampire lord") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: commanding a swarm of bats and wolves [behavior] | body made of congealed and flowing blood [body] | dissolving into vapor and bats to escape [aura]
[reskin] print canon route: the Vampire's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The bridegroom bleeds his own wounds into the air, and the spilled blood knits itself into a pack of wolf-shades that burst from the floor around his enemies. Each shade snaps at a nearby foe and then remains, harrying anyone who tries to move away or strike the bridegroom, until it is destroyed or the bridegroom wills it gone. He can call the pack only once before his veins run dry, but while the" [action/once_per_fight/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature miss: action — "The bridegroom bleeds his own wounds into the air, and the spilled blood knits itself into a pack of wolf-shades that burst from the floor around his enemies. Each shade snaps at a nearby foe and then remains, harrying anyone who tries to move away or strike the bridegroom, until it is destroyed or the bridegroom wills it gone. He can call the pack only once before his veins run dry, but while the" [action/once_per_fight/condition] — the model found no template that holds it (offered: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter)
[reskin] value check: "Creeping Dread" EV 16.5 vs floor 12.5 (one attack of 3) — dice 13 → 24
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bridegroom's body is not solid flesh but a thin shell over a rushing torrent of stolen blood. Whenever he is struck or grazed, that blood leaks into the air as a red mist that clings to the attacker and marks them, so the bridegroom and his beasts can smell where they are and hunt them through any darkness." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): uncanny-sense -> Traits/"Sanguine Scent" ("struck or grazed leaks blood mist that clings to the attacker and marks them, so [verb: smell:idea, smells:idea, blood:idea]")
[reskin] chassis nova: "Crimson Torrent (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 60 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Bloodletting Claws" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Mistborne" is the seat's, not the Vampire's
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
| Kraken | 24 | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Tentacle: a Restrained rider on every hit with no save
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

```
Kraken
Gargantuan Monstrosity, Neutral Evil
AC 18
HP 481 (26d20 + 208)
Speed 30 ft., Swim 120 ft.
STR 30 DEX 11 CON 26 INT 22 WIS 18 CHA 20
Skills Athletics +17, Perception +11
Immunities Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained
Senses truesight 120 ft.; Passive Perception 21
Languages Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.
CR 24

Traits
Legendary Resistance (3/Day). If the vurn-kalthas fails a saving throw, it can choose to succeed instead.
Amphibious. The vurn-kalthas can breathe air and water.
Siege Monster. The vurn-kalthas deals double damage to objects and structures.

Actions
Multiattack. The vurn-kalthas makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle. *Melee Attack Roll:* +17, reach 30 ft. 34 (7d6 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.
Fling. The vurn-kalthas throws a Large or smaller creature Grappled by it to a space it can see within 60 feet of itself that isn't in the air. *Dexterity Saving Throw*: DC 25, the creature thrown and each creature in the destination space. *Failure:*  18 (4d8) Bludgeoning damage, and the target has the Prone condition. *Success:*  Half damage only.
Lightning Strike. *Dexterity Saving Throw*: DC 25, one creature the vurn-kalthas can see within 120 feet. *Failure:*  58 (13d8) Lightning damage. *Success:*  Half damage.
Swallow. *Dexterity Saving Throw*: DC 25, one creature Grappled by the vurn-kalthas (it can have up to four creatures swallowed at a time). *Failure:*  23 (3d8 + 10) Piercing damage. If the target is Large or smaller, it is swallowed and no longer Grappled. A swallowed creature has the Restrained condition, has Total Cover against attacks and other effects outside the vurn-kalthas, and takes 24 (7d6) Acid damage at the start of each of its turns.
If the vurn-kalthas takes 50 damage or more on a single turn from a creature inside it, the vurn-kalthas must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the vurn-kalthas with the Prone condition. If the vurn-kalthas dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 15 feet of movement, exiting Prone.

Legendary Actions
Legendary Action Uses: 3. Immediately after another creature's turn, the vurn-kalthas can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
Storm Bolt. The vurn-kalthas uses Lightning Strike.
Toxic Ink. *Constitution Saving Throw*: DC 25, each creature in a 15-foot Emanation originating from the vurn-kalthas while it is underwater. *Failure:*  The target has the Blinded and Poisoned conditions until the end of the vurn-kalthas's next turn. The vurn-kalthas then moves up to its Speed. *Failure or Success*:  the vurn-kalthas can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: black-trench ambush from the abyss [behavior] | brine-soaked, lamprey-mouthed tentacles [body] | scalding abyssal brine that clings and dissolves [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Scalding Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Vurn-Kalthas" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
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
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Tentacle: a Restrained rider on every hit with no save
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
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 41 (7d8 + 10) bludgeoning damage, and the target is grappled (escape DC 25) by one of ten tentacles. Until this grapple ends, the target is restrained.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The thrown creature and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (the kraken can have up to four creatures swallowed at a time). On a failed save, the target takes 23 (3d8 + 10) piercing damage. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. Regardless of whether the saving throw succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: engulfing brine body [body] | drowning grip from the trench [behavior] | abyssal pressure and cold [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Erupting Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Maw of the Trench" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon attack: "Grinding Maw" -> "Tentacle" — the Kraken's own row
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Erupting Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Grim Sanguine — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Grim Sanguine | 18 | caster-21-warpriest | ok | FAIL: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 20 (print at 18 reads 12.5–18.5, n=5)
- bands · fail · hot-offense: offense alone reads CR 27, 9 over — past print's own ceiling (the Adult Brass Dragon at +7)
- read: def 13 / off 27 → 20; sustained 260 (2 × Grave Sword + legendary Grave Cleave); nova Dirge Wave 72; dmg 260

```
Grim Sanguine

Medium Undead, Lawful Neutral

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

Languages Common plus the languages it knew in life

CR 18 (XP 20,000; PB +6)

Traits

Litany of Ending. The grim sanguine explodes when it dies. Dexterity Saving Throw: DC 20, each creature in a 30-foot Emanation originating from the grim sanguine. Failure: 52 (15d6) Necrotic damage. Success: Half damage. The explosion destroys the grim sanguine's body.

Legendary Resistance (3/Day). If the grim sanguine fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The grim sanguine makes two Grave Sword attacks. It can replace one attack with a use of (A) Merciless Strike or (B) Spellcasting to cast Fear.

Grave Sword. Melee or Ranged Attack Roll: +13, reach 5 ft. or range 120 ft. 52 (10d8 + 7) Slashing damage. Hit or Miss: The weapon magically returns to the grim sanguine's hand.

Dirge Wave (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 20-foot Emanation originating from the grim sanguine. Failure: 72 (16d8) Necrotic damage. Success: Half damage only.

Spellcasting. The grim sanguine casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Misty Step, Fear, Bestow Curse

Merciless Strike. Wisdom Saving Throw: DC 20, one creature within 60 feet that has the Frightened condition. Failure: 55 (10d10) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the grim sanguine can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Grave Cleave. The grim sanguine makes one Grave Sword attack.

Moon March. The grim sanguine moves up to half its Speed without provoking Opportunity Attacks.

Words of Ending. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: leads a damned legion [behavior] | unholy war-prayers [behavior] | rune-etched greatsword [object]
[reskin] signature idea (action): "The grim sanguine raises its blade and booms a rolling casualty-call across the field. Every corpse or fallen creature nearby rises as a lesser undead soldier under its command for a short while, and these soldiers join its legion until cut down or dismissed. This lets the death knight grow its damned army in the middle of a fight, turning the battlefield's dead into fresh ranks." [action/once_per_fight/movement] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The grim sanguine raises its blade and booms a rolling casualty-call across the field. Every corpse or fallen creature nearby rises as a lesser undead soldier under its command for a short while, and these soldiers join its legion until cut down or dismissed. This lets the death knight grow its damned army in the middle of a fight, turning the battlefield's dead into fresh ranks." [action/once_per_fight/movement] — the model found no template that holds it (offered: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, rally)
[reskin] value check: "Merciless Strike" EV 49.6 vs floor 26.5 (one attack of 2) — dice 104 → 55 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The runes along the grim sanguine's greatsword drink in the dying breath of those it cuts down. Whenever a creature is slain by the blade or dies within a short distance of the death knight, the sword stores a mote of finality. The next time the blade strikes, it spends a stored mote to lash out with a pulse of necrotic litany that wounds nearby living foes." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature template (trait): death-burst -> Traits/"Litany of Ending" ("the sword stores a mote of finality when a creature is slain or dies nearby, the [verb: death:concept, die:idea, dying:idea]")
[reskin] chassis nova: "Dirge Wave (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Vicious Bite); nova none; dmg 156

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

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

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit the pit fiend general's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend general makes three attacks, using Bite, Devilish Claw, or Fiery Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Force damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend general can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Vicious Bite. The pit fiend general makes one Bite attack.

Hold the Line. The pit fiend general takes the Dodge action. The pit fiend general can't take this action again until the start of its next turn.

Repel the Rabble. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend general and has the Prone condition.

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
[concept] signature elements: commanding aura that hardens allied ranks [aura] | parries and shield-blocks meant to protect subordinates [behavior] | banner and shield of infernal iron [object]
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
[reskin] print canon attack: "Shield" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Legendary Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---

## Mortis Rex — one marked soft

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Mortis Rex | 18 (2014) | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Graveblade + legendary Blade's Echoing Litany); nova Legion Rising 72; dmg 200

```
Mortis Rex
Medium undead, lawful neutral
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

telepathy 120 ft. plus the languages it knew in life

Challenge

18 (20,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If the mortis rex fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The mortis rex makes two Graveblade attacks. It can replace one attack with a use of Litany of Graves or Spellcasting to cast fear.
Graveblade: Melee or Ranged Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) necrotic damage. The weapon magically returns to the mortis rex's hand.
Legion Rising (Recharge 5-6): Each creature within 20 feet of the mortis rex must make a DC 19 Constitution saving throw, taking 72 (16d8) necrotic damage on a failed save, or half as much damage on a successful one.
Spellcasting: The mortis rex casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 18, +10 to hit with spell attacks):

At will: fear, bestow curse
1/day each: blight (cast at 5th level), vampiric touch (cast at 9th level)
Litany of Graves: One creature within 60 feet that is frightened must make a DC 19 Constitution saving throw, taking 44 (8d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
Legendary Actions

The mortis rex can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The mortis rex regains spent legendary actions at the start of its turn.

Blade's Echoing Litany: The mortis rex makes one Graveblade attack.
Grave Step: The mortis rex moves up to half its Speed without provoking opportunity attacks.
Harrowing Word: One creature within 30 feet of the mortis rex must succeed on a DC 19 Wisdom saving throw or be frightened of the mortis rex until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=aura — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("damned") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: a damned legion raised from the grave [behavior] | profane war-priest litanies channeled through its blade [behavior] | grave-soil encrusted plate and sword [body]
[reskin] signature idea (action): "The mortis rex drives its blade into the ground and calls the names of the fallen—every enemy within earshot feels their own death narrated aloud, and reels with the wound of a destiny already written. Those it has frightened hear the litany as their own eulogy and are dragged halfway into the grave, unable to shake the words." [action/always/condition] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Litany of Graves" EV 39.7 vs floor 21.3 (one attack of 2) — dice 82 → 44 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Litany of Graves" ("drives its blade into the ground and calls the names of the fallen, and those it [verb: fallen:idea]")
[reskin] signature idea (trait): "The grave-soil fused to its plate and blade is the pact itself; whenever the mortis rex spills a creature's life, the dirt drinks it and its damned soldiers rise a little more whole in answer, healing from the harvest their king reaps." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "The grave-soil fused to its plate and blade is the pact itself; whenever the mortis rex spills a creature's life, the dirt drinks it and its damned soldiers rise a little more whole in answer, healing from the harvest their king reaps." [trait/always/resource] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Legion Rising (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Suncorpse King — bands fail

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Suncorpse King | 24 | lurker-17 | ok | FAIL: under | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 180 a round is 28% under the card's 250
- bands · fail · under: effective HP 435 sits under print at CR 24 (468–546, n=5); reads CR 23
- read: def 21 / off 25 → 23; sustained 180 (3 × Bone Ash + legendary Deathly Teleport); nova none; dmg 180

```
Suncorpse King

Medium Undead, Neutral Evil

AC 20
Initiative +9 (19)

HP 435 (58d8 + 174)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
21
+5
+12
MOD
SAVE
DEX
28
+9
+16
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+3

Skills Perception +9, Stealth +16

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft., truesight 60 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the suncorpse king fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the suncorpse king reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the suncorpse king's lair.

Actions

Multiattack. The suncorpse king makes three attacks, using Eldritch Burst, Bone Ash, or Paralyzing Touch in any combination.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 33 (7d6 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 33 (7d6 + 9) Cold damage. and the target has the Paralyzed condition until the start of the suncorpse king's next turn.

Bone Ash. Ranged Attack Roll: +16, range 80/320 ft. 49 (9d8 + 9) Necrotic damage.

Spellcasting. The suncorpse king casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Reactions

Protective Magic. The suncorpse king casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the suncorpse king can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The suncorpse king teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 23, each creature that isn't an Undead in a 20-foot Emanation originating from the suncorpse king. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the suncorpse king can't take this action again until the start of its next turn.

Frightening Gaze. The suncorpse king casts Fear, using the same spellcasting ability as Spellcasting. The suncorpse king can't take this action again until the start of its next turn.

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
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("an archlich") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: throne of bone [object] | life-draining touch [behavior] | incorporeal phasing [behavior]
[reskin] print canon route: the Lich's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon array: STR 11, DEX 28, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The suncorpse king lunges with a hand already weeping grave-cold ichor, seizing a living creature and ripping the vitality straight out of its flesh. The victim withers in its grip, its stolen years pouring into the king as healing, and if the creature dies from the touch it rises again moments later as a hollow-eyed thrall bound to serve the throne." [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation, bolt-drag (+ shelf: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Dazzling Burst" EV 7.8 vs floor 29.6 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Life that dies in the suncorpse king's presence does not truly leave; any creature slain within its aura of bone-dust rises moments later as a lesser thrall, forcing the living to cut down their own fallen comrades or join them." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Life that dies in the suncorpse king's presence does not truly leave; any creature slain within its aura of bone-dust rises moments later as a lesser thrall, forcing the living to cut down their own fallen comrades or join them." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, heated-body, fire-aura)
[reskin] print canon languages: "Common, telepathy 120 ft." -> "All" — the Lich's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```
