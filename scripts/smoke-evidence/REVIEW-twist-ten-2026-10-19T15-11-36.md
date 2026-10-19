# Review batch — twist-ten-2026-10-19T15-11-36

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverwary Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Fen-Burn Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (1) | 1/1 | 4/4 |
| Pass-Keeper Grath | 2 | 2024 | defender-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (1) | 1/1 | 2/2 |
| Jarl Hrimgar | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Forgotten Watchman | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Moonsplit Two-Head | 2 | 2024 | skirmisher-1 | ok | FAIL: under | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok | FAIL (2) | 1/1 | 1/1 |
| Steward of the Springs | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Last Ringer | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 100% (38/38 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-1 / reader: 2
- brute-5 / reader: 1
- skirmisher-1 / bands: 1



---

## Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- structure · soft · multiattack-count: Multiattack says 2 but names no rows
- reader · fail · multiattack-integrity: "The dire wolf makes two attacks." on a sheet with no attack row at all
- read: def 1/8 / off 0 → 0.0625; sustained 0 (2 × ?); nova none; dmg 0

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

Skills Perception +3, Stealth +4

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

Rimeburst Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two attacks.

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

- Traits/Rimeburst Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+shard
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/breath mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack hunting that encircles and cuts off prey [behavior] | frost-rimed hide that never melts [body]
[concept] identity: A frost-rimed dire wolf opens with a burst of speed from cover, seizing the weakest prey in its jaws while its pack fans out to cut off escape. Every round after, it darts in to bite and drag, then slips back out of reach with frost cracking off its hide, circling until the pack's numbers tell. It does not toy with prey — it hunts to feed, and when bloodied and outnumbered it breaks off and runs rather than die for a meal.
[concept] lore: Frost-rimed dire wolves are the great white hunters of the high snowfields, their coats crusted with hoarfrost that never melts, and they want nothing more than to pull down a warm body and drag it back to the pack's den.
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
[reskin] signature idea (action): "The wolf lunges at prey already hurt or slowed, snapping for the hamstring to bring it down and drag it toward the waiting pack. A creature it wounds this way has its speed cut down and can't slip away from the wolf's reach; if it's already bleeding, the bite tears deeper." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt — the key word does not mean the mechanic here
[reskin] fit declined: "Hamstring Drag" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Hoarfrost sloughs off the dire wolf's hide in biting shards whenever something fastens onto it, numbing fresh wounds. Anyone who strikes it in close combat gets frost in the eyes and cracks across their knuckles, leaving them clumsy and recoiling, and it can drag a clinging foe along as it darts away." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rimeburst Hide" ("Hoarfrost sloughs off its hide in biting shards when a creature hits it in close [verb: frost:concept, shard:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Dire Wolf prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The dire wolf makes two attacks."
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Skirmish" is the seat's, not the Dire Wolf's
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

Multiattack. The purple worm makes one attack and one Tail Stinger attack.

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
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Purple Worm — that swallowed a war-band'" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole into a gut packed with corroded weapons [behavior] | coils and hide studded with fused blades, hafts, and mail-scraps [body] | the war-band's armoury lodged in its belly and plates [object]
[concept] identity: A colossal purple worm writhes up from the deep with a war-band's worth of loot fused into its hide and gut — blades, hafts, and mail-scraps bristling from its coils like iron barnacles. It opens by breaching beneath the densest formation and engulfing as many fighters as its maw will hold, then grinds and tumbles them against the swallowed arsenal inside its gut while its barbed, weapon-studded tail sweeps the survivors away. Wounded, it does not flee; it burrows shallow and strikes upward again and again, dragging prey underground to digest at leisure and never letting a battle end on anyone's terms but its own.
[concept] lore: Grown fat on a mercenary company's spilled baggage train, this worm has welded every blade and haft it could not dissolve into its own armor, and now it hunts armed columns the way other worms hunt cattle — the richer the steel, the keener its hunger.
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
[reskin] signature idea (action): "The worm rears and sweeps its whole studded length in a wide arc, and the fused blades and mail-scraps on its hide turn that sweep into a shredding flail. Anyone it rakes is left stumbling and off-balance, easy to knock down and slow to recover, so the survivors of the gut get scattered and harried exactly when they try to regroup." [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] word match declined by the call: swallow — the key word does not mean the mechanic here
[reskin] fit declined: "Studded Sweep" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: swallow left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every blade, haft, and mail-scrap welded into its coils is still hungry metal — anything that strikes the worm or grapples with it drags itself across that bristling hide and gets torn and poisoned by the corroded steel. The longer a fight drags on against it, the more the worm's own armour turns every blow back on the attacker." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, false-appearance, uncanny-sense, heated-body, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Every blade, haft, and mail-scrap welded into its coils is still hungry metal — anything that strikes the worm or grapples with it drags itself across that bristling hide and gets torn and poisoned by the corroded steel. The longer a fight drags on against it, the more the worm's own armour turns every blow back on the attacker." [trait/on_being_hit/damage] — the model picked "weapon-lodge" (no verb, and it quotes nothing the GM typed) over a concept-verb template (tunneler)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Grinding Gut (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Grinding Gut (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Purple Worm prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The purple worm makes one attack and one Tail Stinger attack."
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
```


---

## Silverwary Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Silverwary Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Silverwary Troll

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

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 6 (XP 2,300; PB +3)

Traits

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
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "a troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back unless the blade was silvered") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back unless the blade")
[concept] resolve: archetype=brute type=Giant themes=bestial/uncanny mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: regeneration that only silver stops [body] | relentless, laughing melee brawling [behavior] | hide-plated giant frame [body]
[concept] identity: A towering, hide-skinned brute that wades into melee swinging fists and a jagged club with careless, joyful cruelty, trusting its knitting flesh to soak every counterblow. Round after round, wounds it takes seal before the next swing lands, so it presses the attack relentlessly and shrugs off any hurt that isn't silver. It is not mindless — it laughs, feints, and toys with foes who can't pierce its regeneration, staying to the last even when bloodied by silver because it simply never learned to fear death.
[concept] lore: Born of old battlefields where spilled blood soaked the earth, these giant troll-kin wander looking for fights worth remembering — and blades worth fearing.
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
[reskin] clauses: "a troll" -> has (descriptive), head | "grows back unless the blade was silvered" -> has (mechanical) [asked: on_being_hit/heal]
[reskin] signature idea (action): "The troll's favorite trick is to swing at its enemy and mock an opening, inviting the counterblow and laughing when it lands. Whenever a foe strikes the troll in melee during the brawl, the troll immediately answers with a delighted haymaker of its own, treating the pain as a joke rather than a threat. It only gets this free swing once per exchange, so it can't be goaded into endless punishment — " [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The troll's favorite trick is to swing at its enemy and mock an opening, inviting the counterblow and laughing when it lands. Whenever a foe strikes the troll in melee during the brawl, the troll immediately answers with a delighted haymaker of its own, treating the pain as a joke rather than a threat. It only gets this free swing once per exchange, so it can't be goaded into endless punishment — " [reaction/on_being_hit/damage] — the model found no template that holds it (offered: aggro-curse, own-turn-punisher)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hide along its arms and knuckles is crusted over with old, hardened scar-tissue from a lifetime of healed-over wounds, so every blow it lands carries the memory of a hundred survived brawls. Wounds it inflicts ache and bleed like old battlefields, refusing to close cleanly on anyone the troll has struck." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, berserk, undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "already_answered"
[reskin] signature miss: trait — "The hide along its arms and knuckles is crusted over with old, hardened scar-tissue from a lifetime of healed-over wounds, so every blow it lands carries the memory of a hundred survived brawls. Wounds it inflicts ache and bleed like old battlefields, refusing to close cleanly on anyone the troll has struck." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Slam" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "Slashing" has no warrant in the concept's own text (print's default is none)
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] asked but unanswered: "grows back unless the blade was silvered" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---

## Fen-Burn Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Fen-Burn Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- reader · fail · multiattack-integrity: "The fen-burn hydra makes as many attacks as it has heads." on a sheet with no attack row at all
- read: def 8 / off 0 → 4; sustained 0 (1 × ?); nova none; dmg 0

```
Fen-Burn Hydra

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

Skills Athletics +8, Perception +3

Immunities Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Hold Breath. The fen-burn hydra can hold its breath for 1 hour.

Multiple Heads. The fen-burn hydra has five heads. Whenever the fen-burn hydra takes 25 damage or more on a single turn, one of its heads dies. The fen-burn hydra dies if all its heads are dead.

Reactive Heads. For each head the fen-burn hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The fen-burn hydra makes as many attacks as it has heads.

Bonus Actions

Venting Haze (1/Day). The fen-burn hydra creates a wall of scalding smoke in a 20-foot Emanation originating from itself. The effect lasts while the fen-burn hydra maintains Concentration on it, up to 10 minutes. has Disadvantage on attack rolls

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
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row
- Bonus Actions/Venting Haze — template zone; library draw (seed unstamped); binds the GM's words: smoke+cloud+haze

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/breath mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: smoking severed stumps that vent scalding haze instead of regrowing heads [body] | wounds that close as fast as they open [behavior] | relentless multi-headed assault that grows more dangerous under damage [behavior]
[concept] identity: The Venting Hydra wades into battle behind a wall of snapping heads, biting and crushing anything within reach. Every time a head is severed, the stump erupts in scalding, blinding smoke that plumes around it and its attackers, thickening as the fight wears on. Its flesh knits shut within seconds, so pressure makes it more dangerous, not less — it does not flee; it grinds forward until either it or its prey stops moving.
[concept] lore: A hydra whose regenerative flesh went wrong, knitting shut into stoppered stumps that vent the heat of its own healing as acrid smoke — it wanders the fens searching for anything it can consume to quiet the burn within.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 149 -> 184, AC 15 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +8 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the fen-burn hydra" — the call's own answer (kind), built from the name
[reskin] inline form: "the fen-burn hydra" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: "instead of regrowing"
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: on_being_hit/condition]
[reskin] signature idea (action): "The hydra wrenches open the half-closed wounds along its necks, loosing a rolling bank of scalding smoke that hangs around it like a wall of burning haze. Anyone caught in that smoke is blinded and choking and can't seem to draw a clean breath while it lasts, and the cloud lingers after the hydra moves on. Its stumps stay open and venting for a while afterward, so its bite keeps scalding hotter th" [action/once_per_fight/condition] — menu: trample, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] signature template: zone -> Actions/"Venting Haze (1/Day)" ("The hydra vents a lingering bank of scalding smoke from its smoking stumps that  [verb: smoke:concept, cloud:idea, haze:idea]")
[reskin] signature idea (trait): "Whenever a head is severed or the hydra takes a telling wound, the stoppered stump bursts open and vents searing smoke into the air around it, scalding and stinging anyone nearby. That vented smoke pours out in a thick plume that clings to the ground and drags at the eyes and lungs of those fighting beside it, so the longer the fight goes the harder it is to see the hydra's heads coming." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] word match declined by the call: warded-mending — the key word does not mean the mechanic here
[reskin] trait declined: "Smoking Stumps" — bound only on the idea's own words (wounded:idea, burst:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The fen-burn hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Hydra prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The fen-burn hydra makes as many attacks as it has heads."
[reskin] dead control row: "Venting Haze (1/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] asked but unanswered: "Hydra whose stumps smoke instead of regrowing" asked for on_being_hit and no row binds the clause
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---

