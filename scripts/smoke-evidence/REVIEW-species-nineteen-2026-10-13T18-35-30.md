# Review batch — species-nineteen-2026-10-13T18-35-30

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

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

## Skarn the Reeking — lowest CR

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

## Asterion Vaultward — highest CR

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

## Bloodmaw Vorgath — a 2014 sheet

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

## Blackreed Stalker — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Blackreed Stalker | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Blackreed Stalker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft., Swim 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Draconic

CR 2 (XP 450; PB +2)

Traits

Assassinate. During the first round of each combat, Stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If Stalker hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. Stalker can hold its breath for 15 minutes.

Reedstep. Stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Stalker makes two Spear attacks.

Spear. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of Stalker's next turn.

Bonus Actions

Cunning Action. Stalker takes the Dash, Disengage, or Hide action.

Marshland Stalk (2/Day). Stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Humanoid mechanics=thrown-weapon — skirmisher: ✓ ("stalks the marsh with a spear") | skirmisher -> skirmisher-skulker: the concept's VERB outranks the noun (key "stalks", class verb) | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: hides and strikes from cover [behavior] | barbed spear [object] | reed-marsh stalking [behavior]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The stalker hurls its spear or thrusts it from the reeds, and the barbed head tears free in a spray of blood. The wound keeps bleeding through the target's own movement, so a fleeing or fighting victim leaves a bright trail of blood that the stalker reads like a map. The bleeding stops only if the wound is packed and bound." [rider/on_hit/damage] — menu: bolt-mark (+ shelf: gaze-single, snare, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Marshland Stalk (2/Day)" EV 1.1 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Marshland Stalk (2/Day)" ("the concept's central verb 'stalk' is exactly the focus template's verb match —  [verb: stalk:concept]")
[reskin] signature idea (trait): "The stalker's hide and gear are steeped in mire water and crushed blackreed, so even when seen it looks like part of the marsh. Foes that lose track of it in the reeds struggle to pick it out again until it moves or strikes." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature bound by force: trait — "faultless-tracker" matches stalks+stalk in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Cinderhold Vaelor — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinderhold Vaelor | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 3 → 3.5; sustained 16 (2 × Spear); nova none; dmg 16

```
Cinderhold Vaelor

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+3
MOD
SAVE
CON
16
+3
+5
CHA
15
+2
+2

Skills Athletics +6, Perception +3

Vulnerabilities Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Guarded Stance. While Vaelor isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Vaelor makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 8 (1d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Vaelor can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Vaelor misses it with a melee attack roll. Response: Vaelor makes one Spear attack against that creature.

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
[route] defender type=Humanoid mechanics=none — skirmisher: ✓ ("a tiefling duelist who hates fire and ta") | skirmisher -> defender: the concept's VERB outranks the noun (key "duelist", class verb) | defender: key "duelist" (class verb)
[concept] signature elements: disciplined shield-and-riposte defense [behavior] | fiery blade that punishes overreach [object] | hatred and vulnerability to fire [body]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 65 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "Vaelor plants his shield and invites a foe to overreach, ready to answer with a fiery riposte. He braces in a disciplined guard, and the first enemy who tries to slip past or strike at him from within reach finds the infernal edge waiting as his blade snaps out in precise punishment." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — riposte (duelist)
[reskin] value check: "Infernal Riposte" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Infernal Riposte" ("A creature within reach of Vaelor misses him with a melee attack roll, and his i [verb: duelist:concept, riposte:idea]")
[reskin] signature idea (trait): "The infernal fire in Vaelor's veins recoils from true flame: when he is burned, the heat licks back along the wound, forcing him to grit his teeth and answer with fiercer, less careful strikes until the pain fades." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — guarded-stance (duelist)
[reskin] signature bound by force: trait — "guarded-stance" matches duelist in the user's words; the model's none is overruled
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: duelist:concept]")
[reskin] print canon alignment: Neutral Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Rapier" -> "Spear" — the Gladiator's own row
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---

## Grung Poison-Dancer — a homebrew with a nova

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

## Nagi the Venomwright — one marked soft

**Concept:** a serpentfolk blood-priest who prays to a serpent god

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nagi the Venomwright | 7 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity |

- bands · soft · band: reads CR 5.5 (print at 7 reads 2–9.5, n=27)
- reader · soft · multiattack-integrity: Multiattack uses "Spellcasting to cast *Ray of Sickness*", which is not a row on this sheet
- read: def 3 / off 8 → 5.5; sustained 52 (2 × Fangblade); nova none; dmg 52

```
Nagi the Venomwright

