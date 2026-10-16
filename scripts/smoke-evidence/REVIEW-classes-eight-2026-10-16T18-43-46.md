# Review batch — classes-eight-2026-10-16T18-43-46

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Marsh Stalker | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 2/6 |
| Tailed Shadow | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sarn Vex | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Vorgath the Sanguine | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Ashen Vestal March | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Sibyl Marrowgate | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 3/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Grave Oath | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Duskveil Whisperblade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/7 |
| Taiga Pack Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Sootkey Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Mazeherd Reaver | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Last Shield | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Verren Duskwhisk | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 65% (51/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / reader: 1



---

## Taiga Pack Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Taiga Pack Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Taiga Pack Wolf

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

Pack Tactics. The pack wolf has Advantage on an attack roll against a creature if at least one of the pack wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The pack wolf makes two Bite attacks. It can replace one attack with a use of Menacing Howl.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Menacing Howl. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the pack wolf's next turn. If the target was already Frightened by this ability, it also takes 13 (3d8) Psychic damage.

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
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis
- Actions/Menacing Howl — library seed escalating-dread

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "dire wolf that hunts in a pack…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Beast themes=bestial mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack hunting tactics [behavior] | darting hit-and-run attacks [behavior] | thick hide and powerful jaws [body]
[concept] identity: The dire wolf opens by circling with its pack, each wolf darting in to snap at hamstrings and flanks before retreating out of reach; every round it repeats this hit-and-run rhythm, relying on pack tactics to flank and drag down prey through cumulative bleeding bites. Under pressure it does not fight to the death alone — a bloodied dire wolf withdraws just far enough to let its packmates close, then surges back in when the prey turns.
[concept] lore: These dire wolves are the apex predators of deep taiga and frozen badlands, where their packs run down elk, bear, and lone travelers with relentless, coordinated patience.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the pack wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the pack wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] extraction: 4 of 8 model clauses quote nothing the user typed and leave the record ("darting in to snap at hamstrings and flanks before retreating out of reach", "cumulative bleeding bites", "apex predators of deep taiga and frozen badlands", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf feints at one foe, then darts low past it to snap at a different enemy in the same pack-sweep. The bitten target's leg is left torn and buckling, so if it tries to move or flee that same turn, the wound rips open again and it staggers. The wolf must have a packmate already engaging one of the two foes for the feint to draw blood." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: feint-slip, affliction, pounce, rampage — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The wolf feints at one foe, then darts low past it to snap at a different enemy in the same pack-sweep. The bitten target's leg is left torn and buckling, so if it tries to move or flee that same turn, the wound rips open again and it staggers. The wolf must have a packmate already engaging one of the two foes for the feint to draw blood." [rider/on_hit/damage] — the model found no template that holds it (offered: focus, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage, feint-slip, lure, riposte)
[reskin] fallback respects the call: focus, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a dire wolf that hunts in a pack" heads on the Dire Wolf and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Creeping Dread" EV 8.8 vs floor 6.2 (one attack of 2) — dice 6 → 13
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any creature the wolf has already bitten cannot simply turn its back on the pack: the torn flank throbs as a scent-marker, and the wolf and its packmates can track and close on that prey through the thickest taiga cover without slowing. The wound also refuses to close while the pack keeps the pressure on, bleeding the hunted creature for as long as it stays within the pack's reach." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Any creature the wolf has already bitten cannot simply turn its back on the pack: the torn flank throbs as a scent-marker, and the wolf and its packmates can track and close on that prey through the thickest taiga cover without slowing. The wound also refuses to close while the pack keeps the pressure on, bleeding the hunted creature for as long as it stays within the pack's reach." [trait/always/damage] — the model picked "relentless-pursuit" (no verb, and it quotes nothing the GM typed) over a concept-verb template (faultless-tracker)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] audit rename: "Creeping Dread" -> "Menacing Howl"
```


---

## Grave Oath — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave Oath | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Consecrated Blade); nova none; dmg 54

```
Grave Oath

Medium Humanoid, Lawful Good

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

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the grave oath, the grave oath and its allies have Advantage on attack rolls and saving throws, provided the grave oath doesn't have the Incapacitated condition.

Actions

Multiattack. The grave oath makes three attacks, using Consecrated Blade or Oathbow in any combination. It can replace one attack with a use of Debt of Ruin.

Consecrated Blade. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Oathbow. Ranged Attack Roll: +5, range 150/600 ft. 15 (3d8 + 2) Piercing damage.

Debt of Ruin. Charisma Saving Throw: DC 15, one creature within 60 feet. Failure: The target is cursed until the end of the grave oath's next turn. The first time the cursed target deals damage to any creature before then, it takes 18 (4d8) Necrotic damage. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). The grave oath touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). The grave oath charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

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
- Actions/Consecrated Blade — weapon longsword
- Actions/Oathbow — weapon longbow
- Actions/Debt of Ruin — library seed curse-debt
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites the unclean and mends her soldier")
[concept] resolve: archetype=defender type=Humanoid themes=grave/armed mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: smiting the unclean with radiant oath-light [behavior] | mending her soldiers with grave-bound vows [behavior] | the aura of command that steadies her line [aura]
[concept] identity: The Oathsworn Crusader opens battle by striding into the thickest press, her parry turning the first blade even as she calls down a smite on the nearest unclean foe. Every round thereafter she alternates—one smite, one word of mending for a bloodied soldier, keeping her line upright through sheer stubborn will. She does not flee when bloodied; she fights to the death, because a broken oath is worse than a broken body.
[concept] lore: She swore her oath over the graves of her first command, and the grave itself answered: she rises each dawn bound to the fallen under her banner, her blade burning with the light of vows that will not release her.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "the grave oath" — the call's own answer (kind), built from the name
[reskin] inline form: "the grave oath" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (descriptive) | "mends her soldiers" -> has (descriptive)
[reskin] extraction: 3 of 7 model clauses quote nothing the user typed and leave the record ("the grave itself answered", "does not flee when bloodied", "fights to the death")
[reskin] signature idea (action): "The grave oath's weapon flares with the light of her sworn words, and the strike she lands against a wounded or corrupted foe carries that radiance into the wound, burning back the unclean and mending the nearest ally under her banner at the same time. The brighter the oath-light, the harder it is to escape: a creature touched by the first flare is marked, and her next strike against that marked f" [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The grave oath's weapon flares with the light of her sworn words, and the strike she lands against a wounded or corrupted foe carries that radiance into the wound, burning back the unclean and mending the nearest ally under her banner at the same time. The brighter the oath-light, the harder it is to escape: a creature touched by the first flare is marked, and her next strike against that marked f" [rider/on_hit/damage] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, aggro-curse, reveal, disarm, curse-debt)
[reskin] fallback respects the call: coating (already on the sheet), rally left the shelf — the call declined them for this sheet
[reskin] value check: "Debt of Ruin" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the grave oath strikes down a foe, the oath-light lingers in the air around her, wrapping her and any ally who stands within her banner's ring in the same stubborn vow she made over her first command: wounds close over, fear loosens its grip, and the fallen who have not yet quit the fight steady themselves enough to rise again." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-burst, resonant-body, truth-aura — the key word does not mean the mechanic here
[reskin] trait declined: "False Appearance" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Consecrated Blade = Longsword; Oathbow = Longbow
[reskin] weapon declared: "Oathbow" is a longbow — the call's own answer (the name alone read bow)
[reskin] weapon table: "Oathbow" rolls Dexterity — +8 → +5
[reskin] weapon table: "Oathbow" damage off Dexterity — 18 (3d8 + 5) → 15 (3d8 + 2)
[reskin] weapon table: "Oathbow" — a launcher, never thrown, range 150/600
[reskin] multiattack replacement clause: It can replace one attack with a use of Debt of Ruin.
audit finding below confidence gate: Aura of Authority The aura benefits 'the grave oath and its allies' inside the emanation, but the emanation is described as originating from the creature with no statement that the creature itself is within it or excluded, so it is unclear whether the grave oath can benefit from its own aura while not inside its area.
[reskin] audit rewrite blocked — "Aura of Authority" is engine-authored chassis text
```


---

## Sarn Vex — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn Vex | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sarn Vex
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
Second Wind (2/Day). As a bonus action, Sarn regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Sarn misses it with a melee attack roll, Sarn makes one Longsword attack against that creature.

Actions
Multiattack: Sarn makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Sarn's next turn.
Shield Bash: One creature within 5 feet that Sarn can see must make a DC 14 Strength saving throw. On a failed save, the target takes 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
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
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash that shoves and staggers [behavior] | longsword blade work [object] | disciplined shield-wall hold [behavior]
[concept] identity: The veteran opens by advancing behind a high-guard buckler, using Shield Bash to knock a charging or flanking foe prone, then punishes that opening with a longsword cut. Each round he holds a chokepoint or protects an ally, alternating between measured blade strikes and buckler bashes that shove enemies back, daze them, or set up free swipes. He never breaks — disciplined and mocking under pressure, he focuses the most reckless attacker, punishing mistakes until he is the last one standing.
[concept] lore: A career soldier who held a bridge alone for a day and now sells that same unbroken line to any warlord with coin, or guards the vault of a cabal that cannot afford to see him fail.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Sarn" — the call's own answer (person), built from the name
[reskin] inline form: "Sarn" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When Sarn hits a creature with his longsword, he can twist the blade to leave a biting notch that saps the target's guard, making the next attack against that creature more likely to land. The mark lasts until the start of Sarn's next turn or until the creature is hit by an attack." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] fit declined: "Notching Twist" — a print body takes only what the user's words ask; the call quoted "twist the blade to leave a biting notch", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.6 vs floor 9.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever Sarn takes damage from a creature within his reach, he can immediately shift his buckler to create an opening, gaining a brief edge against that attacker. This reflects his disciplined, opportunistic defense." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Whenever Sarn takes damage from a creature within his reach, he can immediately shift his buckler to create an opening, gaining a brief edge against that attacker. This reflects his disciplined, opportunistic defense." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Black Marsh Stalker — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Marsh Stalker | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | FAIL: name-mechanic |

- gates · soft · ko-at-will: Actions/Pressure Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- reader · fail · name-mechanic: Bonus Actions/Stillwater Grip: the name promises the Grappled condition the text lacks
- read: def 3 / off 5 → 4; sustained 34 (2 × Pressure Strike); nova none; dmg 34

```
Black Marsh Stalker

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

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

Hold Breath. The marsh stalker can hold its breath for 15 minutes.

Shadow Flow. The marsh stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The marsh stalker makes two attacks, using Pressure Strike or Bone Dart in any combination.

Pressure Strike. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the marsh stalker's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the marsh stalker's next turn.

Bone Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The marsh stalker takes the Dash or Disengage action.

Stillwater Grip (2/Day). The marsh stalker has Advantage on the next attack roll it makes before the end of its turn.

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
- Traits/Shadow Flow — the chassis
- Actions/Multiattack — the chassis
- Actions/Pressure Strike — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Bone Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Stillwater Grip — template focus; library draw (seed unstamped); binds the GM's words: focus

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "lizardfolk monk who strikes pressure poi…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=venomous/uncanny mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-hand pressure-point strikes [behavior] | stalking dart-in-and-out footwork [behavior] | scaled hide and knotted tendon [body]
[concept] identity: The pressure-point stalker opens by shadowing a marked prey from the edge of the fight, then darts in on a spring of tendon and scaled hide to land a single open-hand strike that locks a joint or stutters a lung. Every round it flows between two foes, forcing the party to split attention while it reads their breathing for the next opening, and when bloodied it does not retreat — it simply kills the slowest target first.
[concept] lore: A lizardfolk ascetic from the drowned temples of the black marsh, it believes every creature's death is already written in the knots of its flesh and has taken up the open hand to write those endings faster.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Pressure Strike); Patient Defense yielded to print's row cap 4
[reskin] inline declared: "the marsh stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the marsh stalker" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stalker picks one foe at the start of the fight and shadows them from the edge, reading their breathing and footwork. It may lurk out of reach, and the moment that marked prey is distracted, staggered, or standing still, the stalker closes the distance in a single unseen burst and lands one open-hand strike straight into a knot of flesh before flowing back out of reach. The focus cannot be swa" [bonus_action/always/movement] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] word match declined by the call: riposte, patient-defense, aggro-curse, self-invisibility, ground-burst, spew, thrown-burst-seed, delayed-brand, bolt-mark, rampage, second-wind, feint-slip, coating — the key word does not mean the mechanic here
[reskin] value check: "Stillwater Grip (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Stillwater Grip (2/Day)" ("the stalker shadows its marked prey and, the moment that prey is distracted or s [verb: focus:idea]")
[reskin] signature idea (trait): "Knotted tendon and scaled hide let the stalker load and release its whole body like a drawn bow, so the long stalking approach ends in one explosive bound that carries it past reach and into striking distance before the prey can answer. Its limbs stay loose while it reads the fight, making it very hard to catch flat-footed in the open" [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: assassinate, faultless-tracker, relentless-pursuit, evasion — the key word does not mean the mechanic here
[reskin] trait declined: "Draught-Bow Guard" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Pressure Strike = none; Bone Dart = none
[reskin] weapon table: "Bone Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Tailed Shadow — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tailed Shadow | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Tailed Shadow

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

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

Assassinate. During the first round of each combat, the shadow has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadow hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Stalker. The shadow ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The shadow makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shadow takes the Dash, Disengage, or Hide action.

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
- Actions/Shortsword — print's row, renamed; weapon shortsword
- Actions/Hand Crossbow — print's own row, renamed; weapon dagger
- Bonus Actions/Cunning Action — the chassis

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] name: provided_name rejected — "tiefling rogue who stalks the rooftops o…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/terror mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stalking the rooftops [behavior] | vanishing into shadow [behavior] | infernal heritage [body]
[concept] identity: The tiefling rogue opens from a rooftop with a thrown blade, then vanishes into the shadows between chimney stacks to reposition and strike again from hiding. Each round it alternates between a precise sneak attack with advantage and a shadow-step retreat, using the old quarter's verticality to stay one step ahead. It toys with prey it can isolate but flees without hesitation when bloodied or cornered, preferring to fight another night.
[concept] lore: Born of a forgotten infernal pact in the old quarter's slums, this tiefling rogue now claims the rooftops as its hunting ground, stealing from those who once wronged its family and leaving only whispers of a tailed shadow.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] inline declared: "the shadow" — the call's own answer (kind), built from the name; the rules would have said "Shadow"
[reskin] inline on kit rows: "Shadow" -> "the shadow"
[reskin] inline form: "the shadow" — the model's own reading of the name
[reskin] damage type by the row's own noun: "Blade" Piercing -> Slashing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shadow chooses a creature it can see and makes it its prey. From then on, while stalking that creature, the shadow can move across walls and rooftops without slowing, and it can shadow its prey even through dense alleys, and it always knows exactly where the prey is and how to corner it. The hunt ends only when the prey is dead or the shadow is bloodied, at which point the shadow breaks off an" [bonus_action/always/movement] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The shadow chooses a creature it can see and makes it its prey. From then on, while stalking that creature, the shadow can move across walls and rooftops without slowing, and it can shadow its prey even through dense alleys, and it always knows exactly where the prey is and how to corner it. The hunt ends only when the prey is dead or the shadow is bloodied, at which point the shadow breaks off an" [bonus_action/always/movement] — the model found no template that holds it (offered: focus, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, feint-slip, coating, bolt-mark)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The shadow's infernal heritage lets it slip through shadows. As long as it is in dim light or darkness, it can hide even when someone is looking straight at it, and it can move from shadow to shadow without being seen. When it strikes from hiding, its attack carries a whisper of hellfire that makes the wound burn and refuse to close." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The shadow's infernal heritage lets it slip through shadows. As long as it is in dim light or darkness, it can hide even when someone is looking straight at it, and it can move from shadow to shadow without being seen. When it strikes from hiding, its attack carries a whisper of hellfire that makes the wound burn and refuse to close." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] concept-first trait skipped: faultless-tracker — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Blade = shortsword; Thrown Blade = dagger
[reskin] weapon declared: "Blade" is a shortsword — the call's own answer (the name alone read longsword)
[reskin] weapon declared: "Thrown Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Thrown Blade" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Blade" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Thrown Blade" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Quarry" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, the shadow has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadow hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Quarry: The shadow knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Sibyl Marrowgate — one marked soft

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sibyl Marrowgate | 6 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Slam
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Slam); nova none; dmg 36

