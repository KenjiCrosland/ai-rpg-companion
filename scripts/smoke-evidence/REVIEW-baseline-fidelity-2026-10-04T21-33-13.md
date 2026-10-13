# Review batch — baseline-fidelity-2026-10-04T21-33-13

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, one marked soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 5/5 |
| Grenwyth the Mirebound | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Skrog the Netcaster | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Vault Sentinel | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/6 |
| Roderick the Unsparked | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Mere Behemoth | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Lint Sovereign | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 2/2 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok | soft (2) | 7/7 | 7/7 |
| Ironhorn Reliquary | 12 | 2024 | brute-11-charger | ok | SOFT: hot-offense | ok | ok | FAIL: lint:defense-restated | ok | ok | ok | FAIL (1) | 5/6 | 6/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Hobnail the Warren Tollkeeper | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Apiary Wyrm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 36 user clauses** (coverage 94%); concept share 69% (41/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- brute-11-charger / headerBody: 1



---

## Hobnail the Warren Tollkeeper — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Hobnail the Warren Tollkeeper | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

```
Hobnail the Warren Tollkeeper
Small humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

12 (+1)

	

12 (+1)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Draconic

Challenge

1/2 (100 XP)

Proficiency Bonus:

+2

Scrapfoot. Hobnail ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Hobnail takes the Dash or Disengage action.

Actions
Multiattack: Hobnail makes two Hand Crossbow attacks.
Caltrop: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: scattering caltrops to deny ground [behavior] | hand crossbow it reloads and looses on the move [object] | bag of iron caltrops [object]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] slot yields: signature — the chassis's unfilled slot "Seeded Ground" leaves; the authored rows are the composition
```


---

## Ironhorn Reliquary — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Ironhorn Reliquary | 12 | brute-11-charger | ok | SOFT: hot-offense | ok | ok | FAIL: lint:defense-restated | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 16, 4 over; the HP axis pulls the read to 13
- headerBody · fail · lint:defense-restated: Traits/Adamantine Bane: this trait only restates the Resistances/Immunities lines — the lines already carry it; replace it with a real mechanic or drop it
- read: def 10 / off 16 → 13; sustained 92 (2 × Charging Gore); nova Scalding Steam 58; dmg 100

```
Ironhorn Reliquary

Huge Construct, Unaligned

AC 16
Initiative +0 (10)

HP 210 (20d12 + 80)

Speed 50 ft.

MOD
SAVE
STR
22
+6
+10
INT
5
-3
-3
MOD
SAVE
DEX
10
+0
+0
WIS
12
+1
+1
MOD
SAVE
CON
18
+4
+8
CHA
6
-2
-2

Skills Athletics +10, Perception +5

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Adamantine Bane. The reliquary is immune to all damage from non-adamantine weapons, and it has resistance to all other damage except adamantine strikes and Force damage.

Immutable Form. The ironhorn reliquary can't shape-shift.

Magic Resistance. The ironhorn reliquary has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ironhorn reliquary makes two attacks, using Charging Gore, Iron Horns or Stomping Hooves in any combination.

Charging Gore. Melee Attack Roll: +10, reach 10 ft. 46 (9d8 + 6) Piercing damage, and the target has the Prone condition.

Iron Horns. Melee Attack Roll: +10 (with Advantage if the target has the Prone condition), reach 5 ft. 46 (9d8 + 6) Piercing damage.

Stomping Hooves. Melee Attack Roll: +10, reach 5 ft. 46 (9d8 + 6) Bludgeoning damage.

Scalding Steam (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 30-foot Cone. Failure: 58 (13d8) Fire damage. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

Reactions

Groundshaker Stomp. Trigger: A creature the reliquary can see ends its movement within 10 feet of it while the reliquary is standing. Response: The reliquary stomps, and Strength Saving Throw: DC 18, each creature within 10 feet. Failure: The target is knocked Prone.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("A huge iron golem shaped like a bull") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: iron golem shaped like a bull [body] | charges and gores [behavior] | scalding steam from nostrils [behavior]
[reskin] slot yields: signature — the chassis's "Scalding Bellows" leaves; the authored row holds the slot
[reskin] chassis nova: "Scalding Steam (Recharge 5-6)" — the brute-11-charger's own nova row; geometry, cap and rider lines below are its edits
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Tail Swipe); nova none; dmg 44

```
Meshrin
Large humanoid, neutral
Armor Class

14 (half plate)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

6 (-2)

Skills: 

Athletics +7, Perception +3

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Weapon Mastery. Meshrin has mastered a fighting style, granting extra damage with weapon attacks.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Claw, or Bite.
Greatsword: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Claw: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("Wields a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword fighting styles [object] | long tail swipe [body] | trained retreat when bloodied [behavior]
[reskin] slot yields: signature — the chassis's "Crushing Tail" leaves; the authored row holds the slot
```


---

## Grenwyth the Mirebound — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grenwyth the Mirebound | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Verdigris Claw); nova none; dmg 26

```
Grenwyth the Mirebound

Medium Humanoid, Neutral Evil

AC 15
Initiative +2 (12)

HP 65 (10d8 + 20)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+4
MOD
SAVE
CON
14
+2
+2
CHA
18
+4
+6

Skills Perception +4, Deception +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Grenwyth makes two attacks, using Verdigris Claw or Withering Ray in any combination. It can replace one attack with a use of (A) Sapping Rot or (B) Spellcasting to cast Ray of Sickness.

Verdigris Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Withering Ray. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Necrotic damage.

Sapping Rot. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Grenwyth casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Ray of Sickness, Fog Cloud
- 1/Day Each: Bestow Curse

Verdigris Drain. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 14 (4d6) Piercing damage, and Grenwyth regains Hit Points equal to half the damage dealt. Success: Half damage only.

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
[route] nothing routed — the call failed; random artillery plain line ships
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: curses that steal actions and weaken foes [behavior] | sickly green ray of bog essence [body] | bog mire that snares and slows [aura]
[reskin] signature idea (action): "Grenwyth points a finger and a sickly green ray of bog essence arcs out, latching onto a foe she has already cursed or poisoned and draining the vigor from their limbs. For a short while afterward, that victim's movements are sluggish and labored, as if the mire itself were sucking at their boots — the more weakened they already are, the deeper the bog-essence drinks. She can only call up this ray" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Mire Latch" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Mire Latch" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 10.9 vs floor 7.3 (one attack of 2) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bog witch's body is steeped in the same rot she peddles: any foe who strikes her in melee feels the mire cling and fester at the point of contact, leaving their weapon arm heavy and aching for a moment. This clinging blight never spreads to anyone who keeps their distance, and it fades as quickly as it comes on." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature miss: trait — "The bog witch's body is steeped in the same rot she peddles: any foe who strikes her in melee feels the mire cling and fester at the point of contact, leaving their weapon arm heavy and aching for a moment. This clinging blight never spreads to anyone who keeps their distance, and it fades as quickly as it comes on." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk)
```


---

## Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

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
Loathsome Limbs. If the troll ends any turn with half of its hit points or fewer and took 15 or more slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a troll limb. The limb acts immediately after the troll's turn. The troll has 1 level of exhaustion for each missing limb, and it grows replacement limbs the next time it regains hit points.
Charge. As a bonus action, the troll moves up to half its speed straight toward an enemy it can see.

Actions
Multiattack: The troll makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
```

**Engine trace**

```
[route] brute-regenerator type=Monstrosity mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] cr from print: 5 — a print creature heads the words and the user set none
[concept] signature elements: endless regeneration from all but fire and acid [body] | vicious claws and bite that tear and hold prey [body] | relentless predatory hunger [behavior]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon name: "Grubthallow" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Vault Sentinel — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vault Sentinel | 4 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 52 is 31% under the card's 75
- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Slam); nova none; dmg 26

```
Vault Sentinel

Medium Construct, Neutral

AC 15
Initiative +4 (14)

HP 52 (8d8 + 16)

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
12
+1
+1

Skills Perception +3, Stealth +8

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Shifting Disguise. While the vault sentinel remains motionless, it is indistinguishable from an ordinary object.

Assassinate. During the first round of each combat, the vault sentinel has Advantage on attack rolls against any creature that hasn't taken a turn. If the vault sentinel hits a creature during that round, the target takes an extra 7 (2d6) Bludgeoning damage.

Unseen Motion. While no creature has line of sight to the vault sentinel, the vault sentinel can move; it otherwise remains motionless.

Actions

Multiattack. The vault sentinel makes two Slam attacks. It can replace one attack with a use of Creeping Dread.

Slam. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Creeping Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the vault sentinel's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Piercing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the vault sentinel takes the Hide action.

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
[route] lurker type=Construct mechanics=none — lurker: ✓ ("only moves when no one is looking") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: moves only when unobserved [behavior] | stone body and ambush strikes [body] | returns to perfect stillness [behavior]
[reskin] signature idea (action): "When it strikes a creature that hasn't yet noticed it in this fight, it drives the blow to leave the victim dazed, their senses scrambled so they can't clearly track it. While dazed, the target is easier prey: the sentinel's next attack against them lands with crushing force, and the target can't warn allies of its position." [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — gaze-single (look)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into gaze-single
[reskin] value check: "Unwatched Gaze" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Unwatched Gaze" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 2) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its stone body drinks the light around it: any creature that looks directly at the sentinel finds its gaze sliding off, and for a moment the sentinel seems to flicker at the edge of vision. Creatures that try to target it from a distance must first overcome a nagging doubt that it's really there." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): false-appearance -> Traits/"Shifting Disguise" ("its gaze slides off and distant creatures doubt it is really there — while motio [verb: stone:concept]")
```


---

## Roderick the Unsparked — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Roderick the Unsparked | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Thump); nova none; dmg 22

```
Roderick the Unsparked
Medium humanoid, chaotic neutral
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

	

14 (+2)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +4, Perception +3

Saving Throws: 

INT +4, WIS +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common and any three languages

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Actions
Multiattack: Roderick makes two Staff Thump attacks.
Staff Thump: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("he just hits people with his staff") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: two-handed staff beatdown [object] | failed wizard's delusion [behavior] | stubborn refusal to flee [behavior]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 14, WIS 12, CHA 11 — the Mage's, INT fitted to +4
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "Roderick plants his feet, hauls the staff back over his head with both hands, and brings it down on the same foe he has been pestering all fight — the kind of wild haymaker that only lands because he refuses to stop. It rattles the target badly enough that for a moment they're too shaken to swing back cleanly at him. He can only wind up like this now and then before he has to catch his breath." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, reel, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature miss: action — "Roderick plants his feet, hauls the staff back over his head with both hands, and brings it down on the same foe he has been pestering all fight — the kind of wild haymaker that only lands because he refuses to stop. It rattles the target badly enough that for a moment they're too shaken to swing back cleanly at him. He can only wind up like this now and then before he has to catch his breath." [rider/on_hit/condition] — the model found no template that holds it (offered: bolt-restrain, bolt-drag, bolt-mark, reel, spew, obstacle-pull, pacify, wind-up)
[reskin] value check: "Sundering Shove" EV 1.5 vs floor 5.7 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The moment Roderick is hurt badly enough to believe he's losing, he quits pretending to be a wizard entirely: he drops into a two-fisted grip and swings harder and faster than his frame should allow, though his guard goes to pieces while he does it. He keeps this up for the rest of the fight, swinging until something breaks." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "The moment Roderick is hurt badly enough to believe he's losing, he quits pretending to be a wizard entirely: he drops into a two-fisted grip and swings harder and faster than his frame should allow, though his guard goes to pieces while he does it. He keeps this up for the rest of the fight, swinging until something breaks." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, false-appearance)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Lint Sovereign — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Lint Sovereign | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Smothering Press); nova none; dmg 24

```
Lint Sovereign

Medium Construct, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
4
-3
-3
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
+3
CHA
4
-3
-3

Skills Athletics +5, Perception +2

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 12

Languages Sock.

CR 3 (XP 700; PB +2)

Actions

Multiattack. The lint sovereign makes two Smothering Press attacks.

Smothering Press. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13).

Bonus Actions

Smother. The lint sovereign smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the lint sovereign, and takes 4 (1d8) Bludgeoning damage at the start of each of the lint sovereign's turns. The lint sovereign can have only one creature smothered at a time. If the lint sovereign takes 9 damage or more in a single turn from the smothered creature, the lint sovereign must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the lint sovereign. If the lint sovereign dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Construct mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: smothering engulf [behavior] | laundry pile body [body] | sock-language speech
[reskin] slot yields: signature — the chassis's unfilled slot "Wretched Stench" leaves; the authored rows are the composition
```


---

## Grandmother Ash — bands soft

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- gates · soft · rider-no-save: Actions/Rotting Nails: a Poisoned rider on every hit with no save
- gates · soft · rider-no-save: Actions/Ash Cloud: a Blinded rider on every hit with no save
- read: def 4 / off 7 → 5.5; sustained 48 (3 × Ash Cloud); nova none; dmg 48

```
Grandmother Ash
Medium fey, neutral
Armor Class

14 (natural armor)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

15 (+2)

	

14 (+2)

	

15 (+2)

	

16 (+3)

Skills: 

Perception +5, Deception +6

Saving Throws: 

WIS +5, CHA +6

Damage Vulnerabilities: 

fire

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Burned Forest Dweller. Grandmother inhabits the burned forest; the forest is her home and hunting ground.
Fire Bane. When she takes fire damage, she takes 7 (2d6) extra fire damage and shrieks.

Actions
Multiattack: Grandmother makes three attacks, using Rotting Nails or Ash Cloud. It can replace one attack with a use of Ash Choke.
Rotting Nails: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) necrotic damage, and the target is poisoned until the end of its next turn.
Ash Cloud: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) poison damage, and the target is blinded until the end of its next turn.
Ash Choke: One creature within 60 feet must make a DC 14 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, and is poisoned until the end of its next turn on a failed save.
Spellcasting: The grandmother casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

At will: fog cloud, misty step
1/day each: bestow curse, cloudkill
Choking Ash: Each creature within 15 feet of it must make a DC 14 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=aura — caster-binder: ✓ ("She hates fire and takes extra damage fr") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: turning into a cloud of ash to choke the breath from lungs [behavior] | rot carried by long black nails [body] | three crows that scream warning of intruders [behavior]
[reskin] slot yields: signature — the chassis's "Crows' Warning" leaves; the authored row holds the slot
```
