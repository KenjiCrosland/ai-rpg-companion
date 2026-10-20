# Review batch — twist-ten-2026-10-19T15-22-58

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbane Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Sumpcoil Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Hobgoblin Halberdier | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Hoarfrost Jarl | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Oathbound Quiver | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Bleed Den Twin | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Hollow Chime | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/7 |

**Dropped 1 of 11 user clauses** (coverage 91%); concept share 98% (42/43 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 3 → 1.5625; sustained 16 (2 × Bite); nova none; dmg 16

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

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
15
+2
+4
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

Skills Perception +5, Stealth +4

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimebound Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

- Traits/Rimebound Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack-tactics hit-and-run lunging [behavior] | chilling bite that stiffens the prey [behavior]
[concept] identity: A frost-rimed dire wolf stalks the edges of its pack's hunting ground, opening with a sudden rush that tests the weakest flank before it has committed to a kill. It fights in darting lunges — charge in, bite with jaws coated in clinging rime, then wheel away before the prey can answer, always circling back to the same wound. When bloodied it does not break; it slows and harries from a distance, letting the cold in its bite stiffen its quarry before the pack closes.
[concept] lore: Frost-rimed dire wolves are born where winter lingers too long in the high valleys, and their hides keep that season with them — they want only to run down warm-blooded prey until the cold has done most of the work.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf lunges at a foe and its jaws leave clinging rime in the wound, so the cold keeps working after the bite lands. Until that foe shakes the frost off, the wolf's next rush toward it comes faster and easier, rewarding it for circling back to the same quarry. The rime fades once the wolf turns its attention elsewhere or the prey escapes its reach." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, contagion, charge, charge-push, pounce, isolation, hook-rider, rampage — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The wolf lunges at a foe and its jaws leave clinging rime in the wound, so the cold keeps working after the bite lands. Until that foe shakes the frost off, the wolf's next rush toward it comes faster and easier, rewarding it for circling back to the same quarry. The rime fades once the wolf turns its attention elsewhere or the prey escapes its reach." [rider/on_hit/condition] — the model found no template that holds it (offered: slow-bolt, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage)
[reskin] fallback respects the call: slow-bolt, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The wolf's frost-rimed hide bleeds winter into anything that presses close against it — a creature that grapples or clings to the wolf feels the cold seep into its limbs and slow its grip. The chill lifts as soon as it lets go." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rimebound Hide" ("The frost-rimed hide deals cold damage to anything that touches it or presses cl [verb: frost:concept]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Snowstride" is the seat's, not the Dire Wolf's
audit finding below confidence gate: Bite The clause applies a condition without stating its duration; while Prone normally carries its own exit, the sentence's bare phrasing leaves the timing of the condition's onset ambiguous (it reads as an unconditional application, not contingent on the attack roll's outcome).
```


---

## Purple Worm — highest CR

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Jagged Gullet
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Jagged Gullet. Once per turn, when the purple worm is hit by a Melee attack from a creature it has swallowed, the swallowed creature takes 22 (5d8) Piercing damage from the jagged metal within.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

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
- Actions/Bite — print's own row
- Actions/Tail Stinger — print's own row
- Traits/Jagged Gullet — authored for this sheet; the GM's clause "swallowed a war-band's armoury"
- Traits/Tunneler — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey into a grinder of half-digested blades and armour [behavior] | acid-corroded steel plates lodged in its hide [body] | armoury debris and munitions lodged in its gut [object]
[concept] identity: A Purple Worm that burst up through a war-band and swallowed their armouries whole, the beast's gut now a rattling furnace of blades, mail and munitions half-dissolved into a seething acid slurry. It opens by breaching under the most heavily armed target and gulping them down, then uses every round to keep the fight inside its own throat — thrashing, constricting, and retching up a spray of acid-etched steel at anyone who backs away. When bloodied it does not flee; it digs down with prey still in its belly and drags the survivors into the collapsing tunnel after it, its trinket-choked coils grinding like an avalanche of cutlery.
[concept] lore: Born in the deep strata where battlefields are buried and forgotten, this worm learned that men are soft and their weapons are hard — so it eats both, and the armoury it swallowed makes it richer, heavier, and deadlier with every meal.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the worm swallows a creature, the armoury lodged in its gut wakes up: every blade, mail ring and munition shard grinds against the prey as the worm thrashes and constricts. This happens automatically each round the prey is inside it, and stops only if the prey tears its way free or the worm retches everything up — but the worm must spend a moment of stillness to keep the grind on, so a round " [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow, exploiter, hook-rider, fire-aura, warded-mending — the key word does not mean the mechanic here
[reskin] fit declined: "Armoury Grind" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: swallow, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The armoury it swallowed is still working its way through: on any round the worm is wounded badly, it retches up a gout of acid-etched debris that sprays over whoever stands near its front end, leaving them harried and stumbling through the slick of half-dissolved steel. This leaves the ground around it littered with wreckage, though the worm can only convulse this way so often before its gut sett" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, terrain-walk, aberrant-ground, heated-body — the key word does not mean the mechanic here
[reskin] trait declined: "Wreckage Retch" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "swallowed a war-band's armoury"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Bite = none; Acid Spray = none; Gullet Grind = none
[reskin] chassis nova: "Acid Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Acid Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] audit rename: "Swallowed Armoury" -> "Jagged Gullet"
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---

## Silverbane Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbane Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Silvered Wounds
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Silverbane Troll

Large Giant, Chaotic Evil

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

Silvered Wounds. Once per turn, when the troll is hit by a slashing or piercing weapon, If the weapon was not silvered, the wound closes at once and the troll regains 11 (2d10) Hit Points.

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes damage from a silvered weapon, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's own row, renamed
- Traits/Silvered Wounds — authored for this sheet; the GM's clause "grows back unless the blade was silvered"
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("a troll that grows back unless the blade") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] name: provided_name rejected — "the troll that grows back unless the bla…" is the description, not a name
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Giant themes=bestial/grave mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that knit shut unless silvered [behavior] | thick hide body that shrugs off iron [body] | brutal grappling and clawed weight [behavior]
[concept] identity: The silverbane troll is a hide-hided giant that bull-rushes the nearest blade-wielder, soaking blows on purpose to find which steel can actually hurt it. Every round it leans into the wound, shoving its rank breath and clawed weight at the attacker while its sundered flesh knits shut behind each strike; a brute made of raw hide and raw stubbornness. Against plain iron it grows confident and cruel, toying with prey it knows cannot finish it — but once silver bites and stays, it goes berserk, fighting to the death and dragging its killer down with it.
[concept] lore: These trolls are bred in the deep hollows where old silver mines collapse, and they carry that buried grudge — they fear and loathe silvered blades and will tear through anything that carries one.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher agrees)
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unless the blade was silvered" names no absence — nothing in it takes anything away
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "When the troll strikes a foe and its hide is still whole, it hooks the victim with its claws and wrenches, tearing open a raw bleeding gash that keeps seeping until the wound is bound. Against plain iron it savors the moment, holding the screaming prey close for a heartbeat before the next swing." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: affliction, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the troll strikes a foe and its hide is still whole, it hooks the victim with its claws and wrenches, tearing open a raw bleeding gash that keeps seeping until the wound is bound. Against plain iron it savors the moment, holding the screaming prey close for a heartbeat before the next swing." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, terror-pulse, rampage)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll's hide crusts over old iron cuts within moments, sealing them behind a scabrous layer; each fresh wound from a common blade makes its hide tougher against such blades, so dull steel only teaches its flesh to close faster." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: heated-body, resonant-body, bloodied-burst, bloodied-fury, sealed-body, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "The troll's hide crusts over old iron cuts within moments, sealing them behind a scabrous layer; each fresh wound from a common blade makes its hide tougher against such blades, so dull steel only teaches its flesh to close faster." [trait/on_being_hit/defense] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, sealed-body)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repaired sheet: 1 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Claw = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Silver" is dealt, defended, or not a damage type
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
audit finding below confidence gate: Loathsome Limbs The sever trigger requires tracking total Slashing damage taken across an entire turn, which the GM has no structure in the block to track, and 'lost limbs' state interacts with a multiattack (three Rends) it never explains.
audit finding below confidence gate: Silvered Wounds 'If' is capitalized mid-sentence following a dependent clause that already opened with 'when', producing a broken conditional.
[reskin] audit rewrite blocked — "Silvered Wounds" is engine-authored chassis text
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---

## Sumpcoil Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sumpcoil Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

```
Sumpcoil Hydra

Huge Monstrosity, Unaligned

AC 15
Initiative +1 (11)

HP 184 (16d12 + 80)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
2
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Perception +6

Immunities Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Hold Breath. The sumpcoil hydra can hold its breath for 1 hour.

Multiple Heads. The sumpcoil hydra has five heads. Whenever the sumpcoil hydra takes 25 damage or more on a single turn, one of its heads dies. The sumpcoil hydra dies if all its heads are dead.

Reactive Heads. For each head the sumpcoil hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The sumpcoil hydra makes as many Bite attacks as it has heads.

Bite. Melee Attack Roll: +8, reach 10 ft. 10 (1d10 + 5) Piercing damage.

Bonus Actions

Festering Reek (1/Day). The sumpcoil hydra creates a cloud of acrid smoke and foul stench in a 20-foot Emanation originating from itself. The effect lasts while the sumpcoil hydra maintains Concentration on it, up to 10 minutes. has Disadvantage on attack rolls

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
- Actions/Bite — print's own row
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Festering Reek — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: severed necks venting blinding smoke instead of regrowing [behavior] | a many-headed swamp hydra's nest of biting necks [body] | a thickening cloud of poison that grows as it is wounded [aura]
[concept] identity: The hydra wades into reach and drags prey into its nest of necks, biting with every head at once; each neck it loses is a trade it accepts, because the stump seals and pours out a choking grey smoke that blinds and poisons whatever is close enough to have done the cutting. It is not a thing that regrows its heads — it is a thing that burns what it loses, and the more of it you kill, the thicker the cloud around it grows. Wounded and half-headless, it does not flee; it wades deeper into its own smoke and fights on, breathing. No, it is a Monstrosity of hide and gore, not a living fog-bank — the smoke is what its wounds do, not what it is made of.
[concept] lore: A hydra whose blood was cursed by a dying fire-cult, its severed necks seal over with smoldering scar-tissue and vent the poison it can no longer bleed out, and it hunts the swamps for warm bodies to smother in the smoke of its own wounds.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 149 -> 184, AC 15 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +8 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the sumpcoil hydra" — the call's own answer (kind), built from the name
[reskin] inline form: "the sumpcoil hydra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical)
[reskin] signature idea (action): "The hydra wrenches its necks in a wide sweep, tearing open old scar-tissue so every healing stump it carries vents a billowing reek at once. Creatures caught in the cloud find their eyes streaming and their lungs burning, so the hydra can wade in and bite what it has already half-blinded." [action/save/condition] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: zone -> Actions/"Festering Reek (1/Day)" ("The stumps vent a lingering billowing reek cloud around the hydra that obscures  [verb: smoke:concept, cloud:idea]")
[reskin] signature idea (trait): "Whenever a neck is severed, its stump doesn't close — it smolders and pours out a clinging grey mist that hangs around the hydra and sickens anything standing too near it. The more necks it has lost, the thicker the haze, so the wounded beast fights honestly no, dirtier — foes choke and stagger even as they cut it down." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending, adhesive, heated-body, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Smoldering Stumps" — bound only on the idea's own words (sickening:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] print canon alignment: Neutral Evil -> Unaligned — the Hydra's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "The sumpcoil hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] dead control row: "Festering Reek (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
audit finding below confidence gate: Multiple Heads Requires the GM to track rolling per-turn head counts and fire-damage history that the block provides no scaffold for, making mid-combat resolution slow and error-prone.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---

## Hobgoblin Halberdier — in the run

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hobgoblin Halberdier | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Halberd); nova none; dmg 14