```
Sibyl Marrowgate

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

Multiattack. Sibyl makes three Slam attacks. It can replace one attack with a use of Fateful Bind.

Slam. Melee Attack Roll: +6 reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. Sibyl casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fateful Bind. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of Sibyl's next turn.

Bonus Actions

Misty Step (3/Day). Sibyl casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: Sibyl is hit by an attack roll. Response: Sibyl casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
- Actions/Slam — weapon crossbow
- Actions/Spellcasting — print's own row
- Actions/Fateful Bind — library seed snare-bolt
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=teleport — caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where you struck — steps away after every attack [behavior] | court wizard's arcane bolts and battle-spells [behavior] | body made of layered shadow and afterimage [body]
[concept] identity: The Court Wizard opens from a prepared position, laying down a suppressing spell or a bolt of force from behind a pillar or veil; every round after, it attacks and then immediately steps sideways out of the space it just occupied, so that melee retaliation strikes only afterimages and empty air. It does not flee — it is not in danger — but if truly cornered or bloodied it will burn its highest slot to teleport free rather than die in place, treating the whole court as its escape route.
[concept] lore: A wizard who served too many kings and learned that the only reliable spell is the one that keeps you off the map; it haunts the palace corridors it once advised, collecting court secrets and trading them for safe passage.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — name "Force Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Force Bolt" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Sibyl" — the call's own answer (person), built from the name
[reskin] inline form: "Sibyl" — the model's own reading of the name
[reskin] energy withheld on a base row: "Force Bolt" Force -> Piercing (the row's own noun; a Humanoid deals no Force its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("opens from a prepared position, laying down a suppressing spell or a bolt of force from behind a pillar or veil")
[reskin] signature idea (action): "Sibyl marks a spot within her reach and leaves a mirror-double of layered shadow standing there. The double lasts until the start of her next turn, occupying her old space and mimicking her movements; when an enemy attacks it or steps within reach of it, the double bursts into blinding afterimages, leaving the attacker preoccupied and exposed to the next real strike from Sibyl or her allies." [action/once_per_fight/condition] — menu: thrown-burst, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: gaze-single, delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] word match declined by the call: phase-slip, reveal, thrown-burst, ground-burst, sensory-strike, thrown-burst-seed, delayed-brand, aggro-curse, bolt-mark, zone-seed, blighted-ground, wind-up — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown phase-slip, which the GM's words keyed
[reskin] key match declined: action — "phase-slip" was ranked first on the call's own menu for step, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Sibyl marks a spot within her reach and leaves a mirror-double of layered shadow standing there. The double lasts until the start of her next turn, occupying her old space and mimicking her movements; when an enemy attacks it or steps within reach of it, the double bursts into blinding afterimages, leaving the attacker preoccupied and exposed to the next real strike from Sibyl or her allies." [action/once_per_fight/condition] — the model found no template that holds it (offered: phase-slip, thrown-burst, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand, aggro-curse, bolt-mark)
[reskin] fallback respects the call: phase-slip, sensory-strike, delayed-brand, aggro-curse left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a court wizard who is never where you struck and steps away" heads on the Mage and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Binding Lash" EV 7.7 vs floor 7.3 (one attack of 3) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Sibyl moves at least a short distance from where she was, she dissolves into layered shadows that slip through cracks and around corners, leaving a false afterimage in the space she just left. Foes who chase her must strike the image first, wasting their effort while the real Sibyl is already elsewhere." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever Sibyl moves at least a short distance from where she was, she dissolves into layered shadows that slip through cracks and around corners, leaving a false afterimage in the space she just left. Foes who chase her must strike the image first, wasting their effort while the real Sibyl is already elsewhere." [trait/always/movement] — the model found no template that holds it (offered: evasion, false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] concept-first trait skipped: evasion — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Force Bolt = none
[reskin] weapon table: "Force Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "Common plus any three languages" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] ranged row narrowed, not removed: "Force Bolt" is the only attack on the sheet — the Mage carries no ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Force Bolt" -> "Slam" — bolt is a ranged noun on a melee row
[reskin] rename propagated: "Force Bolt" -> "Slam" in "Multiattack"
[reskin] attack name by anatomy: "Slam" -> "Slam" — a slam deals Bludgeoning, not Piercing
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Binding Lash.
[reskin] audit rename: "Binding Lash" -> "Fateful Bind"
```


