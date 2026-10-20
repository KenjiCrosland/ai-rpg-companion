# Review batch — twist-ten-2026-10-20T14-01-19

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbitten Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Ash-Marsh Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hobgoblin Halberdier | 2 | 2024 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Jarl Hrimgar | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Watch That Won't Stand Down | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Twin-Skulled Wolf | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Tollwarden | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/8 |

**Dropped 2 of 11 user clauses** (coverage 82%); concept share 98% (43/44 rows). A run with zero fails and 60% coverage is a failing run.
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

Rime Hide. A creature that touches the wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The wolf makes two Bite attacks.

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

- Traits/Rime Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+rime
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide that chills those near it [body] | pack-hunting dart-in, dart-out harrying [behavior] | relentless pursuit of warm-blooded quarry through the snow [behavior]
[concept] identity: The frost-rimed dire wolf circles the pack's chosen prey in a loose, silent crescent, letting the cold of its hide do the first work before it commits. It darts in to slash at a hamstring or flank and wheels away before the target can turn, herding the quarry toward its packmates with each frozen bite. When bloodied it does not break — it falls back into the crescent and lets the others close, fighting with the patience of a hunter that has never once been alone.
[concept] lore: Born of a winter that would not end, these wolves carry the killing cold of the high passes in their rime-crusted fur and follow the snowline south each year in search of warm-blooded quarry.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the wolf" — the call answered "the wolf" (kind), which the name does not support
[reskin] inline form: "the wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf lunges in a low darting slash meant to cripple, not kill: when its bite lands, the cold sinks into the wound and stiffens the prey's legs, so the way it moves is slowed and clumsy while the pack rings closer. The chill clings for a short while, but the wolf must keep harrying the same quarry to make it bite — if the wolf turns to a new target, the old wound's frost fades." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, charge-push — the key word does not mean the mechanic here
[reskin] signature miss: action — "The wolf lunges in a low darting slash meant to cripple, not kill: when its bite lands, the cold sinks into the wound and stiffens the prey's legs, so the way it moves is slowed and clumsy while the pack rings closer. The chill clings for a short while, but the wolf must keep harrying the same quarry to make it bite — if the wolf turns to a new target, the old wound's frost fades." [rider/on_hit/condition] — the model picked "contagion" (no verb, and it quotes nothing the GM typed) over a concept-verb template (slow-bolt)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The rime on its hide reaches out a step or two around it, so air near the wolf grows painfully cold and anyone who lingers beside it or grapples it feels their warmth being drawn away, their limbs seizing up the longer they stay in the frost's radius." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rime Hide" ("the rime on its hide reaches out a step or two around it; anyone who touches it  [verb: frost:concept, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Crescent Stalker" is the seat's, not the Dire Wolf's
```


---

## Purple Worm — highest CR

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "that swallowed a war-band's armoury" | brute-grappler: ✓ ("that swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/armed mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: a gullet packed with swallowed blades and hauberks [body] | breaches and engulfs whole ranks of soldiers [behavior] | grinds and shreds what it has seized with the steel inside it [behavior]
[concept] identity: A purple worm whose gullet is a rusting armoury, it breaches beneath the formation and engulfs a rank of soldiers whole, its maw packed with swallowed blades that rasp and grind against everything it takes in. Every round it stays down, crushes a fresh soldier or another corpse-load of steel into the mass churning inside it, and surfaces only to take more — armour and weapons torn loose, half-digested steel spat up as jagged debris. It fights to the death and never disengages; struck bloodied, it turns the blades inside itself outward, shredding anything it has already seized rather than letting go.
[concept] lore: A purple worm that swallowed a war-band's armoury and survived the meal keeps the hoard: blades and hauberks lodged in its gut like grist in a mill, and it hunts armed columns because it has learned that men carry the only food it still wants.
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
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "It heaves its whole front half up out of the earth and then slams down again, draining the swallowed steel-hoard back through its gullet in one convulsive retch. A sleeting fan of bent swords, mail rings, and spearheads scatters across the ground it can see, and the jagged slop sticks fast to whatever it lands on, so bodies stay bogged and bleeding where they stand. Its own grinding burden is gone" [action/always/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow, terror-pulse, herd — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "It heaves its whole front half up out of the earth and then slams down again, draining the swallowed steel-hoard back through its gullet in one convulsive retch. A sleeting fan of bent swords, mail rings, and spearheads scatters across the ground it can see, and the jagged slop sticks fast to whatever it lands on, so bodies stay bogged and bleeding where they stand. Its own grinding burden is gone" [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] fallback respects the call: swallow, terror-pulse, herd left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anything it has taken into its gut is never given back — the blades it swallowed keep turning over and rasping them from inside, wearing down whatever has been dragged into the mass with every few breaths it takes. Even if a swallowed creature claws its way free, the wounds it took inside stay wide and weeping, and the worm learns each struggle as food it still has." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown tunneler, which the GM's words keyed
[reskin] key match declined: trait — "tunneler" was ranked first on the call's own menu for worm, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything it has taken into its gut is never given back — the blades it swallowed keep turning over and rasping them from inside, wearing down whatever has been dragged into the mass with every few breaths it takes. Even if a swallowed creature claws its way free, the wounds it took inside stay wide and weeping, and the worm learns each struggle as food it still has." [trait/start_of_turn/damage] — the model found no template that holds it (offered: tunneler, fire-aura, warded-mending, false-appearance, bloodied-burst, bloodied-fury)
[reskin] concept-first trait skipped: tunneler — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Bite = none; Gullet Spray = none; Blades Turned Outward = none
[reskin] chassis nova: "Gullet Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Gullet Spray (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---

## Silverbitten Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverbitten Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Silverbitten Troll

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

Regeneration. The silverbitten troll regains 15 Hit Points at the start of each of its turns. If the silverbitten troll takes damage from a silvered weapon, this trait doesn't function on the silverbitten troll's next turn. The silverbitten troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs (4/Day). If the silverbitten troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the silverbitten troll's limbs is severed, falls into the silverbitten troll's space, and becomes a Troll Limb. The limb acts immediately after the silverbitten troll's turn. The silverbitten troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The silverbitten troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The silverbitten troll moves up to half its Speed straight toward an enemy it can see.

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
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a troll" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back unless the blade was silvered") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] name: provided_name rejected — "troll that grows back unless the blade w…" is the description, not a name
[concept] hints: troll→canon ✓ ("a troll that grows back unless the blade")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/grasping mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [behavior] | a hide that shrugs off ordinary steel [body] | silver as its only lasting bane [object]
[concept] identity: A looming, rubbery-hided monstrosity that wades into reach with claws and closes wounds as fast as they open, uncaring of ordinary steel because the flesh simply reknits. Round after round it leans on that regeneration, tearing at the nearest target in greedy bites while silently sorting which wound actually held; when a silvered edge bites true, the smile leaves it and it turns to hunting that blade first. It does not flee — it fights until the silver runs red or the troll does, and a foe that cannot stop the healing is prey to be played with longer.
[concept] lore: Spawned where the old whetstones of a fallen silver-armory were ground into a mire, this troll inherited the hunger of the weapons that sank there and hunts for the one sensation that no longer heals: silver.
[reskin] the concept outranks the alias: the Troll is a Giant and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] regeneration off-switch: silver (the call read the GM's weakness clause as silver ("unless the blade was silvered"))
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a troll that grows back unless the blade was silvered" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the silverbitten troll" — the call's own answer (kind), built from the name; the rules would have said "Troll"
[reskin] inline on kit rows: "Troll" -> "the silverbitten troll"
[reskin] inline form: "the silverbitten troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "start_of_turn" for "a troll" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "a troll" but offered no quote
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: on_being_hit/resist]
[reskin] signature idea (action): "The troll lunges at whoever it has already wounded this fight and bites down on the open injury, worrying at it — the fresher the wound, the deeper the bite sinks, and it does not let go of flesh that is already torn. This works only on a target it has successfully hit at some point during the encounter, and after using it the troll's claws come back around for its usual tearing." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] word match declined by the call: affliction, rampage, contagion, stunning-strike, charge-push, hook-rider, pounce, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll lunges at whoever it has already wounded this fight and bites down on the open injury, worrying at it — the fresher the wound, the deeper the bite sinks, and it does not let go of flesh that is already torn. This works only on a target it has successfully hit at some point during the encounter, and after using it the troll's claws come back around for its usual tearing." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, rampage)
[reskin] fallback respects the call: rampage left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ordinary steel that cuts the troll leaves the wound knitting shut around the blade's memory — but silver does not: any silvered weapon that strikes it gets no purchase on the healing, and the troll can smell the silver on the arm that carries it, fixing its attention on that wielder until it draws blood." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: uncanny-sense, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Silverbane Mending" — bound only on the idea's own words (knits:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The silverbitten troll makes three Rend attacks." — the Troll's own
[reskin] print canon skills: "Athletics +7, Perception +2" -> "Perception +5" — the Troll's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Loathsome Limbs (4/Day) — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Silver" is dealt, defended, or not a damage type
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] asked but unanswered: "grows back unless the blade was silvered" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs (4/Day)" is engine-authored chassis text
```