Medium Monstrosity, Neutral Evil

AC 14
Initiative +0 (10)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
11
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
18
+4
+7
MOD
SAVE
CON
15
+2
+2
CHA
13
+1
+1

Skills Perception +7, Religion +6

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Uncanny Sense. Nagi can pinpoint the location of moving creatures within 60 feet of itself.

Magic Resistance. Nagi has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Nagi makes two attacks, using Fangblade or Venom Bolt in any combination. It can replace one attack with a use of Spellcasting to cast Ray of Sickness.

Fangblade. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Venom Bolt. Ranged Attack Roll: +7, range 80/320 ft. 22 (4d8 + 4) Piercing damage.

Spellcasting. Nagi casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Cloudkill, Blight

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Nagi gains 13 (3d8) Temporary Hit Points.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("blood-priest who prays to a serpent god") | caster-warpriest: key "prays" (class verb)
[concept] signature elements: bloodletting prayers that empower venom [behavior] | venomous bite and blade [body] | aura of consecrated poison [aura]
[reskin] signature idea (action): "Nagi slices open its own scales with the fangblade and sprays the welling blood in a hissing, venomous prayer over every enemy it can see. The prayer clings to their wounds, so that each time Nagi strikes any of them, that enemy's veins burn with the god's poison." [action/always/condition] — menu: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Venomous Prayer" EV 6.6 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Venomous Prayer" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Nagi's blood never dries. Whenever a foe wounds it in melee, the serpent god answers by putting that same venomous bite into Nagi's next strike against the attacker. It grows more eager as the blood-priest bleeds, shedding its own life to make the god's venom sharper." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury, uncanny-sense (bloodied, blood)
[reskin] signature miss: trait — "Nagi's blood never dries. Whenever a foe wounds it in melee, the serpent god answers by putting that same venomous bite into Nagi's next strike against the attacker. It grows more eager as the blood-priest bleeds, shedding its own life to make the god's venom sharper." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, uncanny-sense)
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("exact concept match [verb: blood:concept]")
```


---

## Hushwing — bands soft

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

## Sable Nefret — bands soft

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

## Usharra the Shellbound — in the run

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Usharra the Shellbound | 3 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Gauntlet); nova none; dmg 24

```
Usharra the Shellbound

Medium Humanoid, Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +5, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Usharra can hold its breath for 1 hour.

Actions

Multiattack. Usharra makes two attacks, using Gauntlet or Stone in any combination.

Gauntlet. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Stone. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Shell Defense. Usharra withdraws into its armored shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | fell to defender's plain line | defender: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into shell for defense [behavior] | iron-reinforced shell [body] | guardian of a narrow pass [behavior]
[reskin] signature idea (action): "When Usharra plants itself and pulls its limbs in, it becomes a sealed iron ball of a creature — attacks that miss it clang off and the attacker's own momentum drags them off balance, letting Usharra lash back out with a gauntlet before sealing up again. It can only do this while it stays in place, and the moment it chooses to move or chase, the shell opens and the protection is gone." [reaction/on_being_hit/defense] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Sealing Shell" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("The idea's central verb is 'sealing' — Usharra plants itself and pulls its limbs [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "Usharra's shell is banded with scavenged iron, so anyone who strikes it in melee and fails to hurt it feels the blow rebound through their own arm, numbing it. The harder they try to crack the shell, the more their own weapon turns against them." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Vareth Stormguard — in the run

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Stormguard | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Vareth Stormguard

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Greatsword or Heavy Crossbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 4 (1d8) Radiant damage.

Heavy Crossbow. Ranged Attack Roll: +7, range 100/400 ft. 22 (4d8 + 4) Piercing damage.

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
[route] defender type=Humanoid mechanics=breath — defender: ✓ ("a blue dragonborn knight") | defender: key "knight" (class verb)
[concept] signature elements: shield wall hold [behavior] | draconic lightning breath [body] | knight's sword and shield [object]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Longsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Javelin" -> "Heavy Crossbow" — the Knight's own ranged row
```


---

## Voxmaw — in the run

**Concept:** a kenku mimic who copies voices and steals

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Voxmaw | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Stolen Blade); nova none; dmg 14

```
Voxmaw

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands Common but can't speak

