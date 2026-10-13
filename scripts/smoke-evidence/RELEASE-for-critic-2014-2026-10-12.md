# Release table for the critic — 2014 blocks — 2026-10-12

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-12.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — sweep-2026-10-12T20-51-37

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Creel Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Mire Fang | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Lantern Widow | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Lantern Hermit | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 2/2 | 6/7 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lockwrought Sentinel | 5 (2014) | 2014 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 1/2 | 6/8 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Firstborn Blight | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Stillbirth Oracle | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/7 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Toller | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Bell-Drowned Harbor | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Storm-Herder | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Thunder-Marshal | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Ossuary Colossus | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/8 |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Bone-Wrought Siege Titan | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/7 |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | ok | soft (1) | 1/1 | 8/9 |
| Glassworn Echo | 18 | 2024 | skirmisher-18-skulker | ok | SOFT: band, hot-offense | SOFT: reach | SOFT: ko-at-will | ok | ok | ok | ok | soft (3) | 0/1 | 2/8 |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | ok | soft (1) | 1/1 | 8/9 |
| Glass Duelist | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/11 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/9 |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | soft (1) | 1/1 | 12/12 |
| Vessikar | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/9 |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sunbound Regent | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 10/11 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sunbound Archlich | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 11/11 |

**Dropped 4 of 44 user clauses** (coverage 91%); concept share 78% (206/264 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Sunbound Archlich — highest CR

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sunbound Archlich | 24 (2014) | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 34% under the table's 255
- bands · soft · band: reads CR 22 (print at 24 reads 20.5–24.5, n=5)
- read: def 22 / off 22 → 22; sustained 168 (3 × Grave Bolt + legendary Deathly Teleport); nova none; dmg 168

```
Sunbound Archlich
Medium undead, lawful evil
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

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +12, Perception +9

Saving Throws: 

CON +10, INT +12, WIS +9

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

Coronal Retort. A creature that touches the archlich or hits it with a melee attack while within 5 feet of it takes 14 (4d6) radiant damage.
Legendary Resistance (3/Day). If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar. If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (3/Day) (Reaction). When the archlich is hit by an attack roll, the archlich casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The archlich makes three attacks: one with its Grave Bolt, one with its Eldritch Burst, and one with its Paralyzing Touch. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.
Grave Bolt: Ranged Spell Attack: +12 to hit, range 80/320 ft., one target. Hit: 45 (9d8 + 5) radiant damage. If the target is a Large or smaller creature, it is restrained until the end of its next turn. This effect can be applied only once per turn.
Eldritch Burst: Melee Spell Attack: +12 to hit, reach 5 ft., one target. Hit: 27 (5d8 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +12 to hit, reach 5 ft., one target. Hit: 27 (5d8 + 5) cold damage, and the target is paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 20): -

At will: detect magic, detect thoughts, dispel magic, fireball, invisibility, lightning bolt, mage hand, prestidigitation

2/day each: animate dead, dimension door, plane shift

1/day each: chain lightning, finger of death, power word kill, scrying
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead within 20 feet of the archlich must make a DC 20 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one. Regardless of the result, the archlich can't take this action again until the start of its next turn.
Frightening Gaze: The archlich casts fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=aura — caster: ✓ ("sun-crowned archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a whole kingdom [behavior] | crown of burning bone [body] | solar blight [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's; INT 21 outranks the card's +11, so the sheet rolls +12 (raise-only)
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The archlich slams its scepter into the ground, and the sun-bleached bones of its fallen kingdom rise in a ring around it. These skeletal subjects claw and drag at every enemy nearby, holding them in place and feeding the archlich a stream of stolen vitality each moment they remain bound." [action/always/condition] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt, bolt-restrain
[reskin] signature rider: bolt-restrain -> Grave Bolt (appended; the idea's own verb is bind/binds, and this template carries binding as a rider  [verb: binds:concept])
[reskin] signature idea (trait): "The archlich wears a crown of fused, burning bone that answers any blow against its person. Whenever a creature strikes the archlich, a shard of that crown breaks loose and sears the attacker with radiant fire, marking them as a subject of the corpse-king." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] signature template (trait): heated-body -> Traits/"Coronal Retort" ("a shard of the crown breaks loose and sears the attacker with radiant fire when  [verb: burn:idea, sear:idea, fire:idea, shard:idea]")
[reskin] chassis nova: "Coronal Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Coronal Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Goblin Warrior — a 2014 sheet

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Scimitar); nova none; dmg 12

```
Goblin Warrior
Small humanoid, chaotic neutral
Armor Class 13 (leather)
Hit Points 24 (7d6)
Speed 30 ft.
STR 8 (-1), DEX 15 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)
Saving Throws DEX +4
Skills Perception +1, Stealth +4
Senses darkvision 60 ft., passive Perception 11
Languages Common, Goblin
Challenge 1 (200 XP)
Proficiency Bonus +2

