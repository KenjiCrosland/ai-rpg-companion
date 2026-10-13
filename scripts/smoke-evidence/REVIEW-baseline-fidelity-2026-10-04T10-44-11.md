# Review batch — baseline-fidelity-2026-10-04T10-44-11

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Knife Ball | 2 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Mire Grudge | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vasarch the Hollowed | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Mogwurt Netcaster | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | clean |
| Stillstone Gargoyle | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |
| Oaksworn Remembrancer | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Siltclaw Snapper | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | soft (1) |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lintbound Smotherer | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Ore-Road Warden | 12 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | soft (1) |
| Grubbin Sootscale | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | clean |
| Apiary Wyrm | 10 | 2024 | dragon-8 | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | soft (1) |

**Fails by seat and gate:**
- none



---

## Grubbin Sootscale — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Grubbin Sootscale | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Dagger); nova none; dmg 10

```
Grubbin Sootscale
Small humanoid, unaligned
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft.

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

Trap Runner. Grubbin ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Grubbin takes the Dash or Disengage action.

Actions
Multiattack: Grubbin makes two attacks, using Dagger or Hand Crossbow.
Dagger: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=snare — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: bag of caltrops scattered to control the battlefield [object] | hand crossbow fired from behind its own spikes [object] | cowardly cleverness — traps and retreat over fair fights [behavior]
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] signature idea (action): "While the field of spikes it has scattered is still in place, Grubbin knows every safe step through its own trap-lattice and can flick a hidden tripwire at a foe within reach of the caltrops, yanking the prey off balance so its next bolt lands cleanly. The trick only works on a target that is already standing in Grubbin's scattered spikes, and once it has been sprung on that patch, the wire is spe" [rider/on_hit/condition] — menu: contagion, pounce (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] signature miss: action — "While the field of spikes it has scattered is still in place, Grubbin knows every safe step through its own trap-lattice and can flick a hidden tripwire at a foe within reach of the caltrops, yanking the prey off balance so its next bolt lands cleanly. The trick only works on a target that is already standing in Grubbin's scattered spikes, and once it has been sprung on that patch, the wire is spe" [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, pounce, snare-bolt, feint-slip)
[reskin] value check: "Horrid Display (2/Day)" EV 4.4 vs floor 6.8 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
```


---

## Ore-Road Warden — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ore-Road Warden | 12 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 14 → 12; sustained 80 (2 × Horn Gore); nova Shockwave 42; dmg 81

