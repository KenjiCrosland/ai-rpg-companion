# Release table for the critic — 2014 blocks — 2026-10-13

The case is at the top of the 2024 file (SPECIES-for-critic-2024-2026-10-13.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — species-nineteen-2026-10-13T18-35-30

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Blackreed Stalker | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Bloodmaw Vorgath | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Usharra the Shellbound | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Vareth Stormguard | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Skarn the Reeking | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/7 |
| Cinderhold Vaelor | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Voxmaw | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Coralmarshal Othyn | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Grung Poison-Dancer | 3 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 7/7 |
| Nagi the Venomwright | 7 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | soft (2) | 1/1 | 1/6 |
| Hollow Piper | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Windscout | 2 | 2024 | skirmisher-3-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hushwing | 3 (2014) | 2014 | lurker-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Thistlewick | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Serael the Dawnward | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Sable Nefret | 4 (2014) | 2014 | skirmisher-3-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/7 |
| Mournhold Grieve | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Sriella Windstride | 5 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/8 |
| Asterion Vaultward | 9 (2014) | 2014 | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 0 of 19 user clauses** (coverage 100%); concept share 45% (47/105 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Skarn the Reeking — lowest CR

**Concept:** a troglodyte raider who reeks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skarn the Reeking | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Bite); nova none; dmg 10

```
Skarn the Reeking
Medium humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

27 (5d8 + 5)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

12 (+1)

	

12 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Sunlight Sensitivity. While in sunlight, Skarn has disadvantage on ability checks and attack rolls.
Stench. Any creature that starts its turn within 5 feet of Skarn must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. On a successful save, the target is immune to Skarn's Stench for 24 hours.
Loping Scuttle. Skarn ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Skarn takes the Dash or Disengage action.
Reeking Jaunt (Recharge 4-6). As a bonus action, Skarn teleports up to 40 feet to an unoccupied space it can see.

Actions
Multiattack: Skarn makes two attacks: one with Bite and one with Filth Glob.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Filth Glob: Ranged Weapon Attack: +3 to hit, range 20/60 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a troglodyate raider who reeks") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: overwhelming stench that sickens and betrays its position [aura] | clawed bite that carries the reek of venom [body] | pack skirmisher tactics: dart in, strike, and vanish [behavior]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Skarn flings a glob of filth that clings and burns like venom. Anyone it splatters reeks so loudly that even creatures that cannot smell are compelled to look, and Skarn and its pack can slip away unseen while the target is busy clawing the filth off." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Blink Step (Recharge 4-6)" EV 1.2 vs floor 1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: blink -> Bonus Actions/"Blink Step (Recharge 4-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The reek of Skarn's bite does not wash off. A creature it bites continues to stink of troglodyte venom, drawing the attention of every predator and packmate in the dark until the wound is cleaned or the creature leaves the warren." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
```


---


### Asterion Vaultward — highest CR

**Concept:** a minotaur labyrinth-keeper with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Asterion Vaultward | 9 (2014) | brute-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 7 (print at 9 reads 5.5–12.5, n=8)
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Asterion Vaultward
Large monstrosity, lawful neutral
Armor Class

14 (natural armor)

Hit Points: 

153 (18d10 + 54)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

17 (+3)

	

8 (-1)

	

10 (+0)

	

8 (-1)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +7

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Great Weapon Master. When Asterion hits a creature with its Greataxe, the attack deals an extra 4 damage.
Charge. As a bonus action, Asterion moves up to half its speed straight toward an enemy it can see.

Actions
Multiattack: Asterion makes two Greataxe attacks. It can replace one attack with a use of Vault-Warden's Glare.
Greataxe: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 27 (7d6 + 3) slashing damage.
Vault-Warden's Glare: One creature within 60 feet of Asterion must succeed on a DC 15 Wisdom saving throw or be frightened of Asterion until the end of Asterion's next turn. If the target was already frightened by this ability, it also takes 27 (6d8) piercing damage.
```

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("a minotaur labyrinth-keeper with a great") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: coffin-narrow corridors where it fights [behavior] | greataxe of etched bone and blackened iron [object] | ossified hide layered with grave-dust [body]
[reskin] signature idea (action): "When Asterion is in a narrow space with walls close by, it plants its hooves and swings its greataxe in a sweeping arc that crashes into the walls themselves. The echoing boom and shower of stone shards forces every creature in front of it to stumble backward, potentially knocking them off their feet and pushing them away. This maneuver leaves Asterion rooted in place, ready to punish any who dare" [action/always/movement] — menu: trample, leap, thrown-burst, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] value check: "Creeping Dread" EV 18.6 vs floor 14 (one attack of 2) — dice 14 → 27
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Asterion's greataxe is forged from the etched bones of failed escapees, and its blackened iron head drinks the light and hope from those it strikes. Any creature wounded by the axe feels a creeping despair, making it harder for them to find their way or flee the maze." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Asterion's greataxe is forged from the etched bones of failed escapees, and its blackened iron head drinks the light and hope from those it strikes. Any creature wounded by the axe feels a creeping despair, making it harder for them to find their way or flee the maze." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body)
```


---


### Bloodmaw Vorgath — a 2014 sheet

**Concept:** an orc warchief with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Vorgath | 5 (2014) | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Greataxe); nova none; dmg 32