Traits
Nimble Escape (Bonus Action): The goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin warrior makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had Advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack tactics and hit-and-run raiding [behavior] | hide armor and crude blade [object] | cowardly fury when cornered [behavior]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's; DEX 15 outranks the card's +3, so the sheet rolls +4 (raise-only)
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid stays — the Goblin Warrior is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon name: "Rat-Tower Scurrier" -> "Goblin Warrior" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon attack: "Shiv" -> "Scimitar" — the Goblin Warrior's own row
[reskin] print canon attack: "Slung Scrap" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Lantern Hermit — one marked soft

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Lantern Hermit | 3 (2014) | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.25 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 2 → 1.25; sustained 12 (2 × Slam); nova Shatter Burst 17; dmg 19

```
Lantern Hermit
Medium humanoid, chaotic neutral
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

Damage Vulnerabilities: 

thunder

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

Skitter. The hermit ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the hermit takes the Dash or Disengage action.

Actions
Multiattack: The hermit makes two attacks: one with its Slam and one with its Lantern. It can replace one attack with a use of Opportunist's Lash.
Slam: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage.
Lantern: Ranged Weapon Attack: +4 to hit, range 30/90 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage. Immediately after the attack, a lantern returns to the hermit's grasp.
Shatter Burst (Recharge 5-6): The hermit hurls a lantern at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 17 (5d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Opportunist's Lash: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) fire damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern at thieves") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling lanterns [behavior] | glass eyes [body] | lanterns [object]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The hermit hurls a shard of glass torn from her own shattered eye-socket, not at a foe's body, but at their face. On a hit, glass splinters into the target's eyes, leaving them half-blind and stumbling, unable to see the hermit clearly as she skitters away. This lasts until they spend a moment clawing the glass free." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Glassblind Strike" EV 1.1 vs floor 4.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Glassblind Strike" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When a foe lands a blow that would bloody her, the hermit smashes one of the glass orbs in her own head and flings the burning shards back into the attacker's face. The burst of light and glass leaves the attacker burned and blinded for a heartbeat, giving her room to flee." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body, marking-light (glass, lantern)
[reskin] signature miss: trait — "When a foe lands a blow that would bloody her, the hermit smashes one of the glass orbs in her own head and flings the burning shards back into the attacker's face. The burst of light and glass leaves the attacker burned and blinded for a heartbeat, giving her room to flee." [trait/on_being_hit/damage] — the model found no template that holds it (offered: resonant-body, marking-light)
[reskin] chassis nova: "Shatter Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Stillbirth Oracle — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Stillbirth Oracle | 8 (2014) | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 7 → 6; sustained 45 (3 × Pallid Hand); nova none; dmg 45

```
Stillbirth Oracle
Medium undead, lawful neutral
Armor Class

15 (natural armor)

Hit Points: 

135 (18d8 + 54)