```
Ore-Road Warden

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Slaghide Retort. A creature that touches the warden or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The warden can't shape-shift.

Magic Resistance. The warden has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The warden makes two Horn Gore attacks.

Horn Gore. Melee Attack Roll: +10, reach 10 ft. 24 (4d8 + 6) Piercing damage plus 16 (3d10) Fire damage. If the target is a Large or smaller creature and the warden moved 20+ feet straight toward it immediately before the hit, the target takes an extra 11 (2d10) Piercing damage and has the Prone condition.

Shockwave (Recharge 5-6). Wisdom Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the warden. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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
[concept] signature elements: steam-breathing iron bull [body] | thunderous charge and gore [behavior] | immunity to all but adamantine [body]
[reskin] signature idea (action): "The iron bull lowers its head and exhales a rolling cloud of scalding steam from its nostrils that washes over everything in front of it. The cloud clings and lingers, and while it hangs in the air the bull uses the cover to build distance for its next charge, and anyone caught inside it stays scalded and half-blind until they stumble clear." [action/save/damage] — menu: leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, hook-rider)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Heat bleeds constantly from the warden's iron hide and hooves. Anything that lands a telling blow on it in melee is punished by a hiss of superheated steam, and the ground it … stays shimmering-hot, so a foe who keeps close and keeps striking gets cooked for their trouble." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Slaghide Retort" ("Anything that hits it with a melee attack while within 5 feet is punished by hea [verb: scald:concept, iron:concept, heat:idea, hot:idea]")
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok |

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

Actions
Multiattack: The meshrin makes two attacks, using Greatsword or Tail Sweep. It can replace one attack with a use of Trenching Tail Sweep.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
Tail Sweep: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 26 (5d8 + 4) bludgeoning damage.
Trenching Tail Sweep: Strength Saving Throw: DC 15, one creature within 30 feet. On a failed save, The target is pulled up to 25 feet straight toward the meshrin by a wall of mud, gravel, and broken water and has the Grappled condition (escape DC 15).
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword held in a disciplined guard [object] | tail sweep that clears space [behavior] | claws and bite for anything that gets inside [body]
[reskin] signature idea (action): "The meshrin drives its tail through the ground in a wide arc, hurling a wall of mud, gravel, and broken water at everything surrounding it. The blast clears a ring around the Meshrin, shoving skirmishers off their feet and dragging them where they stood; anyone who stands back up does so somewhere the blade can reach. It can only be done once before the Meshrin must reset its stance, and it does n" [action/always/movement] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] value check: "Trenching Tail Sweep" EV 13.8 vs floor 13 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Trenching Tail Sweep" ("the tail drives through the ground and drags creatures, shoving them off their f [verb: claw:concept, drag:idea]")
[reskin] signature idea (trait): "As long as an ally it can see still breathes, the meshrin refuses to give ground; it cannot be made to abandon its post, and any attacker that tries to force it back finds the meshrin already planted and waiting. The moment its last ally falls, that discipline breaks and it becomes a much more ordinary fighter." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Mire Grudge — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Mire Grudge | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Mire Grudge

Medium Fey, Neutral

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

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Fen Slip. Difficult Terrain composed of bog, marsh, or fen doesn't cost the mire grudge extra movement, and the mire grudge can move across bog, marsh, or fen without needing to make an ability check.

Actions

Multiattack. The mire grudge makes two attacks, using Claw or Hex Bolt in any combination. It can replace one attack with a use of Bog Rot.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Psychic damage.

Hex Bolt. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Psychic damage.

Bog Rot. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Psychic damage, and the target has the Frightened condition until the end of its next turn.

Spellcasting. The mire grudge casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

- At Will: Minor Illusion, Misty Step, Invisibility
- 1/Day Each: Bestow Curse

Spiteful Mending. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 14 (4d6) Psychic damage, and the mire grudge regains Hit Points equal to half the damage dealt. Success: Half damage only.

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
[route] caster-binder (controller) type=Fey mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: curses that steal actions [behavior] | bog-water body [body] | hexing gaze [aura]
[reskin] signature idea (action): "The mire grudge names one creature it can sense within the bog or fen and steals away its next breath of action. That creature finds its thoughts mired and heavy, and cannot take reactions or use its movement until the grudge's concentration slips or the mire reclaims the promise. The grudge may hold only one such thief's grip at a time, and must choose a new victim if it wishes to shift its atten" [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Breath Mire" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Breath Mire" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 10.9 vs floor 7.3 (one attack of 2) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The grudge's body is little more than stained fen-water held in a witch's shape. Whenever a creature strikes her in melee, the bog remembers the blow and clings to the attacker, slowing their steps and making the ground beneath them treacherous until they break free. She can slide through any muddy or marshy ground without leaving a trail, and the bog itself whispers her location to her if she is " [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature template (trait): terrain-walk -> Traits/"Fen Slip" ("she can slide through any muddy or marshy ground without leaving a trail — diffi [verb: bog:concept, marsh:idea, fen:idea, muddy:idea]")
```


---

## Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

```
Troll
Large giant, neutral
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
Loathsome Limbs. If the troll ends any turn with half of its hit points or fewer and took 15 or more slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 level of exhaustion for each missing limb, and it grows replacement limbs the next time it regains hit points.
Charge. As a bonus action, the troll moves up to half its speed straight toward an enemy it can see.

Actions
Multiattack: The troll makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
```

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] cr from print: 5 — a print creature heads the words and the user set none
[concept] signature elements: Regeneration that closes wounds every round unless stopped by fire or acid [behavior] | Ravenous, lanky, hooked-clawed giant that grapples and bites [body] | Fights to the death and keeps coming when bloodied [behavior]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon name: "Bogrender" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Grandmother Ash — a homebrew with a nova

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 6 → 6.5; sustained 42 (2 × Claws); nova Choking Breath 22; dmg 43

