# Review batch — baseline-fidelity-2026-10-04T19-26-50

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 4/5 |
| Scrapmaw Knifewheel | 2 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/4 |
| Mire Crone | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crimson Vicar | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Croakrider | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vault Sentinel | 4 | 2024 | lurker-2-trap | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Staff Wizard Rodrin | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |
| Leviathan Terrapin | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 1/3 |
| Sock Rot | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/3 | 4/4 |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5-phantom | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 7/7 | 6/6 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | soft (1) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | SOFT: aim-dpr | ok | SOFT: ko-at-will, rider-no-save, rider-no-save | ok | ok | ok | ok | soft (2) | 6/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Grubtail | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Beedragon | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 5 of 46 user clauses** (coverage 89%); concept share 78% (62/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Grubtail — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grubtail | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Caltrop Fling); nova none; dmg 10

```
Grubtail
Small humanoid, neutral
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

Scattered Caltrops. When the grubtail moves or a creature enters its space, the ground around the grubtail is littered with caltrops; a creature that enters the area must succeed on a DC 13 Dexterity saving throw or take 3 (1d6) piercing damage and have its speed halved until the start of its next turn.
Skitterer. The trapmaker ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the trapmaker takes the Dash or Disengage action.

Actions
Multiattack: The trapmaker makes two attacks: one with its Caltrop Fling and one with its Hand Crossbow.
Caltrop Fling: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: hand crossbow [object] | bag of caltrops [object] | skirmishing retreat [behavior]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] slot yields: signature — the chassis's "Caltrop Scatter" leaves; the authored row holds the slot
```


---

## Iron Bull — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull | 12 | brute-11-charger | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 71 a round is 21% under the card's 90
- read: def 10 / off 12 → 11; sustained 48 (2 × Gore); nova Scalding Steam 58; dmg 71

```
Iron Bull

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Adamantine Shell. Once per turn, when it is hit by a weapon that is not adamantine, the bull takes no damage from the attack.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Gore or Charge in any combination.

Gore. Melee Attack Roll: +10 (with Advantage if the target has the Prone condition), reach 10 ft. 24 (4d8 + 6) Piercing damage.

Charge. Melee Attack Roll: +10, reach 5 ft. 24 (4d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Scalding Steam (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 20-foot Cone. Failure: 58 (13d8) Bludgeoning damage. Success: Half damage only.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("A huge iron golem") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: iron golem bull [body] | charging gore and trample [behavior] | scalding steam breath [behavior]
[reskin] slot yields: signature — the chassis's "Steam Vent" leaves; the authored row holds the slot
[reskin] chassis nova: "Scalding Steam (Recharge 5-6)" — the brute-11-charger's own nova row; geometry, cap and rider lines below are its edits
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Shoulder Slam); nova none; dmg 44

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

Disciplined Strikes. While Meshrin is engaged in melee combat, Meshrin's disciplined training grants it a tactical edge: once per turn, when Meshrin hits with a melee weapon attack, it can deal an extra 13 (3d8) damage.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Shoulder Slam, Razor Claws, or Vicious Bite.
Greatsword: Melee Weapon Attack: +7 to hit (with advantage if the target is prone), reach 10 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Shoulder Slam: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and the target is knocked prone.
Razor Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("Wields a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword-and-tail melee combo [behavior] | trained fighting styles [behavior] | razor claws and vicious bite [body]
[reskin] slot yields: signature — the chassis's "Faltering Bite" leaves; the authored row holds the slot
```


---

## Mire Crone — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Mire Crone | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Brine Claw); nova none; dmg 26