```
Bloodmaw Vorgath
Medium humanoid, neutral evil
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

14 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 120 ft., passive Perception 10

Languages: 

Orc, Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Vorgath hits a creature with its Greataxe, the attack deals an extra 3 damage.
Aura of Authority. While within 10 feet of Vorgath, Vorgath and its allies have advantage on attack rolls and saving throws, provided Vorgath isn't incapacitated.
Relentless Rush. As a bonus action, Vorgath takes the Dash action.
Iron Guard. As a bonus action, Vorgath withdraws into its shell. Until it emerges, it gains a +4 bonus to Armor Class and is prone; its speed is 0 and can't increase, it has disadvantage on Dexterity saving throws, it can't take actions or reactions, and it can emerge only as a bonus action.

Actions
Multiattack: Vorgath makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Haft Swing: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("warchief") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: a greataxe wielded in two hands [object] | a rallying aura of command [aura] | relentless, death-before-retreat leadership [behavior]
[reskin] signature idea (action): "Vorgath roars its death-before-retreat command, and every ally within earshot that can see or hear it surges forward. Those allies can immediately stride toward a foe and strike, and none of them can be made to flee or falter until Vorgath falls." [action/once_per_fight/movement] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature miss: action — "Vorgath roars its death-before-retreat command, and every ally within earshot that can see or hear it surges forward. Those allies can immediately stride toward a foe and strike, and none of them can be made to flee or falter until Vorgath falls." [action/once_per_fight/movement] — the model found no template that holds it (offered: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, rally)
[reskin] value check: "Shell Defense" EV 5.1 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: shell-withdraw -> Bonus Actions/"Shell Defense" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vorgath grips its greataxe in both hands as naturally as breathing, so the weapon carves wider and bites deeper. Whenever it brings the axe down on a foe that is already wounded, the blow tears through flesh with terrifying finality." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Vorgath grips its greataxe in both hands as naturally as breathing, so the weapon carves wider and bites deeper. Whenever it brings the axe down on a foe that is already wounded, the blow tears through flesh with terrifying finality." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
```


---


### Grung Poison-Dancer — a homebrew with a nova

**Concept:** a grung poison-dancer who leaps between the branches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grung Poison-Dancer | 3 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 20 (2 × Slam); nova Venom Arc 11; dmg 21