---

## Ash-Marsh Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ash-Marsh Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

```
Ash-Marsh Hydra

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

Choking Stumps. Constitution Saving Throw: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hydra. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Hold Breath. The hydra can hold its breath for 1 hour.

Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.

Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The hydra makes as many Bite attacks as it has heads.

Bite. Melee Attack Roll: +8, reach 10 ft. 10 (1d10 + 5) Piercing damage.

Bonus Actions

Choking Stump-Smoke (1/Day). The hydra creates a thick choking cloud of acrid smoke in a 20-foot Emanation originating from itself. The effect lasts while the hydra maintains Concentration on it, up to 10 minutes. Each creature in the area has Disadvantage on attack rolls.

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
- Traits/Choking Stumps — template noxious-aura; library draw (seed unstamped)
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Choking Stump-Smoke — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: severing heads that smoke instead of regrowing [behavior] | acrid stump-smoke choking the air [aura] | many biting heads [body]
[concept] identity: The smoking hydra opens by lunging with its many biting heads, each strike leaving a sputtering stump when severed rather than a regrowing neck, so it fights to carve its foes apart while denying them the clean death of a cauterized wound. Every round it presses with renewed heads and chokes the field with acrid smoke, forcing attackers to blind-breathe its stumps at close range; it is a savage, vindictive brute that never flees, only leans harder into the loss of its own heads to drown the fight in fumes.
[concept] lore: A hydra of the ash-marsh whose regeneration turned poison-sour, it seeks only to keep consuming and to leave the air too thick with smoke for any prey to escape.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 149 -> 184, AC 15 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +8 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the hydra" — the call's own answer (kind), built from the name
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical)
[reskin] signature idea (action): "The hydra tears into its own smoking stump, ripping the ruined neck wider so the acrid smoke billows out in a thick choking cloud that clings to everything nearby. Everything close to it — friend or foe — has to breathe the stinging fumes and gags and stumbles, its eyes watering and its lungs burning, while the hydra itself only leans in harder. It uses this when foes crowd in close, turning its o" [action/save/condition] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: zone -> Actions/"Choking Stump-Smoke (1/Day)" ("acrid smoke billows out in a thick choking cloud that clings around the hydra, f [verb: smoke:concept, cloud:idea]")
[reskin] signature idea (trait): "Whenever one of its heads is severed, the fresh stump does not seal or heal — it smolders and spits a greasy column of poison smoke that keeps pouring out for the rest of the fight, thickening the air around the hydra. Anyone who comes within reach of those smoldering stumps finds their throat closing and their eyes streaming, so the more heads it loses, the worse the choking haze becomes and the " [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "noxious-aura" has no key-table verb, but the call quotes "stumps smoke" from the description
[reskin] signature template (trait): noxious-aura -> Traits/"Choking Stumps" ("Smoldering stumps pour poison smoke that thickens the air around the hydra, chok [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Unaligned — the Hydra's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] dead control row: "Choking Stump-Smoke (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
audit finding below confidence gate: Multiple Heads The trait references 'Fire damage' taken since its last turn but nothing in the block tracks or defines this state; the GM has no way to know whether a Fire-damage event occurred within that window.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---

## Hobgoblin Halberdier — in the run

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hobgoblin Halberdier | 2 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 2 → 1.5; sustained 12 (1 × Halberd); nova none; dmg 12

```
Hobgoblin Halberdier

