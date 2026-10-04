# Release table for the critic — 2014 blocks — 2026-10-04

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-04.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-04T08-59-26

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Fen Dragger | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Wretch | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Hermit | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vault Warden | 5 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Rotbirth Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Firstborn Blight | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Cleric Drowned | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Drowned Bell-Ringer | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 | 2024 | skirmisher-13 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | soft (1) |
| Thunderherd Warden | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderherd Stormherder | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuary Colossus | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | clean |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bone-Siege Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Looking-Glass Queen's Regent | 18 | 2024 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Floe Devourer | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Crown of Bound Kings | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Crown of Bound Kings | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---


### Crown of Bound Kings — highest CR

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Crown of Bound Kings | 24 (2014) | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · aim-dpr: damage 165 a round is 35% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 22 → 22; sustained 165 (3 × Dead Light + legendary Deathly Teleport); nova none; dmg 165

```
Crown of Bound Kings
Medium undead, neutral
Armor Class 19 (natural armor)
Hit Points 487 (65d8 + 195)
Speed 30 ft.
STR 11 (+0), DEX 16 (+3), CON 16 (+3), INT 18 (+4), WIS 14 (+2), CHA 16 (+3)
Saving Throws CON +10, INT +11, WIS +9
Skills Arcana +11, Perception +9
Damage Resistances cold
Damage Immunities necrotic, poison
Condition Immunities charmed, exhaustion, frightened, paralyzed, poisoned
Senses darkvision 120 ft., passive Perception 19
Languages All
Challenge 24 (62,000 XP)
Proficiency Bonus +7

Traits
Legendary Resistance (3/Day): If the crown fails a saving throw, it can choose to succeed instead.
Spirit Jar: If destroyed, the crown reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the crown's lair.
Protective Magic (3/Day) (Reaction): When the crown is hit by an attack roll, the crown casts *shield* in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The crown makes three attacks, using Dead Light, Eldritch Burst, or Touch of the Crown. It can replace one attack with a use of Spellcasting to cast *fear*.
Dead Light: Melee or Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 44 (9d8 + 4) necrotic damage. If the target is a Large or smaller creature, it is restrained until the end of its next turn. This effect can be applied only once per turn.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 44 (9d8 + 4) force damage, and the target is frightened until the start of the crown's next turn.
Touch of the Crown: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 44 (9d8 + 4) cold damage, and the target is frightened until the start of the crown's next turn.
Spellcasting: The crown casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19):

At will: *light*, *detect magic*, *fear*, *bestow curse*

Legendary Actions
Deathly Teleport: The crown teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of the crown must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it fails or succeeds, the crown can't take this action again until the start of its next turn.
Frightening Gaze: The crown casts *fear*, using the same spellcasting ability as Spellcasting. The crown can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("binds the dead of a whole kingdom") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a whole kingdom [behavior] | the sun-crown that commands graves [object] | a kingdom's worth of obedient corpses [aura]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The crown binds the freshly dead to its court. When a creature within its sight dies on the battlefield, the crown can instantly raise that corpse as a silent, obedient pawn that fights for it until destroyed. These pawns are extensions of the crown's will, and while any remain, the crown can use them to shield itself or strike at its foes." [rider/on_hit/resource] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — bolt-restrain, snare-bolt (binds, bind)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into bolt-restrain, snare-bolt
[reskin] signature rider: bolt-restrain -> Dead Light (appended; The idea's own central verb is 'binds' — the crown binds the dead of a whole kin [verb: binds:concept])
[reskin] signature idea (trait): "The sun-crown commands graves: whenever a creature fails a saving throw against the crown's spell or Sunless Dawn, the crown can bind a sliver of its dying will, preventing the creature from taking reactions until the end of its next turn. This binding is invisible but felt as a cold weight, and the crown can sense the location of any creature so bound." [trait/always/condition] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The sun-crown commands graves: whenever a creature fails a saving throw against the crown's spell or Sunless Dawn, the crown can bind a sliver of its dying will, preventing the creature from taking reactions until the end of its next turn. This binding is invisible but felt as a cold weight, and the crown can sense the location of any creature so bound." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, bloodied-burst)
[reskin] chassis nova: "Sunless Dawn (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Crown" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Sunless Dawn (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---


### Goblin Warrior — a 2014 sheet

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova none; dmg 10

```
Goblin Warrior
Small humanoid, neutral evil
Armor Class 13 (studded leather)
Hit Points 24 (7d6)
Speed 30 ft.
STR 8 (-1), DEX 12 (+1), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)
Saving Throws DEX +3
Skills Perception +1, Stealth +3
Senses darkvision 60 ft., passive Perception 11
Languages Common, Goblin
Challenge 1 (200 XP)
Proficiency Bonus +2