Speed: 

30 ft., fly 30 ft. (hover)

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

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common plus the languages it knew in life

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Grave-Dust Wound. A creature that touches the oracle or hits it with a melee attack while within 5 feet of it takes 7 (2d6) necrotic damage.
Binding Mark. As a bonus action, the oracle targets one creature within 30 feet. The target must succeed on a DC 15 Wisdom saving throw or, until the start of the oracle's next turn, it has disadvantage on attack rolls against creatures other than the oracle.

Actions
Multiattack: The oracle makes three attacks, using Pallid Hand or Withering Ray. It can replace one attack with a use of (A) Bone-Cough or (B) Spellcasting to cast Ray of Sickness.
Pallid Hand: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage.
Withering Ray: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 13 (2d8 + 4) necrotic damage.
Bone-Cough: One creature within 60 feet of the oracle must make a DC 15 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.
Spellcasting: The oracle casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15):

At will: ray of sickness, invisibility
1/day each: bestow curse
Womb-Charm (Recharge 5-6): One creature within 60 feet of the oracle must succeed on a DC 15 Charisma saving throw or be charmed until the end of its next turn.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: Firstborn's Bane — a curse-brand marking the eldest child of each family line [behavior] | grave-hollow body that bleeds grave-dust instead of blood [body] | withering gaze that ages limbs to bone
[reskin] signature idea (action): "The Stillbirth Oracle presses a rotting brand onto the eldest child of a family line it can see. For a short while, any ally of the branded creature that stays near it bleeds and festers, taking slow necrotic damage each round." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Stillborn Brand" EV 4.4 vs floor 8.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stillborn Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Mark" EV 5.1 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The oracle's body is a hollow grave. Whenever it is wounded, it bleeds grave-dust that clings to nearby foes, making their wounds unable to close for a time." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature template (trait): heated-body -> Traits/"Grave-Dust Wound" ("A creature that touches the creature or hits it with a melee attack while within [verb: plague:concept]")
[reskin] chassis nova: "Firstborn Curse (Recharge 5-6)" — the caster-8-binder's own nova row; geometry, cap and rider lines below are its edits
```


---


### Thunder-Marshal — bands soft

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Thunder-Marshal | 13 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 10.5 (print at 13 reads 5.5–13.5, n=6)
- read: def 9 / off 12 → 10.5; sustained 78 (3 × Goad); nova none; dmg 78

```
Thunder-Marshal
Huge monstrosity, chaotic neutral
Armor Class

18 (natural armor)

Hit Points: 

189 (18d12 + 72)

Speed: 

30 ft.

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

Storm Discharge. A creature that touches the thunder-marshal or hits it with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage.
Aura of Authority. While in a 10-foot-radius sphere originating from the thunder-marshal, the thunder-marshal and its allies have advantage on attack rolls and saving throws, provided the thunder-marshal is not incapacitated.
Bolstering Cry (2/Day). As a bonus action, the thunder-marshal grants each ally within 30 feet of it 13 (3d8) temporary hit points.