Medium Humanoid, Lawful Evil

AC 17
Initiative +1 (11)

HP 38 (7d8 + 7)

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
+1
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+3
CHA
9
-1
-1

Skills Athletics +5, Perception +2

Senses Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the halberdier hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The halberdier has Advantage on an attack roll against a creature if at least one of the halberdier's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Halberd. Melee Attack Roll: +5, reach 10 ft. 12 (2d8 + 3) Slashing damage.

Longbow. Ranged Attack Roll: +5, range 150/600 ft. 5 (1d8 + 1) Piercing damage.

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
- Actions/Halberd — authored for this sheet; a named part; the GM's clause "a hobgoblin with a halberd"; weapon halberd
- Actions/Longbow — print's own row; weapon longbow

**Engine trace**

```
[path] twist — Hobgoblin Warrior (is) — "a hobgoblin with a halberd" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a hobgoblin with a halberd") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a hobgoblin with a halberd…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: halberd reach and hook [object] | shield-wall discipline [behavior] | iron-fitted soldier's kit [body]
[concept] identity: The hobgoblin halberdier digs in behind its shield and lets reach and formation do the killing: it plants itself on the line, opening with a shield-first shove to stagger a charging foe while the halberd's spike keeps cavalry and reach weapons honest. Every round after that it hooks, trips, and punishes movement — any enemy that tries to slip past it eats a halberd butt-stroke or a hooked ankle, and it deliberately yields ground only to drag pursuers into the reach of its allies. It is a disciplined creature under pressure, retreating in step with its unit rather than alone, and it fights to a bitter, mutual death. Its discipline and battlefield patience are expressed through a body of scarred leather, iron fittings, and the sweat-hardened muscle of a lifelong soldier.
[concept] lore: Hobgoblin drill-masters arm their line troops with the long halberd and train them to hold a doorway or ford; the halberdier's whole world is the order to stand, and its reward is a shield-wall it shares with its own.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 16, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +5
[reskin] donor: defender-1 -> CR 2
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
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
[reskin] signature idea (action): "The halberdier slams its shield forward into one foe right in front of it, knocking the target off balance so it stumbles a few steps and can't get its footing back until it spends a moment recovering. The shove staggers rather than wounds — it exists to break a charge and stall whoever meant to run past, and the halberdier can only land it on an enemy that is already within arm's reach." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] fit declined: "Staggering Shove" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever an enemy within the halberdier's reach moves away from it or tries to slip past it, the halberdier snaps the halberd's hook into a leg or collar and drags the enemy back, stopping the escape cold. This burns the halberdier's own reaction for the round, so it works once between its turns and not again until the fight comes back around to it — and a foe that never leaves the hook's reach ne" [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bound, absorption, bloodied-burst, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever an enemy within the halberdier's reach moves away from it or tries to slip past it, the halberdier snaps the halberd's hook into a leg or collar and drags the enemy back, stopping the escape cold. This burns the halberdier's own reaction for the round, so it works once between its turns and not again until the fight comes back around to it — and a foe that never leaves the hook's reach ne" [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bound)
[reskin] weapons answered: Halberd = halberd
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon row: Actions/Longbow — the Hobgoblin Warrior's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.5: print's dice, the sheet's +5
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
```