Traits
Nimble Escape (Bonus Action): The goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin warrior makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage plus 2 (1d4) slashing damage if the attack roll had Advantage.
Shortbow: Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: hit-and-run skirmishing [behavior] | jagged iron blade [object] | pack tactics [behavior]
[reskin] print canon array: STR 8, DEX 12, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +3
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid stays — the Goblin Warrior is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Goblin Warrior's
[reskin] print canon attack: "Jagged Blade" -> "Scimitar" — the Goblin Warrior's own row
[reskin] print canon attack: "Caltrop" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Nimble" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Lantern Hermit — one marked soft

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lantern Hermit | 3 (2014) | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.25 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 2 → 1.25; sustained 12 (2 × Cane); nova Spilling Light 17; dmg 19

```
Lantern Hermit
Medium humanoid, neutral
Armor Class

13 (leather)

Hit Points: 

60 (8d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +4, Stealth +4

Saving Throws: 

DEX +4, WIS +4

Damage Resistances: 

fire

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Nimble. The hermit ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the hermit takes the Dash or Disengage action.

Actions
Multiattack: The hermit makes two attacks, using Cane or Lantern. It can replace one attack with a use of Lantern Lash.
Cane: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage.
Lantern: Ranged Weapon Attack: +4 to hit, range 30/90 ft., one target. Hit: 6 (1d8 + 2) fire damage. Immediately after the attack, a lantern returns to the hermit's grasp.
Spilling Light (Recharge 5-6): The hermit hurls a lantern at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 17 (5d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Lantern Lash: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) fire damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern at thieves") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: throwing lanterns [behavior] | glass-eyed stare [body] | hoard of stolen lights [object]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The hermit fixes its glass-eyed stare on one creature it can see, and that creature feels its own fire flare dangerously inside it. Until the hermit's next turn, if the stared creature willingly moves more than a step or takes any action other than freezing in place, the heat kindles into open flame, burning it and leaving it exposed and unsteady." [action/save/damage] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "The hermit fixes its glass-eyed stare on one creature it can see, and that creature feels its own fire flare dangerously inside it. Until the hermit's next turn, if the stared creature willingly moves more than a step or takes any action other than freezing in place, the heat kindles into open flame, burning it and leaving it exposed and unsteady." [action/save/damage] — the model found no template that holds it (offered: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter, riposte)
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hermit's glass eyes hold and mirror any flame that comes near, and that mirrored light seeps into the nearest creature's mind as unshakable dread. A creature that comes close to the hermit or meets its gaze can't bring itself to reach for a weapon or raise a hand against the hermit's lantern." [trait/always/condition] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — marking-light, resonant-body (lantern, glass)
[reskin] signature miss: trait — "The hermit's glass eyes hold and mirror any flame that comes near, and that mirrored light seeps into the nearest creature's mind as unshakable dread. A creature that comes close to the hermit or meets its gaze can't bring itself to reach for a weapon or raise a hand against the hermit's lantern." [trait/always/condition] — the model found no template that holds it (offered: marking-light, resonant-body)
[reskin] chassis nova: "Spilling Light (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Firstborn Blight — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Firstborn Blight | 8 (2014) | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Pestilent Claw); nova none; dmg 51

```
Firstborn Blight
Medium humanoid, neutral evil
Armor Class

15 (chain shirt)

Hit Points: 

135 (18d8 + 54)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

16 (+3)

	

14 (+2)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +5, Deception +7