Actions
Multiattack: The thunder-marshal makes three attacks, using Goad or Hoofbeat.
Goad: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) piercing damage plus 10 (3d6) thunder damage.
Hoofbeat: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 25 (5d8 + 3) bludgeoning damage.
```

**Engine trace**

```
[route] defender-leader type=Monstrosity mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commands a stampede of thunder-elk [behavior] | thunderous hide crackling with storm energy [body] | authority aura that rallies its herd [aura]
[reskin] signature idea (action): "The Thunder-Marshal looses a thunderous challenge that travels through the ground itself. Every thunder-elk in its herd capable of hearing it immediately surges toward the single nearest open path, trampling over any creature caught in the way. The stampede only answers while the Marshal still stands and has not lost its voice, and each herd can be driven forward only once before its thunder ebbs." [action/once_per_fight/movement] — menu: swallow, throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] value check: "Stampede Call (2/Day)" EV 10.1 vs floor 65.9 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stampede Call (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The storm inside the Thunder-Marshal answers violence in kind. Whenever a creature strikes it in melee, a crackling lash of thunder arcs back along the attacker's arm, shocking them and jolting them a step off balance. This storm discharge can flare only a few times between the Marshal's own turns." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature template (trait): heated-body -> Traits/"Storm Discharge" ("a creature that hits it with a melee attack takes thunder damage as the storm di [verb: storm:concept, shock:idea]")
```


---


### Bone-Wrought Siege Titan — bands soft

**Concept:** a bone-wrought siege titan that stomps and shakes the walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Bone-Wrought Siege Titan | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Fist); nova Shattering Stomp 71; dmg 93

```
Bone-Wrought Siege Titan
Huge construct, unaligned
Armor Class

16 (natural armor)

Hit Points: 

210 (20d12 + 80)

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

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 120 ft., passive Perception 15

Languages: 

understands the languages of its creator but can't speak

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Shrapnel Shell. A creature that touches the titan or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.
Necrotic Absorption. Whenever the titan is subjected to necrotic damage, it takes no damage and instead regains a number of hit points equal to the necrotic damage dealt.
Immutable Form. The titan can't shape-shift.
Siege Monster. The titan deals double damage to objects and structures.

Actions
Multiattack: The titan makes two Fist attacks. It can replace one attack with a use of Rubble Pin.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) necrotic damage.
Shattering Stomp (Recharge 5-6): Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
Rubble Pin: One creature within 30 feet that is prone must make a DC 17 Strength saving throw, taking 26 (4d12) necrotic damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("bone-wrought siege titan") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] signature elements: stomping quakes that shatter walls [behavior] | body assembled from siege-wreckage and titan bones [body] | a relentless, mindless siege advance [behavior]
[reskin] signature idea (action): "The titan slams a fist into the ground, sending a spreading quake through the earth. Walls, pillars, and other standing structures in the area crack and collapse, and any creature caught in the rubble is pinned and slowed by fallen masonry. The quake leaves the ground itself broken, turning solid footing into difficult debris." [action/save/damage] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Rubble Pin" EV 20.2 vs floor 16.6 (one attack of 2) — worth the trade
[reskin] signature template: exploiter -> Actions/"Rubble Pin" ("the titan slams the ground and any creature caught in the spreading quake is pin [verb: pinned:idea, caught:idea]")
[reskin] signature idea (trait): "The titan's body is a walking scrap-pile of shattered walls and broken towers; whenever it takes damage from a physical blow, jagged shards of wreckage burst outward from the impact. Anyone standing close enough is cut and staggered by the flying debris." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Shrapnel Shell" ("takes damage from a physical blow, jagged shards of wreckage burst outward from  [verb: shard:idea, jagged:idea]")
[reskin] chassis nova: "Shattering Stomp (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


---

