# Review batch — print-heads-2026-10-03T03-43-15

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lord Varkos Zhul | 15 | 2024 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Lord Duskworth | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Warlord of Rusted Graves | 18 | 2024 | brute-17 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Saint Corvath the Oathsworn | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Solenne Ossuary | 24 | 2024 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows | soft (2) |
| Ossun Sovereign | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- none



---

## Lord Varkos Zhul — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lord Varkos Zhul | 15 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 81 a round is 30% under the card's 115
- bands · soft · band: reads CR 11.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 9 / off 14 → 11.5; sustained 81 (3 × Grave Strike); nova none; dmg 81

```
Lord Varkos Zhul

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

Legendary Resistance (3/Day). If the lord fails a saving throw, it can choose to succeed instead.

Misty Escape. If the lord drops to 0 Hit Points outside its resting place, the lord uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The lord can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The lord has these weaknesses:


- Forbiddance: the lord can't enter a residence without an invitation from an occupant.
- Running Water: the lord takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the lord's heart while the lord has the Incapacitated condition in its resting place, the lord has the Paralyzed condition until the weapon is removed.
- Sunlight: the lord takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The lord makes three Grave Strike attacks. It can replace one attack with a use of Vampiric Drain.

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 20 (4d6 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Vampiric Drain. Constitution Saving Throw: DC 18, one creature within 30 feet. Failure: 35 (10d6) Necrotic damage, and the lord regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 18, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the lord regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the lord's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If the lord isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the lord can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the lord can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The lord casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the lord's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the lord.

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
[route] lurker type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire lord") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: commanding bats and wolves [behavior] | blood-draining bite [body] | lurking in mist and shadow [aura]
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The lord's fangs find a throat, and he does not let go until the wound is empty. Until the end of his next turn, anyone he has already bitten this fight takes worsening damage from every strike he lands on them, as the blood remembers the first wound and opens it wider." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch (+ shelf: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into drain
[reskin] value check: "Vampiric Drain" EV 27.1 vs floor 18.2 (one attack of 3) — added Success: Half; dice 21 → 35
[reskin] signature template: drain -> Actions/"Vampiric Drain" ("the concept's own verb is 'vampire' (draining life through a bite/constitution s [verb: vampire:concept]")
[reskin] signature idea (trait): "Blood he has taken from a mortal still lives in him for a moment longer than it should. Whenever he drains a living creature, that stolen vitality spills into his own wounds, knitting flesh and quieting pain. The beast he commands sense it, and grow bolder." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Blood he has taken from a mortal still lives in him for a moment longer than it should. Whenever he drains a living creature, that stolen vitality spills into his own wounds, knitting flesh and quieting pain. The beast he commands sense it, and grow bolder." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, warded-mending)
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Fangs" -> "Grave Strike" — the Vampire's own row
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

## Ossun Sovereign — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossun Sovereign | 24 (2014) | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 153 a round is 40% under the table's 255
- bands · soft · band: reads CR 21.5 (print at 24 reads 20.5–24.5, n=5)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Orbit Shift
- read: def 22 / off 21 → 21.5; sustained 153 (3 × Bone Bolt + legendary Deathly Teleport); nova none; dmg 153

```
Ossun Sovereign
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

Legendary Resistance (4/Day). If the ossun sovereign fails a saving throw, it can choose to succeed instead.
Orbit Shift. When a creature the ossun sovereign can see ends its turn within 5 feet of it, the ossun sovereign can move up to 20 feet without provoking Opportunity Attacks.
Spirit Jar. If destroyed, the ossun sovereign reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the ossun sovereign's lair.
Protective Magic (Reaction). The ossun sovereign casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The ossun sovereign makes three attacks, using Eldritch Burst, Bone Bolt, or Paralyzing Touch.
Eldritch Burst: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) cold damage. and the target has the Paralyzed condition until the start of the ossun sovereign's next turn.
Bone Bolt: Ranged Weapon Attack: +11 to hit, range 80/320 ft., one target. Hit: 40 (8d8 + 4) necrotic damage.
Spellcasting: The ossun sovereign casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20): At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/Day Each: Animate Dead, Dimension Door, Plane Shift
1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions

The ossun sovereign can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ossun sovereign regains spent legendary actions at the start of its turn.

