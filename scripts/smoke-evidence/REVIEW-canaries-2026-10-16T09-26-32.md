# Review batch — canaries-2026-10-16T09-26-32

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Cave Glutton | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Tunnel Absconder | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Glass-Voiced Thief | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Iron-Vow Templar | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Courtier Unseen | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Stormheart Wyrm | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name | FAIL (1) | 0/1 | 3/7 |
| Gilded Vault Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 5/5 |
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 0/1 | 4/4 |
| Thistle and Tally | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Rendering Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ashen Marshal | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 2/2 | 1/9 |
| Thing in the Well | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 3 of 18 user clauses** (coverage 83%); concept share 65% (40/62 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1
- swarm-9 / reader: 1
- lurker-5 / bands: 1
- defender-17-leader / reader: 1



---

## Tunnel Absconder — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tunnel Absconder | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Tunnel Absconder

Small Dragon, Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

Bonus Actions

Vanish (1/Day). The absconder casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Traits/Sunlight Sensitivity — print's own row
- Actions/Dagger — print's own row; weapon dagger
- Bonus Actions/Vanish — library seed self-invisibility; binds the GM's words: invisible+turn invisible

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "Kobold — Can turn invisible once per day…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=subterranean/bestial mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: turns invisible once per day [behavior] | cowardly skirmisher [behavior]
[concept] identity: A kobold skirmisher that operates in near-total darkness, using its daily invisibility to set up one perfect ambush before falling back to sling stones and traps. It fights only when the pack has the advantage, fleeing bloodied while shrieking for reinforcements; alone and cornered, it grovels and bargains rather than die.
[concept] lore: Born in the cramped tunnels beneath a dragon's lair, this kobold learned that survival means being unseen until the moment of the strike.
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-1 -> CR 0.25
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline declared: "the absconder" — the call's own answer (kind), built from the name
[reskin] inline form: "the absconder" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Kobold — Can turn invisible once per day" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The tunnel absconder slips out of sight, leaving only a faint shimmer in the dark. It becomes invisible for a short while, and the effect ends early if it makes an attack or casts a spell. It can use this once per day, and it uses the hidden moment to reposition or line up a perfect ambush." [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Fading Withdrawal (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Fading Withdrawal (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback floor waived: self-invisibility — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The tunnel absconder's body instinctively plays dead when bloodied and afraid, going limp and unresponsive so predators or foes lose interest. This ruse can fool attackers into ignoring it for a critical moment." [trait/on_being_hit/condition] — menu: EMPTY (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] word match declined by the call: phobia, bloodied-fury, uncanny-sense — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The tunnel absconder's body instinctively plays dead when bloodied and afraid, going limp and unresponsive so predators or foes lose interest. This ruse can fool attackers into ignoring it for a critical moment." [trait/on_being_hit/condition] — the model found no template that holds it (offered: phobia, bloodied-fury, uncanny-sense)
[reskin] weapons answered: Dagger = dagger; Sling = sling
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Kobold Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] ranged row off: "Sling" leaves — the Kobold Warrior carries no ranged row and the words name none
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Darting Withdrawal" is the seat's, not the Kobold Warrior's
```


---

## Ashen Marshal — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Marshal | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | FAIL: inline-form |

- bands · soft · aim-dpr: damage 115 a round is 28% under the table's 160
- reader · fail · inline-form: the call called "Ashen Marshal" a person and the sheet speaks it as "the ashen marshal" — a person speaks by its given name
- read: def 14 / off 18 → 16; sustained 115 (2 × Hellfire Lance + legendary Ride Down); nova none; dmg 115

```
Ashen Marshal
Medium undead, neutral evil
Armor Class

20 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

20 (+5)

	

14 (+2)

	

16 (+3)

	

20 (+5)

Skills: 

Athletics +10, Persuasion +11

Saving Throws: 

CON +11, CHA +11

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 13

Languages: 

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Cinder Shroud. A creature that touches the ashen marshal or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.
Legendary Resistance (3/Day). If the ashen marshal fails a saving throw, it can choose to succeed instead.
Aura of Authority. While within 10 feet of the ashen marshal, the ashen marshal and its allies have advantage on attack rolls and saving throws, provided the ashen marshal isn't incapacitated.
Retaliating Ember. As a bonus action, the ashen marshal targets one creature within 5 feet that hit it with an attack roll since the end of the ashen marshal's last turn, and that creature takes 10 (3d6) fire damage.
Riposte (Reaction). When a creature within 5 feet of the ashen marshal misses it with a melee attack roll, the ashen marshal makes one Hellfire Lance attack against that creature.

Actions
Multiattack: The ashen marshal makes two Hellfire Lance attacks.
Hellfire Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 10 (3d6) fire damage.
Legendary Actions

The ashen marshal can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ashen marshal regains spent legendary actions at the start of its turn.

Ride Down: The ashen marshal moves up to half its speed without provoking opportunity attacks, and it makes one Hellfire Lance attack.
Spur the Host: One ally of the ashen marshal that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Reform the Line: The ashen marshal and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Where each row came from**

- Traits/Cinder Shroud — template heated-body; library draw (seed unstamped); binds the GM's words: burn+fire
- Traits/Legendary Resistance — the chassis
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Hellfire Lance — weapon lance
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Ride Down — the chassis
- Legendary Actions/Spur the Host — the chassis
- Legendary Actions/Reform the Line — the chassis
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a death knight"
- Bonus Actions/Retaliating Ember — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted -> defender-leader: the concept's VERB outranks the noun (key "leads a", class verb) | defender-leader: key "leads a" (class verb)
[concept] name: provided_name rejected — "a death knight who leads a cavalry of th…" is the description, not a name
[concept] resolve: archetype=defender type=Undead themes=grave/terror mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: cavalry of the damned [behavior] | burns the living [behavior] | ash-clad death knight [body]
[concept] identity: A death knight who commands a cavalry of the damned, torching the living with unholy fire. It opens by lighting the field ablaze, then leads chargers in a coordinated, relentless advance, parrying and punishing any who stand against it. Under pressure, it never flees — it simply tightens the reins and orders another wave.
[concept] lore: Once a mortal commander who sold his soul for an unbroken charge, this death knight now rides at the head of a spectral host, seeking to set the world alight one kingdom at a time.
[reskin] donor: defender-17-leader -> CR 17 (invented — no printed peer)
[reskin] name_element answered: Hellfire Lance = imagery
[reskin] name element refused: "Hellfire Lance" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] inline by rule: "the ashen marshal" — the call answered "Sir Kaelen" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a death knight" -> has (descriptive), head | "leads a cavalry of the damned" -> has (descriptive) | "burns the living" -> has (mechanical)
[reskin] signature idea (action): "The marshal calls up a spectral cavalry charge that sweeps across the battlefield, trampling and burning the living in its path. The ghostly horsemen appear in a line beside the marshal and surge forward, leaving a trail of unholy fire that clings to those they pass through. The charge fades after it has passed, but the ground where it rode remains scorched." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: push-prone, herd, ground-burst, wind-up — the key word does not mean the mechanic here
[reskin] signature miss: action — "The marshal calls up a spectral cavalry charge that sweeps across the battlefield, trampling and burning the living in its path. The ghostly horsemen appear in a line beside the marshal and surge forward, leaving a trail of unholy fire that clings to those they pass through. The charge fades after it has passed, but the ground where it rode remains scorched." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] fallback respects the call: push-prone, herd left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 26.4 vs 40.6)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 12.5)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The ashen marshal is wreathed in smoldering ash and cinders that cling to anything that strikes it. When the marshal is hit by a melee attack, a cloud of burning ash bursts outward, setting the attacker alight with unholy fire." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] word match declined by the call: terrain-walk, fire-aura, bloodied-burst, adhesive — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Cinder Shroud" ("The marshal is wreathed in smoldering ash; a melee attacker is set alight with u [verb: burn:concept, fire:idea]")
[reskin] weapons answered: Hellfire Lance = lance
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] resistances derived: Fire
audit finding below confidence gate: Cinder Shroud Adjudication ambiguity: 'touches' is undefined — does grappling, shoving, or being touched by the marshal count? The trigger condition is too broad for a 10-second ruling.
[reskin] audit rename: "Answering Sting" -> "Retaliating Ember"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg's Rush 6; dmg 12