---

## Sootkey Imp — bands soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sootkey Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Sootkey Imp

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

Magic Resistance. The imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The imp takes the Disengage or Hide action.

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
- Actions/Sting — print's row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/uncanny mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: lockpicking for a devil [behavior] | shadowy, soot-stained body [body] | silent, vanishing strikes [behavior]
[concept] identity: This imp rogue opens from the shadows, picking the lock on its target's guard with a silent blade before the victim ever sees it, then flits away on soot-stained wings to vanish into any shadow or crack. Every round it strikes with advantage from hiding, using its tiny size and infernal cunning to stay one step ahead of retaliation. When bloodied, it does not fight to the death; it flees through the smallest opening, its devil-pact compelling it to survive and report back.
[concept] lore: Born in the lock-vaults of a archdevil's treasury, this imp trades its lockpicking talents for souls, slipping through keyholes and wards to steal secrets and lives alike.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] inline declared: "the imp" — the call's own answer (kind), built from the name
[reskin] inline form: "the imp" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "With a silent twist of its blades, the imp picks the lock on its victim's guard, leaving them wide open to the next strike. The wound itself becomes a keyhole that the imp can exploit. Until the end of the imp's next turn, the first attack it makes against that creature has advantage." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: focus, affliction, disarm — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "With a silent twist of its blades, the imp picks the lock on its victim's guard, leaving them wide open to the next strike. The wound itself becomes a keyhole that the imp can exploit. Until the end of the imp's next turn, the first attack it makes against that creature has advantage." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, disarm, rampage, focus, riposte)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.5 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Soot and shadow cling to the imp like a second skin, letting it fold into any dark nook or crevice and become nearly invisible. While in dim light or darkness, the imp can hide even when only lightly obscured, and it leaves no trace of its passage." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: spider-climb, terrain-walk, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Soot and shadow cling to the imp like a second skin, letting it fold into any dark nook or crevice and become nearly invisible. While in dim light or darkness, the imp can hide even when only lightly obscured, and it leaves no trace of its passage." [trait/always/defense] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Lockpick = none
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Lockpick" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Soot Step" is the seat's, not the Imp's
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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Formal Challenge. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of Dame Oriel's next turn, the target has Disadvantage on attack rolls against creatures other than Dame Oriel.

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
- Bonus Actions/Formal Challenge — template aggro-curse; library draw (seed unstamped); binds the GM's words: challenge+duel

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: quote not found in the input ("holds the line") | defender-leader: ✓ ("keeps the line") | defender-leader -> defender: the concept's VERB outranks the noun (key "keeps the line", class verb) | defender: key "keeps the line" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: holds the line with shield and longsword [behavior] | punishes anyone who moves past her [behavior] | iron shield and longsword [object]
[concept] identity: Dame Oriel opens by planting her shield and issuing a formal challenge, forcing enemies to deal with her before they can reach anyone else. Every round she holds a readied longsword against the first creature that tries to slip past her reach, answering the attempt with a punishing cut. She fights to the death without breaking formation, and the more blood she sheds, the more deliberately she anchors herself in the doorway or pass she has chosen to defend.
[concept] lore: A veteran of a collapsed knightly order, Dame Oriel still guards a bridge that no longer leads anywhere, demanding that trespassers yield or face her steel.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Thrown Shield" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical)
[reskin] signature idea (action): "Dame Oriel plants her shield and issues a single formal challenge across the battlefield, calling out one foe by deed and bearing. Until that duel is settled one way or the other, every other enemy who tries to walk past her toward her allies finds her longsword already waiting at the gap, and she will not so much as turn her shield away from the challenged until the matter is closed." [action/once_per_fight/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] value check: "Formal Challenge" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Formal Challenge" ("A formal challenge to one foe, forcing that duel and punishing others — the chal [verb: challenge:idea, duel:idea]")
[reskin] signature idea (trait): "Dame Oriel does not break the line she has drawn. As long as she stands her ground and has not given an inch of it, any blow that lands on her is answered by a scrape of longsword off shield rim, letting her immediately step back into the guard she was holding before the hit arrived." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "Dame Oriel does not break the line she has drawn. As long as she stands her ground and has not given an inch of it, any blow that lands on her is answered by a scrape of longsword off shield rim, letting her immediately step back into the guard she was holding before the hit arrived." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Longsword = longsword; Thrown Shield = none
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---