```
Mire Crone

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

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The bog witch makes two attacks, using Brine Claw or Salt Hex in any combination. It can replace one attack with a use of Mire Blight.

Brine Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Salt Hex. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Necrotic damage.

Mire Blight. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The bog witch casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

- At Will: Fog Cloud, Minor Illusion
- 1/Day Each: Bestow Curse

Bonus Actions

Mire's Claim. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the bog witch's next turn, the target has Disadvantage on attack rolls against creatures other than the bog witch.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: brine-soaked flesh [body] | curses that steal actions [behavior] | grasping roots from the muck [aura]
[reskin] signature idea (action): "The hag spits a glob of brine at a foe. When it hits, the brine clings and seeps toward the victim's eyes and throat. The victim's sight swims and its limbs grow heavy, stealing its swiftness and making it act late." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Brine Cling" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brine Cling" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Mark" EV 4.2 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hag's flesh is perpetually soaked in brine. Anyone who strikes her in melee is splashed, and the salt burns their wounds, making their next attacks falter." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature miss: trait — "The hag's flesh is perpetually soaked in brine. Anyone who strikes her in melee is splashed, and the salt burns their wounds, making their next attacks falter." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk)
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
[concept] signature elements: regeneration that only fire or acid can stop [behavior] | rubbery hide and lanky giant limbs [body] | grabbing claws that hold prey fast [behavior]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon name: "Barrowtroll" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Pikachu — a homebrew with a nova

**Concept:** name: Pikachu | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Pikachu | 2 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 3 → 1.625; sustained 14 (2 × Static Bolt); nova Overcharge Burst 11; dmg 17

```
Pikachu

Small Monstrosity, Unaligned

AC 14
Initiative +2 (12)