```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Perception +1, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Skirmisher. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg's Rush (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) piercing damage on a failed save. On a failed save, the target is knocked prone.
```

**Where each row came from**

- Traits/Skirmisher — the chassis
- Actions/Multiattack — the chassis
- Actions/Scimitar — weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon javelin
- Actions/Worg's Rush — the chassis
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: mounted charge [behavior] | worg mount [object] | goblinoid cruelty [aura]
[concept] identity: The goblin boss opens combat by charging with its worg mount, using a ride-by attack to bite and slice past the front line before wheeling around for another pass. It circles the fray, darting in to strike at isolated or bloodied foes while its mount snaps at anything within reach, and it flees on its worg the moment the fight turns against it—or if the worg falls, it desperately tries to escape on foot or surrender.
[concept] lore: A goblin boss who has tamed a worg through cruelty and scraps, it uses the beast to raid supply lines and terrorize travelers, seeking to grow its hoard and reputation among goblinkind.
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-3-mounted -> CR 1 (invented — no printed peer)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline by rule: "the boss" — the call answered "the boss" (kind), which the name does not support
[reskin] inline form: "the boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The boss singles out a foe its mount has just knocked down and screams for the worg to pin it. The worg savages the fallen creature while the boss stands over them, and nearby allies who see this are cowed into fighting harder. The pinned foe must tear free of the worg or be torn apart." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: rampage, exploiter — the key word does not mean the mechanic here
[reskin] fit declined: "Worg Pin" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: exploiter, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Goblin Boss — riding a worg" heads on the Goblin Boss and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 3.1 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The boss is never braver than its mount. While the worg is beside it, it fights on with the beast's ferocity; the moment the worg is gone, the boss's nerve breaks and it tries only to run or yield." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The boss is never braver than its mount. While the worg is beside it, it fights on with the beast's ferocity; the moment the worg is gone, the boss's nerve breaks and it tries only to run or yield." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Scimitar = scimitar; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Worg's Rush (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" yields to the Goblin Boss's Nimble Escape
[reskin] audit rename: "Ride-By" -> "Skirmisher"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

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

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's row, renamed

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: silent pounce from hiding [behavior] | beak and claw maul in melee [body] | savage fight-to-the-death temperament [behavior]
[concept] identity: A 900-pound fusion of owl and bear that leads with a silent glide into a bone-shattering pounce, pinning prey beneath crushing claws and hooked beak. Once locked in melee it simply trades, mauling with beak and forelimbs every round and shrugging off punishment with hide and muscle. Too stupid to retreat and too territorial to reconsider, it fights to the death and drags what it kills back to a nest of matted feathers and splintered bone.
[concept] lore: An owlbear is a magical hybrid bred by forgotten wizards as a living weapon, but it escaped the laboratory and became a recluse of the deep wood, wanting only a full belly and an undisturbed den.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] extraction: 4 of 6 model clauses quote nothing the user typed and leave the record ("900-pound fusion of owl and bear", "leads with a silent glide into a bone-shattering pounce, pinning prey beneath crushing claws and hooked beak", "Once locked in melee it simply trades, mauling with beak and forelimbs every round and shrugging off punishment with hide and muscle", …)
[reskin] weapons answered: Talons = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
```


---

## Cave Glutton — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cave Glutton | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Cave Glutton

Large Giant, Chaotic Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+7
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+6
CHA
7
-2
-2

Skills Athletics +7, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Giant

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The glutton makes two attacks, using Club or Javelin in any combination. It can replace one attack with a use of Gut-Churning Glare.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the glutton's next turn.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the glutton's next turn.

Gut-Churning Glare. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the glutton's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Club — authored for this sheet; a named part; a declared feature; the GM's clause "big ogre with a club"; weapon club
- Actions/Javelin — print's own row; authored for this sheet; a named part; a declared feature; the GM's clause "big ogre with a club"; weapon club
- Actions/Gut-Churning Glare — library seed escalating-dread

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("big ogre with a club") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/subterranean mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: massive club swings [object] | boulder hurling [behavior] | stone-hard hide [body]
[concept] identity: The ogre opens by hucking a boulder, then wades in with its club, trading blows until something drops. It doesn't dodge, doesn't negotiate, and doesn't stop until it's dead — or until it can drag a broken body back to its den.
[concept] lore: A mountain ogre grown fat and gray on cave lichen and lost travelers, it wants only to eat and to be left alone on its stony slope.
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: brute-5 -> CR 5
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Club (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] inline declared: "the glutton" — the call's own answer (kind), built from the name
[reskin] inline form: "the glutton" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "big ogre with a club" -> has (mechanical) | "cr 5" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 5")
[reskin] signature idea (action): "When the glutton lands a club hit on a creature already slowed by a previous club strike, it bashes the foe into a nearby stone or wall, leaving them reeling and easy to grab. The impact drives the air from their lungs and pins them in place for a moment." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: shield-bash, pounce, hook-drag, herd, charge-push, hook-rider, charge — the key word does not mean the mechanic here
[reskin] fit declined: "Steadying Blow" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "big ogre with a club, cr 5" heads on the Ogre and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 12.4 vs floor 9.4 (one attack of 2) — dice 9 → 18
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A creature that starts its turn grabbed by the glutton is dragged toward the glutton's maw; if it remains grabbed until the end of that turn, the glutton swallows it whole. While swallowed, the creature is blinded and restrained, has total cover against attacks from outside, and takes crushing damage each turn; if the glutton dies, it is regurgitated." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature miss: trait — "A creature that starts its turn grabbed by the glutton is dragged toward the glutton's maw; if it remains grabbed until the end of that turn, the glutton swallows it whole. While swallowed, the creature is blinded and restrained, has total cover against attacks from outside, and takes crushing damage each turn; if the glutton dies, it is regurgitated." [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending, death-burst)
[reskin] weapons answered: Club = Greatclub; Boulder = none
[reskin] weapon declared: "Club" is a greatclub — the call's own answer (the name alone read club)
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
[reskin] ranged row off: "Boulder" leaves — the Ogre carries no ranged row and the words name none
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] audit rename: "Creeping Dread" -> "Gut-Churning Glare"
```