```
Grung Poison-Dancer
Small humanoid, neutral
Armor Class

13 (leather)

Hit Points: 

58 (13d6 + 13)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

14 (+2)

	

13 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

understands Common but can't speak it

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Standing Leap. The poison-dancer's long jump is up to 10 feet and its high jump is up to 5 feet, with or without a running start.
Amphibious. The poison-dancer can breathe air and water.
Canopy Leaper. The poison-dancer ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the poison-dancer takes the Dash or Disengage action.

Actions
Multiattack: The poison-dancer makes two attacks: one with its Slam and one with its Toxin Needle.
Slam: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage plus 4 (1d8) poison damage.
Toxin Needle: Ranged Weapon Attack: +4 to hit, range 20/60 ft., one target. Hit: 9 (2d6 + 2) poison damage.
Venom Arc (Recharge 5-6): The poison-dancer spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 12 Dexterity saving throw, taking 11 (2d10) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone. On a successful save, the target is pushed 5 feet straight away.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("leaps between the branches") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: leaping branch-to-branch mobility [behavior] | venom-coated darts and claws [body] | grung tribal skirmisher [behavior]
[reskin] signature idea (action): "The poison-dancer makes a high, arcing leap across the battlefield, keeping its weapon ready. If it passes within striking distance of a foe during the leap, it lashes out with a venom-coated dart or claw as it goes by, then lands behind cover or in the branches." [action/always/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — coating, delayed-brand, affliction, leap (poison, leap)
[reskin] value check: "Venom Arc (Recharge 5-6)" EV 29.2 vs floor 5.7 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: leap -> Actions/"Venom Arc (Recharge 5-6)" ("the poison-dancer makes a high arcing leap across the battlefield, jumping to a  [verb: leap:concept]")
[reskin] signature idea (trait): "The poison-dancer's darts and claws carry a lingering venom that thickens in the blood. A victim struck by its toxin needle or dart finds the poison clinging to its wounds, making it sluggish and easy to track." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
```


---


### Hushwing — bands soft

**Concept:** an owlin night-watcher who hunts in silence

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hushwing | 3 (2014) | lurker-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Talons); nova none; dmg 22

```
Hushwing
Medium humanoid, neutral
Armor Class

12

Hit Points: 

58 (9d8 + 18)

Speed: 

30 ft., fly 30 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

14 (+2)

	

14 (+2)

	

11 (+0)

	

12 (+1)

	

12 (+1)

Skills: 

Perception +3, Stealth +6

Saving Throws: 

DEX +4

Senses: 

darkvision 120 ft., passive Perception 13

Languages: 

Common

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Faultless Tracker. Hushwing knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
Assassinate. During the first round of each combat, Hushwing has advantage on attack rolls against any creature that hasn't taken a turn. If Hushwing hits a creature during that round, the target takes an extra 6 (1d12) slashing damage.
Flyby. Hushwing doesn't provoke an opportunity attack when it flies out of an enemy's reach.
Umbral Step. As a bonus action while in dim light or darkness, Hushwing takes the Hide action.
Silent Hunt (2/Day). As a bonus action, Hushwing has advantage on the next attack roll it makes before the end of its turn.

Actions
Multiattack: Hushwing makes two Talons attacks.
Talons: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) slashing damage.
```

**Engine trace**

```
[route] lurker type=Humanoid mechanics=none — lurker: ✓ ("hunts in silence") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: silent aerial ambush [behavior] | hollow bone-frame and talons [body] | the re-hide cycle [behavior]
[reskin] signature idea (action): "When Hushwing drops on prey from above, it drives its full weight through its talons and pins the victim to the ground beneath it, both of them crashing down together. The strike only lands this way when it attacks a creature below it, and the pinned prey can claw free if it fights hard enough, but while it's held the watcher keeps its talons buried and isn't going anywhere." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Silent Hunt (2/Day)" EV 1.8 vs floor 1.8 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Silent Hunt (2/Day)" ("hunt (concept): the signature hunt is a single focused stalk — Advantage on the  [verb: hunt:concept]")
[reskin] signature idea (trait): "Hushwing's body is airy and nearly hollow-boned, so its own silence muffles the world around it: any sound made within a short reach of it — footsteps, armor, a shout — is swallowed before it carries, letting the watcher and anything beside it slip through a room unheard." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, uncanny-sense, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature bound by force: trait — "faultless-tracker" matches hunts+hunted in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept]")
```


---


### Sable Nefret — bands soft