Saving Throws: 

WIS +5, CHA +7

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Actions
Multiattack: The firstborn blight makes three attacks: one with its Pestilent Claw or one with its Withering Ray. It can replace one attack with a use of Wracking Pox or Spellcasting to cast ray of sickness.
Pestilent Claw: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) force damage.
Withering Ray: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 13 (2d8 + 4) necrotic damage.
Wracking Pox: One creature within 60 feet must make a DC 15 Constitution saving throw, taking 14 (4d6) bludgeoning damage and be poisoned until the end of its next turn on a failed save.
Spellcasting: The firstborn blight casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

At will: ray of sickness
1/day each: bestow curse, cloudkill
Blight of Ruin: One creature within 60 feet must make a DC 15 Charisma saving throw, taking 17 (5d6) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also cursed until the end of the firstborn blight's next turn. The first time the cursed target deals damage to any creature before then, it takes 17 (5d6) piercing damage.
```

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: cursing firstborn heirs [behavior] | boils and pestilent blood [body] | seer's prophetic gaze [aura]
[reskin] signature idea (action): "The Plague-Seer points a crooked finger at the enemy it deems most vital — the one standing closest to the heart of the fight, the one others rally around — and brands them with a searing bloodline curse. Boils erupt across their skin, and every time the cursed victim acts on its own turn the boils burst, wracking it with fresh pestilent agony. The curse lingers and can be passed to a new victim o" [action/always/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Bloodline Brand" EV 4.4 vs floor 8.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bloodline Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Debt of Ruin" EV 13.2 vs floor 8.8 (one attack of 3) — added Success: Half; dice 10 → 17
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Plague-Seer's own blood is thick with pestilent filth. Whenever a creature strikes the seer in melee, the bursting of its boils sprays that filth onto the attacker, causing them to erupt in caustic sores that continue to burn each moment they persist in fighting the seer. The infected attacker's body festers while it stays near the seer, but the blight fades if the seer is killed or the attack" [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---


### Thunderherd Stormherder — bands soft

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunderherd Stormherder | 13 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 10.5 (print at 13 reads 5.5–13.5, n=6)
- read: def 9 / off 12 → 10.5; sustained 78 (3 × Antler); nova none; dmg 78

```
Thunderherd Stormherder
Medium humanoid, lawful neutral
Armor Class

18 (plate)

Hit Points: 

187 (22d8 + 88)

Speed: 

30 ft., fly 30 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

18 (+4)

	

12 (+1)

	

13 (+1)

	

18 (+4)

Skills: 

Athletics +8, Persuasion +9

Saving Throws: 

CON +9, CHA +9

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Commander's Presence. While in a 10-foot-radius sphere originating from the stormherder, the stormherder and its allies have advantage on attack rolls and saving throws, provided the stormherder is not incapacitated.
Bolstering Cry (2/Day). As a bonus action, the stormherder grants each ally within 30 feet of it 13 (3d8) temporary hit points.