```
Grandmother Ash
Medium fey, neutral evil
Armor Class

12

Hit Points: 

127 (17d8 + 51)

Speed: 

5 ft., fly 60 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

16 (+3)

	

12 (+1)

	

14 (+2)

	

15 (+2)

Skills: 

Stealth +6

Saving Throws: 

DEX +6

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Heated Body. A creature that touches the grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) necrotic damage.
Incorporeal Movement. The grandmother can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the grandmother has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The grandmother makes two Claws attacks.
Claws: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage plus 9 (2d8) necrotic damage.
Choking Breath (Recharge 5-6): Each creature in a 30-foot cone must make a DC 14 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
```

**Engine trace**

```
[route] lurker-phantom type=Fey mechanics=breath — lurker-phantom: ✓ ("She can turn into a cloud of ash") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: ash cloud form [body] | choking breath attack [behavior] | three crow sentinels [behavior]
[reskin] signature idea (action): "Grandmother Ash collapses into a swirling cloud of ash and cinders that fills the lungs of every living creature in front of her. Those who breathe her in feel their chests tighten as the ash coats their airways, and for a short while their body keeps rejecting the intrusion—hacking, gasping, and struggling to act. She can only unleash this choking breath after drawing herself together, and she mu" [action/save/condition] — menu: leap, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] signature bound to the concept's verb: action — spew, blighted-ground (cloud of, breathes, rot, ash)
[reskin] value check: "Choking Breath (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Choking Breath (Recharge 5-6)" ("collapses into a swirling cloud of ash and cinders that fills the lungs of every [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "While she is not in sunlight, Grandmother Ash can dissolve into a … ash at will, drifting through the air as a shapeless haze. In this form she can slip through the smallest cracks and is nearly impossible to grasp or strike, but any flame brought near her forces her back into her solid shape, shrieking." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature bound by force: trait — "heated-body" matches burn+fire in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: burn:concept, fire:concept, flame:idea]")
```


---

## Stillstone Gargoyle — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Stillstone Gargoyle | 4 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Adhesive Hide, Bonus Actions/False Form
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Claw); nova none; dmg 26

```
Stillstone Gargoyle

Medium Construct, Neutral

AC 13
Initiative +1 (11)

HP 84 (13d8 + 26)

Speed 20 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
18
+4
+6
INT
5
-3
-3
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
+2
CHA
8
-1
-1

Skills Stealth +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Adhesive Hide. The gargoyle adheres to anything that touches it. A Huge or smaller creature adhered to the gargoyle has the Grappled condition (escape DC 14).

Actions

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the gargoyle), reach 5 ft. 26 (5d8 + 4) Slashing damage.

Stone Siphon. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 27 (6d8) Piercing damage, and the gargoyle regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The gargoyle shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Construct mechanics=none — lurker-trap: ✓ ("only moves when no one is looking") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: only moves when unobserved [behavior] | living stone body [body] | ambush predator [behavior]
[reskin] signature idea (action): "The gargoyle can slip out of sight by using its stolen moments of stillness—whenever it is hidden from every hostile creature's direct view, it may vanish and reappear at a spot it can see within a short distance, as if it had always been a piece of the scenery there. It cannot use this while anyone is looking straight at it, and it immediately becomes visible after it strikes or moves again." [action/always/movement] — menu: leap, condition-payoff, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: lure, delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] value check: "Stillness Slip (1/Day)" EV 0 vs floor 4.4 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Stillness Slip (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 20.9 vs floor 14 (one attack of 1) — added Success: Half; dice 16 → 27
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gargoyle's stone body holds a sliver of wild illusion: whenever it is hit by an attack or fails a save while motionless, it can freeze so perfectly that the attacker's follow-through finds only unyielding rock, and the next time it moves, that stored stillness lashes out as a shocking burst of jagged shards that scours the resolve of anyone nearby. The burst only happens once per fight, and on" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The gargoyle's stone body holds a sliver of wild illusion: whenever it is hit by an attack or fails a save while motionless, it can freeze so perfectly that the attacker's follow-through finds only unyielding rock, and the next time it moves, that stored stillness lashes out as a shocking burst of jagged shards that scours the resolve of anyone nearby. The burst only happens once per fight, and on" [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, terrain-walk, faultless-tracker, death-burst)
```