Deathly Teleport: The ossun sovereign teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the ossun sovereign must make a DC 21 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The ossun sovereign casts Fear, using the same spellcasting ability as Spellcasting. The ossun sovereign can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: bone-shard volleys from the orbiting throne [behavior] | the enthroned sun of calcified bone [body] | deathless spellcasting from a floating throne [behavior]
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 18, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The sovereign's ribcage cracks open and it looses a sweeping volley of bone shards in a wide arc before it. The shards rake everything in the area, and any living creature struck feels its warmth bled away, giving the throne's cold an opening." [action/always/damage] — menu: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge)
[reskin] value check: "Disarming Twist" EV 0 vs floor 23.9 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The sovereign's orbit is its weapon: whenever it glides around a creature, the air churns with shed bone dust that clings and eats at warmth, marking prey for its next volley." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The sovereign's orbit is its weapon: whenever it glides around a creature, the air churns with shed bone dust that clings and eats at warmth, marking prey for its next volley." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, absorption)
[reskin] chassis nova: "Sunfall Beams (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Sunfall Beams (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Throne Drift" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---

## Lord Duskworth — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lord Duskworth | 15 (2014) | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Cursed Blood Tide 71; dmg 85

```
Lord Duskworth
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

Wound-Drinking Dark. A creature that touches the lord or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.
Sidestep. When a creature the lord can see ends its turn within 5 feet of it, the lord can move up to 10 feet without provoking opportunity attacks.
Legendary Resistance (3/Day). If the lord fails a saving throw, it can choose to succeed instead.
Misty Escape. If the lord drops to 0 hit points outside its resting place, the lord uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The lord can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The lord has these weaknesses: - Forbiddance: the lord can't enter a residence without an invitation from an occupant.
Running Water: the lord takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the lord's heart while the lord is incapacitated in its resting place, the lord is paralyzed until the weapon is removed.
Sunlight: the lord takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If the lord isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the lord can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the lord can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action). The lord casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the lord's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the lord.

Actions
Multiattack: The lord makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Cursed Blood Tide (Recharge 5-6): Each creature in a 60-foot-long, 5-foot-wide line must make a DC 18 Strength saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 18 Constitution saving throw, taking 24 (7d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the lord regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the lord's control.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("a vampire lord who commands bats and wol") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commanding swarms of bats and wolves [behavior] | blood-binding curses that steal a hero's turn [behavior] | a blood-fed undead lord [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Lord Duskworth calls the night's beasts to obey him, and the swarm he summons fights on for a while even after he has moved on. He does not need to keep commanding it, and when it goes down it does not simply vanish." [action/always/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Horrid Display (2/Day)" EV 26.4 vs floor 60.8 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Those who strike Lord Duskworth with a blade find their wounds refuse to close, as if the night itself drinks from them. This lingering curse does not fade on its own." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Wound-Drinking Dark" ("Those who strike Lord Duskworth with a melee attack are punished for it — the ni [shape fit, no verb match]")
[reskin] chassis nova: "Cursed Blood Tide (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common, Undercommon" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Nightspeed" is the seat's, not the Vampire's
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
- read: def 22 / off 22 → 22; sustained 118 (2 × Tentacle); nova none; dmg 118

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

Tentacle. Melee Attack Roll: +17, reach 30 ft. 59 (11d8 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.

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
[concept] signature elements: abyssal tentacle grasp [behavior] | engulfing maw [behavior] | brine-soaked hide [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Abyssal Flood (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Sable Maw Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Abyssal Flood (Recharge 5-6)" is the seat's nova, not the Kraken's
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
Multiattack: The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 41 (7d8 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The thrown creature and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet of it must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (it can have up to four creatures swallowed at a time), taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its Speed. Whether the saving throw succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and drag [behavior] | engulfing maw [behavior] | brine-soaked abyssal hide [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Crushing Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Mother Brine" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Crushing Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Warlord of Rusted Graves — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Warlord of Rusted Graves | 18 | brute-17 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 21 (print at 18 reads 12.5–18.5, n=5)
- bands · soft · hot-offense: offense alone reads CR 25, 7 over; the HP axis pulls the read to 21
- read: def 17 / off 25 → 21; sustained 205 (2 × Grave-Iron Greatsword + legendary Sepulchral Charge); nova Damned Legion's Advance 72; dmg 205

```
Warlord of Rusted Graves

Huge Undead, Neutral

AC 18
Initiative -1 (9)

HP 322 (28d12 + 140)

Speed 40 ft.

MOD
SAVE
STR
24
+7
+13
INT
10
+0
+0
MOD
SAVE
DEX
8
-1
-1
WIS
14
+2
+8
MOD
SAVE
CON
21
+5
+11
CHA
12
+1
+1

Skills Athletics +13, Perception +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft., tremorsense 30 ft.; Passive Perception 18

Languages Common plus the languages it knew in life

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If the warlord fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The warlord makes two Grave-Iron Greatsword attacks. It can replace one attack with a use of Rusted Grasp.