## Pass-Keeper Grath — one marked soft

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pass-Keeper Grath | 2 | defender-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Halberd: reach 10 on a Medium body with no tether word
- read: def 1 / off 2 → 1.5; sustained 12 (1 × Halberd); nova none; dmg 12

```
Pass-Keeper Grath

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

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Goblin

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When Grath hits a creature with its Halberd, the attack deals an extra 2 damage.

Pack Tactics. The hobgoblin has Advantage on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

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
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the long-hafted halberd [object] | holding a line or passage against all comers [behavior] | catching a passing foe on the halberd's hook and pinning it [behavior]
[concept] identity: A hobgoblin halberdier plants itself in a doorway or formation gap and simply refuses to yield, using the halberd's reach to make the first comer pay for closing in. Each round it holds ground, jabbing at reach to break up charges before stepping back to reset the point, and it stalks sideways to punish anyone who tries to slip past toward the softer targets behind it. Bloodied, it doesn't break — it digs in harder, trading its own wounds for the chance to pin a foe in place, and fights to the death rather than abandon its post.
[concept] lore: A drilled rank-and-file soldier of a hobgoblin war-host, this halberdier was left to hold a pass or gatehouse and now lives only to keep that post, collecting the weapons of whoever tried to force it.
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
[reskin] inline declared: "Grath" — the call's own answer (person), built from the name
[reskin] inline form: "Grath" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] signature idea (action): "When Grath hits a creature closing on its post, it jabs the point to stop the advance and shifts back a step to reset — anyone trying to push past is pinned where it stands, unable to slip by while Grath holds the gap. The pin breaks the moment Grath moves off the spot or strikes at someone else." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] word match declined by the call: push-prone, charge-push, hook-rider — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Grath hits a creature closing on its post, it jabs the point to stop the advance and shifts back a step to reset — anyone trying to push past is pinned where it stands, unable to slip by while Grath holds the gap. The pin breaks the moment Grath moves off the spot or strikes at someone else." [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, hook-rider, push-prone)
[reskin] fallback respects the call: push-prone left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whoever tries to slip past Grath has to get through the halberd first — any foe angling to go around it instead of through it draws a jab from the point as it turns on them. Grath always keeps the line, snapping at anyone who closes without facing it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: berserk, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whoever tries to slip past Grath has to get through the halberd first — any foe angling to go around it instead of through it draws a jab from the point as it turns on them. Grath always keeps the line, snapping at anyone who closes without facing it." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, berserk)
[reskin] weapons answered: Halberd = halberd
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Hobgoblin Warrior's
[reskin] print canon row: Actions/Longbow — the Hobgoblin Warrior's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.5: print's dice, the sheet's +5
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
```


