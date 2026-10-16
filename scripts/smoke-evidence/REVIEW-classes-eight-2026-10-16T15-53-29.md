# Review batch — classes-eight-2026-10-16T15-53-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Ashvowed Kesh | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Halloran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Korgan the Scarred Hermit | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Templar Vowsworn | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Hollow Courtier | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 3/5 |
| Sister Aurelia | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Shadowsedge Shinobi | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |
| Pine Barrens Toll-Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brass Penny Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Warren Maze-Bull | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 4/6 |
| Shield-Sworn Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Whisker Tithe | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |

**Dropped 1 of 19 user clauses** (coverage 95%); concept share 68% (57/84 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 2



---

## Pine Barrens Toll-Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pine Barrens Toll-Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Pine Barrens Toll-Pack

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Blood Scent Lock. The toll-pack knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Pack Tactics. The toll-pack has Advantage on an attack roll against a creature if at least one of the toll-pack's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The toll-pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Pack Predation (2/Day). The toll-pack has Advantage on the next attack roll it makes before the end of its turn.

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

- Traits/Blood Scent Lock — template faultless-tracker; library draw (seed unstamped); binds the GM's words: hunts+hunted
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's row, renamed
- Bonus Actions/Pack Predation — library seed focus; binds the GM's words: hunt

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: coordinated pack hunting tactics [behavior] | thick winter-weather hide and heavy frame [body] | dart-in, drag-and-release mobility [behavior]
[concept] identity: The dire wolf opens with a silent, coordinated encirclement — packmates spreading wide before the first feint draws the prey's eyes. Every round after, it lunges from an off-angle to seize a leg or flank, then drags and releases to let the pack close from the opposite side, never standing in one place through a full turn. Bloodied, it does not retreat alone; it breaks line only to draw pursuers into a kill-lane where the rest of the pack waits, fighting to the death as a unit rather than as twelve pounds of teeth.
[concept] lore: Bred in the deep pine barrens where winter never fully releases its grip, this dire wolf pack claims the old game trails as a toll road and takes its meat from anything that walks them.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the toll-pack" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-pack" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The toll-pack harries the prey with one beast feinting high and loud, drawing eyes and teeth, while two others break wide to drag the victim's legs into a different line of attack. The target cannot cover both angles: whichever way it turns, the next lunge comes from its blind flank, and the pack never lets it stand in one place through a full turn." [action/always/condition] — menu: trample, leap, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] fit declined: "Feinting Harrow" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its winter hide is thick with burrs and old scars, and its heavy frame keeps it moving through brush and snow that would slow anything slighter. When it charges across difficult ground, the terrain does not break its stride or its line." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] trait declined: "Brushbreaker Hide" — bound only on the idea's own words (snow:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] trait bound to the concept's verb (concept-first): faultless-tracker — hunts+hunted in the user's words; the idea path had nothing
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept]")
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 40 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon attack: "Fangs" -> "Bite" — the Dire Wolf's own row
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Circles" is the seat's, not the Dire Wolf's
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Pack Predation (2/Day)"
[reskin] audit rename: "Faultless Tracker" -> "Blood Scent Lock"
```


---

## Sister Aurelia — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sister Aurelia | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Sister Aurelia

Medium Humanoid, Lawful Neutral

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
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
13
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sister Aurelia, Sister Aurelia and its allies have Advantage on attack rolls and saving throws, provided Sister Aurelia doesn't have the Incapacitated condition.

Actions

Multiattack. Sister Aurelia makes three attacks, using Longsword or Censer in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Censer. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Sister Aurelia touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Sister Aurelia charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Commanding Encouragement (2/Day). Each ally within 30 feet of Sister Aurelia gains 9 (2d8) Temporary Hit Points.

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

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Censer — weapon flail
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Commanding Encouragement — library seed rally; binds the GM's words: mend

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("fights in armor with a weapon")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with radiant strikes [behavior] | mending her soldiers through battlefield prayer [behavior] | aura of command and divine protection [aura]
[concept] identity: A battle-hardened crusader in battered, reliquary-studded iron mail, she opens by bellowing an oath that lights her blade with radiant fire and then wades into the unclean, smiting with every strike while her presence mends the wounds of the soldiers fighting in her aura. Each round she alternates between a thunderous, radiant smite against a foe and a field-mending prayer that restores her troops, and she never abandons her post—she fights to the death if her command is threatened, but will order a tactical retreat only to regroup and bless her surviving soldiers.
[concept] lore: Sworn to a militant order that holds that mercy to the unholy is betrayal, she marches with her company through plague-ridden borderlands, seeking to purify corruption with fire and sword while keeping her faithful soldiers standing through sheer force of devotion.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] repair round 1: 1 defect(s) — "Censer" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Sister Aurelia" — the call's own answer (person), built from the name; the rules would have said "the sister"
[reskin] inline on kit rows: "the sister" -> "Sister Aurelia"
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Censer" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers" -> has (descriptive)
[reskin] signature idea (action): "She names a single enemy as unclean with a commanding shout, and her weapon flares with radiant fire until that enemy is struck down or slips from her sight. While she is locked onto that target, her hits sear it with extra holy light that clings and burns, but if she turns her attention elsewhere the mark fades." [bonus_action/always/damage] — menu: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: aggro-curse, disarm, herd, second-wind, self-invisibility — the key word does not mean the mechanic here
[reskin] value check: "Unclean Verdict (2/Day)" EV 2.9 vs floor 45.6 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Unclean Verdict (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: coating (already on the sheet), disarm, herd left the shelf — the call declined them for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever she strikes down an unclean foe, a pulse of cleansing light washes out from the kill through the ranks of her nearby allies. Those soldiers feel their wounds close and their resolve harden, making them ready to hold the line she commands." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, warded-mending — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown warded-mending, which the GM's words keyed
[reskin] key match declined: trait — "warded-mending" was ranked first on the call's own menu for mend+mends+mending, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever she strikes down an unclean foe, a pulse of cleansing light washes out from the kill through the ranks of her nearby allies. Those soldiers feel their wounds close and their resolve harden, making them ready to hold the line she commands." [trait/always/resource] — the model found no template that holds it (offered: warded-mending, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] concept-first trait skipped: warded-mending — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Longsword = longsword; Censer = censer (flail)
[reskin] weapon declared: "Censer" is a flail — the call's own answer
[reskin] audit rewrite blocked — "Aura of Authority" is engine-authored chassis text
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Commanding Encouragement (2/Day)"
[reskin] row narrowed: "Censer" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---

## Sergeant Halloran — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sergeant Halloran | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sergeant Halloran
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

112 (25d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

11 (+0)

	

8 (-1)

	

11 (+0)

	

8 (-1)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, Halloran regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Halloran misses it with a melee attack roll, Halloran makes one Longsword attack against that creature.

Actions
Multiattack: Halloran makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Halloran's next turn.
Shield Bash: One creature within 5 feet that Halloran can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "a veteran soldier with a longsword"

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash that shoves enemies off-line [behavior] | scarred iron plate and longsword [body]
[concept] identity: The Ironclad Veteran opens by interposing its buckler and longsword, inviting a charge so it can punish the approach with a shield bash that rattles bone and breaks momentum. Every round, it locks blades and bodies with the nearest threat, using timed bashes to shove enemies off-line and deny them passage. Disciplined and unyielding, it fights to the death to hold its position, never fleeing while a single ally stands behind it.
[concept] lore: Once a decorated company sergeant, now bound in scarred plate by an oath that denies retreat, this veteran seeks only to buy time for the living with each drop of its own blood.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Halloran" — the call's own answer (person), built from the name; the rules would have said "the sergeant"
[reskin] inline on kit rows: "the sergeant" -> "Halloran"
[reskin] inline form: "Halloran" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Halloran drives his buckler forward into a foe already off-balance, then follows with a lunging thrust from his longsword that only bites when the bash has left them reeling. The bash itself barely hurts on its own; its whole job is to stagger them backward over the floor he has claimed. This pairs naturally with a target he has just rattled with a bash." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Halloran drives his buckler forward into a foe already off-balance, then follows with a lunging thrust from his longsword that only bites when the bash has left them reeling. The bash itself barely hurts on its own; its whole job is to stagger them backward over the floor he has claimed. This pairs naturally with a target he has just rattled with a bash." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, obstacle-pull, herd)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Scarred plate marks every oath Halloran has kept standing, and he never flees a fight while even one ally remains behind him — his discipline simply holds where lesser soldiers break. When he stands his ground against a charge and refuses to give way, the momentum of what strikes him turns back against the attacker." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Scarred plate marks every oath Halloran has kept standing, and he never flees a fight while even one ally remains behind him — his discipline simply holds where lesser soldiers break. When he stands his ground against a charge and refuses to give way, the momentum of what strikes him turns back against the attacker." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Open Palm — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Open Palm

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

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

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The open palm can hold its breath for 15 minutes.

Marsh Stride. The open palm ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The open palm makes two attacks, using Open Palm or Pressure Dart in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Palm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Palm's next turn.

Pressure Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The open palm takes the Dash or Disengage action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the open palm moves up to half its Speed, and it makes one Open Palm attack.

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

- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Traits/Marsh Stride — the chassis
- Actions/Multiattack — the chassis
- Actions/Open Palm — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Pressure Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: Pressure-point strikes that disable and paralyze [behavior] | Reptilian hide and martial discipline [body] | Use of pack tactics to isolate prey [behavior]
[concept] identity: The Open Palm stalks its prey with cold patience, opening each fight from the shadows with a flurry of precise strikes to pressure points before melting back out of reach. Every round it circles, darting in to deliver enfeebling blows and using its allies as cover before retreating to safety. When bloodied, it does not flee—it focuses entirely on the most dangerous foe, seeking to paralyze or kill them with a single decisive touch.
[concept] lore: These lizardfolk ascetics wander the fetid marshes of their homelands, perfecting the art of unarmed combat as a form of spiritual transcendence; they believe that by mastering the body, one can touch the divine.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] repair round 1: 1 defect(s) — name "Open Palm" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] inline declared: "the open palm" — the call's own answer (kind), built from the name; the rules would have said "Palm"
[reskin] inline on kit rows: "Palm" -> "the open palm"
[reskin] inline form: "the open palm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the open palm strikes a creature it already stunned with Open Palm, it can instead overload the pressure point to leave the victim rigidly locked in place, unable to move or act for a short time while its body locks up. The creature can shrug off the paralysis at the end of each of its turns, but while held it is completely at the open palm's mercy. This decisive touch can only be landed once" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: exploiter, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the open palm strikes a creature it already stunned with Open Palm, it can instead overload the pressure point to leave the victim rigidly locked in place, unable to move or act for a short time while its body locks up. The creature can shrug off the paralysis at the end of each of its turns, but while held it is completely at the open palm's mercy. This decisive touch can only be landed once" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, exploiter)
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The open palm's scaled hide and ascetic discipline let it slide through narrow gaps, squeeze through tight spaces, and slip out of grapples or bonds as if its body had no fixed shape. When grappled, restrained, or pinned, it can spend a moment of focus to simply flow free, ignoring the hold as its muscles and joints move unnaturally. This reptilian flexibility also lets it hide in cover that would" [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The open palm's scaled hide and ascetic discipline let it slide through narrow gaps, squeeze through tight spaces, and slip out of grapples or bonds as if its body had no fixed shape. When grappled, restrained, or pinned, it can spend a moment of focus to simply flow free, ignoring the hold as its muscles and joints move unnaturally. This reptilian flexibility also lets it hide in cover that would" [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Open Palm = none; Pressure Dart = dart
[reskin] weapon table: "Pressure Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] audit rewrite blocked — "Open Palm" is engine-authored chassis text
```


