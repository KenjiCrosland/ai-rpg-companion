# Release table for the critic — 2014 blocks — 2026-10-04

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-04.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-04T09-58-22

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Mirefather | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glass-Eyed Hermit | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lampwife Maura | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vault Warden | 5 (2014) | 2014 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Grave Midwife | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Plague-Seer | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Hollow Ferryman | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Harbormantle | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderherd | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Stave-Binder of the Herd | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuary Ram | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | clean |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderfall Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 | 2024 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vorenkaal | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | SOFT: payoff-producer | ok | ok | ok | ok | soft (2) |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glacier Wyrm | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sun-Crowned Archlich | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Solvenarch | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |

**Fails by seat and gate:**
- none



---


### Solvenarch — highest CR

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Solvenarch | 24 (2014) | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 165 a round is 35% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- read: def 22 / off 22 → 22; sustained 165 (3 × Hurled Debris + legendary Deathly Teleport); nova none; dmg 165

```
Solvenarch
Medium undead, lawful neutral
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

Legendary Resistance (3/Day). If Solvenarch fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, Solvenarch reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within Solvenarch's lair.
Protective Magic (3/Day) (Reaction). When Solvenarch is hit by an attack roll, Solvenarch casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Solvenarch makes three attacks, using Hurled Debris, Eldritch Burst, or Paralyzing Touch. It can replace one attack with a use of Grave Edict or Spellcasting to cast guiding bolt.
Hurled Debris: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 44 (9d8 + 4) radiant damage.
Eldritch Burst: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) cold damage, and the target is paralyzed until the start of Solvenarch's next turn.
Spellcasting: Solvenarch casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19):

At will:: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation
2/day each:: animate dead, dimension door, plane shift
1/day each:: chain lightning, finger of death, power word kill, scrying
Grave Edict: One creature within 60 feet of Solvenarch must succeed on a DC 19 Dexterity saving throw or be restrained until the end of Solvenarch's next turn.
Legendary Actions

Solvenarch can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Solvenarch regains spent legendary actions at the start of its turn.

Deathly Teleport: Solvenarch teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an undead within 20 feet of Solvenarch must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Whether it fails or succeeds, Solvenarch can't take this action again until the start of its next turn.
Unnerving Cast: Solvenarch casts fear, using the same spellcasting ability as Spellcasting. Solvenarch can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=aura — caster-binder: ✓ ("binds the dead") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a kingdom to its will [behavior] | the sun-crown that sears the living into obedience [object] | a corpse-body woven from grave-soil and royal bone [body]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 18, WIS 14, CHA 16 — the Lich's, INT fitted to +11
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Solvenarch raises its scepter and pronounces a grave-edict that binds the fallen: each corpse or spirit within its halo is compelled to rise and take one violent step or strike before collapsing again, its brief service drawing a thread of stolen vitality back to the lich. The same compulsion bleeds into wounded living foes, who feel their own bones hesitate to obey them—their next action is half-" [action/save/resource] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] value check: "Grave Edict" EV 31.9 vs floor 30.2 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Grave Edict" ("the grave-edict compels and binds the fallen and bleeding foes — the binding is  [verb: bind:concept]")
[reskin] signature idea (trait): "A living creature that comes under the lich's radiant gaze feels the sun-crown sear its will, not its flesh: every time it harms Solvenarch or one of its bound dead, a mark of binding is scorched onto it. Those marked accrue an invisible weight that makes obedience easier and rebellion costlier—the more a hero fights the crown, the more the crown's next command feels like their own idea." [trait/always/condition] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "A living creature that comes under the lich's radiant gaze feels the sun-crown sear its will, not its flesh: every time it harms Solvenarch or one of its bound dead, a mark of binding is scorched onto it. Those marked accrue an invisible weight that makes obedience easier and rebellion costlier—the more a hero fights the crown, the more the crown's next command feels like their own idea." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, heated-body)
[reskin] chassis nova: "Kneeling Tide (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Kneeling Tide (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
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
[concept] signature elements: hit-and-run pack skirmishing [behavior] | rusted blade and patchwork hide armor [object]
[reskin] print canon array: STR 8, DEX 12, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +3
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid stays — the Goblin Warrior is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon attack: "Rusty Shiv" -> "Scimitar" — the Goblin Warrior's own row
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Lampwife Maura — one marked soft

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lampwife Maura | 3 (2014) | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.25 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 2 → 1.25; sustained 12 (2 × Fistful of Shards); nova Burning Oil 17; dmg 19

```
Lampwife Maura
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