---

## Stormheart Wyrm — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormheart Wyrm | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- reader · fail · no-type-in-name: Legendary Actions/Thunder Roar: the name carries Thunder the text does not deal
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Talons + legendary Rending Dive); nova Thunder Wall 71; dmg 150

```
Stormheart Wyrm

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 187 (15d12 + 90)

Speed 40 ft., Fly 80 ft.

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
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
20
+5
+5

Skills Perception +7, Stealth +6

Immunities Thunder

Senses darkvision 120 ft., blindsight 60 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the stormheart wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The stormheart wyrm makes three Talons attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Talons. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The stormheart wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the stormheart wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Rending Dive. The stormheart wyrm makes one Talons attack.

Stormward Rise. The stormheart wyrm moves up to half its Speed without provoking Opportunity Attacks.

Thunder Roar. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

**Where each row came from**

- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Talons — the chassis
- Actions/Thunder Wall — the chassis
- Actions/Spellcasting — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Rending Dive — the chassis
- Legendary Actions/Stormward Rise — the chassis
- Legendary Actions/Thunder Roar — the chassis

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("an adult storm dragon") | breath→mechanics ✓ ("breath is a rolling wall")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/elemental mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | body of howling storm-wind and crackling lightning [body] | aura of a living tempest [aura]
[concept] identity: The storm dragon opens with its breath: a rolling wall of thunder that rumbles forward, deafening and scattering its foes. It then takes wing to circle above, using its terrible presence and ranged lightning to pick off stragglers, closing only to finish isolated prey with tooth and claw. Wounded, it does not flee — it ascends into the heart of the storm it calls, daring enemies to follow into the thunder.
[concept] lore: Born from the heart of a perpetual hurricane, the storm dragon seeks to expand its tempest, swallowing coastlines and mountain peaks into an eternal, thundering gale.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] donor: dragon-15 -> CR 15
[reskin] inline declared: "the stormheart wyrm" — the call's own answer (kind), built from the name
[reskin] inline form: "the stormheart wyrm" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Thunder Wall" promises Thunder, so the rider stands on a Humanoid the concept never called thunder
[reskin] energy rider kept by the row's name: "Stormward Rise" promises Thunder, so the rider stands on a Humanoid the concept never called thunder
[reskin] energy rider kept by the row's name: "Thunder Roar" promises Thunder, so the rider stands on a Humanoid the concept never called thunder
[reskin] spell DC coherence: Charisma 18 -> 20 so DC 18 derives
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an adult storm dragon whose breath is a rolling wall of thunder" -> has (mechanical)
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, exploiter, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (the sheet cannot render them)
[reskin] signature idea (action): "The wyrm exhales a rolling thunderhead that unstoppers into a crawling, crackling tempest of lightning around it. The storm clings to the wyrm and reaches out toward anything near it, shocking and slowing those who dare to stay close until the storm finally gutters out." [action/always/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The wyrm exhales a rolling thunderhead that unstoppers into a crawling, crackling tempest of lightning around it. The storm clings to the wyrm and reaches out toward anything near it, shocking and slowing those who dare to stay close until the storm finally gutters out." [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure, lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Where the wyrm's thunder has just rolled, thin lightning still crawls along the ground and through the air. Any creature still standing in that thunder-scarred place is harried by stray bolts and finds it harder to move away or close in." [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, false-appearance, warded-mending — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Where the wyrm's thunder has just rolled, thin lightning still crawls along the ground and through the air. Any creature still standing in that thunder-scarred place is harried by stray bolts and finds it harder to move away or close in." [trait/start_of_turn/movement] — the model picked "fire-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (heated-body)
[reskin] weapons answered: Talons = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 18 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Thunder Roar" -> 18 (the Frightful Presence class keys to Charisma)
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Fear*.
audit rewrite meta-language, dropped: Multiattack It can replace one attack with a casting of *Fear*.
```


