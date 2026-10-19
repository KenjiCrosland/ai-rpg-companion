# Review batch — twist-ten-2026-10-19T04-56-15

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Suture Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Cinder-Choked Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Legion Halberdier | 2 | 2024 | skirmisher-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Glacier-Jarl Hoarfrost | 9 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Gravewatch Archer | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Twin-Head Wolf | 2 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Scaldwell Keeper | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Tolling Chapel Wraith | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 7/7 |

**Dropped 3 of 11 user clauses** (coverage 73%); concept share 100% (40/40 rows). A run with zero fails and 60% coverage is a failing run.
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

Skills Perception +3, Stealth +4

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 1 (XP 200; PB +2)

Traits

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

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf — with a frost-rimed hide") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: pack tactics — encircling and cutting away [behavior] | frost-rimed hide that numbs the air around it [body] | the harrying pursuit across snow [behavior]
[concept] identity: A frost-rimed dire wolf opens by shadowing its quarry at the edge of the snowfield, then commits — one wolf is a feint, the pack closes from two sides and each cuts away before the prey can turn. It fights the way winter does: harry, withdraw, let the cold and the bleeding do the work, and never once stand still long enough to trade blows. Only when the pack has it cornered and the whole pack is bloodied does it commit to tearing out a throat — a wounded dire wolf runs, and it runs toward its fellows, not away.
[concept] lore: Frost-rimed dire wolves are packs that wandered too long above the treeline and took the rime into their coats, growing leaner and colder each winter until the hoarfrost became hide; they want the warmth of a living body, and they hunt in wide-flung circles to drive it toward the open ice.
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
[reskin] signature idea (action): "The dire wolf circles a foe and bites at its legs to drive it off balance, numbing the wound so the prey staggers and falters in its footing. A target already reeling from the cold is easier to drag down, so the pack's bites grow crueler the more the frost has seeped in." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, hook-rider, rampage — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown slow-bolt, which the GM's words keyed
[reskin] key match declined: action — "slow-bolt" was ranked first on the call's own menu for frost, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The dire wolf circles a foe and bites at its legs to drive it off balance, numbing the wound so the prey staggers and falters in its footing. A target already reeling from the cold is easier to drag down, so the pack's bites grow crueler the more the frost has seeped in." [rider/on_hit/condition] — the model found no template that holds it (offered: slow-bolt, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage)
[reskin] fallback respects the call: slow-bolt, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hoarfrost in its hide drinks the warmth from any blade or fist that strikes it, leaving the attacker's fingers stiff and clumsy for a moment. Those who trade blows with it soon find their grip and their speed stolen by the cold." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] word match declined by the call: absorption — the key word does not mean the mechanic here
[reskin] trait declined: "Rime Hide" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Bite = none
[reskin] print canon size: Medium -> Large — the Dire Wolf's
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Unbroken Lope" is the seat's, not the Dire Wolf's
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
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
- Actions/Bite — the chassis
- Actions/Tail Stinger — print's own row
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed a war-band's armoury" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing prey whole [behavior] | a gut full of stolen armoury [object] | erupts from the earth to strike [behavior]
[concept] identity: A purple worm that devoured an entire war-band and now fights with their armoury clattering in its gut — it surges up from the ground to swallow a foe whole, while stolen blades, pikes, and mail shred whatever it grinds inside its gullet. Every round it swallows or coils a new victim, and when bloodied it does not flee but thrashes harder, driving swallowed steel through its own hide in a spray of gore and iron. It is a bestial engine, all appetite and grating metal, tempering savagery with the terrible luck of a beast that has nothing to lose.
[concept] lore: Deep beneath an old battlefield it ate a routed war-band's baggage train whole — armour, pikes, and all — and now it hunts the surface hoping to fill the hollow clangour inside itself with more iron and more flesh.
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
[reskin] signature idea (action): "The worm heaves its whole body and thrashes in a grinding, circular frenzy, churning the stolen steel inside itself into a screeching storm that spills out through its own wounds. Everything caught close around it is battered and slashed by pikes, mail links, and snapped blades as it convulses, and any weapon or shield it gave way inside is flung outward to clatter across the ground. It uses this " [action/once_per_fight/damage] — menu: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown swallow, which the GM's words keyed
[reskin] key match declined: action — "swallow" was ranked first on the call's own menu for swallow+swallows+swallowed, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The worm heaves its whole body and thrashes in a grinding, circular frenzy, churning the stolen steel inside itself into a screeching storm that spills out through its own wounds. Everything caught close around it is battered and slashed by pikes, mail links, and snapped blades as it convulses, and any weapon or shield it gave way inside is flung outward to clatter across the ground. It uses this " [action/once_per_fight/damage] — the model found no template that holds it (offered: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, herd, drain, exploiter, rally)
[reskin] fallback respects the call: swallow left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Purple Worm's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the worm takes a grievous wound, the stolen armoury shifts and skewers it from within, and it answers by driving that jagged iron outward — anyone standing close is spattered and cut by shrapnel of blade and mail. The more hurt it becomes, the more violently its gut rattles and the more it thrashes." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, heated-body, resonant-body, bloodied-fury, absorption, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Scrapmetal Eruption" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: tunneler — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none; Iron Gullet = none; Swallow Whole = none
[reskin] chassis nova: "Iron Gullet (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "The purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Iron Gullet (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---

## Suture Troll — a 2024 sheet

**Concept:** a troll that grows back unless the blade was silvered

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Suture Troll | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "grows back unless the blade was silvered"
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Suture Troll

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

Regeneration. The suture troll regains 15 Hit Points at the start of each of its turns. If the suture troll takes damage from a silvered weapon, this trait doesn't function on the suture troll's next turn. The suture troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the suture troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the suture troll's limbs is severed, falls into the suture troll's space, and becomes a Troll Limb. The limb acts immediately after the suture troll's turn. The suture troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The suture troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The suture troll moves up to half its Speed straight toward an enemy it can see.

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
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("grows back") | brute-regenerator: no line key in the words — the model's read of its quote | bane: "silver" on the GM's own words "unless the blade was silvered"
[concept] hints: troll→canon ✓ ("a troll that grows back")
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/terror mind=bestial style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: flesh that knits back together [body] | only silvered blades stop the regrowth [behavior] | bone spurs and knotted muscle [body]
[concept] identity: A hulking monstrosity of ropey, knotted muscle and bone-spurred hide wades into the fight and simply refuses to die, its flesh knitting shut around every wound that is not silvered. Each round it presses the attack, letting lesser blows close behind it as it hammers at the nearest steel that is not silver, trying to break the one weapon that can keep it down. It fights to the death only while unmarked; once silver is drawn and bites, it turns cornered and vicious, slamming its bulk into the silver-bearer rather than retreating.
[concept] lore: Spun from the marrow of a dozen butchered trolls into a single seamless body, it wakes with one hunger: to find the smith whose silver can actually make it stay dead.
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
[reskin] inline declared: "the suture troll" — the call's own answer (kind), built from the name
[reskin] inline form: "the suture troll" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "unless the blade was silvered" names no absence — nothing in it takes anything away
[reskin] clauses: "a troll" -> has (mechanical), head [asked: heal] | "grows back unless the blade was silvered" -> has (mechanical) [asked: heal]
[reskin] signature idea (action): "When the troll lands a claw on someone, it tears the wound wide and packs its own raw, knitting flesh into the gash, fusing shreds of itself into the victim. That flesh keeps squirming inside them, slowing them and dragging at every step until it is dug out or burned away. Any wound the troll takes reknits a little faster while a piece of it is still crawling under someone else's skin." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Sutured Graft" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the troll is struck by anything that is not silver, the skin around the blow knits shut around the weapon and pulls its wielder in, so blades bite and then stick fast for a moment, dragging the attacker close enough for the troll's claws. Silvered steel is the one edge it cannot close over." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: adhesive, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever the troll is struck by anything that is not silver, the skin around the blow knits shut around the weapon and pulls its wielder in, so blades bite and then stick fast for a moment, dragging the attacker close enough for the troll's claws. Silvered steel is the one edge it cannot close over." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, warded-mending)
[reskin] repair: 1 clause(s) with no row — "grows back unless the blade was silvered"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Claw = none
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Monstrosity -> Giant — the Troll's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The suture troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll that grows back unless the blade was silvered" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
[reskin] vulnerability rejected — "no field" is dealt, defended, or not a damage type
[reskin] regeneration keyed to the GM's own bane: "Regeneration" keyed "Acid or Fire damage" and the GM named silver ("unless the blade was silvered") — print's row keeps everything else
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```


---

## Cinder-Choked Hydra — a print donor

**Concept:** Hydra whose stumps smoke instead of regrowing

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cinder-Choked Hydra | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 8 / off 3 → 5.5; sustained 10 (1 × Bite); nova none; dmg 10

```
Cinder-Choked Hydra

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

Hold Breath. The hydra can hold its breath for 1 hour.

Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.

Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions

Multiattack. The hydra makes as many Bite attacks as it has heads.

Bite. Melee Attack Roll: +8, reach 10 ft. 10 (1d10 + 5) Piercing damage.

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
- Actions/Bite — the chassis
- Traits/Hold Breath — print's own row
- Traits/Multiple Heads — print's own row
- Traits/Reactive Heads — print's own row

**Engine trace**

```
[path] twist — Hydra (is) — "Hydra" (call)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "fire" answers a question nobody asked
[concept] resolve: archetype=brute type=Monstrosity themes=venomous/bestial mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: severed necks that erupt into smoke [behavior] | caustic smoke clouds from its stumps [aura] | five lashing heads that bite and constrict [body]
[concept] identity: The smoking hydra lures victims in with false confidence, then punishes them for every wound they deal — each severed neck bursts into a blinding, strangling plume of caustic smoke rather than regrowing, rewarding the creature's attackers with a lungful of ruin. It fights as a lunging brute of a body, using its many heads to grab, constrict, and maim while the wounds it suffers keep bleeding out smoke until the battlefield is a choking cloud. Cornered and bleeding, it fights to the death rather than retreat, spending its own severed flesh as a weapon.
[concept] lore: A hydra that spawned in the choked vents of a volcanic mire, its blood curdled into a smoking venom that replaces the regrowth its kin rely on; it seeks nothing now but to be left alone in the fogs it makes, though its smoke always draws the curious.
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
[reskin] asked field dropped: the call answered trigger "on_being_hit" for "Hydra whose stumps smoke instead of regrowing" but offered no quote
[reskin] clauses: "Hydra whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: save_area]
[reskin] signature idea (action): "The hydra whips its neck stump forward and hacks a wet gout of burning blood-venom at a nearby foe, splattering them in the same caustic filth its wounds already spill. Anyone caught in the spatter keeps coughing and blinking through the clinging smoke for a short while, their eyes stinging and lungs raw." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, zone, zone-seed, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — zone, zone-seed (smoke)
[reskin] word match declined by the call: rampage, zone-seed, affliction, own-turn-punisher, coating — the key word does not mean the mechanic here
[reskin] fit declined: "Smoke-Choked Stumps (1/Day)" — a print body takes only what the user's words ask; the call quoted "smoke", which is not in the GM's own words (every significant word must be), and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: zone-seed, rampage, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Hydra's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever a neck is severed or a wound is torn open, the stump erupts in a roiling plume of caustic smoke that lingers around the body instead of healing shut. The cloud hangs in the hydra's space and drifts outward, blinding and strangling anyone who stays near or wades through it, so the longer the fight drags on the worse the air becomes." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — warded-mending (regrows)
[reskin] trait declined: "Caustic Stump Burst" — bound only on the idea's own words (wounded:idea, erupt:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "The hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra whose stumps smoke instead of regrowing" is the Hydra (print's own row)
audit finding below confidence gate: Multiple Heads Initiative is computed at +1 (11), matching DEX +1 with no additional bonus, yet Reactive Heads grants extra Reactions per head beyond one — a GM cannot adjudicate how these reaction slots relate to the normal single reaction granted by the core rules, and the block never states whether the hydra's reaction economy replaces or supplements the standard one.
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] audit rewrite blocked — "Multiple Heads" is engine-authored chassis text
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra whose stumps smoke instead of regrowing"
```


---

## Legion Halberdier — one marked soft

**Concept:** a hobgoblin with a halberd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Legion Halberdier | 2 | skirmisher-1 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Halberd: reach 10 on a Medium body with no tether word
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Halberd); nova none; dmg 14