---

## Oaksworn Remembrancer — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Oaksworn Remembrancer | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Gnarled Staff); nova none; dmg 22

```
Oaksworn Remembrancer
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

Misty Step (3/Day). As a bonus action, the remembrancer casts misty step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction). When the remembrancer is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The remembrancer makes two Gnarled Staff attacks. It can replace one attack with a use of Curse of Reckoning or its Spellcasting to cast magic missile.
Gnarled Staff: Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 120 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
Spellcasting: The remembrancer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

At will: detect magic, light, mage armor, mage hand, prestidigitation
2/day each: fireball, invisibility
1/day each: cone of cold, fly
Curse of Reckoning: One creature within 60 feet of the remembrancer must make a DC 12 Charisma saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is cursed until the end of the remembrancer's next turn. The first time the cursed target deals damage to any creature before then, it takes 11 (2d10) piercing damage.
```

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=none — skirmisher-hurler: ✓ ("he just hits people with his staff") | skirmisher-hurler -> caster: the concept's VERB outranks the noun (key "spells", class verb) | caster: key "spells" (class verb)
[concept] signature elements: furious staff beatings [behavior] | a wizard's torn robes [body] | gnarled ironwood staff [object]
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 14, WIS 12, CHA 11 — the Mage's, INT fitted to +4
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "The remembrancer hauls back and drives his staff forward in a single two-handed lunge, shouting a syllable he no longer has the magic to finish. It bludgeons in a line, and the sheer force of the swing hurls whoever it lands on staggering backward. If he lands it on someone already wounded, the shout turns into a broken, victorious laugh." [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, reel, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Debt of Ruin" EV 8.5 vs floor 5.7 (one attack of 2) — added Success: Half; dice 7 → 11
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "His torn robes were once a wizard's and are now a fighter's banner: as the fight drags on and he takes punishment, the memory of spellwork bleeds off him in faint, harmless light, and his staff swings land with a pressure that isn't physical. Every wound he wears imprints itself on the blow that follows." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Lintbound Smotherer — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lintbound Smotherer | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Wrappings); nova none; dmg 24

```
Lintbound Smotherer

Medium Monstrosity, Unaligned

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

Senses blindsight 30 ft.; Passive Perception 12

Languages None

CR 3 (XP 700; PB +2)

Traits

Scenting Stalker. The lintbound smotherer can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The lintbound smotherer makes two Wrappings attacks. It can replace one attack with a use of Strangling Lash.

Wrappings. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Strangling Lash. Strength Saving Throw: DC 13, one creature within 30 feet that is Grappled by the lintbound smotherer. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Smother. The lintbound smotherer smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the lintbound smotherer, and takes 4 (1d8) Bludgeoning damage at the start of each of the lintbound smotherer's turns. The lintbound smotherer can have only one creature smothered at a time. If the lintbound smotherer takes 9 damage or more in a single turn from the smothered creature, the lintbound smotherer must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the lintbound smotherer. If the lintbound smotherer dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: sentient pile of laundry [body] | smothers people [behavior] | speaks only in the language of socks [body]
[reskin] signature idea (action): "The smotherer broadcasts its concentrated reek as a choking cloud. Creatures within a short range around it find their senses overwhelmed, while anything already caught in its grip or buried in its folds is so overpowered by the sock-stink that it cannot fight back." [action/save/condition] — menu: condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: leap, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The smotherer has no use for eyes; it senses every creature by smell alone, reading each body as a distinct scent. It can pinpoint any creature that reeks of sweat, blood, or fear within a wide radius, even through walls, but it is blind to anything that carries no odor at all." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, gaze-aura, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (smell, smells)
[reskin] signature template (trait): uncanny-sense -> Traits/"Scenting Stalker" ("senses every creature by smell alone, pinpoints any creature that reeks of sweat [verb: smell:concept, smells:concept, scent:idea, pinpoint:idea, pinpoints:idea, senses:idea, blood:idea]")
```


---

## Owlbear — bands soft