---

## Gilded Vault Ooze — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Vault Ooze | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Vault Ooze

Medium Ooze, Unaligned

AC 11
Initiative -2 (8)

HP 165 (22d8 + 66)

Speed 10 ft., Climb 10 ft.

MOD
SAVE
STR
18
+4
+4
INT
1
-5
-5
MOD
SAVE
DEX
6
-2
-2
WIS
6
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
2
-4
-4

Resistances Acid, Cold, Fire

Immunities Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 8

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Aberrant Ground. The ground in a 10-foot Emanation originating from the vault ooze is Difficult Terrain.

Amorphous. The vault ooze can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The vault ooze makes two Pseudopod attacks.

Pseudopod. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.

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

**Where each row came from**

- Traits/Aberrant Ground — template aberrant-ground; library draw (seed unstamped); binds the GM's words: ooze
- Traits/Amorphous — the chassis
- Traits/Corrosive Form — the chassis
- Traits/Spider Climb — the chassis
- Actions/Multiattack — the chassis
- Actions/Pseudopod — the chassis

**Engine trace**

```
[route] ooze type=Ooze mechanics=none — ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("cathedral-vault ooze that digests") | engulf→mechanics ✓ ("digests reliquaries and drips")
[concept] resolve: archetype=ooze type=Ooze themes=grave/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: digests reliquaries and drips gilded acid [behavior] | translucent tar-thick ooze body [body] | engulfing pseudopod attack [behavior]
[concept] identity: The vault-ooze opens combat by flowing through the cathedral's cracks and engulfing the nearest reliquary, its gilded acid dissolving gold and bone into itself. Every round after, it rears up as a translucent pillar of tar-thick ooze and slams a pseudopod dripping with molten gold-acid at any creature between it and its next meal, preferring the sacred over the merely living. It never flees, never toys; it simply flows over obstacles with the patience of a tide and the hunger of a thing that has learned to eat holiness.
[concept] lore: A cathedral vault-ooze forms where a consecrated crypt's sealed reliquaries are breached and the mingled sanctity and decay breed a hungering ooze; it seeks only to digest every holy relic within the walls, growing gilded and gleaming with each feast.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] name_element answered: Gilded Vault Ooze = literal; Gilded Cascade = literal
[reskin] inline declared: "the vault ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the vault ooze" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Corrosive Form" promises Acid, so the rider stands on a Humanoid the concept never called acid
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no eyes" quotes nothing the user typed
[reskin] lacks refused: "no bones" quotes nothing the user typed
[reskin] lacks refused: "no voice" quotes nothing the user typed
[reskin] lacks refused: "no weapons" quotes nothing the user typed
[reskin] lacks refused: "cannot be reasoned with" quotes nothing the user typed
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries and drips gilded acid" -> has (descriptive)
[reskin] extraction: 4 of 14 model clauses quote nothing the user typed and leave the record ("preferring the sacred over the merely living", "never flees", "flows over obstacles with the patience of a tide", …)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, herd, thrown-burst-seed, drain, delayed-brand, zone-seed, wind-up, blighted-ground, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ooze rears up and slams a pseudopod dripping with molten gold-acid into a creature, and if that creature is carrying, wearing, or holding anything sacred, the acid leaps to it and begins dissolving it into the ooze. The holy object is ruined, and the ooze immediately draws vitality from the stolen sanctity, recovering from its wounds as it feeds." [rider/on_hit/resource] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] word match declined by the call: rampage, second-wind, stunning-strike, charge-push, hook-rider, pounce, isolation, charge — the key word does not mean the mechanic here
[reskin] signature miss: action — "The ooze rears up and slams a pseudopod dripping with molten gold-acid into a creature, and if that creature is carrying, wearing, or holding anything sacred, the acid leaps to it and begins dissolving it into the ooze. The holy object is ruined, and the ooze immediately draws vitality from the stolen sanctity, recovering from its wounds as it feeds." [rider/on_hit/resource] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, charge, leap, lure, rampage, second-wind)
[reskin] signature idea (trait): "The ooze's tar-thick body constantly sweats droplets of gilded acid that spatter and cling to anything nearby. Creatures and objects that linger too close find their metal and flesh slowly eaten away, the acid eating through armor and weapon alike." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The ooze's tar-thick body constantly sweats droplets of gilded acid that spatter and cling to anything nearby. Creatures and objects that linger too close find their metal and flesh slowly eaten away, the acid eating through armor and weapon alike." [trait/always/damage] — the model picked "noxious-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (aberrant-ground)
[reskin] trait bound to the concept's verb (concept-first): aberrant-ground — ooze in the user's words; the idea path had nothing
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] weapons answered: Pseudopod = none; Gilded Cascade = none
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] languages held: None stands — INT 1 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Rendering Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rendering Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Claw); nova none; dmg 34

```
Rendering Stalker

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +9

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Reek Marker. The stalker knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Actions

Multiattack. The stalker makes two Claw attacks. It can replace one attack with a use of Stalker's Drain.

Claw. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Stalker's Drain. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the stalker regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the stalker takes the Hide action.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Stalker's Drain — library seed drain
- Bonus Actions/Umbral Step — the chassis
- Traits/Reek Marker — template faultless-tracker; library draw (seed unstamped); binds the GM's words: track+tracks+tracking+scent+unerringly
- Traits/Assassinate — template assassinate; library draw (seed unstamped)