## Vorgath the Sanguine — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vorgath the Sanguine | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Vorgath the Sanguine

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

Berserk. Whenever Vorgath starts its turn Bloodied, roll 1d6. On a 6, Vorgath goes berserk. On each of its turns while berserk, Vorgath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Vorgath attacks an object. Once Vorgath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Vorgath has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Vorgath extra movement, and Vorgath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Vorgath makes two attacks, using Greataxe or Hurlaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Blood-Fed Fury (2/Day). Vorgath charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Slashing damage.

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
- Actions/Hurlaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Blood-Fed Fury — template coating; library draw (seed unstamped); binds the GM's words: ignite

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rage triggered by injury [behavior] | massive greataxe [object] | goliath stone-hardened flesh [body]
[concept] identity: It wades into a fight with a greataxe and no finesse, swinging until something draws blood — and once it does, it stops aiming entirely and simply rages. After that every round is the same: reckless, brutal blows with no self-preservation, trying to kill whatever made it bleed before its own body gives out. It never flees and never yields; a wound flips it from a soldier into a berserker that fights until it drops.
[concept] lore: A goliath outcast from the high passes, kicked from its tribe for the very rage that made it a champion, it now seeks war camps and gladiator pits where the broken can bleed in peace.
[reskin] donor: brute-5 -> CR 8
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Vorgath" — the call's own answer (person), built from the name
[reskin] inline form: "Vorgath" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no finesse" quotes nothing the user typed
[reskin] lacks refused: "no self-preservation" quotes nothing the user typed
[reskin] lacks refused: "never flees" quotes nothing the user typed
[reskin] lacks refused: "never yields" quotes nothing the user typed
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] signature idea (action): "When Vorgath's greataxe bites into a living thing, the wound it opens answers back — the spilled blood ignites the same frenzy that already rules it, and for a short while afterward every swing it takes comes faster and harder, as if the axe itself is feeding. It can only be stoked once at a time; fresh blood on an already-burning rage adds nothing." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: affliction, rampage, drain, rally, own-turn-punisher — the key word does not mean the mechanic here
[reskin] value check: "Blood-Fed Fury (2/Day)" EV 7.7 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: coating -> Bonus Actions/"Blood-Fed Fury (2/Day)" ("When the greataxe wounds a living thing, the spilled blood ignites Vorgath's fre [verb: ignite:idea]")
[reskin] signature idea (trait): "Whenever Vorgath is wounded, its grip on the axe tightens instead of loosening. For the rest of the fight the axe hits harder and wider — the greataxe sweeping in an arc that catches anyone pressed close to it, not just the one it aimed at. The bigger the wound, the more the thing in its hands becomes less a weapon and more a weather event." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] word match declined by the call: bloodied-fury, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for wounded, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Whenever Vorgath is wounded, its grip on the axe tightens instead of loosening. For the rest of the fight the axe hits harder and wider — the greataxe sweeping in an arc that catches anyone pressed close to it, not just the one it aimed at. The bigger the wound, the more the thing in its hands becomes less a weapon and more a weather event." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, heated-body, absorption, resonant-body, weapon-lodge, adhesive)
[reskin] weapons answered: Greataxe = greataxe; Hurlaxe = handaxe
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] on-hit extra retyped: "Blood-Fed Fury (2/Day)" adds Slashing, not Bludgeoning — the hit's own type (Greataxe)
[reskin] species kit: Huge -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Greataxe" reach 10 -> 5 ft. — reach follows the goliath's size
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