Nimble Footing. Maura ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Maura takes the Dash or Disengage action.

Actions
Multiattack: Maura makes two attacks: one with her Fistful of Shards and one with her Hurled Lantern. It can replace one attack with a use of Fan the Flames.
Fistful of Shards: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) fire damage.
Hurled Lantern: Ranged Weapon Attack: +4 to hit, range 30/90 ft., one target. Hit: 6 (1d8 + 2) fire damage. Immediately after the attack, her lantern returns to Maura's grasp.
Burning Oil (Recharge 5-6): Maura hurls her lantern at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 17 (5d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Fan the Flames: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) fire damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern at thieves") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurls a shattering lantern that bursts into clinging fire [behavior] | glass eyes that drink the dark [body] | the hermit's hoard of lanterns and oil [object]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "Maura hurls her lantern at the feet of a creature caught Prone or behind cover, deliberately shattering it. Burning oil clings to that creature, who keeps burning until it douses the fire or rolls on the ground, and the flame throws a greedy little eye of light that marks the target until the fire is out — while Maura drinks that new light to slip into a dark corner." [action/always/damage] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Greedy Eye" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] signature template: exploiter -> Actions/"Greedy Eye" ("The central verb is hurling her lantern — she hurls it at a creature, oil clings [verb: prone:idea, caught:idea]")
[reskin] signature idea (trait): "The lamp oil that coats Maura's lantern feeds on blood and flame. Whenever she takes fire damage from any source, the lantern in her grasp flares to life and is ready to be hurled again." [trait/on_being_hit/resource] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body, marking-light (glass, lantern)
[reskin] signature miss: trait — "The lamp oil that coats Maura's lantern feeds on blood and flame. Whenever she takes fire damage from any source, the lantern in her grasp flares to life and is ready to be hurled again." [trait/on_being_hit/resource] — the model found no template that holds it (offered: resonant-body, marking-light)
[reskin] chassis nova: "Burning Oil (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Plague-Seer — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Plague-Seer | 8 (2014) | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Bile-Binding Slam); nova none; dmg 51