CR 2 (XP 450; PB +2)

Traits

Mimicry. Voxmaw can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Crowdstep. Voxmaw ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Voxmaw makes two attacks, using Stolen Blade or Hurled Blade in any combination. It can replace one attack with a use of Siren Whisper.

Stolen Blade. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Hurled Blade. Ranged Attack Roll: +5, range 20/60 ft. 7 (1d8 + 3) Piercing damage.

Siren Whisper. Wisdom Saving Throw: DC 13, one creature within 30 feet that can see or hear Voxmaw. Failure: The target has the Charmed condition until the start of Voxmaw's next turn, and while Charmed this way, it must move toward Voxmaw by the safest available route on its turn.

Bonus Actions

Cunning Action. Voxmaw takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("copies voices and steals") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: voice mimicry to lure prey [behavior] | shadowy ambush from hiding [behavior] | stolen trinkets and coins [object]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Voxmaw steals a voice from someone nearby and throws it across the battlefield, making the party's own companion seem to call for help from a shadowed alley or doorway. Anyone who hears it feels an instinctive pull to investigate, stepping toward the sound and away from their guard. The voice can be anyone Voxmaw has heard speak recently, including a party member, and the effect is strongest when " [action/save/movement] — menu: gaze-single, snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — disarm (steal)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into disarm
[reskin] value check: "Stolen Voice" EV 0 vs floor 3.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stolen Voice" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Luring Presence" EV 3.9 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Voxmaw's pockets and belt are heavy with stolen trinkets, coins, and personal effects taken from past victims. When it flees or is badly hurt, it scatters these shiny keepsakes behind it; anyone chasing must choose between stopping to snatch the valuables or keeping pursuit, and greedy pursuers may find their attention snagged by the glitter." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Voxmaw's pockets and belt are heavy with stolen trinkets, coins, and personal effects taken from past victims. When it flees or is badly hurt, it scatters these shiny keepsakes behind it; anyone chasing must choose between stopping to snatch the valuables or keeping pursuit, and greedy pursuers may find their attention snagged by the glitter." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Coralmarshal Othyn — in the run

**Concept:** a triton tide-caller who guards the reef with a trident

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coralmarshal Othyn | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Trident); nova none; dmg 42

```
Coralmarshal Othyn

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+6
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses darkvision 60 ft., tremorsense 10 ft.; Passive Perception 14

Languages Aquan, Common

CR 5 (XP 1,800; PB +3)

Traits

Bound. Coralmarshal is bound to its resting place. It can't willingly move more than 120 feet from its resting place, and it always knows the direction and distance to its resting place.

Amphibious. Coralmarshal can breathe air and water.

Actions

Multiattack. Coralmarshal makes two Trident attacks.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 21 (4d8 + 3) Piercing damage, and the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Prone condition.

Brine Surge. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Piercing damage.

Bonus Actions

Coral Command (2/Day). Each ally within 30 feet of Coralmarshal gains 9 (2d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | skirmisher-hurler: ✓ ("with a trident") | skirmisher-hurler -> defender: the concept's VERB outranks the noun (key "guards the", class verb) | defender: key "guards the" (class verb)
[concept] signature elements: tridents wielded as both weapon and focus [object] | commands the tide and reef to block passage [behavior] | brine-saturated body that resists and channels the sea [body]
[reskin] signature idea (action): "Coralmarshal Othyn commands the tide to surge outward and inward across his reach. The first surge shoves anyone nearby away from him, and the returning surge drags anyone within a wider distance back into his immediate reach. This repositioning leaves them clustered at the exact chokepoint he guards." [action/always/movement] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — obstacle-pull (tide)
[reskin] value check: "Ebbtide Grasp" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Ebbtide Grasp" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Othyn's body is saturated with saltwater, letting him channel the sea through his trident. While he is in water, his trident strikes carry the reef's crushing pressure, battering a struck enemy so that its footing and breath are stolen." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature miss: trait — "Othyn's body is saturated with saltwater, letting him channel the sea through his trident. While he is in water, his trident strikes carry the reef's crushing pressure, battering a struck enemy so that its footing and breath are stolen." [trait/always/condition] — the model found no template that holds it (offered: bound, guarded-stance)
[reskin] signature template (trait): bound -> Traits/"Bound" ("exact concept match [verb: guards the:concept]")
```