Grave-Iron Greatsword. Melee Attack Roll: +13, reach 10 ft. 25 (4d8 + 7) Slashing damage plus 16 (3d10) Necrotic damage.

Damned Legion's Advance (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 30-foot Cone. Failure: 72 (16d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Rusted Grasp. Strength Saving Throw: DC 20, one Huge or smaller creature within 60 feet. Failure: The target is pulled up to 30 feet straight toward the warlord by its grip and has the Grappled condition (escape DC 21). While Grappled this way, the target has the Restrained condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the warlord can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sepulchral Charge. The warlord moves up to half its Speed without provoking Opportunity Attacks, and it makes one Grave-Iron Greatsword attack.

Gravequake. Strength Saving Throw: DC 20, each creature within 10 feet of the warlord. Failure: The target has the Prone condition.

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
[route] brute type=Undead mechanics=none — defender-leader: a Undead commands no troops | brute: ✓ ("death knight") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: commands a damned legion [behavior] | body of grave-soil and ancient bone [body] | grave-iron greatsword [object]
[reskin] signature idea (action): "The Warlord of Rusted Graves slams its greatsword point-down into the earth and wills the buried dead to rise where it strikes. A thin line of rusted blades and grasping hands erupts from the soil along the ground it just broke, dragging at the feet and legs of everything caught in its path and rooting them in place. Those it pins stay held, rusted fast to the earth, until they tear themselves fre" [action/save/condition] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Rusted Grasp" EV 21.5 vs floor 20.3 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Rusted Grasp" ("the buried dead erupt and drag at the feet and legs of everything caught in its  [verb: drag:idea]")
[reskin] signature idea (trait): "The Warlord is not a body but a walking grave: grave-soil and ancient bone packed around a will that would not die. Whenever a blow lands hard enough to matter, grave-soil and old bones slough off the wound and the dead nearest to it are pulled in to patch the gap — so that hurting it only feeds the legion it commands." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "The Warlord is not a body but a walking grave: grave-soil and ancient bone packed around a will that would not die. Whenever a blow lands hard enough to matter, grave-soil and old bones slough off the wound and the dead nearest to it are pulled in to patch the gap — so that hurting it only feeds the legion it commands." [trait/on_being_hit/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Damned Legion's Advance (Recharge 5-6)" — the brute-17's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Answering Stroke); nova none; dmg 156

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

Multiattack. The pit fiend general makes three attacks, using Bite, Necrotic Claw, or Force Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Force Mace. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Force damage.

Necrotic Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend general can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Answering Stroke. The pit fiend general makes one Bite attack.

Lock Shields. The pit fiend general takes the Dodge action. The pit fiend general can't take this action again until the start of its next turn.

Break Ranks. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend general and has the Prone condition.

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
[concept] signature elements: commands allies as a warlord [behavior] | an aura of authority that anchors the formation [aura] | ash-forged flesh and ember weapons [body]
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
[reskin] print canon attack: "Counterstroke Strike" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Legendary Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---

## Saint Corvath the Oathsworn — one marked soft

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Saint Corvath the Oathsworn | 18 (2014) | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Blackened Greatsword + legendary Sword Stroke); nova Unholy Pyre 72; dmg 200