**Engine trace**

```
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=bestial/subterranean mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scent-locked hunting [behavior] | eyeless chitin-plated stalker [body] | savage pounce from hiding [behavior]
[concept] identity: An eyeless stalker built of smooth chitin that hunts entirely by scent, it circles unseen until a prey's odor commits, then erupts in a single bone-shattering pounce from hiding; thereafter it flenses and withdraws, using its scent-locked focus to never lose a wounded target's trail, and fights to the death once blood is drawn because it cannot afford to abandon a kill it has already burned into its memory.
[concept] lore: These pit-spawned predators are grown in lightless underground larders, bred until their eyes vanish entirely and their bodies become living libraries of scent; they escape captivity rarely, and when they do, they want only to follow the taste of warm blood they remember from the killing pens.
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] inline declared: "the stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the stalker" — the model's own reading of the name
[reskin] lacks asked: "eyeless"
[reskin] lacks refused: "tracks prey by scent alone" names no absence — nothing in it takes anything away
[reskin] lacks refused: "no eyes" quotes nothing the user typed
[reskin] clauses: "an eyeless hunter" -> LACKS (mechanical) | "tracks prey by scent alone" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stalker fixes its scent-memory on one creature it can smell, even through total cover, and that memory cannot be wiped by magic or distance until the stalker dies. Once locked, the stalker always knows exactly where that creature is and how badly it is hurt, and when the stalker strikes the locked creature from hidden, the wound tears much deeper than usual." [action/always/damage] — menu: leap, execute, seal, wail, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: lure, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] word match declined by the call: focus, affliction — the key word does not mean the mechanic here
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for track, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The stalker fixes its scent-memory on one creature it can smell, even through total cover, and that memory cannot be wiped by magic or distance until the stalker dies. Once locked, the stalker always knows exactly where that creature is and how badly it is hurt, and when the stalker strikes the locked creature from hidden, the wound tears much deeper than usual." [action/always/damage] — the model found no template that holds it (offered: focus, isolation, leap, execute, seal, wail, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, affliction)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The stalker's eyeless chitin plates are sheathed in a scent-absorbing film that makes it smell like nothing at all until it is wounded, after which its reek clings to whatever struck it. Any creature that has wounded the stalker can be tracked unerringly by it, and the stalker ignores the blinding or invisible state of foes it can smell." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] word match declined by the call: uncanny-sense, noxious-aura, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): faultless-tracker -> Traits/"Reek Marker" ("The stalker tracks unerringly any creature that wounded it, which has its reek o [verb: track:concept, tracks:concept, tracking:concept, scent:concept, unerringly:idea]")
[reskin] weapons answered: Claw = none
[reskin] multiattack replacement clause: It can replace one attack with a use of Vitality Leech.
[reskin] audit rename: "Vitality Leech" -> "Stalker's Drain"
```


---

## Glass-Voiced Thief — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Glass-Voiced Thief | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Glass-Voiced Thief

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 30 ft.

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

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. The glass-voiced thief can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Nimble Skulk. The glass-voiced thief ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The glass-voiced thief makes two attacks, using Dagger or Hand Crossbow in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Hand Crossbow. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The glass-voiced thief takes the Dash, Disengage, or Hide action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the glass-voiced thief moves up to half its Speed, and it makes one Dagger attack.

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

**Where each row came from**