---

## Ashvowed Kesh — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Kesh | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 7 → 4.5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Ashvowed Kesh

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 81 (18d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
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
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Kesh has Advantage on attack rolls against any creature that hasn't taken a turn. If Kesh hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Stalker. Kesh ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kesh makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kesh takes the Dash, Disengage, or Hide action.

Assassin's Mark (2/Day). Kesh has Advantage on the next attack roll it makes before the end of its turn.

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

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Rooftop Stalker — the chassis
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon dagger
- Actions/Hand Crossbow — print's own row, renamed; weapon crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Assassin's Mark — library seed focus; binds the GM's words: stalk

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] name: provided_name rejected — "tiefling rogue who stalks the rooftops o…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking [behavior] | hide and strike from shadows [behavior] | rope and grappling hook [object]
[concept] identity: The rooftop stalker opens by finding a shadowed perch above the alley, then drops with a crossbow bolt or a dagger from behind, always with advantage. Each round it repositions across the rooftops, never staying in melee reach, kiting prey through chimneys and laundry lines until it can strike again from hiding. Bloodied, it does not flee—it toys with the wounded, using its tail to trip and its mocking laugh to lure pursuers into deadfalls and blind corners.
[concept] lore: A tiefling outcast who learned the old quarter's rooftops better than its streets, now selling silence to whoever pays and punishing those who once cast her out.
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] inline declared: "Kesh" — the call's own answer (person), built from the name
[reskin] inline form: "Kesh" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no sheltering home" quotes nothing the user typed
[reskin] lacks refused: "no allies to call on" quotes nothing the user typed
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kesh hurls a hooked grapple line at a creature within reach of her rope, sinking the hook into clothing, armor, or flesh. She can then yank the line to drag the victim off balance toward her, across a rooftop edge, or into a nearby hazard, leaving them sprawled and exposed. She can only do this to one creature at a time, and a creature that grabs the line or braces itself can resist being pulled." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] fit declined: "Hooked Line" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kesh carries a coiled rope and grappling hook that let her scale sheer walls and swing between rooftops without slowing down. When she is hidden or moving along a ledge, she can quickly hook a line to a chimney, beam, or railing to reposition above her prey without being seen." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: spider-climb, false-appearance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Kesh carries a coiled rope and grappling hook that let her scale sheer walls and swing between rooftops without slowing down. When she is hidden or moving along a ledge, she can quickly hook a line to a chimney, beam, or railing to reposition above her prey without being seen." [trait/always/movement] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Dagger = dagger; Crossbow = crossbow
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] print canon modes: fly off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Fly 40 ft. (hover) — the concept's movement set decides
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Crossbow" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] audit rename: "Predatory Focus (2/Day)" -> "Assassin's Mark (2/Day)"
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Shadowed Quarry" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Kesh has Advantage on attack rolls against any creature that hasn't taken a turn. If Kesh hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Shadowed Quarry: Kesh knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Korgan the Scarred Hermit — one marked soft

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Korgan the Scarred Hermit | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Korgan the Scarred Hermit