---

## Moonsplit Two-Head — bands fail

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Moonsplit Two-Head | 2 | skirmisher-1 | ok | FAIL: under | SOFT: multiattack-count | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | ok |

- bands · soft · aim-dpr: damage 0 a round is 100% under the card's 15
- bands · fail · under: damage 0 a round sits under print at CR 2 (5–36, n=94); reads CR 0.25
- structure · soft · multiattack-count: Multiattack says 2 but names no rows
- reader · fail · multiattack-integrity: "The two-head makes two attacks." on a sheet with no attack row at all
- read: def 1/2 / off 0 → 0.25; sustained 0 (2 × ?); nova none; dmg 0

```
Moonsplit Two-Head

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

Pack Tactics. The two-head has Advantage on attack rolls against a creature if at least one of the two-head's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The two-head makes two attacks.

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

**Engine trace**

```
[path] twist — Wolf (is) — "a wolf with two heads" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a wolf with two heads") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/uncanny mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads that fight in concert [body] | pack flanking and hit-and-run harrying [behavior] | a second skull that never lets its prey out of sight [body]
[concept] identity: The two-headed wolf is a pack skirmisher that splits a target's attention: heads feint and snap from opposite flanks, then the beast wheels away before steel can answer. Every round it circles, probes, and darts back in, one head watching the prey while the other strikes at whatever it leaves unguarded. It is bold while the pack holds and turns to harrying and retreat once bloodied, never fighting alone to the last.
[concept] lore: A wolf whelped under a corrupted moon sometimes comes out with two skulls and one hunger, and it runs with the pack that birthed it until its doubled senses and doubled jaws make it the pack's spearpoint.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the two-head" — the call's own answer (kind), built from the name
[reskin] inline form: "the two-head" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "a wolf with two heads" names no absence — nothing in it takes anything away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The two-head lunges in low and snaps at a foe while its second skull wrenches its gaze away, so the target is caught watching the wrong head. Until the end of its next turn that foe has its attention badly divided, and the pack's next few strikes against it land harder and surer. The move is pure feint-and-bite: it costs the beast nothing but boldness." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: feint-slip, gaze-single — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The two-head lunges in low and snaps at a foe while its second skull wrenches its gaze away, so the target is caught watching the wrong head. Until the end of its next turn that foe has its attention badly divided, and the pack's next few strikes against it land harder and surer. The move is pure feint-and-bite: it costs the beast nothing but boldness." [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, charge, gaze-single, disarm, feint-slip)
[reskin] fallback respects the call: gaze-single left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "One skull dozes while the other hunts, so the two-headed wolf is never truly caught off guard — it notices threats and keeps its bearings even when it looks distracted or halfway fleeing. The waking head simply takes over the moment the other falters." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: faultless-tracker, blurred-form, evasion, relentless-pursuit — the key word does not mean the mechanic here
[reskin] trait declined: "Dozing Watch" — a shape fit with no verb match on a Monstrosity body; a meat body earns its trait by a verb
[reskin] weapons answered: Bite = none
[reskin] print canon alignment: Chaotic Neutral -> Unaligned — the Wolf's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Beast — the Wolf's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bite" — the Wolf prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Bite" left; "Multiattack" now reads "The two-head makes two attacks."
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Circling Skirmish" is the seat's, not the Wolf's
audit finding names unknown entry, dropped: Moonsplit Two-Head
audit finding below confidence gate: Two-Head A two-headed creature with pack coordination is presented as a plain Beast, but nothing in the block expresses a second head mechanically; the name and type advertise a duality the statblock never delivers.
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