---

## Hollow Piper — in the run

**Concept:** a satyr piper who dances travellers into the hills

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Piper | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 28 (2 × Thornpipe); nova none; dmg 28

```
Hollow Piper

Medium Fey, Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Sylvan

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The hollow piper has Advantage on saving throws against spells and other magical effects.

Fey Sidestep. The hollow piper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The hollow piper makes two attacks, using Thornpipe or Reed Dart in any combination.

Thornpipe. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Psychic damage.

Reed Dart. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Psychic damage.

Bonus Actions

Fleet Agility. The hollow piper takes the Dash or Disengage action.

Whirling Reel. The hollow piper takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher type=Fey mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | skirmisher: ✓ ("a satyr piper who dances travellers into") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: piping travellers into the hills [behavior] | thornwood pipes [object] | fey dance [aura]
[reskin] signature idea (action): "The piper pipes a lilting reel that grabs the hearing of its chosen mark and any others nearby, holding their attention like a hook in the ear. So long as the piper keeps playing and dancing away, they feel an irresistible pull to follow it, stumbling toward it no matter what else is happening, even into obvious danger. The reel breaks only if the piper's music is cut off or the listener is jolted" [action/always/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (dance)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Whirling Reel" EV 6.9 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Whirling Reel" ("the concept's own verb is dance, and dancing travelers into the hills is an evas [verb: dance:concept]")
[reskin] signature idea (trait): "The piper's thornwood pipes bite with a splintery fey edge, and anyone the piper strikes or who touches it feels the thorn lingering in their mind, taking extra harm whenever they try to shake off the pipers influence or close the distance to flee. The more they resist the …, the more it hurts." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The piper's thornwood pipes bite with a splintery fey edge, and anyone the piper strikes or who touches it feels the thorn lingering in their mind, taking extra harm whenever they try to shake off the pipers influence or close the distance to flee. The more they resist the …, the more it hurts." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
```


---

## Windscout — in the run

**Concept:** an aarakocra windscout with a javelin

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Windscout | 2 | skirmisher-3-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 3 → 1.75; sustained 12 (2 × Javelin); nova Skydive 11; dmg 15

```
Windscout

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 38 (7d8 + 7)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages Auran, Common

CR 2 (XP 450; PB +2)

Traits

Flyby. Windscout doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. Windscout makes two Javelin attacks.

Talons. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Slashing damage. If Windscout flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Javelin. Ranged Attack Roll: +5, range 30/120 ft. 6 (1d6 + 3) Piercing damage, and the target's Speed is reduced by 10 feet until the start of Windscout's next turn.

Skydive (Recharge 5-6). Windscout flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 12. Failure: 11 (2d10) Bludgeoning damage, and the target has the Prone condition.

Hurled Javelin. Windscout hurls a javelin. Ranged Attack Roll: +5, range 30/120 ft. 6 (1d6 + 3) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Windscout spends 5 feet of movement in that space to recover it, Windscout's Speed is halved and it can't use this action.

Bonus Actions

Aerial Agility. Windscout takes the Dash or Disengage action.

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
[route] skirmisher-winged type=Humanoid mechanics=thrown-weapon — skirmisher-winged: ✓ ("aarakocra windscout") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] signature elements: diving javelin throw [behavior] | aarakocra windscout with javelins [object] | attacks on the wing with Flyby [behavior]
[reskin] nova capped: "Diving Attack" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The windscout hurls a javelin specially rigged to bite and drag: on a solid hit the shaft punches through the target's gear and lodges there, trailing a length of cord. The windscout can then snap the cord taut at any later moment, yanking the enemy off balance and robbing them of their footing, or let the line sing in the wind so the stuck weapon keeps tugging and slowing the victim until they sp" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark (+ shelf: condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — throw-retrieve (javelin)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into throw-retrieve
[reskin] value check: "Hurled Javelin" EV 4 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: throw-retrieve -> Actions/"Hurled Javelin" ("The concept's own verb is javelin — hurling a javelin at range [verb: javelin:concept]")
[reskin] signature idea (trait): "A loose weapon, shield, or bundle of gear that the windscout snatches in flight stays lashed to its harness by a quick-cinched tether. It can then release the prize from height onto a chosen spot below, turning whatever it stole into an unerring falling missile that smashes down on the target." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "A loose weapon, shield, or bundle of gear that the windscout snatches in flight stays lashed to its harness by a quick-cinched tether. It can then release the prize from height onto a chosen spot below, turning whatever it stole into an unerring falling missile that smashes down on the target." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] chassis nova: "Skydive (Recharge 5-6)" — the skirmisher-3-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Thistlewick — in the run

**Concept:** a harengon courier who bounds over the hedgerows

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thistlewick | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Kick); nova none; dmg 12

```
Thistlewick