```
Hobgoblin Halberdier

Medium Humanoid, Lawful Evil

AC 15
Initiative +1 (11)

HP 44 (8d8 + 8)

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
12
+1
+3
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+1
CHA
9
-1
-1

Skills Perception +2, Stealth +3

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the halberdier hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The halberdier makes two attacks, using Halberd or Longbow in any combination.

Halberd. Melee Attack Roll: +5, reach 10 ft. 7 (1d8 + 3) Slashing damage.

Longbow. Ranged Attack Roll: +5, range 150/600 ft. 7 (1d8 + 3) Piercing damage.

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

- Traits/Great Weapon Master — a declared feature; the GM's clause "a hobgoblin with a halberd"
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Halberd — authored for this sheet; a named part; the GM's clause "a hobgoblin with a halberd"; weapon halberd
- Actions/Longbow — print's own row, renamed; weapon longbow

**Engine trace**

```
[path] refused: species "hobgoblin" has no kit
[path] twist — Hobgoblin Warrior (is) — "a hobgoblin" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a hobgoblin with a halberd") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a hobgoblin with a halberd…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: halberd thrust and hook [object] | legion skirmish drill, dart in and out [behavior] | pack-tactics discipline [behavior]
[concept] identity: A hobgoblin skirmisher who opens with a measured halberd thrust from reach, then uses the weapon's haft to hook and shove itself into and out of an enemy's guard, backing its thrusts with a packmate's flank. Every round it presses the advantage while a formation holds, trading ground for angles and using the halberd's length to punish anything that overcommits. If bloodied or isolated it disengages without shame, dragging its wounded pride back to the warband rather than dying for a lost skirmish.
[concept] lore: Drilled in a hobgoblin legion's skirmish files, this soldier carries a long halberd into the field not for glory but to win ground for the war-host — and to come home with the weapon still in its hands.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 16, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Hobgoblin Warrior (the matcher would have said homebrew)
[reskin] print canon: "a hobgoblin with a halberd" heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Halberd (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the halberdier" — the call's own answer (kind), built from the name
[reskin] inline form: "the halberdier" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the halberdier strikes a foe with its halberd, it can use the haft to hook the target and drag it out of position, pulling the creature in toward the hobgoblin while the halberdier steps forward into the gap it opened. The victim is yanked off their footing and left exposed to the next thrust, with the hobgoblin taking the ground it has claimed." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, gaze-single, snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Halberd Hook" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The halberdier fights best in a file beside its packmates: whenever a warband comrade is engaged with the same foe, the halberdier reads the flank and places its thrusts where the enemy's guard has turned away, hooking the weapon past their parry. Working alone, the drill breaks and its precision fades." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The halberdier fights best in a file beside its packmates: whenever a warband comrade is engaged with the same foe, the halberdier reads the flank and places its thrusts where the enemy's guard has turned away, hooking the weapon past their parry. Working alone, the drill breaks and its precision fades." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Halberd = halberd; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Javelin" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Hobgoblin Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skirmish Drill" is the seat's, not the Hobgoblin Warrior's
audit finding below confidence gate: Halberd A halberd is a reach weapon, yet the attack's reach (5 ft.) contradicts the weapon it names, so the entry's name and its mechanics disagree on how the attack works.
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
[reskin] multiattack re-read — "Longbow" joins the combination; "The halberdier makes two attacks, using Halberd or Longbow in any combination."
```


---

## Hoarfrost Jarl — in the run

**Concept:** a Huge frost giant jarl who throws boulders

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hoarfrost Jarl | 9 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "throws boulders"
- read: def 6 / off 9 → 7.5; sustained 56 (2 × Frost Axe); nova none; dmg 56

```
Hoarfrost Jarl

Huge Giant, Neutral Evil

AC 15
Initiative -1 (9)

HP 149 (13d12 + 65)

Speed 40 ft.

MOD
SAVE
STR
23
+6
+6
INT
9
-1
-1
MOD
SAVE
DEX
9
-1
+3
WIS
10
+0
+4
MOD
SAVE
CON
21
+5
+5
CHA
12
+1
+1

Skills Athletics +10, Perception +4

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 14

Languages Giant

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The jarl makes two attacks, using Frost Axe or Great Bow in any combination.

Frost Axe. Melee Attack Roll: +10, reach 10 ft. 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.

Great Bow. The jarl hurls a slab of glacier ice. Ranged Attack Roll: +10, range 150/600 ft. 17 (2d10 + 6) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until the jarl spends 5 feet of movement in that space to recover it, the jarl's Speed is halved and it can't use this action.

Bonus Actions

War Cry (Recharge 5-6). The jarl or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of the jarl's next turn.

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
- Actions/Frost Axe — print's own row, renamed; weapon handaxe
- Actions/Great Bow — print's own row, renamed; template throw-retrieve; library draw (seed unstamped); weapon bow
- Bonus Actions/War Cry — print's own row

**Engine trace**

```
[path] twist — Frost Giant (is) — "frost giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] hints: hurler→style ✓ ("who throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/subterranean mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling boulders [behavior] | a body of glacier ice [body] | the jarl's cold authority [aura]
[concept] identity: The frost giant jarl opens a fight by wrenching a boulder from the glacier and hurling it at the largest target, then strides forward to hurl again every round, using the terrain's ice to keep its distance and its line of fire. When pressed at close quarters it does not retreat into melee skill but grabs whatever is at hand—a spear, a frozen corpse, a reeling line—to keep the fight at arm's length, and it fights to the death with the cold, calculating arrogance of a jarl who has never known a peer.
[concept] lore: A giant of the high ice who has claimed a frozen vale as his jarldom, he hurls the mountain's bones at any who would trespass on his hoarfrost hall and keeps the shattered boulders of his victims as a cairn of rule.
[reskin] print canon route: "a Huge frost giant jarl who throws boulders" is the Frost Giant, a bow-user — the hurler seat stands down for the plain line
[reskin] nova capped: "Sweeping Area Attack" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] print canon pb: print's +9 on PB +3 reads +10 on this sheet's PB +4; DCs follow
[reskin] print canon defenses: HP 150 -> 149, AC 17 -> 15 — the Frost Giant's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 9, CON 21, INT 9, WIS 10, CHA 12 — the Frost Giant's at its own CR; attack +8 -> +10, DC 18 (print's, on this sheet's PB)
[reskin] donor: skirmisher-8 -> CR 9
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: twist on the Frost Giant (the matcher would have said homebrew)
[reskin] print canon: "a Huge frost giant jarl who throws boulders" heads on the Frost Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the jarl" — the call's own answer (kind), built from the name
[reskin] inline form: "the jarl" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "throws boulders" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "throws boulders" but offered no quote
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The jarl tears a slab of glacier free and hurls it not to wound but to pin. Wherever it lands, the ice erupts into a jagged crown of splinters driven outward, laming anyone near the impact and leaving a field of broken frost that slows every step while the jarl strides over it unhindered. He uses it to break a charge, split a formation, and make the open ground at his feet a killing floor." [action/always/movement] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: snare-bolt, snare — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "throw-retrieve" has no key-table verb, but the call quotes "throws boulders" from the description
[reskin] slot yields: ranged — the chassis's "Boulder" leaves; "Glacier Hurl" holds the slot
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "The jarl makes three Fist attacks."
[reskin] signature template: throw-retrieve -> Actions/"Glacier Hurl" ("The jarl tears free a slab of glacier and hurls it; that is the hurling-projecti [shape fit, no verb match]")
[reskin] signature idea (trait): "The jarl's thrown stones carry the mountain's ache with them: any foe he strikes at range is left numb and brittle, its limbs stiffening with frost so that its next few moments are slower and clumsier. The longer the fight drags and the more of his cairn he empties into the trespassers, the more the cold settles into their bones." [trait/always/condition] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The jarl's thrown stones carry the mountain's ache with them: any foe he strikes at range is left numb and brittle, its limbs stiffening with frost so that its next few moments are slower and clumsier. The longer the fight drags and the more of his cairn he empties into the trespassers, the more the cold settles into their bones." [trait/always/condition] — the model found no template that holds it (offered: heated-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Fist = none; Boulder = none; Glacier Sweep = none
[reskin] chassis nova: "Glacier Sweep (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Giant" — the Frost Giant's
[reskin] print canon attack: "Fist" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "The jarl makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Glacier Hurl" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon skills: "Perception +4, Stealth +3" -> "Athletics +10, Perception +4" — the Frost Giant's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Glacier Sweep (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Ice Stride" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
```


---

## Oathbound Quiver — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Quiver | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Oathbound Quiver

Medium Undead, Lawful Evil

AC 15
Initiative +3 (13)

HP 32 (5d8 + 10)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+5
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+2
CHA
5
-3
-3

Skills Perception +1, Stealth +5

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 1 (XP 200; PB +2)

Actions

Multiattack. The quiver makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=sapient style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loosing bone-tipped arrows from cover [behavior] | a bare skeleton strung with a warped bow [body] | a quiver of finger-bone arrows [object]
[concept] identity: A skeleton archer opens the fight from the far edge of a room, loosing bone-tipped arrows from a bow it can still nock with hands long past decay. Every round after it falls back, breaking line of sight and shooting from new cover, content to trade one arrow for one hour. When cornered or bloodied it does not waver or flee — it calmly drops the bow, closes to spitting range, and keeps firing until its skull is shattered.
[concept] lore: A soldier or poacher who died with a shaft still in the quiver and an oath unpurged, raised to stand the same watch it kept in life — patient, silent, and refusing to yield the ground it was told to hold.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 1 defect(s) — name "Longbow Limb" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the quiver" — the call's own answer (kind), built from the name; the rules would have said "Quiver"
[reskin] inline on kit rows: "Quiver" -> "the quiver"
[reskin] inline form: "the quiver" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the quiver looses an arrow, the bone tip carries a sliver of the oath that raised it — the wound festers with grave-cold and the struck creature finds its own wounds slower to close, so every hit it lands afterward does a little less to the quiver's allies until the chill wears off. The quiver only needs one clean shot to plant it; the shaft does the rest." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Grave-Chill Oath" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The quiver's arrows are its own ribs and fingerbones, and it plucks them free and re-nocks without ever seeming to run dry — as long as it keeps a scrap of line of sight to something it has already wounded, it can keep feeding that wound with fresh shafts, and the bone regrows in the quiver between shots." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Wounded Regrowth" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Longbow Limb = longbow; Bone Arrow = longbow
[reskin] weapon refused: "Longbow Limb" reads longbow, but the row has no range — a launcher is ranged-only, so the row carries no weapon
[reskin] weapon table: "Bone Arrow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Longbow Limb" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Bone Arrow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Fallow Step" is the seat's, not the Skeleton's
audit finding names unknown entry, dropped: Oathbound Quiver
```


---

## Bleed Den Twin — in the run

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bleed Den Twin | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Bite); nova none; dmg 14

```
Bleed Den Twin

Medium Beast, Unaligned

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 40 ft.

MOD
SAVE
STR
14
+2
+2
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
12
+1
+1
CHA
6
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 2 (XP 450; PB +2)

Traits

Pack Tactics. The den twin has Advantage on attack rolls against a creature if at least one of the den twin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The den twin makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Wolf (is) — "a wolf with two heads" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a wolf with two heads") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a wolf with two heads…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads splitting attention between prey and pursuer [body] | pack-tactics feint-and-hamstring hunt [behavior] | dart-in, dart-out harrying of the bloodied [behavior]
[concept] identity: The two-headed wolf hunts in a snapping, weaving rush: one head feints and holds the prey's attention while the other darts in for the hamstring bite, and it circles constantly so no single flank is ever the one facing you. Every round it repositions after striking, exploiting packmates' pressure to peel away before the retaliation lands, and once bloodied it turns harrying instead of heroic — trailing the wounded, splitting its two heads' attention between the retreating prey and any pursuer. Only a cornered two-head fights flat-out to the death, both jaws working in opposite arcs.
[concept] lore: Born where two wolf-packs' territories bleed together and a starving bitch whelps in a cursed den, the two-headed wolf wants nothing grander than the hunt — but it hunts with two minds, so it never stops watching the exits.
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher agrees)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the den twin" — the call's own answer (kind), built from the name
[reskin] inline form: "the den twin" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When both jaws work the same prey from opposite sides, one head snaps and locks the target's attention while the other drives in low for the hamstring: the struck creature is slowed for a short while, its speed cut, and it cannot easily get clear of the twin. The feint and the hamstring are one motion, so the creature reels off balance instead of simply taking a bite." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: hook-rider, charge-push, charge, pounce — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When both jaws work the same prey from opposite sides, one head snaps and locks the target's attention while the other drives in low for the hamstring: the struck creature is slowed for a short while, its speed cut, and it cannot easily get clear of the twin. The feint and the hamstring are one motion, so the creature reels off balance instead of simply taking a bite." [rider/on_hit/movement] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, charge, focus, feint-slip)
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The two heads never watch the same thing. Whenever the twin faces more than one foe, one head keeps its eyes on the nearest threat while the other tracks the prey breaking away or the pursuer closing in — so it is never caught flat-footed from a direction its heads are already covering." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: uncanny-sense, terrain-walk, aberrant-ground, faultless-tracker, relentless-pursuit, blurred-form — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The two heads never watch the same thing. Whenever the twin faces more than one foe, one head keeps its eyes on the nearest threat while the other tracks the prey breaking away or the pursuer closing in — so it is never caught flat-footed from a direction its heads are already covering." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Flanking Gait" is the seat's, not the Wolf's
```


---

## Scaldwell — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scaldwell | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Scaldwell

Medium Undead, Lawful Evil

AC 16
Initiative +4 (14)

HP 195 (23d8 + 92)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+8
MOD
SAVE
DEX
18
+4
+9
WIS
15
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +7, Stealth +9

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance. If the scaldwell fails a saving throw, it can choose to succeed instead.

Misty Escape. If the scaldwell drops to 0 Hit Points outside its resting place, the scaldwell uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The scaldwell can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The scaldwell has these weaknesses:


- Forbiddance: the scaldwell can't enter a residence without an invitation from an occupant.
- Running Water: the scaldwell takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the scaldwell's heart while the scaldwell has the Incapacitated condition in its resting place, the scaldwell has the Paralyzed condition until the weapon is removed.
- Sunlight: the scaldwell takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The scaldwell makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the scaldwell regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the scaldwell's control.

Bonus Actions

Shape-Shift. If the scaldwell isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the scaldwell can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the scaldwell can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The scaldwell casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the scaldwell's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the scaldwell.

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
- Actions/Grave Strike — print's own row, renamed
- Actions/Bite — print's own row
- Bonus Actions/Shape-Shift — print's own row
- Bonus Actions/Charm — print's own row
- Traits/Legendary Resistance — print's own row
- Traits/Misty Escape — print's own row
- Traits/Spider Climb — print's own row
- Traits/Vampire Weakness — print's own row

**Engine trace**

```
[path] twist — Vampire (is) — "vampire" (call)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire") | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "running water" answers a question nobody asked
[concept] name: provided_name rejected — "a vampire who runs a bathhouse…" is the description, not a name
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: erupting from scalding bathwater to seize a bather [behavior] | steam and scalding water it controls [aura] | the drowning-grip that drags prey under [behavior]
[concept] identity: The bathhouse keeper waits submerged among the steam, unseen until a guest leans too close, then erupts from the scalding pool in a single bounding grapple that drags them down into the water it has been quietly heating. Every round after, it flits between clouded rooms and spills, using scalding spray and the blind panic of drowning bathers to re-hide before surfacing for the next lunge. It treats the fight as an evening's hospitality — patient, playful, and utterly unwilling to abandon its bathhouse until the spray runs red, at which point it withdraws only to lure pursuers deeper into the hottest chambers.
[concept] lore: Once a mortal bathhouse owner who took the warm water for their own and drowned in it, the keeper still runs the house — drawing in the lonely and the unwary to soak, and never letting a full tub go cold.
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the scaldwell" — the call's own answer (kind), built from the name
[reskin] inline form: "the scaldwell" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The scaldwell erupts from a pool or bath of scalding water it has been heating, surging up to seize one nearby bather. Anyone caught close to the eruption is blasted with a gout of boiling spray that clings and burns, and the water around the creature froths and seethes while it fights there. It can only erupt from water it has taken for itself — a bathhouse pool, a tub, a filled font — never from" [action/save/damage] — menu: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] word match declined by the call: drain — the key word does not mean the mechanic here
[reskin] fit declined: "Boiling Eruption (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Wherever the scaldwell lingers in its bathhouse, the air turns to scalding steam: standing water it passes boils over, and foes lingering near the pools or springs it claims are steadily scalded and left gasping in blinding fog. Guests it has soaked are already red and reeling, easy for it to pick out and drag down." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, gaze-aura)
[reskin] word match declined by the call: heated-body, absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Scalding Vapors" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Claw = none
[reskin] print canon modes: swim off — the Vampire has no such mode and the words name none
[reskin] speed by concept: dropped Swim 30 ft.; added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The scaldwell makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Perception +7, Stealth +14" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The scaldwell makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Bite (Bat or Vampire Form Only) This creates an uncontrolled, undying hostile servitor with no duration, no escape, and no counterplay written for the victim or the party.
audit finding below confidence gate: Misty Escape Shape-Shift in mist form cannot pass through liquid and grants Resistance to all damage except sunlight, yet Misty Escape requires crossing to a resting place within 2 hours—if running water lies between, the creature has no legal route and dies with no adjudicable resolution.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---