Radiant Flame. Ranged Attack Roll: +3, range 60 ft. 18 (4d8) Radiant damage.

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
- Actions/Mace — print's row, renamed; weapon mace
- Actions/Radiant Flame — print's own row, renamed; weapon crossbow
- Actions/Spellcasting — print's own row
- Bonus Actions/Bolstering Cry — library seed rally; the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawnlight [aura] | radiant mace strikes [object] | planting herself to protect the line [behavior]
[concept] identity: Vareth Solmane opens by raising her iron mace and chanting a battlefield benediction that bathes her allies in dawnlight, then commits to melee where each strike carries a pulse of radiant judgment. She fights as a shield for her soldiers, positioning to keep her blessing aura on as many as possible and spending herself to heal the line under pressure. Bloodied, she does not flee — she plants her feet, deepens her prayer, and dares the enemy to break the faithful first.
[concept] lore: A templar of the Dawnfather's militant order, Vareth Solmane walks the front lines to prove that a blessing spoken under fire is worth ten spoken in a chapel.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first and keys STR 16 over DEX 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain defender line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Dawn Bolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Dawn Bolt" Radiant -> Piercing (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (descriptive)
[reskin] signature idea (action): "Vareth plants her feet, raises her mace high, and invokes the Dawnfather's judgment on a foe she can see. Until she moves from that spot or is overwhelmed, her strikes against that foe carry the weight of her prayer — the longer she holds the line beside her soldiers, the more certain her judgment becomes." [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] fit declined: "Dawnfather's Judgment" — a print body takes only what the user's words ask; the call quoted "invokes the Dawnfather's judgment on a foe she can see", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Bolstering Cry (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Vareth's blessing aura keeps one of her allies standing, a sliver of that survival flows back into her — the line holds because she holds, and the line holds her up in turn. When she drops to her bloodied last, the prayer deepens and refuses to let her fall while her soldiers still fight." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: warded-mending, bloodied-fury, bloodied-burst, guarded-stance, undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever Vareth's blessing aura keeps one of her allies standing, a sliver of that survival flows back into her — the line holds because she holds, and the line holds her up in turn. When she drops to her bloodied last, the prayer deepens and refuses to let her fall while her soldiers still fight." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, warded-mending, bloodied-burst)
[reskin] weapons answered: Iron Mace = mace; Dawn Bolt = none
[reskin] weapon table: "Dawn Bolt" rolls Dexterity — +7 → +3
[reskin] weapon table: "Dawn Bolt" damage off Dexterity — 22 (4d8 + 4) → 18 (4d8)
[reskin] weapon table: "Dawn Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon alignment: Neutral Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Iron Mace" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Dawn Bolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] row binds its clause: "Bolstering Cry" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Bolstering Cry (2/Day) The generic name does not fit Vareth's divine guardian concept, reducing table recognizability.
[reskin] audit rename blocked — "Radiant Flame" is the user's own part name, a kit feature's real name, or print's own row
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
provenance: none — the call wrote the text itself
```


---

## Ashen Vestal March — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Vestal March | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Ashen Vestal March

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

Multiattack. The vestal march makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vestal march's next turn.

Bonus Actions

Ashen Retort. One creature within 5 feet that hit the vestal march with an attack roll since the end of the vestal march's last turn takes 6 (1d12) Bludgeoning damage.

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
- Bonus Actions/Ashen Retort — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: unbreakable shield wall [behavior] | mage-founder and mace [object] | zealot's refusal to yield [behavior]
[concept] identity: The Templar opens by planting his shield and letting the first fool close, answering with a mace blow that rattles teeth and a shove that resets the line. Every round after, he holds his square—walking only to body-block the squishiest ally, punishing any enemy that tries to slip past with an immediate, bone-deep strike. He does not rage and he does not flee; bloodied, he only plants his feet wider, because his god's only miracle is the next swing.
[concept] lore: He is a veteran of a militant order that disavows all sorcery, sworn to hold the door while the faithful escape; he wants nothing more than to die on the line he was given.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Ashen Vestal March = imagery
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline declared: "the vestal march" — the call's own answer (kind), built from the name
[reskin] inline form: "the vestal march" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "The vestal march plants his shield and becomes a living wall: until he moves or is knocked off his spot, enemies who try to walk past him through the space he guards are stopped cold and take a heavy mace blow across the back for their trouble, and the ally he stands beside cannot be reached around him. He can only hold this stance while his feet are planted; if he moves, the wall comes down until" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The vestal march plants his shield and becomes a living wall: until he moves or is knocked off his spot, enemies who try to walk past him through the space he guards are stopped cold and take a heavy mace blow across the back for their trouble, and the ally he stands beside cannot be reached around him. He can only hold this stance while his feet are planted; if he moves, the wall comes down until" [action/always/movement] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The order's founder forswore all magic, so sorcery simply does not find purchase on him: spells and magical effects aimed at him or his square fizzle against his scarred shield, and he never registers as a valid target to a caster's magic. His god grants no miracles, only the next swing." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: shielded-mind, sealed-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The order's founder forswore all magic, so sorcery simply does not find purchase on him: spells and magical effects aimed at him or his square fizzle against his scarred shield, and he never registers as a valid target to a caster's magic. His god grants no miracles, only the next swing." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Heavy Crossbow = heavy crossbow
[reskin] weapon table: "Heavy Crossbow" rolls Dexterity — +6 → +2
[reskin] weapon table: "Heavy Crossbow" damage off Dexterity — 13 (2d8 + 4) → 9 (2d8)
[reskin] weapon table: "Heavy Crossbow" — a launcher, never thrown, range 100/400
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Heavy Crossbow" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] audit rename blocked — "Radiant Flame" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit rename: "Answering Sting" -> "Ashen Retort"
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Radiant Flame" leaves — a magical attack is magic too ("no magic at all")
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

```
Thurivald
Medium humanoid, chaotic neutral
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