---

## Jarl Hrimgar — in the run

**Concept:** a Huge frost giant jarl who throws boulders

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Jarl Hrimgar | 9 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "throws boulders"
- read: def 6 / off 9 → 7.5; sustained 56 (2 × Frost Axe); nova none; dmg 56

```
Jarl Hrimgar

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

Multiattack. Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination.

Frost Axe. Melee Attack Roll: +10, reach 10 ft. 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.

Great Bow. Ranged Attack Roll: +10, range 150/600 ft. 17 (2d10 + 6) Piercing damage.

Bonus Actions

War Cry (Recharge 5-6). Hrimgar or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of Hrimgar's next turn.

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
- Actions/Great Bow — print's own row, renamed; weapon bow
- Bonus Actions/War Cry — print's own row

**Engine trace**

```
[path] twist — Frost Giant (is) — "frost giant" (call)
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-hurler: ✓ ("throws boulders") | skirmisher-hurler: key "throws" (class verb)
[concept] hints: hurler→style ✓ ("throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/armed mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling boulders of ice-sheathed bedrock [behavior] | body of rime-crusted frost giant flesh and blue ice [body] | glacier-slug hammers and stony shield slabs wrenched from the terrain [object]
[concept] identity: The frost giant jarl wades into battle with a glacier-slug in each hand, opening by hurling a boulder the size of a wagon at the farthest archer before closing to crush anything left standing. Every round it cycles: rip a chunk of ice-sheathed bedrock from the ground and throw it, then wrench a frozen slab over its shoulder as a shield against return fire, roaring all the while — a thor uthan who dares any challenger to out-throw him. Under pressure it does not retreat; it laughs, digs in behind shield-sized ice slabs, and hurls harder, treating death as the final proving ground of strength.
[concept] lore: A jarl of a northern icehold who won his seat by hurling a rival chieftain's war-stone across a frozen fjord, and now claims every cliff of blue ice within sight as his personal armory.
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
[reskin] inline declared: "Hrimgar" — the call's own answer (person), built from the name
[reskin] inline form: "Hrimgar" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "throws boulders" but offered no quote
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Hrimgar tears a frozen slab of blue ice out of the ground and plants it as a broad, shield-sized wall in front of himself, then hurls the next rock from behind it. While the slab stands, ranged attacks coming his way are blunted and the roar of mockery that follows rattles the nerves of anyone who thought to out-throw him. The slab is only good for a moment of cover and shatters when it has done i" [bonus_action/once_per_fight/defense] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, slow-bolt, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Hrimgar tears a frozen slab of blue ice out of the ground and plants it as a broad, shield-sized wall in front of himself, then hurls the next rock from behind it. While the slab stands, ranged attacks coming his way are blunted and the roar of mockery that follows rattles the nerves of anyone who thought to out-throw him. The slab is only good for a moment of cover and shatters when it has done i" [bonus_action/once_per_fight/defense] — the model found no template that holds it (offered: slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, stunning-strike)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Frost Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anything that strikes Hrimgar gets a burst of rime and frost shrapnel back in its face — the ice crusting his body explodes outward at the point of impact, biting the attacker with the same cold he carries. The harder the blow lands, the more of his frozen hide breaks loose." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: heated-body, death-burst, bloodied-burst, terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown heated-body, which the GM's words keyed
[reskin] key match declined: trait — "heated-body" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anything that strikes Hrimgar gets a burst of rime and frost shrapnel back in its face — the ice crusting his body explodes outward at the point of impact, biting the attacker with the same cold he carries. The harder the blow lands, the more of his frozen hide breaks loose." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, terrain-walk, death-burst)
[reskin] weapons answered: Fist = none; Boulder = none; Glacier Darts = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Glacier Darts (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Neutral Evil — the Frost Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Fist" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon skills: "Perception +4, Stealth +3" -> "Athletics +10, Perception +4" — the Frost Giant's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Glacier Darts (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Ice-Wader" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---

## Watch That Won't Stand Down — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Watch That Won't Stand Down | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Watch That Won't Stand Down

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

Multiattack. The watch that won't stand down makes two attacks, using Shortsword or Shortbow in any combination.

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
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "a skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=sapient style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: falling back to shoot from cover [behavior] | the bow and its endless bone-tipped arrows [object] | an animated skeleton in rotting soldier's harness [body]
[concept] identity: The skeleton archer opens a fight from cover at the edge of its range, loosing bone-tipped arrows at anything that enters the ruin it guards; every round after, it repositions to keep a wall, pillar, or corpse-pile between itself and melee, spending arrows as though its quiver were bottomless. Under pressure it falls back rather than closes, sacrificing ground for distance and abandoning its post only when cornered, at which point it fights with startling savagery.
[concept] lore: A soldier who died at his post and rose again in the same posture, the skeleton archer still mans a wall that no longer matters, shooting at the living because it cannot remember the order to stand down.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the watch that won't stand down" — the call's own answer (kind), built from the name; the rules would have said "the watch"
[reskin] inline on kit rows: "the watch" -> "the watch that won't stand down"
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the archer shifts away from a foe it snaps off a parting shot at that same enemy as it retreats, punishing anything that crowds it to try to lock it in melee. This lets it combine its fall-back with the endless arrow idea, keeping up pressure even while losing ground." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] word match declined by the call: snap-shot, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the archer shifts away from a foe it snaps off a parting shot at that same enemy as it retreats, punishing anything that crowds it to try to lock it in melee. This lets it combine its fall-back with the endless arrow idea, keeping up pressure even while losing ground." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: snap-shot, riposte)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The archer's quiver is a memory of one, not a thing — every arrow it draws comes out bone-tipped and whole, so it never runs dry however long the fight drags on. Its missed arrows rot away where they land, leaving nothing for foes to steal or count." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The archer's quiver is a memory of one, not a thing — every arrow it draws comes out bone-tipped and whole, so it never runs dry however long the fight drags on. Its missed arrows rot away where they land, leaving nothing for foes to steal or count." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Boneblade = none; Bone Arrow = shortbow
[reskin] weapon declined: "Boneblade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] weapon declared: "Bone Arrow" is a shortbow — the call's own answer (the name alone read longbow)
[reskin] weapon table: "Bone Arrow" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Boneblade" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Bone Arrow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Relentless Step" is the seat's, not the Skeleton's
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
```


---

## Twin-Skulled Wolf — in the run

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Twin-Skulled Wolf | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Bite); nova none; dmg 14

```
Twin-Skulled Wolf

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

Pack Tactics. The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The wolf makes two Bite attacks.

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
[path] twist — Wolf (is) — "wolf" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("wolf") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a wolf with two heads…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/venomous mind=bestial style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads that watch and feint in turn [body] | harrying dart-in, dart-out pack tactics [behavior] | venomed bite from the second skull [behavior]
[concept] identity: The two-headed wolf circles its prey in a wide, silent lope, one head watching while the other feints, then darts in to tear at hamstrings before wheeling back out of reach. Every round it repeats the passes, herding the wounded toward its packmates and never committing to a standstill. It is cunning enough to harry a superior foe for hours, and only breaks off when its second head goes still.
[concept] lore: Twinned by the corruption that festers where monstrosities whelp, the two-headed wolf hunts the forest edge in patient relays, each skull nursing its own hunger for the same kill.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf makes a snapping feint with one head and, in the same motion, darts past its target, forcing the prey to turn and chase the wrong skull. The prey must scramble to follow or lose sight of the wolf entirely, leaving itself open to the wolf's next pass." [action/save/condition] — menu: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: feint-slip, gaze-single, focus, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The wolf makes a snapping feint with one head and, in the same motion, darts past its target, forcing the prey to turn and chase the wrong skull. The prey must scramble to follow or lose sight of the wolf entirely, leaving itself open to the wolf's next pass." [action/save/condition] — the model found no template that holds it (offered: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, feint-slip, focus, riposte)
[reskin] fallback respects the call: feint-slip, gaze-single left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "While one skull watches the prey, the other rests — and once the watching head has tracked a foe through a whole pass, the resting head is ready to strike with poisoned cunning the moment that foe drops its guard." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "While one skull watches the prey, the other rests — and once the watching head has tracked a foe through a whole pass, the resting head is ready to strike with poisoned cunning the moment that foe drops its guard." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Bite = none
[reskin] print canon type: Monstrosity -> Beast — the Wolf's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Circling Lope" is the seat's, not the Wolf's
audit finding names unknown entry, dropped: Twin-Skulled Wolf
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

Senses darkvision 60 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance (3/Day, or 4/Day in Lair). If the scaldwell fails a saving throw, it can choose to succeed instead.

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
[route] lurker-trap type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker-trap: ✓ ("runs a bathhouse") | lurker-trap: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a vampire who runs a bathhouse…" is the description, not a name
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: scalding bathwater as a weapon [body] | luring bathers into the water before striking [behavior] | the bathhouse it haunts and controls [aura]
[concept] identity: The bathhouse keeper waits behind the steam, wearing the calm face of a host until a bather settles into the scalding water — then it strikes, boiling the life from them through the water itself while its grave-cold hands pin them under the surface. Every round after, it works the room as a predator works a trap: shutting doors, venting scalding steam, and dragging the weakened deeper into the baths it controls. Wounded, it does not flee the house it has made its body — it fights to the death, taunting its prey with the manners of an innkeeper who will never let a guest leave.
[concept] lore: A vampire who drowned in its own bathhouse and rose again as the spirit of the place, it keeps the water boiling and the doors locked, feeding on the warmth of every guest who stays too long.
[reskin] print canon route: the Vampire's body outranks the trap seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Scaldwell = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the scaldwell" — the call's own answer (kind), built from the name
[reskin] inline form: "the scaldwell" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Scaldwell vents the bathhouse's scalding water and steam through a doorway or opening it can see, rolling a boiling wall across the room. Anyone caught in the surge is scalded and the floor around them stays slick and hot for a time, so bathers who linger keep getting burned and find it hard to stand their ground in the scalding water. It uses this to close off exits and herd guests toward the dee" [action/save/damage] — menu: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] word match declined by the call: blighted-ground, drain, zone-seed, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown drain, which the GM's words keyed
[reskin] key match declined: action — "drain" was ranked first on the call's own menu for vampire, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Scaldwell vents the bathhouse's scalding water and steam through a doorway or opening it can see, rolling a boiling wall across the room. Anyone caught in the surge is scalded and the floor around them stays slick and hot for a time, so bathers who linger keep getting burned and find it hard to stand their ground in the scalding water. It uses this to close off exits and herd guests toward the dee" [action/save/damage] — the model found no template that holds it (offered: drain, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, zone-seed, blighted-ground, riposte)
[reskin] fallback respects the call: drain left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The scalding water answers its keeper: whenever Scaldwell wounds someone with its claws, that wound weeps boiling bathwater, and the scalded flesh keeps burning while the creature is near. Anyone it has freshly clawed finds the water of the house turning on them, burning hotter and deeper the longer they stay in its rooms." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: heated-body, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The scalding water answers its keeper: whenever Scaldwell wounds someone with its claws, that wound weeps boiling bathwater, and the scalded flesh keeps burning while the creature is near. Anyone it has freshly clawed finds the water of the house turning on them, burning hotter and deeper the longer they stay in its rooms." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, bloodied-burst)
[reskin] weapons answered: Scalding Claw = none
[reskin] print canon modes: swim off — the Vampire has no such mode and the words name none
[reskin] speed by concept: dropped Swim 30 ft.; added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Scalding Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The scaldwell makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon skills: "Perception +7, Stealth +14" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance (3/Day, or 4/Day in Lair) — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The scaldwell makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Vampire Weakness The Sunlight weakness is keyed to the vampire subtype the block never establishes, and none of the block's text ties the creature to that suite except by name; this is a subtype-reference inconsistency (name 'Vampire' inside the entry).
audit finding below confidence gate: Vampire Weakness Lowercase bullet headings inside the trait (the / the) break statblock capitalization and duplicate the standard 2014-format vampire weakness rather than reading as scaldwell-specific rules.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---