## Hollow Chime — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Chime | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Funeral Knell 13; dmg 38

```
Hollow Chime

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+3
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Ethereal Sight. The hollow chime can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The hollow chime can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The hollow chime makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Funeral Knell (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the hollow chime. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the hollow chime and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the hollow chime's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the hollow chime can see within 5 feet. Failure: The target is possessed by the hollow chime; the hollow chime disappears, and the target has the Incapacitated condition and loses control of its body. The hollow chime now controls the body, but the target retains awareness. The hollow chime can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The hollow chime's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the hollow chime leaves as a Bonus Action. When the possession ends, the hollow chime appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The hollow chime casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The hollow chime is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Withering Touch — print's own row, renamed
- Actions/Funeral Knell — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+ring+chime+knell
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost that tolls ") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a bell-ringer's ghost that tolls")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the tolling death knell [behavior] | incorporeal drift through stone walls [body] | aura of the dying hour [aura]
[concept] identity: The bell-ringer drifts unseen above a dying soul and strikes the chapel bell—one resonant toll that wracks the living with necrotic decay, letting it open from beyond reach. Each round it keeps ringing, layering its mournful knell into an aura of failing health while slumping through stone to escape retaliation. It is not mindless malice but a sapient, patient spirit that toys with the dying, ringing out the hour of death only when its victim has no strength left to flee.
[concept] lore: A bell-ringer who died mid-toll, bound to the chapel belfry and compelled to sound the death knell for everyone in earshot—though it decides for itself whose hour has come.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the hollow chime" — the call's own answer (kind), built from the name
[reskin] inline form: "the hollow chime" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: at_will/save_single]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The hollow chime lets out a slow, mournful bell-toll that washes over everyone nearby, filling living ears with the sound of their own funeral. The longer a wounded creature stands in that ringing, the harder it is for its body to knit itself back together — hurts close and rest comes slow, as though the knell has already claimed a little of them. It can keep sounding this each round, so a fight w" [action/always/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] signature template: active-toll -> Actions/"Funeral Knell (Recharge 5-6)" ("A creeping bell-toll that washes over nearby creatures, thundering in their ears [verb: toll:concept, bell:concept, ring:idea, chime:idea, knell:idea]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The hollow chime drifts through solid walls and stone as though they were fog, so no lock, door, or chapel wall can ever cage it or block its way. When it passes through masonry, a faint chime and a gust of cold chapel air rings out on the far side, leaving the living with nothing to strike back at." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: false-appearance, bound, resonant-body, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for toll+bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The hollow chime drifts through solid walls and stone as though they were fog, so no lock, door, or chapel wall can ever cage it or block its way. When it passes through masonry, a faint chime and a gust of cold chapel air rings out on the far side, leaving the living with nothing to strike back at." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Clapper = none; Death Knell = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Funeral Knell" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Funeral Knell" — trigger at_will
audit finding below confidence gate: Withering Touch Melee attack roll is given as '+5' without the weapon/spell notation and lacks explicit reach line ('reach 5 ft.'), leaving GM to infer it is a melee weapon attack for rider and reaction purposes.
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```