Medium Humanoid, Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 30 ft.

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

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Korgan starts its turn Bloodied, roll 1d6. On a 6, Korgan goes berserk. On each of its turns while berserk, Korgan attacks the nearest creature it can see. If no creature is near enough to move to and attack, Korgan attacks an object. Once Korgan goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Korgan has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Korgan extra movement, and Korgan can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Korgan makes two attacks, using Greataxe or Handaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Slashing damage.

Handaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Hermit's Rebuke. One creature within 5 feet that hit Korgan with an attack roll since the end of Korgan's last turn takes 11 (2d10) Bludgeoning damage.

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
- Actions/Greataxe — weapon greataxe
- Actions/Handaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Hermit's Rebuke — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("loses control when wounded") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rage triggered by taking wounds [behavior] | oversized greataxe held in scarred hands [object] | momentum that grows as its own blood spills [behavior]
[concept] identity: A goliath berserker opens with a measured, heavy axe strike — testing, not raging — but the first serious wound ignites a killing frenzy that abandons defense entirely. Round after round it swings harder and faster as its own blood flows, gaining momentum in proportion to its injuries, and once bloodied it will pursue fleeing prey across any terrain until first it or its prey is dead.
[concept] lore: Exiled from a goliath war-band for a rage that could not be disciplined, this scarred hermit now lives only to be wounded — because the pain is the only thing that makes it feel whole.
[reskin] donor: brute-5 -> CR 8
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Korgan" — the call's own answer (person), built from the name
[reskin] inline form: "Korgan" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no discipline" quotes nothing the user typed
[reskin] lacks refused: "exiled" quotes nothing the user typed
[reskin] lacks refused: "no armor" quotes nothing the user typed
[reskin] lacks refused: "no shield" quotes nothing the user typed
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] extraction: 8 of 12 model clauses quote nothing the user typed and leave the record ("opens with a measured, heavy axe strike", "testing, not raging", "abandons defense entirely", …)
[reskin] signature idea (action): "Korgan swings his greataxe in a wide, killing arc that grows heavier and more reckless the more wounded he is. Each fresh wound he has taken since the fight began feeds this strike, so a battered Korgan hits harder than a fresh one, and the blow can send even a large foe staggering back a step. He cannot hold back when he is bleeding — the angrier he is, the more of himself he puts into the swing." [action/always/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rampage, affliction, which the GM's words keyed
[reskin] key match declined: action — "rampage" was ranked first on the call's own menu for wound, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Korgan swings his greataxe in a wide, killing arc that grows heavier and more reckless the more wounded he is. Each fresh wound he has taken since the fight began feeds this strike, so a battered Korgan hits harder than a fresh one, and the blow can send even a large foe staggering back a step. He cannot hold back when he is bleeding — the angrier he is, the more of himself he puts into the swing." [action/always/damage] — the model found no template that holds it (offered: rampage, affliction, trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
[reskin] fallback respects the call: rampage left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 29.7 vs 45.6)
[reskin] fallback skipped by the floor: push-prone (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: herd (EV 10.5 vs 45.6)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Korgan's oversized greataxe was cut down and weighted for a goliath's grip, and his scarred hands never truly let it go — he can fight at extended reach with it as though it were a part of him, and a wound that would make a lesser warrior drop their weapon only makes his grip tighten. Pain does not distract him; it focuses him." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for wounded, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Korgan's oversized greataxe was cut down and weighted for a goliath's grip, and his scarred hands never truly let it go — he can fight at extended reach with it as though it were a part of him, and a wound that would make a lesser warrior drop their weapon only makes his grip tighten. Pain does not distract him; it focuses him." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greataxe = greataxe; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Hermit's Rebuke"
```


---

## Brass Penny Imp — bands soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Penny Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Brass Penny Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
6
-2
-2
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
13
+1
+1
CHA
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The penny imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The penny imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The penny imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The penny imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The penny imp takes the Disengage or Hide action.

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

- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's row, renamed; weapon dagger
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/uncanny mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: Ash-form vanishing [behavior] | Barbed stiletto of infernal iron [object] | Lock-picking tail [body]
[concept] identity: The imp circles a locked door not as a thief but as an extension of its devil's will, popping the latch with a twist of its barbed tail before the fight even begins. In combat it fights like the lock it picks: it vanishes into stillness (Hide), then strikes from an unseen angle (advantage, Sneak Attack) with a rusted stiletto, only to dissolve into cinders and reappear on a ledge to pick at the next opening. It is craven and vain—if bloodied it flees through the smallest crack, and it will never stand toe-to-toe with anything larger than itself.
[concept] lore: Forged in the brass counting-houses of the Nine Hells, these imps are leased to mortal cults as living lockpicks and couriers, and they dream only of the day their devil master grants them a name and a door of their own.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "the penny imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the penny imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "cannot break a lock"
[reskin] lacks refused: "never stand toe-to-toe with anything larger than itself" quotes nothing the user typed
[reskin] lacks refused: "if bloodied it flees through the smallest crack" quotes nothing the user typed
[reskin] lacks refused: "no thieves' tools" quotes nothing the user typed
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> LACKS (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the penny imp is unseen or behind a foe it has already wounded, it folds itself into a pinch of hot ash and cinders and reappears standing on any ledge, sill, or surface within a short distance that it can see, leaving a thin smear of soot where it stood. The vanish is silent and instantaneous, and the imp arrives already turned to face its next victim, so it can strike from the new angle bef" [bonus_action/once_per_fight/movement] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: self-invisibility, coating — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the penny imp is unseen or behind a foe it has already wounded, it folds itself into a pinch of hot ash and cinders and reappears standing on any ledge, sill, or surface within a short distance that it can see, leaving a thin smear of soot where it stood. The vanish is silent and instantaneous, and the imp arrives already turned to face its next victim, so it can strike from the new angle bef" [bonus_action/once_per_fight/movement] — the model found no template that holds it (offered: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's stiletto is hammered from cold infernal iron and barbed along both edges, and any living thing it cuts keeps feeling the barbs working deeper — the wound smolders and refuses to close, so the creature bleeds and smokes until it receives real healing or the imp that cut it is destroyed." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: heated-body, resonant-body, marking-light, faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The imp's stiletto is hammered from cold infernal iron and barbed along both edges, and any living thing it cuts keeps feeling the barbs working deeper — the wound smolders and refuses to close, so the creature bleeds and smokes until it receives real healing or the imp that cut it is destroyed." [trait/always/damage] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst, resonant-body)
[reskin] weapons answered: Stiletto = dagger
[reskin] weapon declared: "Stiletto" is a dagger — the call's own answer
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon languages: "Infernal, Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

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

Senses blindsight 30 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Returned Quip. One creature within 5 feet that hit Dame Oriel with an attack roll since the end of Dame Oriel's last turn takes 7 (2d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

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

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "Dame Oriel — a knight"
- Bonus Actions/Returned Quip — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who keeps the line with a shiel") | defender: key "keeps the line" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: unyielding shield wall [behavior] | longsword and shield [object] | punishes those who try to slip past [behavior]
[concept] identity: Dame Oriel plants her shield and dares the line to break, holding a chokepoint with disciplined swordwork and a shield wall mentality. Every round she controls terrain: stepping into gaps, shoving attackers back, and punishing anyone who tries to slip past her reach. She fights to the last, yielding only if her charge is safe and escape serves the mission.
[concept] lore: A veteran of the Ironwall Legion, Dame Oriel took a sacred oath to hold the pass at Grayford Bridge, and she will not abandon her post until relieved or dead.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Javelin" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no spells" quotes nothing the user typed
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical)
[reskin] signature idea (action): "Dame Oriel plants her shield and drives forward, herding foes back and together in front of her. Everyone caught in this push is forced backward and crowded, their footing thrown off until they spend a moment to steady themselves. She can only do this so many times before her shield arm tires." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Dame Oriel plants her shield and drives forward, herding foes back and together in front of her. Everyone caught in this push is forced backward and crowded, their footing thrown off until they spend a moment to steady themselves. She can only do this so many times before her shield arm tires." [action/always/movement] — the model found no template that holds it (offered: rally, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: herd (EV 7 vs 30.4)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When an enemy is shoved back by Dame Oriel's shieldwork, it stumbles right into the reach of her longsword, letting her immediately punish the disruption without giving up her guard. The opening is gone if she doesn't take it in that instant." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When an enemy is shoved back by Dame Oriel's shieldwork, it stumbles right into the reach of her longsword, letting her immediately punish the disruption without giving up her guard. The opening is gone if she doesn't take it in that instant." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] weapons answered: Longsword = longsword; Javelin = javelin
[reskin] audit rename: "Answering Sting" -> "Returned Quip"
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language, Celestial

CR 6 (XP 2,300; PB +3)

Traits

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Mace — print's row, renamed; weapon longsword
- Actions/Radiant Flame — print's own row, renamed; weapon lance
- Actions/Spellcasting — print's own row
- Bonus Actions/Bolstering Cry — library seed rally; binds the GM's words: blessing+bless
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawn-prayers [behavior] | holy strike channeled through her iron mace [object] | radiant aura that steadies allies and sears foes [aura]
[concept] identity: Vareth Solmane advances behind a wall of her own soldiers, laying down melee strikes that carry radiant dawnfire while her war-prayers knit their wounds and harden their resolve. Every round she either blesses her line, strikes a foe to open a gap, or calls down a searing light to punish those who break through; she fights as a commander, not a duelist, and only yields ground when her soldiers fall.
[concept] lore: Vareth Solmane was a knight-chaplain of the Dawnfire Order who bound a fragment of the rising sun into her own blood-iron flesh, and she now wanders the war-torn roads gathering the faithful into shield-walls worth dying behind.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first and keys STR 16 over DEX 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain defender line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Dawnfire Blade = literal; Dawnfire Edict = literal
[reskin] repair round 1: 1 defect(s) — "Sunbrand Lance" deals Fire on a Humanoid whose concept names no Fire — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical)
[reskin] signature idea (action): "Vareth plants the butt of her lance and speaks a dawn-prayer over her soldiers, and the prayer does not end when she lowers the weapon — it clings to them, banked like coals, waiting. The next time any of those blessed soldiers is struck, the prayer flares awake and pours back through the enemy who dared touch them, burning the attacker with the same dawnlight and sealing a sliver of the soldier's" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature miss: action — "Vareth plants the butt of her lance and speaks a dawn-prayer over her soldiers, and the prayer does not end when she lowers the weapon — it clings to them, banked like coals, waiting. The next time any of those blessed soldiers is struck, the prayer flares awake and pours back through the enemy who dared touch them, burning the attacker with the same dawnlight and sealing a sliver of the soldier's" [action/always/damage] — the model picked "curse-debt" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally, lay-on-hands)
[reskin] value check: "Bolstering Cry (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The rising sun bound in Vareth's blood-iron will not let her soldiers leave her light: as long as she is on her feet and fighting, any ally near her who is wounded and staggering draws on her dawnfire and rises back to their feet, steadied and lit from within. The more of her line that falls, the brighter she burns, so the wall is never truly broken while she stands." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, guarded-stance, undead-fortitude, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The rising sun bound in Vareth's blood-iron will not let her soldiers leave her light: as long as she is on her feet and fighting, any ally near her who is wounded and staggering draws on her dawnfire and rises back to their feet, steadied and lit from within. The more of her line that falls, the brighter she burns, so the wall is never truly broken while she stands." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Dawnfire Blade = longsword; Sunbrand Lance = lance
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Dawnfire Blade" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Sunbrand Lance" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Divine Aid The entry forces the GM to look up four different spells mid-combat, including one with a contested ability check, which is not resolvable in ~10 seconds.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage, and the next attack Vareth makes before the end of her next turn has Advantage.
provenance: none — the call wrote the text itself
```


---

## Templar Vowsworn — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar Vowsworn | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Templar Vowsworn

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

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
+0
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The vowsworn makes two Mace attacks. It can replace one attack with a use of Shield.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vowsworn's next turn.

Shield. Strength Saving Throw: DC 13, one creature within 5 feet that the vowsworn can see. Failure: 7 (2d6) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Trip Attack. Strength Saving Throw: DC 13, one creature within 30 feet that is Prone. Failure: 11 (2d10) Piercing damage. Success: Half damage.

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
- Actions/Shield — template shield-bash
- Actions/Trip Attack — library seed exploiter

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: holding the line [behavior] | iron mace and shield [object] | faith without magic [behavior]
[concept] identity: The templar priest plants itself on the battle line and refuses to yield, swinging a heavy iron mace in punishing arcs that drive the unworthy back even as they bleed against its consecrated shield. Every round it reinforces its stance or drags a wounded enemy into its reach, punishing any who dare slip past to strike the flock behind it. Unshakeable in faith and temper, it fights to the death without retreat, confident that its god's judgment will fall hardest on those who break the line.
[concept] lore: These armored devotees of a martial church forsake all prayer-magic to become the living wall of their congregation, believing that a strong right arm and unbending faith are the truest sacraments.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Mace — it was "*Ranged Attack Roll:* +6, range 30/120 ft. 13 (2d8 + 4) {dam…"
[reskin] inline declared: "the vowsworn" — the call's own answer (kind), built from the name
[reskin] inline form: "the vowsworn" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The vowsworn steps into an opening left by a foe's faltering guard and hauls that foe bodily back toward itself, dragging them away from the flock. The target must be a creature who is already trying to get past it — reeling from its shield bash, or within reach and having just missed an attack against it — and the pull brings them into the vowsworn's own reach, where its mace waits." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] word match declined by the call: obstacle-pull, hook-rider — the key word does not mean the mechanic here
[reskin] fit declined: "Faltering Guard" — a print body takes only what the user's words ask; the call quoted "having just missed an attack against it", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Opportunist's Lash" EV 8.5 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The vowsworn fights with a relentless forward pressure, punishing any foe who shifts attention away from it. Whenever an enemy it can see makes an attack against someone other than the vowsworn, that enemy immediately draws the vowsworn's ire and is brought one step closer — within striking distance if the vowsworn can manage it." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The vowsworn fights with a relentless forward pressure, punishing any foe who shifts attention away from it. Whenever an enemy it can see makes an attack against someone other than the vowsworn, that enemy immediately draws the vowsworn's ire and is brought one step closer — within striking distance if the vowsworn can manage it." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] feature name: "Opportunist's Lash" -> "Trip Attack" — the card that is this feature takes its name
[reskin] weapons answered: Mace = mace; Shield = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield.
audit finding below confidence gate: Divine Aid The spell names are not italicized in a standard way and 'using the same spellcasting ability as Spellcasting' is a cross-reference that is functional but slightly meta; more importantly, the entry gives no spellcasting DC or attack modifier, leaving the GM to derive it from the Spellcasting entry.
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---

## Hollow Courtier — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Courtier | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Hollow Courtier

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

Multiattack. The courtier makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The courtier casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The courtier casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The courtier teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The courtier is hit by an attack roll. Response: The courtier casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Arcane Burst — print's own row, renamed; weapon longsword
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Phase Slip — library seed phase-slip; binds the GM's words: step

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=arcane/uncanny mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: steps away from every strike, leaving a shadow in its place [behavior] | body of solid shadow that shimmers like heat haze [body] | arcane knowledge of court magic and spatial manipulation [aura]
[concept] identity: The Court Wizard opens by stepping sideways through space, leaving a shimmering afterimage in its place, then lashes out with a blade of solid shadow. Every round after, it teleports in response to being targeted, forcing enemies to chase a ghost that is never there, while it picks apart stragglers with hit-and-run strikes. When bloodied, it does not flee but becomes harder to pin down, stepping away from every blow and toying with exhausted pursuers until it can slip into shadow entirely.
[concept] lore: Once a royal advisor who traded their reflection for the secret of the step-between, the Court Wizard now haunts the ruined palace, forever seeking a new court to manipulate and a new shadow to wear.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Shadow Blade" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type | "Blink" is not on the spell menu — pick from: Detect Magic, Mage Hand, Minor Illusion, Prestidigitation, Light, Disguise Self, Invisibility, Misty Step, Fog Cloud, Darkness, Dispel Magic, Mirror Image, Blur, Hold Person, Web, Fly, Fireball, Lightning Bolt, Scorching Ray, Shatter, Magic Missile, Guiding Bolt, Mind Spike, Acid Arrow, Ice Knife, Cone of Cold, Blight, Vampiric Touch, Ray of Sickness, Thunderwave, Burning Hands, Ice Storm, Wall of Fire, Cloudkill, Fear, Sleep, Charm Person, Suggestion, Slow, Blindness/Deafness, Bestow Curse, Hypnotic Pattern
[reskin] repair round 2: 1 defect(s) — "Shadow Blade" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "the courtier" — the call's own answer (kind), built from the name
[reskin] inline form: "the courtier" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] signature idea (action): "The courtier's shadow blade is not thrown but left behind, a gleaming afterimage that hangs in the air where it struck. Until the courtier's next turn, anyone who moves through that shimmering patch feels it cut again, as if the blade were still there. The courtier can use this to fence off a stretch of ground, making pursuers think twice about the path they take." [action/always/damage] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: thrown-burst — the key word does not mean the mechanic here
[reskin] signature miss: action — "The courtier's shadow blade is not thrown but left behind, a gleaming afterimage that hangs in the air where it struck. Until the courtier's next turn, anyone who moves through that shimmering patch feels it cut again, as if the blade were still there. The courtier can use this to fence off a stretch of ground, making pursuers think twice about the path they take." [action/always/damage] — the model picked "zone-seed" (no verb, and it quotes nothing the GM typed) over a concept-verb template (phase-slip)
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the courtier is struck, the attacker's reflection ripples across its body for a heartbeat, showing them exactly where they hit and nowhere else. The courtier slides one step to the side of that image, appearing in a space adjacent to where the blow landed. Enemies must keep guessing which patch of shadow is real." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: evasion, gaze-aura, absorption, bloodied-burst, resonant-body, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever the courtier is struck, the attacker's reflection ripples across its body for a heartbeat, showing them exactly where they hit and nowhere else. The courtier slides one step to the side of that image, appearing in a space adjacent to where the blow landed. Enemies must keep guessing which patch of shadow is real." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, gaze-aura, blurred-form)
[reskin] concept-first trait skipped: evasion — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Shadow Blade = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Shadow Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit |

- reader · fail · save-fit: Actions/Opportunist's Lash: a Strength save for an effect that calls for Wisdom or Charisma
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

```
Thurivald
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

15 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet. The target must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with Hurlspear. It can replace one attack with a use of Opportunist's Lash.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Hurlspear: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Opportunist's Lash: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Hurlspear — weapon spear
- Actions/Opportunist's Lash — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: a skald's war-song that drives allies into fury [behavior] | an iron-choked voice that carries over any din [body] | the spear he leans on between verses [object]
[concept] identity: Thurivald opens by planting his feet and raising the war-song, and from that moment every ally who can hear him fights above its weight — his voice is the battle line. Each round he keeps the verse alive, striking with his spear between stanzas, repositioning to keep the warband inside the aura, and punishing anyone who tries to silence him. He does not break while the song holds; if bloodied, he fights harder rather than flee, and if the warband falls, he sells his life to finish the verse.
[concept] lore: Thurivald was a skald of the drowned war-bands, bound to iron by his own death-song, and he marches now only to hear a warband roar his verses one last time.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] extraction: 5 of 14 model clauses quote nothing the user typed and leave the record ("every ally who can hear him fights above its weight", "Each round he keeps the verse alive", "punishing anyone who tries to silence him", …)
[reskin] signature idea (action): "Thurivald raises his spear high and roars into a war-chant, driving every nearby ally who can hear him to press the attack. Until the start of his next turn, they ignore pain and keep fighting past their limits. The power costs him his whole turn and leaves him open, and it only builds on the fury his presence already stokes." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald raises his spear high and roars into a war-chant, driving every nearby ally who can hear him to press the attack. Until the start of his next turn, they ignore pain and keep fighting past their limits. The power costs him his whole turn and leaves him open, and it only builds on the fury his presence already stokes." [action/always/condition] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, riposte)
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's voice carries over any din, thick and iron-choked, so nothing the battlefield throws at him can silence him. Whenever he is hit, the blow only feeds his fury, and the war-song he leads grows as he fights on." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: resonant-body, absorption, mimicry — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Thurivald's voice carries over any din, thick and iron-choked, so nothing the battlefield throws at him can silence him. Whenever he is hit, the blow only feeds his fury, and the war-song he leads grows as he fights on." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, weapon-lodge, mimicry)
[reskin] weapons answered: Spear = spear; Hurlspear = spear
[reskin] weapon table: "Hurlspear" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
audit finding below confidence gate: Opportunist's Lash The ability depends on a target being Charmed by Thurivald, but the only source of Charmed in the block, Captain's Charm, lasts until the start of Thurivald's next turn, meaning the lash is unusable in the same turn it is applied and requires GM-bookkeeping across turns to track a very short-lived condition.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Shadowsedge Shinobi — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadowsedge Shinobi | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 38 (2 × Poisoned Blade); nova none; dmg 38

```
Shadowsedge Shinobi

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

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

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If Shadowsedge is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Shadowsedge instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Shadowsedge has Advantage on attack rolls against any creature that hasn't taken a turn. If Shadowsedge hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasive Shadow. Shadowsedge ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Shadowsedge makes two attacks, using Poisoned Blade or Shuriken in any combination.