## Tollwarden — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tollwarden | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Chapel Knell 13; dmg 38

```
Tollwarden

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

Knell of Passing. The first time the tollwarden is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tollwarden. Failure: 6 (1d12) Necrotic damage, and the target has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollwarden can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollwarden can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollwarden makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Chapel Knell (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from the tollwarden. Failure: 13 (3d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the tollwarden and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the tollwarden's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the tollwarden can see within 5 feet. Failure: The target is possessed by the tollwarden; the tollwarden disappears, and the target has the Incapacitated condition and loses control of its body. The tollwarden now controls the body, but the target retains awareness. The tollwarden can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The tollwarden's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the tollwarden leaves as a Bonus Action. When the possession ends, the tollwarden appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The tollwarden casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The tollwarden is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Chapel Knell — template active-toll; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Knell of Passing — template bloodied-burst; library draw (seed unstamped); the GM's clause "tolls for the dying"; binds the GM's words: toll+bell+dying+the dying+ring+peal
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost that tolls ") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "Sketch this D&D monster concept's combat…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling a death-knell [behavior] | spectral bell and rope [object] | incorporeal chapel-haunting [body]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls, its spectral rope already swinging as it tolls a knell that saps the warmth from the living. Each round it haunts the same area, ringing its bell to mark a victim for death, then reaching out with grave-cold hands to drain them further. It is a grieving, obsessive spirit that will not flee — it fights until the bell itself is silenced.
[concept] lore: A bell-ringer who died mid-toll, cursed to ring for every soul passing from the world, now mistakes the living for the dying and will not stop until they join its congregation.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the tollwarden" — the call's own answer (kind), built from the name
[reskin] inline form: "the tollwarden" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered trigger "at_will" for "tolls for the dying" but offered no quote
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "While the bell tolls, it names one living creature it can see as its marked soul for the coming round; the mark rides the tolling bell and makes the warden's own strikes against that creature colder and surer, and if that creature is brought low while marked, the bell rings out once more in a sound only the fallen hear. The toll is the warden's grief made law: it does not spread, it singles out on" [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: isolation — the key word does not mean the mechanic here
[reskin] signature template: active-toll -> Actions/"Chapel Knell (Recharge 5-6)" ("the bell tolls and rings out in sound, affecting creatures that hear it, with De [verb: toll:concept, bell:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "The spectral rope never stops swinging: whenever the tollwarden is harmed or its knell is disturbed, the bell peals out of its own accord, and those near the warden feel the death-chill of the chapel as the ringing saps warmth from any living creature close enough to hear it. The rope and bell are not weapons it wields but grief it cannot put down — a sound that keeps working even when the warden " [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: resonant-body, death-burst, adhesive, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Knell of Passing" ("whenever it is harmed the bell peals and saps warmth from living creatures nearb [verb: toll:concept, bell:concept, dying:concept, the dying:concept, ring:idea, peal:idea]")
[reskin] weapons answered: Grave-Cold Hand = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave-Cold Hand" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] row binds its clause: "Chapel Knell" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Knell of Passing" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```