Actions
Multiattack: The stormherder makes three attacks, using Antler or Thunderbolt.
Antler: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage plus 10 (3d6) thunder damage.
Thunderbolt: Melee or Melee or Ranged Weapon Attack: +8 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 25 (5d8 + 3) thunder damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commands a stampede of thunder-elk [behavior] | iron storm-crozier that calls and channels thunder [object] | iron-banded body crackling with static [body]
[reskin] signature idea (action): "The stormherder plants its crozier and calls a stampede of thunder-elk that surges across the battlefield in a long line, starting from the herder and sweeping forward. Each creature trampled in that path is battered by ghostly hooves and rolling thunder, and the herd keeps galloping onward until it has crossed the field. The call can only be loosed so often before the herd must gather itself agai" [action/once_per_fight/damage] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] value check: "Storm Stampede (2/Day)" EV 10.1 vs floor 65.9 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Storm Stampede (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The stormherder's crozier constantly draws stray thunder from the sky into the herd's antlers and hooves. Whenever one of the stormherder's allies within its commanding aura hits a creature, that hit erupts with a peal of thunder, punishing the foe for standing against the herd." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The stormherder's crozier constantly draws stray thunder from the sky into the herd's antlers and hooves. Whenever one of the stormherder's allies within its commanding aura hits a creature, that hit erupts with a peal of thunder, punishing the foe for standing against the herd." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
```


---


### Bone-Siege Colossus — bands soft

**Concept:** a bone-wrought siege titan that stomps and shakes the walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Bone-Siege Colossus | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Fist); nova Sunderquake 71; dmg 93

```
Bone-Siege Colossus
Gargantuan construct, unaligned
Armor Class

16 (natural armor)

Hit Points: 

217 (15d20 + 60)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +8, Perception +5

Saving Throws: 

STR +8, CON +9

Damage Immunities: 

poison, thunder

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., tremorsense 60 ft., passive Perception 15

Languages: 

understands the languages of its creator but can't speak

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Thunder Absorption. Whenever the colossus is subjected to thunder damage, it takes no damage and instead regains a number of hit points equal to the thunder damage dealt.
Immutable Form. The colossus can't shape-shift.
Siege Monster. The colossus deals double damage to objects and structures.

Actions
Multiattack: The colossus makes two Fist attacks. It can replace one attack with a use of Siegequake Stomp.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) thunder damage.
Sunderquake (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also prone until the end of its next turn.
Siegequake Stomp: One prone creature within 30 feet of the colossus must make a DC 17 Strength saving throw, taking 26 (4d12) thunder damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("bone-wrought siege titan") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] signature elements: stomps that shake walls [behavior] | bone-wrought siege titan [body] | relentless siege assault [behavior]
[reskin] signature idea (action): "The colossus slams its foot down and the ground jumps outward in a rolling quake, staggering everyone nearby and making nearby walls groan with fresh cracks. Each structure in the area takes a severe battering as if it had been struck by a siege ram." [action/always/damage] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Siegequake Stomp" EV 20.2 vs floor 16.6 (one attack of 2) — worth the trade
[reskin] signature template: exploiter -> Actions/"Siegequake Stomp" ("the foot-slam quake staggers everyone nearby, which the exploiter's prone imposi [verb: downed:idea]")
[reskin] signature idea (trait): "Every heavy stomp or fist that lands sends a tremor through the earth and stone it stands on. Structures within a short distance of the impact crack and weaken, and anything standing on a structure that has just been damaged feels the floor lurch, risking a fall." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Every heavy stomp or fist that lands sends a tremor through the earth and stone it stands on. Structures within a short distance of the impact crack and weaken, and anything standing on a structure that has just been damaged feels the floor lurch, risking a fall." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] chassis nova: "Sunderquake (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


---

## Review batch — high-cr-2026-10-04T09-11-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Heartwood Pyre | 17 | 2024 | brute-17-grappler | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Corvath the Pass-Bound | 19 | 2024 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Thunderhead Titan | 20 | 2024 | skirmisher-18-hurler | ok | SOFT: aim-dpr, per-attack-floor | ok | ok | ok | ok | ok | soft (1) |
| Vellum the Unfinished | 21 | 2024 | caster-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Siriath the Glass Sovereign | 22 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Black Trench Kraken | 24 | 2024 | brute-17-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Vorlath the Locust Crown | 26 | 2024 | swarm-17 | ok | SOFT: hot-offense | SOFT: swarm-multiattack | ok | ok | ok | ok | soft (2) |
| Slumbering Char | 30 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ser Kaelthas the Ashen | 17 (2014) | 2014 | skirmisher-18-mounted | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Torvax the Iron | 20 (2014) | 2014 | defender-17-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Empyrean Verdict | 23 (2014) | 2014 | caster-21-warpriest | ok | ok | ok | ok | ok | ok | ok | clean |
| Vastmire Choir | 25 (2014) | 2014 | caster-21 | ok | SOFT: band, hot-offense | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---


### Ser Kaelthas the Ashen — a 2014 sheet

**Concept:** a death knight who leads a cavalry of the damned and burns the living with hellfire

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ser Kaelthas the Ashen | 17 (2014) | skirmisher-18-mounted | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- read: def 13 / off 22 → 17.5; sustained 168 (3 × Hellfire Lance + legendary Wheeling Charge); nova Infernal Ride-Through 72; dmg 168

```
Ser Kaelthas the Ashen
Large undead, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

252 (24d10 + 120)

Speed: 

70 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

18 (+4)

	

20 (+5)

	

14 (+2)

	

18 (+4)

	

16 (+3)

Skills: 

Perception +10, Stealth +10

Saving Throws: 

DEX +10, WIS +10

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 20

Languages: 

Common, Infernal

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Kaelthas fails a saving throw, it can choose to succeed instead.
Unstoppable Charge. Kaelthas ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Cavalry Wheel. When a creature Kaelthas can see ends its turn within 5 feet of it, Kaelthas can move up to 15 feet without provoking opportunity attacks.
Mounted Agility. As a bonus action, Kaelthas takes the Dash or Disengage action.

Actions
Multiattack: Kaelthas makes three Hellfire Lance attacks. It can replace one attack with a use of Opportunist's Lash.
Hellfire Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) fire damage. If Kaelthas moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) fire damage and, if it is Huge or smaller, is knocked prone.
Infernal Ride-Through (Recharge 5-6): Kaelthas moves up to its speed without provoking opportunity attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. That creature must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Opportunist's Lash: One creature within 30 feet that is prone must make a DC 19 Strength saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

Kaelthas can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Kaelthas regains spent legendary actions at the start of its turn.

Wheeling Charge: Kaelthas moves up to half its speed without provoking opportunity attacks, and it makes one Hellfire Lance attack.
Withdraw: Kaelthas takes the Dash or Disengage action.
```

**Engine trace**

```
[route] skirmisher-mounted type=Undead mechanics=none — skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted: no line key in the words — the model's read of its quote
[concept] signature elements: mounted charge that carries through the enemy line [behavior] | hellfire that clings and burns [aura] | a cavalry of the risen damned [behavior]
[reskin] signature idea (action): "Kaelthas calls up the cavalry line from every corpse he has already put down this fight, and each risen trooper spurs in from the battlefield's edge along a burning lane he picks, lancing through every living thing it passes before collapsing into embers — so the more he has killed, the better his next pass becomes. He can only call it once, and the risen do not take orders afterward." [action/once_per_fight/damage] — menu: condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "Kaelthas calls up the cavalry line from every corpse he has already put down this fight, and each risen trooper spurs in from the battlefield's edge along a burning lane he picks, lancing through every living thing it passes before collapsing into embers — so the more he has killed, the better his next pass becomes. He can only call it once, and the risen do not take orders afterward." [action/once_per_fight/damage] — the model found no template that holds it (offered: condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter, delayed-brand, charge)
[reskin] value check: "Opportunist's Lash" EV 18.6 vs floor 15.1 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Hellfire that has already touched a living creature does not go out: the flame clings to flesh and keeps eating at the wound, burning hotter each round it is left alone, until the creature spends its whole turn beating the fire out or someone else smothers it." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature miss: trait — "Hellfire that has already touched a living creature does not go out: the flame clings to flesh and keeps eating at the wound, burning hotter each round it is left alone, until the creature spends its whole turn beating the fire out or someone else smothers it." [trait/always/damage] — the model found no template that holds it (offered: heated-body, death-burst)
[reskin] chassis nova: "Infernal Ride-Through (Recharge 5-6)" — the skirmisher-18-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Empyrean Verdict — a homebrew with a nova

**Concept:** an empyrean child of the gods who walks the mortal world in judgment

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Empyrean Verdict | 23 (2014) | caster-21-warpriest | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 26 → 24; sustained 245 (2 × Greatsword + legendary Swift Verdict); nova Radiant Decree 78; dmg 245

```
Empyrean Verdict
Large celestial, lawful neutral
Armor Class

19 (natural armor)

Hit Points: 

483 (42d10 + 252)

Speed: 

40 ft., fly 40 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


22 (+6)

	

16 (+3)

	

23 (+6)

	

16 (+3)

	

18 (+4)

	

20 (+5)

Skills: 

Perception +11, Religion +10

Saving Throws: 

CON +13, WIS +11, CHA +12

Damage Resistances: 

radiant

Condition Immunities: 

charmed

Senses: 

darkvision 120 ft., truesight 30 ft., passive Perception 21

Languages: 

telepathy 120 ft.

Challenge

23 (50,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the empyrean verdict fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The empyrean verdict makes two Greatsword attacks. It can replace one attack with a use of Retributive Judgment or Spellcasting to cast guiding bolt.
Greatsword: Melee or Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 49 (10d8 + 4) slashing damage. The weapon magically returns to the empyrean verdict's hand.
Radiant Decree (Recharge 5-6): Each creature within 20 feet of the empyrean verdict must make a DC 20 Constitution saving throw, taking 78 (12d12) radiant damage on a failed save, or half as much damage on a successful one.
Spellcasting: The empyrean verdict casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks): -

At will: guiding bolt, light, dispel magic, hold person
Retributive Judgment: One creature within 60 feet of the empyrean verdict must make a DC 20 Charisma saving throw. On a failed save, the target is cursed until the end of the empyrean verdict's next turn. The first time the cursed target deals damage to any creature before then, it takes 71 (13d10) radiant damage. On a successful save, the target takes half as much damage.
Legendary Actions

The empyrean verdict can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The empyrean verdict regains spent legendary actions at the start of its turn.

Swift Verdict: The empyrean verdict makes one Greatsword attack.
Adjudicate Step: The empyrean verdict moves up to half its speed without provoking opportunity attacks.
Dread Sentence: One creature within 30 feet of the empyrean verdict must succeed on a DC 20 Wisdom saving throw or be frightened of the empyrean verdict until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Celestial mechanics=aura — caster-warpriest: ✓ ("walks the mortal world in judgment") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: judgment pronouncement that marks and condemns [behavior] | body of congealed divine light [body] | greatsword of solid radiance [object]
[reskin] signature idea (action): "The Empyrean Verdict names one guilty creature it can see and pronounces its verdict aloud, brandishing its greatsword toward the target. Until the creature is slain or the verdict is withdrawn, every wound the Empyrean Verdict deals to it with weapon or prayer tears open again as searing light, and the condemned cannot hide from the judgment — illusions and invisibility fall away before the Verdi" [action/once_per_fight/damage] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — curse-debt (judgment)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into curse-debt
[reskin] value check: "Retributive Judgment" EV 55 vs floor 36.9 (one attack of 2) — added Success: Half; dice 42 → 71
[reskin] signature template: curse-debt -> Actions/"Retributive Judgment" ("The idea's own verb is judgment — an empyrean passing sentence on a creature, cu [verb: judgment:concept]")
[reskin] signature idea (trait): "The Empyrean Verdict is a body of congealed divine light, and light answers to …: when a condemned creature strikes the Verdict or defies its sentence, that creature is bathed in burning radiance reflecting back from the blow. The Verdict glows brighter the longer a guilty creature resists, until its radiance becomes a lance of pure condemnation." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] chassis nova: "Radiant Decree (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Vastmire Choir — bands soft