Skills Perception +4, Stealth +3

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
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/grasping mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: throwing boulders torn from the glacier [behavior] | a frost giant jarl's cold-forged body [body] | a hoard of boulders and reeling weapons [object]
[concept] identity: A Huge frost giant jarl strides into battle hurling boulders torn from the glacier itself, opening at range to shatter formations before any foe can close. Every round after that it keeps its distance, pacing and lobbing ice-rimed stone with crushing arm strength, daring enemies to come to it. Under pressure it grows colder in temper, taunting and toying with prey, and only turns to flee when its body is broken and the warband is lost.
[concept] lore: This jarl rules a glacier hall built of piled boulders and frozen tribute, and it wants the lowlands' holds cracked open so its clan can feast and claim new halls.
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
[reskin] asked field dropped: the call answered limit "at_will" for "throws boulders" but offered no quote
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Hrimgar wrenches a shelf of the glacier loose and hurls it not at one foe but down the middle of a formation, so that the whole line must scatter or be buried. The shattered shelf leaves a wide lane of loose, grinding ice behind it where the ground turns treacherous and any foe who stays rooted there is slowed to a crawl and harried by cold. This is the jarl's opening terror, meant to break ranks " [action/save/movement] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: throw-retrieve, slow-bolt, snare-bolt — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Hrimgar wrenches a shelf of the glacier loose and hurls it not at one foe but down the middle of a formation, so that the whole line must scatter or be buried. The shattered shelf leaves a wide lane of loose, grinding ice behind it where the ground turns treacherous and any foe who stays rooted there is slowed to a crawl and harried by cold. This is the jarl's opening terror, meant to break ranks " [action/save/movement] — the model found no template that holds it (offered: slow-bolt, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, riposte)
[reskin] fallback respects the call: slow-bolt left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Frost Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The cold seeps out of Hrimgar's body and the stone it carries, so that anyone who gets close and strikes it feels the frost bite back through their own weapon and hands. In its growing fury it hoards this chill, and the longer it has been wounded and harried, the more bitterly that backlash bites when foes finally land their blows." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Hoarded Frost" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Fist = none; Boulder = none; Ice-Rimed Stone = none
[reskin] weapon table: "Boulder" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] chassis nova: "Ice-Rimed Stone (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 50 ft. -> 40 ft. — the Frost Giant's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hrimgar makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Ice-Rimed Stone (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Glacier Stride" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
```


---

## Forgotten Watchman — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Forgotten Watchman | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Forgotten Watchman

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

Multiattack. The watchman makes two attacks, using Shortsword or Shortbow in any combination.

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
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("a skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loosing a bone-tipped arrow from cover [behavior] | skeletal, painless frame [body] | creaking bow and quiver of worn shafts [object]
[concept] identity: A skeleton archer opens a fight by loosing a shot from behind cover and then wheels backward, never letting a fight close to melee range, and if it is pressed in a corner it will drop its bow and fall back to its one advantage, the empty, silent endurance of a body that no longer feels pain or exhaustion. It has no fear of dying in blood, only of losing the field; it will trade distance for time and if outmatched it will break and run without shame. It is a creature of patient, cold, forgotten duty — not a butcher — and it will not pursue a foe that leaves range.
[concept] lore: A skeleton archer is the remains of a bowman who stood watch long after death should have ended the watch, held to the same post by a compulsion it never understood in life and still cannot break.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the watchman" — the call's own answer (kind), built from the name
[reskin] inline form: "the watchman" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the watchman looses an arrow at a foe that hasn't yet realized it is under attack — before it has acted in the fight, or while it is still unaware of the watchman's position — the shot carries the silent patience of a sentry who has waited ages for exactly this. The arrow drives the target to flinch and lurch into cover-hunting, leaving it unable to close the distance cleanly for a moment. On" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Sentry's Mark" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The watchman's frame no longer registers pain or strain, so wounds that would stagger a living archer never slow its aim. Whenever it is hurt, its next shot at whoever struck it comes faster and truer, as if the insult only sharpened its cold attention." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, heated-body, absorption, resonant-body — the key word does not mean the mechanic here
[reskin] trait declined: "Painless Aim" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Bone Fist = none; Bowshot = shortbow
[reskin] weapon declared: "Bowshot" is a shortbow — the call's own answer (the name alone read bow)
[reskin] weapon table: "Bowshot" — a launcher, never thrown, range 150/600
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Bone Fist" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Bowshot" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Relentless Stride" is the seat's, not the Skeleton's
```