- Traits/Mimicry — kenku kit; the GM's clause "speaks only in stolen voices"
- Traits/Nimble Skulk — the chassis
- Actions/Multiattack — the chassis
- Actions/Dagger — weapon dagger
- Actions/Hand Crossbow — weapon hand crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief who speaks only in stolen ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=voice/uncanny mind=sapient style=skulker energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stolen voices mimicked perfectly [behavior] | skulking strike from hiding [behavior]
[concept] identity: The kenku thief opens from an unseen angle, its first strike punctuated by the mimicked voice of a comrade begging for mercy, and then it is gone again — up a wall, behind a market stall, into the gutter. Every round it circles, hides, and strikes with advantage, never trading blows; it fights only as long as the fight is a performance it controls. When bloodied, it does not flee in panic but drops a stolen voice of alarm or authority to send pursuers the wrong way before melting into the city's noise.
[concept] lore: Born of a line of kenku who stole a living from the counting-houses of a hundred cities, this thief hoards not gold but voices — the last words of guards it has killed, the passwords of guildmasters it has robbed — and it wants only to add one perfect, unforgettable voice to its collection.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] inline declared: "the glass-voiced thief" — the call's own answer (kind), built from the name
[reskin] inline form: "the glass-voiced thief" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "speaks only in stolen voices" names no absence — nothing in it takes anything away
[reskin] lacks refused: "never trading blows" quotes nothing the user typed
[reskin] clauses: "a kenku thief" -> has (descriptive), head | "speaks only in stolen voices" -> has (header)
[reskin] extraction: 4 of 11 model clauses quote nothing the user typed and leave the record ("opens from an unseen angle", "it is gone again", "up a wall, behind a market stall, into the gutter", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The thief unleashes a stolen voice it has hoarded—a guard's dying scream, a child's cry for help, a captain's order to fall back—and every enemy who can hear it is momentarily gripped by the command or horror in the voice. Those affected suffer as if the original speaker's final moment were happening to them: they falter, hesitate, or flinch away from the thief's next move. The voice is spent afte" [action/once_per_fight/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] word match declined by the call: sensory-strike, lure — the key word does not mean the mechanic here
[reskin] signature miss: action — "The thief unleashes a stolen voice it has hoarded—a guard's dying scream, a child's cry for help, a captain's order to fall back—and every enemy who can hear it is momentarily gripped by the command or horror in the voice. Those affected suffer as if the original speaker's final moment were happening to them: they falter, hesitate, or flinch away from the thief's next move. The voice is spent afte" [action/once_per_fight/condition] — the model found no template that holds it (offered: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the thief strikes from hiding, it punctuates the blow with a perfect mimicry of the victim's own voice—a gasp, a plea, a final word—stolen in the instant of the hit. The sound is so unnervingly accurate that the victim is shaken and unsure whether the voice came from within or without, leaving them exposed to the thief's follow-up." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: false-appearance, death-burst, faultless-tracker, gaze-aura, truth-aura — the key word does not mean the mechanic here
[reskin] signature miss: trait — "When the thief strikes from hiding, it punctuates the blow with a perfect mimicry of the victim's own voice—a gasp, a plea, a final word—stolen in the instant of the hit. The sound is so unnervingly accurate that the victim is shaken and unsure whether the voice came from within or without, leaving them exposed to the thief's follow-up." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] species kit: Auran — the kenku's own
[reskin] header clause: Languages "Common, Auran" -> "Speaks only in stolen voices" — the user typed it
```


---

## Iron-Vow Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron-Vow Templar | 6 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Mace); nova none; dmg 44

```
Iron-Vow Templar

Medium Humanoid, Neutral

AC 16
Initiative +0 (10)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+3
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+1
CHA
13
+1
+1

Skills Perception +6, Stealth +3

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The templar makes two attacks, using Mace or Thrown Mace in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Thrown Mace. Ranged Attack Roll: +7, range 20/60 ft. 17 (3d8 + 4) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Thrown Mace — print's own row; weapon mace

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("a templar priest with a mace") | caster-warpriest: key "priest" (class noun)
[concept] resolve: archetype=caster type=Humanoid themes=armed/forged mind=sapient style=warpriest energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: heavy iron mace swings [object] | unshakeable frontline discipline [behavior] | plate armor absorbing blows [body]
[concept] identity: A disciplined frontline bruiser who opens by closing to melee range and swinging a heavy mace with both hands, trusting iron plate to keep it alive. Every round after that it presses the same line, using its bulk to shield allies and its weapon to punish anyone who tries to slip past. It fights to the death without flinching, because its faith has no magical escape hatch — only the certainty that the work must be done.
[concept] lore: A templar of a militant order stripped of all divine gifts, it keeps its vows by earning every bruise and broken bone in the front rank, convinced that faith without magic is the only faith worth testing.
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: skirmisher-3 -> CR 6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The templar slams its mace down at the feet of a nearby enemy, then sweeps it in a low, wide arc that catches everyone clustered around that point. The heavy weapon drives through their stance, shoving them off balance and leaving them staggered in a tight ring, so the templar can keep pressing the same line without being swarmed. This is pure iron and muscle, a line-holding swing that punishes a " [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: sensory-strike, stunning-strike, charge-push — the key word does not mean the mechanic here
[reskin] signature miss: action — "The templar slams its mace down at the feet of a nearby enemy, then sweeps it in a low, wide arc that catches everyone clustered around that point. The heavy weapon drives through their stance, shoving them off balance and leaving them staggered in a tight ring, so the templar can keep pressing the same line without being swarmed. This is pure iron and muscle, a line-holding swing that punishes a " [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, sensory-strike, disarm)
[reskin] fallback respects the call: sensory-strike left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The templar's iron-vow discipline turns every hit it takes into fuel. When it is struck, it sets its stance and answers with a free, fierce mace blow at the attacker's knees, punishing the first enemy bold enough to close in. This is not magic, just the reflex of a soldier who has learned that the best defense is to make the other person regret touching him." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The templar's iron-vow discipline turns every hit it takes into fuel. When it is struck, it sets its stance and answers with a free, fierce mace blow at the attacker's knees, punishing the first enemy bold enough to close in. This is not magic, just the reflex of a soldier who has learned that the best defense is to make the other person regret touching him." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, uncanny-sense, guarded-stance)
[reskin] weapons answered: Heavy Mace = mace; Thrown Mace = mace
[reskin] weapon table: "Thrown Mace" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon yields: "Thrown Mace" keeps its mace — the GM typed it; the Priest's Radiant Flame prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Traits/"Unflagging" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] multiattack re-read — "Thrown Mace" joins the combination; "The templar makes two attacks, using Mace or Thrown Mace in any combination."
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---

## Courtier Unseen — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Courtier Unseen | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 0 → 1; sustained 0 (3 × ?); nova none; dmg 0