## Review batch — baseline-fidelity-2026-10-12T21-31-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 6/6 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/7 |
| Mirel Dreen | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crossroads Tyrant | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/9 |
| Marsh Skipper | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vigil Stone | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Staffmage | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Muckjaw Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Hamperwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Iron Bull Golem | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Caltrop Runner | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Apiarch | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 3 of 46 user clauses** (coverage 93%); concept share 79% (65/82 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Meshrin
Large humanoid, lawful neutral
Armor Class

19 (splint, shield)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

11 (+0)

	

13 (+1)

	

14 (+2)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Meshrin hits a creature with its Greatsword, the attack deals an extra 3 damage.
Riposte (Reaction). When a creature misses Meshrin with a melee attack roll, Meshrin makes one Tail Swipe attack against that creature.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword and tail-swipes [object] | trained fighter's discipline [behavior] | razor claws and vicious bite [body]
[reskin] signature idea (action): "After a creature within Meshrin's reach fails to hold its ground against Meshrin's tail, Meshrin immediately presses the advantage with a disciplined follow-up. It lashes out with claws and bite, driving the foe down and keeping the warlord's path clear." [rider/on_hit/damage] — menu: charge-push, hook-rider (+ shelf: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "After a creature within Meshrin's reach fails to hold its ground against Meshrin's tail, Meshrin immediately presses the advantage with a disciplined follow-up. It lashes out with claws and bite, driving the foe down and keeping the warlord's path clear." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin's hide is a map of old wounds and harder lessons; blades that bite too shallow only teach it how to bite back. Whenever a foe lands a glancing blow, Meshrin answers with a snap of its jaws or a rake of its claws against that same attacker." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Meshrin's hide is a map of old wounds and harder lessons; blades that bite too shallow only teach it how to bite back. Whenever a foe lands a glancing blow, Meshrin answers with a snap of its jaws or a rake of its claws against that same attacker." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, terrain-walk, bloodied-fury)
```


---


### Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 33 (3 × Rend); nova none; dmg 33

```
Troll
Large giant, unaligned
Armor Class

15 (natural armor)

Hit Points: 

94 (9d10 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

13 (+1)

	

20 (+5)

	

7 (-2)

	

9 (-1)

	

7 (-2)

Skills: 

Athletics +7, Perception +2

Saving Throws: 

STR +7, CON +8

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Giant

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Regeneration. The troll regains 15 hit points at the start of each of its turns. If the troll takes acid or fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
Loathsome Limbs. If the troll ends any turn with half of its hit points or fewer and took 15+ slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 level of exhaustion for each missing limb, and it grows replacement limbs the next time it regains hit points.
Charge. As a bonus action, the troll moves up to half its speed straight toward an enemy it can see.

Actions
Multiattack: The troll makes three Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage.
```

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] cr from print: 5 — a print creature heads the words and the user set none
[concept] signature elements: regeneration that only fire or acid stops [behavior] | rubbery hide and gangly limbs [body] | ravenous hunger that never ends [behavior]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon name: "Gravemaw Troll" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---


### Knife Ball — a homebrew with a nova

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · soft · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Core Slam); nova Knife Scatter 11; dmg 14

```
Knife Ball
Small construct, unaligned
Armor Class

13 (natural armor)

Hit Points: 

45 (7d6 + 21)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3, WIS +4

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Buried Blade. During the first round of each combat, the knife ball has advantage on attack rolls against any creature that hasn't taken a turn. If the knife ball hits a creature during that round, the target takes an extra 4 (1d8) bludgeoning damage.
Rolling Shell. The knife ball ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the knife ball takes the Dash or Disengage action.

Actions
Multiattack: The knife ball makes two attacks: one with its Core Slam and one with its Thrown Knife. It can replace one attack with a use of Grinding Carve.
Core Slam: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) bludgeoning damage.
Thrown Knife: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) piercing damage. Immediately after the attack, a hurled knife returns to the knife ball's grasp.
Knife Scatter (Recharge 5-6): The knife ball hurls a hurled knife at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Grinding Carve: One creature within 30 feet that is prone must make a DC 13 Dexterity saving throw, taking 7 (2d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — skirmisher-hurler: ✓ ("knife ball") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: retractable knife-studded iron shell [body] | hurling blades from its body [behavior] | rolling charge into foes [behavior]
[reskin] nova capped: "Hurled Burst" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball rolls straight through its enemies in a grinding charge, its bladed hide carving anyone in its path. After the charge, it can either keep moving or stop dead and let the momentum drive an extra knife into a single target it just passed." [action/always/damage] — menu: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Grinding Carve" EV 5.4 vs floor 3.6 (one attack of 2) — dice 14 → 7 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Grinding Carve" ("rolls straight through its enemies in a grinding charge, its bladed hide carving [verb: grind:idea]")
[reskin] signature idea (trait): "Whenever the knife ball slams its core into a target, the impact jars loose a buried blade that springs out and sticks into the same creature. The buried knife can be yanked free by the knife ball later, but until then it keeps hurting." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature template (trait): assassinate -> Traits/"Buried Blade" ("none of the templates carries the idea of a blade lodging in a target and persis [verb: knife:concept]")
[reskin] chassis nova: "Knife Scatter (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Staffmage — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Staffmage | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff); nova none; dmg 22

```
Staffmage
Medium humanoid, neutral
Armor Class

12

Hit Points: 

58 (13d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


9 (-1)

	

14 (+2)

	

11 (+0)

	

17 (+3)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +5, Perception +3

Saving Throws: 

INT +5, WIS +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common and any three languages

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Actions
Multiattack: The staffmage makes two Staff attacks.
Staff: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage, and the target is subjected to the following effect. The target must make a DC 13 Constitution saving throw. On a failed save, the target has the Prone condition.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("hits people with his staff") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: staff strikes [object] | hit-and-run skirmishing [behavior] | iron-shod staff [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's; INT 17 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "The staffmage lunges forward, sweeps his staff low into the knees of a foe he has just staggered, then spins and retreats to the farthest point he can reach on the battlefield, daring the target to come after him. If the knee-sweep lands, the foe is left off balance and cannot easily chase him." [rider/on_hit/condition] — menu: EMPTY (+ shelf: gaze-single, snare, reel, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally)
[reskin] signature miss: action — "The staffmage lunges forward, sweeps his staff low into the knees of a foe he has just staggered, then spins and retreats to the farthest point he can reach on the battlefield, daring the target to come after him. If the knee-sweep lands, the foe is left off balance and cannot easily chase him." [rider/on_hit/condition] — the model found no template that holds it (offered: herd)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The staffmage treats his staff as an extension of his own body, reading its balance and weight in every strike. So long as he holds no other weapon in his other hand, his staff attacks are unnaturally precise and can slip past an enemy's guard when he catches them off balance." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The staffmage treats his staff as an extension of his own body, reading its balance and weight in every strike. So long as he holds no other weapon in his other hand, his staff attacks are unnaturally precise and can slip past an enemy's guard when he catches them off balance." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---


### Grandmother Ash — bands soft

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Choking Miasma 22; dmg 43

```
Grandmother Ash
Medium fey, neutral evil
Armor Class

15 (natural armor)

Hit Points: 

127 (17d8 + 51)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

16 (+3)

	

13 (+1)

	

14 (+2)

	

14 (+2)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Damage Vulnerabilities: 

fire

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common, Elvish, Sylvan

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Toxic Reek. A creature that touches the grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) poison damage.
Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Choking Miasma (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=aura, breath — caster-binder: ✓ ("Her nails are long and black and carry r") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: ash cloud form [body] | choking and suffocation [behavior] | undead crows as scouts [object]
[reskin] print canon route: the Green Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Green Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash exhales a billowing cloud of choking ash that fills the air around her, lingering for a short while. Anyone caught inside has the air stolen from their lungs, coughing and sputtering, and cannot see through the swirling soot. She often uses this to blind and scatter intruders before lunging at one with her rotting nails." [action/save/condition] — menu: swallow, trample, leap, thrown-burst, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] value check: "Choking Miasma (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Choking Miasma (Recharge 5-6)" ("exhales a billowing cloud of choking ash that fills the air around her, lingerin [verb: cloud of:concept, breathes:concept, exhales:idea]")
[reskin] signature idea (trait): "Whenever Grandmother Ash takes fire damage, her ash cloud form destabilizes and she is forced to pull herself together, losing her ability to drift and choke for a moment. She becomes briefly vulnerable and sluggish, making her retreat if badly burned." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature bound by force: trait — "heated-body" matches burn+fire in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: burn:concept, fire:concept]")
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ashen Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```