---

## Steward of the Springs — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Steward of the Springs | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Steward of the Springs

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

Skills Perception +7, Stealth +14

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance. If the steward fails a saving throw, it can choose to succeed instead.

Misty Escape. If the steward drops to 0 Hit Points outside its resting place, the steward uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The steward can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The steward has these weaknesses:


- Forbiddance: the steward can't enter a residence without an invitation from an occupant.
- Running Water: the steward takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the steward's heart while the steward has the Incapacitated condition in its resting place, the steward has the Paralyzed condition until the weapon is removed.
- Sunlight: the steward takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The steward makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the steward regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the steward's control.

Bonus Actions

Shape-Shift. If the steward isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the steward can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the steward can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The steward casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the steward's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the steward.

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
[path] twist — Vampire (is) — "a vampire" (call)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire who runs a bathhouse") | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "running water" answers a question nobody asked
[concept] resolve: archetype=lurker type=Undead themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking unseen from the scalding steam [behavior] | the bathhouse it keeps and will not leave [object] | drowning and exsanguinating guests in the hot pools [behavior]
[concept] identity: A vampire bathhouse keeper waits beneath the steaming surface of its own pools, unseen in the scalding fog, and opens with a single drowning strike that drags a bather down into the scalding water before they can cry out. Every round after, it fades back into the steam and strikes again from a new angle, herding guests toward the hottest basins where their blood runs thin. It is patient and possessive of its house, and it does not flee — a cornered proprietor fights to the death to keep its baths, taunting guests with the hospitality they should have been grateful for.
[concept] lore: Once a mortal healer who bargained with something old for water that never cools, the bathhouse keeper drowned in its own springs and rose again, and it now keeps the baths open for anyone warm enough to soak — and to bleed into the pools.
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the steward" — the call answered "the springs" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The steward surges up from scalding water or its own fog and lays cold hands on one bather, and the water remembers its claim — a boiling veil clings to the victim, scalding them and hiding the steward as it slips back under. The burn is not fire but the spring's own heat turned necrotic, and it clings until the victim leaves the water or scrubs it away." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] fit declined: "Vitality Leech" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Steam answers the steward's will: whenever it is struck, the hot mist around it thickens and drifts, and anyone standing in that scalding fog with the steward begins to cook — their blood thinning, their wounds opening wider in the heat. The steward itself is untouched by this; it is the bathhouse, and the bathhouse does not burn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Scalding Vapor" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Claw = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The steward makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire who runs a bathhouse" is the Vampire (print's own row)
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The steward makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Bite The clause requires the GM to track burial after death and a rising event at a sunset that may never occur inside the adventure; it is an unresolved state the block gives no timing hook for beyond "the following sunset."
audit finding below confidence gate: Charm The GM must cross-reference the Charm Person spell text, apply a 24-hour override, track the willing-Bite exception, and remember the unawareness clause at expiry, which is more state than a bonus-action entry can resolve in ~10 seconds.
[reskin] audit rename blocked — "Grave Strike" is the user's own part name, a kit feature's real name, or print's own row
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---