```
Courtier Unseen

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

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
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The courtier unseen makes three attacks. It can replace one attack with a use of Psychic Dread.

Spellcasting. The courtier unseen casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Psychic Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the courtier unseen's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Psychic damage.

Bonus Actions

Misty Step (3/Day). The courtier unseen casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The courtier unseen is hit by an attack roll. Response: The courtier unseen casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spellcasting — print's own row
- Actions/Psychic Dread — library seed escalating-dread
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands [behavior] | the step-away that leaves a shadow-trail [behavior] | a court wizard's mocking poise [aura]
[concept] identity: The Court Wizard of the Step-Away opens combat by already not being where the fight started — it strikes from a hidden position with a force-wreathed opening blow, then blinks aside the instant a weapon comes near, leaving the attacker's momentum to spend itself on empty air. Every round after, it refuses to be pinned: it steps out of reach, hurls a concussive mote of arcane force, and hides again in plain sight, using its court-trained poise to mock a foe's failed swings. Under pressure it does not panic — it toys, retreating in measured steps and punishing overextension, and only when bloodied does it consider abandoning the field entirely rather than die on a blade it never let touch it.
[concept] lore: Once a trusted advisor in a royal court, this wizard learned to slip the leash of space itself and now serves no crown but its own amusement, haunting the halls and back-alleys of the realm to prove that no one — not even a king — can lay a hand on it.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Force Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Force Bolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the courtier unseen" — the call's own answer (kind), built from the name
[reskin] inline form: "the courtier unseen" — the model's own reading of the name
[reskin] energy withheld on a base row: "Force Bolt" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] signature idea (action): "When the courtier unseen hits a creature with a Force Bolt, it can instantly step through the wound it just made, leaving a mocking afterimage in its place. The target is left grasping at nothing while the courtier reappears anywhere it can see within a short distance, its poise unbroken, ready to strike again from an angle the victim never expected." [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the courtier unseen hits a creature with a Force Bolt, it can instantly step through the wound it just made, leaving a mocking afterimage in its place. The target is left grasping at nothing while the courtier reappears anywhere it can see within a short distance, its poise unbroken, ready to strike again from an angle the victim never expected." [rider/on_hit/movement] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, snare-bolt, self-invisibility)
[reskin] fallback respects the call: phase-slip left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a court wizard who is never where you struck and steps away" heads on the Mage and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 3) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a creature misses the courtier unseen with an attack, the courtier's court-trained poise turns the failure into a wounding jest: the attacker's momentum twists back on them, and the courtier remains perfectly composed, hidden in plain sight as if the swing never happened." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: resonant-body — the key word does not mean the mechanic here
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever a creature misses the courtier unseen with an attack, the courtier's court-trained poise turns the failure into a wounding jest: the attacker's momentum twists back on them, and the courtier remains perfectly composed, hidden in plain sight as if the swing never happened." [trait/on_being_hit/damage] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, false-appearance, bloodied-fury)
[reskin] concept-first trait skipped: evasion — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Force Bolt = none
[reskin] weapon table: "Force Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] ranged row off: "Force Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] multiattack re-read — "Force Bolt" left; "Multiattack" now reads "The courtier unseen makes three attacks."
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] audit rename: "Creeping Dread" -> "Psychic Dread"
```


---

## Dirge Swarm — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- reader · fail · alignment-fit: Unaligned on a Swarm of Tiny Constructs with INT 4 that speaks Common — Unaligned is for a creature with no capacity for ethics
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Tolling Wave); nova Final Tolling 67; dmg 90