HP 36 (8d6 + 8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+5
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+3
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Arcana +5, Perception +3

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 2 (XP 450; PB +2)

Actions

Multiattack. Pikachu makes two Static Bolt attacks.

Static Bolt. Ranged Attack Roll: +5, range 80/320 ft. 7 (1d8 + 3) Lightning damage.

Spellcasting. Pikachu casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

- At Will: Light, Fly
- 1/Day Each: Thunderwave

Overcharge Burst (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 11 (2d10) Lightning damage. Success: Half damage.

Reactions

Protective Magic (3/Day). Trigger: Pikachu is hit by an attack roll. Response: Pikachu casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Monstrosity mechanics=none — caster: ✓ ("Pikachu") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: crackling cheek-pouch lightning bursts [body] | skirmishing hit-and-run with ranged electric attacks [behavior] | static-charged hide that builds to a stored discharge [body]
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Pikachu empties its cheek pouches in a spiderweb of crackling arcs that leap from its body to every foe it chooses nearby, jolting them and leaving them twitching and slow. It can only throw this much charge a few times before its pouches run dry, so it saves the burst for when it is cornered or finishing a fight." [action/once_per_fight/damage] — menu: gaze-single, snare, reel, zone, execute, seal, lure, active-toll, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Overcharge Burst (Recharge 5-6)" EV 17.1 vs floor 11.8 (the whole Multiattack (2 attacks)) — dice 7 → 11 (nova budget)
[reskin] signature template: thrown-burst-seed -> Actions/"Overcharge Burst (Recharge 5-6)" ("It empties its cheek pouches in a burst of crackling arcs that leap to every foe [verb: burst:idea, throw:idea]")
[reskin] signature idea (trait): "Static clings to Pikachu's fur; anyone who strikes it in melee gets a numbing jolt that makes their limbs tremble and their next swing clumsy. The charge never lasts long, but it treats every would-be brawler as a self-inflicted hazard." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---

## Vault Sentinel — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vault Sentinel | 4 | lurker-2-trap | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 17 a round is 43% under the card's 30
- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 2 / off 3 → 2.5; sustained 17 (1 × Stone Claw); nova none; dmg 17

```
Vault Sentinel

Medium Construct, Lawful Neutral

AC 13
Initiative +1 (11)

HP 91 (14d8 + 28)

Speed 20 ft., Climb 20 ft.

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Unseen Advance. When the sentinel moves while no creature is looking at it, the sentinel can move up to its Speed without provoking Opportunity Attacks; creatures that are not looking at it cannot perceive the movement until it stops or attacks.

Adhesive Hide. The sentinel adheres to anything that touches it. A Huge or smaller creature adhered to the sentinel has the Grappled condition (escape DC 14).

Actions

Stone Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the sentinel), reach 5 ft. 17 (3d8 + 4) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14).

Bonus Actions

False Form. The sentinel shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[concept] signature elements: only moves when unobserved [behavior] | carved stone body that appears inert [body] | ambush pounce from stillness [behavior]
[reskin] slot yields: signature — the chassis's "Petrifying Stare" leaves; the authored row holds the slot
```


---

## Staff Wizard Rodrin — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Staff Wizard Rodrin | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Iron-Shod Staff); nova none; dmg 22

```
Staff Wizard Rodrin
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

Actions
Multiattack: Rodrin makes two Iron-Shod Staff attacks. It can replace one attack with a use of Staff Siphon.
Iron-Shod Staff: Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 120 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
Staff Siphon: One creature within 30 feet must make a DC 12 Constitution saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, Rodrin regains hit points equal to half the damage dealt.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("he just hits people with his staff") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: beating people with a staff because he has no magic [behavior] | iron-shod gnarled quarterstaff [object] | wizard's robes worn with contempt [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 14, WIS 12, CHA 11 — the Mage's, INT fitted to +4
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "Rodrin grips the staff in both hands and brings it down in a committed overhead smash aimed at the skull. The blow is all-or-nothing: if it connects, the target is left reeling and struggling to gather their wits for a moment." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, reel, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Vitality Leech" EV 8.5 vs floor 5.7 (one attack of 2) — added Success: Half; dice 7 → 11
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Rodrin has nothing left to lose but his pride, and he fights like it. Whenever he is badly hurt, he stops holding back and throws himself at his enemies with even greater ferocity, hitting harder for a short while." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Rodrin has nothing left to lose but his pride, and he fights like it. Whenever he is badly hurt, he stops holding back and throws himself at his enemies with even greater ferocity, hitting harder for a short while." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Sir Reginald Pemberton-Hughes — bands soft

**Concept:** name: Sir Reginald Pemberton-Hughes | a knight who is deathly afraid of chickens and will flee from any bird

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sir Reginald Pemberton-Hughes | 5 (2014) | defender-5 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 20 a round is 44% under the table's 36
- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 4 / off 3 → 3.5; sustained 20 (2 × Knightly Longsword); nova none; dmg 20

```
Sir Reginald Pemberton-Hughes
Medium humanoid, lawful neutral
Armor Class

18 (plate)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

12 (+1)

	

14 (+2)

	

11 (+0)

	

13 (+1)

	

14 (+2)

Skills: 

Athletics +6, Perception +4

Saving Throws: 

STR +6, CON +5

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Avian Panic. While Sir Reginald Pemberton-Hughes is within 30 feet of any bird, at the start of his turn, Sir must succeed on a DC 15 Wisdom saving throw or become frightened of that bird until the start of his next turn and must immediately use his reaction, if available, to move his speed away from it by the safest route.

Actions
Multiattack: Sir makes two Knightly Longsword attacks.
Knightly Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.
Crossbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 14 (3d8 + 1) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: knightly sword-and-shield discipline [behavior] | pathological fear of chickens [behavior] | iron plate armor [object]
[reskin] slot yields: signature — the chassis's "Chicken Panic" leaves; the authored row holds the slot
```


---

## Sock Rot — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sock Rot | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sock Whip); nova none; dmg 24

```
Sock Rot

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

Languages Common

CR 3 (XP 700; PB +2)

Traits

Uncanny Sense. The sock rot can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The sock rot makes two Sock Whip attacks.

Sock Whip. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 5 (1d10) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Bonus Actions

Smother. The sock rot smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the sock rot, and takes 4 (1d8) Poison damage at the start of each of the sock rot's turns. The sock rot can have only one creature smothered at a time. If the sock rot takes 9 damage or more in a single turn from the smothered creature, the sock rot must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the sock rot. If the sock rot dies, a smothered creature pulls free Prone by using 5 feet of movement.

Answering Sting. One creature within 5 feet that hit the sock rot with an attack roll since the end of the sock rot's last turn takes 5 (1d10) Poison damage.

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
[concept] signature elements: Smothering engulf [behavior] | Reeking stench of old socks [aura] | Speaking in the language of socks [behavior]
[reskin] signature idea (action): "The sock rot grabs a fistful of its own reeking mass and hurls a spray of stinking sock-filth at one creature it can see. The target is drenched and reeks so badly that its eyes water and its stomach turns, leaving it heaving and unable to act, while everyone nearby gags at the smell. The stink clings to flesh and cloth, but the sodden mess is quickly spent, so the sock rot can only make this foul" [action/save/condition] — menu: leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Answering Sting" EV 2.8 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sock rot constantly reeks of fermented laundry, and any living creature that starts its turn within the stench has to fight down nausea or spend the turn retching and stumbling. The smell is so thick and clinging that even those who resist it move slower while inside the cloud." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (smell, smells)
[reskin] signature bound by force: trait — "uncanny-sense" matches smell+smells in the user's words; the model's none is overruled
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("exact concept match [verb: smell:concept, smells:concept]")
```


---

## Grandmother Ash — bands soft

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | lurker-5-phantom | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 24 a round is 50% under the table's 48
- bands · soft · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- gates · soft · rider-no-save: Actions/Rotting Nails: a Poisoned rider on every hit with no save
- read: def 7 / off 4 → 5.5; sustained 24 (2 × Rotting Nails); nova none; dmg 24

```
Grandmother Ash
Medium fey, neutral
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

Burned Forest Home. While in a burned forest, Grandmother has advantage on Stealth checks and can hide even when only lightly obscured by ash and char.
Incorporeal Movement. Grandmother can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, Grandmother has disadvantage on ability checks and attack rolls.
Hates Fire (Reaction). When Grandmother takes fire damage, she shrieks and recoils, taking an extra 11 (2d10) fire damage and losing her hover until the end of her next turn.

Actions
Multiattack: Grandmother makes two Rotting Nails attacks.
Rotting Nails: Melee Weapon Attack: +6 to hit (with advantage if the target is poisoned), reach 5 ft., one target. Hit: 12 (2d8 + 3) necrotic damage, and the target is poisoned until the end of its next turn.
Grave-Ash Bind (Recharge 5-6): Each creature within 15 feet of Grandmother must succeed on a DC 14 Constitution saving throw or be restrained until the end of its next turn.
```

**Engine trace**

```
[route] lurker-phantom type=Fey mechanics=breath — skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker-phantom: ✓ ("choke anyone who breathes her in") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: ash-cloud form [body] | choking engulf [behavior] | three crow sentinels [behavior]
[reskin] slot yields: signature — the chassis's "Choking Ash" leaves; the authored row holds the slot
[reskin] chassis nova: "Choking Ash Cloud (Recharge 5-6)" — the lurker-5-phantom's own nova row; geometry, cap and rider lines below are its edits
```


---

## Lantern Drowned — bands soft

**Concept:** name: The Lantern Drowned | a drowned sailor who still carries his lantern, which lures the living into the water; anyone who looks at the light wants to walk into the sea; he is cold and dripping and his touch numbs; he cannot leave the shoreline

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Lantern Drowned | 6 (2014) | lurker-5-phantom | ok | SOFT: aim-dpr | ok | SOFT: ko-at-will, rider-no-save, rider-no-save | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 24 a round is 43% under the table's 42
- gates · soft · ko-at-will: Actions/Numbing Touch: Paralyzed at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · soft · rider-no-save: Actions/Numbing Touch: a Paralyzed rider on every hit with no save
- gates · soft · rider-no-save: Actions/Lantern Swing: a Charmed rider on every hit with no save
- read: def 6 / off 4 → 5; sustained 24 (2 × Numbing Touch); nova none; dmg 24

```
Lantern Drowned
Medium undead, neutral
Armor Class

12

Hit Points: 

112 (15d8 + 45)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft.

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

bludgeoning, cold, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Bound to the Shore. While the drowned is more than 100 feet from a shoreline, the drowned cannot move farther from the shoreline; if forced to, it takes 10 (3d6) necrotic damage and is pulled back to the nearest point on the shore.
Incorporeal Movement. The lantern drowned can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity. While in sunlight, the lantern drowned has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The lantern drowned makes two attacks: one with its Numbing Touch and one with its Lantern Swing. It can replace one attack with a use of Sea-Lure Light.
Numbing Touch: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) cold damage, and the target is paralyzed until the end of its next turn.
Lantern Swing: Melee Weapon Attack: +6 to hit (with advantage if the target is charmed), reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.
Sea-Lure Light: One creature within 60 feet of the lantern drowned must succeed on a DC 14 Wisdom saving throw or be charmed until the end of its next turn.
```

**Engine trace**

```
[route] lurker-phantom type=Undead mechanics=gaze — lurker-phantom: ✓ ("a drowned sailor who still carries his l") | lurker-phantom: key "drowned" (class body)
[concept] signature elements: lantern light that pulls the living into the sea [behavior] | cannot leave the shoreline [behavior] | drowned sailor's body and lantern [body]
[reskin] slot yields: signature — the chassis's "Lantern Glow" leaves; the authored row holds the slot
```