Aura of Authority. While within 10 feet of Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with Hurlspear. It can replace one attack with a use of Warden's Rebuke.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Hurlspear: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Warden's Rebuke: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Wisdom saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Hurlspear — weapon spear
- Actions/Warden's Rebuke — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/voice mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the skald's war-song that turns allies into a fury [behavior] | iron voice and iron weapon [body] | his banner-staff and spear [object]
[concept] identity: Thurivald opens by planting his standard and raising a war-song, turning his warband into a shrieking wall of iron. Each round he parries the first blade that reaches him, then answers with a spear-thrust while his song punishes any ally who falters. He fights to the death as long as his song holds, and if his voice is broken he seeks a new war to make a new one.
[concept] lore: Thurivald was a prisoner of war who sang his captors into a mutiny, and now he wanders the borderlands turning any armed band into a warband that sings his name.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] extraction: 2 of 10 model clauses quote nothing the user typed and leave the record ("parries the first blade that reaches him", "answers with a spear-thrust")
[reskin] signature idea (action): "Thurivald's war-song rises to a shriek, and every ally who can hear him fights past death itself for a moment: any of his allies within earshot who drops to the ground instead stays standing and keeps acting, driven by the song, until the song itself ends or they are struck down a second time. When the last of them falls silent, so does the verse." [action/always/defense] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald's war-song rises to a shriek, and every ally who can hear him fights past death itself for a moment: any of his allies within earshot who drops to the ground instead stays standing and keeps acting, driven by the song, until the song itself ends or they are struck down a second time. When the last of them falls silent, so does the verse." [action/always/defense] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter)
[reskin] fallback respects the call: terror-pulse left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's voice is iron: whenever a foe lands a blow on him, the wound does not slow the song, and the next ally who strikes that same foe fights with the fury the song demands. The song answers every blow against him with a sharper edge for his warband." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] trait declined: "Iron Dirge" — bound only on the idea's own words (iron:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Spear = spear; Hurlspear = spear
[reskin] weapon table: "Hurlspear" — thrown, range 20/60
[reskin] languages by mind: "Common, two other languages" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] audit rename: "Opportunist's Lash" -> "Warden's Rebuke"
[reskin] audit rename blocked — "Captain's Charm" is the user's own part name, a kit feature's real name, or print's own row
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Duskveil Whisperblade — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Duskveil Whisperblade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 3 / off 5 → 4; sustained 34 (2 × Duskfang); nova none; dmg 34