```
Dirge Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Clapper Recoil. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Tolling Wave. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Necrotic damage, or 45 (13d6) Necrotic damage if the swarm is Bloodied.

Final Tolling (1/Day). Charisma Saving Throw: DC 17, one creature the swarm can see within 90 feet. Failure: If the target has 75 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, it takes 67 (15d8) Necrotic damage.

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

**Where each row came from**

- Traits/Clapper Recoil — template resonant-body; library draw (seed unstamped); binds the GM's words: ring+bell+iron
- Traits/Swarm — the chassis
- Actions/Tolling Wave — the chassis
- Actions/Final Tolling — template execute; library draw (seed unstamped); binds the GM's words: death

**Engine trace**

```
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("the bell mass itself acts as one")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: deadly tolling that marks the dying [behavior] | a whirling mass of iron funeral bells [body] | burying the dying in sound [aura]
[concept] identity: The swarm drifts into a dying creature's space and marks it, ringing in overlapping waves that accelerate into a deafening peal. Each round the bells split between targeting the wounded with a lethal dirge and shielding others in a shroud of bone-cold tolling. It fights to the death, compelled to ring until the last listener falls silent.
[concept] lore: Forged from the bells of a plague-cathedral drowned mid-service, this construct is a single death-watch: it seeks the fading warmth of any dying thing and rings the final rites it was never given.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] inline declared: "the dirge swarm" — the call's own answer (kind), built from the name; the rules would have said "the swarm"
[reskin] inline on kit rows: "the dirge swarm" -> "the swarm"
[reskin] inline form: "the dirge swarm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "never given the rites" quotes nothing the user typed
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm fixes its ringing on one creature it can sense nearing death, and those bells answer every wound that creature suffers with another toll. Each time the marked creature is hurt, the swarm's hidden chimes ring again, stacking a private, inexorable peal over the creature's own faltering heartbeat until the final, fatal wave lands. When the creature dies while marked, the whole mass surges t" [action/always/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, active-toll, random-ray, ground-burst, spew (+ shelf: lure, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Final Tolling (1/Day)" EV 99.6 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: execute -> Actions/"Final Tolling (1/Day)" ("The swarm marks a creature nearing death and when that creature dies while marke [verb: death:idea]")
[reskin] signature idea (trait): "The swarm's body is a hurling shell of jagged iron bells; anything that strikes it or shares its space is torn and stunned by a thousand clappers rebounding at once. Its nearness swallows the sound of the dying, so wounds dealt within its shroud bleed away quietly and cannot be saved by heroics." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, heated-body, bloodied-fury, absorption — the key word does not mean the mechanic here
[reskin] signature template (trait): resonant-body -> Traits/"Clapper Recoil" ("Anything that strikes the swarm with a melee attack while within 5 feet is torn  [verb: ring:concept, bell:concept, iron:idea]")
[reskin] weapons answered: Tolling Wave = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] bloodied half re-derived: "Tolling Wave" — 14 -> 45, half of the main 90 (print's ratio on all seven swarms)
[reskin] nova capped: Actions/Final Tolling (1/Day) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
audit finding below confidence gate: Clapper Recoil The entry promises a bell-clapper response but never states that the swarm is made of or contains clappers, leaving the mechanic's nature unestablished.
```


---

## Thistle and Tally — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thistle and Tally | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hurls a handaxe"
- read: def 3 / off 6 → 4.5; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Thistle and Tally

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+6
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The tally makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the tally has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Bonus Actions

Retaliating Blow. One creature within 5 feet that hit the tally with an attack roll since the end of the tally's last turn takes 7 (2d6) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Shortsword — authored for this sheet; a named part; a declared feature; the GM's clause "closes with a shortsword"; weapon shortsword
- Actions/Handaxe — print's own row; weapon handaxe
- Bonus Actions/Retaliating Blow — library seed own-turn-punisher

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe and closes")
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurls a handaxe to open the fight [behavior] | closes with a shortsword [behavior] | handaxe and shortsword as kit [object]
[concept] identity: This sellsword opens by hurling a handaxe at range to draw blood and break formation, then closes the gap with a shortsword to finish what the throw started. Every round after, it cycles: one throw to soften, a shortsword lunge to seal — it never settles into a static melee if it can reset the distance. Under pressure it fights on, retreating only when bloodied and never fleeing the field outright.
[concept] lore: A landless blade who sells the same arm twice — once at range, once at arm's length — and wants only the next contract and the next purse.
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] named parts: Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] inline declared: "the tally" — the call's own answer (kind), built from the name
[reskin] inline form: "the tally" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) | "closes with a shortsword" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Once per round, when it throws its handaxe, the blade keeps spinning back toward the target's blind side — the tally's next shortsword lunge against that same foe bites deeper and leaves them reeling, unable to bring their guard up before the follow-through. It's the double-arm sale: one purse for the throw, a second and heavier one for the close." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] word match declined by the call: thrown-burst-seed, sensory-strike, bolt-mark — the key word does not mean the mechanic here
[reskin] key match declined: action — "thrown-burst-seed" was ranked first on the call's own menu for hurl, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Once per round, when it throws its handaxe, the blade keeps spinning back toward the target's blind side — the tally's next shortsword lunge against that same foe bites deeper and leaves them reeling, unable to bring their guard up before the follow-through. It's the double-arm sale: one purse for the throw, a second and heavier one for the close." [rider/on_hit/damage] — the model found no template that holds it (offered: thrown-burst-seed, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, sensory-strike)
[reskin] fallback respects the call: thrown-burst-seed, sensory-strike left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The tally sells the same arm twice, and its kit never truly leaves its hands — whenever a handaxe has been thrown or dropped, it can produce or snatch another without breaking stride, so it's never caught without something to hurl or something to lunge with." [trait/always/resource] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The tally sells the same arm twice, and its kit never truly leaves its hands — whenever a handaxe has been thrown or dropped, it can produce or snatch another without breaking stride, so it's never caught without something to hurl or something to lunge with." [trait/always/resource] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Skirmisher" is the seat's, not the Warrior Veteran's
audit finding below confidence gate: Answering Sting Lowercase 'the tally' mid-sentence is a non-capitalized game referent, and the repeated 'the tally's' is awkward; the entry names an action after a sting that deals Bludgeoning damage, not Piercing.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Answering Sting" -> "Retaliating Blow"
[reskin] multiattack re-read — "Handaxe" joins the combination; "The tally makes two attacks, using Shortsword or Handaxe in any combination."
```


---

## Thing in the Well — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thing in the Well | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Hooked Forelimb); nova none; dmg 34

```
Thing in the Well

Medium Aberration, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Climb 20 ft., Swim 10 ft.

MOD
SAVE
STR
16
+3
+6
INT
7
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Snagging Carapace. A creature that touches the well or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Piercing damage.

Actions

Multiattack. The well makes two Hooked Forelimb attacks. It can replace one attack with a use of Siren Canticle.

Hooked Forelimb. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the well), reach 5 ft. 17 (4d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Siren Canticle. Wisdom Saving Throw: DC 14, one creature within 60 feet that can see or hear the well. Failure: The target has the Charmed condition until the start of the well's next turn, and while Charmed this way, it must move toward the well by the safest available route on its turn.

Bonus Actions

False Form. The well shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Hooked Forelimb — the chassis
- Actions/Siren Canticle — template lure; library draw (seed unstamped)
- Bonus Actions/False Form — the chassis
- Traits/Snagging Carapace — template heated-body; library draw (seed unstamped); binds the GM's words: barbs

**Engine trace**

```
[route] lurker-trap type=Aberration mechanics=grapple — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "The Thing in the Well" is written in lowercase inside a description; the generator names it
[concept] resolve: archetype=lurker type=Aberration themes=terror/grasping mind=sapient style=trap energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: luring from the well [behavior] | chitinous hooked limbs [body] | drowning grasp [behavior]
[concept] identity: The Thing in the Well lures prey by mimicking the sound of a drowning child or a lost coin, its chitinous carapace concealed beneath a film of black water. When a creature leans over the rim, it erupts in a whip-crack of hooked forelimbs, snatching the victim into the shaft to be crushed against the stone. It toys with prey, releasing and re-grabbing, fighting to the death only when its well is threatened.
[concept] lore: Born from a drowned sacrifice and the cold stone that swallowed it, the Thing in the Well wants only to fill the void it fell into, one warm body at a time.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] inline by rule: "the well" — the call answered "the thing in the well" (kind), which the name does not support
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The well lets out a wet, strangled cry from below, the unmistakable sound of someone drowning, and the voice seems to come from right beside each listener. Those who hear it are overcome with the need to lean in and look down, shuffling or reaching toward the shaft before they can stop themselves." [action/save/movement] — menu: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] word match declined by the call: pull-through, exploiter, swallow, hook-drag, obstacle-pull — the key word does not mean the mechanic here
[reskin] value check: "Drowning Canticle" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Drowning Canticle" ("The cry of someone drowning draws listeners to lean in and look down and move to [shape fit, no verb match]")
[reskin] signature idea (trait): "The creature's carapace is a lattice of barbed, backwards-facing hooks slick with black water. Every time it is struck in melee, the attacker's weapon or limb risks snagging on those hooks, dragging the attacker off balance and closer to the well's rim." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] signature template (trait): heated-body -> Traits/"Snagging Carapace" ("on being struck in melee, the attacker's weapon or limb snags on the barbed hook [verb: barbs:idea]")
[reskin] weapons answered: Hooked Forelimb = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowning Canticle.
[reskin] audit rename: "Drowning Canticle" -> "Siren Canticle"
```