**Concept:** a tabaxi cat burglar who climbs the temple wall

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Nefret | 4 (2014) | skirmisher-3-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2 (print at 4 reads 0.5625–6.5, n=13)
- read: def 1 / off 3 → 2; sustained 24 (2 × Claws); nova none; dmg 24

```
Sable Nefret
Medium humanoid, neutral
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

16 (+3)

	

14 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +7

Saving Throws: 

DEX +5

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Spider Climb. Sable can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Shadowstep. Sable ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Cunning Action. As a bonus action, Sable takes the Dash, Disengage, or Hide action.
Cat's Dash. As a bonus action, Sable takes the Dash action.
Shadow Pounce (1/Day) (Bonus Action). Immediately after dealing damage to a creature that has half of its hit points or fewer, Sable moves up to half its speed, and it makes one Claws attack.

Actions
Multiattack: Sable makes two attacks: one with Claws and one with Dart.
Claws: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a tabaxi cat burglar who climbs the temp") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: climbing temple walls to ambush from above [behavior] | ash-dusted fur and smoldering rope snare [body]
[reskin] signature idea (action): "Sable hurls a fistful of blinding temple ash at one creature it can see within a short range, which bursts over the target's eyes and leaves it unable to see while Sable slips away or closes in. The cloud only blinds for a moment and clings to that one creature, giving Sable the opening it needs to strike from a blind spot or escape up a wall." [action/save/condition] — menu: leap, snare, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Ashen Blindside" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Ashen Blindside" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Rampage (1/Day)" EV 11.8 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sable's fur constantly sheds smoldering ash and fine rope-dust; any creature that grapples or otherwise holds onto Sable is left coughing and half-blinded, making it easier for Sable to twist free and disappear. The clinging ash also marks Sable's trail faintly, but only for those who know to look for the scent of a smoldering snare." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — spider-climb (climb, climbs, climbing, walls, wall)
[reskin] signature bound by force: trait — "spider-climb" matches climb+climbs+climbing+walls+wall in the user's words; the model's none is overruled
[reskin] signature template (trait): spider-climb -> Traits/"Spider Climb" ("exact concept match [verb: climb:concept, climbs:concept, climbing:concept, walls:concept, wall:concept, cling:idea]")
```


---


---