## Last Ringer — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Ringer | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova none; dmg 38

```
Last Ringer

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft.

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

Ethereal Sight. The ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The ringer makes two Withering Touch attacks. It can replace one attack with a use of Luring Presence.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Luring Presence. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the ringer's bell. Failure: The target has the Charmed condition until the start of the ringer's next turn, and while Charmed this way, it must move toward the ringer by the safest available route on its turn.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the ringer and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the ringer's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the ringer can see within 5 feet. Failure: The target is possessed by the ringer; the ringer disappears, and the target has the Incapacitated condition and loses control of its body. The ringer now controls the body, but the target retains awareness. The ringer can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ringer's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the ringer leaves as a Bonus Action. When the possession ends, the ringer appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The ringer casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The ringer is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Luring Presence — template lure; library draw (seed unstamped)
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — class cleric — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the bell for the dying [behavior] | drifting through walls unseen [behavior] | the bell's death-knell aura [aura]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls, unseen until it begins to toll — and the bell's stroke marks a dying soul, dragging the living toward the grave with necrotic force. Every round it haunts from just out of reach, ringing the unseen bell to sap vitality while drifting through stone to escape reprisal. It is not mindless: it tolls with grim ceremony, choosing victims by their approaching deaths, and it clings to its post with relentless purpose until the chapel-tower's last soul is rung out.
[concept] lore: Once a faithful bell-ringer who died at the rope and whose office was never filled, it haunts the chapel tower still, tolling for each life about to end so no soul leaves the world unmarked.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 43 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost · class cleric (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the ringer" — the call's own answer (kind), built from the name
[reskin] inline form: "the ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ringer swings its handbell and the stroke is not aimed at the body but at whatever death is already leaning over its victim. Every living soul it can perceive that is hurt, sick, or already marked by the grave hears that toll as the knell meant for them: they stumble toward the bell, and the closer a soul is to its ending, the harder the stroke lands. It is a bell rung for the dying, so it sim" [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, execute — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "lure" has no key-table verb, but the call quotes "tolls for the dying" from the description
[reskin] signature template: lure -> Actions/"Luring Presence" ("the toll is heard as a knell meant for the listener and draws the wounded or dyi [shape fit, no verb match]")
[reskin] signature idea (trait): "Wherever the ringer tolls, an unseen knell hangs in the air around it for a moment: living things near the bell feel their own death drawing near, their hurts refusing to close and their strength bleeding away so long as the ringing lasts. The dying feel it worst — those already near their end sag toward it, slowing as if the grave were pulling at their ankles." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst, assassinate — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Wherever the ringer tolls, an unseen knell hangs in the air around it for a moment: living things near the bell feel their own death drawing near, their hurts refusing to close and their strength bleeding away so long as the ringing lasts. The dying feel it worst — those already near their end sag toward it, slowing as if the grave were pulling at their ankles." [trait/always/condition] — the model picked "noxious-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, resonant-body, death-burst)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "tolls for the dying"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Handbell = none
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Handbell" -> "Withering Touch" — the Ghost's own row
[reskin] print canon rows: Toll for the Dying leave — the Ghost has one melee row (Withering Touch), and Multiattack reads print's
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
audit finding below confidence gate: Horrific Visage Double spaces after save labels and inconsistent in-text referent ('this ghost') within the same entry.
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
```