```
Plague-Seer
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

Clinging Contagion. As a bonus action, the plague-seer targets one creature within 30 feet of it. The target must succeed on a DC 15 Wisdom saving throw or have disadvantage on attack rolls against creatures other than the plague-seer until the start of the plague-seer's next turn.

Actions
Multiattack: The plague-seer makes three attacks, using Bile-Binding Slam or Plague-Eye Ray. It can replace one attack with a use of Wasting Gaze or Spellcasting to cast ray of sickness.
Bile-Binding Slam: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) force damage.
Plague-Eye Ray: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
Wasting Gaze: One creature within 60 feet of the plague-seer must succeed on a DC 15 Constitution saving throw or take 14 (4d6) bludgeoning damage and be poisoned until the end of its next turn.
Spellcasting: The plague-seer casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

At will: ray of sickness
1/day each: cloudkill, bestow curse
```

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: cursing the firstborn with hereditary plague [behavior] | body of coagulated, plague-ridden blood [body] | the seer's rheumy, hexing gaze [aura]
[reskin] signature idea (action): "The Plague-Seer fixes its gaze on the nearest foe bearing the mark of its lineage and shifts the hereditary rot it has sown. The target's own blood revolts, and any other creature of the same bloodline within sight feels a sympathetic lurch of cadaveric filth, their bodies beginning to waste as the curse latches onto the next generation." [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Hereditary Rot" EV 4.4 vs floor 8.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Hereditary Rot" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Mark" EV 5.1 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Plague-Seer's veins run not with living blood but with coagulated, plague-ridden filth. When a foe strikes it in melee and draws its blood, the tainted ichor sprays outward, clinging and spreading its rot to the attacker and any who stand too close." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---


### Stave-Binder of the Herd — bands soft

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Stave-Binder of the Herd | 13 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 10.5 (print at 13 reads 5.5–13.5, n=6)
- read: def 9 / off 12 → 10.5; sustained 78 (3 × Iron-Shod Stave); nova none; dmg 78

```
Stave-Binder of the Herd
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

187 (22d8 + 88)

Speed: 

30 ft., climb 30 ft.

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

Aura of Authority. While within 10 feet of the stave-binder, the stave-binder and its allies have advantage on attack rolls and saving throws, provided the stave-binder is not incapacitated.
Herd Rally (2/Day) (Bonus Action). Each ally within 30 feet of the stave-binder gains 13 (3d8) temporary hit points.

Actions
Multiattack: The stave-binder makes three attacks, using Iron-Shod Stave or Forked Bolt.
Iron-Shod Stave: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 10 (3d6) thunder damage.
Forked Bolt: Ranged Weapon Attack: +7 to hit, range 80/320 ft., one target. Hit: 24 (5d8 + 2) thunder damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commands a stampede of thunder-elk [behavior] | iron-shod stave that grounds the storm [object] | thunderous aura of authority [aura]
[reskin] signature idea (action): "The Stave-Binder slams its stave into the ground and calls the names of the herd's fallen, which drum through the earth. Thunder-elk stampede in perfect line between it and the creature it has marked as prey, and the ground churns a moment later, so anything caught on that line must fight to stay on its feet or be trampled and left reeling. It can call the stampede again only once the thunder of t" [action/always/movement] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] value check: "Stampede Call (2/Day)" EV 10.1 vs floor 65.9 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stampede Call (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The iron-shod stave grounds the storm that lives in the Stave-Binder's blood: whenever it plants the stave to brace, thunder rolls through the ground around it, and enemies who close to melee find their footing and their thunder-warded nerves shaken by the recalled weight of the herd's charge." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---


### Thunderfall Colossus — bands soft

**Concept:** a bone-wrought siege titan that stomps and shakes the walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunderfall Colossus | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Bone Fist); nova Shatter Cone 71; dmg 93

```
Thunderfall Colossus
Gargantuan construct, lawful neutral
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

tremorsense 60 ft., passive Perception 15

Languages: 

understands the languages of its creator but can't speak

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Shuddering Bones. A creature that hits the thunderfall colossus with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage and is deafened until the end of its next turn.
Thunder Absorption. Whenever the thunderfall colossus is subjected to thunder damage, it takes no damage and instead regains a number of hit points equal to the thunder damage dealt.
Immutable Form. The thunderfall colossus can't shape-shift.
Siege Monster. The thunderfall colossus deals double damage to objects and structures.

Actions
Multiattack: The thunderfall colossus makes two Bone Fist attacks. It can replace one attack with a use of Bonebreaker Thunder.
Bone Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) thunder damage.
Shatter Cone (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Bonebreaker Thunder: One creature within 60 feet that is prone must make a DC 17 Strength saving throw, taking 32 (5d12) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
```

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("bone-wrought siege titan") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] signature elements: stomping shockwaves that topple walls [behavior] | body of interlocking giant bones [body] | relentless siege engine that never stops [behavior]
[reskin] signature idea (action): "The titan slams a bone limb into the ground, and the shockwave races outward from the impact point, heaving the ground up in a ring. Everyone caught in the ring is thrown off their feet and battered by flying rubble; standing structures in the blast are hammered as if by a battering ram. It cannot repeat this until the dust settles for a moment." [action/once_per_fight/movement] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] signature miss: action — "The titan slams a bone limb into the ground, and the shockwave races outward from the impact point, heaving the ground up in a ring. Everyone caught in the ring is thrown off their feet and battered by flying rubble; standing structures in the blast are hammered as if by a battering ram. It cannot repeat this until the dust settles for a moment." [action/once_per_fight/movement] — the model found no template that holds it (offered: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] value check: "Merciless Strike" EV 29.2 vs floor 16.6 (one attack of 2) — dice 63 → 32 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The titan's body is a lattice of interlocking giant bones, and impacts set the whole frame ringing. Whenever a blow lands on it, the bone harmonics travel down into the ground beneath it, and the earth answers with a low thunder that rattles the footing of anyone standing near it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): resonant-body -> Traits/"Shuddering Bones" ("The idea says 'Whenever a blow lands on it... the earth answers with a low thund [verb: ring:idea]")
[reskin] chassis nova: "Shatter Cone (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