```
Legion Halberdier

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
[path] twist — Hobgoblin Warrior (is) — "a hobgoblin" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a hobgoblin with a halberd") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the halberd's reach and hooking blade [object] | hobgoblin rank discipline and pack coordination [behavior]
[concept] identity: The hobgoblin opens by probing with the halberd's reach from just outside the enemy's own measure, testing which side of the line is soft before committing. Every round after, it works the seam of the fight — dart in behind an ally's press to land a hooking cut, then back out of reach — and it spends its own footwork to buy allies the flank rather than to save itself. It does not break; hobgoblin discipline holds it in line while the rank is whole, and it gives ground only to re-form, not to flee.
[concept] lore: Drilled in the war-camps of a hobgoblin legion, this soldier carries a halberd taller than itself and a place in the line it will not abandon while the standard flies.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 16, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Hobgoblin Warrior (the matcher would have said homebrew)
[reskin] print canon: "a hobgoblin with a halberd" heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] repair round 1: 1 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Halberd" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)
[reskin] repair round 2: 1 defect(s) — no damage type for "Hurled Scythe"
[reskin] named parts: Halberd (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the halberdier" — the call's own answer (kind), built from the name
[reskin] inline form: "the halberdier" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a hobgoblin with a halberd" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the halberdier hits a creature with its halberd, it can hook the target and haul it along as the halberdier gives ground, dragging the enemy a short distance with it — into the reach of the halberdier's allies, or out of the soft spot it just found. It is a repositioning tool, not extra damage: the halberdier trades its own ground to put the hooked enemy somewhere worse." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, gaze-single, snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] fit declined: "Hooking Retreat" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The halberdier's reach reads the enemy's guard before a blow ever lands: the halberdier can test a foe at the edge of its reach, learning where that foe is soft, and the rest of its line shares the opening. The halberd's hooking blade also snaps an enemy's guard aside so that the halberdier's next stroke finds the seam." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The halberdier's reach reads the enemy's guard before a blow ever lands: the halberdier can test a foe at the edge of its reach, learning where that foe is soft, and the rest of its line shares the opening. The halberd's hooking blade also snaps an enemy's guard aside so that the halberdier's next stroke finds the seam." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Halberd = halberd
[reskin] weapon table: "Hurled Scythe" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the words say humanoid ("a dire wolf but undead", 2026-10-01)
[reskin] print canon attack: "Hurled Scythe" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "a hobgoblin with a halberd" is the Hobgoblin Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Hobgoblin Warrior's
[reskin] print canon: chassis row leaves — Traits/"Drilled Footwork" is the seat's, not the Hobgoblin Warrior's
audit finding below confidence gate: Longbow The block grants a longbow attack but the creature's only listed physical equipment is a halberd and no ammunition or ranged weapon is established in the statblock.
[reskin] weapon reach: "Halberd" reaches 10 ft. — print's halberd has Reach
[reskin] multiattack re-read — "Longbow" joins the combination; "The halberdier makes two attacks, using Halberd or Longbow in any combination."
```