```
Duskveil Whisperblade

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

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

Evasion. If the whisperblade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the whisperblade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the whisperblade has Advantage on attack rolls against any creature that hasn't taken a turn. If the whisperblade hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow Step. The whisperblade ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The whisperblade makes two attacks, using Duskfang or Shuriken Volley in any combination.

Duskfang. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken Volley. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The whisperblade takes the Dash, Disengage, or Hide action.

Bloodveil Rush (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the whisperblade moves up to half its Speed, and it makes one Duskfang attack.

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
- Traits/Assassinate — template assassinate; library draw (seed unstamped); the GM's clause "strikes unseen"; binds the GM's words: unseen
- Traits/Shadow Step — the chassis
- Actions/Multiattack — the chassis
- Actions/Duskfang — weapon dagger
- Actions/Shuriken Volley — the chassis
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Bloodveil Rush — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a ninja who moves through the shadows an") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=terror/venomous mind=sapient style=skulker energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes unseen from shadows [behavior] | poisoned blade [object] | shadow step [behavior]
[concept] identity: The Shadowblade Assassin opens by melting into darkness and striking from concealment with a poisoned blade, then uses its Cunning Action to Hide again and repeat. It fights only while unseen, flees if cornered or bloodied, and never engages in a fair fight.
[concept] lore: A killer trained in shadow arts, it haunts the dark places of the world, selling its silent blade to the highest bidder and vanishing before the body hits the ground.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — "Venomfang" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] inline declared: "the whisperblade" — the call's own answer (kind), built from the name
[reskin] inline form: "the whisperblade" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Venomfang" Poison -> Bludgeoning (the body's physical type; a Humanoid deals no Poison its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] extraction: 4 of 7 model clauses quote nothing the user typed and leave the record ("opens by melting into darkness and striking from concealment with a poisoned blade", "uses its Cunning Action to Hide again and repeat", "flees if cornered or bloodied", …)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the whisperblade strikes a foe who has not yet seen it, the wound carries a creeping shadow-venom: the victim's senses blur and their limbs grow heavy, making them clumsy and easy to ambush again. The venom only works on someone caught completely off guard; once a target knows the blade is there, the strike is just a strike." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: affliction, coating, delayed-brand, self-invisibility, feint-slip — the key word does not mean the mechanic here
[reskin] signature miss: action — "When the whisperblade strikes a foe who has not yet seen it, the wound carries a creeping shadow-venom: the victim's senses blur and their limbs grow heavy, making them clumsy and easy to ambush again. The venom only works on someone caught completely off guard; once a target knows the blade is there, the strike is just a strike." [rider/on_hit/condition] — the model picked "contagion" (no verb, and it quotes nothing the GM typed) over a concept-verb template (self-invisibility)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The whisperblade's body has been steeped in shadow until it no longer casts its own. While it is in dim light or darkness, it leaves no trace for others to follow, and any creature that tries to fix its position must do so entirely by sound or guesswork." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown assassinate, which the GM's words keyed
[reskin] key match declined: trait — "assassinate" was ranked first on the call's own menu for unseen, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The whisperblade's body has been steeped in shadow until it no longer casts its own. While it is in dim light or darkness, it leaves no trace for others to follow, and any creature that tries to fix its position must do so entirely by sound or guesswork." [trait/always/defense] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[reskin] weapons answered: Venomfang = dagger; Shuriken Volley = shuriken
[reskin] weapon declared: "Venomfang" is a dagger — the call's own answer
[reskin] weapon table: "Shuriken Volley" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] attack name by anatomy: "Venomfang" -> "Venomfang" — venomfang deals Piercing, not Bludgeoning
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Venomfang)
[reskin] row binds its clause: "Assassinate" answers "strikes unseen" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Venomfang" -> "Duskfang"
[reskin] audit rename: "Rampage (1/Day)" -> "Bloodveil Rush (1/Day)"
```


---

## Mazeherd Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mazeherd Reaver | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Bone-Cudgel); nova none; dmg 44

```
Mazeherd Reaver

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the reaver has Advantage on attack rolls and saving throws.

Actions

Multiattack. The reaver makes two Bone-Cudgel attacks.

Bone-Cudgel. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reaver moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bone-Cudgel attack.

Driving Bellow (Recharge 5-6). Wisdom Saving Throw: DC 14, each creature of the reaver's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the reaver's choice, using the safest available route.

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
- Actions/Bone-Cudgel — weapon club
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Driving Bellow — template herd; library draw (seed unstamped); the GM's clause "herds prey into the maze"; binds the GM's words: herd
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: driving prey into the maze [behavior] | bone-cudgel and goring horns [object] | the labyrinth it calls home [aura]
[concept] identity: The minotaur reaver opens by bellowing and slamming its bone-cudgel into the ground, not to kill but to startle prey toward the nearest maze-throat; every round after it advances with measured, lane-driving steps, choosing to shove and shepherd rather than slaughter. It fights to the death only when cornered in its own labyrinth, but while prey still runs it is patient, even playful — toying with a quarry that has nowhere left to go.
[concept] lore: Bred in the sunless folds of a collapsing under-maze, the reaver was set there to keep the labyrinth fed, and it has long since stopped caring whether the meat that wanders in is beast or man.
[reskin] donor: brute-5 -> CR 6
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaver" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The reaver slams its bone-cudgel into the ground and bellows at creatures ahead of it, and every creature that hears and sees it must resist being magically driven straight away from the reaver and toward the nearest wall, pit, or opening it can perceive. This is pure herding pressure: it does not work on creatures the reaver has already cornered with no path of retreat, and the same creature cann" [action/once_per_fight/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Driving Bellow" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Driving Bellow (Recharge 5-6)" ("The reaver slams its cudgel and bellows, magically driving creatures away from i [verb: herd:concept]")
[reskin] keys spent by the action: herd
[reskin] signature idea (trait): "The reaver's bone-cudgel and horns are maze-born weapons that punish anything that tries to slip past rather than face it. Whenever a creature moves away from the reaver while within its reach, the reaver may immediately sweep it with the cudgel or hook it with a horn, shoving it back toward where it came from." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The reaver's bone-cudgel and horns are maze-born weapons that punish anything that tries to slip past rather than face it. Whenever a creature moves away from the reaver while within its reach, the reaver may immediately sweep it with the cudgel or hook it with a horn, shoving it back toward where it came from." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] weapons answered: Bone-Cudgel = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Driving Bellow" answers "herds prey into the maze" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---

## Last Shield — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Shield | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Shield-Bash); nova none; dmg 52

```
Last Shield

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

Aura of Authority. While in a 10-foot Emanation originating from the last shield, the last shield and its allies have Advantage on attack rolls and saving throws, provided the last shield doesn't have the Incapacitated condition.

Actions

Multiattack. The last shield makes two attacks, using Shield-Bash or Thrown Mace in any combination.

Shield-Bash. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Thrown Mace. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 26 (5d8 + 4) Bludgeoning damage.

Bonus Actions