Small Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 31 (7d6 + 7)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
8
-1
-1
MOD
SAVE
DEX
14
+2
+4
WIS
12
+1
+1
MOD
SAVE
CON
12
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +4

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Sylvan

CR 1 (XP 200; PB +2)

Traits

Standing Leap. Thistlewick's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.

Hedgecunning. Thistlewick ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Thistlewick makes two attacks, using Kick or Sling in any combination.

Kick. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Bludgeoning damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 5 (1d6 + 2) Bludgeoning damage.

Bonus Actions

Fleet Agility. Thistlewick takes the Dash or Disengage action.

Bramble Chase (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Thistlewick moves up to half its Speed, and it makes one Kick attack.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("bounds over the hedgerows") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: bounds over the hedgerows [behavior] | courier satchel of messages [object] | harengon leaping legs [body]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Thistlewick springs off a wall, cart, or thick trunk, tumbling through the air to land in a space it can see within its long jump distance, even if that path carries it directly over a foe. Foes nearby are caught off guard by the vault; the first one it passes over loses its footing for a moment as it clips past. Thistlewick must have a solid object or creature beside it to kick off from, and can " [bonus_action/always/movement] — menu: rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "Thistlewick springs off a wall, cart, or thick trunk, tumbling through the air to land in a space it can see within its long jump distance, even if that path carries it directly over a foe. Foes nearby are caught off guard by the vault; the first one it passes over loses its footing for a moment as it clips past. Thistlewick must have a solid object or creature beside it to kick off from, and can " [bonus_action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Rampage (1/Day)" EV 4.2 vs floor 0.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thistlewick's courier satchel is stuffed with misdelivered letters, fey trinkets, and noisemakers that spill out when it is struck. Any creature that hits it in melee must immediately deal with an exploding packet of glitter and clattering junk, leaving that foe briefly blinded and spluttering — but not Thistlewick. The satchel empties after a few such accidents and must be restocked during a rest" [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---

## Serael the Dawnward — in the run

**Concept:** an aasimar lightbringer with a mace

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Serael the Dawnward | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Mace); nova none; dmg 44

```
Serael the Dawnward

Medium Humanoid, Lawful Good

AC 16
Initiative +2 (12)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
11
+0
+0
MOD
SAVE
CON
15
+2
+5
CHA
15
+2
+5

Skills Athletics +7, Persuasion +5

Resistances Necrotic, Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 10

Languages Celestial, Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Serael, Serael and its allies have Advantage on attack rolls and saving throws, provided Serael doesn't have the Incapacitated condition.

Actions

Multiattack. Serael makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Serael's next turn.

Weapon of Command. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Binding Mark. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of Serael's next turn, the target has Disadvantage on attack rolls against creatures other than Serael.

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
[route] defender-leader type=Celestial mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("aasimar lightbringer") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: commanding aura that steadies allies [aura] | radiant mace strikes [object] | parries in defense of companions [behavior]
[reskin] signature idea (action): "Serael's mace flares with gathered dawn light as it comes down; the blow itself, not a spell, is the light. When that strike lands, the radiance clings to the target so that anyone Serael is defending sees the foe lit up and can fight it freely, while the foe's own vision swims in glare. The mark lasts only briefly, until the next time Serael raises the weapon to strike again." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: swallow, throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] value check: "Binding Mark" EV 6.3 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Binding Mark" ("the light marks the struck foe so allies of Serael can fight it freely (Advantag [verb: mark:idea]")
[reskin] signature idea (trait): "Serael's mace is not merely blessed steel — the light of dawn lives inside it, so every blow it lands scours with radiance as surely as it crushes. Any creature struck by the mace feels that searing light, and the flash leaves the target's next swing wild as it blinks away the afterimage." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
```


---

## Mournhold Grieve — in the run

**Concept:** a goliath stone-herder who wrestles avalanches

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mournhold Grieve | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Boulderfist); nova none; dmg 54