Poisoned Blade. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Poison damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Shadowsedge takes the Dash, Disengage, or Hide action.

Blink Step (Recharge 4-6). Shadowsedge teleports up to 40 feet to an unoccupied space it can see.

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

- Traits/Evasion — template evasion; library draw (seed unstamped)
- Traits/Assassinate — template assassinate; library draw (seed unstamped); binds the GM's words: unseen
- Traits/Evasive Shadow — the chassis
- Actions/Multiattack — the chassis
- Actions/Poisoned Blade — weapon dagger
- Actions/Shuriken — the chassis
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Blink Step — library seed blink; binds the GM's words: shadow

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — lurker: ✓ ("strikes unseen") | lurker -> skirmisher-skulker: the concept's VERB outranks the noun (key "unseen", class verb) | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: shadow step teleportation [behavior] | poisoned blade [object] | hidden strike from shadows [behavior]
[concept] identity: The Shadowblade Ninja opens combat by fading into darkness, then strikes from hiding with advantage, using its Shadow Step to teleport between shadows and its poisoned blade to deliver sudden, lethal blows. Each round it repositions through shadows, making one precise strike before vanishing again, relying on stealth and mobility to avoid retaliation. When bloodied, it melts into the shadows and retreats to fight another day, patient and cunning.
[concept] lore: Trained in forbidden shadow arts, the Shadowblade Ninja serves a hidden clan that seeks to manipulate events from the darkness, eliminating key targets to shape the world according to their secret agenda.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] inline declared: "Shadowsedge" — the call's own answer (person), built from the name
[reskin] inline form: "Shadowsedge" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Poisoned Blade" promises Poison, so the rider stands on a Humanoid the concept never called poison
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no honor" quotes nothing the user typed
[reskin] lacks refused: "no open confrontation" quotes nothing the user typed
[reskin] lacks refused: "no heavy armor" quotes nothing the user typed
[reskin] lacks refused: "no mercy for targets" quotes nothing the user typed
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shinobi lashes out with its poisoned blade in a blur of motion, aiming for an unseen weak point. When the strike lands, it leaves a lingering venom that saps the victim's strength, making them sluggish and vulnerable for a short time. This poisoned wound marks the target, so the shinobi's next strike against them is even more precise and deadly." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — blink, self-invisibility (shadow, unseen)
[reskin] rider declined: "Venom Brand" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Blink Step (Recharge 4-6)" EV 3.5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] slot yields: bonus-alt — the chassis's "Shadow Step (Recharge 4-6)" leaves; "Blink Step (Recharge 4-6)" holds the slot
[reskin] library seed drawn: blink -> Bonus Actions/"Blink Step (Recharge 4-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The shinobi's body is so suffused with shadow that it can slip through the faintest darkness. Whenever it is in dim light or darkness, it becomes nearly invisible, its outline blurring and its scent masked. Even magical senses that pierce illusions struggle to pinpoint it, and it can hide from creatures that rely on special sight." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] word match declined by the call: uncanny-sense, blurred-form, false-appearance, marking-light — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown assassinate, which the GM's words keyed
[reskin] key match declined: trait — "assassinate" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The shinobi's body is so suffused with shadow that it can slip through the faintest darkness. Whenever it is in dim light or darkness, it becomes nearly invisible, its outline blurring and its scent masked. Even magical senses that pierce illusions struggle to pinpoint it, and it can hide from creatures that rely on special sight." [trait/always/defense] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[reskin] weapons answered: Poisoned Blade = dagger; Shuriken = none
[reskin] weapon declared: "Poisoned Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Shuriken" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Shadowmeld" -> "Evasive Shadow"
```


---

## Warren Maze-Bull — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Warren Maze-Bull | 6 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- reader · fail · name-mechanic: Actions/Bloodied Charge: the name promises movement the text lacks
- read: def 4 / off 6 → 5; sustained 44 (2 × Maul); nova none; dmg 44

```
Warren Maze-Bull