```
Saint Corvath the Oathsworn
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

Legendary Resistance (3/Day). If Corvath fails a saving throw, it can choose to succeed instead.
Bolstering Cry (2/Day). As a bonus action, each ally within 30 feet of Corvath gains 21 (6d6) temporary hit points.

Actions
Multiattack: Corvath makes two Blackened Greatsword attacks. It can replace one attack with a use of Spellcasting to cast bestow curse.
Blackened Greatsword: Melee Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) necrotic damage. The weapon magically returns to Corvath's hand.
Unholy Pyre (Recharge 5-6): Each creature within 20 feet of Corvath must make a DC 19 Constitution saving throw, taking 72 (16d8) necrotic damage on a failed save, or half as much damage on a successful one.
Spellcasting: Corvath casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 18): - At will: bestow curse, fear
1/day each: blight (cast at 5th level), cloudkill (cast at 9th level)
Legendary Actions

Corvath can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Corvath regains spent legendary actions at the start of its turn.

Sword Stroke: Corvath makes one Blackened Greatsword attack.
Dead March: Corvath moves up to half its Speed without provoking opportunity attacks.
Cull the Faithless: One creature within 30 feet of Corvath must succeed on a DC 19 Wisdom saving throw or be frightened of Corvath until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=aura — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("a death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: raises a damned legion that fights and dies on command [behavior] | profane war-priest magic and battle-prayer [behavior] | grave-armored death knight with a blackened greatsword [body]
[reskin] signature idea (action): "Corvath snarls a command and a spectral soldier under its banner dissolves into unholy fire, killing itself and burning everything close to it in a burst of necrotic flame. If no soldier remains, Corvath instead hardens the oath-flesh of the last remnant into a jagged shell of grave-iron that shields it until it strikes again." [bonus_action/always/damage] — menu: aggro-curse, self-invisibility, rally (+ shelf: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Corvath snarls a command and a spectral soldier under its banner dissolves into unholy fire, killing itself and burning everything close to it in a burst of necrotic flame. If no soldier remains, Corvath instead hardens the oath-flesh of the last remnant into a jagged shell of grave-iron that shields it until it strikes again." [bonus_action/always/damage] — the model found no template that holds it (offered: aggro-curse, self-invisibility, rally, herd, curse-debt)
[reskin] value check: "Bolstering Cry (2/Day)" EV 11.6 vs floor 6.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever one of the soldiers raised by its war-cadence falls, Corvath’s own deathless body knits a shard of that soldier’s oath into its armor, leaving it harder to wound until the next soldier dies in its place." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Whenever one of the soldiers raised by its war-cadence falls, Corvath’s own deathless body knits a shard of that soldier’s oath into its armor, leaving it harder to wound until the next soldier dies in its place." [trait/always/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Unholy Pyre (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Solenne Ossuary — bands soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Solenne Ossuary | 24 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 141 a round is 44% under the card's 250
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Throne Drift
- read: def 24 / off 23 → 23.5; sustained 141 (3 × Solar Flare + legendary Deathly Teleport); nova none; dmg 141

```
Solenne Ossuary

Medium Undead, Neutral

AC 21
Initiative +9 (19)

HP 517 (69d8 + 207)

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
+5
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

Senses darkvision 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Duskward Veil. While the ossuary isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Legendary Resistance (4/Day). If the ossuary fails a saving throw, it can choose to succeed instead.

Throne Drift. When a creature the ossuary can see ends its turn within 5 feet of it, the ossuary can move up to 20 feet without provoking Opportunity Attacks.

Spirit Jar. If destroyed, the ossuary reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the ossuary's lair.

Actions

Multiattack. The ossuary makes three attacks, using Eldritch Burst, Solar Flare, or Paralyzing Touch in any combination.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage. and the target has the Paralyzed condition until the start of the ossuary's next turn.

Solar Flare. Ranged Attack Roll: +16, range 90/240 ft. 36 (6d8 + 9) Radiant damage.

Spellcasting. The ossuary casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Reactions

Protective Magic. The ossuary casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the ossuary can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The ossuary teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 23, each creature that isn't an Undead in a 20-foot Emanation originating from the ossuary. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the ossuary can't take this action again until the start of its next turn.

Frightening Gaze. The ossuary casts Fear, using the same spellcasting ability as Spellcasting. The ossuary can't take this action again until the start of its next turn.

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
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: a throne of fused pale bone that it never willingly leaves [body] | kiting ray after ray of sunlight and grave-light from a distance [behavior] | the sun-throne's withering corona that ages flesh and rusts steel [aura]
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 28, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ossuary's scepter does not only strike; a filament of grave-light stays anchored between the target and the seat of its throne. So long as the ossuary can see that marked creature, its other ray attacks against it sear unerringly and leave it trailing a thin corona that flares each time the ossuary glides away. The mark lasts until the throne is forced to move because of the creature's own app" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge (+ shelf: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The ossuary's scepter does not only strike; a filament of grave-light stays anchored between the target and the seat of its throne. So long as the ossuary can see that marked creature, its other ray attacks against it sear unerringly and leave it trailing a thin corona that flares each time the ossuary glides away. The mark lasts until the throne is forced to move because of the creature's own app" [rider/on_hit/condition] — the model found no template that holds it (offered: charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge, throw-retrieve, lure, sensory-strike, delayed-brand, aggro-curse)
[reskin] value check: "Disarming Twist" EV 0 vs floor 23.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone-sun throne is not carried; it is the point the ossuary's light bends around. Whenever a creature first comes within reach of the ossuary on a turn, the throne drifts just enough to keep itself between that creature and the ossuary's rays, slowing the approach and letting the ossuary slide away without turning its back." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): guarded-stance -> Traits/"Duskward Veil" ("The idea's core verb is the light curving away from the point of approach; the t [verb: light bends:idea]")
[reskin] chassis nova: "Dawn Scour (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Dawn Scour (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Coronal Drift" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```