```
Mournhold Grieve

Huge Humanoid, Neutral

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

Speed 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +3

Senses tremorsense 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

False Appearance. While the mournhold grieve remains motionless, it is indistinguishable from an ordinary object.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the mournhold grieve extra movement, and the mournhold grieve can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The mournhold grieve makes two attacks, using Boulderfist or Stonecast in any combination.

Boulderfist. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage.

Stonecast. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the mournhold grieve moves up to half its Speed without provoking Opportunity Attacks, and it makes one Boulderfist attack.

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
[route] brute type=Giant mechanics=grapple — brute-grappler: ✓ ("wrestles avalanches") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: wrestling avalanches [behavior] | body of mountain stone [body] | hurling boulders [object]
[reskin] signature idea (action): "The grieve tackles a Large or smaller creature, driving it to the ground and pinning it under its massive weight. While pinned, the target is restrained beneath rubble and stone, taking crushing damage at the start of each of the grieve's turns. The grieve cannot use its stonecast against any creature other than the one it is pinning, and the pin ends if the grieve moves or is forced to release it" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The grieve's body is living mountain stone; whenever a creature strikes it in melee, chips of jagged rock explode outward, cutting and staggering the attacker. The harder they hit, the more shrapnel they eat." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] signature miss: trait — "The grieve's body is living mountain stone; whenever a creature strikes it in melee, chips of jagged rock explode outward, cutting and staggering the attacker. The harder they hit, the more shrapnel they eat." [trait/on_being_hit/damage] — the model found no template that holds it (offered: false-appearance)
[reskin] signature template (trait): false-appearance -> Traits/"False Appearance" ("exact concept match [verb: stone:concept]")
```


---

## Sriella Windstride — in the run

**Concept:** a centaur outrider with a longbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sriella Windstride | 5 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 24 (2 × Longbow); nova Hoof Charge 28; dmg 35

```
Sriella Windstride

Large Fey, Neutral

AC 16
Initiative +3 (13)

HP 90 (12d10 + 24)

Speed 50 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Great Weapon Master. When Sriella hits a creature with its Longbow, the attack deals an extra 3 damage.

Steppe Stride. Sriella ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sriella makes two Longbow attacks. It can replace one attack with a use of Curb Stomp.

Saber. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage. If Sriella moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Hoof Charge (Recharge 5-6). Sriella moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 13. Failure: 28 (8d6) Bludgeoning damage, and the target has the Prone condition.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 12 (2d8 + 3) Piercing damage.

Curb Stomp. Strength Saving Throw: DC 13, one creature within 30 feet that is Prone. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Mounted Agility. Sriella takes the Dash or Disengage action.

Charge. Sriella moves up to half its Speed straight toward an enemy it can see.

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
[route] skirmisher-mounted type=Monstrosity mechanics=none — skirmisher-mounted: ✓ ("a centaur outrider") | skirmisher-mounted: key "outrider" (class body)
[concept] signature elements: longbow volleys from the move [object] | ride-down skirmish and wheel away [behavior] | nomadic centaur outrider [body]
[reskin] nova capped: "Trampling Rush" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] signature idea (action): "Sriella looses a rapid volley of arrows at up to three different creatures it can see, each shot aimed independently. If it does not move at all on its turn before firing, the volley can target only a single creature but every arrow strikes with uncanny precision, ignoring cover and concealment. After the volley, Sriella can immediately move up to half its speed away from the targets without provo" [action/always/damage] — menu: swallow, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "Sriella looses a rapid volley of arrows at up to three different creatures it can see, each shot aimed independently. If it does not move at all on its turn before firing, the volley can target only a single creature but every arrow strikes with uncanny precision, ignoring cover and concealment. After the volley, Sriella can immediately move up to half its speed away from the targets without provo" [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter, focus)
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.8 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When a creature tries to close to melee with Sriella, it can kick up a blinding cloud of steppe dust as it retreats, causing the pursuer to lose sight of it until the end of the pursuer's next turn. While hidden this way, Sriella's next longbow shot against that creature is especially deadly." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "When a creature tries to close to melee with Sriella, it can kick up a blinding cloud of steppe dust as it retreats, causing the pursuer to lose sight of it until the end of the pursuer's next turn. While hidden this way, Sriella's next longbow shot against that creature is especially deadly." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, false-appearance)
[reskin] chassis nova: "Hoof Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```