Large Monstrosity, Neutral

AC 16
Initiative +2 (12)

HP 105 (14d10 + 28)

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

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the maze-bull has Advantage on attack rolls and saving throws.

Aura of Authority. While in a 10-foot Emanation originating from the maze-bull, the maze-bull and its allies have Advantage on attack rolls and saving throws, provided the maze-bull doesn't have the Incapacitated condition.

Actions

Multiattack. The maze-bull makes two attacks, using Maul or Bloodied Charge in any combination.

Maul. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Bloodied Charge. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Charge. The maze-bull moves up to half its Speed straight toward an enemy it can see.

Retaliating Horns. One creature within 5 feet that hit the maze-bull with an attack roll since the end of the maze-bull's last turn takes 7 (2d6) Bludgeoning damage.

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

- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Maul — weapon maul
- Actions/Bloodied Charge — the chassis
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Retaliating Horns — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Monstrosity mechanics=none — defender-leader: ✓ ("herds prey into the maze") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "minotaur reaver who herds prey into the …" is the description, not a name
[concept] resolve: archetype=defender type=Monstrosity themes=subterranean/armed mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | stone-walled corridor charge [body] | captain of the maze-pack [aura]
[concept] identity: The minotaur reaver opens by bellowing a lane of retreat into the maze's throat, shepherding prey with shield-slam and horn-toss while its raider pack flanks. Every round it fights as a captain beside its herd, holding the corridor's key junction with a braced parry and calling the next collapse inward. Bloodied, it does not flee — it seals the maze behind itself and fights to grind the last intruders into the stone.
[concept] lore: A maze-born bull of the lower warrens, it was reared not to kill but to turn prey inward, growing a reaver's discipline from the herd-stone maze that is both its home and its weapon.
[reskin] donor: defender-3-leader -> CR 6
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] repair round 1: 1 defect(s) — name "Bloodied Charge" promises movement but the row never delivers it — name what the rule does, or drop the claim word
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] inline declared: "the maze-bull" — the call's own answer (kind), built from the name; the rules would have said "Maze-Bull"
[reskin] inline on kit rows: "Maze-Bull" -> "the maze-bull"
[reskin] inline form: "the maze-bull" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The maze-bull slams its shield-bulk into the ground where stone meets corridor, collapsing a wall of rubble that seals a lane the prey might flee through. The rubble remains as a blocking wall, leaving only the warren's inward throat open; the maze-bull then bellows and advances, and any creature hit by its next maul that round is driven one step back toward the sealed stone." [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: seal, push-prone, rally, shield-bash, terror-pulse, active-toll — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown herd, which the GM's words keyed
[reskin] key match declined: action — "herd" was ranked first on the call's own menu for herd, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The maze-bull slams its shield-bulk into the ground where stone meets corridor, collapsing a wall of rubble that seals a lane the prey might flee through. The rubble remains as a blocking wall, leaving only the warren's inward throat open; the maze-bull then bellows and advances, and any creature hit by its next maul that round is driven one step back toward the sealed stone." [action/always/movement] — the model found no template that holds it (offered: herd, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, rally, riposte)
[reskin] fallback respects the call: herd, terror-pulse, push-prone left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Stone hears the beast's hooves: whenever the maze-bull moves in a straight line along worked stone or sheer wall and ends beside a foe, the stone itself bucks and cracks, shoving that foe back into the tighter corridor and leaving them boxed in until the bull's next move." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Buckling Stone" — bound only on the idea's own words (cracks:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Maul = none; Bloodied Charge = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Retaliating Horns"
```


---

## Shield-Sworn Errant — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shield-Sworn Errant | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shields the weak"
- read: def 6 / off 8 → 7; sustained 52 (2 × Longsword); nova none; dmg 52

```
Shield-Sworn Errant

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the errant, the errant and its allies have Advantage on attack rolls and saving throws, provided the errant doesn't have the Incapacitated condition.