## Review batch — step7-twelve-2026-10-13T18-19-35

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Vaultsworn Bulwark | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok | soft (2) | 6/6 | 3/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 5/7 | 4/4 |
| Mire Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thurivald | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Thunder-Stamp Herdmaster | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sorrowbile the Rotwife | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Snapping Turtle Elder | 9 | 2024 | brute-9 | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 69% (43/62 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Kraken — highest CR

**Concept:** a kraken

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

```
Kraken
Gargantuan monstrosity, chaotic evil
Armor Class

18 (natural armor)

Hit Points: 

481 (26d20 + 208)

Speed: 

30 ft., swim 120 ft.

STR	DEX	CON	INT	WIS	CHA


30 (+10)

	

11 (+0)

	

26 (+8)

	

22 (+6)

	

18 (+4)

	

20 (+5)

Skills: 

Athletics +17, Perception +11

Saving Throws: 

STR +17, CON +15, WIS +11

Damage Immunities: 

cold, lightning

Condition Immunities: 

frightened, grappled, paralyzed, restrained

Senses: 

truesight 120 ft., passive Perception 21

Languages: 

understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft.

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious. The kraken can breathe air and water.
Siege Monster. The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) by one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 23 Dexterity saving throw, taking 33 (6d10) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller and fails the save, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. Whether it succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and constriction [behavior] | ink cloud and deep-sea ambush [behavior] | crushing beak and swallowing maw [body]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Brine Eruption (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Kraken's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Abyssal Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Brine Eruption (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---


### Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Meshrin
Large humanoid, lawful neutral
Armor Class

19 (natural armor)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft., swim 30 ft.

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

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Hold Breath. Meshrin can hold its breath for 15 minutes.
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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: key "fighting styles" (class verb)
[concept] signature elements: holds the line with greatsword and tail [behavior] | razor claws and vicious bite [body] | trained in fighting styles [object]
[reskin] signature idea (action): "Meshrin goes into a flurry of brutal close-quarters savagery, raking with its claws and finishing by sinking its teeth into the same foe. The target is left bleeding and unsteady, easy prey for the rest of the legion. Against a foe already knocked to the ground, the onslaught is far worse." [rider/on_hit/damage] — menu: charge-push, hook-rider (+ shelf: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin goes into a flurry of brutal close-quarters savagery, raking with its claws and finishing by sinking its teeth into the same foe. The target is left bleeding and unsteady, easy prey for the rest of the legion. Against a foe already knocked to the ground, the onslaught is far worse." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Any creature Meshrin has clawed or bitten cannot slip away unnoticed; Meshrin keeps it marked as its quarry, matching the target's pace and turning its full attention on it. The quarry cannot hide from Meshrin while the marks remain." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---


### Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Reeling Cinder Cloud 22; dmg 43

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

Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Reeling Cinder Cloud (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] skirmisher-winged type=Fey mechanics=breath, aura — caster-binder: a caster line needs a magic word in the words — none here | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | skirmisher-winged: ✓ ("She keeps three crows that warn her of i") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] signature elements: turning into choking ash-cloud [behavior] | rot-black nails [body] | three crow familiars [object]
[reskin] print canon route: the Green Hag's body outranks the winged seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash dissolves into a reeling cloud of burning ash and drives it down the throats of everyone pressed close to her. Those caught in the cloud breathe her in and begin to rot from the inside, and the rot lingers in them so that each fresh wound she opens in them afterwards seeps and will not close. Only living creatures that need to breathe are touched by it, and she can only hold the as" [action/always/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] value check: "Reeling Cinder Cloud (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Reeling Cinder Cloud (Recharge 5-6)" ("Grandmother Ash dissolves into a cloud of burning ash and drives it into the mou [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "The black rot under her nails does not wash off. Anything her nails open keeps seeping and festering, and healing magic poured into those wounds has to fight the rot before it can close them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk, noxious-aura (ash, rot)
[reskin] signature miss: trait — "The black rot under her nails does not wash off. Anything her nails open keeps seeping and festering, and healing magic poured into those wounds has to fight the rot before it can close them." [trait/always/damage] — the model found no template that holds it (offered: terrain-walk, noxious-aura)
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon alignment: Chaotic Neutral -> Neutral Evil — the Green Hag's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ash Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---


### Sir Reginald Pemberton-Hughes — in the run

**Concept:** name: Sir Reginald Pemberton-Hughes | a knight who is deathly afraid of chickens and will flee from any bird

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Reginald Pemberton-Hughes | 5 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

```
Sir Reginald Pemberton-Hughes
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

14 (+2)

	

11 (+0)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +5

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common plus one other language

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Phobia. While Sir Reginald can see the thing it fears within 30 feet of itself, it has disadvantage on attack rolls and ability checks, and it must use its movement on each of its turns to move away from the thing it fears by the safest available route unless there is nowhere farther to go.

Actions
Multiattack: Sir Reginald makes two attacks: one with Greatsword and one with Heavy Crossbow.
Greatsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage plus 4 (1d8) radiant damage.
Heavy Crossbow: Ranged Weapon Attack: +6 to hit, range 100/400 ft., one target. Hit: 16 (3d8 + 3) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who is deathly afraid of chicke") | defender: key "knight" (class verb)
[concept] signature elements: phobic flight from birds [behavior] | shield-and-plate bulwark [object] | terror of chickens [aura]
[reskin] print canon array: STR 16, DEX 11, CON 14, INT 11, WIS 11, CHA 15 — the Knight's, STR fitted to +6
[reskin] print canon: "Sir Reginald Pemberton-Hughes — a knight who is deathly afraid of chickens and will flee from any bird" heads on the Knight — print's rows ride along; the seat stays
[reskin] signature idea (action): "The moment any bird comes into Sir Reginald's sight, his discipline shatters: he shrieks, drops whatever he is holding, and sprints full-tilt away from the feathered thing, his shield forgotten on the ground. He will not stop, fight, or even look back until the bird is gone entirely from his view and he has put a great deal of ground between himself and it — only then does he creep back, shame-fac" [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature miss: action — "The moment any bird comes into Sir Reginald's sight, his discipline shatters: he shrieks, drops whatever he is holding, and sprints full-tilt away from the feathered thing, his shield forgotten on the ground. He will not stop, fight, or even look back until the bird is gone entirely from his view and he has put a great deal of ground between himself and it — only then does he creep back, shame-fac" [reaction/on_being_hit/movement] — the model found no template that holds it (offered: snap-shot, riposte, terror-pulse, rally)
[reskin] value check: "Dazzling Burst" EV 2.3 vs floor 8.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When Sir Reginald plants his shield and holds his ground, his defense becomes nigh-impossible to break: anyone striking him suffers a jarring, punishing rebound that rattles them hard enough to leave them staggered and open. He becomes a stone in the road that hurts you to kick." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — phobia (afraid of, afraid, flee from)
[reskin] signature bound by force: trait — "phobia" matches afraid of+afraid+flee from in the user's words; the model's none is overruled
[reskin] signature template (trait): phobia -> Traits/"Phobia" ("exact concept match [verb: afraid of:concept, afraid:concept, flee from:concept]")
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Knight's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Knight's
[reskin] print canon attack: "Broadsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Shield Bash" -> "Heavy Crossbow" — the Knight's own ranged row
[reskin] print canon defenses: immunities none -> Frightened — the Knight's own header lines
```


---


### Knife Ball — in the run

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 2 → 1.0625; sustained 19 (1 × Blade); nova none; dmg 19

```
Knife Ball
Small construct, unaligned
Armor Class

10

Hit Points: 

44 (8d6 + 16)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

12 (+1)

	

15 (+2)

	

5 (-3)

	

13 (+1)

	

8 (-1)

Skills: 

Stealth +5

Saving Throws: 

STR +3

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

blindsight 10 ft., darkvision 60 ft., passive Perception 11

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Adhesive Hide. The knife ball adheres to anything that touches it. A Huge or smaller creature adhered to the knife ball is grappled (escape DC 11).
False Form. As a bonus action, the knife ball shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

Actions
Blade: Melee Weapon Attack: +3 to hit (with advantage if the target is grappled by the knife ball), reach 5 ft., one target. Hit: 19 (4d8 + 1) slashing damage.
Adhesive Yank: One creature within 30 feet of the knife ball that is grappled by it must make a DC 12 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] lurker-trap type=Construct mechanics=none — swarm: a swarm is a mass of many — no mass in the words | lurker-trap: ✓ ("knife ball") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: erupts from a harmless-looking ball into a whirling sphere of blades [behavior] | shell of spring-loaded iron knives [body] | disguised as a stray iron ball before striking [aura]
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball erupts into a thirty-foot shell of spring-loaded iron blades. Every creature in that massive sphere is slashed and then knocked away from the ball, staggering back. After erupting, the blades stay extended, so the knife ball moves slowly until it retracts them at the start of its next turn." [action/always/damage] — menu: swallow, condition-payoff, seal, lure, hook-drag, active-toll, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "The knife ball erupts into a thirty-foot shell of spring-loaded iron blades. Every creature in that massive sphere is slashed and then knocked away from the ball, staggering back. After erupting, the blades stay extended, so the knife ball moves slowly until it retracts them at the start of its next turn." [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, seal, lure, hook-drag, active-toll, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, shell-withdraw, pounce)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 8.8 (one attack of 1) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any creature that hits the knife ball with a melee attack is raked by its whirling blades, taking slashing damage as the shell bites back. The knife ball can only bring its shell to bear this way once each round, so it doesn't punish every single blow." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature miss: trait — "Any creature that hits the knife ball with a melee attack is raked by its whirling blades, taking slashing damage as the shell bites back. The knife ball can only bring its shell to bear this way once each round, so it doesn't punish every single blow." [trait/on_being_hit/damage] — the model found no template that holds it (offered: assassinate)
```


---