**Concept:** an elder brain the size of a lake that dominates every mind for a hundred miles

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vastmire Choir | 25 (2014) | caster-21 | ok | SOFT: band, hot-offense | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · band: reads CR 26.5 (print at 25 reads 20.5–24.5, n=5)
- bands · soft · hot-offense: offense alone reads CR 29, 4 over; the HP axis pulls the read to 26.5
- gates · soft · rider-no-save: Actions/Tendril: a Frightened rider on every hit with no save
- read: def 24 / off 29 → 26.5; sustained 294 (3 × Mind Lash + legendary Lash Out); nova Psychic Tide 82; dmg 294

```
Vastmire Choir
Gargantuan aberration, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

542 (31d20 + 217)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

24 (+7)

	

18 (+4)

	

17 (+3)

	

16 (+3)

Skills: 

Arcana +12, Perception +11

Saving Throws: 

CON +15, INT +12, WIS +11

Senses: 

blindsight 120 ft., darkvision 300 ft., passive Perception 21

Languages: 

Common

Challenge

25 (75,000 XP)

Proficiency Bonus:

+8

Shielded Mind. The vastmire choir's thoughts can't be read by any means, and other creatures can communicate with it telepathically only if it allows them.
Legendary Resistance (3/Day). If the vastmire choir fails a saving throw, it can choose to succeed instead.
Protective Magic (3/Day) (Reaction). When the vastmire choir is hit by an attack roll, it casts shield, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The vastmire choir makes three attacks, using Mind Lash or Tendril. It can replace one attack with a use of Vitality Leech or Spellcasting to cast hold person.
Mind Lash: Melee or Melee or Ranged Spell Attack: +12 to hit, reach 5 ft. or range 120 ft., one target. Hit: 49 (10d8 + 4) psychic damage.
Tendril: Melee Spell Attack: +12 to hit, reach 5 ft., one target. Hit: 31 (6d8 + 4) bludgeoning damage plus 18 (4d8) psychic damage, and the target is frightened until the start of the vastmire choir's next turn.
Psychic Tide (Recharge 5-6): Each creature within 20 feet of the vastmire choir must make a DC 20 Constitution saving throw, taking 82 (15d10) psychic damage on a failed save, or half as much damage on a successful one.
Spellcasting: The vastmire choir casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 20):

At will: detect magic, mage hand, hold person, slow
Vitality Leech: One creature within 30 feet of the vastmire choir must make a DC 20 Constitution saving throw, taking 63 (14d8) psychic damage on a failed save, or half as much damage on a successful one. The vastmire choir regains hit points equal to half the damage dealt.
Legendary Actions

The vastmire choir can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vastmire choir regains spent legendary actions at the start of its turn.

Lash Out: The vastmire choir makes one Mind Lash attack.
Tendril Slip: The vastmire choir teleports up to 30 feet to an unoccupied space it can see. The vastmire choir can't take this action again until the start of its next turn.
Dread Whisper: One creature within 30 feet of the vastmire choir must succeed on a DC 20 Wisdom saving throw or be frightened until the end of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Aberration mechanics=aura — caster: ✓ ("dominates every mind for a hundred miles") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: dominates every mind for a hundred miles [aura] | elder brain the size of a lake [body] | retreats into the lake when bloodied [behavior]
[reskin] signature idea (action): "When the Choir is bloodied, it stops fighting in the open and pulls its whole mass down into the lake, leaving only a roiling psychic wake on the surface. Until it rises again, it cannot be reached or targeted by anything that needs line of sight to its body, but it keeps acting through the water: every thinking creature within a hundred miles feels its attention turn on them like a spotlight, and" [action/once_per_fight/condition] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "When the Choir is bloodied, it stops fighting in the open and pulls its whole mass down into the lake, leaving only a roiling psychic wake on the surface. Until it rises again, it cannot be reached or targeted by anything that needs line of sight to its body, but it keeps acting through the water: every thinking creature within a hundred miles feels its attention turn on them like a spotlight, and" [action/once_per_fight/condition] — the model found no template that holds it (offered: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, bolt-drag)
[reskin] value check: "Vitality Leech" EV 48.8 vs floor 32.8 (one attack of 3) — added Success: Half; dice 38 → 63
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Choir is not one mind but a choir, and every thinking creature within a hundred miles is a voice it can borrow. Whenever a creature that can think fails to resist the Choir's psychic pressure, the Choir learns the location of every other thinking creature near that one and can speak through the victim in its own voice for a short time, using the victim's senses as its own. The borrowed voice n" [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — shielded-mind (mind)
[reskin] signature template (trait): shielded-mind -> Traits/"Shielded Mind" ("The idea's central verb is about the mind being sealed/guarded — the Choir's tho [verb: mind:concept]")
[reskin] chassis nova: "Psychic Tide (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Review batch — print-heads-2026-10-04T09-15-17

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

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


### Sunreaper Osswald — highest CR

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


### Sanguine Sovereign — a 2014 sheet

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


### Kraken — a print donor

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