Actions

Multiattack. The errant makes two attacks, using Longsword or Throwing Spear in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Throwing Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Bonus Actions

Shield Answer. One creature within 5 feet that hit the errant with an attack roll since the end of the errant's last turn takes 10 (3d6) Bludgeoning damage.

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

- Traits/Aura of Authority — paladin kit; the GM's clause "a knight-errant of the fallen order"
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Throwing Spear — weapon spear
- Bonus Actions/Shield Answer — template own-turn-punisher; library draw (seed unstamped); binds the GM's words: answer

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender-leader: ✓ ("knight-errant of the fallen order") | defender-leader -> defender: the concept's VERB outranks the noun (key "knight", class verb) | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-wall defense of the weak [behavior] | scarred iron shield and blade [object] | the fallen order's discipline [aura]
[concept] identity: The Shield-Sworn Errant plants its battered tower shield in the gap and holds — a wall of scarred iron that steps into blows meant for others and answers any foe foolish enough to push past with a disciplined blade. Every round it is a decision between standing firm and shoring up a faltering line, one hand on the shield's rim as it reads the field and repositions to cover the weakest ally. It does not pursue a rout; it fights until the last civilian is clear, and only then does it consider its own retreat with a soldier's grim arithmetic.
[concept] lore: A knight-errant of the fallen order, sworn to wander the roads where their kingdom's writ no longer runs, standing between the defenseless and whatever the broken world sends them.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the errant" — the call's own answer (kind), built from the name
[reskin] inline form: "the errant" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] signature idea (action): "The errant slams its scarred tower shield into the ground and becomes the wall itself — for as long as it stands its ground, anyone behind it is covered, and every enemy blow that lands on a warded ally instead finds the errant's own iron, the knight stepping into the strike. When a foe it is guarding against pushes past or presses an attack the errant has called, the errant answers with a discipl" [reaction/on_being_hit/defense] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: herd, push-prone, snap-shot — the key word does not mean the mechanic here
[reskin] value check: "Shield Answer" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Shield Answer" ("when a foe presses an attack the errant has called, the errant answers — the cre [verb: answer:idea]")
[reskin] signature idea (trait): "The errancy's shield remembers every blow it has ever taken for someone else — the dents and scars spark against a fresh attacker, so that any foe who scores a hit on the errant finds its own weapon ringing and its guard pried open until the end of its next turn, while the errant's shield-hand stays steady and free to strike." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, bloodied-burst, guarded-stance — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The errancy's shield remembers every blow it has ever taken for someone else — the dents and scars spark against a fresh attacker, so that any foe who scores a hit on the errant finds its own weapon ringing and its guard pried open until the end of its next turn, while the errant's shield-hand stays steady and free to strike." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
[reskin] weapons answered: Longsword = longsword; Throwing Spear = spear
[reskin] weapon table: "Throwing Spear" — thrown, range 20/60
audit finding below confidence gate: Aura of Authority The aura's own suppression clause makes the GM track a condition state on the aura-source each time an affected ally acts, adding combat-tracking overhead the block provides no marker for.
```


---

## Whisker Tithe — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisker Tithe | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Claw); nova none; dmg 24

```
Whisker Tithe

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

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Crowdslip. Whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Whisker makes two attacks, using Claw or Dart in any combination.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Fleet Agility. Whisker takes the Dash or Disengage action.