**Concept:** owlbear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +7 against the aim's +5
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
7
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Rend. Melee Attack Roll: +7, reach 5 ft. 26 (6d6 + 5) Slashing damage.

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
[route] brute type=Monstrosity mechanics=grapple — brute: ✓ ("owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: beak-and-claw onslaught [behavior] | feathered bear-hide body [body]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon name: "Stitch-Frame Owlbear" -> "Owlbear" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
```


---

## Apiary Wyrm — bands soft

**Concept:** a dragon made entirely of bees

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Apiary Wyrm | 10 | dragon-8 | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 57 a round is 24% under the card's 75
- read: def 9 / off 10 → 9.5; sustained 30 (3 × Rend); nova Poison Breath 55; dmg 57

```
Apiary Wyrm

Large Dragon, Unaligned

AC 18
Initiative +2 (12)

HP 178 (17d10 + 85)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
23
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
14
+2
+6
WIS
13
+1
+5
MOD
SAVE
CON
21
+5
+5
CHA
20
+5
+5

Skills Perception +5, Stealth +6

Immunities Fire

Senses blindsight 30 ft., darkvision 120 ft., tremorsense 30 ft.; Passive Perception 15

Languages Common, Draconic

CR 10 (XP 5,900; PB +4)

Actions

Multiattack. The apiary wyrm makes three Rend attacks. It can replace one attack with a use of Weakening Breath.

Rend. Melee Attack Roll: +10, reach 10 ft. 10 (1d8 + 6) Slashing damage.

Poison Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 30-foot Cone. Failure: 55 (10d10) Poison damage. Success: Half damage.

Weakening Breath. Strength Saving Throw: DC 17, each creature that isn't currently affected by this breath in a 30-foot Cone. Failure: The target has Disadvantage on Strength-based D20 Test and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

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
[route] dragon type=Monstrosity mechanics=breath — swarm: a swarm is a mass of many — no mass in the words | dragon: ✓ ("a dragon made entirely of bees") | dragon: key "dragon" (class body)
[concept] signature elements: body made of thousands of chitinous bees [body] | breath weapon of clinging, burrowing bees [behavior] | reforming swarm that reshapes its limbs [behavior]
[reskin] nova capped: "Breath Weapon" 60 → 55 (the chassis nova obeys the cap: 55 at CR 10)
[reskin] print canon defenses: HP 149 -> 178, AC 18 -> 18 — the Young Gold Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 14, CON 21, INT 16, WIS 13, CHA 20 — the Young Gold Dragon's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "a dragon made entirely of bees" heads on the Young Gold Dragon — print's rows ride along; the seat stays
[reskin] signature idea (action): "The wyrm breaks apart its own limb into a whirling lance of living bees and drives it into a foe, then leaves a crawling patch of the swarm clinging to the wound. For a short while the victim is harried and half-blinded by bees, and while the swarm clings, the wyrm can pull its stolen warmth back to itself to knit its own wounds." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, snatch, charge (+ shelf: gaze-single, snare, reel, zone, execute, seal, lure, hook-drag, rampage, shell-withdraw)
[reskin] signature idea (trait): "Because its body is thousands of bees acting as one, any blow that would crush or cut it instead tears through empty air as the swarm parts and instantly reforms. This lets the wyrm ignore the first solid hit that would land on it in a fight, then it must gather itself before doing so again." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Because its body is thousands of bees acting as one, any blow that would crush or cut it instead tears through empty air as the swarm parts and instantly reforms. This lets the wyrm ignore the first solid hit that would land on it in a fight, then it must gather itself before doing so again." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] chassis nova: "Hive Breath (Recharge 5-6)" — the dragon-8's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Monstrosity -> Dragon — the Young Gold Dragon's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "Common, Draconic" — the Young Gold Dragon's
[reskin] print canon attack: "Sting" -> "Rend" — the Young Gold Dragon's own row
[reskin] print canon defenses: immunities Poison -> Fire — the Young Gold Dragon's own header lines
[reskin] print canon nova: "Hive Breath (Recharge 5-6)" -> "Fire Breath (Recharge 5-6)" — one breath: the chassis nova at this sheet's CR carries the Young Gold Dragon's name; print's own row stays out
[reskin] print canon row: Actions/Weakening Breath — the Young Gold Dragon's own
```