Oath of the Wall (2/Day). Each ally within 30 feet of the last shield gains 13 (3d8) Temporary Hit Points.

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
- Actions/Shield-Bash — the chassis
- Actions/Thrown Mace — weapon mace
- Bonus Actions/Oath of the Wall — library seed rally; the GM's clause "shields the weak"; binds the GM's words: shield+orders

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "a knight-errant of the fallen order who …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the shield planted as a line in the dirt [object] | punishing anyone who moves past it [behavior] | the weight of a broken oath carried into battle [aura]
[concept] identity: The Fallen Knight-Errant wades into a fight with its shield up, planting itself between the weak and whatever threatens them, daring the enemy to come through it. Every round it stays in reach, punishing anyone who tries to slip past with a shield-bash and a mace blow, and it never abandons the line it has drawn. It fights to the death — not from stupidity, but because breaking its oath again would cost more than death.
[concept] lore: Once a sworn shield of a knightly order that burned itself down in betrayal, this exile now walks the roads offering the protection its own name no longer earns, and it will die on any ground it has chosen to hold.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the last shield" — the call's own answer (kind), built from the name
[reskin] inline form: "the last shield" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] signature idea (action): "When a foe turns its back on the last shield to go after someone weaker, the knight punishes the cowardice instantly — a shield-bash across the shoulders and a mace blow to the knee that spoils the escape. The offender is left staggered and slowed, its retreat costing it dearly." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: shield-bash, slow-bolt, own-turn-punisher, snap-shot — the key word does not mean the mechanic here
[reskin] signature miss: action — "When a foe turns its back on the last shield to go after someone weaker, the knight punishes the cowardice instantly — a shield-bash across the shoulders and a mace blow to the knee that spoils the escape. The offender is left staggered and slowed, its retreat costing it dearly." [reaction/on_being_hit/movement] — the model picked "riposte" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally, herd)
[reskin] fallback respects the call: own-turn-punisher left the shelf — the call declined it for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The last shield can plant its shield and swear a line in the dirt. While it stands unmoving on that spot, no enemy can slip around it toward the squishy folk behind — the knight's presence alone makes the short way past into a long, painful one." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The last shield can plant its shield and swear a line in the dirt. While it stands unmoving on that spot, no enemy can slip around it toward the squishy folk behind — the knight's presence alone makes the short way past into a long, painful one." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] weapons answered: Shield-Bash = shield; Mace of Oath = mace
[reskin] row binds its clause: "Bolstering Cry" answers "shields the weak" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Aura of Authority" is engine-authored chassis text
[reskin] audit rename: "Mace of Oath" -> "Thrown Mace"
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Oath of the Wall (2/Day)"
```


---

## Verren Duskwhisk — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Verren Duskwhisk | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Claws); nova none; dmg 24

```
Verren Duskwhisk

Medium Humanoid, Chaotic Neutral

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

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Feline Grace. Verren ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Verren makes two attacks, using Claws or Dagger in any combination.

Claws. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Dagger. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. Verren takes the Dash, Disengage, or Hide action.

Feline Feint. Verren takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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

- Traits/Feline Grace — the chassis
- Actions/Multiattack — the chassis
- Actions/Claws — the chassis
- Actions/Dagger — weapon dagger
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Feline Feint — library seed feint-slip; the GM's clause "slips through the market crowd"; binds the GM's words: slip

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a tabaxi cutpurse who slips through the ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: steals from the crowd and vanishes into it [behavior] | claws and a hidden blade [object] | perfect balance and agility [body]
[concept] identity: The cutpurse shadows the market's bustle, using its Clawed Hands to lift a purse or slash a hamstring and then melting back into the crowd as a bonus action. Each round it repeats this hit-and-run, relying on its Feline Agility to Dash without provoking, and its Skulker's Ambush to strike from hiding with advantage. When bloodied, it does not flee; it panics, using its last burst of speed to shove through the crowd and vanish into a drain or alley, leaving the fight behind.
[concept] lore: A tabaxi cutpurse who learned that the fastest way to a full purse is through a crowded market, and that the crowd itself is the best hiding place.
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — name "Claws" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] inline declared: "Verren" — the call's own answer (person), built from the name; the rules would have said "Duskwhisk"
[reskin] inline on kit rows: "Duskwhisk" -> "Verren"
[reskin] inline form: "Verren" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Verren hooks a meaty claw into the target's belt, purse, or dangling chain and gives a brutal upward yank. The victim is dragged along, stumbles forward off balance, and ends up sprawled in the dirt with its coin and carried gear scattered in a little trail behind it. Verren can then immediately melt backward through the nearest knot of bodies without drawing a parting strike, using the confusion " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: hook-rider, lure — the key word does not mean the mechanic here
[reskin] signature miss: action — "Verren hooks a meaty claw into the target's belt, purse, or dangling chain and gives a brutal upward yank. The victim is dragged along, stumbles forward off balance, and ends up sprawled in the dirt with its coin and carried gear scattered in a little trail behind it. Verren can then immediately melt backward through the nearest knot of bodies without drawing a parting strike, using the confusion " [rider/on_hit/condition] — the model picked "charge-push" (no verb, and it quotes nothing the GM typed) over a concept-verb template (feint-slip)
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] value check: "Feinting Step" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: feint-slip -> Bonus Actions/"Feinting Step" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Verren's claws are shaped for cutting straps, pouches, and hamstrings, not just flesh. Whenever it rakes a foe that is already bleeding, off balance, or otherwise harried, it tears loose whatever the target is visibly carrying, wearing, or gripping — spilling the item or wrenching it away. The stolen thing lands in the chaos between them, forcing enemies to choose between pressing the attack and d" [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Verren's claws are shaped for cutting straps, pouches, and hamstrings, not just flesh. Whenever it rakes a foe that is already bleeding, off balance, or otherwise harried, it tears loose whatever the target is visibly carrying, wearing, or gripping — spilling the item or wrenching it away. The stolen thing lands in the chaos between them, forcing enemies to choose between pressing the attack and d" [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Claws = none; Dagger = dagger
[reskin] weapon table: "Dagger" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] row binds its clause: "Feinting Step" answers "slips through the market crowd" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Multiattack The phrase 'using' is missing its object and does not match the standard Attack action wording.
[reskin] audit rename: "Feinting Step" -> "Feline Feint"
```