Cunning Action. Whisker takes the Dash, Disengage, or Hide action.

Blood Trail Slip (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Whisker moves up to half its Speed, and it makes one Claw attack.

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

- Traits/Crowdslip — the chassis
- Actions/Multiattack — the chassis
- Actions/Claw — the chassis
- Actions/Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "a tabaxi cutpurse"
- Bonus Actions/Blood Trail Slip — library seed rampage

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("slips through the market crowd") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a tabaxi cutpurse who slips through the …" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crowd-cover skirmishing [behavior] | clawed cutpurse snatch [behavior] | market-bazaar upbringing [aura]
[concept] identity: The cutpurse shadows a mark through the market crowd, using the bustle as cover until it can slip in with a clawed snatch and dart away before the victim feels the tug. Every round it flits between stalls and bystanders, striking only when flanking with an alley cat or a paid urchin, and it relies on its feline agility to Break Away without provoking a parting shot. If bloodied it melts into the throng, abandoning the score and favoring survival over greed.
[concept] lore: Raised in the alleys behind the Grand Bazaar, this tabaxi learned that a full purse and a clean getaway are worth more than any guild's promise, and it now taxes the market one cut at a time.
[reskin] donor: skirmisher-3 -> CR 3
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: rogue — "a tabaxi cutpurse": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "Whisker" — the call's own answer (person), built from the name
[reskin] inline form: "Whisker" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no guild's promise" quotes nothing the user typed
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Whisker times a clawed snatch to a moment when a bystander or ally is crowding the target, making the cut land harder and harder to notice. It then slips the stolen coin or trinket into its own pocket, feather-light and silent." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: disarm, isolation, feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown feint-slip, which the GM's words keyed
[reskin] key match declined: action — "feint-slip" was ranked first on the call's own menu for slip, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Whisker times a clawed snatch to a moment when a bystander or ally is crowding the target, making the cut land harder and harder to notice. It then slips the stolen coin or trinket into its own pocket, feather-light and silent." [rider/on_hit/damage] — the model found no template that holds it (offered: feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, lure, sensory-strike, disarm)
[reskin] fallback respects the call: feint-slip, disarm left the shelf — the call declined them for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whisker was raised in the market's churn, so it alone can move through the thickest press of bodies as if the crowd were open ground, leaving pursuers tangled in the bustle. When it slips into a crowd, the throng closes behind it, hiding its trail." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whisker was raised in the market's churn, so it alone can move through the thickest press of bodies as if the crowd were open ground, leaving pursuers tangled in the bustle. When it slips into a crowd, the throng closes behind it, hiding its trail." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Claw = none; Dart = dart
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] audit rename: "Rampage (1/Day)" -> "Blood Trail Slip (1/Day)"
```