---

## Glacier-Jarl Hoarfrost — in the run

**Concept:** a Huge frost giant jarl who throws boulders

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Glacier-Jarl Hoarfrost | 9 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "throws boulders"
- read: def 6 / off 9 → 7.5; sustained 56 (2 × Frost Axe); nova none; dmg 56

```
Glacier-Jarl Hoarfrost

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

Multiattack. Hoarfrost makes two attacks, using Frost Axe or Great Bow in any combination.

Frost Axe. Melee Attack Roll: +10, reach 10 ft. 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage.

Great Bow. Hoarfrost hurls a glacier boulder. Ranged Attack Roll: +10, range 150/600 ft. 17 (2d10 + 6) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Hoarfrost spends 5 feet of movement in that space to recover it, Hoarfrost's Speed is halved and it can't use this action.

Bonus Actions

War Cry (Recharge 5-6). Hoarfrost or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of Hoarfrost's next turn.

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
[concept] hints: hurler→style ✓ ("throws boulders")
[concept] resolve: archetype=skirmisher type=Giant themes=elemental/terror mind=sapient style=hurler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: boulder hurling from the glacier [behavior] | ice-sheathed body of a jarl [body] | rune-carved axe [object]
[concept] identity: A frost giant jarl opens by heaving a boulder torn from the glacier itself, cratering the ground to scatter a formation before closing with a rune-carved axe. Every round after that it circles at the edge of reach, throwing ice-sheathed rocks and spears to pin foes in place, then wading in to finish whoever is left standing. It is a proud warlord with no fear of death, fighting to the last breath while roaring orders to its kin and refusing to retreat even bloodied.
[concept] lore: A jarl of the high ice halls, he claims tribute from any who cross his glacier and buries those who refuse beneath the boulders he tears from his own frozen domain.
[reskin] print canon route: "a Huge frost giant jarl who throws boulders" is the Frost Giant, a bow-user — the hurler seat stands down for the plain line
[reskin] nova capped: "Sweeping Area Attack" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] print canon pb: print's +9 on PB +3 reads +10 on this sheet's PB +4; DCs follow
[reskin] print canon defenses: HP 150 -> 149, AC 17 -> 15 — the Frost Giant's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 9, CON 21, INT 9, WIS 10, CHA 12 — the Frost Giant's at its own CR; attack +8 -> +10, DC 18 (print's, on this sheet's PB)
[reskin] donor: skirmisher-8 -> CR 9
[reskin] style unserved: "hurler" has no skirmisher line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] [path] decides: twist on the Frost Giant (the matcher would have said homebrew)
[reskin] print canon: "a Huge frost giant jarl who throws boulders" heads on the Frost Giant — print's rows ride along; the seat stays
[reskin] name_element answered: Glacier-Jarl Hoarfrost = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Hoarfrost" — the call's own answer (person), built from the name
[reskin] inline form: "Hoarfrost" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a Huge frost giant jarl" -> has (header) | "throws boulders" -> has (mechanical) [asked: at_will/attack]
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Hoarfrost rips a boulder from the glacier and hurls it with a warlord's roar, and the ground where it lands erupts in a fan of jagged frost shards. Everyone caught in the blast is left stumbling over slick, splintered ice, their footing ruined so the jarl and his kin can close in on them. The ice lingers where it settles, making the broken ground treacherous to cross." [action/save/movement] — menu: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, condition-payoff, exploiter, affliction, gaze-single, snare, shield-bash, lure, snare-bolt, sensory-strike, disarm — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "throw-retrieve" has no key-table verb, but the call quotes "throws boulders" from the description
[reskin] slot yields: ranged — the chassis's "Boulder" leaves; "Glacier Hurl" holds the slot
[reskin] multiattack re-read — "Boulder" left; "Multiattack" now reads "Hoarfrost makes three Greataxe attacks."
[reskin] signature template: throw-retrieve -> Actions/"Glacier Hurl" ("Hoarfrost rips a boulder from the glacier and hurls it — a ranged boulder throw  [shape fit, no verb match]")
[reskin] signature idea (trait): "The ice sheathing Hoarfrost's body bites back at anyone who lands a blow on him up close, frost crawling up their weapon and arms. Those who strike him feel the cold seep in and their limbs stiffen, slowing them just enough for the jarl to answer with his axe." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] trait declined: "Rime Sheathing" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Greataxe = greataxe; Boulder = none; Avalanche Sweep = none
[reskin] chassis nova: "Avalanche Sweep (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: dropped Climb 40 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral -> Neutral Evil — the Frost Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Greataxe" -> "Frost Axe" — the Frost Giant's own row
[reskin] print canon multiattack: "Hoarfrost makes two attacks, using Frost Axe or Great Bow in any combination." — the Frost Giant's own
[reskin] print canon attack: "Great Bow" is print's own row — +9, 17 (2d10 + 6), range 150/600 ft. (an exact body at print's CR)
[reskin] print canon attack: "Glacier Hurl" -> "Great Bow" — the Frost Giant's own ranged row
[reskin] defenses by material: a ice body is vulnerable to Fire and never resists, absorbs, or ignores it — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] print canon defenses: immunities none -> Cold — the Frost Giant's own header lines
[reskin] print canon: chassis row leaves — Actions/"Avalanche Sweep (Recharge 5-6)" is the seat's nova, not the Frost Giant's
[reskin] print canon: chassis row leaves — Traits/"Ice Stride" is the seat's, not the Frost Giant's
[reskin] print canon row: Bonus Actions/War Cry (Recharge 5-6) — the Frost Giant's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Frost Giant's War Cry (Recharge 5-6)
[reskin] asked but unanswered: "throws boulders" asked for at_will and no row binds the clause
[reskin] audit rename blocked — "Great Bow" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Gravewatch Archer — in the run

**Concept:** a skeleton archer

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gravewatch Archer | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 12 (2 × Shortsword); nova none; dmg 12

```
Gravewatch Archer

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

Multiattack. The archer makes two attacks, using Shortsword or Shortbow in any combination.

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
[route] skirmisher-archer type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: on the GM's own words "a skeleton archer" | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-archer: ✓ ("a skeleton archer") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Undead themes=grave/armed mind=mindless style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: loosing arrows from a bone bow [behavior] | skeletal frame of bare bone [body] | a grave-worn bow and quiver [object]
[concept] identity: A skeleton archer opens fights by loosing a bone-tipped arrow from the edge of its bow's reach, then repositions behind cover or undead allies, firing steady shots each round at whatever is closest to reaching it. Corpse-calm and relentless, it will not close to melee unless cornered and, being already dead, never flees the field. Its archery is a habit of old muscle and the bow is a companion of the grave, keeping it coldly distant rather than berserk.
[concept] lore: Some ruined archer's remains rose from a battlefield grave, still keeping the watch its company abandoned, loosing arrows at any warm thing that walks the field.
[reskin] print canon route: the Skeleton's body outranks the archer seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's; DEX 16 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton archer" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the archer" — the call's own answer (kind), built from the name
[reskin] inline form: "the archer" — the model's own reading of the name
[reskin] save dc derived: DC 11 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] final price: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton archer" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The archer looses a bone-tipped arrow steeped in grave rot. The wound it leaves does not close cleanly: for the rest of the fight that target's flesh keeps withering, so every later hit from any gravewatch archer bites deeper and the victim's own body betrays it with a creeping chill that slows its steps. Only one such mark can cling to a creature at a time, and only a moment of stillness far from" [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: bolt-mark, contagion, delayed-brand, aggro-curse — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The archer looses a bone-tipped arrow steeped in grave rot. The wound it leaves does not close cleanly: for the rest of the fight that target's flesh keeps withering, so every later hit from any gravewatch archer bites deeper and the victim's own body betrays it with a creeping chill that slows its steps. Only one such mark can cling to a creature at a time, and only a moment of stillness far from" [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, delayed-brand, rampage, aggro-curse)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Where the archer's arrows strike the living, the grave clings: a creature wounded by its bow finds the chill of the battlefield settling into it, its reflexes growing dull and its limbs stiff until it has taken a breath away from the fight." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where the archer's arrows strike the living, the grave clings: a creature wounded by its bow finds the chill of the battlefield settling into it, its reflexes growing dull and its limbs stiff until it has taken a breath away from the fight." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] weapons answered: Bowstave = club; Arrow = bow
[reskin] weapon declared: "Bowstave" is a club — the call's own answer (the name alone read bow)
[reskin] weapon declared: "Arrow" is a bow — the call's own answer (the name alone read longbow)
[reskin] weapon table: "Arrow" — a launcher, never thrown, range 150/600
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Bowstave" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Arrow" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Skeleton's
[reskin] print canon: chassis row leaves — Traits/"Grave Step" is the seat's, not the Skeleton's
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
```


---

## Twin-Head Wolf — in the run

**Concept:** a wolf with two heads

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Twin-Head Wolf | 2 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Bite); nova none; dmg 14

```
Twin-Head Wolf

Medium Monstrosity, Unaligned

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

Pack Tactics. The twin-head wolf has Advantage on attack rolls against a creature if at least one of the twin-head wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The twin-head wolf makes two Bite attacks.

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
- Actions/Bite — the chassis

**Engine trace**

```
[path] twist — Wolf (is) — "a wolf" (call)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("a wolf with two heads") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Monstrosity themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two heads hunting as one [body] | pack-tactics feint and flank [behavior] | lupine hide and jaws [body]
[concept] identity: The two-headed wolf circles a fight in a wide, loping arc, one head watching the prey while the other watches the pack, then darts in with a snapping lunge and pulls back before a counter can land. Each round it repeats the feint-and-retreat from a different flank, trading ground for openings and never committing both heads to the same bite. When wounded it does not break — it grows more reckless, driving in behind a packmate to hamstring whatever has hurt it.
[concept] lore: Twin-headed wolves are whelped where monstrous blood runs into ordinary packs, and the two skulls share one hunger between them — the surviving whelps are the ones whose heads learned to hunt together, and their packs are feared for it.
[reskin] the concept outranks the alias: the Wolf is a Beast and the concept reads Monstrosity — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 14, DEX 16, CON 12, INT 3, WIS 12, CHA 6 — the Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-1 -> CR 2
[reskin] [path] decides: twist on the Wolf (the matcher would have said homebrew)
[reskin] print canon: "a wolf with two heads" heads on the Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the twin-head wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the twin-head wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a wolf with two heads" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When it lunges at a foe, the second head is not idle — it snaps at a different creature nearby, splitting the pack's attention in two. Both victims are thrown off guard by the double threat, and the wolf's allies close in while the prey is divided." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, gaze-single, snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When it lunges at a foe, the second head is not idle — it snaps at a different creature nearby, splitting the pack's attention in two. Both victims are thrown off guard by the double threat, and the wolf's allies close in while the prey is divided." [rider/on_hit/condition] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, charge, feint-slip)
[reskin] fallback stands down: the twist path has no shelf — the Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "One head never stops watching the fight while the other fights; whenever the wolf is wounded, the unhurt head marks the attacker, and the wolf's next strike against that foe comes from an angle the prey cannot cover." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, faultless-tracker, relentless-pursuit — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "One head never stops watching the fight while the other fights; whenever the wolf is wounded, the unhurt head marks the attacker, and the wolf's next strike against that foe comes from an angle the prey cannot cover." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, faultless-tracker, bloodied-fury, relentless-pursuit)
[reskin] weapons answered: Bite = none
[reskin] print canon type: Monstrosity stays — the words say monstrosity ("a dire wolf but undead", 2026-10-01)
[reskin] print canon speed: 30 ft. -> 40 ft. — the Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a wolf with two heads" is the Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Wolf's
[reskin] print canon: chassis row leaves — Traits/"Feinting Arc" is the seat's, not the Wolf's
```


---

## Scaldwell Keeper — in the run

**Concept:** a vampire who runs a bathhouse

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scaldwell Keeper | 13 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 6 → 8; sustained 30 (2 × Grave Strike); nova none; dmg 30

```
Scaldwell Keeper

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

Senses darkvision 60 ft.; Passive Perception 17

Languages Common plus two other languages

CR 13 (XP 10,000; PB +5)

Traits

Legendary Resistance. If the keeper fails a saving throw, it can choose to succeed instead.

Misty Escape. If the keeper drops to 0 Hit Points outside its resting place, the keeper uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The keeper can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The keeper has these weaknesses:


- Forbiddance: the keeper can't enter a residence without an invitation from an occupant.
- Running Water: the keeper takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the keeper's heart while the keeper has the Incapacitated condition in its resting place, the keeper has the Paralyzed condition until the weapon is removed.
- Sunlight: the keeper takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The keeper makes two Grave Strike attacks and uses Bite.

Grave Strike. Melee Attack Roll: +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 6 (1d4 + 4) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the keeper regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the keeper's control.

Bonus Actions

Shape-Shift. If the keeper isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the keeper can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the keeper can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The keeper casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the keeper's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the keeper.

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
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire who runs a bathhouse") | lurker: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause, so "running water" answers a question nobody asked
[concept] resolve: archetype=lurker type=Undead themes=grave/beguiling mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: luring bathers into scalding steam [behavior] | hiding in and striking from the billowing vapor [behavior] | the boiling-blood bath [aura]
[concept] identity: The Bathhouse Keeper lures bathers into the scalding steam of its tiled sanctum, then opens with one perfect strike from the fog — a bite through the neck of whoever wandered away from the group. Each round after, it vanishes into the billowing vapor it commands, sliding through steam to re-emerge behind the next unwary bather, Toying with guests it finds amusing and dragging the rest under the water to bleed. It fights to the death in its own house, retreating only to its coffin-hearth when genuinely bloodied, and never so far that it abandons the bath.
[concept] lore: A noble who was scalded to death in the bathing halls of a conquered estate, this vampire rose again bound to the water and steam, and now keeps the bathhouse open for the living it needs to drink.
[reskin] print canon defenses: HP 179 -> 195, AC 17 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +10 -> +9, DC 17 (print's)
[reskin] donor: lurker-8 -> CR 13
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Vampire (the matcher would have said homebrew)
[reskin] print canon: "a vampire who runs a bathhouse" heads on the Vampire — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the keeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the keeper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a vampire" -> has (descriptive), head | "runs a bathhouse" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The keeper drags a wounded or grappled bather into the bath itself, plunging them beneath the scalding water. Anyone held under is scoured by the boiling heat and the dead keeper's blood-taint in it, and the wound it has already opened there will not close." [rider/on_hit/damage] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] fit declined: "Scalding Draught" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Vampire's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bathhouse steam itself is hungry. Anyone the keeper has bitten leaks their life into the air around them as reddish vapor, which clings to the keeper and mends it, so every wound it opens among the bathers feeds it a little back." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] word match declined by the call: absorption, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] trait declined: "Feeding Wounds" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Fangs = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Fangs" -> "Grave Strike" — the Vampire's own row
[reskin] print canon multiattack: "The keeper makes two Grave Strike attacks and uses Bite." — the Vampire's own
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
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The keeper makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
audit finding below confidence gate: Misty Escape Shape-Shift is a Bonus Action whose form is chosen among bat, mist, or return-to-vampire; the trait forces a specific choice but does not state whether the chosen form is mist exclusively or whether the keeper may instead choose bat, leaving resolution ambiguous.
audit finding below confidence gate: Charm Charm Person in its standard form targets a Humanoid only and has a 1-hour duration; the entry asserts the keeper can use it despite being an Undead and extends duration to 24 hours, but never states how it targets or what happens when the Charmed condition ends early, making the spell's targeting clause unresolvable as written.
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
```


---

## Tolling Chapel Wraith — in the run

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tolling Chapel Wraith | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Wail 6; dmg 38

```
Tolling Chapel Wraith

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

Ethereal Sight. The chapel wraith can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The chapel wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The chapel wraith makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Wail (1/Day). Constitution Saving Throw: DC 13, each creature within 30 feet of the chapel wraith that can hear it. Failure: 6 (1d12) Necrotic damage, and if the target has 6 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the chapel wraith and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the chapel wraith's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the chapel wraith can see within 5 feet. Failure: The target is possessed by the chapel wraith; the chapel wraith disappears, and the target has the Incapacitated condition and loses control of its body. The chapel wraith now controls the body, but the target retains awareness. The chapel wraith can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The chapel wraith's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the chapel wraith leaves as a Bonus Action. When the possession ends, the chapel wraith appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The chapel wraith casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The chapel wraith is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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
- Actions/Wail — template wail; library draw (seed unstamped)
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — class bard — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the death-knell tolled for the dying [behavior] | a spectral bell and rope it rings [object] | grave-cold shadow it drifts as [body]
[concept] identity: A chapel bell-ringer's ghost hangs silent above the nave until it hears the death-rattle of the dying, then strikes its spectral bell-rope to toll a knell that hooks the victim's fading life and drags it loose. Each round it circles the wounded, tolling again to peel away more life, drifting through pews and walls to stay by whoever is nearest to death. It does not flee and cannot be reasoned with — it has a death to announce, and it will finish the toll before anything else.
[concept] lore: The bell-ringer who never left the tower after his final, unfinished death-knell walks the chapel still, tolling for each soul before it goes and growing restless when a death is delayed.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost · class bard (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the chapel wraith" — the call's own answer (kind), built from the name
[reskin] inline form: "the chapel wraith" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wraith seizes its spectral bell-rope and tolls a slow, dragging knell that only the seriously wounded hear as a pull on their own fading life. Every foe already badly hurt feels the toll hook into them and drag them toward death's door, lurching them closer to the edge of dying; a foe at full health hears nothing but echoes. It grows steadier and more eager the more of the fight has already be" [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] word match declined by the call: active-toll, sensory-strike, hook-rider, obstacle-pull, execute, drain — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "tolls for the dying" from the description
[reskin] signature template: wail -> Actions/"Wail (1/Day)" ("The toll hooks only the badly hurt and drags them toward death's door; a foe at  [shape fit, no verb match]")
[reskin] signature idea (trait): "A phantom bell hangs above the wraith and a rope of pale light trails from it, swinging and sounding in answer to suffering nearby: whenever a creature close to it nears death, the bell tolls on its own, and the whole chapel answers — shadows deepen and the sound follows the dying wherever they crawl. The toll cannot be silenced; it simply finds the nearest fading soul." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "noxious-aura" has no key-table verb, but the call quotes "a chapel bell ringer's ghost that tolls for the dying" from the description
[reskin] trait declined: "Tolling Dirge" — a print body takes only what the user's words ask; the call quotes "a chapel bell ringer's ghost that tolls for the dying", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] repair: 1 clause(s) with no row — "tolls for the dying"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bell-Hook = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Bell-Hook" -> "Withering Touch" — the Ghost's own row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] threshold re-derived after the cap: Actions/Wail (1/Day) — 20 over the row's own 6 damage, so the kill branch beat the damage branch; threshold to 6
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
```
